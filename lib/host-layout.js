import { readDesktopHandoff } from './desktop-handoff.js';
/** Read-only evidence: on-disk layout is not proof of loaded process code. */
import path from "node:path";
import { diskFs } from "./extract-asar.js";
import { desktopResourcesForHost, hostSurface } from "./instance.js";

export function hostLayoutEvidence(host, options = {}) {
  const reader = options.reader || diskFs();
  const argv = options.argv || process.argv;
  const execArgv = options.execArgv || process.execArgv;
  const resources = desktopResourcesForHost(host);
  const disk = { surface: hostSurface(host), archive_exists: null, unpacked_exists: null };
  const errors = [];
  const probe = (file, kind) => {
    try { return reader.statSync(file)[kind](); }
    catch (error) {
      if (error.code === "ENOENT") return false;
      errors.push({ code: error.code || "UNKNOWN", message: error.message });
      return null;
    }
  };
  if (resources) {
    disk.archive_exists = probe(path.join(resources, "app.asar"), "isFile");
    disk.unpacked_exists = probe(path.join(resources, "app"), "isDirectory");
  }
  // Never scan all argv strings: prompts or unrelated file arguments are not
  // process entry evidence. Do not return env, tokens or the full command line.
  const flags = [...execArgv, ...argv];
  let entry = "", source = "unknown";
  for (let i = 0; i < flags.length; i++) {
    if (flags[i]?.startsWith("--app-path=")) {
      entry = flags[i].slice(11); source = "app-path"; break;
    }
    if (flags[i] === "--app-path" && flags[i + 1]) {
      entry = flags[i + 1]; source = "app-path"; break;
    }
  }
  if (!entry && argv[1] && !argv[1].startsWith("-")) {
    entry = argv[1]; source = "script";
  }
  const normalized = String(entry).replace(/\\/g, "/");
  const match = /^(.*\/resources)\/(app\.asar|app\.asar\.unpacked|app)(?:\/|$)/i.exec(normalized);
  let layout = "unknown", matches_target = null;
  if (match) {
    layout = match[2].toLowerCase() === "app.asar" ? "archive" : "unpacked";
    const normalize = value => {
      const v = path.normalize(value).replace(/\\/g, "/");
      return (options.platform || process.platform) === "win32" ? v.toLowerCase() : v;
    };
    matches_target = resources ? normalize(match[1]) === normalize(resources) : false;
  } else { source = "unknown"; }
  const state = errors.length ? "unreadable"
    : matches_target === false ? "different_instance"
    : layout === "unknown" ? "unknown_runtime"
    : layout === "archive" ? "archive_entry" : "unpacked_entry";
  const notes = {
    unreadable: "Не удалось прочитать раскладку на диске; подтвердить работающую версию нельзя.",
    different_instance: "Точка входа текущего сервиса отличается от выбранной установки; этим процессом нельзя доказать, что цель загружена.",
    unknown_runtime: "Не получено доказательств десктопной точки входа текущего сервиса; наличие архива и счётчик записей на диск не доказывают загрузку.",
    archive_entry: "Точка входа текущего сервиса указывает на app.asar; это не значит, что содержимое каталога на диске загружено.",
    unpacked_entry: "Точка входа текущего сервиса указывает на распакованный каталог; расположение точки входа не доказывает, что записанное позже содержимое перезагружено.",
  };
  return {
    state, disk,
    handoff: resources ? (readDesktopHandoff(path.join(resources, "app.asar"), options.platform) || {phase:"not_scheduled"}) : {phase:"unknown_target"},
    process: { pid: options.pid ?? process.pid, entry_layout: layout, source, matches_target },
    note: notes[state],
    ...(errors.length ? { errors } : {}),
  };
}
