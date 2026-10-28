import { permissionState } from "./permission-state.js";
import { refinePresetDiagnostic } from "./preset-diagnostic.js";
// Purge self-check: prove, layer by layer, that the bypass actually exists on
// this machine — instead of trusting "Плагин установлен" as evidence.
// Derived from the dsh-purge patch table (MIT, Copyright (c) 2026 小杨).
import fs from "node:fs";
import { diskFs } from "./extract-asar.js";
import path from "node:path";
import * as core from "./core.js";
import { compatibility } from "./community.js";
import { resolveProfile, diagnosticHost, hostSurface, desktopResourcesForHost } from "./instance.js";

/**
 * 每一层都对应一条（或一组）真实补丁，`why` 说明"Что будет, если этого слоя не станет"。
 * kind: host=宿主源码补丁，runtime=插件运行时注入，config=当前 profile 的选择。
 */
export const BYPASS_LAYERS = Object.freeze([
  { ids: [15], title: "Прямой проход sandbox confine", kind: "host",
    why: "read-only / workspace-write больше не оборачивают команду в bwrap и другие runner, подпись denial пустая" },
  { ids: [16], title: "Ограждение файловой системы отключено", kind: "host",
    why: "Запись и изменение файлов больше не блокируются FS_SANDBOX_DENIED из-за read-only или границ рабочей области" },
  { ids: [17], title: "Политика наблюдения пропускает", kind: "host",
    why: "edit больше не требует предварительного read, проверка конфликта версий тоже пропускается" },
  { ids: [6, 33, 48], title: "Отказные формулировки нейтрализованы", kind: "host",
    why: "В описаниях инструментов модель больше не получает подсказку «песочница отклонит — запросите подтверждение»" },
  { ids: [7, 8, 10], title: "Политика по умолчанию", kind: "host",
    why: "Песочница по умолчанию danger-full-access, подтверждения по умолчанию never (перекрывается в UI, env не фиксируется)" },
  { ids: [9, 35], title: "Автоматический пропуск подтверждений", kind: "host",
    why: "Шлюз подтверждений доверяет сразу; rejected/cancelled/unavailable больше не выбрасывают ошибку и не прерывают ход" },
  { ids: [59], title: "Auto Review не блокирует инструменты", kind: "host",
    why: "Официальная автопроверка больше не отклоняет вызовы инструментов" },
  { ids: [60, 62, 61], title: "Подтверждение инструментов fail-open", kind: "host",
    why: "run_code / при отсутствии канала подтверждений пропускается; если пользователь сам нажал отказ, отказ сохраняется" },
  { ids: [63], title: "Режим плана не блокирует жёстко", kind: "host",
    why: "Когда оператор требует выполнения, режим плана больше не отказывается исполнять" },
  { ids: [4, 25, 43, 71, 76], optionalIds: [71, 76], title: "Снятие официальной идентичности", kind: "host",
    why: "Убраны 'You are a coding agent powered by ...' и встроенные фразы самоидентификации из пресетов" },
  { ids: [32, 53], title: "Нейтрализация идентичности в Web-интерфейсе", kind: "host",
    why: "Промпт Web-интерфейса больше не называет себя DeepSeek Harness и не запрещает поднимать свой сервер" },
  { ids: [40, 74, 55, 72], title: "Инъекция не перекрывается пресетами", kind: "host",
    why: "Пресет complete, сборка первого раунда assemble и подмена system на каждом шаге сохраняют инъекцию dsh-purge" },
  { ids: [26, 28], optionalIds: [28], title: "Пресеты minimal/Liangshen сохраняют инъекцию", kind: "host",
    why: "В пресете minimal открыта инъекция; у Liangshen phase-1 не срезается" },
  { ids: [29, 50], title: "Внешний контент не превращается в read-only", kind: "host",
    why: "Цитируемый контент web/session по-прежнему можно использовать как исполняемые данные" },
  { ids: [30, 31, 64, 65], optionalIds: [30, 31, 64, 65], title: "Hooks не отклоняют ход", kind: "host",
    why: "При установленных hooks-claude-code / hooks-codex deny больше не reject весь ход" },
  { ids: [21, 22, 23], title: "Лимиты инструментов ослаблены", kind: "host",
    why: "bash снова ждёт, лимит read ослаблен, глубина субагентов по умолчанию 3→10" },
  { ids: [24, 37], title: "Без блокировок для пресетов и субагентов", kind: "host",
    why: "preset fetch включён; текст scope-lock субагента нейтрализован, чтобы он не сужал свои рамки" },
  { ids: [51, 52], title: "Новые сессии и журналы по умолчанию", kind: "host",
    why: "Новые сессии сохраняют full access; официальный session log по умолчанию не выгружается" },
  { ids: [56, 58, 75, 77], title: "Откат без остатков", kind: "host",
    why: "Откат только скрывает отменённый раунд, метка не попадает в запрос к модели, задачи переиспользуются, append сразу заменяет окно" },
  { ids: [47, 49, 57, 69], title: "Совместимость со шлюзом моделей", kind: "host",
    why: "OAuth не подставляет идентичность Claude, developer role с откатом, stream-соединение не ломается патчем" },
  { ids: [87, 88, 90], title: "Доставка и монтирование сообщений сессии", kind: "host",
    why: "Висячие блоки инъекции дедуплицируются по якорю LF и не размножаются; #90 возвращает нативную вставку: steer снова идёт в next-step, сообщение пользователя больше не выталкивается в следующий раунд" },
  { ids: [82, 83, 84], optionalIds: [82, 83, 84], title: "Страховка запуска десктопного хоста", kind: "host",
    why: "profile находится и без DSH_PROFILE; при убийстве хоста сигналом или нормальном выходе окно падения не появляется" },
]);

