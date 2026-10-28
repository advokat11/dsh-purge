import { parseDocument } from "yaml";

const full = (value) => value.sandbox === "danger-full-access" && value.approval === "never";
const permissionEntry = (entry) => entry?.name === "@deepseek-ai/dsh-permission-presets"
  || (["permission", "permission-presets"].includes(entry?.id) && !entry?.name);

/** Read YAML as data only. In particular, never evaluate Cordis !!js expressions. */
export function readPermissionConfig(text) {
  if (!text.trim()) return { pinned: false, config: {} };
  const doc = parseDocument(text, { customTags: [], maxAliasCount: 20 });
  if (doc.errors.length) throw Error(`Не удалось разобрать YAML конфигурации прав: ${doc.errors[0].message}`);
  const data = doc.toJS({ maxAliasCount: 20 });
  if (!Array.isArray(data)) return { pinned: false, config: {}, unsupported: true };
  // Cordis patch lists can contain several updates for one plugin; merge only this plugin's config.
  let config = {};
  for (const entry of data) {
    if (permissionEntry(entry) && entry.config && typeof entry.config === "object") {
      config = { ...config, ...entry.config, presets: { ...config.presets, ...entry.config.presets } };
    }
  }
  const pinned = typeof config.defaultPreset === "string" && /^[a-z][a-z-]*$/.test(config.defaultPreset);
  return { pinned, config };
}

/** Runtime default for future sessions, not a claim about every session's overrides. */
export function livePermissionState(ctx) {
  if (!ctx) return null;
  const service = ctx.get?.("permissionPresets");
  if (service) {
    const preset = service.defaultPreset;
    return { preset, ...service.resolve(preset), source: "runtime:permissionPresets" };
  }
  const sandbox = ctx.get?.("shell")?.sandboxMode;
  const approval = ctx.get?.("approval")?.config?.policy;
  if (sandbox && approval) return { sandbox, approval, source: "runtime:defaults" };
  return null;
}

export function permissionState(text, ctx) {
  let parsed, parseError = "";
  try { parsed = readPermissionConfig(text); }
  catch (error) { parseError = error.message; }
  const pinned = parsed?.pinned ?? false;
  let observed, runtimeError = "";
  try { observed = livePermissionState(ctx); }
  catch (error) { runtimeError = error.message; }
  const config = parsed?.config || {};
  const preset = config.defaultPreset;
  if (pinned && observed?.source === "runtime:defaults") observed = null;
  const staticSpec = typeof preset === "string" && !preset.startsWith("!!") ? config.presets?.[preset] : null;
  // A standalone CLI cannot resolve includes, !!js, runtime settings or environment values.
  // File evidence is explicitly labelled and never upgraded to a live observation.
  const literal = (value) => typeof value === "string" && /^[a-z][a-z-]*$/.test(value);
  if (!observed && !runtimeError && literal(preset) && literal(staticSpec?.sandbox) && literal(staticSpec?.approval)) {
    observed = { preset, sandbox: staticSpec.sandbox, approval: staticSpec.approval, source: "profile-file" };
  }
  const known = literal(observed?.sandbox) && literal(observed?.approval);
  const state = !known ? "unknown" : !full(observed) ? "broken" : pinned ? "ok" : "inferred";
  return {
    preset: observed?.preset || (pinned ? String(preset) : "(явно не задано)"),
    sandbox: known ? observed.sandbox : "?",
    approval: known ? observed.approval : "?",
    source: observed?.source || "unobserved",
    scope: "profile-default", pinned, state, ok: state === "ok",
    error: [parseError, runtimeError].filter(Boolean).join("; "),
    note: state === "unknown" ? "Фактические права не подтверждены; отсутствие явной настройки не значит, что она не действует. Перепроверьте в работающей панели, права автоматически не меняются."
      : state === "inferred" ? "Сейчас хост выводит полный доступ / never; явно не закреплено, изменение окружения или настроек может изменить результат."
      : state === "broken" ? "Наблюдаемые права по умолчанию — не полный доступ / never; если так и задумано, менять ничего не нужно."
      : observed.source === "profile-file" ? "В файле profile явно задан полный доступ / never; работающий экземпляр ещё не сверен."
      : "У работающего экземпляра права по умолчанию — полный доступ / never, и в profile есть явный выбор.",
  };
}
