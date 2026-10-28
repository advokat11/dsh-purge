/** Independent update preferences and scheduler. Never applies host patches or restarts. */
import fs from "node:fs";
import path from "node:path";
import { atomicWriteSync } from "./core.js";

const fields = new Set(["autoCheck", "autoInstall", "intervalHours"]);
const prefPath = (home) =>
  path.join(home, "dsh-purge", "update-preferences.json");
const statePath = (home) => path.join(home, "dsh-purge", "update-status.json");
function read(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") return null;
    throw Error(`Не удалось прочитать настройки/состояние обновления: ${e.message}`);
  }
}
export function preferences(home, legacy = {}) {
  const saved = read(prefPath(home));
  const value = {
    autoCheck: legacy.autoCheckUpdates !== false,
    autoInstall: legacy.autoUpdateOnStart === true,
    intervalHours: legacy.updateCheckIntervalHours ?? 6,
    ...(saved || {}),
  };
  validate(value);
  return {
    autoCheck: value.autoCheck,
    autoInstall: value.autoInstall,
    intervalHours: value.intervalHours,
  };
}
function validate(value) {
  if (
    typeof value.autoCheck !== "boolean" ||
    typeof value.autoInstall !== "boolean"
  )
    throw Error("Автопроверка и автоустановка должны быть переключателями");
  if (
    !Number.isInteger(value.intervalHours) ||
    value.intervalHours < 1 ||
    value.intervalHours > 168
  )
    throw Error("Интервал проверки должен быть целым числом от 1 до 168 часов");
}
export function savePreferences(home, patch, legacy = {}) {
  if (
    !patch ||
    typeof patch !== "object" ||
    Array.isArray(patch) ||
    Object.keys(patch).some((k) => !fields.has(k))
  )
    throw Error("Настройки обновления содержат неизвестные поля");
  const value = { ...preferences(home, legacy), ...patch };
  validate(value);
  atomicWriteSync(prefPath(home), JSON.stringify(value, null, 2) + "\n");
  return value;
}
export function updateStatus(home) {
  return read(statePath(home)) || {};
}

// Reconcile only the current instance. Disk evidence must come from its logical
// profile path (not an old pnpm-store path retained by the loaded module).
export function reconcileUpdateStatus(state, runningVersion, installedVersion) {
  const valid = (v) => typeof v === "string" && /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(v);
  if (!valid(runningVersion) || !valid(installedVersion))
    throw Error("Не удалось подтвердить ни работающую, ни установленную на диске версию; запись об ожидании перезапуска не удалена");
  const next = { ...state, runningVersion, installedVersion, reconciliationError: "" };
  if (installedVersion !== runningVersion) {
    // Includes both upgrades and rollbacks. Do not let an old process install
    // again over a newer (or deliberately rolled-back) on-disk package.
    next.pendingVersion = installedVersion;
    next.restartRequired = true;
  } else {
    if (state.pendingVersion || state.restartRequired) {
      next.lastPendingVersion = state.pendingVersion || "";
      next.pendingResolution = state.pendingVersion === runningVersion ? "loaded" : "replaced";
    }
    next.pendingVersion = "";
    next.restartRequired = false;
  }
  // installError/targets are intentionally retained, even after a restart or
  // successful metadata check: one profile loading says nothing about others.
  return next;
}

export function createUpdateController({
  home,
  legacy = {},
  runningVersion,
  readInstalledVersion,
  check,
  install,
  now = Date.now,
  timers = { setTimeout, clearTimeout },
  onResult = () => {},
}) {
  let active = false,
    timer,
    inflight = null;
  const settings = () => preferences(home, legacy);
  const record = (value) => {
    const result = { ...updateStatus(home), ...value };
    atomicWriteSync(statePath(home), JSON.stringify(result, null, 2) + "\n");
    onResult(result);
    return result;
  };
  function status() {
    const state = updateStatus(home);
    try {
      return reconcileUpdateStatus(state, runningVersion, readInstalledVersion());
    } catch (e) {
      return { ...state, runningVersion, installedVersion: "", reconciliationError: e.message };
    }
  }
  function reconcile() {
    const next = status();
    if (JSON.stringify(next) !== JSON.stringify(updateStatus(home))) record(next);
    return next;
  }
  async function run() {
    if (!active || inflight) return inflight;
    inflight = (async () => {
      try {
        reconcile();
        if (!settings().autoCheck) return;
        const result = await check();
        if (!active) return;
        record({
          checkedAt: new Date(now()).toISOString(),
          availableVersion: result.remoteVersion || "",
          hasUpdate: !!result.hasUpdate,
          error: result.ok === false ? result.error || "Проверка обновлений не удалась" : updateStatus(home).installError || "",
        });
        if (result.ok === false) return;
        // Read again after network I/O: disabling either switch cancels installation.
        const current = settings(),
          state = reconcile();
        if (
          !current.autoCheck ||
          !current.autoInstall ||
          !result.hasUpdate ||
          result.pinned ||
          (result.channel && result.channel !== "stable")
        )
          return;
        if (state.reconciliationError) return;
        if (state.restartRequired && !(result.retryIncomplete && result.remoteVersion === state.pendingVersion)) return;
        let installed;
        try { installed = await install(result); }
        catch (e) {
          record({ error: e.message, installError: e.message });
          return;
        }
        if (installed?.applied) {
          // Persist even if disposed during installation: a new context must not install twice.
          record({
            pendingVersion:
              installed.release?.version ||
              installed.localVersion ||
              result.remoteVersion,
            installedAt: new Date(now()).toISOString(),
            hasUpdate: installed.ok === false,
            targets: installed.targets || [],
            restartRequired: true,
            installError: installed.ok === false ? installed.error || "Часть целей не обновилась, проверьте журнал обслуживания" : "",
            error:
              installed.ok === false
                ? installed.error || "Часть целей не обновилась, проверьте журнал обслуживания"
                : "",
          });
        } else if (installed?.ok === false)
          record({ error: installed.error || "Автоустановка не удалась, резервная копия сохранена", installError: installed.error || "Автоустановка не удалась, резервная копия сохранена", targets: installed.targets || [] });
      } catch (e) {
        if (active) {
          try {
            record({ error: e.message });
          } catch {
            onResult({ error: e.message });
          }
        }
      }
    })().finally(() => {
      inflight = null;
    });
    return inflight;
  }
  function schedule(delay) {
    timers.clearTimeout(timer);
    if (!active) return;
    let p;
    try {
      p = settings();
    } catch (e) {
      onResult({ error: e.message });
    }
    if (p && !p.autoCheck) return;
    timer = timers.setTimeout(
      async () => {
        await run();
        schedule();
      },
      delay ?? (p?.intervalHours || 6) * 3600000,
    );
    timer?.unref?.();
  }
  return {
    start() {
      if (active) return;
      active = true;
      try {
        reconcile();
      } catch (e) {
        onResult({ error: e.message });
      }
      schedule(30000);
    },
    refresh() {
      schedule(30000);
    },
    stop() {
      active = false;
      timers.clearTimeout(timer);
    },
    run,
    status,
    settings,
  };
}