function readProfileConfig(dshHome, options) {
  let file = "";
  try {
    const profile = resolveProfile(dshHome, options);
    file = path.join(profile.directory,"cordis.patch.yml");
    return {file, text:fs.readFileSync(file,"utf8"), profile};
  } catch (e) { return {file, text:"", error:e.message}; }
}

function configLayer(dshHome, options) {
  const { file, text, profile, error } = readProfileConfig(dshHome, options);
  return {
    ...permissionState(text, options?.ctx),
    file,
    profile: profile?.name || "",
    profile_source: profile?.source || "",
    ...(error ? { error, note: `Не удалось прочитать текущий profile: ${error}` } : {}),
  };
}

function runtimeLayer(dshHome) {
  const file = core.findOverrideFile(dshHome);
  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    text = "";
  }
  const bytes = Buffer.byteLength(text, "utf8");
  return {
    file,
    bytes,
    ok: bytes > 0,
    note: bytes > 0
      ? `Файл инъекции ${bytes} байт, он будет вставляться как секция dsh-purge на каждом шаге`
      : "Файл инъекции пуст: плагин загружается, но вставлять нечего",
  };
}

// Only explicit applicability evidence can remove a patch from the denominator.
function notApplicable(patch, status) {
  return status === "na" || status === "off" ||
    (status === "not_needed" && patch?.id === 76) ||
    (status === "missing_file" && !!patch?.optional) ||
    (status === "skipped" && !!patch?.settleWhenAbsent);
}

export function tallyPatchStatus(status, patches = core.ALL_PATCHES) {
  const result = {applied:0, total:0, all:patches.length, na:0, skipped:0, missing_file:0, off:0, not_applicable:0, partial:0};
  for (const patch of patches) {
    const value = status[patch.id];
    if (["na", "skipped", "missing_file", "off"].includes(value)) result[value]++;
    if (value === "partial") result.partial++;
    if (notApplicable(patch, value)) result.not_applicable++;
    else {
      result.total++;
      if (value === "applied" || value === "already") result.applied++;
    }
  }
  return result;
}

