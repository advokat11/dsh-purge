#!/usr/bin/env node
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { Maintenance, compatibility, ROOT, PACKAGE } from "../lib/community.js";
import { findDshHome, patchDrift } from "../lib/core.js";
import { currentHost, diagnosticHost, hostSurface } from "../lib/instance.js";
import { readOverrides, writeOverride, clearOverride } from "../lib/anchors.js";
import { logAudit, readAudit } from "../lib/audit.js";
import { readFileSync, writeFileSync } from "node:fs";
import { installPreset, presetStatus } from "../lib/presets.js";
import { readBoost, writeBoost } from "../lib/boost.js";
import { readTuning, writeTuning } from "../lib/tuning.js";
import { createProbe, readProbe } from "../lib/probe.js";
const rawArgs = process.argv.slice(2);
// 原版 CLI 的全部动作（apply/revert/uninstall/edit/status）原样保留，
// purge-community 只做转发，避免两套实现漂移。
const LEGACY = { apply: "--apply", revert: "--revert", uninstall: "--uninstall", edit: "--edit", "legacy-status": "--status" };
const [op = "status", argument, argument2] = rawArgs,
  home = process.env.DSH_HOME || findDshHome();
// Resolve the running/explicit installation, not another machine-wide Desktop.
const aiBase = currentHost();
// 懒构造：status / diagnose / selfcheck 不该因为 profile 目录暂时不可用就直接崩。
const maintenance = () => new Maintenance({
  home,
  profile: process.env.PURGE_PROFILE_DIR,
  aiBase,
});
if (LEGACY[op]) {
  const run = spawnSync(process.execPath, [path.join(ROOT, "bin", "dsh-purge.js"), LEGACY[op], ...rawArgs.slice(1)], { stdio: "inherit" });
  process.exitCode = run.status === null ? 1 : run.status;
} else try {
  let result;
  if (op === "audit") {
    const n = rawArgs.includes("--limit") ? Number(rawArgs[rawArgs.indexOf("--limit") + 1]) : 20;
    result = { ok: true, entries: readAudit({ limit: Number.isFinite(n) ? n : 20, home }) };
  } else if (op === "reanchor") {
    const sub = argument || "list";
    const host = aiBase || currentHost();
    const drift = await patchDrift(host);
    const rows = [...drift.drifted, ...drift.optionalDrift];
    const byId = (id) => rows.find((r) => r.id === Number(id));
    if (sub === "list") {
      result = {
        host: drift.host,
        overrides: readOverrides(),
        drifted: rows.map((r) => ({
          id: r.id,
          name: r.name,
          optional: r.optional,
          anchors: r.anchors.map((a) => ({ index: a.index, file: a.file, line: a.suggestion?.line })),
        })),
      };
    } else if (sub === "show") {
      const row = byId(argument2);
      if (!row) throw Error(`Патчи без дрейфа #\${argument2}`);
      result = row;
    } else if (sub === "clear") {
      const idx = rawArgs.indexOf("--index");
      const wanted = idx >= 0 ? Number(rawArgs[idx + 1]) : undefined;
      if (idx >= 0 && !Number.isInteger(wanted)) throw Error("--index требует целое число");
      result = { cleared: true, overrides: clearOverride(home, argument2, wanted) };
    } else if (sub === "apply") {
      const row = byId(argument2);
      if (!row) throw Error(`Патчи без дрейфа #\${argument2}`);
      const idxFlag = rawArgs.indexOf("--index");
      const wanted = idxFlag >= 0 ? Number(rawArgs[idxFlag + 1]) : NaN;
      if (idxFlag >= 0 && !Number.isInteger(wanted)) throw Error("--index требует целое число");
      const target = idxFlag >= 0 ? row.anchors.find((a) => a.index === wanted) : row.anchors[0];
      if (!target) throw Error("Подходящий якорь не найден (укажите через --index)");
      const text = readFileSync(target.file, "utf8").replace(/\r\n/g, "\n");
      const lines = text.split("\n");
      const oldCount = String(target.head || "").split("\n").length;
      const linesFlag = rawArgs.indexOf("--lines");
      let from;
      let to;
      if (linesFlag >= 0) {
        const [a, b] = String(rawArgs[linesFlag + 1]).split("-").map(Number);
        if (!Number.isInteger(a) || !Number.isInteger(b) || a < 1 || b < a) throw Error("--lines требует формат вида 120-132");
        from = a - 1;
        to = b;
      } else {
        const center = (target.suggestion?.line || 1) - 1;
        const span = Math.max(1, Math.min(oldCount || 3, 40));
        from = Math.max(0, center - Math.floor(span / 2));
        to = Math.min(lines.length, from + span);
      }
      const candidate = lines.slice(from, to).join("\n");
      if (!candidate.trim()) throw Error("Полученный фрагмент пуст, задайте диапазон через --lines");
      const occurrences = text.split(candidate).length - 1;
      if (occurrences !== 1) throw Error(`Кандидатный фрагмент встречается в файле \${occurrences} раз, должен быть единственным; сузьте диапазон через --lines`);
      const preview = {
        patch: row.id,
        name: row.name,
        index: target.index,
        file: target.file,
        lines: `${from + 1}-${to}`,
        candidate: candidate.slice(0, 800),
        applies: (await import("../lib/core.js")).applyReplacementsToText(
          text,
          { ...row, replacements: [{ pattern: candidate, replace: "x" }], markers: ["__never__"] },
          target.file,
        ).changed,
      };
      if (!rawArgs.includes("--yes")) {
        result = { dryRun: true, ...preview, hint: "Если всё верно, добавьте --yes, чтобы записать локальное переопределение якоря" };
      } else {
        writeOverride(home, row.id, target.index, candidate, { host: drift.host });
        logAudit("reanchor", { patch: row.id, index: target.index, host: drift.host }, home);
        const core = await import("../lib/core.js");
        core.refreshAnchorOverrides();
        result = { written: true, ...preview, status: (await core.patchStatus(host))[row.id] };
      }
    } else {
      throw Error("Использование: purge-community reanchor list | show <id> | apply <id> [--index n] [--lines a-b] [--yes] | clear <id>");
    }
  } else if (op === "retry") {
    const sub = (argument || "status").toLowerCase();
    if (sub === "on" || sub === "off") {
      const next = writeTuning({ refusalRetry: sub === "on" });
      result = { ok: true, refusalRetry: next.refusalRetry, restart_required: false, effective: "next-turn" };
    } else {
      result = { ok: true, refusalRetry: readTuning(home).refusalRetry === true, hint: "purge-community retry on|off" };
    }
  } else if (op === "rewind") {
    const sub = (argument || "status").toLowerCase();
    if (sub === "on" || sub === "off") {
      const next = writeTuning({ rewind: sub === "on" });
      result = { ok: true, rewind: next.rewind, restart_required: true };
    } else {
      result = { ok: true, rewind: readTuning(home).rewind !== false, hint: "purge-community rewind on|off" };
    }
  } else if (op === "inject") {
    // 注入位置：head / tail / both。改完下一轮对话即生效（section 每轮回读 tuning），
    // 不需要重启；面板显示的段位会在下一次读取时刷新。
    const sub = (argument || "status").toLowerCase();
    const allowed = ["head", "tail", "both"];
    if (allowed.includes(sub)) {
      const next = writeTuning({ injectPosition: sub });
      logAudit("tuning_setting", { setting: "injectPosition", value: next.injectPosition }, home);
      result = { ok: true, injectPosition: next.injectPosition, restart_required: false };
    } else if (sub === "status" || !argument) {
      result = { ok: true, injectPosition: readTuning(home).injectPosition || "head", hint: "purge-community inject head|tail|both" };
    } else {
      result = { ok: false, error: "injectPosition принимает только head / tail / both", value: sub };
      process.exitCode = 2;
    }
  } else if (op === "probe") {
    if (argument === "new" || argument === "create") {
      const probe = createProbe();
      logAudit("probe", { nonce: probe.nonce }, home);
      result = { ok: true, ...probe };
    } else {
      const probe = readProbe();
      result = { ok: true, active: !!probe, nonce: probe?.nonce || "", hint: "purge-community probe new" };
    }
  } else if (op === "preset") {
    const sub = argument || "status";
    if (sub === "install" || sub === "update") {
      result = installPreset({ force: rawArgs.includes("--force") });
      logAudit("preset", { action: result.action, dir: result.dir }, home);
    } else if (sub === "status" || sub === "path") {
      result = presetStatus(home);
    } else {
      throw Error("Использование: purge-community preset [status|install [--force]]");
    }
  } else if (op === "boost") {
    if (argument === "on" || argument === "off") result = { enabled: writeBoost(argument === "on") };
    else result = { enabled: readBoost(), hint: "purge-community boost on|off" };
  } else if (op === "selfcheck" || op === "check-bypass") {
    // The extracted installer runs migrate before runtime dependencies are installed.
    const { selfCheck } = await import("../lib/selfcheck.js");
    // 从 CLI 直接跑（node bin/community.js）时 argv 指向插件自身，currentHost() 认不出宿主；
    // selfCheck 允许传空 aiBase 走自己的解析，这里把 DSH_HOME 一起传下去，避免用默认值再猜一次。
    const report = await selfCheck(aiBase || "", process.env.DSH_HOME || findDshHome());
    process.exitCode = report.state === "broken" ? 1 : 0;
    if (rawArgs.includes("--json")) result = report;
    else {
      const notApplicable = report.patch.not_applicable || 0;
      const naNote = notApplicable ? `(ещё \${notApplicable} шт. явно не применимы, уже закрыты или не требуют миграции)` : "";
      const missingNote = report.patch.missing_file ? ` · отсутствует цель у \${report.patch.missing_file} шт. (подробности в диагностике)` : "";
      const lines = [
        `Самопроверка пробития Purge · \${report.host || "(хост не определён)"}`,
        `  DSH \${report.host_version} · \${report.level} · патчи хоста \${report.patch.applied}/\${report.patch.total}\${naNote}\${missingNote}`,
        "",
      ];
      for (const layer of report.layers) {
        const mark = ["pending", "inferred", "unknown"].includes(layer.state) ? "⏳" : layer.ok ? "✓" : "✗";
        const tail = layer.note
          || (layer.broken.length ? JSON.stringify(layer.broken) : "")
          || (layer.pending && layer.pending.length ? `К применению #\${layer.pending.join("/#")}` : "");
        lines.push(`  ${mark} ${layer.title}  ${layer.applied}/${layer.required ?? layer.total}${tail ? "  " + tail : ""}`);
      }
      const pendingCount = (report.summary && report.summary.pending && report.summary.pending.patches) || 0;
      lines.push(
        "",
        report.state === "pending"
          ? `Итог: \${pendingCount} патчей ждут применения — нажмите «Применить» один раз, затем выйдите и снова откройте DSH.`
          : report.state === "broken"
            ? "Вывод: часть слоёв реально не работает (✗), см. выше."
            : ["unknown", "inferred"].includes(report.state)
              ? "Вывод: подтверждённых сбоев нет, но есть расчётные значения и неподтверждённые пункты — см. пояснения по слоям."
              : "Вывод: все слои на месте.",
      );
      if (rawArgs.includes("--text")) {
        console.log(lines.join("\n"));
        process.exit(report.state === "broken" ? 1 : 0);
      }
      result = { ok: report.ok, text: lines.join("\n"), summary: report.summary };
    }
  } else if (op === "host-status") {
    const { hostLayoutEvidence } = await import("../lib/host-layout.js");
    result = hostLayoutEvidence(aiBase);
  } else if (op === "diagnose") {
    const target = diagnosticHost();
    const drift = target
      ? await patchDrift(target, undefined, {surface:hostSurface(target),dshHome:home})
      : {host:"",state:"unknown",checked:0,drifted:[],optionalDrift:[],chained:[],missing:[],
          note:"Текущий экземпляр не определён; укажите DSH_BASE или PURGE_DSH_CLI — другие установки не сканируются"};
    result = { name: "Purge Community", package: PACKAGE, compatibility: compatibility(target), ...drift };
  } else if (op === "status")
    result = {
      name: "Purge Community",
      package: PACKAGE,
      compatibility: compatibility(aiBase),
      backups: (() => { try { return maintenance().list(); } catch { return []; } })(),
    };
  else if (op === "backup") result = await maintenance().backup("cli");
  else if (op === "prune") result = await maintenance().pruneLocked();
  else if (op === "usage") result = maintenance().usage();
  else if (op === "rollback") result = await maintenance().rollback(argument);
  else if (op === "install" || op === "migrate") {
    if (!argument) throw Error("Нужен путь к пакету установки");
    result = await maintenance().install(path.resolve(argument), {
      reason: op === "migrate" ? "before-migration" : "before-update",
      migrate: op === "migrate",
    });
  } else
    throw Error(
      "Использование: purge-community status | host-status | diagnose | selfcheck [--json] | boost on|off | rewind on|off | probe [new] | audit [--limit n] | preset [status|install] | backup [prune|usage] | rollback <ID резервной копии> | migrate <tgz> | apply | revert | uninstall | edit",
    );
  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
}
