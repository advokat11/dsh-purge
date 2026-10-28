#!/usr/bin/env node

import * as core from "../lib/core.js";
import * as rules from "../lib/rules.js";

const args = process.argv.slice(2);

function printStatus(state) {
  const out = [];
  out.push("dsh-purge статус / Status");
  out.push("  Хост / surface " + (state.surface || "web"));
  out.push("  DSH_HOME      " + state.dsh_home);
  if (state.desktop_install) out.push("  Десктопная установка       " + state.desktop_install);
  if (state.ai_base) {
    out.push("  Корень плагина / root  " + state.ai_base);
    for (const [key, fp] of Object.entries(state.files)) {
      out.push(`    ${key.padEnd(22)} ${fp}`);
    }
  } else {
    out.push("  Корень плагина / root  " + core.missingAiBaseMessage());
  }
  out.push(`  каталог shim      \${state.shim_dir || "Не найден / not found"}`);
  out.push(`  бэкап / backup  \${state.has_backup ? "Есть / yes" : "Нет / no"}`);
  out.push(`  файл инъекции       \${state.override_path}`);
  out.push(`  статус инъекции       \${state.override_status}`);
  out.push("");
  out.push(`  Патчи ${state.patches_applied}/${core.ALL_PATCHES.length} очищено, ${state.patches_pending} ожидает очистки`);
  for (const p of core.ALL_PATCHES) {
    const s = state.patch_status[p.id];
    const mark = s === "applied" ? "✓" : s === "pending" ? "✗" : "·";
    out.push(`    ${mark} [#${String(p.id).padEnd(2)}] ${p.name.padEnd(30)} ${p.layer}/${p.layer_en} — ${s}`);
  }
  out.push("");
  out.push(`  shim: dsh.cmd=${state.shim_cmd}  dsh.ps1=${state.shim_ps1}  dsh=${state.shim_bin}`);
  return out.join("\n");
}

async function main() {
  const mode = args.find((a) => ["--apply", "--revert", "--uninstall", "--status", "--edit", "--help"].includes(a));

  if (mode === "--help" || args.includes("-h")) {
    console.log(`Использование dsh-purge:
  dsh-purge --status     показать статус
  dsh-purge --apply      применить всю очистку (промпт+код+shim+override)
  dsh-purge --revert     откатить изменения назад
  dsh-purge --uninstall  удалить плагин (если применено — сначала откат)
  dsh-purge --edit       редактировать файл инъекции prompt-inject.md
  dsh-purge --help       справка`);
    return;
  }

  const state = await core.gatherState();
  console.log(printStatus(state));
  console.log("");

  if (mode === "--apply") {
    if (!state.ai_base) {
      console.log("[ERROR] " + core.missingAiBaseMessage());
      console.log("  fix: укажите DSH_BASE на каталог @deepseek-ai, содержащий dsh-agent-instructions/lib");
      process.exit(1);
    }
    const inject = rules.resolveInjectText(state.dsh_home);
    if (!inject.text) {
      console.log("[ERROR] prompt и набор правил пусты — сначала добавьте prompt");
      process.exit(1);
    }
    const { hosts, report } = await core.applyPatchesAllHosts(core.ALL_PATCHES, {
      preserveClientBundles: false,
      forApply: true,
    });
    for (const h of hosts) console.log(`  Хост / host → ${h.aiBase}`);
    for (const r of report) {
      const m = r.status === "applied" ? "✓ Очищено" : r.status === "already" ? "- Уже актуально" : r.status === "missing_file" ? "⚠ Файл отсутствует" : `✗ ${r.status}`;
      console.log(`  ${m} patch #${String(r.patch_id).padEnd(2)} ${r.name}`);
    }
    const flashHost = hosts[0]?.aiBase || state.ai_base;
    const flash = core.silenceCmdFlash(flashHost);
    console.log(`  cmd-flash=${flash.entry} phase-1=${flash.phase1} ok=${flash.ok}`);
    if (hosts.length > 1) {
      console.log(`  Мультихост / multi-host: ${hosts.length} копий @deepseek-ai очищено`);
    }
    console.log(inject.source === "rule"
      ? "  - использовать текущий набор правил, файл prompt не перезаписывается"
      : "  - использовать существующий файл prompt");
    if (state.shim_dir) {
      const r = await core.patchShim(state.shim_dir);
      for (const [fname, st] of Object.entries(r)) {
        if (st === "patched") console.log(`  ✓ shim ${fname} внедрён / injected`);
        else if (st === "already_patched") console.log(`  - shim ${fname} уже внедрён / already injected`);
        else if (st === "missing") console.log(`  - shim ${fname} отсутствует / missing`);
        else console.log(`  ⚠ shim ${fname}: ${st}`);
      }
    } else {
      console.log("  ⚠ каталог shim не найден, внедрение пропущено");
    }
    console.log("");
    console.log("Всё готово / All done. Перезапустите dsh, чтобы изменения вступили в силу / Restart dsh to take effect.");
  } else if (mode === "--revert") {
    if (state.ai_base || core.enumeratePatchAiBases().length) {
      const { reverted, errors } = await core.revertAllHosts();
      for (const p of reverted) console.log(`  ✓ Восстановлено / Reverted ${p}`);
      for (const [p, e] of errors) console.log(`  ⚠ Ошибка восстановления ${p}: ${e}`);
      if (reverted.length === 0) console.log("  - Нет резервной копии патчей / no patch backup");
    }
    if (state.shim_dir) {
      const r = await core.revertShim(state.shim_dir);
      for (const [fname, st] of Object.entries(r)) {
        if (st === "reverted" || st === "stripped_inject") console.log(`  ✓ shim ${fname}: ${st}`);
        else console.log(`  - shim ${fname}: ${st}`);
      }
    }
    console.log("");
    console.log("Откат выполнен / Revert done. Восстановится после перезапуска dsh / restart to restore.");
    console.log("Прим.: prompt-inject.md сохраняется (файл пользователя) / prompt-inject.md kept (user file)");
  } else if (mode === "--uninstall") {
    const { uninstallPurge, finishUninstallCleanup } = await import("../lib/uninstall.js");
    const result = await finishUninstallCleanup(await uninstallPurge());
    if (result.applied) console.log("  Патчи обнаружены, восстановлена исходная версия.");
    else console.log("  Применённых патчей не обнаружено, файлы плагина всё равно будут удалены.");
    if (result.override?.removed) console.log(`  Удалено ${result.override.path}`);
    if (result.stripped?.length) console.log(`  Удалено из profile: \${result.stripped.join(", ")}`);
    for (const e of result.errors || []) console.log(`  ⚠ ${e}`);
    if (!result.ok) {
      console.log("  Удаление не завершено: проверьте ошибки восстановления, отмены регистрации или очистки файлов выше.");
      process.exit(1);
    }
    console.log("");
    console.log("Удаление завершено. Перезапустите dsh.");
  } else if (mode === "--edit") {
    const r = core.editOverride(state.dsh_home);
    if (!r.ok && r.needCreate) {
      await core.installOverride(state.dsh_home, true);
      console.log(`  ✓ Создан файл инъекции по умолчанию: ${state.override_path}`);
      core.editOverride(state.dsh_home);
    } else {
      console.log(`  → Открыт ${r.editor} для редактирования файла инъекции: ${r.path}`);
    }
    console.log("  После редактирования перезапустите dsh, чтобы изменения вступили в силу.");
  } else {
    console.log("По умолчанию очистка не выполняется, примените её через --apply.");
  }
}

main().catch((e) => {
  console.error("[dsh-purge] error:", e);
  process.exit(1);
});