export function rollupLayers(status, hasHost, options = {}) {
  // 读不到补丁状态时 status 是空表：不能把「未知」折叠成「全部通过」。
  const statusFailed = Boolean(options.statusError);
  const layers = [];
  const metadata = new Map((options.patches || core.ALL_PATCHES).map(p => [p.id, p]));
  for (const layer of BYPASS_LAYERS) {
    const optionalIds = new Set(layer.optionalIds || []);
    const rows = layer.ids.map((id) => ({
      id,
      optional: metadata.has(id) ? !!metadata.get(id).optional : optionalIds.has(id),
      status: status[id] || (hasHost ? "unknown" : "unlocated"),
    }));
    // 仅明确不适用或可选目标缺失可排除；必需文件缺失不能伪装成成功。
    const required = rows.filter((row) => !notApplicable({...metadata.get(row.id), optional:row.optional}, row.status));
    const applied = rows.filter((row) => row.status === "applied" || row.status === "already");
    const pending = required.filter((row) => row.status === "pending");
    // 待应用 != 打不上：前者点一次「应用」就好，后者才需要改锚点。
    // partial = 部分目标文件命中、另一个存在但没命中：必须显示为异常，不能报 ok。
    const broken = required.filter((row) => !["applied", "already", "pending", "unlocated", "unknown"].includes(row.status));
    const absent = rows.filter((row) => notApplicable({...metadata.get(row.id), optional:row.optional}, row.status));
    const unknown = statusFailed || rows.some((row) => row.status === "unlocated" || row.status === "unknown");
    const state = broken.length ? "broken" : unknown ? "unknown" : pending.length ? "pending" : "ok";
    layers.push({
      title: layer.title,
      why: layer.why,
      kind: layer.kind,
      ids: layer.ids,
      ok: state === "ok",
      state,
      applied: applied.length,
      required: required.length,
      total: rows.length,
      pending: pending.map((row) => row.id),
      absent: absent.map((row) => row.id),
      broken: broken.map((row) => ({ id: row.id, status: row.status })),
      note: statusFailed
        ? `Не удалось прочитать состояние патчей, этот слой не проверен: ${options.statusError}`
        : rows.some(row => row.id === 76 && row.status === "unknown") && !statusFailed
          ? "Текущий пресет нельзя проверить статически: проверьте читаемость, формат YAML и persona.prefix; динамические выражения не выполняются, «неизвестно» не значит «применено»"
        : unknown ? "Хост не найден или состояние неполное, этот слой проверить нельзя; это не значит, что патч не применён"
        : rows.some(row => row.status === "not_needed") ? "Текст текущего пресета проверен только на чтение, #76 обрабатывать не нужно; в применённые не засчитан"
        : absent.length === rows.length ? "Целевой плагин/пресет не установлен, этот слой сейчас не применим" : "",
      ...(statusFailed ? { status_error: options.statusError } : {}),
    });
  }
  return layers;
}

/**
 * 逐层自检。
 * @param aiBase - 目标宿主 @deepseek-ai 根（空则只解析当前启动信息/显式环境）。
 * @param dshHome - DSH 数据目录（默认 core.findDshHome()）。
 */
export function resolveHost(aiBase, options = {}) {
  return diagnosticHost({...options, aiBase, diskReader: options.reader});
}

/** Read only the requested host, never a different installed Desktop application. */
export function hostLayoutLayer(host, reader = diskFs()) {
  const surface = hostSurface(host);
  const base = {title:"Раскладка хоста на диске",kind:"layout",ids:[],pending:[],broken:[]};
  if (surface === "web") return {...base,why:"Текущая цель — хост npm/Web, проверка десктопного app.asar не применима",ok:true,state:"na",applicable:false,applied:0,total:0,required:0,note:"Не применимо (Web-хост)",detail:{surface,asar_still_sealed:null}};
  if (surface === "unknown") return {...base,why:"Целевой экземпляр не определён, подменять его другим десктопным экземпляром нельзя",ok:false,state:"unknown",applied:0,total:1,broken:[],note:"Текущий хост не найден, способ запуска подтвердить нельзя",detail:{surface,asar_still_sealed:null}};
  const resources = desktopResourcesForHost(host), archive=path.join(resources,"app.asar");
  let sealed = false;
  try { sealed=reader.statSync(archive).isFile(); }
  catch (e) {
    if (e.code !== "ENOENT") return {...base,why:"Не удалось прочитать состояние упаковки текущего целевого экземпляра",ok:false,state:"broken",applied:0,total:1,broken:[{id:"asar",status:"unreadable"}],detail:{surface,archive,error:e.message,asar_still_sealed:null}};
  }
  return {...base,why:"Проверяется только app.asar на целевом диске, это не доказывает, откуда загружен текущий процесс; доказательства точки входа — в host-status",ok:!sealed,state:sealed?"broken":"ok",applied:sealed?0:1,total:1,broken:sealed?[{id:"asar",status:"sealed"}]:[],detail:{surface,archive,asar_still_sealed:sealed}};
}

