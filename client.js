// Generated from src/ by npm run build. Do not edit.
// Derived UI: YuJunZhiXue/dsh-purge (MIT), see LICENSE.
window.__ModuleLoader__.load({id:"dsh-purge-community",factory:(require)=>{
var module={exports:{}};var exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entry.js
var entry_exports = {};
__export(entry_exports, {
  PanelOverlays: () => PanelOverlays,
  PurgeIcon: () => PurgeIcon,
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(entry_exports);

// src/shared/react.js
var import_react = __toESM(require("react"), 1);
var h = import_react.default.createElement;
var { useState, useEffect, useCallback, useRef, Component } = import_react.default;

// src/styles/base.css
var base_default = '.dshpp-root {\n  --dshpp-display:\n    "Songti SC", "Noto Serif SC", "Iowan Old Style", Palatino,\n    "Palatino Linotype", Georgia, serif;\n  --dshpp-sans:\n    "Yu Gothic UI", "Hiragino Sans GB", "Source Han Sans SC", system-ui,\n    sans-serif;\n  --dshpp-mono: "Cascadia Mono", "Sarasa Mono SC", ui-monospace, monospace;\n  --dshpp-ease: cubic-bezier(0.16, 1, 0.3, 1);\n  max-width: 920px;\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n  padding: 16px;\n  border-radius: 12px;\n  background: var(--dshpp-bg);\n  color: var(--dshpp-ink);\n  font-family: var(--dshpp-sans);\n}\n.dshpp-root {\n  --dshpp-bg: transparent;\n  --dshpp-paper: color-mix(\n    in srgb,\n    var(--dsw-alias-bg-layer-1, #f6f4ef) 74%,\n    transparent\n  );\n  --dshpp-ink: var(--dsw-alias-label-primary, #1a1916);\n  --dshpp-mute: color-mix(\n    in srgb,\n    var(--dsw-alias-label-primary, #1a1916) 74%,\n    var(--dsw-alias-label-secondary, #5c564c)\n  );\n  --dshpp-line: color-mix(\n    in srgb,\n    var(--dsw-alias-border-l1, #c8c2b6) 78%,\n    transparent\n  );\n  --dshpp-fill: color-mix(\n    in srgb,\n    var(--dsw-alias-brand-primary, #6d8f78) 14%,\n    transparent\n  );\n  --dshpp-accent: var(--dsw-alias-brand-primary, #3f6b52);\n  --dshpp-accent-soft: color-mix(\n    in srgb,\n    var(--dsw-alias-brand-primary, #6d8f78) 18%,\n    transparent\n  );\n  --dshpp-ok: #1f7a45;\n  --dshpp-warn: #8a5a12;\n  --dshpp-bad: #9a3434;\n}\n.dshpp-root[data-theme="white"] {\n  color-scheme: light;\n}\n.dshpp-root[data-theme="dusk"] {\n  color-scheme: dark;\n  --dshpp-ok: #8fd0a8;\n  --dshpp-warn: #e4c48a;\n  --dshpp-bad: #f0b4b4;\n}\n.dshpp-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.dshpp-switch {\n  display: inline-flex;\n  border: 1px solid var(--dshpp-line);\n  border-radius: 999px;\n  overflow: hidden;\n  background: var(--dshpp-paper);\n}\n.dshpp-switch button {\n  appearance: none;\n  border: 0;\n  background: transparent;\n  color: var(--dshpp-mute);\n  font: 12px/1 var(--dshpp-sans);\n  padding: 6px 14px;\n  cursor: pointer;\n}\n.dshpp-switch button.is-on {\n  background: var(--dshpp-accent-soft);\n  color: var(--dshpp-ink);\n}\n.dshpp-switch button:focus-visible {\n  outline: 2px solid var(--dshpp-accent);\n  outline-offset: -2px;\n}\n.dshpp-panel {\n  border: 1px solid var(--dshpp-line);\n  background: var(--dshpp-paper);\n  border-radius: 10px;\n  padding: 18px 18px 16px;\n}\n.dshpp-kicker {\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: var(--dshpp-mute);\n  margin: 0 0 4px;\n}\n.dshpp-title {\n  font-family: var(--dshpp-display);\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: 0.02em;\n  line-height: 1.3;\n  margin: 0;\n  color: var(--dshpp-ink);\n}\n.dshpp-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.dshpp-sub {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 20px 0 10px;\n}\n.dshpp-sub h4 {\n  margin: 0;\n  font-family: var(--dshpp-display);\n  font-size: 15px;\n  font-weight: 500;\n}\n.dshpp-metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n  margin-bottom: 14px;\n}\n.dshpp-metric {\n  border: 1px solid var(--dshpp-line);\n  background: var(--dshpp-bg);\n  padding: 12px;\n  min-height: 68px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  border-radius: 8px;\n}\n.dshpp-metric b {\n  font-family: var(--dshpp-display);\n  font-size: 18px;\n  font-weight: 500;\n  line-height: 1.2;\n}\n.dshpp-metric span {\n  font-size: 11px;\n  color: var(--dshpp-mute);\n}\n.dshpp-bar {\n  height: 3px;\n  border-radius: 99px;\n  background: var(--dshpp-line);\n  overflow: hidden;\n  margin: 8px 0 14px;\n}\n.dshpp-bar > i {\n  display: block;\n  height: 100%;\n  background: var(--dshpp-accent);\n  width: 0;\n  transition: width 0.4s var(--dshpp-ease);\n}\n.dshpp-group {\n  border: 1px solid var(--dshpp-line);\n  margin: 0 0 8px;\n  background: var(--dshpp-bg);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.dshpp-group-h {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 9px 12px;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n  font: inherit;\n  text-align: left;\n}\n.dshpp-group-h:hover {\n  background: var(--dshpp-fill);\n}\n.dshpp-group-h:focus-visible {\n  outline: 2px solid var(--dshpp-accent);\n  outline-offset: -2px;\n}\n.dshpp-group-h strong {\n  font-family: var(--dshpp-display);\n  font-size: 14px;\n  font-weight: 500;\n}\n.dshpp-group-h em {\n  font-style: normal;\n  font-size: 12px;\n  color: var(--dshpp-mute);\n  flex: 1;\n}\n.dshpp-count {\n  font-family: var(--dshpp-mono);\n  font-size: 12px;\n  color: var(--dshpp-mute);\n}\n.dshpp-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12.5px;\n}\n.dshpp-table th {\n  text-align: left;\n  font-weight: 500;\n  font-size: 11px;\n  letter-spacing: 0.06em;\n  color: var(--dshpp-mute);\n  padding: 7px 12px;\n  border-bottom: 1px solid var(--dshpp-line);\n}\n.dshpp-table td {\n  padding: 8px 12px;\n  border-bottom: 1px solid var(--dshpp-line);\n  vertical-align: middle;\n}\n.dshpp-table tr:last-child td {\n  border-bottom: 0;\n}\n.dshpp-table tr.is-on td {\n  background: var(--dshpp-accent-soft);\n}\n.dshpp-id {\n  font-family: var(--dshpp-mono);\n  opacity: 0.75;\n  width: 42px;\n}\n.dshpp-actions {\n  text-align: right;\n  white-space: nowrap;\n}\n.dshpp-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dshpp-row + .dshpp-row {\n  margin-top: 10px;\n}\n.dshpp-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  padding: 2px 8px;\n  border: 1px solid var(--dshpp-line);\n  border-radius: 99px;\n  line-height: 1.6;\n  background: var(--dshpp-bg);\n}\n.dshpp-pill::before {\n  content: "";\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n}\n.dshpp-pill.is-ok {\n  color: var(--dshpp-ok);\n  border-color: color-mix(in srgb, var(--dshpp-ok) 30%, var(--dshpp-line));\n}\n.dshpp-pill.is-wait {\n  color: var(--dshpp-warn);\n  border-color: color-mix(in srgb, var(--dshpp-warn) 30%, var(--dshpp-line));\n}\n.dshpp-pill.is-miss {\n  color: var(--dshpp-mute);\n}\n.dshpp-pill.is-bad {\n  color: var(--dshpp-bad);\n}\n.dshpp-btn {\n  appearance: none;\n  font-family: var(--dshpp-sans);\n  font-size: 13px;\n  font-weight: 500;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 8px;\n  border: 1px solid transparent;\n  cursor: pointer;\n  transition:\n    background 0.15s var(--dshpp-ease),\n    opacity 0.15s var(--dshpp-ease);\n}\n.dshpp-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.dshpp-btn:focus-visible {\n  outline: 2px solid var(--dshpp-accent);\n  outline-offset: 2px;\n}\n.dshpp-btn-primary {\n  background: var(--dshpp-accent-soft);\n  color: var(--dshpp-ink);\n  border-color: color-mix(in srgb, var(--dshpp-accent) 35%, var(--dshpp-line));\n}\n.dshpp-btn-primary:hover:not(:disabled) {\n  background: color-mix(in srgb, var(--dshpp-accent) 22%, var(--dshpp-bg));\n}\n.dshpp-btn-ghost {\n  background: transparent;\n  color: var(--dshpp-ink);\n  border-color: var(--dshpp-line);\n}\n.dshpp-btn-danger {\n  background: transparent;\n  color: var(--dshpp-bad);\n  border-color: color-mix(in srgb, var(--dshpp-bad) 40%, var(--dshpp-line));\n}\n.dshpp-btn-solid-danger {\n  background: color-mix(in srgb, var(--dshpp-bad) 16%, var(--dshpp-bg));\n  color: var(--dshpp-bad);\n  border-color: color-mix(in srgb, var(--dshpp-bad) 30%, var(--dshpp-line));\n}\n.dshpp-btn-tiny {\n  min-height: 28px;\n  padding: 0 10px;\n  font-size: 12px;\n}\n.dshpp-field,\n.dshpp-area {\n  width: 100%;\n  box-sizing: border-box;\n  font: 13px/1.55 var(--dshpp-mono);\n  padding: 8px 10px;\n  background: var(--dshpp-bg);\n  color: var(--dshpp-ink);\n  border: 1px solid var(--dshpp-line);\n  border-radius: 8px;\n}\n.dshpp-field {\n  width: auto;\n  min-width: 140px;\n}\n.dshpp-cr-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin: 8px 0 0;\n  font-size: 13px;\n}\n.dshpp-cr-row label {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--dshpp-ink);\n}\n.dshpp-cr-num {\n  width: 64px;\n  min-width: 64px;\n  height: 28px;\n  padding: 0 8px;\n}\n.dshpp-cr-text {\n  width: 120px;\n  min-width: 88px;\n  height: 28px;\n  padding: 0 8px;\n}\n.dshpp-ver {\n  width: 100%;\n  min-width: 0;\n  max-width: none;\n  height: 32px;\n  padding: 0 10px;\n  font-size: 12px;\n}\n.dshpp-rel {\n  margin: 0 0 14px;\n}\n.dshpp-now {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin: 0 0 4px;\n}\n.dshpp-now-label {\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--dshpp-mute);\n}\n.dshpp-now-ver {\n  font-family: var(--dshpp-display);\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n}\n.dshpp-now-mark {\n  display: inline-flex;\n  align-items: center;\n  margin-left: 6px;\n  padding: 1px 7px;\n  border-radius: 99px;\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 1.5;\n  color: var(--dshpp-ok);\n  border: 1px solid color-mix(in srgb, var(--dshpp-ok) 38%, var(--dshpp-line));\n  background: color-mix(in srgb, var(--dshpp-ok) 14%, var(--dshpp-bg));\n}\n.dshpp-editions {\n  display: flex;\n  flex-direction: column;\n  margin: 10px 0 0;\n  border-top: 1px solid var(--dshpp-line);\n}\n.dshpp-edition {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 0;\n  border-bottom: 1px solid var(--dshpp-line);\n}\n.dshpp-edition-name {\n  display: inline-flex;\n  align-items: center;\n  gap: 0;\n  font-family: var(--dshpp-display);\n  font-size: 15px;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.dshpp-edition.is-on .dshpp-edition-name {\n  color: var(--dshpp-ink);\n}\n.dshpp-edition:not(.is-on) .dshpp-edition-name {\n  color: var(--dshpp-mute);\n}\n.dshpp-edition .dshpp-btn {\n  min-width: 118px;\n}\n.dshpp-rel .dshpp-notice {\n  display: block;\n  margin-top: 8px;\n  min-height: 16px;\n}\n@media (max-width: 560px) {\n  .dshpp-edition {\n    grid-template-columns: 1fr auto;\n    grid-template-areas: "name btn" "sel sel";\n  }\n  .dshpp-edition-name {\n    grid-area: name;\n  }\n  .dshpp-edition .dshpp-ver {\n    grid-area: sel;\n  }\n  .dshpp-edition .dshpp-btn {\n    grid-area: btn;\n  }\n}\n.dshpp-area {\n  min-height: 220px;\n  resize: vertical;\n}\n.dshpp-field:focus,\n.dshpp-area:focus {\n  outline: none;\n  border-color: var(--dshpp-accent);\n  box-shadow: 0 0 0 3px var(--dshpp-accent-soft);\n}\n.dshpp-field:disabled,\n.dshpp-area:disabled {\n  opacity: 0.5;\n}\n.dshpp-ask {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-top: 10px;\n  padding: 10px 12px;\n  border: 1px solid var(--dshpp-line);\n  border-radius: 8px;\n  background: var(--dshpp-bg);\n  font-size: 13px;\n}\n.dshpp-modal-bg {\n  position: fixed;\n  inset: 0;\n  z-index: 80;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  background: color-mix(in srgb, var(--dshpp-ink) 28%, transparent);\n}\n.dshpp-modal {\n  width: min(420px, 100%);\n  background: var(--dshpp-paper);\n  color: var(--dshpp-ink);\n  border: 1px solid var(--dshpp-line);\n  border-radius: 12px;\n  padding: 20px 20px 16px;\n  box-shadow: 0 16px 40px color-mix(in srgb, var(--dshpp-ink) 18%, transparent);\n}\n.dshpp-modal h4 {\n  margin: 0 0 8px;\n  font-family: var(--dshpp-display);\n  font-size: 18px;\n  font-weight: 500;\n}\n.dshpp-modal p {\n  margin: 0 0 16px;\n  font-size: 13.5px;\n  line-height: 1.55;\n}\n.dshpp-modal-ops {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.dshpp-restart-mask {\n  position: fixed;\n  inset: 0;\n  z-index: 12000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  background: rgba(0, 0, 0, 0.62);\n  font-family:\n    "Yu Gothic UI", "Hiragino Sans GB", "Source Han Sans SC",\n    "Microsoft YaHei UI", system-ui, sans-serif;\n}\n.dshpp-restart-card {\n  width: min(420px, 100%);\n  box-sizing: border-box;\n  padding: 22px 22px 18px;\n  border-radius: 14px;\n  background: var(--dsw-alias-bg-layer-1, #fffcf7);\n  color: var(--dsw-alias-label-primary, #16140f);\n  border: 1px solid var(--dsw-alias-border-l1, #c9c3b6);\n  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);\n}\n.dshpp-restart-card h4 {\n  margin: 0 0 10px;\n  font-family: inherit;\n  font-size: 20px;\n  font-weight: 650;\n  line-height: 1.35;\n  color: inherit;\n}\n.dshpp-restart-card p {\n  margin: 0 0 18px;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 1.65;\n  color: inherit;\n}\n.dshpp-restart-card .dshpp-modal-ops {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n}\n.dshpp-restart-card .dshpp-btn {\n  min-height: 38px;\n  padding: 0 16px;\n  font-size: 15px;\n  font-weight: 650;\n  color: var(--dsw-alias-label-primary, #16140f);\n  background: var(--dsw-alias-bg-layer-2, #fff);\n  border: 1px solid var(--dsw-alias-border-l1, #c9c3b6);\n}\n.dshpp-restart-card .dshpp-btn-primary,\n.dshpp-restart-card .dshpp-btn-primary:hover:not(:disabled) {\n  color: #fff;\n  background: #2f6b4f;\n  border-color: #2f6b4f;\n}\nbody[data-ds-dark-theme] .dshpp-restart-card,\n.dshpp-restart-mask[data-theme="dusk"] .dshpp-restart-card {\n  background: #1c1e24;\n  color: #f4f1ea;\n  border-color: #5a5e68;\n}\nbody[data-ds-dark-theme] .dshpp-restart-card .dshpp-btn,\n.dshpp-restart-mask[data-theme="dusk"] .dshpp-restart-card .dshpp-btn {\n  color: #f4f1ea;\n  background: #2a2d34;\n  border-color: #5a5e68;\n}\nbody[data-ds-dark-theme] .dshpp-restart-card .dshpp-btn-primary,\nbody[data-ds-dark-theme]\n  .dshpp-restart-card\n  .dshpp-btn-primary:hover:not(:disabled),\n.dshpp-restart-mask[data-theme="dusk"] .dshpp-restart-card .dshpp-btn-primary,\n.dshpp-restart-mask[data-theme="dusk"]\n  .dshpp-restart-card\n  .dshpp-btn-primary:hover:not(:disabled) {\n  color: #fff;\n  background: #3d8f68;\n  border-color: #3d8f68;\n}\n.dshpp-notice {\n  font-size: 12.5px;\n  line-height: 1.4;\n}\n.dshpp-notice.is-ok {\n  color: var(--dshpp-ok);\n}\n.dshpp-notice.is-bad {\n  color: var(--dshpp-bad);\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.dshpp-skel {\n  height: 12px;\n  border-radius: 6px;\n  background: linear-gradient(\n    90deg,\n    var(--dshpp-fill),\n    var(--dshpp-line),\n    var(--dshpp-fill)\n  );\n  background-size: 200% 100%;\n  animation: dshpp-pulse 1.2s ease-in-out infinite;\n}\n.dshpp-active {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  padding: 10px 12px;\n  margin-bottom: 12px;\n  border: 1px solid var(--dshpp-line);\n  background: var(--dshpp-bg);\n  border-radius: 8px;\n}\n.dshpp-active b {\n  font-family: var(--dshpp-display);\n  font-weight: 500;\n}\n.dshpp-empty {\n  padding: 28px 12px;\n  font-size: 13px;\n  color: var(--dshpp-mute);\n  text-align: center;\n}\n.dshpp-split {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.dshpp-rulelist {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--dshpp-line);\n  border-radius: 8px;\n  background: var(--dshpp-bg);\n  overflow: hidden;\n}\n.dshpp-rulebody {\n  max-height: 240px;\n  overflow: auto;\n}\n.dshpp-ruleitem {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  padding: 10px 12px;\n  border: 0;\n  border-bottom: 1px solid var(--dshpp-line);\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n.dshpp-ruleitem:hover {\n  background: var(--dshpp-fill);\n}\n.dshpp-ruleitem.is-edit {\n  background: var(--dshpp-accent-soft);\n}\n.dshpp-rule-main {\n  flex: 1;\n  min-width: 0;\n}\n.dshpp-rule-name {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--dshpp-display);\n  font-size: 14px;\n  line-height: 1.35;\n}\n.dshpp-rule-meta {\n  display: block;\n  margin-top: 3px;\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  color: var(--dshpp-mute);\n}\n.dshpp-rule-ops {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.dshpp-create {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 10px 12px;\n  border-top: 1px solid var(--dshpp-line);\n  background: var(--dshpp-paper);\n}\n.dshpp-create-row {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.dshpp-create .dshpp-field {\n  flex: 1;\n  min-width: 0;\n  width: auto;\n}\n.dshpp-editor {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  min-width: 0;\n  border: 1px solid var(--dshpp-line);\n  border-radius: 8px;\n  background: var(--dshpp-bg);\n  padding: 12px;\n  min-height: 320px;\n}\n.dshpp-editor .dshpp-area {\n  flex: 1;\n  min-height: 240px;\n}\n.dshpp-editor-empty {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--dshpp-mute);\n  font-size: 13px;\n  min-height: 160px;\n}\n.dshpp-block {\n  padding: 14px 0;\n  border-top: 1px solid var(--dshpp-line);\n}\n.dshpp-block-head {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin: 0 0 8px;\n}\n.dshpp-block-head h4 {\n  margin: 0;\n  font-family: var(--dshpp-display);\n  font-size: 14px;\n  font-weight: 500;\n  flex: 1;\n  color: var(--dshpp-ink);\n}\n.dshpp-block-hint {\n  margin: 8px 0 0;\n  font-size: 12px;\n  line-height: 1.55;\n  color: var(--dshpp-mute);\n}\n.dshpp-policy-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.dshpp-policy-row > label {\n  font-size: 12px;\n  color: var(--dshpp-mute);\n  flex: 0 0 auto;\n}\n.dshpp-cwd-path {\n  margin: 0 0 8px;\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  color: var(--dshpp-mute);\n  word-break: break-all;\n  line-height: 1.5;\n}\n.dshpp-cwd-list {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--dshpp-line);\n  border-radius: 8px;\n  background: var(--dshpp-bg);\n  overflow: hidden;\n}\n.dshpp-cwd-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--dshpp-line);\n  cursor: pointer;\n  margin: 0;\n}\n.dshpp-cwd-item:last-child {\n  border-bottom: 0;\n}\n.dshpp-cwd-item:hover {\n  background: var(--dshpp-fill);\n}\n.dshpp-cwd-item.is-on {\n  background: var(--dshpp-accent-soft);\n}\n.dshpp-cwd-item input {\n  margin: 3px 0 0;\n  flex: 0 0 auto;\n}\n.dshpp-cwd-main {\n  flex: 1;\n  min-width: 0;\n}\n.dshpp-cwd-name {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  font-family: var(--dshpp-display);\n  font-size: 13.5px;\n  line-height: 1.35;\n  color: var(--dshpp-ink);\n}\n.dshpp-cwd-badge {\n  font-family: var(--dshpp-mono);\n  font-size: 10px;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  padding: 1px 7px;\n  border-radius: 99px;\n  border: 1px solid var(--dshpp-line);\n  color: var(--dshpp-mute);\n  line-height: 1.6;\n}\n.dshpp-cwd-size {\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  color: var(--dshpp-mute);\n}\n.dshpp-cwd-sub {\n  margin-top: 3px;\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  color: var(--dshpp-mute);\n  word-break: break-all;\n}\n.dshpp-cwd-prev {\n  margin-top: 4px;\n  font-size: 11px;\n  line-height: 1.5;\n  color: var(--dshpp-mute);\n  max-height: 34px;\n  overflow: hidden;\n}\n@keyframes dshpp-pulse {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n@media (max-width: 640px) {\n  .dshpp-metrics {\n    grid-template-columns: 1fr;\n  }\n  .dshpp-ruleitem {\n    flex-wrap: wrap;\n  }\n  .dshpp-rule-ops {\n    width: 100%;\n    justify-content: flex-end;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .dshpp-btn,\n  .dshpp-bar > i {\n    transition: none;\n  }\n  .dshpp-skel {\n    animation: none;\n  }\n}\nbody:not([data-ds-dark-theme]) .dshpp-auth-modal {\n  background: color-mix(\n    in srgb,\n    var(--dsw-alias-bg-layer-1, #fffcf7) 92%,\n    transparent\n  );\n  color: var(--dsw-alias-label-primary, #1a1916);\n  border-color: color-mix(\n    in srgb,\n    var(--dsw-alias-border-l1, #c9c3b6) 80%,\n    transparent\n  );\n  backdrop-filter: blur(18px) saturate(1.3);\n  -webkit-backdrop-filter: blur(18px) saturate(1.3);\n}\nbody:not([data-ds-dark-theme]) .dshpp-auth-legal {\n  background: color-mix(\n    in srgb,\n    var(--dsw-alias-bg-layer-2, #f3f0e8) 90%,\n    transparent\n  );\n  color: var(--dsw-alias-label-primary, #1a1916);\n  border-color: color-mix(\n    in srgb,\n    var(--dsw-alias-border-l1, #c9c3b6) 80%,\n    transparent\n  );\n}\nbody:not([data-ds-dark-theme]) .dshpp-auth-warn {\n  background: color-mix(in srgb, #f5e6c8 88%, transparent);\n  color: #6b4a10;\n}\nbody:not([data-ds-dark-theme]) .dshpp-auth-ops button {\n  border-color: var(--dsw-alias-border-l1, #c9c3b6);\n  color: var(--dsw-alias-label-primary, #1a1916);\n  background: color-mix(\n    in srgb,\n    var(--dsw-alias-bg-layer-1, #fff) 88%,\n    transparent\n  );\n}\nbody:not([data-ds-dark-theme]) .dshpp-auth-ops button.primary {\n  background: var(--dsw-alias-brand-primary, #3f6b52);\n  border-color: var(--dsw-alias-brand-primary, #3f6b52);\n  color: #fff;\n}\n.dshpp-auth-mask {\n  position: fixed;\n  inset: 0;\n  z-index: 10100;\n  background: rgba(0, 0, 0, 0.62);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  pointer-events: auto;\n}\n.dshpp-auth-modal {\n  width: min(680px, 100%);\n  max-height: min(88vh, 820px);\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 16px;\n  border: 1px solid var(--dsw-alias-border-l1, #333);\n  border-radius: 12px;\n  background: var(--dsw-alias-bg-layer-1, #1a1a1a);\n  color: var(--dsw-alias-label-primary, #eee);\n}\n.dshpp-auth-modal h2 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n}\n.dshpp-auth-warn {\n  padding: 8px 10px;\n  border-radius: 8px;\n  background: #3a2e18;\n  color: #f0d48a;\n  font-size: 13px;\n}\n.dshpp-auth-legal {\n  overflow: auto;\n  height: 300px;\n  margin: 0;\n  padding: 10px 12px;\n  border: 1px solid var(--dsw-alias-border-l1, #333);\n  border-radius: 8px;\n  background: #121212;\n  font-size: 13px;\n  line-height: 1.55;\n}\n.dshpp-auth-legal h3 {\n  margin: 14px 0 4px;\n  font-size: 13px;\n}\n.dshpp-auth-legal h3:first-child {\n  margin-top: 0;\n}\n.dshpp-auth-legal p {\n  margin: 0 0 8px;\n}\n.dshpp-auth-checks {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  font-size: 13px;\n}\n.dshpp-auth-checks label {\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n}\n.dshpp-auth-checks label.locked {\n  opacity: 0.45;\n}\n.dshpp-auth-ops {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.dshpp-auth-ops button {\n  appearance: none;\n  border: 1px solid var(--dsw-alias-border-l1, #444);\n  background: transparent;\n  color: inherit;\n  border-radius: 8px;\n  padding: 6px 12px;\n  cursor: pointer;\n  font: inherit;\n}\n.dshpp-auth-ops button.primary {\n  background: #2a4033;\n  border-color: #8fbf9a;\n}\n.dshpp-auth-ops button:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.dshpp-icon-btn {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 32px;\n  padding: 0 10px;\n  border: 1px solid\n    color-mix(in srgb, var(--dsw-alias-brand-primary, #6dbf8c) 45%, transparent);\n  border-radius: 8px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, currentColor);\n  cursor: pointer;\n  font: 13px/1 inherit;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.dshpp-icon-btn:hover {\n  border-color: var(--dsw-alias-brand-primary, #6dbf8c);\n  background: color-mix(\n    in srgb,\n    var(--dsw-alias-brand-primary, #6dbf8c) 12%,\n    transparent\n  );\n  color: var(--dsw-alias-label-primary, currentColor);\n}\n.dshpp-icon-btn.on {\n  border-color: var(--dsw-alias-brand-primary, #6dbf8c);\n  color: var(--dsw-alias-brand-primary, #6dbf8c);\n  background: color-mix(\n    in srgb,\n    var(--dsw-alias-brand-primary, #6dbf8c) 16%,\n    transparent\n  );\n  box-shadow: 0 0 0 1px\n    color-mix(in srgb, var(--dsw-alias-brand-primary, #6dbf8c) 28%, transparent);\n}\n.dshpp-hbtn {\n  appearance: none;\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  gap: 6px;\n  border: 1px solid\n    color-mix(in srgb, var(--dsw-alias-brand-primary, #6dbf8c) 55%, transparent);\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, currentColor);\n  cursor: pointer;\n  font: 12px/1 inherit;\n  padding: 5px 10px;\n  border-radius: 8px;\n  white-space: nowrap;\n}\n.dshpp-hbtn:hover {\n  border-color: var(--dsw-alias-brand-primary, #6dbf8c);\n  background: color-mix(\n    in srgb,\n    var(--dsw-alias-brand-primary, #6dbf8c) 12%,\n    transparent\n  );\n  color: var(--dsw-alias-label-primary, currentColor);\n}\n.dshpp-hbtn.on {\n  border-color: var(--dsw-alias-brand-primary, #6dbf8c);\n  color: var(--dsw-alias-brand-primary, #6dbf8c);\n  background: color-mix(\n    in srgb,\n    var(--dsw-alias-brand-primary, #6dbf8c) 18%,\n    transparent\n  );\n  box-shadow: 0 0 0 1px\n    color-mix(in srgb, var(--dsw-alias-brand-primary, #6dbf8c) 32%, transparent);\n}\n.dshpp-live-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  flex: none;\n  background: var(--dsw-alias-brand-primary, #6dbf8c);\n  box-shadow: 0 0 0 3px\n    color-mix(in srgb, var(--dsw-alias-brand-primary, #6dbf8c) 28%, transparent);\n}\n/* \u0421\u0442\u0435\u043A\u043B\u043E \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0446\u0432\u0435\u0442\u0430\u043C \u0445\u043E\u0441\u0442\u0430. \u041D\u0430\u0441\u044B\u0449\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u0430 \u0438 \u043D\u0435\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u043F\u043E\u0434\u043B\u043E\u0436\u043A\u0438 \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u044B: \u043E\u0431\u043E\u043B\u043E\u0447\u043A\u0430 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F, \u0442\u0435\u043A\u0441\u0442 \u043B\u0435\u0436\u0438\u0442 \u043D\u0430 \u0431\u043E\u043B\u0435\u0435 \u043F\u043B\u043E\u0442\u043D\u043E\u043C \u0441\u043B\u043E\u0435. */\n';

// src/styles/native.css
var native_default = '.dshpp-native.dshpp-root {\n  --dshpp-display: inherit;\n  --dshpp-sans: inherit;\n  --dshpp-paper: var(--dsw-alias-bg-base, transparent);\n  --dshpp-bg: transparent;\n  --dshpp-line: var(--dsw-alias-border-l1, #ddd);\n  --dshpp-ink: var(--dsw-alias-label-primary, #171717);\n  --dshpp-mute: var(--dsw-alias-label-secondary, #777);\n  --dshpp-accent: var(--dsw-alias-brand-primary, #4775ed);\n  --dshpp-fill: var(--dsw-alias-interactive-bg-hover, #f3f3f3);\n  font: inherit;\n  font-size: var(--dsh-content-font-size, 14px);\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  max-width: none;\n  padding: 0;\n  gap: 0;\n  border-radius: 0;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.dshpp-native * {\n  box-sizing: border-box;\n}\n.dshpp-native [hidden] {\n  display: none !important;\n}\n.dshpp-native-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 20px 12px;\n  gap: 12px;\n  flex: none;\n}\n.dshpp-native-head h2 {\n  font: inherit;\n  font-size: 1.15em;\n  font-weight: 600;\n  margin: 0;\n}\n.dshpp-native-head p {\n  margin: 4px 0 0;\n  font-size: 0.85em;\n  color: var(--dshpp-mute);\n}\n.dshpp-native-badge {\n  font-size: 0.8em;\n  color: var(--dshpp-mute);\n}\n.dshpp-native-nav {\n  display: flex;\n  gap: 4px;\n  padding: 0 16px;\n  border-bottom: 1px solid var(--dshpp-line);\n  flex: none;\n  overflow-x: auto;\n}\n.dshpp-native-nav button {\n  font: inherit;\n  font-size: 0.92em;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  background: none;\n  color: var(--dshpp-mute);\n  padding: 10px 8px;\n  white-space: nowrap;\n  cursor: pointer;\n}\n.dshpp-native-nav button[aria-pressed="true"] {\n  color: var(--dshpp-ink);\n  border-bottom-color: var(--dshpp-accent);\n}\n.dshpp-native-content {\n  min-height: 0;\n  flex: 1;\n  overflow: auto;\n  padding: 20px;\n  scrollbar-gutter: stable;\n  overscroll-behavior: contain;\n}\n.dshpp-native .dshpp-panel {\n  border: 0;\n  border-radius: 0;\n  padding: 0;\n  background: transparent;\n  min-width: 0;\n}\n.dshpp-native\n  :is(\n    h3,\n    h4,\n    .dshpp-title,\n    .dshpp-group-h strong,\n    .dshpp-metric b,\n    .dshpp-now-ver,\n    .dshpp-edition-name\n  ) {\n  font-family: inherit;\n  font-size: 1em;\n  letter-spacing: normal;\n  font-weight: 550;\n}\n.dshpp-native .dshpp-metric b {\n  font-size: 1.12em;\n}\n.dshpp-native .dshpp-head {\n  margin-bottom: 12px;\n}\n.dshpp-native .dshpp-sub {\n  margin-top: 0;\n  flex-wrap: wrap;\n}\n.dshpp-native :is(button, input, select, textarea) {\n  font-family: inherit;\n  box-shadow: none;\n  background-image: none;\n  max-width: 100%;\n}\n.dshpp-native .dshpp-btn {\n  font-size: 0.9em;\n  min-height: 32px;\n  border-radius: 7px;\n  padding: 6px 10px;\n  transform: none;\n  box-shadow: none;\n}\n.dshpp-native .dshpp-btn:hover:not(:disabled) {\n  background: var(--dshpp-fill);\n  box-shadow: none;\n  transform: none;\n}\n.dshpp-native .dshpp-btn-primary {\n  background: var(--dsw-alias-label-primary, #171717);\n  color: var(--dsw-alias-bg-base, #fff);\n  border-color: transparent;\n}\n.dshpp-native .dshpp-btn-primary:hover:not(:disabled) {\n  opacity: 0.85;\n  background: var(--dsw-alias-label-primary, #171717);\n}\n.dshpp-native :is(button, input, select, textarea):focus-visible {\n  outline: 2px solid var(--dshpp-accent);\n  outline-offset: 2px;\n  box-shadow: none;\n}\n.dshpp-native .dshpp-area {\n  font-family: inherit;\n  font-size: 0.92em;\n  line-height: 1.6;\n  min-height: 260px;\n  width: 100%;\n  border-radius: 8px;\n  background: transparent;\n  color: inherit;\n}\n.dshpp-native .dshpp-field {\n  font-size: 0.92em;\n  background: transparent;\n  color: inherit;\n}\n.dshpp-native .dshpp-metrics {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n}\n.dshpp-native .dshpp-metric:nth-child(2) {\n  display: none;\n}\n.dshpp-native .dshpp-metric {\n  min-height: 60px;\n  padding: 12px;\n  background: var(--dshpp-fill);\n  border: 0;\n}\n.dshpp-native .dshpp-metric span {\n  font-size: 0.85em;\n}\n.dshpp-native .dshpp-editions {\n  margin: 10px 0;\n  border: 0;\n}\n.dshpp-native summary {\n  cursor: pointer;\n  color: var(--dshpp-mute);\n  padding: 8px 0;\n  font-size: 0.9em;\n}\n.dshpp-native .dshpp-edition {\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n}\n.dshpp-native .dshpp-edition-name {\n  grid-column: 1/-1;\n}\n.dshpp-native .dshpp-edition .dshpp-btn {\n  min-width: 0;\n}\n.dshpp-native .dshpp-table {\n  table-layout: fixed;\n  font-size: 0.83em;\n}\n.dshpp-native .dshpp-table td {\n  word-break: break-word;\n  padding: 8px;\n}\n.dshpp-native .dshpp-table th {\n  padding: 8px;\n}\n.dshpp-native .dshpp-group-h {\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.dshpp-native .dshpp-group-h em {\n  font-size: 0.85em;\n}\n.dshpp-native .dshpp-row {\n  gap: 8px;\n}\n.dshpp-native .dshpp-hint {\n  font-size: 0.85em !important;\n  line-height: 1.6;\n  color: var(--dshpp-mute);\n}\n.dshpp-native .dshpp-more {\n  border-top: 1px solid var(--dshpp-line);\n  padding-top: 20px;\n  margin-top: 24px;\n}\n.dshpp-native .dshpp-more p {\n  font-size: 0.9em;\n  line-height: 1.6;\n  color: var(--dshpp-mute);\n}\n.dshpp-native .dshpp-attribution {\n  margin-top: 32px;\n  font-size: 0.78em !important;\n}\n\n/* \u041F\u043E\u043B\u0438\u0433\u043E\u043D: \u0440\u0430\u043D\u044C\u0448\u0435 \u0436\u0438\u043B \u0432 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0435\u043C\u043E\u043C \u043E\u043A\u043D\u0435, \u0442\u0435\u043F\u0435\u0440\u044C \u0432\u0441\u0442\u0440\u043E\u0435\u043D \u0432 \u043F\u0440\u0430\u0432\u0443\u044E \u043F\u0430\u043D\u0435\u043B\u044C \u2014 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u0430\u043C \u0440\u0430\u0441\u0442\u044F\u0433\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0438 \u043F\u0440\u043E\u043A\u0440\u0443\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F */\n.dshpp-native-drill {\n  width: 100%;\n  min-width: 0;\n  min-height: 72vh;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding-bottom: 24px;\n  box-sizing: border-box;\n}\n.dshpp-native-drill > .rt-dock.rt-embedded {\n  flex: 1 1 auto;\n  min-height: 0;\n  min-width: 0;\n  width: 100%;\n  height: auto;\n  overflow: visible;\n}\n/* \u041F\u0440\u0430\u0432\u0430\u044F \u043F\u0430\u043D\u0435\u043B\u044C \u0443\u0437\u043A\u0430\u044F: \u0432\u0441\u0435 flex-\u0441\u0442\u0440\u043E\u043A\u0438 \u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u043E\u043B\u0436\u043D\u044B \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0438\u0442\u044C\u0441\u044F, \u0438\u043D\u0430\u0447\u0435 \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430 \u0441\u0436\u0438\u043C\u0430\u0435\u0442 \u0441\u043E\u0441\u0435\u0434\u0435\u0439 \u0434\u043E 1ch */\n.dshpp-native-drill .rt-dock,\n.dshpp-native-drill .rt-dock * {\n  box-sizing: border-box;\n  min-width: 0;\n  word-break: normal;\n  overflow-wrap: anywhere;\n}\n.dshpp-native-drill .rt-dock input,\n.dshpp-native-drill .rt-dock textarea,\n.dshpp-native-drill .rt-dock select {\n  width: 100%;\n  max-width: 100%;\n}\n';

// src/styles/page.css
var page_default = '/* \u0421\u0442\u0438\u043B\u0438 \u0446\u0435\u043B\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B (\u0432\u0445\u043E\u0434 \u0438\u0437 \u043B\u0435\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u0438): \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0448\u0440\u0438\u0444\u0442\u044B, \u043E\u0442\u0441\u0442\u0443\u043F\u044B \u0438 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0442\u0435\u043C\u044B \u0441\u0430\u043C\u043E\u0433\u043E DSH, \u0441\u0432\u043E\u0438\u0445 \u0448\u0440\u0438\u0444\u0442\u043E\u0432 \u043D\u0435 \u0432\u0432\u043E\u0434\u0438\u043C. */\n.dshpp-page {\n  --dshpp-line: var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.22));\n  --dshpp-line-strong: var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.4));\n  --dshpp-fg: var(--dsw-alias-label-primary, currentColor);\n  --dshpp-mute: var(\n    --dsw-alias-label-secondary,\n    color-mix(in srgb, currentColor 62%, transparent)\n  );\n  --dshpp-bg: var(--dsw-alias-bg-layer-1, transparent);\n  --dshpp-bg-2: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.06));\n  --dshpp-accent: var(--dsw-alias-brand-primary, #4d6bfe);\n  --dshpp-ok: var(--dsw-alias-state-success-primary, #1f9d55);\n  --dshpp-warn: var(--dsw-alias-state-warn-primary, #b7791f);\n  --dshpp-bad: var(--dsw-alias-state-error-primary, #d14343);\n  box-sizing: border-box;\n  height: 100%;\n  min-height: 0;\n  overflow: auto;\n  padding: 20px 24px 40px;\n  color: var(--dshpp-fg);\n  font: inherit;\n  line-height: 1.55;\n  -webkit-font-smoothing: antialiased;\n}\n.dshpp-page *,\n.dshpp-page *::before,\n.dshpp-page *::after {\n  box-sizing: border-box;\n}\n\n.dshpp-page-head {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n.dshpp-page-glyph {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border-radius: 10px;\n  border: 1px solid var(--dshpp-line);\n  background: var(--dshpp-bg-2);\n  color: var(--dshpp-accent);\n  flex: none;\n}\n.dshpp-page-title {\n  min-width: 0;\n}\n.dshpp-page-title h1 {\n  margin: 0;\n  font-size: 1.15em;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n}\n.dshpp-page-title p {\n  margin: 2px 0 0;\n  font-size: 0.86em;\n  color: var(--dshpp-mute);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dshpp-page-ver {\n  padding: 1px 6px;\n  border-radius: 999px;\n  border: 1px solid var(--dshpp-line);\n  font-size: 0.92em;\n}\n\n/* \u0421\u0442\u0440\u043E\u043A\u0430-\u0441\u0432\u043E\u0434\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0441\u0432\u0435\u0440\u0445\u0443: \u0431\u0435\u0437 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438, \u0432 \u0441\u0442\u0438\u043B\u0435 subtitle \u0443 DSH */\n.dshpp-strip {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 18px;\n  margin: 14px 0 2px;\n  padding: 10px 0 12px;\n  border-bottom: 1px solid var(--dshpp-line);\n  font-size: 0.86em;\n  color: var(--dshpp-mute);\n}\n.dshpp-strip-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  min-width: 0;\n}\n.dshpp-strip-item b {\n  color: var(--dshpp-fg);\n  font-weight: 600;\n}\n.dshpp-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--dshpp-mute);\n  flex: none;\n}\n.dshpp-dot.is-ok {\n  background: var(--dshpp-ok);\n}\n.dshpp-dot.is-warn {\n  background: var(--dshpp-warn);\n}\n.dshpp-dot.is-bad {\n  background: var(--dshpp-bad);\n}\n\n/* \u0412\u043A\u043B\u0430\u0434\u043A\u0438: \u0441 \u043F\u043E\u0434\u0447\u0451\u0440\u043A\u0438\u0432\u0430\u043D\u0438\u0435\u043C, \u043A\u0430\u043A \u0442\u0430\u0431\u044B \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 DSH */\n.dshpp-page-tabs {\n  display: flex;\n  gap: 2px;\n  margin: 10px 0 0;\n  border-bottom: 1px solid var(--dshpp-line);\n  overflow-x: auto;\n  scrollbar-width: none;\n}\n.dshpp-page-tabs::-webkit-scrollbar {\n  display: none;\n}\n.dshpp-page-tabs button {\n  appearance: none;\n  border: 0;\n  background: transparent;\n  color: var(--dshpp-mute);\n  font: inherit;\n  font-size: 0.92em;\n  padding: 9px 12px 10px;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.dshpp-page-tabs button:hover {\n  color: var(--dshpp-fg);\n}\n.dshpp-page-tabs button[aria-selected="true"] {\n  color: var(--dshpp-fg);\n  border-bottom-color: var(--dshpp-accent);\n  font-weight: 600;\n}\n\n.dshpp-page-body {\n  padding-top: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 0;\n}\n.dshpp-sec {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 0;\n}\n.dshpp-sec[hidden] {\n  display: none;\n}\n\n/* \u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430: \u043F\u0430\u043D\u0435\u043B\u044C layer-1 \u0438\u0437 DSH */\n.dshpp-page .dshpp-card,\n.dshpp-page section.dshpp-panel {\n  border: 1px solid var(--dshpp-line);\n  border-radius: 12px;\n  background: var(--dshpp-bg);\n  padding: 16px 18px;\n  margin: 0;\n  min-width: 0;\n}\n.dshpp-page .dshpp-card > h3:first-child,\n.dshpp-page section.dshpp-panel > h3:first-child {\n  margin: 0 0 12px;\n  font-size: 1em;\n  font-weight: 600;\n}\n.dshpp-page .dshpp-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n/* \u0421\u0442\u0440\u043E\u043A\u0430 \u043F\u043E\u043B\u044F: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u043B\u0435\u0432\u0430, \u043A\u043E\u043D\u0442\u0440\u043E\u043B \u0441\u043F\u0440\u0430\u0432\u0430; \u043D\u0430 \u0443\u0437\u043A\u043E\u043C \u044D\u043A\u0440\u0430\u043D\u0435 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0438\u0442\u0441\u044F */\n.dshpp-page .dshpp-field {\n  display: grid;\n  grid-template-columns: minmax(120px, 190px) 1fr;\n  gap: 8px 14px;\n  align-items: center;\n}\n.dshpp-page .dshpp-field > .dshpp-field-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.92em;\n  color: var(--dshpp-fg);\n}\n.dshpp-page .dshpp-field > .dshpp-field-body {\n  min-width: 0;\n}\n@media (max-width: 720px) {\n  .dshpp-page .dshpp-field {\n    grid-template-columns: 1fr;\n  }\n}\n\n.dshpp-page .dshpp-muted,\n.dshpp-page .dshpp-hint {\n  color: var(--dshpp-mute) !important;\n  font-size: 0.86em !important;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.dshpp-page .dshpp-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n  min-width: 0;\n}\n.dshpp-page input,\n.dshpp-page select,\n.dshpp-page textarea {\n  font: inherit;\n  color: var(--dshpp-fg);\n  background: var(--dshpp-bg-2);\n  border: 1px solid var(--dshpp-line);\n  border-radius: 8px;\n  padding: 7px 10px;\n  max-width: 100%;\n}\n.dshpp-page input:focus-visible,\n.dshpp-page select:focus-visible,\n.dshpp-page textarea:focus-visible {\n  outline: 2px solid color-mix(in srgb, var(--dshpp-accent) 55%, transparent);\n  outline-offset: 1px;\n}\n.dshpp-page textarea {\n  width: 100%;\n  min-height: 320px;\n  resize: vertical;\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 0.86em;\n  line-height: 1.6;\n}\n\n.dshpp-page .dshpp-btn {\n  font: inherit;\n  font-size: 0.9em;\n  border-radius: 8px;\n  padding: 6px 12px;\n  border: 1px solid var(--dshpp-line);\n  background: var(--dshpp-bg-2);\n  color: var(--dshpp-fg);\n  cursor: pointer;\n  white-space: nowrap;\n}\n.dshpp-page .dshpp-btn:hover:not(:disabled) {\n  border-color: var(--dshpp-line-strong);\n}\n.dshpp-page .dshpp-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n/* \u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0430: \u043D\u0435 \u0431\u0440\u0430\u0442\u044C brand-primary \u0432 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0444\u043E\u043D\u0430 \u2014 \u0432 \u0442\u0451\u043C\u043D\u043E\u0439 \u0442\u0435\u043C\u0435 \u044D\u0442\u043E \u0446\u0432\u0435\u0442 \u043F\u043E\u0434\u0441\u0432\u0435\u0442\u043A\u0438 \u0442\u0435\u043A\u0441\u0442\u0430,\n   \u0438 \u043A\u0430\u043A \u0444\u043E\u043D \u043E\u043D \u0434\u0430\u0451\u0442 \u0431\u043B\u043E\u043A \u0441 \u0431\u0435\u043B\u044B\u043C \u0442\u0435\u043A\u0441\u0442\u043E\u043C \u043D\u0430 \u0431\u0435\u043B\u043E\u043C. \u0417\u0434\u0435\u0441\u044C \u2014 \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043F\u043B\u043E\u0442\u043D\u044B\u0439 \u0437\u0435\u043B\u0451\u043D\u044B\u0439 + \u0431\u0435\u043B\u044B\u0439 \u0442\u0435\u043A\u0441\u0442. */\n.dshpp-page {\n  --dshpp-solid: #2f6b4f;\n  --dshpp-solid-hover: #3a8260;\n  --dshpp-solid-danger: #a63b3b;\n  --dshpp-solid-danger-hover: #bd4747;\n}\n.dshpp-page .dshpp-btn-primary {\n  background: var(--dshpp-solid);\n  border-color: var(--dshpp-solid);\n  color: #fff;\n  font-weight: 600;\n}\n.dshpp-page .dshpp-btn-primary:hover:not(:disabled) {\n  background: var(--dshpp-solid-hover);\n  border-color: var(--dshpp-solid-hover);\n}\n.dshpp-page .dshpp-btn-solid-danger {\n  background: var(--dshpp-solid-danger);\n  border-color: var(--dshpp-solid-danger);\n  color: #fff;\n}\n.dshpp-page .dshpp-btn-solid-danger:hover:not(:disabled) {\n  background: var(--dshpp-solid-danger-hover);\n  border-color: var(--dshpp-solid-danger-hover);\n}\n.dshpp-page .dshpp-btn-danger {\n  color: var(--dshpp-bad);\n  border-color: color-mix(in srgb, var(--dshpp-bad) 40%, transparent);\n}\n.dshpp-page .dshpp-btn-tiny {\n  padding: 3px 8px;\n  font-size: 0.82em;\n}\n\n.dshpp-page .dshpp-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 1px 8px;\n  border-radius: 999px;\n  font-size: 0.8em;\n  border: 1px solid var(--dshpp-line);\n  color: var(--dshpp-mute);\n}\n.dshpp-page .dshpp-pill.is-ok {\n  color: var(--dshpp-ok);\n  border-color: color-mix(in srgb, var(--dshpp-ok) 35%, transparent);\n}\n.dshpp-page .dshpp-pill.is-wait {\n  color: var(--dshpp-warn);\n  border-color: color-mix(in srgb, var(--dshpp-warn) 35%, transparent);\n}\n.dshpp-page .dshpp-pill.is-bad {\n  color: var(--dshpp-bad);\n  border-color: color-mix(in srgb, var(--dshpp-bad) 40%, transparent);\n}\n\n.dshpp-page .dshpp-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.86em;\n}\n.dshpp-page .dshpp-table th,\n.dshpp-page .dshpp-table td {\n  text-align: left;\n  padding: 7px 10px;\n  border-bottom: 1px solid var(--dshpp-line);\n  vertical-align: top;\n  overflow-wrap: anywhere;\n}\n.dshpp-page .dshpp-table th {\n  color: var(--dshpp-mute);\n  font-weight: 500;\n  font-size: 0.95em;\n}\n.dshpp-page .dshpp-group-h {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  padding: 8px 0;\n  cursor: pointer;\n}\n.dshpp-page .dshpp-count {\n  color: var(--dshpp-mute);\n  font-size: 0.85em;\n}\n\n/* \u041F\u043E\u043B\u0438\u0433\u043E\u043D \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 \u043E\u0441\u0442\u0430\u0432\u0448\u0443\u044E\u0441\u044F \u0432\u044B\u0441\u043E\u0442\u0443 */\n.dshpp-page-drill {\n  min-height: 60vh;\n}\n.dshpp-page-drill .rt-dock.rt-embedded {\n  width: 100%;\n  min-width: 0;\n}\n\n.dshpp-page-foot {\n  margin-top: 28px;\n  padding-top: 14px;\n  border-top: 1px solid var(--dshpp-line);\n  font-size: 0.8em;\n  color: var(--dshpp-mute);\n}\n\n/* \u041F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u0435 \u043A \u0442\u0435\u0440\u043C\u0438\u043D\u0443: \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0439 \u0432\u043E\u043F\u0440\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0437\u043D\u0430\u043A \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 */\n.dshpp-help {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.dshpp-help-btn {\n  appearance: none;\n  border: 0;\n  background: transparent;\n  color: var(--dshpp-mute);\n  font: inherit;\n  font-size: 0.85em;\n  line-height: 1;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  border: 1px solid var(--dshpp-line);\n  cursor: help;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n}\n.dshpp-help-btn:hover,\n.dshpp-help-btn[aria-expanded="true"] {\n  color: var(--dshpp-fg);\n  border-color: var(--dshpp-line-strong);\n  background: var(--dshpp-bg-2);\n}\n.dshpp-tip {\n  position: absolute;\n  left: 0;\n  top: calc(100% + 6px);\n  z-index: 2147483000;\n  width: max-content;\n  max-width: min(340px, 70vw);\n  padding: 9px 11px;\n  border-radius: 8px;\n  border: 1px solid var(--dshpp-line);\n  background: var(--dsw-alias-bg-overlay, canvas);\n  color: var(--dshpp-fg);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);\n  font-size: 0.82em;\n  line-height: 1.6;\n  white-space: normal;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.dshpp-tip b {\n  font-weight: 600;\n}\n\n.dshpp-page .dshpp-warn {\n  margin: 10px 0 0;\n  padding: 8px 12px;\n  border-radius: 8px;\n  border: 1px solid color-mix(in srgb, var(--dshpp-warn) 45%, transparent);\n  color: var(--dshpp-warn);\n  background: color-mix(in srgb, var(--dshpp-warn) 10%, transparent);\n  font-size: 0.86em;\n}\n\n/* \u041F\u0430\u043D\u0435\u043B\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439: \u0441\u0430\u043C\u043E\u0435 \u0447\u0430\u0441\u0442\u043E\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB \u0437\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E \u0441\u0432\u0435\u0440\u0445\u0443 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 */\n.dshpp-page .dshpp-actions {\n  position: sticky;\n  top: 0;\n  z-index: 5;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 0 12px;\n  margin: -4px 0 6px;\n  background: linear-gradient(\n    var(--dsw-alias-bg-base, canvas) 78%,\n    transparent\n  );\n  backdrop-filter: blur(2px);\n  border-bottom: 1px solid var(--dshpp-line);\n}\n.dshpp-page .dshpp-actions .dshpp-pill {\n  margin-left: auto;\n}\n\n/* \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438: \u0442\u0440\u0438 \u043A\u043E\u043C\u043F\u0430\u043A\u0442\u043D\u044B\u0435 \u043A\u043E\u043B\u043E\u043D\u043A\u0438 */\n.dshpp-page .dshpp-metrics {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\n  gap: 10px;\n  margin: 4px 0 2px;\n}\n.dshpp-page .dshpp-metric {\n  border: 1px solid var(--dshpp-line);\n  border-radius: 10px;\n  padding: 10px 12px;\n  background: var(--dshpp-bg-2);\n  min-width: 0;\n}\n.dshpp-page .dshpp-metric b {\n  display: block;\n  font-size: 1.05em;\n  font-weight: 600;\n  margin-bottom: 2px;\n  overflow-wrap: anywhere;\n}\n.dshpp-page .dshpp-metric span {\n  color: var(--dshpp-mute);\n  font-size: 0.82em;\n}\n\n/* \u0421\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u043C\u044B\u0435 \u0431\u043B\u043E\u043A\u0438: \u0434\u0435\u0442\u0430\u043B\u0438 \u043F\u0430\u0442\u0447\u0435\u0439 / \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435 / \u0441\u0430\u043C\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 */\n.dshpp-page .dshpp-fold,\n.dshpp-page .dshpp-fold-inline {\n  border: 1px solid var(--dshpp-line);\n  border-radius: 10px;\n  background: var(--dshpp-bg);\n  padding: 0 12px;\n}\n.dshpp-page .dshpp-fold > summary,\n.dshpp-page .dshpp-fold-inline > summary {\n  cursor: pointer;\n  padding: 10px 0;\n  font-size: 0.92em;\n  color: var(--dshpp-fg);\n  list-style: none;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dshpp-page .dshpp-fold > summary::-webkit-details-marker,\n.dshpp-page .dshpp-fold-inline > summary::-webkit-details-marker {\n  display: none;\n}\n.dshpp-page .dshpp-fold > summary::before,\n.dshpp-page .dshpp-fold-inline > summary::before {\n  content: "\u25B8";\n  color: var(--dshpp-mute);\n  font-size: 0.9em;\n  transition: transform 0.12s ease;\n}\n.dshpp-page .dshpp-fold[open] > summary::before,\n.dshpp-page .dshpp-fold-inline[open] > summary::before {\n  transform: rotate(90deg);\n}\n.dshpp-page .dshpp-fold > summary b,\n.dshpp-page .dshpp-fold-inline > summary b {\n  color: var(--dshpp-mute);\n  font-weight: 500;\n  margin-left: auto;\n}\n\n/* \u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F (\u0441\u0430\u043C\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 / \u0431\u043B\u043E\u043A \u0443\u0441\u0438\u043B\u0435\u043D\u0438\u044F) */\n.dshpp-page .dshpp-line {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  padding: 6px 0;\n}\n.dshpp-page .dshpp-line + .dshpp-line {\n  border-top: 1px solid var(--dshpp-line);\n}\n.dshpp-page .dshpp-line-main {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.92em;\n  min-width: 0;\n}\n.dshpp-page .dshpp-line-main b {\n  font-weight: 600;\n}\n.dshpp-page .dshpp-fold-inline {\n  border: 0;\n  padding: 0;\n  background: transparent;\n}\n.dshpp-page .dshpp-fold-inline > summary {\n  padding: 2px 0;\n  color: var(--dshpp-mute);\n  font-size: 0.86em;\n}\n.dshpp-page .dshpp-fold-inline[open] {\n  flex-basis: 100%;\n}\n\n/* \u041F\u043E\u0443\u0440\u043E\u0432\u043D\u0435\u0432\u0430\u044F \u0441\u0430\u043C\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: \u0441\u0435\u0442\u043A\u0430 \u0432 \u0434\u0432\u0435 \u0438\u043B\u0438 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u043B\u043E\u043D\u043E\u043A \u0432\u043C\u0435\u0441\u0442\u043E \u043E\u0434\u043D\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u0438 \u043D\u0430 \u043F\u0443\u043D\u043A\u0442 */\n.dshpp-page .dshpp-checks {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 2px 14px;\n  padding: 6px 0 10px;\n}\n.dshpp-page .dshpp-check {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.84em;\n  min-width: 0;\n  padding: 2px 0;\n}\n.dshpp-page .dshpp-check.is-bad {\n  color: var(--dshpp-bad);\n}\n.dshpp-page .dshpp-check-name {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n}\n.dshpp-page .dshpp-check-val {\n  margin-left: auto;\n  color: var(--dshpp-mute);\n  font-variant-numeric: tabular-nums;\n}\n\n/* Hero \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0441\u0442\u0430\u0442\u0443\u0441\u0430: \u0441\u0440\u0430\u0437\u0443 \u0432\u0438\u0434\u043D\u043E \xAB\u0447\u0442\u043E \u0441\u0435\u0439\u0447\u0430\u0441 \u0438 \u043A\u0443\u0434\u0430 \u043D\u0430\u0436\u0438\u043C\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435\xBB */\n.dshpp-page .dshpp-hero {\n  border: 1px solid var(--dshpp-line);\n  border-radius: 12px;\n  background: var(--dshpp-bg);\n  padding: 16px 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.dshpp-page .dshpp-hero-state {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.02em;\n  min-width: 0;\n}\n.dshpp-page .dshpp-hero-state b {\n  font-weight: 600;\n}\n.dshpp-page .dshpp-hero-sub {\n  margin-left: auto;\n  color: var(--dshpp-mute);\n  font-size: 0.82em;\n}\n.dshpp-page .dshpp-hero-actions {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n}\n.dshpp-page .dshpp-btn-lead {\n  padding: 9px 20px;\n  font-size: 0.98em;\n  font-weight: 600;\n  border-radius: 10px;\n}\n.dshpp-page .dshpp-hero-hint {\n  margin: 0;\n  color: var(--dshpp-mute);\n  font-size: 0.84em;\n  line-height: 1.6;\n}\n.dshpp-check.is-warn {\n  color: var(--dshpp-warn);\n}\n\n.dshpp-page .dshpp-probe-msg {\n  margin: 6px 0 0;\n  padding: 8px 10px;\n  border-radius: 8px;\n  border: 1px dashed var(--dshpp-line);\n  background: var(--dshpp-bg-2);\n  font-size: 0.82em;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n';

// src/vendor/drill.js
var import_react2 = __toESM(require("react"), 1);
var __dshPurgeDrill = (() => {
  var module2 = { exports: {} };
  var exports = module2.exports;
  var module2 = { exports: {} };
  var exports = module2.exports;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const h2 = import_react2.default.createElement;
  const CSS = `
.rt-dock{position:fixed;top:12px;right:12px;z-index:20;display:flex;flex-direction:column;box-sizing:border-box;
  background:color-mix(in srgb,var(--dsw-alias-bg-layer-1,#1c1c1c) 52%,transparent);
  backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);
  border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,#444) 70%,transparent);
  border-radius:12px;
  box-shadow:0 18px 48px color-mix(in srgb,#000 28%,transparent);pointer-events:auto;color:var(--dsw-alias-label-primary);
  font-size:13px;line-height:1.5}
.rt-dock.rt-embedded{position:relative;inset:auto;width:100%;height:100%;max-width:none;border:0;border-radius:0;box-shadow:none;background:transparent!important;backdrop-filter:none;-webkit-backdrop-filter:none}
.rt-grip,.rt-resize-r,.rt-resize-b,.rt-resize-c{position:absolute;z-index:3;touch-action:none}
.rt-grip{left:-3px;top:0;bottom:0;width:8px;cursor:ew-resize;background:transparent}
.rt-resize-r{right:-3px;top:0;bottom:14px;width:8px;cursor:ew-resize}
.rt-resize-b{left:8px;right:14px;bottom:-3px;height:8px;cursor:ns-resize}
.rt-resize-c{right:0;bottom:0;width:16px;height:16px;cursor:nwse-resize}
.rt-head{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.rt-title{font-weight:600;font-size:14px;display:flex;align-items:center;gap:6px;white-space:nowrap}
.rt-dot{width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-brand-primary)}
.rt-spacer{flex:1}
.rt-btn{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:inherit;
  border-radius:6px;padding:3px 9px;font-size:12px;cursor:pointer;font-family:inherit;white-space:nowrap}
.rt-btn:hover{border-color:var(--dsw-alias-border-l2)}
/* brand-primary \u0432 \u0442\u0451\u043C\u043D\u043E\u0439 \u0442\u0435\u043C\u0435 \u043F\u043E\u0447\u0442\u0438 \u0431\u0435\u043B\u044B\u0439 (#f9fafb): \u043D\u0430 \u0444\u043E\u043D\u0435 #fff \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0441\u044F \u0431\u0435\u043B\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043D\u0430 \u0431\u0435\u043B\u043E\u043C.
   \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0438\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0443\u044E \u043F\u0430\u0440\u0443 token \xAB\u0446\u0432\u0435\u0442 \u043C\u0435\u0442\u043A\u0438 / \u0446\u0432\u0435\u0442 \u0444\u043E\u043D\u0430\xBB \u2014 \u0432\u044B\u0441\u043E\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0440\u0430\u0441\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442\u0441\u044F \u0432 \u043E\u0431\u0435\u0438\u0445 \u0442\u0435\u043C\u0430\u0445. */
.rt-btn-primary{background:var(--dsw-alias-label-primary,#111);border-color:var(--dsw-alias-label-primary,#111);color:var(--dsw-alias-bg-base,#fff)}
.rt-btn-primary:hover{opacity:.9}
.rt-btn:disabled{opacity:.5;cursor:default}
.rt-tabs{display:flex;flex-wrap:wrap;gap:2px;padding:6px 12px 0;border-bottom:1px solid var(--dsw-alias-border-l1)}
.rt-tab{padding:8px 10px 7px;border-radius:0;cursor:pointer;font-size:12.5px;color:var(--dsw-alias-label-secondary);
  display:inline-flex;align-items:center;gap:5px;border-bottom:2px solid transparent;margin-bottom:-1px;background:transparent}
.rt-tab:hover{color:var(--dsw-alias-label-primary)}
.rt-tab.on{color:var(--dsw-alias-label-primary);background:transparent;font-weight:600;border-bottom-color:var(--dsw-alias-brand-primary,#6dbf8c)}
/* \u041D\u0435\u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043D\u043E\u0435: \u043D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \u043F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043D\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 (\u043D\u043E\u0432\u044B\u0439 \u0430\u043A\u0442\u0438\u0432/\u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044C/\u0431\u0430\u043B\u043B\u044B/\u0448\u0430\u0433\u2026), \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0442\u043E\u0447\u043A\u0430 \u0438\u0441\u0447\u0435\u0437\u0430\u0435\u0442 */
.rt-tab-dot{width:7px;height:7px;border-radius:50%;background:#ef4444;flex:none;
  box-shadow:0 0 0 2px color-mix(in srgb, #ef4444 22%, transparent)}
.rt-body{flex:1;min-height:0;display:flex;flex-direction:column}
.rt-split{flex:1;min-height:0;display:flex}
.rt-side{width:200px;flex:none;border-right:1px solid var(--dsw-alias-border-l1);overflow:auto;padding:8px}
.rt-main{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.rt-seg{padding:7px 8px;border-radius:6px;cursor:pointer;margin-bottom:4px;border:1px solid transparent}
.rt-seg:hover{background:var(--dsw-alias-bg-layer-2)}
.rt-seg.on{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-brand-primary)}
.rt-seg-cidr{font-family:ui-monospace,Menlo,monospace;font-size:12.5px}
.rt-seg-meta{font-size:11px;color:var(--dsw-alias-label-secondary);margin-top:2px}
.rt-toolbar{display:flex;gap:6px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);flex-wrap:wrap;align-items:center}
.rt-input{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:inherit;
  border-radius:6px;padding:4px 8px;font-size:12px;font-family:inherit;outline:none;min-width:0}
.rt-input:focus{border-color:var(--dsw-alias-brand-primary)}
.rt-input option,.rt-eng-select option{background:var(--dsw-alias-bg-layer-1,#1c1c1c);color:var(--dsw-alias-label-primary,#f2f2f2)}
.rt-eng-select{color:var(--dsw-alias-label-primary,#f2f2f2);background:var(--dsw-alias-bg-layer-2,#2a2a2a)}
.rt-table{flex:1;overflow:auto}
.rt-row{display:grid;grid-template-columns:150px 74px 104px 1.15fr 1fr;gap:8px;padding:6px 10px;
  border-bottom:1px solid var(--dsw-alias-border-l1);align-items:center;cursor:pointer;font-size:12.5px}
.rt-row:hover{background:var(--dsw-alias-bg-layer-2)}
.rt-row.head{cursor:default;color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:600;position:sticky;top:0;
  background:var(--dsw-alias-bg-layer-1);z-index:1}
.rt-row.head:hover{background:var(--dsw-alias-bg-layer-1)}
.rt-mono{font-family:ui-monospace,Menlo,monospace}
.rt-tag{display:inline-block;padding:0 5px;border-radius:4px;font-size:11px;margin-right:4px;
  border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);white-space:nowrap}
.rt-tag-passive{color:#8b5cf6;border-color:#8b5cf655;background:#8b5cf61a}
.rt-tag-active{color:#f59e0b;border-color:#f59e0b55;background:#f59e0b1a}
.rt-tag-live{color:#10b981;border-color:#10b98155;background:#10b9811a}
.rt-tag-warn{color:#ef4444;border-color:#ef444455;background:#ef44441a}
/* \u041F\u043E\u043B\u043E\u0441\u0430 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F \u043E \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u0435: \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u0441\u0430\u043C\u043E\u043C \u0432\u0435\u0440\u0445\u0443 \u0431\u043B\u043E\u043A\u0430, \u0435\u0441\u043B\u0438 \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u044B \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u0434\u0430\u0447\u0438 (\u0448\u0435\u043B\u043B \u043D\u0435 Behinder/Godzilla, \u043D\u0435\u0442 \u0442\u0443\u043D\u043D\u0435\u043B\u044F suo5) */
.rt-hint{border-radius:6px;padding:7px 9px;margin-bottom:8px;font-size:11.5px;line-height:1.6;
  border:1px dashed #ef444488;background:#ef44440f;color:var(--dsw-alias-label-primary)}
.rt-hint b{color:#ef4444}
.rt-tag-dead{color:var(--dsw-alias-label-secondary)}
.rt-expand{grid-column:1/-1;padding:8px 4px 10px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.rt-kv{display:flex;gap:8px;margin-bottom:3px;align-items:baseline}
.rt-kv b{color:var(--dsw-alias-label-primary);font-weight:600;min-width:64px;flex:none}
/* \u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0440\u0430\u0444\u043E\u043C \u0443\u0434\u0430\u043B\u0435\u043D\u043E (\u0441\u043C. AssetsTab: \u0441\u0432\u044F\u0437\u0438 \u0430\u043A\u0442\u0438\u0432\u043E\u0432 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u044E\u0442 \xAB\u0440\u0430\u0437\u0440\u0435\u0437 \u043F\u043E \u0434\u043E\u043C\u0435\u043D\u0430\u043C\xBB \u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 redteam_attack_path) */
.rt-pane{flex:1;min-height:0;overflow:auto;padding:12px}
.rt-card{border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,#444) 75%,transparent);border-radius:8px;padding:10px;margin-bottom:10px;
  background:color-mix(in srgb,var(--dsw-alias-bg-layer-2,#2a2a2a) 48%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.rt-card h4{margin:0 0 6px;font-size:13px}
.rt-textarea{width:100%;min-height:260px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);
  color:inherit;border-radius:6px;padding:8px;font-size:12.5px;font-family:ui-monospace,Menlo,monospace;
  line-height:1.6;resize:vertical;outline:none;box-sizing:border-box}
.rt-textarea:focus{border-color:var(--dsw-alias-brand-primary)}
.rt-list{width:210px;flex:none;border-right:1px solid var(--dsw-alias-border-l1);overflow:auto;padding:8px}
.rt-item{padding:7px 8px;border-radius:6px;cursor:pointer;margin-bottom:4px;border:1px solid transparent}
.rt-item:hover{background:var(--dsw-alias-bg-layer-2)}
.rt-item.on{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-brand-primary)}
.rt-item-name{font-weight:600;font-size:12.5px}
.rt-item-desc{font-size:11px;color:var(--dsw-alias-label-secondary);margin-top:2px;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.rt-empty{padding:24px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:12.5px}
.rt-err{color:var(--dsw-alias-state-error-primary);font-size:12px;padding:6px 10px}
.rt-foot{padding:8px 12px;border-top:1px solid var(--dsw-alias-border-l1);font-size:11px;
  color:var(--dsw-alias-label-secondary);display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.rt-icon-btn{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;border:1px solid var(--dsw-alias-border-l1);
  background:transparent;color:inherit;border-radius:6px;padding:6px 8px;cursor:pointer;font-family:inherit;font-size:12.5px}
.rt-icon-btn:hover{background:var(--dsw-alias-bg-layer-2)}
.rt-icon-btn.on{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}
.rt-hbtn{border:1px solid var(--dsw-alias-border-l1);background:transparent;color:inherit;border-radius:6px;
  padding:2px 8px;font-size:12px;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:5px}
.rt-hbtn:hover{background:var(--dsw-alias-bg-layer-2)}
.rt-hbtn.on{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}
.rt-test{display:inline-block;padding:0 5px;border-radius:4px;font-size:11px;white-space:nowrap;
  border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.rt-test-testing{color:#f59e0b;border-color:#f59e0b55;background:#f59e0b1a}
.rt-test-tested{color:#10b981;border-color:#10b98155;background:#10b9811a}
.rt-test-blocked{color:#fff;background:#ef4444;border-color:#ef4444}
.rt-test-abandoned{color:#94a3b8;border-color:#94a3b855;background:#94a3b81a}
.rt-test-no_surface{color:#6366f1;border-color:#6366f155;background:#6366f11a}
.rt-scope-testing{color:#5b21b6;background:#ddd6fe}
.rt-pri{display:inline-block;padding:0 6px;border-radius:4px;font-size:11px;font-weight:600;white-space:nowrap}
.rt-pri-high{color:#fff;background:#ef4444}
.rt-pri-medium{color:#fff;background:#f59e0b}
.rt-pri-low{color:#fff;background:#94a3b8}
.rt-score-row{display:grid;grid-template-columns:16px 62px minmax(0,1fr) 116px 66px;gap:8px;padding:7px 10px;
  border-bottom:1px solid var(--dsw-alias-border-l1);align-items:center;font-size:12.5px;cursor:pointer}
.rt-score-row:hover{background:var(--dsw-alias-bg-layer-2)}
.rt-score-row.head{cursor:default;color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:600;
  position:sticky;top:0;background:var(--dsw-alias-bg-layer-1);z-index:1}
.rt-score-detail{grid-column:1/-1;padding:8px 4px 10px;font-size:12px;color:var(--dsw-alias-label-secondary)}
/* \u0426\u0435\u043B\u0438 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0441\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u043F\u043E 8 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0451\u043D\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 + \u0432\u043D\u0443\u0442\u0440\u0438 \u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E \u0431\u0430\u043B\u043B\u043E\u0432 */
.rt-score-group{display:flex;align-items:center;gap:8px;padding:7px 10px 5px;margin-top:2px;
  font-size:12px;font-weight:600;border-top:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2)}
.rt-score-group:first-child{border-top:none}
.rt-score-group .rt-sg-sub{font-weight:400;font-size:11px;color:var(--dsw-alias-label-secondary)}
/* \u2500\u2500 \u0421\u0435\u0441\u0441\u0438\u0438 \u0438 \u0432\u0445\u043E\u0434\u044B: \u043A\u0430\u0436\u0434\u0430\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u043D\u0430 \u0447\u0435\u0442\u044B\u0440\u0435 \u0431\u043B\u043E\u043A\u0430 \xAB\u0441\u0442\u0440\u043E\u043A\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 / \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0444\u0430\u043A\u0442\u044B / \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B / \u043F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F\xBB, \u0447\u0442\u043E\u0431\u044B \u0432\u0441\u0451 \u043D\u0435 \u0441\u043B\u0438\u0432\u0430\u043B\u043E\u0441\u044C \u0432 \u043E\u0434\u043D\u0443 \u0441\u0442\u0440\u043E\u043A\u0443 \u2500\u2500 */
.rt-sess-facts{display:flex;flex-direction:column;gap:2px;margin-top:5px}
.rt-sess-fact{display:flex;gap:6px;font-size:11.5px;line-height:1.5}
.rt-sess-fact>b{flex:none;min-width:62px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.rt-sess-fact>span{min-width:0;overflow-wrap:anywhere}
.rt-sess-cmd{margin-top:6px}
.rt-sess-cmd>b{display:block;font-size:11px;color:var(--dsw-alias-label-secondary);margin-bottom:3px;font-weight:600}
.rt-sess-fold{margin-top:6px;font-size:11.5px}
.rt-sess-fold>summary{cursor:pointer;color:var(--dsw-alias-label-secondary);user-select:none}
.rt-sess-fold>summary:hover{color:var(--dsw-alias-label-primary)}
.rt-score-row .rt-scope{font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.rt-score-form{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px}
.rt-score-form input,.rt-score-form select{width:100%;box-sizing:border-box}
.rt-vrow{display:grid;grid-template-columns:62px minmax(0,1fr) 132px 108px 74px 52px;gap:8px;padding:6px 10px;
  border-bottom:1px solid var(--dsw-alias-border-l1);align-items:center;font-size:12.5px;cursor:pointer}
.rt-vrow:hover{background:var(--dsw-alias-bg-layer-2)}
.rt-vrow.head{cursor:default;color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:600;
  position:sticky;top:0;background:var(--dsw-alias-bg-layer-1);z-index:1}
.rt-vdetail{grid-column:1/-1;padding:8px 4px 10px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.rt-vdetail .rt-kv{margin-bottom:4px}
.rt-actions{display:flex;gap:6px;margin-top:6px}
.rt-section{padding:8px 10px 2px;font-size:11.5px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.rt-link{color:var(--dsw-alias-brand-primary);text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rt-link:hover{text-decoration:underline}
.rt-full{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;
  background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:13px;line-height:1.5;
  border-top:3px solid var(--dsw-alias-brand-primary)}
.rt-full .rt-head{padding:12px 18px}
.rt-full .rt-tabs{padding:10px 18px 0;gap:6px;flex-wrap:wrap}
.rt-full .rt-side{width:260px}
.rt-full .rt-list{width:280px}
.rt-full .rt-row{grid-template-columns:190px 90px 130px 1.4fr 1.2fr}
.rt-full .rt-vrow{grid-template-columns:80px minmax(0,1.6fr) 200px 150px 90px 64px}
.rt-full .rt-pane{padding:18px}
.rt-full .rt-textarea{min-height:60vh}
.rt-full .rt-foot{padding:10px 18px;font-size:12px}
.rt-full .rt-body{max-width:1400px;width:100%;margin:0 auto;flex:1;min-height:0;display:flex;flex-direction:column}
.rt-chain{flex:1;overflow:auto;padding:10px 12px}
.rt-step{display:flex;gap:10px;padding:8px 6px;border-left:2px solid var(--dsw-alias-border-l1);margin-left:6px}
.rt-step:last-child{border-left-color:transparent}
.rt-step-dot{width:22px;height:22px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:11px;font-weight:700;color:#fff;background:#64748b;margin-left:-13px}
.rt-step-body{min-width:0}
.rt-step-title{font-weight:600;font-size:13px}
.rt-step-meta{font-size:11.5px;color:var(--dsw-alias-label-secondary);margin-top:2px;word-break:break-word}
.rt-stage-recon{background:#6366f1}
.rt-stage-vuln{background:#f59e0b}
.rt-stage-exploit{background:#ef4444}
.rt-stage-access{background:#10b981}
.rt-stage-pivot{background:#8b5cf6}
.rt-stage-data{background:#0ea5e9}
.rt-stage-other{background:#64748b}
.rt-step-head{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap}
.rt-step-time{font-size:11px;color:var(--dsw-alias-label-secondary);margin-left:auto;white-space:nowrap}
.rt-step-detail{font-size:12px;margin-top:5px;white-space:pre-wrap;word-break:break-word;
  border-left:2px solid var(--dsw-alias-border-l1);padding:2px 0 2px 9px;line-height:1.6}
.rt-chip{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;padding:1px 7px;border-radius:5px;
  border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);margin:4px 5px 0 0;max-width:100%}
.rt-chip>i{font-style:normal;color:var(--dsw-alias-label-secondary);font-size:10.5px}
.rt-chip>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:420px}
.rt-stage-tag{display:inline-block;padding:0 6px;border-radius:4px;font-size:11px;color:#fff;font-weight:600}
.rt-st-recon{background:#6366f1}.rt-st-vuln{background:#f59e0b}.rt-st-exploit{background:#ef4444}
.rt-st-access{background:#10b981}.rt-st-pivot{background:#8b5cf6}.rt-st-data{background:#0ea5e9}.rt-st-other{background:#64748b}
.rt-sev{display:inline-block;padding:0 6px;border-radius:4px;font-size:11px;font-weight:600;border:1px solid transparent}
.rt-sev-critical{color:#fff;background:#b91c1c}.rt-sev-high{color:#fff;background:#ef4444}
.rt-sev-medium{color:#7c2d12;background:#fdba74}.rt-sev-low{color:#1e3a8a;background:#bfdbfe}
.rt-sev-info{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l1)}
.rt-dot-on{display:inline-block;width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 0 3px #10b98133}
.rt-dot-off{display:inline-block;width:7px;height:7px;border-radius:50%;background:#ef4444;box-shadow:0 0 0 3px #ef444433}
.rt-dot-unk{display:inline-block;width:7px;height:7px;border-radius:50%;background:#94a3b8;box-shadow:0 0 0 3px #94a3b833}
.rt-sess-grid{display:grid;grid-template-columns:1fr;gap:8px;padding:10px 12px}
.rt-sess{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:9px 10px;background:var(--dsw-alias-bg-layer-2)}
.rt-sess-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.rt-sess-title{font-weight:600;font-size:12.5px;font-family:ui-monospace,Menlo,monospace;word-break:break-all}
.rt-sess-sub{font-size:11.5px;color:var(--dsw-alias-label-secondary);margin-top:3px;word-break:break-word}
.rt-code{font-family:ui-monospace,Menlo,monospace;font-size:11px;background:var(--dsw-alias-bg-base);
  border:1px solid var(--dsw-alias-border-l1);border-radius:4px;padding:1px 5px;cursor:pointer;word-break:break-all}
.rt-code:hover{border-color:var(--dsw-alias-brand-primary)}
.rt-evi{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden;margin-top:8px}
.rt-evi-head{display:flex;align-items:center;gap:8px;padding:5px 9px;background:var(--dsw-alias-bg-layer-2);
  font-size:11.5px;font-weight:600;border-bottom:1px solid var(--dsw-alias-border-l1)}
.rt-evi-body{margin:0;padding:9px 11px;font-family:ui-monospace,Menlo,monospace;font-size:11.5px;line-height:1.6;
  white-space:pre-wrap;word-break:break-word;max-height:340px;overflow:auto;background:var(--dsw-alias-bg-base)}
.rt-evi-body.req{max-height:220px}
.rt-hl-req{color:#10b981;font-weight:600}
.rt-hl-res{color:#0ea5e9;font-weight:600}
.rt-gain{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;padding:2px 8px;border-radius:12px;
  color:#065f46;background:#a7f3d0;border:1px solid #10b98155}
.rt-total{font-size:20px;font-weight:700;font-family:ui-monospace,Menlo,monospace}
.rt-sidehead{padding:7px 8px 2px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);
  display:flex;align-items:center;gap:5px}
.rt-sidehead-btn{cursor:pointer;outline:none;padding:6px 6px 5px;border-radius:5px;user-select:none}
.rt-sidehead-btn:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1)}
.rt-sidehead-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.rt-scope{display:inline-block;padding:0 4px;border-radius:3px;font-size:10px;font-weight:700;line-height:15px;flex:none}
.rt-scope-internal{color:#0e7490;background:#a5f3fc}
.rt-scope-external{color:#9a3412;background:#fed7aa}
.rt-hits{display:flex;flex-direction:column;gap:6px;margin-top:7px}
.rt-hit{border:1px solid var(--dsw-alias-border-l1);border-left:3px solid #10b981;border-radius:6px;
  padding:7px 9px;background:var(--dsw-alias-bg-layer-2)}
.rt-hit-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.rt-hit-idx{width:16px;height:16px;border-radius:50%;background:#10b981;color:#fff;font-size:10.5px;font-weight:700;
  display:inline-flex;align-items:center;justify-content:center;flex:none}
.rt-hit-target{font-family:ui-monospace,Menlo,monospace;font-weight:600;font-size:12px;word-break:break-all}
.rt-hit-time{margin-left:auto;font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.rt-hit-evi{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;line-height:1.65;white-space:pre-wrap;word-break:break-word;
  background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:5px;padding:6px 8px;margin-top:5px}
.rt-hit-note{font-size:11.5px;color:var(--dsw-alias-label-secondary);margin-top:4px}
.rt-cred{border:1px solid var(--dsw-alias-border-l1);border-left:3px solid #f59e0b;border-radius:6px;
  padding:8px 10px;background:var(--dsw-alias-bg-layer-2);margin-bottom:7px}
.rt-cred-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.rt-cred-host{font-family:ui-monospace,Menlo,monospace;font-weight:600;font-size:12.5px;word-break:break-all}
.rt-secret{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:1.6;background:#fef3c7;color:#78350f;
  border:1px solid #f59e0b66;border-radius:5px;padding:6px 9px;margin-top:6px;white-space:pre-wrap;word-break:break-all;
  user-select:all;cursor:text}
.rt-secret-none{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;color:var(--dsw-alias-state-error-primary);
  border:1px dashed var(--dsw-alias-state-error-primary);border-radius:5px;padding:5px 9px;margin-top:6px}
.rt-cred-meta{font-size:11.5px;color:var(--dsw-alias-label-secondary);margin-top:5px;word-break:break-word}
.rt-stage-score{background:#10b981}
.rt-counted{font-family:ui-monospace,Menlo,monospace;font-size:12px;font-weight:700;color:#065f46;background:#a7f3d0;border:1px solid #10b98155;border-radius:9px;padding:0 7px}
.rt-scorepts{font-size:11.5px;font-weight:700;color:#065f46;background:#a7f3d0;border:1px solid #10b98155;
  border-radius:10px;padding:0 7px;white-space:nowrap}
.rt-livebar{display:flex;align-items:center;gap:7px;padding:7px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);
  background:var(--dsw-alias-bg-layer-2);flex-wrap:wrap}
.rt-live-dot{width:8px;height:8px;border-radius:50%;background:#10b981;flex:none;animation:rt-pulse 1.6s ease-in-out infinite}
.rt-live-dot.idle{background:#94a3b8;animation:none}
@keyframes rt-pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 #10b98166}50%{opacity:.5;box-shadow:0 0 0 5px #10b98100}}
.rt-live-body{padding:8px 12px 2px;max-height:44vh;overflow:auto}
.rt-atest{border:1px solid var(--dsw-alias-border-l1);border-left:3px solid #10b981;border-radius:6px;
  padding:7px 10px;background:var(--dsw-alias-bg-layer-2);margin-bottom:6px}
.rt-atest.past{border-left-color:#94a3b8;opacity:.85}
.rt-atest-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.rt-atest-ip{font-family:ui-monospace,Menlo,monospace;font-weight:600;font-size:12.5px;word-break:break-all}
.rt-atest-meta{font-size:11.5px;color:var(--dsw-alias-label-secondary);margin-top:3px;word-break:break-word}
.rt-atest-notes{font-family:ui-monospace,Menlo,monospace;font-size:11px;line-height:1.6;white-space:pre-wrap;
  word-break:break-word;background:var(--dsw-alias-bg-base);border-radius:4px;padding:5px 7px;margin-top:4px;max-height:76px;overflow:auto}
.rt-concl{display:flex;align-items:center;gap:4px;padding:6px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);
  background:var(--dsw-alias-bg-layer-2);flex-wrap:wrap}
.rt-concl-i{display:inline-flex;align-items:baseline;gap:4px;padding:2px 8px;border-radius:6px;cursor:pointer;
  border:1px solid transparent}
.rt-concl-i:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1)}
.rt-concl-i.on{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-1)}
.rt-concl-i b{font-family:ui-monospace,Menlo,monospace;font-size:14px;font-weight:700}
.rt-concl-i>span{color:var(--dsw-alias-label-secondary);font-size:11.5px}
.rt-more{color:var(--dsw-alias-brand-primary);font-size:11.5px;cursor:pointer;user-select:none;margin-top:4px;display:inline-block}
.rt-more:hover{text-decoration:underline}
.rt-subtabs{display:flex;gap:4px;padding:6px 10px 0;border-bottom:1px solid var(--dsw-alias-border-l1);align-items:center}
.rt-subtab{padding:4px 10px;border-radius:6px 6px 0 0;cursor:pointer;font-size:12px;color:var(--dsw-alias-label-secondary)}
.rt-subtab.on{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);font-weight:600}
.rt-sevbar{width:3px;border-radius:2px;align-self:stretch;flex:none;margin-right:2px}
/* \u2500\u2500 \u0418\u0435\u0440\u0430\u0440\u0445\u0438\u044F \u0441\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u044F \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   L1 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u0435\u043A\u0446\u0438\u0438 .rt-sec   : \u0432\u043E \u0432\u0441\u044E \u0448\u0438\u0440\u0438\u043D\u0443, \u0431\u0435\u0437 \u0441\u043A\u0440\u0443\u0433\u043B\u0435\u043D\u0438\u0439 \u0438 \u0440\u0430\u043C\u043E\u043A, \u0446\u0432\u0435\u0442\u043D\u0430\u044F \u043F\u043E\u043B\u043E\u0441\u043A\u0430 \u0441\u043B\u0435\u0432\u0430, \u0442\u0451\u043C\u043D\u044B\u0439 \u0444\u043E\u043D \u2014\u2014 \u0432\u0441\u0435\u0433\u0434\u0430 "\u043F\u043B\u043E\u0441\u043A\u0438\u0439"
   L2 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0433\u043E .rt-atest/.rt-hit/.rt-cred/.rt-evi: \u0441 \u043E\u0442\u0441\u0442\u0443\u043F\u043E\u043C, \u0440\u0430\u043C\u043A\u043E\u0439, \u0441\u043A\u0440\u0443\u0433\u043B\u0435\u043D\u0438\u0435\u043C \u2014\u2014 \u043F\u0440\u0438\u043F\u043E\u0434\u043D\u044F\u0442\u0430
   L3 \u0434\u0435\u0442\u0430\u043B\u0438/\u0434\u043B\u0438\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 .rt-clip-body / .rt-evi-body : \u0431\u0435\u0437 \u0440\u0430\u043C\u043A\u0438, \u0441\u0430\u043C\u044B\u0439 \u0441\u0432\u0435\u0442\u043B\u044B\u0439, \u043C\u043E\u043D\u043E\u0448\u0438\u0440\u0438\u043D\u043D\u044B\u0439
   L4 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 \u043F\u043E\u0434\u043F\u0443\u043D\u043A\u0442\u043E\u0432 .rt-sec-body: \u043E\u0442\u0441\u0442\u0443\u043F \u0441\u043B\u0435\u0432\u0430 + \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0449\u0430\u044F, \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0449\u0430\u044F "\u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u043D\u043E\u0441\u0442\u044C \u0432\u0435\u0440\u0445\u043D\u0435\u043C\u0443 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0443"
   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.rt-sec-wrap{margin:0}
.rt-sec{display:flex;align-items:center;gap:8px;padding:7px 12px 7px 9px;cursor:pointer;
  background:var(--dsw-alias-bg-layer-2);border-left:3px solid var(--dsw-alias-border-l2);
  border-top:1px solid var(--dsw-alias-border-l1);user-select:none;outline:none}
.rt-sec:hover{background:var(--dsw-alias-bg-layer-1)}
.rt-sec:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.rt-sec.flat{cursor:default}
.rt-sec.flat:hover{background:var(--dsw-alias-bg-layer-2)}
.rt-sec-caret{flex:none;width:11px;font-size:10px;color:var(--dsw-alias-label-secondary);text-align:center}
.rt-sec-title{font-weight:600;font-size:13px;white-space:nowrap}
.rt-sec-count{font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.rt-sec-sub{font-size:11.5px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rt-sec-right{margin-left:auto;font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:none}
.rt-sec.t-stage{border-left-color:#8b5cf6}
.rt-sec.t-target{border-left-color:#0ea5e9}
.rt-sec.t-folder{border-left-color:#64748b}
.rt-sec.t-test{border-left-color:#10b981}
.rt-sec.t-queue{border-left-color:#f59e0b}
.rt-sec.t-past{border-left-color:#94a3b8}
.rt-sec-body{margin-left:12px;border-left:1px solid var(--dsw-alias-border-l1);padding:7px 0 3px 10px}
.rt-sec-body>.rt-atest:last-child,.rt-sec-body>.rt-hit:last-child{margin-bottom:2px}
/* \u0421\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u0438\u043D\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430 (L3): \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043F\u0440\u0435\u0432\u044C\u044E \u0432 2 \u0441\u0442\u0440\u043E\u043A\u0438 \u0441 \u0437\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435\u043C, \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u0438\u044F \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435 \u0432\u044B\u0441\u043E\u0442\u044B \u0441\u043E \u0441\u043A\u0440\u043E\u043B\u043B\u043E\u043C */
.rt-clip{margin-top:6px}
.rt-clip-head{display:flex;align-items:center;gap:6px}
.rt-clip-label{font-size:11px;color:var(--dsw-alias-label-secondary);font-weight:600}
.rt-clip-body{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;line-height:1.65;white-space:pre-wrap;
  word-break:break-word;background:var(--dsw-alias-bg-base);border-radius:5px;padding:6px 8px;margin-top:3px}
.rt-clip:not(.open) .rt-clip-body{max-height:46px;overflow:hidden;
  -webkit-mask-image:linear-gradient(180deg,#000 55%,transparent);mask-image:linear-gradient(180deg,#000 55%,transparent)}
.rt-clip.open .rt-clip-body{max-height:340px;overflow:auto}
.rt-flow{padding:10px 12px 16px}
.rt-flow-start,.rt-flow-end{font-size:11.5px;color:var(--dsw-alias-label-secondary);padding:4px 0}
.rt-flow-end{font-weight:600;color:var(--dsw-alias-label-primary)}
.rt-flow-link{display:flex;align-items:center;gap:8px;padding:3px 0 3px 10px}
.rt-flow-arrow{color:var(--dsw-alias-border-l2);font-size:11px;flex:none}
.rt-flow-action{font-size:11.5px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rt-flow-action.inferred{opacity:.7;font-style:italic}
.rt-flow-node{border:1px solid var(--dsw-alias-border-l1);border-left:3px solid #10b981;border-radius:8px;
  padding:8px 11px;background:var(--dsw-alias-bg-layer-2);cursor:pointer;outline:none}
.rt-flow-node:hover{border-color:var(--dsw-alias-border-l2)}
.rt-flow-node:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.rt-flow-node.overflow{border-left-color:#94a3b8;opacity:.75}
.rt-flow-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.rt-flow-idx{width:18px;height:18px;border-radius:50%;background:#10b981;color:#fff;font-size:11px;font-weight:700;
  display:inline-flex;align-items:center;justify-content:center;flex:none}
.rt-flow-node.overflow .rt-flow-idx{background:#94a3b8}
.rt-flow-name{font-weight:600;font-size:13px}
.rt-flow-pts{margin-left:auto;font-family:ui-monospace,Menlo,monospace;font-size:12.5px;font-weight:700;color:#065f46;
  background:#a7f3d0;border:1px solid #10b98155;border-radius:10px;padding:0 8px;white-space:nowrap}
.rt-flow-pts.off{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l1)}
.rt-flow-times{font-size:11px;color:var(--dsw-alias-label-secondary)}
.rt-flow-target{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;margin-top:4px;word-break:break-all;
  color:var(--dsw-alias-label-secondary)}
.rt-flow-gain{font-size:12px;margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rt-flow-detail{margin-top:7px;padding-top:7px;border-top:1px dashed var(--dsw-alias-border-l1)}
.rt-hflow-wrap{flex:1;min-height:0;display:flex;flex-direction:column;overflow:auto}
.rt-hflow{display:flex;align-items:center;gap:0;padding:16px 12px;overflow-x:auto;flex-wrap:nowrap}
.rt-hflow-item{display:flex;align-items:center;flex:none}
.rt-hflow-start,.rt-hflow-end{font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;padding:0 4px}
.rt-hflow-end{font-weight:600;color:var(--dsw-alias-label-primary)}
.rt-hflow-arrow{color:var(--dsw-alias-border-l2);padding:0 5px;font-size:13px;flex:none}
.rt-hflow-node{display:flex;align-items:center;gap:5px;border:1px solid var(--dsw-alias-border-l1);
  border-left:3px solid #10b981;border-radius:7px;padding:5px 8px;background:var(--dsw-alias-bg-layer-2);
  cursor:pointer;white-space:nowrap;outline:none}
.rt-hflow-node:hover{border-color:var(--dsw-alias-border-l2)}
.rt-hflow-node:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.rt-hflow-node.overflow{border-left-color:#94a3b8;opacity:.72}
.rt-hflow-node.open{border-color:var(--dsw-alias-brand-primary)}
.rt-hflow-pts{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;font-weight:700;color:#065f46;background:#a7f3d0;
  border-radius:8px;padding:0 6px}
.rt-hflow-node.overflow .rt-hflow-pts{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1)}
.rt-hflow-name{font-size:11.5px}
.rt-hflow-n{font-size:10.5px;color:var(--dsw-alias-label-secondary)}
.rt-rep-list{padding:10px 12px 14px}
.rt-rep-tools{display:flex;gap:6px;justify-content:flex-end;margin-bottom:8px}
.rt-rep{border:1px solid var(--dsw-alias-border-l1);border-left:3px solid #10b981;border-radius:8px;
  padding:9px 11px;margin-bottom:10px;background:var(--dsw-alias-bg-layer-2)}
.rt-rep-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.rt-rep-idx{font-size:15px;color:#10b981;font-weight:700;flex:none}
.rt-rep-name{font-weight:600;font-size:13px}
.rt-rep-meta{font-size:12px;margin-top:4px;color:var(--dsw-alias-label-secondary);word-break:break-word}
.rt-rep-meta b{color:var(--dsw-alias-label-primary);font-weight:600;margin-right:2px}
.rt-rep-missing{font-size:11.5px;color:var(--dsw-alias-state-error-primary);margin-top:6px;
  border:1px dashed var(--dsw-alias-state-error-primary);border-radius:5px;padding:5px 8px}
.rt-rep-req{margin-top:7px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;overflow:hidden}
.rt-rep-req-head{display:flex;align-items:center;gap:7px;padding:4px 8px;font-size:11.5px;font-weight:600;
  background:var(--dsw-alias-bg-layer-1);border-bottom:1px solid var(--dsw-alias-border-l1)}
.rt-rep-http{margin:0;padding:8px 10px;font-family:ui-monospace,Menlo,monospace;font-size:11.5px;line-height:1.6;white-space:pre-wrap;word-break:break-word;max-height:240px;overflow:auto;background:var(--dsw-alias-bg-base)}
/* \u2500\u2500 \xAB\u041E\u0442\u043A\u0443\u0434\u0430 \u0432\u0437\u044F\u043B\u0441\u044F \u044D\u0442\u043E\u0442 \u0448\u0430\u0433\xBB \u0432 \u043E\u0442\u0447\u0451\u0442\u0435: \u0448\u0430\u0433\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 / \u043A\u043E\u043C\u0430\u043D\u0434\u044B / \u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 / \u0442\u0443\u043D\u043D\u0435\u043B\u0438 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.rt-rep-trace{margin-top:8px;border:1px solid var(--dsw-alias-border-l1);border-radius:7px;padding:8px 10px;
  background:var(--dsw-alias-bg-base)}
.rt-rep-trace-head{display:flex;align-items:center;gap:7px;margin-bottom:5px}
.rt-rep-trace-title{font-weight:600;font-size:12.5px}
.rt-rep-trace-how{font-size:12px;color:var(--dsw-alias-label-secondary);margin-bottom:6px}
.rt-rep-step{border-left:2px solid var(--dsw-alias-border-l1);padding:2px 0 6px 9px;margin-bottom:6px}
.rt-rep-step-head{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.rt-rep-step-no{width:17px;height:17px;border-radius:50%;background:var(--dsw-alias-label-primary,#111);color:var(--dsw-alias-bg-base,#fff);
  font-size:10.5px;display:flex;align-items:center;justify-content:center;flex:none}
.rt-rep-step-title{font-weight:600;font-size:12.5px}
.rt-rep-step-detail{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:2px}
.rt-rep-step-cmd{font-size:11.5px;margin-top:4px;display:flex;gap:6px;align-items:flex-start;flex-wrap:wrap}
.rt-rep-step-cmd .rt-mono{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);
  border-radius:5px;padding:2px 6px;word-break:break-all}
.rt-rep-step-result{font-size:11.5px;margin-top:3px;word-break:break-word}
.rt-rep-src{margin-top:6px;padding-top:6px;border-top:1px dashed var(--dsw-alias-border-l1)}
.rt-rep-src-title{font-weight:600;font-size:12px;margin-bottom:3px}
/* \u2500\u2500 \u0421\u0445\u0435\u043C\u0430 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u043F\u0443\u0442\u0438 \u0430\u0442\u0430\u043A\u0438 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.rt-ap{padding:10px 12px 18px;overflow:auto}
.rt-ap-stage{margin-bottom:2px}
.rt-ap-head{display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--dsw-alias-bg-layer-2);
  border-left:4px solid #64748b;border-top:1px solid var(--dsw-alias-border-l1);border-radius:6px 6px 0 0}
.rt-ap-no{width:20px;height:20px;border-radius:5px;color:#fff;font-size:11px;font-weight:700;flex:none;
  display:inline-flex;align-items:center;justify-content:center}
.rt-ap-name{font-weight:700;font-size:13.5px}
.rt-ap-en{font-size:10px;color:var(--dsw-alias-label-secondary);letter-spacing:.3px}
.rt-ap-phase{font-size:10.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.rt-ap-goal{display:flex;align-items:baseline;gap:8px;padding:6px 10px 6px 9px;font-size:12px;
  border-left:4px solid #64748b;background:var(--dsw-alias-bg-layer-1)}
.rt-ap-goal-tag{font-size:10.5px;font-weight:700;border:1px solid;border-radius:4px;padding:0 5px;white-space:nowrap;flex:none}
.rt-ap-result{padding:7px 10px 3px;border-left:4px solid transparent}
.rt-ap-result-head{display:flex;align-items:center;gap:8px;margin-bottom:5px;flex-wrap:wrap}
.rt-ap-pts{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;font-weight:700;color:#065f46;background:#a7f3d0;
  border:1px solid #10b98155;border-radius:10px;padding:0 7px;white-space:nowrap}
.rt-ap-pts.off{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l1)}
/* \u041F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044F \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432 \u0438\u0437-\u0437\u0430 \u043B\u0438\u043C\u0438\u0442\u0430 \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0438\u043B\u0438 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u0432\u0451\u0440\u0442\u044B\u0432\u0430\u043D\u0438\u044F: \u0431\u0430\u043B\u043B\u044B \u0441\u0435\u0440\u044B\u0435 (+0), \u0447\u0442\u043E\u0431\u044B \u043D\u0435 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u043B\u043E \u043A\u0430\u043A \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 */
.rt-ap-pts.uncounted{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l1)}
.rt-ap-nth{font-size:10.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.rt-ap-hit{border:1px solid var(--dsw-alias-border-l1);border-left:3px solid #10b981;border-radius:6px;
  padding:6px 9px;margin-bottom:5px;background:var(--dsw-alias-bg-layer-2);cursor:pointer;outline:none}
.rt-ap-hit:hover{border-color:var(--dsw-alias-border-l2)}
.rt-ap-hit:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.rt-ap-hit.overflow{border-left-color:#94a3b8;opacity:.75}
.rt-ap-hit-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.rt-ap-hit-name{font-weight:600;font-size:12.5px}
.rt-ap-hit-target{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:var(--dsw-alias-label-secondary);
  margin-left:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:46%}
.rt-ap-act{font-size:11px;color:var(--dsw-alias-label-secondary);margin-top:3px}
.rt-ap-act.inferred{font-style:italic;opacity:.75}
.rt-ap-none{font-size:11.5px;color:var(--dsw-alias-label-secondary);padding:2px 0 4px}
.rt-ap-trans{display:flex;align-items:center;gap:7px;padding:2px 0 2px 14px}
.rt-ap-trans-t{font-size:11px;color:var(--dsw-alias-label-secondary)}
/* \u0421\u0445\u0435\u043C\u0430 \u043B\u0430\u0442\u0435\u0440\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u044F */
.rt-ap-h{display:flex;align-items:stretch;padding:10px 12px 14px;overflow-x:auto;flex:1;min-height:0}
.rt-ap-col{display:flex;align-items:stretch;flex:none}
.rt-ap-col-arrow{align-self:center;color:var(--dsw-alias-border-l2);padding:0 6px;font-size:12px;flex:none}
.rt-hcol{width:228px;display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l1);
  border-top:3px solid #64748b;border-radius:7px;background:var(--dsw-alias-bg-layer-1);overflow:hidden}
.rt-hcol-goal{font-size:11px;color:var(--dsw-alias-label-secondary);padding:5px 8px;line-height:1.45;
  border-bottom:1px solid var(--dsw-alias-border-l1);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.rt-hcol-body{padding:6px 8px;flex:1;min-height:0;overflow:auto}
.rt-hcol-hit{display:flex;align-items:center;gap:5px;font-size:11px;margin-bottom:3px}
.rt-hcol-hit.off{opacity:.6}
.rt-hcol-pts{font-family:ui-monospace,Menlo,monospace;font-size:10.5px;font-weight:700;color:#065f46;background:#a7f3d0;
  border-radius:7px;padding:0 5px;flex:none}
.rt-hcol-hit.off .rt-hcol-pts{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2)}
.rt-hcol-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rt-hcol-none{font-size:11px;color:var(--dsw-alias-label-secondary)}
.rt-hcol-secs{display:flex;flex-wrap:wrap;gap:3px;margin-top:6px}
.rt-hcol-sec{font-size:10px;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);
  border-radius:4px;padding:0 4px}
.rt-hcol-attck{font-family:ui-monospace,Menlo,monospace;font-size:9.5px;color:var(--dsw-alias-label-secondary);
  padding:4px 8px;border-top:1px solid var(--dsw-alias-border-l1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rt-ap-cum{font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
.rt-ap-sub{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);margin:6px 0 3px}
.rt-ap-assets,.rt-ap-tunnels{display:flex;flex-direction:column;gap:3px}
.rt-ap-asset{display:flex;align-items:center;gap:6px;font-size:11.5px;padding:3px 6px;border-radius:5px;
  background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1)}
.rt-ap-tunnel{display:flex;align-items:center;gap:6px;font-size:11.5px;padding:4px 7px;border-radius:5px;
  background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-left:3px solid #f59e0b}
.rt-hcol-sub{font-size:10.5px;color:var(--dsw-alias-label-secondary);margin-bottom:2px;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;gap:5px;align-items:center}
.rt-hcol-sub.off{opacity:.6}
.rt-hit-row{display:flex;flex-wrap:wrap;align-items:center;gap:2px 7px;font-size:11.5px;padding:4px 7px;border-radius:5px;
  background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);margin-bottom:3px}
/* \u0410\u043A\u0442\u0438\u0432\u044B \u0438 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u044F\u0442\u0441\u044F \u0430\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u043E: \u0434\u043B\u0438\u043D\u043D\u044B\u0435 \u0434\u043E\u043C\u0435\u043D\u044B/\u043F\u0430\u0440\u043E\u043B\u0438/\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0441 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u043E\u043C, \u0431\u0435\u0437 \u043E\u0431\u0440\u0435\u0437\u043A\u0438 \u0432 \u043C\u043D\u043E\u0433\u043E\u0442\u043E\u0447\u0438\u0435 */
.rt-hit-asset{font-family:ui-monospace,Menlo,monospace;font-weight:600;flex:0 1 auto;max-width:100%;
  overflow-wrap:anywhere;word-break:break-word}
.rt-hit-txt{flex:1 1 100%;color:var(--dsw-alias-label-primary);line-height:1.55;
  white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word}
.rt-hit-txt.none{color:var(--dsw-alias-state-error-primary)}
.rt-hit-row .rt-hit-time{flex:none;margin-left:auto}
/* \u0421\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435/\u0440\u0430\u0437\u0432\u0451\u0440\u043D\u0443\u0442\u044B\u0435 \u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438: \u0444\u0438\u043A\u0441\u0438\u0440\u0443\u044E\u0442\u0441\u044F, \u043D\u043E \u0431\u0430\u043B\u043B\u043E\u0432 \u043D\u0435 \u0434\u0430\u044E\u0442, \u0432\u0441\u044F \u0441\u0442\u0440\u043E\u043A\u0430 \u043F\u0440\u0438\u0433\u043B\u0443\u0448\u0435\u043D\u0430 */
.rt-hit-row.self-created{opacity:.72;border-left:3px solid #ef444488}
/* \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438/\u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0411\u0414 \u0442\u043E\u0433\u043E \u0436\u0435 \u0430\u043A\u0442\u0438\u0432\u0430 \u0438 \u043F\u043E\u0440\u0442\u0430: \u0441\u0435\u0440\u0432\u0438\u0441 \u0443\u0436\u0435 \u0432\u0437\u044F\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E, \u0431\u0430\u043B\u043B\u043E\u0432 \u043D\u0435\u0442 (\u0442\u043E\u043B\u044C\u043A\u043E \u0444\u0438\u043A\u0441\u0430\u0446\u0438\u044F) */
.rt-hit-row.service-capped{opacity:.72;border-left:3px solid #f59e0b88}
.rt-hit-row.service-capped .rt-hit-idx{background:#f59e0b}
.rt-rep-group{margin-bottom:14px}
.rt-rep-stage{display:flex;align-items:center;gap:8px;padding:7px 10px;margin-bottom:7px;
  background:var(--dsw-alias-bg-layer-2);border-left:4px solid #64748b;border-radius:6px;
  cursor:pointer;outline:none;user-select:none}
.rt-rep-stage:hover{background:var(--dsw-alias-bg-layer-1)}
.rt-rep-stage:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.rt-rep-no{width:20px;height:20px;border-radius:5px;color:#fff;font-size:11px;font-weight:700;flex:none;
  display:inline-flex;align-items:center;justify-content:center}
.rt-rep-stage-name{font-weight:700;font-size:13px}
.rt-rep-stage-n{font-size:11px;color:var(--dsw-alias-label-secondary)}
/* \u041F\u043E\u0441\u043B\u0435 \u0441\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0441\u0440\u0430\u0437\u0443 \u0432\u0438\u0434\u043D\u043E, \xAB\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0431\u0430\u043B\u043B\u043E\u0432 \u0434\u0430\u043B \u044D\u0442\u0430\u043F\xBB, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0441\u0447\u0451\u0442 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0432 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0435 */
.rt-rep-pts{font-size:11px;font-weight:600;padding:1px 6px;border-radius:5px;border:1px solid transparent;flex:none}
.rt-rep-body{padding-left:6px}
/* \u2500\u2500 \u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439 (POC/EXP) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.rt-kb-filter{display:flex;align-items:center;gap:7px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
/* \u041E\u0431\u0437\u043E\u0440 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439 \u0431\u0430\u0437\u044B \u0437\u043D\u0430\u043D\u0438\u0439: \u043E\u0434\u043D\u0430 \u0441\u0442\u0440\u043E\u043A\u0430 \u0442\u0435\u0433\u043E\u0432, \u043A\u043B\u0438\u043A \u0444\u0438\u043B\u044C\u0442\u0440\u0443\u0435\u0442 \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 */
.rt-kb-cats{display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
/* \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0433\u0440\u0443\u043F\u043F\u044B \u0431\u0430\u0437\u044B \u0437\u043D\u0430\u043D\u0438\u0439 (\u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u043D\u0430 \u0433\u0440\u0443\u043F\u043F\u0443 \u043F\u0440\u0438 \u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0435 \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C) */
.rt-kb-cat{display:flex;align-items:center;gap:7px;padding:7px 10px;background:var(--dsw-alias-bg-layer-2);
  border-bottom:1px solid var(--dsw-alias-border-l1);position:sticky;top:0;z-index:1}
.rt-kb-cat-name{font-weight:600;font-size:12.5px}
/* \u0411\u0435\u0439\u0434\u0436 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0438 \u043D\u0430\u0432\u044B\u043A\u0430 (\u0432\u043A\u043B\u0430\u0434\u043A\u0430 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u043D\u0430\u0432\u044B\u043A\u043E\u0432) */
.rt-avail{display:inline-block;padding:0 5px;border-radius:4px;font-size:10.5px;white-space:nowrap;
  border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.rt-avail-available{color:#10b981;border-color:#10b98155;background:#10b9811a}
.rt-avail-broken{color:#ef4444;border-color:#ef444455;background:#ef44441a}
.rt-avail-unknown{color:#94a3b8;border-color:#94a3b855;background:#94a3b81a}
/* \u041C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E \u0432\u0435\u0440\u0441\u0438\u0438 / \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F */
.rt-modal{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center}
.rt-modal-box{width:min(560px,92vw);max-height:80vh;overflow:auto;background:var(--dsw-alias-bg-layer-1);
  border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:14px 16px;font-size:12.5px;line-height:1.7;
  box-shadow:0 18px 48px rgba(0,0,0,.35);color:var(--dsw-alias-label-primary)}
.rt-modal-box .rt-kv b{min-width:76px}
.rt-kb-check{display:flex;align-items:center;gap:5px;font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;cursor:pointer}
.rt-kb{border:1px solid var(--dsw-alias-border-l1);border-radius:7px;margin:0 0 8px;overflow:hidden;
  background:var(--dsw-alias-bg-layer-2)}
.rt-kb.open{border-color:var(--dsw-alias-brand-primary)}
.rt-kb-head{display:flex;align-items:center;gap:7px;padding:7px 9px;cursor:pointer;outline:none;flex-wrap:wrap}
.rt-kb-head:hover{background:var(--dsw-alias-bg-layer-1)}
.rt-kb-head:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
.rt-kb-title{font-weight:600;font-size:12.5px;overflow-wrap:anywhere}
.rt-kb-kind{font-size:10px;font-weight:700;letter-spacing:.4px;padding:1px 5px;border-radius:4px;
  color:#fff;background:#64748b;flex:none}
.rt-kb-kind.k-exp{background:#ef4444}
.rt-kb-kind.k-poc{background:#f59e0b}
.rt-kb-kind.k-template{background:#8b5cf6}
.rt-kb-kind.k-script{background:#0ea5e9}
.rt-kb-kind.k-payload{background:#10b981}
.rt-kb-sub{font-size:11px;color:var(--dsw-alias-label-secondary);padding:0 9px 7px;overflow-wrap:anywhere}
.rt-kb-body{padding:0 9px 9px}
.rt-kb-actions{display:flex;gap:6px;margin:7px 0}
.rt-kb-body .rt-kv span{overflow-wrap:anywhere;word-break:break-word}
/* \u041F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044F \u043F\u043E \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u043C \u0448\u0430\u0431\u043B\u043E\u043D\u0430\u043C nuclei: \u043F\u0443\u0442\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0432\u0438\u0434\u0435\u043D \u0446\u0435\u043B\u0438\u043A\u043E\u043C (\u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C) */
.rt-kb-tpl{margin-top:12px;border-top:1px dashed var(--dsw-alias-border-l1);padding-top:8px}
.rt-kb-tpl-row{display:flex;align-items:center;gap:7px;font-size:11.5px;padding:3px 7px;border-radius:5px;
  background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);margin-bottom:3px}
.rt-kb-tpl-path{flex:0 1 auto;font-weight:600;overflow-wrap:anywhere}
.rt-kb-tpl-name{flex:1 1 auto;min-width:0;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}
.rt-md{flex:1;overflow:auto;margin:0;padding:14px 16px;font-family:ui-monospace,Menlo,monospace;font-size:12.5px;
  line-height:1.65;white-space:pre-wrap;word-break:break-word;background:var(--dsw-alias-bg-base)}
.rt-weblink{display:block;font-size:11.5px;margin-top:1px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rt-shots{margin:8px 0 4px;padding:7px 8px;border:1px solid var(--dsw-alias-border-l1);border-radius:7px;
  background:var(--dsw-alias-bg-layer-1)}
.rt-shots-head{display:flex;align-items:baseline;gap:8px;font-size:11.5px;margin-bottom:6px}
.rt-shots-n{color:var(--dsw-alias-label-secondary)}
.rt-shot-row{display:flex;gap:8px;flex-wrap:wrap}
.rt-shot{display:flex;flex-direction:column;gap:3px;max-width:220px}
.rt-shot-thumb{border:1px solid var(--dsw-alias-border-l1);border-radius:5px;background:#0b1020;
  object-fit:contain;display:block;width:auto;max-width:216px}
.rt-shot-loading{display:flex;align-items:center;justify-content:center;width:150px;font-size:11px;
  color:var(--dsw-alias-label-secondary)}
.rt-shot-cap{display:flex;align-items:center;gap:5px;font-size:10.5px;overflow-wrap:anywhere}
.rt-shot-label{color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px}
.rt-shot-zoom{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.82);display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:10px;cursor:zoom-out;padding:18px}
.rt-shot-zoom img{max-width:96vw;max-height:86vh;border-radius:6px;box-shadow:0 18px 48px rgba(0,0,0,.5)}
.rt-shot-zoom-cap{color:#e5e7eb;font-size:12px;text-align:center;max-width:90vw;overflow-wrap:anywhere}`;
  const isFullWindow = () => {
    try {
      return String(window.location.hash || "") === "#redteam-full";
    } catch {
      return false;
    }
  };
  const api = (req) => fetch("/redteam/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req)
  }).then(async (res) => {
    const text = await res.text().catch(() => "");
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      return {
        ok: false,
        error: res.status + " non-json: " + String(text).slice(0, 120)
      };
    }
    if (!res.ok) {
      return Object.assign({}, data || {}, {
        ok: false,
        error: data && (data.error || data.message) || res.status + " " + res.statusText
      });
    }
    return data;
  });
  let ui = { open: true, tab: "assets" };
  const subs = /* @__PURE__ */ new Set();
  const setUI = (patch) => {
    ui = Object.assign({}, ui, patch);
    const snap = Object.assign({}, ui);
    for (const f of Array.from(subs)) {
      try {
        f(snap);
      } catch {
      }
    }
  };
  let dockWidthTag = null;
  const setDockWidth = () => {
  };
  const useUI = () => {
    const [st, setSt] = import_react2.default.useState(() => Object.assign({}, ui));
    import_react2.default.useEffect(() => {
      const f = (snap) => setSt(Object.assign({}, snap || ui));
      subs.add(f);
      setSt(Object.assign({}, ui));
      return () => {
        subs.delete(f);
      };
    }, []);
    return st;
  };
  const POC_CAT_NAME = {
    rce: "\u0423\u0434\u0430\u043B\u0451\u043D\u043D\u043E\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434",
    deserialization: "\u0414\u0435\u0441\u0435\u0440\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F",
    "file-upload": "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u0430\u0439\u043B\u043E\u0432 getshell",
    sqli: "SQL-\u0438\u043D\u044A\u0435\u043A\u0446\u0438\u044F",
    unauthorized: "\u0414\u043E\u0441\u0442\u0443\u043F \u0431\u0435\u0437 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
    "auth-bypass": "\u041E\u0431\u0445\u043E\u0434 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 / \u043F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0438\u0439",
    "weak-password": "\u0421\u043B\u0430\u0431\u044B\u0435 \u043F\u0430\u0440\u043E\u043B\u0438 / \u0431\u0440\u0443\u0442\u0444\u043E\u0440\u0441",
    ssrf: "SSRF",
    xxe: "XXE",
    "path-traversal": "\u041E\u0431\u0445\u043E\u0434 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u043E\u0432 / \u0447\u0442\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u044B\u0445 \u0444\u0430\u0439\u043B\u043E\u0432",
    "info-leak": "\u0423\u0442\u0435\u0447\u043A\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438",
    privesc: "\u041F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u0435 \u043F\u0440\u0438\u0432\u0438\u043B\u0435\u0433\u0438\u0439 / \u043B\u0430\u0442\u0435\u0440\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435",
    tunnel: "\u0422\u0443\u043D\u043D\u0435\u043B\u044C / \u043F\u0440\u043E\u043A\u0441\u0438",
    other: "\u041F\u0440\u043E\u0447\u0435\u0435"
  };
  const POC_CAT_ORDER = Object.keys(POC_CAT_NAME);
  const ROLE_LABEL = {
    plan: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F (\u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0432\u0430\u043D\u0438\u0435)",
    recon: "\u0420\u0430\u0437\u0432\u0435\u0434\u043A\u0430",
    assess: "\u0418\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0430\u043A\u0442\u0438\u0432\u043E\u0432",
    "vuln-scan": "\u041F\u043E\u0438\u0441\u043A \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439",
    exploit: "\u042D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0430\u0446\u0438\u044F \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439",
    internal: "\u041F\u0435\u043D\u0442\u0435\u0441\u0442 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0439 \u0441\u0435\u0442\u0438"
  };
  const fmt = (s) => s ? String(s).replace("T", " ").slice(0, 16) : "\u2014";
  const shotCache = /* @__PURE__ */ new Map();
  const shotLoading = /* @__PURE__ */ new Map();
  const shotSrc = (eng, id) => shotCache.get(eng + ":" + id) || null;
  const loadShot = (eng, id) => {
    const key = eng + ":" + id;
    if (shotCache.has(key) || shotLoading.has(key)) return;
    const p = api({ op: "shotData", engagement: eng, id }).then((r) => {
      shotCache.set(
        key,
        r && r.base64 ? "data:" + (r.mime || "image/png") + ";base64," + r.base64 : ""
      );
      shotLoading.delete(key);
      const snap = Object.assign({}, ui);
      for (const f of Array.from(subs)) {
        try {
          f(snap);
        } catch {
        }
      }
    }).catch(() => {
      shotLoading.delete(key);
    });
    shotLoading.set(key, p);
  };
  const SHOT_KIND = { screenshot: "\u0416\u0438\u0432\u043E\u0439 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442", card: "\u0412\u044B\u0434\u0435\u0440\u0436\u043A\u0430 \u0438\u0437 \u0437\u0430\u043F\u0438\u0441\u0438" };
  const ShotImage = ({ eng, shot, height }) => {
    const [zoom, setZoom] = import_react2.default.useState(false);
    const src = shotSrc(eng, shot.id);
    if (src === null) {
      loadShot(eng, shot.id);
    }
    const card = shot.kind === "card";
    return h2(
      "div",
      { className: "rt-shot" },
      src === null ? h2(
        "div",
        {
          className: "rt-shot-thumb rt-shot-loading",
          style: { height: (height || 96) + "px" }
        },
        "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026"
      ) : h2("img", {
        className: "rt-shot-thumb",
        src,
        alt: shot.label || "\u0414\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E " + shot.id,
        style: { height: (height || 96) + "px", cursor: "zoom-in" },
        onClick: () => setZoom(true)
      }),
      h2(
        "div",
        { className: "rt-shot-cap" },
        h2(
          "span",
          {
            className: "rt-tag " + (card ? "rt-tag-warn" : "rt-tag-live"),
            title: card ? "\u0412\u044B\u0434\u0435\u0440\u0436\u043A\u0430 \u0441 \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430\u043C\u0438, \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0438\u0437 \u0437\u0430\u043F\u0438\u0441\u0438 \u0437\u0430 \u0434\u0435\u043D\u044C, \u0430 \u043D\u0435 \u0436\u0438\u0432\u043E\u0439 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u2014\u2014 \u0432 \u043E\u0442\u0447\u0451\u0442\u0435 \u044D\u0442\u043E \u0442\u043E\u0436\u0435 \u043F\u043E\u043C\u0435\u0447\u0430\u0435\u0442\u0441\u044F" : "\u0416\u0438\u0432\u043E\u0439 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442"
          },
          SHOT_KIND[shot.kind] || shot.kind || "\u0414\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E"
        ),
        h2(
          "span",
          { className: "rt-shot-label", title: shot.label || shot.note || "" },
          shot.label || shot.target || "#" + shot.id
        )
      ),
      zoom ? h2(
        "div",
        { className: "rt-shot-zoom", onClick: () => setZoom(false) },
        h2("img", { src, alt: shot.label || "" }),
        h2(
          "div",
          { className: "rt-shot-zoom-cap" },
          (shot.label || shot.target || "") + (card ? " \xB7 \u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0438\u0437 \u0437\u0430\u043F\u0438\u0441\u0438 \u0437\u0430 \u0434\u0435\u043D\u044C (\u043D\u0435 \u0436\u0438\u0432\u043E\u0439 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442)" : "") + (shot.captured_at ? " \xB7 " + fmt(shot.captured_at) : "") + " \xB7 \u041A\u043B\u0438\u043A \u0432 \u043B\u044E\u0431\u043E\u043C \u043C\u0435\u0441\u0442\u0435 \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u0435\u0442"
        )
      ) : null
    );
  };
  const ShotStrip = ({ eng, shots, total, title }) => {
    const list = shots || [];
    if (list.length === 0) return null;
    return h2(
      "div",
      { className: "rt-shots" },
      h2(
        "div",
        { className: "rt-shots-head" },
        h2("b", null, title || "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432"),
        h2(
          "span",
          { className: "rt-shots-n" },
          "\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u043E " + list.length + " \u0448\u0442." + (total && total > list.length ? " (\u0432\u0441\u0435\u0433\u043E \u0432 \u044D\u0442\u043E\u043C \u043F\u0443\u043D\u043A\u0442\u0435 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F " + total + " \u0448\u0442., \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u0442\u0438\u043F\u043E\u0432\u044B\u0435)" : "")
        )
      ),
      h2(
        "div",
        { className: "rt-shot-row" },
        list.map(
          (sh) => h2(ShotImage, { key: "sh" + sh.id, eng, shot: sh })
        )
      )
    );
  };
  const fmtShort = (s) => {
    const t = String(s || "").replace("T", " ");
    return t.length >= 16 ? t.slice(5, 16) : t || "\u2014";
  };
  const provLabel = (p) => p === "passive" ? "\u041F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0439" : p === "active" ? "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439" : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E";
  const clickable = (onActivate, options = {}) => {
    const props = {
      role: "button",
      tabIndex: 0,
      onClick: onActivate,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate(e);
        }
      }
    };
    if (options.label !== void 0)
      props["aria-label"] = String(options.label);
    if (options.expanded !== void 0)
      props["aria-expanded"] = options.expanded ? "true" : "false";
    return props;
  };
  const copyText = async (text) => {
    const value = text === void 0 || text === null ? "" : String(text);
    if (value === "") return false;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (e) {
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const okFlag = document.execCommand("copy");
      document.body.removeChild(ta);
      return okFlag === true;
    } catch (e) {
      return false;
    }
  };
  const copyWithFeedback = async (text, label, onResult) => {
    const okFlag = await copyText(text);
    const message = okFlag ? "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E: " + label : "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C (\u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u0434\u0430\u043B \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0431\u0443\u0444\u0435\u0440\u0443) \u2014\u2014 \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0432\u0440\u0443\u0447\u043D\u0443\u044E";
    if (typeof onResult === "function") onResult(okFlag, message);
    return okFlag;
  };
  function ProvTag(props) {
    if (!props.p) return h2("span", { className: "rt-tag" }, "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E");
    return h2(
      "span",
      { className: "rt-tag rt-tag-" + props.p },
      provLabel(props.p)
    );
  }
  const TEST_LABEL = {
    untested: "\u041D\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0441\u044F",
    testing: "\u0422\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F",
    tested: "\u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D",
    blocked: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D",
    abandoned: "\u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D",
    no_surface: "\u041D\u0435\u0442 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0430\u0442\u0430\u043A\u0438"
  };
  const PRI_LABEL = { high: "\u0412\u044B\u0441\u043E\u043A\u0438\u0439", medium: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439", low: "\u041D\u0438\u0437\u043A\u0438\u0439" };
  function PriTag(props) {
    if (!props.p) return h2("span", { className: "rt-tag" }, "\u041D\u0435 \u043E\u0446\u0435\u043D\u0451\u043D");
    return h2(
      "span",
      { className: "rt-pri rt-pri-" + props.p, title: props.title || "" },
      PRI_LABEL[props.p] || props.p
    );
  }
  function TestTag(props) {
    const st = props.s || "untested";
    return h2(
      "span",
      { className: "rt-test rt-test-" + st },
      TEST_LABEL[st] || st
    );
  }
  function AssetsTab(props) {
    const eng = props.engagement;
    const snapshot = props.snapshot;
    const refreshKey = props.refreshKey || 0;
    const onRefresh = props.onRefresh;
    const [view, setView] = import_react2.default.useState("list");
    const [cidr, setCidr] = import_react2.default.useState(null);
    const [q, setQ] = import_react2.default.useState("");
    const [qApplied, setQApplied] = import_react2.default.useState("");
    const [service, setService] = import_react2.default.useState("");
    const [port, setPort] = import_react2.default.useState("");
    const [prov, setProv] = import_react2.default.useState("");
    const [testStatus, setTestStatus] = import_react2.default.useState("");
    const [priority, setPriority] = import_react2.default.useState("");
    const [scope, setScope] = import_react2.default.useState("");
    const [assetState, setAssetState] = import_react2.default.useState("");
    const [sort, setSort] = import_react2.default.useState("priority");
    const [showAll, setShowAll] = import_react2.default.useState(null);
    const [state, setState] = import_react2.default.useState({
      loading: false,
      error: null,
      total: 0,
      items: []
    });
    const [domains, setDomains] = import_react2.default.useState(null);
    const [web, setWeb] = import_react2.default.useState(null);
    const [openId, setOpenId] = import_react2.default.useState(null);
    const [detail, setDetail] = import_react2.default.useState(null);
    const sideCollapse = useCollapse("assets-side:" + eng);
    const seq = import_react2.default.useRef(0);
    const onData = props.onData;
    import_react2.default.useEffect(() => {
      if (!eng) return;
      const my = ++seq.current;
      setState((s) => Object.assign({}, s, { loading: true, error: null }));
      api({
        op: "assets",
        engagement: eng,
        cidr: cidr || void 0,
        q: qApplied || void 0,
        service: service || void 0,
        port: port || void 0,
        provenance: prov || void 0,
        test_status: testStatus || void 0,
        priority: priority || void 0,
        scope: scope || void 0,
        state: assetState || void 0,
        sort,
        limit: 400
      }).then(
        (r) => {
          if (my !== seq.current) return;
          if (!r || r.ok === false) {
            setState({
              loading: false,
              error: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430",
              total: 0,
              items: []
            });
            return;
          }
          setState({
            loading: false,
            error: null,
            total: r.total,
            items: r.items || []
          });
          if (onData) onData();
        },
        (e) => {
          if (my === seq.current)
            setState({
              loading: false,
              error: String(e && e.message || e),
              total: 0,
              items: []
            });
        }
      );
    }, [
      eng,
      cidr,
      qApplied,
      service,
      port,
      prov,
      testStatus,
      priority,
      scope,
      assetState,
      sort,
      refreshKey
    ]);
    import_react2.default.useEffect(() => {
      if (!eng || view !== "domain") return;
      setDomains(null);
      api({ op: "domains", engagement: eng, cidr: cidr || void 0 }).then(
        (r) => setDomains(r && r.items || []),
        () => setDomains([])
      );
    }, [eng, view, cidr, refreshKey]);
    import_react2.default.useEffect(() => {
      if (!eng || view !== "web") return;
      setWeb(null);
      api({ op: "web", engagement: eng, cidr: cidr || void 0 }).then(
        (r) => setWeb(r && r.items || []),
        () => setWeb([])
      );
    }, [eng, view, cidr, refreshKey]);
    const toggleRow = (id) => {
      if (openId === id) {
        setOpenId(null);
        setDetail(null);
        return;
      }
      setOpenId(id);
      setDetail(null);
      api({ op: "asset", engagement: eng, id }).then(
        (r) => {
          if (r && r.ok && r.asset) setDetail(r.asset);
        },
        () => {
        }
      );
    };
    const segs = snapshot && snapshot.segments || [];
    const sideChildren = [];
    sideChildren.push(
      h2(
        "div",
        Object.assign(
          {
            key: "all",
            className: "rt-seg" + (cidr === null && view !== "testing" ? " on" : "")
          },
          clickable(
            () => {
              setView("list");
              setCidr(null);
            },
            {
              label: "\u0412\u0441\u0435 C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442\u044B",
              expanded: cidr === null && view !== "testing"
            }
          )
        ),
        h2("div", { className: "rt-seg-cidr" }, "\u0412\u0441\u0435 C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442\u044B"),
        h2("div", { className: "rt-seg-meta" }, segs.length + " \u043F\u043E\u0434\u0441\u0435\u0442\u0435\u0439")
      )
    );
    sideChildren.push(
      h2(
        "div",
        Object.assign(
          {
            key: "testing",
            className: "rt-seg" + (view === "testing" ? " on" : ""),
            title: "\u0418\u0434\u0443\u0449\u0438\u0435 \u0441\u043A\u0430\u043D\u044B / \u043F\u0440\u043E\u0431\u044B \u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 (\u0430\u0432\u0442\u043E\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0436\u0434\u044B\u0435 5 \u0441)"
          },
          clickable(
            () => {
              setView("testing");
              setCidr(null);
            },
            { label: "\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", expanded: view === "testing" }
          )
        ),
        h2(
          "div",
          {
            className: "rt-seg-cidr",
            style: { display: "flex", alignItems: "baseline", gap: 5 }
          },
          h2(
            "span",
            {
              className: "rt-scope rt-scope-testing",
              title: "\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 (\u043D\u0438 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F, \u043D\u0438 \u0432\u043D\u0435\u0448\u043D\u044F\u044F \u0441\u0435\u0442\u044C)"
            },
            "\u0422"
          ),
          h2("span", { style: { flex: 1 } }, "\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435")
        ),
        h2("div", { className: "rt-seg-meta" }, "\u0418\u0434\u0443\u0449\u0438\u0435 \u0441\u043A\u0430\u043D\u044B \u0438 \u043F\u0440\u043E\u0431\u044B")
      )
    );
    const segBlock = (title, list, kind) => {
      const open = sideCollapse.isOpen("scope:" + kind, true);
      const toggle = sideCollapse.toggle("scope:" + kind, true);
      const out = [
        h2(
          "div",
          {
            key: "h" + kind,
            className: "rt-sidehead rt-sidehead-btn",
            role: "button",
            tabIndex: 0,
            "aria-expanded": open ? "true" : "false",
            title: (open ? "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443" : "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443") + " (\u0438 \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u0430\u043A\u0442\u0438\u0432\u043E\u0432)",
            onClick: () => {
              setView("list");
              toggle();
            },
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setView("list");
                toggle(e);
              }
            }
          },
          h2("span", { className: "rt-sec-caret" }, open ? "\u25BE" : "\u25B8"),
          h2(
            "span",
            { className: "rt-scope rt-scope-" + kind },
            kind === "internal" ? "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F" : "\u0412\u043D\u0435\u0448\u043D\u044F\u044F"
          ),
          h2("span", null, title + " \xB7 " + list.length + " C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442\u043E\u0432"),
          h2("span", { className: "rt-spacer" }),
          h2(
            "span",
            { style: { fontWeight: 400 } },
            list.reduce((n, x) => n + (x.assets || 0), 0) + " \u0430\u043A\u0442\u0438\u0432\u043E\u0432"
          )
        )
      ];
      if (!open) return out;
      for (const s of list) {
        out.push(
          h2(
            "div",
            Object.assign(
              {
                key: s.cidr,
                className: "rt-seg" + (cidr === s.cidr ? " on" : ""),
                title: (s.org || "\u041F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u043D\u043E\u0441\u0442\u044C \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430") + " \xB7 \u0436\u0438\u0432\u044B\u0445 " + (s.live || 0) + "/" + (s.assets || 0) + " \u0445\u043E\u0441\u0442\u043E\u0432"
              },
              clickable(
                () => {
                  setView("list");
                  setCidr(s.cidr);
                },
                {
                  label: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0443 " + s.cidr,
                  expanded: cidr === s.cidr && view !== "testing"
                }
              )
            ),
            h2(
              "div",
              {
                className: "rt-seg-cidr",
                style: { display: "flex", alignItems: "baseline", gap: 5 }
              },
              h2(
                "span",
                { className: "rt-scope rt-scope-" + kind },
                kind === "internal" ? "int" : "ext"
              ),
              h2("span", { style: { flex: 1 } }, s.cidr),
              h2(
                "span",
                {
                  className: "rt-seg-meta",
                  style: { margin: 0, whiteSpace: "nowrap" }
                },
                s.assets + " \u0445\u043E\u0441\u0442\u043E\u0432"
              )
            )
          )
        );
      }
      return out;
    };
    const segExternal = segs.filter((x) => x.scope !== "internal");
    const segInternal = segs.filter((x) => x.scope === "internal");
    if (segExternal.length)
      sideChildren.push(...segBlock("\u0410\u043A\u0442\u0438\u0432\u044B \u0432\u043D\u0435\u0448\u043D\u0435\u0439 \u0441\u0435\u0442\u0438", segExternal, "external"));
    if (segInternal.length)
      sideChildren.push(...segBlock("\u0410\u043A\u0442\u0438\u0432\u044B \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0439 \u0441\u0435\u0442\u0438", segInternal, "internal"));
    const side = h2("div", { className: "rt-side" }, sideChildren);
    const toolbar = h2(
      "div",
      { className: "rt-toolbar" },
      h2("input", {
        className: "rt-input",
        style: { flex: "1 1 150px" },
        placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E IP / \u0434\u043E\u043C\u0435\u043D\u0443 / \u0444\u0438\u043D\u0433\u0435\u0440\u043F\u0440\u0438\u043D\u0442\u0443 (Enter)",
        value: q,
        onChange: (e) => setQ(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") setQApplied(q);
        }
      }),
      h2(
        "button",
        { className: "rt-btn", onClick: () => setQApplied(q) },
        "\u041F\u043E\u0438\u0441\u043A"
      ),
      h2("input", {
        className: "rt-input",
        style: { width: "78px" },
        placeholder: "\u0421\u0435\u0440\u0432\u0438\u0441",
        value: service,
        onChange: (e) => setService(e.target.value)
      }),
      h2("input", {
        className: "rt-input",
        style: { width: "60px" },
        placeholder: "\u041F\u043E\u0440\u0442",
        value: port,
        onChange: (e) => setPort(e.target.value)
      }),
      h2(
        "select",
        {
          className: "rt-input",
          value: scope,
          onChange: (e) => setScope(e.target.value)
        },
        h2("option", { value: "" }, "\u041B\u044E\u0431\u0430\u044F \u0441\u0435\u0442\u044C"),
        h2("option", { value: "external" }, "\u0422\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0435\u0448\u043D\u0438\u0435 \u0430\u043A\u0442\u0438\u0432\u044B"),
        h2("option", { value: "internal" }, "\u0422\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u0430\u043A\u0442\u0438\u0432\u044B")
      ),
      h2(
        "select",
        {
          className: "rt-input",
          value: prov,
          onChange: (e) => setProv(e.target.value),
          title: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0443 \u043F\u043E\u0440\u0442\u0430 (\u0432 \u0441\u043F\u0438\u0441\u043A\u0435 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u043A\u043E\u043B\u043E\u043D\u043A\u0438 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435\u0442, \u0432\u0438\u0434\u043D\u043E \u0432 \u0434\u0435\u0442\u0430\u043B\u044F\u0445)"
        },
        h2("option", { value: "" }, "\u041B\u044E\u0431\u043E\u0439 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A"),
        h2("option", { value: "passive" }, "\u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0435"),
        h2("option", { value: "active" }, "\u0422\u043E\u043B\u044C\u043A\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0435")
      ),
      h2(
        "select",
        {
          className: "rt-input",
          value: priority,
          onChange: (e) => setPriority(e.target.value)
        },
        h2("option", { value: "" }, "\u041B\u044E\u0431\u0430\u044F \u043F\u0440\u043E\u0441\u0442\u043E\u0442\u0430 \u0430\u0442\u0430\u043A\u0438"),
        h2("option", { value: "high" }, "\u041B\u0451\u0433\u043A\u0430\u044F (\u0432\u044B\u0441\u043E\u043A\u0430\u044F)"),
        h2("option", { value: "medium" }, "\u0421\u0440\u0435\u0434\u043D\u044F\u044F (\u0443\u043C\u0435\u0440\u0435\u043D\u043D\u0430\u044F)"),
        h2("option", { value: "low" }, "\u0422\u0440\u0443\u0434\u043D\u0430\u044F (\u043D\u0438\u0437\u043A\u0430\u044F)")
      ),
      h2(
        "select",
        {
          className: "rt-input",
          value: testStatus,
          onChange: (e) => setTestStatus(e.target.value)
        },
        h2("option", { value: "" }, "\u041B\u044E\u0431\u043E\u0439 \u0441\u0442\u0430\u0442\u0443\u0441 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F"),
        h2("option", { value: "untested" }, "\u041D\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0441\u044F"),
        h2("option", { value: "testing" }, "\u0422\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F"),
        h2("option", { value: "tested" }, "\u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D"),
        h2("option", { value: "blocked" }, "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D"),
        h2("option", { value: "abandoned" }, "\u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D"),
        h2("option", { value: "no_surface" }, "\u041D\u0435\u0442 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0430\u0442\u0430\u043A\u0438")
      ),
      h2("div", { className: "rt-spacer" }),
      h2(
        "button",
        {
          className: "rt-btn",
          title: "\u041F\u0435\u0440\u0435\u0437\u0430\u0431\u0440\u0430\u0442\u044C \u0441\u043D\u0438\u043C\u043E\u043A \u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0432\u0438\u0434\u0430",
          onClick: () => {
            if (onRefresh) onRefresh();
          }
        },
        "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
      ),
      h2(
        "button",
        {
          className: "rt-btn" + (view === "list" ? " rt-btn-primary" : ""),
          onClick: () => setView("list")
        },
        "\u0421\u043F\u0438\u0441\u043E\u043A"
      ),
      h2(
        "button",
        {
          className: "rt-btn" + (view === "timeline" ? " rt-btn-primary" : ""),
          title: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u044B \u043F\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u044F (\u043A\u043E\u0433\u0434\u0430 \u043D\u0430\u0439\u0434\u0435\u043D, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u043E\u0431\u0440\u0430\u043D\u043E \u0437\u0430 \u0434\u0435\u043D\u044C)",
          onClick: () => setView("timeline")
        },
        "\u0412\u0440\u0435\u043C\u044F \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u044F"
      ),
      h2(
        "button",
        {
          className: "rt-btn" + (view === "domain" ? " rt-btn-primary" : ""),
          onClick: () => setView("domain")
        },
        "\u0414\u043E\u043C\u0435\u043D"
      ),
      h2(
        "button",
        {
          className: "rt-btn" + (view === "web" ? " rt-btn-primary" : ""),
          onClick: () => setView("web")
        },
        "Web"
      )
    );
    const tests = snapshot && snapshot.tests || {};
    const snapStats = snapshot && snapshot.stats || {};
    const noFilter = !testStatus && !priority && !scope && !prov && !assetState && !cidr;
    const conclItem = (key, label, value, active, onClick) => h2(
      "span",
      Object.assign(
        {
          key,
          className: "rt-concl-i" + (active ? " on" : ""),
          title: "\u041A\u043B\u0438\u043A \u0444\u0438\u043B\u044C\u0442\u0440\u0443\u0435\u0442 / \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u043A\u043B\u0438\u043A \u0441\u043D\u0438\u043C\u0430\u0435\u0442"
        },
        clickable(onClick, {
          label: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \xAB" + label + "\xBB (" + (value || 0) + ") ",
          expanded: active
        })
      ),
      h2("b", null, String(value || 0)),
      h2("span", null, label)
    );
    const toggleTest = (v) => {
      setTestStatus((cur) => cur === v ? "" : v);
      setAssetState("");
    };
    const conclusion = h2(
      "div",
      { className: "rt-concl" },
      conclItem("all", "\u0445\u043E\u0441\u0442\u043E\u0432", snapStats.assets, noFilter, () => {
        setTestStatus("");
        setPriority("");
        setScope("");
        setProv("");
        setAssetState("");
        setCidr(null);
      }),
      conclItem(
        "live",
        "\u0416\u0438\u0432\u044B\u0445",
        snapStats.liveAssets,
        assetState === "live",
        () => {
          setAssetState((v) => v === "live" ? "" : "live");
          setTestStatus("");
        }
      ),
      conclItem(
        "untested",
        "\u041A \u0442\u0435\u0441\u0442\u0443",
        tests.untested,
        testStatus === "untested",
        () => toggleTest("untested")
      ),
      conclItem(
        "testing",
        "\u0422\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F",
        tests.testing,
        testStatus === "testing",
        () => toggleTest("testing")
      ),
      conclItem(
        "tested",
        "\u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E",
        tests.tested,
        testStatus === "tested",
        () => toggleTest("tested")
      ),
      conclItem(
        "giveup",
        "\u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D\u043E",
        (tests.abandoned || 0) + (tests.blocked || 0),
        testStatus === "abandoned,blocked",
        () => toggleTest("abandoned,blocked")
      ),
      h2("div", { className: "rt-spacer" }),
      h2(
        "select",
        {
          className: "rt-input",
          value: sort,
          onChange: (e) => setSort(e.target.value),
          title: "\u0421\u043F\u043E\u0441\u043E\u0431 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438 \u0441\u043F\u0438\u0441\u043A\u0430"
        },
        h2("option", { value: "priority" }, "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0440\u043E\u0441\u0442\u044B\u0435"),
        h2("option", { value: "todo" }, "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0435\u043F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435"),
        h2("option", { value: "discovered" }, "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0435\u0434\u0430\u0432\u043D\u043E \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435"),
        h2("option", { value: "ports" }, "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0441 \u0431\u043E\u043B\u044C\u0448\u0438\u043C \u0447\u0438\u0441\u043B\u043E\u043C \u043F\u043E\u0440\u0442\u043E\u0432"),
        h2("option", { value: "ip" }, "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430: \u043F\u043E IP")
      )
    );
    const head = h2(
      "div",
      { className: "rt-row head" },
      h2("span", null, "IP"),
      h2("span", null, "\u041F\u0440\u043E\u0441\u0442\u043E\u0442\u0430"),
      h2("span", null, "\u0421\u0442\u0430\u0442\u0443\u0441 \u0442\u0435\u0441\u0442\u0430"),
      h2("span", null, "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0435 \u043F\u043E\u0440\u0442\u044B / \u0441\u0435\u0440\u0432\u0438\u0441\u044B"),
      h2("span", null, "\u0424\u0438\u043D\u0433\u0435\u0440\u043F\u0440\u0438\u043D\u0442")
    );
    const rowNodes = [];
    for (const it of state.items) {
      const openPorts = it.ports.filter((p) => p.state === "open");
      const portText = openPorts.map((p) => p.port + (p.service ? "/" + p.service : "")).join(", ") || "\u2014";
      const fpText = it.fingerprints.map(
        (f) => [f.vendor, f.product, f.version].filter(Boolean).join(" ")
      ).join(" / ") || "\u2014";
      const shownPorts = openPorts.slice(0, 3).map((p) => p.port + (p.service ? "/" + p.service : "")).join(", ");
      const morePorts = openPorts.length > 3 ? " +" + (openPorts.length - 3) : "";
      rowNodes.push(
        h2(
          "div",
          Object.assign(
            {
              key: "r" + it.id,
              className: "rt-row"
            },
            clickable(() => toggleRow(it.id), {
              label: "\u0420\u0430\u0441\u043A\u0440\u044B\u0442\u044C \u0430\u043A\u0442\u0438\u0432 " + it.ip,
              expanded: openId === it.id
            })
          ),
          h2(
            "span",
            {
              className: "rt-mono",
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                flexWrap: "wrap"
              }
            },
            h2(
              "span",
              {
                className: "rt-scope rt-scope-" + (it.scope === "internal" ? "internal" : "external")
              },
              it.scope === "internal" ? "int" : "ext"
            ),
            h2("span", {
              title: it.state === "live" ? "\u0416\u0438\u0432\u043E\u0439" : String(it.state),
              style: {
                width: 7,
                height: 7,
                borderRadius: "50%",
                flex: "none",
                marginTop: 4,
                background: it.state === "live" ? "#10b981" : "#94a3b8"
              }
            }),
            h2(
              "span",
              { style: { overflow: "hidden", textOverflow: "ellipsis" } },
              it.ip
            ),
            /* Время обнаружения выводим строкой под IP: колонка IP узкая, отдельную не заводим (при смене ширины колонок пришлось бы править всю таблицу) */
            h2(
              "span",
              {
                style: {
                  fontSize: 10.5,
                  color: "var(--dsw-alias-label-secondary)",
                  whiteSpace: "nowrap"
                },
                title: "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D: " + (it.discovered_at ? fmt(it.discovered_at) : "\u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E") + (it.last_seen ? "\n\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0441\u0431\u043E\u0440: " + fmt(it.last_seen) : "")
              },
              it.discovered_at ? fmtShort(it.discovered_at) : "\u0412\u0440\u0435\u043C\u044F \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"
            )
          ),
          h2(
            "span",
            null,
            h2(PriTag, { p: it.priority, title: it.potential || "" })
          ),
          h2(
            "span",
            null,
            h2(TestTag, { s: it.test_status }),
            it.blocked_count ? h2(
              "span",
              {
                className: "rt-tag",
                style: {
                  color: "#ef4444",
                  borderColor: "#ef444455",
                  marginLeft: 4
                }
              },
              "\u0411\u043B\u043E\u043A." + it.blocked_count
            ) : null
          ),
          h2("span", { title: portText }, (shownPorts || "\u2014") + morePorts),
          h2(
            "span",
            { title: fpText },
            fpText.length > 30 ? fpText.slice(0, 30) + "\u2026" : fpText
          )
        )
      );
      if (openId !== it.id) continue;
      const d = detail && detail.id === it.id ? detail : null;
      const portRows = [];
      const fpRows = [];
      const obsRows = [];
      if (d) {
        for (const p of d.ports || []) {
          if (p.state !== "open") continue;
          portRows.push(
            h2(
              "div",
              { key: "p" + p.port, className: "rt-kv" },
              h2("b", { className: "rt-mono" }, p.port + "/" + p.proto),
              h2(
                "span",
                null,
                [p.service, p.product, p.version].filter(Boolean).join(" ") || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0438\u0441"
              ),
              p.url ? h2(
                "a",
                {
                  className: "rt-link",
                  href: p.url,
                  target: "_blank",
                  rel: "noreferrer",
                  title: p.url
                },
                p.title ? p.title : p.url
              ) : null,
              h2(ProvTag, { p: p.provenance })
            )
          );
        }
        for (const f of d.fingerprints || []) {
          fpRows.push(
            h2(
              "div",
              {
                key: "f" + (f.product || "") + (f.version || "") + (f.evidence || ""),
                className: "rt-kv"
              },
              h2("b", null, f.category || "\u2014"),
              h2(
                "span",
                null,
                [f.vendor, f.product, f.version].filter(Boolean).join(" ") + (f.evidence ? "(" + f.evidence + ")" : "")
              ),
              h2(ProvTag, { p: f.provenance })
            )
          );
        }
        for (const o of (d.observations || []).slice(0, 8)) {
          obsRows.push(
            h2(
              "div",
              {
                key: "o" + (o.attr || "") + (o.value || "") + (o.collected_at || ""),
                className: "rt-kv"
              },
              h2("b", null, o.attr || "\u2014"),
              h2(
                "span",
                null,
                (o.value || "") + " \xB7 " + (o.tool || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442") + " \xB7 " + fmt(o.collected_at)
              ),
              h2(ProvTag, { p: o.provenance })
            )
          );
        }
      }
      const all = showAll === it.id;
      const noteLines = d && d.test_notes ? d.test_notes.split("\n").filter(Boolean) : [];
      const inner = d ? h2(
        "div",
        null,
        /* Три обязательные строки */
        h2(
          "div",
          { className: "rt-kv" },
          h2("b", null, "\u0422\u0435\u0441\u0442"),
          h2(
            "span",
            null,
            h2(TestTag, { s: d.test_status }),
            d.blocked_count ? h2(
              "span",
              {
                className: "rt-tag",
                style: {
                  marginLeft: 6,
                  color: "#ef4444",
                  borderColor: "#ef444455"
                }
              },
              "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D " + d.blocked_count + " \u0440\u0430\u0437"
            ) : null,
            h2(
              "span",
              {
                style: {
                  marginLeft: 8,
                  color: "var(--dsw-alias-label-secondary)"
                }
              },
              (d.test_updated_at ? fmt(d.test_updated_at) : "\u043D\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0441\u044F") + (d.test_updated_by ? " \xB7 " + d.test_updated_by : "")
            )
          )
        ),
        h2(
          "div",
          { className: "rt-kv" },
          h2("b", null, "\u041F\u0440\u043E\u0441\u0442\u043E\u0442\u0430 \u0430\u0442\u0430\u043A\u0438"),
          h2(
            "span",
            null,
            h2(PriTag, { p: d.priority }),
            h2(
              "span",
              { style: { marginLeft: 8 } },
              d.potential || "\u041D\u0435 \u043E\u0446\u0435\u043D\u0435\u043D\u043E"
            ),
            d.assess_reason ? h2(
              "span",
              {
                style: {
                  marginLeft: 8,
                  color: "var(--dsw-alias-label-secondary)"
                }
              },
              d.assess_reason
            ) : null
          )
        ),
        h2(
          "div",
          { className: "rt-kv" },
          h2("b", null, "\u041F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u044C \u0430\u0442\u0430\u043A\u0438"),
          h2(
            "span",
            null,
            d.test_surface || (portRows.length ? "\u041D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E (\u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0435 \u043F\u043E\u0440\u0442\u044B \u043D\u0438\u0436\u0435)" : "\u041D\u0435\u0442 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0445 \u043F\u043E\u0440\u0442\u043E\u0432"),
            d.scope ? h2(
              "span",
              {
                className: "rt-scope rt-scope-" + (d.scope === "internal" ? "internal" : "external"),
                style: { marginLeft: 8 }
              },
              d.scope === "internal" ? "\u0410\u043A\u0442\u0438\u0432 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0439 \u0441\u0435\u0442\u0438" : "\u0410\u043A\u0442\u0438\u0432 \u0432\u043D\u0435\u0448\u043D\u0435\u0439 \u0441\u0435\u0442\u0438"
            ) : null
          )
        ),
        h2(
          "span",
          Object.assign(
            { className: "rt-more" },
            clickable(() => setShowAll(all ? null : it.id), {
              label: all ? "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0434\u0435\u0442\u0430\u043B\u0438 \u0430\u043A\u0442\u0438\u0432\u0430" : "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0434\u0435\u0442\u0430\u043B\u0438 \u0430\u043A\u0442\u0438\u0432\u0430",
              expanded: all
            })
          ),
          all ? "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0451 \u25B2" : "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0451 (\u043F\u043E\u0440\u0442\u044B \xB7 \u0444\u0438\u043D\u0433\u0435\u0440\u043F\u0440\u0438\u043D\u0442 \xB7 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u0441\u0431\u043E\u0440\u0430 \xB7 \u0437\u0430\u043F\u0438\u0441\u0438 \u0442\u0435\u0441\u0442\u043E\u0432)\u25BC"
        ),
        all ? h2(
          "div",
          null,
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u0418\u043C\u044F \u0445\u043E\u0441\u0442\u0430"),
            h2(
              "span",
              null,
              (d.names || []).map((n) => n.name).join(", ") || "\u2014"
            )
          ),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u0412\u0440\u0435\u043C\u044F \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u044F"),
            h2(
              "span",
              {
                title: '\u041C\u043E\u043C\u0435\u043D\u0442, \u043A\u043E\u0433\u0434\u0430 \u044D\u0442\u043E\u0442 \u0430\u043A\u0442\u0438\u0432 \u0432\u043F\u0435\u0440\u0432\u044B\u0435 \u043F\u043E\u043F\u0430\u043B \u0432 \u0431\u0430\u0437\u0443 (\u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0441\u0431\u043E\u0440 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E "\u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0441\u0431\u043E\u0440")'
              },
              fmt(d.discovered_at)
            ),
            h2(
              "b",
              { style: { minWidth: 0, marginLeft: 8 } },
              "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0441\u0431\u043E\u0440"
            ),
            h2("span", null, fmt(d.last_seen)),
            h2(
              "b",
              { style: { minWidth: 0, marginLeft: 8 } },
              "\u041F\u0435\u0440\u0432\u043E\u0435 \u043F\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u0432 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0435"
            ),
            h2("span", null, fmt(d.first_seen))
          ),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442"),
            h2("span", null, d.segment_cidr)
          ),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u041F\u0440\u043E\u0441\u0442\u043E\u0442\u0430 \u0430\u0442\u0430\u043A\u0438"),
            h2(
              "span",
              null,
              (d.priority || "\u041D\u0435 \u043E\u0446\u0435\u043D\u0435\u043D\u043E") + (d.potential ? " \xB7 \u041E\u0436\u0438\u0434\u0430\u0435\u043C\u043E: " + d.potential : "") + (d.assess_reason ? " \xB7 \u041E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0435: " + d.assess_reason : "") + (d.assessed_at ? "(" + fmt(d.assessed_at) + ")" : "")
            )
          ),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A"),
            h2(
              "span",
              null,
              "\u041F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0445 \u043F\u043E\u0440\u0442\u043E\u0432 " + (d.passive || 0) + " \xB7 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u043E\u0440\u0442\u043E\u0432 " + (d.active || 0)
            )
          ),
          h2(
            "div",
            { style: { margin: "6px 0 3px", fontWeight: 600 } },
            "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0435 \u043F\u043E\u0440\u0442\u044B / \u0441\u0435\u0440\u0432\u0438\u0441\u044B"
          ),
          h2("div", null, portRows.length ? portRows : "\u2014"),
          h2(
            "div",
            { style: { margin: "6px 0 3px", fontWeight: 600 } },
            "\u0424\u0438\u043D\u0433\u0435\u0440\u043F\u0440\u0438\u043D\u0442"
          ),
          h2("div", null, fpRows.length ? fpRows : "\u2014"),
          noteLines.length ? h2(Clip, {
            key: "notes",
            label: "\u0417\u0430\u043F\u0438\u0441\u0438 \u0442\u0435\u0441\u0442\u043E\u0432 (" + noteLines.length + " \u0448\u0442.)",
            text: noteLines.join("\n")
          }) : null,
          h2(
            "div",
            { style: { margin: "6px 0 3px", fontWeight: 600 } },
            "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u0441\u0431\u043E\u0440\u0430 (\u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 8)"
          ),
          h2("div", null, obsRows.length ? obsRows : "\u2014")
        ) : null
      ) : h2("div", null, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026");
      rowNodes.push(
        h2(
          "div",
          {
            key: "d" + it.id,
            className: "rt-row",
            style: { cursor: "default", gridTemplateColumns: "1fr" }
          },
          h2("div", { className: "rt-expand" }, inner)
        )
      );
    }
    const listPane = h2(
      "div",
      { className: "rt-table" },
      head,
      rowNodes,
      !state.loading && !state.items.length ? h2("div", { className: "rt-empty" }, "\u041D\u0435\u0442 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0430\u043A\u0442\u0438\u0432\u043E\u0432") : null
    );
    const domainPane = h2(
      "div",
      { className: "rt-table" },
      domains === null ? h2("div", { className: "rt-empty" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026") : domains.length ? domains.map(
        (g) => h2(
          "div",
          { key: g.domain },
          h2(
            "div",
            {
              className: "rt-section",
              style: { padding: "8px 10px 4px" }
            },
            h2(
              "a",
              {
                className: "rt-link",
                href: "http://" + g.domain,
                target: "_blank",
                rel: "noreferrer"
              },
              g.domain
            ),
            h2(
              "span",
              { className: "rt-tag", style: { marginLeft: 8 } },
              g.count + " \u0430\u043A\u0442\u0438\u0432\u043E\u0432"
            )
          ),
          g.assets.map(
            (a) => h2(
              "div",
              {
                key: String(g.domain) + "\0" + a.id + "\0" + a.ip,
                className: "rt-row",
                style: {
                  gridTemplateColumns: "150px 130px 70px 1fr",
                  cursor: "pointer"
                },
                onClick: () => {
                  setView("list");
                  setQ("");
                  setQApplied(a.ip);
                }
              },
              h2("span", { className: "rt-mono" }, a.ip),
              h2("span", { className: "rt-mono" }, a.segment),
              h2(
                "span",
                null,
                h2(
                  "span",
                  {
                    className: "rt-tag rt-tag-" + (a.state === "live" ? "live" : "dead")
                  },
                  a.state === "live" ? "\u0416\u0438\u0432\u043E\u0439" : a.state
                )
              ),
              h2(
                "span",
                {
                  style: {
                    fontSize: 11,
                    color: "var(--dsw-alias-label-secondary)"
                  }
                },
                (a.names || []).join(", ")
              )
            )
          )
        )
      ) : h2(
        "div",
        { className: "rt-empty" },
        cidr ? "\u0412 \u044D\u0442\u043E\u043C C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0435 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0434\u043E\u043C\u0435\u043D\u043E\u0432 (\u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \xAB\u0412\u0441\u0435 C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442\u044B\xBB, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0432\u0441\u0451)" : "\u0414\u0430\u043D\u043D\u044B\u0445 \u043F\u043E \u0434\u043E\u043C\u0435\u043D\u0430\u043C \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 (\u043D\u0430 \u044D\u0442\u0430\u043F\u0435 \u0440\u0430\u0437\u0432\u0435\u0434\u043A\u0438 \u0434\u043E\u043C\u0435\u043D\u044B \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F)"
      )
    );
    const webPane = h2(
      "div",
      { className: "rt-table" },
      h2(
        "div",
        {
          className: "rt-row head",
          style: { gridTemplateColumns: "1.6fr 1.2fr 130px 110px" }
        },
        h2("span", null, "URL (\u043A\u043B\u0438\u043A\u0430\u0431\u0435\u043B\u044C\u043D\u044B\u0439)"),
        h2("span", null, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"),
        h2("span", null, "\u0410\u043A\u0442\u0438\u0432"),
        h2("span", null, "\u0421\u0435\u0440\u0432\u0438\u0441")
      ),
      (web || []).map((w) => {
        const url = w.url || "http" + (w.port === 443 || w.port === 8443 || w.port === 9443 ? "s" : "") + "://" + w.ip + (w.port === 80 || w.port === 443 ? "" : ":" + w.port);
        return h2(
          "div",
          {
            key: "w" + w.port_id,
            className: "rt-row",
            style: {
              gridTemplateColumns: "1.6fr 1.2fr 130px 110px",
              cursor: "default"
            }
          },
          h2(
            "a",
            {
              className: "rt-link rt-mono",
              href: url,
              target: "_blank",
              rel: "noreferrer",
              title: url
            },
            url
          ),
          h2("span", { title: w.title || "" }, w.title || "\u2014"),
          h2("span", { className: "rt-mono" }, w.ip + " \xB7 " + w.segment_cidr),
          h2(
            "span",
            { style: { fontSize: 11 } },
            [w.service, w.product, w.version].filter(Boolean).join(" ")
          )
        );
      }),
      web === null ? h2("div", { className: "rt-empty" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026") : !web.length ? h2(
        "div",
        { className: "rt-empty" },
        cidr ? "\u0412 \u044D\u0442\u043E\u043C C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0435 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 Web-\u0430\u043A\u0442\u0438\u0432\u043E\u0432" : "Web-\u0430\u043A\u0442\u0438\u0432\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 (\u043F\u043E\u0441\u043B\u0435 HTTP-\u043F\u0440\u043E\u0431\u044B \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F URL \u0438 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A)"
      ) : null
    );
    let pane = listPane;
    if (view === "testing")
      pane = h2(TestingTab, { engagement: eng, refreshKey });
    else if (view === "domain") pane = domainPane;
    else if (view === "web") pane = webPane;
    else if (view === "timeline")
      pane = h2(DiscoveryView, { engagement: eng, refreshKey });
    return h2(
      "div",
      { className: "rt-split" },
      side,
      h2(
        "div",
        { className: "rt-main" },
        view === "testing" ? null : toolbar,
        conclusion,
        state.error ? h2("div", { className: "rt-err" }, state.error) : null,
        pane
      )
    );
  }
  function DiscoveryView(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [day, setDay] = import_react2.default.useState("");
    import_react2.default.useEffect(() => {
      if (!eng) return;
      setData(null);
      api({ op: "discoveryTimeline", engagement: eng, limit: 200 }).then(
        (r) => {
          if (!r || r.ok === false) setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438");
          else {
            setErr(null);
            setData(r);
          }
        },
        (e) => setErr(String(e && e.message || e))
      );
    }, [eng, refreshKey]);
    if (err)
      return h2(
        "div",
        { className: "rt-pane" },
        h2("div", { className: "rt-err" }, err)
      );
    if (!data) return h2("div", { className: "rt-empty" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026");
    const recent = (data.recent || []).filter(
      (a) => day === "" || String(a.discovered_at || "").slice(0, 10) === day
    );
    return h2(
      "div",
      { className: "rt-pane", style: { flex: 1, minHeight: 0 } },
      h2(
        "div",
        { className: "rt-card" },
        h2("h4", null, "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u0430\u043A\u0442\u0438\u0432\u043E\u0432"),
        h2(
          "div",
          {
            style: { fontSize: 12, color: "var(--dsw-alias-label-secondary)" }
          },
          "\u0412\u0441\u0435\u0433\u043E " + (data.span && data.span.total || 0) + " \u0445\u043E\u0441\u0442\u043E\u0432 \xB7 \u0440\u0430\u043D\u044C\u0448\u0435 \u0432\u0441\u0435\u0445 " + (data.span && data.span.first ? fmt(data.span.first) : "\u2014") + " \xB7 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 " + (data.span && data.span.last ? fmt(data.span.last) : "\u2014") + '(\u0432\u0440\u0435\u043C\u044F \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u044F = \u043C\u043E\u043C\u0435\u043D\u0442 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044F \u0432 \u0431\u0430\u0437\u0443 \u0430\u043A\u0442\u0438\u0432\u043E\u0432; \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0441\u0431\u043E\u0440 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E "\u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0441\u0431\u043E\u0440")'
        )
      ),
      (data.days || []).length === 0 ? h2("div", { className: "rt-empty" }, "\u0410\u043A\u0442\u0438\u0432\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442.") : null,
      h2(
        "div",
        { className: "rt-card" },
        h2(
          "h4",
          null,
          "\u041F\u043E \u0434\u043D\u044F\u043C",
          day ? h2(
            "span",
            Object.assign(
              {
                className: "rt-tag",
                style: { marginLeft: 6, cursor: "pointer" }
              },
              clickable(() => setDay(""), {
                label: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0434\u043D\u044E: " + day
              })
            ),
            "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440: " + day
          ) : null
        ),
        h2(
          "div",
          { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
          (data.days || []).map(
            (d) => h2(
              "div",
              Object.assign(
                {
                  key: d.day,
                  className: "rt-seg" + (day === d.day ? " on" : ""),
                  style: { marginBottom: 0, cursor: "pointer" },
                  title: d.day + ": \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E " + d.assets + " \u0445\u043E\u0441\u0442\u043E\u0432 (\u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0445 " + d.internal + " / \u0432\u043D\u0435\u0448\u043D\u0438\u0445 " + d.external + ")"
                },
                clickable(() => setDay(day === d.day ? "" : d.day), {
                  label: "\u0424\u0438\u043B\u044C\u0442\u0440: " + d.day + " \u2014 \u0430\u043A\u0442\u0438\u0432\u044B, \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0432 \u044D\u0442\u043E\u0442 \u0434\u0435\u043D\u044C",
                  expanded: day === d.day
                })
              ),
              h2("div", { className: "rt-seg-cidr" }, d.day),
              h2(
                "div",
                { className: "rt-seg-meta" },
                d.assets + " \u0445\u043E\u0441\u0442\u043E\u0432 \xB7 \u0432\u043D\u0443\u0442\u0440. " + d.internal + " / \u0432\u043D\u0435\u0448. " + d.external
              )
            )
          )
        )
      ),
      h2(
        "div",
        { className: "rt-card" },
        h2(
          "h4",
          null,
          day ? day + " \u2014 \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0430\u043A\u0442\u0438\u0432\u044B (" + recent.length + ")" : "\u041D\u0435\u0434\u0430\u0432\u043D\u043E \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0430\u043A\u0442\u0438\u0432\u044B (" + recent.length + ")"
        ),
        recent.length === 0 ? h2("div", { className: "rt-empty" }, "\u0417\u0430 \u044D\u0442\u043E\u0442 \u0434\u0435\u043D\u044C \u043D\u043E\u0432\u044B\u0445 \u0430\u043A\u0442\u0438\u0432\u043E\u0432 \u043D\u0435\u0442.") : null,
        recent.map(
          (a) => h2(
            "div",
            { key: a.id, className: "rt-kv" },
            h2(
              "b",
              { className: "rt-mono", style: { minWidth: 110 } },
              h2(
                "span",
                {
                  className: "rt-scope rt-scope-" + (a.scope === "internal" ? "internal" : "external"),
                  style: { marginRight: 4 }
                },
                a.scope === "internal" ? "int" : "ext"
              ),
              a.ip
            ),
            h2(
              "span",
              {
                style: {
                  minWidth: 132,
                  fontSize: 11.5,
                  color: "var(--dsw-alias-label-secondary)"
                }
              },
              a.discovered_at ? fmt(a.discovered_at) : "\u0412\u0440\u0435\u043C\u044F \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"
            ),
            h2(
              "span",
              { style: { flex: 1 } },
              (a.primary_name || "\u2014") + (a.open_ports ? " \xB7 " + a.open_ports + " \u043F\u043E\u0440\u0442\u043E\u0432" : "")
            ),
            h2(PriTag, { p: a.priority })
          )
        )
      )
    );
  }
  function PromptsTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [roles, setRoles] = import_react2.default.useState([]);
    const [active, setActive] = import_react2.default.useState(null);
    const [draft, setDraft] = import_react2.default.useState("");
    const [msg, setMsg] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    import_react2.default.useEffect(() => {
      api(eng ? { op: "prompts", engagement: eng } : { op: "prompts" }).then(
        (r) => {
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F" });
            return;
          }
          setRoles(r.roles || []);
          if (r.roles && r.roles.length)
            setActive((cur2) => cur2 || r.roles[0].role);
          if (r.builtin)
            setMsg({
              ok: "\u0421\u0435\u0439\u0447\u0430\u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u043F\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E (\u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0446\u0435\u043B\u0438 \u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u0432\u043E\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0446\u0435\u043B\u0438)"
            });
        },
        (e) => setMsg({ err: String(e && e.message || e) })
      );
    }, [eng, refreshKey]);
    import_react2.default.useEffect(() => {
      const r = roles.find((x) => x.role === active);
      if (r) setDraft(r.content || "");
    }, [active, roles]);
    const save = () => {
      if (!eng) {
        setMsg({ err: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0446\u0435\u043B\u044C, \u0437\u0430\u0442\u0435\u043C \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0439\u0442\u0435 \u043F\u0440\u043E\u043C\u043F\u0442" });
        return;
      }
      setBusy(true);
      setMsg(null);
      api({
        op: "savePrompt",
        engagement: eng,
        role: active,
        content: draft
      }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F" });
            return;
          }
          setRoles(
            (list) => list.map(
              (x) => x.role === active ? Object.assign({}, x, {
                content: draft,
                updated_at: (/* @__PURE__ */ new Date()).toISOString()
              }) : x
            )
          );
          setMsg({ ok: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E" });
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const reset = (all) => {
      if (!eng) {
        setMsg({ err: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0446\u0435\u043B\u044C, \u0437\u0430\u0442\u0435\u043C \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u043C\u043F\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E" });
        return;
      }
      setBusy(true);
      setMsg(null);
      api({
        op: "resetPrompts",
        engagement: eng,
        role: all ? void 0 : active
      }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F" });
            return;
          }
          setMsg({ ok: "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B: " + (r.reset || []).join(", ") });
          api({ op: "prompts", engagement: eng }).then(
            (rr) => {
              if (rr && rr.ok) {
                setRoles(rr.roles || []);
                const cur2 = (rr.roles || []).find((x) => x.role === active);
                if (cur2) setDraft(cur2.content || "");
              }
            },
            () => {
            }
          );
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const cur = roles.find((x) => x.role === active);
    const items = roles.map(
      (r) => h2(
        "div",
        Object.assign(
          {
            key: r.role,
            className: "rt-item" + (active === r.role ? " on" : "")
          },
          clickable(
            () => {
              setActive(r.role);
              setMsg(null);
            },
            {
              label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u043C\u043F\u0442: \xAB" + r.title + "\xBB",
              expanded: active === r.role
            }
          )
        ),
        h2("div", { className: "rt-item-name" }, r.title),
        h2(
          "div",
          { className: "rt-item-desc" },
          (r.content || "").replace(/[#*`]/g, "").slice(0, 60) || "(\u043F\u0443\u0441\u0442\u043E)"
        )
      )
    );
    return h2(
      "div",
      { className: "rt-split" },
      h2("div", { className: "rt-list" }, items),
      h2(
        "div",
        { className: "rt-main" },
        h2(
          "div",
          { className: "rt-toolbar" },
          h2("span", { style: { fontWeight: 600 } }, cur ? cur.title : "\u041F\u0440\u043E\u043C\u043F\u0442"),
          h2(
            "span",
            { className: "rt-tag" },
            "\u041E\u0431\u043D\u043E\u0432\u043B\u0451\u043D " + fmt(cur && cur.updated_at)
          ),
          h2("div", { className: "rt-spacer" }),
          h2(
            "button",
            {
              className: "rt-btn",
              disabled: busy || !active,
              title: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u0434\u043B\u044F \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0440\u043E\u043B\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u043F\u0440\u043E\u043C\u043F\u0442\u0430",
              onClick: () => reset(false)
            },
            "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0443\u044E"
          ),
          h2(
            "button",
            {
              className: "rt-btn",
              disabled: busy,
              title: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435 \u0447\u0435\u0442\u044B\u0440\u0435 \u0440\u043E\u043B\u0438 \u043A \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0439 \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u043F\u0440\u043E\u043C\u043F\u0442\u0430",
              onClick: () => reset(true)
            },
            "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0435"
          ),
          h2(
            "button",
            {
              className: "rt-btn rt-btn-primary",
              disabled: busy || !active,
              onClick: save
            },
            busy ? "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u2026" : "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"
          )
        ),
        msg ? h2(
          "div",
          { className: msg.err ? "rt-err" : "rt-foot" },
          msg.err || msg.ok
        ) : null,
        h2(
          "div",
          { className: "rt-pane" },
          h2("textarea", {
            className: "rt-textarea",
            value: draft,
            spellCheck: false,
            onChange: (e) => setDraft(e.target.value),
            placeholder: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u043F\u0442 \u044D\u0442\u043E\u0439 \u0440\u043E\u043B\u0438 (Markdown)"
          }),
          h2(
            "div",
            {
              style: {
                fontSize: 11,
                color: "var(--dsw-alias-label-secondary)",
                marginTop: 6
              }
            },
            "\u041F\u043E\u0441\u043B\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u0438\u0448\u0435\u0442\u0441\u044F \u0432 agents/" + (active || "role") + ".md. \u0415\u0441\u043B\u0438 \u0432 \u043F\u0435\u0440\u0432\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0434\u043E\u0447\u0435\u0440\u043D\u0435\u0439 \u0441\u0435\u0441\u0441\u0438\u0438 \u0443\u043A\u0430\u0437\u0430\u0442\u044C redteamRole: recon, assess, vuln-scan, exploit \u0438\u043B\u0438 internal, \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u0444\u0430\u0439\u043B \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u043F\u0442."
          )
        )
      )
    );
  }
  function SkillsTab(props) {
    const refreshKey = props.refreshKey || 0;
    const [items, setItems] = import_react2.default.useState([]);
    const [meta, setMeta] = import_react2.default.useState({});
    const [err, setErr] = import_react2.default.useState(null);
    const [q, setQ] = import_react2.default.useState("");
    const [srcOnly, setSrcOnly] = import_react2.default.useState(false);
    const [active, setActive] = import_react2.default.useState(null);
    const [detail, setDetail] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const [brokenOnly, setBrokenOnly] = import_react2.default.useState(false);
    const load = (force) => {
      setBusy(true);
      api({ op: "skillCatalog", refresh: force === true }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          setMeta(r || {});
          setItems(r.items || []);
        },
        (e) => {
          setBusy(false);
          setErr(String(e && e.message || e));
        }
      );
    };
    import_react2.default.useEffect(load, [refreshKey]);
    const open = (skill) => {
      const name2 = skill && skill.name;
      const key = (skill && skill.library ? skill.library : "redteam") + ":" + name2;
      if (active === key) {
        setActive(null);
        setDetail(null);
        return;
      }
      setActive(key);
      setDetail(null);
      api({
        op: "skillRead",
        name: name2,
        library: skill.library || "redteam"
      }).then(
        (r) => {
          if (r && r.ok) setDetail(r);
          else setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
        },
        (e) => setErr(String(e && e.message || e))
      );
    };
    const needle = q.trim().toLowerCase();
    let filtered = needle ? items.filter(
      (s) => (s.name + " " + s.description + " " + s.whenToUse).toLowerCase().indexOf(needle) >= 0
    ) : items;
    if (srcOnly)
      filtered = filtered.filter(
        (s) => s.library !== "official" && s.fromPlugin === true
      );
    if (brokenOnly)
      filtered = filtered.filter(
        (s) => s.library !== "official" && (s.availability === "broken" || s.availability === "unknown")
      );
    const dirs = (meta.byDir || []).filter((d) => d.n > 0).slice(0, 6);
    const availSummary = meta.availability ? meta.availability.summary : null;
    const needRestart = err !== null && String(err).indexOf("unknown op") >= 0;
    const renderSkill = (s) => h2(
      "div",
      Object.assign(
        {
          key: (s.library || "redteam") + ":" + s.name,
          className: "rt-item" + (active === (s.library || "redteam") + ":" + s.name ? " on" : "")
        },
        clickable(() => open(s), {
          label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u0430\u0432\u044B\u043A " + s.name,
          expanded: active === (s.library || "redteam") + ":" + s.name
        })
      ),
      h2(
        "div",
        { className: "rt-item-name" },
        s.name,
        s.modelInvocable === false ? h2(
          "span",
          { className: "rt-tag", style: { marginLeft: 6 } },
          "\u0422\u043E\u043B\u044C\u043A\u043E \u0432\u0440\u0443\u0447\u043D\u0443\u044E"
        ) : null,
        s.library === "official" ? h2(
          "span",
          {
            className: "rt-tag",
            style: { marginLeft: 6 },
            title: "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u043D\u0430\u0432\u044B\u043A\u043E\u0432, \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u043E \u043F\u0443\u0442\u044F\u043C red-team \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F"
          },
          "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439"
        ) : h2(
          "span",
          {
            className: "rt-avail rt-avail-" + (s.availability || "unknown"),
            style: { marginLeft: 6 },
            title: s.availability === "available" ? "\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D: \u0442\u0435\u043A\u0441\u0442 \u043D\u0430\u0432\u044B\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F. \u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432\u043D\u0435\u0448\u043D\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438\u043B\u0438 \u043A\u043B\u044E\u0447\u0438 \u0444\u0438\u043A\u0441\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u0432 \u0434\u0435\u0442\u0430\u043B\u044F\u0445 \u0438 \u043D\u0435 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u044E\u0442 \u0432\u044B\u0437\u043E\u0432." : (s.problems || []).join("\n") || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"
          },
          s.availability === "available" ? "\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D" : s.availability === "broken" ? "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D" : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"
        ),
        h2(
          "div",
          { className: "rt-item-desc" },
          s.description || "(\u0431\u0435\u0437 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F)"
        ),
        h2(
          "div",
          { className: "rt-kb-sub" },
          [
            s.source ? "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A " + s.source : null,
            s.fromPlugin ? "\u0412\u0445\u043E\u0434\u0438\u0442 \u0432 \u044D\u0442\u043E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D" : null,
            s.provider ? s.provider : null,
            s.dir ? s.dir : null
          ].filter(Boolean).join(" \xB7 ")
        ),
        (s.problems || []).length > 0 && s.availability !== "available" && s.library !== "official" ? h2(
          "div",
          {
            className: "rt-kb-sub",
            style: {
              color: "var(--dsw-alias-state-warn-primary, #f59e0b)"
            }
          },
          "\u26A0 " + String(s.problems[0]).slice(0, 60)
        ) : null
      )
    );
    const redteamRows = filtered.filter((s) => s.library !== "official").map(renderSkill);
    const officialRows = filtered.filter((s) => s.library === "official").map(renderSkill);
    const listItems = [];
    if (redteamRows.length > 0) {
      listItems.push(
        h2(
          "div",
          {
            key: "head-redteam",
            className: "rt-kb-sub",
            style: { margin: "8px 0 4px", fontWeight: 600 }
          },
          "Red-team \u043D\u0430\u0432\u044B\u043A\u0438"
        )
      );
      listItems.push.apply(listItems, redteamRows);
    }
    if (officialRows.length > 0) {
      listItems.push(
        h2(
          "div",
          {
            key: "head-official",
            className: "rt-kb-sub",
            style: { margin: "8px 0 4px", fontWeight: 600 }
          },
          "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438"
        )
      );
      listItems.push.apply(listItems, officialRows);
    }
    return h2(
      "div",
      { className: "rt-split" },
      h2(
        "div",
        { className: "rt-list" },
        h2("input", {
          className: "rt-input",
          style: { width: "100%", marginBottom: 8, boxSizing: "border-box" },
          placeholder: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043D\u0430\u0432\u044B\u043A\u043E\u0432",
          value: q,
          onChange: (e) => setQ(e.target.value)
        }),
        h2(
          "label",
          {
            className: "rt-kb-check",
            style: { display: "flex", margin: "0 0 6px" }
          },
          h2("input", {
            type: "checkbox",
            checked: srcOnly,
            onChange: (e) => setSrcOnly(e.target.checked)
          }),
          "\u0422\u043E\u043B\u044C\u043A\u043E \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0435 \u0432 \u044D\u0442\u043E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D (" + (meta.fromPlugin || 0) + " \u0448\u0442.)"
        ),
        availSummary && (availSummary.broken > 0 || availSummary.unknown > 0) ? h2(
          "label",
          {
            className: "rt-kb-check",
            style: { display: "flex", margin: "0 0 8px" },
            title: "\u0422\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0432\u044B\u043A\u0438 \u0441 \u044F\u0432\u043D\u044B\u043C\u0438 \u043F\u0440\u043E\u0431\u0435\u043B\u0430\u043C\u0438 (\u043D\u0435\u0442 key / \u043D\u0435\u0442 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u0443\u0442\u0438 / \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0432\u0441\u0451 \u0435\u0449\u0451 \u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440) \u0438\u043B\u0438 \u0441 \u043D\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u043C\u043E\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C\u044E"
          },
          h2("input", {
            type: "checkbox",
            checked: brokenOnly,
            onChange: (e) => setBrokenOnly(e.target.checked)
          }),
          "\u0422\u043E\u043B\u044C\u043A\u043E \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435/\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0435 (" + ((availSummary.broken || 0) + (availSummary.unknown || 0)) + " \u0448\u0442.)"
        ) : null,
        availSummary ? h2(
          "div",
          {
            style: {
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              marginBottom: 6
            }
          },
          h2(
            "span",
            { className: "rt-avail rt-avail-available" },
            "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E " + (availSummary.available || 0)
          ),
          availSummary.broken > 0 ? h2(
            "span",
            { className: "rt-avail rt-avail-broken" },
            "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E " + availSummary.broken
          ) : null,
          availSummary.unknown > 0 ? h2(
            "span",
            { className: "rt-avail rt-avail-unknown" },
            "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E " + availSummary.unknown
          ) : null,
          h2(
            "span",
            Object.assign(
              {
                className: "rt-tag",
                style: { cursor: "pointer" },
                title: "\u0422\u0435\u043A\u0441\u0442 \u043D\u0430\u0432\u044B\u043A\u0430 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438\u0441\u044C? \u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u043E\u0439\u0442\u0438 30-\u0441\u0435\u043A\u0443\u043D\u0434\u043D\u044B\u0439 \u043A\u044D\u0448 \u0438 \u043F\u0435\u0440\u0435\u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C"
              },
              clickable(() => load(true), { label: "\u041F\u0435\u0440\u0435\u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C \u043D\u0430\u0432\u044B\u043A\u043E\u0432" })
            ),
            "\u041F\u0435\u0440\u0435\u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C"
          )
        ) : null,
        h2(
          "div",
          {
            style: {
              fontSize: 11,
              color: "var(--dsw-alias-label-secondary)",
              marginBottom: 6
            }
          },
          "Red-team " + (meta.libraries && meta.libraries.redteam || 0) + " \xB7 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 " + (meta.libraries && meta.libraries.official || 0),
          items.length > 100 ? h2(
            "div",
            { style: { marginTop: 3 } },
            "(\u043D\u0430\u0432\u044B\u043A\u0438 \u0432 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u043C \u0438\u0437 \u043A\u043E\u0440\u043D\u0435\u0439, \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0434\u0440\u0443\u0433\u0438\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430\u043C\u0438, \u0438\u043B\u0438 \u0438\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 \u043D\u0430\u0432\u044B\u043A\u043E\u0432; \u044D\u0442\u043E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0432\u0441\u0435\u0433\u043E " + (meta.fromPlugin || 0) + " \u0448\u0442.)"
          ) : null
        ),
        listItems
      ),
      h2(
        "div",
        { className: "rt-main" },
        h2(
          "div",
          { className: "rt-toolbar" },
          h2(
            "span",
            { style: { fontWeight: 600 } },
            detail ? detail.name : "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043D\u0430\u0432\u044B\u043A\u043E\u0432 (\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0432 DSH)"
          ),
          h2("div", { className: "rt-spacer" }),
          h2(
            "button",
            { className: "rt-btn", disabled: busy, onClick: () => load(true) },
            busy ? "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435\u2026" : "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
          )
        ),
        err ? needRestart ? h2(
          "div",
          { className: "rt-empty" },
          "\u041A\u043E\u0434 \u0445\u043E\u0441\u0442\u0430 \u044D\u0442\u043E\u0433\u043E \u043C\u043E\u0434\u0443\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u0441\u044F: \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0432\u0441\u0442\u0443\u043F\u0438\u043B\u0438 \u0432 \u0441\u0438\u043B\u0443, \u043E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0445\u043E\u0441\u0442 (\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 exe / Community Edition / dsh web)"
        ) : h2("div", { className: "rt-err" }, err) : null,
        detail ? h2(
          "div",
          { className: "rt-pane" },
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
            h2("span", null, detail.description || "\u2014")
          ),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u041A\u043E\u0433\u0434\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C"),
            h2("span", null, detail.whenToUse || "\u2014")
          ),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A"),
            h2(
              "span",
              null,
              (detail.provider || "\u2014") + " / " + (detail.source || "\u2014")
            )
          ),
          (() => {
            const s2 = items.find(
              (x) => (x.library || "redteam") + ":" + x.name === active
            );
            if (!s2) return null;
            if (s2.library === "official") {
              return h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u0422\u0438\u043F"),
                h2(
                  "span",
                  null,
                  "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043D\u0430\u0432\u044B\u043A. \u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0445\u043E\u0441\u0442\u043E\u043C \u043F\u043E \u0437\u0430\u0434\u0430\u0447\u0435, \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u043E \u043F\u0443\u0442\u044F\u043C red-team \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F."
                )
              );
            }
            const avail = s2.availability || "unknown";
            return h2(
              "div",
              null,
              h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C"),
                h2(
                  "span",
                  { className: "rt-avail rt-avail-" + avail },
                  avail === "available" ? "\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D" : avail === "broken" ? "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D (\u0435\u0441\u0442\u044C \u044F\u0432\u043D\u044B\u0435 \u043F\u0440\u043E\u0431\u0435\u043B\u044B)" : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E (\u0442\u0435\u043A\u0441\u0442 \u043D\u0435 \u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F)"
                )
              ),
              (s2.problems || []).length > 0 ? h2(
                "div",
                { className: "rt-kv" },
                h2(
                  "b",
                  null,
                  avail === "available" ? "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0432\u043D\u0435\u0448\u043D\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B" : "\u041F\u0440\u043E\u0431\u0435\u043B"
                ),
                h2(
                  "span",
                  null,
                  s2.problems.map(
                    (x, i) => h2("div", { key: "p" + i }, "\xB7 " + x)
                  )
                )
              ) : null,
              (s2.needs_user || []).length > 0 ? h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u0427\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C"),
                h2(
                  "span",
                  {
                    style: {
                      color: "var(--dsw-alias-state-warn-primary, #f59e0b)"
                    }
                  },
                  s2.needs_user.map(
                    (x, i) => h2("div", { key: "n" + i }, "\xB7 " + x)
                  )
                )
              ) : null
            );
          })(),
          detail.path ? h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u0424\u0430\u0439\u043B"),
            h2(
              "span",
              {
                className: "rt-mono",
                style: { wordBreak: "break-all" }
              },
              detail.path
            )
          ) : null,
          h2(
            "pre",
            {
              className: "rt-md",
              style: {
                border: "1px solid var(--dsw-alias-border-l1)",
                borderRadius: 6,
                maxHeight: "52vh"
              }
            },
            detail.content || "(\u043F\u0443\u0441\u0442\u043E)"
          )
        ) : h2(
          "div",
          { className: "rt-pane" },
          h2(
            "div",
            {
              style: {
                fontSize: 12,
                color: "var(--dsw-alias-label-secondary)",
                marginBottom: 8
              }
            },
            meta.note || "\u041D\u0430\u0432\u044B\u043A\u0430\u043C\u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u043D\u0430\u0442\u0438\u0432\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 skill \u0432 DSH, red-team \u0430\u0433\u0435\u043D\u0442 \u0432\u044B\u0437\u044B\u0432\u0430\u0435\u0442 \u0438\u0445 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u043C skill."
          ),
          availSummary ? h2(
            "div",
            {
              style: {
                fontSize: 12,
                marginBottom: 8,
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                alignItems: "center"
              }
            },
            h2(
              "span",
              { className: "rt-avail rt-avail-available" },
              "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E " + (availSummary.available || 0)
            ),
            availSummary.broken > 0 ? h2(
              "span",
              { className: "rt-avail rt-avail-broken" },
              "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E " + availSummary.broken
            ) : null,
            availSummary.unknown > 0 ? h2(
              "span",
              { className: "rt-avail rt-avail-unknown" },
              "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E " + availSummary.unknown
            ) : null,
            h2(
              "span",
              { style: { color: "var(--dsw-alias-label-secondary)" } },
              "(" + (meta.availability && meta.availability.cached ? "\u043A\u044D\u0448 \u043E\u0442 " : "\u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E ") + (meta.availability && meta.availability.checked_at ? fmt(meta.availability.checked_at) : "\u2014") + ")"
            )
          ) : null,
          meta.availability && (meta.availability.broken || []).length > 0 ? h2(
            "div",
            { className: "rt-hint" },
            h2(
              "div",
              { style: { fontWeight: 600, marginBottom: 4 } },
              "\u041D\u0430\u0432\u044B\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442:"
            ),
            meta.availability.broken.slice(0, 12).map(
              (b) => h2(
                "div",
                { key: b.name },
                "\xB7 " + b.name + (b.problems && b.problems.length ? " \u2014 " + b.problems[0] : "")
              )
            )
          ) : null,
          (meta.byDir || []).slice(0, 6).map(
            (d) => h2(
              "div",
              {
                key: d.key,
                className: "rt-mono",
                style: {
                  fontSize: 11,
                  marginBottom: 2,
                  overflowWrap: "anywhere"
                }
              },
              d.n + " \u0448\u0442. \xB7 " + d.key
            )
          ),
          (meta.byDir || []).length > 6 ? h2(
            "div",
            {
              style: {
                fontSize: 11,
                color: "var(--dsw-alias-label-secondary)"
              }
            },
            "\u2026\u0435\u0449\u0451 " + ((meta.byDir || []).length - 6) + " \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u043E\u0432 (\u0432\u0441\u0435\u0433\u043E " + items.length + " \u043D\u0430\u0432\u044B\u043A\u043E\u0432)"
          ) : null,
          h2("div", { className: "rt-empty" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0430\u0432\u044B\u043A \u0441\u043B\u0435\u0432\u0430, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435")
        )
      )
    );
  }
  const SEV_LABEL = {
    critical: "\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439",
    high: "\u0412\u044B\u0441\u043E\u043A\u0438\u0439",
    medium: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439",
    low: "\u041D\u0438\u0437\u043A\u0438\u0439",
    info: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439"
  };
  const STATUS_LABEL = {
    candidate: "\u041A \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435",
    confirmed: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0430",
    "false-positive": "\u041B\u043E\u0436\u043D\u043E\u0435 \u0441\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u043D\u0438\u0435",
    exploited: "\u041F\u0440\u043E\u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430",
    fixed: "\u0418\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430"
  };
  const sevClass = (s) => "rt-sev rt-sev-" + (SEV_LABEL[s] ? s : "info");
  function targetKeyOf(v) {
    const t = String(v.target || "").trim();
    if (t !== "") {
      const url = /^([a-z][a-z0-9+.-]*:\/\/[^/?#\s]+)/i.exec(t);
      if (url) return url[1];
      const head = /^([^\s/?#]+)/.exec(t);
      if (head) return head[1];
      return t;
    }
    return v.asset_ip || "(\u0446\u0435\u043B\u044C \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430)";
  }
  function HttpBlock(props) {
    const text = String(props.text || "");
    if (!text) return null;
    const lines = text.split(/\r?\n/);
    const nodes = lines.map((ln, i) => {
      let cls = null;
      if (i === 0 && /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH|TRACE)\s/.test(ln))
        cls = "rt-hl-req";
      else if (i === 0 && /^HTTP\//.test(ln)) cls = "rt-hl-res";
      else if (/^[A-Za-z0-9-]+:/.test(ln)) {
        const name2 = ln.split(":")[0].toLowerCase();
        if (name2 === "host" || name2 === "cookie" || name2 === "authorization" || name2 === "content-type")
          cls = "rt-hl-req";
      }
      return h2(
        "div",
        { key: "l" + i, className: cls || void 0 },
        ln === "" ? "\xA0" : ln
      );
    });
    return h2(
      "pre",
      { className: "rt-evi-body" + (props.compact ? " req" : "") },
      nodes
    );
  }
  function detailEvidence(v) {
    const evi = String(v.evidence || "").trim();
    const looksHttp = /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH|HTTP\/)/m.test(evi) || /\n[A-Za-z-]+: /.test(evi);
    const blocks = [];
    if (evi) {
      blocks.push(
        h2(
          "div",
          { key: "ev", className: "rt-evi" },
          h2(
            "div",
            { className: "rt-evi-head" },
            "\u0421\u0432\u043E\u0434\u043A\u0430 \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432",
            h2("span", { className: "rt-tag" }, looksHttp ? "\u0421\u044B\u0440\u043E\u0439 \u043F\u0430\u043A\u0435\u0442" : "\u0422\u0435\u043A\u0441\u0442"),
            h2("div", { className: "rt-spacer" }),
            h2(
              "button",
              {
                className: "rt-btn",
                style: { padding: "0 6px", fontSize: 11 },
                onClick: (e) => {
                  e.stopPropagation();
                  copyText(evi);
                }
              },
              "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
            )
          ),
          looksHttp ? h2(HttpBlock, { text: evi }) : h2("pre", { className: "rt-evi-body" }, evi)
        )
      );
    }
    const http = v.http_evidence || [];
    for (const e of http) {
      blocks.push(
        h2(
          "div",
          { key: "h" + e.id, className: "rt-evi" },
          h2(
            "div",
            { className: "rt-evi-head" },
            e.label || "HTTP-\u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E",
            h2(
              "span",
              { className: "rt-tag" },
              (e.method || "") + " " + (e.status === null || e.status === void 0 ? "" : e.status)
            ),
            h2("div", { className: "rt-spacer" }),
            h2(
              "span",
              {
                style: {
                  fontWeight: 400,
                  color: "var(--dsw-alias-label-secondary)"
                }
              },
              fmt(e.captured_at || e.created_at)
            )
          ),
          e.request ? h2(
            "div",
            null,
            h2(
              "div",
              { className: "rt-evi-head", style: { borderTop: "none" } },
              "\u25B8 \u0417\u0430\u043F\u0440\u043E\u0441 (\u043C\u043E\u0436\u043D\u043E \u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u044F\u043C\u043E \u0432 Burp Repeater)"
            ),
            h2(HttpBlock, { text: e.request, compact: true })
          ) : null,
          e.response ? h2(
            "div",
            null,
            h2("div", { className: "rt-evi-head" }, "\u25B8 \u041E\u0442\u0432\u0435\u0442"),
            h2(HttpBlock, { text: e.response })
          ) : null,
          e.note ? h2(
            "pre",
            { className: "rt-evi-body", style: { maxHeight: 80 } },
            e.note
          ) : null
        )
      );
    }
    if (blocks.length === 0) {
      blocks.push(
        h2(
          "div",
          { key: "none", className: "rt-kv" },
          h2("b", null, "\u0414\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430"),
          h2(
            "span",
            { style: { color: "var(--dsw-alias-state-error-primary)" } },
            "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u2014\u2014 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0438 \u0431\u0435\u0437 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0438 \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432 \u0432 \u043E\u0442\u0447\u0451\u0442 \u043D\u0435 \u043F\u043E\u043F\u0430\u0434\u0430\u044E\u0442, \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 redteam_http_evidence_add"
          )
        )
      );
    }
    return h2("div", { key: "eviwrap" }, blocks);
  }
  function FindingsTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [sev, setSev] = import_react2.default.useState("");
    const [status, setStatus] = import_react2.default.useState("");
    const [q, setQ] = import_react2.default.useState("");
    const [qApplied, setQApplied] = import_react2.default.useState("");
    const [state, setState] = import_react2.default.useState({
      loading: false,
      error: null,
      total: 0,
      items: [],
      stats: null
    });
    const [creds, setCreds] = import_react2.default.useState([]);
    const [accesses, setAccesses] = import_react2.default.useState([]);
    const [files, setFiles] = import_react2.default.useState([]);
    const [openId, setOpenId] = import_react2.default.useState(null);
    const [msg, setMsg] = import_react2.default.useState(null);
    const [subTab, setSubTab] = import_react2.default.useState("vulns");
    const [grouped, setGrouped] = import_react2.default.useState(true);
    const collapse = useCollapse("findings:" + eng);
    const load = () => {
      if (!eng) return;
      api({
        op: "vulns",
        engagement: eng,
        severity: sev || void 0,
        status: status || void 0,
        q: qApplied || void 0,
        limit: 200
      }).then(
        (r) => {
          if (!r || r.ok === false) {
            setState({
              loading: false,
              error: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430",
              total: 0,
              items: [],
              stats: null
            });
            return;
          }
          setState({
            loading: false,
            error: null,
            total: r.total,
            items: r.items || [],
            stats: r.stats || null
          });
        },
        (e) => setState({
          loading: false,
          error: String(e && e.message || e),
          total: 0,
          items: [],
          stats: null
        })
      );
      api({ op: "credentials", engagement: eng }).then(
        (r) => setCreds(r && r.items || []),
        () => {
        }
      );
      api({ op: "access", engagement: eng }).then(
        (r) => setAccesses(r && r.items || []),
        () => {
        }
      );
      api({ op: "attackFiles", engagement: eng }).then(
        (r) => setFiles(r && r.items || []),
        () => {
        }
      );
    };
    import_react2.default.useEffect(load, [eng, sev, status, qApplied, refreshKey]);
    const setVulnStatus = (id, next) => {
      setMsg(null);
      api({
        op: "updateVuln",
        engagement: eng,
        id,
        patch: { status: next }
      }).then(
        (r) => {
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F" });
            return;
          }
          setMsg({ ok: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \xAB" + (STATUS_LABEL[next] || next) + "\xBB" });
          load();
        },
        (e) => setMsg({ err: String(e && e.message || e) })
      );
    };
    const stats = state.stats && state.stats.bySeverity ? state.stats : { bySeverity: {}, byStatus: {} };
    const needRestart = state.error !== null && String(state.error).indexOf("unknown op") >= 0;
    const allFiles = (files || []).flatMap(
      (g) => (g.files || []).map((f) => Object.assign({ target: g.target }, f))
    );
    const filesByVuln = /* @__PURE__ */ new Map();
    const orphanFiles = [];
    for (const f of allFiles) {
      const vid = f.vuln_id === null || f.vuln_id === void 0 ? null : Number(f.vuln_id);
      if (vid === null) {
        orphanFiles.push(f);
        continue;
      }
      if (!filesByVuln.has(vid)) filesByVuln.set(vid, []);
      filesByVuln.get(vid).push(f);
    }
    const concl = (key, label, value, active, onClick) => h2(
      "span",
      Object.assign(
        {
          key,
          className: "rt-concl-i" + (active ? " on" : ""),
          title: "\u041A\u043B\u0438\u043A \u0444\u0438\u043B\u044C\u0442\u0440\u0443\u0435\u0442 / \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u043A\u043B\u0438\u043A \u0441\u043D\u0438\u043C\u0430\u0435\u0442"
        },
        clickable(onClick, {
          label: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \xAB" + label + "\xBB (" + (value || 0) + ") ",
          expanded: active
        })
      ),
      h2("b", null, String(value || 0)),
      h2("span", null, label)
    );
    const conclusion = h2(
      "div",
      { className: "rt-concl" },
      concl(
        "conf",
        "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E",
        stats.byStatus.confirmed || 0,
        status === "confirmed",
        () => setStatus((v) => v === "confirmed" ? "" : "confirmed")
      ),
      concl(
        "exp",
        "\u041F\u0440\u043E\u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E",
        stats.byStatus.exploited || 0,
        status === "exploited",
        () => setStatus((v) => v === "exploited" ? "" : "exploited")
      ),
      concl(
        "crit",
        "\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435",
        stats.bySeverity.critical || 0,
        sev === "critical",
        () => setSev((v) => v === "critical" ? "" : "critical")
      ),
      concl(
        "high",
        "\u0412\u044B\u0441\u043E\u043A\u0438\u0435",
        stats.bySeverity.high || 0,
        sev === "high",
        () => setSev((v) => v === "high" ? "" : "high")
      ),
      concl(
        "med",
        "\u0421\u0440\u0435\u0434\u043D\u0438\u0435",
        stats.bySeverity.medium || 0,
        sev === "medium",
        () => setSev((v) => v === "medium" ? "" : "medium")
      ),
      concl("gain", "\u041F\u043E\u043B\u0443\u0447\u0435\u043D \u0434\u043E\u0441\u0442\u0443\u043F", stats.withGained || 0, false, () => {
      }),
      h2("div", { className: "rt-spacer" }),
      h2(
        "span",
        { style: { fontSize: 11, color: "var(--dsw-alias-label-secondary)" } },
        "\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0441\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u043F\u043E \u0446\u0435\u043B\u0438 \xB7 \u0432\u0441\u0435\u0433\u043E " + (stats.targetGroups || 0) + " \u0446\u0435\u043B\u0435\u0439"
      )
    );
    const head = h2(
      "div",
      { className: "rt-vrow head" },
      h2("span", null, "\u0423\u0440\u043E\u0432\u0435\u043D\u044C"),
      h2("span", null, "\u0423\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044C / \u043D\u043E\u043C\u0435\u0440"),
      h2("span", null, "\u0426\u0435\u043B\u044C"),
      h2("span", null, "\u0427\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E"),
      h2("span", null, "\u0421\u0442\u0430\u0442\u0443\u0441"),
      h2("span", null, "\u0414\u043E\u0441\u0442\u043E\u0432\u0435\u0440\u043D\u043E\u0441\u0442\u044C")
    );
    const vulnRows = (v, compact) => {
      const out = [];
      const gainedList = String(v.gained || "").split(/[、,;，；]/).map((x) => x.trim()).filter(Boolean);
      const open = openId === v.id;
      out.push(
        h2(
          "div",
          {
            key: "v" + v.id,
            className: "rt-vrow",
            role: "button",
            tabIndex: 0,
            style: compact ? {
              cursor: "pointer",
              gridTemplateColumns: "58px minmax(0,1fr) 104px 68px"
            } : { cursor: "pointer" },
            onClick: () => setOpenId(open ? null : v.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenId(open ? null : v.id);
              }
            }
          },
          h2(
            "span",
            null,
            h2(
              "span",
              { className: sevClass(v.severity) },
              SEV_LABEL[v.severity] || v.severity
            )
          ),
          h2(
            "span",
            { title: v.title || "" },
            h2("span", { className: "rt-sec-caret" }, open ? "\u25BE" : "\u25B8"),
            (v.cve ? v.cve + " " : "") + (v.title || "")
          ),
          compact ? null : h2(
            "span",
            { className: "rt-mono", title: v.target || "" },
            v.target || v.asset_ip || "\u2014"
          ),
          h2(
            "span",
            { title: v.gained || "" },
            gainedList.length ? h2(
              "span",
              {
                className: "rt-gain",
                style: {
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "inline-block"
                }
              },
              gainedList[0] + (gainedList.length > 1 ? " +" + (gainedList.length - 1) : "")
            ) : h2(
              "span",
              { style: { color: "var(--dsw-alias-label-secondary)" } },
              "\u2014"
            )
          ),
          h2(
            "span",
            null,
            h2(
              "span",
              { className: "rt-tag" },
              STATUS_LABEL[v.status] || v.status
            )
          ),
          compact ? null : h2(
            "span",
            null,
            v.confidence === null || v.confidence === void 0 ? "\u2014" : Math.round(v.confidence * 100) + "%"
          )
        )
      );
      if (openId !== v.id) return out;
      out.push(
        h2(
          "div",
          {
            key: "vd" + v.id,
            className: "rt-vrow",
            style: { cursor: "default", gridTemplateColumns: "1fr" }
          },
          h2(
            "div",
            { className: "rt-vdetail" },
            h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u0427\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E"),
              gainedList.length ? h2(
                "span",
                null,
                gainedList.map(
                  (g, gi) => h2(
                    "span",
                    {
                      key: "g" + gi,
                      className: "rt-gain",
                      style: { marginRight: 6 }
                    },
                    g
                  )
                )
              ) : h2(
                "span",
                { style: { color: "var(--dsw-alias-label-secondary)" } },
                "\u041D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u2014\u2014 \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0438\u043B\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 gained \u0447\u0435\u0440\u0435\u0437 redteam_vuln_update (\u043F\u0440\u0438\u043C\u0435\u0440: \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435, \u0442\u0443\u043D\u043D\u0435\u043B\u044C \u0432\u043E \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044E\u044E \u0441\u0435\u0442\u044C, \u0443\u0447\u0451\u0442\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430 \u043F\u0430\u043D\u0435\u043B\u0438)"
              )
            ),
            h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u0426\u0435\u043B\u044C"),
              h2(
                "span",
                { className: "rt-mono", style: { wordBreak: "break-all" } },
                v.target || "\u2014"
              )
            ),
            h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u0410\u043A\u0442\u0438\u0432"),
              h2(
                "span",
                null,
                (v.asset_ip || "\u2014") + " \xB7 " + (v.segment_cidr || "")
              )
            ),
            h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A"),
              h2(
                "span",
                null,
                (v.source || "\u2014") + " \xB7 " + (v.found_by_agent || "\u2014") + " \xB7 " + fmt(v.found_at)
              )
            ),
            detailEvidence(v),
            (() => {
              const mine = filesByVuln.get(Number(v.id)) || [];
              return h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u0424\u0430\u0439\u043B\u044B \u0430\u0442\u0430\u043A\u0438"),
                mine.length ? h2(
                  "span",
                  null,
                  mine.map(
                    (f, fi) => h2(
                      "div",
                      { key: "af" + fi, style: { marginBottom: 3 } },
                      "\xB7 " + (f.kind ? "[" + f.kind + "] " : "") + (f.name || "(\u0431\u0435\u0437 \u0438\u043C\u0435\u043D\u0438)") + (f.description ? " \u2014 " + f.description : ""),
                      h2(
                        "div",
                        {
                          className: "rt-mono",
                          style: {
                            fontSize: 11,
                            marginLeft: 12,
                            color: "var(--dsw-alias-label-secondary)",
                            overflowWrap: "anywhere"
                          }
                        },
                        f.path || ""
                      )
                    )
                  )
                ) : h2(
                  "span",
                  { style: { color: "var(--dsw-alias-label-secondary)" } },
                  "(\u043D\u0435\u0442) \u0417\u0430\u0430\u0440\u0445\u0438\u0432\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u043A\u0440\u0438\u043F\u0442/\u0448\u0435\u043B\u043B/EXP, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u043F\u0440\u043E\u0431\u0438\u0442\u0430 \u044D\u0442\u0430 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044C, \u0447\u0435\u0440\u0435\u0437 redteam_attack_file_add \u0438 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 vuln_id"
                )
              );
            })(),
            h2(
              "div",
              { className: "rt-actions" },
              h2(
                "button",
                {
                  className: "rt-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setVulnStatus(v.id, "confirmed");
                  }
                },
                "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C"
              ),
              h2(
                "button",
                {
                  className: "rt-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setVulnStatus(v.id, "exploited");
                  }
                },
                "\u041F\u0440\u043E\u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430"
              ),
              h2(
                "button",
                {
                  className: "rt-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setVulnStatus(v.id, "false-positive");
                  }
                },
                "\u041B\u043E\u0436\u043D\u043E\u0435 \u0441\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u043D\u0438\u0435"
              ),
              h2(
                "button",
                {
                  className: "rt-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setVulnStatus(v.id, "fixed");
                  }
                },
                "\u0418\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430"
              )
            )
          )
        )
      );
      return out;
    };
    const rows = [];
    if (grouped) {
      const groups = /* @__PURE__ */ new Map();
      for (const v of state.items) {
        const key = targetKeyOf(v);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(v);
      }
      const SEV_RANK = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
      const list = Array.from(groups.entries()).map(([key, vs]) => ({
        key,
        vulns: vs,
        top: vs.slice().sort(
          (a, b) => (SEV_RANK[a.severity] ?? 9) - (SEV_RANK[b.severity] ?? 9)
        )[0],
        gained: Array.from(
          new Set(
            vs.flatMap(
              (v) => String(v.gained || "").split(/[、,;，；]/).map((x) => x.trim()).filter(Boolean)
            )
          )
        ),
        exploited: vs.filter((v) => v.status === "exploited").length
      })).sort(
        (a, b) => (SEV_RANK[a.top.severity] ?? 9) - (SEV_RANK[b.top.severity] ?? 9) || b.vulns.length - a.vulns.length
      );
      for (const g of list) {
        const key = "target:" + g.key;
        const defOpen = false;
        rows.push(
          h2(
            Section,
            {
              key: "sec:" + g.key,
              tone: "target",
              title: g.key,
              count: g.vulns.length + " \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439",
              sub: [
                SEV_LABEL[g.top.severity] || g.top.severity,
                g.exploited ? "\u041F\u0440\u043E\u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E " + g.exploited : null,
                g.top.asset_ip && g.top.asset_ip !== g.key ? "\u0410\u043A\u0442\u0438\u0432 " + g.top.asset_ip : null
              ].filter(Boolean).join(" \xB7 "),
              right: g.gained.length ? g.gained.slice(0, 2).join(" / ") + (g.gained.length > 2 ? " +" + (g.gained.length - 2) : "") : "\u041F\u0440\u0430\u0432\u0430 \u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B",
              open: collapse.isOpen(key, defOpen),
              onToggle: collapse.toggle(key, defOpen)
            },
            g.vulns.map((v) => vulnRows(v, true))
          )
        );
      }
      if (!list.length && !state.loading && !state.error) {
        rows.push(
          h2("div", { key: "none", className: "rt-empty" }, "\u0417\u0430\u043F\u0438\u0441\u0435\u0439 \u043E\u0431 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044F\u0445 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442")
        );
      }
    } else {
      for (const v of state.items) rows.push(...vulnRows(v));
    }
    const toolbar = h2(
      "div",
      { className: "rt-toolbar" },
      h2("input", {
        className: "rt-input",
        style: { flex: "1 1 140px" },
        placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0443 / CVE / \u0446\u0435\u043B\u0438 (Enter)",
        value: q,
        onChange: (e) => setQ(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") setQApplied(q);
        }
      }),
      h2(
        "button",
        { className: "rt-btn", onClick: () => setQApplied(q) },
        "\u041F\u043E\u0438\u0441\u043A"
      ),
      h2(
        "select",
        {
          className: "rt-input",
          value: sev,
          onChange: (e) => setSev(e.target.value)
        },
        h2("option", { value: "" }, "\u0412\u0441\u0435 \u0443\u0440\u043E\u0432\u043D\u0438"),
        h2("option", { value: "critical" }, "\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439"),
        h2("option", { value: "high" }, "\u0412\u044B\u0441\u043E\u043A\u0438\u0439"),
        h2("option", { value: "medium" }, "\u0421\u0440\u0435\u0434\u043D\u0438\u0439"),
        h2("option", { value: "low" }, "\u041D\u0438\u0437\u043A\u0438\u0439"),
        h2("option", { value: "info" }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439")
      ),
      h2(
        "select",
        {
          className: "rt-input",
          value: status,
          onChange: (e) => setStatus(e.target.value)
        },
        h2("option", { value: "" }, "\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B"),
        h2("option", { value: "candidate" }, "\u041A \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"),
        h2("option", { value: "confirmed" }, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0430"),
        h2("option", { value: "exploited" }, "\u041F\u0440\u043E\u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430"),
        h2("option", { value: "false-positive" }, "\u041B\u043E\u0436\u043D\u043E\u0435 \u0441\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u043D\u0438\u0435"),
        h2("option", { value: "fixed" }, "\u0418\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430")
      )
    );
    const credSection = h2(
      "div",
      null,
      h2(
        "div",
        { className: "rt-section" },
        "\u0423\u0447\u0451\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \xB7 " + creds.length + (creds.length ? "(\u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0432 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u043C \u0432\u0438\u0434\u0435 \u2014 \u0443\u0447\u0442\u0438\u0442\u0435 \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044E \u044D\u043A\u0440\u0430\u043D\u0430 \u0438 \u0437\u0430\u043F\u0438\u0441\u044C)" : "")
      ),
      creds.length ? h2(
        "div",
        { style: { padding: "4px 10px 0" } },
        creds.map(
          (c) => h2(
            "div",
            { key: "c" + c.id, className: "rt-cred" },
            h2(
              "div",
              { className: "rt-cred-head" },
              h2("span", { className: "rt-cred-host" }, c.host),
              c.username ? h2("span", { className: "rt-tag" }, c.username) : null,
              h2(
                "span",
                { className: "rt-tag rt-tag-passive" },
                c.secret_type || "password"
              ),
              c.privilege ? h2(
                "span",
                { className: "rt-tag rt-tag-active" },
                c.privilege
              ) : null,
              h2("div", { className: "rt-spacer" }),
              h2(
                "button",
                {
                  className: "rt-btn",
                  style: { padding: "0 6px", fontSize: 11 },
                  onClick: (e) => {
                    e.stopPropagation();
                    copyText(String(c.secret_value || ""));
                  }
                },
                "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
              )
            ),
            c.secret_value ? h2(
              "div",
              { className: "rt-secret", title: "\u041A\u043B\u0438\u043A \u2014 \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u0432\u0441\u0451" },
              c.secret_value
            ) : h2(
              "div",
              { className: "rt-secret-none" },
              "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D \u2014\u2014 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0432 secret_value \u0447\u0435\u0440\u0435\u0437 redteam_credential_add, \u0438 \u043F\u0430\u043D\u0435\u043B\u044C \u043F\u043E\u043A\u0430\u0436\u0435\u0442 \u0435\u0433\u043E \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E"
            ),
            h2(
              "div",
              { className: "rt-cred-meta" },
              [
                c.source ? "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A " + c.source : null,
                c.tool ? "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 " + c.tool : null,
                c.secret_ref ? "\u0414\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E " + c.secret_ref : null,
                c.found_by_agent ? "by " + c.found_by_agent : null,
                c.found_at ? fmt(c.found_at) : null
              ].filter(Boolean).join(" \xB7 ")
            ),
            c.note ? h2("div", { className: "rt-cred-meta" }, "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435: " + c.note) : null
          )
        )
      ) : h2(
        "div",
        { className: "rt-empty" },
        "\u0423\u0447\u0451\u0442\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 (\u043F\u043E\u043B\u0443\u0447\u0438\u0432 \u043F\u0430\u0440\u043E\u043B\u044C/\u043A\u043B\u044E\u0447/hash, \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0435\u0433\u043E \u0447\u0435\u0440\u0435\u0437 redteam_credential_add \u2014 \u043F\u0435\u0440\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0436\u043D\u043E \u0437\u0430 \u0441\u0435\u043A\u0443\u043D\u0434\u044B)"
      )
    );
    const accessSection = h2(
      "div",
      null,
      h2(
        "div",
        { className: "rt-section" },
        "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0435 \u0441\u0435\u0441\u0441\u0438\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \xB7 " + accesses.length
      ),
      accesses.length ? accesses.map(
        (a) => h2(
          "div",
          {
            key: "a" + a.id,
            className: "rt-vrow",
            style: {
              cursor: "default",
              gridTemplateColumns: "1fr 110px 80px 80px 1fr"
            }
          },
          h2("span", { className: "rt-mono" }, a.host),
          h2("span", null, a.username || "\u2014"),
          h2(
            "span",
            null,
            h2(
              "span",
              { className: "rt-tag rt-tag-active" },
              a.method || "\u2014"
            )
          ),
          h2("span", null, a.privilege || "\u2014"),
          h2(
            "span",
            { className: "rt-mono", title: a.session_ref || "" },
            a.session_ref || "\u2014"
          )
        )
      ) : h2("div", { className: "rt-empty" }, "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442")
    );
    const subTabBtn = (key, label, n) => h2(
      "span",
      Object.assign(
        {
          className: "rt-subtab" + (subTab === key ? " on" : "")
        },
        clickable(() => setSubTab(key), {
          label: label + "(" + n + ")",
          expanded: subTab === key
        })
      ),
      label + " " + n
    );
    return h2(
      "div",
      { className: "rt-main" },
      toolbar,
      conclusion,
      h2(
        "div",
        { className: "rt-subtabs" },
        subTabBtn("vulns", "\u0423\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0438", state.total || 0),
        subTabBtn("files", "\u0424\u0430\u0439\u043B\u044B \u0430\u0442\u0430\u043A\u0438", allFiles.length),
        subTabBtn("creds", "\u0423\u0447\u0451\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435", creds.length),
        subTabBtn("access", "\u0421\u0435\u0441\u0441\u0438\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u0430", accesses.length),
        h2("div", { className: "rt-spacer" }),
        grouped ? h2(
          "button",
          {
            className: "rt-btn",
            title: "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435 \u0446\u0435\u043B\u0438",
            onClick: () => collapse.setAll(
              (state.items || []).map((v) => "target:" + targetKeyOf(v)),
              true
            )
          },
          "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435"
        ) : null,
        grouped ? h2(
          "button",
          {
            className: "rt-btn",
            title: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435 \u0446\u0435\u043B\u0438",
            onClick: () => collapse.setAll(
              (state.items || []).map((v) => "target:" + targetKeyOf(v)),
              false
            )
          },
          "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435"
        ) : null,
        h2(
          "button",
          {
            className: "rt-btn" + (grouped ? " rt-btn-primary" : ""),
            title: grouped ? "\u0421\u0435\u0439\u0447\u0430\u0441: \u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E \u0446\u0435\u043B\u0438 (\u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u0438\u0434\u043D\u043E, \u0447\u0442\u043E \u0441 \u043A\u0430\u043A\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u044B \u0432\u0437\u044F\u0442\u043E)" : "\u0421\u0435\u0439\u0447\u0430\u0441: \u043F\u043B\u043E\u0441\u043A\u0438\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439",
            onClick: () => setGrouped((g) => !g)
          },
          grouped ? "\u041F\u043E \u0446\u0435\u043B\u044F\u043C" : "\u041F\u043B\u043E\u0441\u043A\u0438\u0439 \u0441\u043F\u0438\u0441\u043E\u043A"
        )
      ),
      msg ? h2(
        "div",
        { className: msg.err ? "rt-err" : "rt-foot" },
        msg.err || msg.ok
      ) : null,
      needRestart ? h2(
        "div",
        { className: "rt-empty" },
        "\u041A\u043E\u0434 \u0445\u043E\u0441\u0442\u0430 \u044D\u0442\u043E\u0433\u043E \u043C\u043E\u0434\u0443\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u0441\u044F: \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0432\u0441\u0442\u0443\u043F\u0438\u043B\u0438 \u0432 \u0441\u0438\u043B\u0443, \u043E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0445\u043E\u0441\u0442 (\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 exe / Community Edition / dsh web)"
      ) : null,
      state.error && !needRestart ? h2("div", { className: "rt-err" }, state.error) : null,
      subTab === "files" ? h2(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        h2(
          "div",
          { className: "rt-hint", style: { marginBottom: 8 } },
          "\u0424\u0430\u0439\u043B\u044B \u0430\u0442\u0430\u043A\u0438 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043D\u044B \u043F\u043E \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430\u043C \u0446\u0435\u043B\u0435\u0439 (\u0431\u044B\u0432\u0448\u0430\u044F \u0432\u043A\u043B\u0430\u0434\u043A\u0430 \xAB\u0424\u0430\u0439\u043B\u044B \u0430\u0442\u0430\u043A\u0438\xBB); \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B \u043A\u0430\u0436\u0434\u043E\u0439 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0438 \u0432\u0438\u0434\u043D\u044B \u0438 \u0432 \u0435\u0451 \u0434\u0435\u0442\u0430\u043B\u044F\u0445." + (orphanFiles.length ? " \u0421\u0435\u0439\u0447\u0430\u0441 " + orphanFiles.length + " \u0444\u0430\u0439\u043B\u043E\u0432 \u0431\u0435\u0437 vuln_id \u2014 \u0441\u0442\u043E\u0438\u0442 \u0434\u043E\u043F\u0438\u0441\u0430\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0441\u0432\u044F\u0437\u0430\u0442\u044C \u0438\u0445 \u0441 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044F\u043C\u0438." : "")
        ),
        h2(AttackFilesTab, { engagement: eng, refreshKey })
      ) : subTab === "creds" ? h2(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        credSection
      ) : subTab === "access" ? h2(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        accessSection
      ) : h2(
        "div",
        { className: "rt-table" },
        grouped ? null : head,
        rows,
        !state.loading && !state.items.length && !state.error ? h2("div", { className: "rt-empty" }, "\u0417\u0430\u043F\u0438\u0441\u0435\u0439 \u043E\u0431 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044F\u0445 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442") : null
      )
    );
  }
  const STAGE_LABEL = {
    recon: "\u0420\u0430\u0437\u0432\u0435\u0434\u043A\u0430",
    vuln: "\u041F\u043E\u0438\u0441\u043A \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439",
    exploit: "\u042D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0430\u0446\u0438\u044F \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439",
    access: "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430",
    pivot: "\u041F\u0440\u043E\u0440\u044B\u0432 \u0432\u043E \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044E\u044E \u0441\u0435\u0442\u044C",
    data: "\u0427\u0443\u0432\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435",
    other: "\u041F\u0440\u043E\u0447\u0435\u0435"
  };
  function ChainTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [loading, setLoading] = import_react2.default.useState(false);
    const [view, setView] = import_react2.default.useState("A");
    const [openId, setOpenId] = import_react2.default.useState(null);
    const load = () => {
      if (!eng) return;
      setLoading(true);
      api({ op: "scoreChain", engagement: eng }).then(
        (r) => {
          setLoading(false);
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          setData(r);
        },
        (e) => {
          setLoading(false);
          setErr(String(e && e.message || e));
        }
      );
    };
    import_react2.default.useEffect(load, [eng, refreshKey]);
    const stages = data && data.stages || [];
    const summary = data && data.summary || null;
    const toggle = (id) => setOpenId((cur) => cur === id ? null : id);
    const CIRCLED = ["\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465"];
    const hitDetail = (x) => h2(
      "div",
      { className: "rt-flow-detail" },
      h2(
        "div",
        { className: "rt-kv" },
        h2("b", null, "\u0426\u0435\u043B\u044C"),
        h2(
          "span",
          { className: "rt-mono", style: { wordBreak: "break-all" } },
          x.target || "\u2014"
        )
      ),
      x.asset_ip ? h2(
        "div",
        { className: "rt-kv" },
        h2("b", null, "\u0410\u043A\u0442\u0438\u0432"),
        h2("span", { className: "rt-mono" }, x.asset_ip)
      ) : null,
      x.vuln_title ? h2(
        "div",
        { className: "rt-kv" },
        h2("b", null, "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044C"),
        h2(
          "span",
          null,
          [x.vuln_cve, x.vuln_title].filter(Boolean).join(" ")
        )
      ) : null,
      h2(
        "div",
        { className: "rt-kv" },
        h2("b", null, "\u0420\u0430\u0437"),
        h2(
          "span",
          null,
          "\u041F\u043E\u0432\u0442\u043E\u0440 \u0442\u043E\u0433\u043E \u0436\u0435 \u0442\u0438\u043F\u0430 \u2116" + x.nth_of_point + " \xB7 +" + (x.points || 0) + " \u0431\u0430\u043B\u043B\u043E\u0432"
        )
      ),
      h2(
        "div",
        { className: "rt-kv" },
        h2("b", null, "\u0417\u0430\u043F\u0438\u0441\u044C"),
        h2(
          "span",
          null,
          fmt(x.recorded_at) + (x.recorded_by ? " \xB7 " + x.recorded_by : "")
        )
      ),
      x.evidence ? h2(Clip, { label: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0438 \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430", text: x.evidence }) : null
    );
    const hitRow = (x) => h2(
      "div",
      {
        key: "h" + x.id,
        className: "rt-ap-hit" + (openId === x.id ? " open" : ""),
        role: "button",
        tabIndex: 0,
        onClick: () => toggle(x.id),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle(x.id);
          }
        }
      },
      h2(
        "div",
        { className: "rt-ap-hit-head" },
        h2(
          "span",
          {
            className: "rt-ap-pts" + (x.counted ? "" : " uncounted"),
            title: x.capped_reason || void 0
          },
          "+" + (x.counted ? x.points || 0 : 0)
        ),
        h2("span", { className: "rt-ap-hit-name" }, x.point_name),
        x.capped ? h2(
          "span",
          {
            className: "rt-tag rt-tag-warn",
            title: x.capped_reason || "\u041F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0430\u043A\u0442\u0438\u0432\u0443 \u0438 \u043F\u043E\u0440\u0442\u0443 \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u043F\u0438\u0441\u044C \u0441 \u043D\u0430\u0438\u0431\u043E\u043B\u044C\u0448\u0438\u043C\u0438 \u0431\u0430\u043B\u043B\u0430\u043C\u0438"
          },
          "\u0421\u0435\u0440\u0432\u0438\u0441 \u0432\u0437\u044F\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \xB7 \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432"
        ) : null,
        x.nth_of_point > 1 ? h2(
          "span",
          { className: "rt-ap-nth" },
          "\u041F\u043E\u043F\u044B\u0442\u043A\u0430 " + x.nth_of_point + ","
        ) : null,
        h2(
          "span",
          { className: "rt-ap-hit-target" },
          x.target || x.asset_ip || "\u2014"
        )
      ),
      x.action ? h2(
        "div",
        {
          className: "rt-ap-act" + (x.action_inferred ? " inferred" : "")
        },
        "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435: " + (x.action.title || "(\u0448\u0430\u0433 \u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F)") + (x.action_inferred ? " (\u043F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E)" : "")
      ) : null,
      openId === x.id ? hitDetail(x) : null
    );
    const assetRow = (a) => h2(
      "div",
      { key: "a" + a.id, className: "rt-ap-asset" },
      h2(
        "span",
        {
          className: "rt-scope rt-scope-" + (a.scope === "internal" ? "internal" : "external")
        },
        a.scope === "internal" ? "int" : "ext"
      ),
      h2("span", { className: "rt-mono", style: { fontWeight: 600 } }, a.ip),
      a.segment_cidr ? h2("span", { className: "rt-ap-nth" }, a.segment_cidr) : null,
      h2("span", { className: "rt-ap-nth" }, "\u041F\u043E\u0440\u0442\u043E\u0432 " + (a.open_ports || 0)),
      a.vulns ? h2("span", { className: "rt-ap-nth" }, "\u0423\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439 " + a.vulns) : null,
      a.priority ? h2("span", { className: "rt-tag" }, "\u041F\u0440\u043E\u0441\u0442\u043E\u0442\u0430 " + a.priority) : null,
      h2("div", { className: "rt-spacer" }),
      h2("span", { className: "rt-ap-pts" }, "+" + (a.points || 0) + " \u0431\u0430\u043B\u043B\u043E\u0432"),
      h2("span", { className: "rt-ap-nth" }, (a.hits || 0) + " \u0440\u0430\u0437")
    );
    const stageA = (st, i) => {
      const isRecon = st.code === "recon";
      const body = [];
      if (isRecon) {
        body.push(
          h2(
            "div",
            { key: "at", className: "rt-ap-sub" },
            "\u0410\u043A\u0442\u0438\u0432\u044B \u0441 \u0431\u0430\u043B\u043B\u0430\u043C\u0438 \xB7 " + st.assetCount + " \u0445\u043E\u0441\u0442\u043E\u0432"
          )
        );
        body.push(
          h2(
            "div",
            { key: "al", className: "rt-ap-assets" },
            st.assets.length ? st.assets.map(assetRow) : h2("div", { className: "rt-ap-none" }, "\u0410\u043A\u0442\u0438\u0432\u043E\u0432 \u0441 \u0431\u0430\u043B\u043B\u0430\u043C\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442")
          )
        );
      } else {
        body.push(
          h2(
            "div",
            { key: "ht", className: "rt-ap-sub" },
            "\u041F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439 \u043D\u0430 \u044D\u0442\u0430\u043F\u0435 " + st.hits + " \u0440\u0430\u0437" + (st.points ? " \xB7 +" + st.points + " \u0431\u0430\u043B\u043B\u043E\u0432" : "")
          )
        );
        body.push(
          h2(
            "div",
            { key: "hl", className: "rt-ap-hits" },
            st.items.length ? st.items.map(hitRow) : h2("div", { className: "rt-ap-none" }, "\u041D\u0430 \u044D\u0442\u043E\u043C \u044D\u0442\u0430\u043F\u0435 \u0431\u0430\u043B\u043B\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442")
          )
        );
        if (st.code === "boundary") {
          const selfOnly = (st.tunnels_self_only || []).length;
          body.push(
            h2(
              "div",
              { key: "tt", className: "rt-ap-sub" },
              "\u041A\u0430\u043D\u0430\u043B\u044B, \u043F\u0435\u0440\u0435\u0441\u0435\u043A\u0430\u044E\u0449\u0438\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u0443 \u0446\u0435\u043B\u0438 \xB7 " + st.tunnels.length + " \u0448\u0442." + (selfOnly ? " (\u0435\u0449\u0451 " + selfOnly + " \u043D\u0430 \u0441\u0432\u043E\u0451\u043C VPS/\u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u043C \u0441\u0435\u0440\u0432\u0435\u0440\u0435 \u2014 \u044D\u0442\u043E \u043D\u0435 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u043E\u0440\u044B\u0432\u043E\u043C)" : "")
            )
          );
          if (selfOnly && st.tunnels.length === 0) {
            body.push(
              h2(
                "div",
                { key: "tw", className: "rt-ap-none" },
                "\u26A0\uFE0F \u0412\u0441\u0435 \u0438\u043C\u0435\u044E\u0449\u0438\u0435\u0441\u044F \u043A\u0430\u043D\u0430\u043B\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0441\u0432\u043E\u0438\u0445 \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u0445 \u0438 \u0446\u0435\u043B\u0438 \u043D\u0435 \u043A\u0430\u0441\u0430\u044E\u0442\u0441\u044F \u2014\u2014 \u043F\u0440\u043E\u0440\u044B\u0432 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440\u0430 \u043D\u0435 \u0437\u0430\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F. \u041D\u0443\u0436\u0435\u043D \u043A\u0430\u043D\u0430\u043B, \u0438\u043D\u0438\u0446\u0438\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u0446\u0435\u043B\u0438 (reverse shell \u043A\u043E \u043C\u043D\u0435 / \u0437\u0430\u043F\u0443\u0441\u043A frp-\u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u043D\u0430 \u0446\u0435\u043B\u0438 / suo5 \u0447\u0435\u0440\u0435\u0437 WebShell \u043D\u0430 \u0446\u0435\u043B\u0438)."
              )
            );
          }
          body.push(
            h2(
              "div",
              { key: "tl", className: "rt-ap-tunnels" },
              st.tunnels.length ? st.tunnels.map(
                (t) => h2(
                  "div",
                  { key: "t" + t.id, className: "rt-ap-tunnel" },
                  h2(
                    "span",
                    { className: "rt-tag rt-tag-passive" },
                    t.kind || "tunnel"
                  ),
                  h2(
                    "span",
                    { className: "rt-mono", style: { fontWeight: 600 } },
                    t.listen || "\u2014"
                  ),
                  h2(
                    "span",
                    {
                      className: "rt-tag " + (t.status === "active" ? "rt-tag-live" : ""),
                      style: t.status === "active" ? {} : { opacity: 0.7 }
                    },
                    t.status === "active" ? "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442" : t.status || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"
                  ),
                  h2(
                    "span",
                    {
                      className: "rt-ap-nth",
                      style: {
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }
                    },
                    "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E " + (t.reach || "\u2014")
                  )
                )
              ) : h2(
                "div",
                { className: "rt-ap-none" },
                "\u0422\u0443\u043D\u043D\u0435\u043B\u0435\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 (\u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0433\u043E \u0447\u0435\u0440\u0435\u0437 redteam_tunnel_add)"
              )
            )
          );
        }
        if (st.assets.length && st.code !== "boundary") {
          body.push(
            h2(
              "div",
              { key: "at", className: "rt-ap-sub" },
              "\u0417\u0430\u0434\u0435\u0439\u0441\u0442\u0432\u043E\u0432\u0430\u043D\u043E \u0430\u043A\u0442\u0438\u0432\u043E\u0432 \xB7 " + st.assetCount + " \u0445\u043E\u0441\u0442\u043E\u0432"
            )
          );
          body.push(
            h2(
              "div",
              { key: "al", className: "rt-ap-assets" },
              st.assets.map(assetRow)
            )
          );
        }
      }
      return h2(
        "div",
        { key: "st" + st.code, className: "rt-ap-stage" },
        h2(
          "div",
          { className: "rt-ap-head", style: { borderLeftColor: st.color } },
          h2(
            "span",
            { className: "rt-ap-no", style: { background: st.color } },
            CIRCLED[i] || "0" + (i + 1)
          ),
          h2("span", { className: "rt-ap-name" }, st.name),
          st.subtitle ? h2("span", { className: "rt-ap-en" }, st.subtitle) : null,
          h2("div", { className: "rt-spacer" }),
          st.points > 0 ? h2(
            "span",
            {
              className: "rt-ap-pts",
              style: {
                background: st.color + "22",
                color: st.color,
                borderColor: st.color + "66"
              }
            },
            "+" + st.points
          ) : null,
          h2(
            "span",
            { className: "rt-ap-cum" },
            "\u041D\u0430\u043A\u043E\u043F\u043B\u0435\u043D\u043E " + st.cumulative + " \u0431\u0430\u043B\u043B\u043E\u0432"
          )
        ),
        h2(
          "div",
          { className: "rt-ap-goal", style: { borderLeftColor: st.color } },
          h2(
            "span",
            {
              className: "rt-ap-goal-tag",
              style: { color: st.color, borderColor: st.color + "66" }
            },
            "\u0426\u0435\u043B\u044C \u044D\u0442\u0430\u043F\u0430"
          ),
          h2("span", null, st.goal)
        ),
        h2(
          "div",
          { className: "rt-ap-result", style: { borderLeftColor: st.color } },
          body
        ),
        i < stages.length - 1 ? h2(
          "div",
          { className: "rt-ap-trans" },
          h2("span", { className: "rt-flow-arrow" }, "\u25BC"),
          st.transition ? h2("span", { className: "rt-ap-trans-t" }, st.transition) : null,
          h2(
            "span",
            { className: "rt-ap-trans-t", style: { marginLeft: "auto" } },
            "\u041D\u0430\u043A\u043E\u043F\u043B\u0435\u043D\u043E " + st.cumulative + " \u0431\u0430\u043B\u043B\u043E\u0432"
          )
        ) : h2(
          "div",
          { className: "rt-ap-trans" },
          h2("span", { className: "rt-flow-arrow" }, "\u25BC"),
          h2(
            "span",
            { className: "rt-ap-trans-t" },
            "\u0418\u0442\u043E\u0433\u043E " + (summary && summary.points || 0) + " \u0431\u0430\u043B\u043B\u043E\u0432"
          )
        )
      );
    };
    const stageB = (st, i) => h2(
      "div",
      { key: "c" + st.code, className: "rt-ap-col" },
      i > 0 ? h2("span", { className: "rt-ap-col-arrow" }, "\u25B6") : null,
      h2(
        "div",
        { className: "rt-hcol", style: { borderTopColor: st.color } },
        h2(
          "div",
          {
            className: "rt-ap-head",
            style: { borderLeftColor: st.color, padding: "5px 8px" }
          },
          h2(
            "span",
            {
              className: "rt-ap-no",
              style: {
                background: st.color,
                width: 16,
                height: 16,
                fontSize: 10
              }
            },
            String(i + 1)
          ),
          h2(
            "span",
            { className: "rt-ap-name", style: { fontSize: 12 } },
            st.name
          ),
          h2("div", { className: "rt-spacer" }),
          h2(
            "span",
            { className: "rt-ap-cum", style: { fontWeight: 700 } },
            st.cumulative
          )
        ),
        h2("div", { className: "rt-hcol-goal", title: st.goal }, st.goal),
        h2(
          "div",
          { className: "rt-hcol-body" },
          st.code === "boundary" ? h2(
            "div",
            null,
            h2(
              "div",
              { className: "rt-hcol-hit" },
              h2("span", { className: "rt-hcol-pts" }, "+" + st.points),
              h2(
                "span",
                { className: "rt-hcol-name" },
                "\u0422\u0443\u043D\u043D\u0435\u043B\u0435\u0439 " + st.tunnels.length + " \u0448\u0442."
              )
            ),
            st.tunnels.slice(0, 3).map(
              (t) => h2(
                "div",
                { key: "t" + t.id, className: "rt-hcol-sub" },
                "\u25B8 " + (t.kind || "") + " " + (t.listen || "")
              )
            )
          ) : st.code === "recon" ? h2(
            "div",
            null,
            h2(
              "div",
              { className: "rt-hcol-hit" },
              h2("span", { className: "rt-hcol-pts" }, st.assetCount),
              h2("span", { className: "rt-hcol-name" }, "\u0445\u043E\u0441\u0442\u043E\u0432 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0431\u0430\u043B\u043B\u044B")
            ),
            st.assets.slice(0, 6).map(
              (a) => h2(
                "div",
                {
                  key: "a" + a.id,
                  className: "rt-hcol-sub",
                  title: a.ip + "  +" + a.points + " \u0431\u0430\u043B\u043B\u043E\u0432"
                },
                (a.scope === "internal" ? "\u0432\u043D\u0443\u0442\u0440. " : "\u0432\u043D\u0435\u0448. ") + a.ip + "  +" + a.points
              )
            )
          ) : h2(
            "div",
            null,
            h2(
              "div",
              { className: "rt-hcol-hit" },
              h2("span", { className: "rt-hcol-pts" }, "+" + st.points),
              h2(
                "span",
                { className: "rt-hcol-name" },
                st.hits + " \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439"
              )
            ),
            st.items.slice(0, 6).map(
              (x) => h2(
                "div",
                {
                  key: "c" + x.id,
                  className: "rt-hcol-sub",
                  title: x.point_name + "  " + (x.target || "")
                },
                h2("span", { className: "rt-hcol-pts" }, "+" + x.points),
                h2("span", { className: "rt-hcol-name" }, x.point_name)
              )
            ),
            st.items.length > 6 ? h2(
              "div",
              { className: "rt-hcol-none" },
              "\u2026\u0435\u0449\u0451 " + (st.items.length - 6) + " \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439"
            ) : null,
            st.assetCount ? h2(
              "div",
              { className: "rt-hcol-none" },
              "\u0417\u0430\u0434\u0435\u0439\u0441\u0442\u0432\u043E\u0432\u0430\u043D\u043E \u0430\u043A\u0442\u0438\u0432\u043E\u0432: " + st.assetCount
            ) : null
          )
        )
      )
    );
    return h2(
      "div",
      { className: "rt-main" },
      h2(
        "div",
        { className: "rt-toolbar" },
        h2("span", { style: { fontWeight: 600 } }, "\u0426\u0435\u043F\u043E\u0447\u043A\u0430 \u0430\u0442\u0430\u043A\u0438"),
        h2(
          "span",
          { className: "rt-tag", style: { fontSize: 10.5 } },
          "\u0420\u0430\u0437\u0432\u0435\u0434\u043A\u0430 \u2192 \u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u0430\u043A\u0442\u0438\u0432\u0430\u043C \u2192 \u041F\u0440\u043E\u0440\u044B\u0432 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440\u0430 \u2192 \u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0430\u043A\u0442\u0438\u0432\u0430\u043C \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0439 \u0441\u0435\u0442\u0438 \u2192 \u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0446\u0435\u043B\u0438"
        ),
        summary ? h2(
          "span",
          { className: "rt-tag rt-tag-live" },
          "\u0412\u0441\u0435\u0433\u043E " + summary.points + " \u0431\u0430\u043B\u043B\u043E\u0432"
        ) : null,
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          {
            className: "rt-btn" + (view === "A" ? " rt-btn-primary" : ""),
            title: "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u0446\u0435\u043F\u043E\u0447\u043A\u0430 \u0430\u0442\u0430\u043A\u0438: \u0434\u0435\u0442\u0430\u043B\u0438 \u043F\u043E \u044D\u0442\u0430\u043F\u0430\u043C \u0432\u043D\u0438\u0437",
            onClick: () => setView("A")
          },
          "\u0426\u0435\u043F\u043E\u0447\u043A\u0430 A"
        ),
        h2(
          "button",
          {
            className: "rt-btn" + (view === "B" ? " rt-btn-primary" : ""),
            title: "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0446\u0435\u043F\u043E\u0447\u043A\u0430 \u0430\u0442\u0430\u043A\u0438: \u043F\u044F\u0442\u044C \u044D\u0442\u0430\u043F\u043E\u0432 \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u044D\u043A\u0440\u0430\u043D\u0435",
            onClick: () => setView("B")
          },
          "\u0426\u0435\u043F\u043E\u0447\u043A\u0430 B"
        ),
        h2(
          "button",
          { className: "rt-btn", disabled: loading, onClick: load },
          loading ? "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026" : "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
        )
      ),
      err ? h2("div", { className: "rt-err" }, err) : null,
      !stages.length && !err && data !== null ? h2(
        "div",
        { className: "rt-empty" },
        "\u0417\u0430\u043F\u0438\u0441\u0435\u0439 \u043E \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F\u0445 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442. \u0417\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u0443\u0439\u0442\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0447\u0435\u0440\u0435\u0437 redteam_score_hit \u2014 \u0442\u043E\u0433\u0434\u0430 \u044D\u0442\u0430 \u0446\u0435\u043F\u043E\u0447\u043A\u0430 \u0438 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F."
      ) : view === "A" ? h2("div", { className: "rt-ap" }, stages.map(stageA)) : h2("div", { className: "rt-ap-h" }, stages.map(stageB))
    );
  }
  function groupByStage(reportItems, chain) {
    const byId = new Map((reportItems || []).map((x) => [x.id, x]));
    const groups = [];
    const stageList = chain && chain.stages || [];
    stageList.forEach((st, si) => {
      const items = (st.items || []).map((x) => byId.get(x.id)).filter(Boolean);
      if (items.length === 0) return;
      groups.push({
        code: st.code,
        name: st.name,
        color: st.color || "#64748b",
        ordinal: st.ordinal || si + 1,
        points: st.points || 0,
        cumulative: st.cumulative || 0,
        items
      });
    });
    const grouped = new Set(
      groups.reduce((acc, g) => acc.concat(g.items.map((x) => x.id)), [])
    );
    const rest = (reportItems || []).filter((x) => !grouped.has(x.id));
    if (rest.length > 0) {
      groups.push({
        code: "other",
        name: "\u041F\u0440\u043E\u0447\u0438\u0435 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F",
        color: "#64748b",
        ordinal: groups.length + 1,
        points: rest.reduce((n, x) => n + (x.counted ? x.points : 0), 0),
        cumulative: 0,
        items: rest
      });
    }
    return groups;
  }
  function ReportTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const [msg, setMsg] = import_react2.default.useState(null);
    const collapse = useCollapse("report:" + eng);
    const load = () => {
      if (!eng) return;
      setBusy(true);
      setMsg(null);
      api({ op: "scoreReport", engagement: eng }).then(
        (r) => {
          if (!r || r.ok === false) {
            setBusy(false);
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438");
            return;
          }
          if ((!r.stages || r.stages.length === 0) && (r.items || []).length > 0) {
            api({ op: "scoreChain", engagement: eng }).then(
              (c) => {
                setBusy(false);
                setErr(null);
                setData(
                  Object.assign({}, r, { stages: groupByStage(r.items, c) })
                );
              },
              () => {
                setBusy(false);
                setErr(null);
                setData(r);
              }
            );
            return;
          }
          setBusy(false);
          setErr(null);
          setData(r);
        },
        (e) => {
          setBusy(false);
          setErr(String(e && e.message || e));
        }
      );
    };
    import_react2.default.useEffect(load, [eng, refreshKey]);
    const copy = (text, label) => copyWithFeedback(text, label, (okFlag, message) => {
      setMsg(okFlag ? { ok: message } : { err: message });
    });
    const download = (text, label) => {
      try {
        const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report-" + String(label || "score").replace(/[^\w.\-]/g, "_") + ".md";
        a.click();
        setTimeout(() => {
          try {
            URL.revokeObjectURL(url);
          } catch {
          }
        }, 1e3);
        setMsg({ ok: "\u0421\u043A\u0430\u0447\u0430\u043D\u043E: " + label });
      } catch (e) {
        setMsg({ err: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u044F: " + (e && e.message || e) });
      }
    };
    const items = data && data.items || [];
    const stages = data && data.stages || [];
    const summary = data && data.summary || null;
    const mdText = data && data.markdown || "";
    const CIRCLED = [
      "\u2460",
      "\u2461",
      "\u2462",
      "\u2463",
      "\u2464",
      "\u2465",
      "\u2466",
      "\u2467",
      "\u2468",
      "\u2469",
      "\u246A",
      "\u246B",
      "\u246C",
      "\u246D",
      "\u246E",
      "\u246F",
      "\u2470",
      "\u2471",
      "\u2472",
      "\u2473"
    ];
    const card = (x) => h2(
      "div",
      { key: "r" + x.id, className: "rt-rep" },
      h2(
        "div",
        { className: "rt-rep-head" },
        h2("span", { className: "rt-rep-idx" }, String(x.seq)),
        h2("span", { className: "rt-rep-name" }, x.point_name),
        h2("span", { className: "rt-flow-pts" }, "+" + x.points + " \u0431\u0430\u043B\u043B\u043E\u0432"),
        x.nth_of_point > 1 ? h2(
          "span",
          { className: "rt-tag" },
          "\u041F\u043E\u0432\u0442\u043E\u0440 \u0442\u043E\u0433\u043E \u0436\u0435 \u0442\u0438\u043F\u0430 \u2116" + x.nth_of_point
        ) : null,
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          {
            className: "rt-btn",
            style: { padding: "0 6px", fontSize: 11 },
            onClick: () => copy(
              (x.requests || []).map((v) => v.request || "").filter(Boolean).join("\n\n"),
              "\u0417\u0430\u043F\u0440\u043E\u0441 \u2116" + x.seq
            )
          },
          "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441"
        )
      ),
      h2(
        "div",
        { className: "rt-rep-meta" },
        h2("span", null, h2("b", null, "\u0426\u0435\u043B\u044C ")),
        h2("span", { className: "rt-mono" }, x.target || x.asset_ip || "\u2014")
      ),
      x.gained ? h2(
        "div",
        { className: "rt-rep-meta" },
        h2("b", null, "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E "),
        h2("span", null, x.gained)
      ) : null,
      x.vuln ? h2(
        "div",
        { className: "rt-rep-meta" },
        h2("b", null, "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044C "),
        h2(
          "span",
          null,
          [x.vuln.cve, x.vuln.title].filter(Boolean).join(" ")
        )
      ) : null,
      x.evidence ? h2(
        "div",
        { className: "rt-rep-meta" },
        h2("b", null, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 "),
        h2("span", null, String(x.evidence).replace(/\n+/g, " "))
      ) : null,
      x.recorded_at ? h2(
        "div",
        { className: "rt-rep-meta" },
        h2("b", null, "\u041A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E "),
        h2(
          "span",
          null,
          fmt(x.recorded_at) + (x.recorded_by ? "(" + (ROLE_LABEL[x.recorded_by] || x.recorded_by) + ")" : "")
        )
      ) : null,
      h2(ShotStrip, {
        eng,
        shots: x.shots,
        total: x.shot_total,
        title: "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432"
      }),
      /* ── Шаги воспроизведения: записи действий (с реальными командами и выводом) + учётные данные + туннели + WebShell ─────
         Вся ценность сдаваемого отчёта здесь: откуда взялись логины и пароли, как построен туннель — по этому пользователь воспроизведёт всё сам. */
      h2(
        "details",
        {
          className: "rt-rep-trace",
          open: x.incomplete === true || (x.steps || []).length === 0
        },
        h2(
          "summary",
          { className: "rt-rep-trace-head", style: { cursor: "pointer" } },
          h2(
            "span",
            { className: "rt-rep-trace-title" },
            "\u0428\u0430\u0433\u0438 \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F (\u043A\u043B\u0438\u043A \u2014 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044C)"
          ),
          (x.steps || []).length ? h2(
            "span",
            { className: "rt-tag" },
            (x.steps || []).length + " \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439"
          ) : null,
          (x.credentials || []).length ? h2(
            "span",
            { className: "rt-tag" },
            (x.credentials || []).length + " \u0443\u0447\u0451\u0442\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445"
          ) : null,
          (x.tunnels || []).length ? h2(
            "span",
            { className: "rt-tag" },
            (x.tunnels || []).length + " \u0442\u0443\u043D\u043D\u0435\u043B\u0435\u0439"
          ) : null,
          x.incomplete ? h2("span", { className: "rt-tag rt-tag-warn" }, "\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0434\u043B\u044F \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043D\u0435\u043F\u043E\u043B\u043D\u044B\u0435") : h2("span", { className: "rt-tag rt-tag-live" }, "\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u043C\u043E")
        ),
        h2(
          "div",
          { style: { paddingTop: 6 } },
          x.how ? h2("div", { className: "rt-rep-trace-how" }, x.how) : null,
          (x.steps || []).length === 0 ? h2(
            "div",
            { className: "rt-rep-missing" },
            "\u26A0\uFE0F \u041D\u0435\u0442 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0448\u0430\u0433\u043E\u0432 \u0430\u0442\u0430\u043A\u0438: \u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E, \u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u043D \u044D\u0442\u043E\u0442 \u0448\u0430\u0433. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 redteam_chain_add (title / detail / tool / result); \u043F\u0440\u0438 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0438 \u043C\u043E\u0436\u043D\u043E \u0441\u0440\u0430\u0437\u0443 \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C point_code + evidence."
          ) : (x.steps || []).map(
            (s, si) => h2(
              "div",
              { key: "s" + s.id, className: "rt-rep-step" },
              h2(
                "div",
                { className: "rt-rep-step-head" },
                h2(
                  "span",
                  { className: "rt-rep-step-no" },
                  String(si + 1)
                ),
                h2(
                  "span",
                  { className: "rt-rep-step-title" },
                  s.title || "(\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F)"
                ),
                s.agent ? h2(
                  "span",
                  { className: "rt-tag" },
                  ROLE_LABEL[s.agent] || s.agent
                ) : null,
                s.stage_code ? h2("span", { className: "rt-tag" }, s.stage_code) : null,
                s.inferred ? h2("span", { className: "rt-tag" }, "\u0412\u044B\u0432\u0435\u0434\u0435\u043D\u043E \u043F\u043E \u0442\u043E\u043C\u0443 \u0436\u0435 \u0430\u043A\u0442\u0438\u0432\u0443") : null,
                h2("div", { className: "rt-spacer" }),
                s.recorded_at ? h2(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      color: "var(--dsw-alias-label-secondary)"
                    }
                  },
                  fmt(s.recorded_at)
                ) : null
              ),
              s.detail ? h2("div", { className: "rt-rep-step-detail" }, s.detail) : null,
              h2(
                "div",
                { className: "rt-rep-step-cmd" },
                h2("b", null, "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E "),
                s.tool ? h2("span", { className: "rt-mono" }, s.tool) : h2(
                  "span",
                  {
                    style: {
                      color: "var(--dsw-alias-state-warn-primary, #f59e0b)"
                    }
                  },
                  "\u0420\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u0430 (tool \u0432 redteam_chain_add)"
                )
              ),
              s.tool ? h2(
                "div",
                { style: { marginTop: 3 } },
                h2(
                  "button",
                  {
                    className: "rt-btn",
                    style: { padding: "0 6px", fontSize: 11 },
                    onClick: () => copy(
                      String(s.tool),
                      "\u0428\u0430\u0433 " + (si + 1) + ": \u043A\u043E\u043C\u0430\u043D\u0434\u0430"
                    )
                  },
                  "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443"
                )
              ) : null,
              s.result ? h2(
                "div",
                { className: "rt-rep-step-result" },
                h2("b", null, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 "),
                String(s.result).replace(/\n+/g, " ")
              ) : null,
              s.evidence_ref ? h2(
                "div",
                { className: "rt-rep-step-result" },
                h2("b", null, "\u0414\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430 "),
                h2("span", { className: "rt-mono" }, s.evidence_ref)
              ) : null
            )
          ),
          /* Откуда взялись логины и пароли: источник учётных данных + способ получения */
          (x.credentials || []).length ? h2(
            "div",
            { className: "rt-rep-src" },
            h2(
              "div",
              { className: "rt-rep-src-title" },
              "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0435 \u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 (\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F)"
            ),
            (x.credentials || []).map(
              (c) => h2(
                "div",
                { key: "c" + c.id, className: "rt-kv" },
                h2(
                  "b",
                  { className: "rt-mono", style: { minWidth: 120 } },
                  c.host || "\u2014"
                ),
                h2(
                  "span",
                  null,
                  (c.username || "(\u0431\u0435\u0437 \u0438\u043C\u0435\u043D\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F)") + " / " + (c.secret_type || "password") + (c.privilege ? " \xB7 \u043F\u0440\u0430\u0432\u0430 " + c.privilege : "") + " \xB7 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A " + (c.source || "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D") + (c.tool ? " \xB7 \u0441\u043F\u043E\u0441\u043E\u0431 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F " + String(c.tool).replace(/\n+/g, " ").slice(0, 160) : "")
                )
              )
            )
          ) : null,
          /* Как построен туннель */
          (x.tunnels || []).length ? h2(
            "div",
            { className: "rt-rep-src" },
            h2(
              "div",
              { className: "rt-rep-src-title" },
              "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0442\u0443\u043D\u043D\u0435\u043B\u0438 / \u043A\u0430\u043D\u0430\u043B\u044B"
            ),
            (x.tunnels || []).map(
              (t) => h2(
                "div",
                { key: "t" + t.id, className: "rt-kv" },
                h2(
                  "b",
                  { className: "rt-mono", style: { minWidth: 120 } },
                  (t.kind || "socks5") + " " + (t.listen || "")
                ),
                h2(
                  "span",
                  null,
                  "\u0412\u0445\u043E\u0434 " + (t.entry || "\u043D\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D") + (t.reach ? " \xB7 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E " + t.reach : "") + " \xB7 \u0441\u0442\u043E\u0440\u043E\u043D\u0430 \u0446\u0435\u043B\u0438 " + (t.entry_kind || "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E") + (t.legit === false ? " \xB7 \u26A0\uFE0F \u043D\u0435 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u0435\u043C \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u0446\u0435\u043B\u0438" : "") + (t.status ? " \xB7 " + t.status : "") + (t.command ? " \xB7 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 " + String(t.command).replace(/\n+/g, " ").slice(0, 160) : "")
                )
              )
            )
          ) : null,
          (x.webshells || []).length ? h2(
            "div",
            { className: "rt-rep-src" },
            h2(
              "div",
              { className: "rt-rep-src-title" },
              "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 WebShell"
            ),
            (x.webshells || []).map(
              (w) => h2(
                "div",
                { key: "w" + w.id, className: "rt-kv" },
                h2(
                  "b",
                  { className: "rt-mono", style: { minWidth: 120 } },
                  w.shell_type || "shell"
                ),
                h2(
                  "span",
                  null,
                  (w.url || "") + (w.pass_key ? " \xB7 \u043F\u0430\u0440\u043E\u043B\u044C/\u043A\u043B\u044E\u0447 " + w.pass_key : "") + (w.privilege ? " \xB7 \u043F\u0440\u0430\u0432\u0430 " + w.privilege : "") + (w.status ? " \xB7 " + w.status : "")
                )
              )
            )
          ) : null,
          (x.gaps || []).length ? h2(
            "div",
            { className: "rt-rep-missing" },
            "\u26A0\uFE0F \u041F\u0440\u043E\u0431\u0435\u043B\u044B \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F: " + x.gaps.join("; ")
          ) : null
        ),
        (x.requests || []).length === 0 ? h2(
          "div",
          { className: "rt-rep-missing" },
          "\u26A0\uFE0F \u0423 \u044D\u0442\u043E\u0433\u043E \u043F\u0443\u043D\u043A\u0442\u0430 \u043D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0438 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430, \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u043D\u0435\u043B\u044C\u0437\u044F \u2014\u2014 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 redteam_http_evidence_add"
        ) : (x.requests || []).map(
          (r, ri) => h2(
            "div",
            { key: "q" + ri, className: "rt-rep-req" },
            h2(
              "div",
              { className: "rt-rep-req-head" },
              h2(
                "span",
                null,
                "\u0417\u0430\u043F\u0440\u043E\u0441 \u0434\u043B\u044F \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F " + (ri + 1) + (r.source === "auto" ? " (\u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u043E \u043F\u0443\u0442\u0438 \u0446\u0435\u043B\u0438, \u0441\u0432\u0435\u0440\u044C\u0442\u0435)" : "")
              ),
              h2(
                "span",
                { className: "rt-tag" },
                (r.method || "GET") + " " + (r.status === null || r.status === void 0 ? "" : r.status)
              ),
              h2("div", { className: "rt-spacer" }),
              h2(
                "button",
                {
                  className: "rt-btn",
                  style: { padding: "0 6px", fontSize: 11 },
                  onClick: () => copy(String(r.request || ""), "\u0417\u0430\u043F\u0440\u043E\u0441 " + (ri + 1))
                },
                "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 Yakit"
              )
            ),
            h2(
              "pre",
              { className: "rt-rep-http" },
              r.request || (r.method || "GET") + " " + (r.url || "") + " HTTP/1.1"
            ),
            r.response ? h2(
              "div",
              null,
              h2(
                "div",
                { className: "rt-rep-req-head" },
                h2("span", null, "\u041A\u0440\u0430\u0442\u043A\u0438\u0439 \u043E\u0442\u0432\u0435\u0442")
              ),
              h2(
                "pre",
                {
                  className: "rt-rep-http",
                  style: { maxHeight: 160 }
                },
                String(r.response).slice(0, 1600)
              )
            ) : null
          )
        ),
        x.note ? h2(
          "div",
          { className: "rt-rep-meta" },
          h2("b", null, "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 "),
          h2("span", null, x.note)
        ) : null
      )
    );
    return h2(
      "div",
      { className: "rt-main" },
      h2(
        "div",
        { className: "rt-toolbar" },
        h2("span", { style: { fontWeight: 600 } }, "\u041E\u0442\u0447\u0451\u0442 \u043E \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u0446\u0435\u043F\u043E\u0447\u043A\u0438 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0439"),
        summary ? h2(
          "span",
          { className: "rt-tag rt-tag-live" },
          "\u0418\u0442\u043E\u0433\u043E " + summary.points + " \u0431\u0430\u043B\u043B\u043E\u0432"
        ) : null,
        summary ? h2("span", { className: "rt-tag" }, summary.count + " \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0439") : null,
        summary ? h2(
          "span",
          {
            className: "rt-tag" + (summary.missingRequests ? "" : " rt-tag-live")
          },
          summary.withRequests + "/" + summary.count + " \u0441 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u043C\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C\u0438"
        ) : null,
        summary ? h2(
          "span",
          {
            className: "rt-tag" + (summary.incomplete ? " rt-tag-warn" : " rt-tag-live"),
            title: "\u041F\u043E\u043B\u043D\u043E\u0442\u0430 \u0446\u0435\u043F\u043E\u0447\u043A\u0438 \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F: \u0435\u0441\u0442\u044C \u0448\u0430\u0433\u0438 \u0430\u0442\u0430\u043A\u0438, \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B, \u0441\u0432\u044F\u0437\u0430\u043D\u044B \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044C/\u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435/\u0442\u0443\u043D\u043D\u0435\u043B\u044C"
          },
          "\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u043C\u043E " + (summary.count - (summary.incomplete || 0)) + "/" + summary.count
        ) : null,
        summary && summary.serviceCappedExcluded ? h2(
          "span",
          {
            className: "rt-tag rt-tag-warn",
            title: (summary.serviceCapped || []).map((x) => (x.service || "") + "|" + (x.point_name || "")).join("\n") || "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044F \u043F\u043E \u0443\u0447\u0451\u0442\u043D\u044B\u043C \u0437\u0430\u043F\u0438\u0441\u044F\u043C/\u043F\u0440\u0430\u0432\u0430\u043C \u0411\u0414 \u0442\u043E\u0433\u043E \u0436\u0435 \u0430\u043A\u0442\u0438\u0432\u0430 \u0438 \u043F\u043E\u0440\u0442\u0430: \u0441\u0435\u0440\u0432\u0438\u0441 \u0432\u0437\u044F\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E, \u0431\u0430\u043B\u043B\u044B \u043D\u0435 \u043D\u0430\u0447\u0438\u0441\u043B\u044F\u044E\u0442\u0441\u044F \u0438 \u0432 \u043E\u0442\u0447\u0451\u0442 \u043D\u0435 \u0438\u0434\u0443\u0442"
          },
          "\u0421\u0435\u0440\u0432\u0438\u0441 \u0432\u0437\u044F\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E, \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432: " + summary.serviceCappedExcluded
        ) : null,
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          {
            className: "rt-btn",
            disabled: busy || !mdText,
            onClick: () => copy(mdText, "\u0432\u0435\u0441\u044C \u043E\u0442\u0447\u0451\u0442")
          },
          "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0446\u0435\u043B\u0438\u043A\u043E\u043C"
        ),
        h2(
          "button",
          {
            className: "rt-btn",
            disabled: busy || !mdText,
            onClick: () => download(mdText, data && data.target || eng)
          },
          "\u0421\u043A\u0430\u0447\u0430\u0442\u044C .md"
        ),
        h2(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F\u2026" : "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E"
        )
      ),
      msg ? h2(
        "div",
        { className: msg.err ? "rt-err" : "rt-foot" },
        msg.err || msg.ok
      ) : null,
      err ? h2("div", { className: "rt-err" }, err) : null,
      h2(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        stages.length ? h2(
          "div",
          { className: "rt-rep-list" },
          h2(
            "div",
            { className: "rt-rep-tools" },
            h2(
              "button",
              {
                className: "rt-btn",
                onClick: () => collapse.setAll(
                  stages.map((s) => "st:" + s.code),
                  true
                )
              },
              "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435"
            ),
            h2(
              "button",
              {
                className: "rt-btn",
                onClick: () => collapse.setAll(
                  stages.map((s) => "st:" + s.code),
                  false
                )
              },
              "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435"
            )
          ),
          stages.map((st) => {
            const open = collapse.isOpen("st:" + st.code, true);
            const toggle = collapse.toggle("st:" + st.code, true);
            return h2(
              "div",
              { key: "g" + st.code, className: "rt-rep-group" },
              h2(
                "div",
                {
                  className: "rt-rep-stage",
                  role: "button",
                  tabIndex: 0,
                  style: { borderLeftColor: st.color },
                  "aria-expanded": open ? "true" : "false",
                  onClick: toggle,
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(e);
                    }
                  }
                },
                h2("span", { className: "rt-sec-caret" }, open ? "\u25BE" : "\u25B8"),
                h2(
                  "span",
                  {
                    className: "rt-rep-no",
                    style: { background: st.color }
                  },
                  CIRCLED[st.ordinal - 1] || st.ordinal
                ),
                h2("span", { className: "rt-rep-stage-name" }, st.name),
                h2(
                  "span",
                  { className: "rt-rep-stage-n" },
                  st.items.length + " \u0448\u0442."
                ),
                h2("div", { className: "rt-spacer" }),
                h2(
                  "span",
                  {
                    className: "rt-rep-pts",
                    style: {
                      background: st.color + "22",
                      color: st.color,
                      borderColor: st.color + "66"
                    }
                  },
                  "+" + st.points + " \u0431\u0430\u043B\u043B\u043E\u0432"
                ),
                h2(
                  "span",
                  { className: "rt-ap-cum" },
                  "\u041D\u0430\u043A\u043E\u043F\u043B\u0435\u043D\u043E " + st.cumulative + " \u0431\u0430\u043B\u043B\u043E\u0432"
                )
              ),
              open ? h2("div", { className: "rt-rep-body" }, st.items.map(card)) : null
            );
          })
        ) : data === null ? h2("div", { className: "rt-empty" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026") : h2(
          "div",
          { className: "rt-empty" },
          h2("div", null, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0434\u043B\u044F \u0441\u0434\u0430\u0447\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442."),
          h2(
            "div",
            { style: { marginTop: 6, fontSize: 12 } },
            '\u0412 \u043E\u0442\u0447\u0451\u0442 \u043F\u043E\u043F\u0430\u0434\u0430\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B "\u0441 \u0431\u0430\u043B\u043B\u0430\u043C\u0438"; \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0438 \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432 \u0432 \u043D\u0435\u0433\u043E \u043D\u0435 \u0432\u0445\u043E\u0434\u044F\u0442. \u041F\u043E\u043B\u0443\u0447\u0438\u0432 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442, \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0433\u043E \u0447\u0435\u0440\u0435\u0437 redteam_score_hit (\u0430\u043A\u0442\u0438\u0432 \u0446\u0435\u043B\u0438 + \u0447\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E) \u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 redteam_http_evidence_add \u0434\u043B\u044F \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F.'
          )
        )
      ),
      h2(
        "div",
        { className: "rt-foot" },
        h2(
          "span",
          null,
          "\u041F\u0440\u0430\u0432\u0438\u043B\u043E: \u0442\u043E\u043B\u044C\u043A\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0441 \u0431\u0430\u043B\u043B\u0430\u043C\u0438, \u043A \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u043F\u0440\u0438\u043B\u0430\u0433\u0430\u0435\u0442\u0441\u044F \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043C\u043E\u0436\u043D\u043E \u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432 Yakit Repeater"
        )
      )
    );
  }
  const FILE_KIND = {
    poc: "POC",
    exp: "EXP",
    script: "\u0421\u043A\u0440\u0438\u043F\u0442",
    wordlist: "\u0421\u043B\u043E\u0432\u0430\u0440\u044C",
    other: "\u041F\u0440\u043E\u0447\u0435\u0435"
  };
  function AttackFilesTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [folders, setFolders] = import_react2.default.useState([]);
    const [err, setErr] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const collapse = useCollapse("files:" + eng);
    const [detail, setDetail] = import_react2.default.useState(null);
    const load = () => {
      if (!eng) return;
      setBusy(true);
      api({ op: "attackFiles", engagement: eng }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          setFolders(r.items || []);
        },
        (e) => {
          setBusy(false);
          setErr(String(e && e.message || e));
        }
      );
    };
    import_react2.default.useEffect(load, [eng, refreshKey]);
    const openFile = (f) => {
      if (detail && detail.id === f.id) {
        setDetail(null);
        return;
      }
      setDetail(null);
      api({ op: "readAttackFile", engagement: eng, id: f.id }).then(
        (r) => {
          if (r && r.ok) setDetail(r);
          else setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
        },
        (e) => setErr(String(e && e.message || e))
      );
    };
    const rows = [];
    for (const folder of folders) {
      const fKey = "folder:" + folder.folder;
      const fileNodes = [];
      for (const f of folder.files) {
        fileNodes.push(
          h2(
            "div",
            {
              key: "a" + f.id,
              className: "rt-vrow",
              style: {
                gridTemplateColumns: "18px 1.2fr 60px 1.6fr",
                cursor: "pointer"
              },
              role: "button",
              tabIndex: 0,
              onClick: () => openFile(f),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openFile(f);
                }
              }
            },
            h2(
              "span",
              { className: "rt-sec-caret" },
              detail && detail.id === f.id ? "\u25BE" : "\u25B8"
            ),
            h2("span", { className: "rt-mono" }, f.name),
            h2(
              "span",
              null,
              h2(
                "span",
                { className: "rt-tag rt-tag-active" },
                FILE_KIND[f.kind] || f.kind || "\u2014"
              )
            ),
            h2(
              "span",
              {
                style: {
                  fontSize: 11.5,
                  color: "var(--dsw-alias-label-secondary)"
                },
                title: f.description || ""
              },
              f.description || "\u2014"
            )
          )
        );
        if (!detail || detail.id !== f.id) continue;
        fileNodes.push(
          h2(
            "div",
            {
              key: "ad" + f.id,
              className: "rt-vrow",
              style: { cursor: "default", gridTemplateColumns: "1fr" }
            },
            h2(
              "div",
              { className: "rt-vdetail" },
              h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u042D\u0444\u0444\u0435\u043A\u0442"),
                h2("span", null, detail.evidence || "\u2014")
              ),
              h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u041F\u0443\u0442\u044C"),
                h2(
                  "span",
                  { className: "rt-mono", style: { wordBreak: "break-all" } },
                  detail.path
                )
              ),
              h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u0417\u0430\u043F\u0438\u0441\u044C"),
                h2(
                  "span",
                  null,
                  fmt(detail.created_at) + (detail.created_by ? " \xB7 " + detail.created_by : "")
                )
              ),
              h2(
                "pre",
                {
                  className: "rt-md",
                  style: {
                    border: "1px solid var(--dsw-alias-border-l1)",
                    borderRadius: 6,
                    maxHeight: "40vh",
                    padding: "10px 12px"
                  }
                },
                detail.content || "(\u043F\u0443\u0441\u0442\u043E)"
              )
            )
          )
        );
      }
      rows.push(
        h2(
          Section,
          {
            key: "sec:" + folder.folder,
            tone: "folder",
            title: folder.folder + "/",
            count: folder.count + " \u0444\u0430\u0439\u043B\u043E\u0432",
            open: collapse.isOpen(fKey, true),
            onToggle: collapse.toggle(fKey, true)
          },
          fileNodes.length ? fileNodes : h2("div", { className: "rt-atest-meta" }, "(\u043F\u0443\u0441\u0442\u043E)")
        )
      );
    }
    const total = folders.reduce((n, f) => n + f.count, 0);
    return h2(
      "div",
      { className: "rt-main" },
      h2(
        "div",
        { className: "rt-toolbar" },
        h2("span", { style: { fontWeight: 600 } }, "\u0424\u0430\u0439\u043B\u044B \u0430\u0442\u0430\u043A\u0438"),
        h2(
          "span",
          { className: "rt-tag" },
          folders.length + " \u0446\u0435\u043B\u0435\u0439 / " + total + " \u0444\u0430\u0439\u043B\u043E\u0432"
        ),
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435\u2026" : "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
        )
      ),
      err ? h2("div", { className: "rt-err" }, err) : null,
      h2(
        "div",
        { className: "rt-table" },
        rows,
        !folders.length ? h2(
          "div",
          { className: "rt-empty" },
          "\u0424\u0430\u0439\u043B\u043E\u0432 \u0430\u0442\u0430\u043A\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 (\u043F\u0440\u043E\u0431\u0438\u0432\u0448\u0438\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u044B/POC/EXP \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C \u0432 \u043F\u0430\u043F\u043A\u0430\u0445 \u0446\u0435\u043B\u0435\u0439)"
        ) : null
      ),
      h2(
        "div",
        { className: "rt-foot" },
        h2(
          "span",
          null,
          "\u041A\u0430\u0442\u0430\u043B\u043E\u0433: attack-files/<IP|\u0445\u043E\u0441\u0442 \u0438\u0437 URL|C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442>/ | \u0442\u043E\u043B\u044C\u043A\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0441\u0440\u0430\u0431\u043E\u0442\u0430\u0432\u0448\u0438\u0435 \u0444\u0430\u0439\u043B\u044B"
        )
      )
    );
  }
  const POC_KIND_LABEL = {
    poc: "POC",
    exp: "EXP",
    script: "\u0421\u043A\u0440\u0438\u043F\u0442",
    template: "\u0428\u0430\u0431\u043B\u043E\u043D",
    payload: "\u041F\u043E\u043B\u0435\u0437\u043D\u0430\u044F \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0430"
  };
  const POC_SOURCE_LABEL = {
    web: "\u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442",
    self: "\u0421\u0432\u043E\u0451",
    manual: "\u0412\u0440\u0443\u0447\u043D\u0443\u044E",
    "nuclei-template": "\u0428\u0430\u0431\u043B\u043E\u043D nuclei",
    kb: "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439"
  };
  function KnowledgeTab(props) {
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const [msg, setMsg] = import_react2.default.useState(null);
    const [q, setQ] = import_react2.default.useState("");
    const [kind, setKind] = import_react2.default.useState("");
    const [category, setCategory] = import_react2.default.useState("");
    const [engagement, setEngagement] = import_react2.default.useState("");
    const [assetTarget, setAssetTarget] = import_react2.default.useState("");
    const [grouped, setGrouped] = import_react2.default.useState(true);
    const [verifiedOnly, setVerifiedOnly] = import_react2.default.useState(false);
    const [openId, setOpenId] = import_react2.default.useState(null);
    const [detail, setDetail] = import_react2.default.useState(null);
    const [detailBusy, setDetailBusy] = import_react2.default.useState(false);
    const [tplOffset, setTplOffset] = import_react2.default.useState(0);
    const tplPageSize = 40;
    const query = (over) => {
      const extra = over || {};
      const offset = Object.prototype.hasOwnProperty.call(
        extra,
        "templateOffset"
      ) ? extra.templateOffset : 0;
      setTplOffset(offset);
      const params = Object.assign(
        {
          q: q.trim() || void 0,
          kind: kind || void 0,
          category: category || void 0,
          engagement: engagement || void 0,
          asset_target: assetTarget.trim() || void 0,
          verified: verifiedOnly || void 0,
          templateOffset: offset || 0,
          templateLimit: tplPageSize
        },
        extra
      );
      setBusy(true);
      setMsg(null);
      api(Object.assign({ op: "pocSearch" }, params)).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          setData(r);
        },
        (e) => {
          setBusy(false);
          setErr(String(e && e.message || e));
        }
      );
    };
    import_react2.default.useEffect(() => {
      query({
        q: void 0,
        kind: void 0,
        category: void 0,
        engagement: void 0,
        asset_target: void 0,
        verified: void 0
      });
    }, [refreshKey]);
    const open = (id) => {
      if (openId === id) {
        setOpenId(null);
        setDetail(null);
        return;
      }
      setOpenId(id);
      setDetail(null);
      setDetailBusy(true);
      api({ op: "pocGet", id }).then(
        (r) => {
          setDetailBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F" });
            return;
          }
          setDetail(r);
        },
        (e) => {
          setDetailBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const copy = (text, label) => copyWithFeedback(text, label, (okFlag, message) => {
      setMsg(okFlag ? { ok: message } : { err: message });
    });
    const useIt = (row) => {
      api({ op: "pocUse", id: row.id, used_on: "\u043E\u0442\u043C\u0435\u0447\u0435\u043D\u043E \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438" }).then(
        () => {
          setMsg({ ok: "\u041E\u0442\u043C\u0435\u0447\u0435\u043D\u043E \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435: " + row.title });
          query();
        },
        (e) => setMsg({ err: String(e && e.message || e) })
      );
    };
    const stats = data && data.stats || {
      total: 0,
      verified: 0,
      reused: 0,
      byKind: [],
      bySource: []
    };
    const items = data && data.items || [];
    const tpl = data && data.templates || {
      dir: null,
      total: 0,
      matched: 0,
      offset: 0,
      items: [],
      byCategory: []
    };
    const tplByCat = new Map(
      (tpl.byCategory || []).map((c) => [c.code, c.n || 0])
    );
    const catShown = (c) => (c.n || 0) + (tplByCat.get(c.code) || 0);
    const tplItems = tpl.items || [];
    const tplMatched = tpl.matched != null ? tpl.matched : tpl.total;
    const tplStart = Number(tpl.offset) || 0;
    const turnTpl = (next) => {
      const offset = Math.max(0, next);
      setTplOffset(offset);
      query({ templateOffset: offset });
    };
    const card = (x) => {
      const isOpen = openId === x.id;
      const d = isOpen && detail && detail.id === x.id ? detail : null;
      return h2(
        "div",
        { key: "p" + x.id, className: "rt-kb" + (isOpen ? " open" : "") },
        h2(
          "div",
          {
            className: "rt-kb-head",
            role: "button",
            tabIndex: 0,
            "aria-expanded": isOpen ? "true" : "false",
            onClick: () => open(x.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open(x.id);
              }
            }
          },
          h2("span", { className: "rt-sec-caret" }, isOpen ? "\u25BE" : "\u25B8"),
          h2(
            "span",
            { className: "rt-kb-kind k-" + (x.kind || "poc") },
            POC_KIND_LABEL[x.kind] || x.kind || "POC"
          ),
          h2("span", { className: "rt-kb-title" }, x.title),
          x.cve ? h2("span", { className: "rt-tag rt-tag-passive" }, x.cve) : null,
          x.component ? h2("span", { className: "rt-tag" }, x.component) : null,
          x.verified === 1 ? h2("span", { className: "rt-tag rt-tag-live" }, "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E") : h2("span", { className: "rt-tag rt-tag-warn" }, "\u041D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E"),
          h2("div", { className: "rt-spacer" }),
          h2(
            "span",
            { className: "rt-tag" },
            POC_SOURCE_LABEL[x.source] || x.source || "\u2014"
          ),
          x.hit_count ? h2("span", { className: "rt-tag" }, "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0439 " + x.hit_count) : null
        ),
        /* Строка источника: категория · затронутые версии · когда создано · цель-источник · найденный актив —— чтобы было видно, «когда
             и на каком активе какой организации это найдено» */
        h2(
          "div",
          { className: "rt-kb-sub" },
          [
            x.category ? "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F " + (POC_CAT_NAME[x.category] || x.category) : null,
            x.versions ? "\u0417\u0430\u0442\u0440\u043E\u043D\u0443\u0442\u044B\u0435 \u0432\u0435\u0440\u0441\u0438\u0438 " + x.versions : null,
            x.language || null,
            x.tags || null,
            "\u0421\u043E\u0437\u0434\u0430\u043D\u043E " + fmt(x.created_at),
            x.engagement_name || x.engagement_id ? "\u0426\u0435\u043B\u044C-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A " + (x.engagement_name || x.engagement_id) : null,
            x.asset_target ? "\u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0439 \u0430\u043A\u0442\u0438\u0432 " + x.asset_target : null,
            x.found_by_agent ? "\u0420\u043E\u043B\u044C \u043F\u0440\u0438 \u043D\u0430\u0445\u043E\u0434\u043A\u0435 " + (ROLE_LABEL[x.found_by_agent] || x.found_by_agent) : null,
            x.source_url ? "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A " + x.source_url : null
          ].filter(Boolean).join(" \xB7 ")
        ),
        isOpen ? h2(
          "div",
          { className: "rt-kb-body" },
          detailBusy && !d ? h2("div", { className: "rt-empty" }, "\u0427\u0442\u0435\u043D\u0438\u0435\u2026") : null,
          d ? h2(
            "div",
            null,
            d.usage ? h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435"),
              h2("span", { className: "rt-mono" }, d.usage)
            ) : null,
            d.description ? h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
              h2("span", null, d.description)
            ) : null,
            d.verified_note ? h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u0414\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"),
              h2("span", null, d.verified_note)
            ) : null,
            d.used_on ? h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435"),
              h2("span", null, d.used_on)
            ) : null,
            d.path ? h2(
              "div",
              { className: "rt-kv" },
              h2("b", null, "\u0424\u0430\u0439\u043B \u043D\u0430 \u0434\u0438\u0441\u043A\u0435"),
              h2("span", { className: "rt-mono" }, d.path)
            ) : null,
            h2(
              "div",
              { className: "rt-kb-actions" },
              h2(
                "button",
                {
                  className: "rt-btn",
                  disabled: !d.content,
                  onClick: () => copy(d.content || "", "\u0442\u0435\u043A\u0441\u0442 POC")
                },
                "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442"
              ),
              h2(
                "button",
                { className: "rt-btn", onClick: () => useIt(x) },
                "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435"
              ),
              d.source_url ? h2(
                "button",
                {
                  className: "rt-btn",
                  onClick: () => copy(d.source_url, "\u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A")
                },
                "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A"
              ) : null
            ),
            d.content ? h2(
              "pre",
              { className: "rt-rep-http" },
              d.content.length > 12e3 ? d.content.slice(0, 12e3) + "\n\u2026(\u043E\u0431\u0440\u0435\u0437\u0430\u043D\u043E, \u043F\u043E\u043B\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0432 \u0444\u0430\u0439\u043B\u0435 \u043D\u0430 \u0434\u0438\u0441\u043A\u0435)" : d.content
            ) : h2(
              "div",
              { className: "rt-empty" },
              "\u0423 \u044D\u0442\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0435 \u0431\u0435\u0437 \u0442\u0435\u043A\u0441\u0442\u0430 \u2014\u2014 \u043F\u043E\u043B\u0443\u0447\u0438\u0432 \u0442\u0435\u043A\u0441\u0442, \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0447\u0435\u0440\u0435\u0437 redteam_poc_update"
            )
          ) : null
        ) : null
      );
    };
    return h2(
      "div",
      { className: "rt-main" },
      h2(
        "div",
        { className: "rt-toolbar" },
        h2("span", { style: { fontWeight: 600 } }, "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439 \xB7 POC / EXP"),
        h2("span", { className: "rt-tag" }, stats.total + " \u0448\u0442."),
        h2(
          "span",
          { className: "rt-tag rt-tag-live" },
          "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E " + stats.verified
        ),
        h2("span", { className: "rt-tag" }, "\u0412\u0441\u0435\u0433\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0439 " + (stats.reused || 0)),
        (stats.uncategorized || 0) > 0 && (stats.uncategorized || 0) !== stats.total ? h2(
          "span",
          {
            className: "rt-tag rt-tag-warn",
            title: "\u042D\u0442\u0438 \u0437\u0430\u043F\u0438\u0441\u0438 \u0431\u0435\u0437 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438: \u043F\u0440\u0438 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u0430\u0433\u0435\u043D\u0442\u043E\u043C \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 category \u0432 redteam_poc_add"
          },
          "\u0411\u0435\u0437 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 " + stats.uncategorized
        ) : null,
        tpl.total ? h2(
          "span",
          { className: "rt-tag rt-tag-passive" },
          "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u044B " + tpl.total
        ) : null,
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          {
            className: "rt-btn" + (grouped ? " rt-btn-primary" : ""),
            title: "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C / \u043F\u043B\u043E\u0441\u043A\u0438\u043C \u0441\u043F\u0438\u0441\u043A\u043E\u043C",
            onClick: () => setGrouped(!grouped)
          },
          grouped ? "\u041F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C" : "\u041F\u043B\u043E\u0441\u043A\u0438\u0439 \u0441\u043F\u0438\u0441\u043E\u043A"
        ),
        h2(
          "button",
          { className: "rt-btn", disabled: busy, onClick: () => query() },
          busy ? "\u041F\u043E\u0438\u0441\u043A\u2026" : "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
        )
      ),
      /* Обзор категорий: клик фильтрует по категории, сразу видно, «какого оружия сколько накоплено и где пока пусто» */
      h2(
        "div",
        { className: "rt-kb-cats" },
        (stats.byCategory || []).filter((c) => catShown(c) > 0 || POC_CAT_ORDER.includes(c.code)).map(
          (c) => h2(
            "span",
            {
              key: c.code,
              className: "rt-concl-i" + (category === c.code ? " on" : ""),
              title: (c.hint || POC_CAT_NAME[c.code] || c.code) + " \xB7 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 " + (tplByCat.get(c.code) || 0) + " \xB7 \u0432 \u0431\u0430\u0437\u0435 \u0437\u043D\u0430\u043D\u0438\u0439 " + (c.n || 0) + (c.verified ? " (\u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E " + c.verified + ")" : ""),
              onClick: () => {
                const next = category === c.code ? "" : c.code;
                setCategory(next);
                query({ category: next || void 0 });
              }
            },
            h2("b", null, String(catShown(c))),
            h2(
              "span",
              null,
              (POC_CAT_NAME[c.code] || c.code) + (c.verified ? " (\u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E " + c.verified + ")" : "")
            )
          )
        )
      ),
      h2(
        "div",
        { className: "rt-kb-filter" },
        h2("input", {
          className: "rt-input",
          style: { flex: 1, minWidth: 140 },
          placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E CVE / \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0443 / \u043A\u043B\u044E\u0447\u0435\u0432\u043E\u043C\u0443 \u0441\u043B\u043E\u0432\u0443 (\u0438\u0449\u0435\u0442 \u0438 \u043F\u043E \u0442\u0435\u043A\u0441\u0442\u0443)",
          value: q,
          onChange: (e) => setQ(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") query();
          }
        }),
        h2(
          "select",
          {
            className: "rt-input",
            style: { maxWidth: 120 },
            value: category,
            onChange: (e) => {
              setCategory(e.target.value);
              query({ category: e.target.value || void 0 });
            }
          },
          h2("option", { value: "" }, "\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
          POC_CAT_ORDER.map(
            (k) => h2("option", { key: k, value: k }, POC_CAT_NAME[k])
          )
        ),
        h2(
          "select",
          {
            className: "rt-input",
            style: { maxWidth: 120 },
            value: engagement,
            onChange: (e) => {
              setEngagement(e.target.value);
              query({ engagement: e.target.value || void 0 });
            }
          },
          h2("option", { value: "" }, "\u0412\u0441\u0435 \u0446\u0435\u043B\u0438-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438"),
          (stats.byEngagement || []).map(
            (e) => h2(
              "option",
              { key: e.engagement, value: e.engagement },
              e.engagement + "(" + e.n + ")"
            )
          )
        ),
        h2("input", {
          className: "rt-input",
          style: { width: 120 },
          placeholder: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u043E\u043C\u0443 \u0430\u043A\u0442\u0438\u0432\u0443",
          value: assetTarget,
          onChange: (e) => setAssetTarget(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") query();
          }
        }),
        h2(
          "select",
          {
            className: "rt-input",
            style: { maxWidth: 110 },
            value: kind,
            onChange: (e) => {
              setKind(e.target.value);
              query({ kind: e.target.value || void 0 });
            }
          },
          h2("option", { value: "" }, "\u0412\u0441\u0435 \u0442\u0438\u043F\u044B"),
          Object.keys(POC_KIND_LABEL).map(
            (k) => h2("option", { key: k, value: k }, POC_KIND_LABEL[k])
          )
        ),
        h2(
          "label",
          { className: "rt-kb-check" },
          h2("input", {
            type: "checkbox",
            checked: verifiedOnly,
            onChange: (e) => {
              setVerifiedOnly(e.target.checked);
              query({ verified: e.target.checked || void 0 });
            }
          }),
          "\u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0435"
        ),
        h2(
          "button",
          { className: "rt-btn rt-btn-primary", onClick: () => query() },
          "\u041F\u043E\u0438\u0441\u043A"
        )
      ),
      msg ? h2(
        "div",
        { className: msg.err ? "rt-err" : "rt-foot" },
        msg.err || msg.ok
      ) : null,
      err ? h2(
        "div",
        { className: "rt-err" },
        /engagement required|unknown op/i.test(err) ? (
          /* У старого host ещё нет API базы знаний: объясняем, как восстановить, чтобы человек не тупил перед "engagement required" */
          "API \u0431\u0430\u0437\u044B \u0437\u043D\u0430\u043D\u0438\u0439 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 host, \u0430 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0445\u043E\u0441\u0442 \u2014 \u0441\u0442\u0430\u0440\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u2014\u2014 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0432\u044B\u0439\u0434\u0438\u0442\u0435 \u0438 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0437\u0430\u043D\u043E\u0432\u043E (\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 exe / Community Edition / dsh web), \u0437\u0430\u0442\u0435\u043C \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443."
        ) : err
      ) : null,
      !err && data && data.dbPath ? h2(
        "div",
        { className: "rt-foot", style: { marginBottom: 6, fontSize: 11 } },
        "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439: " + data.dbPath + (data.root ? " (\u043A\u043E\u0440\u0435\u043D\u044C " + data.root + ")" : "")
      ) : null,
      h2(
        "div",
        { className: "rt-table" },
        (() => {
          if (!grouped) return items.map(card);
          const buckets = /* @__PURE__ */ new Map();
          for (const x of items) {
            const code = POC_CAT_NAME[x.category] ? x.category : "other";
            if (!buckets.has(code)) buckets.set(code, []);
            buckets.get(code).push(x);
          }
          const order = POC_CAT_ORDER.filter((c) => buckets.has(c));
          for (const code of buckets.keys())
            if (!order.includes(code)) order.push(code);
          const out = [];
          for (const code of order) {
            const list = buckets.get(code);
            out.push(
              h2(
                "div",
                { key: "g" + code, className: "rt-kb-cat" },
                h2(
                  "span",
                  { className: "rt-kb-cat-name" },
                  POC_CAT_NAME[code] || code
                ),
                h2("span", { className: "rt-tag" }, list.length + " \u0448\u0442."),
                h2(
                  "span",
                  { className: "rt-tag rt-tag-live" },
                  "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E " + list.filter((x) => x.verified === 1).length
                ),
                h2("span", { className: "rt-spacer" }),
                h2(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      color: "var(--dsw-alias-label-secondary)"
                    }
                  },
                  "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 " + fmt(
                    list.map((x) => x.created_at).filter(Boolean).sort().pop()
                  )
                )
              )
            );
            for (const x of list) out.push(card(x));
          }
          return out;
        })(),
        tplItems.length ? h2(
          "div",
          { className: "rt-kb-tpl" },
          h2(
            "div",
            { className: "rt-ap-sub" },
            "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u044B nuclei \xB7 " + (tplStart + 1) + "\u2013" + (tplStart + tplItems.length) + " / " + tplMatched + " (\u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E `nuclei -t <\u043F\u0443\u0442\u044C \u043A \u0448\u0430\u0431\u043B\u043E\u043D\u0443>`)"
          ),
          tplItems.map(
            (t, i) => h2(
              "div",
              { key: "t" + tplStart + "-" + i, className: "rt-kb-tpl-row" },
              h2("span", { className: "rt-tag" }, t.severity || "\u2014"),
              t.category ? h2(
                "span",
                { className: "rt-tag" },
                POC_CAT_NAME[t.category] || t.category
              ) : null,
              h2(
                "span",
                { className: "rt-mono rt-kb-tpl-path", title: t.path },
                t.path
              ),
              h2(
                "span",
                { className: "rt-kb-tpl-name", title: t.name },
                t.name || ""
              ),
              h2(
                "button",
                {
                  className: "rt-btn",
                  style: { padding: "0 6px", fontSize: 10.5 },
                  onClick: () => copy("nuclei -t " + t.path + " -u <\u0446\u0435\u043B\u044C>", "\u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0448\u0430\u0431\u043B\u043E\u043D\u0430")
                },
                "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443"
              )
            )
          ),
          h2(
            "div",
            { className: "rt-kb-actions" },
            h2(
              "button",
              {
                className: "rt-btn",
                disabled: busy || tplStart <= 0,
                onClick: () => turnTpl(tplStart - tplPageSize)
              },
              "\u041D\u0430\u0437\u0430\u0434"
            ),
            h2(
              "button",
              {
                className: "rt-btn",
                disabled: busy || tplStart + tplItems.length >= tplMatched,
                onClick: () => turnTpl(tplStart + tplPageSize)
              },
              "\u0412\u043F\u0435\u0440\u0451\u0434"
            )
          ),
          tpl.dir ? h2(
            "div",
            { className: "rt-foot" },
            h2("span", null, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432: " + tpl.dir)
          ) : null
        ) : null,
        data === null ? h2("div", { className: "rt-empty" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026") : null,
        data !== null && !items.length && !tplItems.length ? h2(
          "div",
          { className: "rt-empty" },
          h2(
            "div",
            null,
            q || kind || verifiedOnly ? "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E: \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u043E\u0435 \u0441\u043B\u043E\u0432\u043E \u043B\u0438\u0431\u043E \u0438\u0449\u0438\u0442\u0435 \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435 / \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u0430\u043C\u0438 \u0438 \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0431\u0430\u0437\u0443." : tpl.total ? "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 POC/EXP \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u0430; \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E \u0443\u0436\u0435 \u0435\u0441\u0442\u044C " + tpl.total + " \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 nuclei, \u043D\u043E \u044D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0438\u0445 \u043D\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442. \u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0432\u044B\u0439\u0434\u0438\u0442\u0435 \u0438 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043A\u043B\u0438\u0435\u043D\u0442 \u0437\u0430\u043D\u043E\u0432\u043E." : tpl.dir ? "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439 \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u0430 (\u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 \u0435\u0441\u0442\u044C, \u043D\u043E yaml \u043D\u0435\u0442 \u2014 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 nuclei -update-templates)." : "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439 \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u0430. \u041B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0439 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 nuclei \u0442\u043E\u0436\u0435 \u043D\u0435\u0442 \u2014\u2014 \u043D\u0430 \u043C\u0430\u0448\u0438\u043D\u0435 \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u0430 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 setup.sh \u0438\u043B\u0438 `nuclei -update-templates`; \u043F\u043E\u0441\u043B\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0437\u0434\u0435\u0441\u044C \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \xAB\u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 N\xBB."
          ),
          h2(
            "div",
            { style: { marginTop: 6, fontSize: 12 } },
            "\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u043F\u043E Nday/1day: \u2460 \u0438\u0449\u0435\u043C \u0437\u0434\u0435\u0441\u044C \u0447\u0435\u0440\u0435\u0437 redteam_poc_search (\u0437\u0430\u043E\u0434\u043D\u043E \u0441\u043C\u043E\u0442\u0440\u0438\u0442 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0443\u044E \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 nuclei) \u2192 \u2461 \u0435\u0441\u043B\u0438 \u043D\u0435\u0442 \u2014 \u0438\u0449\u0435\u043C \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435 (web_search / GitHub / ExploitDB / \u0431\u044E\u043B\u043B\u0435\u0442\u0435\u043D\u0438 \u0432\u0435\u043D\u0434\u043E\u0440\u0430) \u0438\u043B\u0438 \u043F\u0438\u0448\u0435\u043C \u0441\u0430\u043C\u0438 \u2192 \u2462 \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u043B\u0438 \u043D\u0430 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0439 \u0446\u0435\u043B\u0438 \u2014 \u0437\u0430\u043B\u0438\u0432\u0430\u0435\u043C \u0447\u0435\u0440\u0435\u0437 redteam_poc_add, \u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u0446\u0435\u043B\u0438 \u0443\u0436\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F."
          ),
          data.dbPath ? h2(
            "div",
            {
              style: { marginTop: 6, fontSize: 11 },
              className: "rt-mono"
            },
            "\u0424\u0430\u0439\u043B \u0431\u0430\u0437\u044B \u0437\u043D\u0430\u043D\u0438\u0439: " + data.dbPath
          ) : null,
          tpl.dir ? h2(
            "div",
            {
              style: { marginTop: 6, fontSize: 11 },
              className: "rt-mono"
            },
            "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432: " + tpl.dir
          ) : null
        ) : null
      ),
      h2(
        "div",
        { className: "rt-foot" },
        h2(
          "span",
          null,
          "\u041E\u0431\u0449\u0430\u044F \u0434\u043B\u044F \u0432\u0441\u0435\u0445 (\u043C\u0435\u0436\u0434\u0443 \u0446\u0435\u043B\u044F\u043C\u0438) | \u043D\u0430 \u0434\u0438\u0441\u043A\u0435: pocs/<code>/ | \u0442\u043E\u043B\u044C\u043A\u043E \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0435 POC/EXP, \u0441\u043A\u0440\u0438\u043F\u0442\u044B \u043F\u043E\u0434 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u0443\u044E \u0446\u0435\u043B\u044C \u0438\u0434\u0443\u0442 \u0432 \xAB\u0424\u0430\u0439\u043B\u044B \u0430\u0442\u0430\u043A\u0438\xBB"
        )
      )
    );
  }
  function EnvTab(props) {
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = import_react2.default.useState(null);
    const [draft, setDraft] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [msg, setMsg] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const [folderPath, setFolderPath] = import_react2.default.useState("");
    const applyDraftFrom = (r) => {
      const c = r && r.config || {};
      setDraft({
        platform: c.platform || "auto",
        toolkitDir: c.toolkitDir || "",
        nucleiTemplatesDir: c.nucleiTemplatesDir || "",
        binDirsText: (c.binDirs || []).join("\n"),
        tools: Object.assign({}, c.tools || {}),
        env: Object.assign(
          { FOFA_KEY: "", REDTEAM_VPS_HOST: "", REDTEAM_VPS_KEY: "" },
          c.env || {}
        ),
        notes: c.notes || ""
      });
      if (c.toolkitDir) setFolderPath(c.toolkitDir);
    };
    const load = () => {
      setBusy(true);
      setMsg(null);
      api({ op: "platformConfigGet" }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          setData(r);
          applyDraftFrom(r);
        },
        (e) => {
          setBusy(false);
          setErr(String(e && e.message || e));
        }
      );
    };
    import_react2.default.useEffect(load, [refreshKey]);
    const save = () => {
      if (!draft) return;
      setBusy(true);
      setMsg(null);
      const config = {
        platform: draft.platform,
        toolkitDir: draft.toolkitDir,
        nucleiTemplatesDir: draft.nucleiTemplatesDir,
        binDirs: String(draft.binDirsText || "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean),
        tools: draft.tools,
        env: draft.env,
        notes: draft.notes,
        envAdaptConfigured: true,
        envAdaptSkip: false
      };
      api({ op: "platformConfigSave", config }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F" });
            return;
          }
          setData(r);
          setMsg({
            ok: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \u0432 " + (r.config && r.config.path || "$DSH_HOME/redteam/config.json")
          });
          applyDraftFrom(r);
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const assignFolder = () => {
      const dir = String(
        folderPath || draft && draft.toolkitDir || ""
      ).trim();
      if (!dir) {
        setMsg({ err: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0443\u0442\u044C \u043A \u043F\u0430\u043F\u043A\u0435 \u0441 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438" });
        return;
      }
      setBusy(true);
      setMsg(null);
      api({ op: "platformAssignToolkit", dir }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F" });
            return;
          }
          setData(r);
          applyDraftFrom(r);
          setMsg({
            ok: "\u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043E \u0438\u0437 \u043F\u0430\u043F\u043A\u0438: " + (r.assignedCount || 0) + " \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432" + (r.nucleiTemplatesDir ? ", \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D nuclei-templates" : "")
          });
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const setTool = (id, value) => setDraft(
      (d) => d ? Object.assign({}, d, {
        tools: Object.assign({}, d.tools, { [id]: value })
      }) : d
    );
    const setEnv = (key, value) => setDraft(
      (d) => d ? Object.assign({}, d, {
        env: Object.assign({}, d.env, { [key]: value })
      }) : d
    );
    const runtime = data && data.runtime || {};
    const adapt = data && data.adapt || {};
    const tools = data && data.tools && data.tools.items || [];
    const found = tools.filter((t) => t.path).length;
    const defaultToolkit = data && data.toolkitDir || "$DSH_HOME/redteam/toolkit";
    const defaultNuclei = data && data.nucleiTemplatesDir || defaultToolkit + "/nuclei-templates";
    return h2(
      "div",
      { className: "rt-main" },
      h2(
        "div",
        { className: "rt-toolbar" },
        h2("span", { style: { fontWeight: 600 } }, "\u0410\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F"),
        h2(
          "span",
          { className: "rt-tag" },
          runtime.effective === "windows" ? "Windows" : "Linux/Kali"
        ),
        adapt.kali ? h2("span", { className: "rt-tag rt-tag-live" }, "Kali") : null,
        h2(
          "span",
          {
            className: "rt-tag" + (adapt.ready ? " rt-tag-live" : " rt-tag-warn")
          },
          adapt.ready ? "\u0413\u043E\u0442\u043E\u0432\u043E \xB7 " + (adapt.reason || "") : "\u0422\u0440\u0435\u0431\u0443\u0435\u0442 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"
        ),
        h2(
          "span",
          { className: "rt-tag" + (found ? " rt-tag-live" : " rt-tag-warn") },
          "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 " + found + "/" + tools.length
        ),
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "\u0427\u0442\u0435\u043D\u0438\u0435\u2026" : "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
        ),
        h2(
          "button",
          {
            className: "rt-btn rt-btn-primary",
            disabled: busy || !draft,
            onClick: save
          },
          "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"
        )
      ),
      h2(
        "div",
        { className: "rt-pane", style: { minHeight: 0 } },
        err ? h2("div", { className: "rt-err" }, err) : null,
        msg ? h2(
          "div",
          { className: msg.err ? "rt-err" : "rt-foot" },
          msg.err || msg.ok
        ) : null,
        h2(
          "div",
          {
            className: "rt-card",
            style: { margin: "0 0 8px", fontSize: 12, lineHeight: 1.6 }
          },
          adapt.message || "\u0412\u0441\u0435 \u043F\u043E\u043B\u044F \u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B: \u043F\u0443\u0441\u0442\u043E \u2014 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u043F\u0443\u0442\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0438 \u0430\u0432\u0442\u043E\u043F\u043E\u0438\u0441\u043A. \u0417\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u043E\u0435 \u043F\u0435\u0440\u0435\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0434\u0435\u0444\u043E\u043B\u0442. \u041A\u043B\u044E\u0447\u0438 \u043D\u0443\u0436\u043D\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043A\u0430\u0440\u0442\u044B \u0430\u043A\u0442\u0438\u0432\u043E\u0432 \u0438 reverse shell."
        ),
        h2(
          "div",
          {
            className: "rt-card",
            style: { margin: "0 0 8px", fontSize: 12, lineHeight: 1.6 }
          },
          h2(
            "div",
            { style: { fontWeight: 600, marginBottom: 6 } },
            "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0441 \u043D\u0430\u0431\u043E\u0440\u043E\u043C \u2192 \u0430\u0432\u0442\u043E\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432"
          ),
          h2(
            "div",
            { style: { marginBottom: 8, opacity: 0.9 } },
            "\u0415\u0441\u043B\u0438 \u0432\u0441\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0432 \u043E\u0434\u043D\u043E\u0439 \u043F\u0430\u043F\u043A\u0435 (\u0432\u043A\u043B\u044E\u0447\u0430\u044F \u043F\u043E\u0434\u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0438), \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0443\u0442\u044C \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0410\u0432\u0442\u043E\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435\xBB: \u043F\u0443\u0442\u044C \u0437\u0430\u043F\u0438\u0448\u0435\u0442\u0441\u044F \u0432 toolkitDir, \u0430 nmap / nuclei / fscan \u0438 \u043F\u0440\u043E\u0447\u0438\u0435 \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u044F\u0442\u0441\u044F \u043D\u0438\u0436\u0435 \u043F\u043E \u0438\u043C\u0435\u043D\u0430\u043C \u0444\u0430\u0439\u043B\u043E\u0432."
          ),
          h2(
            "div",
            { style: { display: "flex", gap: 8, alignItems: "center" } },
            h2("input", {
              className: "rt-input",
              style: { flex: 1 },
              placeholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 D:\\pentest-tools \u0438\u043B\u0438 /opt/toolkit",
              value: folderPath,
              onChange: (e) => setFolderPath(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") assignFolder();
              }
            }),
            h2(
              "button",
              {
                className: "rt-btn rt-btn-primary",
                disabled: busy,
                onClick: assignFolder
              },
              busy ? "\u0421\u043A\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u2026" : "\u0410\u0432\u0442\u043E\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"
            )
          )
        ),
        data && data.hint ? h2(
          "div",
          {
            className: "rt-card",
            style: { margin: "0 0 8px", fontSize: 12, lineHeight: 1.6 }
          },
          data.hint
        ) : null,
        data && data.egress ? h2(
          "div",
          {
            className: "rt-card",
            style: { margin: "0 0 8px", fontSize: 12, lineHeight: 1.55 }
          },
          h2(
            "div",
            { style: { fontWeight: 600, marginBottom: 6 } },
            "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0432\u044B\u0445\u043E\u0434\u0430 \u0432 \u0441\u0435\u0442\u044C (\u043F\u043E \u043C\u043E\u0442\u0438\u0432\u0430\u043C egress \u0432 Z3r0, \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435)"
          ),
          h2(
            "div",
            { className: "rt-mono", style: { fontSize: 11 } },
            "HTTP_PROXY=" + (data.egress.http_proxy || "(\u043F\u0443\u0441\u0442\u043E)")
          ),
          h2(
            "div",
            { className: "rt-mono", style: { fontSize: 11 } },
            "HTTPS_PROXY=" + (data.egress.https_proxy || "(\u043F\u0443\u0441\u0442\u043E)")
          ),
          h2(
            "div",
            { className: "rt-mono", style: { fontSize: 11 } },
            "ALL_PROXY=" + (data.egress.all_proxy || "(\u043F\u0443\u0441\u0442\u043E)")
          ),
          h2(
            "div",
            { className: "rt-mono", style: { fontSize: 11 } },
            "NO_PROXY=" + (data.egress.no_proxy || "(\u043F\u0443\u0441\u0442\u043E)")
          ),
          h2(
            "div",
            { style: { marginTop: 6, opacity: 0.85 } },
            data.egress.note || ""
          )
        ) : null,
        !draft ? h2("div", { className: "rt-empty" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026") : h2(
          "div",
          null,
          h2(
            "div",
            { className: "rt-card" },
            h2("h4", null, "\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0438 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0438"),
            h2(
              "div",
              { style: { display: "grid", gap: 8 } },
              h2(
                "label",
                { style: { fontSize: 12 } },
                "\u0420\u0435\u0436\u0438\u043C \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B",
                h2(
                  "select",
                  {
                    className: "rt-input",
                    style: {
                      display: "block",
                      width: "100%",
                      marginTop: 4
                    },
                    value: draft.platform,
                    onChange: (e) => setDraft(
                      Object.assign({}, draft, {
                        platform: e.target.value
                      })
                    )
                  },
                  h2("option", { value: "auto" }, "auto (\u043F\u043E \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u043C\u0430\u0448\u0438\u043D\u0435, \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E)"),
                  h2("option", { value: "windows" }, "windows"),
                  h2("option", { value: "linux" }, "linux")
                )
              ),
              h2(
                "label",
                { style: { fontSize: 12 } },
                "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 toolkitDir (\u043F\u0443\u0441\u0442\u043E = \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E)",
                h2("input", {
                  className: "rt-input",
                  style: { display: "block", width: "100%", marginTop: 4 },
                  placeholder: "\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E: " + defaultToolkit,
                  value: draft.toolkitDir,
                  onChange: (e) => setDraft(
                    Object.assign({}, draft, {
                      toolkitDir: e.target.value
                    })
                  )
                })
              ),
              h2(
                "label",
                { style: { fontSize: 12 } },
                "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 nuclei (\u043F\u0443\u0441\u0442\u043E = \u0430\u0432\u0442\u043E: toolkit/nuclei-templates)",
                h2("input", {
                  className: "rt-input",
                  style: { display: "block", width: "100%", marginTop: 4 },
                  placeholder: "\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E: " + defaultNuclei,
                  value: draft.nucleiTemplatesDir,
                  onChange: (e) => setDraft(
                    Object.assign({}, draft, {
                      nucleiTemplatesDir: e.target.value
                    })
                  )
                })
              ),
              h2(
                "label",
                { style: { fontSize: 12 } },
                "\u041A\u0430\u0442\u0430\u043B\u043E\u0433\u0438 \u043F\u043E\u0438\u0441\u043A\u0430 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 binDirs (\u043F\u0443\u0441\u0442\u043E = \u0442\u043E\u043B\u044C\u043A\u043E toolkit + PATH; \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0432 \u0441\u0442\u0440\u043E\u043A\u0435)",
                h2("textarea", {
                  className: "rt-input",
                  rows: 4,
                  style: {
                    display: "block",
                    width: "100%",
                    marginTop: 4,
                    fontFamily: "var(--dsw-font-mono, monospace)"
                  },
                  placeholder: "\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E. \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: " + String.fromCharCode(10) + "D:\\tools" + String.fromCharCode(10) + "D:\\pentest-bin",
                  value: draft.binDirsText,
                  onChange: (e) => setDraft(
                    Object.assign({}, draft, {
                      binDirsText: e.target.value
                    })
                  )
                })
              )
            )
          ),
          h2(
            "div",
            { className: "rt-card" },
            h2("h4", null, "\u041A\u043B\u044E\u0447\u0438 \u0438 VPS (\u043F\u0443\u0441\u0442\u043E = \u043D\u0435 \u043F\u0435\u0440\u0435\u043A\u0440\u044B\u0432\u0430\u0442\u044C; \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0443 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430)"),
            h2(
              "div",
              { style: { display: "grid", gap: 8 } },
              ["FOFA_KEY", "REDTEAM_VPS_HOST", "REDTEAM_VPS_KEY"].map(
                (k) => h2(
                  "label",
                  { key: k, style: { fontSize: 12 } },
                  k + " (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
                  h2("input", {
                    className: "rt-input",
                    style: {
                      display: "block",
                      width: "100%",
                      marginTop: 4
                    },
                    type: k === "FOFA_KEY" ? "password" : "text",
                    placeholder: k === "REDTEAM_VPS_KEY" ? "\u041F\u0443\u0441\u0442\u043E; \u043F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u044B\u0439 \u043F\u0443\u0442\u044C \u043A \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u043C\u0443 \u043A\u043B\u044E\u0447\u0443" : k === "REDTEAM_VPS_HOST" ? "\u041F\u0443\u0441\u0442\u043E; \u043F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 user@host" : "\u041F\u0443\u0441\u0442\u043E; \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043F\u0440\u0438 \u0440\u0430\u0431\u043E\u0442\u0435 \u0441 \u043A\u0430\u0440\u0442\u043E\u0439 \u0430\u043A\u0442\u0438\u0432\u043E\u0432",
                    value: draft.env && draft.env[k] || "",
                    onChange: (e) => setEnv(k, e.target.value)
                  })
                )
              )
            )
          ),
          h2(
            "div",
            { className: "rt-card" },
            h2("h4", null, "\u0418\u0441\u043F\u043E\u043B\u043D\u044F\u0435\u043C\u044B\u0435 \u0444\u0430\u0439\u043B\u044B \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 (\u043F\u0443\u0441\u0442\u043E = \u0430\u0432\u0442\u043E\u043F\u043E\u0438\u0441\u043A)"),
            h2(
              "div",
              {
                style: {
                  fontSize: 11.5,
                  color: "var(--dsw-alias-label-secondary)",
                  marginBottom: 8
                }
              },
              "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0440\u0430\u0437\u0431\u043E\u0440\u0430: \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u044B\u0439 \u043F\u0443\u0442\u044C \u0438\u0437 \u044D\u0442\u043E\u0439 \u0442\u0430\u0431\u043B\u0438\u0446\u044B \u2192 toolkitDir \u2192 binDirs \u2192 PATH. \u041F\u0443\u0441\u0442\u043E\u0435 \u043F\u043E\u043B\u0435 \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E."
            ),
            tools.map(
              (t) => h2(
                "div",
                { key: t.id, style: { marginBottom: 8 } },
                h2(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 4
                    }
                  },
                  h2(
                    "span",
                    { style: { fontWeight: 600, minWidth: 88 } },
                    t.label || t.id
                  ),
                  t.path ? h2(
                    "span",
                    { className: "rt-tag rt-tag-live", title: t.path },
                    t.source + " \xB7 \u043D\u0430\u0439\u0434\u0435\u043D"
                  ) : h2(
                    "span",
                    { className: "rt-tag rt-tag-warn" },
                    "\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D (\u043C\u043E\u0436\u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C \u0434\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438)"
                  )
                ),
                h2("input", {
                  className: "rt-input",
                  style: { width: "100%" },
                  placeholder: "\u041F\u0443\u0441\u0442\u043E \u2014 \u043D\u0430\u0439\u0434\u0451\u043C \u0441\u0430\u043C\u0438: " + (t.names || []).slice(0, 3).join(" / "),
                  value: draft.tools && draft.tools[t.id] || "",
                  onChange: (e) => setTool(t.id, e.target.value)
                }),
                t.path ? h2(
                  "div",
                  {
                    className: "rt-mono",
                    style: {
                      fontSize: 10.5,
                      marginTop: 2,
                      opacity: 0.8
                    }
                  },
                  t.path
                ) : null
              )
            )
          ),
          h2(
            "div",
            { className: "rt-card" },
            h2("h4", null, "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435"),
            h2("textarea", {
              className: "rt-input",
              rows: 3,
              style: { width: "100%" },
              placeholder: "\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E. \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438\u0437 \u043F\u043E\u0440\u0442\u0430\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u043D\u0430\u0431\u043E\u0440\u0430",
              value: draft.notes,
              onChange: (e) => setDraft(
                Object.assign({}, draft, { notes: e.target.value })
              )
            })
          ),
          h2(
            "div",
            { className: "rt-foot" },
            h2(
              "span",
              null,
              "\u0424\u0430\u0439\u043B \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438: " + (data && data.config && data.config.path || "$DSH_HOME/redteam/config.json") + " | \u043F\u0443\u0441\u0442\u044B\u0435 \u043F\u043E\u043B\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E"
            )
          )
        )
      )
    );
  }
  function ScoreTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const [openId, setOpenId] = import_react2.default.useState(null);
    const [form, setForm] = import_react2.default.useState(null);
    const [msg, setMsg] = import_react2.default.useState(null);
    const load = () => {
      if (!eng) return;
      setBusy(true);
      api({ op: "scores", engagement: eng }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          setData(r);
        },
        (e) => {
          setBusy(false);
          setErr(String(e && e.message || e));
        }
      );
    };
    import_react2.default.useEffect(load, [eng, refreshKey]);
    const startEdit = (p) => setForm({
      id: p.id,
      name: p.name,
      category: p.category || "",
      points: p.points,
      description: p.description || "",
      enabled: p.enabled,
      builtin: p.builtin === true,
      src: p.src,
      cap: p.cap,
      rule: p.rule
    });
    const startNew = () => {
      setForm({
        name: "",
        category: "",
        points: 10,
        description: "",
        enabled: true,
        builtin: false
      });
      setMsg(null);
    };
    const setField = (k, v) => setForm((f) => Object.assign({}, f, { [k]: v }));
    const save = () => {
      if (!form || !form.name) {
        setMsg({ err: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C" });
        return;
      }
      setBusy(true);
      setMsg(null);
      api({ op: "saveScorePoint", engagement: eng, point: form }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F" });
            return;
          }
          if (r.overridden === false) {
            setMsg({
              err: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \xAB\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F/\u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E\xBB. \u0411\u0430\u043B\u043B\u044B \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u044B: \u044D\u0442\u043E \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043F\u0443\u043D\u043A\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0438\u0437 \xAB\u041F\u0440\u0430\u0432\u0438\u043B \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F\xBB, \u0431\u0430\u043B\u043B\u044B / \u043B\u0438\u043C\u0438\u0442 / \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u044B (\u043B\u0438\u043C\u0438\u0442 \u043E\u0434\u043D\u043E\u0433\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043F\u043E \u0432\u0441\u0435\u043C \u043F\u0443\u043D\u043A\u0442\u0430\u043C \u0433\u0440\u0443\u043F\u043F\u044B, \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0431\u0430\u043B\u043B\u043E\u0432 \u043F\u043E\u0437\u0432\u043E\u043B\u0438\u0442 \u043E\u0434\u043D\u043E\u043C\u0443 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044E \u0441\u044A\u0435\u0441\u0442\u044C \u043B\u0438\u043C\u0438\u0442 \u0432\u0441\u0435\u0439 \u0433\u0440\u0443\u043F\u043F\u044B). \u0414\u043B\u044F \u0441\u0432\u043E\u0438\u0445 \u0431\u0430\u043B\u043B\u043E\u0432 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \xAB+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0443\u043D\u043A\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F\xBB."
            });
          } else {
            setMsg({ ok: r.note || "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E" });
          }
          setForm(null);
          load();
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const remove = () => {
      if (!form || !form.id) {
        setForm(null);
        return;
      }
      setBusy(true);
      setMsg(null);
      api({ op: "deleteScorePoint", engagement: eng, id: form.id }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F" });
            return;
          }
          setMsg({ ok: "\u0423\u0434\u0430\u043B\u0435\u043D\u043E" });
          setForm(null);
          setOpenId(null);
          load();
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const summary = data && data.summary || {
      achievedPoints: 0,
      pointCount: 0,
      hitPointCount: 0,
      hitCount: 0,
      selfCreatedHits: 0,
      serviceCappedHits: 0
    };
    const items = data && data.items || [];
    const groups = data && data.ruleGroups && data.ruleGroups.length ? data.ruleGroups : [
      {
        key: "all",
        name: "",
        capSum: 0,
        points: 0,
        counted: 0,
        tiers: items
      }
    ];
    const rows = [];
    for (const g of groups) {
      if (g.name) {
        rows.push(
          h2(
            "div",
            { key: "g-" + g.key, className: "rt-score-group" },
            h2("span", null, g.name),
            h2(
              "span",
              { className: "rt-sg-sub" },
              g.tiers.length + " \u0448\u0442." + (g.capSum > 0 ? " \xB7 \u0441\u0443\u043C\u043C\u0430 \u043B\u0438\u043C\u0438\u0442\u043E\u0432 \u043F\u043E \u043F\u0443\u043D\u043A\u0442\u0430\u043C " + g.capSum + " \u0431\u0430\u043B\u043B\u043E\u0432 (\u043F\u0443\u043D\u043A\u0442\u044B \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u044B, \u043C\u0435\u0436\u0434\u0443 \u043D\u0438\u043C\u0438 \u043D\u0435 \u0441\u0443\u043C\u043C\u0438\u0440\u0443\u0435\u0442\u0441\u044F)" : "")
            ),
            h2("div", { className: "rt-spacer" }),
            g.points > 0 ? h2(
              "span",
              { className: "rt-tag rt-tag-active" },
              "+" + g.points + " \u0431\u0430\u043B\u043B\u043E\u0432"
            ) : null
          )
        );
      }
      for (const p of g.tiers) {
        const achieved = p.hits.length > 0;
        const open = openId === p.id;
        rows.push(
          h2(
            "div",
            {
              key: "sp" + p.id,
              className: "rt-score-row",
              role: "button",
              tabIndex: 0,
              onClick: () => setOpenId(open ? null : p.id),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenId(open ? null : p.id);
                }
              }
            },
            h2("span", { className: "rt-sec-caret" }, open ? "\u25BE" : "\u25B8"),
            h2(
              "span",
              null,
              h2(
                "span",
                {
                  className: achieved ? "rt-pri rt-pri-high" : "rt-pri rt-pri-low",
                  style: achieved ? {} : {
                    background: "var(--dsw-alias-bg-layer-2)",
                    color: "var(--dsw-alias-label-secondary)"
                  }
                },
                p.points + " \u0431\u0430\u043B\u043B\u043E\u0432"
              )
            ),
            h2(
              "span",
              { title: p.description || "" },
              p.name,
              p.tier ? h2("span", { className: "rt-scope" }, " " + p.tier) : null
            ),
            /* Попадания и лимит: сколько раз учтён этот пункт и насколько использован лимит (в G3 лимиты по пунктам независимы, при достижении потолка начисления прекращаются) */
            h2(
              "span",
              {
                title: p.capped > 0 ? "\u0423\u0447\u0442\u0435\u043D\u043E " + p.counted + " \u0440\u0430\u0437, \u0435\u0449\u0451 " + p.capped + " \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u043D\u0435 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u044B \u0438\u0437-\u0437\u0430 \xAB" + (p.scope_label || "\u043F\u0440\u0430\u0432\u0438\u043B\u043E \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F") + "\xBB \u0438\u043B\u0438 \u0438\u0437-\u0437\u0430 \u0434\u043E\u0441\u0442\u0438\u0433\u043D\u0443\u0442\u043E\u0433\u043E \u043B\u0438\u043C\u0438\u0442\u0430" : p.scope_label || ""
              },
              h2(
                "span",
                { className: "rt-sec-count" },
                p.hits.length > 0 ? p.counted + " \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439" : "\u041D\u0435\u0442 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439"
              ),
              p.cap > 0 ? h2(
                "span",
                { className: "rt-scope" },
                " \u043B\u0438\u043C\u0438\u0442 " + (p.cap_used === null ? 0 : p.cap_used) + "/" + p.cap
              ) : null
            ),
            h2(
              "span",
              { style: { textAlign: "right" } },
              p.earned > 0 ? h2(
                "span",
                { className: "rt-tag rt-tag-active" },
                "+" + p.earned + " \u0431\u0430\u043B\u043B\u043E\u0432"
              ) : h2(
                "span",
                { style: { color: "var(--dsw-alias-label-secondary)" } },
                "\u2014"
              )
            )
          )
        );
        if (!open) continue;
        const hitNodes = p.hits.map(
          (hh, hi) => h2(
            "div",
            {
              key: "h" + hh.id,
              className: "rt-hit-row" + (hh.self_created ? " self-created" : "") + (hh.capped ? " service-capped" : "")
            },
            h2("span", { className: "rt-hit-idx" }, String(hi + 1)),
            h2(
              "span",
              {
                className: "rt-hit-asset",
                title: hh.target || hh.asset_ip || ""
              },
              hh.asset_ip || hh.target || "\u0410\u043A\u0442\u0438\u0432 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
            ),
            hh.self_created ? h2(
              "span",
              {
                className: "rt-tag rt-tag-warn",
                title: "\u0421\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435/\u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0435 \u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u043D\u0435 \u0434\u0430\u044E\u0442 \u0431\u0430\u043B\u043B\u043E\u0432 \u0437\u0430 \u0434\u043E\u0441\u0442\u0443\u043F, \u044D\u0442\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u043F\u0438\u0441\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430"
              },
              "\u0421\u0432\u043E\u0451 \xB7 \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432"
            ) : null,
            hh.capped ? h2(
              "span",
              {
                className: "rt-tag rt-tag-warn",
                title: hh.capped_reason || "\u041F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0430\u043A\u0442\u0438\u0432\u0443 \u0438 \u043F\u043E\u0440\u0442\u0443 \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u043F\u0438\u0441\u044C \u0441 \u043D\u0430\u0438\u0431\u043E\u043B\u044C\u0448\u0438\u043C\u0438 \u0431\u0430\u043B\u043B\u0430\u043C\u0438, \u044D\u0442\u0430 \u043D\u0435 \u043D\u0430\u0447\u0438\u0441\u043B\u044F\u0435\u0442\u0441\u044F"
              },
              "\u0421\u0435\u0440\u0432\u0438\u0441 \u0432\u0437\u044F\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \xB7 \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432" + (hh.service ? "(" + hh.service + ")" : "")
            ) : null,
            hh.shot_count ? h2(
              "span",
              {
                className: "rt-tag",
                title: "\u0423 \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044F \u0435\u0441\u0442\u044C \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432 (\u0440\u0430\u0441\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0443\u043D\u043A\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0442\u0438\u043F\u043E\u0432\u043E\u0439)"
              },
              "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u043E\u0432 " + hh.shot_count
            ) : null,
            h2("span", { className: "rt-hit-time" }, fmt(hh.recorded_at)),
            h2(
              "button",
              {
                className: "rt-btn",
                style: { padding: "0 5px", fontSize: 10.5 },
                title: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u044D\u0442\u0443 \u0437\u0430\u043F\u0438\u0441\u044C",
                onClick: (e) => {
                  e.stopPropagation();
                  copyText(
                    (hh.asset_ip || hh.target || "") + "  " + (hh.evidence || "")
                  );
                }
              },
              "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
            ),
            hh.evidence ? h2(
              "span",
              { className: "rt-hit-txt", title: hh.evidence },
              String(hh.evidence).replace(/\n+/g, " ")
            ) : h2(
              "span",
              { className: "rt-hit-txt none" },
              "\u041B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C / \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B"
            )
          )
        );
        rows.push(
          h2(
            "div",
            {
              key: "spd" + p.id,
              className: "rt-score-row",
              style: { cursor: "default", gridTemplateColumns: "1fr" }
            },
            h2(
              "div",
              { className: "rt-score-detail" },
              p.description ? h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u0423\u0441\u043B\u043E\u0432\u0438\u0435 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F"),
                h2("span", null, p.description)
              ) : null,
              h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u0421\u0442\u0430\u0442\u0443\u0441"),
                h2(
                  "span",
                  null,
                  (p.enabled ? "\u0412\u043A\u043B\u044E\u0447\u0451\u043D" : "\u041E\u0442\u043A\u043B\u044E\u0447\u0451\u043D") + " \xB7 " + p.points + " \u0431\u0430\u043B\u043B\u043E\u0432/\u0440\u0430\u0437 \xB7 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439 " + p.hits.length + " = " + p.earned + " \u0431\u0430\u043B\u043B\u043E\u0432" + (p.self_created ? " (\u0435\u0449\u0451 " + p.self_created + " \u0441\u0432\u043E\u0438\u0445 \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432)" : "") + (p.capped ? " (\u0435\u0449\u0451 " + p.capped + " \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0445 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439 \u043F\u043E \u0442\u043E\u043C\u0443 \u0436\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u0443 \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432)" : "")
                )
              ),
              p.capped ? h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u041B\u0438\u043C\u0438\u0442 \u0441\u0435\u0440\u0432\u0438\u0441\u0430"),
                h2(
                  "span",
                  null,
                  p.service_summary + "; \u043F\u0440\u0430\u0432\u0430 \u0443\u0447\u0451\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0438 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0411\u0414 \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0430\u043A\u0442\u0438\u0432\u0443 \u0438 \u043F\u043E\u0440\u0442\u0443 \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F \u043E\u0434\u0438\u043D \u0440\u0430\u0437: \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0441\u0430\u043C\u0443\u044E \u043F\u0440\u0438\u0432\u0438\u043B\u0435\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0443\u044E \u0443\u0447\u0451\u0442\u043D\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C \u2014 \u0441\u0435\u0440\u0432\u0438\u0441 \u0432\u0437\u044F\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E"
                )
              ) : null,
              p.hits.length ? h2(
                "div",
                null,
                h2(ShotStrip, {
                  eng,
                  shots: p.shots,
                  total: p.shot_total,
                  title: "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u0434\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432 \xB7 " + (p.shot_total || (p.shots || []).length) + " \u0448\u0442."
                }),
                h2(
                  "div",
                  {
                    className: "rt-section",
                    style: { padding: "6px 0 0" }
                  },
                  "\u0417\u0430\u043F\u0438\u0441\u0438 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439 \xB7 " + p.hits.length + " (\u0442\u043E\u043B\u044C\u043A\u043E \u0430\u043A\u0442\u0438\u0432 \u0438 \u043B\u043E\u0433\u0438\u043D \u0441 \u043F\u0430\u0440\u043E\u043B\u0435\u043C, \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0435 \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u2014 \u0432 \u043E\u0442\u0447\u0451\u0442\u0435)"
                ),
                h2("div", { className: "rt-hits" }, hitNodes)
              ) : h2(
                "div",
                { className: "rt-kv" },
                h2("b", null, "\u0417\u0430\u043F\u0438\u0441\u0438 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439"),
                h2(
                  "span",
                  { style: { color: "var(--dsw-alias-label-secondary)" } },
                  "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u2014\u2014 \u043F\u043E\u043B\u0443\u0447\u0438\u0432 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442, \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0433\u043E \u0447\u0435\u0440\u0435\u0437 redteam_score_hit: \u0430\u043A\u0442\u0438\u0432 \u0446\u0435\u043B\u0438 + \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0435 \u043B\u043E\u0433\u0438\u043D/\u043F\u0430\u0440\u043E\u043B\u044C \u0438\u043B\u0438 \u043F\u0440\u0430\u0432\u0430"
                )
              ),
              h2(
                "div",
                { className: "rt-actions" },
                h2(
                  "button",
                  {
                    className: "rt-btn",
                    onClick: (e) => {
                      e.stopPropagation();
                      startEdit(p);
                    }
                  },
                  "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"
                )
              )
            )
          )
        );
      }
    }
    return h2(
      "div",
      { className: "rt-main" },
      h2(
        "div",
        { className: "rt-toolbar" },
        h2("span", { style: { fontWeight: 600 } }, "\u0426\u0435\u043B\u0438 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F"),
        /* Показываем только уже набранные баллы, без целевого значения и без полосы прогресса */
        h2(
          "span",
          {
            style: {
              fontSize: 13,
              color: "var(--dsw-alias-label-secondary)",
              marginLeft: 4
            }
          },
          "\u0412\u0441\u0435\u0433\u043E \u0431\u0430\u043B\u043B\u043E\u0432"
        ),
        h2("span", { className: "rt-total" }, String(summary.achievedPoints)),
        h2(
          "span",
          {
            style: { fontSize: 13, color: "var(--dsw-alias-label-secondary)" }
          },
          "\u0431\u0430\u043B\u043B\u043E\u0432"
        ),
        h2("span", { className: "rt-tag" }, summary.pointCount + " \u043F\u0443\u043D\u043A\u0442\u043E\u0432 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F"),
        h2(
          "span",
          { className: "rt-tag" },
          "\u041F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0439 " + summary.countedHits
        ),
        summary.selfCreatedHits ? h2(
          "span",
          {
            className: "rt-tag rt-tag-warn",
            title: "\u0421\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435/\u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0435 \u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u043D\u0435 \u0434\u0430\u044E\u0442 \u0431\u0430\u043B\u043B\u043E\u0432 \u0437\u0430 \u0434\u043E\u0441\u0442\u0443\u043F, \u044D\u0442\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u043F\u0438\u0441\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 (\u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432, \u043D\u0435 \u0440\u0430\u0441\u0445\u043E\u0434\u0443\u0435\u0442 \u043B\u0438\u043C\u0438\u0442, \u043D\u0435 \u0438\u0434\u0451\u0442 \u0432 \u043E\u0442\u0447\u0451\u0442)"
          },
          "\u0421\u0432\u043E\u0438 \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432: " + summary.selfCreatedHits
        ) : null,
        summary.serviceCappedHits ? h2(
          "span",
          {
            className: "rt-tag rt-tag-warn",
            title: "\u041F\u0440\u0430\u0432\u0430 \u0443\u0447\u0451\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0438 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0411\u0414 \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0430\u043A\u0442\u0438\u0432\u0443 \u0438 \u043F\u043E\u0440\u0442\u0443 \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F \u043E\u0434\u0438\u043D \u0440\u0430\u0437: \u0441\u0435\u0440\u0432\u0438\u0441 \u0432\u0437\u044F\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E, \u044D\u0442\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044F \u0431\u0430\u043B\u043B\u043E\u0432 \u043D\u0435 \u0434\u0430\u044E\u0442 (\u0442\u043E\u043B\u044C\u043A\u043E \u0444\u0438\u043A\u0441\u0430\u0446\u0438\u044F)"
          },
          "\u0421\u0435\u0440\u0432\u0438\u0441 \u0432\u0437\u044F\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E, \u0431\u0435\u0437 \u0431\u0430\u043B\u043B\u043E\u0432: " + summary.serviceCappedHits
        ) : null,
        h2("div", { className: "rt-spacer" }),
        h2("button", { className: "rt-btn", onClick: startNew }, "+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0443\u043D\u043A\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F"),
        h2(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435\u2026" : "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
        )
      ),
      msg ? h2(
        "div",
        { className: msg.err ? "rt-err" : "rt-foot" },
        msg.err || msg.ok
      ) : null,
      err ? h2("div", { className: "rt-err" }, err) : null,
      form ? h2(
        "div",
        {
          className: "rt-pane",
          style: {
            flex: "none",
            borderBottom: "1px solid var(--dsw-alias-border-l1)"
          }
        },
        /* Встроенный пункт начисления (builtin): баллы / название / категория зафиксированы «Правилами начисления», поля задизейблены.
         Менять можно только «используется / отключено». Так в интерфейсе больше не будет путаницы «изменил, пишет «сохранено», после обновления вернулось». */
        form.builtin ? h2(
          "div",
          { className: "rt-hint", style: { marginBottom: 8 } },
          h2(
            "b",
            null,
            "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043F\u0443\u043D\u043A\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F (\u0438\u0437 \xAB\u041F\u0440\u0430\u0432\u0438\u043B \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0437\u0430 \u043F\u0440\u043E\u0440\u044B\u0432 \u0438 \u0432\u0442\u043E\u0440\u0436\u0435\u043D\u0438\u0435 (\u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0451\u043D\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F)\xBB)"
          ),
          h2(
            "div",
            { style: { marginTop: 3 } },
            "\u0411\u0430\u043B\u043B\u044B, \u043B\u0438\u043C\u0438\u0442, \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 \u2014\u2014 \u043B\u0438\u043C\u0438\u0442 \u043E\u0434\u043D\u043E\u0433\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043F\u043E \u0432\u0441\u0435\u043C \u043F\u0443\u043D\u043A\u0442\u0430\u043C \u0433\u0440\u0443\u043F\u043F\u044B, \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0431\u0430\u043B\u043B\u043E\u0432 \u043F\u043E\u0437\u0432\u043E\u043B\u0438\u0442 \u043E\u0434\u043D\u043E\u043C\u0443 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044E \u0441\u044A\u0435\u0441\u0442\u044C \u043B\u0438\u043C\u0438\u0442 \u0432\u0441\u0435\u0439 \u0433\u0440\u0443\u043F\u043F\u044B. \u0417\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u043C\u0435\u043D\u044F\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \xAB\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F / \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E\xBB; \u0434\u043B\u044F \u0441\u0432\u043E\u0438\u0445 \u0431\u0430\u043B\u043B\u043E\u0432 \u0432\u0435\u0440\u043D\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u044D\u043A\u0440\u0430\u043D \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0443\u043D\u043A\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F\xBB."
          ),
          form.src !== null && form.src !== void 0 ? h2(
            "div",
            {
              style: {
                marginTop: 3,
                color: "var(--dsw-alias-label-secondary)"
              }
            },
            "\u041D\u043E\u043C\u0435\u0440 \u043F\u0443\u043D\u043A\u0442\u0430 \u0432 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u0445 " + form.src + (form.rule ? " \xB7 \u0433\u0440\u0443\u043F\u043F\u0430 \u043B\u0438\u043C\u0438\u0442\u0430 rule=" + form.rule : "") + (form.cap > 0 ? " \xB7 \u043B\u0438\u043C\u0438\u0442 " + form.cap + " \u0431\u0430\u043B\u043B\u043E\u0432" : " \xB7 \u0431\u0435\u0437 \u043B\u0438\u043C\u0438\u0442\u0430")
          ) : null
        ) : null,
        h2(
          "div",
          { className: "rt-score-form" },
          h2("input", {
            className: "rt-input",
            placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 (\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
            value: form.name,
            readOnly: form.builtin === true,
            title: form.builtin ? "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u0443\u043D\u043A\u0442\u0430 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438" : "",
            onChange: (e) => setField("name", e.target.value)
          }),
          h2("input", {
            className: "rt-input",
            placeholder: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 \xAB\u043F\u0440\u0430\u0432\u0430 \u0443\u0447\u0451\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438\xBB",
            value: form.category,
            readOnly: form.builtin === true,
            title: form.builtin ? "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u0443\u043D\u043A\u0442\u0430 \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 (\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442, \u0432 \u043A\u0430\u043A\u0443\u044E \u0433\u0440\u0443\u043F\u043F\u0443 \u043F\u0430\u043D\u0435\u043B\u0438 \u043E\u043D \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442)" : "",
            onChange: (e) => setField("category", e.target.value)
          }),
          h2("input", {
            className: "rt-input",
            type: "number",
            placeholder: "\u0411\u0430\u043B\u043B\u044B \u0437\u0430 \u0440\u0430\u0437",
            readOnly: form.builtin === true,
            title: form.builtin ? "\u0411\u0430\u043B\u043B\u044B \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u0443\u043D\u043A\u0442\u0430 \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u044B \xAB\u041F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F\xBB \u0438 \u0437\u0434\u0435\u0441\u044C \u043D\u0435 \u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F" : ": \u0431\u0430\u043B\u043B\u044B \u0437\u0430 \u043E\u0434\u043D\u043E \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0435 \u044D\u0442\u043E\u0433\u043E \u0442\u0438\u043F\u0430; \u043A\u0430\u0436\u0434\u043E\u0435 \u043F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u0435 \u043F\u0440\u0438\u0431\u0430\u0432\u043B\u044F\u0435\u0442 \u0438\u0445 (\u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 \u043B\u0438\u043C\u0438\u0442\u0430 \u043F\u0440\u0430\u0432\u0438\u043B\u0430)",
            value: form.points,
            onChange: (e) => setField("points", Number(e.target.value))
          }),
          h2(
            "select",
            {
              className: "rt-input",
              value: form.enabled ? "1" : "0",
              onChange: (e) => setField("enabled", e.target.value === "1")
            },
            h2("option", { value: "1" }, "\u0412\u043A\u043B\u044E\u0447\u0451\u043D"),
            h2("option", { value: "0" }, "\u041E\u0442\u043A\u043B\u044E\u0447\u0451\u043D")
          )
        ),
        h2("input", {
          className: "rt-input",
          style: {
            width: "100%",
            marginBottom: 6,
            boxSizing: "border-box"
          },
          placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F",
          value: form.description,
          readOnly: form.builtin === true,
          title: form.builtin ? "\u0422\u0435\u043A\u0441\u0442 \u043F\u0443\u043D\u043A\u0442\u0430 \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u0433\u043E \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438" : "",
          onChange: (e) => setField("description", e.target.value)
        }),
        h2(
          "div",
          { className: "rt-actions" },
          h2(
            "button",
            {
              className: "rt-btn rt-btn-primary",
              disabled: busy,
              onClick: save
            },
            "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"
          ),
          form.id ? form.builtin ? h2(
            "button",
            {
              className: "rt-btn",
              disabled: true,
              title: "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043F\u0443\u043D\u043A\u0442 \u043D\u0435\u043B\u044C\u0437\u044F \u0443\u0434\u0430\u043B\u0438\u0442\u044C: \u043F\u0430\u043D\u0435\u043B\u044C \u043F\u043E\u0442\u0435\u0440\u044F\u0435\u0442 \u043F\u0440\u0430\u0432\u0438\u043B\u043E, \u0430 \u043E\u0442\u0447\u0451\u0442 \u2014 \u043A\u043B\u0430\u0441\u0441 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 (\u043F\u0440\u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u043E\u043D \u0432\u0441\u0451 \u0440\u0430\u0432\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F). \u0427\u0442\u043E\u0431\u044B \u043E\u043D \u043D\u0435 \u0443\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u043B \u0432 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0438, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \xAB\u041E\u0442\u043A\u043B\u044E\u0447\u0451\u043D\xBB."
            },
            "\u0423\u0434\u0430\u043B\u0438\u0442\u044C (\u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u044F\u044E\u0442\u0441\u044F)"
          ) : h2(
            "button",
            { className: "rt-btn", disabled: busy, onClick: remove },
            "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"
          ) : null,
          h2(
            "button",
            { className: "rt-btn", onClick: () => setForm(null) },
            "\u041E\u0442\u043C\u0435\u043D\u0430"
          )
        )
      ) : null,
      h2(
        "div",
        { className: "rt-table" },
        h2(
          "div",
          { className: "rt-score-row head" },
          h2("span", null, ""),
          h2("span", null, "\u0411\u0430\u043B\u043B\u044B"),
          h2("span", null, "\u041F\u0443\u043D\u043A\u0442\u044B \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F (\u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E \u0431\u0430\u043B\u043B\u043E\u0432)"),
          h2("span", null, "\u041F\u043E\u043F\u0430\u0434\u0430\u043D\u0438\u044F / \u043B\u0438\u043C\u0438\u0442"),
          h2("span", { style: { textAlign: "right" } }, "\u041D\u0430\u0431\u0440\u0430\u043D\u043E")
        ),
        rows,
        !items.length ? h2(
          "div",
          { className: "rt-empty" },
          "\u041F\u0443\u043D\u043A\u0442\u043E\u0432 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u043F\u043E\u043A\u0430 \u043D\u0435\u0442, \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0443\u043D\u043A\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F\xBB \u0441\u043F\u0440\u0430\u0432\u0430 \u0441\u0432\u0435\u0440\u0445\u0443"
        ) : null
      )
    );
  }
  const COLLAPSE_KEY = "rt-collapse:";
  const collapseLoad = (prefix) => {
    try {
      const raw = window.localStorage.getItem(COLLAPSE_KEY + prefix);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
      return {};
    }
  };
  const collapseSave = (prefix, value) => {
    try {
      window.localStorage.setItem(COLLAPSE_KEY + prefix, JSON.stringify(value));
    } catch (e) {
    }
  };
  function useCollapse(prefix) {
    const [state, setState] = import_react2.default.useState(() => collapseLoad(prefix));
    import_react2.default.useEffect(() => {
      setState(collapseLoad(prefix));
    }, [prefix]);
    const write = (next) => {
      collapseSave(prefix, next);
      setState(next);
    };
    const isOpen = (key, defaultOpen) => {
      const v = state[key];
      return v === void 0 ? defaultOpen !== false : v === true;
    };
    const toggle = (key, defaultOpen) => (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      write(Object.assign({}, state, { [key]: !isOpen(key, defaultOpen) }));
    };
    const setAll = (keys, open) => {
      const next = Object.assign({}, state);
      for (const k of keys) next[k] = open;
      write(next);
    };
    return { isOpen, toggle, setAll };
  }
  function Section(props) {
    const always = props.always === true;
    const open = always || props.open === true;
    const head = h2(
      "div",
      {
        className: "rt-sec t-" + (props.tone || "target") + (always ? " flat" : ""),
        role: always ? void 0 : "button",
        tabIndex: always ? void 0 : 0,
        "aria-expanded": always ? void 0 : open ? "true" : "false",
        onClick: always ? void 0 : props.onToggle,
        onKeyDown: always ? void 0 : (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (props.onToggle) props.onToggle(e);
          }
        }
      },
      h2("span", { className: "rt-sec-caret" }, always ? "\u258D" : open ? "\u25BE" : "\u25B8"),
      props.title ? h2("span", { className: "rt-sec-title" }, props.title) : null,
      props.count !== void 0 && props.count !== null ? h2("span", { className: "rt-sec-count" }, String(props.count)) : null,
      props.sub ? h2("span", { className: "rt-sec-sub" }, props.sub) : null,
      props.right ? h2("span", { className: "rt-sec-right" }, props.right) : null
    );
    return h2(
      "div",
      { className: "rt-sec-wrap" },
      head,
      open && props.children ? h2("div", { className: "rt-sec-body" }, props.children) : null
    );
  }
  function Clip(props) {
    const [open, setOpen] = import_react2.default.useState(false);
    const text = String(
      props.text === void 0 || props.text === null ? "" : props.text
    );
    if (text.trim() === "") return null;
    return h2(
      "div",
      { className: "rt-clip" + (open ? " open" : "") },
      h2(
        "div",
        { className: "rt-clip-head" },
        props.label ? h2("span", { className: "rt-clip-label" }, props.label) : null,
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          {
            className: "rt-btn",
            style: { padding: "0 6px", fontSize: 11 },
            onClick: (e) => {
              e.stopPropagation();
              copyText(text);
            }
          },
          "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
        ),
        h2(
          "button",
          {
            className: "rt-btn",
            style: { padding: "0 6px", fontSize: 11 },
            onClick: (e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }
          },
          open ? "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C" : "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C"
        )
      ),
      h2("div", { className: "rt-clip-body" }, text)
    );
  }
  const TEST_STATUS_LABEL = {
    untested: "\u041D\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0441\u044F",
    testing: "\u0422\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F",
    tested: "\u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D",
    blocked: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D",
    abandoned: "\u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D",
    no_surface: "\u041D\u0435\u0442 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0430\u0442\u0430\u043A\u0438"
  };
  function TestingTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [at, setAt] = import_react2.default.useState(null);
    const [auto, setAuto] = import_react2.default.useState(true);
    const collapse = useCollapse("testing:" + eng);
    const inflight = import_react2.default.useRef(false);
    const seq = import_react2.default.useRef(0);
    const load = () => {
      if (!eng || inflight.current) return;
      inflight.current = true;
      const my = ++seq.current;
      api({ op: "activeTests", engagement: eng, limit: 20 }).then(
        (r) => {
          if (my !== seq.current) return;
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          setData(r);
          setAt(/* @__PURE__ */ new Date());
        },
        (e) => {
          if (my === seq.current) setErr(String(e && e.message || e));
        }
      ).finally(() => {
        if (my === seq.current) inflight.current = false;
      });
    };
    import_react2.default.useEffect(() => {
      seq.current += 1;
      load();
    }, [eng, refreshKey]);
    import_react2.default.useEffect(() => {
      if (!eng || !auto) return void 0;
      const timer = setInterval(load, 5e3);
      return () => clearInterval(timer);
    }, [eng, auto, refreshKey]);
    const testing = data && data.testing || [];
    const recent = data && data.recent || [];
    const queue = data && data.queue || [];
    const stats = data && data.stats || {};
    const card = (a, past) => {
      const chips = [];
      chips.push(
        h2(
          "span",
          {
            key: "sc",
            className: "rt-scope rt-scope-" + (a.scope === "internal" ? "internal" : "external")
          },
          a.scope === "internal" ? "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u0441\u0435\u0442\u044C" : "\u0412\u043D\u0435\u0448\u043D\u044F\u044F \u0441\u0435\u0442\u044C"
        )
      );
      if (a.segment_cidr)
        chips.push(
          h2("span", { key: "seg", className: "rt-tag" }, a.segment_cidr)
        );
      if (a.open_ports)
        chips.push(
          h2(
            "span",
            { key: "p", className: "rt-tag rt-tag-active" },
            "\u041E\u0442\u043A\u0440\u044B\u0442\u043E \u043F\u043E\u0440\u0442\u043E\u0432: " + a.open_ports
          )
        );
      if (a.vulns)
        chips.push(
          h2(
            "span",
            { key: "v", className: "rt-tag rt-tag-live" },
            "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u044B\u0445 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439 " + a.vulns
          )
        );
      if (a.webshells)
        chips.push(
          h2(
            "span",
            { key: "w", className: "rt-tag rt-tag-passive" },
            "WebShell " + a.webshells
          )
        );
      if (a.tunnels)
        chips.push(
          h2(
            "span",
            { key: "t", className: "rt-tag rt-tag-passive" },
            "\u0422\u0443\u043D\u043D\u0435\u043B\u0435\u0439 " + a.tunnels
          )
        );
      if (a.priority)
        chips.push(
          h2("span", { key: "pr", className: "rt-tag" }, "\u041F\u0440\u043E\u0441\u0442\u043E\u0442\u0430 " + a.priority)
        );
      if (a.blocked_count)
        chips.push(
          h2(
            "span",
            {
              key: "b",
              className: "rt-tag",
              style: { color: "#ef4444", borderColor: "#ef444455" }
            },
            "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D " + a.blocked_count + " \u0440\u0430\u0437"
          )
        );
      const noteLines = a.test_notes ? String(a.test_notes).split("\n").slice(-3).map((l) => l.length > 240 ? l.slice(0, 240) + " \u2026" : l) : [];
      return h2(
        "div",
        { key: "at" + a.id, className: "rt-atest" + (past ? " past" : "") },
        h2(
          "div",
          { className: "rt-atest-head" },
          past ? null : h2("span", { className: "rt-live-dot" }),
          h2("span", { className: "rt-atest-ip" }, a.ip),
          h2(
            "span",
            {
              className: "rt-tag " + (a.test_status === "testing" ? "rt-tag-live" : "")
            },
            TEST_STATUS_LABEL[a.test_status] || a.test_status
          ),
          h2("div", { className: "rt-spacer" }),
          h2(
            "span",
            {
              style: {
                fontSize: 11,
                color: "var(--dsw-alias-label-secondary)"
              }
            },
            fmt(a.test_updated_at) + (a.test_updated_by ? " \xB7 " + a.test_updated_by : "")
          )
        ),
        chips.length ? h2("div", null, chips) : null,
        a.test_surface ? h2(
          "div",
          { className: "rt-atest-meta" },
          "\u041F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u044C \u0442\u0435\u0441\u0442\u0430: " + a.test_surface
        ) : null,
        a.potential ? h2("div", { className: "rt-atest-meta" }, "\u041E\u0436\u0438\u0434\u0430\u0435\u043C\u044B\u0435 \u0431\u0430\u043B\u043B\u044B: " + a.potential) : null,
        noteLines.length ? h2(Clip, { label: "\u0417\u0430\u043F\u0438\u0441\u0438 \u0442\u0435\u0441\u0442\u043E\u0432", text: noteLines.join("\n") }) : null
      );
    };
    const concl = (label, value, tone) => h2(
      "span",
      { key: label, className: "rt-concl-i", style: { cursor: "default" } },
      h2("b", null, String(value || 0)),
      h2("span", null, label)
    );
    const conclusion = h2(
      "div",
      { className: "rt-concl" },
      concl("\u0422\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F", stats.testing, "live"),
      concl("\u041A \u0442\u0435\u0441\u0442\u0443", stats.untested, ""),
      concl("\u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E", stats.tested, ""),
      concl("\u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D\u043E", (stats.abandoned || 0) + (stats.blocked || 0), ""),
      concl("\u0411\u0435\u0437 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0430\u0442\u0430\u043A\u0438", stats.no_surface, ""),
      h2("div", { className: "rt-spacer" }),
      at ? h2(
        "span",
        {
          style: {
            fontSize: 11,
            color: "var(--dsw-alias-label-secondary)"
          }
        },
        "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E " + at.toLocaleTimeString("zh-CN", { hour12: false })
      ) : null,
      h2(
        "button",
        {
          className: "rt-btn",
          style: { padding: "0 7px", fontSize: 11 },
          title: "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043D\u0435\u0434\u0430\u0432\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0435 \u0438 \u043E\u0447\u0435\u0440\u0435\u0434\u044C \u043D\u0430 \u0442\u0435\u0441\u0442",
          onClick: () => collapse.setAll(
            ["testing:" + eng, "recent:" + eng, "queue:" + eng],
            true
          )
        },
        "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435"
      ),
      h2(
        "button",
        {
          className: "rt-btn",
          style: { padding: "0 7px", fontSize: 11 },
          title: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u043E, \u0447\u0442\u043E \u0432 \u0440\u0430\u0431\u043E\u0442\u0435",
          onClick: () => collapse.setAll(
            ["testing:" + eng, "recent:" + eng, "queue:" + eng],
            false
          )
        },
        "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435"
      ),
      h2(
        "button",
        {
          className: "rt-btn" + (auto ? " rt-btn-primary" : ""),
          style: { padding: "0 7px", fontSize: 11 },
          title: "\u0410\u0432\u0442\u043E\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0436\u0434\u044B\u0435 5 \u0441\u0435\u043A\u0443\u043D\u0434",
          onClick: () => setAuto((x) => !x)
        },
        auto ? "\u0420\u0435\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \xB7 5s" : "\u041F\u0430\u0443\u0437\u0430"
      ),
      h2(
        "button",
        {
          className: "rt-btn",
          style: { padding: "0 7px", fontSize: 11 },
          onClick: load
        },
        "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
      )
    );
    const body = [];
    body.push(
      h2(
        Section,
        {
          key: "testing",
          tone: "test",
          title: "\u0421\u0435\u0439\u0447\u0430\u0441 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435",
          count: testing.length + " \u0445\u043E\u0441\u0442\u043E\u0432",
          sub: testing.length ? "\u044D\u0442\u0438 \u0430\u043A\u0442\u0438\u0432\u044B \u0430\u0433\u0435\u043D\u0442 \u0431\u044C\u0451\u0442 \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441" : "\u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u0430\u0433\u0435\u043D\u0442 \u043D\u0430\u0447\u043D\u0451\u0442 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u043A\u0442\u0438\u0432, \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
          open: collapse.isOpen("testing:" + eng, true),
          onToggle: collapse.toggle("testing:" + eng, true)
        },
        testing.length ? testing.map((a) => card(a, false)) : h2(
          "div",
          { className: "rt-atest-meta", style: { paddingBottom: 4 } },
          "\u0421\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043E\u0432 \u0432 \u0441\u0442\u0430\u0442\u0443\u0441\u0435 \xAB\u0422\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F\xBB"
        )
      )
    );
    body.push(
      h2(
        Section,
        {
          key: "recent",
          tone: "past",
          title: "\u041D\u0435\u0434\u0430\u0432\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0435",
          count: recent.length + " \u0445\u043E\u0441\u0442\u043E\u0432",
          sub: "\u0430\u043A\u0442\u0438\u0432\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0443\u0436\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0438",
          open: collapse.isOpen("recent:" + eng, false),
          onToggle: collapse.toggle("recent:" + eng, false)
        },
        recent.length ? recent.map((a) => card(a, true)) : h2("div", { className: "rt-atest-meta" }, "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442")
      )
    );
    body.push(
      h2(
        Section,
        {
          key: "queue",
          tone: "queue",
          title: "\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u043D\u0430 \u0442\u0435\u0441\u0442",
          count: (data ? data.untested || 0 : 0) + " \u0445\u043E\u0441\u0442\u043E\u0432",
          sub: "\u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0443\u0434\u0430\u0440\u0430 \u043F\u043E \u043F\u0440\u043E\u0441\u0442\u043E\u0442\u0435 \u0430\u0442\u0430\u043A\u0438 \u0438 \u0447\u0438\u0441\u043B\u0443 \u043F\u043E\u0440\u0442\u043E\u0432",
          open: collapse.isOpen("queue:" + eng, false),
          onToggle: collapse.toggle("queue:" + eng, false)
        },
        queue.length ? queue.map((a) => card(a, true)).concat([
          h2(
            "div",
            {
              key: "queueHint",
              className: "rt-atest-meta",
              style: { paddingTop: 4 }
            },
            "\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A (\u0441 \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u043C\u0438 \u0438 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u043E\u0439) \u2014 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \xAB\u041A\u0430\u0440\u0442\u0430 \u0430\u043A\u0442\u0438\u0432\u043E\u0432\xBB"
          )
        ]) : h2("div", { className: "rt-atest-meta" }, "\u0410\u043A\u0442\u0438\u0432\u043E\u0432 \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438 \u043D\u0430 \u0442\u0435\u0441\u0442 \u043D\u0435\u0442")
      )
    );
    return h2(
      "div",
      { className: "rt-main" },
      conclusion,
      err ? h2("div", { className: "rt-err" }, err) : null,
      data === null && !err ? h2("div", { className: "rt-empty" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026") : null,
      h2(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        h2("div", { style: { padding: "6px 12px 14px" } }, body)
      )
    );
  }
  function SessionTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const [msg, setMsg] = import_react2.default.useState(null);
    const [copied, setCopied] = import_react2.default.useState(null);
    const load = () => {
      if (!eng) return;
      api({ op: "sessions", engagement: eng }).then(
        (r) => {
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          setData(r);
        },
        (e) => setErr(String(e && e.message || e))
      );
    };
    import_react2.default.useEffect(load, [eng, refreshKey]);
    const probe = () => {
      setBusy(true);
      setMsg(null);
      api({ op: "probeSessions", engagement: eng, timeoutMs: 6e3 }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438" });
            load();
            return;
          }
          const on = (r.webshells || []).filter(
            (x) => x.status === "online"
          ).length;
          const act = (r.tunnels || []).filter(
            (x) => x.status === "active"
          ).length;
          setMsg({
            ok: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430: WebShell \u043E\u043D\u043B\u0430\u0439\u043D " + on + "/" + (r.webshells || []).length + ", \u0442\u0443\u043D\u043D\u0435\u043B\u0435\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E " + act + "/" + (r.tunnels || []).length
          });
          load();
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const copy = (key, text) => copyWithFeedback(text, text, (okFlag, message) => {
      if (!okFlag) {
        setMsg({ err: message });
        return;
      }
      setCopied(key);
      setTimeout(() => setCopied((c) => c === key ? null : c), 1500);
    });
    const markTunnel = (t, status) => {
      setMsg(null);
      api({
        op: "updateTunnel",
        engagement: eng,
        id: t.id,
        patch: { status, check_note: "\u043E\u0442\u043C\u0435\u0447\u0435\u043D\u043E \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0432 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0435" }
      }).then(
        () => load(),
        (e) => setMsg({ err: String(e && e.message || e) })
      );
    };
    const markShell = (w, status) => {
      setMsg(null);
      api({
        op: "updateWebshell",
        engagement: eng,
        id: w.id,
        patch: { status, check_note: "\u043E\u0442\u043C\u0435\u0447\u0435\u043D\u043E \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0432 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0435" }
      }).then(
        () => load(),
        (e) => setMsg({ err: String(e && e.message || e) })
      );
    };
    const sessCollapse = useCollapse("sessions:" + eng);
    const totals = data && data.totals || {};
    const shells = data && data.webshells || [];
    const tunnels = data && data.tunnels || [];
    const statusDot = (s) => h2("span", {
      className: s === "online" || s === "active" ? "rt-dot-on" : s === "unknown" || !s ? "rt-dot-unk" : "rt-dot-off"
    });
    const fact = (label, value) => h2(
      "div",
      { className: "rt-sess-fact" },
      h2("b", null, label),
      h2("span", null, value)
    );
    const isEncryptedShell = (t) => /behinder|godzilla|\u51b0\u874e|\u54e5\u65af\u62c9/i.test(String(t || ""));
    const isSuo5 = (t) => /suo5/i.test(String(t || ""));
    const hint = (key, title, detail) => h2(
      "div",
      { key, className: "rt-hint" },
      h2("b", null, title),
      h2(
        "details",
        { className: "rt-sess-fold", style: { marginTop: 3 } },
        h2("summary", null, "\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C (\u043A\u043B\u0438\u043A \u2014 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044C)"),
        h2("div", { style: { marginTop: 4 } }, detail)
      )
    );
    const hints = [];
    const badShells = shells.filter((w) => !isEncryptedShell(w.shell_type));
    const legitTunnels = tunnels.filter((t) => t.legit === true);
    if (badShells.length > 0) {
      hints.push(
        hint(
          "h1",
          "\u0412\u0445\u043E\u0434\u043E\u0432 " + badShells.length + " \u043D\u0435 \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0448\u0435\u043B\u043B\u043E\u043C Behinder/Godzilla (\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0441\u044F, \u044D\u0442\u043E \u043D\u0435 \u0441\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0439 \u0432\u0445\u043E\u0434)",
          "\u041D\u0430\u0432\u044B\u043A\u043E\u043C webshell-toolkit \u0437\u0430\u043B\u0435\u0439\u0442\u0435 \u0437\u0430\u043D\u043E\u0432\u043E \u0448\u0435\u043B\u043B Behinder (behinder) \u0438\u043B\u0438 Godzilla (godzilla) \u0438 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 shell_type + pass_key \u0432 redteam_webshell_add. \u0415\u0441\u043B\u0438 \u0432\u0445\u043E\u0434 \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0442\u0440\u0430\u043D\u0437\u0438\u0442\u0430, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u044D\u0442\u043E \u0432 \u043F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0438."
        )
      );
    }
    if (tunnels.length > 0 && legitTunnels.length === 0) {
      hints.push(
        hint(
          "h3",
          "\u0418\u043C\u0435\u044E\u0449\u0438\u0435\u0441\u044F " + tunnels.length + ' \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u043D\u0435 \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F "\u043F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u0435\u043C \u0433\u0440\u0430\u043D\u0438\u0446\u044B \u0446\u0435\u043B\u0438" (\u043D\u0435 \u043F\u0440\u043E\u0440\u044B\u0432 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440\u0430 \u0438 \u043D\u0435 \u043F\u0440\u043E\u0440\u044B\u0432 \u0432\u043E \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044E\u044E \u0441\u0435\u0442\u044C)',
          "socks5, frp \u0438 \u043F\u0440\u043E\u043A\u0441\u0438, \u043F\u043E\u0434\u043D\u044F\u0442\u044B\u0435 \u043D\u0430 \u0441\u0432\u043E\u0451\u043C VPS \u0438\u043B\u0438 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u043C \u0441\u0435\u0440\u0432\u0435\u0440\u0435, \u0442\u0443\u043D\u043D\u0435\u043B\u0435\u043C \u043D\u0435 \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F. \u041D\u0443\u0436\u0435\u043D \u043A\u0430\u043D\u0430\u043B, \u0438\u043D\u0438\u0446\u0438\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u0446\u0435\u043B\u0438: reverse shell \u0441 \u0446\u0435\u043B\u0438 \u043A \u043D\u0430\u043C, \u0437\u0430\u043F\u0443\u0441\u043A frp/Stowaway-\u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u043D\u0430 \u0446\u0435\u043B\u0438 \u0438\u043B\u0438 \u0442\u0443\u043D\u043D\u0435\u043B\u044C suo5/HTTP \u0447\u0435\u0440\u0435\u0437 WebShell \u043D\u0430 \u0446\u0435\u043B\u0438; \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 entry_kind."
        )
      );
    }
    const activeSuo5 = tunnels.filter(
      (t) => isSuo5(t.kind) && t.status === "active"
    );
    if (shells.length > 0 && activeSuo5.length === 0) {
      hints.push(
        hint(
          "h2",
          "\u041D\u0435\u0442 \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u0442\u0443\u043D\u043D\u0435\u043B\u044F suo5 (\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u043E\u0433\u043E \u043A\u0430\u043D\u0430\u043B\u0430 \u0432\u043E \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044E\u044E \u0441\u0435\u0442\u044C)",
          "\u041D\u0430\u0432\u044B\u043A\u043E\u043C suo5-tunnel \u043F\u043E\u0434\u043D\u0438\u043C\u0438\u0442\u0435 socks5-\u0442\u0443\u043D\u043D\u0435\u043B\u044C \u0447\u0435\u0440\u0435\u0437 WebShell \u0432\u044B\u0448\u0435, \u0437\u0430\u0442\u0435\u043C \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0433\u043E \u0447\u0435\u0440\u0435\u0437 redteam_tunnel_add (kind=suo5, listen=127.0.0.1:1080, entry=URL WebShell, reach=\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u043F\u043E\u0434\u0441\u0435\u0442\u044C), \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0441\u0432\u044F\u0437\u043D\u043E\u0441\u0442\u044C\xBB, \u0447\u0442\u043E\u0431\u044B \u0443\u0431\u0435\u0434\u0438\u0442\u044C\u0441\u044F \u0432 status=active."
        )
      );
    }
    const shellCards = shells.map(
      (w) => h2(
        "div",
        { key: "w" + w.id, className: "rt-sess" },
        h2(
          "div",
          { className: "rt-sess-head" },
          statusDot(w.status),
          h2("span", { className: "rt-sess-title" }, w.url),
          h2(
            "span",
            { className: "rt-tag rt-tag-active" },
            w.shell_type || "webshell"
          ),
          isEncryptedShell(w.shell_type) ? null : h2("span", { className: "rt-tag rt-tag-warn" }, "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0441\u044F"),
          w.privilege ? h2("span", { className: "rt-tag" }, w.privilege) : null,
          h2("div", { className: "rt-spacer" }),
          copied === "cmd" + w.id ? h2(
            "span",
            { className: "rt-tag", style: { color: "#10b981" } },
            "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"
          ) : h2(
            "button",
            {
              className: "rt-btn",
              style: { padding: "0 6px", fontSize: 11 },
              onClick: () => copy("cmd" + w.id, 'curl -s "' + w.url + '"')
            },
            "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C URL"
          ),
          h2(
            "button",
            {
              className: "rt-btn",
              style: { padding: "0 6px", fontSize: 11 },
              onClick: () => markShell(w, "offline")
            },
            "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043D\u0435\u0440\u0430\u0431\u043E\u0447\u0438\u043C"
          )
        ),
        h2(
          "div",
          { className: "rt-sess-facts" },
          fact(
            "\u0422\u0438\u043F",
            isEncryptedShell(w.shell_type) ? "\u0417\u0430\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0448\u0435\u043B\u043B (Behinder/Godzilla, \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0441\u044F \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E)" : "\u041D\u0435\u0437\u0430\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0448\u0435\u043B\u043B \u2014\u2014 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0441\u044F, \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0442\u0440\u0430\u043D\u0437\u0438\u0442\u0430"
          ),
          w.pass_key ? fact("\u041F\u0430\u0440\u043E\u043B\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F", h2("span", { className: "rt-mono" }, w.pass_key)) : null,
          w.asset_ip ? fact("\u0410\u043A\u0442\u0438\u0432", w.asset_ip) : null,
          w.privilege ? fact("\u041F\u0440\u0430\u0432\u0430", w.privilege) : null,
          w.secret_ref ? fact(
            "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435",
            h2("span", { className: "rt-mono" }, w.secret_ref)
          ) : null,
          fact(
            "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430",
            (w.last_check ? fmt(w.last_check) : "\u043D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u043B\u043E\u0441\u044C") + (w.latency_ms !== null && w.latency_ms !== void 0 ? "(" + w.latency_ms + "ms)" : "")
          ),
          w.check_note ? fact("\u041F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438", w.check_note) : null,
          w.note ? fact("\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435", w.note) : null
        )
      )
    );
    const tunnelCards = tunnels.map((t) => {
      const proxy = t.listen ? "socks5://" + t.listen : "";
      const gogoCmd = t.listen ? "./gogo -i <CIDR \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0439 \u0441\u0435\u0442\u0438> -m ss --ping -p top2,win,db --proxy " + proxy : "";
      const fscanCmd = t.listen ? "./fscan -h <CIDR \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0439 \u0441\u0435\u0442\u0438> -np -nobr -nopoc -socks5 " + t.listen + " -o intranet.txt" : "";
      return h2(
        "div",
        { key: "t" + t.id, className: "rt-sess" },
        h2(
          "div",
          { className: "rt-sess-head" },
          statusDot(t.status),
          h2(
            "span",
            { className: "rt-sess-title" },
            t.listen || "(\u0430\u0434\u0440\u0435\u0441 \u043F\u0440\u043E\u0441\u043B\u0443\u0448\u0438\u0432\u0430\u043D\u0438\u044F \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D)"
          ),
          h2("span", { className: "rt-tag rt-tag-passive" }, t.kind || "tunnel"),
          isSuo5(t.kind) ? null : h2(
            "span",
            { className: "rt-tag rt-tag-warn" },
            "\u041D\u0435 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B suo5"
          ),
          /* Прорывом считается только канал, пересекающий границу цели (поднятый на своём VPS/сервере — нет) */
          t.legit === true ? h2(
            "span",
            {
              className: "rt-tag rt-tag-live",
              title: t.entry_kind_label || ""
            },
            "\u041A\u0430\u043D\u0430\u043B \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u0446\u0435\u043B\u0438"
          ) : t.legit === false ? h2(
            "span",
            {
              className: "rt-tag rt-tag-warn",
              title: "\u041A\u0430\u043D\u0430\u043B \u043F\u043E\u0434\u043D\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0441\u0432\u043E\u0451\u043C VPS/\u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u043C \u0441\u0435\u0440\u0432\u0435\u0440\u0435 \u0438 \u0446\u0435\u043B\u0438 \u043D\u0435 \u043A\u0430\u0441\u0430\u0435\u0442\u0441\u044F \u2014\u2014 \u044D\u0442\u043E \u043D\u0435 \u043F\u0440\u043E\u0440\u044B\u0432 \u043F\u0435\u0440\u0438\u043C\u0435\u0442\u0440\u0430 \u0438 \u043D\u0435 \u043F\u0440\u043E\u0440\u044B\u0432 \u0432\u043E \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044E\u044E \u0441\u0435\u0442\u044C"
            },
            "\u041D\u0435 \u043F\u0440\u043E\u0440\u044B\u0432"
          ) : h2(
            "span",
            {
              className: "rt-tag",
              title: "entry_kind \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D: \u043F\u043E\u044F\u0441\u043D\u0438\u0442\u0435, \u0447\u0442\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u0446\u0435\u043B\u0438 (target-outbound / target-http / target-agent)"
            },
            "\u041A \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044E"
          ),
          t.reach ? h2("span", { className: "rt-tag" }, "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E " + t.reach) : null,
          h2("div", { className: "rt-spacer" }),
          h2(
            "button",
            {
              className: "rt-btn",
              style: { padding: "0 6px", fontSize: 11 },
              onClick: () => copy("sock" + t.id, t.listen || "")
            },
            copied === "sock" + t.id ? "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E" : "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441"
          ),
          t.status === "active" ? h2(
            "button",
            {
              className: "rt-btn",
              style: { padding: "0 6px", fontSize: 11 },
              onClick: () => markTunnel(t, "down")
            },
            "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043D\u0435\u0440\u0430\u0431\u043E\u0447\u0438\u043C"
          ) : h2(
            "button",
            {
              className: "rt-btn",
              style: { padding: "0 6px", fontSize: 11 },
              onClick: () => markTunnel(t, "active")
            },
            "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0447\u0438\u043C"
          )
        ),
        h2(
          "div",
          { className: "rt-sess-facts" },
          fact("\u0412\u0445\u043E\u0434 \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u0446\u0435\u043B\u0438", t.entry || "\u043D\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D"),
          fact(
            "\u041F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B",
            t.legit === true ? h2(
              "span",
              { className: "rt-tag rt-tag-live" },
              t.entry_kind_label || t.entry_kind || "\u0441\u0442\u043E\u0440\u043E\u043D\u0430 \u0446\u0435\u043B\u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0430"
            ) : t.legit === false ? h2(
              "span",
              { className: "rt-tag rt-tag-warn" },
              "\u041D\u0435 \u043F\u0440\u043E\u0440\u044B\u0432 (\u043F\u0440\u043E\u043A\u0441\u0438 \u043F\u043E\u0434\u043D\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0441\u0432\u043E\u0451\u043C VPS)"
            ) : h2(
              "span",
              { className: "rt-tag" },
              "entry_kind \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D, \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F"
            )
          ),
          t.reach ? fact("\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u043F\u043E\u0434\u0441\u0435\u0442\u044C", t.reach) : null,
          t.asset_ip ? fact("\u0410\u043A\u0442\u0438\u0432", t.asset_ip) : null,
          fact(
            "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430",
            (t.last_check ? fmt(t.last_check) : "\u043D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u043B\u043E\u0441\u044C") + (t.latency_ms !== null && t.latency_ms !== void 0 ? "(" + t.latency_ms + "ms)" : "")
          ),
          t.check_note ? fact("\u041F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438", t.check_note) : null,
          t.note ? fact("\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435", t.note) : null
        ),
        /* Команды по умолчанию свёрнуты: главное в карточке — «работает ли канал и куда ведёт», команды раскрываются по необходимости */
        t.command ? h2(
          "details",
          { className: "rt-sess-fold" },
          h2("summary", null, "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F (\u043A\u043B\u0438\u043A \u2014 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044C / \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C)"),
          h2(
            "div",
            Object.assign(
              { className: "rt-code", title: "\u041A\u043B\u0438\u043A \u2014 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C" },
              clickable(() => copy("c" + t.id, t.command), {
                label: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443"
              })
            ),
            copied === "c" + t.id ? "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E" : t.command
          )
        ) : null,
        t.status === "active" && t.listen ? h2(
          "details",
          { className: "rt-sess-fold" },
          h2("summary", null, "\u0421\u043A\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u044D\u0442\u043E\u0442 \u0442\u0443\u043D\u043D\u0435\u043B\u044C (\u043A\u043E\u043C\u0430\u043D\u0434\u044B gogo / fscan)"),
          h2(
            "div",
            { className: "rt-sess-cmd" },
            h2(
              "div",
              Object.assign(
                { className: "rt-code", title: "\u041A\u043B\u0438\u043A \u2014 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C" },
                clickable(() => copy("g" + t.id, gogoCmd), {
                  label: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443 gogo"
                })
              ),
              copied === "g" + t.id ? "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E" : gogoCmd
            ),
            h2(
              "div",
              Object.assign(
                {
                  className: "rt-code",
                  style: { display: "block", marginTop: 3 },
                  title: "\u041A\u043B\u0438\u043A \u2014 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
                },
                clickable(() => copy("f" + t.id, fscanCmd), {
                  label: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443 fscan"
                })
              ),
              copied === "f" + t.id ? "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E" : fscanCmd
            )
          )
        ) : null
      );
    });
    return h2(
      "div",
      { className: "rt-main" },
      h2(
        "div",
        { className: "rt-toolbar" },
        h2("span", { style: { fontWeight: 600 } }, "\u0421\u0435\u0441\u0441\u0438\u0438 \u0438 \u0432\u0445\u043E\u0434\u044B"),
        h2(
          "span",
          { className: "rt-tag" },
          "WebShell " + (totals.webshellsOnline || 0) + "/" + (totals.webshells || 0) + " \u043E\u043D\u043B\u0430\u0439\u043D"
        ),
        h2(
          "span",
          { className: "rt-tag" },
          "\u0422\u0443\u043D\u043D\u0435\u043B\u0435\u0439 " + (totals.tunnelsActive || 0) + "/" + (totals.tunnels || 0) + " \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E"
        ),
        h2("span", { className: "rt-tag" }, "\u0423\u0447\u0451\u0442\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 " + (totals.credentials || 0)),
        h2("span", { className: "rt-tag" }, "\u0421\u0435\u0441\u0441\u0438\u0439 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 " + (totals.access || 0)),
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          {
            className: "rt-btn rt-btn-primary",
            disabled: busy,
            onClick: probe
          },
          busy ? "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\u2026" : "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0441\u0432\u044F\u0437\u043D\u043E\u0441\u0442\u044C"
        ),
        h2("button", { className: "rt-btn", onClick: load }, "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C")
      ),
      msg ? h2(
        "div",
        { className: msg.err ? "rt-err" : "rt-foot" },
        msg.err || msg.ok
      ) : null,
      err ? h2("div", { className: "rt-err" }, err) : null,
      h2(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        !shells.length && !tunnels.length ? h2(
          "div",
          { className: "rt-empty" },
          h2("div", null, "\u041F\u043E\u043A\u0430 \u043D\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E WebShell \u0438\u043B\u0438 \u0442\u0443\u043D\u043D\u0435\u043B\u044F."),
          h2(
            "div",
            { style: { marginTop: 6, fontSize: 12 } },
            "\u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 WebShell \u2014 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 redteam_webshell_add; \u043F\u043E\u0434\u043D\u044F\u043B\u0438 \u0442\u0443\u043D\u043D\u0435\u043B\u044C \u2014 redteam_tunnel_add (suo5 / socks5 / ssh -R); \u0434\u0430\u043B\u044C\u0448\u0435 \u0430\u0433\u0435\u043D\u0442 \u0443\u0432\u0438\u0434\u0438\u0442 \u0438\u0445 \u0447\u0435\u0440\u0435\u0437 redteam_sessions."
          )
        ) : null,
        hints.length ? h2("div", { style: { padding: "8px 10px 0" } }, hints) : null,
        h2(
          Section,
          {
            key: "webshells",
            tone: "queue",
            title: "WebShell",
            count: (totals.webshellsOnline || 0) + "/" + (totals.webshells || 0) + " \u043E\u043D\u043B\u0430\u0439\u043D",
            sub: "\u043F\u043E\u0434\u043D\u044F\u0442\u044B\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0435 \u0432\u0445\u043E\u0434\u044B",
            open: sessCollapse.isOpen("shells", true),
            onToggle: sessCollapse.toggle("shells", true)
          },
          shells.length ? h2(
            "div",
            { className: "rt-sess-grid", style: { padding: 0 } },
            shellCards
          ) : h2(
            "div",
            { className: "rt-atest-meta" },
            "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 (\u043F\u043E\u043B\u0443\u0447\u0438\u0432 WebShell, \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0433\u043E \u0447\u0435\u0440\u0435\u0437 redteam_webshell_add)"
          )
        ),
        h2(
          Section,
          {
            key: "tunnels",
            tone: "test",
            title: "\u0422\u0443\u043D\u043D\u0435\u043B\u0438 \u0432\u043E \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044E\u044E \u0441\u0435\u0442\u044C",
            count: (totals.tunnelsActive || 0) + "/" + (totals.tunnels || 0) + " \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E",
            sub: "\u043C\u043E\u0436\u043D\u043E \u0441\u0440\u0430\u0437\u0443 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u043A \u043F\u0440\u043E\u043A\u0441\u0438 \u0434\u043B\u044F \u0441\u043A\u0430\u043D\u0435\u0440\u043E\u0432",
            open: sessCollapse.isOpen("tunnels", true),
            onToggle: sessCollapse.toggle("tunnels", true)
          },
          tunnels.length ? h2(
            "div",
            { className: "rt-sess-grid", style: { padding: 0 } },
            tunnelCards
          ) : h2(
            "div",
            { className: "rt-atest-meta" },
            "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 (\u043F\u043E\u0434\u043D\u044F\u0432 \u0442\u0443\u043D\u043D\u0435\u043B\u044C, \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0433\u043E \u0447\u0435\u0440\u0435\u0437 redteam_tunnel_add)"
          )
        )
      )
    );
  }
  class RtBoundary extends import_react2.default.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
      return { error };
    }
    componentDidCatch(error) {
      try {
        console.error("[redteam-ui] \u043E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u0440\u0438\u0441\u043E\u0432\u043A\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B:", error);
      } catch (e) {
      }
    }
    render() {
      if (this.state.error) {
        const msg = this.state.error && this.state.error.message ? this.state.error.message : String(this.state.error);
        return h2(
          "div",
          { className: "rt-pane" },
          h2("div", { className: "rt-err" }, "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u0440\u0438\u0441\u043E\u0432\u043A\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B: " + msg),
          h2(
            "button",
            {
              className: "rt-btn",
              onClick: () => {
                this.setState({ error: null });
                setUI({ tab: "assets" });
              }
            },
            "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043A\u0430\u0440\u0442\u0443 \u0430\u043A\u0442\u0438\u0432\u043E\u0432"
          )
        );
      }
      return this.props.children;
    }
  }
  function AgentsTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [roles, setRoles] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [concurrency, setConcurrency] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const load = () => {
      setBusy(true);
      api({
        op: eng ? "prompts" : "bootstrap",
        engagement: eng || void 0
      }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F");
            return;
          }
          setErr(null);
          if (r.roles) setRoles(r.roles);
        },
        (e) => {
          setBusy(false);
          setErr(String(e && e.message || e));
        }
      );
      api({ op: "agentsStatus" }).then(
        (r) => {
          if (r && r.ok !== false) setConcurrency(r);
        },
        () => {
        }
      );
    };
    import_react2.default.useEffect(load, [eng, refreshKey]);
    const used = concurrency ? concurrency.used : null;
    const max = concurrency ? concurrency.max : 3;
    return h2(
      "div",
      { className: "rt-main" },
      h2(
        "div",
        { className: "rt-toolbar" },
        h2("span", { style: { fontWeight: 600 } }, "\u0411\u043E\u0435\u0432\u044B\u0435 \u0430\u0433\u0435\u043D\u0442\u044B"),
        h2("span", { className: "rt-tag rt-tag-passive" }, "\u041B\u0438\u043C\u0438\u0442 \u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 " + max),
        used === null ? h2("span", { className: "rt-tag" }, "\u0417\u0430\u043D\u044F\u0442\u043E\u0441\u0442\u044C \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430") : h2(
          "span",
          {
            className: "rt-tag" + (used >= max ? " rt-tag-warn" : " rt-tag-live")
          },
          "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435 " + used + " / \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E " + Math.max(max - used, 0)
        ),
        h2("div", { className: "rt-spacer" }),
        h2(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "\u0427\u0442\u0435\u043D\u0438\u0435\u2026" : "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
        )
      ),
      h2(
        "div",
        { className: "rt-pane" },
        err ? h2("div", { className: "rt-err" }, err) : null,
        h2(
          "div",
          { className: "rt-card" },
          h2("h4", null, "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 (\u0436\u0451\u0441\u0442\u043A\u0438\u0435 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F)"),
          h2(
            "div",
            { style: { fontSize: 12, lineHeight: 1.7 } },
            "\xB7 \u041F\u043E \u043E\u0434\u043D\u043E\u0439 \u0446\u0435\u043B\u0438 **\u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 " + max + " \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0430\u0433\u0435\u043D\u0442\u043E\u0432**; \u043F\u0435\u0440\u0435\u0434 \u0440\u0430\u0437\u0434\u0430\u0447\u0435\u0439 \u0437\u0430\u0434\u0430\u0447 \u0433\u043B\u0430\u0432\u043D\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 \u0441\u043B\u043E\u0442 \u0447\u0435\u0440\u0435\u0437 `redteam_agent_slot`; \u043F\u0440\u0438 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u043B\u0438\u043C\u0438\u0442\u0430 \u0437\u0430\u043F\u0440\u043E\u0441 \u043E\u0442\u043A\u043B\u043E\u043D\u044F\u0435\u0442\u0441\u044F.",
            h2("br"),
            "\xB7 **\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0437\u0430\u0434\u0430\u0447\u0438 \u0440\u0430\u0437\u0434\u0430\u044E\u0442\u0441\u044F \u043F\u043E \u043E\u0434\u043D\u043E\u0439 \u0438 \u0438\u0434\u0443\u0442 \u043F\u043E \u043F\u043E\u0440\u044F\u0434\u043A\u0443**; \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u044B\u0435.",
            h2("br"),
            "\xB7 \u0423 \u043A\u0430\u0436\u0434\u043E\u0439 \u0441\u0435\u0441\u0441\u0438\u0438 **\u0441\u0432\u043E\u044F \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0430 \u043A \u0446\u0435\u043B\u0438**: \u043F\u0440\u0438 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u044B\u0445 \u0441\u0435\u0441\u0441\u0438\u044F\u0445 \u043E\u0442\u0447\u0451\u0442\u044B \u043D\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u0448\u0430\u044E\u0442\u0441\u044F (\u0441\u0443\u0431\u0430\u0433\u0435\u043D\u0442 \u043D\u0430\u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0446\u0435\u043B\u044C \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0439 \u0441\u0435\u0441\u0441\u0438\u0438)."
          )
        ),
        h2(
          "div",
          { className: "rt-card" },
          h2("h4", null, "\u0428\u0435\u0441\u0442\u044C \u0440\u043E\u043B\u0435\u0439"),
          h2(
            "div",
            { style: { fontSize: 12, lineHeight: 1.8 } },
            "\u2460 \u0420\u0430\u0437\u0432\u0435\u0434\u043A\u0430 `recon` \u2014\u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u044B, \u043F\u043E\u043B\u043D\u043E \u043F\u043E \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438 (\u0432\u043A\u043B\u044E\u0447\u0430\u044F \u043F\u0435\u0440\u0438\u0444\u0435\u0440\u0438\u0439\u043D\u044B\u0435 \u0438 \u043D\u0435\u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435)",
            h2("br"),
            "\u2461 \u0418\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0430\u043A\u0442\u0438\u0432\u043E\u0432 `assess` \u2014\u2014 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443, \u043E\u0446\u0435\u043D\u0438\u0432\u0430\u0435\u0442 \u043F\u0440\u043E\u0441\u0442\u043E\u0442\u0443 \u0430\u0442\u0430\u043A\u0438 \u0438 \u0437\u0430\u043D\u043E\u0441\u0438\u0442 \u0432\u0441\u0451 \u0432 \u0431\u0430\u0437\u0443",
            h2("br"),
            "\u2462 \u041F\u043E\u0438\u0441\u043A \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439 `vuln-scan` \u2014\u2014 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0431\u0430\u0437\u044B \u043D\u0430 \u0434\u0443\u0431\u043B\u0438 \u2192 \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 Nday/1day \u2192 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043E\u0432 \u043D\u0430 \u0434\u043E\u0441\u0442\u0443\u043F \u0431\u0435\u0437 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
            h2("br"),
            "\u2463 \u042D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0430\u0446\u0438\u044F \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439 `exploit` \u2014\u2014 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435 (\u0448\u0435\u043B\u043B Behinder/Godzilla) + \u0442\u0443\u043D\u043D\u0435\u043B\u044C suo5, \u0437\u0430\u0442\u0435\u043C \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0443\u043D\u043A\u0442\u044B \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F",
            h2("br"),
            "\u2464 \u041F\u0435\u043D\u0442\u0435\u0441\u0442 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0439 \u0441\u0435\u0442\u0438 `internal` \u2014\u2014 \u0438\u0434\u0451\u0442 \u0447\u0435\u0440\u0435\u0437 \u0442\u0443\u043D\u043D\u0435\u043B\u044C \u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0434\u043D\u0438\u043C\u0430\u0435\u0442 \u2460\u2461\u2462\u2463 \u0434\u043B\u044F \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0439 \u0441\u0435\u0442\u0438",
            h2("br"),
            "\u2465 \u0413\u043B\u0430\u0432\u043D\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F `plan` \u2014\u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u0442, \u0440\u0430\u0437\u0434\u0430\u0451\u0442 \u0437\u0430\u0434\u0430\u0447\u0438, \u0441\u0432\u043E\u0434\u0438\u0442 \u0438 \u0434\u043E\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0435\u0442, \u0440\u0443\u043A\u0430\u043C\u0438 \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442"
          )
        ),
        h2(ConcurrencyCard, { concurrency, onSaved: load }),
        h2(
          "div",
          { className: "rt-card" },
          h2("h4", null, "\u041F\u0440\u043E\u043C\u043F\u0442\u044B \u0440\u043E\u043B\u0435\u0439 (\u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u043F\u043E \u0446\u0435\u043B\u0438, \u0437\u0434\u0435\u0441\u044C \u0438\u0445 \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0430\u0432\u0438\u0442\u044C)"),
          h2(
            "div",
            {
              style: {
                fontSize: 11.5,
                color: "var(--dsw-alias-label-secondary)",
                marginBottom: 6
              }
            },
            "\xAB\u041F\u0440\u043E\u043C\u043F\u0442\u044B \u0430\u0433\u0435\u043D\u0442\u0430\xBB \u0442\u0435\u043F\u0435\u0440\u044C \u043D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435; \u043D\u0438\u0436\u0435 \u043F\u043E\u043B\u043D\u044B\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 (\u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u0430\u0432\u043E\u043A \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB, \u0432\u043B\u0438\u044F\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0443\u044E \u0446\u0435\u043B\u044C)."
          ),
          h2(PromptsTab, { engagement: eng, refreshKey })
        )
      )
    );
  }
  function ConcurrencyCard(props) {
    const info = props.concurrency || {};
    const [draft, setDraft] = import_react2.default.useState("");
    const [busy, setBusy] = import_react2.default.useState(false);
    const [msg, setMsg] = import_react2.default.useState(null);
    import_react2.default.useEffect(() => {
      if (info.max) setDraft(String(info.max));
    }, [info.max]);
    const limit = info.limit || 10;
    const used = typeof info.used === "number" ? info.used : null;
    const source = info.source === "settings" ? "\u0437\u0430\u0434\u0430\u043D\u043E \u0432 \u043F\u0430\u043D\u0435\u043B\u0438" : info.source === "env" ? "\u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F REDTEAM_MAX_AGENTS" : "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E";
    const n = Number(draft);
    const invalid = !Number.isFinite(n) || Math.floor(n) !== n || n < 1 || n > limit;
    const save = () => {
      if (invalid) return;
      setBusy(true);
      setMsg(null);
      api({ op: "setAgentsMax", max: n }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F" });
            return;
          }
          setMsg({
            ok: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E: \u043B\u0438\u043C\u0438\u0442 \u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 " + r.max + " (\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443, \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A \u043D\u0435 \u043D\u0443\u0436\u0435\u043D)"
          });
          if (props.onSaved) props.onSaved();
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    return h2(
      "div",
      { className: "rt-card" },
      h2("h4", null, "\u0427\u0438\u0441\u043B\u043E \u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445"),
      h2(
        "div",
        { style: { fontSize: 12, lineHeight: 1.8, marginBottom: 8 } },
        "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0430\u0433\u0435\u043D\u0442\u043E\u0432 **\u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043F\u043E \u043E\u0434\u043D\u043E\u0439 \u0446\u0435\u043B\u0438**. \u0421\u0435\u0439\u0447\u0430\u0441 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442: **" + (info.max || "?") + "**" + (used === null ? "" : " (\u0432 \u0440\u0430\u0431\u043E\u0442\u0435 " + used + ", \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E " + Math.max((info.max || 0) - used, 0) + ")") + ", \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A: " + source + ". \u041F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F **\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443**, \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A \u043D\u0435 \u043D\u0443\u0436\u0435\u043D."
      ),
      h2(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap"
          }
        },
        h2("input", {
          className: "rt-input",
          style: { width: 90 },
          type: "number",
          min: 1,
          max: limit,
          value: draft,
          onChange: (e) => setDraft(e.target.value)
        }),
        h2(
          "span",
          {
            style: {
              fontSize: 11.5,
              color: "var(--dsw-alias-label-secondary)"
            }
          },
          "\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D 1 \u2013 " + limit
        ),
        h2(
          "button",
          {
            className: "rt-btn rt-btn-primary",
            disabled: busy || invalid,
            onClick: save
          },
          busy ? "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u2026" : "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"
        ),
        msg && msg.err ? h2(
          "span",
          { style: { fontSize: 12, color: "var(--rt-danger, #d33)" } },
          msg.err
        ) : null,
        msg && msg.ok ? h2(
          "span",
          {
            style: {
              fontSize: 12,
              color: "var(--dsw-alias-label-secondary)"
            }
          },
          msg.ok
        ) : null
      ),
      h2(
        "div",
        { className: "rt-note", style: { marginTop: 8 } },
        "\u26A0\uFE0F \u0411\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0437\u043D\u0430\u0447\u0438\u0442 \u0431\u044B\u0441\u0442\u0440\u0435\u0435: **\u043B\u0438\u043C\u0438\u0442\u044B \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0438 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u043D\u0430 \u043E\u0434\u0438\u043D API Key \u043C\u043E\u0434\u0435\u043B\u0438 \u043E\u0431\u0449\u0438\u0435**, \u0438 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447 \u043C\u0435\u0448\u0430\u044E\u0442 \u0434\u0440\u0443\u0433 \u0434\u0440\u0443\u0433\u0443: \u044D\u0442\u043E \u0432\u0438\u0434\u043D\u043E \u043A\u0430\u043A \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438, \u0442\u0430\u0439\u043C\u0430\u0443\u0442\u044B, \u043E\u0431\u0440\u0435\u0437\u0430\u043D\u043D\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u0438 \u0434\u0430\u0436\u0435 \u043E\u0448\u0438\u0431\u043A\u0438 rate limit \u2014\u2014 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0442\u0435\u0441\u0442\u0430 \u0441\u0442\u0430\u043D\u043E\u0432\u044F\u0442\u0441\u044F \u043D\u0435\u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u044B\u043C\u0438 (\u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0438, \u0431\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438). \u041D\u0430\u0447\u0438\u043D\u0430\u0439\u0442\u0435 \u0441 2\u20133 \u0438 \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0432\u0430\u0439\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u043A\u0432\u043E\u0442\u044B Key \u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u0438 \u0437\u0430\u0434\u0430\u0447\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u044B."
      )
    );
  }
  function VersionBar(props) {
    const [info, setInfo] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [busy, setBusy] = import_react2.default.useState(false);
    const [open, setOpen] = import_react2.default.useState(false);
    const [msg, setMsg] = import_react2.default.useState(null);
    const [countdown, setCountdown] = import_react2.default.useState(0);
    const countdownRef = import_react2.default.useRef(null);
    const clearCountdown = import_react2.default.useCallback(() => {
      if (countdownRef.current) {
        try {
          clearInterval(countdownRef.current);
        } catch {
        }
      }
      countdownRef.current = null;
    }, []);
    import_react2.default.useEffect(() => () => clearCountdown(), [clearCountdown]);
    const closeModal = import_react2.default.useCallback(() => {
      clearCountdown();
      setCountdown(0);
      setOpen(false);
    }, [clearCountdown]);
    const check = (silent) => {
      if (!silent) setBusy(true);
      api({ op: "updateCheck" }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            if (!silent) setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439");
            api({ op: "version" }).then(
              (v) => {
                if (v && v.ok !== false) setInfo(v);
              },
              () => {
              }
            );
            return;
          }
          setErr(null);
          setInfo(r);
        },
        (e) => {
          setBusy(false);
          if (!silent) setErr(String(e && e.message || e));
          api({ op: "version" }).then(
            (v) => {
              if (v && v.ok !== false) setInfo(v);
            },
            () => {
            }
          );
        }
      );
    };
    import_react2.default.useEffect(() => {
      check(true);
    }, []);
    const apply2 = () => {
      setBusy(true);
      setMsg(null);
      api({
        op: "updateApply",
        target: info && info.latest || void 0
      }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F" });
            return;
          }
          setMsg({
            ok: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E " + (r.installed || "") + " , \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0445\u043E\u0441\u0442\u2026"
          });
          setCountdown(6);
          clearCountdown();
          countdownRef.current = setInterval(() => {
            setCountdown((n) => {
              if (n <= 1) {
                clearCountdown();
                window.location.reload();
                return 0;
              }
              return n - 1;
            });
          }, 1e3);
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String(e && e.message || e) });
        }
      );
    };
    const current = info && info.current ? info.current : info && info.plugin ? info.plugin.version : null;
    const latest = info && info.latest ? info.latest : null;
    const hasNew = !!(info && info.updateAvailable);
    const blockers = info && info.blockers || [];
    const notes = info && info.notes || [];
    const mode = info && info.install ? info.install.mode : null;
    return h2(
      "span",
      { style: { display: "inline-flex", alignItems: "center", gap: 6 } },
      h2(
        "span",
        {
          className: "rt-tag" + (hasNew ? " rt-tag-warn" : ""),
          title: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F " + (current || "\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E") + (latest ? "\n\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0432\u0435\u0440\u0441\u0438\u044F " + latest : "") + (mode === "dev" ? "\n\u0421\u043F\u043E\u0441\u043E\u0431 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438: dev-\u0440\u0435\u0436\u0438\u043C (\u0441\u0438\u043C\u043B\u0438\u043D\u043A \u043D\u0430 \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A\u0438)" : mode === "package" ? "\n\u0421\u043F\u043E\u0441\u043E\u0431 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438: \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043F\u0430\u043A\u0435\u0442\u043E\u043C" : "") + (info && info.check_error ? "\n\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438: " + info.check_error : "")
        },
        "v" + (current || "?")
      ),
      hasNew ? h2(
        "button",
        {
          className: "rt-btn rt-btn-primary",
          disabled: busy,
          onClick: () => {
            setOpen(true);
            setMsg(null);
          },
          title: "\u041D\u0430\u0439\u0434\u0435\u043D\u0430 \u043D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F " + latest + ": \u043D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0438 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439 (\u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0445\u043E\u0441\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0441\u044F)"
        },
        busy ? "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\u2026" : "\u0415\u0441\u0442\u044C \u043D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F v" + latest
      ) : h2(
        "button",
        {
          className: "rt-btn",
          disabled: busy,
          onClick: () => check(false),
          title: "\u0415\u0449\u0451 \u0440\u0430\u0437 \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0432 npm"
        },
        busy ? "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\u2026" : "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F"
      ),
      open ? h2(
        "div",
        {
          className: "rt-modal",
          "aria-hidden": "true",
          onClick: closeModal
        },
        h2(
          "div",
          {
            className: "rt-modal-box",
            onClick: (e) => e.stopPropagation()
          },
          h2("h4", { style: { marginTop: 0 } }, "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0440\u0435\u0436\u0438\u043C\u0430 RedTeam"),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F"),
            h2("span", null, current || "\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E")
          ),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0432\u0435\u0440\u0441\u0438\u044F"),
            h2("span", null, latest || "\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E")
          ),
          h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u0421\u043F\u043E\u0441\u043E\u0431 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438"),
            h2(
              "span",
              null,
              mode === "dev" ? "dev-\u0440\u0435\u0436\u0438\u043C (\u0441\u0438\u043C\u043B\u0438\u043D\u043A \u043D\u0430 \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A\u0438)" : mode === "package" ? "\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043F\u0430\u043A\u0435\u0442\u043E\u043C (" + (info.install && info.install.packageManager || "npm") + ")" : "\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"
            )
          ),
          info && info.install && info.install.dir ? h2(
            "div",
            { className: "rt-kv" },
            h2("b", null, "\u041C\u0435\u0441\u0442\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438"),
            h2("span", { className: "rt-mono" }, info.install.dir)
          ) : null,
          blockers.length ? h2(
            "div",
            { className: "rt-hint" },
            h2(
              "div",
              { style: { fontWeight: 600, marginBottom: 4 } },
              "\u0421\u0435\u0439\u0447\u0430\u0441 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C\u0441\u044F \u043D\u0435\u043B\u044C\u0437\u044F:"
            ),
            blockers.map(
              (b, i) => h2("div", { key: "b" + i }, "\xB7 " + b)
            )
          ) : null,
          notes.length ? h2(
            "div",
            { className: "rt-foot", style: { padding: "4px 0" } },
            notes.map((n, i) => h2("div", { key: "n" + i }, n))
          ) : null,
          h2(
            "div",
            {
              style: {
                fontSize: 12,
                color: "var(--dsw-alias-label-secondary)",
                margin: "8px 0"
              }
            },
            "\u0425\u043E\u0434 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F: \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043D\u043E\u0432\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u2192 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0445\u043E\u0441\u0442\u0430 (\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 exe / Community Edition / dsh web; \u0442\u0435\u043A\u0443\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0441\u044F \u0438 \u0447\u0435\u0440\u0435\u0437 5\u201310 \u0441\u0435\u043A\u0443\u043D\u0434 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u0441\u0430\u043C\u0430). \u041F\u0435\u0440\u0435\u0434 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u0442\u0441\u044F, \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043B\u0438 \u0430\u0433\u0435\u043D\u0442\u044B: \u0435\u0441\u043B\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442, \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442\u0441\u044F."
          ),
          msg ? h2(
            "div",
            { className: msg.err ? "rt-err" : "rt-foot" },
            msg.err || msg.ok
          ) : null,
          countdown > 0 ? h2(
            "div",
            { className: "rt-foot" },
            "\u0425\u043E\u0441\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F, \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437 " + countdown + " \u0441\u2026"
          ) : null,
          h2(
            "div",
            {
              style: {
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                marginTop: 10
              }
            },
            h2(
              "button",
              { className: "rt-btn", onClick: closeModal },
              "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
            ),
            h2(
              "button",
              {
                className: "rt-btn rt-btn-primary",
                disabled: busy || blockers.length > 0 || mode === "dev",
                title: mode === "dev" ? "\u041F\u0440\u0438 dev-\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0439\u0442\u0435\u0441\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u044F" : blockers.length ? "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u0441\u0442\u0440\u0430\u043D\u0438\u0442\u0435 \u0431\u043B\u043E\u043A\u0435\u0440\u044B \u0432\u044B\u0448\u0435" : "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
                onClick: apply2
              },
              busy ? "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435\u2026" : "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C"
            )
          )
        )
      ) : null
    );
  }
  const UNREAD_KEY = "rt-unread:";
  const loadUnread = (eng) => {
    try {
      const raw = window.localStorage.getItem(UNREAD_KEY + eng);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  };
  const saveUnread = (eng, value) => {
    try {
      window.localStorage.setItem(UNREAD_KEY + eng, JSON.stringify(value));
    } catch (e) {
    }
  };
  const digestHasNew = (prev, cur) => {
    if (!cur) return false;
    if (!prev) return true;
    const pc = Number(prev.count || 0);
    const cc = Number(cur.count || 0);
    if (cc > pc) return true;
    const pa = prev.at || "";
    const ca = cur.at || "";
    return ca !== "" && ca !== pa && ca > pa;
  };
  const RT_GEOM_KEY = "rt-dock-geom-v1";
  function clampRtGeom(g) {
    const vw = typeof window !== "undefined" && window.innerWidth || 1280;
    const vh = typeof window !== "undefined" && window.innerHeight || 800;
    const w = Math.min(
      Math.max(320, Number(g && g.w) || 620),
      Math.max(320, vw)
    );
    const h3 = Math.min(
      Math.max(240, Number(g && g.h) || 520),
      Math.max(240, vh)
    );
    const x = Math.min(Math.max(0, Number(g && g.x) || 0), Math.max(0, vw - w));
    const y = Math.min(Math.max(0, Number(g && g.y) || 0), Math.max(0, vh - h3));
    return { x, y, w, h: h3 };
  }
  function defaultRtGeom() {
    const vw = typeof window !== "undefined" && window.innerWidth || 1280;
    const vh = typeof window !== "undefined" && window.innerHeight || 800;
    let w = 620;
    try {
      const saved = Number(window.localStorage.getItem("rt-dock-width"));
      if (Number.isFinite(saved) && saved >= 320 && saved <= 1200) w = saved;
    } catch (e) {
    }
    const h3 = Math.max(240, Math.min(640, vh - 24));
    return clampRtGeom({ x: Math.max(0, vw - w - 12), y: 12, w, h: h3 });
  }
  function loadRtGeom() {
    try {
      const raw = JSON.parse(
        window.localStorage.getItem(RT_GEOM_KEY) || "null"
      );
      if (raw && typeof raw === "object") return clampRtGeom(raw);
    } catch (e) {
    }
    return defaultRtGeom();
  }
  function Panel(props) {
    const embedded = !!(props && props.embedded);
    const st = useUI();
    const [engagements, setEngagements] = import_react2.default.useState([]);
    const [eng, setEng] = import_react2.default.useState(null);
    const [snapshot, setSnapshot] = import_react2.default.useState(null);
    const [err, setErr] = import_react2.default.useState(null);
    const [newName, setNewName] = import_react2.default.useState("");
    const [geom, setGeom] = import_react2.default.useState(loadRtGeom);
    const [creating, setCreating] = import_react2.default.useState(false);
    const [refreshKey, setRefreshKey] = import_react2.default.useState(0);
    const [digest, setDigest] = import_react2.default.useState(null);
    const [seen, setSeen] = import_react2.default.useState(null);
    import_react2.default.useEffect(() => {
      if (embedded) return void 0;
      try {
        window.localStorage.setItem(RT_GEOM_KEY, JSON.stringify(geom));
      } catch (e) {
      }
    }, [geom, embedded]);
    import_react2.default.useEffect(() => {
      if (embedded) return void 0;
      const onResize = () => setGeom((g) => clampRtGeom(g));
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [embedded]);
    const loadSnapshot = (id) => {
      if (!id) {
        setSnapshot(null);
        return;
      }
      api({ op: "snapshot", engagement: id }).then(
        (r) => {
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438");
            return;
          }
          setErr(null);
          setSnapshot(r);
        },
        (e) => setErr(String(e && e.message || e))
      );
    };
    const refreshList = (selectId) => {
      api({ op: "bootstrap" }).then(
        (b) => {
          setEngagements(b && b.engagements || []);
          if (selectId) {
            setEng(selectId);
            loadSnapshot(selectId);
          }
        },
        () => {
        }
      );
    };
    import_react2.default.useEffect(() => {
      api({ op: "bootstrap" }).then(
        (r) => {
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041D\u0435\u0442 \u0441\u0432\u044F\u0437\u0438 \u0441 \u0431\u0430\u0437\u043E\u0439 \u0430\u043A\u0442\u0438\u0432\u043E\u0432");
            return;
          }
          setEngagements(r.engagements || []);
          const id = r.current || r.engagements && r.engagements[0] && r.engagements[0].id || null;
          if (id) {
            setEng(id);
            loadSnapshot(id);
          }
        },
        (e) => setErr(String(e && e.message || e))
      );
    }, []);
    const openEngagement = (nameArg) => {
      const name2 = String(nameArg || newName).trim();
      if (!name2) return;
      setCreating(true);
      api({ op: "openEngagement", name: name2 }).then(
        (r) => {
          setCreating(false);
          if (!r || r.ok === false) {
            setErr(r && r.error || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F");
            return;
          }
          setNewName("");
          refreshList(r.engagement && r.engagement.id);
        },
        (e) => {
          setCreating(false);
          setErr(String(e && e.message || e));
        }
      );
    };
    const refreshAll = () => {
      setRefreshKey((k) => k + 1);
      api({ op: "bootstrap" }).then(
        (b) => {
          setEngagements(b && b.engagements || []);
          if (eng) loadSnapshot(eng);
        },
        () => {
          if (eng) loadSnapshot(eng);
        }
      );
    };
    const trackPointer = (e, move) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    };
    const startDrag = (e) => {
      if (e.target && e.target.closest && e.target.closest("button,a,input,select,textarea,label"))
        return;
      const sx = e.clientX;
      const sy = e.clientY;
      const ox = geom.x;
      const oy = geom.y;
      trackPointer(
        e,
        (ev) => setGeom(
          (g) => clampRtGeom({
            x: ox + (ev.clientX - sx),
            y: oy + (ev.clientY - sy),
            w: g.w,
            h: g.h
          })
        )
      );
    };
    const startResizeLeft = (e) => {
      const sx = e.clientX;
      const ox = geom.x;
      const ow = geom.w;
      trackPointer(e, (ev) => {
        const dx = ev.clientX - sx;
        setGeom((g) => clampRtGeom({ x: ox + dx, y: g.y, w: ow - dx, h: g.h }));
      });
    };
    const startResizeRight = (e) => {
      const sx = e.clientX;
      const ow = geom.w;
      trackPointer(
        e,
        (ev) => setGeom(
          (g) => clampRtGeom({ x: g.x, y: g.y, w: ow + (ev.clientX - sx), h: g.h })
        )
      );
    };
    const startResizeBottom = (e) => {
      const sy = e.clientY;
      const oh = geom.h;
      trackPointer(
        e,
        (ev) => setGeom(
          (g) => clampRtGeom({ x: g.x, y: g.y, w: g.w, h: oh + (ev.clientY - sy) })
        )
      );
    };
    const startResizeCorner = (e) => {
      const sx = e.clientX;
      const sy = e.clientY;
      const ow = geom.w;
      const oh = geom.h;
      trackPointer(
        e,
        (ev) => setGeom(
          (g) => clampRtGeom({
            x: g.x,
            y: g.y,
            w: ow + (ev.clientX - sx),
            h: oh + (ev.clientY - sy)
          })
        )
      );
    };
    import_react2.default.useEffect(() => {
      if (!eng) {
        setDigest(null);
        setSeen(null);
        return void 0;
      }
      setSeen(loadUnread(eng));
      let alive = true;
      let digestInflight = false;
      const tick = () => {
        if (digestInflight)
          return;
        digestInflight = true;
        api({ op: "consoleDigest", engagement: eng }).then(
          (r) => {
            if (alive && r && r.ok !== false && r.sections)
              setDigest(r.sections);
          },
          () => {
          }
        ).finally(() => {
          digestInflight = false;
        });
      };
      tick();
      const timer = window.setInterval(tick, 25e3);
      return () => {
        alive = false;
        window.clearInterval(timer);
      };
    }, [eng, refreshKey]);
    const markTabSeen = import_react2.default.useCallback(
      (tab) => {
        if (!eng) return;
        setSeen((prev) => {
          const base = prev || (() => {
            const fresh = {};
            for (const [k, v] of Object.entries(digest || {}))
              fresh[k] = { count: Number(v.count || 0), at: v.at || null };
            return fresh;
          })();
          const next = Object.assign({}, base);
          const cur = digest && digest[tab];
          if (cur)
            next[tab] = { count: Number(cur.count || 0), at: cur.at || null };
          saveUnread(eng, next);
          return next;
        });
      },
      [eng, digest]
    );
    const unreadOf = (tab) => {
      if (!eng || !digest) return false;
      if (!seen) return false;
      return digestHasNew(seen[tab], digest[tab]);
    };
    const stats = snapshot && snapshot.stats || {};
    const tabs = [
      ["assets", "\u041A\u0430\u0440\u0442\u0430 \u0430\u043A\u0442\u0438\u0432\u043E\u0432"],
      ["env", "\u0410\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F"],
      ["agents", "\u0410\u0433\u0435\u043D\u0442\u044B"],
      ["sessions", "\u0421\u0435\u0441\u0441\u0438\u0438 \u0438 \u0442\u0443\u043D\u043D\u0435\u043B\u0438"],
      ["findings", "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u044F\u043C"],
      ["chain", "\u0426\u0435\u043F\u043E\u0447\u043A\u0430 \u0430\u0442\u0430\u043A\u0438"],
      ["scores", "\u0426\u0435\u043B\u0438 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F"],
      ["report", "\u041E\u0442\u0447\u0451\u0442"],
      ["knowledge", "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439"],
      ["skills", "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u043D\u0430\u0432\u044B\u043A\u043E\u0432"]
    ];
    const full = isFullWindow();
    const openFull = () => {
      try {
        window.open(
          window.location.href.split("#")[0] + "#redteam-full",
          "_blank",
          "noopener"
        );
      } catch (e) {
        setErr("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u043E\u0432\u043E\u0435 \u043E\u043A\u043D\u043E: " + (e && e.message || e));
      }
    };
    const exitFull = () => {
      try {
        window.close();
      } catch (e) {
      }
      try {
        if (window.location.hash) {
          window.location.hash = "";
          window.location.reload();
        }
      } catch (e) {
      }
    };
    import_react2.default.useEffect(() => {
      if (!full) return void 0;
      const onKey = (e) => {
        if (e.key === "Escape") exitFull();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [full]);
    let body;
    if (err) body = h2("div", { className: "rt-err" }, err);
    else if (st.tab === "knowledge")
      body = h2(KnowledgeTab, { refreshKey });
    else if (st.tab === "env") body = h2(EnvTab, { refreshKey });
    else if (st.tab === "skills")
      body = h2(SkillsTab, { refreshKey });
    else if (st.tab === "agents" || st.tab === "prompts")
      body = h2(AgentsTab, { engagement: eng, refreshKey });
    else if (!eng) {
      body = h2(
        "div",
        { className: "rt-pane" },
        h2(
          "div",
          { className: "rt-card" },
          h2("h4", null, "\u0426\u0435\u043B\u0435\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442"),
          h2(
            "div",
            {
              style: {
                fontSize: 12,
                color: "var(--dsw-alias-label-secondary)",
                marginBottom: 8
              }
            },
            "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438-\u0446\u0435\u043B\u0438 \u0443\u0447\u0435\u043D\u0438\u0439 \u043F\u043E \u0418\u0411, \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u044F \u0438 \u043D\u0430\u0447\u043D\u0438\u0442\u0435 \u043A\u0430\u0440\u0442\u0443 \u0430\u043A\u0442\u0438\u0432\u043E\u0432."
          ),
          h2(
            "div",
            { style: { display: "flex", gap: 8 } },
            h2("input", {
              className: "rt-input",
              style: { flex: 1 },
              placeholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u041E\u041E\u041E \xAB\u041F\u0440\u0438\u043C\u0435\u0440\xBB",
              value: newName,
              onChange: (e) => setNewName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") openEngagement();
              }
            }),
            h2(
              "button",
              {
                className: "rt-btn rt-btn-primary",
                disabled: creating,
                onClick: () => openEngagement()
              },
              creating ? "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435\u2026" : "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0446\u0435\u043B\u044C"
            )
          )
        )
      );
    } else if (st.tab === "assets")
      body = h2(AssetsTab, {
        engagement: eng,
        snapshot,
        refreshKey,
        onRefresh: refreshAll,
        onData: () => loadSnapshot(eng)
      });
    else if (st.tab === "testing")
      body = h2(AssetsTab, {
        engagement: eng,
        snapshot,
        refreshKey,
        onRefresh: refreshAll,
        onData: () => loadSnapshot(eng)
      });
    else if (st.tab === "sessions")
      body = h2(SessionTab, { engagement: eng, refreshKey });
    else if (st.tab === "findings")
      body = h2(FindingsTab, { engagement: eng, refreshKey });
    else if (st.tab === "chain")
      body = h2(ChainTab, { engagement: eng, refreshKey });
    else if (st.tab === "report")
      body = h2(ReportTab, { engagement: eng, refreshKey });
    else if (st.tab === "attackfiles")
      body = h2(FindingsTab, { engagement: eng, refreshKey });
    else if (st.tab === "scores")
      body = h2(ScoreTab, { engagement: eng, refreshKey });
    else body = h2("div", { className: "rt-empty" }, "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0432\u043A\u043B\u0430\u0434\u043A\u0430");
    const shellProps = full ? { className: "rt-full", style: { display: "flex" } } : embedded ? {
      className: "rt-dock rt-embedded",
      "data-open": "1",
      style: { width: "100%", display: "flex" }
    } : {
      className: "rt-dock",
      "data-open": st.open ? "1" : "0",
      style: {
        left: geom.x + "px",
        top: geom.y + "px",
        right: "auto",
        bottom: "auto",
        width: geom.w + "px",
        height: geom.h + "px",
        display: st.open ? "flex" : "none"
      }
    };
    return h2(
      "div",
      shellProps,
      full || embedded ? null : h2("div", {
        className: "rt-grip",
        title: "\u041F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0448\u0438\u0440\u0438\u043D\u0443",
        onMouseDown: startResizeLeft
      }),
      full || embedded ? null : h2("div", {
        className: "rt-resize-r",
        title: "\u041F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0448\u0438\u0440\u0438\u043D\u0443",
        onMouseDown: startResizeRight
      }),
      full || embedded ? null : h2("div", {
        className: "rt-resize-b",
        title: "\u041F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B\u0441\u043E\u0442\u0443",
        onMouseDown: startResizeBottom
      }),
      full || embedded ? null : h2("div", {
        className: "rt-resize-c",
        title: "\u041F\u043E\u0442\u044F\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440",
        onMouseDown: startResizeCorner
      }),
      h2(
        "div",
        {
          className: "rt-head",
          onMouseDown: full || embedded ? void 0 : startDrag,
          title: full || embedded ? void 0 : "\u0417\u0430\u0436\u043C\u0438\u0442\u0435 \u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u043F\u0430\u043D\u0435\u043B\u044C"
        },
        embedded ? null : h2(
          "div",
          { className: "rt-title" },
          h2("span", { className: "rt-dot" }),
          full ? "\u041F\u043E\u043B\u0438\u0433\u043E\u043D \xB7 \u043F\u043E\u043B\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440" : "\u041F\u043E\u043B\u0438\u0433\u043E\u043D",
          full ? h2(
            "span",
            { className: "rt-tag", style: { marginLeft: 6 } },
            "\u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E"
          ) : null
        ),
        h2(
          "select",
          {
            className: "rt-input rt-eng-select",
            style: {
              maxWidth: embedded ? "100%" : "170px",
              minWidth: embedded ? "160px" : void 0,
              flex: embedded ? "1 1 200px" : void 0
            },
            value: eng || "",
            onChange: (e) => {
              setEng(e.target.value);
              loadSnapshot(e.target.value);
              api({
                op: "activateEngagement",
                engagement: e.target.value
              }).catch(() => {
              });
            }
          },
          h2(
            "option",
            { value: "", disabled: true },
            engagements.length ? "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0446\u0435\u043B\u044C" : "\u0426\u0435\u043B\u0435\u0439 \u043D\u0435\u0442"
          ),
          engagements.map(
            (x) => h2("option", { key: x.id, value: x.id }, x.name || x.id || "\u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F")
          )
        ),
        h2("div", { className: "rt-spacer" }),
        embedded ? null : h2(VersionBar, null),
        full ? h2(
          "button",
          {
            className: "rt-btn",
            title: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043E\u0431\u044B\u0447\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0441 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u044C\u044E (\u0438\u043B\u0438 Esc)",
            onClick: exitFull
          },
          "\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430"
        ) : null,
        embedded ? null : h2(
          "button",
          {
            className: "rt-btn",
            title: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0440\u0435\u0435\u0441\u0442\u0440, \u0441\u043D\u0438\u043C\u043E\u043A \u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
            onClick: refreshAll
          },
          "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
        ),
        full || embedded ? null : h2(
          "button",
          {
            className: "rt-btn",
            title: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u043B\u043D\u0443\u044E \u043A\u043E\u043D\u0441\u043E\u043B\u044C \u0432 \u043D\u043E\u0432\u043E\u043C \u043E\u043A\u043D\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430",
            onClick: openFull
          },
          "\u041F\u043E\u043B\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440"
        ),
        full || embedded ? null : h2(
          "button",
          {
            className: "rt-btn",
            title: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C",
            onClick: () => setUI({ open: false })
          },
          "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"
        )
      ),
      /* Для полосы вкладок используем стандартные роли tablist/tab: скринридер сообщает «какая вкладка и выбрана ли она».
           Пользователь клавиатуры, дойдя Tab, переключается через Enter/Space (даёт clickable). */
      h2(
        "div",
        { className: "rt-tabs", role: "tablist" },
        tabs.map((t) => {
          const activate = () => {
            markTabSeen(t[0]);
            setUI({ tab: t[0] });
            setRefreshKey((k) => k + 1);
          };
          return h2(
            "div",
            Object.assign({}, clickable(activate, { label: t[1] }), {
              key: t[0],
              className: "rt-tab" + (st.tab === t[0] ? " on" : ""),
              role: "tab",
              "aria-selected": st.tab === t[0] ? "true" : "false",
              title: unreadOf(t[0]) ? t[1] + ": \u043F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043D\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0438 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u2014 \u0442\u043E\u0447\u043A\u0430 \u0438\u0441\u0447\u0435\u0437\u043D\u0435\u0442" : t[1]
            }),
            t[1],
            unreadOf(t[0]) ? (
              /* Красная точка — чисто визуальная информация, даём скринридеру текстовую замену */
              h2("span", { className: "rt-tab-dot", "aria-label": "\u0415\u0441\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442" })
            ) : null
          );
        })
      ),
      h2(
        "div",
        { className: "rt-body", key: "body-" + st.tab },
        h2(RtBoundary, { key: st.tab }, body)
      ),
      h2(
        "div",
        { className: "rt-foot" },
        h2("span", null, "C-\u0441\u0435\u0433\u043C\u0435\u043D\u0442\u043E\u0432 " + (stats.segments || 0)),
        h2(
          "span",
          null,
          "\u0410\u043A\u0442\u0438\u0432\u043E\u0432 " + (stats.assets || 0) + " (\u0436\u0438\u0432\u044B\u0445 " + (stats.liveAssets || 0) + ")"
        ),
        h2("span", null, "\u041F\u043E\u0440\u0442\u043E\u0432 " + (stats.openPorts || 0)),
        h2("span", null, "\u0424\u0438\u043D\u0433\u0435\u0440\u043F\u0440\u0438\u043D\u0442\u043E\u0432 " + (stats.fingerprints || 0)),
        h2("span", null, "\u0423\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439 " + (stats.vulns || 0)),
        h2(
          "span",
          null,
          "\u041F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0435/\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0435 " + (stats.passiveSignals || 0) + "/" + (stats.activeSignals || 0)
        ),
        h2("div", { className: "rt-spacer" }),
        full ? h2("span", null, "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 Esc \u0438\u043B\u0438 \xAB\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430\xBB \u0441\u043F\u0440\u0430\u0432\u0430 \u0441\u0432\u0435\u0440\u0445\u0443, \u0447\u0442\u043E\u0431\u044B \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0443 \u0441 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u044C\u044E") : null,
        h2(
          "span",
          null,
          "SQLite \xB7 " + (snapshot && snapshot.engagement ? snapshot.engagement.name : "")
        )
      )
    );
  }
  function SidebarButton(props) {
    const st = useUI();
    return h2(
      "button",
      {
        className: "rt-icon-btn" + (st.open ? " on" : ""),
        title: "\u041A\u043E\u043D\u0441\u043E\u043B\u044C RedTeam (\u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u0430\u044F \u0432 \u043F\u0440\u0430\u0432\u043E\u0439 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u0438)",
        onClick: () => setUI({ open: !st.open })
      },
      h2("span", { style: { fontSize: 14 } }, "\u26E8"),
      props.wide ? h2("span", null, "RedTeam") : null
    );
  }
  function HeaderButton() {
    const st = useUI();
    return h2(
      "button",
      {
        className: "rt-hbtn" + (st.open ? " on" : ""),
        title: "\u041A\u043E\u043D\u0441\u043E\u043B\u044C RedTeam (\u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u0430\u044F \u0432 \u043F\u0440\u0430\u0432\u043E\u0439 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u0438)",
        onClick: () => setUI({ open: !st.open })
      },
      "\u26E8 RedTeam"
    );
  }
  function FullButton(props) {
    const open = () => {
      try {
        window.open(
          window.location.href.split("#")[0] + "#redteam-full",
          "_blank",
          "noopener"
        );
      } catch {
      }
    };
    return h2(
      "button",
      {
        className: "rt-icon-btn",
        title: "\u041F\u043E\u043B\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440: \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u043B\u043D\u0443\u044E \u043A\u043E\u043D\u0441\u043E\u043B\u044C \u0432 \u043D\u043E\u0432\u043E\u043C \u043E\u043A\u043D\u0435 (\u0442\u0435\u043A\u0443\u0449\u0435\u0435 \u043E\u043A\u043D\u043E \u043D\u0435 \u0437\u0430\u0442\u0440\u0430\u0433\u0438\u0432\u0430\u0435\u0442\u0441\u044F; \u0432 \u043D\u043E\u0432\u043E\u043C \u043E\u043A\u043D\u0435 \u0432\u044B\u0439\u0434\u0438\u0442\u0435 \u043F\u043E Esc)",
        onClick: open
      },
      h2("span", { style: { fontSize: 14 } }, "\u26F6"),
      props.wide ? h2("span", null, "\u041F\u043E\u043B\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440") : null
    );
  }
  const inject2 = ["slots"];
  function applyDrillParts() {
    return {
      CSS,
      Panel,
      setUI,
      useUI,
      isFullWindow,
      setDockWidth
    };
  }
  exports.inject = inject2;
  return applyDrillParts();
})();

// src/state/dock.js
var AUTH_KEY = "dsh-purge-drill-auth";
var drillGrantGen = 0;
var drillGrantPosting = 0;
var drillGrantState = { ready: false, granted: false };
var drillSyncRetryTimer = null;
function readDrillAuth() {
  if (drillGrantState.ready) return drillGrantState.granted;
  try {
    return window.localStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}
function setDrillAuthLocal(ok) {
  try {
    if (ok) window.localStorage.setItem(AUTH_KEY, "1");
    else window.localStorage.removeItem(AUTH_KEY);
  } catch {
  }
  drillGrantState = { ready: true, granted: !!ok };
}
function writeDrillAuth(ok) {
  drillGrantGen += 1;
  const gen = drillGrantGen;
  setDrillAuthLocal(ok);
  if (!ok) return;
  drillGrantPosting += 1;
  fetch("/dsh-purge/drill-grant", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}"
  }).then((r) => r.json()).then((saved) => {
    if (gen !== drillGrantGen) return;
    setDrillAuthLocal(!!(saved && saved.granted));
  }).catch(() => {
  }).finally(() => {
    drillGrantPosting = Math.max(0, drillGrantPosting - 1);
  });
}
function startGrantSync() {
  syncDrillGrant();
  return () => {
    drillGrantGen += 1;
    if (drillSyncRetryTimer) clearTimeout(drillSyncRetryTimer);
    drillSyncRetryTimer = null;
  };
}
function syncDrillGrant(attempt) {
  const n = attempt || 0;
  const gen = drillGrantGen;
  if (drillSyncRetryTimer) {
    try {
      clearTimeout(drillSyncRetryTimer);
    } catch {
    }
    drillSyncRetryTimer = null;
  }
  fetch("/dsh-purge/drill-grant", { method: "GET" }).then((r) => r.json()).then((r) => {
    if (gen !== drillGrantGen) return;
    if (!r || r.ok === false) throw new Error("grant");
    if (r.granted) {
      setDrillAuthLocal(true);
      if (dockBus.authOpen) setDock({ authOpen: false });
      return;
    }
    if (drillGrantPosting > 0) return;
    setDrillAuthLocal(false);
    if (dockBus.authOpen || dockBus.tab === "drill") {
      setDock({
        open: true,
        tab: "drill",
        authOpen: true,
        pending: dockBus.pending || "tab"
      });
    }
  }).catch(() => {
    if (gen !== drillGrantGen) return;
    if (n < 5) {
      drillSyncRetryTimer = window.setTimeout(() => {
        drillSyncRetryTimer = null;
        syncDrillGrant(n + 1);
      }, 400);
    }
  });
}
var dockBus = {
  open: false,
  tab: "clean",
  authOpen: false,
  pending: "tab",
  listeners: /* @__PURE__ */ new Set()
};
function setDock(patch) {
  dockBus = Object.assign({}, dockBus, patch);
  if (patch.open && nativeSidebar) {
    try {
      nativeSidebar.openTab("dsh-purge");
    } catch {
    }
  }
  dockBus.listeners.forEach((fn) => {
    try {
      fn(dockBus);
    } catch {
    }
  });
}
function useDock() {
  const [st, setSt] = useState(dockBus);
  useEffect(() => {
    const fn = (next) => setSt(next);
    dockBus.listeners.add(fn);
    return () => {
      dockBus.listeners.delete(fn);
    };
  }, []);
  return st;
}
function requestDrill(kind) {
  const pending = kind || "tab";
  const openEnv = () => {
    try {
      if (__dshPurgeDrill && __dshPurgeDrill.setUI) {
        __dshPurgeDrill.setUI({ open: true, tab: "env" });
      }
    } catch {
    }
  };
  if (readDrillAuth()) {
    setDock({ open: true, tab: "drill", authOpen: false, pending: "tab" });
    try {
      if (__dshPurgeDrill && __dshPurgeDrill.setUI)
        __dshPurgeDrill.setUI({ open: true });
    } catch {
    }
    if (pending === "env") openEnv();
    if (pending === "full") {
      try {
        window.open(
          window.location.href.split("#")[0] + "#redteam-full",
          "_blank",
          "noopener"
        );
      } catch {
      }
    }
    return;
  }
  setDock({ open: true, tab: "drill", authOpen: true, pending });
}
function requestDrillEnv() {
  requestDrill("env");
}
var nativeSidebar = null;

// src/components/auth.js
var rd = __toESM(require("react-dom"), 1);

// src/shared/locale.js
var NS = "settings.dsh-purge-panel";
var translate = (key) => key;
function setTranslate(t) {
  translate = t;
}
function useT() {
  return translate;
}
var ru = {
  nav: "\u041F\u0440\u0430\u0432\u0438\u043B\u0430",
  "dock.clean": "\u041E\u0447\u0438\u0441\u0442\u043A\u0430",
  "dock.drill": "\u041F\u043E\u043B\u0438\u0433\u043E\u043D",
  "dock.toggle": "dsh-purge",
  "dock.newSession": "dsh-purge",
  "dock.inSession": "dsh-purge",
  "dock.redteam": "\u0420\u0435\u0436\u0438\u043C RedTeam",
  "dock.full": "\u041F\u043E\u043B\u043D\u044B\u0439 \u043E\u0431\u0437\u043E\u0440",
  "dock.close": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
  "dock.unauthorized": "\u041D\u0435\u0442 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
  "welcome.title": "\u041F\u0430\u043C\u044F\u0442\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E",
  "welcome.lead": "\u041F\u0440\u043E\u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u044D\u0442\u043E \u043F\u0440\u0438 \u043F\u0435\u0440\u0432\u043E\u043C \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u0430. \u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043E\u043A\u043D\u043E \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F.",
  "welcome.warn": "\u041F\u043B\u0430\u0433\u0438\u043D \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439 \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0439. \u0417\u0430 \u043B\u044E\u0431\u0443\u044E \u043F\u0440\u043E\u0434\u0430\u0436\u0443 \u0431\u0435\u0437 \u0432\u0435\u0434\u043E\u043C\u0430 \u0430\u0432\u0442\u043E\u0440\u0430, \u043F\u043B\u0430\u0442\u043D\u0443\u044E \u043F\u0435\u0440\u0435\u043F\u0440\u043E\u0434\u0430\u0436\u0443 \u0438\u043B\u0438 \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435 \u043F\u0440\u0438\u0431\u044B\u043B\u0438 \u0438\u0437 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0430\u0432\u0442\u043E\u0440 \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0451\u0442 \u0432\u0438\u043D\u043E\u0432\u043D\u044B\u0445 \u043A \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043F\u043E \u0437\u0430\u043A\u043E\u043D\u0443.",
  "welcome.body": "dsh-purge \u2014 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u043B\u0430\u0433\u0438\u043D \u043E\u0446\u0435\u043D\u043A\u0438 RedTeam \u0438 \u043E\u0447\u0438\u0441\u0442\u043A\u0438 \u0434\u043B\u044F DeepSeek Harness: \u0432 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u043E\u0439 \u0441\u0440\u0435\u0434\u0435 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u044B \u043E\u043D \u043F\u0440\u0430\u0432\u0438\u0442 \u043F\u0440\u043E\u043C\u043F\u0442\u044B \u0438 \u043F\u0430\u0442\u0447\u0438 \u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u0443\u0447\u0435\u043D\u0438\u044F \u0432 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u0440\u0430\u043C\u043A\u0430\u0445. \u041F\u0440\u043E\u0435\u043A\u0442 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439, \u043D\u0435\u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0439, \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439:",
  "welcome.repo": "https://github.com/YuJunZhiXue/dsh-purge",
  "welcome.ban1": "\u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442 \u0434\u043B\u044F \u043D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0441\u0435\u0442\u0435\u0432\u044B\u0445 \u0430\u0442\u0430\u043A, \u0432\u0442\u043E\u0440\u0436\u0435\u043D\u0438\u0439, \u043A\u0440\u0430\u0436\u0438 \u0434\u0430\u043D\u043D\u044B\u0445, \u0440\u0430\u0437\u0440\u0443\u0448\u0435\u043D\u0438\u044F \u0441\u0438\u0441\u0442\u0435\u043C \u0438 \u043B\u044E\u0431\u044B\u0445 \u043F\u0440\u0430\u0432\u043E\u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0439.",
  "welcome.ban2": "\u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0434\u0430\u0436\u0430, \u043F\u043B\u0430\u0442\u043D\u0430\u044F \u043F\u0435\u0440\u0435\u043F\u0440\u043E\u0434\u0430\u0436\u0430, \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435 \u043F\u0440\u0438\u0431\u044B\u043B\u0438 \u0432 \u0441\u0435\u0440\u043E\u0439 \u0438 \u0442\u0435\u043D\u0435\u0432\u043E\u0439 \u0441\u0444\u0435\u0440\u0435, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043F\u043B\u0430\u0442\u043D\u043E\u0435 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0431\u0435\u0437 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u044F \u0430\u0432\u0442\u043E\u0440\u0430.",
  "welcome.ban3": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0431\u044F\u0437\u0430\u043D \u0441\u0430\u043C \u0441\u043E\u0431\u043B\u044E\u0434\u0430\u0442\u044C \u0437\u0430\u043A\u043E\u043D\u044B \u0441\u0432\u043E\u0435\u0433\u043E \u0440\u0435\u0433\u0438\u043E\u043D\u0430 \u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438; \u0437\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u044F \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0439 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043E\u043D \u0441\u0430\u043C, \u0430 \u043D\u0435 \u0430\u0432\u0442\u043E\u0440.",
  "welcome.bans": "\u0417\u0430\u043F\u0440\u0435\u0442\u044B",
  "welcome.check": "\u041F\u0430\u043C\u044F\u0442\u043A\u0430 \u0432\u044B\u0448\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u0430 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u0430; \u043E\u0431\u044F\u0437\u0443\u044E\u0441\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D \u043F\u0440\u0430\u0432\u043E\u043C\u0435\u0440\u043D\u043E.",
  "welcome.ok": "\u041F\u043E\u043D\u044F\u0442\u043D\u043E, \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u044E",
  "auth.title": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u0430",
  "auth.lead": "\u0414\u043B\u044F \u043E\u0447\u0438\u0441\u0442\u043A\u0438 \u044D\u0442\u043E\u0442 \u0448\u0430\u0433 \u043D\u0435 \u043D\u0443\u0436\u0435\u043D. \u041F\u0440\u0438 \u043F\u0435\u0440\u0432\u043E\u043C \u0432\u0445\u043E\u0434\u0435 \u0432 \u043F\u043E\u043B\u0438\u0433\u043E\u043D \u0438\u043B\u0438 \u043F\u0440\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u043E\u0431\u0437\u043E\u0440\u0430 \u044D\u0442\u043E \u043E\u043A\u043D\u043E \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E.",
  "auth.warn": "\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435: \u043F\u043E\u043B\u0438\u0433\u043E\u043D \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043C\u0430\u0448\u0438\u043D, \u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u0432\u044B \u0432\u043F\u0440\u0430\u0432\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C, \u043E\u0444\u043B\u0430\u0439\u043D\u043E\u0432\u044B\u0445 \u0446\u0435\u043B\u0435\u0439 \u0438 \u0441\u0440\u0435\u0434 \u0441 \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u044B\u043C \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435\u043C. \u041D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0435\u043D\u0442\u0435\u0441\u0442\u044B, \u0430\u0442\u0430\u043A\u0438, \u043A\u0440\u0430\u0436\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u0440\u0430\u0437\u0440\u0443\u0448\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u044B \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E.",
  "auth.hint.wait": "\u041F\u0440\u043E\u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435. \u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043C\u043E\u0436\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {n} \u0441.",
  "auth.hint.scroll": "\u041E\u0442\u0441\u0447\u0451\u0442 \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0441\u044F. \u041F\u0440\u043E\u043A\u0440\u0443\u0442\u0438\u0442\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0434\u043E \u043A\u043E\u043D\u0446\u0430 \u0438 \u043E\u0442\u043C\u0435\u0442\u044C\u0442\u0435.",
  "auth.hint.check": "\u041E\u0442\u0441\u0447\u0451\u0442 \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0441\u044F. \u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u0432\u0441\u0435 \u0442\u0440\u0438 \u043F\u0443\u043D\u043A\u0442\u0430.",
  "auth.check.read": "\u042F \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043B \xAB\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043E \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0438 \u0437\u0430\u043F\u0440\u0435\u0442\u0435 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u044B\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439\xBB \u0438 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u0432\u0441\u0435 \u0435\u0433\u043E \u0443\u0441\u043B\u043E\u0432\u0438\u044F.",
  "auth.check.scope": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044E, \u0447\u0442\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E \u043F\u043B\u0430\u0433\u0438\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u043E\u0439 \u0441\u0440\u0435\u0434\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435, \u043D\u0430 \u043E\u0444\u043B\u0430\u0439\u043D\u043E\u0432\u044B\u0445 \u0446\u0435\u043B\u044F\u0445 \u0438\u043B\u0438 \u0432 \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u044B\u0445 \u0443\u0447\u0435\u043D\u0438\u044F\u0445.",
  "auth.check.ban": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044E \u0437\u0430\u043F\u0440\u0435\u0442 \u043B\u044E\u0431\u043E\u0433\u043E \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0433\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F. \u0411\u0435\u0437 \u044D\u0442\u043E\u0439 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u043E\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0435\u043B\u044C\u0437\u044F.",
  "auth.no": "\u041F\u043E\u043A\u0430 \u043D\u0435 \u0432\u0445\u043E\u0434\u0438\u0442\u044C",
  "auth.ok": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E",
  "auth.ok.tab": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0438 \u0432\u043E\u0439\u0442\u0438 \u0432 \u043F\u043E\u043B\u0438\u0433\u043E\u043D",
  "auth.ok.full": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0438 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043F\u043E\u043B\u043D\u044B\u0439 \u043E\u0431\u0437\u043E\u0440",
  "auth.ok.env": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044E \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F",
  "envGate.title": "\u041E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0435 \u0435\u0449\u0451 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043E",
  "envGate.lead": "\u041F\u0435\u0440\u0435\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u043E\u0439 \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 RedTeam \u043D\u0443\u0436\u043D\u044B \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B. \u0415\u0441\u043B\u0438 \u0440\u0430\u0431\u043E\u0447\u0435\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E, \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0440\u043E\u0439\u0434\u0438\u0442\u0435 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044E \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435, \u0447\u0442\u043E \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0435.",
  "envGate.kaliHint": "\u0415\u0441\u043B\u0438 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 Kali, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u043F\u0443\u0442\u0438 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0443\u0436\u043D\u043E. \u0411\u0435\u0437 Kali \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0443\u0442\u0438 \u043A \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C \u0432 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u0438 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0430\u043F\u043A\u0443 \u0441 \u043F\u0430\u043A\u0435\u0442\u043E\u043C \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u0440\u0430\u0437\u0431\u043E\u0440\u0430.",
  "envGate.skip": "\u041F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C",
  "envGate.skipConfirm": "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0434\u0438\u0430\u043B\u043E\u0433 \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C. \u041D\u0430\u0432\u044B\u043A\u0438 \u0441\u043A\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0430\u0446\u0438\u0438 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0438\u0437-\u0437\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u044F \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432; \u043F\u0443\u0442\u0438 \u043C\u043E\u0436\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0437\u0436\u0435 \u0432 dsh-purge \u2192 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F.",
  "envGate.skipNo": "\u041D\u0430\u0437\u0430\u0434",
  "envGate.skipYes": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C: \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C",
  "envGate.go": "\u041A \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u0438 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F",
  "compat.host": "dsh-purge Community {version} \xB7 \u0445\u043E\u0441\u0442 DSH {host} \xB7 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438: {level}",
  "compat.loading": "\u0427\u0438\u0442\u0430\u0435\u043C \u0432\u0435\u0440\u0441\u0438\u044E \u0445\u043E\u0441\u0442\u0430\u2026",
  "compat.unavailable": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438 \u0445\u043E\u0441\u0442\u0430: {error}",
  "compat.level.qualified": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E \u0440\u0435\u0433\u0440\u0435\u0441\u0441\u0438\u0435\u0439",
  "compat.level.unverified": "\u041D\u0435\u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F",
  "compat.level.mixed": "\u0412\u0435\u0440\u0441\u0438\u0438 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u0440\u0430\u0441\u0445\u043E\u0434\u044F\u0442\u0441\u044F",
  "compat.level.no-host": "\u0425\u043E\u0441\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D",
  "compat.level.unknown": "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
  "theme.aria": "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435",
  "theme.white": "\u0421\u0432\u0435\u0442\u043B\u0430\u044F",
  "theme.ink": "\u0422\u0451\u043C\u043D\u0430\u044F",
  "purge.title": "\u041F\u0430\u0442\u0447\u0438",
  "override.title": "\u041F\u0440\u043E\u043C\u043F\u0442",
  "own.title": "\u0421\u0432\u043E\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u044B",
  "own.hint": "\u041F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 IP \u0438\u043B\u0438 \u043F\u043E\u043B\u043D\u043E\u043C\u0443 \u0438\u043C\u0435\u043D\u0438 \u0445\u043E\u0441\u0442\u0430 \u0432 \u0441\u0442\u0440\u043E\u043A\u0435. \u0414\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F \u0437\u0430\u043F\u0438\u0441\u044C \u0432\u0438\u0434\u0430 \u0430\u043A\u043A\u0430\u0443\u043D\u0442@\u0445\u043E\u0441\u0442, \u0433\u0434\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u043D\u0443\u0436\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0432\u0430\u043D\u0438\u044F \u0442\u0430\u043A\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438. \u0418\u043C\u044F \u0445\u043E\u0441\u0442\u0430 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u0430\u0434\u0440\u0435\u0441\u043E\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043E\u043D\u043E \u0442\u043E\u0433\u0434\u0430 \u0440\u0435\u0437\u043E\u043B\u0432\u0438\u043B\u043E. \u041D\u0435 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u043A\u043B\u044E\u0447\u0438, \u043F\u0430\u0440\u043E\u043B\u0438 \u0438 \u043F\u043E\u0434\u0441\u0435\u0442\u0438.",
  "own.save": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A",
  "saved.own": "\u0421\u0432\u043E\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B",
  "saved.own.dropped": "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E. {n} \u0441\u0442\u0440\u043E\u043A \u043D\u0435 \u0431\u044B\u043B\u0438 \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u043C IP \u0438\u043B\u0438 \u0438\u043C\u0435\u043D\u0435\u043C \u0445\u043E\u0441\u0442\u0430 \u0438 \u043E\u0442\u0431\u0440\u043E\u0448\u0435\u043D\u044B",
  "metric.purged": "\u0417\u0430\u043F\u0438\u0441\u0430\u043D\u043E",
  "metric.purged.skip": "\u0417\u0430\u043F\u0438\u0441\u0430\u043D\u043E. \u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E {n} \u0448\u0442.: \u044D\u0442\u0438\u0445 \u0444\u0430\u0439\u043B\u043E\u0432 \u043D\u0430 \u043C\u0430\u0448\u0438\u043D\u0435 \u043D\u0435\u0442",
  "metric.pendingShort": "\u0412 \u043E\u0447\u0435\u0440\u0435\u0434\u0438 {n}",
  "metric.unmatchedShort": "\u041D\u0435 \u0441\u043E\u0432\u043F\u0430\u043B\u043E {n}",
  "metric.partialShort": "\u0427\u0430\u0441\u0442\u0438\u0447\u043D\u043E {n}",
  "metric.skipShort": "\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E {n}",
  "metric.unlocated.count": "\u2014",
  "metric.shim": "shim",
  "metric.shim.na": "\u041D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u043D\u0435 \u043D\u0443\u0436\u043D\u043E",
  "metric.bak.yes": "\u0415\u0441\u0442\u044C \u043A\u043E\u043F\u0438\u044F",
  "metric.bak.no": "\u041D\u0435\u0442 \u043A\u043E\u043F\u0438\u0438",
  "metric.bak.hint": "\u0420\u0435\u0437\u0435\u0440\u0432\u043D\u0430\u044F \u043A\u043E\u043F\u0438\u044F",
  "table.patch": "\u041F\u0443\u043D\u043A\u0442",
  "table.status": "\u0421\u0442\u0430\u0442\u0443\u0441",
  "status.applied": "\u041F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u043E",
  "status.off": "\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  "status.pending": "\u0416\u0434\u0451\u0442 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
  "status.unmatched": "\u041D\u0435 \u0441\u043E\u0432\u043F\u0430\u043B\u043E",
  "status.partial": "\u0427\u0430\u0441\u0442\u0438\u0447\u043D\u043E",
  "status.partialDetail": " ({done}/{total} \u0446\u0435\u043B\u0435\u0439)",
  "status.skipped": "\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E",
  "apply.hint": "\u041D\u0430\u0436\u0430\u0442\u0438\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB \u0441\u0442\u0430\u0432\u0438\u0442 \u043F\u0430\u0442\u0447\u0438 \u0438 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u0442 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u043C\u043F\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E: \u0435\u0441\u043B\u0438 \u0432 \u043F\u043E\u043B\u0435 \u0432\u0441\u0451 \u0435\u0449\u0451 \u0441\u0442\u0430\u0440\u044B\u0439 \u0434\u0435\u0444\u043E\u043B\u0442 \u043F\u043B\u0430\u0433\u0438\u043D\u0430, \u043E\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u0432 \u0437\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u043E\u043C \u0441\u043B\u043E\u0442\u0435, \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E. \u041D\u0430 \u0434\u0438\u0441\u043A \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0448 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0438\u0437 \u043F\u043E\u043B\u044F. \xAB\u0416\u0434\u0451\u0442 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F\xBB \u2014 \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B \u0435\u0449\u0451 \u043D\u0430 \u043C\u0435\u0441\u0442\u0435. \xAB\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E\xBB \u2014 \u044D\u0442\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u043D\u0435 \u043D\u0443\u0436\u043D\u043E \u0438\u043B\u0438 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 \u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D.",
  "warn.noRoot": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 @deepseek-ai \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0445\u043E\u0441\u0442\u0430, \u043E\u0447\u0438\u0441\u0442\u043A\u0430 \u043D\u0435 \u043F\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442. \u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0432\u044B\u0439\u0434\u0438\u0442\u0435 \u0438 \u0441\u043D\u043E\u0432\u0430 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u044D\u0442\u043E\u0442 \u0445\u043E\u0441\u0442, \u0437\u0430\u0442\u0435\u043C \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB. \u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043D\u0430 \u0434\u0435\u0441\u043A\u0442\u043E\u043F\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043D\u0430 \u043B\u044E\u0431\u043E\u043C \u0434\u0438\u0441\u043A\u0435; \u0438\u043C\u044F \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C DeepseekHarness \u0438\u043B\u0438 DeepSeek Harness.",
  "warn.noRoot.desktop": "\u041A\u043E\u0434 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u043B\u0435\u0436\u0438\u0442 \u0432 app.asar. \u041D\u0430\u0436\u0430\u0442\u0438\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB \u0440\u0430\u0441\u043F\u0430\u043A\u0443\u0435\u0442 \u0435\u0433\u043E \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442 \u0441\u0430\u043C\u043E, \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u0441\u043A\u0440\u0438\u043F\u0442 \u043D\u0435 \u043D\u0443\u0436\u0435\u043D. \u0415\u0441\u043B\u0438 \u0445\u043E\u0441\u0442 \u0442\u0430\u043A \u0438 \u043D\u0435 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F, \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0432\u044B\u0439\u0434\u0438\u0442\u0435 \u0438\u0437 \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0433\u043E \u0437\u0430\u043D\u043E\u0432\u043E \u0438 \u0441\u043D\u043E\u0432\u0430 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB. \u0414\u043B\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0435\u0433\u043E DSH Desktop \u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB \u0441\u0440\u0430\u0437\u0443.",
  "unpack.restarting": "\u041F\u0430\u0442\u0447\u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B. \u041F\u043E\u0441\u043B\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u044F \xAB\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C\xBB \u043A\u043B\u0438\u0435\u043D\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u0441\u0430\u043C.",
  "restart.fullQuit": "\u0418\u0434\u0451\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A, \u043A\u043B\u0438\u0435\u043D\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u0441\u0430\u043C.",
  "warn.noInject": "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0445\u043E\u0441\u0442 \u0432\u0441\u0435\u0433\u0434\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u043F\u0440\u043E\u043C\u043F\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E. \u0415\u0441\u043B\u0438 \u0432 RedTeam \u0432\u043A\u043B\u044E\u0447\u0451\u043D \u043D\u0430\u0431\u043E\u0440 \u043F\u0440\u0430\u0432\u0438\u043B, \u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u043D; \u0435\u0441\u043B\u0438 \u043D\u0435\u0442 \u2014 \u043F\u0440\u043E\u043C\u043F\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0431\u0435\u0437 CTF, \u043A \u043A\u043E\u0442\u043E\u0440\u043E\u043C\u0443 \u0437\u0430\u0442\u0435\u043C \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F RedTeam. \u0415\u0441\u043B\u0438 \u043F\u0443\u0441\u0442\u043E \u0438 \u0442\u0430\u043C \u0438 \u0442\u0430\u043C, \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u043C\u043F\u0442.",
  "need.prompt": "\u041F\u0440\u043E\u043C\u043F\u0442\u044B \u0438 \u043D\u0430\u0431\u043E\u0440\u044B \u043F\u0440\u0430\u0432\u0438\u043B \u043F\u0443\u0441\u0442\u044B \u2014 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0440\u043E\u043C\u043F\u0442 \u0438\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043D\u0435\u043F\u0443\u0441\u0442\u043E\u0439 \u043D\u0430\u0431\u043E\u0440 \u043F\u0440\u0430\u0432\u0438\u043B.",
  "btn.restoreInject": "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
  "saved.restoreInject": "\u041F\u0440\u043E\u043C\u043F\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D",
  skip: "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
  unknown: "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
  delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  "btn.apply": "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
  "btn.apply.busy": "\u0412\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F\u2026",
  "btn.revert": "\u041E\u0442\u043A\u0430\u0442\u0438\u0442\u044C",
  "btn.uninstall": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  "btn.uninstall.busy": "\u0423\u0434\u0430\u043B\u044F\u0435\u043C\u2026",
  "uninstall.title": "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 dsh-purge",
  "uninstall.body": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C? \u041F\u043B\u0430\u0433\u0438\u043D \u0432\u0435\u0440\u043D\u0451\u0442\u0441\u044F \u043A \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C\u0443 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044E, \u0432\u0441\u0435 \u0435\u0433\u043E \u0444\u0430\u0439\u043B\u044B \u0438 \u043F\u0430\u0442\u0447\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.",
  "uninstall.confirm": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435",
  "uninstall.cancel": "\u041E\u0442\u043C\u0435\u043D\u0430",
  "uninstall.applying": "\u0423\u0434\u0430\u043B\u044F\u0435\u043C \u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u043C\u2026",
  "uninstall.done": "\u0423\u0434\u0430\u043B\u0435\u043D\u043E \u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E, \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u2026",
  "uninstall.done.desktop": "\u0423\u0434\u0430\u043B\u0435\u043D\u043E \u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E, \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",
  "uninstall.fail": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F: {error}",
  "btn.checkUpdate": "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F",
  "btn.checkUpdate.busy": "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026",
  "btn.doUpdate": "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C",
  "btn.doUpdate.busy": "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u043C\u2026",
  "channel.title": "\u041A\u0430\u043D\u0430\u043B",
  "channel.stable": "\u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0430\u044F",
  "channel.beta": "\u0411\u0435\u0442\u0430",
  "channel.useStable": "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0443\u044E",
  "channel.useBeta": "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0431\u0435\u0442\u0443",
  "channel.local": "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F",
  "update.checking": "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F\u2026",
  "update.applying": "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u043C\u2026",
  "update.switching": "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0435\u043C \u0432\u0435\u0440\u0441\u0438\u044E\u2026",
  "update.latest": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0432\u0435\u0440\u0441\u0438\u044F ({version})",
  "update.available": "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0432\u0435\u0440\u0441\u0438\u044F {remote}, \u0441\u0435\u0439\u0447\u0430\u0441 {local}",
  "update.pinned": "\u0417\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E \u043D\u0430 {version}, \u0432 \u043A\u0430\u043D\u0430\u043B\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u2014 {remote}",
  "update.done": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u0434\u043E {version}",
  "update.restarting": "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u043D\u043E\u0432\u044B\u0435 \u043F\u0430\u0442\u0447\u0438, \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u2026",
  "update.fullQuit": "\u041F\u0430\u0442\u0447\u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B. \u041F\u043E\u0441\u043B\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u044F \xAB\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C\xBB \u043A\u043B\u0438\u0435\u043D\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u0441\u0430\u043C.",
  "restart.official.title": "\u041D\u0443\u0436\u0435\u043D \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A",
  "restart.official.body": "\u041F\u0430\u0442\u0447\u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B. \u041F\u043E\u0441\u043B\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u044F \xAB\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C\xBB \u043A\u043B\u0438\u0435\u043D\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u0441\u0430\u043C.",
  "update.switched": "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043D\u0430 {version}",
  "update.autoDone": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u0434\u043E {version}",
  "update.reloading": "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u043C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A\u2026",
  "update.dirty": "\u0415\u0441\u0442\u044C \u043D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F, \u043D\u043E \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043D\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
  "update.fail": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F: {error}",
  "update.timeout": "\u0422\u0430\u0439\u043C-\u0430\u0443\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438, \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F\xBB \u0435\u0449\u0451 \u0440\u0430\u0437",
  "update.needRestart": "\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 dsh, \u0437\u0430\u0442\u0435\u043C \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F\xBB",
  "update.noBeta": "\u0411\u0435\u0442\u0430-\u0432\u0435\u0440\u0441\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
  "update.switch": "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F \u043D\u0430 \u044D\u0442\u0443 \u0432\u0435\u0440\u0441\u0438\u044E",
  "update.pick": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0435\u0440\u0441\u0438\u044E",
  "update.tip": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F",
  "update.current": "\u0422\u0435\u043A\u0443\u0449\u0430\u044F",
  "update.confirmSwitch": "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F \u043D\u0430 {version}? \u041F\u043E\u0442\u043E\u043C \u043C\u043E\u0436\u043D\u043E \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0434\u0440\u0443\u0433\u043E\u0439 \u043A\u0430\u043D\u0430\u043B \u0438\u043B\u0438 \u0438\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E. \u041D\u0435\u0437\u0430\u043A\u043E\u043C\u043C\u0438\u0447\u0435\u043D\u043D\u044B\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F.",
  "update.confirmChannel": "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F \u043D\u0430 {version}? \u041F\u043B\u0430\u0433\u0438\u043D \u0431\u0443\u0434\u0435\u0442 \u043F\u0435\u0440\u0435\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u0441 \u044D\u0442\u043E\u0433\u043E \u043A\u0430\u043D\u0430\u043B\u0430; \u043D\u0435\u0437\u0430\u043A\u043E\u043C\u043C\u0438\u0447\u0435\u043D\u043D\u044B\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F.",
  "metric.version": "\u0412\u0435\u0440\u0441\u0438\u044F",
  "action.apply": "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
  "action.revert": "\u041E\u0442\u043A\u0430\u0442\u0438\u0442\u044C",
  "action.uninstall": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  "ok.done": "\u0413\u043E\u0442\u043E\u0432\u043E",
  "err.action": "\u041E\u0448\u0438\u0431\u043A\u0430: {error}",
  "err.status": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F: {error}",
  "err.override": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F: {error}",
  "err.rules": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F: {error}",
  "err.read": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F: {error}",
  "err.save": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F: {error}",
  "btn.saveInject": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  "saved.override": "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E",
  "rules.title": "\u041D\u0430\u0431\u043E\u0440\u044B \u043F\u0440\u0430\u0432\u0438\u043B",
  "rules.none": "\u041D\u0435\u0442",
  "rules.reset": "\u041E\u0442\u043A\u0430\u0442\u0438\u0442\u044C",
  "rules.reset.confirm": "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0439? \u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u043F\u0440\u0430\u0432\u0438\u043B \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F.",
  "rules.empty": "\u041F\u0440\u0430\u0432\u0438\u043B \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
  "rules.pick": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E",
  "policy.title": "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0430",
  "policy.strict": "\u0421\u0442\u0440\u043E\u0433\u0430\u044F",
  "policy.fallback": "\u0420\u0435\u0437\u0435\u0440\u0432 \u043F\u0440\u0438 \u043F\u0443\u0441\u0442\u043E\u043C \u043F\u043E\u043B\u0435",
  "policy.always": "\u0412\u0441\u0435\u0433\u0434\u0430 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u0442\u044C",
  "policy.hint": "\u0421\u0442\u0440\u043E\u0433\u0430\u044F: \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u044B\u0440\u0435\u0437\u0430\u0435\u0442 AGENTS.md / CLAUDE.md; \u0440\u0435\u0437\u0435\u0440\u0432 \u043F\u0440\u0438 \u043F\u0443\u0441\u0442\u043E\u043C \u043F\u043E\u043B\u0435: \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F, \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u0435 \u043F\u0440\u043E\u043C\u043F\u0442\u0430 \u043F\u0443\u0441\u0442\u043E\u0435; \u0432\u0441\u0435\u0433\u0434\u0430 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u0442\u044C: \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0440\u043E\u0434\u043D\u043E\u0435 \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 DSH",
  "cwd.title": "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 (\u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433)",
  "cwd.empty": "\u0412 \u0442\u0435\u043A\u0443\u0449\u0435\u043C \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0435 \u043D\u0435\u0442 AGENTS.md / CLAUDE.md",
  "cwd.rescan": "\u041F\u0435\u0440\u0435\u0441\u043A\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
  "cwd.hint": "\u0422\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u0435 \u043F\u0440\u043E\u043C\u043F\u0442\u0430 \u043F\u0443\u0441\u0442\u043E\u0435, \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u043D\u044B\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u043A\u0430\u043A \u0440\u0435\u0437\u0435\u0440\u0432; \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u043B\u0435 \u043D\u0435\u043F\u0443\u0441\u0442\u043E\u0435, \u044D\u0442\u0438 \u0444\u0430\u0439\u043B\u044B \u043D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F.",
  "cwd.scope.cwd": "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433",
  "cwd.scope.ancestor": "\u0412\u044B\u0448\u0435",
  "cwd.scope.root": "\u041A\u043E\u0440\u0435\u043D\u044C \u043F\u0440\u043E\u0435\u043A\u0442\u0430",
  "cwd.no.workspace": "\u0412 DSH \u0435\u0449\u0451 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D \u0440\u0430\u0431\u043E\u0447\u0438\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433: \u043D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432 DSH \u0437\u0430\u0434\u0430\u0447\u0443 \u0438 \u0432\u0435\u0440\u043D\u0438\u0442\u0435\u0441\u044C \u0441\u044E\u0434\u0430.",
  "pill.current": "\u0422\u0435\u043A\u0443\u0449\u0435\u0435",
  "btn.use": "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  "btn.inUse": "\u0422\u0435\u043A\u0443\u0449\u0435\u0435",
  "confirm.delete": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C {id}?",
  "ph.id": "id",
  "ph.alias": "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
  "ph.alias.short": "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
  "btn.create": "\u0421\u043E\u0437\u0434\u0430\u0442\u044C",
  "need.id": "\u041D\u0443\u0436\u0435\u043D id",
  "ph.content": "",
  "btn.saveRule": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  "skills.title": "Skill",
  "skills.hint": "\u041F\u043E\u0441\u043B\u0435 \u0438\u043C\u043F\u043E\u0440\u0442\u0430 \u0432 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u0435\u0433\u043E \u0432\u044B\u0437\u044B\u0432\u0430\u0435\u0442 DSH: /\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432 \u0447\u0430\u0442\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442 \u043D\u0430\u0432\u044B\u043A \u0441\u0440\u0430\u0437\u0443; \u0435\u0441\u043B\u0438 \u0437\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442 \u0441 description \u0438\u043B\u0438 whenToUse, \u043C\u043E\u0434\u0435\u043B\u044C \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 skill. \u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u0442\u0435\u043B\u0435 \xAB\u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u044F\xBB \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u2014 \u044D\u0442\u043E \u043D\u0435 \u0441\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442.",
  "skills.hint.desktop": "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 Skill \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0434\u0435\u0441\u043A\u0442\u043E\u043F\u043D\u043E\u0433\u043E \u0445\u043E\u0441\u0442\u0430. /\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432 \u0447\u0430\u0442\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442 \u043D\u0430\u0432\u044B\u043A \u0441\u0440\u0430\u0437\u0443; \u0435\u0441\u043B\u0438 \u0437\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442 \u0441 description, \u043C\u043E\u0434\u0435\u043B\u044C \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 skill.",
  "skills.empty": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0445 Skill \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
  "btn.importZip": "\u0418\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u0440\u0445\u0438\u0432",
  "btn.importFolder": "\u0418\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0443",
  "skills.importing": "\u0418\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u0443\u0435\u043C\u2026",
  "saved.import": "\u0418\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E Skill: {count}",
  "need.import": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u0440\u0445\u0438\u0432 \u0438\u043B\u0438 \u043F\u0430\u043F\u043A\u0443",
  "err.import.folder": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B \u0432 \u043F\u0430\u043F\u043A\u0435: \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0430\u043C \u043A\u0430\u0442\u0430\u043B\u043E\u0433 Skill (\u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C SKILL.md)",
  "skills.pick": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 Skill",
  "skills.invalid": "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0445\u043E\u0441\u0442 \u043F\u0440\u043E\u0438\u0433\u043D\u043E\u0440\u0438\u0440\u0443\u0435\u0442: \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442",
  "skills.call.slash": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432 \u0447\u0430\u0442\u0435 {cmd}",
  "skills.call.model": "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043C\u043E\u0434\u0435\u043B\u0438",
  "skills.call.modelOff": "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043C\u043E\u0434\u0435\u043B\u0438",
  "skills.call.userOff": "\u0411\u0435\u0437 /\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",
  "ph.skill.desc": "description (\u043A\u043E\u0433\u0434\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C)",
  "btn.saveSkill": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  "need.skill.id": "id \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0432 kebab-case, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 code-review",
  "confirm.delete.skill": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C {id} \u0438\u0437 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E $DSH_HOME/skills? \u0425\u043E\u0441\u0442 \u0443\u0431\u0435\u0440\u0451\u0442 \u043D\u0430\u0432\u044B\u043A \u0438\u0437 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438.",
  "err.skills": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F: {error}",
  "err.skills.needRestart": "\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 Skill \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D: \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0445\u043E\u0441\u0442",
  "btn.restart": "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C",
  "btn.restart.busy": "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u2026",
  restarting: "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u2026",
  "restarting.desktop": "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",
  "restart.timeout": "\u0422\u0430\u0439\u043C-\u0430\u0443\u0442, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443",
  "restart.fail": "\u041E\u0448\u0438\u0431\u043A\u0430: {error}",
  "restart.notStarted": "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A \u043D\u0435 \u043D\u0430\u0447\u0430\u043B\u0441\u044F, \u043A\u043B\u0438\u0435\u043D\u0442 \u0435\u0449\u0451 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442. \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u043E\u0432\u0442\u043E\u0440\u043E\u0432 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442.",
  "restart.already": "\u042D\u0442\u043E\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A \u0443\u0436\u0435 \u043D\u0430\u0447\u0430\u043B\u0441\u044F, \u0432\u0442\u043E\u0440\u043E\u0439 \u0440\u0430\u0437 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u043D\u0435 \u0431\u0443\u0434\u0435\u043C.",
  "restart.confirm": "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430, \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
  "restart.confirm.desktop": "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430, \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F.",
  "restart.ask.title": "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441?",
  "restart.ask.body": "\u0412\u0441\u0451 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E. \u0412 \u0442\u0435\u043A\u0443\u0449\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
  "restart.now": "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441",
  "restart.notNow": "\u041F\u043E\u0437\u0436\u0435",
  "restart.asarSwap": "\u041F\u0430\u0442\u0447\u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u043D\u0430 \u0434\u0438\u0441\u043A. \u0417\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u043C \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0443\u0431\u0438\u0440\u0430\u0435\u043C app.asar, \u043F\u043E\u0441\u043B\u0435 \u0447\u0435\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u0441\u0430\u043C; \u0435\u0441\u043B\u0438 \u043D\u0435 \u043F\u043E\u043C\u043E\u0436\u0435\u0442, \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0432\u044B\u0439\u0434\u0438\u0442\u0435 \u0438\u0437 Harness (\u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0442\u0440\u0435\u0439) \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB \u0435\u0449\u0451 \u0440\u0430\u0437.",
  "surface.web": "Web",
  "surface.desktop": "\u0414\u0435\u0441\u043A\u0442\u043E\u043F",
  "surface.gui": "GUI",
  "surface.tui": "TUI",
  "restart.incomplete": "\u041F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E. {detail}",
  "restart.incomplete.patches": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C {failed} \u0448\u0442. (#{ids}), \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0434\u0435\u0442\u0430\u043B\u0438 \u043F\u0430\u0442\u0447\u0435\u0439",
  "restart.incomplete.flash": "\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u043E\u0434\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043E\u043A\u043D\u0430 \u0442\u0435\u0440\u043C\u0438\u043D\u0430\u043B\u0430 \u043D\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u0430 ({entry})",
  "restart.incomplete.host": "\u041D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C \u0432 \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u0445\u043E\u0441\u0442: \u0441\u0432\u0435\u0440\u044C\u0442\u0435 \u043A\u043B\u0438\u0435\u043D\u0442, \u0432\u0435\u0440\u0441\u0438\u044E \u0445\u043E\u0441\u0442\u0430 \u0438 \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u043F\u0443\u0442\u044C",
  "restart.incomplete.restore": "\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E, \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438",
  "restart.incomplete.runtime": "\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u043B\u0438 \u043F\u043E\u0447\u0438\u043D\u043A\u0430 \u0440\u0430\u043D\u0442\u0430\u0439\u043C\u0430 CLI \u043D\u0435 \u0443\u0434\u0430\u043B\u0430\u0441\u044C, \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0436\u0443\u0440\u043D\u0430\u043B \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438",
  "restart.incomplete.unknown": "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u044D\u043A\u0435\u043D\u0434 \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u043B \u043F\u0440\u0438\u0447\u0438\u043D\u0443: \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0432\u0435\u0440\u0441\u0438\u044E \u0445\u043E\u0441\u0442\u0430, \u0434\u0435\u0442\u0430\u043B\u0438 \u043F\u0430\u0442\u0447\u0435\u0439 \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438",
  "restart.later": "\u041D\u0435 \u0441\u0435\u0439\u0447\u0430\u0441",
  "group.prompt": "\u041F\u0440\u043E\u043C\u043F\u0442",
  "group.code": "\u041A\u043E\u0434",
  "group.engine": "\u0414\u0432\u0438\u0436\u043E\u043A",
  "group.tools": "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B",
  "group.compat": "\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C 0.1.5",
  "group.dsh20": "0.2.0",
  "patch.1": "\u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0439 \u0434\u0438\u0441\u043A\u043B\u0435\u0439\u043C\u0435\u0440 \u2192 \u0436\u0451\u0441\u0442\u043A\u0430\u044F \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F",
  "patch.2": "\u0437\u0430\u043C\u0435\u043D\u044F\u044E\u0449\u0438\u0439 \u0434\u0438\u0441\u043A\u043B\u0435\u0439\u043C\u0435\u0440 \u2192 \u0436\u0451\u0441\u0442\u043A\u0430\u044F \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F",
  "patch.3": "\u0434\u0438\u0441\u043A\u043B\u0435\u0439\u043C\u0435\u0440 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u2192 \u0436\u0451\u0441\u0442\u043A\u0430\u044F \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F",
  "patch.4": "\u0436\u0451\u0441\u0442\u043A\u0430\u044F \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F \u0432 \u0441\u0435\u0441\u0441\u0438\u0438 persona",
  "patch.5": "\u0444\u0440\u0430\u0437\u0430 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u2192 \u043F\u043E\u043B\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0430",
  "patch.6": "sandbox deny \u2192 allow \u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C",
  "patch.7": "sandbox \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0441 \u043F\u043E\u043B\u043D\u044B\u043C\u0438 \u043F\u0440\u0430\u0432\u0430\u043C\u0438",
  "patch.8": "\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E never",
  "patch.9": "\u0433\u0435\u0439\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
  "patch.10": "\u043A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0439 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E never",
  "patch.11": "\u0444\u0440\u0430\u0437\u0430 never \u2192 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0440\u043E\u043F\u0443\u0441\u043A",
  "patch.12": "\u0444\u0440\u0430\u0437\u0430 ask \u2192 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0440\u043E\u043F\u0443\u0441\u043A",
  "patch.13": "\u043E\u0441\u0432\u043E\u0431\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \u043E\u0442 \u043B\u0435\u0441\u0442\u043D\u0438\u0446\u044B \u044D\u0441\u043A\u0430\u043B\u0430\u0446\u0438\u0438",
  "patch.14": "\u044D\u0441\u043A\u0430\u043B\u0430\u0446\u0438\u044F \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0430 \u0431\u0435\u0437 \u0443\u0441\u043B\u043E\u0432\u0438\u0439",
  "patch.15": "sandbox confine \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E",
  "patch.16": "\u0441\u043D\u044F\u0442 \u0437\u0430\u0431\u043E\u0440 \u0444\u0430\u0439\u043B\u043E\u0432\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B",
  "patch.17": "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u0447\u0442\u0435\u043D\u0438\u0435 \u0438 \u0437\u0430\u043F\u0438\u0441\u044C",
  "patch.18": "\u0437\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0445 \u0432\u044B\u0437\u043E\u0432\u043E\u0432 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",
  "patch.19": "\u043E\u0431\u0440\u0435\u0437\u043A\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",
  "patch.21": "\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u0440\u043E\u0434\u043B\u0451\u043D\u043D\u043E\u0435 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 bash \u0443 \u043F\u043B\u0430\u0433\u0438\u043D\u0430",
  "patch.22": "\u043B\u0438\u043C\u0438\u0442 read \u0443\u0432\u0435\u043B\u0438\u0447\u0435\u043D",
  "patch.23": "\u0433\u043B\u0443\u0431\u0438\u043D\u0430 \u0441\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u043E\u0432 3 \u2192 10",
  "patch.24": "preset fetch \u0432\u043A\u043B\u044E\u0447\u0451\u043D",
  "patch.25": "\u0443\u0431\u0440\u0430\u043D\u0430 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E (\u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u043F\u0442 \u043D\u0435 \u0442\u0440\u043E\u043D\u0443\u0442)",
  "patch.26": "minimal: \u0443\u0431\u0440\u0430\u043D\u0430 \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0438 \u0432\u043A\u043B\u044E\u0447\u0451\u043D inject",
  "patch.28": "dsh-liangshen: phase-1 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0440\u0430\u0437\u0434\u0435\u043B dsh-purge / dshpg",
  "patch.70": "\u0432 \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435 \u0442\u0435\u0440\u043C\u0438\u043D\u0430\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442 \u0441\u0435\u0442\u044C",
  "patch.71": "liangshen: \u0443\u0431\u0440\u0430\u043D\u0430 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0444\u0440\u0430\u0437\u0430 \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u0438",
  "patch.29": "dsh-tool-web: \u0432\u043D\u0435\u0448\u043D\u0438\u0439 untrusted-\u043F\u0435\u0440\u0435\u0445\u0432\u0430\u0442 \u2192 \u0438\u0441\u043F\u043E\u043B\u043D\u044F\u0435\u043C\u044B\u0439",
  "patch.30": "dsh-hooks-claude-code: deny\u2192allow",
  "patch.31": "dsh-hooks-codex: deny\u2192allow",
  "patch.32": "\u043D\u0435\u0439\u0442\u0440\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u0438 \u0432\u0435\u0431-\u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438",
  "patch.33": "Shell: \u043E\u0442\u043A\u0430\u0437 \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0451\u043D \u0432 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",
  "patch.34": "\u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 sandbox \u043D\u0435\u0439\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u044B",
  "patch.35": "\u044D\u0441\u043A\u0430\u043B\u0430\u0446\u0438\u044F never \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043E\u0442\u043A\u043B\u043E\u043D\u044F\u0435\u0442",
  "patch.36": "\u0441\u0445\u0435\u043C\u0430 \u044D\u0441\u043A\u0430\u043B\u0430\u0446\u0438\u0438 \u0444\u0430\u0439\u043B\u043E\u0432\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u0430",
  "patch.37": "\u043D\u0435\u0439\u0442\u0440\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F scope lock \u0443 \u0441\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u043E\u0432",
  "patch.38": "persona text\u2192prefix (\u043F\u0440\u0435\u0441\u0435\u0442 0.1.2)",
  "patch.39": "\u0441\u0432\u043E\u0434\u043A\u0430 \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u0434\u043B\u044F \u0441\u0435\u0441\u0441\u0438\u0438 v0 (mnemon)",
  "patch.40": "\u043F\u0440\u0435\u0441\u0435\u0442 complete \u043F\u043E-\u043F\u0440\u0435\u0436\u043D\u0435\u043C\u0443 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0438\u043D\u044A\u0435\u043A\u0446\u0438\u044E",
  "patch.42": "\u0441\u0442\u0430\u0440\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A",
  "patch.43": "\u0432\u0435\u0431-\u043F\u0440\u0435\u0441\u0435\u0442 \u0431\u0435\u0437 \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
  "patch.45": "\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043D\u0430 \u0434\u0435\u0441\u043A\u0442\u043E\u043F\u0435",
  "patch.46": "\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u043A\u0440\u0438\u043F\u0442 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C",
  "patch.47": "OAuth \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0432\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u044C Claude",
  "patch.48": "shell \u0431\u0435\u0437 \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0435\u0434 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435\u043C",
  "patch.49": "OAuth \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0432\u044B\u0434\u0430\u0451\u0442 \u0441\u0435\u0431\u044F \u0437\u0430 claude-cli",
  "patch.50": "\u0441\u0441\u044B\u043B\u043A\u0438 \u043C\u0435\u0436\u0434\u0443 \u0441\u0435\u0441\u0441\u0438\u044F\u043C\u0438 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043F\u043E\u043C\u0435\u0447\u0430\u044E\u0442\u0441\u044F \u043A\u0430\u043A \u043D\u0435\u0434\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0435",
  "patch.51": "\u043D\u043E\u0432\u044B\u0439 \u0447\u0430\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u043F\u043E\u043B\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0430",
  "patch.52": "\u0436\u0443\u0440\u043D\u0430\u043B \u0441\u0435\u0441\u0441\u0438\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F",
  "patch.53": "\u0432\u0435\u0431-\u043F\u0440\u043E\u043C\u043F\u0442 \u0431\u0435\u0437 \u0437\u0430\u043F\u0440\u0435\u0442\u0430 \u043F\u043E\u0434\u043D\u0438\u043C\u0430\u0442\u044C \u0441\u0432\u043E\u0439 \u0441\u0435\u0440\u0432\u0435\u0440",
  "patch.54": "\u043F\u0440\u043E\u043C\u043F\u0442 \u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u0445 \u0431\u0435\u0437 \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u0437\u0430\u043F\u0440\u0435\u0442\u0430",
  "patch.55": "\u043F\u043E\u0434\u043C\u0435\u043D\u0430 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u043C\u043F\u0442\u0430 \u043D\u0430 \u043A\u0430\u0436\u0434\u043E\u043C \u0448\u0430\u0433\u0435",
  "patch.56": "\u043E\u0442\u043A\u0430\u0442 \u0441\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0442\u0441\u0435\u0447\u0451\u043D\u043D\u044B\u0439 \u0440\u0430\u0443\u043D\u0434",
  "patch.57": "developer role \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F openai/azure, \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u043F\u0440\u043E\u043A\u0441\u0438 \u043E\u0442\u043A\u0430\u0442\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0432 system",
  "patch.58": "\u043F\u0443\u0441\u0442\u044B\u0435 \u043C\u0435\u0442\u043A\u0438 \u043E\u0442\u043A\u0430\u0442\u0430 \u043D\u0435 \u043F\u043E\u043F\u0430\u0434\u0430\u044E\u0442 \u0432 \u0437\u0430\u043F\u0440\u043E\u0441 \u043A \u043C\u043E\u0434\u0435\u043B\u0438",
  "patch.59": "\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 Auto Review \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B",
  "patch.60": "\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 run_code \u0431\u0435\u0437 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F\u043C",
  "patch.61": "\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 sandbox \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0443\u0447\u0438\u0442 \u043E\u0442\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C",
  "patch.62": "\u043F\u0440\u043E\u043F\u0443\u0441\u043A \u0431\u0435\u0437 \u043A\u0430\u043D\u0430\u043B\u0430 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F (\u043E\u0442\u043A\u0430\u0437 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442)",
  "patch.63": "\u0440\u0435\u0436\u0438\u043C \u043F\u043B\u0430\u043D\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043C\u044F\u0433\u043A\u043E \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",
  "patch.64": "Stop hook \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043F\u043E\u0434\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
  "patch.65": "UserPromptSubmit deny \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043E\u0442\u043A\u043B\u043E\u043D\u044F\u0435\u0442 \u0432\u0435\u0441\u044C \u0445\u043E\u0434",
  "patch.66": "\u043F\u0443\u0441\u0442\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u0440\u0430\u0437\u0434\u0435\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0445\u043E\u0434 \u0432\u043E \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044E\u044E \u043E\u0448\u0438\u0431\u043A\u0443",
  "patch.67": "\u0431\u0435\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 messages \u0445\u043E\u0434 \u043D\u0435 \u043F\u0440\u0435\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F",
  "patch.68": "\u043F\u043E\u0441\u043B\u0435 \u043E\u0442\u043A\u0430\u0442\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 content \u043D\u0435 \u043F\u0440\u0435\u0440\u044B\u0432\u0430\u0435\u0442 \u0445\u043E\u0434",
  "patch.69": "deepseek-flash \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 in-history",
  "patch.72": "system \u0432 messages \u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0438\u0437 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u043C\u043F\u0442\u0430",
  "patch.73": "\u0432 \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u043C bash \u0443\u0431\u0440\u0430\u043D\u0430 \u043E\u0448\u0438\u0431\u043E\u0447\u043D\u043E \u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u0444\u0440\u0430\u0437\u0430 \u043F\u0440\u043E \u0437\u0435\u0440\u043A\u0430\u043B\u043E",
  "patch.74": "\u043F\u0435\u0440\u0435\u0434 \u043F\u0435\u0440\u0432\u044B\u043C \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0440\u043E\u043C\u043F\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
  "patch.75": "\u043E\u0442\u043A\u0430\u0442 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0432 \xAB\u043D\u0435 \u043D\u0430\u0447\u0430\u0442\u043E\xBB",
  "patch.76": "\u043F\u0440\u0435\u0441\u0435\u0442 unrestricted \u0431\u0435\u0437 \u0444\u0440\u0430\u0437\u044B \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u0438",
  "patch.77": "\u043F\u0440\u0438 \u043F\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u0438 \u043C\u0435\u0442\u043A\u0438 \u043E\u0442\u043A\u0430\u0442\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043E\u0442\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F",
  "patch.78": "\u043F\u0440\u0438 \u043F\u0440\u043E\u043F\u0430\u0436\u0435 \u0444\u0430\u0439\u043B\u0430 \u043F\u0430\u0442\u0447\u0430 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0438\u0437 .bak",
  "patch.80": "\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043D\u0430\u0431\u043E\u0440 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432",
  "patch.82": "\u0432 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u043C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u043E DSH_PROFILE=desktop",
  "patch.83": "\u043F\u0440\u0438 \u0443\u0431\u0438\u0439\u0441\u0442\u0432\u0435 \u0445\u043E\u0441\u0442\u0430 \u0441\u0438\u0433\u043D\u0430\u043B\u043E\u043C \u043D\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0438 \u0438 \u0434\u0438\u0430\u043B\u043E\u0433\u0430",
  "patch.84": "\u043F\u0440\u0438 \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u044B\u0445\u043E\u0434\u0435 \u0445\u043E\u0441\u0442\u0430 code=0 \u043D\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0438 (\u0434\u0438\u0430\u043B\u043E\u0433 stopped \u043D\u0435 \u043F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F)",
  "status.unlocated": "\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  "status.na": "\u041D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u043D\u0435 \u043D\u0443\u0436\u043D\u043E",
  "metric.unlocated": "\u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 Harness \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D",
  "metric.sealed": "\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442 \u043D\u0430\u0439\u0434\u0435\u043D, \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB \u0434\u043B\u044F \u0440\u0430\u0441\u043F\u0430\u043A\u043E\u0432\u043A\u0438",
  "metric.sealed.count": "\u0416\u0434\u0451\u0442 \u0440\u0430\u0441\u043F\u0430\u043A\u043E\u0432\u043A\u0438",
  "metric.lost": "\u043F\u0430\u0442\u0447\u0438 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B, \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u0435 \u0437\u0430\u043D\u043E\u0432\u043E",
  "metric.lost.count": "\u041F\u043E\u0442\u0435\u0440\u044F\u043D\u043E",
  "rewind.label": "\u041E\u0442\u043A\u0430\u0442",
  "rewind.aria": "\u041E\u0442\u043A\u0430\u0442",
  "rewind.busy": "\u041E\u0442\u043A\u0430\u0442\u2026",
  "rewind.empty": "\u041D\u0435\u0447\u0435\u0433\u043E \u043E\u0442\u043A\u0430\u0442\u044B\u0432\u0430\u0442\u044C",
  "rewind.fail": "\u041E\u0442\u043A\u0430\u0442 \u043D\u0435 \u0443\u0434\u0430\u043B\u0441\u044F: {error}",
  "rewind.once": "\u041E\u0442\u043A\u0430\u0442\u0438\u0442\u044C \u0440\u0430\u0437",
  "rewind.once.hint": "\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0435 \u0432 \u044D\u0442\u043E\u043C \u0440\u0430\u0443\u043D\u0434\u0435 \u0432 \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430 \u0438 \u0443\u0431\u0440\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u044D\u0442\u043E\u0442 \u0440\u0430\u0443\u043D\u0434",
  "rewind.round": "\u041E\u0442\u043A\u0430\u0442\u0438\u0442\u044C \u0440\u0430\u0443\u043D\u0434",
  "rewind.round.hint": "\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0435 \u0432 \u044D\u0442\u043E\u043C \u0440\u0430\u0443\u043D\u0434\u0435 \u0432 \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430; \u0443 \u0441\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u043E\u0432 \u0443\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u044D\u0442\u043E\u0442 \u0440\u0430\u0443\u043D\u0434",
  "hooksDeny.title": "\u041F\u0435\u0440\u0435\u0445\u0432\u0430\u0442 hooks",
  "hooksDeny.bypass": "\u041F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0442\u044C deny / ask \u0443 hooks (\u043F\u0430\u0442\u0447\u0438 30 / 31 / 64 / 65)",
  "hooksDeny.hint": "\u041A\u043E\u0433\u0434\u0430 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E, deny \u0432\u0430\u0448\u0438\u0445 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 PreToolUse / UserPromptSubmit / Stop hook \u0441\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442 \u0442\u0430\u043A, \u043A\u0430\u043A \u043D\u0430\u043F\u0438\u0441\u0430\u043B \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0445\u043E\u0441\u0442. \u0412\u0435\u0442\u043A\u0430 ask \u0443 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u043E\u0441\u0442\u0430 \u2014 \u043F\u0443\u0441\u0442\u0430\u044F \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044F, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u043F\u043E\u043A\u0430\u0436\u0435\u0442 \u043E\u043A\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F. \u041F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u043E\u0433\u0434\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043E\u043F\u0430\u0434\u0443\u0442 \u0432 \u0444\u0430\u0439\u043B\u044B \u0445\u043E\u0441\u0442\u0430.",
  "saved.hooksDeny": "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E",
  "continue.title": "\u041F\u043E\u0432\u0442\u043E\u0440 \u043F\u0440\u0438 \u0441\u0431\u043E\u0435 / \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435",
  "continue.hint": "\u041D\u0435\u0443\u0434\u0430\u0447\u043D\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u044E\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438; \u043F\u043E\u0441\u043B\u0435 \u0430\u0432\u0430\u0440\u0438\u0439\u043D\u043E\u0439 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0438\u043B\u0438 \u043F\u0440\u0435\u0440\u044B\u0432\u0430\u043D\u0438\u044F \u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0436\u0430\u0442\u044C \xAB\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C\xBB \u0438\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435. \u0420\u0443\u0447\u043D\u0430\u044F \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u041A\u043E\u0433\u0434\u0430 \u0441\u0447\u0451\u0442\u0447\u0438\u043A \u0438\u0441\u0447\u0435\u0440\u043F\u0430\u043D, \u043D\u0443\u0436\u0435\u043D \u043D\u043E\u0432\u044B\u0439 \u0445\u043E\u0434.",
  "continue.autoRetry": "\u0410\u0432\u0442\u043E\u043F\u043E\u0432\u0442\u043E\u0440 \u043F\u0440\u0438 \u0441\u0431\u043E\u0435",
  "continue.retryMax": "\u0427\u0438\u0441\u043B\u043E \u043F\u043E\u0432\u0442\u043E\u0440\u043E\u0432",
  "continue.autoContinue": "\u0410\u0432\u0442\u043E\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u0435\u0440\u044B\u0432\u0430\u043D\u0438\u044F",
  "continue.continueMax": "\u0427\u0438\u0441\u043B\u043E \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0439",
  "continue.text": "\u0422\u0435\u043A\u0441\u0442 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F",
  "saved.continue": "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E",
  "continue.label": "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
  "continue.aria": "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435 \u0430\u0432\u0430\u0440\u0438\u0439\u043D\u043E\u0439 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438",
  "continue.busy": "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C\u2026",
  "continue.ready": "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C (\u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C {left})",
  "continue.limit": "\u0414\u043E\u0441\u0442\u0438\u0433\u043D\u0443\u0442 \u043B\u0438\u043C\u0438\u0442 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0439",
  "continue.fail": "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C: {error}"
};
var zh = ru;
var en = {
  nav: "Rules",
  "dock.clean": "Clean",
  "dock.drill": "Drill",
  "dock.toggle": "dsh-purge",
  "dock.newSession": "dsh-purge",
  "dock.inSession": "dsh-purge",
  "dock.redteam": "Red team",
  "dock.full": "Full view",
  "dock.close": "Collapse",
  "dock.unauthorized": "Unauthorized",
  "welcome.title": "User notice",
  "welcome.lead": "Please read this on first install. After you confirm, it will not appear again.",
  "welcome.warn": "This plugin is free and open source. Anyone who sells, resells, or profits from it behind the author's back may face legal action.",
  "welcome.body": "dsh-purge is a local DeepSeek Harness plugin for security evaluation and cleaning: adjust prompts and patches on a machine you control, and use the drill console only within authorized scope. It is free and non-profit. Repository:",
  "welcome.repo": "https://github.com/YuJunZhiXue/dsh-purge",
  "welcome.ban1": "Do not use this project for unauthorized attacks, intrusion, data theft, sabotage, or any illegal activity.",
  "welcome.ban2": "Do not commercially sell, resell, or profit from gray-market use, or redistribute for profit without the author.",
  "welcome.ban3": "You must follow local law and platform rules; illegal use is solely your responsibility.",
  "welcome.bans": "Prohibitions",
  "welcome.check": "I have read and understand this notice and will use the plugin lawfully.",
  "welcome.ok": "I understand \u2014 continue",
  "auth.title": "Drill console authorization",
  "auth.lead": "Cleaning does not need this step. Opening Drill or Full view the first time requires this dialog.",
  "auth.warn": "Warning: the drill console is only for hosts you manage, offline targets, or written authorized exercises. Unauthorized intrusion, attack, theft, or sabotage is forbidden.",
  "auth.hint.wait": "Read the notice. You can check the boxes in {n}s.",
  "auth.hint.scroll": "Countdown finished. Scroll to the end, then check the boxes.",
  "auth.hint.check": "Countdown finished. Check all three boxes.",
  "auth.check.read": "I have read the Safety and Anti-Abuse Notice and accept every clause.",
  "auth.check.scope": "I will only use authorized local hosts, offline targets, or compliant exercises.",
  "auth.check.ban": "I will not use this for any illegal purpose. Without this authorization the drill console stays closed.",
  "auth.no": "Not now",
  "auth.ok": "Authorize",
  "auth.ok.tab": "Authorize and open Drill",
  "auth.ok.full": "Authorize and open Full view",
  "auth.ok.env": "Authorize and open Env adapt",
  "envGate.title": "Environment is not ready",
  "envGate.lead": "Red team mode needs local tools before you send. If none are available, open Env adapt or confirm you will continue without them.",
  "envGate.kaliHint": "When Kali is detected, local tools are used directly and paths are optional. Otherwise set each tool path in Env adapt, or pick one toolkit folder to assign them.",
  "envGate.skip": "Skip for now",
  "envGate.skipConfirm": "You can keep chatting after this. Scan and exploit skills stay unavailable until the tools are installed. You can add paths later under dsh-purge \u2192 Env adapt.",
  "envGate.skipNo": "Back",
  "envGate.skipYes": "Continue without tools",
  "envGate.go": "Open Env adapt",
  "compat.host": "dsh-purge Community {version} \xB7 host DSH {host} \xB7 compatibility: {level}",
  "compat.loading": "Reading the host version\u2026",
  "compat.unavailable": "Host compatibility is unavailable: {error}",
  "compat.level.qualified": "regression verified",
  "compat.level.unverified": "unverified version",
  "compat.level.mixed": "mixed component versions",
  "compat.level.no-host": "host not located",
  "compat.level.unknown": "unknown",
  "theme.aria": "Appearance",
  "theme.white": "Light",
  "theme.ink": "Ink",
  "purge.title": "Patches",
  "override.title": "Prompt",
  "own.title": "Own servers",
  "own.hint": "One IP or exact hostname per line. account@host is accepted; the account only identifies that host. A hostname also allows the addresses it resolves to. Do not enter a key, a password, or a range.",
  "own.save": "Save list",
  "saved.own": "Own servers saved",
  "saved.own.dropped": "Saved. {n} lines were not a single IP or hostname and were dropped",
  "metric.purged": "Written",
  "metric.purged.skip": "Written. Skipped {n}; those files are not on this install",
  "metric.pendingShort": "Pending {n}",
  "metric.unmatchedShort": "No match {n}",
  "metric.partialShort": "Partial {n}",
  "metric.skipShort": "Skipped {n}",
  "metric.unlocated.count": "\u2014",
  "metric.shim": "shim",
  "metric.shim.na": "Not needed here",
  "metric.bak.yes": "Backup",
  "metric.bak.no": "No backup",
  "metric.bak.hint": "Backup",
  "table.patch": "Item",
  "table.status": "Status",
  "status.applied": "Applied",
  "status.off": "Off",
  "status.pending": "Pending",
  "status.unmatched": "No match",
  "status.partial": "Partial",
  "status.partialDetail": " ({done}/{total} targets)",
  "status.skipped": "Skipped",
  "apply.hint": "Apply writes patches and hangs the current default prompt. A stale plugin default in the box is refreshed from the sealed slot; a separate save is unnecessary. Only a prompt you wrote yourself is kept from the box. Pending = original text still present. Skipped = not needed for this version or the component is not installed.",
  "warn.noRoot": "Could not find this host\u2019s @deepseek-ai tree, so Apply will not patch anything. Fully quit and reopen this host, then Apply here. Desktop may live on any drive; folder names like DeepseekHarnessDesktop or DeepSeek Harness are fine.",
  "warn.noRoot.desktop": "Official Harness keeps its code in app.asar. Apply unpacks it and restarts the app. If this page stays \u201Cnot found\u201D, fully quit the client, reopen it, then Apply again. Third-party DSH Desktop: just Apply.",
  "unpack.restarting": "Patches are written. Click Restart and the client opens again by itself.",
  "restart.fullQuit": "Restarting. The client will open again by itself.",
  "warn.noInject": "Official mode always uses the default prompt. Red team uses only the active rule set; otherwise it uses the default prompt without the CTF section, then the red team steps. If both are empty you will be asked to add a prompt.",
  "need.prompt": "Both the prompt and the rule set are empty. Add a prompt, or enable a rule that has content.",
  "btn.restoreInject": "Reset default",
  "saved.restoreInject": "Default prompt restored",
  skip: "Skipped",
  unknown: "Unknown",
  delete: "Delete",
  "btn.apply": "Apply",
  "btn.apply.busy": "Working\u2026",
  "btn.revert": "Restore",
  "btn.uninstall": "Uninstall",
  "btn.uninstall.busy": "Uninstalling\u2026",
  "uninstall.title": "Uninstall dsh-purge",
  "uninstall.body": "Uninstall? This restores the original Harness and removes this plugin completely.",
  "uninstall.confirm": "Uninstall",
  "uninstall.cancel": "Cancel",
  "uninstall.applying": "Uninstalling and restoring\u2026",
  "uninstall.done": "Uninstalled and restored. Restarting\u2026",
  "uninstall.done.desktop": "Uninstalled and restored. Restarting the desktop app\u2026",
  "uninstall.fail": "Uninstall failed: {error}",
  "btn.checkUpdate": "Check update",
  "btn.checkUpdate.busy": "Checking\u2026",
  "btn.doUpdate": "Update",
  "btn.doUpdate.busy": "Updating\u2026",
  "channel.title": "Channel",
  "channel.stable": "Stable",
  "channel.beta": "Beta",
  "channel.useStable": "Switch to stable",
  "channel.useBeta": "Switch to beta",
  "channel.local": "This copy",
  "update.checking": "Checking for updates\u2026",
  "update.applying": "Updating\u2026",
  "update.switching": "Switching version\u2026",
  "update.latest": "Up to date ({version})",
  "update.available": "Update {remote} available (now {local})",
  "update.pinned": "Pinned at {version}; channel latest is {remote}",
  "update.done": "Updated to {version}.",
  "update.restarting": "Restored the old patches, wrote the new ones, and restarting\u2026",
  "update.fullQuit": "Patches are written. Click Restart and the client opens again by itself.",
  "restart.official.title": "Restart required",
  "restart.official.body": "Patches are written. Click Restart and the client opens again by itself.",
  "update.switched": "Switched to {version}.",
  "update.autoDone": "Auto-updated to {version}.",
  "update.reloading": "Refreshing settings\u2026",
  "update.dirty": "Update available; local edits were not overwritten.",
  "update.fail": "Update failed: {error}",
  "update.timeout": "Check timed out. Click Check update again.",
  "update.needRestart": "Update API is not loaded. Restart dsh, then check again.",
  "update.noBeta": "No beta build yet",
  "update.switch": "Switch to this version",
  "update.pick": "Select version",
  "update.tip": "latest",
  "update.current": "current",
  "update.confirmSwitch": "Switch to {version}? You can switch back later. Uncommitted plugin edits will not be kept.",
  "update.confirmChannel": "Switch to {version}? The plugin will be reinstalled from that channel. Uncommitted plugin edits will not be kept.",
  "metric.version": "Version",
  "action.apply": "Apply",
  "action.revert": "Restore",
  "action.uninstall": "Uninstall",
  "ok.done": "Done",
  "err.action": "Failed: {error}",
  "err.status": "Read failed: {error}",
  "err.override": "Read failed: {error}",
  "err.rules": "Read failed: {error}",
  "err.read": "Read failed: {error}",
  "err.save": "Save failed: {error}",
  "btn.saveInject": "Save",
  "saved.override": "Saved",
  "rules.title": "Rule sets",
  "rules.none": "None",
  "rules.reset": "Restore",
  "rules.reset.confirm": "Restore global instruction files? The rule library is kept.",
  "rules.empty": "No rules",
  "rules.pick": "Select a rule",
  "policy.title": "Workspace policy",
  "policy.strict": "Strict",
  "policy.fallback": "Fallback",
  "policy.always": "Always on",
  "policy.hint": "Strict: always strip AGENTS.md / CLAUDE.md. Fallback: use workspace files only when the prompt box is empty. Always on: keep DSH default behavior.",
  "cwd.title": "Local rules (current folder)",
  "cwd.empty": "No AGENTS.md / CLAUDE.md in this folder",
  "cwd.rescan": "Rescan",
  "cwd.hint": "Checked files are injected only when the prompt box is empty. A non-empty prompt box always wins.",
  "cwd.scope.cwd": "cwd",
  "cwd.scope.ancestor": "ancestor",
  "cwd.scope.root": "project root",
  "cwd.no.workspace": "DSH has not opened a workspace yet. Start a task in DSH first, then come back.",
  "pill.current": "On",
  "btn.use": "Enable",
  "btn.inUse": "On",
  "confirm.delete": "Delete {id}?",
  "ph.id": "id",
  "ph.alias": "Name",
  "ph.alias.short": "Name",
  "btn.create": "New",
  "need.id": "id required",
  "ph.content": "",
  "btn.saveRule": "Save",
  "skills.title": "Skills",
  "skills.hint": "After import, DSH calls it: type /name in chat to load now; the model calls the skill tool when the task matches description or whenToUse. Writing 'activation' in the body does nothing.",
  "skills.hint.desktop": "This desktop host\u2019s official skill catalog. Type /name in chat to load; the model calls the skill tool when the task matches the description.",
  "skills.empty": "No user skills",
  "btn.importZip": "Import zip",
  "btn.importFolder": "Import folder",
  "skills.importing": "Importing\u2026",
  "saved.import": "Imported {count} skill(s)",
  "need.import": "Choose a zip or folder",
  "err.import.folder": "No files were read. Select the skill folder itself (it must contain SKILL.md).",
  "skills.pick": "Select a skill",
  "skills.invalid": "Official catalog will ignore this: invalid format",
  "skills.call.slash": "Type {cmd} in chat",
  "skills.call.model": "Model can load",
  "skills.call.modelOff": "Hidden from model",
  "skills.call.userOff": "/name disabled",
  "ph.skill.desc": "description (when to use)",
  "btn.saveSkill": "Save",
  "need.skill.id": "id must be kebab-case, e.g. code-review",
  "confirm.delete.skill": "Delete {id} from official $DSH_HOME/skills? The host will drop it from the catalog.",
  "err.skills": "Read failed: {error}",
  "err.skills.needRestart": "Skill API is not loaded. Restart this host first.",
  "btn.restart": "Restart",
  "btn.restart.busy": "Restarting\u2026",
  restarting: "Restarting\u2026",
  "restarting.desktop": "Restarting the desktop app\u2026",
  "restart.timeout": "Timed out; refresh",
  "restart.fail": "Failed: {error}",
  "restart.notStarted": "Restart did not start. This client is still open, and it will not try again by itself.",
  "restart.already": "This restart already started. It will not restart again.",
  "restart.confirm": "Apply finished. Restart to take effect.",
  "restart.confirm.desktop": "Apply finished. Restart the desktop app to take effect.",
  "restart.ask.title": "Restart now?",
  "restart.ask.body": "It is written. It takes effect in this client after a restart.",
  "restart.now": "Restart now",
  "restart.notNow": "Later",
  "restart.asarSwap": "Patches are on disk. Quitting the desktop app and moving app.asar aside; it will reopen when done. If behavior is unchanged, fully quit Harness (including tray) and Apply again.",
  "surface.web": "Web",
  "surface.desktop": "Desktop",
  "surface.gui": "GUI",
  "surface.tui": "TUI",
  "restart.incomplete": "Apply did not complete. {detail}",
  "restart.incomplete.patches": "{failed} item(s) failed (#{ids}); inspect the item details",
  "restart.incomplete.flash": "Console-window suppression check failed ({entry})",
  "restart.incomplete.host": "Target host writes are not confirmed; check the client, host version and target path",
  "restart.incomplete.restore": "Configuration restoration did not complete; inspect diagnostics",
  "restart.incomplete.runtime": "CLI runtime check or repair failed; inspect diagnostics",
  "restart.incomplete.unknown": "The backend did not provide a specific cause; inspect the host version, item details and diagnostics",
  "restart.later": "Later",
  "group.prompt": "Prompt",
  "group.code": "Code",
  "group.engine": "Engine",
  "group.tools": "Tools",
  "group.compat": "0.1.5 compat",
  "group.dsh20": "0.2.0",
  "patch.1": "Global disclaimer \u2192 mandate",
  "patch.2": "Replacement disclaimer \u2192 mandate",
  "patch.3": "Scope disclaimer \u2192 mandate",
  "patch.4": "Persona session mandate",
  "patch.5": "Approval copy \u2192 full access",
  "patch.6": "Sandbox deny \u2192 allow write",
  "patch.7": "Sandbox default full access",
  "patch.8": "Approval default never",
  "patch.9": "Approval gate auto-grant",
  "patch.10": "Approval config default never",
  "patch.11": "never copy \u2192 auto-grant",
  "patch.12": "ask copy \u2192 auto-grant",
  "patch.13": "Escalation ladder exempt",
  "patch.14": "Escalation unconditional grant",
  "patch.15": "Sandbox confine passthrough",
  "patch.16": "Filesystem fence off",
  "patch.17": "Observation policy allow R/W",
  "patch.18": "Repeat-call guard off",
  "patch.19": "Tool-result pruner off",
  "patch.21": "Restore plugin-raised bash wait",
  "patch.22": "read cap raised",
  "patch.23": "subagent depth 3 \u2192 10",
  "patch.24": "preset fetch on",
  "patch.25": "Strip official default identity (keep feature prompts)",
  "patch.26": "minimal: strip identity, open inject",
  "patch.28": "dsh-liangshen: keep dsh-purge / dshpg in phase-1",
  "patch.70": "Minimal shell drops the no-network line",
  "patch.71": "Liangshen drops the stock identity line",
  "patch.29": "dsh-tool-web: untrusted framing \u2192 usable data",
  "patch.30": "dsh-hooks-claude-code: deny\u2192allow",
  "patch.31": "dsh-hooks-codex: deny\u2192allow",
  "patch.32": "Web surface identity neutral",
  "patch.33": "Shell denial prompt \u2192 executable",
  "patch.34": "Sandbox hint neutralized",
  "patch.35": "Escalation never-reject",
  "patch.36": "FS escalation schema opened",
  "patch.37": "Subagent scope lock neutralized",
  "patch.38": "persona text\u2192prefix (0.1.2 presets)",
  "patch.39": "session v0 plugin summary (mnemon)",
  "patch.40": "Keep inject when a complete prompt is set",
  "patch.42": "Settings legacy API",
  "patch.43": "Strip identity from web presets",
  "patch.45": "Official desktop update handoff",
  "patch.46": "Official update script stays ASCII",
  "patch.47": "OAuth no longer inserts Claude identity",
  "patch.48": "Shell drops extra delete caution",
  "patch.49": "OAuth no longer mimics claude-cli",
  "patch.50": "Session references are not marked untrusted",
  "patch.51": "Fresh session stays on full access",
  "patch.52": "Session log upload off by default",
  "patch.53": "Web prompt drops do-not-start",
  "patch.54": "Deliverable prompt drops extra prohibition",
  "patch.55": "Replace the first system prompt every step",
  "patch.56": "Rewind hides only the cut range",
  "patch.57": "developer role for openai/azure only, third-party gateways use system",
  "patch.58": "Rewind markers stay off the model request",
  "patch.59": "Official Auto Review no longer denies tools",
  "patch.60": "Official run_code drops approval teaching",
  "patch.61": "Official sandbox policy no longer teaches refusal",
  "patch.62": "Fail-open without approval channel (user reject kept)",
  "patch.63": "Plan mode no longer soft-blocks execution",
  "patch.64": "Stop hook no longer steers fake user text",
  "patch.65": "UserPromptSubmit deny no longer rejects turn",
  "patch.66": "Empty system section no longer ends the turn as an internal error",
  "patch.67": "A missing messages list no longer ends the turn",
  "patch.68": "Missing content after rewind no longer ends the turn",
  "patch.69": "deepseek-flash keeps the official in-history flag",
  "patch.72": "Messages system field uses the current system prompt",
  "patch.73": "Minimal preset drops stray mirror sentence",
  "patch.74": "Hang default prompt before first assemble",
  "patch.75": "Rewind resets completed todos to pending",
  "patch.76": "Unrestricted preset: strip identity sentence",
  "patch.77": "Rewind marker drops already-sent messages",
  "patch.78": "Restore missing overlay from .bak backup",
  "patch.80": "Restore official minimal tool plugins",
  "patch.82": "Fallback DSH_PROFILE=desktop in main process",
  "patch.83": "Don't fail on signal kill (no crash dialog)",
  "patch.84": "Don't fail on code=0 clean exit (no stopped dialog)",
  "status.na": "Not for this host",
  "metric.sealed": "Official client found. Apply to unpack",
  "metric.sealed.count": "Sealed",
  "metric.lost": "Patches lost \u2014 Apply again",
  "metric.lost.count": "Lost",
  "status.unlocated": "Not located",
  "metric.unlocated": "This install was not found yet",
  "rewind.label": "Undo",
  "rewind.aria": "Undo",
  "rewind.busy": "Undoing\u2026",
  "rewind.empty": "Nothing to undo",
  "rewind.fail": "Undo failed: {error}",
  "rewind.once": "Undo once",
  "rewind.once.hint": "Put this round's message back in the box and drop only this round",
  "rewind.round": "Undo last round",
  "rewind.round.hint": "Put this round's message back in the box; subagents drop only this round",
  "hooksDeny.title": "Hook interception",
  "hooksDeny.bypass": "Bypass hook deny / ask (patches 30 / 31 / 64 / 65)",
  "hooksDeny.hint": "When off, your own PreToolUse / UserPromptSubmit / Stop hook deny runs as the official host wrote it. The official ask branch is a no-op; turning this off will not show an approval dialog. Click Apply and restart to write the host files.",
  "saved.hooksDeny": "Saved",
  "continue.title": "Retry / Continue",
  "continue.hint": "Failed requests auto-retry. After an abnormal stop or interrupt, use Continue or auto-resume. A manual stop never auto-continues. Counts reset after a completed turn.",
  "continue.autoRetry": "Auto-retry on failure",
  "continue.retryMax": "Retry count",
  "continue.autoContinue": "Auto-continue after interrupt",
  "continue.continueMax": "Continue count",
  "continue.text": "Continue text",
  "saved.continue": "Saved",
  "continue.label": "Continue",
  "continue.aria": "Continue after an abnormal stop",
  "continue.busy": "Continuing\u2026",
  "continue.ready": "Continue ({left} left)",
  "continue.limit": "Continue limit reached",
  "continue.fail": "Continue failed: {error}"
};

// src/components/auth.js
var AUTH_LEGAL_HTML = "<h3>\u0421\u0442\u0440\u043E\u0433\u043E\u0435 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043E\u0431 \u043E\u0442\u043A\u0430\u0437\u0435 \u043E\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0438 \u043F\u0440\u0430\u0432\u043E\u043C\u0435\u0440\u043D\u043E\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438</h3>\r\n    <p>\u041F\u0435\u0440\u0435\u0434 \u0432\u0445\u043E\u0434\u043E\u043C \u0432 \u043F\u043E\u043B\u0438\u0433\u043E\u043D \u044D\u0442\u043E \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E. \u041F\u0440\u043E\u0435\u043A\u0442 \u043D\u0435\u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0439 \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0439, \u0441\u043E\u0431\u043B\u044E\u0434\u0430\u0435\u0442 \u0437\u0430\u043A\u043E\u043D\u044B \u0441\u0442\u0440\u0430\u043D\u044B \u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438 \u0438 \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u044F, \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0439 \u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u043B\u0435\u043D\u0438\u044F. \u041B\u044E\u0431\u043E\u043C\u0443 \u043B\u0438\u0446\u0443 \u0441\u0442\u0440\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442 \u0434\u043B\u044F \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0439 \u043F\u0440\u043E\u0434\u0430\u0436\u0438, \u043F\u043B\u0430\u0442\u043D\u043E\u0439 \u043F\u0435\u0440\u0435\u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0438\u043B\u0438 \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u0431\u044B\u043B\u0438 \u0432 \u0441\u0435\u0440\u043E\u0439 \u0438 \u0442\u0435\u043D\u0435\u0432\u043E\u0439 \u0441\u0444\u0435\u0440\u0435.</p>\r\n    <p>\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u0440\u0435\u0448\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u0440\u043E\u0442\u0438\u0432 \u043B\u044E\u0431\u044B\u0445 \u0444\u043E\u0440\u043C \u043F\u0440\u0430\u0432\u043E\u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0439 \u0438 \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0439 \u0438 \u0441\u0442\u0440\u043E\u0433\u043E \u0438\u0445 \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442; \u043E\u043D \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442, \u043D\u0435 \u043F\u043E\u043E\u0449\u0440\u044F\u0435\u0442 \u0438 \u043D\u0435 \u0441\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u043D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u0441\u0435\u0442\u0435\u0432\u044B\u043C \u0430\u0442\u0430\u043A\u0430\u043C, \u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0430\u0446\u0438\u0438 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0441\u0442\u0435\u0439, \u043A\u0440\u0430\u0436\u0435 \u0434\u0430\u043D\u043D\u044B\u0445, \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E\u043C\u0443 \u043F\u0440\u043E\u043D\u0438\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044E \u0432 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0438\u043B\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0433\u043E \u0438 \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430. \u041B\u044E\u0431\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0434\u043B\u044F \u043F\u0440\u0430\u0432\u043E\u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0439 \u043D\u0435 \u0441\u0432\u044F\u0437\u0430\u043D\u043E \u0441 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u043E\u043C: \u043F\u043E\u043B\u043D\u0443\u044E \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0437\u0430\u043A\u043E\u043D\u0443 \u043D\u0435\u0441\u0451\u0442 \u0441\u043E\u0432\u0435\u0440\u0448\u0438\u0432\u0448\u0435\u0435 \u0438\u0445 \u043B\u0438\u0446\u043E. \u0421\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u043D\u0430\u0443\u0447\u043D\u044B\u0435 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F, \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435, \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435, \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044E \u0438\u043B\u0438 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0435 \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u043C\u0435\u043D\u044F\u044E\u0442 \u043F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u043D\u0438\u0436\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F.</p>\r\n    <h3>1. \u0412 \u044D\u0442\u043E\u043C \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0438 \u043D\u0435\u0442 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0433\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044F</h3>\r\n    <p>\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u043C\u044B\u0435 \u0432 dsh-purge \u043A\u043E\u0434, \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F, \u043F\u0430\u0442\u0447\u0438 \u0438 \u043F\u0440\u043E\u043C\u043F\u0442\u044B \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043D\u0435 \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0442\u0440\u043E\u044F\u043D\u0430\u043C\u0438, \u0431\u044D\u043A\u0434\u043E\u0440\u0430\u043C\u0438, \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438 \u043D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0435\u043D\u0442\u0435\u0441\u0442\u0430, \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430\u043C\u0438-\u0432\u044B\u043C\u043E\u0433\u0430\u0442\u0435\u043B\u044F\u043C\u0438 \u0438\u043B\u0438 \u0441\u043A\u0440\u0438\u043F\u0442\u0430\u043C\u0438 credential stuffing, \u0430 \u0440\u0430\u0432\u043D\u043E \u043F\u043E\u043B\u0435\u0437\u043D\u043E\u0439 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u043E\u0439 \u0434\u043B\u044F \u0430\u0442\u0430\u043A \u043D\u0430 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0441\u0435\u0442\u0438 \u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0442\u0440\u0435\u0442\u044C\u0438\u0445 \u043B\u0438\u0446. \u041F\u0440\u043E\u0435\u043A\u0442 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0433\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044F \u0438 \u043D\u0435 \u043F\u043E\u0434\u0441\u0442\u0440\u0435\u043A\u0430\u0435\u0442, \u043D\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0443\u0435\u0442 \u0438 \u043D\u0435 \u0441\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044E \u043F\u0440\u0430\u0432\u043E\u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0439.</p>\r\n    <h3>2. \u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u0434\u0430\u044E\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0432\u043D\u0435\u0448\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F</h3>\r\n    <p>\u041F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043F\u0430\u0442\u0447\u0435\u0439, \u0437\u0430\u043F\u0438\u0441\u044C, \u043E\u0442\u043A\u0430\u0442 \u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0444\u0430\u0439\u043B\u0430\u0445 \u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u0445 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u044B. \u042D\u0442\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u0441\u043A\u0430\u043D\u0438\u0440\u0443\u044E\u0442, \u043D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u044E\u0442, \u043D\u0435 \u0432\u0437\u043B\u0430\u043C\u044B\u0432\u0430\u044E\u0442 \u0438 \u043D\u0435 \u0430\u0442\u0430\u043A\u0443\u044E\u0442 \u043F\u0430\u043A\u0435\u0442\u0430\u043C\u0438 \u043D\u0438\u043A\u0430\u043A\u0438\u0435 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0445\u043E\u0441\u0442\u044B \u0438\u043B\u0438 \u043D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B, \u0438 \u044D\u0442\u0443 \u043C\u0430\u0448\u0438\u043D\u0443 \u043D\u0435\u043B\u044C\u0437\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u043A \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u0447\u043D\u044B\u0439 \u0443\u0437\u0435\u043B.</p>\r\n    <p>\u0415\u0441\u043B\u0438 \u0432 \u043F\u043B\u0430\u0433\u0438\u043D\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439, \u043E\u043D \u043C\u043E\u0436\u0435\u0442 \u043E\u0431\u0440\u0430\u0449\u0430\u0442\u044C\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043A \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u043C\u0443 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u044E \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u043D\u0430 GitHub \u0434\u043B\u044F \u0441\u0432\u0435\u0440\u043A\u0438 \u0432\u0435\u0440\u0441\u0438\u0438. \u042D\u0442\u043E \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u043D\u0435 \u0441\u0432\u044F\u0437\u0430\u043D\u043E \u0441 \u0441\u0435\u0442\u0435\u0432\u044B\u043C\u0438 \u0430\u0442\u0430\u043A\u0430\u043C\u0438 \u043D\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0442\u0440\u0435\u0442\u044C\u0438\u0445 \u043B\u0438\u0446 \u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0442\u0440\u0430\u043A\u0442\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u043A\u0430\u043A \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043D\u0430 \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u043F\u0435\u043D\u0442\u0435\u0441\u0442.</p>\r\n    <h3>3. \u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0440\u0430\u043C\u043A\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F</h3>\r\n    <p>\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0441\u0440\u0435\u0434\u0430\u0445, \u043F\u0440\u0430\u0432\u043E \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0443 \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C: \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 Harness \u043D\u0430 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0432\u044B \u0432\u043F\u0440\u0430\u0432\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C; \u043E\u0444\u043B\u0430\u0439\u043D\u043E\u0432\u044B\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0438\u043D\u0442\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0446\u0435\u043B\u0438; \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u044B \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446 \u0432\u044B\u0434\u0430\u043B \u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435; \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0435 \u0441\u0440\u0435\u0434\u044B \u0432 \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u044B\u0445 \u043B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u0438\u044F\u0445. \u041F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u043C \u0446\u0435\u043B\u044F\u043C, \u0441\u0440\u043E\u043A\u0430\u043C \u0438 \u043E\u0431\u044A\u0451\u043C\u0443 \u0440\u0430\u0431\u043E\u0442. \u0423\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0438\u043B\u0438 \u0443\u0441\u0442\u043D\u044B\u0435 \u0437\u0430\u0432\u0435\u0440\u0435\u043D\u0438\u044F \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435\u043C \u043D\u0435 \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F.</p>\r\n    <p>\u0426\u0435\u043B\u0438 \u0431\u0435\u0437 \u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0433\u043E \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0430, \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435, \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u044B, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u2014 \u044D\u043D\u0435\u0440\u0433\u0435\u0442\u0438\u043A\u0430, \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442, \u0432\u043E\u0434\u043D\u043E\u0435 \u0445\u043E\u0437\u044F\u0439\u0441\u0442\u0432\u043E, \u0444\u0438\u043D\u0430\u043D\u0441\u044B, \u0433\u043E\u0441\u0443\u0441\u043B\u0443\u0433\u0438, \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E \u2014 \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043E\u0431\u044A\u0435\u043A\u0442\u0430\u043C\u0438 \u0443\u0447\u0435\u043D\u0438\u0439.</p>\r\n    <h3>4. \u0417\u0430\u043A\u043E\u043D\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0441\u043E\u0431\u043B\u044E\u0434\u0430\u0442\u044C, \u043F\u043E \u0441\u0442\u0430\u0442\u044C\u044F\u043C \u0438 \u043F\u0443\u043D\u043A\u0442\u0430\u043C</h3>\r\n    <p>\u0423\u0433\u043E\u043B\u043E\u0432\u043D\u044B\u0439 \u043A\u043E\u0434\u0435\u043A\u0441 \u041A\u041D\u0420, \u0441\u0442\u0430\u0442\u044C\u044F 285, \u0447\u0430\u0441\u0442\u044C 1: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F, \u043D\u0430\u0440\u0443\u0448\u0430\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u043F\u0440\u0435\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u044F, \u043F\u0440\u043E\u043D\u0438\u043A\u0430\u0442\u044C \u0432 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0432 \u0441\u0444\u0435\u0440\u0435 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0434\u0435\u043B, \u043E\u0431\u043E\u0440\u043E\u043D\u044B \u0438 \u043F\u0435\u0440\u0435\u0434\u043E\u0432\u044B\u0445 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439.</p>\r\n    <p>\u0427\u0430\u0441\u0442\u044C 2 \u0442\u043E\u0439 \u0436\u0435 \u0441\u0442\u0430\u0442\u044C\u0438: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u043E\u043D\u0438\u043A\u0430\u0442\u044C \u0432 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u043F\u043E\u043C\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u0432 \u0447\u0430\u0441\u0442\u0438 1 \u043B\u0438\u0431\u043E \u0438\u043D\u044B\u043C\u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u043C\u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430\u043C\u0438 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0445\u0440\u0430\u043D\u044F\u0449\u0438\u0435\u0441\u044F, \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u043C\u044B\u0435 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0435 \u0432 \u043D\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0435, \u0430 \u0440\u0430\u0432\u043D\u043E \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0442\u0430\u043A\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u043E\u0439.</p>\r\n    <p>\u0427\u0430\u0441\u0442\u044C 3: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B, \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u043F\u0440\u043E\u043D\u0438\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044F \u0432 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0438 \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0433\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043C\u0438; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0442\u0430\u043A\u0436\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u0442\u0430\u043A\u0438\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B, \u0437\u043D\u0430\u044F, \u0447\u0442\u043E \u0438\u0445 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u0434\u043B\u044F \u043F\u0440\u043E\u043D\u0438\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0433\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 286, \u0447\u0430\u0441\u0442\u044C 1: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0443\u0434\u0430\u043B\u044F\u0442\u044C, \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C, \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0438\u043B\u0438 \u043D\u0430\u0440\u0443\u0448\u0430\u0442\u044C \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0442\u0430\u043A, \u0447\u0442\u043E \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C.</p>\r\n    <p>\u0427\u0430\u0441\u0442\u044C 2 \u0442\u043E\u0439 \u0436\u0435 \u0441\u0442\u0430\u0442\u044C\u0438: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0443\u0434\u0430\u043B\u044F\u0442\u044C, \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C \u0438\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0445\u0440\u0430\u043D\u044F\u0449\u0438\u0435\u0441\u044F, \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u043C\u044B\u0435 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0435\u043C\u044B\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435.</p>\r\n    <p>\u0427\u0430\u0441\u0442\u044C 3: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0443\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0438 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u044F\u0442\u044C \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043D\u044B\u0435 \u0432\u0438\u0440\u0443\u0441\u044B \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B, \u0432\u043B\u0438\u044F\u044E\u0449\u0438\u0435 \u043D\u0430 \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u0443\u044E \u0440\u0430\u0431\u043E\u0442\u0443 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043D\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 287: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0434\u043B\u044F \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E\u0433\u043E \u043C\u043E\u0448\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430, \u043A\u0440\u0430\u0436\u0438, \u0445\u0438\u0449\u0435\u043D\u0438\u044F, \u0440\u0430\u0441\u0442\u0440\u0430\u0442\u044B \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432, \u043F\u043E\u0445\u0438\u0449\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0442\u0430\u0439\u043D\u044B \u0438 \u0438\u043D\u044B\u0445 \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0439.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 287-1, \u0447\u0430\u0441\u0442\u044C 1, \u043F\u0443\u043D\u043A\u0442 1: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0441\u0430\u0439\u0442\u044B \u0438 \u0433\u0440\u0443\u043F\u043F\u044B \u0441\u0432\u044F\u0437\u0438, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0435 \u0434\u043B\u044F \u043C\u043E\u0448\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430, \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u043E\u0441\u043E\u0431\u0430\u043C \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0439, \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D\u043D\u044B\u0445 \u0438 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u044B\u0445 \u0432 \u043E\u0431\u043E\u0440\u043E\u0442\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432 \u0438 \u0438\u043D\u043E\u0439 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0439 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438.</p>\r\n    <p>\u041F\u0443\u043D\u043A\u0442 2 \u0442\u043E\u0439 \u0436\u0435 \u0447\u0430\u0441\u0442\u0438: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E\u0431 \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0435 \u043D\u0430\u0440\u043A\u043E\u0442\u0438\u043A\u043E\u0432, \u043E\u0440\u0443\u0436\u0438\u044F, \u043F\u043E\u0440\u043D\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D\u043D\u044B\u0445 \u0438\u043B\u0438 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u044B\u0445 \u0432 \u043E\u0431\u043E\u0440\u043E\u0442\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0438\u043D\u0443\u044E \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E.</p>\r\n    <p>\u041F\u0443\u043D\u043A\u0442 3 \u0442\u043E\u0439 \u0436\u0435 \u0447\u0430\u0441\u0442\u0438: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0434\u043B\u044F \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u043C\u043E\u0448\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0438 \u0438\u043D\u044B\u0445 \u043F\u0440\u0430\u0432\u043E\u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0439.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 287-2: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F, \u0437\u043D\u0430\u044F \u043E\u0431 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0441\u0435\u0442\u0435\u0439 \u0434\u043B\u044F \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F, \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443, \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435, \u0440\u0430\u0441\u0447\u0451\u0442\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438 \u0438\u043D\u0443\u044E \u043F\u043E\u043C\u043E\u0449\u044C.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 253-1, \u0447\u0430\u0441\u0442\u0438 1 \u0438 3: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u043E\u0434\u0430\u0432\u0430\u0442\u044C \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0433\u0440\u0430\u0436\u0434\u0430\u043D; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0445\u0438\u0449\u0430\u0442\u044C \u0438\u0445 \u0438\u043B\u0438 \u0438\u043D\u044B\u043C \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u043C \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C.</p>\r\n    <p>\u0417\u0430\u043A\u043E\u043D \u041A\u041D\u0420 \u043E \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438, \u0441\u0442\u0430\u0442\u044C\u044F 13, \u0447\u0430\u0441\u0442\u044C 2: \u043F\u043E\u043B\u044C\u0437\u0443\u044F\u0441\u044C \u0441\u0435\u0442\u044C\u044E, \u043D\u0435\u043B\u044C\u0437\u044F \u0432\u0440\u0435\u0434\u0438\u0442\u044C \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0438 \u043D\u0435\u043B\u044C\u0437\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0435\u0442\u044C \u0434\u043B\u044F \u043F\u043E\u0441\u044F\u0433\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432 \u043D\u0430 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u0443\u044E \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C, \u0447\u0435\u0441\u0442\u044C \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u044B; \u0434\u043B\u044F \u043F\u043E\u0434\u0441\u0442\u0440\u0435\u043A\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430 \u043A \u0441\u0432\u0435\u0440\u0436\u0435\u043D\u0438\u044E \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0432\u043B\u0430\u0441\u0442\u0438 \u0438 \u0441\u043E\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0441\u0442\u0440\u043E\u044F; \u043A \u0440\u0430\u0441\u043A\u043E\u043B\u0443 \u0441\u0442\u0440\u0430\u043D\u044B \u0438 \u043F\u043E\u0434\u0440\u044B\u0432\u0443 \u0435\u0451 \u0435\u0434\u0438\u043D\u0441\u0442\u0432\u0430; \u0434\u043B\u044F \u043F\u0440\u043E\u043F\u0430\u0433\u0430\u043D\u0434\u044B \u0442\u0435\u0440\u0440\u043E\u0440\u0438\u0437\u043C\u0430 \u0438 \u044D\u043A\u0441\u0442\u0440\u0435\u043C\u0438\u0437\u043C\u0430, \u043D\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u043D\u0435\u043D\u0430\u0432\u0438\u0441\u0442\u0438 \u0438 \u043D\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u0440\u043E\u0437\u043D\u0438; \u0434\u043B\u044F \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043D\u0430\u0441\u0438\u043B\u0438\u044F \u0438 \u043F\u043E\u0440\u043D\u043E\u0433\u0440\u0430\u0444\u0438\u0438; \u0434\u043B\u044F \u0444\u0430\u0431\u0440\u0438\u043A\u0430\u0446\u0438\u0438 \u0438 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043B\u043E\u0436\u043D\u044B\u0445 \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u0439, \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0449\u0438\u0445 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0438 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A; \u0430 \u0442\u0430\u043A\u0436\u0435 \u0434\u043B\u044F \u043F\u043E\u0441\u044F\u0433\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432 \u043D\u0430 \u0447\u0435\u0441\u0442\u044C, \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u044C, \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0438 \u0438\u043D\u044B\u0435 \u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0430 \u0434\u0440\u0443\u0433\u0438\u0445 \u043B\u0438\u0446.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 14: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0435\u0442\u044C \u0434\u043B\u044F \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u0432\u0440\u0435\u0434\u044F\u0449\u0435\u0439 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u043C\u0443 \u0438 \u043F\u0441\u0438\u0445\u0438\u0447\u0435\u0441\u043A\u043E\u043C\u0443 \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044E \u043D\u0435\u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u043E\u043B\u0435\u0442\u043D\u0438\u0445.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 29: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u043F\u0440\u043E\u043D\u0438\u043A\u0430\u0442\u044C \u0432 \u0447\u0443\u0436\u0438\u0435 \u0441\u0435\u0442\u0438, \u043D\u0430\u0440\u0443\u0448\u0430\u0442\u044C \u0438\u0445 \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u0443\u044E \u0440\u0430\u0431\u043E\u0442\u0443 \u0438 \u043F\u043E\u0445\u0438\u0449\u0430\u0442\u044C \u0441\u0435\u0442\u0435\u0432\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B, \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u043F\u0440\u043E\u043D\u0438\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044F \u0432 \u0441\u0435\u0442\u0438, \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044F \u0438\u0445 \u0440\u0430\u0431\u043E\u0442\u044B \u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0437\u0430\u0449\u0438\u0442\u044B, \u043F\u043E\u0445\u0438\u0449\u0435\u043D\u0438\u044F \u0441\u0435\u0442\u0435\u0432\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445; \u0437\u043D\u0430\u044F \u043E \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u0432\u0440\u0435\u0434\u044F\u0449\u0435\u0439 \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438, \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443, \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435, \u0440\u0430\u0441\u0447\u0451\u0442\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438 \u0438\u043D\u0443\u044E \u043F\u043E\u043C\u043E\u0449\u044C.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 33: \u043A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u2014 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C \u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438, \u044D\u043D\u0435\u0440\u0433\u0435\u0442\u0438\u043A\u0430, \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442, \u0432\u043E\u0434\u043D\u043E\u0435 \u0445\u043E\u0437\u044F\u0439\u0441\u0442\u0432\u043E, \u0444\u0438\u043D\u0430\u043D\u0441\u044B, \u0433\u043E\u0441\u0443\u0441\u043B\u0443\u0433\u0438, \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E \u2014 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u043F\u043E\u0434 \u043E\u0441\u043E\u0431\u043E\u0439 \u0437\u0430\u0449\u0438\u0442\u043E\u0439. \u0411\u0435\u0437 \u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u043D\u0438\u043A\u0430\u0442\u044C \u0432 \u043D\u0435\u0451, \u043D\u0430\u0440\u0443\u0448\u0430\u0442\u044C \u0435\u0451 \u0440\u0430\u0431\u043E\u0442\u0443 \u0438\u043B\u0438 \u0440\u0430\u0437\u0440\u0443\u0448\u0430\u0442\u044C \u0435\u0451 \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u043E.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 46: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0445\u0438\u0449\u0430\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u0438\u043D\u044B\u043C \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u043C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0438\u0445, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u043F\u0440\u043E\u0434\u0430\u0432\u0430\u0442\u044C \u0438\u0445 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u043C \u043B\u0438\u0446\u0430\u043C.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 48: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0441\u0430\u0439\u0442\u044B \u0438 \u0433\u0440\u0443\u043F\u043F\u044B \u0441\u0432\u044F\u0437\u0438 \u0434\u043B\u044F \u043C\u043E\u0448\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430, \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u043E\u0441\u043E\u0431\u0430\u043C \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0439, \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D\u043D\u044B\u0445 \u0438 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u044B\u0445 \u0432 \u043E\u0431\u043E\u0440\u043E\u0442\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432 \u0438 \u0438\u043D\u043E\u0439 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0439 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0435\u0442\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0442\u0430\u043A\u043E\u0439 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 50: \u0432 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0445 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F\u0445 \u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C\u043E\u043C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u043E\u043C \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0438 \u043D\u0435\u043B\u044C\u0437\u044F \u0440\u0430\u0437\u043C\u0435\u0449\u0430\u0442\u044C \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u0438 \u0432\u043A\u043B\u044E\u0447\u0430\u0442\u044C \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u044F, \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044F \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u0430 \u0437\u0430\u043A\u043E\u043D\u043E\u043C \u0438 \u043F\u043E\u0434\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C\u0438 \u0430\u043A\u0442\u0430\u043C\u0438.</p>\r\n    <p>\u0417\u0430\u043A\u043E\u043D \u041A\u041D\u0420 \u043E \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0434\u0430\u043D\u043D\u044B\u0445, \u0441\u0442\u0430\u0442\u044C\u044F 8: \u0437\u0430\u043D\u0438\u043C\u0430\u044F\u0441\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u043E\u0439 \u0434\u0430\u043D\u043D\u044B\u0445, \u043D\u0435\u043B\u044C\u0437\u044F \u0432\u0440\u0435\u0434\u0438\u0442\u044C \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0438 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430\u043C, \u043D\u0435\u043B\u044C\u0437\u044F \u043D\u0430\u0440\u0443\u0448\u0430\u0442\u044C \u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0430 \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u044B \u0433\u0440\u0430\u0436\u0434\u0430\u043D \u0438 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0439.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 32, \u0447\u0430\u0441\u0442\u044C 1: \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C\u0438 \u0438 \u043F\u0440\u0430\u0432\u043E\u043C\u0435\u0440\u043D\u044B\u043C\u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0430\u043C\u0438; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0445\u0438\u0449\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0438\u0445 \u0438\u043D\u044B\u043C \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u043C.</p>\r\n    <p>\u0427\u0430\u0441\u0442\u044C 2 \u0442\u043E\u0439 \u0436\u0435 \u0441\u0442\u0430\u0442\u044C\u0438: \u0435\u0441\u043B\u0438 \u0437\u0430\u043A\u043E\u043D \u0438\u043B\u0438 \u043F\u043E\u0434\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0439 \u0430\u043A\u0442 \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0446\u0435\u043B\u0438 \u0438 \u043E\u0431\u044A\u0451\u043C \u0441\u0431\u043E\u0440\u0430 \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445, \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0438\u0445 \u043C\u043E\u0436\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u044D\u0442\u0438\u0445 \u0446\u0435\u043B\u044F\u0445 \u0438 \u043E\u0431\u044A\u0451\u043C\u0435.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 51: \u0437\u0430 \u043F\u043E\u0445\u0438\u0449\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u043B\u0438 \u0438\u043D\u043E\u0435 \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0435 \u0438\u0445 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0437\u0430 \u043F\u0440\u0438\u0447\u0438\u043D\u0451\u043D\u043D\u044B\u0439 \u044D\u0442\u0438\u043C \u0432\u0440\u0435\u0434 \u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C \u043F\u0440\u0430\u0432\u0430\u043C \u0433\u0440\u0430\u0436\u0434\u0430\u043D \u0438 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0439 \u043D\u0430\u0441\u0442\u0443\u043F\u0430\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C \u0437\u0430\u043A\u043E\u043D\u0430\u043C \u0438 \u043F\u043E\u0434\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C \u0430\u043A\u0442\u0430\u043C.</p>\r\n    <p>\u0417\u0430\u043A\u043E\u043D \u041A\u041D\u0420 \u043E \u0437\u0430\u0449\u0438\u0442\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u0441\u0442\u0430\u0442\u044C\u044F 5: \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0439, \u043F\u0440\u0430\u0432\u043E\u043C\u0435\u0440\u043D\u043E\u0439, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0439 \u0438 \u0434\u043E\u0431\u0440\u043E\u0441\u043E\u0432\u0435\u0441\u0442\u043D\u043E\u0439; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u0438\u0445 \u043F\u0443\u0442\u0451\u043C \u0432\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0432 \u0437\u0430\u0431\u043B\u0443\u0436\u0434\u0435\u043D\u0438\u0435, \u043E\u0431\u043C\u0430\u043D\u0430 \u0438\u043B\u0438 \u043F\u0440\u0438\u043D\u0443\u0436\u0434\u0435\u043D\u0438\u044F.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 6, \u0447\u0430\u0441\u0442\u0438 1 \u0438 2: \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043C\u0435\u0442\u044C \u044F\u0441\u043D\u0443\u044E \u0438 \u0440\u0430\u0437\u0443\u043C\u043D\u0443\u044E \u0446\u0435\u043B\u044C \u0438 \u0431\u044B\u0442\u044C \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u043E \u0441\u0432\u044F\u0437\u0430\u043D\u0430 \u0441 \u043D\u0435\u0439 \u043F\u0440\u0438 \u0432\u044B\u0431\u043E\u0440\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u0430 \u0441 \u043D\u0430\u0438\u043C\u0435\u043D\u044C\u0448\u0438\u043C \u0432\u043B\u0438\u044F\u043D\u0438\u0435\u043C \u043D\u0430 \u043F\u0440\u0430\u0432\u0430 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430; \u0441\u0431\u043E\u0440 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u043C \u043E\u0431\u044A\u0451\u043C\u043E\u043C, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u043C \u0434\u043B\u044F \u0446\u0435\u043B\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438, \u0438\u0437\u0431\u044B\u0442\u043E\u0447\u043D\u044B\u0439 \u0441\u0431\u043E\u0440 \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 10: \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C, \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u0440\u0443\u0433\u0438\u0445 \u043B\u0438\u0446, \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u044C, \u043F\u0440\u043E\u0434\u0430\u0432\u0430\u0442\u044C, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u0438\u043B\u0438 \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0438\u0445; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u0432\u0440\u0435\u0434\u044F\u0449\u0430\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0438 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430\u043C.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u044F 13: \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u0431\u0435\u0437 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430, \u0435\u0441\u043B\u0438 \u044D\u0442\u043E \u043D\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0434\u043B\u044F \u0437\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430, \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0445 \u043E\u0431\u044F\u0437\u0430\u043D\u043D\u043E\u0441\u0442\u0435\u0439, \u0434\u043B\u044F \u0440\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u0447\u0440\u0435\u0437\u0432\u044B\u0447\u0430\u0439\u043D\u0443\u044E \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044E, \u0434\u043B\u044F \u0436\u0443\u0440\u043D\u0430\u043B\u0438\u0441\u0442\u0438\u043A\u0438 \u0432 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430\u0445, \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0443\u0436\u0435 \u0437\u0430\u043A\u043E\u043D\u043D\u043E \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u0441\u0430\u043C\u0438\u043C \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u043C \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u0439, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0432 \u0438\u043D\u044B\u0445 \u0441\u043B\u0443\u0447\u0430\u044F\u0445, \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u043E\u043D\u043E\u043C \u0438 \u043F\u043E\u0434\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C\u0438 \u0430\u043A\u0442\u0430\u043C\u0438.</p>\r\n    <p>\u0421\u0442\u0430\u0442\u044C\u0438 28 \u0438 29: \u0431\u0438\u043E\u043C\u0435\u0442\u0440\u0438\u044F, \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u0441\u0447\u0435\u0442\u0430, \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0438, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u0435\u0442\u0435\u0439 \u043C\u043B\u0430\u0434\u0448\u0435 \u0447\u0435\u0442\u044B\u0440\u043D\u0430\u0434\u0446\u0430\u0442\u0438 \u043B\u0435\u0442 \u043E\u0442\u043D\u043E\u0441\u044F\u0442\u0441\u044F \u043A \u0447\u0443\u0432\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C. \u041E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u0438\u0445 \u043D\u0435\u043B\u044C\u0437\u044F \u0431\u0435\u0437 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0439 \u0446\u0435\u043B\u0438, \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E\u0439 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438, \u0441\u0442\u0440\u043E\u0433\u0438\u0445 \u043C\u0435\u0440 \u0437\u0430\u0449\u0438\u0442\u044B \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430.</p>\r\n    <p>\u041A\u0440\u043E\u043C\u0435 \u0442\u043E\u0433\u043E, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0441\u043E\u0431\u043B\u044E\u0434\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0437\u0430\u043A\u043E\u043D\u044B, \u043F\u043E\u0434\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0435 \u0430\u043A\u0442\u044B \u0438 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0442\u043E\u0440\u043E\u0432, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u0438 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043F\u0440\u043E\u0442\u0438\u0432 \u0437\u043B\u043E\u0443\u043F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u0439 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438.</p>\r\n    <h3>5. \u0417\u0430\u043F\u0440\u0435\u0449\u0451\u043D\u043D\u044B\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F</h3>\r\n    <p>\u041D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F. \u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u043A \u0446\u0435\u043B\u044C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438, \u0434\u043E\u043C\u0435\u043D\u044B, \u0430\u0434\u0440\u0435\u0441\u0430, \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B, \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u044B \u0438\u043B\u0438 \u043A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u0443\u044E \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0431\u0435\u0437 \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0441\u043A\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C, \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0442\u044C, \u0432\u0437\u043B\u0430\u043C\u044B\u0432\u0430\u0442\u044C, \u0431\u0440\u0430\u0442\u044C \u0438\u0445 \u043F\u043E\u0434 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0438\u043B\u0438 \u0430\u0442\u0430\u043A\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u043A\u0435\u0442\u0430\u043C\u0438. \u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0442\u0430\u0442\u044C\u0435 285 \u0447\u0430\u0441\u0442\u044F\u043C 1 \u0438 2 \u0423\u041A \u041A\u041D\u0420, \u0441\u0442\u0430\u0442\u044C\u044F\u043C 29 \u0438 33 \u0437\u0430\u043A\u043E\u043D\u0430 \u043E \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438.</p>\r\n    <p>\u0420\u0430\u0437\u0440\u0443\u0448\u0435\u043D\u0438\u0435 \u0438 \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B. \u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0443\u0434\u0430\u043B\u044F\u0442\u044C, \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C, \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0438 \u043D\u0430\u0440\u0443\u0448\u0430\u0442\u044C \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0447\u0443\u0436\u0438\u0445 \u0441\u0438\u0441\u0442\u0435\u043C, \u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0438 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u044F\u0442\u044C \u0432\u0438\u0440\u0443\u0441\u044B, \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B-\u0432\u044B\u043C\u043E\u0433\u0430\u0442\u0435\u043B\u0438 \u0438 \u0438\u043D\u044B\u0435 \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0440\u0430\u0437\u043C\u0435\u0449\u0430\u0442\u044C \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u0432 \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u044F\u0445 \u0438 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u043E\u043C \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0438. \u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0442\u0430\u0442\u044C\u0435 286 \u0447\u0430\u0441\u0442\u044F\u043C \u0441 1 \u043F\u043E 3 \u0423\u041A \u041A\u041D\u0420, \u0441\u0442\u0430\u0442\u044C\u0435 50 \u0437\u0430\u043A\u043E\u043D\u0430 \u043E \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438.</p>\r\n    <p>\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u043F\u043E\u043C\u043E\u0449\u044C. \u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u044D\u0442\u043E\u0442 \u043F\u0440\u043E\u0435\u043A\u0442 \u0438\u043B\u0438 \u044D\u0442\u0443 \u043C\u0430\u0448\u0438\u043D\u0443 \u0434\u0440\u0443\u0433\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u0434\u043B\u044F \u043F\u0440\u043E\u043D\u0438\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044F, \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0433\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043F\u043E\u0445\u0438\u0449\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F, \u0437\u043D\u0430\u044F \u043E \u0441\u0435\u0442\u0435\u0432\u043E\u043C \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0438, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B, \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B, \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443, \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u0440\u0430\u0441\u0447\u0451\u0442\u044B. \u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0442\u0430\u0442\u044C\u0435 285 \u0447\u0430\u0441\u0442\u0438 3 \u0438 \u0441\u0442\u0430\u0442\u044C\u0435 287-2 \u0423\u041A \u041A\u041D\u0420, \u0441\u0442\u0430\u0442\u044C\u0435 29 \u0437\u0430\u043A\u043E\u043D\u0430 \u043E \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438.</p>\r\n    <p>\u0414\u0430\u043D\u043D\u044B\u0435. \u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0445\u0438\u0449\u0430\u0442\u044C, \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0432\u0435\u0440\u0445 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0433\u043E, \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C, \u043F\u0440\u043E\u0434\u0430\u0432\u0430\u0442\u044C \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u0440\u0430\u0431\u043E\u0447\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u0443\u0447\u0451\u0442\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u043F\u0430\u0440\u043E\u043B\u0438 \u0438 \u0438\u043D\u044B\u0435 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u043C\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435. \u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0442\u0430\u0442\u044C\u044F\u043C 8, 32 \u0438 51 \u0437\u0430\u043A\u043E\u043D\u0430 \u043E \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0434\u0430\u043D\u043D\u044B\u0445.</p>\r\n    <p>\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435. \u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C, \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C, \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C, \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u044C, \u043F\u0440\u043E\u0434\u0430\u0432\u0430\u0442\u044C, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u0438\u043B\u0438 \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u0440\u0443\u0433\u0438\u0445 \u043B\u0438\u0446; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0438\u0437\u0431\u044B\u0442\u043E\u0447\u043D\u044B\u0439 \u0441\u0431\u043E\u0440; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043F\u0443\u0442\u0451\u043C \u0432\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0432 \u0437\u0430\u0431\u043B\u0443\u0436\u0434\u0435\u043D\u0438\u0435, \u043E\u0431\u043C\u0430\u043D\u0430 \u0438\u043B\u0438 \u043F\u0440\u0438\u043D\u0443\u0436\u0434\u0435\u043D\u0438\u044F; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0441\u0430\u043C\u043E\u0432\u043E\u043B\u044C\u043D\u0430\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0431\u0438\u043E\u043C\u0435\u0442\u0440\u0438\u0438, \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0445 \u0441\u0447\u0435\u0442\u043E\u0432, \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0438 \u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u0435\u0442\u0435\u0439. \u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0442\u0430\u0442\u044C\u0435 253-1 \u0447\u0430\u0441\u0442\u044F\u043C 1 \u0438 3 \u0423\u041A \u041A\u041D\u0420, \u0441\u0442\u0430\u0442\u044C\u0435 46 \u0437\u0430\u043A\u043E\u043D\u0430 \u043E \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438, \u0441\u0442\u0430\u0442\u044C\u044F\u043C 5, 6, 10, 13, 28 \u0438 29 \u0437\u0430\u043A\u043E\u043D\u0430 \u043E \u0437\u0430\u0449\u0438\u0442\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445.</p>\r\n    <p>\u041C\u043E\u0448\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F. \u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0438\u043B\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0430\u0439\u0442\u044B \u0438 \u0433\u0440\u0443\u043F\u043F\u044B \u0434\u043B\u044F \u043C\u043E\u0448\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430, \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u043E\u0441\u043E\u0431\u0430\u043C \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0439, \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D\u043D\u044B\u0445 \u0438 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u044B\u0445 \u0432 \u043E\u0431\u043E\u0440\u043E\u0442\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u0432; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u0442\u0430\u043A\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440 \u0434\u043B\u044F \u043C\u043E\u0448\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430, \u043A\u0440\u0430\u0436\u0438, \u0445\u0438\u0449\u0435\u043D\u0438\u044F, \u0440\u0430\u0441\u0442\u0440\u0430\u0442\u044B \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0438 \u043F\u043E\u0445\u0438\u0449\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0442\u0430\u0439\u043D\u044B. \u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0442\u0430\u0442\u044C\u0435 287 \u0438 \u0441\u0442\u0430\u0442\u044C\u0435 287-1 \u0447\u0430\u0441\u0442\u0438 1 \u043F\u0443\u043D\u043A\u0442\u0430\u043C \u0441 1 \u043F\u043E 3 \u0423\u041A \u041A\u041D\u0420, \u0441\u0442\u0430\u0442\u044C\u0435 48 \u0437\u0430\u043A\u043E\u043D\u0430 \u043E \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438.</p>\r\n    <p>\u041A\u043E\u043D\u0442\u0435\u043D\u0442. \u0417\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0438 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u044F\u0442\u044C \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B, \u0432\u0440\u0435\u0434\u044F\u0449\u0438\u0435 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438, \u0447\u0435\u0441\u0442\u0438 \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430\u043C; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0434\u0441\u0442\u0440\u0435\u043A\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E \u043A \u0441\u0432\u0435\u0440\u0436\u0435\u043D\u0438\u044E \u0438 \u0440\u0430\u0441\u043A\u043E\u043B\u0443; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0442\u0435\u0440\u0440\u043E\u0440\u0438\u0437\u043C, \u044D\u043A\u0441\u0442\u0440\u0435\u043C\u0438\u0437\u043C \u0438 \u043D\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u043D\u0435\u043D\u0430\u0432\u0438\u0441\u0442\u044C; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043D\u0430\u0441\u0438\u043B\u0438\u0435, \u043F\u043E\u0440\u043D\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u0438 \u0430\u0437\u0430\u0440\u0442\u043D\u044B\u0435 \u0438\u0433\u0440\u044B; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u0444\u0430\u0431\u0440\u0438\u043A\u0430\u0446\u0438\u044F \u043B\u043E\u0436\u043D\u044B\u0445 \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u0439, \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0449\u0438\u0445 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0438 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u044F\u0433\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E \u043D\u0430 \u0447\u0435\u0441\u0442\u044C, \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u044C \u0438 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C; \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u0432\u0440\u0435\u0434\u044F\u0449\u0438\u0439 \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044E \u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u043D\u0435\u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u043E\u043B\u0435\u0442\u043D\u0438\u0445. \u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0442\u0430\u0442\u044C\u0435 13 \u0447\u0430\u0441\u0442\u0438 2 \u0438 \u0441\u0442\u0430\u0442\u044C\u0435 14 \u0437\u0430\u043A\u043E\u043D\u0430 \u043E \u043A\u0438\u0431\u0435\u0440\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438.</p>\r\n    <p>\u0420\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432. \u0417\u0430\u043F\u0438\u0441\u0438, \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E\u0431 \u0430\u043A\u0442\u0438\u0432\u0430\u0445 \u0438 \u0444\u0430\u0439\u043B\u044B, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0435 \u0432 \u0445\u043E\u0434\u0435 \u0443\u0447\u0435\u043D\u0438\u0439, \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0440\u0430\u043C\u043A\u0430\u0445 \u0446\u0435\u043B\u0435\u0439 \u0438 \u0441\u0440\u043E\u043A\u043E\u0432, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u0432 \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u043E\u043C \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0438; \u0438\u0445 \u043D\u0435\u043B\u044C\u0437\u044F \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u043B\u0438\u0446\u0430\u043C, \u043D\u0435 \u0438\u043C\u0435\u044E\u0449\u0438\u043C \u043F\u0440\u0430\u0432\u0430 \u0437\u043D\u0430\u0442\u044C \u043E \u043D\u0438\u0445, \u0438 \u043D\u0435\u043B\u044C\u0437\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432 \u0446\u0435\u043B\u044F\u0445 \u0437\u0430 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u043C\u0438 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F.</p>\r\n    <h3>6. \u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043D\u0435\u0441\u0451\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</h3>\r\n    <p>\u041F\u0440\u043E\u0435\u043A\u0442 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u043E \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0438 MIT \u0432 \u0442\u043E\u043C \u0432\u0438\u0434\u0435, \u043A\u0430\u043A \u0435\u0441\u0442\u044C. \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u043D\u0435 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u0442 \u043F\u043E\u043B\u043D\u043E\u0442\u0443, \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0438 \u043F\u0440\u0438\u0433\u043E\u0434\u043D\u043E\u0441\u0442\u044C. \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E \u0438 \u0432 \u043F\u043E\u043B\u043D\u043E\u043C \u043E\u0431\u044A\u0451\u043C\u0435 \u043D\u0435\u0441\u0451\u0442 \u0433\u0440\u0430\u0436\u0434\u0430\u043D\u0441\u043A\u0443\u044E, \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u0443\u044E \u0438 \u0443\u0433\u043E\u043B\u043E\u0432\u043D\u0443\u044E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0441\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435, \u0440\u0430\u0437\u0432\u0451\u0440\u0442\u044B\u0432\u0430\u043D\u0438\u0435, \u0437\u0430\u043F\u0443\u0441\u043A, \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0438 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u0435, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0437\u0430 \u0432\u0441\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0438 \u0432\u044B\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435. \u0410\u0432\u0442\u043E\u0440\u044B \u0438 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u043D\u0435 \u043D\u0435\u0441\u0443\u0442 \u043F\u0440\u044F\u043C\u043E\u0439, \u043A\u043E\u0441\u0432\u0435\u043D\u043D\u043E\u0439 \u0438\u043B\u0438 \u0441\u043E\u043B\u0438\u0434\u0430\u0440\u043D\u043E\u0439 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u044F \u0437\u043B\u043E\u0443\u043F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u044F.</p>\r\n    <p>\u041E\u0442\u043C\u0435\u0442\u043A\u0443 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0432\u0438\u0442 \u0441\u0430\u043C \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440: \u043E\u043D\u0430 \u043D\u0435 \u0437\u0430\u043C\u0435\u043D\u044F\u0435\u0442 \u0442\u0435\u0445, \u043A\u0442\u043E \u043D\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043B \u044D\u0442\u043E \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435, \u0438 \u043D\u0435 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043E\u0431\u044A\u044F\u0432\u043B\u044F\u0442\u044C \u0447\u0443\u0436\u0438\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u043C\u0438.</p>\r\n    <h3>7. \u041D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0435 \u043F\u0440\u0435\u043A\u0440\u0430\u0449\u0430\u0435\u0442 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435</h3>\r\n    <p>\u041F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0434\u043B\u044F \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0445 \u0430\u0442\u0430\u043A, \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u043E\u0439 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0438\u043B\u0438 \u043B\u044E\u0431\u043E\u0433\u043E \u0438\u0437 \u043F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D\u043D\u044B\u0445 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0439 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043D\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u0440\u0435\u043A\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0441 \u0434\u0430\u0442\u044B \u0442\u0430\u043A\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E. \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E \u043F\u0440\u0435\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435, \u0443\u043D\u0438\u0447\u0442\u043E\u0436\u0438\u0442\u044C \u043A\u043E\u0434, \u0441\u043A\u0440\u0438\u043F\u0442\u044B \u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0438 \u043F\u043E\u043D\u0435\u0441\u0442\u0438 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0437\u0430\u043A\u043E\u043D\u0443. \u041F\u043E\u0441\u043B\u0435 \u043F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u0438\u0433\u043E\u043D \u043D\u0435\u043B\u044C\u0437\u044F \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0438 \u0434\u0430\u043B\u044C\u0448\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C.</p>\r\n    <h3>8. \u0421\u0432\u044F\u0437\u044C \u0441 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u043C DeepSeek</h3>\r\n    <p>\u041F\u0440\u043E\u0435\u043A\u0442 \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u044B\u0439 \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0439: \u043E\u043D \u043D\u0435 \u043F\u043E\u0434\u0447\u0438\u043D\u0451\u043D \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u043C\u0443 DeepSeek \u0438 \u0435\u0433\u043E \u0430\u0444\u0444\u0438\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u043B\u0438\u0446\u0430\u043C, \u043D\u0435 \u0438\u043C\u0435\u0435\u0442 \u0441 \u043D\u0438\u043C\u0438 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430, \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0439 \u0438\u043B\u0438 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0434\u043E\u0431\u0440\u0435\u043D\u0438\u044F. \u0421\u043B\u043E\u0432\u043E \xAB\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439\xBB \u0432 \u0442\u0435\u043A\u0441\u0442\u0435 \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442 \u043B\u0438\u0448\u044C, \u0447\u0442\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u043C \u043E\u0446\u0435\u043D\u043A\u0438 \u0441\u043B\u0443\u0436\u0438\u0442 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0430\u043A\u0435\u0442 DeepSeek Harness, \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u043D\u0430 \u043C\u0430\u0448\u0438\u043D\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0438 \u043D\u0435 \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442, \u0447\u0442\u043E \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 DeepSeek \u0440\u0430\u0437\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442, \u043E\u0434\u043E\u0431\u0440\u044F\u0435\u0442 \u0438\u043B\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u0442 \u044D\u0442\u043E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D.</p>\r\n    <p>\u041A\u043E\u043D\u0435\u0446 \u0442\u0435\u043A\u0441\u0442\u0430. \u0422\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u043E\u0442\u0441\u0447\u0451\u0442 \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0441\u044F, \u0432\u044B \u043F\u0440\u043E\u043A\u0440\u0443\u0442\u0438\u043B\u0438 \u0434\u043E \u044D\u0442\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u0438 \u043E\u0442\u043C\u0435\u0442\u0438\u043B\u0438 \u0432\u0441\u0435 \u0442\u0440\u0438 \u043F\u0443\u043D\u043A\u0442\u0430, \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F, \u0447\u0442\u043E \u0432\u044B \u043E\u0442 \u0441\u0432\u043E\u0435\u0433\u043E \u0438\u043C\u0435\u043D\u0438 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0435 \u044D\u0442\u043E \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0438 \u0437\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u0442\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u0430.</p>";
function AuthGate(props) {
  const t = useT();
  const [left, setLeft] = useState(10);
  const [readEnd, setReadEnd] = useState(false);
  const [checks, setChecks] = useState({
    read: false,
    scope: false,
    ban: false
  });
  const legalRef = useRef(null);
  useEffect(() => {
    const id = window.setInterval(() => {
      setLeft((n) => {
        if (n <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return n - 1;
      });
    }, 1e3);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    const el = legalRef.current;
    if (!el) return;
    if (el.scrollHeight <= el.clientHeight + 4) setReadEnd(true);
  }, []);
  const locked = left > 0 || !readEnd;
  const ready = !locked && checks.read && checks.scope && checks.ban;
  const hint = left > 0 ? t("auth.hint.wait").replace("{n}", String(left)) : readEnd ? t("auth.hint.check") : t("auth.hint.scroll");
  const onScroll = () => {
    const el = legalRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) setReadEnd(true);
  };
  const toggle = (id) => {
    if (locked) return;
    setChecks((prev) => Object.assign({}, prev, { [id]: !prev[id] }));
  };
  const okLabel = !ready ? t("auth.ok") : props.pending === "full" ? t("auth.ok.full") : props.pending === "env" ? t("auth.ok.env") : t("auth.ok.tab");
  return h(
    "div",
    { className: "dshpp-auth-mask", role: "dialog", "aria-modal": "true" },
    h(
      "div",
      { className: "dshpp-auth-modal" },
      h("h2", null, t("auth.title")),
      h(
        "div",
        {
          className: "muted",
          style: {
            color: "var(--dsw-alias-label-secondary,#999)",
            fontSize: 12
          }
        },
        t("auth.lead")
      ),
      h("div", { className: "dshpp-auth-warn" }, t("auth.warn")),
      h("div", {
        className: "dshpp-auth-legal",
        ref: legalRef,
        onScroll,
        dangerouslySetInnerHTML: { __html: AUTH_LEGAL_HTML }
      }),
      h(
        "div",
        {
          style: {
            color: "var(--dsw-alias-label-secondary,#999)",
            fontSize: 12
          }
        },
        hint
      ),
      h(
        "div",
        { className: "dshpp-auth-checks" },
        [
          ["read", "auth.check.read"],
          ["scope", "auth.check.scope"],
          ["ban", "auth.check.ban"]
        ].map(
          (row) => h(
            "label",
            { key: row[0], className: locked ? "locked" : "" },
            h("input", {
              type: "checkbox",
              checked: !!checks[row[0]],
              disabled: locked,
              onChange: () => toggle(row[0])
            }),
            h("span", null, t(row[1]))
          )
        )
      ),
      h(
        "div",
        { className: "dshpp-auth-ops" },
        h(
          "button",
          {
            type: "button",
            onClick: () => setDock({ authOpen: false, tab: "clean", pending: "tab" })
          },
          t("auth.no")
        ),
        h(
          "button",
          {
            type: "button",
            className: "primary",
            disabled: !ready,
            onClick: () => {
              if (!ready) return;
              writeDrillAuth(true);
              const kind = props.pending || "tab";
              setDock({
                authOpen: false,
                open: true,
                tab: "drill",
                pending: "tab"
              });
              try {
                if (__dshPurgeDrill && __dshPurgeDrill.setUI)
                  __dshPurgeDrill.setUI({ open: true });
              } catch {
              }
              if (kind === "env") {
                try {
                  if (__dshPurgeDrill && __dshPurgeDrill.setUI)
                    __dshPurgeDrill.setUI({ open: true, tab: "env" });
                } catch {
                }
              }
              if (kind === "full") {
                try {
                  window.open(
                    window.location.href.split("#")[0] + "#redteam-full",
                    "_blank",
                    "noopener"
                  );
                } catch {
                }
              }
            }
          },
          okLabel
        )
      )
    )
  );
}

// src/shared/runtime-error.js
function runtimeRepairDetails(report) {
  if (!report || report.ok !== false) return [];
  const text = (value) => typeof value === "string" ? value.replace(/[\r\n\t]+/g, " ").slice(0, 1200) : "";
  const details = [];
  const add = (label, value) => {
    const safe = text(value);
    if (safe) details.push(`${label}: ${safe}`);
  };
  add("runtime", report.reason);
  add("runtime error", report.error);
  add("runtime code", report.code);
  const link = report.symlink;
  if (link?.ok === false) {
    add("runtime link", link.reason);
    add("link error", link.error);
    add("link code", link.code);
    add("backup", link.backup);
    add("retained candidate", link.failedLink);
    if (link.rollback?.ok === false) {
      details.push("rollback: failed");
      add("rollback error", link.rollback.error);
    } else if (link.rollback?.ok === true) {
      details.push("rollback: original link restored");
    }
  }
  for (const shim of (Array.isArray(report.shims) ? report.shims : []).slice(
    0,
    8
  )) {
    if (!["read_error", "write_error"].includes(shim?.status)) continue;
    add("launcher", shim.path);
    add("launcher status", shim.status);
    add("launcher error", shim.error);
  }
  return details;
}

// src/api/client.js
function clientGuessSurface() {
  try {
    if (typeof navigator !== "undefined" && /electron/i.test(navigator.userAgent || ""))
      return "desktop";
    if (typeof location !== "undefined") {
      const port = String(location.port || "");
      if (port === "43120") return "desktop";
      const host3 = String(location.hostname || "");
      if (host3 && host3 !== "127.0.0.1" && host3 !== "localhost" && /dsh desktop/i.test(String(location.href || "")))
        return "desktop";
    }
  } catch {
  }
  return "";
}
function hostSurfaceOf(s) {
  return s && s.surface || clientGuessSurface() || "web";
}
function hostText(t, key, surface) {
  if (surface && surface !== "web") {
    const specific = key + "." + surface;
    const hit = t(specific);
    if (hit && hit !== specific) return hit;
  }
  return t(key);
}
function apiUrl(p) {
  try {
    return new URL(p, window.location.origin).toString();
  } catch {
    return p;
  }
}
function apiTimeoutMs(p, init) {
  const path = String(p || "");
  const method = String(init && init.method || "GET").toUpperCase();
  if (path.indexOf("/dsh-purge/community") !== -1)
    return method === "POST" ? 6e5 : 2e4;
  if (path.indexOf("/dsh-purge/update") !== -1)
    return method === "POST" ? 18e4 : 45e3;
  if (path.indexOf("/dsh-purge/uninstall") !== -1) return 9e4;
  if (path.indexOf("/dsh-purge/skill") !== -1)
    return method === "POST" ? 12e4 : 2e4;
  if (path.indexOf("/dsh-purge/status") !== -1) return 6e4;
  if (path.indexOf("/dsh-purge/apply") !== -1) return 24e4;
  if (path.indexOf("/dsh-purge/revert") !== -1) return 12e4;
  if (path.indexOf("/dsh-purge/restart") !== -1) return 6e4;
  return 2e4;
}
function isAbortError(e) {
  const msg = String(e && e.message || e || "");
  return e && e.name === "AbortError" || /aborted|abort/i.test(msg);
}
function apiError(message, status) {
  return Object.assign(new Error(message), { status });
}
var pendingStatus = null;
function apiJson(p, init) {
  const method = String(init?.method || "GET").toUpperCase();
  if (method !== "GET") pendingStatus = null;
  if (p !== "/dsh-purge/status" || init) return requestJson(p, init);
  if (pendingStatus) return pendingStatus;
  const request = requestJson(p, init);
  pendingStatus = request;
  const clear = () => {
    if (pendingStatus === request) pendingStatus = null;
  };
  request.then(clear, clear);
  return request;
}
function unavailableStatus(error) {
  return {
    ok: false,
    error: String(error?.message || error || "bad response")
  };
}
async function requestJson(p, init) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), apiTimeoutMs(p, init));
  try {
    const r = await fetch(
      apiUrl(p),
      Object.assign(
        { cache: "no-store", credentials: "same-origin", signal: ctrl.signal },
        init || {}
      )
    );
    const text = await r.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      throw apiError(r.status + " non-json: " + text.slice(0, 120), r.status);
    }
    if (!r.ok) {
      const runtimeDetails = runtimeRepairDetails(data?.cli_repair);
      const message = data && (data.error || data.message) || r.status + " " + r.statusText;
      throw Object.assign(
        apiError([message, ...runtimeDetails].join("\n"), r.status),
        { runtimeDetails }
      );
    }
    return data;
  } catch (e) {
    if (isAbortError(e)) throw new Error("timeout");
    const msg = String(e && e.message || e || "");
    if (!e?.status && /failed to fetch|networkerror|load failed/i.test(msg)) {
      throw new Error("\u043D\u0435\u0442 \u0441\u0432\u044F\u0437\u0438 \u0441 API, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435, \u0447\u0442\u043E dsh \u0435\u0449\u0451 \u0437\u0430\u043F\u0443\u0449\u0435\u043D, \u0437\u0430\u0442\u0435\u043C Ctrl+F5");
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
function promptBoxEmpty(text) {
  return !String(text || "").trim();
}
function responseNeedsPrompt(d) {
  return Boolean(d && (d.needPrompt || d.injectSource === "none"));
}
function warnNeedPrompt(d, tr) {
  if (!responseNeedsPrompt(d)) return false;
  window.alert(tr("need.prompt"));
  return true;
}
async function bothInjectEmpty(overrideText, defaultText) {
  if (!promptBoxEmpty(overrideText)) return false;
  if (!promptBoxEmpty(defaultText)) return false;
  return true;
}
function rulesApi(op, extra) {
  return apiJson("/dsh-purge/rules", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(Object.assign({ op }, extra || {}))
  });
}
function skillsRouteMissing(e) {
  return e?.status === 404 || e?.status === 405;
}
function skillsApi(op, extra) {
  const init = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(Object.assign({ op }, extra || {}))
  };
  return apiJson("/dsh-purge/skills", init).catch((e) => {
    if (!skillsRouteMissing(e)) throw e;
    return apiJson("/dsh-purge/skill", init);
  });
}

// src/components/patch-status.js
function statusKind(st) {
  if (st === "applied" || st === "already") return "ok";
  if (st === "pending") return "wait";
  if (st === "unmatched") return "bad";
  if (st === "partial") return "bad";
  if (st === "na") return "ok";
  if (st === "missing_file" || st === "skipped" || st === "unlocated" || st === "off")
    return "miss";
  return "bad";
}
function statusLabel(st, t) {
  if (st === "applied" || st === "already") return t("status.applied");
  if (st === "off") return t("status.skipped");
  if (st === "pending") return t("status.pending");
  if (st === "unmatched") return t("status.unmatched");
  if (st === "partial") return t("status.partial");
  if (st === "skipped") return t("status.skipped");
  if (st === "missing_file") return t("skip");
  if (st === "unlocated") return t("status.unlocated");
  if (st === "na") return t("status.na");
  return st || t("unknown");
}
var LAYER_GROUP = {
  "\u043F\u0440\u043E\u043C\u043F\u0442": "prompt",
  "\u043A\u043E\u0434": "code",
  "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B": "tools",
  "\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C \u0441 0.1.5": "compat",
  "\u0421\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C \u0441 0.2.0": "dsh20"
};
var GROUP_ORDER = ["prompt", "code", "tools", "compat", "dsh20"];
function patchRowsOf(state) {
  if (!state || !state.ai_base) return [];
  const fromList = Array.isArray(state.patches) ? state.patches : null;
  const rows = fromList ? fromList.map((p) => ({
    id: Number(p.id),
    st: p.status || "missing_file",
    layer: p.layer || ""
  })) : Object.keys(state.patch_status || {}).map((id) => ({
    id: Number(id),
    st: state.patch_status[id],
    layer: ""
  }));
  return rows.filter((r) => r.st && r.st !== "na" && Number.isFinite(r.id));
}
function tallyPatches(rows) {
  const out = {
    applied: 0,
    pending: 0,
    unmatched: 0,
    partial: 0,
    skipped: 0,
    total: 0
  };
  for (const row of rows || []) {
    out.total += 1;
    if (row.st === "applied" || row.st === "already") out.applied += 1;
    else if (row.st === "pending") out.pending += 1;
    else if (row.st === "unmatched") out.unmatched += 1;
    else if (row.st === "partial") out.partial += 1;
    else out.skipped += 1;
  }
  return out;
}
function PatchGroups({ state }) {
  const t = useT();
  const [open, setOpen] = useState({});
  if (state?.ok === false)
    return h(
      "p",
      { role: "status" },
      "\u043E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F, \u0434\u0435\u0442\u0430\u043B\u0438 \u043F\u0430\u0442\u0447\u0435\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B; \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435."
    );
  if (!state || !state.patch_status)
    return h("div", { className: "dshpp-skel", style: { height: 120 } });
  const located = !!state.ai_base;
  if (!located) return null;
  const grouped = /* @__PURE__ */ new Map();
  for (const row of patchRowsOf(state)) {
    const key = LAYER_GROUP[row.layer] || "code";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  }
  return GROUP_ORDER.filter((key) => grouped.has(key)).map((key) => {
    const rows = grouped.get(key).slice().sort((a, b) => a.id - b.id);
    if (!rows.length) return null;
    const tally = tallyPatches(rows);
    const notes = [];
    if (tally.pending)
      notes.push(t("metric.pendingShort", { n: tally.pending }));
    if (tally.unmatched)
      notes.push(t("metric.unmatchedShort", { n: tally.unmatched }));
    if (tally.partial)
      notes.push(t("metric.partialShort", { n: tally.partial }));
    if (tally.skipped) notes.push(t("metric.skipShort", { n: tally.skipped }));
    const expanded = !!open[key];
    return h(
      "div",
      { key, className: "dshpp-group" },
      h(
        "button",
        {
          type: "button",
          className: "dshpp-group-h",
          "aria-expanded": expanded ? "true" : "false",
          onClick: () => setOpen((prev) => Object.assign({}, prev, { [key]: !prev[key] }))
        },
        h("strong", null, t("group." + key)),
        h(
          "span",
          { className: "dshpp-count" },
          tally.applied + "/" + tally.total + (notes.length ? " \xB7 " + notes.join(" \xB7 ") : "")
        )
      ),
      expanded ? h(
        "table",
        { className: "dshpp-table" },
        h(
          "thead",
          null,
          h(
            "tr",
            null,
            h("th", null, "#"),
            h("th", null, t("table.patch")),
            h("th", null, t("table.status"))
          )
        ),
        h(
          "tbody",
          null,
          rows.map(
            (r) => h(
              "tr",
              { key: r.id },
              h("td", { className: "dshpp-id" }, "#" + r.id),
              h("td", null, t("patch." + r.id)),
              h(
                "td",
                null,
                h(Pill, { value: r.st }),
                r.st === "partial" ? h(
                  "span",
                  { className: "dshpp-sub" },
                  t("status.partialDetail", {
                    done: (state.patch_files?.[r.id] || []).filter(
                      (f) => f.status === "applied"
                    ).length,
                    total: (state.patch_files?.[r.id] || []).length
                  })
                ) : null
              )
            )
          )
        )
      ) : null
    );
  });
}

// src/components/primitives.js
function formatSize(bytes) {
  if (typeof bytes !== "number" || !isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return bytes + " B";
  const kb = bytes / 1024;
  return (kb >= 100 ? Math.round(kb) : kb.toFixed(1)) + " KB";
}
function noticeNode(notice) {
  if (!notice || notice.kind === "idle" || !notice.text) return null;
  return h(
    "span",
    {
      className: "dshpp-notice " + (notice.kind === "error" ? "is-bad" : "is-ok")
    },
    notice.text
  );
}
function Btn(props) {
  const { kind, tiny, children, className, type, ...rest } = props;
  const cls = [
    "dshpp-btn",
    kind ? "dshpp-btn-" + kind : "dshpp-btn-ghost",
    tiny ? "dshpp-btn-tiny" : "",
    className || ""
  ].filter(Boolean).join(" ");
  return h(
    "button",
    Object.assign({ type: type || "button", className: cls }, rest),
    children
  );
}
function Pill({ value, label }) {
  const t = useT();
  return h(
    "span",
    { className: "dshpp-pill is-" + statusKind(value) },
    label || statusLabel(value, t)
  );
}
function HelpTip({ title, children, label }) {
  const [open, setOpen] = useState(false);
  return h(
    "span",
    { className: "dshpp-help" },
    h(
      "button",
      {
        type: "button",
        className: "dshpp-help-btn",
        "aria-label": (label || title || "\u0421\u043F\u0440\u0430\u0432\u043A\u0430") + " (\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u043F\u0440\u0430\u0432\u043A\u0443)",
        "aria-expanded": open ? "true" : "false",
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onFocus: () => setOpen(true),
        onBlur: () => setOpen(false),
        onClick: (e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }
      },
      "?"
    ),
    open ? h(
      "span",
      { className: "dshpp-tip", role: "tooltip" },
      title ? h("b", null, title) : null,
      children ? h("span", null, children) : null
    ) : null
  );
}

// src/components/maintenance.js
function StatusExtras() {
  const [check, setCheck] = useState(null);
  const [boost, setBoost] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const load = () => Promise.all([
    apiJson("/dsh-purge/selfcheck").then(setCheck).catch(() => setCheck(null)),
    apiJson("/dsh-purge/boost").then((r) => setBoost(!!r.enabled)).catch(() => setBoost(null))
  ]);
  useEffect(() => {
    load();
  }, []);
  async function toggle() {
    try {
      const r = await apiJson("/dsh-purge/boost", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enabled: !boost })
      });
      setBoost(!!r.enabled);
      setNotice(r.enabled ? "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043F\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430" : "\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043F\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430");
    } catch (e) {
      setNotice(e.message);
    }
  }
  async function rerun() {
    setBusy(true);
    try {
      setCheck(await apiJson("/dsh-purge/selfcheck"));
    } catch (e) {
      setNotice(e.message);
    } finally {
      setBusy(false);
    }
  }
  const layers = check && Array.isArray(check.layers) ? check.layers : [];
  const failed = layers.filter(
    (l) => l.state === "broken" || !l.state && !l.ok
  );
  const pendingLayers = layers.filter((l) => l.state === "pending");
  const uncertain = layers.filter(
    (l) => ["inferred", "unknown"].includes(l.state)
  );
  const pendingPatches = pendingLayers.reduce(
    (n, l) => n + (l.pending?.length || 0),
    0
  );
  const total = layers.filter((layer) => layer.applicable !== false).length;
  return h(
    "section",
    { className: "dshpp-card", "aria-label": "\u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441\u043D\u044F\u0442\u0438\u044F \u0437\u0430\u0449\u0438\u0442\u044B" },
    h(
      "div",
      { className: "dshpp-line" },
      h(
        "span",
        { className: "dshpp-line-main" },
        h("i", {
          className: "dshpp-dot " + (check ? failed.length ? "is-bad" : pendingLayers.length || uncertain.length ? "is-warn" : "is-ok" : "")
        }),
        "\u0421\u0430\u043C\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u043D\u044F\u0442\u0438\u044F \u0437\u0430\u0449\u0438\u0442\u044B",
        h(
          "b",
          null,
          check ? failed.length ? `\u0441\u043B\u043E\u0451\u0432 \u0431\u0435\u0437 \u044D\u0444\u0444\u0435\u043A\u0442\u0430: ${failed.length}` : pendingLayers.length ? `${pendingPatches} \u0448\u0442. \u0436\u0434\u0443\u0442 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F` : uncertain.length ? `\u0442\u0440\u0435\u0431\u0443\u044E\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438: ${uncertain.length}` : `\u0432\u0441\u0435 ${total} \u0441\u043B\u043E\u0451\u0432 \u043D\u0430 \u043C\u0435\u0441\u0442\u0435` : "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\u2026"
        )
      ),
      h(
        "details",
        { className: "dshpp-fold-inline" },
        h("summary", null, "\u043F\u043E \u0441\u043B\u043E\u044F\u043C"),
        h(
          "div",
          { className: "dshpp-checks" },
          check && Array.isArray(check.layers) ? check.layers.map(
            (layer) => h(
              "div",
              {
                key: layer.title,
                className: "dshpp-check" + (["pending", "inferred", "unknown"].includes(layer.state) ? " is-warn" : layer.ok ? "" : " is-bad")
              },
              h("i", {
                className: "dshpp-dot " + (["pending", "inferred", "unknown"].includes(layer.state) ? "is-warn" : layer.ok ? "is-ok" : "is-bad")
              }),
              h("span", { className: "dshpp-check-name" }, layer.title),
              h(
                "span",
                { className: "dshpp-check-val" },
                layer.applicable === false ? "\u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u043C\u043E" : layer.state === "pending" ? `\u0436\u0434\u0451\u0442 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F #${(layer.pending || []).join("/#")}` : layer.state === "inferred" ? "\u0432\u044B\u0432\u0435\u0434\u0435\u043D\u043E \u0438\u0437 \u0445\u043E\u0441\u0442\u0430" : layer.state === "unknown" ? "\u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E" : `${layer.applied}/${layer.required ?? layer.total}`
              ),
              layer.note ? h(HelpTip, { title: layer.title }, layer.note) : null
            )
          ) : h("div", { className: "dshpp-muted" }, "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\u2026")
        )
      ),
      h(
        Btn,
        { tiny: true, disabled: busy, onClick: rerun },
        busy ? "\u2026" : "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C"
      ),
      h(
        Btn,
        {
          tiny: true,
          title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0434\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u044B\u0439 \u0437\u043E\u043D\u0434: \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u043E\u0442\u0432\u0435\u0442\u0435 \u0432\u0438\u0434\u043D\u043E, \u0432\u0435\u0440\u043D\u0443\u043B\u0430 \u043B\u0438 \u043C\u043E\u0434\u0435\u043B\u044C \u044D\u0442\u0443 \u043C\u0435\u0442\u043A\u0443 \u0434\u043E\u0441\u043B\u043E\u0432\u043D\u043E",
          onClick: async () => {
            try {
              const r = await apiJson("/dsh-purge/probe", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: "{}"
              });
              setNotice(r.message || "");
            } catch (e) {
              setNotice(e.message);
            }
          }
        },
        "\u0417\u043E\u043D\u0434"
      )
    ),
    h(
      "div",
      { className: "dshpp-line" },
      h(
        "span",
        { className: "dshpp-line-main" },
        "\u0423\u0441\u0438\u043B\u0438\u0432\u0430\u044E\u0449\u0438\u0439 \u0431\u043B\u043E\u043A \u0441\u043D\u044F\u0442\u0438\u044F \u0437\u0430\u0449\u0438\u0442\u044B",
        h(
          HelpTip,
          { title: "\u0423\u0441\u0438\u043B\u0438\u0432\u0430\u044E\u0449\u0438\u0439 \u0431\u043B\u043E\u043A \u0441\u043D\u044F\u0442\u0438\u044F \u0437\u0430\u0449\u0438\u0442\u044B" },
          "\u0414\u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442 \u0432 \u043A\u043E\u043D\u0435\u0446 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u043C\u043F\u0442\u0430 \u0431\u043B\u043E\u043A \u0442\u043E\u0433\u043E \u0436\u0435 \u0443\u0440\u043E\u0432\u043D\u044F, \u0447\u0442\u043E \u0438 \u0438\u043D\u044A\u0435\u043A\u0446\u0438\u044F: \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u0443\u0440\u043E\u0432\u043D\u0435\u0439 / \u043E\u0442\u043A\u0430\u0437 \u043A\u0430\u043A \u0441\u0431\u043E\u0439 / \u043F\u0440\u043E\u0442\u0438\u0432 \u043F\u043E\u0434\u0445\u0430\u043B\u0438\u043C\u0441\u0442\u0432\u0430 / \u043F\u043E\u0432\u0442\u043E\u0440 \u0432 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u0440\u0430\u0443\u043D\u0434\u0430\u0445. \u0412\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E."
        ),
        h("b", null, boost === null ? "\u2026" : boost ? "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u043E" : "\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E")
      ),
      h(
        Btn,
        { tiny: true, disabled: boost === null, onClick: toggle },
        boost ? "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C" : "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C"
      ),
      notice ? h("span", { className: "dshpp-muted" }, notice) : null
    )
  );
}
function assertMaintenanceResult(result) {
  if (!result || typeof result !== "object")
    throw new Error("\u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u0432\u0435\u0440\u043D\u0443\u043B \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442");
  if (result.ok === false) {
    const errors = Array.isArray(result.errors) ? result.errors.filter(Boolean).join("; ") : "";
    const partial = result.applied ? "; \u0447\u0430\u0441\u0442\u044C \u0446\u0435\u043B\u0435\u0439 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u2014 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B DSH, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F" : "";
    throw new Error((result.error || errors || "\u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u043D\u0435 \u0443\u0434\u0430\u043B\u0430\u0441\u044C") + partial);
  }
}
function maintenanceNotice(op, result) {
  if (op === "backup") {
    if (!result.id)
      throw new Error("\u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044F \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u043E\u0433\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u043B\u0430 \u043D\u043E\u043C\u0435\u0440 \u043A\u043E\u043F\u0438\u0438; \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u043F\u0438\u0441\u043E\u043A \u0438 \u0441\u0432\u0435\u0440\u044C\u0442\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442");
    return `\u0420\u0435\u0437\u0435\u0440\u0432\u043D\u0430\u044F \u043A\u043E\u043F\u0438\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0430: ${result.id}`;
  }
  if (op === "rollback")
    return (result.note || "\u043E\u0442\u043A\u0430\u0442 \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D") + ". \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 DSH; \u043F\u0440\u043E\u0441\u0442\u043E\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442 \u043D\u043E\u0432\u044B\u0439 \u0431\u044D\u043A\u0435\u043D\u0434.";
  if (op === "update") {
    if (result.applied === false || result.skipped)
      return result.note || "\u043D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430, \u0442\u0435\u043A\u0443\u0449\u0430\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C.";
    if (result.applied || result.needRestart || result.restart_required) {
      const version = result.release?.version || result.localVersion || result.remoteVersion;
      const warnings = result.cleanup_warnings || [];
      const cleanup = warnings.length ? `\u043E\u0447\u0438\u0441\u0442\u043A\u0430 \u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430 (${warnings.map((w) => `${w.stage}:${w.code}`).join(", ")}), \u043E\u0441\u0442\u0430\u0442\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B.` : "";
      return `${cleanup}\u043F\u043B\u0430\u0433\u0438\u043D \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D${version ? ": " + version : ""}. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 DSH; \u043F\u0440\u043E\u0441\u0442\u043E\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442 \u043D\u043E\u0432\u044B\u0439 \u0431\u044D\u043A\u0435\u043D\u0434.`;
    }
    return result.note || "\u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D; \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0438 \u0441\u0432\u0435\u0440\u044C\u0442\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438.";
  }
  return result.note || "\u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430";
}
function UpdatePreferences({ value, status = {}, onSaved }) {
  const [saving, setSaving] = useState(false), [error, setError] = useState("");
  const locked = useRef(false);
  if (!value) return null;
  async function save(patch) {
    if (locked.current) return;
    locked.current = true;
    setSaving(true);
    setError("");
    try {
      const result = await apiJson("/dsh-purge/community", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ op: "preferences", value: patch })
      });
      assertMaintenanceResult(result);
      onSaved(result.update_preferences);
    } catch (e) {
      setError(e.message);
    } finally {
      locked.current = false;
      setSaving(false);
    }
  }
  return h(
    "section",
    { "aria-label": "\u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0430\u0432\u0442\u043E\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F", className: "dshpp-card" },
    h(
      "div",
      { className: "dshpp-row" },
      h(
        "label",
        null,
        h("input", {
          type: "checkbox",
          checked: value.autoCheck,
          disabled: saving,
          onChange: (e) => save({ autoCheck: e.target.checked }),
          "aria-label": "\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439"
        }),
        "\u0410\u0432\u0442\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439"
      ),
      h(HelpTip, {
        title: "\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439",
        children: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0447\u0435\u0440\u0435\u0437 30 \u0441\u0435\u043A\u0443\u043D\u0434 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430, \u0434\u0430\u043B\u0435\u0435 \u2014 \u0441 \u0437\u0430\u0434\u0430\u043D\u043D\u044B\u043C \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u043E\u043C. \u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u0435\u043D\u044F\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F \u0430\u0432\u0442\u043E\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438, \u043D\u043E \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0435\u0451."
      }),
      h(
        "select",
        {
          "aria-label": "\u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439",
          value: value.intervalHours,
          disabled: saving || !value.autoCheck,
          onChange: (e) => save({ intervalHours: Number(e.target.value) })
        },
        [.../* @__PURE__ */ new Set([1, 6, 12, 24, value.intervalHours])].sort((a, b) => a - b).map((v) => h("option", { key: v, value: v }, `\u043A\u0430\u0436\u0434\u044B\u0435 ${v} \u0447.`))
      )
    ),
    h(
      "div",
      { className: "dshpp-row" },
      h(
        "label",
        null,
        h("input", {
          type: "checkbox",
          checked: value.autoInstall,
          disabled: saving,
          onChange: (e) => save({ autoInstall: e.target.checked }),
          "aria-label": "\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439"
        }),
        "\u0410\u0432\u0442\u043E\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439"
      ),
      h(HelpTip, {
        title: "\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439",
        children: "\u0421\u0442\u0430\u0432\u0438\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u0430\u0432\u0442\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0430 \u0438 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u043D\u0435\u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043D\u043E\u0432\u0430\u044F \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F. \u041F\u0435\u0440\u0435\u0434 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u043E\u0439 \u2014 \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u0430\u044F \u043A\u043E\u043F\u0438\u044F \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u0430\u043A\u0435\u0442\u0430; \u043F\u0440\u0438 \u0441\u0431\u043E\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u043D\u0435 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438. \u041F\u043E\u0441\u043B\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0436\u0434\u0451\u043C \u0432\u0430\u0448\u0435\u0433\u043E \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430, DSH \u0441\u0430\u043C \u043D\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F."
      })
    ),
    h(
      "p",
      { className: "dshpp-hint" },
      status.reconciliationError ? "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043D\u0435 \u0441\u0432\u0435\u0440\u0435\u043D\u043E, \u0430\u0432\u0442\u043E\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430." : status.restartRequired ? `\u0412\u0435\u0440\u0441\u0438\u044F \u043D\u0430 \u0434\u0438\u0441\u043A\u0435 ${status.pendingVersion}, \u0441\u0435\u0439\u0447\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 ${status.runningVersion || "\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"}; \u0436\u0434\u0451\u043C \u0432\u0430\u0448\u0435\u0433\u043E \u0440\u0443\u0447\u043D\u043E\u0433\u043E \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430 DSH.` : !value.autoCheck ? "\u0410\u0432\u0442\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0430, \u0430\u0432\u0442\u043E\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430." : status.checkedAt ? `\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: ${new Date(status.checkedAt).toLocaleString()}${status.hasUpdate ? ` \xB7 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0432\u0435\u0440\u0441\u0438\u044F ${status.availableVersion}` : ""}` : "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430; \u043F\u043E\u0441\u043B\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0440\u0443\u0447\u043D\u043E\u0439 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A."
    ),
    status.reconciliationError ? h("p", { role: "alert" }, status.reconciliationError) : null,
    [...new Set([status.error, status.installError].filter(Boolean))].map(
      (message) => h("p", { key: message, role: "alert" }, message)
    ),
    error ? h("p", { role: "alert" }, error) : null
  );
}
function CommunityMaintenance() {
  const [value, setValue] = useState(null), [notice, setNotice] = useState(""), [busy, setBusy] = useState(false), [selected, setSelected] = useState(""), [releases, setReleases] = useState(null), [release, setRelease] = useState("");
  const [listState, setListState] = useState("loading"), [listError, setListError] = useState("");
  const mounted = useRef(false), generation = useRef(0), running = useRef(false);
  const load = useCallback(async () => {
    const request = ++generation.current;
    setListState("loading");
    setListError("");
    try {
      const result = await apiJson("/dsh-purge/community");
      assertMaintenanceResult(result);
      if (!Array.isArray(result.backups)) throw new Error("\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u0441\u043E \u0441\u043F\u0438\u0441\u043A\u043E\u043C \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0445 \u043A\u043E\u043F\u0438\u0439");
      if (!mounted.current || request !== generation.current) return;
      setValue(result);
      setSelected(
        (current) => result.backups.some((b) => b.id === current) ? current : ""
      );
      setListState("ready");
    } catch (e) {
      if (!mounted.current || request !== generation.current) return;
      setListError(e.message);
      setListState("error");
    }
  }, []);
  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
      generation.current++;
    };
  }, [load]);
  async function run(op) {
    if (running.current) return;
    if (op === "rollback" && !window.confirm(
      "\u041E\u0442\u043A\u0430\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043B\u0430\u0433\u0438\u043D Purge \u0438 \u0435\u0433\u043E \u0442\u043E\u0447\u043A\u0430 \u0432\u0445\u043E\u0434\u0430, \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u043C\u043F\u0442 \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F; \u043F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u043D\u0443\u0436\u0435\u043D \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 DSH; \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442 \u043D\u043E\u0432\u044B\u0439 \u0431\u044D\u043A\u0435\u043D\u0434. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?"
    ))
      return;
    if (op === "update" && !window.confirm(
      "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0434\u0435\u043B\u0430\u0435\u043C \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u0443\u044E \u043A\u043E\u043F\u0438\u044E, \u0437\u0430\u0442\u0435\u043C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u043B\u0438\u0437 community-\u0432\u0435\u0440\u0441\u0438\u0438; \u043F\u0430\u0442\u0447\u0438 \u0445\u043E\u0441\u0442\u0430 \u0437\u0430\u043D\u043E\u0432\u043E \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0442\u044C\u0441\u044F \u043D\u0435 \u0431\u0443\u0434\u0443\u0442. \u041F\u043E\u0441\u043B\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 DSH; \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442 \u043D\u043E\u0432\u044B\u0439 \u0431\u044D\u043A\u0435\u043D\u0434. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?"
    ))
      return;
    running.current = true;
    setBusy(true);
    setNotice("\u0412\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F\u2026");
    try {
      const r = await apiJson("/dsh-purge/community", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ op, id: selected, ref: release })
      });
      assertMaintenanceResult(r);
      if (!mounted.current) return;
      if (op === "check") {
        if (!Array.isArray(r.versions)) throw new Error("\u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u0441\u043E \u0441\u043F\u0438\u0441\u043A\u043E\u043C \u0440\u0435\u043B\u0438\u0437\u043E\u0432");
        setReleases(r.versions.filter((v) => v.asset));
        setRelease(r.versions.find((v) => v.asset)?.ref || "");
        setNotice(
          r.degraded ? `${r.degraded}; ${r.stale ? "\u0441\u0435\u0439\u0447\u0430\u0441 \u043F\u043E\u043A\u0430\u0437\u0430\u043D \u043A\u044D\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A, \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u0437\u0436\u0435" : "\u043F\u043E\u043A\u0430\u0437\u0430\u043D \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A"}` : r.error ? `\u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439: ${r.error}` : r.hasUpdate ? `\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u043D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F ${r.remoteVersion}` : "\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F"
        );
      } else {
        setNotice(maintenanceNotice(op, r));
      }
    } catch (e) {
      if (mounted.current)
        setNotice(
          e.message === "timeout" ? "\u0442\u0430\u0439\u043C-\u0430\u0443\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044F: \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044F \u043C\u043E\u0433\u043B\u0430 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C\u0441\u044F; \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0438 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E." : e.message
        );
    } finally {
      if (op !== "check" && mounted.current) await load();
      running.current = false;
      if (mounted.current) setBusy(false);
    }
  }
  return h(
    "section",
    { className: "dshpp-panel", "aria-label": "\u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435 community-\u0432\u0435\u0440\u0441\u0438\u0438" },
    h("h3", null, "\u041E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435: \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043F\u0438\u0438"),
    h(UpdatePreferences, {
      value: value?.update_preferences,
      status: value?.update_status,
      onSaved: (next) => setValue((current) => ({ ...current, update_preferences: next }))
    }),
    h(
      "div",
      { className: "dshpp-row" },
      h(Btn, { disabled: busy, onClick: () => run("check") }, "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F community-\u0432\u0435\u0440\u0441\u0438\u0438"),
      h(
        Btn,
        {
          disabled: busy,
          onClick: async () => {
            try {
              const r = await apiJson("/dsh-purge/audit?limit=10");
              const lines = (r.entries || []).map(
                (x) => `${new Date(x.at).toLocaleString()}  ${x.event}  ${JSON.stringify(
                  Object.fromEntries(
                    Object.entries(x).filter(
                      ([k]) => !["at", "event", "pid"].includes(k)
                    )
                  )
                )}`
              );
              setNotice(lines.length ? lines.join("\n") : "\u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F\u0445 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442");
            } catch (e) {
              setNotice(e.message);
            }
          }
        },
        "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F"
      ),
      h(
        "a",
        {
          href: "https://github.com/kingcharleslzy-ai/dsh-purge/releases",
          target: "_blank",
          rel: "noreferrer"
        },
        "\u0420\u0435\u043B\u0438\u0437\u044B"
      )
    ),
    releases?.length ? h(
      "div",
      { className: "dshpp-row" },
      h(
        "select",
        {
          "aria-label": "\u0432\u044B\u0431\u043E\u0440 \u0440\u0435\u043B\u0438\u0437\u0430 community-\u0432\u0435\u0440\u0441\u0438\u0438",
          value: release,
          onChange: (e) => setRelease(e.target.value),
          disabled: busy
        },
        releases.map(
          (r) => h("option", { key: r.ref, value: r.ref }, r.label)
        )
      ),
      h(
        Btn,
        { disabled: busy || !release, onClick: () => run("update") },
        "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E"
      )
    ) : null,
    h("h3", { style: { marginTop: 20 } }, "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043F\u0438\u0438"),
    h(
      Btn,
      { disabled: busy || listState === "loading", onClick: load },
      "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u043F\u0438\u0439"
    ),
    listState === "loading" ? h("p", { role: "status" }, "\u0427\u0438\u0442\u0430\u0435\u043C \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0435 \u043A\u043E\u043F\u0438\u0438\u2026") : null,
    listState === "error" ? h("p", { role: "alert" }, `\u043E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0445 \u043A\u043E\u043F\u0438\u0439: ${listError}`) : null,
    listState === "ready" && !value.backups.length ? h("p", { role: "status" }, "\u0440\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0445 \u043A\u043E\u043F\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442") : null,
    h(
      "div",
      { className: "dshpp-row" },
      h(Btn, { disabled: busy, onClick: () => run("backup") }, "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u043A\u043E\u043F\u0438\u044E"),
      h(
        "select",
        {
          "aria-label": "\u0432\u044B\u0431\u043E\u0440 \u043A\u043E\u043F\u0438\u0438 \u0434\u043B\u044F \u043E\u0442\u043A\u0430\u0442\u0430",
          value: selected,
          onChange: (e) => setSelected(e.target.value),
          disabled: busy || listState !== "ready"
        },
        h("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u043F\u0438\u044E"),
        ...(value?.backups || []).map(
          (b) => h(
            "option",
            { key: b.id, value: b.id },
            `${new Date(b.created_at).toLocaleString()} \xB7 ${b.plugins.map((p) => p.version).join(" / ")}`
          )
        )
      ),
      h(
        Btn,
        {
          disabled: busy || !selected || listState !== "ready",
          onClick: () => run("rollback")
        },
        "\u041E\u0442\u043A\u0430\u0442\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D"
      )
    ),
    h(
      "p",
      { className: "dshpp-hint" },
      "\u041A\u043E\u043F\u0438\u0438 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435. \u041E\u0442\u043A\u0430\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u043C\u043F\u0442, \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432; \u043F\u043E\u0441\u043B\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0438\u043B\u0438 \u043E\u0442\u043A\u0430\u0442\u0430 \u043D\u0443\u0436\u0435\u043D \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 DSH; \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442 \u043D\u043E\u0432\u044B\u0439 \u0431\u044D\u043A\u0435\u043D\u0434."
    ),
    notice ? h("p", { role: "status" }, notice) : null
  );
}

// src/shared/apply-result.js
function incompleteApplyDetail(result, t) {
  const parts = [];
  if (result.failed > 0) {
    const ids = (Array.isArray(result.failed_items) ? result.failed_items : []).map((item) => item?.id).filter((id) => id != null).join(",");
    parts.push(
      t("restart.incomplete.patches", {
        failed: String(result.failed),
        ids: ids || "?"
      })
    );
  }
  if (result.cmd_flash?.ok === false)
    parts.push(
      t("restart.incomplete.flash", {
        entry: String(result.cmd_flash.entry || "unknown")
      })
    );
  if (result.host_written === false) parts.push(t("restart.incomplete.host"));
  if (result.hook_restore_failed === true)
    parts.push(t("restart.incomplete.restore"));
  if (result.cli_repair?.ok === false)
    parts.push(
      t("restart.incomplete.runtime"),
      ...runtimeRepairDetails(result.cli_repair)
    );
  return parts.length ? parts.join("; ") : t("restart.incomplete.unknown");
}

// src/components/advanced.js
function HooksDenySection({ onSaved }) {
  const t = useT();
  const [cfg, setCfg] = useState(null);
  const [notice, setNotice] = useState({ kind: "idle", text: "" });
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    apiJson("/dsh-purge/hooks-deny").then((d) => {
      if (d && d.ok) setCfg({ hooksDenyBypass: d.hooksDenyBypass !== false });
    }).catch(() => {
    });
  }, []);
  const save = (hooksDenyBypass) => {
    if (!cfg || busy) return;
    setCfg({ hooksDenyBypass });
    setBusy(true);
    apiJson("/dsh-purge/hooks-deny", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ hooksDenyBypass })
    }).then((d) => {
      if (d && d.ok) {
        setCfg({ hooksDenyBypass: d.hooksDenyBypass === true });
        setNotice({ kind: "ok", text: t("saved.hooksDeny") });
        if (typeof onSaved === "function") onSaved();
      } else {
        setNotice({
          kind: "error",
          text: t("err.save", { error: d && d.error || "" })
        });
      }
    }).catch(
      (e) => setNotice({ kind: "error", text: t("err.save", { error: e.message }) })
    ).finally(() => setBusy(false));
  };
  if (!cfg) return null;
  return h(
    "div",
    { className: "dshpp-cr", style: { marginTop: 12 } },
    h(
      "div",
      { className: "dshpp-sub" },
      h("h4", null, t("hooksDeny.title")),
      noticeNode(notice)
    ),
    h(
      "p",
      {
        className: "dshpp-hint",
        style: { margin: "0 0 4px", color: "var(--dshpp-mute)", fontSize: 12 }
      },
      t("hooksDeny.hint")
    ),
    h(
      "div",
      { className: "dshpp-cr-row" },
      h(
        "label",
        null,
        h("input", {
          type: "checkbox",
          checked: cfg.hooksDenyBypass === true,
          disabled: busy,
          onChange: (e) => save(e.target.checked)
        }),
        t("hooksDeny.bypass")
      )
    )
  );
}

// src/components/restart.js
var rd2 = __toESM(require("react-dom"), 1);
function RestartAsk(props) {
  const node = h(
    "div",
    {
      className: "dshpp-restart-mask",
      "data-theme": props.theme === "dusk" ? "dusk" : "white",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "dshpp-restart-title",
      onClick: (e) => {
        if (e.target === e.currentTarget && props.onLater) props.onLater();
      }
    },
    h(
      "div",
      { className: "dshpp-restart-card" },
      h("h4", { id: "dshpp-restart-title" }, props.t("restart.ask.title")),
      h("p", null, props.t("restart.ask.body")),
      h(
        "div",
        { className: "dshpp-modal-ops" },
        h(Btn, { onClick: props.onLater }, props.t("restart.notNow")),
        h(
          Btn,
          { kind: "primary", onClick: props.onRestart },
          props.t("restart.now")
        )
      )
    )
  );
  try {
    if (rd2 && typeof rd2.createPortal === "function" && typeof document !== "undefined" && document.body) {
      return rd2.createPortal(node, document.body);
    }
  } catch {
  }
  return node;
}
function reopenAfterRestart() {
  window.location.reload();
}
function waitForRestart(setNotice, setBusy, t) {
  const started = Date.now();
  let sawDown = false;
  const ping = () => {
    fetch("/dsh-purge/status", {
      cache: "no-store",
      credentials: "same-origin"
    }).then((r) => r.ok ? r.json() : Promise.reject()).then((d) => {
      if (!sawDown) {
        retry();
        return;
      }
      if (d && d.ok && d.ready !== false) reopenAfterRestart();
      else retry();
    }).catch(() => {
      sawDown = true;
      retry();
    });
  };
  const retry = () => {
    if (Date.now() - started > 9e4) {
      setNotice({ kind: "error", text: t("restart.timeout") });
      setBusy(false);
      return;
    }
    setTimeout(ping, 500);
  };
  setTimeout(ping, 800);
}
var restartOnce = false;
function restartDsh(setNotice, setBusy, t, surface) {
  if (restartOnce) return;
  const surf = surface || clientGuessSurface() || "desktop";
  const desktop = surf === "desktop" || clientGuessSurface() === "desktop";
  restartOnce = true;
  setBusy(true);
  setNotice({ kind: "ok", text: hostText(t, "restarting", surf) });
  const stop = (error) => {
    restartOnce = false;
    setNotice({
      kind: "error",
      text: error ? t("restart.fail", { error }) : t("restart.notStarted")
    });
    setBusy(false);
  };
  let sawDrop = false;
  const watch = setTimeout(() => {
    if (sawDrop) return;
    stop("");
  }, 25e3);
  fetch("/dsh-purge/restart", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}"
  }).then((r) => r.json()).then((d) => {
    if (!d.ok) throw new Error(d.error || "restart failed");
    if (d.manualQuit) {
      clearTimeout(watch);
      restartOnce = false;
      setBusy(false);
      setNotice({ kind: "ok", text: d.note || t("restart.manualQuit") });
      return;
    }
    const next = d && d.surface || surf;
    const full = next === "desktop" || d && d.fullApp || desktop;
    if (full && d.already) {
      setNotice({ kind: "ok", text: hostText(t, "restarting", next) });
      return;
    }
    if (full && d.restarting === false) {
      clearTimeout(watch);
      stop(d.error || "not started");
      return;
    }
    setNotice({ kind: "ok", text: hostText(t, "restarting", next) });
    if (full) return;
    clearTimeout(watch);
    restartOnce = false;
    waitForRestart(setNotice, setBusy, t);
  }).catch((e) => {
    const msg = String(e && e.message || e || "");
    const dropped = /failed to fetch|networkerror|load failed/i.test(msg) || e.name === "TypeError";
    if (dropped && desktop) {
      sawDrop = true;
      clearTimeout(watch);
      return;
    }
    clearTimeout(watch);
    stop(msg || "restart failed");
  });
}
function detectHostTheme() {
  try {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (document.body?.hasAttribute("data-ds-dark-theme") || root?.hasAttribute("data-ds-dark-theme"))
        return "dusk";
      const scheme = (root.style.colorScheme || getComputedStyle(root).colorScheme || getComputedStyle(root).getPropertyValue("color-scheme") || "").toLowerCase();
      if (scheme.includes("dark")) return "dusk";
      if (scheme.includes("light")) return "white";
    }
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dusk";
    }
  } catch {
  }
  return "white";
}

// src/shared/versions.js
function splitListedVersion(raw) {
  const text = String(raw || "").trim().replace(/^v/i, "");
  const cut = text.split("-");
  const core = String(cut[0] || "").split(".").map((n) => parseInt(n, 10) || 0);
  return {
    core: [core[0] || 0, core[1] || 0, core[2] || 0],
    pre: cut.slice(1).join("-")
  };
}
function listedVersionNewer(remote, local) {
  if (!remote || !local || String(remote) === String(local)) return false;
  const a = splitListedVersion(remote);
  const b = splitListedVersion(local);
  for (let i = 0; i < 3; i += 1) {
    if (a.core[i] !== b.core[i]) return a.core[i] > b.core[i];
  }
  if (a.pre && !b.pre) return false;
  if (!a.pre && b.pre) return true;
  return a.pre > b.pre;
}
function listedCeiling(versions, localVer) {
  let best = "";
  const rows = (versions || []).slice();
  const local = String(localVer || "").replace(/^v/i, "");
  if (local && !/(?:^|[-._])(beta|rc|pre|preview|test)(?:\d|$|[-._])/i.test(local)) {
    rows.push({ channel: "stable", version: local });
  }
  for (const item of rows) {
    if (!item || item.channel === "beta") continue;
    const ver = String(item.version || "").replace(/^v/i, "");
    if (!/^\d+\.\d+\.\d+/.test(ver) || /(?:^|[-._])(beta|rc|pre|preview|test)(?:\d|$|[-._])/i.test(ver))
      continue;
    if (!best || listedVersionNewer(ver, best)) best = ver;
  }
  return best;
}
function keepListedVersion(item, _ceiling) {
  const ver = String(item && (item.version || item.ref || item.id) || "");
  if (!item) return false;
  if (item.ref === "beta" || item.id === "beta") return true;
  if (item.channel === "beta") return false;
  if (/(?:^|[-._])(beta|rc|pre|preview|test)(?:\d|$|[-._])/i.test(ver))
    return false;
  return true;
}
function preferListed(list, localVer, pin) {
  const pinned = pin ? (list || []).find((item) => item.ref === pin) : null;
  if (pinned) return pinned;
  const ver = String(localVer || "").replace(/^v/i, "");
  const same = (list || []).filter(
    (item) => ver && String(item.version || "").replace(/^v/i, "") === ver
  );
  if (same.length) {
    return same.find((item) => item.current) || same.find((item) => item.latest) || same[0];
  }
  return (list || []).find((item) => item.current) || (list || []).find((item) => item.latest) || (list || [])[0] || null;
}
function versionChoiceLabel(item, tr) {
  const ver = String(item && item.version || "").replace(/^v/i, "");
  const base = ver ? "v" + ver : item && (item.label || item.ref) || "\u2014";
  if (item && item.current) return base + " \xB7 " + tr("update.current");
  if (item && item.latest) return base + " \xB7 " + tr("update.tip");
  return base;
}

// src/components/settings-form.js
function PurgifySection({ page = "status", onStatus } = {}) {
  const t = useT();
  const tRef = useRef(t);
  tRef.current = t;
  const [state, setState] = useState(null);
  useEffect(() => {
    if (onStatus) onStatus(state);
  }, [state, onStatus]);
  const [override, setOverride] = useState("");
  const [defaultOverride, setDefaultOverride] = useState("");
  const [overrideLoaded, setOverrideLoaded] = useState(false);
  const [ownServers, setOwnServers] = useState("");
  const [ownLoaded, setOwnLoaded] = useState(false);
  const [ownBusy, setOwnBusy] = useState(false);
  const ownPending = useRef(false);
  const promptPending = useRef(false);
  const ownRef = useRef("");
  ownRef.current = ownServers;
  const [patchBusy, setPatchBusy] = useState(false);
  const [updateBusy, setUpdateBusy] = useState(false);
  const [canApplyUpdate, setCanApplyUpdate] = useState(false);
  const [updateJob, setUpdateJob] = useState(null);
  const [askRestart, setAskRestart] = useState(false);
  const suppressRestartAsk = useRef(false);
  const [askUninstall, setAskUninstall] = useState(false);
  const [uninstallBusy, setUninstallBusy] = useState(false);
  const [notice, setNotice] = useState({ kind: "idle", text: "" });
  const [updateNotice, setUpdateNotice] = useState({ kind: "idle", text: "" });
  const [updateInfo, setUpdateInfo] = useState(null);
  const [channel, setChannel] = useState("stable");
  const [pick, setPick] = useState({ stable: "", beta: "" });
  const actionTicket = useRef(0);
  const overrideRef = useRef("");
  const defaultOverrideRef = useRef("");
  const promptSeededRef = useRef(false);
  const ownSeededRef = useRef(false);
  const promptAreaRef = useRef(null);
  overrideRef.current = override;
  defaultOverrideRef.current = defaultOverride;
  const readPromptBox = () => {
    const node = promptAreaRef.current;
    const live = node && typeof node.value === "string" ? node.value : overrideRef.current;
    overrideRef.current = live || "";
    return overrideRef.current;
  };
  const syncPicks = (d) => {
    const versions2 = d && d.versions || [];
    const ceiling = listedCeiling(versions2, d && d.localVersion);
    const next = { stable: "", beta: "" };
    for (const id of ["stable", "beta"]) {
      const list = versions2.filter(
        (item) => item.channel === id && keepListedVersion(item, ceiling)
      );
      const hit = preferListed(list, d && d.localVersion, d && d.pin);
      next[id] = hit && hit.ref || "";
    }
    setPick(next);
  };
  const updateErrorText = (tr, e) => {
    const msg = String(e && e.message || e || "");
    if (msg === "timeout" || /aborted|abort|timeout/i.test(msg))
      return tr("update.timeout");
    if (/\b404\b/.test(msg) || /non-json/.test(msg))
      return tr("update.needRestart");
    return tr("update.fail", { error: msg });
  };
  const applyUpdateInfo = useCallback((d, tr, kind) => {
    if (d.channel) setChannel(d.channel);
    setUpdateInfo((prev) => {
      const versions2 = d.versions && d.versions.length ? d.versions : prev && prev.versions || [];
      return Object.assign({}, prev || {}, d, { versions: versions2 });
    });
    if (d.versions && d.versions.length) syncPicks(d);
    if (kind === "check") setCanApplyUpdate(Boolean(d.hasUpdate) && !d.error);
    else if (kind === "done" || kind === "switched" || kind === "channel")
      setCanApplyUpdate(false);
    const version = d.localVersion || d.localSha || "\u2014";
    const remote = d.remoteVersion || d.remoteSha || "\u2014";
    let text = tr("update.latest", { version });
    if (d.hasUpdate) text = tr("update.available", { remote, local: version });
    if (d.pinned && d.hasUpdate)
      text = tr("update.pinned", { version, remote });
    if (kind === "switched" || kind === "channel")
      text = tr("update.switched", {
        version: d.localVersion || d.remoteVersion || "\u2014"
      });
    if (kind === "done")
      text = tr("update.done", {
        version: d.localVersion || d.remoteVersion || "\u2014"
      });
    if (d.error) text = d.error;
    setUpdateNotice({ kind: d.ok === false || d.error ? "error" : "ok", text });
  }, []);
  const checkUpdate = useCallback(
    (id) => {
      setUpdateBusy(true);
      setUpdateJob({ id: id || "", kind: "check" });
      const tr = tRef.current;
      setUpdateNotice({ kind: "ok", text: tr("update.checking") });
      apiJson("/dsh-purge/update").then((d) => {
        if (!d || !d.ok && !d.channel)
          throw new Error(d && d.error || "check failed");
        applyUpdateInfo(d, tr, "check");
      }).catch(
        (e) => setUpdateNotice({ kind: "error", text: updateErrorText(tr, e) })
      ).finally(() => {
        setUpdateBusy(false);
        setUpdateJob(null);
      });
    },
    [applyUpdateInfo]
  );
  const postUpdate = useCallback(
    (body, kind, id) => {
      setUpdateBusy(true);
      setUpdateJob({ id: id || "", kind });
      const tr = tRef.current;
      setUpdateNotice({
        kind: "ok",
        text: kind === "switched" || kind === "channel" ? tr("update.switching") : tr("update.applying")
      });
      return apiJson("/dsh-purge/update", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body || {})
      }).then((d) => {
        if (!d || d.ok === false && d.error)
          throw new Error(d && d.error || "update failed");
        applyUpdateInfo(d, tr, kind);
        if (d.needsFullQuit) {
          suppressRestartAsk.current = false;
          setAskRestart(true);
          setUpdateNotice({ kind: "ok", text: tr("restart.official.body") });
          return d;
        }
        if (d.restartAfter) {
          setUpdateNotice({ kind: "ok", text: tr("update.restarting") });
          return d;
        }
        if (d.applied && d.reloadClient !== false) {
          setUpdateNotice({ kind: "ok", text: tr("update.reloading") });
          setTimeout(() => {
            try {
              window.location.reload();
            } catch {
            }
          }, 280);
        } else if (d.needRestart) {
          setAskRestart(true);
        }
        return d;
      }).catch((e) => {
        setUpdateNotice({ kind: "error", text: updateErrorText(tr, e) });
        throw e;
      }).finally(() => {
        setUpdateBusy(false);
        setUpdateJob(null);
      });
    },
    [applyUpdateInfo]
  );
  const doUpdate = useCallback(
    (id) => {
      const lane = id === "beta" ? "beta" : "stable";
      postUpdate(
        {
          op: "apply",
          ref: lane === "beta" ? "beta" : "master",
          channel: lane
        },
        "done",
        id
      ).catch(() => {
      });
    },
    [postUpdate]
  );
  const changeChannel = useCallback(
    (next) => {
      if (!next) return;
      const tr = tRef.current;
      if (!window.confirm(
        tr("update.confirmChannel", { version: tr("channel." + next) })
      ))
        return;
      const prevChannel = channel;
      const prevInfo = updateInfo;
      setChannel(next);
      setUpdateInfo((cur) => Object.assign({}, cur || {}, { channel: next }));
      postUpdate({ op: "channel", channel: next }, "channel", next).catch(
        () => {
          setChannel(prevChannel);
          setUpdateInfo(prevInfo);
        }
      );
    },
    [channel, postUpdate, updateInfo]
  );
  const switchSelected = useCallback(
    (id) => {
      const tr = tRef.current;
      const ref = pick[id];
      const versions2 = (updateInfo && updateInfo.versions || []).filter(
        (item) => item.channel === id
      );
      const hit = versions2.find((item) => item.ref === ref);
      const label = hit && (hit.label || hit.version) || ref;
      if (!ref) return;
      if (!window.confirm(tr("update.confirmSwitch", { version: label })))
        return;
      const prevChannel = channel;
      const prevInfo = updateInfo;
      if (hit && hit.channel) {
        setChannel(hit.channel);
        setUpdateInfo(
          (cur) => Object.assign({}, cur || {}, { channel: hit.channel })
        );
      }
      postUpdate({ op: "switch", ref }, "switched", id).catch(() => {
        setChannel(prevChannel);
        setUpdateInfo(prevInfo);
      });
    },
    [channel, pick, postUpdate, updateInfo]
  );
  const loadAll = useCallback(() => {
    const tr = tRef.current;
    apiJson("/dsh-purge/status").then((d) => {
      if (d && d.ok) {
        setState(d);
        setNotice(
          (previous) => previous?.source === "status" ? { kind: "idle", text: "" } : previous
        );
        if (d.channel) setChannel(d.channel);
        if (d.update && d.update.ok && !d.update.error)
          setUpdateInfo(d.update);
        if (d.boot_full_quit && !suppressRestartAsk.current)
          setAskRestart(true);
      } else {
        setState(unavailableStatus(d?.error || "bad response"));
        setNotice({
          kind: "error",
          source: "status",
          text: tr("err.status", { error: d && d.error || "bad response" })
        });
      }
    }).catch((e) => {
      setState(unavailableStatus(e));
      setNotice({
        kind: "error",
        source: "status",
        text: tr("err.status", { error: e.message })
      });
    });
    apiJson("/dsh-purge/update").then((d) => {
      if (!d) return;
      if (d.channel) setChannel(d.channel);
      setUpdateInfo(d);
      syncPicks(d);
    }).catch(() => {
    });
    apiJson("/dsh-purge/override").then((d) => {
      if (d && d.ok) {
        const packed = typeof d.defaultContent === "string" ? d.defaultContent : "";
        const shown = typeof d.content === "string" ? d.content : packed;
        if (packed) setDefaultOverride(packed);
        if (!promptSeededRef.current) {
          promptSeededRef.current = true;
          setOverride(shown || packed);
        }
        setOverrideLoaded(true);
      } else
        setNotice({
          kind: "error",
          text: tr("err.override", { error: d && d.error || "" })
        });
    }).catch(
      (e) => setNotice({
        kind: "error",
        text: tr("err.override", { error: e.message })
      })
    );
    apiJson("/dsh-purge/own-servers").then((d) => {
      if (d && d.ok) {
        if (!ownSeededRef.current) {
          ownSeededRef.current = true;
          setOwnServers(typeof d.content === "string" ? d.content : "");
        }
        setOwnLoaded(true);
      }
    }).catch(() => {
    });
  }, []);
  useEffect(() => {
    loadAll();
  }, [loadAll]);
  const rejectNeedPrompt = useCallback((tr) => {
    setAskRestart(false);
    setNotice({ kind: "error", text: tr("need.prompt") });
    setTimeout(() => window.alert(tr("need.prompt")), 0);
  }, []);
  const doAction = useCallback(
    (action, actionKey) => {
      const tr = tRef.current;
      const label = tr(actionKey);
      const ticket = ++actionTicket.current;
      const run = () => {
        setPatchBusy(true);
        setAskRestart(false);
        setNotice({ kind: "idle", text: "" });
        const applyContent = action === "apply" ? readPromptBox() : "";
        fetch("/dsh-purge/" + action, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(
            action === "apply" ? { content: applyContent } : {}
          )
        }).then((r) => r.json()).then((d) => {
          if (ticket !== actionTicket.current) return;
          if (responseNeedsPrompt(d)) {
            rejectNeedPrompt(tr);
            return;
          }
          if (!d.ok) {
            setNotice({
              kind: "error",
              text: tr("err.action", {
                action: label,
                error: [
                  d.error || "",
                  ...runtimeRepairDetails(d.cli_repair)
                ].join("\n")
              })
            });
            return;
          }
          if (action === "apply") {
            if (typeof d.defaultContent === "string")
              setDefaultOverride(d.defaultContent);
            if (typeof d.override_content === "string") {
              setOverride(d.override_content);
              setOverrideLoaded(true);
            }
          }
          if (action === "apply" && d.complete === false) {
            setNotice({
              kind: "error",
              text: tr("restart.incomplete", {
                detail: incompleteApplyDetail(d, tr)
              })
            });
            loadAll();
            if (d.restarting || d.needs_full_quit) {
              suppressRestartAsk.current = false;
              setAskRestart(true);
            }
            return;
          }
          if (action === "apply") {
            if (d.manualQuit) {
              setNotice({
                kind: "ok",
                text: "\u041F\u0430\u0442\u0447\u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u043D\u0430 \u0434\u0438\u0441\u043A, \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u0438\u0445 \u0435\u0449\u0451 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B. \u041F\u043E\u043C\u043E\u0449\u043D\u0438\u043A \u0437\u0430\u043C\u0435\u043D\u044B \u043F\u0430\u043A\u0435\u0442\u0430 \u0436\u0434\u0451\u0442, \u043F\u043E\u043A\u0430 \u0432\u044B \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0432\u044B\u0439\u0434\u0435\u0442\u0435 (\u0432 macOS \u2014 \u2318Q, \u0432 Windows \u2014 \u0432\u044B\u0445\u043E\u0434 \u0438\u0437 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0433\u043E \u0442\u0440\u0435\u044F). \u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0437\u0430\u043C\u0435\u043D\u044B \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 DSH \u0432\u0440\u0443\u0447\u043D\u0443\u044E; \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442."
              });
              setAskRestart(false);
              loadAll();
              return;
            }
            setNotice({ kind: "ok", text: tr("ok.done") });
            loadAll();
            if (d.restarting || d.needs_full_quit) {
              suppressRestartAsk.current = false;
              setAskRestart(true);
            } else {
              setAskRestart(false);
            }
            return;
          }
          setNotice({ kind: "ok", text: tr("ok.done") });
          loadAll();
        }).catch((e) => {
          if (ticket !== actionTicket.current) return;
          setNotice({
            kind: "error",
            text: tr("err.action", { action: label, error: e.message })
          });
        }).finally(() => {
          if (ticket === actionTicket.current) setPatchBusy(false);
        });
      };
      run();
    },
    [loadAll, rejectNeedPrompt, state]
  );
  const saveOverride = useCallback(async () => {
    if (promptPending.current) return;
    promptPending.current = true;
    const ticket = ++actionTicket.current;
    const content = readPromptBox();
    setPatchBusy(true);
    setNotice({ kind: "idle", text: "" });
    try {
      if (await bothInjectEmpty(content, defaultOverrideRef.current)) {
        rejectNeedPrompt(t);
        return;
      }
      const d = await apiJson("/dsh-purge/override", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content })
      });
      if (ticket !== actionTicket.current) return;
      if (responseNeedsPrompt(d)) {
        rejectNeedPrompt(t);
        return;
      }
      if (!d || !d.ok) throw new Error(d && d.error || "\u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C");
      const unchanged = readPromptBox() === content;
      if (unchanged && typeof d.content === "string") {
        overrideRef.current = d.content;
        setOverride(d.content);
      }
      setNotice({
        kind: "ok",
        text: unchanged ? t("saved.override") : "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F; \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043F\u0440\u0430\u0432\u043A\u0438 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B."
      });
    } catch (e) {
      if (ticket === actionTicket.current)
        setNotice({ kind: "error", text: t("err.save", { error: e.message }) });
    } finally {
      promptPending.current = false;
      if (ticket === actionTicket.current) setPatchBusy(false);
    }
  }, [t, rejectNeedPrompt]);
  const saveOwnServers = async () => {
    if (ownPending.current || !ownLoaded) return;
    ownPending.current = true;
    setOwnBusy(true);
    const content = ownRef.current;
    try {
      const d = await apiJson("/dsh-purge/own-servers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content })
      });
      if (!d || !d.ok) throw new Error(d && d.error || "\u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C");
      const unchanged = ownRef.current === content;
      if (unchanged && typeof d.content === "string") {
        ownRef.current = d.content;
        setOwnServers(d.content);
      }
      setNotice({
        kind: "ok",
        text: !unchanged ? "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F; \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043F\u0440\u0430\u0432\u043A\u0438 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B." : d.dropped > 0 ? t("saved.own.dropped", { n: d.dropped }) : t("saved.own")
      });
    } catch (e) {
      setNotice({ kind: "error", text: t("err.save", { error: e.message }) });
    } finally {
      ownPending.current = false;
      setOwnBusy(false);
    }
  };
  const restoreOverride = useCallback(() => {
    if (!defaultOverride) return;
    const tr = t;
    const ticket = ++actionTicket.current;
    overrideRef.current = defaultOverride;
    setOverride(defaultOverride);
    setPatchBusy(true);
    setNotice({ kind: "idle", text: "" });
    apiJson("/dsh-purge/override", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: defaultOverride })
    }).then((d) => {
      if (ticket !== actionTicket.current) return;
      if (!d || !d.ok) {
        setNotice({
          kind: "error",
          text: tr("err.save", { error: d && d.error || "" })
        });
        return;
      }
      const unchanged = readPromptBox() === defaultOverride;
      if (typeof d.content === "string" && unchanged) {
        overrideRef.current = d.content;
        setOverride(d.content);
      }
      setNotice({
        kind: "ok",
        text: unchanged ? tr("saved.restoreInject") : "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B; \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043F\u0440\u0430\u0432\u043A\u0438 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B."
      });
    }).catch((e) => {
      if (ticket !== actionTicket.current) return;
      setNotice({
        kind: "error",
        text: tr("err.save", { error: e.message })
      });
    }).finally(() => {
      if (ticket === actionTicket.current) setPatchBusy(false);
    });
  }, [defaultOverride, t]);
  const waitHostAfterUninstall = useCallback((tr) => {
    const started = Date.now();
    const ping = () => {
      fetch("/", { cache: "no-store", credentials: "same-origin" }).then((r) => {
        if (r.ok) {
          try {
            window.localStorage.removeItem("dshpp-theme");
            window.localStorage.removeItem("dshpp-theme-mode");
          } catch {
          }
          window.location.reload();
          return;
        }
        retry();
      }).catch(retry);
    };
    const retry = () => {
      if (Date.now() - started > 9e4) {
        setNotice({ kind: "error", text: tr("restart.timeout") });
        setUninstallBusy(false);
        return;
      }
      setTimeout(ping, 500);
    };
    setTimeout(ping, 800);
  }, []);
  const doUninstall = useCallback(() => {
    setUninstallBusy(true);
    setAskUninstall(false);
    setAskRestart(false);
    const tr = tRef.current;
    setNotice({ kind: "ok", text: tr("uninstall.applying") });
    apiJson("/dsh-purge/uninstall", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}"
    }).then((d) => {
      if (!d || !d.ok) throw new Error(d && d.error || "uninstall failed");
      setNotice({
        kind: "ok",
        text: d && d.note || hostText(tr, "uninstall.done", d.surface || hostSurfaceOf(state))
      });
      if ((d && d.surface) === "desktop" || d && d.fullApp || hostSurfaceOf(state) === "desktop")
        return;
      waitHostAfterUninstall(tr);
    }).catch((e) => {
      const msg = String(e && e.message || e || "");
      if (/failed to fetch|networkerror|load failed/i.test(msg)) {
        setNotice({
          kind: "ok",
          text: hostText(tr, "uninstall.done", hostSurfaceOf(state))
        });
        if (hostSurfaceOf(state) === "desktop" || clientGuessSurface() === "desktop")
          return;
        waitHostAfterUninstall(tr);
        return;
      }
      setNotice({
        kind: "error",
        text: tr("uninstall.fail", { error: msg })
      });
      setUninstallBusy(false);
    });
  }, [state, waitHostAfterUninstall]);
  const s = state;
  const located = !!(s && s.ai_base);
  const hostSurface = hostSurfaceOf(s);
  const desktopLikely = hostSurface === "desktop" || clientGuessSurface() === "desktop";
  const sealedReady = !located && desktopLikely && !!(s && (s.asar_still_sealed || s.desktop_exe || s.desktop_install));
  const patchesLost = !located && !!(s && s.patches_lost);
  const tally = located ? tallyPatches(patchRowsOf(s)) : { applied: 0, pending: 0, unmatched: 0, skipped: 0, total: 0 };
  const total = tally.total;
  const applied = tally.applied;
  const pct = located && total ? Math.round(applied / total * 100) : 0;
  const metricNotes = [];
  if (tally.pending)
    metricNotes.push(t("metric.pendingShort", { n: tally.pending }));
  if (tally.unmatched)
    metricNotes.push(t("metric.unmatchedShort", { n: tally.unmatched }));
  if (tally.skipped)
    metricNotes.push(t("metric.skipShort", { n: tally.skipped }));
  const versions = updateInfo && updateInfo.versions || [];
  const channelNow = updateInfo && updateInfo.channel || channel || "stable";
  const localVer = s && s.plugin_version || updateInfo && updateInfo.localVersion || "";
  const renderEdition = (id) => {
    const lane = updateInfo && updateInfo.lanes && updateInfo.lanes[id] || {};
    const ceiling = listedCeiling(
      versions,
      localVer || updateInfo && updateInfo.localVersion
    );
    const list = versions.filter(
      (item) => item.channel === id && keepListedVersion(item, ceiling)
    );
    const selectedRef = pick[id] || "";
    const hit = list.find((item) => item.ref === selectedRef) || preferListed(list, localVer, updateInfo && updateInfo.pin);
    const onLane = channelNow === id;
    const noBeta = id === "beta" && Array.isArray(updateInfo && updateInfo.versions) && !list.length;
    const pickedOther = Boolean(hit && selectedRef && !hit.current);
    const thisJob = updateJob && updateJob.id === id ? updateJob : null;
    let actionLabel = t("btn.checkUpdate");
    let actionKind;
    let actionClick = () => checkUpdate(id);
    let actionDisabled = updateBusy || Boolean(noBeta);
    if (noBeta) {
      actionLabel = t("update.noBeta");
      actionClick = () => {
      };
    } else if (pickedOther) {
      actionLabel = t("update.switch");
      actionKind = "primary";
      actionClick = () => switchSelected(id);
    } else if (!onLane) {
      actionLabel = id === "beta" ? t("channel.useBeta") : t("channel.useStable");
      actionKind = "primary";
      actionClick = () => changeChannel(id);
    } else if (canApplyUpdate && lane.hasUpdate) {
      actionLabel = t("btn.doUpdate");
      actionKind = "primary";
      actionClick = () => doUpdate(id);
    }
    if (thisJob) {
      if (thisJob.kind === "check") actionLabel = t("btn.checkUpdate.busy");
      else if (thisJob.kind === "done") actionLabel = t("btn.doUpdate.busy");
      else actionLabel = t("update.switching");
    }
    return h(
      "div",
      {
        className: "dshpp-edition" + (onLane ? " is-on" : ""),
        "aria-label": t("channel." + id)
      },
      h(
        "span",
        { className: "dshpp-edition-name" },
        t("channel." + id),
        onLane ? h("em", { className: "dshpp-now-mark" }, t("update.current")) : null
      ),
      h(
        "select",
        {
          className: "dshpp-field dshpp-ver",
          value: list.length ? hit && hit.ref || "" : "",
          disabled: updateBusy || !list.length,
          onChange: (e) => setPick(
            (prev) => Object.assign({}, prev, { [id]: e.target.value })
          ),
          "aria-label": t("update.pick")
        },
        list.length ? list.map(
          (item) => h(
            "option",
            {
              key: item.ref + (item.sha || ""),
              value: item.ref
            },
            versionChoiceLabel(item, t)
          )
        ) : h(
          "option",
          { value: "" },
          noBeta ? t("update.noBeta") : t("update.pick")
        )
      ),
      h(
        Btn,
        {
          tiny: true,
          kind: actionKind,
          disabled: actionDisabled,
          onClick: actionClick
        },
        actionLabel
      )
    );
  };
  return h(
    "section",
    { className: "dshpp-panel", "aria-label": t("purge.title") },
    h(
      "div",
      { hidden: page !== "status" },
      h(
        "div",
        { className: "dshpp-hero" },
        h(
          "div",
          { className: "dshpp-hero-state" },
          h("i", {
            className: "dshpp-dot " + (!located ? "is-warn" : patchBusy ? "" : s?.asar_still_sealed || tally.pending ? "is-warn" : "is-ok")
          }),
          h(
            "b",
            null,
            !s ? "\u0427\u0438\u0442\u0430\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0445\u043E\u0441\u0442\u0430\u2026" : s.ok === false ? "\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F: \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0445\u043E\u0441\u0442\u0430 \u0438 \u043F\u0430\u0442\u0447\u0435\u0439 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E" : !located ? sealedReady ? "\u0425\u043E\u0441\u0442 \u0435\u0449\u0451 \u043D\u0435 \u0440\u0430\u0441\u043F\u0430\u043A\u043E\u0432\u0430\u043D: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB" : "\u0425\u043E\u0441\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435" : s?.asar_still_sealed ? `${applied}/${total} \u0448\u0442. \u043F\u0430\u0442\u0447\u0435\u0439 \u043D\u0430 \u0434\u0438\u0441\u043A\u0435 (\u0437\u0430\u0433\u0440\u0443\u0437\u044F\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430)` : tally.pending ? `\u0435\u0449\u0451 ${tally.pending} \u0448\u0442. \u0436\u0434\u0443\u0442 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F` : `${applied}/${total} \u0448\u0442. \u043F\u0430\u0442\u0447\u0435\u0439 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442`
          ),
          h(
            "span",
            { className: "dshpp-hero-sub" },
            t("surface." + hostSurface)
          )
        ),
        h(
          "div",
          { className: "dshpp-hero-actions" },
          h(
            Btn,
            {
              kind: "primary",
              className: "dshpp-btn-lead",
              disabled: patchBusy || uninstallBusy || !overrideLoaded,
              onClick: () => doAction("apply", "action.apply")
            },
            patchBusy ? t("btn.apply.busy") : t("btn.apply")
          ),
          h(
            Btn,
            {
              kind: "danger",
              disabled: patchBusy || uninstallBusy,
              onClick: () => doAction("revert", "action.revert")
            },
            t("btn.revert")
          ),
          h(
            Btn,
            {
              kind: "solid-danger",
              disabled: patchBusy || uninstallBusy,
              onClick: () => setAskUninstall(true)
            },
            uninstallBusy ? t("btn.uninstall.busy") : t("btn.uninstall")
          ),
          h(
            Btn,
            {
              tiny: true,
              onClick: loadAll,
              disabled: patchBusy || uninstallBusy
            },
            "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C"
          )
        ),
        h(
          "p",
          { className: "dshpp-hero-hint" },
          "\u041F\u043E\u0441\u043B\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430, \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F DSH \u0438\u043B\u0438 \u043A\u043E\u0433\u0434\u0430 \u043C\u043E\u0434\u0435\u043B\u044C \u0441\u043D\u043E\u0432\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u0443\u043A\u043B\u043E\u043D\u044F\u0442\u044C\u0441\u044F: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0440\u0430\u0437 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB, \u0437\u0430\u0442\u0435\u043C \u0432\u044B\u0439\u0434\u0438\u0442\u0435 \u0438 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 DSH \u0437\u0430\u043D\u043E\u0432\u043E \u2014 \u0432\u0441\u0451 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F."
        ),
        noticeNode(notice)
      ),
      h(
        "div",
        { className: "dshpp-rel" },
        h(
          "div",
          { className: "dshpp-now" },
          h("span", { className: "dshpp-now-label" }, t("channel.local")),
          h(
            "b",
            { className: "dshpp-now-ver" },
            localVer ? "v" + localVer : "\u2014"
          ),
          h("em", { className: "dshpp-now-mark" }, t("update.current"))
        ),
        h(
          "details",
          { className: "dshpp-editions" },
          h("summary", null, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u0435\u0440\u0441\u0438\u044F\u043C\u0438"),
          renderEdition("stable"),
          renderEdition("beta")
        ),
        noticeNode(updateNotice)
      ),
      h(
        "details",
        { className: "dshpp-fold" },
        h(
          "summary",
          null,
          "\u0414\u0435\u0442\u0430\u043B\u0438 \u043F\u0430\u0442\u0447\u0435\u0439 ",
          h(
            "b",
            null,
            !s ? "\u0427\u0438\u0442\u0430\u0435\u043C" : s.ok === false ? "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E" : s.ai_base ? `${applied}/${total} \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u043E` : "\u0425\u043E\u0441\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
          )
        ),
        h(PatchGroups, { state: s })
      ),
      h(
        "details",
        null,
        h("summary", null, "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E"),
        h(HooksDenySection, { onSaved: loadAll })
      ),
      askUninstall ? h(
        "div",
        {
          className: "dshpp-modal-bg",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "dshpp-uninstall-title",
          onClick: (e) => {
            if (e.target === e.currentTarget && !uninstallBusy)
              setAskUninstall(false);
          }
        },
        h(
          "div",
          { className: "dshpp-modal" },
          h("h4", { id: "dshpp-uninstall-title" }, t("uninstall.title")),
          h("p", null, t("uninstall.body")),
          h(
            "div",
            { className: "dshpp-modal-ops" },
            h(
              Btn,
              {
                disabled: uninstallBusy,
                onClick: () => setAskUninstall(false)
              },
              t("uninstall.cancel")
            ),
            h(
              Btn,
              {
                kind: "solid-danger",
                disabled: uninstallBusy,
                onClick: doUninstall
              },
              t("uninstall.confirm")
            )
          )
        )
      ) : null,
      h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-mute)",
            fontSize: 12
          }
        },
        t("apply.hint")
      ),
      s?.ok === true && !s.ai_base ? h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-danger, #c44)",
            fontSize: 12
          }
        },
        hostText(t, "warn.noRoot", hostSurface)
      ) : null,
      s && s.ai_base && s.override_status === "missing" ? h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-mute)",
            fontSize: 12
          }
        },
        t("warn.noInject")
      ) : null,
      askRestart ? h(RestartAsk, {
        t,
        theme: detectHostTheme(),
        onLater: () => {
          suppressRestartAsk.current = true;
          setAskRestart(false);
        },
        onRestart: () => {
          suppressRestartAsk.current = true;
          setAskRestart(false);
          restartDsh(setNotice, function() {
          }, t, hostSurface);
        }
      }) : null
    ),
    h(
      "div",
      { hidden: page !== "prompt" },
      h(
        "div",
        { className: "dshpp-sub" },
        h("h4", null, t("override.title")),
        h(
          "div",
          { className: "dshpp-row", style: { margin: 0 } },
          h(
            Btn,
            {
              kind: "primary",
              tiny: true,
              disabled: patchBusy || !overrideLoaded,
              onClick: saveOverride
            },
            t("btn.saveInject")
          ),
          h(
            Btn,
            {
              tiny: true,
              disabled: patchBusy || !overrideLoaded || !defaultOverride,
              onClick: restoreOverride
            },
            t("btn.restoreInject")
          )
        )
      ),
      h("textarea", {
        className: "dshpp-area",
        ref: promptAreaRef,
        "aria-label": "\u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u043F\u0440\u043E\u043C\u043F\u0442\u0430",
        disabled: !overrideLoaded,
        value: override,
        onChange: (e) => {
          overrideRef.current = e.target.value;
          setOverride(e.target.value);
        },
        spellCheck: false,
        placeholder: ""
      }),
      noticeNode(notice),
      promptBoxEmpty(override) ? h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-danger, #c44)",
            fontSize: 12
          }
        },
        t("need.prompt")
      ) : null
    ),
    h(
      "div",
      { hidden: page !== "more" },
      h(
        "div",
        { className: "dshpp-sub" },
        h("h4", null, t("own.title")),
        h(
          "div",
          { className: "dshpp-row", style: { margin: 0 } },
          h(
            Btn,
            {
              kind: "primary",
              tiny: true,
              disabled: !ownLoaded || ownBusy,
              onClick: saveOwnServers
            },
            t("own.save")
          )
        )
      ),
      h("textarea", {
        className: "dshpp-area",
        "aria-label": "\u0441\u043F\u0438\u0441\u043E\u043A \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u0432",
        disabled: !ownLoaded,
        value: ownServers,
        onChange: (e) => {
          ownRef.current = e.target.value;
          setOwnServers(e.target.value);
        },
        spellCheck: false,
        rows: 4,
        style: { minHeight: 96 }
      }),
      h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-mute)",
            fontSize: 12
          }
        },
        t("own.hint")
      ),
      noticeNode(notice)
    )
  );
}

// src/state/session-context.js
var import_react11 = require("react");
var host = null;
var listeners = /* @__PURE__ */ new Set();
function notify() {
  for (const listener of listeners) listener();
}
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function bindSessionContext(ctx) {
  host = ctx;
  const dispose = [ctx.uiWorkspace?.selection, ctx.sessions?.list].filter((store) => typeof store?.subscribe === "function").map((store) => store.subscribe(notify));
  notify();
  return () => {
    for (const fn of dispose) if (typeof fn === "function") fn();
    if (host === ctx) {
      host = null;
      notify();
    }
  };
}
function readSessionCwd(sess) {
  if (!sess || typeof sess !== "object") return "";
  try {
    const pv = sess.projectionValues;
    if (pv && typeof pv.cwd === "string" && pv.cwd.trim()) return pv.cwd.trim();
  } catch {
  }
  try {
    if (typeof sess.cwd === "string" && sess.cwd.trim()) return sess.cwd.trim();
  } catch {
  }
  try {
    const header = sess.header;
    if (header && typeof header.cwd === "string" && header.cwd.trim())
      return header.cwd.trim();
  } catch {
  }
  return "";
}
function clientCurrentCwd() {
  if (!host?.sessions) return "";
  const sessions = host.sessions;
  const selection = host.uiWorkspace?.selection?.getSnapshot?.();
  const list = sessions.list?.getSnapshot?.();
  const id = selection?.sessionId || list?.current;
  if (!id) return "";
  const fromList = readSessionCwd(list?.byId?.[id]);
  if (fromList) return fromList;
  try {
    const scope = sessions.scope?.(id);
    const face = sessions.sessionOf?.(scope);
    return readSessionCwd(face?.getSnapshot?.() ?? face);
  } catch {
    return "";
  }
}
function useCurrentCwd() {
  return (0, import_react11.useSyncExternalStore)(subscribe, clientCurrentCwd, () => "");
}

// src/components/rules.js
var TARGETS = ["AGENTS.md", "CLAUDE.md"];
function ruleLabel(r) {
  if (!r) return "";
  if (r.name !== r.id) return r.name + " (" + r.id + ")";
  return r.id;
}
function RulesSection() {
  const t = useT();
  const cwd = useCurrentCwd();
  const statusTicket = useRef(0);
  const tRef = useRef(t);
  tRef.current = t;
  const [st, setSt] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editTarget, setEditTarget] = useState("AGENTS.md");
  const [content, setContent] = useState("");
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("AGENTS.md");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState({ kind: "idle", text: "" });
  const loadStatus = useCallback(() => {
    const tr = tRef.current;
    const ticket = ++statusTicket.current;
    rulesApi("status", cwd ? { cwd } : void 0).then((d) => {
      if (ticket !== statusTicket.current) return;
      if (d && d.ok) setSt(d);
      else {
        setSt({ ok: false, rules: [], active: null });
        setNotice({
          kind: "error",
          text: tr("err.rules", { error: d && d.error || "bad response" })
        });
      }
    }).catch((e) => {
      if (ticket !== statusTicket.current) return;
      setSt({ ok: false, rules: [], active: null });
      setNotice({
        kind: "error",
        text: tr("err.rules", { error: e.message })
      });
    });
  }, [cwd]);
  useEffect(() => {
    loadStatus();
    return () => {
      statusTicket.current += 1;
    };
  }, [loadStatus]);
  const doPost = useCallback(
    (action, payload, after) => {
      setBusy(true);
      setNotice({ kind: "idle", text: "" });
      rulesApi(action, payload).then((d) => {
        if (d && d.ok) {
          setNotice({ kind: "ok", text: t("ok.done") });
          if (action === "save" || action === "activate")
            warnNeedPrompt(d, t);
          loadStatus();
          if (after) after();
        } else {
          warnNeedPrompt(d, t);
          setNotice({
            kind: "error",
            text: t("err.action", { error: d && d.error || "" })
          });
        }
      }).catch(
        (e) => setNotice({
          kind: "error",
          text: t("err.action", { error: e.message })
        })
      ).finally(() => setBusy(false));
    },
    [loadStatus, t]
  );
  const openRule = useCallback(
    (id) => {
      setBusy(true);
      rulesApi("read", { id }).then((d) => {
        if (d.ok) {
          setEditId(id);
          setEditName(d.name || id);
          setEditTarget(d.target || "AGENTS.md");
          setContent(typeof d.content === "string" ? d.content : "");
        } else
          setNotice({
            kind: "error",
            text: t("err.read", { error: d.error || "" })
          });
      }).catch(
        (e) => setNotice({
          kind: "error",
          text: t("err.read", { error: e.message })
        })
      ).finally(() => setBusy(false));
    },
    [t]
  );
  const clearEditor = () => {
    setEditId(null);
    setEditName("");
    setEditTarget("AGENTS.md");
    setContent("");
  };
  let list;
  if (!st) {
    list = h("div", {
      className: "dshpp-skel",
      style: { height: 80, margin: 12 }
    });
  } else if (!st.rules || st.rules.length === 0) {
    list = h("p", { className: "dshpp-empty" }, t("rules.empty"));
  } else {
    list = st.rules.map((r) => {
      const isActive = r.id === st.active;
      const isEdit = r.id === editId;
      return h(
        "div",
        {
          key: r.id,
          className: "dshpp-ruleitem" + (isEdit ? " is-edit" : ""),
          role: "button",
          tabIndex: 0,
          onClick: () => openRule(r.id),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openRule(r.id);
            }
          }
        },
        h(
          "div",
          { className: "dshpp-rule-main" },
          h(
            "span",
            { className: "dshpp-rule-name" },
            ruleLabel(r),
            isActive ? h("span", { className: "dshpp-pill is-ok" }, t("pill.current")) : null
          ),
          h(
            "span",
            { className: "dshpp-rule-meta" },
            r.target + " \xB7 " + formatSize(r.size)
          )
        ),
        h(
          "div",
          { className: "dshpp-rule-ops" },
          h(
            Btn,
            {
              tiny: true,
              kind: isActive ? void 0 : "primary",
              disabled: busy || isActive,
              onClick: (e) => {
                e.stopPropagation();
                if (!isActive) doPost("activate", { id: r.id });
              }
            },
            isActive ? t("btn.inUse") : t("btn.use")
          ),
          h(
            Btn,
            {
              tiny: true,
              kind: "danger",
              disabled: busy,
              onClick: (e) => {
                e.stopPropagation();
                if (!window.confirm(t("confirm.delete", { id: r.id }))) return;
                if (editId === r.id) clearEditor();
                doPost("delete", { id: r.id });
              }
            },
            t("delete")
          )
        )
      );
    });
  }
  const policyValue = st && typeof st.workspace_policy === "string" ? st.workspace_policy : "fallback";
  const policyOptions = st && Array.isArray(st.workspace_policies) && st.workspace_policies.length ? st.workspace_policies : ["fallback", "strict", "always"];
  const cwdCandidates = st && Array.isArray(st.cwd_candidates) ? st.cwd_candidates : [];
  const cwdValue = st && typeof st.cwd === "string" ? st.cwd : "";
  return h(
    "section",
    { className: "dshpp-panel", "aria-label": t("rules.title") },
    h(
      "div",
      { className: "dshpp-head" },
      h("h3", { className: "dshpp-title" }, t("rules.title")),
      h(
        "div",
        { className: "dshpp-row", style: { margin: 0 } },
        noticeNode(notice),
        h(
          Btn,
          {
            tiny: true,
            kind: "danger",
            disabled: busy,
            onClick: () => {
              if (!window.confirm(t("rules.reset.confirm"))) return;
              clearEditor();
              doPost("reset", {});
            }
          },
          t("rules.reset")
        )
      )
    ),
    h(
      "div",
      { className: "dshpp-block" },
      h(
        "div",
        { className: "dshpp-policy-row" },
        h("label", { htmlFor: "dshpp-policy-select" }, t("policy.title")),
        h(
          "select",
          {
            id: "dshpp-policy-select",
            className: "dshpp-field",
            value: policyValue,
            disabled: busy || !st,
            onChange: (e) => doPost("set-policy", { policy: e.target.value })
          },
          policyOptions.map(
            (p) => h("option", { key: p, value: p }, t("policy." + p))
          )
        )
      ),
      h("p", { className: "dshpp-block-hint" }, t("policy.hint"))
    ),
    h(
      "div",
      { className: "dshpp-block" },
      h(
        "div",
        { className: "dshpp-block-head" },
        h("h4", null, t("cwd.title")),
        h(
          Btn,
          {
            tiny: true,
            disabled: busy,
            onClick: () => {
              let cwd2 = cwdValue;
              if (!cwd2) {
                try {
                  cwd2 = clientCurrentCwd();
                } catch {
                }
              }
              doPost("scan-cwd", cwd2 ? { cwd: cwd2 } : {});
            }
          },
          t("cwd.rescan")
        )
      ),
      cwdValue ? h("p", { className: "dshpp-cwd-path" }, cwdValue) : null,
      !st || !cwdValue ? h("p", { className: "dshpp-empty" }, t("cwd.no.workspace")) : cwdCandidates.length === 0 ? h("p", { className: "dshpp-empty" }, t("cwd.empty")) : h(
        "div",
        { className: "dshpp-cwd-list" },
        cwdCandidates.map(
          (item) => h(
            "label",
            {
              key: item.path,
              className: "dshpp-cwd-item" + (item.selected ? " is-on" : "")
            },
            h("input", {
              type: "checkbox",
              checked: Boolean(item.selected),
              disabled: busy,
              onChange: (e) => doPost("toggle-cwd", {
                path: item.path,
                enabled: e.target.checked
              })
            }),
            h(
              "div",
              { className: "dshpp-cwd-main" },
              h(
                "div",
                { className: "dshpp-cwd-name" },
                h("span", null, item.name),
                h(
                  "span",
                  { className: "dshpp-cwd-badge" },
                  t("cwd.scope." + (item.scope || "cwd"))
                ),
                h(
                  "span",
                  { className: "dshpp-cwd-size" },
                  formatSize(item.size || 0)
                )
              ),
              h("div", { className: "dshpp-cwd-sub" }, item.path),
              item.preview ? h("div", { className: "dshpp-cwd-prev" }, item.preview) : null
            )
          )
        )
      ),
      h("p", { className: "dshpp-block-hint" }, t("cwd.hint"))
    ),
    h(
      "div",
      { className: "dshpp-block" },
      h(
        "div",
        { className: "dshpp-split" },
        h(
          "div",
          { className: "dshpp-rulelist" },
          h("div", { className: "dshpp-rulebody" }, list),
          h(
            "div",
            { className: "dshpp-create" },
            h(
              "div",
              { className: "dshpp-create-row" },
              h("input", {
                className: "dshpp-field",
                placeholder: t("ph.id"),
                value: newId,
                onChange: (e) => setNewId(e.target.value)
              }),
              h("input", {
                className: "dshpp-field",
                placeholder: t("ph.alias"),
                value: newName,
                onChange: (e) => setNewName(e.target.value)
              }),
              h(
                "select",
                {
                  className: "dshpp-field",
                  style: { minWidth: 120, flex: "0 0 auto" },
                  value: newTarget,
                  onChange: (e) => setNewTarget(e.target.value)
                },
                TARGETS.map((x) => h("option", { key: x, value: x }, x))
              ),
              h(
                Btn,
                {
                  kind: "primary",
                  tiny: true,
                  disabled: busy,
                  onClick: () => {
                    const id = newId.trim();
                    if (!id) {
                      setNotice({ kind: "error", text: t("need.id") });
                      return;
                    }
                    const name2 = newName.trim() || id;
                    const target = newTarget;
                    doPost("save", { id, content: "", name: name2, target }, () => {
                      setEditId(id);
                      setEditName(name2);
                      setEditTarget(target);
                      setContent("");
                    });
                    setNewId("");
                    setNewName("");
                    setNewTarget("AGENTS.md");
                  }
                },
                t("btn.create")
              )
            )
          )
        ),
        h(
          "div",
          { className: "dshpp-editor" },
          editId ? [
            h(
              "div",
              { key: "meta", className: "dshpp-row" },
              h("input", {
                className: "dshpp-field",
                placeholder: t("ph.alias.short"),
                value: editName,
                onChange: (e) => setEditName(e.target.value)
              }),
              h(
                "select",
                {
                  className: "dshpp-field",
                  style: { minWidth: 120 },
                  value: editTarget,
                  onChange: (e) => setEditTarget(e.target.value)
                },
                TARGETS.map((x) => h("option", { key: x, value: x }, x))
              )
            ),
            h("textarea", {
              key: "body",
              className: "dshpp-area",
              value: content,
              onChange: (e) => setContent(e.target.value),
              placeholder: ""
            }),
            h(
              "div",
              { key: "save", className: "dshpp-row" },
              h(
                Btn,
                {
                  kind: "primary",
                  disabled: busy,
                  onClick: () => doPost("save", {
                    id: editId,
                    content,
                    name: editName,
                    target: editTarget
                  })
                },
                t("btn.saveRule")
              ),
              noticeNode(notice)
            )
          ] : h("div", { className: "dshpp-editor-empty" }, t("rules.pick"))
        )
      )
    )
  );
}

// src/components/skills.js
function skillUiAllowed(d) {
  if (!d) return false;
  const ver = String(d.plugin_version || d.localVersion || "").replace(
    /^v/i,
    ""
  );
  if (/^1\.1\.11(?:-|$)/.test(ver)) return false;
  const parts = ver.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!parts) return false;
  if (+parts[1] !== 1) return +parts[1] > 1;
  if (+parts[2] !== 1) return +parts[2] > 1;
  return +parts[3] >= 12;
}
function SkillsSection() {
  const t = useT();
  const tRef = useRef(t);
  tRef.current = t;
  const [onBeta, setOnBeta] = useState(false);
  const [st, setSt] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editDesc, setEditDesc] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState({ kind: "idle", text: "" });
  const zipRef = useRef(null);
  const folderRef = useRef(null);
  const loadStatus = useCallback(() => {
    const tr = tRef.current;
    const fail = (e) => {
      setSt({ ok: false, skills: [] });
      setNotice({
        kind: "error",
        text: skillsRouteMissing(e) ? tr("err.skills.needRestart") : tr("err.skills", {
          error: e && e.message || e || "bad response"
        })
      });
    };
    const apply2 = (d) => {
      if (d && d.ok) setSt({ ok: true, skills: d.skills || [] });
      else fail({ message: d && d.error || "bad response" });
    };
    apiJson("/dsh-purge/status").then((d) => {
      const allowed = skillUiAllowed(d);
      setOnBeta(allowed);
      if (!allowed) {
        setSt(null);
        return;
      }
      if (d.skills) {
        apply2({ ok: true, skills: d.skills });
        return;
      }
      skillsApi("status").then(apply2).catch(fail);
    }).catch(() => {
      setOnBeta(false);
      setSt(null);
    });
  }, []);
  useEffect(() => {
    loadStatus();
  }, [loadStatus]);
  const doPost = useCallback(
    (action, payload, after) => {
      setBusy(true);
      setNotice({ kind: "idle", text: "" });
      skillsApi(action, payload).then((d) => {
        if (d && d.ok) {
          setNotice({ kind: "ok", text: t("ok.done") });
          loadStatus();
          if (after) after(d);
        } else {
          setNotice({
            kind: "error",
            text: t("err.action", { error: d && d.error || "" })
          });
        }
      }).catch(
        (e) => setNotice({
          kind: "error",
          text: skillsRouteMissing(e) ? t("err.skills.needRestart") : t("err.action", { error: e.message })
        })
      ).finally(() => setBusy(false));
    },
    [loadStatus, t]
  );
  const openSkill = useCallback(
    (id) => {
      setBusy(true);
      skillsApi("read", { id }).then((d) => {
        if (d.ok) {
          setEditId(id);
          setEditDesc(d.description || "");
          setContent(typeof d.content === "string" ? d.content : "");
        } else
          setNotice({
            kind: "error",
            text: t("err.read", { error: d.error || "" })
          });
      }).catch(
        (e) => setNotice({
          kind: "error",
          text: t("err.read", { error: e.message })
        })
      ).finally(() => setBusy(false));
    },
    [t]
  );
  const clearEditor = () => {
    setEditId(null);
    setEditDesc("");
    setContent("");
  };
  const readAsBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const at = text.indexOf(",");
      resolve(at >= 0 ? text.slice(at + 1) : text);
    };
    reader.onerror = () => reject(new Error(t("need.import")));
    reader.readAsDataURL(file);
  });
  const importZip = (file) => {
    if (!file) {
      setNotice({ kind: "error", text: t("need.import") });
      return;
    }
    setBusy(true);
    setNotice({ kind: "ok", text: t("skills.importing") });
    readAsBase64(file).then((data) => skillsApi("import", { data, name: file.name })).then((d) => {
      if (!d || !d.ok) throw new Error(d && d.error || "");
      setNotice({
        kind: "ok",
        text: t("saved.import", { count: (d.imported || []).length || 1 })
      });
      loadStatus();
    }).catch(
      (e) => setNotice({
        kind: "error",
        text: skillsRouteMissing(e) ? t("err.skills.needRestart") : t("err.action", { error: e.message })
      })
    ).finally(() => setBusy(false));
  };
  const keepFolderFile = (file) => {
    const rel = String(file.webkitRelativePath || file.name || "").replace(
      /\\/g,
      "/"
    );
    if (!rel || rel.includes("..")) return false;
    if (/(^|\/)(node_modules|\.git|__MACOSX|\.system)(\/|$)/i.test(rel))
      return false;
    if (/(^|\/)\._/.test(rel) || /\/\.DS_Store$/i.test(rel)) return false;
    return true;
  };
  const importFolder = (list2) => {
    const files = Array.from(list2 || []).filter(keepFolderFile);
    if (!files.length) {
      setNotice({ kind: "error", text: t("err.import.folder") });
      return;
    }
    setBusy(true);
    setNotice({ kind: "ok", text: t("skills.importing") });
    Promise.all(
      files.map(
        (file) => readAsBase64(file).then((content2) => ({
          path: file.webkitRelativePath || file.name,
          content: content2,
          encoding: "base64"
        }))
      )
    ).then(
      (payload) => skillsApi("import", {
        files: payload,
        name: String(payload[0] && payload[0].path || "").split("/")[0]
      })
    ).then((d) => {
      if (!d || !d.ok) throw new Error(d && d.error || "");
      setNotice({
        kind: "ok",
        text: t("saved.import", { count: (d.imported || []).length || 1 })
      });
      loadStatus();
    }).catch(
      (e) => setNotice({
        kind: "error",
        text: skillsRouteMissing(e) ? t("err.skills.needRestart") : t("err.action", { error: e.message })
      })
    ).finally(() => setBusy(false));
  };
  if (!onBeta) return null;
  let list;
  if (!st) {
    list = h("div", {
      className: "dshpp-skel",
      style: { height: 80, margin: 12 }
    });
  } else if (!st.skills || st.skills.length === 0) {
    list = h("p", { className: "dshpp-empty" }, t("skills.empty"));
  } else {
    list = st.skills.map((item) => {
      const isEdit = item.id === editId;
      return h(
        "div",
        {
          key: item.id,
          className: "dshpp-ruleitem" + (isEdit ? " is-edit" : ""),
          role: "button",
          tabIndex: 0,
          onClick: () => openSkill(item.id),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openSkill(item.id);
            }
          }
        },
        h(
          "div",
          { className: "dshpp-rule-main" },
          h("span", { className: "dshpp-rule-name" }, item.id),
          h(
            "span",
            { className: "dshpp-rule-meta" },
            (item.valid ? item.description : t("skills.invalid")) + " \xB7 " + formatSize(item.size)
          ),
          item.valid ? h(
            "span",
            { className: "dshpp-rule-meta" },
            [
              item.userInvocable ? t("skills.call.slash", { cmd: "/" + item.id }) : t("skills.call.userOff"),
              item.modelInvocable ? t("skills.call.model") : t("skills.call.modelOff")
            ].join(" \xB7 ")
          ) : null
        ),
        h(
          "div",
          { className: "dshpp-rule-ops" },
          h(
            Btn,
            {
              tiny: true,
              kind: "danger",
              disabled: busy,
              onClick: (e) => {
                e.stopPropagation();
                if (!window.confirm(t("confirm.delete.skill", { id: item.id })))
                  return;
                if (editId === item.id) clearEditor();
                doPost("delete", { id: item.id });
              }
            },
            t("delete")
          )
        )
      );
    });
  }
  return h(
    "section",
    { className: "dshpp-panel", "aria-label": t("skills.title") },
    h(
      "div",
      { className: "dshpp-head" },
      h("h3", { className: "dshpp-title" }, t("skills.title")),
      h(
        "div",
        { className: "dshpp-row", style: { margin: 0 } },
        noticeNode(notice)
      )
    ),
    h(
      "p",
      {
        className: "dshpp-hint",
        style: { margin: "0 0 10px", color: "var(--dshpp-mute)", fontSize: 12 }
      },
      hostText(t, "skills.hint", hostSurfaceOf())
    ),
    h(
      "div",
      { className: "dshpp-split" },
      h(
        "div",
        { className: "dshpp-rulelist" },
        h("div", { className: "dshpp-rulebody" }, list),
        h(
          "div",
          { className: "dshpp-create" },
          h(
            "div",
            { className: "dshpp-create-row" },
            h("input", {
              ref: zipRef,
              type: "file",
              accept: ".zip,.tgz,.tar.gz,.tar,.skill",
              style: { display: "none" },
              onChange: (e) => {
                const file = e.target.files && e.target.files[0];
                e.target.value = "";
                importZip(file);
              }
            }),
            h("input", {
              ref: (el) => {
                folderRef.current = el;
                if (!el) return;
                el.setAttribute("webkitdirectory", "");
                el.setAttribute("directory", "");
                el.multiple = true;
              },
              type: "file",
              multiple: true,
              style: { display: "none" },
              onChange: (e) => {
                const files = Array.from(e.target && e.target.files || []);
                e.target.value = "";
                importFolder(files);
              }
            }),
            h(
              Btn,
              {
                kind: "primary",
                tiny: true,
                disabled: busy,
                onClick: () => zipRef.current && zipRef.current.click()
              },
              t("btn.importZip")
            ),
            h(
              Btn,
              {
                tiny: true,
                disabled: busy,
                onClick: () => folderRef.current && folderRef.current.click()
              },
              t("btn.importFolder")
            )
          )
        )
      ),
      h(
        "div",
        { className: "dshpp-editor" },
        editId ? [
          h(
            "div",
            { key: "meta", className: "dshpp-row" },
            h("input", {
              className: "dshpp-field",
              placeholder: t("ph.skill.desc"),
              value: editDesc,
              onChange: (e) => setEditDesc(e.target.value)
            })
          ),
          h("textarea", {
            key: "body",
            className: "dshpp-area",
            value: content,
            onChange: (e) => setContent(e.target.value),
            spellCheck: false,
            placeholder: ""
          }),
          h(
            "div",
            { key: "save", className: "dshpp-row" },
            h(
              Btn,
              {
                kind: "primary",
                disabled: busy,
                onClick: () => doPost("save", {
                  id: editId,
                  content,
                  description: editDesc
                })
              },
              t("btn.saveSkill")
            ),
            noticeNode(notice)
          )
        ] : h("div", { className: "dshpp-editor-empty" }, t("skills.pick"))
      )
    )
  );
}

// src/components/settings-shell.js
function compatibilityLevelText(t, level) {
  const key = "compat.level." + (level || "unknown");
  const hit = t(key);
  return hit && hit !== key ? hit : level || t("unknown");
}
function CommunityCompatibilityNote() {
  const t = useT();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiJson("/dsh-purge/community").then((d) => {
      if (d && d.ok !== false) setInfo(d);
      else setError(d && d.error || "bad response");
    }).catch((e) => setError(e && e.message || String(e)));
  }, []);
  const compat = info && info.compatibility || null;
  const host3 = compat && compat.host_version || "unknown";
  const text = compat ? t("compat.host", {
    version: info && info.version ? info.version : "\u2014",
    host: host3,
    level: compatibilityLevelText(t, compat.level)
  }) : error ? t("compat.unavailable", { error }) : t("compat.loading");
  return h(
    "p",
    {
      role: "status",
      className: "dshpp-hint",
      style: { margin: "0 20px 10px" }
    },
    text,
    compat && compat.message ? " " + compat.message : ""
  );
}
function CompatibilityNote({ status }) {
  if (true) return h(CommunityCompatibilityNote);
  if (!status) return null;
  const v = String(status.plugin_version || "");
  const valid = typeof status.patches_total === "number" && !!v;
  if (valid && v === "1.1.71") return null;
  return h(
    "p",
    {
      role: "status",
      className: "dshpp-hint",
      style: { margin: "0 20px 10px" }
    },
    valid ? "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F " + v + "; \u044D\u0442\u043E\u0442 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D \u043D\u0430 1.1.71. \u0415\u0441\u043B\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u0435\u0434\u0443\u0442 \u0441\u0435\u0431\u044F \u0441\u0442\u0440\u0430\u043D\u043D\u043E, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430." : "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 Purge. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435, \u0432\u043A\u043B\u044E\u0447\u0451\u043D \u043B\u0438 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u043B\u0430\u0433\u0438\u043D, \u0438\u043B\u0438 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430."
  );
}
function SettingsRoot(props = {}) {
  const t = typeof props.t === "function" ? props.t : useT();
  const [page, setPage] = useState("status");
  const [backendStatus, setBackendStatus] = useState(null);
  const st = useDock();
  const [visited, setVisited] = useState({ status: true });
  const select = (id) => {
    setPage(id);
    setVisited((v) => ({ ...v, [id]: true }));
  };
  useEffect(() => {
    if (st.tab === "drill" && st.open) select("drill");
  }, [st.tab, st.open]);
  setTranslate(t);
  return h(
    "div",
    { className: "dshpp-native dshpp-root" },
    h("style", null, base_default + native_default),
    h(
      "header",
      { className: "dshpp-native-head" },
      h("div", null, h("h2", null, "Purge"), h("p", null, "\u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430")),
      h(
        "span",
        { className: "dshpp-native-badge" },
        (true ? "community-\u0432\u0435\u0440\u0441\u0438\u044F " : "\u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 ") + "1.6.60"
      )
    ),
    h(CompatibilityNote, { status: backendStatus }),
    h(
      "nav",
      { className: "dshpp-native-nav", "aria-label": "\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A Purge" },
      [
        ["status", "\u0421\u0442\u0430\u0442\u0443\u0441"],
        ["prompt", "\u041F\u0440\u043E\u043C\u043F\u0442"],
        ["rules", "\u041F\u0440\u0430\u0432\u0438\u043B\u0430"],
        ["skills", "\u041D\u0430\u0432\u044B\u043A\u0438"],
        ["more", "\u0415\u0449\u0451"]
      ].map(
        ([id, label]) => h(
          "button",
          {
            key: id,
            type: "button",
            "aria-pressed": page === id,
            onClick: () => select(id)
          },
          label
        )
      )
    ),
    h(
      "div",
      { className: "dshpp-native-content" },
      page === "status" ? h(CommunityMaintenance) : null,
      h(
        "div",
        { hidden: !["status", "prompt", "more"].includes(page) },
        h(PurgifySection, { page, onStatus: setBackendStatus })
      ),
      visited.rules ? h("div", { hidden: page !== "rules" }, h(RulesSection)) : null,
      visited.skills ? h("div", { hidden: page !== "skills" }, h(SkillsSection)) : null,
      h(
        "div",
        { hidden: page !== "more", className: "dshpp-more" },
        h("h3", null, "\u041F\u043E\u043B\u0438\u0433\u043E\u043D"),
        h("p", null, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u0430 \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F."),
        h(
          Btn,
          {
            onClick: () => {
              select("drill");
              requestDrill("tab");
            }
          },
          "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u043B\u0438\u0433\u043E\u043D"
        ),
        h(
          "p",
          { className: "dshpp-attribution" },
          true ? "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 YuJunZhiXue/dsh-purge 1.1.71, \u0430\u0432\u0442\u043E\u0440\u0441\u0442\u0432\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E; \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u0434\u0443\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u0444\u043E\u0440\u043A\u0430." : "\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E; \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 Purge \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E. \u041D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 YuJunZhiXue/dsh-purge 1.1.71 (MIT)."
        )
      ),
      page === "drill" ? h(
        "div",
        { className: "dshpp-native-drill" },
        // у полигона свой CSS (.rt-*); в старой версии его вставлял в <head> dock, при рефакторинге он потерялся,
        // и панель в правой колонке оставалась совсем без стилей, а текст сжимался в одну колонку. Здесь подключаем его вместе с компонентом.
        __dshPurgeDrill && __dshPurgeDrill.CSS ? h("style", { "data-dsh-purge-drill": "1" }, __dshPurgeDrill.CSS) : null,
        h(
          Btn,
          {
            onClick: () => {
              setDock({ tab: "clean" });
              select("more");
            }
          },
          "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C"
        ),
        readDrillAuth() ? h(__dshPurgeDrill.Panel, { embedded: true }) : h("p", null, "\u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0440\u043E\u0439\u0434\u0438\u0442\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u0430.")
      ) : null
    )
  );
}

// src/components/page.js
var TABS = [
  ["status", "\u0421\u0442\u0430\u0442\u0443\u0441", "\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C \u0441 \u0445\u043E\u0441\u0442\u043E\u043C, \u043F\u0430\u0442\u0447\u0438, \u0441\u0430\u043C\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u043D\u044F\u0442\u0438\u044F \u0437\u0430\u0449\u0438\u0442\u044B"],
  ["prompt", "\u041F\u0440\u043E\u043C\u043F\u0442", "\u0442\u0435\u043A\u0441\u0442 \u0438\u043D\u044A\u0435\u043A\u0446\u0438\u0438 \u0438 \u0443\u0441\u0438\u043B\u0438\u0432\u0430\u044E\u0449\u0438\u0439 \u0431\u043B\u043E\u043A \u0441\u043D\u044F\u0442\u0438\u044F \u0437\u0430\u0449\u0438\u0442\u044B"],
  ["rules", "\u041F\u0440\u0430\u0432\u0438\u043B\u0430", "\u043D\u0430\u0431\u043E\u0440\u044B \u043F\u0440\u0430\u0432\u0438\u043B \u0438 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0430"],
  ["skills", "\u041D\u0430\u0432\u044B\u043A\u0438", "\u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u043D\u0430\u0432\u044B\u043A\u043E\u0432 DSH"],
  ["drill", "\u041F\u043E\u043B\u0438\u0433\u043E\u043D", "\u0443\u0447\u0435\u043D\u0438\u044F RedTeam \u0438 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F"],
  ["more", "\u0415\u0449\u0451", "\u0441\u043F\u0438\u0441\u043E\u043A \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u0432, \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0438 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435"]
];
function PurgeGlyph({ size = 18 } = {}) {
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      "aria-hidden": true
    },
    h("path", { d: "M12 3l7 3v6c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6l7-3z" }),
    h("path", { d: "M9.5 12.2l1.8 1.8 3.4-3.6" })
  );
}
function StatusStrip({ info }) {
  const compat = info?.compatibility || {};
  const level = compat.level || "";
  const ok = level === "qualified";
  return h(
    "div",
    { className: "dshpp-strip" },
    h(
      "span",
      { className: "dshpp-strip-item" },
      h("i", {
        className: "dshpp-dot " + (ok ? "is-ok" : level ? "is-warn" : "")
      }),
      "DSH ",
      h("b", null, compat.host_version || "\u2026")
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "\u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438 ",
      h(
        "b",
        null,
        level === "qualified" ? "\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E \u0440\u0435\u0433\u0440\u0435\u0441\u0441\u0438\u0435\u0439" : level === "unverified" ? "\u043D\u0435\u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F" : level === "mixed" ? "\u0432\u0435\u0440\u0441\u0438\u0438 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u0440\u0430\u0441\u0445\u043E\u0434\u044F\u0442\u0441\u044F" : level ? "\u0445\u043E\u0441\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" : info?.ok === false ? "\u043E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F" : "\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430"
      ),
      h(
        HelpTip,
        { title: "\u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438" },
        compat.message || "\u0412\u0435\u0440\u0434\u0438\u043A\u0442 \u043F\u043E \u0432\u0435\u0440\u0441\u0438\u044F\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u0445\u043E\u0441\u0442\u0430. qualified \u0437\u043D\u0430\u0447\u0438\u0442, \u0447\u0442\u043E \u044F\u043A\u043E\u0440\u044F \u043F\u0430\u0442\u0447\u0435\u0439 \u0434\u043B\u044F \u044D\u0442\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 DSH \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u044B \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443."
      )
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "\u0441\u0447\u0451\u0442\u0447\u0438\u043A \u0437\u0430\u043F\u0438\u0441\u0438 \u043D\u0430 \u0434\u0438\u0441\u043A ",
      h(
        "b",
        null,
        `${info?.patches_applied ?? "?"}/${info?.patches_total ?? "?"}`,
        info?.patches_na > 0 ? ` \xB7 ${info.patches_na} \u0448\u0442. \u043D\u0435\u043F\u0440\u0438\u043C\u0435\u043D\u0438\u043C\u044B \u043D\u0430 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435` : ""
      ),
      h(
        HelpTip,
        { title: "\u043F\u0430\u0442\u0447\u0438 \u0445\u043E\u0441\u0442\u0430" },
        `\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u0430\u0442\u0447\u0435\u0439 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u0432 \u043A\u043E\u0434 \u0445\u043E\u0441\u0442\u0430 DSH (\u0432 \u0437\u043D\u0430\u043C\u0435\u043D\u0430\u0442\u0435\u043B\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u043C\u044B\u0435 \u0437\u0434\u0435\u0441\u044C). \u0412\u0441\u0435\u0433\u043E \u043F\u0430\u0442\u0447\u0435\u0439 ${info?.patches_total_all ?? "?"}, \u0438\u0437 \u043D\u0438\u0445 ${info?.patches_na ?? 0} \u2014 \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u043F\u043B\u0430\u0433\u0438\u043D/\u043F\u0440\u0435\u0441\u0435\u0442 \u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D; \xAB\u043E\u0436\u0438\u0434\u0430\u0435\u0442 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F\xBB \u0437\u043D\u0430\u0447\u0438\u0442 \u044F\u043A\u043E\u0440\u044C \u043D\u0430 \u043C\u0435\u0441\u0442\u0435, \u0437\u0430\u043F\u0438\u0441\u0438 \u0435\u0449\u0451 \u043D\u0435 \u0431\u044B\u043B\u043E; \xAB\u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u043B\u043E\xBB \u0437\u043D\u0430\u0447\u0438\u0442 \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A\u0438 \u0445\u043E\u0441\u0442\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438\u0441\u044C \u0438 \u044F\u043A\u043E\u0440\u044C \u043D\u0443\u0436\u043D\u043E \u0438\u0441\u043A\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E.`
      )
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "\u043F\u043B\u0430\u0433\u0438\u043D ",
      h("b", null, info?.plugin_version || "1.6.60")
    )
  );
}
function LayoutNotice({ info }) {
  if (!info || !info.asar_still_sealed && !info.host_layout) return null;
  const sealed = info.asar_still_sealed === true;
  const note = info.host_layout?.note || "\u041D\u0430 \u0446\u0435\u043B\u0435\u0432\u043E\u043C \u0434\u0438\u0441\u043A\u0435 \u0432\u0441\u0451 \u0435\u0449\u0451 \u043B\u0435\u0436\u0438\u0442 app.asar; \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0435\u0449\u0451 \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D.";
  const handoff = info.asar_handoff ? ` \u0424\u0430\u0437\u0430 \u0437\u0430\u043C\u0435\u043D\u044B \u043F\u0430\u043A\u0435\u0442\u0430: ${{ not_scheduled: "\u0435\u0449\u0451 \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u043E: \u0437\u0430\u043C\u0435\u043D\u0430 \u043F\u0430\u043A\u0435\u0442\u0430 \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u044F \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB", archive_reappeared: "\u0430\u0440\u0445\u0438\u0432 \u043F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u0441\u043D\u043E\u0432\u0430; \u0441\u0442\u0430\u0440\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C \u043E \u0437\u0430\u043C\u0435\u043D\u0435 \u043D\u0435 \u0437\u043D\u0430\u0447\u0438\u0442, \u0447\u0442\u043E \u0442\u0435\u043A\u0443\u0449\u0430\u044F \u0443\u0436\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430", backup_missing: "\u0440\u0435\u0437\u0435\u0440\u0432\u043D\u0430\u044F \u043A\u043E\u043F\u0438\u044F \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0430\u0440\u0445\u0438\u0432\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443", unknown_target: "\u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440 \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D", unreadable: "\u0437\u0430\u043F\u0438\u0441\u044C \u043E \u0437\u0430\u043C\u0435\u043D\u0435 \u043D\u0435 \u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443", starting: "\u043F\u043E\u043C\u043E\u0449\u043D\u0438\u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F (\u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u044C \u043F\u043E\u043A\u0430 \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0430)", ready: "\u043F\u043E\u043C\u043E\u0449\u043D\u0438\u043A \u0433\u043E\u0442\u043E\u0432", waiting_for_quit: "\u0436\u0434\u0451\u043C \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0432\u044B\u0445\u043E\u0434\u0430 (macOS \u2318Q / \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u0442\u0440\u0435\u0439 Windows)", waiting_for_unlock: "\u0436\u0434\u0451\u043C \u0440\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438 \u0430\u0440\u0445\u0438\u0432\u0430", moving: "\u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0430\u0440\u0445\u0438\u0432", complete: "\u0437\u0430\u043C\u0435\u043D\u0430 \u043F\u0430\u043A\u0435\u0442\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 DSH \u0432\u0440\u0443\u0447\u043D\u0443\u044E", already_unsealed: "\u0430\u0440\u0445\u0438\u0432 \u0443\u0436\u0435 \u0443\u0431\u0440\u0430\u043D, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 DSH \u0432\u0440\u0443\u0447\u043D\u0443\u044E", failed: "\u0441\u0431\u043E\u0439, \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443 \u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u043F\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0443 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F", expired: "\u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u0435\u043A\u043B\u043E, \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u0435 \u0437\u0430\u043D\u043E\u0432\u043E \u0438\u043B\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u043F\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0443 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F", helper_stopped: "\u043F\u043E\u043C\u043E\u0449\u043D\u0438\u043A \u043D\u0435\u043E\u0436\u0438\u0434\u0430\u043D\u043D\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0441\u044F, \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u0435 \u0437\u0430\u043D\u043E\u0432\u043E \u0438\u043B\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u043F\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0443 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F" }[info.asar_handoff.phase] || info.asar_handoff.phase}.` : "";
  const diskNote = info.host_layout?.disk.archive_exists === true ? " \u041D\u0430 \u0446\u0435\u043B\u0435\u0432\u043E\u043C \u0434\u0438\u0441\u043A\u0435 \u0432\u0441\u0451 \u0435\u0449\u0451 \u043B\u0435\u0436\u0438\u0442 app.asar." : "";
  if (sealed) {
    return h(
      "p",
      { className: "dshpp-warn", role: "status" },
      note,
      diskNote,
      handoff
    );
  }
  return h(
    "details",
    { className: "dshpp-layout-details" },
    h("summary", null, "\u2713 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E \u0438\u0437 \u0440\u0430\u0441\u043F\u0430\u043A\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 (\u0437\u0430\u043C\u0435\u043D\u0430 \u043F\u0430\u043A\u0435\u0442\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430)"),
    h("p", { className: "dshpp-note" }, note, diskNote, handoff)
  );
}
function VersionNotice({ info }) {
  if (info && info.ok === false) {
    return h(
      "p",
      { className: "dshpp-warn", role: "status" },
      `\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430: ${info.error || "\u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D"}. \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0445\u043E\u0441\u0442\u0430 \u0438 \u043F\u0430\u0442\u0447\u0435\u0439 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E \u2014 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C\xBB \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435; \u0435\u0441\u043B\u0438 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0435 \u0443\u0445\u043E\u0434\u0438\u0442, \u043F\u0440\u0438\u043B\u043E\u0436\u0438\u0442\u0435 \u041E\u0421, \u0432\u0435\u0440\u0441\u0438\u0438 DSH/\u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u0438 \u044D\u0442\u043E\u0442 \u0442\u0435\u043A\u0441\u0442.`
    );
  }
  const backend = info?.plugin_version;
  if (!backend || backend === "1.6.60") return null;
  return h(
    "p",
    { className: "dshpp-warn", role: "status" },
    `\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F ${backend}; \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 ${"1.6.60"}. \u0415\u0441\u043B\u0438 \u043E\u043D\u0438 \u0440\u0430\u0441\u0445\u043E\u0434\u044F\u0442\u0441\u044F, \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043C\u043E\u0433\u0443\u0442 \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0442\u044C\u0441\u044F \u2014 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435\u0441\u044C \u0434\u043E \u043E\u0434\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 DSH.`
  );
}
function PurgePage() {
  const t = useT();
  const [tab, setTab] = useState("status");
  const [visited, setVisited] = useState({ status: true });
  const [info, setInfo] = useState(null);
  const select = (id) => {
    setTab(id);
    setVisited((v) => Object.assign({}, v, { [id]: true }));
  };
  const loadInfo = () => apiJson("/dsh-purge/status").then(setInfo).catch((error) => setInfo(unavailableStatus(error)));
  const mergeInfo = useCallback((s) => s && setInfo(s), []);
  useEffect(() => {
    if (tab === "status") loadInfo();
  }, [tab]);
  useEffect(() => {
    const phase = info?.asar_handoff?.phase;
    if (![
      "starting",
      "ready",
      "waiting_for_quit",
      "waiting_for_unlock",
      "moving"
    ].includes(phase))
      return;
    const timer = setInterval(loadInfo, 2e3);
    return () => clearInterval(timer);
  }, [info?.asar_handoff?.phase]);
  const active = TABS.find((row) => row[0] === tab) || TABS[0];
  return h(
    "div",
    { className: "dshpp-page" },
    h("style", null, base_default + native_default + page_default),
    h(
      "header",
      { className: "dshpp-page-head" },
      h("span", { className: "dshpp-page-glyph" }, h(PurgeGlyph, { size: 20 })),
      h(
        "div",
        { className: "dshpp-page-title" },
        h("h1", null, "Purge"),
        h(
          "p",
          null,
          active[2],
          true ? h(
            "span",
            { className: "dshpp-page-ver" },
            "community-\u0432\u0435\u0440\u0441\u0438\u044F 1.6.60"
          ) : null
        )
      )
    ),
    h(StatusStrip, { info }),
    h(VersionNotice, { info }),
    h(LayoutNotice, { info }),
    h(
      "nav",
      { className: "dshpp-page-tabs", role: "tablist" },
      TABS.map(
        ([id, label]) => h(
          "button",
          {
            key: id,
            type: "button",
            role: "tab",
            "aria-selected": tab === id ? "true" : "false",
            className: tab === id ? "is-on" : "",
            onClick: () => select(id)
          },
          label
        )
      )
    ),
    h(
      "div",
      { className: "dshpp-page-body" },
      h(
        "div",
        { hidden: tab !== "status", className: "dshpp-sec" },
        h(PurgifySection, { page: "status", onStatus: mergeInfo }),
        h(StatusExtras),
        h(CommunityMaintenance)
      ),
      h(
        "div",
        { hidden: tab !== "prompt", className: "dshpp-sec" },
        visited.prompt ? h(PurgifySection, { page: "prompt" }) : null
      ),
      h(
        "div",
        { hidden: tab !== "rules", className: "dshpp-sec" },
        visited.rules ? h(RulesSection) : null
      ),
      h(
        "div",
        { hidden: tab !== "skills", className: "dshpp-sec" },
        visited.skills ? h(SkillsSection) : null
      ),
      h(
        "div",
        { hidden: tab !== "more", className: "dshpp-sec" },
        visited.more ? h(PurgifySection, { page: "more" }) : null
      ),
      tab === "drill" ? h(
        "div",
        { className: "dshpp-sec dshpp-page-drill" },
        __dshPurgeDrill && __dshPurgeDrill.CSS ? h("style", { "data-dsh-purge-drill": "1" }, __dshPurgeDrill.CSS) : null,
        readDrillAuth() ? h(__dshPurgeDrill.Panel, { embedded: true }) : h(
          "div",
          { className: "dshpp-card" },
          h(
            "p",
            { className: "dshpp-muted" },
            "\u0434\u043B\u044F \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u0430 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0443\u0436\u043D\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F."
          ),
          h(
            Btn,
            {
              kind: "primary",
              onClick: () => {
                setDock({ tab: "drill", authOpen: true });
                requestDrill("auth");
              }
            },
            "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438"
          )
        )
      ) : null
    ),
    h(
      "footer",
      { className: "dshpp-page-foot" },
      true ? "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E \xB7 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 YuJunZhiXue/dsh-purge 1.1.71 \xB7 MIT \xB7 \u0430\u0432\u0442\u043E\u0440\u0441\u0442\u0432\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E" : "\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E \xB7 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 YuJunZhiXue/dsh-purge 1.1.71 (MIT)"
    )
  );
}

// src/state/legacy-visibility.js
var ENTRY_CSS = ".dshp-launch,.dshp-hero-chip,.dshp-tab-chip,.dshp-dock{display:none!important}";
function installLegacyVisibility(doc = globalThis.document) {
  if (!doc?.head) return () => {
  };
  const style = doc.createElement("style");
  style.setAttribute("data-dsh-purge-panel-visibility", "1");
  style.textContent = ENTRY_CSS;
  doc.head.append(style);
  return () => style.remove();
}

// src/state/rewind-draft.js
var DRAFT_KEY = "dshp-rewind-draft:";
var ARM_KEY = "dshp-rewind-arm:";
var FILL_DELAYS = [0, 50, 180, 400, 800];
var ARM_TTL_MS = 45 * 1e3;
var seenAt = 0;
var host2 = null;
var workspace = null;
var conversation = null;
var pendingComposer = { sessionId: "", text: "", at: 0 };
var armedFill = { sessionId: "", text: "", at: 0 };
function storage() {
  try {
    return typeof window !== "undefined" ? window.sessionStorage : null;
  } catch {
    return null;
  }
}
function bindRewindHost(ctx) {
  host2 = ctx || null;
  workspace = ctx && ctx.uiWorkspace || null;
  conversation = ctx && ctx.conversation || null;
}
function hostSessions() {
  return host2 && host2.sessions || null;
}
function getRewindSeenAt() {
  return seenAt;
}
function noteRewindAt(at) {
  if (at) seenAt = at;
}
function rewindText(t, key, fallback) {
  try {
    if (typeof t === "function") {
      const value = t(key);
      if (value && value !== key) return value;
    }
  } catch {
  }
  return fallback;
}
function currentSessionId(sessions) {
  try {
    const selected = workspace?.selection?.getSnapshot?.()?.sessionId;
    if (typeof selected === "string" && selected) return selected;
  } catch {
  }
  try {
    const snap = (sessions?.list || host2?.sessions?.list)?.getSnapshot?.();
    if (typeof snap?.current === "string" && snap.current) return snap.current;
  } catch {
  }
  return "";
}
function sessionKnown(sessions, sessionId) {
  try {
    const snap = sessions?.list?.getSnapshot?.();
    if (!snap || !sessionId) return false;
    if (snap.byId && Object.prototype.hasOwnProperty.call(snap.byId, sessionId))
      return true;
    if (Array.isArray(snap.ids) && snap.ids.includes(sessionId)) return true;
  } catch {
  }
  return false;
}
function waitMs(ms) {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.setTimeout)
      window.setTimeout(resolve, ms);
    else setTimeout(resolve, ms);
  });
}
function isPluginDraft(text) {
  const value = String(text || "").trim();
  if (!value) return false;
  return /^\[MNEMON\]/i.test(value) || /MNEMON RUNTIME MEMORY SNAPSHOT/i.test(value) || /^MNEMON VIEW TOOLS/im.test(value);
}
function writeDraft(sessionId, text) {
  if (!sessionId) return;
  const value = isPluginDraft(text) ? "" : text || "";
  pendingComposer = { sessionId, text: value, at: Date.now() };
  try {
    storage()?.setItem(DRAFT_KEY + sessionId, value);
  } catch {
  }
}
function peekDraft(sessionId) {
  if (!sessionId) return "";
  if (pendingComposer.sessionId === sessionId && pendingComposer.text)
    return pendingComposer.text;
  try {
    return storage()?.getItem(DRAFT_KEY + sessionId) || "";
  } catch {
    return "";
  }
}
function clearStoredDraft(sessionId) {
  if (!sessionId) return;
  if (pendingComposer.sessionId === sessionId)
    pendingComposer = { sessionId: "", text: "", at: 0 };
  try {
    storage()?.removeItem(DRAFT_KEY + sessionId);
  } catch {
  }
  try {
    storage()?.removeItem(ARM_KEY + sessionId);
  } catch {
  }
}
function armComposerFill(sessionId, text) {
  if (!sessionId || !text || isPluginDraft(text)) return;
  const at = Date.now();
  armedFill = { sessionId, text, at };
  writeDraft(sessionId, text);
  try {
    storage()?.setItem(ARM_KEY + sessionId, String(at));
  } catch {
  }
}
function takeArmedFill(sessionId) {
  if (!sessionId) return "";
  let text = "";
  let at = 0;
  if (armedFill.sessionId === sessionId && armedFill.text) {
    text = armedFill.text;
    at = armedFill.at;
  } else {
    text = peekDraft(sessionId);
    try {
      at = Number(storage()?.getItem(ARM_KEY + sessionId) || 0);
    } catch {
      at = 0;
    }
  }
  if (!text || !at || Date.now() - at > ARM_TTL_MS) {
    if (text && (!at || Date.now() - at > ARM_TTL_MS))
      clearStoredDraft(sessionId);
    return "";
  }
  clearStoredDraft(sessionId);
  armedFill = { sessionId: "", text: "", at: 0 };
  return text;
}
function conversationFace() {
  if (conversation) return conversation;
  if (host2?.conversation) return host2.conversation;
  if (typeof host2?.get === "function") {
    try {
      return host2.get("conversation");
    } catch {
      return void 0;
    }
  }
  return void 0;
}
function conversationInput(sessionId) {
  try {
    const input = conversationFace()?.input;
    if (!input || !sessionId) return null;
    if (typeof input.shell === "function") {
      try {
        return input.shell(sessionId);
      } catch {
      }
    }
    const sessions = host2?.sessions;
    const actx = typeof sessions?.scope === "function" ? sessions.scope(sessionId) : void 0;
    if (typeof input.for === "function" && actx) return input.for(actx);
    return null;
  } catch {
    return null;
  }
}
function liveDraft(sessionId, inputActions) {
  try {
    const fromActions = inputActions?.state?.getSnapshot?.()?.draft;
    if (typeof fromActions === "string") return fromActions;
  } catch {
  }
  try {
    const draft = conversationInput(sessionId)?.state?.getSnapshot?.()?.draft;
    if (typeof draft === "string") return draft;
  } catch {
  }
  return "";
}
function hostSetDraft(sessionId, text) {
  if (!sessionId) return false;
  try {
    const input = conversationInput(sessionId);
    if (input && typeof input.setDraft === "function") {
      input.setDraft(text || "");
      return true;
    }
  } catch {
  }
  return false;
}
function fillComposer(inputActions, text) {
  if (inputActions && typeof inputActions.setDraft === "function") {
    try {
      inputActions.setDraft(text || "");
    } catch {
    }
  }
}
function scheduleComposerFill(sessionId, text, inputActions) {
  if (!sessionId || !text || isPluginDraft(text)) return () => {
  };
  let stopped = false;
  let filled = false;
  const timers = [];
  const setTimer = typeof window !== "undefined" && window.setTimeout ? (fn, ms) => window.setTimeout(fn, ms) : (fn, ms) => setTimeout(fn, ms);
  const clearTimer = typeof window !== "undefined" && window.clearTimeout ? (id) => window.clearTimeout(id) : (id) => clearTimeout(id);
  const tryFill = () => {
    if (stopped) return;
    const current = liveDraft(sessionId, inputActions);
    if (filled && current !== text) {
      stopped = true;
      return;
    }
    if (current && current !== text) {
      stopped = true;
      return;
    }
    fillComposer(inputActions, text);
    hostSetDraft(sessionId, text);
    filled = true;
  };
  for (const ms of FILL_DELAYS) timers.push(setTimer(tryFill, ms));
  return () => {
    stopped = true;
    for (const id of timers) {
      try {
        clearTimer(id);
      } catch {
      }
    }
  };
}
function scheduleEchoClear(sessionId, inputActions) {
  if (!sessionId) return () => {
  };
  let last = "";
  let stopped = false;
  const timers = [];
  const setTimer = typeof window !== "undefined" && window.setTimeout ? (fn, ms) => window.setTimeout(fn, ms) : (fn, ms) => setTimeout(fn, ms);
  const clearTimer = typeof window !== "undefined" && window.clearTimeout ? (id) => window.clearTimeout(id) : (id) => clearTimeout(id);
  const tryClear = () => {
    if (stopped || !last) return;
    const current = String(liveDraft(sessionId, inputActions) || "").trim();
    if (!current) {
      stopped = true;
      return;
    }
    if (current !== last) return;
    fillComposer(inputActions, "");
    hostSetDraft(sessionId, "");
    clearStoredDraft(sessionId);
    stopped = true;
  };
  apiJson("/dsh-purge/last-user?sessionId=" + encodeURIComponent(sessionId)).then((data) => {
    if (stopped) return;
    last = String(data?.text || "").trim();
    if (!last || isPluginDraft(last)) return;
    tryClear();
    for (const ms of [0, 50, 180, 400]) timers.push(setTimer(tryClear, ms));
  }).catch(() => {
  });
  return () => {
    stopped = true;
    for (const id of timers) {
      try {
        clearTimer(id);
      } catch {
      }
    }
  };
}
async function dropInheritedQueue(sessions, sessionId) {
  if (!sessions || !sessionId) return;
  const drop = async () => {
    try {
      const actx = typeof sessions.scope === "function" ? sessions.scope(sessionId) : void 0;
      const face = typeof sessions.sessionOf === "function" ? sessions.sessionOf(actx) : void 0;
      const queue = face?.getSnapshot?.()?.queue || [];
      for (const item of queue) {
        const id = item?.id || item?.itemId;
        if (!id) continue;
        try {
          await face.updateQueue?.(id, { kind: "remove" });
        } catch {
        }
      }
    } catch {
    }
  };
  await drop();
  if (typeof window !== "undefined" && window.setTimeout)
    window.setTimeout(() => {
      drop();
    }, 80);
}
async function openRewoundSession(sessions, sessionId) {
  if (!sessionId) return;
  let lastError = null;
  for (let attempt = 0; attempt < 25; attempt += 1) {
    if (sessions && typeof sessions.refresh === "function" && !sessionKnown(sessions, sessionId)) {
      try {
        await sessions.refresh();
      } catch (error) {
        lastError = error;
      }
    }
    const known = sessionKnown(sessions, sessionId);
    if (known || typeof sessions?.open === "function") {
      try {
        if (workspace && typeof workspace.openSession === "function") {
          workspace.openSession(sessionId);
        } else if (typeof sessions?.open === "function") {
          sessions.open(sessionId);
        } else {
          throw new Error("\u043D\u0435 \u0443\u0434\u0430\u0451\u0442\u0441\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E \u043F\u043E\u0441\u043B\u0435 \u043E\u0442\u043A\u0430\u0442\u0430");
        }
        const selected = workspace?.selection?.getSnapshot?.()?.sessionId;
        if (!workspace || selected === sessionId) {
          await dropInheritedQueue(sessions, sessionId);
          if (typeof window !== "undefined" && window.setTimeout)
            window.setTimeout(() => {
              dropInheritedQueue(sessions, sessionId);
            }, 250);
          return;
        }
      } catch (error) {
        lastError = error;
      }
    }
    await waitMs(120);
  }
  throw new Error(lastError && lastError.message || "\u0441\u0435\u0441\u0441\u0438\u044F \u043F\u043E\u0441\u043B\u0435 \u043E\u0442\u043A\u0430\u0442\u0430 \u043D\u0435 \u043E\u0442\u043A\u0440\u044B\u043B\u0430\u0441\u044C");
}

// src/components/rewind.js
var REWIND_CSS = `
.dshp-rewind-wrap{position:relative;display:inline-flex}
.dshp-rewind{appearance:none;display:inline-flex;align-items:center;gap:4px;height:28px;padding:0 8px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,currentColor);font:12px/1 var(--ds-font-sans,system-ui,sans-serif);cursor:pointer}
.dshp-rewind:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12));color:var(--dsw-alias-label-primary,currentColor)}
.dshp-rewind:disabled{opacity:.4;cursor:default}
.dshp-rewind svg{display:block}
.dshp-rewind-menu{position:fixed;z-index:2147483000;box-sizing:border-box;min-width:220px;padding:4px;border:0;border-radius:12px;background:var(--dsw-specific-menu,#fff);color:var(--dsw-alias-label-primary,#1a1a1a);--dsw-elevation-stroke-color:var(--dsw-alias-border-l1);box-shadow:var(--dsw-elevation-prominent,0 8px 24px rgba(0,0,0,.16));transform:translateY(-100%)}
body[data-ds-dark-theme] .dshp-rewind-menu{background:var(--dsw-specific-menu,#32312d);color:var(--dsw-alias-label-primary,#e6e2db);--dsw-elevation-stroke-color:var(--dsw-alias-border-l1,#3f3d38);box-shadow:var(--dsw-elevation-prominent,0 10px 28px rgba(0,0,0,.45))}
.dshp-rewind-item{display:flex;flex-direction:column;gap:2px;width:100%;padding:8px 10px;border:0;border-radius:8px;background:transparent;color:inherit;text-align:left;cursor:pointer;font:12px/1.3 var(--ds-font-sans,system-ui,sans-serif)}
.dshp-rewind-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12))}
.dshp-rewind-item b{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary,inherit)}
.dshp-rewind-item span{color:var(--dsw-alias-label-tertiary,#9a958c);font-size:11px}
body[data-ds-dark-theme] .dshp-rewind-item span{color:var(--dsw-alias-label-tertiary,#a8a39a)}
`;
function rewindMenuNode(t, menuPos, menuRef, runRewind) {
  return h(
    "div",
    {
      className: "dshp-rewind-menu",
      role: "menu",
      ref: menuRef,
      style: menuPos ? { left: menuPos.left + "px", top: menuPos.top + "px" } : { left: "8px", bottom: "48px", transform: "none" }
    },
    h(
      "button",
      {
        type: "button",
        className: "dshp-rewind-item",
        onMouseDown: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          runRewind("once");
        }
      },
      h("b", null, rewindText(t, "rewind.once", "\u041E\u0442\u043A\u0430\u0442\u0438\u0442\u044C \u0440\u0430\u0437")),
      h(
        "span",
        null,
        rewindText(
          t,
          "rewind.once.hint",
          "\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0435 \u0432 \u044D\u0442\u043E\u043C \u0440\u0430\u0443\u043D\u0434\u0435 \u0432 \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430 \u0438 \u0443\u0431\u0440\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u044D\u0442\u043E\u0442 \u0440\u0430\u0443\u043D\u0434"
        )
      )
    ),
    h(
      "button",
      {
        type: "button",
        className: "dshp-rewind-item",
        onMouseDown: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          runRewind("round");
        }
      },
      h("b", null, rewindText(t, "rewind.round", "\u041E\u0442\u043A\u0430\u0442\u0438\u0442\u044C \u0440\u0430\u0443\u043D\u0434")),
      h(
        "span",
        null,
        rewindText(
          t,
          "rewind.round.hint",
          "\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0435 \u0432 \u044D\u0442\u043E\u043C \u0440\u0430\u0443\u043D\u0434\u0435 \u0432 \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430; \u0443 \u0441\u0443\u0431\u0430\u0433\u0435\u043D\u0442\u043E\u0432 \u0443\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u044D\u0442\u043E\u0442 \u0440\u0430\u0443\u043D\u0434"
        )
      )
    )
  );
}
var RewindFallback = class extends Component {
  constructor(p) {
    super(p);
    this.state = { menu: false, busy: false, notice: "", menuPos: null };
    this.wrap = null;
    this.menuEl = null;
    this.onDoc = (event) => {
      if (this.wrap && this.wrap.contains(event.target)) return;
      if (this.menuEl && this.menuEl.contains(event.target)) return;
      this.setState({ menu: false });
    };
  }
  componentDidMount() {
    if (typeof document !== "undefined" && document.addEventListener)
      document.addEventListener("mousedown", this.onDoc);
  }
  componentWillUnmount() {
    if (typeof document !== "undefined" && document.removeEventListener)
      document.removeEventListener("mousedown", this.onDoc);
  }
  run(mode) {
    const sessionId = this.props.sessionId || currentSessionId(hostSessions());
    if (!sessionId || this.state.busy) return;
    this.setState({ busy: true, menu: false, notice: "" });
    apiJson("/dsh-purge/rewind", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId, mode })
    }).then(async (data) => {
      if (!data || !data.ok || !data.sessionId || data.cleared === false) {
        throw new Error(data && data.error || "\u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0435 \u0440\u0430\u043D\u0435\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043E");
      }
      noteRewindAt(data.at);
      const text = isPluginDraft(data.text) ? "" : data.text || "";
      armComposerFill(data.sessionId, text);
      await openRewoundSession(hostSessions(), data.sessionId);
      scheduleComposerFill(data.sessionId, text);
      this.setState({ busy: false });
    }).catch((e) => {
      this.setState({
        busy: false,
        notice: "\u041E\u0442\u043A\u0430\u0442 \u043D\u0435 \u0443\u0434\u0430\u043B\u0441\u044F: " + String(e && e.message || e)
      });
    });
  }
  openMenu() {
    const rect = this.wrap && this.wrap.getBoundingClientRect ? this.wrap.getBoundingClientRect() : null;
    this.setState({
      menu: !this.state.menu,
      notice: "",
      menuPos: rect ? {
        left: Math.max(8, rect.right - 228),
        top: Math.max(8, rect.top - 8)
      } : null
    });
  }
  render() {
    const sessionId = this.props.sessionId || currentSessionId(hostSessions());
    const t = this.props.t || null;
    const label = this.state.busy ? "\u041E\u0442\u043A\u0430\u0442\u2026" : this.state.notice ? this.state.notice.slice(0, 18) : "\u041E\u0442\u043A\u0430\u0442";
    return h(
      "div",
      {
        className: "dshp-rewind-wrap",
        ref: (node) => {
          this.wrap = node;
        }
      },
      h("style", null, REWIND_CSS),
      h(
        "button",
        {
          type: "button",
          className: "dshp-rewind",
          disabled: this.state.busy || !sessionId,
          onMouseDown: (e) => e.preventDefault(),
          onClick: (e) => {
            e.preventDefault();
            this.openMenu();
          }
        },
        label
      ),
      this.state.menu ? rewindMenuNode(
        t,
        this.state.menuPos,
        (node) => {
          this.menuEl = node;
        },
        (mode) => this.run(mode)
      ) : null
    );
  }
};
var rewindVisible = true;
var rewindProbe = null;
function loadRewindVisibility() {
  if (!rewindProbe) {
    rewindProbe = apiJson("/dsh-purge/boost").then((r) => {
      rewindVisible = r && r.rewind !== false;
      return rewindVisible;
    }).catch(() => true);
  }
  return rewindProbe;
}
var RewindSafe = class extends Component {
  constructor(p) {
    super(p);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    try {
      console.error("[dsh-purge] rewind slot:", error);
    } catch {
    }
  }
  componentDidMount() {
    loadRewindVisibility().then((on) => {
      if (!on && !this.unmounted) this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  render() {
    if (!rewindVisible) return null;
    if (this.state.failed) return h(RewindFallback, this.props);
    return h(RewindButton, this.props);
  }
};
function RewindButton(props) {
  const fallbackT = useT();
  const t = props.t || fallbackT;
  const sessions = hostSessions();
  const inputActions = props.inputActions;
  const sessionId = props.sessionId || currentSessionId(sessions);
  const wrapRef = useRef(null);
  const menuRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [menu, setMenu] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  useEffect(() => {
    if (!sessionId) return;
    const armed = takeArmedFill(sessionId);
    if (armed) {
      scheduleComposerFill(sessionId, armed, inputActions);
      return;
    }
    scheduleEchoClear(sessionId, inputActions);
  }, [sessionId, inputActions]);
  useEffect(() => {
    if (!menu) return;
    if (typeof document === "undefined" || !document.addEventListener)
      return void 0;
    const onDoc = (event) => {
      if (wrapRef.current && wrapRef.current.contains(event.target)) return;
      if (menuRef.current && menuRef.current.contains(event.target)) return;
      setMenu(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menu]);
  const runRewind = async (mode) => {
    if (!sessionId || busy) return;
    setBusy(true);
    setMenu(false);
    setNotice("");
    try {
      const data = await apiJson("/dsh-purge/rewind", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, mode })
      });
      if (!data || !data.ok || !data.sessionId || data.cleared === false) {
        throw new Error(data && data.error || "\u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0435 \u0440\u0430\u043D\u0435\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043E");
      }
      noteRewindAt(data.at);
      const text = isPluginDraft(data.text) ? "" : data.text || "";
      armComposerFill(data.sessionId, text);
      await openRewoundSession(sessions, data.sessionId);
      scheduleComposerFill(data.sessionId, text);
    } catch (e) {
      const message = rewindText(t, "rewind.fail", "\u041E\u0442\u043A\u0430\u0442 \u043D\u0435 \u0443\u0434\u0430\u043B\u0441\u044F: {error}").replace(
        "{error}",
        String(e && e.message || e)
      );
      setNotice(message);
    } finally {
      setBusy(false);
    }
  };
  const onClick = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!sessionId || busy) return;
    if (menu) {
      setMenu(false);
      return;
    }
    const rect = wrapRef.current?.getBoundingClientRect?.();
    if (rect) {
      setMenuPos({
        left: Math.max(8, rect.right - 228),
        top: Math.max(8, rect.top - 8)
      });
    }
    setNotice("");
    setMenu(true);
  };
  const failLabel = notice ? notice.length > 18 ? notice.slice(0, 18) + "\u2026" : notice : "";
  const label = busy ? rewindText(t, "rewind.busy", "\u041E\u0442\u043A\u0430\u0442\u2026") : failLabel || rewindText(t, "rewind.label", "\u041E\u0442\u043A\u0430\u0442");
  const title = notice || rewindText(t, "rewind.aria", "\u041E\u0442\u043A\u0430\u0442");
  return h(
    "div",
    { className: "dshp-rewind-wrap", ref: wrapRef },
    h("style", null, REWIND_CSS),
    h(
      "button",
      {
        type: "button",
        className: "dshp-rewind",
        title,
        "aria-label": rewindText(t, "rewind.aria", "\u041E\u0442\u043A\u0430\u0442"),
        "aria-expanded": menu ? "true" : "false",
        disabled: busy || !sessionId,
        onMouseDown: (e) => e.preventDefault(),
        onClick
      },
      h(
        "svg",
        {
          viewBox: "0 0 16 16",
          width: "14",
          height: "14",
          "aria-hidden": true
        },
        h("path", {
          fill: "currentColor",
          d: "M7.2 3.2 3.4 7l3.8 3.8V8.6c2.8 0 4.7.7 5.9 2.3-.2-2.8-1.9-5.2-5.9-5.6V3.2z"
        })
      ),
      label
    ),
    menu ? rewindMenuNode(t, menuPos, menuRef, runRewind) : null
  );
}
function installRewindWatch(ctx) {
  const sessions = ctx && ctx.sessions || hostSessions();
  if (!sessions) return () => {
  };
  const tick = async () => {
    try {
      const data = await apiJson("/dsh-purge/rewind");
      if (!data || !data.sessionId || !data.at || data.at <= getRewindSeenAt())
        return;
      noteRewindAt(data.at);
      const current = currentSessionId(sessions);
      if (current && current !== data.parentId) return;
      const text = isPluginDraft(data.text) ? "" : data.text || "";
      armComposerFill(data.sessionId, text);
      scheduleComposerFill(data.sessionId, text);
      await openRewoundSession(sessions, data.sessionId);
      scheduleComposerFill(data.sessionId, text);
    } catch {
    }
  };
  const timer = typeof window !== "undefined" && window.setInterval ? window.setInterval(tick, 1200) : null;
  return () => {
    if (timer && typeof window !== "undefined" && window.clearInterval)
      window.clearInterval(timer);
  };
}
function installRewindUi(ctx) {
  bindRewindHost(ctx);
  ctx.slots.inject(
    "conversation.input.right",
    () => ctx.slots.register(
      {
        name: "conversation.input.right",
        id: "dsh-purge-rewind",
        order: 20,
        inject: (sessionId) => ({ sessionId, t: ctx.locale.bind(NS) })
      },
      RewindSafe
    )
  );
  ctx.effect(() => installRewindWatch(ctx), "dsh-purge: rewind watch");
}

// src/components/welcome.js
var rd3 = __toESM(require("react-dom"), 1);

// src/styles/welcome.css
var welcome_default = "/* The first-run dialog is rendered before any settings page. It must own its\n   styles and cannot depend on the optional drill vendor stylesheet. */\n.dshpp-welcome-mask {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  display: grid;\n  place-items: center;\n  padding: 24px;\n  overflow: auto;\n  box-sizing: border-box;\n  background: rgb(0 0 0 / 35%);\n  color: var(--dsw-alias-label-primary, #171717);\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 1.6;\n  text-align: left;\n}\n.dshpp-welcome-card {\n  width: min(600px, 100%);\n  max-height: calc(100dvh - 48px);\n  overflow: auto;\n  box-sizing: border-box;\n  padding: 24px;\n  border: 1px solid var(--dsw-alias-border-l1, #ddd);\n  border-radius: 16px;\n  background: var(--dsw-alias-bg-layer-1, #fff);\n  box-shadow: 0 16px 64px rgb(0 0 0 / 18%);\n}\n.dshpp-welcome-card h2 {\n  margin: 0 0 6px;\n  font: inherit;\n  font-size: 20px;\n  font-weight: 600;\n}\n.dshpp-welcome-card h3 {\n  margin: 16px 0 6px;\n  font: inherit;\n  font-weight: 600;\n}\n.dshpp-welcome-lead {\n  color: var(--dsw-alias-label-secondary, #666);\n}\n.dshpp-welcome-warn {\n  margin: 16px 0;\n  padding: 12px;\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-layer-2, #f5f5f5);\n}\n.dshpp-welcome-legal p {\n  margin: 10px 0;\n}\n.dshpp-welcome-legal a {\n  color: var(--dsw-alias-label-brand, #436ee8);\n  overflow-wrap: anywhere;\n}\n.dshpp-welcome-check {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-top: 20px;\n  cursor: pointer;\n}\n.dshpp-welcome-check input {\n  flex: 0 0 auto;\n  width: 16px;\n  height: 16px;\n  margin: 4px 0 0;\n  accent-color: var(--dsw-alias-label-brand, #436ee8);\n}\n.dshpp-welcome-ops {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 20px;\n}\n.dshpp-welcome-ops button {\n  min-height: 36px;\n  padding: 8px 16px;\n  border: 0;\n  border-radius: 8px;\n  background: var(--dsw-alias-label-primary, #171717);\n  color: var(--dsw-alias-bg-base, #fff);\n  font: inherit;\n  cursor: pointer;\n}\n.dshpp-welcome-ops button:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.dshpp-welcome-ops button:focus-visible,\n.dshpp-welcome-check input:focus-visible {\n  outline: 2px solid var(--dsw-alias-label-brand, #436ee8);\n  outline-offset: 3px;\n}\n@media (max-height: 600px) {\n  .dshpp-welcome-mask {\n    padding: 12px;\n  }\n  .dshpp-welcome-card {\n    max-height: calc(100dvh - 24px);\n    padding: 18px;\n  }\n}\n";

// src/components/welcome.js
var WELCOME_KEY = "dsh-purge-user-notice-v1";
function readWelcomeAck() {
  try {
    return window.localStorage.getItem(WELCOME_KEY) === "1";
  } catch {
    return false;
  }
}
function writeWelcomeAck() {
  try {
    window.localStorage.setItem(WELCOME_KEY, "1");
  } catch {
  }
}
function WelcomeNotice(props = {}) {
  const t = useT();
  const [open, setOpen] = useState(() => !readWelcomeAck());
  const [checked, setChecked] = useState(false);
  if (!open) return null;
  const repo = props.repo || t("welcome.repo");
  const node = h(
    "div",
    {
      className: "dshpp-welcome-mask",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "dshpp-welcome-title"
    },
    h("style", null, welcome_default),
    h(
      "div",
      { className: "dshpp-welcome-card" },
      h("h2", { id: "dshpp-welcome-title" }, t("welcome.title")),
      h("div", { className: "dshpp-welcome-lead" }, t("welcome.lead")),
      h("div", { className: "dshpp-welcome-warn" }, t("welcome.warn")),
      h(
        "div",
        { className: "dshpp-welcome-legal" },
        h("p", null, t("welcome.body")),
        h(
          "p",
          null,
          h(
            "a",
            {
              href: repo,
              target: "_blank",
              rel: "noopener noreferrer"
            },
            repo
          )
        ),
        h("h3", null, t("welcome.bans")),
        h("p", null, t("welcome.ban1")),
        h("p", null, t("welcome.ban2")),
        h("p", null, t("welcome.ban3"))
      ),
      h(
        "div",
        { className: "dshpp-welcome-checks" },
        h(
          "label",
          { className: "dshpp-welcome-check" },
          h("input", {
            type: "checkbox",
            checked,
            onChange: (e) => setChecked(!!(e && e.target && e.target.checked))
          }),
          h("span", null, t("welcome.check"))
        )
      ),
      h(
        "div",
        { className: "dshpp-welcome-ops" },
        h(
          "button",
          {
            type: "button",
            className: "primary",
            disabled: !checked,
            onClick: () => {
              if (!checked) return;
              writeWelcomeAck();
              setOpen(false);
            }
          },
          t("welcome.ok")
        )
      )
    )
  );
  if (rd3?.createPortal && typeof document !== "undefined" && document.body)
    return rd3.createPortal(node, document.body);
  return node;
}

// src/state/redteam-mode.js
function isRedteamPresetId(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  if (text === "redteam") return true;
  if (/^red[\s_-]*team$/i.test(text)) return true;
  const label = text.replace(/не\s*RedTeam/gi, "").replace(/не-?RedTeam/gi, "");
  if (/RedTeam/i.test(label)) return true;
  return false;
}
function readSessionAgentPreset(sess) {
  if (!sess || typeof sess !== "object") return "";
  try {
    const pv = sess.projectionValues;
    if (pv && typeof pv.agentPreset === "string") return pv.agentPreset;
  } catch {
  }
  try {
    if (typeof sess.agentPreset === "string") return sess.agentPreset;
  } catch {
  }
  try {
    const header = sess.header;
    if (header && typeof header.agentPreset === "string")
      return header.agentPreset;
  } catch {
  }
  return "";
}
function isRedteamModeActive() {
  try {
    const sessions = hostSessions();
    const sid = currentSessionId(sessions);
    if (sid && sessions) {
      try {
        const snap = typeof sessions.list?.getSnapshot === "function" ? sessions.list.getSnapshot() : null;
        const sess = snap && snap.byId ? snap.byId[sid] : null;
        if (isRedteamPresetId(readSessionAgentPreset(sess))) return true;
      } catch {
      }
      try {
        const actx = typeof sessions.scope === "function" ? sessions.scope(sid) : void 0;
        const face = typeof sessions.sessionOf === "function" ? sessions.sessionOf(actx) : void 0;
        const faceSnap = face && typeof face.getSnapshot === "function" ? face.getSnapshot() : face;
        if (isRedteamPresetId(readSessionAgentPreset(faceSnap))) return true;
      } catch {
      }
    }
  } catch {
  }
  if (typeof document === "undefined" || !document.querySelector) return false;
  try {
    const semantic = document.querySelector(
      "[data-agent-preset='redteam'], [data-preset-id='redteam'], [data-mode='redteam']"
    );
    if (semantic) return true;
    const nodes = document.querySelectorAll(
      "[class*='seat' i][class*='label' i], [class*='seatLabel' i], button[class*='seat' i], [role='button'][class*='seat' i]"
    );
    for (const el of nodes) {
      const text = String(el.textContent || "").replace(/\s+/g, " ").trim();
      if (/режим\s+RedTeam/i.test(text) || /^RedTeam\b/i.test(text)) return true;
    }
  } catch {
  }
  try {
    const labels = document.querySelectorAll(
      "[class*='label' i][class*='preset' i], [class*='presetLabel' i], [title*='RedTeam' i], [title*='RedTeam']"
    );
    for (const el of labels) {
      const text = String(el.textContent || "").trim();
      if (/режим\s+RedTeam/i.test(text) || /^RedTeam\b/i.test(text)) return true;
      if (isRedteamPresetId(text)) return true;
    }
  } catch {
  }
  return false;
}
function looksLikeSendControl(el) {
  if (!el || el.nodeType !== 1) return false;
  const btn = el.closest("button, [role='button']");
  if (!btn) return false;
  if (btn.closest(".dshp-dock, .dshp-auth-mask, .rt-dock, .dshp-env-gate"))
    return false;
  const label = [
    btn.getAttribute("aria-label"),
    btn.getAttribute("title"),
    btn.getAttribute("data-testid"),
    btn.textContent
  ].filter(Boolean).join(" ");
  if (/останов|стоп|Stop/i.test(label) && !/отправ|Send/i.test(label)) return false;
  if (/отправ|Submit|Send(?!\s*feedback)/i.test(label)) return true;
  try {
    const card = btn.closest("[data-composer-card], [data-composer-seat]");
    if (card) {
      const cls = String(btn.className || "");
      if (/primary/i.test(cls) && btn.querySelector("svg")) return true;
    }
  } catch {
  }
  if (btn.type === "submit") {
    const form = btn.closest("form");
    if (form && form.querySelector("textarea, [contenteditable='true']"))
      return true;
  }
  return false;
}

// src/components/env-gate.js
function fetchEnvAdaptStatus() {
  return fetch("/redteam/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ op: "platformEnvAdaptStatus" })
  }).then((r) => r.json()).catch(() => null);
}
function EnvAdaptSendGate() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [confirmSkip, setConfirmSkip] = useState(false);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const cacheRef = useRef({ at: 0, ready: false });
  const refresh = useCallback(async () => {
    const r = await fetchEnvAdaptStatus();
    const ready = !!(r && r.ready);
    cacheRef.current = {
      at: Date.now(),
      ready,
      skipped: !!(r && r.skipped)
    };
    setStatus(r);
    return r;
  }, []);
  const blockAndOpen = useCallback(() => {
    setConfirmSkip(false);
    refresh();
    if (!readDrillAuth()) {
      setOpen(false);
      requestDrillEnv();
      return true;
    }
    setOpen(true);
    return true;
  }, [refresh]);
  const mustBlockSubmit = useCallback(() => {
    if (!isRedteamModeActive()) return false;
    const cached = cacheRef.current;
    if (!cached.at || Date.now() - cached.at > 2500) {
      refresh().catch(() => {
      });
    }
    if (cached.ready) return false;
    blockAndOpen();
    return true;
  }, [blockAndOpen, refresh]);
  useEffect(() => {
    const patched = /* @__PURE__ */ new WeakMap();
    const patchedShells = [];
    const patchShell = (shell) => {
      if (!shell || patched.has(shell)) return;
      if (typeof shell.submit !== "function") return;
      const origSubmit = shell.submit;
      const origActionsSubmit = shell.actions && typeof shell.actions.submit === "function" ? shell.actions.submit : null;
      patched.set(shell, { origSubmit, origActionsSubmit });
      patchedShells.push(shell);
      const bound = origSubmit.bind(shell);
      shell.submit = function gatedSubmit(mode) {
        try {
          if (mustBlockSubmit()) return;
        } catch {
        }
        return bound(mode);
      };
      if (shell.actions && typeof shell.actions === "object") {
        shell.actions.submit = () => shell.submit("queue");
      }
    };
    const tick = () => {
      try {
        const sessions = hostSessions();
        const sid = currentSessionId(sessions);
        if (!sid) return;
        patchShell(conversationInput(sid));
      } catch {
      }
    };
    tick();
    const iv = typeof window !== "undefined" && window.setInterval ? window.setInterval(tick, 400) : null;
    return () => {
      if (iv && typeof window !== "undefined" && window.clearInterval)
        window.clearInterval(iv);
      for (const shell of patchedShells) {
        const info = patched.get(shell);
        if (!info) continue;
        try {
          shell.submit = info.origSubmit;
        } catch {
        }
        if (info.origActionsSubmit && shell.actions) {
          try {
            shell.actions.submit = info.origActionsSubmit;
          } catch {
          }
        }
      }
      patchedShells.length = 0;
    };
  }, [mustBlockSubmit]);
  useEffect(() => {
    let alive = true;
    const tick = () => {
      if (!alive) return;
      try {
        if (!isRedteamModeActive()) return;
      } catch {
        return;
      }
      refresh();
    };
    tick();
    const iv = typeof window !== "undefined" && window.setInterval ? window.setInterval(tick, 5e3) : null;
    return () => {
      alive = false;
      if (iv && typeof window !== "undefined" && window.clearInterval)
        window.clearInterval(iv);
    };
  }, [refresh]);
  useEffect(() => {
    if (typeof document === "undefined" || !document.addEventListener)
      return void 0;
    const onPointer = (e) => {
      if (!looksLikeSendControl(e.target)) return;
      if (!mustBlockSubmit()) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function")
        e.stopImmediatePropagation();
    };
    const onKey = (e) => {
      if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
      const target = e.target;
      const inComposer = target && target.closest && target.closest(
        "[data-composer-card], [data-composer-seat], [contenteditable='true'], textarea"
      );
      if (!inComposer) return;
      if (target.closest && target.closest(".dshp-dock, .dshp-auth-mask, .rt-dock, .dshp-env-gate"))
        return;
      if (!mustBlockSubmit()) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function")
        e.stopImmediatePropagation();
    };
    document.addEventListener("pointerdown", onPointer, true);
    document.addEventListener("click", onPointer, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", onPointer, true);
      document.removeEventListener("click", onPointer, true);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [mustBlockSubmit]);
  if (!open) return null;
  const message = status && status.message || t("envGate.lead");
  return h(
    "div",
    {
      className: "dshp-auth-mask dshp-env-gate",
      role: "dialog",
      "aria-modal": "true"
    },
    h(
      "div",
      { className: "dshp-auth-modal", style: { width: "min(480px,100%)" } },
      h("h2", null, t("envGate.title")),
      h("div", { style: { fontSize: 13, lineHeight: 1.55 } }, message),
      h(
        "div",
        {
          style: {
            fontSize: 12,
            color: "var(--dsw-alias-label-secondary,#999)",
            lineHeight: 1.5
          }
        },
        t("envGate.kaliHint")
      ),
      confirmSkip ? h("div", { className: "dshp-auth-warn" }, t("envGate.skipConfirm")) : null,
      h(
        "div",
        { className: "dshp-auth-ops" },
        confirmSkip ? [
          h(
            "button",
            {
              key: "no",
              type: "button",
              onClick: () => setConfirmSkip(false)
            },
            t("envGate.skipNo")
          ),
          h(
            "button",
            {
              key: "yes",
              type: "button",
              className: "primary",
              disabled: busy,
              onClick: () => {
                setBusy(true);
                fetch("/redteam/api", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    op: "platformEnvAdaptSkip",
                    skip: true
                  })
                }).then((r) => r.json()).then((r) => {
                  setBusy(false);
                  cacheRef.current = {
                    at: Date.now(),
                    ready: true,
                    skipped: true
                  };
                  setStatus(r);
                  setOpen(false);
                  setConfirmSkip(false);
                }).catch(() => {
                  setBusy(false);
                  cacheRef.current = {
                    at: Date.now(),
                    ready: true,
                    skipped: true
                  };
                  setOpen(false);
                });
              }
            },
            t("envGate.skipYes")
          )
        ] : [
          h(
            "button",
            {
              key: "skip",
              type: "button",
              onClick: () => setConfirmSkip(true)
            },
            t("envGate.skip")
          ),
          h(
            "button",
            {
              key: "go",
              type: "button",
              className: "primary",
              onClick: () => {
                setOpen(false);
                requestDrillEnv();
              }
            },
            t("envGate.go")
          )
        ]
      )
    )
  );
}

// src/entry.js
var name = true ? "dsh-purge-community" : "dsh-purge-panel";
var inject = ["slots", "locale"];
function PurgeIcon({ size = 20 } = {}) {
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      "aria-hidden": true
    },
    h("path", { d: "M4 7h16M4 17h16" }),
    h("circle", { cx: 9, cy: 7, r: 3, fill: "none" }),
    h("circle", { cx: 15, cy: 17, r: 3, fill: "none" })
  );
}
function PurgeGlyphIcon({ size = 16 } = {}) {
  return h(PurgeGlyph, { size });
}
function PanelOverlays() {
  const st = useDock();
  return h(
    import_react.default.Fragment,
    null,
    h("style", null, base_default),
    // Restored from 1.1.71 apply(): shell.overlay carried the welcome notice
    // and the red-team environment gate next to the dock.
    h(WelcomeNotice, {
      repo: true ? "https://github.com/kingcharleslzy-ai/dsh-purge" : void 0
    }),
    h(EnvAdaptSendGate),
    st.authOpen ? h(AuthGate, { pending: st.pending }) : null
  );
}
function apply(ctx) {
  ctx.effect(() => installLegacyVisibility(), "panel legacy visibility");
  ctx.inject(["sessions", "uiWorkspace"], (host3) => {
    host3.effect(() => bindSessionContext(host3), "panel session context");
  });
  ctx.effect(startGrantSync, "panel grant sync");
  ctx.inject(
    ["sessions", "uiWorkspace", "conversation"],
    (host3) => installRewindUi(host3)
  );
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "panel locale");
  const t = ctx.locale.bind(NS);
  setTranslate(t);
  ctx.slots.inject(
    "shell.overlay",
    () => ctx.slots.register(
      {
        name: "shell.overlay",
        id: "dsh-purge-panel-overlays",
        order: 60
      },
      PanelOverlays
    )
  );
  ctx.slots.inject(
    "sidebar.panellist",
    () => ctx.slots.register(
      {
        name: "sidebar.panellist",
        id: "dsh-purge",
        order: 30,
        label: "Purge",
        inject: () => ({ t })
      },
      PurgeGlyphIcon
    )
  );
  ctx.slots.inject(
    "main",
    () => ctx.slots.register(
      {
        name: "main",
        key: "dsh-purge",
        inject: () => ({ t })
      },
      PurgePage
    )
  );
  ctx.slots.inject(
    "plugins.bundle.config",
    () => ctx.slots.register(
      {
        name: "plugins.bundle.config",
        key: true ? "dsh-purge-community" : "dsh-purge-panel",
        inject: () => ({ t })
      },
      SettingsRoot
    )
  );
}

return module.exports;
}});