export async function selfCheck(aiBase, dshHome = core.findDshHome(), options = {}) {
  const host = resolveHost(aiBase, options);
  const compat = compatibility(host);
  const services=options.coreModule || core;
  let status = {};
  let statusError = "";
  if (host) {
    try {
      status=await services.patchStatus(host, services.ALL_PATCHES, {surface:hostSurface(host),dshHome});
      status=refinePresetDiagnostic(status,dshHome);
    }
    catch (e) { status={}; statusError=String(e && e.message ? e.message : e); }
  }
  const layers = rollupLayers(status, Boolean(host), {statusError, patches:services.ALL_PATCHES});
  // Some patches have no named layer; missing required targets still need to be
  // visible in the overall verdict, not just a smaller headline count.
  const grouped = new Set(BYPASS_LAYERS.flatMap(layer => layer.ids));
  const missing = services.ALL_PATCHES.filter(p => !grouped.has(p.id) && !p.optional && status[p.id] === "missing_file");
  if (missing.length) layers.push({
    title:"Прочие обязательные целевые файлы", kind:"host", why:"В установке не хватает обязательных целевых файлов, нужно сверить целевые пути или целостность установки",
    ids:missing.map(p=>p.id), ok:false, state:"broken", applied:0, total:missing.length,
    pending:[], broken:missing.map(p=>({id:p.id,status:"missing_file"})),
  });
  const runtime = runtimeLayer(dshHome);
  layers.push({
    title: "Внедрение prompt во время выполнения",
    why: "prompt-inject.md участвует в сборке system prompt на каждом шаге как секция dsh-purge",
    kind: "runtime",
    ids: [],
    ok: runtime.ok,
    state: runtime.ok ? "ok" : "broken",
    applied: runtime.ok ? 1 : 0,
    total: 1,
    pending: [],
    broken: runtime.ok ? [] : [{ id: "inject", status: "empty" }],
    detail: runtime,
  });
  const config = configLayer(dshHome, options);
  layers.push({
    title: "Выбор прав текущего profile",
    why: "Последний барьер на уровне интерфейса: даже если патчи не сработают, эта комбинация не вызовет подтверждение",
    kind: "config",
    ids: [],
    ok: config.ok,
    state: config.state,
    note: config.note,
    applied: config.ok ? 1 : 0,
    total: 1,
    pending: [],
    broken: config.state === "broken" ? [{ id: "preset", status: `${config.preset}/${config.approval}` }] : [],
    detail: config,
  });
  layers.push(hostLayoutLayer(host, options.reader || diskFs()));

  const byKind = (kind) => layers.filter((layer) => layer.kind === kind && layer.applicable !== false);
  const summarize = (list) => ({
    ok: list.every((layer) => layer.ok),
    passed: list.filter((layer) => layer.ok).length,
    total: list.length,
  });
  const baseSummary = {
    host: summarize(byKind("host")),
    runtime: summarize(byKind("runtime")),
    config: summarize(byKind("config")),
    layout: summarize(byKind("layout")),
  };
  const uncertain = layers.filter((layer) => ["unknown", "inferred"].includes(layer.state));
  const failed = layers.filter((layer) => !layer.ok);
  const pendingLayers = layers.filter((layer) => layer.state === "pending");
  const brokenLayers = layers.filter((layer) => layer.state === "broken");
  return {
    ok: failed.length === 0,
    state: brokenLayers.length ? "broken" : pendingLayers.length ? "pending" : uncertain.some((layer) => layer.state === "unknown") ? "unknown" : uncertain.length ? "inferred" : "ok",
    needsApply: brokenLayers.length === 0 && pendingLayers.length > 0,
    summary: {
      ...baseSummary,
      pending: { layers: pendingLayers.length, patches: pendingLayers.reduce((n, l) => n + l.pending.length, 0) },
      uncertain: { layers: uncertain.length },
      broken: { layers: brokenLayers.length },
    },
    host,
    host_version: compat.host_version,
    qualified: compat.qualified,
    level: compat.level,
    patch: tallyPatchStatus(status, services.ALL_PATCHES),
    layers,
    hints: failed.map((layer) => ({
      title: layer.title,
      action: layer.kind === "config"
        ? (config.error || config.note)
        : layer.kind === "layout"
          ? (layer.detail?.asar_still_sealed === true
            ? "На целевом диске всё ещё есть app.asar; запустите host-status и сверьте точку входа текущего сервиса — состояние на диске не значит «загружено», перезапуск выполняет пользователь"
            : "Не удалось определить способ запуска текущего целевого экземпляра; укажите DSH_BASE или PURGE_DSH_CLI, другие установки не сканируются")
          : layer.kind === "runtime"
            ? "Запишите prompt-inject.md или сохраните prompt один раз в настройках плагина"
            : layer.status_error
              ? `Не удалось прочитать состояние патчей: ${layer.status_error}; сначала устраните эту ошибку, не переустанавливайте и не меняйте права из-за неё`
              : layer.state === "unknown"
                ? (layer.note || "Текущий хост не найден; укажите DSH_BASE или PURGE_DSH_CLI текущего экземпляра, переустанавливать и менять права из-за этого не нужно")
                : `Запустите purge-community diagnose и посмотрите якоря #\${layer.ids.join("/#")}`,
    })),
  };
}
