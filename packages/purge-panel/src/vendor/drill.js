import React from "react";
// UI derived from YuJunZhiXue/dsh-purge 1.1.71 (MIT). See LICENSE.

export const __dshPurgeDrill = (() => {
  var module = { exports: {} };
  var exports = module.exports;

  var module = { exports: {} };
  var exports = module.exports;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

  const h = React.createElement;

  /*
   * Полигон сам по себе — плавающее окно: position:fixed, размещается через left/top/width/height.
   * Официальному frame не добавляем padding и не меняем ширину официального поля ввода. При встраивании в панель очистки используется .rt-embedded.
   */
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
/* brand-primary в тёмной теме почти белый (#f9fafb): на фоне #fff получится белый текст на белом.
   Используем инвертированную пару token «цвет метки / цвет фона» — высокий контраст сохраняется в обеих темах. */
.rt-btn-primary{background:var(--dsw-alias-label-primary,#111);border-color:var(--dsw-alias-label-primary,#111);color:var(--dsw-alias-bg-base,#fff)}
.rt-btn-primary:hover{opacity:.9}
.rt-btn:disabled{opacity:.5;cursor:default}
.rt-tabs{display:flex;flex-wrap:wrap;gap:2px;padding:6px 12px 0;border-bottom:1px solid var(--dsw-alias-border-l1)}
.rt-tab{padding:8px 10px 7px;border-radius:0;cursor:pointer;font-size:12.5px;color:var(--dsw-alias-label-secondary);
  display:inline-flex;align-items:center;gap:5px;border-bottom:2px solid transparent;margin-bottom:-1px;background:transparent}
.rt-tab:hover{color:var(--dsw-alias-label-primary)}
.rt-tab.on{color:var(--dsw-alias-label-primary);background:transparent;font-weight:600;border-bottom-color:var(--dsw-alias-brand-primary,#6dbf8c)}
/* Непрочитанное: на вкладке появился новый контент (новый актив/уязвимость/баллы/шаг…), после просмотра точка исчезает */
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
/* Полоса напоминания о дисциплине: показывается в самом верху блока, если не выполнены требования сдачи (шелл не Behinder/Godzilla, нет туннеля suo5) */
.rt-hint{border-radius:6px;padding:7px 9px;margin-bottom:8px;font-size:11.5px;line-height:1.6;
  border:1px dashed #ef444488;background:#ef44440f;color:var(--dsw-alias-label-primary)}
.rt-hint b{color:#ef4444}
.rt-tag-dead{color:var(--dsw-alias-label-secondary)}
.rt-expand{grid-column:1/-1;padding:8px 4px 10px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.rt-kv{display:flex;gap:8px;margin-bottom:3px;align-items:baseline}
.rt-kv b{color:var(--dsw-alias-label-primary);font-weight:600;min-width:64px;flex:none}
/* Представление графом удалено (см. AssetsTab: связи активов обеспечивают «разрез по доменам» и инструмент redteam_attack_path) */
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
/* Цели начисления сгруппированы по 8 категориям объединённой версии: заголовок категории + внутри по возрастанию баллов */
.rt-score-group{display:flex;align-items:center;gap:8px;padding:7px 10px 5px;margin-top:2px;
  font-size:12px;font-weight:600;border-top:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2)}
.rt-score-group:first-child{border-top:none}
.rt-score-group .rt-sg-sub{font-weight:400;font-size:11px;color:var(--dsw-alias-label-secondary)}
/* ── Сессии и входы: каждая карточка делится на четыре блока «строка заголовка / ключевые факты / доступные команды / примечания», чтобы всё не сливалось в одну строку ── */
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
/* ── Иерархия сворачивания ─────────────────────────────────────────────────────────────
   L1 заголовок секции .rt-sec   : во всю ширину, без скруглений и рамок, цветная полоска слева, тёмный фон —— всегда "плоский"
   L2 карточка содержимого .rt-atest/.rt-hit/.rt-cred/.rt-evi: с отступом, рамкой, скруглением —— приподнята
   L3 детали/длинный текст .rt-clip-body / .rt-evi-body : без рамки, самый светлый, моноширинный
   L4 контейнер подпунктов .rt-sec-body: отступ слева + вертикальная направляющая, показывающая "принадлежность верхнему заголовку"
   ──────────────────────────────────────────────────────────────────────────── */
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
/* Сворачивание длинного текста (L3): по умолчанию превью в 2 строки с затуханием, после раскрытия ограничение высоты со скроллом */
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
/* ── «Откуда взялся этот шаг» в отчёте: шаги действий / команды / учётные данные / туннели ───────────── */
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
/* ── Схема полного пути атаки ─────────────────────────────────────────────── */
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
/* Попадания без баллов из-за лимита сервиса или собственного развёртывания: баллы серые (+0), чтобы не выглядело как начисление */
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
/* Схема латерального перемещения */
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
/* Активы и содержимое переносятся адаптивно: длинные домены/пароли/результаты показываются с переносом, без обрезки в многоточие */
.rt-hit-asset{font-family:ui-monospace,Menlo,monospace;font-weight:600;flex:0 1 auto;max-width:100%;
  overflow-wrap:anywhere;word-break:break-word}
.rt-hit-txt{flex:1 1 100%;color:var(--dsw-alias-label-primary);line-height:1.55;
  white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word}
.rt-hit-txt.none{color:var(--dsw-alias-state-error-primary)}
.rt-hit-row .rt-hit-time{flex:none;margin-left:auto}
/* Самостоятельно зарегистрированные/развёрнутые учётные записи: фиксируются, но баллов не дают, вся строка приглушена */
.rt-hit-row.self-created{opacity:.72;border-left:3px solid #ef444488}
/* Повторные учётные записи/права на БД того же актива и порта: сервис уже взят полностью, баллов нет (только фиксация) */
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
/* После сворачивания должно быть сразу видно, «сколько баллов дал этап», поэтому счёт остаётся в заголовке */
.rt-rep-pts{font-size:11px;font-weight:600;padding:1px 6px;border-radius:5px;border:1px solid transparent;flex:none}
.rt-rep-body{padding-left:6px}
/* ── База знаний (POC/EXP) ──────────────────────────────────────────── */
.rt-kb-filter{display:flex;align-items:center;gap:7px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
/* Обзор категорий базы знаний: одна строка тегов, клик фильтрует по категории */
.rt-kb-cats{display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
/* Заголовок группы базы знаний (по одному на группу при группировке по категориям) */
.rt-kb-cat{display:flex;align-items:center;gap:7px;padding:7px 10px;background:var(--dsw-alias-bg-layer-2);
  border-bottom:1px solid var(--dsw-alias-border-l1);position:sticky;top:0;z-index:1}
.rt-kb-cat-name{font-weight:600;font-size:12.5px}
/* Бейдж доступности навыка (вкладка библиотеки навыков) */
.rt-avail{display:inline-block;padding:0 5px;border-radius:4px;font-size:10.5px;white-space:nowrap;
  border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.rt-avail-available{color:#10b981;border-color:#10b98155;background:#10b9811a}
.rt-avail-broken{color:#ef4444;border-color:#ef444455;background:#ef44441a}
.rt-avail-unknown{color:#94a3b8;border-color:#94a3b855;background:#94a3b81a}
/* Модальное окно версии / обновления */
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
/* Попадания по локальным шаблонам nuclei: путь должен быть виден целиком (скопировать в команду и запускать) */
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
.rt-shot-zoom-cap{color:#e5e7eb;font-size:12px;text-align:center;max-width:90vw;overflow-wrap:anywhere}`; /* ---------------------------------------------------------- Мост и состояние */
  /** Открыто ли отдельное окно «полного просмотра» (маркер в URL hash, тот же код интерфейса). */
  const isFullWindow = () => {
    try {
      return String(window.location.hash || "") === "#redteam-full";
    } catch {
      return false;
    }
  };

  const api = (req) =>
    fetch("/redteam/api", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req),
    }).then(async (res) => {
      const text = await res.text().catch(() => "");
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        return {
          ok: false,
          error: res.status + " non-json: " + String(text).slice(0, 120),
        };
      }
      if (!res.ok) {
        return Object.assign({}, data || {}, {
          ok: false,
          error:
            (data && (data.error || data.message)) ||
            res.status + " " + res.statusText,
        });
      }
      return data;
    });

  let ui = { open: true, tab: "assets" };
  const subs = new Set();
  const setUI = (patch) => {
    ui = Object.assign({}, ui, patch);
    const snap = Object.assign({}, ui);
    for (const f of Array.from(subs)) {
      try {
        f(snap);
      } catch {
        /* ignore subscriber errors */
      }
    }
  };
  /* Экспорт сохраняем. Размер панели пишется только в свой элемент, ширина официального frame больше не меняется. */
  let dockWidthTag = null;
  const setDockWidth = () => {};
  const useUI = () => {
    const [st, setSt] = React.useState(() => Object.assign({}, ui));
    React.useEffect(() => {
      const f = (snap) => setSt(Object.assign({}, snap || ui));
      subs.add(f);
      setSt(Object.assign({}, ui));
      return () => {
        subs.delete(f);
      };
    }, []);
    return st;
  };

  /* Категории базы знаний (совпадают с POC_CATEGORIES в core.js; панель группирует по ним) */
  const POC_CAT_NAME = {
    rce: "Удалённое выполнение команд",
    deserialization: "Десериализация",
    "file-upload": "Загрузка файлов getshell",
    sqli: "SQL-инъекция",
    unauthorized: "Доступ без авторизации",
    "auth-bypass": "Обход аутентификации / превышение полномочий",
    "weak-password": "Слабые пароли / брутфорс",
    ssrf: "SSRF",
    xxe: "XXE",
    "path-traversal": "Обход каталогов / чтение произвольных файлов",
    "info-leak": "Утечка информации",
    privesc: "Повышение привилегий / латеральное перемещение",
    tunnel: "Туннель / прокси",
    other: "Прочее",
  };
  const POC_CAT_ORDER = Object.keys(POC_CAT_NAME);
  /* Код роли → подпись (и в отчёте, и в базе знаний нужно указывать, «кто нашёл») */
  const ROLE_LABEL = {
    plan: "Главная сессия (командование)",
    recon: "Разведка",
    assess: "Инвентаризация активов",
    "vuln-scan": "Поиск уязвимостей",
    exploit: "Эксплуатация уязвимостей",
    internal: "Пентест внутренней сети",
  };

  const fmt = (s) => (s ? String(s).replace("T", " ").slice(0, 16) : "—");
  const shotCache = new Map();
  const shotLoading = new Map();
  const shotSrc = (eng, id) => shotCache.get(eng + ":" + id) || null;
  const loadShot = (eng, id) => {
    const key = eng + ":" + id;
    if (shotCache.has(key) || shotLoading.has(key)) return;
    const p = api({ op: "shotData", engagement: eng, id: id })
      .then((r) => {
        shotCache.set(
          key,
          r && r.base64
            ? "data:" + (r.mime || "image/png") + ";base64," + r.base64
            : "",
        );
        shotLoading.delete(key);
        const snap = Object.assign({}, ui);
        for (const f of Array.from(subs)) {
          try {
            f(snap);
          } catch {
            /* ignore subscriber errors */
          }
        }
      })
      .catch(() => {
        shotLoading.delete(key);
      });
    shotLoading.set(key, p);
  };
  const SHOT_KIND = { screenshot: "Живой скриншот", card: "Выдержка из записи" };
  const ShotImage = ({ eng, shot, height }) => {
    const [zoom, setZoom] = React.useState(false);
    const src = shotSrc(eng, shot.id);
    if (src === null) {
      loadShot(eng, shot.id);
    }
    const card = shot.kind === "card";
    return h(
      "div",
      { className: "rt-shot" },
      src === null
        ? h(
            "div",
            {
              className: "rt-shot-thumb rt-shot-loading",
              style: { height: (height || 96) + "px" },
            },
            "Загрузка…",
          )
        : h("img", {
            className: "rt-shot-thumb",
            src: src,
            alt: shot.label || "Доказательство " + shot.id,
            style: { height: (height || 96) + "px", cursor: "zoom-in" },
            onClick: () => setZoom(true),
          }),
      h(
        "div",
        { className: "rt-shot-cap" },
        h(
          "span",
          {
            className: "rt-tag " + (card ? "rt-tag-warn" : "rt-tag-live"),
            title: card
              ? "Выдержка с доказательствами, сформированная из записи за день, а не живой скриншот —— в отчёте это тоже помечается"
              : "Живой скриншот",
          },
          SHOT_KIND[shot.kind] || shot.kind || "Доказательство",
        ),
        h(
          "span",
          { className: "rt-shot-label", title: shot.label || shot.note || "" },
          shot.label || shot.target || "#" + shot.id,
        ),
      ),
      zoom
        ? h(
            "div",
            { className: "rt-shot-zoom", onClick: () => setZoom(false) },
            h("img", { src: src, alt: shot.label || "" }),
            h(
              "div",
              { className: "rt-shot-zoom-cap" },
              (shot.label || shot.target || "") +
                (card ? " · Сформировано из записи за день (не живой скриншот)" : "") +
                (shot.captured_at ? " · " + fmt(shot.captured_at) : "") +
                " · Клик в любом месте закрывает",
            ),
          )
        : null,
    );
  };
  const ShotStrip = ({ eng, shots, total, title }) => {
    const list = shots || [];
    if (list.length === 0) return null;
    return h(
      "div",
      { className: "rt-shots" },
      h(
        "div",
        { className: "rt-shots-head" },
        h("b", null, title || "Скриншоты доказательств"),
        h(
          "span",
          { className: "rt-shots-n" },
          "Показано " +
            list.length +
            " шт." +
            (total && total > list.length
              ? " (всего в этом пункте начисления " + total + " шт., показаны типовые)"
              : ""),
        ),
      ),
      h(
        "div",
        { className: "rt-shot-row" },
        list.map((sh) =>
          h(ShotImage, { key: "sh" + sh.id, eng: eng, shot: sh }),
        ),
      ),
    );
  };
  /** В списке у времени обнаружения остаётся только «месяц-день часы:минуты»: ширина строки ограничена, полное время — в подсказке */
  const fmtShort = (s) => {
    const t = String(s || "").replace("T", " ");
    return t.length >= 16 ? t.slice(5, 16) : t || "—";
  };
  const provLabel = (p) =>
    p === "passive" ? "Пассивный" : p === "active" ? "Активный" : "Неизвестно";

  /**
   * Дополняем элементы «кликабельные, но не <button>» доступностью с клавиатуры и возвращаем объект, который сразу раскрывается в props.
   *
   * Зачем: в панели много div/span в роли кнопок (строки таблиц, вкладки, строка выводов, элементы C-сегментов…),
   * по ним можно кликнуть мышью, но клавиатурой до них не добраться —— а таких мест было 16, каждое написано по-своему,
   * и по-разному (где-то только role, где-то забыт Space).
   * После сведения к одной фабрике новому кликабельному элементу достаточно `...clickable(fn, { label })` — и семантика полная.
   *
   * Внимание: **не** оборачивайте этим настоящий `<button>` (нативная кнопка уже имеет всю семантику).
   * @param onActivate - колбэк активации (клик мышью / Enter / Space — всё через него).
   * @param options - `{ label?, expanded? }`: label идёт в aria-label, expanded — в aria-expanded.
   * @returns фрагмент props: role / tabIndex / onClick / onKeyDown / aria-*
   */
  const clickable = (onActivate, options = {}) => {
    const props = {
      role: "button",
      tabIndex: 0,
      onClick: onActivate,
      onKeyDown: (e) => {
        /* Enter и Space — стандартные клавиши активации кнопки; для Space ещё блокируем прокрутку страницы */
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate(e);
        }
      },
    };
    if (options.label !== undefined)
      props["aria-label"] = String(options.label);
    if (options.expanded !== undefined)
      props["aria-expanded"] = options.expanded ? "true" : "false";
    return props;
  };

  /**
   * Копирует текст в буфер обмена и **возвращает реальный результат**.
   *
   * clipboard API в небезопасном контексте (http + не localhost), при потере фокуса страницы или отказе в правах
   * возвращает отклонённый Promise —— синхронный try/catch его не поймает, и интерфейс покажет «скопировано», а буфер пуст.
   * Здесь мы await реальный результат и при недоступности откатываемся на execCommand('copy') (старые браузеры и небезопасный контекст всё ещё работают).
   * @param text - текст для копирования.
   * @returns Promise<boolean>
   */
  const copyText = async (text) => {
    const value = text === undefined || text === null ? "" : String(text);
    if (value === "") return false;
    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (e) {
      /* доходим до резервного варианта ниже */
    }
    /* Резерв: временный textarea + execCommand —— единственный работающий способ в небезопасном контексте */
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

  /**
   * Копирует и даёт **честную** обратную связь в интерфейсе (единый текст успеха/ошибки).
   * @param text - текст для копирования.
   * @param label - имя, показываемое в сообщении об успехе.
   * @param onResult - необязательный колбэк: `(ok, message) => void`; без него возвращается Promise<boolean>.
   */
  const copyWithFeedback = async (text, label, onResult) => {
    const okFlag = await copyText(text);
    const message = okFlag
      ? "Скопировано: " + label
      : "Копирование не удалось (браузер не дал доступ к буферу) —— выделите текст и скопируйте вручную";
    if (typeof onResult === "function") onResult(okFlag, message);
    return okFlag;
  };

  function ProvTag(props) {
    if (!props.p) return h("span", { className: "rt-tag" }, "Неизвестно");
    return h(
      "span",
      { className: "rt-tag rt-tag-" + props.p },
      provLabel(props.p),
    );
  }

  const TEST_LABEL = {
    untested: "Не тестировался",
    testing: "Тестируется",
    tested: "Протестирован",
    blocked: "Заблокирован",
    abandoned: "Заброшен",
    no_surface: "Нет поверхности атаки",
  };
  const PRI_LABEL = { high: "Высокий", medium: "Средний", low: "Низкий" };

  /** Бейдж простоты атаки на актив. */
  function PriTag(props) {
    if (!props.p) return h("span", { className: "rt-tag" }, "Не оценён");
    return h(
      "span",
      { className: "rt-pri rt-pri-" + props.p, title: props.title || "" },
      PRI_LABEL[props.p] || props.p,
    );
  }

  /** Бейдж статуса тестирования актива. */
  function TestTag(props) {
    const st = props.s || "untested";
    return h(
      "span",
      { className: "rt-test rt-test-" + st },
      TEST_LABEL[st] || st,
    );
  }

  /* ---------------------------------------------------------- Карта активов */
  function AssetsTab(props) {
    const eng = props.engagement;
    const snapshot = props.snapshot;
    const refreshKey = props.refreshKey || 0;
    const onRefresh = props.onRefresh;
    const [view, setView] = React.useState("list");
    const [cidr, setCidr] = React.useState(null);
    const [q, setQ] = React.useState("");
    const [qApplied, setQApplied] = React.useState("");
    const [service, setService] = React.useState("");
    const [port, setPort] = React.useState("");
    const [prov, setProv] = React.useState("");
    const [testStatus, setTestStatus] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const [scope, setScope] = React.useState("");
    const [assetState, setAssetState] = React.useState("");
    const [sort, setSort] = React.useState("priority");
    const [showAll, setShowAll] = React.useState(null);
    const [state, setState] = React.useState({
      loading: false,
      error: null,
      total: 0,
      items: [],
    });
    const [domains, setDomains] = React.useState(null);
    const [web, setWeb] = React.useState(null);
    const [openId, setOpenId] = React.useState(null);
    const [detail, setDetail] = React.useState(null);
    /* Две группы слева — «внешний C-сегмент / внутренний C-сегмент» — сворачиваются независимо, состояние запоминается по цели */
    const sideCollapse = useCollapse("assets-side:" + eng);
    const seq = React.useRef(0);
    const onData = props.onData;

    React.useEffect(() => {
      if (!eng) return;
      const my = ++seq.current;
      setState((s) => Object.assign({}, s, { loading: true, error: null }));
      api({
        op: "assets",
        engagement: eng,
        cidr: cidr || undefined,
        q: qApplied || undefined,
        service: service || undefined,
        port: port || undefined,
        provenance: prov || undefined,
        test_status: testStatus || undefined,
        priority: priority || undefined,
        scope: scope || undefined,
        state: assetState || undefined,
        sort: sort,
        limit: 400,
      }).then(
        (r) => {
          if (my !== seq.current) return;
          if (!r || r.ok === false) {
            setState({
              loading: false,
              error: (r && r.error) || "Ошибка запроса",
              total: 0,
              items: [],
            });
            return;
          }
          setState({
            loading: false,
            error: null,
            total: r.total,
            items: r.items || [],
          });
          /* C-сегменты и статистика могли пополниться в этом раунде сбора: просим внешний слой перезабрать снимок, левая классификация обновится сразу */
          if (onData) onData();
        },
        (e) => {
          if (my === seq.current)
            setState({
              loading: false,
              error: String((e && e.message) || e),
              total: 0,
              items: [],
            });
        },
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
      refreshKey,
    ]);

    React.useEffect(() => {
      if (!eng || view !== "domain") return;
      setDomains(null);
      api({ op: "domains", engagement: eng, cidr: cidr || undefined }).then(
        (r) => setDomains((r && r.items) || []),
        () => setDomains([]),
      );
    }, [eng, view, cidr, refreshKey]);

    React.useEffect(() => {
      if (!eng || view !== "web") return;
      setWeb(null);
      api({ op: "web", engagement: eng, cidr: cidr || undefined }).then(
        (r) => setWeb((r && r.items) || []),
        () => setWeb([]),
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
      api({ op: "asset", engagement: eng, id: id }).then(
        (r) => {
          if (r && r.ok && r.asset) setDetail(r.asset);
        },
        () => {},
      );
    };

    const segs = (snapshot && snapshot.segments) || [];

    const sideChildren = [];
    sideChildren.push(
      h(
        "div",
        Object.assign(
          {
            key: "all",
            className:
              "rt-seg" + (cidr === null && view !== "testing" ? " on" : ""),
          },
          clickable(
            () => {
              setView("list");
              setCidr(null);
            },
            {
              label: "Все C-сегменты",
              expanded: cidr === null && view !== "testing",
            },
          ),
        ),
        h("div", { className: "rt-seg-cidr" }, "Все C-сегменты"),
        h("div", { className: "rt-seg-meta" }, segs.length + " подсетей"),
      ),
    );
    sideChildren.push(
      h(
        "div",
        Object.assign(
          {
            key: "testing",
            className: "rt-seg" + (view === "testing" ? " on" : ""),
            title: "Идущие сканы / пробы и прогресс (автообновление каждые 5 с)",
          },
          clickable(
            () => {
              setView("testing");
              setCidr(null);
            },
            { label: "Текущее тестирование", expanded: view === "testing" },
          ),
        ),
        h(
          "div",
          {
            className: "rt-seg-cidr",
            style: { display: "flex", alignItems: "baseline", gap: 5 },
          },
          h(
            "span",
            {
              className: "rt-scope rt-scope-testing",
              title: "Текущее тестирование (ни внутренняя, ни внешняя сеть)",
            },
            "Т",
          ),
          h("span", { style: { flex: 1 } }, "Текущее тестирование"),
        ),
        h("div", { className: "rt-seg-meta" }, "Идущие сканы и пробы"),
      ),
    );
    /* C-сегменты группируются по внутренней/внешней сети: сначала внешняя (доступна из интернета, обычно это вход), затем внутренняя (видна только после проникновения) */
    const segBlock = (title, list, kind) => {
      /* Обе группы — внешняя / внутренняя — сворачиваемые (состояние запоминается по цели), по умолчанию раскрыты */
      const open = sideCollapse.isOpen("scope:" + kind, true);
      const toggle = sideCollapse.toggle("scope:" + kind, true);
      const out = [
        h(
          "div",
          {
            key: "h" + kind,
            className: "rt-sidehead rt-sidehead-btn",
            role: "button",
            tabIndex: 0,
            "aria-expanded": open ? "true" : "false",
            title: (open ? "Свернуть группу" : "Развернуть группу") + " (и вернуться к списку активов)",
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
            },
          },
          h("span", { className: "rt-sec-caret" }, open ? "▾" : "▸"),
          h(
            "span",
            { className: "rt-scope rt-scope-" + kind },
            kind === "internal" ? "Внутренняя" : "Внешняя",
          ),
          h("span", null, title + " · " + list.length + " C-сегментов"),
          h("span", { className: "rt-spacer" }),
          h(
            "span",
            { style: { fontWeight: 400 } },
            list.reduce((n, x) => n + (x.assets || 0), 0) + " активов",
          ),
        ),
      ];
      if (!open) return out;
      for (const s of list) {
        /* Один сегмент — одна строка: только C-сегмент + число активов (порты больше не занимают место, принадлежность и живость — в подсказке) */
        out.push(
          h(
            "div",
            Object.assign(
              {
                key: s.cidr,
                className: "rt-seg" + (cidr === s.cidr ? " on" : ""),
                title:
                  (s.org || "Принадлежность неизвестна") +
                  " · живых " +
                  (s.live || 0) +
                  "/" +
                  (s.assets || 0) +
                  " хостов",
              },
              clickable(
                () => {
                  setView("list");
                  setCidr(s.cidr);
                },
                {
                  label: "Фильтр по C-сегменту " + s.cidr,
                  expanded: cidr === s.cidr && view !== "testing",
                },
              ),
            ),
            h(
              "div",
              {
                className: "rt-seg-cidr",
                style: { display: "flex", alignItems: "baseline", gap: 5 },
              },
              h(
                "span",
                { className: "rt-scope rt-scope-" + kind },
                kind === "internal" ? "int" : "ext",
              ),
              h("span", { style: { flex: 1 } }, s.cidr),
              h(
                "span",
                {
                  className: "rt-seg-meta",
                  style: { margin: 0, whiteSpace: "nowrap" },
                },
                s.assets + " хостов",
              ),
            ),
          ),
        );
      }
      return out;
    };
    const segExternal = segs.filter((x) => x.scope !== "internal");
    const segInternal = segs.filter((x) => x.scope === "internal");
    if (segExternal.length)
      sideChildren.push(...segBlock("Активы внешней сети", segExternal, "external"));
    if (segInternal.length)
      sideChildren.push(...segBlock("Активы внутренней сети", segInternal, "internal"));
    const side = h("div", { className: "rt-side" }, sideChildren);

    const toolbar = h(
      "div",
      { className: "rt-toolbar" },
      h("input", {
        className: "rt-input",
        style: { flex: "1 1 150px" },
        placeholder: "Поиск по IP / домену / фингерпринту (Enter)",
        value: q,
        onChange: (e) => setQ(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") setQApplied(q);
        },
      }),
      h(
        "button",
        { className: "rt-btn", onClick: () => setQApplied(q) },
        "Поиск",
      ),
      h("input", {
        className: "rt-input",
        style: { width: "78px" },
        placeholder: "Сервис",
        value: service,
        onChange: (e) => setService(e.target.value),
      }),
      h("input", {
        className: "rt-input",
        style: { width: "60px" },
        placeholder: "Порт",
        value: port,
        onChange: (e) => setPort(e.target.value),
      }),
      h(
        "select",
        {
          className: "rt-input",
          value: scope,
          onChange: (e) => setScope(e.target.value),
        },
        h("option", { value: "" }, "Любая сеть"),
        h("option", { value: "external" }, "Только внешние активы"),
        h("option", { value: "internal" }, "Только внутренние активы"),
      ),
      h(
        "select",
        {
          className: "rt-input",
          value: prov,
          onChange: (e) => setProv(e.target.value),
          title: "Фильтр по источнику порта (в списке отдельной колонки больше нет, видно в деталях)",
        },
        h("option", { value: "" }, "Любой источник"),
        h("option", { value: "passive" }, "Только пассивные"),
        h("option", { value: "active" }, "Только активные"),
      ),
      h(
        "select",
        {
          className: "rt-input",
          value: priority,
          onChange: (e) => setPriority(e.target.value),
        },
        h("option", { value: "" }, "Любая простота атаки"),
        h("option", { value: "high" }, "Лёгкая (высокая)"),
        h("option", { value: "medium" }, "Средняя (умеренная)"),
        h("option", { value: "low" }, "Трудная (низкая)"),
      ),
      h(
        "select",
        {
          className: "rt-input",
          value: testStatus,
          onChange: (e) => setTestStatus(e.target.value),
        },
        h("option", { value: "" }, "Любой статус тестирования"),
        h("option", { value: "untested" }, "Не тестировался"),
        h("option", { value: "testing" }, "Тестируется"),
        h("option", { value: "tested" }, "Протестирован"),
        h("option", { value: "blocked" }, "Заблокирован"),
        h("option", { value: "abandoned" }, "Заброшен"),
        h("option", { value: "no_surface" }, "Нет поверхности атаки"),
      ),
      h("div", { className: "rt-spacer" }),
      h(
        "button",
        {
          className: "rt-btn",
          title: "Перезабрать снимок и данные текущего вида",
          onClick: () => {
            if (onRefresh) onRefresh();
          },
        },
        "Обновить",
      ),
      h(
        "button",
        {
          className: "rt-btn" + (view === "list" ? " rt-btn-primary" : ""),
          onClick: () => setView("list"),
        },
        "Список",
      ),
      h(
        "button",
        {
          className: "rt-btn" + (view === "timeline" ? " rt-btn-primary" : ""),
          title: "Смотреть активы по времени обнаружения (когда найден, сколько собрано за день)",
          onClick: () => setView("timeline"),
        },
        "Время обнаружения",
      ),
      h(
        "button",
        {
          className: "rt-btn" + (view === "domain" ? " rt-btn-primary" : ""),
          onClick: () => setView("domain"),
        },
        "Домен",
      ),
      h(
        "button",
        {
          className: "rt-btn" + (view === "web" ? " rt-btn-primary" : ""),
          onClick: () => setView("web"),
        },
        "Web",
      ),
    );

    /* ── Строка выводов: весь арсенал на одном экране, клик по числу — это фильтр ───────────────────── */
    const tests = (snapshot && snapshot.tests) || {};
    const snapStats = (snapshot && snapshot.stats) || {};
    const noFilter =
      !testStatus && !priority && !scope && !prov && !assetState && !cidr;
    const conclItem = (key, label, value, active, onClick) =>
      h(
        "span",
        Object.assign(
          {
            key: key,
            className: "rt-concl-i" + (active ? " on" : ""),
            title: "Клик фильтрует / повторный клик снимает",
          },
          clickable(onClick, {
            label: "Фильтр по «" + label + "» (" + (value || 0) + ") ",
            expanded: active,
          }),
        ),
        h("b", null, String(value || 0)),
        h("span", null, label),
      );
    const toggleTest = (v) => {
      setTestStatus((cur) => (cur === v ? "" : v));
      setAssetState("");
    };
    const conclusion = h(
      "div",
      { className: "rt-concl" },
      conclItem("all", "хостов", snapStats.assets, noFilter, () => {
        setTestStatus("");
        setPriority("");
        setScope("");
        setProv("");
        setAssetState("");
        setCidr(null);
      }),
      conclItem(
        "live",
        "Живых",
        snapStats.liveAssets,
        assetState === "live",
        () => {
          setAssetState((v) => (v === "live" ? "" : "live"));
          setTestStatus("");
        },
      ),
      conclItem(
        "untested",
        "К тесту",
        tests.untested,
        testStatus === "untested",
        () => toggleTest("untested"),
      ),
      conclItem(
        "testing",
        "Тестируется",
        tests.testing,
        testStatus === "testing",
        () => toggleTest("testing"),
      ),
      conclItem("tested", "Протестировано", tests.tested, testStatus === "tested", () =>
        toggleTest("tested"),
      ),
      conclItem(
        "giveup",
        "Заброшено",
        (tests.abandoned || 0) + (tests.blocked || 0),
        testStatus === "abandoned,blocked",
        () => toggleTest("abandoned,blocked"),
      ),
      h("div", { className: "rt-spacer" }),
      h(
        "select",
        {
          className: "rt-input",
          value: sort,
          onChange: (e) => setSort(e.target.value),
          title: "Способ сортировки списка",
        },
        h("option", { value: "priority" }, "Сортировка: сначала простые"),
        h("option", { value: "todo" }, "Сортировка: сначала непротестированные"),
        h("option", { value: "discovered" }, "Сортировка: сначала недавно найденные"),
        h("option", { value: "ports" }, "Сортировка: сначала с большим числом портов"),
        h("option", { value: "ip" }, "Сортировка: по IP"),
      ),
    );

    const head = h(
      "div",
      { className: "rt-row head" },
      h("span", null, "IP"),
      h("span", null, "Простота"),
      h("span", null, "Статус теста"),
      h("span", null, "Открытые порты / сервисы"),
      h("span", null, "Фингерпринт"),
    );

    const rowNodes = [];
    for (const it of state.items) {
      const openPorts = it.ports.filter((p) => p.state === "open");
      const portText =
        openPorts
          .map((p) => p.port + (p.service ? "/" + p.service : ""))
          .join(", ") || "—";
      const fpText =
        it.fingerprints
          .map((f) =>
            [f.vendor, f.product, f.version].filter(Boolean).join(" "),
          )
          .join(" / ") || "—";
      /* Показываем максимум 3 порта, остальные через +N; источник (пассивный/активный) больше не в колонке, ушёл в детали */
      const shownPorts = openPorts
        .slice(0, 3)
        .map((p) => p.port + (p.service ? "/" + p.service : ""))
        .join(", ");
      const morePorts =
        openPorts.length > 3 ? " +" + (openPorts.length - 3) : "";
      rowNodes.push(
        h(
          "div",
          Object.assign(
            {
              key: "r" + it.id,
              className: "rt-row",
            },
            clickable(() => toggleRow(it.id), {
              label: "Раскрыть актив " + it.ip,
              expanded: openId === it.id,
            }),
          ),
          h(
            "span",
            {
              className: "rt-mono",
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                flexWrap: "wrap",
              },
            },
            h(
              "span",
              {
                className:
                  "rt-scope rt-scope-" +
                  (it.scope === "internal" ? "internal" : "external"),
              },
              it.scope === "internal" ? "int" : "ext",
            ),
            h("span", {
              title: it.state === "live" ? "Живой" : String(it.state),
              style: {
                width: 7,
                height: 7,
                borderRadius: "50%",
                flex: "none",
                marginTop: 4,
                background: it.state === "live" ? "#10b981" : "#94a3b8",
              },
            }),
            h(
              "span",
              { style: { overflow: "hidden", textOverflow: "ellipsis" } },
              it.ip,
            ),
            /* Время обнаружения выводим строкой под IP: колонка IP узкая, отдельную не заводим (при смене ширины колонок пришлось бы править всю таблицу) */
            h(
              "span",
              {
                style: {
                  fontSize: 10.5,
                  color: "var(--dsw-alias-label-secondary)",
                  whiteSpace: "nowrap",
                },
                title:
                  "Обнаружен: " +
                  (it.discovered_at ? fmt(it.discovered_at) : "не записано") +
                  (it.last_seen ? "\nПоследний сбор: " + fmt(it.last_seen) : ""),
              },
              it.discovered_at ? fmtShort(it.discovered_at) : "Время обнаружения неизвестно",
            ),
          ),
          h(
            "span",
            null,
            h(PriTag, { p: it.priority, title: it.potential || "" }),
          ),
          h(
            "span",
            null,
            h(TestTag, { s: it.test_status }),
            it.blocked_count
              ? h(
                  "span",
                  {
                    className: "rt-tag",
                    style: {
                      color: "#ef4444",
                      borderColor: "#ef444455",
                      marginLeft: 4,
                    },
                  },
                  "Блок." + it.blocked_count,
                )
              : null,
          ),
          h("span", { title: portText }, (shownPorts || "—") + morePorts),
          h(
            "span",
            { title: fpText },
            fpText.length > 30 ? fpText.slice(0, 30) + "…" : fpText,
          ),
        ),
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
            h(
              "div",
              { key: "p" + p.port, className: "rt-kv" },
              h("b", { className: "rt-mono" }, p.port + "/" + p.proto),
              h(
                "span",
                null,
                [p.service, p.product, p.version].filter(Boolean).join(" ") ||
                  "Неизвестный сервис",
              ),
              p.url
                ? h(
                    "a",
                    {
                      className: "rt-link",
                      href: p.url,
                      target: "_blank",
                      rel: "noreferrer",
                      title: p.url,
                    },
                    p.title ? p.title : p.url,
                  )
                : null,
              h(ProvTag, { p: p.provenance }),
            ),
          );
        }
        for (const f of d.fingerprints || []) {
          fpRows.push(
            h(
              "div",
              {
                key:
                  "f" +
                  (f.product || "") +
                  (f.version || "") +
                  (f.evidence || ""),
                className: "rt-kv",
              },
              h("b", null, f.category || "—"),
              h(
                "span",
                null,
                [f.vendor, f.product, f.version].filter(Boolean).join(" ") +
                  (f.evidence ? "(" + f.evidence + ")" : ""),
              ),
              h(ProvTag, { p: f.provenance }),
            ),
          );
        }
        for (const o of (d.observations || []).slice(0, 8)) {
          obsRows.push(
            h(
              "div",
              {
                key:
                  "o" +
                  (o.attr || "") +
                  (o.value || "") +
                  (o.collected_at || ""),
                className: "rt-kv",
              },
              h("b", null, o.attr || "—"),
              h(
                "span",
                null,
                (o.value || "") +
                  " · " +
                  (o.tool || "Неизвестный инструмент") +
                  " · " +
                  fmt(o.collected_at),
              ),
              h(ProvTag, { p: o.provenance }),
            ),
          );
        }
      }
      /* Детали в три слоя: 3 обязательные строки → только после «Развернуть всё» идут источники, исходные записи и полный текст примечаний */
      const all = showAll === it.id;
      const noteLines =
        d && d.test_notes ? d.test_notes.split("\n").filter(Boolean) : [];
      const inner = d
        ? h(
            "div",
            null,
            /* Три обязательные строки */
            h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Тест"),
              h(
                "span",
                null,
                h(TestTag, { s: d.test_status }),
                d.blocked_count
                  ? h(
                      "span",
                      {
                        className: "rt-tag",
                        style: {
                          marginLeft: 6,
                          color: "#ef4444",
                          borderColor: "#ef444455",
                        },
                      },
                      "Заблокирован " + d.blocked_count + " раз",
                    )
                  : null,
                h(
                  "span",
                  {
                    style: {
                      marginLeft: 8,
                      color: "var(--dsw-alias-label-secondary)",
                    },
                  },
                  (d.test_updated_at ? fmt(d.test_updated_at) : "не тестировался") +
                    (d.test_updated_by ? " · " + d.test_updated_by : ""),
                ),
              ),
            ),
            h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Простота атаки"),
              h(
                "span",
                null,
                h(PriTag, { p: d.priority }),
                h(
                  "span",
                  { style: { marginLeft: 8 } },
                  d.potential || "Не оценено",
                ),
                d.assess_reason
                  ? h(
                      "span",
                      {
                        style: {
                          marginLeft: 8,
                          color: "var(--dsw-alias-label-secondary)",
                        },
                      },
                      d.assess_reason,
                    )
                  : null,
              ),
            ),
            h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Поверхность атаки"),
              h(
                "span",
                null,
                d.test_surface ||
                  (portRows.length ? "Не записано (открытые порты ниже)" : "Нет открытых портов"),
                d.scope
                  ? h(
                      "span",
                      {
                        className:
                          "rt-scope rt-scope-" +
                          (d.scope === "internal" ? "internal" : "external"),
                        style: { marginLeft: 8 },
                      },
                      d.scope === "internal" ? "Актив внутренней сети" : "Актив внешней сети",
                    )
                  : null,
              ),
            ),
            h(
              "span",
              Object.assign(
                { className: "rt-more" },
                clickable(() => setShowAll(all ? null : it.id), {
                  label: all ? "Свернуть детали актива" : "Развернуть детали актива",
                  expanded: all,
                }),
              ),
              all
                ? "Свернуть всё ▲"
                : "Развернуть всё (порты · фингерпринт · источники сбора · записи тестов)▼",
            ),
            all
              ? h(
                  "div",
                  null,
                  h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Имя хоста"),
                    h(
                      "span",
                      null,
                      (d.names || []).map((n) => n.name).join(", ") || "—",
                    ),
                  ),
                  h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Время обнаружения"),
                    h(
                      "span",
                      {
                        title:
                          'Момент, когда этот актив впервые попал в базу (повторный сбор обновляет только "последний сбор")',
                      },
                      fmt(d.discovered_at),
                    ),
                    h(
                      "b",
                      { style: { minWidth: 0, marginLeft: 8 } },
                      "Последний сбор",
                    ),
                    h("span", null, fmt(d.last_seen)),
                    h(
                      "b",
                      { style: { minWidth: 0, marginLeft: 8 } },
                      "Первое появление в источнике",
                    ),
                    h("span", null, fmt(d.first_seen)),
                  ),
                  h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "C-сегмент"),
                    h("span", null, d.segment_cidr),
                  ),
                  h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Простота атаки"),
                    h(
                      "span",
                      null,
                      (d.priority || "Не оценено") +
                        (d.potential ? " · Ожидаемо: " + d.potential : "") +
                        (d.assess_reason ? " · Основание: " + d.assess_reason : "") +
                        (d.assessed_at ? "(" + fmt(d.assessed_at) + ")" : ""),
                    ),
                  ),
                  h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Источник"),
                    h(
                      "span",
                      null,
                      "Пассивных портов " +
                        (d.passive || 0) +
                        " · активных портов " +
                        (d.active || 0),
                    ),
                  ),
                  h(
                    "div",
                    { style: { margin: "6px 0 3px", fontWeight: 600 } },
                    "Открытые порты / сервисы",
                  ),
                  h("div", null, portRows.length ? portRows : "—"),
                  h(
                    "div",
                    { style: { margin: "6px 0 3px", fontWeight: 600 } },
                    "Фингерпринт",
                  ),
                  h("div", null, fpRows.length ? fpRows : "—"),
                  noteLines.length
                    ? h(Clip, {
                        key: "notes",
                        label: "Записи тестов (" + noteLines.length + " шт.)",
                        text: noteLines.join("\n"),
                      })
                    : null,
                  h(
                    "div",
                    { style: { margin: "6px 0 3px", fontWeight: 600 } },
                    "Источники сбора (последние 8)",
                  ),
                  h("div", null, obsRows.length ? obsRows : "—"),
                )
              : null,
          )
        : h("div", null, "Загрузка…");
      rowNodes.push(
        h(
          "div",
          {
            key: "d" + it.id,
            className: "rt-row",
            style: { cursor: "default", gridTemplateColumns: "1fr" },
          },
          h("div", { className: "rt-expand" }, inner),
        ),
      );
    }

    const listPane = h(
      "div",
      { className: "rt-table" },
      head,
      rowNodes,
      !state.loading && !state.items.length
        ? h("div", { className: "rt-empty" }, "Нет подходящих активов")
        : null,
    );

    /* Разрез по доменам: домен → связанные активы */
    const domainPane = h(
      "div",
      { className: "rt-table" },
      domains === null
        ? h("div", { className: "rt-empty" }, "Загрузка…")
        : domains.length
          ? domains.map((g) =>
              h(
                "div",
                { key: g.domain },
                h(
                  "div",
                  {
                    className: "rt-section",
                    style: { padding: "8px 10px 4px" },
                  },
                  h(
                    "a",
                    {
                      className: "rt-link",
                      href: "http://" + g.domain,
                      target: "_blank",
                      rel: "noreferrer",
                    },
                    g.domain,
                  ),
                  h(
                    "span",
                    { className: "rt-tag", style: { marginLeft: 8 } },
                    g.count + " активов",
                  ),
                ),
                g.assets.map((a) =>
                  h(
                    "div",
                    {
                      key: String(g.domain) + "\u0000" + a.id + "\u0000" + a.ip,
                      className: "rt-row",
                      style: {
                        gridTemplateColumns: "150px 130px 70px 1fr",
                        cursor: "pointer",
                      },
                      onClick: () => {
                        setView("list");
                        setQ("");
                        setQApplied(a.ip);
                      },
                    },
                    h("span", { className: "rt-mono" }, a.ip),
                    h("span", { className: "rt-mono" }, a.segment),
                    h(
                      "span",
                      null,
                      h(
                        "span",
                        {
                          className:
                            "rt-tag rt-tag-" +
                            (a.state === "live" ? "live" : "dead"),
                        },
                        a.state === "live" ? "Живой" : a.state,
                      ),
                    ),
                    h(
                      "span",
                      {
                        style: {
                          fontSize: 11,
                          color: "var(--dsw-alias-label-secondary)",
                        },
                      },
                      (a.names || []).join(", "),
                    ),
                  ),
                ),
              ),
            )
          : h(
              "div",
              { className: "rt-empty" },
              cidr
                ? "В этом C-сегменте пока нет доменов (переключитесь на «Все C-сегменты», чтобы увидеть всё)"
                : "Данных по доменам пока нет (на этапе разведки домены записываются)",
            ),
    );

    /* Web-активы: заголовок + кликабельный URL */
    const webPane = h(
      "div",
      { className: "rt-table" },
      h(
        "div",
        {
          className: "rt-row head",
          style: { gridTemplateColumns: "1.6fr 1.2fr 130px 110px" },
        },
        h("span", null, "URL (кликабельный)"),
        h("span", null, "Заголовок"),
        h("span", null, "Актив"),
        h("span", null, "Сервис"),
      ),
      (web || []).map((w) => {
        const url =
          w.url ||
          "http" +
            (w.port === 443 || w.port === 8443 || w.port === 9443 ? "s" : "") +
            "://" +
            w.ip +
            (w.port === 80 || w.port === 443 ? "" : ":" + w.port);
        return h(
          "div",
          {
            key: "w" + w.port_id,
            className: "rt-row",
            style: {
              gridTemplateColumns: "1.6fr 1.2fr 130px 110px",
              cursor: "default",
            },
          },
          h(
            "a",
            {
              className: "rt-link rt-mono",
              href: url,
              target: "_blank",
              rel: "noreferrer",
              title: url,
            },
            url,
          ),
          h("span", { title: w.title || "" }, w.title || "—"),
          h("span", { className: "rt-mono" }, w.ip + " · " + w.segment_cidr),
          h(
            "span",
            { style: { fontSize: 11 } },
            [w.service, w.product, w.version].filter(Boolean).join(" "),
          ),
        );
      }),
      web === null
        ? h("div", { className: "rt-empty" }, "Загрузка…")
        : !web.length
          ? h(
              "div",
              { className: "rt-empty" },
              cidr
                ? "В этом C-сегменте пока нет Web-активов"
                : "Web-активов пока нет (после HTTP-пробы записываются URL и заголовок)",
            )
          : null,
    );

    let pane = listPane;
    if (view === "testing")
      pane = h(TestingTab, { engagement: eng, refreshKey: refreshKey });
    else if (view === "domain") pane = domainPane;
    else if (view === "web") pane = webPane;
    /* У вида «время обнаружения» свой контейнер со скроллом, кладём его прямо в flex rt-main */
    else if (view === "timeline")
      pane = h(DiscoveryView, { engagement: eng, refreshKey: refreshKey });

    return h(
      "div",
      { className: "rt-split" },
      side,
      h(
        "div",
        { className: "rt-main" },
        view === "testing" ? null : toolbar,
        conclusion,
        state.error ? h("div", { className: "rt-err" }, state.error) : null,
        pane,
      ),
    );
  }

  /* ---------------------------------------------------------- Таймлайн обнаружения активов */
  /**
   * Таймлайн обнаружения активов: что и когда найдено, сколько собрано за день.
   * ⚠️ Этот компонент однажды зацепило при "удалении граф-представления" —— метка конца удаляемого диапазона оказалась слишком широкой
   *    (конец граф-канвы был рядом), и самопроверка бандла "в client.js есть вид активов «время обнаружения»"
   *    поэтому стала красной. При восстановлении точка вставки зафиксирована "перед блоком комментария карты активов", чтобы её снова не задело чужое удаление.
   */
  function DiscoveryView(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [day, setDay] = React.useState("");
    React.useEffect(() => {
      if (!eng) return;
      setData(null);
      api({ op: "discoveryTimeline", engagement: eng, limit: 200 }).then(
        (r) => {
          if (!r || r.ok === false) setErr((r && r.error) || "Ошибка загрузки");
          else {
            setErr(null);
            setData(r);
          }
        },
        (e) => setErr(String((e && e.message) || e)),
      );
    }, [eng, refreshKey]);
    if (err)
      return h(
        "div",
        { className: "rt-pane" },
        h("div", { className: "rt-err" }, err),
      );
    if (!data) return h("div", { className: "rt-empty" }, "Загрузка…");
    const recent = (data.recent || []).filter(
      (a) => day === "" || String(a.discovered_at || "").slice(0, 10) === day,
    );
    return h(
      "div",
      { className: "rt-pane", style: { flex: 1, minHeight: 0 } },
      h(
        "div",
        { className: "rt-card" },
        h("h4", null, "Таймлайн обнаружения активов"),
        h(
          "div",
          {
            style: { fontSize: 12, color: "var(--dsw-alias-label-secondary)" },
          },
          "Всего " +
            ((data.span && data.span.total) || 0) +
            " хостов · раньше всех " +
            (data.span && data.span.first ? fmt(data.span.first) : "—") +
            " · последний " +
            (data.span && data.span.last ? fmt(data.span.last) : "—") +
            '(время обнаружения = момент первого попадания в базу активов; повторный сбор обновляет только "последний сбор")',
        ),
      ),
      (data.days || []).length === 0
        ? h("div", { className: "rt-empty" }, "Активов пока нет.")
        : null,
      h(
        "div",
        { className: "rt-card" },
        h(
          "h4",
          null,
          "По дням",
          day
            ? h(
                "span",
                Object.assign(
                  {
                    className: "rt-tag",
                    style: { marginLeft: 6, cursor: "pointer" },
                  },
                  clickable(() => setDay(""), {
                    label: "Сбросить фильтр по дню: " + day,
                  }),
                ),
                "Сбросить фильтр: " + day,
              )
            : null,
        ),
        h(
          "div",
          { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
          (data.days || []).map((d) =>
            h(
              "div",
              Object.assign(
                {
                  key: d.day,
                  className: "rt-seg" + (day === d.day ? " on" : ""),
                  style: { marginBottom: 0, cursor: "pointer" },
                  title:
                    d.day +
                    ": добавлено " +
                    d.assets +
                    " хостов (внутренних " +
                    d.internal +
                    " / внешних " +
                    d.external +
                    ")",
                },
                clickable(() => setDay(day === d.day ? "" : d.day), {
                  label: "Фильтр: " + d.day + " — активы, найденные в этот день",
                  expanded: day === d.day,
                }),
              ),
              h("div", { className: "rt-seg-cidr" }, d.day),
              h(
                "div",
                { className: "rt-seg-meta" },
                d.assets + " хостов · внутр. " + d.internal + " / внеш. " + d.external,
              ),
            ),
          ),
        ),
      ),
      h(
        "div",
        { className: "rt-card" },
        h(
          "h4",
          null,
          day
            ? day + " — найденные активы (" + recent.length + ")"
            : "Недавно найденные активы (" + recent.length + ")",
        ),
        recent.length === 0
          ? h("div", { className: "rt-empty" }, "За этот день новых активов нет.")
          : null,
        recent.map((a) =>
          h(
            "div",
            { key: a.id, className: "rt-kv" },
            h(
              "b",
              { className: "rt-mono", style: { minWidth: 110 } },
              h(
                "span",
                {
                  className:
                    "rt-scope rt-scope-" +
                    (a.scope === "internal" ? "internal" : "external"),
                  style: { marginRight: 4 },
                },
                a.scope === "internal" ? "int" : "ext",
              ),
              a.ip,
            ),
            h(
              "span",
              {
                style: {
                  minWidth: 132,
                  fontSize: 11.5,
                  color: "var(--dsw-alias-label-secondary)",
                },
              },
              a.discovered_at ? fmt(a.discovered_at) : "Время неизвестно",
            ),
            h(
              "span",
              { style: { flex: 1 } },
              (a.primary_name || "—") +
                (a.open_ports ? " · " + a.open_ports + " портов" : ""),
            ),
            h(PriTag, { p: a.priority }),
          ),
        ),
      ),
    );
  }

  /* ---------------------------------------------------------- Промпты агента */
  function PromptsTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [roles, setRoles] = React.useState([]);
    const [active, setActive] = React.useState(null);
    const [draft, setDraft] = React.useState("");
    const [msg, setMsg] = React.useState(null);
    const [busy, setBusy] = React.useState(false);

    React.useEffect(() => {
      /* Допустимо и без цели: сервер отдаёт встроенный дефолт и больше не сообщает engagement required */
      api(eng ? { op: "prompts", engagement: eng } : { op: "prompts" }).then(
        (r) => {
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка чтения" });
            return;
          }
          setRoles(r.roles || []);
          if (r.roles && r.roles.length)
            setActive((cur) => cur || r.roles[0].role);
          if (r.builtin)
            setMsg({
              ok: "Сейчас используется встроенный промпт по умолчанию (после создания цели можно сохранить свои изменения для цели)",
            });
        },
        (e) => setMsg({ err: String((e && e.message) || e) }),
      );
    }, [eng, refreshKey]);

    React.useEffect(() => {
      const r = roles.find((x) => x.role === active);
      if (r) setDraft(r.content || "");
    }, [active, roles]);

    const save = () => {
      if (!eng) {
        setMsg({ err: "Сначала создайте цель, затем сохраняйте промпт" });
        return;
      }
      setBusy(true);
      setMsg(null);
      api({
        op: "savePrompt",
        engagement: eng,
        role: active,
        content: draft,
      }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка сохранения" });
            return;
          }
          setRoles((list) =>
            list.map((x) =>
              x.role === active
                ? Object.assign({}, x, {
                    content: draft,
                    updated_at: new Date().toISOString(),
                  })
                : x,
            ),
          );
          setMsg({ ok: "Сохранено" });
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };

    /* У старых целей промпты по старому шаблону; здесь можно вернуть текущую роль (или все) к последней встроенной версии */
    const reset = (all) => {
      if (!eng) {
        setMsg({ err: "Сначала создайте цель, затем восстанавливайте промпт по умолчанию" });
        return;
      }
      setBusy(true);
      setMsg(null);
      api({
        op: "resetPrompts",
        engagement: eng,
        role: all ? undefined : active,
      }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка восстановления" });
            return;
          }
          setMsg({ ok: "Встроенные значения восстановлены: " + (r.reset || []).join(", ") });
          api({ op: "prompts", engagement: eng }).then(
            (rr) => {
              if (rr && rr.ok) {
                setRoles(rr.roles || []);
                const cur2 = (rr.roles || []).find((x) => x.role === active);
                if (cur2) setDraft(cur2.content || "");
              }
            },
            () => {},
          );
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };

    const cur = roles.find((x) => x.role === active);
    const items = roles.map((r) =>
      h(
        "div",
        Object.assign(
          {
            key: r.role,
            className: "rt-item" + (active === r.role ? " on" : ""),
          },
          clickable(
            () => {
              setActive(r.role);
              setMsg(null);
            },
            {
              label: "Открыть промпт: «" + r.title + "»",
              expanded: active === r.role,
            },
          ),
        ),
        h("div", { className: "rt-item-name" }, r.title),
        h(
          "div",
          { className: "rt-item-desc" },
          (r.content || "").replace(/[#*`]/g, "").slice(0, 60) || "(пусто)",
        ),
      ),
    );

    return h(
      "div",
      { className: "rt-split" },
      h("div", { className: "rt-list" }, items),
      h(
        "div",
        { className: "rt-main" },
        h(
          "div",
          { className: "rt-toolbar" },
          h("span", { style: { fontWeight: 600 } }, cur ? cur.title : "Промпт"),
          h(
            "span",
            { className: "rt-tag" },
            "Обновлён " + fmt(cur && cur.updated_at),
          ),
          h("div", { className: "rt-spacer" }),
          h(
            "button",
            {
              className: "rt-btn",
              disabled: busy || !active,
              title: "Вернуть для текущей роли последнюю встроенную версию промпта",
              onClick: () => reset(false),
            },
            "Сбросить текущую",
          ),
          h(
            "button",
            {
              className: "rt-btn",
              disabled: busy,
              title: "Вернуть все четыре роли к последней встроенной версии промпта",
              onClick: () => reset(true),
            },
            "Сбросить все",
          ),
          h(
            "button",
            {
              className: "rt-btn rt-btn-primary",
              disabled: busy || !active,
              onClick: save,
            },
            busy ? "Сохранение…" : "Сохранить",
          ),
        ),
        msg
          ? h(
              "div",
              { className: msg.err ? "rt-err" : "rt-foot" },
              msg.err || msg.ok,
            )
          : null,
        h(
          "div",
          { className: "rt-pane" },
          h("textarea", {
            className: "rt-textarea",
            value: draft,
            spellCheck: false,
            onChange: (e) => setDraft(e.target.value),
            placeholder: "Системный промпт этой роли (Markdown)",
          }),
          h(
            "div",
            {
              style: {
                fontSize: 11,
                color: "var(--dsw-alias-label-secondary)",
                marginTop: 6,
              },
            },
            "После сохранения пишется в agents/" +
              (active || "role") +
              ".md. Если в первой строке задачи дочерней сессии указать redteamRole: recon, assess, vuln-scan, exploit или internal, соответствующий файл попадает в системный промпт.",
          ),
        ),
      ),
    );
  }

  /* ---------------------------------------------------------- Библиотека навыков (нативная в DSH) */
  function SkillsTab(props) {
    const refreshKey = props.refreshKey || 0;
    const [items, setItems] = React.useState([]);
    const [meta, setMeta] = React.useState({});
    const [err, setErr] = React.useState(null);
    const [q, setQ] = React.useState("");
    const [srcOnly, setSrcOnly] = React.useState(false);
    const [active, setActive] = React.useState(null);
    const [detail, setDetail] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [brokenOnly, setBrokenOnly] = React.useState(false);

    /* refresh=true обходит 30-секундный кэш доступности на бэкенде (текст навыка или переменные окружения могли только что измениться) */
    const load = (force) => {
      setBusy(true);
      api({ op: "skillCatalog", refresh: force === true }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Ошибка чтения");
            return;
          }
          setErr(null);
          setMeta(r || {});
          setItems(r.items || []);
        },
        (e) => {
          setBusy(false);
          setErr(String((e && e.message) || e));
        },
      );
    };
    React.useEffect(load, [refreshKey]);

    const open = (skill) => {
      const name = skill && skill.name;
      const key =
        (skill && skill.library ? skill.library : "redteam") + ":" + name;
      if (active === key) {
        setActive(null);
        setDetail(null);
        return;
      }
      setActive(key);
      setDetail(null);
      api({
        op: "skillRead",
        name: name,
        library: skill.library || "redteam",
      }).then(
        (r) => {
          if (r && r.ok) setDetail(r);
          else setErr((r && r.error) || "Ошибка чтения");
        },
        (e) => setErr(String((e && e.message) || e)),
      );
    };

    const needle = q.trim().toLowerCase();
    let filtered = needle
      ? items.filter(
          (s) =>
            (s.name + " " + s.description + " " + s.whenToUse)
              .toLowerCase()
              .indexOf(needle) >= 0,
        )
      : items;
    if (srcOnly)
      filtered = filtered.filter(
        (s) => s.library !== "official" && s.fromPlugin === true,
      );
    if (brokenOnly)
      filtered = filtered.filter(
        (s) =>
          s.library !== "official" &&
          (s.availability === "broken" || s.availability === "unknown"),
      );
    /* Агрегация по каталогам: сразу видно, «откуда столько навыков» (этот проект / другой плагин / собственный корень…) */
    const dirs = (meta.byDir || []).filter((d) => d.n > 0).slice(0, 6);
    const availSummary = meta.availability ? meta.availability.summary : null;
    const needRestart = err !== null && String(err).indexOf("unknown op") >= 0;

    const renderSkill = (s) =>
      h(
        "div",
        Object.assign(
          {
            key: (s.library || "redteam") + ":" + s.name,
            className:
              "rt-item" +
              (active === (s.library || "redteam") + ":" + s.name ? " on" : ""),
          },
          clickable(() => open(s), {
            label: "Открыть навык " + s.name,
            expanded: active === (s.library || "redteam") + ":" + s.name,
          }),
        ),
        h(
          "div",
          { className: "rt-item-name" },
          s.name,
          s.modelInvocable === false
            ? h(
                "span",
                { className: "rt-tag", style: { marginLeft: 6 } },
                "Только вручную",
              )
            : null,
          s.library === "official"
            ? h(
                "span",
                {
                  className: "rt-tag",
                  style: { marginLeft: 6 },
                  title: "Официальный каталог навыков, проверка по путям red-team инструментов не выполняется",
                },
                "Официальный",
              )
            : h(
                "span",
                {
                  className:
                    "rt-avail rt-avail-" + (s.availability || "unknown"),
                  style: { marginLeft: 6 },
                  title:
                    s.availability === "available"
                      ? "Доступен: текст навыка загружается. Отсутствующие внешние инструменты или ключи фиксируются в деталях и не блокируют вызов."
                      : (s.problems || []).join("\n") || "Неизвестно",
                },
                s.availability === "available"
                  ? "Доступен"
                  : s.availability === "broken"
                    ? "Недоступен"
                    : "Неизвестно",
              ),
          h(
            "div",
            { className: "rt-item-desc" },
            s.description || "(без описания)",
          ),
          h(
            "div",
            { className: "rt-kb-sub" },
            [
              s.source ? "Источник " + s.source : null,
              s.fromPlugin ? "Входит в этот плагин" : null,
              s.provider ? s.provider : null,
              s.dir ? s.dir : null,
            ]
              .filter(Boolean)
              .join(" · "),
          ),
          (s.problems || []).length > 0 &&
            s.availability !== "available" &&
            s.library !== "official"
            ? h(
                "div",
                {
                  className: "rt-kb-sub",
                  style: {
                    color: "var(--dsw-alias-state-warn-primary, #f59e0b)",
                  },
                },
                "⚠ " + String(s.problems[0]).slice(0, 60),
              )
            : null,
        ),
      );
    const redteamRows = filtered
      .filter((s) => s.library !== "official")
      .map(renderSkill);
    const officialRows = filtered
      .filter((s) => s.library === "official")
      .map(renderSkill);
    const listItems = [];
    if (redteamRows.length > 0) {
      listItems.push(
        h(
          "div",
          {
            key: "head-redteam",
            className: "rt-kb-sub",
            style: { margin: "8px 0 4px", fontWeight: 600 },
          },
          "Red-team навыки",
        ),
      );
      listItems.push.apply(listItems, redteamRows);
    }
    if (officialRows.length > 0) {
      listItems.push(
        h(
          "div",
          {
            key: "head-official",
            className: "rt-kb-sub",
            style: { margin: "8px 0 4px", fontWeight: 600 },
          },
          "Официальные навыки",
        ),
      );
      listItems.push.apply(listItems, officialRows);
    }

    return h(
      "div",
      { className: "rt-split" },
      h(
        "div",
        { className: "rt-list" },
        h("input", {
          className: "rt-input",
          style: { width: "100%", marginBottom: 8, boxSizing: "border-box" },
          placeholder: "Фильтр навыков",
          value: q,
          onChange: (e) => setQ(e.target.value),
        }),
        h(
          "label",
          {
            className: "rt-kb-check",
            style: { display: "flex", margin: "0 0 6px" },
          },
          h("input", {
            type: "checkbox",
            checked: srcOnly,
            onChange: (e) => setSrcOnly(e.target.checked),
          }),
          "Только встроенные в этот плагин (" + (meta.fromPlugin || 0) + " шт.)",
        ),
        availSummary && (availSummary.broken > 0 || availSummary.unknown > 0)
          ? h(
              "label",
              {
                className: "rt-kb-check",
                style: { display: "flex", margin: "0 0 8px" },
                title:
                  "Только навыки с явными пробелами (нет key / нет локального пути / инфраструктура всё ещё плейсхолдер) или с неопределимой доступностью",
              },
              h("input", {
                type: "checkbox",
                checked: brokenOnly,
                onChange: (e) => setBrokenOnly(e.target.checked),
              }),
              "Только недоступные/неизвестные (" +
                ((availSummary.broken || 0) + (availSummary.unknown || 0)) +
                " шт.)",
            )
          : null,
        availSummary
          ? h(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  marginBottom: 6,
                },
              },
              h(
                "span",
                { className: "rt-avail rt-avail-available" },
                "Доступно " + (availSummary.available || 0),
              ),
              availSummary.broken > 0
                ? h(
                    "span",
                    { className: "rt-avail rt-avail-broken" },
                    "Недоступно " + availSummary.broken,
                  )
                : null,
              availSummary.unknown > 0
                ? h(
                    "span",
                    { className: "rt-avail rt-avail-unknown" },
                    "Неизвестно " + availSummary.unknown,
                  )
                : null,
              h(
                "span",
                Object.assign(
                  {
                    className: "rt-tag",
                    style: { cursor: "pointer" },
                    title: "Текст навыка или переменные окружения только что изменились? Нажмите, чтобы обойти 30-секундный кэш и перепроверить",
                  },
                  clickable(() => load(true), { label: "Перепроверить доступность навыков" }),
                ),
                "Перепроверить",
              ),
            )
          : null,
        h(
          "div",
          {
            style: {
              fontSize: 11,
              color: "var(--dsw-alias-label-secondary)",
              marginBottom: 6,
            },
          },
          "Red-team " +
            ((meta.libraries && meta.libraries.redteam) || 0) +
            " · официальных " +
            ((meta.libraries && meta.libraries.official) || 0),
          items.length > 100
            ? h(
                "div",
                { style: { marginTop: 3 } },
                "(навыки в основном из корней, зарегистрированных другими плагинами, или из вашего каталога навыков; этот плагин содержит всего " +
                  (meta.fromPlugin || 0) +
                  " шт.)",
              )
            : null,
        ),
        listItems,
      ),
      h(
        "div",
        { className: "rt-main" },
        h(
          "div",
          { className: "rt-toolbar" },
          h(
            "span",
            { style: { fontWeight: 600 } },
            detail ? detail.name : "Каталог навыков (нативный в DSH)",
          ),
          h("div", { className: "rt-spacer" }),
          h(
            "button",
            { className: "rt-btn", disabled: busy, onClick: () => load(true) },
            busy ? "Обновление…" : "Обновить",
          ),
        ),
        err
          ? needRestart
            ? h(
                "div",
                { className: "rt-empty" },
                "Код хоста этого модуля обновился: чтобы изменения вступили в силу, один раз перезапустите текущий хост (официальный exe / Community Edition / dsh web)",
              )
            : h("div", { className: "rt-err" }, err)
          : null,
        detail
          ? h(
              "div",
              { className: "rt-pane" },
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Описание"),
                h("span", null, detail.description || "—"),
              ),
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Когда использовать"),
                h("span", null, detail.whenToUse || "—"),
              ),
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Источник"),
                h(
                  "span",
                  null,
                  (detail.provider || "—") + " / " + (detail.source || "—"),
                ),
              ),
              (() => {
                const s2 = items.find(
                  (x) => (x.library || "redteam") + ":" + x.name === active,
                );
                if (!s2) return null;
                if (s2.library === "official") {
                  return h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Тип"),
                    h(
                      "span",
                      null,
                      "Официальный навык. Вызывается хостом по задаче, проверка по путям red-team инструментов не выполняется.",
                    ),
                  );
                }
                const avail = s2.availability || "unknown";
                return h(
                  "div",
                  null,
                  h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Доступность"),
                    h(
                      "span",
                      { className: "rt-avail rt-avail-" + avail },
                      avail === "available"
                        ? "Доступен"
                        : avail === "broken"
                          ? "Недоступен (есть явные пробелы)"
                          : "Неизвестно (текст не читается)",
                    ),
                  ),
                  (s2.problems || []).length > 0
                    ? h(
                        "div",
                        { className: "rt-kv" },
                        h(
                          "b",
                          null,
                          avail === "available" ? "Недоступные внешние инструменты" : "Пробел",
                        ),
                        h(
                          "span",
                          null,
                          s2.problems.map((x, i) =>
                            h("div", { key: "p" + i }, "· " + x),
                          ),
                        ),
                      )
                    : null,
                  (s2.needs_user || []).length > 0
                    ? h(
                        "div",
                        { className: "rt-kv" },
                        h("b", null, "Что нужно указать"),
                        h(
                          "span",
                          {
                            style: {
                              color:
                                "var(--dsw-alias-state-warn-primary, #f59e0b)",
                            },
                          },
                          s2.needs_user.map((x, i) =>
                            h("div", { key: "n" + i }, "· " + x),
                          ),
                        ),
                      )
                    : null,
                );
              })(),
              detail.path
                ? h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Файл"),
                    h(
                      "span",
                      {
                        className: "rt-mono",
                        style: { wordBreak: "break-all" },
                      },
                      detail.path,
                    ),
                  )
                : null,
              h(
                "pre",
                {
                  className: "rt-md",
                  style: {
                    border: "1px solid var(--dsw-alias-border-l1)",
                    borderRadius: 6,
                    maxHeight: "52vh",
                  },
                },
                detail.content || "(пусто)",
              ),
            )
          : h(
              "div",
              { className: "rt-pane" },
              h(
                "div",
                {
                  style: {
                    fontSize: 12,
                    color: "var(--dsw-alias-label-secondary)",
                    marginBottom: 8,
                  },
                },
                meta.note ||
                  "Навыками управляет нативная система skill в DSH, red-team агент вызывает их инструментом skill.",
              ),
              availSummary
                ? h(
                    "div",
                    {
                      style: {
                        fontSize: 12,
                        marginBottom: 8,
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                        alignItems: "center",
                      },
                    },
                    h(
                      "span",
                      { className: "rt-avail rt-avail-available" },
                      "Доступно " + (availSummary.available || 0),
                    ),
                    availSummary.broken > 0
                      ? h(
                          "span",
                          { className: "rt-avail rt-avail-broken" },
                          "Недоступно " + availSummary.broken,
                        )
                      : null,
                    availSummary.unknown > 0
                      ? h(
                          "span",
                          { className: "rt-avail rt-avail-unknown" },
                          "Неизвестно " + availSummary.unknown,
                        )
                      : null,
                    h(
                      "span",
                      { style: { color: "var(--dsw-alias-label-secondary)" } },
                      "(" +
                        (meta.availability && meta.availability.cached
                          ? "кэш от "
                          : "проверено ") +
                        (meta.availability && meta.availability.checked_at
                          ? fmt(meta.availability.checked_at)
                          : "—") +
                        ")",
                    ),
                  )
                : null,
              meta.availability && (meta.availability.broken || []).length > 0
                ? h(
                    "div",
                    { className: "rt-hint" },
                    h(
                      "div",
                      { style: { fontWeight: 600, marginBottom: 4 } },
                      "Навыки, которые сейчас не работают:",
                    ),
                    meta.availability.broken
                      .slice(0, 12)
                      .map((b) =>
                        h(
                          "div",
                          { key: b.name },
                          "· " +
                            b.name +
                            (b.problems && b.problems.length
                              ? " — " + b.problems[0]
                              : ""),
                        ),
                      ),
                  )
                : null,
              (meta.byDir || []).slice(0, 6).map((d) =>
                h(
                  "div",
                  {
                    key: d.key,
                    className: "rt-mono",
                    style: {
                      fontSize: 11,
                      marginBottom: 2,
                      overflowWrap: "anywhere",
                    },
                  },
                  d.n + " шт. · " + d.key,
                ),
              ),
              (meta.byDir || []).length > 6
                ? h(
                    "div",
                    {
                      style: {
                        fontSize: 11,
                        color: "var(--dsw-alias-label-secondary)",
                      },
                    },
                    "…ещё " +
                      ((meta.byDir || []).length - 6) +
                      " каталогов (всего " +
                      items.length +
                      " навыков)",
                  )
                : null,
              h("div", { className: "rt-empty" }, "Выберите навык слева, чтобы увидеть содержимое"),
            ),
      ),
    );
  }

  /* ---------------------------------------------------------- Результаты по уязвимостям */
  const SEV_LABEL = {
    critical: "Критический",
    high: "Высокий",
    medium: "Средний",
    low: "Низкий",
    info: "Информационный",
  };
  const STATUS_LABEL = {
    candidate: "К проверке",
    confirmed: "Подтверждена",
    "false-positive": "Ложное срабатывание",
    exploited: "Проэксплуатирована",
    fixed: "Исправлена",
  };
  const sevClass = (s) => "rt-sev rt-sev-" + (SEV_LABEL[s] ? s : "info");

  /** Объединение целей: агрегируем по «scheme://host:port», чтобы URL с путём не разбивал группы. */
  function targetKeyOf(v) {
    const t = String(v.target || "").trim();
    if (t !== "") {
      const url = /^([a-z][a-z0-9+.-]*:\/\/[^/?#\s]+)/i.exec(t);
      if (url) return url[1];
      const head = /^([^\s/?#]+)/.exec(t);
      if (head) return head[1];
      return t;
    }
    return v.asset_ip || "(цель не указана)";
  }

  /* ---------------------------------------------------------- Отрисовка доказательств */
  /** Раскрашивает сырой HTTP-пакет по «строка запроса/статуса + заголовки + тело», чтобы было удобно читать глазами. */
  function HttpBlock(props) {
    const text = String(props.text || "");
    if (!text) return null;
    const lines = text.split(/\r?\n/);
    const nodes = lines.map((ln, i) => {
      let cls = null;
      if (
        i === 0 &&
        /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH|TRACE)\s/.test(ln)
      )
        cls = "rt-hl-req";
      else if (i === 0 && /^HTTP\//.test(ln)) cls = "rt-hl-res";
      else if (/^[A-Za-z0-9-]+:/.test(ln)) {
        const name = ln.split(":")[0].toLowerCase();
        if (
          name === "host" ||
          name === "cookie" ||
          name === "authorization" ||
          name === "content-type"
        )
          cls = "rt-hl-req";
      }
      return h(
        "div",
        { key: "l" + i, className: cls || undefined },
        ln === "" ? "\u00a0" : ln,
      );
    });
    return h(
      "pre",
      { className: "rt-evi-body" + (props.compact ? " req" : "") },
      nodes,
    );
  }

  /** Блок доказательств в деталях уязвимости: структурированный текст доказательств + сырые HTTP-запрос/ответ по этой уязвимости. */
  function detailEvidence(v) {
    const evi = String(v.evidence || "").trim();
    const looksHttp =
      /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH|HTTP\/)/m.test(evi) ||
      /\n[A-Za-z-]+: /.test(evi);
    const blocks = [];
    if (evi) {
      blocks.push(
        h(
          "div",
          { key: "ev", className: "rt-evi" },
          h(
            "div",
            { className: "rt-evi-head" },
            "Сводка доказательств",
            h("span", { className: "rt-tag" }, looksHttp ? "Сырой пакет" : "Текст"),
            h("div", { className: "rt-spacer" }),
            h(
              "button",
              {
                className: "rt-btn",
                style: { padding: "0 6px", fontSize: 11 },
                onClick: (e) => {
                  e.stopPropagation();
                  copyText(evi);
                },
              },
              "Копировать",
            ),
          ),
          looksHttp
            ? h(HttpBlock, { text: evi })
            : h("pre", { className: "rt-evi-body" }, evi),
        ),
      );
    }
    const http = v.http_evidence || [];
    for (const e of http) {
      blocks.push(
        h(
          "div",
          { key: "h" + e.id, className: "rt-evi" },
          h(
            "div",
            { className: "rt-evi-head" },
            e.label || "HTTP-доказательство",
            h(
              "span",
              { className: "rt-tag" },
              (e.method || "") +
                " " +
                (e.status === null || e.status === undefined ? "" : e.status),
            ),
            h("div", { className: "rt-spacer" }),
            h(
              "span",
              {
                style: {
                  fontWeight: 400,
                  color: "var(--dsw-alias-label-secondary)",
                },
              },
              fmt(e.captured_at || e.created_at),
            ),
          ),
          e.request
            ? h(
                "div",
                null,
                h(
                  "div",
                  { className: "rt-evi-head", style: { borderTop: "none" } },
                  "▸ Запрос (можно вставить прямо в Burp Repeater)",
                ),
                h(HttpBlock, { text: e.request, compact: true }),
              )
            : null,
          e.response
            ? h(
                "div",
                null,
                h("div", { className: "rt-evi-head" }, "▸ Ответ"),
                h(HttpBlock, { text: e.response }),
              )
            : null,
          e.note
            ? h(
                "pre",
                { className: "rt-evi-body", style: { maxHeight: 80 } },
                e.note,
              )
            : null,
        ),
      );
    }
    if (blocks.length === 0) {
      blocks.push(
        h(
          "div",
          { key: "none", className: "rt-kv" },
          h("b", null, "Доказательства"),
          h(
            "span",
            { style: { color: "var(--dsw-alias-state-error-primary)" } },
            "Отсутствует —— уязвимости без проверки и доказательств в отчёт не попадают, добавьте через redteam_http_evidence_add",
          ),
        ),
      );
    }
    return h("div", { key: "eviwrap" }, blocks);
  }

  function FindingsTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [sev, setSev] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [q, setQ] = React.useState("");
    const [qApplied, setQApplied] = React.useState("");
    const [state, setState] = React.useState({
      loading: false,
      error: null,
      total: 0,
      items: [],
      stats: null,
    });
    const [creds, setCreds] = React.useState([]);
    const [accesses, setAccesses] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    const [openId, setOpenId] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    /* Подвкладки: уязвимости / учётные данные / сессии доступа (учётные данные больше не лежат внизу страницы уязвимостей) */
    const [subTab, setSubTab] = React.useState("vulns");
    /* По умолчанию группируем по цели: 322 записи плоским списком не читаются, сначала смотрим «что с какой машины взято» */
    const [grouped, setGrouped] = React.useState(true);
    const collapse = useCollapse("findings:" + eng);

    const load = () => {
      if (!eng) return;
      api({
        op: "vulns",
        engagement: eng,
        severity: sev || undefined,
        status: status || undefined,
        q: qApplied || undefined,
        limit: 200,
      }).then(
        (r) => {
          if (!r || r.ok === false) {
            setState({
              loading: false,
              error: (r && r.error) || "Ошибка запроса",
              total: 0,
              items: [],
              stats: null,
            });
            return;
          }
          setState({
            loading: false,
            error: null,
            total: r.total,
            items: r.items || [],
            stats: r.stats || null,
          });
        },
        (e) =>
          setState({
            loading: false,
            error: String((e && e.message) || e),
            total: 0,
            items: [],
            stats: null,
          }),
      );
      api({ op: "credentials", engagement: eng }).then(
        (r) => setCreds((r && r.items) || []),
        () => {},
      );
      api({ op: "access", engagement: eng }).then(
        (r) => setAccesses((r && r.items) || []),
        () => {},
      );
      api({ op: "attackFiles", engagement: eng }).then(
        (r) => setFiles((r && r.items) || []),
        () => {},
      );
    };
    React.useEffect(load, [eng, sev, status, qApplied, refreshKey]);

    const setVulnStatus = (id, next) => {
      setMsg(null);
      api({
        op: "updateVuln",
        engagement: eng,
        id: id,
        patch: { status: next },
      }).then(
        (r) => {
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка обновления" });
            return;
          }
          setMsg({ ok: "Обновлено на «" + (STATUS_LABEL[next] || next) + "»" });
          load();
        },
        (e) => setMsg({ err: String((e && e.message) || e) }),
      );
    };

    const stats =
      state.stats && state.stats.bySeverity
        ? state.stats
        : { bySeverity: {}, byStatus: {} };
    const needRestart =
      state.error !== null && String(state.error).indexOf("unknown op") >= 0;

    const allFiles = (files || []).flatMap((g) =>
      (g.files || []).map((f) => Object.assign({ target: g.target }, f)),
    );
    const filesByVuln = new Map();
    const orphanFiles = [];
    for (const f of allFiles) {
      const vid =
        f.vuln_id === null || f.vuln_id === undefined
          ? null
          : Number(f.vuln_id);
      if (vid === null) {
        orphanFiles.push(f);
        continue;
      }
      if (!filesByVuln.has(vid)) filesByVuln.set(vid, []);
      filesByVuln.get(vid).push(f);
    }

    /* ── Строка выводов: только выводы, клик по числу — это фильтр ─────────────────────── */
    const concl = (key, label, value, active, onClick) =>
      h(
        "span",
        Object.assign(
          {
            key: key,
            className: "rt-concl-i" + (active ? " on" : ""),
            title: "Клик фильтрует / повторный клик снимает",
          },
          clickable(onClick, {
            label: "Фильтр по «" + label + "» (" + (value || 0) + ") ",
            expanded: active,
          }),
        ),
        h("b", null, String(value || 0)),
        h("span", null, label),
      );
    const conclusion = h(
      "div",
      { className: "rt-concl" },
      concl(
        "conf",
        "Подтверждено",
        stats.byStatus.confirmed || 0,
        status === "confirmed",
        () => setStatus((v) => (v === "confirmed" ? "" : "confirmed")),
      ),
      concl(
        "exp",
        "Проэксплуатировано",
        stats.byStatus.exploited || 0,
        status === "exploited",
        () => setStatus((v) => (v === "exploited" ? "" : "exploited")),
      ),
      concl(
        "crit",
        "Критические",
        stats.bySeverity.critical || 0,
        sev === "critical",
        () => setSev((v) => (v === "critical" ? "" : "critical")),
      ),
      concl("high", "Высокие", stats.bySeverity.high || 0, sev === "high", () =>
        setSev((v) => (v === "high" ? "" : "high")),
      ),
      concl("med", "Средние", stats.bySeverity.medium || 0, sev === "medium", () =>
        setSev((v) => (v === "medium" ? "" : "medium")),
      ),
      concl("gain", "Получен доступ", stats.withGained || 0, false, () => {}),
      h("div", { className: "rt-spacer" }),
      h(
        "span",
        { style: { fontSize: 11, color: "var(--dsw-alias-label-secondary)" } },
        "По умолчанию сгруппировано по цели · всего " + (stats.targetGroups || 0) + " целей",
      ),
    );

    const head = h(
      "div",
      { className: "rt-vrow head" },
      h("span", null, "Уровень"),
      h("span", null, "Уязвимость / номер"),
      h("span", null, "Цель"),
      h("span", null, "Что получено"),
      h("span", null, "Статус"),
      h("span", null, "Достоверность"),
    );

    /* Одна уязвимость (строка + раскрываемые детали), используется и в групповом, и в плоском виде */
    const vulnRows = (v, compact) => {
      const out = [];
      const gainedList = String(v.gained || "")
        .split(/[、,;，；]/)
        .map((x) => x.trim())
        .filter(Boolean);
      const open = openId === v.id;
      out.push(
        h(
          "div",
          {
            key: "v" + v.id,
            className: "rt-vrow",
            role: "button",
            tabIndex: 0,
            style: compact
              ? {
                  cursor: "pointer",
                  gridTemplateColumns: "58px minmax(0,1fr) 104px 68px",
                }
              : { cursor: "pointer" },
            onClick: () => setOpenId(open ? null : v.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenId(open ? null : v.id);
              }
            },
          },
          h(
            "span",
            null,
            h(
              "span",
              { className: sevClass(v.severity) },
              SEV_LABEL[v.severity] || v.severity,
            ),
          ),
          h(
            "span",
            { title: v.title || "" },
            h("span", { className: "rt-sec-caret" }, open ? "▾" : "▸"),
            (v.cve ? v.cve + " " : "") + (v.title || ""),
          ),
          compact
            ? null
            : h(
                "span",
                { className: "rt-mono", title: v.target || "" },
                v.target || v.asset_ip || "—",
              ),
          h(
            "span",
            { title: v.gained || "" },
            gainedList.length
              ? h(
                  "span",
                  {
                    className: "rt-gain",
                    style: {
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "inline-block",
                    },
                  },
                  gainedList[0] +
                    (gainedList.length > 1
                      ? " +" + (gainedList.length - 1)
                      : ""),
                )
              : h(
                  "span",
                  { style: { color: "var(--dsw-alias-label-secondary)" } },
                  "—",
                ),
          ),
          h(
            "span",
            null,
            h(
              "span",
              { className: "rt-tag" },
              STATUS_LABEL[v.status] || v.status,
            ),
          ),
          compact
            ? null
            : h(
                "span",
                null,
                v.confidence === null || v.confidence === undefined
                  ? "—"
                  : Math.round(v.confidence * 100) + "%",
              ),
        ),
      );
      if (openId !== v.id) return out;
      out.push(
        h(
          "div",
          {
            key: "vd" + v.id,
            className: "rt-vrow",
            style: { cursor: "default", gridTemplateColumns: "1fr" },
          },
          h(
            "div",
            { className: "rt-vdetail" },
            h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Что получено"),
              gainedList.length
                ? h(
                    "span",
                    null,
                    gainedList.map((g, gi) =>
                      h(
                        "span",
                        {
                          key: "g" + gi,
                          className: "rt-gain",
                          style: { marginRight: 6 },
                        },
                        g,
                      ),
                    ),
                  )
                : h(
                    "span",
                    { style: { color: "var(--dsw-alias-label-secondary)" } },
                    "Не записано —— после получения доступа или результата добавьте gained через redteam_vuln_update (пример: права на сервере, туннель во внутреннюю сеть, учётная запись администратора панели)",
                  ),
            ),
            h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Цель"),
              h(
                "span",
                { className: "rt-mono", style: { wordBreak: "break-all" } },
                v.target || "—",
              ),
            ),
            h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Актив"),
              h(
                "span",
                null,
                (v.asset_ip || "—") + " · " + (v.segment_cidr || ""),
              ),
            ),
            h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Источник"),
              h(
                "span",
                null,
                (v.source || "—") +
                  " · " +
                  (v.found_by_agent || "—") +
                  " · " +
                  fmt(v.found_at),
              ),
            ),
            detailEvidence(v),
            (() => {
              const mine = filesByVuln.get(Number(v.id)) || [];
              return h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Файлы атаки"),
                mine.length
                  ? h(
                      "span",
                      null,
                      mine.map((f, fi) =>
                        h(
                          "div",
                          { key: "af" + fi, style: { marginBottom: 3 } },
                          "· " +
                            (f.kind ? "[" + f.kind + "] " : "") +
                            (f.name || "(без имени)") +
                            (f.description ? " — " + f.description : ""),
                          h(
                            "div",
                            {
                              className: "rt-mono",
                              style: {
                                fontSize: 11,
                                marginLeft: 12,
                                color: "var(--dsw-alias-label-secondary)",
                                overflowWrap: "anywhere",
                              },
                            },
                            f.path || "",
                          ),
                        ),
                      ),
                    )
                  : h(
                      "span",
                      { style: { color: "var(--dsw-alias-label-secondary)" } },
                      "(нет) Заархивируйте скрипт/шелл/EXP, которым пробита эта уязвимость, через redteam_attack_file_add и укажите vuln_id",
                    ),
              );
            })(),
            h(
              "div",
              { className: "rt-actions" },
              h(
                "button",
                {
                  className: "rt-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setVulnStatus(v.id, "confirmed");
                  },
                },
                "Подтвердить",
              ),
              h(
                "button",
                {
                  className: "rt-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setVulnStatus(v.id, "exploited");
                  },
                },
                "Проэксплуатирована",
              ),
              h(
                "button",
                {
                  className: "rt-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setVulnStatus(v.id, "false-positive");
                  },
                },
                "Ложное срабатывание",
              ),
              h(
                "button",
                {
                  className: "rt-btn",
                  onClick: (e) => {
                    e.stopPropagation();
                    setVulnStatus(v.id, "fixed");
                  },
                },
                "Исправлена",
              ),
            ),
          ),
        ),
      );
      return out;
    };

    const rows = [];
    if (grouped) {
      /* Группировка по цели: сначала смотрим «что с какой машины взято», затем проваливаемся в конкретные уязвимости */
      const groups = new Map();
      for (const v of state.items) {
        const key = targetKeyOf(v);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(v);
      }
      const SEV_RANK = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
      const list = Array.from(groups.entries())
        .map(([key, vs]) => ({
          key,
          vulns: vs,
          top: vs
            .slice()
            .sort(
              (a, b) =>
                (SEV_RANK[a.severity] ?? 9) - (SEV_RANK[b.severity] ?? 9),
            )[0],
          gained: Array.from(
            new Set(
              vs.flatMap((v) =>
                String(v.gained || "")
                  .split(/[、,;，；]/)
                  .map((x) => x.trim())
                  .filter(Boolean),
              ),
            ),
          ),
          exploited: vs.filter((v) => v.status === "exploited").length,
        }))
        .sort(
          (a, b) =>
            (SEV_RANK[a.top.severity] ?? 9) - (SEV_RANK[b.top.severity] ?? 9) ||
            b.vulns.length - a.vulns.length,
        );
      for (const g of list) {
        const key = "target:" + g.key;
        const defOpen = false;
        rows.push(
          h(
            Section,
            {
              key: "sec:" + g.key,
              tone: "target",
              title: g.key,
              count: g.vulns.length + " уязвимостей",
              sub: [
                SEV_LABEL[g.top.severity] || g.top.severity,
                g.exploited ? "Проэксплуатировано " + g.exploited : null,
                g.top.asset_ip && g.top.asset_ip !== g.key
                  ? "Актив " + g.top.asset_ip
                  : null,
              ]
                .filter(Boolean)
                .join(" · "),
              right: g.gained.length
                ? g.gained.slice(0, 2).join(" / ") +
                  (g.gained.length > 2 ? " +" + (g.gained.length - 2) : "")
                : "Права не записаны",
              open: collapse.isOpen(key, defOpen),
              onToggle: collapse.toggle(key, defOpen),
            },
            g.vulns.map((v) => vulnRows(v, true)),
          ),
        );
      }
      if (!list.length && !state.loading && !state.error) {
        rows.push(
          h("div", { key: "none", className: "rt-empty" }, "Записей об уязвимостях пока нет"),
        );
      }
    } else {
      for (const v of state.items) rows.push(...vulnRows(v));
    }

    const toolbar = h(
      "div",
      { className: "rt-toolbar" },
      h("input", {
        className: "rt-input",
        style: { flex: "1 1 140px" },
        placeholder: "Поиск по заголовку / CVE / цели (Enter)",
        value: q,
        onChange: (e) => setQ(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") setQApplied(q);
        },
      }),
      h(
        "button",
        { className: "rt-btn", onClick: () => setQApplied(q) },
        "Поиск",
      ),
      h(
        "select",
        {
          className: "rt-input",
          value: sev,
          onChange: (e) => setSev(e.target.value),
        },
        h("option", { value: "" }, "Все уровни"),
        h("option", { value: "critical" }, "Критический"),
        h("option", { value: "high" }, "Высокий"),
        h("option", { value: "medium" }, "Средний"),
        h("option", { value: "low" }, "Низкий"),
        h("option", { value: "info" }, "Информационный"),
      ),
      h(
        "select",
        {
          className: "rt-input",
          value: status,
          onChange: (e) => setStatus(e.target.value),
        },
        h("option", { value: "" }, "Все статусы"),
        h("option", { value: "candidate" }, "К проверке"),
        h("option", { value: "confirmed" }, "Подтверждена"),
        h("option", { value: "exploited" }, "Проэксплуатирована"),
        h("option", { value: "false-positive" }, "Ложное срабатывание"),
        h("option", { value: "fixed" }, "Исправлена"),
      ),
    );

    const credSection = h(
      "div",
      null,
      h(
        "div",
        { className: "rt-section" },
        "Учётные данные · " +
          creds.length +
          (creds.length ? "(показываются в открытом виде — учтите демонстрацию экрана и запись)" : ""),
      ),
      creds.length
        ? h(
            "div",
            { style: { padding: "4px 10px 0" } },
            creds.map((c) =>
              h(
                "div",
                { key: "c" + c.id, className: "rt-cred" },
                h(
                  "div",
                  { className: "rt-cred-head" },
                  h("span", { className: "rt-cred-host" }, c.host),
                  c.username
                    ? h("span", { className: "rt-tag" }, c.username)
                    : null,
                  h(
                    "span",
                    { className: "rt-tag rt-tag-passive" },
                    c.secret_type || "password",
                  ),
                  c.privilege
                    ? h(
                        "span",
                        { className: "rt-tag rt-tag-active" },
                        c.privilege,
                      )
                    : null,
                  h("div", { className: "rt-spacer" }),
                  h(
                    "button",
                    {
                      className: "rt-btn",
                      style: { padding: "0 6px", fontSize: 11 },
                      onClick: (e) => {
                        e.stopPropagation();
                        copyText(String(c.secret_value || ""));
                      },
                    },
                    "Копировать",
                  ),
                ),
                c.secret_value
                  ? h(
                      "div",
                      { className: "rt-secret", title: "Клик — выделить всё" },
                      c.secret_value,
                    )
                  : h(
                      "div",
                      { className: "rt-secret-none" },
                      "Открытый текст не записан —— добавьте его в secret_value через redteam_credential_add, и панель покажет его напрямую",
                    ),
                h(
                  "div",
                  { className: "rt-cred-meta" },
                  [
                    c.source ? "Источник " + c.source : null,
                    c.tool ? "Инструмент " + c.tool : null,
                    c.secret_ref ? "Доказательство " + c.secret_ref : null,
                    c.found_by_agent ? "by " + c.found_by_agent : null,
                    c.found_at ? fmt(c.found_at) : null,
                  ]
                    .filter(Boolean)
                    .join(" · "),
                ),
                c.note
                  ? h("div", { className: "rt-cred-meta" }, "Примечание: " + c.note)
                  : null,
              ),
            ),
          )
        : h(
            "div",
            { className: "rt-empty" },
            "Учётных данных пока нет (получив пароль/ключ/hash, сохраните его через redteam_credential_add — переиспользовать можно за секунды)",
          ),
    );

    const accessSection = h(
      "div",
      null,
      h(
        "div",
        { className: "rt-section" },
        "Полученные сессии доступа · " + accesses.length,
      ),
      accesses.length
        ? accesses.map((a) =>
            h(
              "div",
              {
                key: "a" + a.id,
                className: "rt-vrow",
                style: {
                  cursor: "default",
                  gridTemplateColumns: "1fr 110px 80px 80px 1fr",
                },
              },
              h("span", { className: "rt-mono" }, a.host),
              h("span", null, a.username || "—"),
              h(
                "span",
                null,
                h(
                  "span",
                  { className: "rt-tag rt-tag-active" },
                  a.method || "—",
                ),
              ),
              h("span", null, a.privilege || "—"),
              h(
                "span",
                { className: "rt-mono", title: a.session_ref || "" },
                a.session_ref || "—",
              ),
            ),
          )
        : h("div", { className: "rt-empty" }, "Пока нет"),
    );

    const subTabBtn = (key, label, n) =>
      h(
        "span",
        Object.assign(
          {
            className: "rt-subtab" + (subTab === key ? " on" : ""),
          },
          clickable(() => setSubTab(key), {
            label: label + "(" + n + ")",
            expanded: subTab === key,
          }),
        ),
        label + " " + n,
      );

    return h(
      "div",
      { className: "rt-main" },
      toolbar,
      conclusion,
      h(
        "div",
        { className: "rt-subtabs" },
        subTabBtn("vulns", "Уязвимости", state.total || 0),
        subTabBtn("files", "Файлы атаки", allFiles.length),
        subTabBtn("creds", "Учётные данные", creds.length),
        subTabBtn("access", "Сессии доступа", accesses.length),
        h("div", { className: "rt-spacer" }),
        grouped
          ? h(
              "button",
              {
                className: "rt-btn",
                title: "Развернуть все цели",
                onClick: () =>
                  collapse.setAll(
                    (state.items || []).map((v) => "target:" + targetKeyOf(v)),
                    true,
                  ),
              },
              "Развернуть все",
            )
          : null,
        grouped
          ? h(
              "button",
              {
                className: "rt-btn",
                title: "Свернуть все цели",
                onClick: () =>
                  collapse.setAll(
                    (state.items || []).map((v) => "target:" + targetKeyOf(v)),
                    false,
                  ),
              },
              "Свернуть все",
            )
          : null,
        h(
          "button",
          {
            className: "rt-btn" + (grouped ? " rt-btn-primary" : ""),
            title: grouped
              ? "Сейчас: группировка по цели (сначала видно, что с какой машины взято)"
              : "Сейчас: плоский список уязвимостей",
            onClick: () => setGrouped((g) => !g),
          },
          grouped ? "По целям" : "Плоский список",
        ),
      ),
      msg
        ? h(
            "div",
            { className: msg.err ? "rt-err" : "rt-foot" },
            msg.err || msg.ok,
          )
        : null,
      needRestart
        ? h(
            "div",
            { className: "rt-empty" },
            "Код хоста этого модуля обновился: чтобы изменения вступили в силу, один раз перезапустите текущий хост (официальный exe / Community Edition / dsh web)",
          )
        : null,
      state.error && !needRestart
        ? h("div", { className: "rt-err" }, state.error)
        : null,
      subTab === "files"
        ? h(
            "div",
            { className: "rt-body", style: { overflow: "auto" } },
            h(
              "div",
              { className: "rt-hint", style: { marginBottom: 8 } },
              "Файлы атаки организованы по каталогам целей (бывшая вкладка «Файлы атаки»); связанные файлы каждой уязвимости видны и в её деталях." +
                (orphanFiles.length
                  ? " Сейчас " +
                    orphanFiles.length +
                    " файлов без vuln_id — стоит дописать, чтобы связать их с уязвимостями."
                  : ""),
            ),
            h(AttackFilesTab, { engagement: eng, refreshKey: refreshKey }),
          )
        : subTab === "creds"
          ? h(
              "div",
              { className: "rt-body", style: { overflow: "auto" } },
              credSection,
            )
          : subTab === "access"
            ? h(
                "div",
                { className: "rt-body", style: { overflow: "auto" } },
                accessSection,
              )
            : h(
                "div",
                { className: "rt-table" },
                grouped ? null : head,
                rows,
                !state.loading && !state.items.length && !state.error
                  ? h("div", { className: "rt-empty" }, "Записей об уязвимостях пока нет")
                  : null,
              ),
    );
  }

  /* ---------------------------------------------------------- Цепочка атаки */
  const STAGE_LABEL = {
    recon: "Разведка",
    vuln: "Поиск уязвимостей",
    exploit: "Эксплуатация уязвимостей",
    access: "Получение доступа",
    pivot: "Прорыв во внутреннюю сеть",
    data: "Чувствительные данные",
    other: "Прочее",
  };

  /* ---------------------------------------------------------- Цепочка атаки (пять этапов) */
  /**
   * Выстраиваем в одну цепочку по расположению поверхности атаки:
   * ① Разведка → ② Доступ к интернет-активам → ③ Прорыв периметра → ④ Доступ к активам внутренней сети → ⑤ Доступ к цели.
   * На каждом этапе говорим только о двух вещах: сколько баллов дал шаг (и сколько накоплено) и какие активы/туннели задействованы.
   * A = вертикальная цепочка (подробно); B = горизонтальная цепочка (всё на одном экране).
   */
  function ChainTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [view, setView] = React.useState("A");
    const [openId, setOpenId] = React.useState(null);

    const load = () => {
      if (!eng) return;
      setLoading(true);
      api({ op: "scoreChain", engagement: eng }).then(
        (r) => {
          setLoading(false);
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Ошибка чтения");
            return;
          }
          setErr(null);
          setData(r);
        },
        (e) => {
          setLoading(false);
          setErr(String((e && e.message) || e));
        },
      );
    };
    React.useEffect(load, [eng, refreshKey]);

    const stages = (data && data.stages) || [];
    const summary = (data && data.summary) || null;
    const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));
    const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥"];

    /* Детали одного начисления */
    const hitDetail = (x) =>
      h(
        "div",
        { className: "rt-flow-detail" },
        h(
          "div",
          { className: "rt-kv" },
          h("b", null, "Цель"),
          h(
            "span",
            { className: "rt-mono", style: { wordBreak: "break-all" } },
            x.target || "—",
          ),
        ),
        x.asset_ip
          ? h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Актив"),
              h("span", { className: "rt-mono" }, x.asset_ip),
            )
          : null,
        x.vuln_title
          ? h(
              "div",
              { className: "rt-kv" },
              h("b", null, "Использованная уязвимость"),
              h(
                "span",
                null,
                [x.vuln_cve, x.vuln_title].filter(Boolean).join(" "),
              ),
            )
          : null,
        h(
          "div",
          { className: "rt-kv" },
          h("b", null, "Раз"),
          h(
            "span",
            null,
            "Повтор того же типа №" + x.nth_of_point + " · +" + (x.points || 0) + " баллов",
          ),
        ),
        h(
          "div",
          { className: "rt-kv" },
          h("b", null, "Запись"),
          h(
            "span",
            null,
            fmt(x.recorded_at) + (x.recorded_by ? " · " + x.recorded_by : ""),
          ),
        ),
        x.evidence ? h(Clip, { label: "Результат и доказательства", text: x.evidence }) : null,
      );

    const hitRow = (x) =>
      h(
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
          },
        },
        h(
          "div",
          { className: "rt-ap-hit-head" },
          h(
            "span",
            {
              className: "rt-ap-pts" + (x.counted ? "" : " uncounted"),
              title: x.capped_reason || undefined,
            },
            "+" + (x.counted ? x.points || 0 : 0),
          ),
          h("span", { className: "rt-ap-hit-name" }, x.point_name),
          x.capped
            ? h(
                "span",
                {
                  className: "rt-tag rt-tag-warn",
                  title:
                    x.capped_reason || "По одному активу и порту учитывается только запись с наибольшими баллами",
                },
                "Сервис взят полностью · без баллов",
              )
            : null,
          x.nth_of_point > 1
            ? h(
                "span",
                { className: "rt-ap-nth" },
                "Попытка " + x.nth_of_point + ","
              )
            : null,
          h(
            "span",
            { className: "rt-ap-hit-target" },
            x.target || x.asset_ip || "—",
          ),
        ),
        x.action
          ? h(
              "div",
              {
                className: "rt-ap-act" + (x.action_inferred ? " inferred" : ""),
              },
              "Действие: " +
                (x.action.title || "(шаг без названия)") +
                (x.action_inferred ? " (предположительно)" : ""),
            )
          : null,
        openId === x.id ? hitDetail(x) : null,
      );

    /* Строка актива (этап разведки / активы, задействованные на этапе) */
    const assetRow = (a) =>
      h(
        "div",
        { key: "a" + a.id, className: "rt-ap-asset" },
        h(
          "span",
          {
            className:
              "rt-scope rt-scope-" +
              (a.scope === "internal" ? "internal" : "external"),
          },
          a.scope === "internal" ? "int" : "ext",
        ),
        h("span", { className: "rt-mono", style: { fontWeight: 600 } }, a.ip),
        a.segment_cidr
          ? h("span", { className: "rt-ap-nth" }, a.segment_cidr)
          : null,
        h("span", { className: "rt-ap-nth" }, "Портов " + (a.open_ports || 0)),
        a.vulns
          ? h("span", { className: "rt-ap-nth" }, "Уязвимостей " + a.vulns)
          : null,
        a.priority
          ? h("span", { className: "rt-tag" }, "Простота " + a.priority)
          : null,
        h("div", { className: "rt-spacer" }),
        h("span", { className: "rt-ap-pts" }, "+" + (a.points || 0) + " баллов"),
        h("span", { className: "rt-ap-nth" }, (a.hits || 0) + " раз"),
      );

    /* Цепочка атаки говорит только «до чего дошли и сколько баллов взяли»: не показываем приёмы и список инструментов,
         это детали исполнения, в цепочке они утопили бы баллы и информацию об активах. */

    /* ── A: вертикальная цепочка ─────────────────────────────────────────── */
    const stageA = (st, i) => {
      const isRecon = st.code === "recon";
      const body = [];
      if (isRecon) {
        body.push(
          h(
            "div",
            { key: "at", className: "rt-ap-sub" },
            "Активы с баллами · " + st.assetCount + " хостов",
          ),
        );
        body.push(
          h(
            "div",
            { key: "al", className: "rt-ap-assets" },
            st.assets.length
              ? st.assets.map(assetRow)
              : h("div", { className: "rt-ap-none" }, "Активов с баллами пока нет"),
          ),
        );
      } else {
        body.push(
          h(
            "div",
            { key: "ht", className: "rt-ap-sub" },
            "Попаданий на этапе " +
              st.hits +
              " раз" +
              (st.points ? " · +" + st.points + " баллов" : ""),
          ),
        );
        body.push(
          h(
            "div",
            { key: "hl", className: "rt-ap-hits" },
            st.items.length
              ? st.items.map(hitRow)
              : h("div", { className: "rt-ap-none" }, "На этом этапе баллов пока нет"),
          ),
        );
        if (st.code === "boundary") {
          const selfOnly = (st.tunnels_self_only || []).length;
          body.push(
            h(
              "div",
              { key: "tt", className: "rt-ap-sub" },
              "Каналы, пересекающие границу цели · " +
                st.tunnels.length +
                " шт." +
                (selfOnly
                  ? " (ещё " +
                    selfOnly +
                    " на своём VPS/собственном сервере — это не считается прорывом)"
                  : ""),
            ),
          );
          if (selfOnly && st.tunnels.length === 0) {
            body.push(
              h(
                "div",
                { key: "tw", className: "rt-ap-none" },
                "⚠️ Все имеющиеся каналы только на своих серверах и цели не касаются —— прорыв периметра не засчитывается. Нужен канал, инициируемый со стороны цели (reverse shell ко мне / запуск frp-клиента на цели / suo5 через WebShell на цели).",
              ),
            );
          }
          body.push(
            h(
              "div",
              { key: "tl", className: "rt-ap-tunnels" },
              st.tunnels.length
                ? st.tunnels.map((t) =>
                    h(
                      "div",
                      { key: "t" + t.id, className: "rt-ap-tunnel" },
                      h(
                        "span",
                        { className: "rt-tag rt-tag-passive" },
                        t.kind || "tunnel",
                      ),
                      h(
                        "span",
                        { className: "rt-mono", style: { fontWeight: 600 } },
                        t.listen || "—",
                      ),
                      h(
                        "span",
                        {
                          className:
                            "rt-tag " +
                            (t.status === "active" ? "rt-tag-live" : ""),
                          style: t.status === "active" ? {} : { opacity: 0.7 },
                        },
                        t.status === "active" ? "Работает" : t.status || "Неизвестно",
                      ),
                      h(
                        "span",
                        {
                          className: "rt-ap-nth",
                          style: {
                            minWidth: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        },
                        "Доступно " + (t.reach || "—"),
                      ),
                    ),
                  )
                : h(
                    "div",
                    { className: "rt-ap-none" },
                    "Туннелей пока нет (после создания зарегистрируйте его через redteam_tunnel_add)",
                  ),
            ),
          );
        }
        if (st.assets.length && st.code !== "boundary") {
          body.push(
            h(
              "div",
              { key: "at", className: "rt-ap-sub" },
              "Задействовано активов · " + st.assetCount + " хостов",
            ),
          );
          body.push(
            h(
              "div",
              { key: "al", className: "rt-ap-assets" },
              st.assets.map(assetRow),
            ),
          );
        }
      }

      return h(
        "div",
        { key: "st" + st.code, className: "rt-ap-stage" },
        h(
          "div",
          { className: "rt-ap-head", style: { borderLeftColor: st.color } },
          h(
            "span",
            { className: "rt-ap-no", style: { background: st.color } },
            CIRCLED[i] || "0" + (i + 1),
          ),
          h("span", { className: "rt-ap-name" }, st.name),
          st.subtitle
            ? h("span", { className: "rt-ap-en" }, st.subtitle)
            : null,
          h("div", { className: "rt-spacer" }),
          st.points > 0
            ? h(
                "span",
                {
                  className: "rt-ap-pts",
                  style: {
                    background: st.color + "22",
                    color: st.color,
                    borderColor: st.color + "66",
                  },
                },
                "+" + st.points,
              )
            : null,
          h(
            "span",
            { className: "rt-ap-cum" },
            "Накоплено " + st.cumulative + " баллов",
          ),
        ),
        h(
          "div",
          { className: "rt-ap-goal", style: { borderLeftColor: st.color } },
          h(
            "span",
            {
              className: "rt-ap-goal-tag",
              style: { color: st.color, borderColor: st.color + "66" },
            },
            "Цель этапа",
          ),
          h("span", null, st.goal),
        ),
        h(
          "div",
          { className: "rt-ap-result", style: { borderLeftColor: st.color } },
          body,
        ),
        i < stages.length - 1
          ? h(
              "div",
              { className: "rt-ap-trans" },
              h("span", { className: "rt-flow-arrow" }, "▼"),
              st.transition
                ? h("span", { className: "rt-ap-trans-t" }, st.transition)
                : null,
              h(
                "span",
                { className: "rt-ap-trans-t", style: { marginLeft: "auto" } },
                "Накоплено " + st.cumulative + " баллов",
              ),
            )
          : h(
              "div",
              { className: "rt-ap-trans" },
              h("span", { className: "rt-flow-arrow" }, "▼"),
              h(
                "span",
                { className: "rt-ap-trans-t" },
                "Итого " + ((summary && summary.points) || 0) + " баллов",
              ),
            ),
      );
    };

    /* ── B: горизонтальная цепочка атаки (всё на одном экране) ─────────────────────────────── */
    const stageB = (st, i) =>
      h(
        "div",
        { key: "c" + st.code, className: "rt-ap-col" },
        i > 0 ? h("span", { className: "rt-ap-col-arrow" }, "▶") : null,
        h(
          "div",
          { className: "rt-hcol", style: { borderTopColor: st.color } },
          h(
            "div",
            {
              className: "rt-ap-head",
              style: { borderLeftColor: st.color, padding: "5px 8px" },
            },
            h(
              "span",
              {
                className: "rt-ap-no",
                style: {
                  background: st.color,
                  width: 16,
                  height: 16,
                  fontSize: 10,
                },
              },
              String(i + 1),
            ),
            h(
              "span",
              { className: "rt-ap-name", style: { fontSize: 12 } },
              st.name,
            ),
            h("div", { className: "rt-spacer" }),
            h(
              "span",
              { className: "rt-ap-cum", style: { fontWeight: 700 } },
              st.cumulative,
            ),
          ),
          h("div", { className: "rt-hcol-goal", title: st.goal }, st.goal),
          h(
            "div",
            { className: "rt-hcol-body" },
            st.code === "boundary"
              ? h(
                  "div",
                  null,
                  h(
                    "div",
                    { className: "rt-hcol-hit" },
                    h("span", { className: "rt-hcol-pts" }, "+" + st.points),
                    h(
                      "span",
                      { className: "rt-hcol-name" },
                      "Туннелей " + st.tunnels.length + " шт.",
                    ),
                  ),
                  st.tunnels
                    .slice(0, 3)
                    .map((t) =>
                      h(
                        "div",
                        { key: "t" + t.id, className: "rt-hcol-sub" },
                        "▸ " + (t.kind || "") + " " + (t.listen || ""),
                      ),
                    ),
                )
              : st.code === "recon"
                ? h(
                    "div",
                    null,
                    h(
                      "div",
                      { className: "rt-hcol-hit" },
                      h("span", { className: "rt-hcol-pts" }, st.assetCount),
                      h("span", { className: "rt-hcol-name" }, "хостов получили баллы"),
                    ),
                    st.assets.slice(0, 6).map((a) =>
                      h(
                        "div",
                        {
                          key: "a" + a.id,
                          className: "rt-hcol-sub",
                          title: a.ip + "  +" + a.points + " баллов",
                        },
                        (a.scope === "internal" ? "внутр. " : "внеш. ") +
                          a.ip +
                          "  +" +
                          a.points,
                      ),
                    ),
                  )
                : h(
                    "div",
                    null,
                    h(
                      "div",
                      { className: "rt-hcol-hit" },
                      h("span", { className: "rt-hcol-pts" }, "+" + st.points),
                      h(
                        "span",
                        { className: "rt-hcol-name" },
                        st.hits + " попаданий",
                      ),
                    ),
                    st.items.slice(0, 6).map((x) =>
                      h(
                        "div",
                        {
                          key: "c" + x.id,
                          className: "rt-hcol-sub",
                          title: x.point_name + "  " + (x.target || ""),
                        },
                        h("span", { className: "rt-hcol-pts" }, "+" + x.points),
                        h("span", { className: "rt-hcol-name" }, x.point_name),
                      ),
                    ),
                    st.items.length > 6
                      ? h(
                          "div",
                          { className: "rt-hcol-none" },
                          "…ещё " + (st.items.length - 6) + " попаданий",
                        )
                      : null,
                    st.assetCount
                      ? h(
                          "div",
                          { className: "rt-hcol-none" },
                          "Задействовано активов: " + st.assetCount + "",
                        )
                      : null,
                  ),
          ),
        ),
      );

    return h(
      "div",
      { className: "rt-main" },
      h(
        "div",
        { className: "rt-toolbar" },
        h("span", { style: { fontWeight: 600 } }, "Цепочка атаки"),
        h(
          "span",
          { className: "rt-tag", style: { fontSize: 10.5 } },
          "Разведка → Доступ к интернет-активам → Прорыв периметра → Доступ к активам внутренней сети → Доступ к цели",
        ),
        summary
          ? h(
              "span",
              { className: "rt-tag rt-tag-live" },
              "Всего " + summary.points + " баллов",
            )
          : null,
        h("div", { className: "rt-spacer" }),
        h(
          "button",
          {
            className: "rt-btn" + (view === "A" ? " rt-btn-primary" : ""),
            title: "Вертикальная цепочка атаки: детали по этапам вниз",
            onClick: () => setView("A"),
          },
          "Цепочка A",
        ),
        h(
          "button",
          {
            className: "rt-btn" + (view === "B" ? " rt-btn-primary" : ""),
            title: "Горизонтальная цепочка атаки: пять этапов на одном экране",
            onClick: () => setView("B"),
          },
          "Цепочка B",
        ),
        h(
          "button",
          { className: "rt-btn", disabled: loading, onClick: load },
          loading ? "Загрузка…" : "Обновить",
        ),
      ),
      err ? h("div", { className: "rt-err" }, err) : null,
      !stages.length && !err && data !== null
        ? h(
            "div",
            { className: "rt-empty" },
            "Записей о начислениях пока нет. Зафиксируйте результат через redteam_score_hit — тогда эта цепочка и появится.",
          )
        : view === "A"
          ? h("div", { className: "rt-ap" }, stages.map(stageA))
          : h("div", { className: "rt-ap-h" }, stages.map(stageB)),
    );
  }

  /* ---------------------------------------------------------- Отчёт о воспроизведении начислений */
  /**
   * Резервная группировка отчёта: если host отдаёт только плоский список, группируем записи по этапам из scoreChain в порядке цепочки атаки.
   * Основание — общий score_hit id: каждый item в scoreChain несёт stage_code,
   * а каждый item в scoreReport несёт тот же id. Так даже при старом host или отсутствии строк этапов
   * страница отчёта показывается нормально, а не выдаёт ложное «пока нет результатов для сдачи».
   */
  function groupByStage(reportItems, chain) {
    const byId = new Map((reportItems || []).map((x) => [x.id, x]));
    const groups = [];
    const stageList = (chain && chain.stages) || [];
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
        items,
      });
    });
    /* Если в scoreChain совсем нет данных об этапах, относим начисления хотя бы в «Прочее», чтобы записи не исчезали */
    const grouped = new Set(
      groups.reduce((acc, g) => acc.concat(g.items.map((x) => x.id)), []),
    );
    const rest = (reportItems || []).filter((x) => !grouped.has(x.id));
    if (rest.length > 0) {
      groups.push({
        code: "other",
        name: "Прочие начисления",
        color: "#64748b",
        ordinal: groups.length + 1,
        points: rest.reduce((n, x) => n + (x.counted ? x.points : 0), 0),
        cumulative: 0,
        items: rest,
      });
    }
    return groups;
  }

  function ReportTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    /* Отчёт сворачивается по этапам: по умолчанию всё раскрыто, состояние запоминается по цели (при многих этапах удобно сдавать по частям) */
    const collapse = useCollapse("report:" + eng);

    const load = () => {
      if (!eng) return;
      setBusy(true);
      setMsg(null);
      api({ op: "scoreReport", engagement: eng }).then(
        (r) => {
          if (!r || r.ok === false) {
            setBusy(false);
            setErr((r && r.error) || "Ошибка генерации");
            return;
          }
          /* Старый host отдаёт только плоский список без группировки по этапам (или строки этапов отсутствуют): группируем по цепочке атаки сами,
             иначе страница отчёта выдаст ложное «пока нет результатов для сдачи». Данные для группировки берём из scoreChain. */
          if (
            (!r.stages || r.stages.length === 0) &&
            (r.items || []).length > 0
          ) {
            api({ op: "scoreChain", engagement: eng }).then(
              (c) => {
                setBusy(false);
                setErr(null);
                setData(
                  Object.assign({}, r, { stages: groupByStage(r.items, c) }),
                );
              },
              () => {
                setBusy(false);
                setErr(null);
                setData(r);
              },
            );
            return;
          }
          setBusy(false);
          setErr(null);
          setData(r);
        },
        (e) => {
          setBusy(false);
          setErr(String((e && e.message) || e));
        },
      );
    };
    React.useEffect(load, [eng, refreshKey]);

    /* Результат копирования должен быть настоящим: если clipboard API отказал (небезопасный контекст/потеря фокуса/отказ), сообщаем честно,
         иначе пользователь решит, что скопировал, а в Yakit вставится пусто. */
    const copy = (text, label) =>
      copyWithFeedback(text, label, (okFlag, message) => {
        setMsg(okFlag ? { ok: message } : { err: message });
      });
    const download = (text, label) => {
      try {
        const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download =
          "report-" +
          String(label || "score").replace(/[^\w.\-]/g, "_") +
          ".md";
        a.click();
        /* Немедленный revoke в некоторых браузерах обрывает скачивание, запущенное через click, поэтому откладываем на такт */
        setTimeout(() => {
          try {
            URL.revokeObjectURL(url);
          } catch {
            /* ignore */
          }
        }, 1000);
        setMsg({ ok: "Скачано: " + label });
      } catch (e) {
        setMsg({ err: "Ошибка скачивания: " + ((e && e.message) || e) });
      }
    };

    const items = (data && data.items) || [];
    const stages = (data && data.stages) || [];
    const summary = (data && data.summary) || null;
    const mdText = (data && data.markdown) || "";
    const CIRCLED = [
      "①",
      "②",
      "③",
      "④",
      "⑤",
      "⑥",
      "⑦",
      "⑧",
      "⑨",
      "⑩",
      "⑪",
      "⑫",
      "⑬",
      "⑭",
      "⑮",
      "⑯",
      "⑰",
      "⑱",
      "⑲",
      "⑳",
    ];

    /* По одной записи на пункт, плоский список без сворачивания: цель → что получено → запрос для воспроизведения (можно вставить прямо в Yakit) → ответ */
    const card = (x) =>
      h(
        "div",
        { key: "r" + x.id, className: "rt-rep" },
        h(
          "div",
          { className: "rt-rep-head" },
          h("span", { className: "rt-rep-idx" }, String(x.seq)),
          h("span", { className: "rt-rep-name" }, x.point_name),
          h("span", { className: "rt-flow-pts" }, "+" + x.points + " баллов"),
          x.nth_of_point > 1
            ? h(
                "span",
                { className: "rt-tag" },
                "Повтор того же типа №" + x.nth_of_point + "",
              )
            : null,
          h("div", { className: "rt-spacer" }),
          h(
            "button",
            {
              className: "rt-btn",
              style: { padding: "0 6px", fontSize: 11 },
              onClick: () =>
                copy(
                  (x.requests || [])
                    .map((v) => v.request || "")
                    .filter(Boolean)
                    .join("\n\n"),
                  "Запрос №" + x.seq + "",
                ),
            },
            "Копировать запрос",
          ),
        ),
        h(
          "div",
          { className: "rt-rep-meta" },
          h("span", null, h("b", null, "Цель ")),
          h("span", { className: "rt-mono" }, x.target || x.asset_ip || "—"),
        ),
        x.gained
          ? h(
              "div",
              { className: "rt-rep-meta" },
              h("b", null, "Получено "),
              h("span", null, x.gained),
            )
          : null,
        x.vuln
          ? h(
              "div",
              { className: "rt-rep-meta" },
              h("b", null, "Использованная уязвимость "),
              h(
                "span",
                null,
                [x.vuln.cve, x.vuln.title].filter(Boolean).join(" "),
              ),
            )
          : null,
        x.evidence
          ? h(
              "div",
              { className: "rt-rep-meta" },
              h("b", null, "Результат "),
              h("span", null, String(x.evidence).replace(/\n+/g, " ")),
            )
          : null,
        x.recorded_at
          ? h(
              "div",
              { className: "rt-rep-meta" },
              h("b", null, "Когда получено "),
              h(
                "span",
                null,
                fmt(x.recorded_at) +
                  (x.recorded_by
                    ? "(" + (ROLE_LABEL[x.recorded_by] || x.recorded_by) + ")"
                    : ""),
              ),
            )
          : null,
        h(ShotStrip, {
          eng: eng,
          shots: x.shots,
          total: x.shot_total,
          title: "Скриншоты доказательств",
        }),
        /* ── Шаги воспроизведения: записи действий (с реальными командами и выводом) + учётные данные + туннели + WebShell ─────
           Вся ценность сдаваемого отчёта здесь: откуда взялись логины и пароли, как построен туннель — по этому пользователь воспроизведёт всё сам. */
        h(
          "details",
          {
            className: "rt-rep-trace",
            open: x.incomplete === true || (x.steps || []).length === 0,
          },
          h(
            "summary",
            { className: "rt-rep-trace-head", style: { cursor: "pointer" } },
            h(
              "span",
              { className: "rt-rep-trace-title" },
              "Шаги воспроизведения (клик — раскрыть)",
            ),
            (x.steps || []).length
              ? h(
                  "span",
                  { className: "rt-tag" },
                  (x.steps || []).length + " действий",
                )
              : null,
            (x.credentials || []).length
              ? h(
                  "span",
                  { className: "rt-tag" },
                  (x.credentials || []).length + " учётных данных",
                )
              : null,
            (x.tunnels || []).length
              ? h(
                  "span",
                  { className: "rt-tag" },
                  (x.tunnels || []).length + " туннелей",
                )
              : null,
            x.incomplete
              ? h("span", { className: "rt-tag rt-tag-warn" }, "Материалы для воспроизведения неполные")
              : h("span", { className: "rt-tag rt-tag-live" }, "Воспроизводимо"),
          ),
          h(
            "div",
            { style: { paddingTop: 6 } },
            x.how ? h("div", { className: "rt-rep-trace-how" }, x.how) : null,
            (x.steps || []).length === 0
              ? h(
                  "div",
                  { className: "rt-rep-missing" },
                  "⚠️ Нет связанных шагов атаки: непонятно, как сделан этот шаг. Добавьте действие через redteam_chain_add (title / detail / tool / result); при начислении можно сразу передать point_code + evidence.",
                )
              : (x.steps || []).map((s, si) =>
                  h(
                    "div",
                    { key: "s" + s.id, className: "rt-rep-step" },
                    h(
                      "div",
                      { className: "rt-rep-step-head" },
                      h(
                        "span",
                        { className: "rt-rep-step-no" },
                        String(si + 1),
                      ),
                      h(
                        "span",
                        { className: "rt-rep-step-title" },
                        s.title || "(действие без названия)",
                      ),
                      s.agent
                        ? h(
                            "span",
                            { className: "rt-tag" },
                            ROLE_LABEL[s.agent] || s.agent,
                          )
                        : null,
                      s.stage_code
                        ? h("span", { className: "rt-tag" }, s.stage_code)
                        : null,
                      s.inferred
                        ? h("span", { className: "rt-tag" }, "Выведено по тому же активу")
                        : null,
                      h("div", { className: "rt-spacer" }),
                      s.recorded_at
                        ? h(
                            "span",
                            {
                              style: {
                                fontSize: 11,
                                color: "var(--dsw-alias-label-secondary)",
                              },
                            },
                            fmt(s.recorded_at),
                          )
                        : null,
                    ),
                    s.detail
                      ? h("div", { className: "rt-rep-step-detail" }, s.detail)
                      : null,
                    h(
                      "div",
                      { className: "rt-rep-step-cmd" },
                      h("b", null, "Выполнено "),
                      s.tool
                        ? h("span", { className: "rt-mono" }, s.tool)
                        : h(
                            "span",
                            {
                              style: {
                                color:
                                  "var(--dsw-alias-state-warn-primary, #f59e0b)",
                              },
                            },
                            "Реальная команда не записана (tool в redteam_chain_add)",
                          ),
                    ),
                    s.tool
                      ? h(
                          "div",
                          { style: { marginTop: 3 } },
                          h(
                            "button",
                            {
                              className: "rt-btn",
                              style: { padding: "0 6px", fontSize: 11 },
                              onClick: () =>
                                copy(
                                  String(s.tool),
                                  "Шаг " + (si + 1) + ": команда",
                                ),
                            },
                            "Копировать команду",
                          ),
                        )
                      : null,
                    s.result
                      ? h(
                          "div",
                          { className: "rt-rep-step-result" },
                          h("b", null, "Результат "),
                          String(s.result).replace(/\n+/g, " "),
                        )
                      : null,
                    s.evidence_ref
                      ? h(
                          "div",
                          { className: "rt-rep-step-result" },
                          h("b", null, "Доказательства "),
                          h("span", { className: "rt-mono" }, s.evidence_ref),
                        )
                      : null,
                  ),
                ),
            /* Откуда взялись логины и пароли: источник учётных данных + способ получения */
            (x.credentials || []).length
              ? h(
                  "div",
                  { className: "rt-rep-src" },
                  h(
                    "div",
                    { className: "rt-rep-src-title" },
                    "Полученные учётные данные (источник отслеживается)",
                  ),
                  (x.credentials || []).map((c) =>
                    h(
                      "div",
                      { key: "c" + c.id, className: "rt-kv" },
                      h(
                        "b",
                        { className: "rt-mono", style: { minWidth: 120 } },
                        c.host || "—",
                      ),
                      h(
                        "span",
                        null,
                        (c.username || "(без имени пользователя)") +
                          " / " +
                          (c.secret_type || "password") +
                          (c.privilege ? " · права " + c.privilege : "") +
                          " · источник " +
                          (c.source || "не указан") +
                          (c.tool
                            ? " · способ получения " +
                              String(c.tool).replace(/\n+/g, " ").slice(0, 160)
                            : ""),
                      ),
                    ),
                  ),
                )
              : null,
            /* Как построен туннель */
            (x.tunnels || []).length
              ? h(
                  "div",
                  { className: "rt-rep-src" },
                  h(
                    "div",
                    { className: "rt-rep-src-title" },
                    "Использованные туннели / каналы",
                  ),
                  (x.tunnels || []).map((t) =>
                    h(
                      "div",
                      { key: "t" + t.id, className: "rt-kv" },
                      h(
                        "b",
                        { className: "rt-mono", style: { minWidth: 120 } },
                        (t.kind || "socks5") + " " + (t.listen || ""),
                      ),
                      h(
                        "span",
                        null,
                        "Вход " +
                          (t.entry || "не зарегистрирован") +
                          (t.reach ? " · доступно " + t.reach : "") +
                          " · сторона цели " +
                          (t.entry_kind || "не указано") +
                          (t.legit === false ? " · ⚠️ не считается пересечением границы цели" : "") +
                          (t.status ? " · " + t.status : "") +
                          (t.command
                            ? " · команда " +
                              String(t.command)
                                .replace(/\n+/g, " ")
                                .slice(0, 160)
                            : ""),
                      ),
                    ),
                  ),
                )
              : null,
            (x.webshells || []).length
              ? h(
                  "div",
                  { className: "rt-rep-src" },
                  h(
                    "div",
                    { className: "rt-rep-src-title" },
                    "Использованные WebShell",
                  ),
                  (x.webshells || []).map((w) =>
                    h(
                      "div",
                      { key: "w" + w.id, className: "rt-kv" },
                      h(
                        "b",
                        { className: "rt-mono", style: { minWidth: 120 } },
                        w.shell_type || "shell",
                      ),
                      h(
                        "span",
                        null,
                        (w.url || "") +
                          (w.pass_key ? " · пароль/ключ " + w.pass_key : "") +
                          (w.privilege ? " · права " + w.privilege : "") +
                          (w.status ? " · " + w.status : ""),
                      ),
                    ),
                  ),
                )
              : null,
            (x.gaps || []).length
              ? h(
                  "div",
                  { className: "rt-rep-missing" },
                  "⚠️ Пробелы воспроизведения: " + x.gaps.join("; "),
                )
              : null,
          ),
          (x.requests || []).length === 0
            ? h(
                "div",
                { className: "rt-rep-missing" },
                "⚠️ У этого пункта нет записи исходного запроса, воспроизвести напрямую нельзя —— добавьте через redteam_http_evidence_add",
              )
            : (x.requests || []).map((r, ri) =>
                h(
                  "div",
                  { key: "q" + ri, className: "rt-rep-req" },
                  h(
                    "div",
                    { className: "rt-rep-req-head" },
                    h(
                      "span",
                      null,
                      "Запрос для воспроизведения " +
                        (ri + 1) +
                        (r.source === "auto"
                          ? " (подобран автоматически по пути цели, сверьте)"
                          : ""),
                    ),
                    h(
                      "span",
                      { className: "rt-tag" },
                      (r.method || "GET") +
                        " " +
                        (r.status === null || r.status === undefined
                          ? ""
                          : r.status),
                    ),
                    h("div", { className: "rt-spacer" }),
                    h(
                      "button",
                      {
                        className: "rt-btn",
                        style: { padding: "0 6px", fontSize: 11 },
                        onClick: () =>
                          copy(String(r.request || ""), "Запрос " + (ri + 1)),
                      },
                      "Копировать в Yakit",
                    ),
                  ),
                  h(
                    "pre",
                    { className: "rt-rep-http" },
                    r.request ||
                      (r.method || "GET") + " " + (r.url || "") + " HTTP/1.1",
                  ),
                  r.response
                    ? h(
                        "div",
                        null,
                        h(
                          "div",
                          { className: "rt-rep-req-head" },
                          h("span", null, "Краткий ответ"),
                        ),
                        h(
                          "pre",
                          {
                            className: "rt-rep-http",
                            style: { maxHeight: 160 },
                          },
                          String(r.response).slice(0, 1600),
                        ),
                      )
                    : null,
                ),
              ),
          x.note
            ? h(
                "div",
                { className: "rt-rep-meta" },
                h("b", null, "Примечание "),
                h("span", null, x.note),
              )
            : null,
        ),
      );

    return h(
      "div",
      { className: "rt-main" },
      h(
        "div",
        { className: "rt-toolbar" },
        h("span", { style: { fontWeight: 600 } }, "Отчёт о воспроизведении цепочки начислений"),
        summary
          ? h(
              "span",
              { className: "rt-tag rt-tag-live" },
              "Итого " + summary.points + " баллов",
            )
          : null,
        summary
          ? h("span", { className: "rt-tag" }, summary.count + " начислений")
          : null,
        summary
          ? h(
              "span",
              {
                className:
                  "rt-tag" + (summary.missingRequests ? "" : " rt-tag-live"),
              },
              summary.withRequests + "/" + summary.count + " с исходными запросами",
            )
          : null,
        summary
          ? h(
              "span",
              {
                className:
                  "rt-tag" +
                  (summary.incomplete ? " rt-tag-warn" : " rt-tag-live"),
                title:
                  "Полнота цепочки воспроизведения: есть шаги атаки, записаны реальные команды, связаны уязвимость/учётные данные/туннель",
              },
              "Воспроизводимо " +
                (summary.count - (summary.incomplete || 0)) +
                "/" +
                summary.count,
            )
          : null,
        summary && summary.serviceCappedExcluded
          ? h(
              "span",
              {
                className: "rt-tag rt-tag-warn",
                title:
                  (summary.serviceCapped || [])
                    .map((x) => (x.service || "") + "|" + (x.point_name || ""))
                    .join("\n") ||
                  "Повторные попадания по учётным записям/правам БД того же актива и порта: сервис взят полностью, баллы не начисляются и в отчёт не идут",
              },
              "Сервис взят полностью, без баллов: " + summary.serviceCappedExcluded,
            )
          : null,
        h("div", { className: "rt-spacer" }),
        h(
          "button",
          {
            className: "rt-btn",
            disabled: busy || !mdText,
            onClick: () => copy(mdText, "весь отчёт"),
          },
          "Копировать целиком",
        ),
        h(
          "button",
          {
            className: "rt-btn",
            disabled: busy || !mdText,
            onClick: () => download(mdText, (data && data.target) || eng),
          },
          "Скачать .md",
        ),
        h(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "Генерация…" : "Сгенерировать заново",
        ),
      ),
      msg
        ? h(
            "div",
            { className: msg.err ? "rt-err" : "rt-foot" },
            msg.err || msg.ok,
          )
        : null,
      err ? h("div", { className: "rt-err" }, err) : null,
      h(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        stages.length
          ? h(
              "div",
              { className: "rt-rep-list" },
              h(
                "div",
                { className: "rt-rep-tools" },
                h(
                  "button",
                  {
                    className: "rt-btn",
                    onClick: () =>
                      collapse.setAll(
                        stages.map((s) => "st:" + s.code),
                        true,
                      ),
                  },
                  "Развернуть все",
                ),
                h(
                  "button",
                  {
                    className: "rt-btn",
                    onClick: () =>
                      collapse.setAll(
                        stages.map((s) => "st:" + s.code),
                        false,
                      ),
                  },
                  "Свернуть все",
                ),
              ),
              stages.map((st) => {
                const open = collapse.isOpen("st:" + st.code, true);
                const toggle = collapse.toggle("st:" + st.code, true);
                return h(
                  "div",
                  { key: "g" + st.code, className: "rt-rep-group" },
                  h(
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
                      },
                    },
                    h("span", { className: "rt-sec-caret" }, open ? "▾" : "▸"),
                    h(
                      "span",
                      {
                        className: "rt-rep-no",
                        style: { background: st.color },
                      },
                      CIRCLED[st.ordinal - 1] || st.ordinal,
                    ),
                    h("span", { className: "rt-rep-stage-name" }, st.name),
                    h(
                      "span",
                      { className: "rt-rep-stage-n" },
                      st.items.length + " шт.",
                    ),
                    h("div", { className: "rt-spacer" }),
                    h(
                      "span",
                      {
                        className: "rt-rep-pts",
                        style: {
                          background: st.color + "22",
                          color: st.color,
                          borderColor: st.color + "66",
                        },
                      },
                      "+" + st.points + " баллов",
                    ),
                    h(
                      "span",
                      { className: "rt-ap-cum" },
                      "Накоплено " + st.cumulative + " баллов",
                    ),
                  ),
                  open
                    ? h("div", { className: "rt-rep-body" }, st.items.map(card))
                    : null,
                );
              }),
            )
          : data === null
            ? h("div", { className: "rt-empty" }, "Загрузка…")
            : h(
                "div",
                { className: "rt-empty" },
                h("div", null, "Результатов для сдачи пока нет."),
                h(
                  "div",
                  { style: { marginTop: 6, fontSize: 12 } },
                  'В отчёт попадают только результаты "с баллами"; уязвимости без баллов в него не входят. Получив результат, зафиксируйте его через redteam_score_hit (актив цели + что получено) и добавьте redteam_http_evidence_add для воспроизведения.',
                ),
              ),
      ),
      h(
        "div",
        { className: "rt-foot" },
        h(
          "span",
          null,
          "Правило: только результаты с баллами, к каждому прилагается исходный запрос, который можно вставить в Yakit Repeater",
        ),
      ),
    );
  }

  /* ---------------------------------------------------------- Файлы атаки */
  const FILE_KIND = {
    poc: "POC",
    exp: "EXP",
    script: "Скрипт",
    wordlist: "Словарь",
    other: "Прочее",
  };

  function AttackFilesTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [folders, setFolders] = React.useState([]);
    const [err, setErr] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const collapse = useCollapse("files:" + eng);
    const [detail, setDetail] = React.useState(null);

    const load = () => {
      if (!eng) return;
      setBusy(true);
      api({ op: "attackFiles", engagement: eng }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Ошибка чтения");
            return;
          }
          setErr(null);
          setFolders(r.items || []);
        },
        (e) => {
          setBusy(false);
          setErr(String((e && e.message) || e));
        },
      );
    };
    React.useEffect(load, [eng, refreshKey]);

    const openFile = (f) => {
      if (detail && detail.id === f.id) {
        setDetail(null);
        return;
      }
      setDetail(null);
      api({ op: "readAttackFile", engagement: eng, id: f.id }).then(
        (r) => {
          if (r && r.ok) setDetail(r);
          else setErr((r && r.error) || "Ошибка чтения");
        },
        (e) => setErr(String((e && e.message) || e)),
      );
    };

    const rows = [];
    for (const folder of folders) {
      const fKey = "folder:" + folder.folder;
      const fileNodes = [];
      for (const f of folder.files) {
        fileNodes.push(
          h(
            "div",
            {
              key: "a" + f.id,
              className: "rt-vrow",
              style: {
                gridTemplateColumns: "18px 1.2fr 60px 1.6fr",
                cursor: "pointer",
              },
              role: "button",
              tabIndex: 0,
              onClick: () => openFile(f),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openFile(f);
                }
              },
            },
            h(
              "span",
              { className: "rt-sec-caret" },
              detail && detail.id === f.id ? "▾" : "▸",
            ),
            h("span", { className: "rt-mono" }, f.name),
            h(
              "span",
              null,
              h(
                "span",
                { className: "rt-tag rt-tag-active" },
                FILE_KIND[f.kind] || f.kind || "—",
              ),
            ),
            h(
              "span",
              {
                style: {
                  fontSize: 11.5,
                  color: "var(--dsw-alias-label-secondary)",
                },
                title: f.description || "",
              },
              f.description || "—",
            ),
          ),
        );
        if (!detail || detail.id !== f.id) continue;
        fileNodes.push(
          h(
            "div",
            {
              key: "ad" + f.id,
              className: "rt-vrow",
              style: { cursor: "default", gridTemplateColumns: "1fr" },
            },
            h(
              "div",
              { className: "rt-vdetail" },
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Эффект"),
                h("span", null, detail.evidence || "—"),
              ),
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Путь"),
                h(
                  "span",
                  { className: "rt-mono", style: { wordBreak: "break-all" } },
                  detail.path,
                ),
              ),
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Запись"),
                h(
                  "span",
                  null,
                  fmt(detail.created_at) +
                    (detail.created_by ? " · " + detail.created_by : ""),
                ),
              ),
              h(
                "pre",
                {
                  className: "rt-md",
                  style: {
                    border: "1px solid var(--dsw-alias-border-l1)",
                    borderRadius: 6,
                    maxHeight: "40vh",
                    padding: "10px 12px",
                  },
                },
                detail.content || "(пусто)",
              ),
            ),
          ),
        );
      }
      rows.push(
        h(
          Section,
          {
            key: "sec:" + folder.folder,
            tone: "folder",
            title: folder.folder + "/",
            count: folder.count + " файлов",
            open: collapse.isOpen(fKey, true),
            onToggle: collapse.toggle(fKey, true),
          },
          fileNodes.length
            ? fileNodes
            : h("div", { className: "rt-atest-meta" }, "(пусто)"),
        ),
      );
    }

    const total = folders.reduce((n, f) => n + f.count, 0);
    return h(
      "div",
      { className: "rt-main" },
      h(
        "div",
        { className: "rt-toolbar" },
        h("span", { style: { fontWeight: 600 } }, "Файлы атаки"),
        h(
          "span",
          { className: "rt-tag" },
          folders.length + " целей / " + total + " файлов",
        ),
        h("div", { className: "rt-spacer" }),
        h(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "Обновление…" : "Обновить",
        ),
      ),
      err ? h("div", { className: "rt-err" }, err) : null,
      h(
        "div",
        { className: "rt-table" },
        rows,
        !folders.length
          ? h(
              "div",
              { className: "rt-empty" },
              "Файлов атаки пока нет (пробившие скрипты/POC/EXP появятся здесь в папках целей)",
            )
          : null,
      ),
      h(
        "div",
        { className: "rt-foot" },
        h(
          "span",
          null,
          "Каталог: attack-files/<IP|хост из URL|C-сегмент>/ | только реально сработавшие файлы",
        ),
      ),
    );
  }

  /* ---------------------------------------------------------- База знаний (POC/EXP, общая для всех) */
  /**
   * Страница базы знаний: перед работой по Nday/1day сначала ищите здесь. Поиск поддерживает CVE / компонент / ключевое слово / слова из текста;
   * Нашли — раскрывайте и берите полный текст (можно сразу скопировать), нет — ищите в интернете или пишите сами, а после проверки заполняйте базу.
   * Здесь всё **глобально**: база не переключается вместе с целью, универсальный POC, накопленный по одной цели, потом годится для всех.
   */
  const POC_KIND_LABEL = {
    poc: "POC",
    exp: "EXP",
    script: "Скрипт",
    template: "Шаблон",
    payload: "Полезная нагрузка",
  };
  const POC_SOURCE_LABEL = {
    web: "Интернет",
    self: "Своё",
    manual: "Вручную",
    "nuclei-template": "Шаблон nuclei",
    kb: "База знаний",
  };

  function KnowledgeTab(props) {
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const [q, setQ] = React.useState("");
    const [kind, setKind] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [engagement, setEngagement] = React.useState("");
    const [assetTarget, setAssetTarget] = React.useState("");
    const [grouped, setGrouped] = React.useState(true);
    const [verifiedOnly, setVerifiedOnly] = React.useState(false);
    const [openId, setOpenId] = React.useState(null);
    const [detail, setDetail] = React.useState(null);
    const [detailBusy, setDetailBusy] = React.useState(false);
    const [tplOffset, setTplOffset] = React.useState(0);
    const tplPageSize = 40;

    const query = (over) => {
      const extra = over || {};
      const offset = Object.prototype.hasOwnProperty.call(
        extra,
        "templateOffset",
      )
        ? extra.templateOffset
        : 0;
      setTplOffset(offset);
      const params = Object.assign(
        {
          q: q.trim() || undefined,
          kind: kind || undefined,
          category: category || undefined,
          engagement: engagement || undefined,
          asset_target: assetTarget.trim() || undefined,
          verified: verifiedOnly || undefined,
          templateOffset: offset || 0,
          templateLimit: tplPageSize,
        },
        extra,
      );
      setBusy(true);
      setMsg(null);
      api(Object.assign({ op: "pocSearch" }, params)).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Ошибка чтения");
            return;
          }
          setErr(null);
          setData(r);
        },
        (e) => {
          setBusy(false);
          setErr(String((e && e.message) || e));
        },
      );
    };
    /* Полную выборку тянем при первом входе и при смене ключа обновления (поиск — явное действие, чтобы не дёргать API на каждый символ) */
    React.useEffect(() => {
      query({
        q: undefined,
        kind: undefined,
        category: undefined,
        engagement: undefined,
        asset_target: undefined,
        verified: undefined,
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
      api({ op: "pocGet", id: id }).then(
        (r) => {
          setDetailBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка чтения" });
            return;
          }
          setDetail(r);
        },
        (e) => {
          setDetailBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };

    /* Как и на странице отчёта: сначала await реального результата, потом сообщение */
    const copy = (text, label) =>
      copyWithFeedback(text, label, (okFlag, message) => {
        setMsg(okFlag ? { ok: message } : { err: message });
      });
    const useIt = (row) => {
      api({ op: "pocUse", id: row.id, used_on: "отмечено вручную в консоли" }).then(
        () => {
          setMsg({ ok: "Отмечено повторное использование: " + row.title });
          query();
        },
        (e) => setMsg({ err: String((e && e.message) || e) }),
      );
    };

    const stats = (data && data.stats) || {
      total: 0,
      verified: 0,
      reused: 0,
      byKind: [],
      bySource: [],
    };
    const items = (data && data.items) || [];
    const tpl = (data && data.templates) || {
      dir: null,
      total: 0,
      matched: 0,
      offset: 0,
      items: [],
      byCategory: [],
    };
    const tplByCat = new Map(
      (tpl.byCategory || []).map((c) => [c.code, c.n || 0]),
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
      return h(
        "div",
        { key: "p" + x.id, className: "rt-kb" + (isOpen ? " open" : "") },
        h(
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
            },
          },
          h("span", { className: "rt-sec-caret" }, isOpen ? "▾" : "▸"),
          h(
            "span",
            { className: "rt-kb-kind k-" + (x.kind || "poc") },
            POC_KIND_LABEL[x.kind] || x.kind || "POC",
          ),
          h("span", { className: "rt-kb-title" }, x.title),
          x.cve
            ? h("span", { className: "rt-tag rt-tag-passive" }, x.cve)
            : null,
          x.component ? h("span", { className: "rt-tag" }, x.component) : null,
          x.verified === 1
            ? h("span", { className: "rt-tag rt-tag-live" }, "Проверено")
            : h("span", { className: "rt-tag rt-tag-warn" }, "Не проверено"),
          h("div", { className: "rt-spacer" }),
          h(
            "span",
            { className: "rt-tag" },
            POC_SOURCE_LABEL[x.source] || x.source || "—",
          ),
          x.hit_count
            ? h("span", { className: "rt-tag" }, "Использований " + x.hit_count)
            : null,
        ),
        /* Строка источника: категория · затронутые версии · когда создано · цель-источник · найденный актив —— чтобы было видно, «когда
             и на каком активе какой организации это найдено» */
        h(
          "div",
          { className: "rt-kb-sub" },
          [
            x.category
              ? "Категория " + (POC_CAT_NAME[x.category] || x.category)
              : null,
            x.versions ? "Затронутые версии " + x.versions : null,
            x.language || null,
            x.tags || null,
            "Создано " + fmt(x.created_at),
            x.engagement_name || x.engagement_id
              ? "Цель-источник " + (x.engagement_name || x.engagement_id)
              : null,
            x.asset_target ? "Найденный актив " + x.asset_target : null,
            x.found_by_agent
              ? "Роль при находке " + (ROLE_LABEL[x.found_by_agent] || x.found_by_agent)
              : null,
            x.source_url ? "Источник " + x.source_url : null,
          ]
            .filter(Boolean)
            .join(" · "),
        ),
        isOpen
          ? h(
              "div",
              { className: "rt-kb-body" },
              detailBusy && !d
                ? h("div", { className: "rt-empty" }, "Чтение…")
                : null,
              d
                ? h(
                    "div",
                    null,
                    d.usage
                      ? h(
                          "div",
                          { className: "rt-kv" },
                          h("b", null, "Использование"),
                          h("span", { className: "rt-mono" }, d.usage),
                        )
                      : null,
                    d.description
                      ? h(
                          "div",
                          { className: "rt-kv" },
                          h("b", null, "Описание"),
                          h("span", null, d.description),
                        )
                      : null,
                    d.verified_note
                      ? h(
                          "div",
                          { className: "rt-kv" },
                          h("b", null, "Доказательства проверки"),
                          h("span", null, d.verified_note),
                        )
                      : null,
                    d.used_on
                      ? h(
                          "div",
                          { className: "rt-kv" },
                          h("b", null, "Последнее использование"),
                          h("span", null, d.used_on),
                        )
                      : null,
                    d.path
                      ? h(
                          "div",
                          { className: "rt-kv" },
                          h("b", null, "Файл на диске"),
                          h("span", { className: "rt-mono" }, d.path),
                        )
                      : null,
                    h(
                      "div",
                      { className: "rt-kb-actions" },
                      h(
                        "button",
                        {
                          className: "rt-btn",
                          disabled: !d.content,
                          onClick: () => copy(d.content || "", "текст POC"),
                        },
                        "Копировать текст",
                      ),
                      h(
                        "button",
                        { className: "rt-btn", onClick: () => useIt(x) },
                        "Отметить использование",
                      ),
                      d.source_url
                        ? h(
                            "button",
                            {
                              className: "rt-btn",
                              onClick: () => copy(d.source_url, "ссылка на источник"),
                            },
                            "Копировать источник",
                          )
                        : null,
                    ),
                    d.content
                      ? h(
                          "pre",
                          { className: "rt-rep-http" },
                          d.content.length > 12000
                            ? d.content.slice(0, 12000) +
                                "\n…(обрезано, полный текст в файле на диске)"
                            : d.content,
                        )
                      : h(
                          "div",
                          { className: "rt-empty" },
                          "У этой записи только метаданные без текста —— получив текст, добавьте его через redteam_poc_update",
                        ),
                  )
                : null,
            )
          : null,
      );
    };

    return h(
      "div",
      { className: "rt-main" },
      h(
        "div",
        { className: "rt-toolbar" },
        h("span", { style: { fontWeight: 600 } }, "База знаний · POC / EXP"),
        h("span", { className: "rt-tag" }, stats.total + " шт."),
        h(
          "span",
          { className: "rt-tag rt-tag-live" },
          "Проверено " + stats.verified,
        ),
        h("span", { className: "rt-tag" }, "Всего использований " + (stats.reused || 0)),
        (stats.uncategorized || 0) > 0 &&
          (stats.uncategorized || 0) !== stats.total
          ? h(
              "span",
              {
                className: "rt-tag rt-tag-warn",
                title:
                  "Эти записи без категории: при заполнении агентом укажите параметр category в redteam_poc_add",
              },
              "Без категории " + stats.uncategorized,
            )
          : null,
        tpl.total
          ? h(
              "span",
              { className: "rt-tag rt-tag-passive" },
              "Локальные шаблоны " + tpl.total,
            )
          : null,
        h("div", { className: "rt-spacer" }),
        h(
          "button",
          {
            className: "rt-btn" + (grouped ? " rt-btn-primary" : ""),
            title: "Группировать по категориям / плоским списком",
            onClick: () => setGrouped(!grouped),
          },
          grouped ? "По категориям" : "Плоский список",
        ),
        h(
          "button",
          { className: "rt-btn", disabled: busy, onClick: () => query() },
          busy ? "Поиск…" : "Обновить",
        ),
      ),
      /* Обзор категорий: клик фильтрует по категории, сразу видно, «какого оружия сколько накоплено и где пока пусто» */
      h(
        "div",
        { className: "rt-kb-cats" },
        (stats.byCategory || [])
          .filter((c) => catShown(c) > 0 || POC_CAT_ORDER.includes(c.code))
          .map((c) =>
            h(
              "span",
              {
                key: c.code,
                className: "rt-concl-i" + (category === c.code ? " on" : ""),
                title:
                  (c.hint || POC_CAT_NAME[c.code] || c.code) +
                  " · локальных шаблонов " +
                  (tplByCat.get(c.code) || 0) +
                  " · в базе знаний " +
                  (c.n || 0) +
                  (c.verified ? " (проверено " + c.verified + ")" : ""),
                onClick: () => {
                  const next = category === c.code ? "" : c.code;
                  setCategory(next);
                  query({ category: next || undefined });
                },
              },
              h("b", null, String(catShown(c))),
              h(
                "span",
                null,
                (POC_CAT_NAME[c.code] || c.code) +
                  (c.verified ? " (проверено " + c.verified + ")" : ""),
              ),
            ),
          ),
      ),
      h(
        "div",
        { className: "rt-kb-filter" },
        h("input", {
          className: "rt-input",
          style: { flex: 1, minWidth: 140 },
          placeholder: "Поиск по CVE / компоненту / ключевому слову (ищет и по тексту)",
          value: q,
          onChange: (e) => setQ(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") query();
          },
        }),
        h(
          "select",
          {
            className: "rt-input",
            style: { maxWidth: 120 },
            value: category,
            onChange: (e) => {
              setCategory(e.target.value);
              query({ category: e.target.value || undefined });
            },
          },
          h("option", { value: "" }, "Все категории"),
          POC_CAT_ORDER.map((k) =>
            h("option", { key: k, value: k }, POC_CAT_NAME[k]),
          ),
        ),
        h(
          "select",
          {
            className: "rt-input",
            style: { maxWidth: 120 },
            value: engagement,
            onChange: (e) => {
              setEngagement(e.target.value);
              query({ engagement: e.target.value || undefined });
            },
          },
          h("option", { value: "" }, "Все цели-источники"),
          (stats.byEngagement || []).map((e) =>
            h(
              "option",
              { key: e.engagement, value: e.engagement },
              e.engagement + "(" + e.n + ")",
            ),
          ),
        ),
        h("input", {
          className: "rt-input",
          style: { width: 120 },
          placeholder: "Фильтр по найденному активу",
          value: assetTarget,
          onChange: (e) => setAssetTarget(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") query();
          },
        }),
        h(
          "select",
          {
            className: "rt-input",
            style: { maxWidth: 110 },
            value: kind,
            onChange: (e) => {
              setKind(e.target.value);
              query({ kind: e.target.value || undefined });
            },
          },
          h("option", { value: "" }, "Все типы"),
          Object.keys(POC_KIND_LABEL).map((k) =>
            h("option", { key: k, value: k }, POC_KIND_LABEL[k]),
          ),
        ),
        h(
          "label",
          { className: "rt-kb-check" },
          h("input", {
            type: "checkbox",
            checked: verifiedOnly,
            onChange: (e) => {
              setVerifiedOnly(e.target.checked);
              query({ verified: e.target.checked || undefined });
            },
          }),
          "Только проверенные",
        ),
        h(
          "button",
          { className: "rt-btn rt-btn-primary", onClick: () => query() },
          "Поиск",
        ),
      ),
      msg
        ? h(
            "div",
            { className: msg.err ? "rt-err" : "rt-foot" },
            msg.err || msg.ok,
          )
        : null,
      err
        ? h(
            "div",
            { className: "rt-err" },
            /engagement required|unknown op/i.test(err)
              ? /* У старого host ещё нет API базы знаний: объясняем, как восстановить, чтобы человек не тупил перед "engagement required" */
                "API базы знаний предоставляет host, а текущий хост — старый процесс —— полностью выйдите и откройте заново (официальный exe / Community Edition / dsh web), затем обновите страницу."
              : err,
          )
        : null,
      !err && data && data.dbPath
        ? h(
            "div",
            { className: "rt-foot", style: { marginBottom: 6, fontSize: 11 } },
            "База знаний: " +
              data.dbPath +
              (data.root ? " (корень " + data.root + ")" : ""),
          )
        : null,
      h(
        "div",
        { className: "rt-table" },
        (() => {
          if (!grouped) return items.map(card);
          /* Отрисовка по группам: в порядке встроенных категорий, неизвестные попадают в «Прочее» в конце */
          const buckets = new Map();
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
              h(
                "div",
                { key: "g" + code, className: "rt-kb-cat" },
                h(
                  "span",
                  { className: "rt-kb-cat-name" },
                  POC_CAT_NAME[code] || code,
                ),
                h("span", { className: "rt-tag" }, list.length + " шт."),
                h(
                  "span",
                  { className: "rt-tag rt-tag-live" },
                  "Проверено " + list.filter((x) => x.verified === 1).length,
                ),
                h("span", { className: "rt-spacer" }),
                h(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      color: "var(--dsw-alias-label-secondary)",
                    },
                  },
                  "Последнее создание " +
                    fmt(
                      list
                        .map((x) => x.created_at)
                        .filter(Boolean)
                        .sort()
                        .pop(),
                    ),
                ),
              ),
            );
            for (const x of list) out.push(card(x));
          }
          return out;
        })(),
        tplItems.length
          ? h(
              "div",
              { className: "rt-kb-tpl" },
              h(
                "div",
                { className: "rt-ap-sub" },
                "Локальные шаблоны nuclei · " +
                  (tplStart + 1) +
                  "–" +
                  (tplStart + tplItems.length) +
                  " / " +
                  tplMatched +
                  " (напрямую `nuclei -t <путь к шаблону>`)",
              ),
              tplItems.map((t, i) =>
                h(
                  "div",
                  { key: "t" + tplStart + "-" + i, className: "rt-kb-tpl-row" },
                  h("span", { className: "rt-tag" }, t.severity || "—"),
                  t.category
                    ? h(
                        "span",
                        { className: "rt-tag" },
                        POC_CAT_NAME[t.category] || t.category,
                      )
                    : null,
                  h(
                    "span",
                    { className: "rt-mono rt-kb-tpl-path", title: t.path },
                    t.path,
                  ),
                  h(
                    "span",
                    { className: "rt-kb-tpl-name", title: t.name },
                    t.name || "",
                  ),
                  h(
                    "button",
                    {
                      className: "rt-btn",
                      style: { padding: "0 6px", fontSize: 10.5 },
                      onClick: () =>
                        copy("nuclei -t " + t.path + " -u <цель>", "команда шаблона"),
                    },
                    "Копировать команду",
                  ),
                ),
              ),
              h(
                "div",
                { className: "rt-kb-actions" },
                h(
                  "button",
                  {
                    className: "rt-btn",
                    disabled: busy || tplStart <= 0,
                    onClick: () => turnTpl(tplStart - tplPageSize),
                  },
                  "Назад",
                ),
                h(
                  "button",
                  {
                    className: "rt-btn",
                    disabled: busy || tplStart + tplItems.length >= tplMatched,
                    onClick: () => turnTpl(tplStart + tplPageSize),
                  },
                  "Вперёд",
                ),
              ),
              tpl.dir
                ? h(
                    "div",
                    { className: "rt-foot" },
                    h("span", null, "Каталог шаблонов: " + tpl.dir),
                  )
                : null,
            )
          : null,
        data === null ? h("div", { className: "rt-empty" }, "Загрузка…") : null,
        data !== null && !items.length && !tplItems.length
          ? h(
              "div",
              { className: "rt-empty" },
              h(
                "div",
                null,
                q || kind || verifiedOnly
                  ? "Ничего не найдено: попробуйте другое ключевое слово либо ищите в интернете / напишите сами и заполните базу."
                  : tpl.total
                    ? "Библиотека POC/EXP пока пуста; локально уже есть " +
                      tpl.total +
                      " шаблонов nuclei, но эта страница их не показывает. Полностью выйдите и откройте клиент заново."
                    : tpl.dir
                      ? "База знаний пока пуста (каталог локальных шаблонов есть, но yaml нет — запустите nuclei -update-templates)."
                      : "База знаний пока пуста. Локальной библиотеки шаблонов nuclei тоже нет —— на машине полигона запустите setup.sh или `nuclei -update-templates`; после установки здесь появится «локальных шаблонов N».",
              ),
              h(
                "div",
                { style: { marginTop: 6, fontSize: 12 } },
                "Стандартный порядок работы по Nday/1day: ① ищем здесь через redteam_poc_search (заодно смотрит локальную библиотеку шаблонов nuclei) → ② если нет — ищем в интернете (web_search / GitHub / ExploitDB / бюллетени вендора) или пишем сами → ③ проверили на реальной цели — заливаем через redteam_poc_add, и следующие цели уже воспользуются.",
              ),
              data.dbPath
                ? h(
                    "div",
                    {
                      style: { marginTop: 6, fontSize: 11 },
                      className: "rt-mono",
                    },
                    "Файл базы знаний: " + data.dbPath,
                  )
                : null,
              tpl.dir
                ? h(
                    "div",
                    {
                      style: { marginTop: 6, fontSize: 11 },
                      className: "rt-mono",
                    },
                    "Каталог шаблонов: " + tpl.dir,
                  )
                : null,
            )
          : null,
      ),
      h(
        "div",
        { className: "rt-foot" },
        h(
          "span",
          null,
          "Общая для всех (между целями) | на диске: pocs/<code>/ | только универсальные переиспользуемые POC/EXP, скрипты под конкретную цель идут в «Файлы атаки»",
        ),
      ),
    );
  }

  /* ---------------------------------------------------------- Адаптация окружения (Windows / не Kali) */
  /**
   * По мотивам «системных настроек» Z3r0: пути и ключи в централизованном конфиге, без опоры на bash/ps1.
   * Хранится в $DSH_HOME/redteam/config.json —— пользователь указывает абсолютные пути инструментов или общий каталог для поиска.
   */
  function EnvTab(props) {
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = React.useState(null);
    const [draft, setDraft] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [folderPath, setFolderPath] = React.useState("");

    const applyDraftFrom = (r) => {
      const c = (r && r.config) || {};
      setDraft({
        platform: c.platform || "auto",
        toolkitDir: c.toolkitDir || "",
        nucleiTemplatesDir: c.nucleiTemplatesDir || "",
        binDirsText: (c.binDirs || []).join("\n"),
        tools: Object.assign({}, c.tools || {}),
        env: Object.assign(
          { FOFA_KEY: "", REDTEAM_VPS_HOST: "", REDTEAM_VPS_KEY: "" },
          c.env || {},
        ),
        notes: c.notes || "",
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
            setErr((r && r.error) || "Ошибка чтения");
            return;
          }
          setErr(null);
          setData(r);
          applyDraftFrom(r);
        },
        (e) => {
          setBusy(false);
          setErr(String((e && e.message) || e));
        },
      );
    };
    React.useEffect(load, [refreshKey]);

    const save = () => {
      if (!draft) return;
      setBusy(true);
      setMsg(null);
      const config = {
        platform: draft.platform,
        toolkitDir: draft.toolkitDir,
        nucleiTemplatesDir: draft.nucleiTemplatesDir,
        binDirs: String(draft.binDirsText || "")
          .split(/\r?\n/)
          .map((x) => x.trim())
          .filter(Boolean),
        tools: draft.tools,
        env: draft.env,
        notes: draft.notes,
        envAdaptConfigured: true,
        envAdaptSkip: false,
      };
      api({ op: "platformConfigSave", config }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка сохранения" });
            return;
          }
          setData(r);
          setMsg({
            ok:
              "Сохранено в " +
              ((r.config && r.config.path) || "$DSH_HOME/redteam/config.json"),
          });
          applyDraftFrom(r);
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };

    const assignFolder = () => {
      const dir = String(
        folderPath || (draft && draft.toolkitDir) || "",
      ).trim();
      if (!dir) {
        setMsg({ err: "Сначала укажите путь к папке с инструментами" });
        return;
      }
      setBusy(true);
      setMsg(null);
      api({ op: "platformAssignToolkit", dir }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка автоназначения" });
            return;
          }
          setData(r);
          applyDraftFrom(r);
          setMsg({
            ok:
              "Назначено из папки: " +
              (r.assignedCount || 0) +
              " инструментов" +
              (r.nucleiTemplatesDir ? ", распознан nuclei-templates" : ""),
          });
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };

    const setTool = (id, value) =>
      setDraft((d) =>
        d
          ? Object.assign({}, d, {
              tools: Object.assign({}, d.tools, { [id]: value }),
            })
          : d,
      );
    const setEnv = (key, value) =>
      setDraft((d) =>
        d
          ? Object.assign({}, d, {
              env: Object.assign({}, d.env, { [key]: value }),
            })
          : d,
      );

    const runtime = (data && data.runtime) || {};
    const adapt = (data && data.adapt) || {};
    const tools = (data && data.tools && data.tools.items) || [];
    const found = tools.filter((t) => t.path).length;
    const defaultToolkit =
      (data && data.toolkitDir) || "$DSH_HOME/redteam/toolkit";
    const defaultNuclei =
      (data && data.nucleiTemplatesDir) || defaultToolkit + "/nuclei-templates";

    return h(
      "div",
      { className: "rt-main" },
      h(
        "div",
        { className: "rt-toolbar" },
        h("span", { style: { fontWeight: 600 } }, "Адаптация окружения"),
        h(
          "span",
          { className: "rt-tag" },
          runtime.effective === "windows" ? "Windows" : "Linux/Kali",
        ),
        adapt.kali
          ? h("span", { className: "rt-tag rt-tag-live" }, "Kali")
          : null,
        h(
          "span",
          {
            className:
              "rt-tag" + (adapt.ready ? " rt-tag-live" : " rt-tag-warn"),
          },
          adapt.ready ? "Готово · " + (adapt.reason || "") : "Требует настройки",
        ),
        h(
          "span",
          { className: "rt-tag" + (found ? " rt-tag-live" : " rt-tag-warn") },
          "Инструментов " + found + "/" + tools.length,
        ),
        h("div", { className: "rt-spacer" }),
        h(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "Чтение…" : "Обновить",
        ),
        h(
          "button",
          {
            className: "rt-btn rt-btn-primary",
            disabled: busy || !draft,
            onClick: save,
          },
          "Сохранить",
        ),
      ),
      h(
        "div",
        { className: "rt-pane", style: { minHeight: 0 } },
        err ? h("div", { className: "rt-err" }, err) : null,
        msg
          ? h(
              "div",
              { className: msg.err ? "rt-err" : "rt-foot" },
              msg.err || msg.ok,
            )
          : null,
        h(
          "div",
          {
            className: "rt-card",
            style: { margin: "0 0 8px", fontSize: 12, lineHeight: 1.6 },
          },
          adapt.message ||
            "Все поля необязательны: пусто — используются пути по умолчанию и автопоиск. Заполненное перекрывает дефолт. Ключи нужны только для карты активов и reverse shell.",
        ),
        h(
          "div",
          {
            className: "rt-card",
            style: { margin: "0 0 8px", fontSize: 12, lineHeight: 1.6 },
          },
          h(
            "div",
            { style: { fontWeight: 600, marginBottom: 6 } },
            "Каталог с набором → автоназначение инструментов",
          ),
          h(
            "div",
            { style: { marginBottom: 8, opacity: 0.9 } },
            "Если все инструменты в одной папке (включая подкаталоги), укажите путь и нажмите «Автоназначение»: путь запишется в toolkitDir, а nmap / nuclei / fscan и прочие подставятся ниже по именам файлов.",
          ),
          h(
            "div",
            { style: { display: "flex", gap: 8, alignItems: "center" } },
            h("input", {
              className: "rt-input",
              style: { flex: 1 },
              placeholder: "например D:\\pentest-tools или /opt/toolkit",
              value: folderPath,
              onChange: (e) => setFolderPath(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") assignFolder();
              },
            }),
            h(
              "button",
              {
                className: "rt-btn rt-btn-primary",
                disabled: busy,
                onClick: assignFolder,
              },
              busy ? "Сканирование…" : "Автоназначение",
            ),
          ),
        ),
        data && data.hint
          ? h(
              "div",
              {
                className: "rt-card",
                style: { margin: "0 0 8px", fontSize: 12, lineHeight: 1.6 },
              },
              data.hint,
            )
          : null,
        data && data.egress
          ? h(
              "div",
              {
                className: "rt-card",
                style: { margin: "0 0 8px", fontSize: 12, lineHeight: 1.55 },
              },
              h(
                "div",
                { style: { fontWeight: 600, marginBottom: 6 } },
                "Состояние выхода в сеть (по мотивам egress в Z3r0, только чтение)",
              ),
              h(
                "div",
                { className: "rt-mono", style: { fontSize: 11 } },
                "HTTP_PROXY=" + (data.egress.http_proxy || "(пусто)"),
              ),
              h(
                "div",
                { className: "rt-mono", style: { fontSize: 11 } },
                "HTTPS_PROXY=" + (data.egress.https_proxy || "(пусто)"),
              ),
              h(
                "div",
                { className: "rt-mono", style: { fontSize: 11 } },
                "ALL_PROXY=" + (data.egress.all_proxy || "(пусто)"),
              ),
              h(
                "div",
                { className: "rt-mono", style: { fontSize: 11 } },
                "NO_PROXY=" + (data.egress.no_proxy || "(пусто)"),
              ),
              h(
                "div",
                { style: { marginTop: 6, opacity: 0.85 } },
                data.egress.note || "",
              ),
            )
          : null,
        !draft
          ? h("div", { className: "rt-empty" }, "Загрузка…")
          : h(
              "div",
              null,
              h(
                "div",
                { className: "rt-card" },
                h("h4", null, "Платформа и каталоги"),
                h(
                  "div",
                  { style: { display: "grid", gap: 8 } },
                  h(
                    "label",
                    { style: { fontSize: 12 } },
                    "Режим платформы",
                    h(
                      "select",
                      {
                        className: "rt-input",
                        style: {
                          display: "block",
                          width: "100%",
                          marginTop: 4,
                        },
                        value: draft.platform,
                        onChange: (e) =>
                          setDraft(
                            Object.assign({}, draft, {
                              platform: e.target.value,
                            }),
                          ),
                      },
                      h("option", { value: "auto" }, "auto (по текущей машине, по умолчанию)"),
                      h("option", { value: "windows" }, "windows"),
                      h("option", { value: "linux" }, "linux"),
                    ),
                  ),
                  h(
                    "label",
                    { style: { fontSize: 12 } },
                    "Каталог инструментов toolkitDir (пусто = по умолчанию)",
                    h("input", {
                      className: "rt-input",
                      style: { display: "block", width: "100%", marginTop: 4 },
                      placeholder: "По умолчанию: " + defaultToolkit,
                      value: draft.toolkitDir,
                      onChange: (e) =>
                        setDraft(
                          Object.assign({}, draft, {
                            toolkitDir: e.target.value,
                          }),
                        ),
                    }),
                  ),
                  h(
                    "label",
                    { style: { fontSize: 12 } },
                    "Каталог шаблонов nuclei (пусто = авто: toolkit/nuclei-templates)",
                    h("input", {
                      className: "rt-input",
                      style: { display: "block", width: "100%", marginTop: 4 },
                      placeholder: "По умолчанию: " + defaultNuclei,
                      value: draft.nucleiTemplatesDir,
                      onChange: (e) =>
                        setDraft(
                          Object.assign({}, draft, {
                            nucleiTemplatesDir: e.target.value,
                          }),
                        ),
                    }),
                  ),
                  h(
                    "label",
                    { style: { fontSize: 12 } },
                    "Каталоги поиска инструментов binDirs (пусто = только toolkit + PATH; по одному в строке)",
                    h("textarea", {
                      className: "rt-input",
                      rows: 4,
                      style: {
                        display: "block",
                        width: "100%",
                        marginTop: 4,
                        fontFamily: "var(--dsw-font-mono, monospace)",
                      },
                      placeholder:
                        "Необязательно. Например: " +
                        String.fromCharCode(10) +
                        "D:\\tools" +
                        String.fromCharCode(10) +
                        "D:\\pentest-bin",
                      value: draft.binDirsText,
                      onChange: (e) =>
                        setDraft(
                          Object.assign({}, draft, {
                            binDirsText: e.target.value,
                          }),
                        ),
                    }),
                  ),
                ),
              ),
              h(
                "div",
                { className: "rt-card" },
                h("h4", null, "Ключи и VPS (пусто = не перекрывать; приоритет у переменных окружения процесса)"),
                h(
                  "div",
                  { style: { display: "grid", gap: 8 } },
                  ["FOFA_KEY", "REDTEAM_VPS_HOST", "REDTEAM_VPS_KEY"].map((k) =>
                    h(
                      "label",
                      { key: k, style: { fontSize: 12 } },
                      k + " (необязательно)",
                      h("input", {
                        className: "rt-input",
                        style: {
                          display: "block",
                          width: "100%",
                          marginTop: 4,
                        },
                        type: k === "FOFA_KEY" ? "password" : "text",
                        placeholder:
                          k === "REDTEAM_VPS_KEY"
                            ? "Пусто; при необходимости укажите абсолютный путь к приватному ключу"
                            : k === "REDTEAM_VPS_HOST"
                              ? "Пусто; при необходимости укажите user@host"
                              : "Пусто; заполните при работе с картой активов",
                        value: (draft.env && draft.env[k]) || "",
                        onChange: (e) => setEnv(k, e.target.value),
                      }),
                    ),
                  ),
                ),
              ),
              h(
                "div",
                { className: "rt-card" },
                h("h4", null, "Исполняемые файлы инструментов (пусто = автопоиск)"),
                h(
                  "div",
                  {
                    style: {
                      fontSize: 11.5,
                      color: "var(--dsw-alias-label-secondary)",
                      marginBottom: 8,
                    },
                  },
                  "Порядок разбора: абсолютный путь из этой таблицы → toolkitDir → binDirs → PATH. Пустое поле означает поиск по умолчанию.",
                ),
                tools.map((t) =>
                  h(
                    "div",
                    { key: t.id, style: { marginBottom: 8 } },
                    h(
                      "div",
                      {
                        style: {
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                          marginBottom: 4,
                        },
                      },
                      h(
                        "span",
                        { style: { fontWeight: 600, minWidth: 88 } },
                        t.label || t.id,
                      ),
                      t.path
                        ? h(
                            "span",
                            { className: "rt-tag rt-tag-live", title: t.path },
                            t.source + " · найден",
                          )
                        : h(
                            "span",
                            { className: "rt-tag rt-tag-warn" },
                            "Не найден (можно оставить пустым до установки)",
                          ),
                    ),
                    h("input", {
                      className: "rt-input",
                      style: { width: "100%" },
                      placeholder:
                        "Пусто — найдём сами: " +
                        (t.names || []).slice(0, 3).join(" / "),
                      value: (draft.tools && draft.tools[t.id]) || "",
                      onChange: (e) => setTool(t.id, e.target.value),
                    }),
                    t.path
                      ? h(
                          "div",
                          {
                            className: "rt-mono",
                            style: {
                              fontSize: 10.5,
                              marginTop: 2,
                              opacity: 0.8,
                            },
                          },
                          t.path,
                        )
                      : null,
                  ),
                ),
              ),
              h(
                "div",
                { className: "rt-card" },
                h("h4", null, "Примечание"),
                h("textarea", {
                  className: "rt-input",
                  rows: 3,
                  style: { width: "100%" },
                  placeholder: "Необязательно. Например: инструменты из портативного набора",
                  value: draft.notes,
                  onChange: (e) =>
                    setDraft(
                      Object.assign({}, draft, { notes: e.target.value }),
                    ),
                }),
              ),
              h(
                "div",
                { className: "rt-foot" },
                h(
                  "span",
                  null,
                  "Файл конфигурации: " +
                    ((data && data.config && data.config.path) ||
                      "$DSH_HOME/redteam/config.json") +
                    " | пустые поля используют значения по умолчанию",
                ),
              ),
            ),
      ),
    );
  }

  /* ---------------------------------------------------------- Цели начисления */
  function ScoreTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [openId, setOpenId] = React.useState(null);
    const [form, setForm] = React.useState(null);
    const [msg, setMsg] = React.useState(null);

    const load = () => {
      if (!eng) return;
      setBusy(true);
      api({ op: "scores", engagement: eng }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Ошибка чтения");
            return;
          }
          setErr(null);
          setData(r);
        },
        (e) => {
          setBusy(false);
          setErr(String((e && e.message) || e));
        },
      );
    };
    React.useEffect(load, [eng, refreshKey]);

    /* builtin нужно донести до формы: баллы/название/правило встроенного пункта начисления зафиксированы «Правилами начисления»,
         поэтому поля в интерфейсе нужно задизейблить и объяснить причину —— раньше было «можно менять, пишет «сохранено», после обновления возвращается»,
         и пользователь думал, что это баг. */
    const startEdit = (p) =>
      setForm({
        id: p.id,
        name: p.name,
        category: p.category || "",
        points: p.points,
        description: p.description || "",
        enabled: p.enabled,
        builtin: p.builtin === true,
        src: p.src,
        cap: p.cap,
        rule: p.rule,
      });
    const startNew = () => {
      setForm({
        name: "",
        category: "",
        points: 10,
        description: "",
        enabled: true,
        builtin: false,
      });
      setMsg(null);
    };
    const setField = (k, v) => setForm((f) => Object.assign({}, f, { [k]: v }));

    const save = () => {
      if (!form || !form.name) {
        setMsg({ err: "Название не может быть пустым" });
        return;
      }
      setBusy(true);
      setMsg(null);
      api({ op: "saveScorePoint", engagement: eng, point: form }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка сохранения" });
            return;
          }
          /* overridden === false означает, что бэкенд **не принял** переданные баллы (встроенный пункт зафиксирован правилами).
             Здесь нельзя просто сказать «сохранено» —— это убедит пользователя, что баллы изменены. */
          if (r.overridden === false) {
            setMsg({
              err:
                "Сохранено «используется/отключено». Баллы не изменены: это встроенный пункт начисления из «Правил начисления», " +
                "баллы / лимит / правило начисления зафиксированы (лимит одного правила считается по всем пунктам группы, " +
                "и отдельное изменение баллов позволит одному попаданию съесть лимит всей группы). Для своих баллов используйте «+ Добавить пункт начисления».",
            });
          } else {
            setMsg({ ok: r.note || "Сохранено" });
          }
          setForm(null);
          load();
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
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
            setMsg({ err: (r && r.error) || "Ошибка удаления" });
            return;
          }
          setMsg({ ok: "Удалено" });
          setForm(null);
          setOpenId(null);
          load();
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };

    const summary = (data && data.summary) || {
      achievedPoints: 0,
      pointCount: 0,
      hitPointCount: 0,
      hitCount: 0,
      selfCreatedHits: 0,
      serviceCappedHits: 0,
    };
    const items = (data && data.items) || [];

    /* Отрисовка по 8 категориям объединённой версии (на бэкенде ruleGroups уже отсортированы, внутри группы по возрастанию баллов).
         Совместимость: если бэкенд не отдал ruleGroups (старый host), откатываемся к плоскому списку. */
    const groups =
      data && data.ruleGroups && data.ruleGroups.length
        ? data.ruleGroups
        : [
            {
              key: "all",
              name: "",
              capSum: 0,
              points: 0,
              counted: 0,
              tiers: items,
            },
          ];
    const rows = [];
    for (const g of groups) {
      if (g.name) {
        rows.push(
          h(
            "div",
            { key: "g-" + g.key, className: "rt-score-group" },
            h("span", null, g.name),
            h(
              "span",
              { className: "rt-sg-sub" },
              g.tiers.length +
                " шт." +
                (g.capSum > 0
                  ? " · сумма лимитов по пунктам " +
                    g.capSum +
                    " баллов (пункты независимы, между ними не суммируется)"
                  : ""),
            ),
            h("div", { className: "rt-spacer" }),
            g.points > 0
              ? h(
                  "span",
                  { className: "rt-tag rt-tag-active" },
                  "+" + g.points + " баллов",
                )
              : null,
          ),
        );
      }
      for (const p of g.tiers) {
        const achieved = p.hits.length > 0;
        const open = openId === p.id;
        rows.push(
          h(
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
              },
            },
            h("span", { className: "rt-sec-caret" }, open ? "▾" : "▸"),
            h(
              "span",
              null,
              h(
                "span",
                {
                  className: achieved
                    ? "rt-pri rt-pri-high"
                    : "rt-pri rt-pri-low",
                  style: achieved
                    ? {}
                    : {
                        background: "var(--dsw-alias-bg-layer-2)",
                        color: "var(--dsw-alias-label-secondary)",
                      },
                },
                p.points + " баллов",
              ),
            ),
            h(
              "span",
              { title: p.description || "" },
              p.name,
              p.tier
                ? h("span", { className: "rt-scope" }, " " + p.tier)
                : null,
            ),
            /* Попадания и лимит: сколько раз учтён этот пункт и насколько использован лимит (в G3 лимиты по пунктам независимы, при достижении потолка начисления прекращаются) */
            h(
              "span",
              {
                title:
                  p.capped > 0
                    ? "Учтено " +
                      p.counted +
                      " раз, ещё " +
                      p.capped +
                      " записей не начислены из-за «" +
                      (p.scope_label || "правило начисления") +
                      "» или из-за достигнутого лимита"
                    : p.scope_label || "",
              },
              h(
                "span",
                { className: "rt-sec-count" },
                p.hits.length > 0 ? p.counted + " попаданий" : "Нет попаданий",
              ),
              p.cap > 0
                ? h(
                    "span",
                    { className: "rt-scope" },
                    " лимит " +
                      (p.cap_used === null ? 0 : p.cap_used) +
                      "/" +
                      p.cap,
                  )
                : null,
            ),
            h(
              "span",
              { style: { textAlign: "right" } },
              p.earned > 0
                ? h(
                    "span",
                    { className: "rt-tag rt-tag-active" },
                    "+" + p.earned + " баллов",
                  )
                : h(
                    "span",
                    { style: { color: "var(--dsw-alias-label-secondary)" } },
                    "—",
                  ),
            ),
          ),
        );
        if (!open) continue;
        /* Записи попаданий: одна строка на запись —— в первой строке «номер + актив + время + копирование», содержимое — отдельной строкой с переносом */
        const hitNodes = p.hits.map((hh, hi) =>
          h(
            "div",
            {
              key: "h" + hh.id,
              className:
                "rt-hit-row" +
                (hh.self_created ? " self-created" : "") +
                (hh.capped ? " service-capped" : ""),
            },
            h("span", { className: "rt-hit-idx" }, String(hi + 1)),
            h(
              "span",
              {
                className: "rt-hit-asset",
                title: hh.target || hh.asset_ip || "",
              },
              hh.asset_ip || hh.target || "Актив не указан",
            ),
            hh.self_created
              ? h(
                  "span",
                  {
                    className: "rt-tag rt-tag-warn",
                    title: "Самостоятельно зарегистрированные/созданные учётные записи не дают баллов за доступ, это только запись процесса",
                  },
                  "Своё · без баллов",
                )
              : null,
            hh.capped
              ? h(
                  "span",
                  {
                    className: "rt-tag rt-tag-warn",
                    title:
                      hh.capped_reason ||
                      "По одному активу и порту учитывается только запись с наибольшими баллами, эта не начисляется",
                  },
                  "Сервис взят полностью · без баллов" +
                    (hh.service ? "(" + hh.service + ")" : ""),
                )
              : null,
            hh.shot_count
              ? h(
                  "span",
                  {
                    className: "rt-tag",
                    title: "У этого попадания есть скриншоты доказательств (раскройте пункт начисления, чтобы увидеть типовой)",
                  },
                  "Скриншотов " + hh.shot_count,
                )
              : null,
            h("span", { className: "rt-hit-time" }, fmt(hh.recorded_at)),
            h(
              "button",
              {
                className: "rt-btn",
                style: { padding: "0 5px", fontSize: 10.5 },
                title: "Скопировать эту запись",
                onClick: (e) => {
                  e.stopPropagation();
                  copyText(
                    (hh.asset_ip || hh.target || "") +
                      "  " +
                      (hh.evidence || ""),
                  );
                },
              },
              "Копировать",
            ),
            hh.evidence
              ? h(
                  "span",
                  { className: "rt-hit-txt", title: hh.evidence },
                  String(hh.evidence).replace(/\n+/g, " "),
                )
              : h(
                  "span",
                  { className: "rt-hit-txt none" },
                  "Логин и пароль / результат не указаны",
                ),
          ),
        );
        rows.push(
          h(
            "div",
            {
              key: "spd" + p.id,
              className: "rt-score-row",
              style: { cursor: "default", gridTemplateColumns: "1fr" },
            },
            h(
              "div",
              { className: "rt-score-detail" },
              p.description
                ? h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Условие начисления"),
                    h("span", null, p.description),
                  )
                : null,
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Статус"),
                h(
                  "span",
                  null,
                  (p.enabled ? "Включён" : "Отключён") +
                    " · " +
                    p.points +
                    " баллов/раз · попаданий " +
                    p.hits.length +
                    " = " +
                    p.earned +
                    " баллов" +
                    (p.self_created
                      ? " (ещё " + p.self_created + " своих без баллов)"
                      : "") +
                    (p.capped
                      ? " (ещё " + p.capped + " повторных попаданий по тому же сервису без баллов)"
                      : ""),
                ),
              ),
              p.capped
                ? h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Лимит сервиса"),
                    h(
                      "span",
                      null,
                      p.service_summary +
                        "; права учётной записи и права на БД по одному активу и порту считаются один раз: получили самую привилегированную учётную запись — сервис взят полностью",
                    ),
                  )
                : null,
              p.hits.length
                ? h(
                    "div",
                    null,
                    h(ShotStrip, {
                      eng: eng,
                      shots: p.shots,
                      total: p.shot_total,
                      title:
                        "Скриншоты доказательств · " +
                        (p.shot_total || (p.shots || []).length) +
                        " шт.",
                    }),
                    h(
                      "div",
                      {
                        className: "rt-section",
                        style: { padding: "6px 0 0" },
                      },
                      "Записи попаданий · " +
                        p.hits.length +
                        " (только актив и логин с паролем, подробное воспроизведение — в отчёте)",
                    ),
                    h("div", { className: "rt-hits" }, hitNodes),
                  )
                : h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Записи попаданий"),
                    h(
                      "span",
                      { style: { color: "var(--dsw-alias-label-secondary)" } },
                      "Пока нет —— получив результат, зафиксируйте его через redteam_score_hit: актив цели + полученные логин/пароль или права",
                    ),
                  ),
              h(
                "div",
                { className: "rt-actions" },
                h(
                  "button",
                  {
                    className: "rt-btn",
                    onClick: (e) => {
                      e.stopPropagation();
                      startEdit(p);
                    },
                  },
                  "Изменить",
                ),
              ),
            ),
          ),
        );
      }
    }

    return h(
      "div",
      { className: "rt-main" },
      h(
        "div",
        { className: "rt-toolbar" },
        h("span", { style: { fontWeight: 600 } }, "Цели начисления"),
        /* Показываем только уже набранные баллы, без целевого значения и без полосы прогресса */
        h(
          "span",
          {
            style: {
              fontSize: 13,
              color: "var(--dsw-alias-label-secondary)",
              marginLeft: 4,
            },
          },
          "Всего баллов",
        ),
        h("span", { className: "rt-total" }, String(summary.achievedPoints)),
        h(
          "span",
          {
            style: { fontSize: 13, color: "var(--dsw-alias-label-secondary)" },
          },
          "баллов",
        ),
        h("span", { className: "rt-tag" }, summary.pointCount + " пунктов начисления"),
        h(
          "span",
          { className: "rt-tag" },
          "Попаданий " + summary.countedHits + "",
        ),
        summary.selfCreatedHits
          ? h(
              "span",
              {
                className: "rt-tag rt-tag-warn",
                title:
                  "Самостоятельно зарегистрированные/созданные учётные записи не дают баллов за доступ, это только запись процесса (без баллов, не расходует лимит, не идёт в отчёт)",
              },
              "Свои без баллов: " + summary.selfCreatedHits,
            )
          : null,
        summary.serviceCappedHits
          ? h(
              "span",
              {
                className: "rt-tag rt-tag-warn",
                title:
                  "Права учётной записи и права на БД по одному активу и порту считаются один раз: сервис взят полностью, эти повторные попадания баллов не дают (только фиксация)",
              },
              "Сервис взят полностью, без баллов: " + summary.serviceCappedHits,
            )
          : null,
        h("div", { className: "rt-spacer" }),
        h("button", { className: "rt-btn", onClick: startNew }, "+ Добавить пункт начисления"),
        h(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "Обновление…" : "Обновить",
        ),
      ),
      msg
        ? h(
            "div",
            { className: msg.err ? "rt-err" : "rt-foot" },
            msg.err || msg.ok,
          )
        : null,
      err ? h("div", { className: "rt-err" }, err) : null,
      form
        ? h(
            "div",
            {
              className: "rt-pane",
              style: {
                flex: "none",
                borderBottom: "1px solid var(--dsw-alias-border-l1)",
              },
            },
            /* Встроенный пункт начисления (builtin): баллы / название / категория зафиксированы «Правилами начисления», поля задизейблены.
             Менять можно только «используется / отключено». Так в интерфейсе больше не будет путаницы «изменил, пишет «сохранено», после обновления вернулось». */
            form.builtin
              ? h(
                  "div",
                  { className: "rt-hint", style: { marginBottom: 8 } },
                  h(
                    "b",
                    null,
                    "Встроенный пункт начисления (из «Правил начисления за прорыв и вторжение (объединённая версия)»)",
                  ),
                  h(
                    "div",
                    { style: { marginTop: 3 } },
                    "Баллы, лимит, правило начисления и название зафиксированы правилами —— лимит одного правила считается по всем пунктам группы, " +
                      "и отдельное изменение баллов позволит одному попаданию съесть лимит всей группы. Здесь можно менять только «используется / отключено»; " +
                      "для своих баллов вернитесь на предыдущий экран и нажмите «+ Добавить пункт начисления».",
                  ),
                  form.src !== null && form.src !== undefined
                    ? h(
                        "div",
                        {
                          style: {
                            marginTop: 3,
                            color: "var(--dsw-alias-label-secondary)",
                          },
                        },
                        "Номер пункта в правилах " +
                          form.src +
                          (form.rule ? " · группа лимита rule=" + form.rule : "") +
                          (form.cap > 0
                            ? " · лимит " + form.cap + " баллов"
                            : " · без лимита"),
                      )
                    : null,
                )
              : null,
            h(
              "div",
              { className: "rt-score-form" },
              h("input", {
                className: "rt-input",
                placeholder: "Название (обязательно)",
                value: form.name,
                readOnly: form.builtin === true,
                title: form.builtin ? "Название встроенного пункта начисления зафиксировано правилами" : "",
                onChange: (e) => setField("name", e.target.value),
              }),
              h("input", {
                className: "rt-input",
                placeholder: "Категория, например «права учётной записи»",
                value: form.category,
                readOnly: form.builtin === true,
                title: form.builtin
                  ? "Категория встроенного пункта зафиксирована правилами (определяет, в какую группу панели он попадает)"
                  : "",
                onChange: (e) => setField("category", e.target.value),
              }),
              h("input", {
                className: "rt-input",
                type: "number",
                placeholder: "Баллы за раз",
                readOnly: form.builtin === true,
                title: form.builtin
                  ? "Баллы встроенного пункта зафиксированы «Правилами начисления» и здесь не меняются"
                  : ": баллы за одно попадание этого типа; каждое попадание прибавляет их (в пределах лимита правила)",
                value: form.points,
                onChange: (e) => setField("points", Number(e.target.value)),
              }),
              h(
                "select",
                {
                  className: "rt-input",
                  value: form.enabled ? "1" : "0",
                  onChange: (e) => setField("enabled", e.target.value === "1"),
                },
                h("option", { value: "1" }, "Включён"),
                h("option", { value: "0" }, "Отключён"),
              ),
            ),
            h("input", {
              className: "rt-input",
              style: {
                width: "100%",
                marginBottom: 6,
                boxSizing: "border-box",
              },
              placeholder: "Описание условия начисления",
              value: form.description,
              readOnly: form.builtin === true,
              title: form.builtin ? "Текст пункта встроенного начисления зафиксирован правилами" : "",
              onChange: (e) => setField("description", e.target.value),
            }),
            h(
              "div",
              { className: "rt-actions" },
              h(
                "button",
                {
                  className: "rt-btn rt-btn-primary",
                  disabled: busy,
                  onClick: save,
                },
                "Сохранить",
              ),
              form.id
                ? form.builtin
                  ? h(
                      "button",
                      {
                        className: "rt-btn",
                        disabled: true,
                        title:
                          "Встроенный пункт нельзя удалить: панель потеряет правило, а отчёт — класс результатов (при следующем запуске он всё равно восстановится). Чтобы он не участвовал в начислении, используйте «Отключён».",
                      },
                      "Удалить (встроенные не удаляются)",
                    )
                  : h(
                      "button",
                      { className: "rt-btn", disabled: busy, onClick: remove },
                      "Удалить",
                    )
                : null,
              h(
                "button",
                { className: "rt-btn", onClick: () => setForm(null) },
                "Отмена",
              ),
            ),
          )
        : null,
      h(
        "div",
        { className: "rt-table" },
        h(
          "div",
          { className: "rt-score-row head" },
          h("span", null, ""),
          h("span", null, "Баллы"),
          h("span", null, "Пункты начисления (по возрастанию баллов)"),
          h("span", null, "Попадания / лимит"),
          h("span", { style: { textAlign: "right" } }, "Набрано"),
        ),
        rows,
        !items.length
          ? h(
              "div",
              { className: "rt-empty" },
              "Пунктов начисления пока нет, нажмите «Добавить пункт начисления» справа сверху",
            )
          : null,
      ),
    );
  }

  /* ---------------------------------------------------------- Основа сворачивания */
  /**
   * Состояние сворачивания сохраняется в localStorage по «вкладка + цель» и не меняется при переключении вкладок и обновлении страницы.
   * Запоминаем только ключи, которые пользователь явно переключал; для остальных используется значение по умолчанию от вызывающей стороны.
   */
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
      /* Приватный режим и т.п. */
    }
  };

  /** Один хук на вкладку: isOpen(key, defaultOpen) / toggle(key, defaultOpen) / setAll(keys, open) */
  function useCollapse(prefix) {
    const [state, setState] = React.useState(() => collapseLoad(prefix));
    React.useEffect(() => {
      setState(collapseLoad(prefix));
    }, [prefix]);
    const write = (next) => {
      collapseSave(prefix, next);
      setState(next);
    };
    const isOpen = (key, defaultOpen) => {
      const v = state[key];
      return v === undefined ? defaultOpen !== false : v === true;
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
    return { isOpen: isOpen, toggle: toggle, setAll: setAll };
  }

  /**
   * Единый заголовок сворачивания (L1): ▾ всегда слева, название жирным, счётчик сразу за ним, справа время или действия,
   * содержимое с отступом 12px и вертикальной направляющей. always=true означает "всегда показан" (не сворачивается).
   */
  function Section(props) {
    const always = props.always === true;
    const open = always || props.open === true;
    const head = h(
      "div",
      {
        className:
          "rt-sec t-" + (props.tone || "target") + (always ? " flat" : ""),
        role: always ? undefined : "button",
        tabIndex: always ? undefined : 0,
        "aria-expanded": always ? undefined : open ? "true" : "false",
        onClick: always ? undefined : props.onToggle,
        onKeyDown: always
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (props.onToggle) props.onToggle(e);
              }
            },
      },
      h("span", { className: "rt-sec-caret" }, always ? "▍" : open ? "▾" : "▸"),
      props.title
        ? h("span", { className: "rt-sec-title" }, props.title)
        : null,
      props.count !== undefined && props.count !== null
        ? h("span", { className: "rt-sec-count" }, String(props.count))
        : null,
      props.sub ? h("span", { className: "rt-sec-sub" }, props.sub) : null,
      props.right
        ? h("span", { className: "rt-sec-right" }, props.right)
        : null,
    );
    return h(
      "div",
      { className: "rt-sec-wrap" },
      head,
      open && props.children
        ? h("div", { className: "rt-sec-body" }, props.children)
        : null,
    );
  }

  /** Сворачивание длинного текста (L3): фиксированная высота превью + затухание + раскрыть/скопировать. */
  function Clip(props) {
    const [open, setOpen] = React.useState(false);
    const text = String(
      props.text === undefined || props.text === null ? "" : props.text,
    );
    if (text.trim() === "") return null;
    return h(
      "div",
      { className: "rt-clip" + (open ? " open" : "") },
      h(
        "div",
        { className: "rt-clip-head" },
        props.label
          ? h("span", { className: "rt-clip-label" }, props.label)
          : null,
        h("div", { className: "rt-spacer" }),
        h(
          "button",
          {
            className: "rt-btn",
            style: { padding: "0 6px", fontSize: 11 },
            onClick: (e) => {
              e.stopPropagation();
              copyText(text);
            },
          },
          "Копировать",
        ),
        h(
          "button",
          {
            className: "rt-btn",
            style: { padding: "0 6px", fontSize: 11 },
            onClick: (e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            },
          },
          open ? "Свернуть" : "Развернуть",
        ),
      ),
      h("div", { className: "rt-clip-body" }, text),
    );
  }

  /* ---------------------------------------------------------- Текущее тестирование (в реальном времени) */
  const TEST_STATUS_LABEL = {
    untested: "Не тестировался",
    testing: "Тестируется",
    tested: "Протестирован",
    blocked: "Заблокирован",
    abandoned: "Заброшен",
    no_surface: "Нет поверхности атаки",
  };

  /**
   * Страница текущего тестирования: какую машину агент бьёт сейчас, на каком шаге он, что ещё в очереди.
   * Автообновление опросом каждые 5 секунд; три блока сворачиваются, но «Сейчас в работе» всегда развёрнут полностью.
   */
  function TestingTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [at, setAt] = React.useState(null);
    const [auto, setAuto] = React.useState(true);
    /* Состояние сворачивания запоминается по «вкладка + цель»; «Сейчас в работе» всегда показан и в сворачивании не участвует */
    const collapse = useCollapse("testing:" + eng);

    /* Для 5-секундного опроса нужен guard на летящие запросы: при медленной сети или зависшем бэкенде они копятся,
         а запоздавший ответ перезаписывает новое состояние (в интерфейсе цифры прыгают туда-сюда). */
    const inflight = React.useRef(false);
    const seq = React.useRef(0);
    const load = () => {
      if (!eng || inflight.current) return;
      inflight.current = true;
      const my = ++seq.current;
      api({ op: "activeTests", engagement: eng, limit: 20 })
        .then(
          (r) => {
            if (my !== seq.current) return; /* переключили цель: ответ устарел, выбрасываем */
            if (!r || r.ok === false) {
              setErr((r && r.error) || "Ошибка чтения");
              return;
            }
            setErr(null);
            setData(r);
            setAt(new Date());
          },
          (e) => {
            if (my === seq.current) setErr(String((e && e.message) || e));
          },
        )
        .finally(() => {
          if (my === seq.current) inflight.current = false;
        });
    };
    React.useEffect(() => {
      seq.current += 1;
      load();
    }, [eng, refreshKey]);
    React.useEffect(() => {
      if (!eng || !auto) return undefined;
      const timer = setInterval(load, 5000);
      return () => clearInterval(timer);
    }, [eng, auto, refreshKey]);

    const testing = (data && data.testing) || [];
    const recent = (data && data.recent) || [];
    const queue = (data && data.queue) || [];
    const stats = (data && data.stats) || {};

    /* Один актив — одна карточка: сразу видно, «кого бьём, до чего дошли, что взяли» */
    const card = (a, past) => {
      const chips = [];
      chips.push(
        h(
          "span",
          {
            key: "sc",
            className:
              "rt-scope rt-scope-" +
              (a.scope === "internal" ? "internal" : "external"),
          },
          a.scope === "internal" ? "Внутренняя сеть" : "Внешняя сеть",
        ),
      );
      if (a.segment_cidr)
        chips.push(
          h("span", { key: "seg", className: "rt-tag" }, a.segment_cidr),
        );
      if (a.open_ports)
        chips.push(
          h(
            "span",
            { key: "p", className: "rt-tag rt-tag-active" },
            "Открыто портов: " + a.open_ports + "",
          ),
        );
      if (a.vulns)
        chips.push(
          h(
            "span",
            { key: "v", className: "rt-tag rt-tag-live" },
            "Подтверждённых уязвимостей " + a.vulns,
          ),
        );
      if (a.webshells)
        chips.push(
          h(
            "span",
            { key: "w", className: "rt-tag rt-tag-passive" },
            "WebShell " + a.webshells,
          ),
        );
      if (a.tunnels)
        chips.push(
          h(
            "span",
            { key: "t", className: "rt-tag rt-tag-passive" },
            "Туннелей " + a.tunnels,
          ),
        );
      if (a.priority)
        chips.push(
          h("span", { key: "pr", className: "rt-tag" }, "Простота " + a.priority),
        );
      if (a.blocked_count)
        chips.push(
          h(
            "span",
            {
              key: "b",
              className: "rt-tag",
              style: { color: "#ef4444", borderColor: "#ef444455" },
            },
            "Заблокирован " + a.blocked_count + " раз",
          ),
        );
      const noteLines = a.test_notes
        ? String(a.test_notes)
            .split("\n")
            .slice(-3)
            .map((l) => (l.length > 240 ? l.slice(0, 240) + " …" : l))
        : [];
      return h(
        "div",
        { key: "at" + a.id, className: "rt-atest" + (past ? " past" : "") },
        h(
          "div",
          { className: "rt-atest-head" },
          past ? null : h("span", { className: "rt-live-dot" }),
          h("span", { className: "rt-atest-ip" }, a.ip),
          h(
            "span",
            {
              className:
                "rt-tag " + (a.test_status === "testing" ? "rt-tag-live" : ""),
            },
            TEST_STATUS_LABEL[a.test_status] || a.test_status,
          ),
          h("div", { className: "rt-spacer" }),
          h(
            "span",
            {
              style: {
                fontSize: 11,
                color: "var(--dsw-alias-label-secondary)",
              },
            },
            fmt(a.test_updated_at) +
              (a.test_updated_by ? " · " + a.test_updated_by : ""),
          ),
        ),
        chips.length ? h("div", null, chips) : null,
        a.test_surface
          ? h(
              "div",
              { className: "rt-atest-meta" },
              "Поверхность теста: " + a.test_surface,
            )
          : null,
        a.potential
          ? h("div", { className: "rt-atest-meta" }, "Ожидаемые баллы: " + a.potential)
          : null,
        noteLines.length
          ? h(Clip, { label: "Записи тестов", text: noteLines.join("\n") })
          : null,
      );
    };

    const concl = (label, value, tone) =>
      h(
        "span",
        { key: label, className: "rt-concl-i", style: { cursor: "default" } },
        h("b", null, String(value || 0)),
        h("span", null, label),
      );
    const conclusion = h(
      "div",
      { className: "rt-concl" },
      concl("Тестируется", stats.testing, "live"),
      concl("К тесту", stats.untested, ""),
      concl("Протестировано", stats.tested, ""),
      concl("Заброшено", (stats.abandoned || 0) + (stats.blocked || 0), ""),
      concl("Без поверхности атаки", stats.no_surface, ""),
      h("div", { className: "rt-spacer" }),
      at
        ? h(
            "span",
            {
              style: {
                fontSize: 11,
                color: "var(--dsw-alias-label-secondary)",
              },
            },
            "Обновлено " + at.toLocaleTimeString("zh-CN", { hour12: false }),
          )
        : null,
      h(
        "button",
        {
          className: "rt-btn",
          style: { padding: "0 7px", fontSize: 11 },
          title: "Развернуть недавно изменённые и очередь на тест",
          onClick: () =>
            collapse.setAll(
              ["testing:" + eng, "recent:" + eng, "queue:" + eng],
              true,
            ),
        },
        "Развернуть все",
      ),
      h(
        "button",
        {
          className: "rt-btn",
          style: { padding: "0 7px", fontSize: 11 },
          title: "Оставить только то, что в работе",
          onClick: () =>
            collapse.setAll(
              ["testing:" + eng, "recent:" + eng, "queue:" + eng],
              false,
            ),
        },
        "Свернуть все",
      ),
      h(
        "button",
        {
          className: "rt-btn" + (auto ? " rt-btn-primary" : ""),
          style: { padding: "0 7px", fontSize: 11 },
          title: "Автообновление каждые 5 секунд",
          onClick: () => setAuto((x) => !x),
        },
        auto ? "Реальное время · 5s" : "Пауза",
      ),
      h(
        "button",
        {
          className: "rt-btn",
          style: { padding: "0 7px", fontSize: 11 },
          onClick: load,
        },
        "Обновить",
      ),
    );

    const body = [];
    /* Сейчас в работе: всегда показан, полностью развёрнут (не сворачивается) */
    body.push(
      h(
        Section,
        {
          key: "testing",
          tone: "test",
          title: "Сейчас в работе",
          count: testing.length + " хостов",
          sub: testing.length
            ? "эти активы агент бьёт прямо сейчас"
            : "как только агент начнёт тестировать актив, он появится здесь в реальном времени",
          open: collapse.isOpen("testing:" + eng, true),
          onToggle: collapse.toggle("testing:" + eng, true),
        },
        testing.length
          ? testing.map((a) => card(a, false))
          : h(
              "div",
              { className: "rt-atest-meta", style: { paddingBottom: 4 } },
              "Сейчас нет активов в статусе «Тестируется»",
            ),
      ),
    );

    /* Недавно изменённые (по умолчанию свёрнуты, состояние запоминается) */
    body.push(
      h(
        Section,
        {
          key: "recent",
          tone: "past",
          title: "Недавно изменённые",
          count: recent.length + " хостов",
          sub: "активы, которые уже тестировали",
          open: collapse.isOpen("recent:" + eng, false),
          onToggle: collapse.toggle("recent:" + eng, false),
        },
        recent.length
          ? recent.map((a) => card(a, true))
          : h("div", { className: "rt-atest-meta" }, "Пока нет"),
      ),
    );

    /* Очередь на тест (по умолчанию свёрнута, состояние запоминается) */
    body.push(
      h(
        Section,
        {
          key: "queue",
          tone: "queue",
          title: "Очередь на тест",
          count: (data ? data.untested || 0 : 0) + " хостов",
          sub: "порядок удара по простоте атаки и числу портов",
          open: collapse.isOpen("queue:" + eng, false),
          onToggle: collapse.toggle("queue:" + eng, false),
        },
        queue.length
          ? queue
              .map((a) => card(a, true))
              .concat([
                h(
                  "div",
                  {
                    key: "queueHint",
                    className: "rt-atest-meta",
                    style: { paddingTop: 4 },
                  },
                  "Полный список (с фильтрами и сортировкой) — на странице «Карта активов»",
                ),
              ])
          : h("div", { className: "rt-atest-meta" }, "Активов в очереди на тест нет"),
      ),
    );

    return h(
      "div",
      { className: "rt-main" },
      conclusion,
      err ? h("div", { className: "rt-err" }, err) : null,
      data === null && !err
        ? h("div", { className: "rt-empty" }, "Загрузка…")
        : null,
      h(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        h("div", { style: { padding: "6px 12px 14px" } }, body),
      ),
    );
  }

  /* ---------------------------------------------------------- Сессии и входы (WebShell / туннели) */
  /**
   * Самая частая проблема во внутренней сети: получив WebShell или туннель, забывают зарегистрировать его и через время "забывают, что вход ещё доступен".
   * Эта вкладка собирает WebShell и туннели из базы фактов, показывает состояние связности и позволяет одной кнопкой прогнать проверку на стороне host.
   */
  function SessionTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [data, setData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const [copied, setCopied] = React.useState(null);

    const load = () => {
      if (!eng) return;
      api({ op: "sessions", engagement: eng }).then(
        (r) => {
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Ошибка чтения");
            return;
          }
          setErr(null);
          setData(r);
        },
        (e) => setErr(String((e && e.message) || e)),
      );
    };
    React.useEffect(load, [eng, refreshKey]);

    const probe = () => {
      setBusy(true);
      setMsg(null);
      api({ op: "probeSessions", engagement: eng, timeoutMs: 6000 }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка проверки" });
            load();
            return;
          }
          const on = (r.webshells || []).filter(
            (x) => x.status === "online",
          ).length;
          const act = (r.tunnels || []).filter(
            (x) => x.status === "active",
          ).length;
          setMsg({
            ok:
              "Проверка завершена: WebShell онлайн " +
              on +
              "/" +
              (r.webshells || []).length +
              ", туннелей доступно " +
              act +
              "/" +
              (r.tunnels || []).length,
          });
          load();
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };

    /* Кнопка загорается «скопировано» только если текст реально попал в буфер; при ошибке честно сообщаем */
    const copy = (key, text) =>
      copyWithFeedback(text, text, (okFlag, message) => {
        if (!okFlag) {
          setMsg({ err: message });
          return;
        }
        setCopied(key);
        setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
      });

    const markTunnel = (t, status) => {
      setMsg(null);
      api({
        op: "updateTunnel",
        engagement: eng,
        id: t.id,
        patch: { status: status, check_note: "отмечено вручную в интерфейсе" },
      }).then(
        () => load(),
        (e) => setMsg({ err: String((e && e.message) || e) }),
      );
    };
    const markShell = (w, status) => {
      setMsg(null);
      api({
        op: "updateWebshell",
        engagement: eng,
        id: w.id,
        patch: { status: status, check_note: "отмечено вручную в интерфейсе" },
      }).then(
        () => load(),
        (e) => setMsg({ err: String((e && e.message) || e) }),
      );
    };

    const sessCollapse = useCollapse("sessions:" + eng);
    const totals = (data && data.totals) || {};
    const shells = (data && data.webshells) || [];
    const tunnels = (data && data.tunnels) || [];
    const statusDot = (s) =>
      h("span", {
        className:
          s === "online" || s === "active"
            ? "rt-dot-on"
            : s === "unknown" || !s
              ? "rt-dot-unk"
              : "rt-dot-off",
      });
    /* В карточках единые две колонки «метка + значение», длинный текст переносится —— читается легче, чем строка через точки */
    const fact = (label, value) =>
      h(
        "div",
        { className: "rt-sess-fact" },
        h("b", null, label),
        h("span", null, value),
      );
    /* Требования сдачи: шелл должен быть зашифрованным Behinder/Godzilla (иначе пользователь не подключится), а внутренняя сеть — идти через туннель suo5 */
    const isEncryptedShell = (t) =>
      /behinder|godzilla|\u51b0\u874e|\u54e5\u65af\u62c9/i.test(String(t || ""));
    const isSuo5 = (t) => /suo5/i.test(String(t || ""));
    /* Плашка: только один вывод + раскрываемые указания (раньше три длинных абзаца шли подряд, и суть тонула) */
    const hint = (key, title, detail) =>
      h(
        "div",
        { key, className: "rt-hint" },
        h("b", null, title),
        h(
          "details",
          { className: "rt-sess-fold", style: { marginTop: 3 } },
          h("summary", null, "Что делать (клик — раскрыть)"),
          h("div", { style: { marginTop: 4 } }, detail),
        ),
      );
    const hints = [];
    const badShells = shells.filter((w) => !isEncryptedShell(w.shell_type));
    const legitTunnels = tunnels.filter((t) => t.legit === true);
    if (badShells.length > 0) {
      hints.push(
        hint(
          "h1",
          "Входов " +
            badShells.length +
            " не являются шеллом Behinder/Godzilla (пользователь не подключится, это не сдаваемый вход)",
          "Навыком webshell-toolkit залейте заново шелл Behinder (behinder) или Godzilla (godzilla) " +
            "и укажите shell_type + pass_key в redteam_webshell_add. Если вход только для временного транзита, напишите это в примечании.",
        ),
      );
    }
    if (tunnels.length > 0 && legitTunnels.length === 0) {
      hints.push(
        hint(
          "h3",
          "Имеющиеся " +
            tunnels.length +
            ' каналов не считаются "пересечением границы цели" (не прорыв периметра и не прорыв во внутреннюю сеть)',
          "socks5, frp и прокси, поднятые на своём VPS или собственном сервере, туннелем не считаются. Нужен канал, инициируемый со стороны цели: " +
            "reverse shell с цели к нам, запуск frp/Stowaway-клиента на цели или туннель suo5/HTTP через WebShell на цели; при регистрации укажите entry_kind.",
        ),
      );
    }
    const activeSuo5 = tunnels.filter(
      (t) => isSuo5(t.kind) && t.status === "active",
    );
    if (shells.length > 0 && activeSuo5.length === 0) {
      hints.push(
        hint(
          "h2",
          "Нет рабочего туннеля suo5 (стандартного канала во внутреннюю сеть)",
          "Навыком suo5-tunnel поднимите socks5-туннель через WebShell выше, затем зарегистрируйте его через redteam_tunnel_add " +
            "(kind=suo5, listen=127.0.0.1:1080, entry=URL WebShell, reach=доступная подсеть), " +
            "и нажмите «Проверить связность», чтобы убедиться в status=active.",
        ),
      );
    }

    const shellCards = shells.map((w) =>
      h(
        "div",
        { key: "w" + w.id, className: "rt-sess" },
        h(
          "div",
          { className: "rt-sess-head" },
          statusDot(w.status),
          h("span", { className: "rt-sess-title" }, w.url),
          h(
            "span",
            { className: "rt-tag rt-tag-active" },
            w.shell_type || "webshell",
          ),
          isEncryptedShell(w.shell_type)
            ? null
            : h("span", { className: "rt-tag rt-tag-warn" }, "Пользователь не подключится"),
          w.privilege ? h("span", { className: "rt-tag" }, w.privilege) : null,
          h("div", { className: "rt-spacer" }),
          copied === "cmd" + w.id
            ? h(
                "span",
                { className: "rt-tag", style: { color: "#10b981" } },
                "Скопировано",
              )
            : h(
                "button",
                {
                  className: "rt-btn",
                  style: { padding: "0 6px", fontSize: 11 },
                  onClick: () => copy("cmd" + w.id, 'curl -s "' + w.url + '"'),
                },
                "Копировать URL",
              ),
          h(
            "button",
            {
              className: "rt-btn",
              style: { padding: "0 6px", fontSize: 11 },
              onClick: () => markShell(w, "offline"),
            },
            "Отметить нерабочим",
          ),
        ),
        h(
          "div",
          { className: "rt-sess-facts" },
          fact(
            "Тип",
            isEncryptedShell(w.shell_type)
              ? "Зашифрованный шелл (Behinder/Godzilla, пользователь подключается напрямую)"
              : "Незашифрованный шелл —— пользователь не подключится, только для временного транзита",
          ),
          w.pass_key
            ? fact("Пароль подключения", h("span", { className: "rt-mono" }, w.pass_key))
            : null,
          w.asset_ip ? fact("Актив", w.asset_ip) : null,
          w.privilege ? fact("Права", w.privilege) : null,
          w.secret_ref
            ? fact(
                "Ссылка на учётные данные",
                h("span", { className: "rt-mono" }, w.secret_ref),
              )
            : null,
          fact(
            "Последняя проверка",
            (w.last_check ? fmt(w.last_check) : "не проверялось") +
              (w.latency_ms !== null && w.latency_ms !== undefined
                ? "(" + w.latency_ms + "ms)"
                : ""),
          ),
          w.check_note ? fact("Пояснение проверки", w.check_note) : null,
          w.note ? fact("Примечание", w.note) : null,
        ),
      ),
    );

    const tunnelCards = tunnels.map((t) => {
      const proxy = t.listen ? "socks5://" + t.listen : "";
      const gogoCmd = t.listen
        ? "./gogo -i <CIDR внутренней сети> -m ss --ping -p top2,win,db --proxy " + proxy
        : "";
      const fscanCmd = t.listen
        ? "./fscan -h <CIDR внутренней сети> -np -nobr -nopoc -socks5 " +
          t.listen +
          " -o intranet.txt"
        : "";
      return h(
        "div",
        { key: "t" + t.id, className: "rt-sess" },
        h(
          "div",
          { className: "rt-sess-head" },
          statusDot(t.status),
          h(
            "span",
            { className: "rt-sess-title" },
            t.listen || "(адрес прослушивания не указан)",
          ),
          h("span", { className: "rt-tag rt-tag-passive" }, t.kind || "tunnel"),
          isSuo5(t.kind)
            ? null
            : h(
                "span",
                { className: "rt-tag rt-tag-warn" },
                "Не стандартный канал suo5",
              ),
          /* Прорывом считается только канал, пересекающий границу цели (поднятый на своём VPS/сервере — нет) */
          t.legit === true
            ? h(
                "span",
                {
                  className: "rt-tag rt-tag-live",
                  title: t.entry_kind_label || "",
                },
                "Канал со стороны цели",
              )
            : t.legit === false
              ? h(
                  "span",
                  {
                    className: "rt-tag rt-tag-warn",
                    title:
                      "Канал поднят только на своём VPS/собственном сервере и цели не касается —— это не прорыв периметра и не прорыв во внутреннюю сеть",
                  },
                  "Не прорыв",
                )
              : h(
                  "span",
                  {
                    className: "rt-tag",
                    title:
                      "entry_kind не указан: поясните, что находится на стороне цели (target-outbound / target-http / target-agent)",
                  },
                  "К подтверждению",
                ),
          t.reach
            ? h("span", { className: "rt-tag" }, "Доступно " + t.reach)
            : null,
          h("div", { className: "rt-spacer" }),
          h(
            "button",
            {
              className: "rt-btn",
              style: { padding: "0 6px", fontSize: 11 },
              onClick: () => copy("sock" + t.id, t.listen || ""),
            },
            copied === "sock" + t.id ? "Скопировано" : "Копировать адрес",
          ),
          t.status === "active"
            ? h(
                "button",
                {
                  className: "rt-btn",
                  style: { padding: "0 6px", fontSize: 11 },
                  onClick: () => markTunnel(t, "down"),
                },
                "Отметить нерабочим",
              )
            : h(
                "button",
                {
                  className: "rt-btn",
                  style: { padding: "0 6px", fontSize: 11 },
                  onClick: () => markTunnel(t, "active"),
                },
                "Отметить рабочим",
              ),
        ),
        h(
          "div",
          { className: "rt-sess-facts" },
          fact("Вход со стороны цели", t.entry || "не зарегистрирован"),
          fact(
            "Пересечение границы",
            t.legit === true
              ? h(
                  "span",
                  { className: "rt-tag rt-tag-live" },
                  t.entry_kind_label || t.entry_kind || "сторона цели подтверждена",
                )
              : t.legit === false
                ? h(
                    "span",
                    { className: "rt-tag rt-tag-warn" },
                    "Не прорыв (прокси поднят только на своём VPS)",
                  )
                : h(
                    "span",
                    { className: "rt-tag" },
                    "entry_kind не указан, требует подтверждения",
                  ),
          ),
          t.reach ? fact("Доступная подсеть", t.reach) : null,
          t.asset_ip ? fact("Актив", t.asset_ip) : null,
          fact(
            "Последняя проверка",
            (t.last_check ? fmt(t.last_check) : "не проверялось") +
              (t.latency_ms !== null && t.latency_ms !== undefined
                ? "(" + t.latency_ms + "ms)"
                : ""),
          ),
          t.check_note ? fact("Пояснение проверки", t.check_note) : null,
          t.note ? fact("Примечание", t.note) : null,
        ),
        /* Команды по умолчанию свёрнуты: главное в карточке — «работает ли канал и куда ведёт», команды раскрываются по необходимости */
        t.command
          ? h(
              "details",
              { className: "rt-sess-fold" },
              h("summary", null, "Команда создания (клик — раскрыть / скопировать)"),
              h(
                "div",
                Object.assign(
                  { className: "rt-code", title: "Клик — копировать" },
                  clickable(() => copy("c" + t.id, t.command), {
                    label: "Копировать команду",
                  }),
                ),
                copied === "c" + t.id ? "Скопировано" : t.command,
              ),
            )
          : null,
        t.status === "active" && t.listen
          ? h(
              "details",
              { className: "rt-sess-fold" },
              h("summary", null, "Сканировать через этот туннель (команды gogo / fscan)"),
              h(
                "div",
                { className: "rt-sess-cmd" },
                h(
                  "div",
                  Object.assign(
                    { className: "rt-code", title: "Клик — копировать" },
                    clickable(() => copy("g" + t.id, gogoCmd), {
                      label: "Копировать команду gogo",
                    }),
                  ),
                  copied === "g" + t.id ? "Скопировано" : gogoCmd,
                ),
                h(
                  "div",
                  Object.assign(
                    {
                      className: "rt-code",
                      style: { display: "block", marginTop: 3 },
                      title: "Клик — копировать",
                    },
                    clickable(() => copy("f" + t.id, fscanCmd), {
                      label: "Копировать команду fscan",
                    }),
                  ),
                  copied === "f" + t.id ? "Скопировано" : fscanCmd,
                ),
              ),
            )
          : null,
      );
    });

    return h(
      "div",
      { className: "rt-main" },
      h(
        "div",
        { className: "rt-toolbar" },
        h("span", { style: { fontWeight: 600 } }, "Сессии и входы"),
        h(
          "span",
          { className: "rt-tag" },
          "WebShell " +
            (totals.webshellsOnline || 0) +
            "/" +
            (totals.webshells || 0) +
            " онлайн",
        ),
        h(
          "span",
          { className: "rt-tag" },
          "Туннелей " +
            (totals.tunnelsActive || 0) +
            "/" +
            (totals.tunnels || 0) +
            " доступно",
        ),
        h("span", { className: "rt-tag" }, "Учётных данных " + (totals.credentials || 0)),
        h("span", { className: "rt-tag" }, "Сессий доступа " + (totals.access || 0)),
        h("div", { className: "rt-spacer" }),
        h(
          "button",
          {
            className: "rt-btn rt-btn-primary",
            disabled: busy,
            onClick: probe,
          },
          busy ? "Проверка…" : "Проверить связность",
        ),
        h("button", { className: "rt-btn", onClick: load }, "Обновить"),
      ),
      msg
        ? h(
            "div",
            { className: msg.err ? "rt-err" : "rt-foot" },
            msg.err || msg.ok,
          )
        : null,
      err ? h("div", { className: "rt-err" }, err) : null,
      h(
        "div",
        { className: "rt-body", style: { overflow: "auto" } },
        !shells.length && !tunnels.length
          ? h(
              "div",
              { className: "rt-empty" },
              h("div", null, "Пока не зарегистрировано ни одного WebShell или туннеля."),
              h(
                "div",
                { style: { marginTop: 6, fontSize: 12 } },
                "Получили WebShell — используйте redteam_webshell_add; подняли туннель — redteam_tunnel_add (suo5 / socks5 / ssh -R); дальше агент увидит их через redteam_sessions.",
              ),
            )
          : null,
        hints.length
          ? h("div", { style: { padding: "8px 10px 0" } }, hints)
          : null,
        h(
          Section,
          {
            key: "webshells",
            tone: "queue",
            title: "WebShell",
            count:
              (totals.webshellsOnline || 0) +
              "/" +
              (totals.webshells || 0) +
              " онлайн",
            sub: "поднятые управляемые входы",
            open: sessCollapse.isOpen("shells", true),
            onToggle: sessCollapse.toggle("shells", true),
          },
          shells.length
            ? h(
                "div",
                { className: "rt-sess-grid", style: { padding: 0 } },
                shellCards,
              )
            : h(
                "div",
                { className: "rt-atest-meta" },
                "Пока нет (получив WebShell, зарегистрируйте его через redteam_webshell_add)",
              ),
        ),
        h(
          Section,
          {
            key: "tunnels",
            tone: "test",
            title: "Туннели во внутреннюю сеть",
            count:
              (totals.tunnelsActive || 0) +
              "/" +
              (totals.tunnels || 0) +
              " доступно",
            sub: "можно сразу использовать как прокси для сканеров",
            open: sessCollapse.isOpen("tunnels", true),
            onToggle: sessCollapse.toggle("tunnels", true),
          },
          tunnels.length
            ? h(
                "div",
                { className: "rt-sess-grid", style: { padding: 0 } },
                tunnelCards,
              )
            : h(
                "div",
                { className: "rt-atest-meta" },
                "Пока нет (подняв туннель, зарегистрируйте его через redteam_tunnel_add)",
              ),
        ),
      ),
    );
  }

  /* ---------------------------------------------------------- Граница ошибок */
  /**
   * При ошибке отрисовки одной вкладки деградирует только она, а не вся панель: панель и кнопки боковой панели остаются рабочими,
   * пользователь одной кнопкой возвращается в карту активов. (Раньше панель исчезала целиком и кнопки не нажимались — как раз из-за отсутствия этой защиты.)
   */
  class RtBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
      return { error: error };
    }
    componentDidCatch(error) {
      try {
        console.error("[redteam-ui] ошибка отрисовки страницы:", error);
      } catch (e) {
        /* ignore */
      }
    }
    render() {
      if (this.state.error) {
        const msg =
          this.state.error && this.state.error.message
            ? this.state.error.message
            : String(this.state.error);
        return h(
          "div",
          { className: "rt-pane" },
          h("div", { className: "rt-err" }, "Ошибка отрисовки страницы: " + msg),
          h(
            "button",
            {
              className: "rt-btn",
              onClick: () => {
                this.setState({ error: null });
                setUI({ tab: "assets" });
              },
            },
            "Вернуться в карту активов",
          ),
        );
      }
      return this.props.children;
    }
  }

  /**
   * Вкладка агентов: лимит одновременных (максимум 3) + шесть ролей и их промпты.
   * Главная сессия перед раздачей задач смотрит сюда, а пользователь сразу видит, «сколько ещё агентов можно поднять».
   */
  function AgentsTab(props) {
    const eng = props.engagement;
    const refreshKey = props.refreshKey || 0;
    const [roles, setRoles] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [concurrency, setConcurrency] = React.useState(null);
    const [busy, setBusy] = React.useState(false);

    const load = () => {
      setBusy(true);
      api({
        op: eng ? "prompts" : "bootstrap",
        engagement: eng || undefined,
      }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Ошибка чтения");
            return;
          }
          setErr(null);
          if (r.roles) setRoles(r.roles);
        },
        (e) => {
          setBusy(false);
          setErr(String((e && e.message) || e));
        },
      );
      /* Лимит считается по «сейчас работающим субагентам»; host читает реестр subagents */
      api({ op: "agentsStatus" }).then(
        (r) => {
          if (r && r.ok !== false) setConcurrency(r);
        },
        () => {},
      );
    };
    React.useEffect(load, [eng, refreshKey]);

    const used = concurrency ? concurrency.used : null;
    const max = concurrency ? concurrency.max : 3;
    return h(
      "div",
      { className: "rt-main" },
      h(
        "div",
        { className: "rt-toolbar" },
        h("span", { style: { fontWeight: 600 } }, "Боевые агенты"),
        h("span", { className: "rt-tag rt-tag-passive" }, "Лимит одновременных " + max),
        used === null
          ? h("span", { className: "rt-tag" }, "Занятость неизвестна")
          : h(
              "span",
              {
                className:
                  "rt-tag" + (used >= max ? " rt-tag-warn" : " rt-tag-live"),
              },
              "В работе " + used + " / свободно " + Math.max(max - used, 0),
            ),
        h("div", { className: "rt-spacer" }),
        h(
          "button",
          { className: "rt-btn", disabled: busy, onClick: load },
          busy ? "Чтение…" : "Обновить",
        ),
      ),
      h(
        "div",
        { className: "rt-pane" },
        err ? h("div", { className: "rt-err" }, err) : null,
        h(
          "div",
          { className: "rt-card" },
          h("h4", null, "Правила параллельности (жёсткие ограничения)"),
          h(
            "div",
            { style: { fontSize: 12, lineHeight: 1.7 } },
            "· По одной цели **одновременно не более " +
              max +
              " исполнительных агентов**; перед раздачей задач главная сессия занимает слот через `redteam_agent_slot`; при заполнении лимита запрос отклоняется.",
            h("br"),
            "· **По умолчанию задачи раздаются по одной и идут по порядку**; параллельно только действительно независимые.",
            h("br"),
            "· У каждой сессии **своя привязка к цели**: при параллельных сессиях отчёты не перемешаются (субагент наследует цель родительской сессии).",
          ),
        ),
        h(
          "div",
          { className: "rt-card" },
          h("h4", null, "Шесть ролей"),
          h(
            "div",
            { style: { fontSize: 12, lineHeight: 1.8 } },
            "① Разведка `recon` —— только собирает активы, полно по организации (включая периферийные и незарегистрированные)",
            h("br"),
            "② Инвентаризация активов `assess` —— проходит по одному, оценивает простоту атаки и заносит всё в базу",
            h("br"),
            "③ Поиск уязвимостей `vuln-scan` —— сначала проверка базы на дубли → приоритет Nday/1day → проверка интерфейсов на доступ без авторизации",
            h("br"),
            "④ Эксплуатация уязвимостей `exploit` —— сначала права на сервере (шелл Behinder/Godzilla) + туннель suo5, затем остальные пункты начисления",
            h("br"),
            "⑤ Пентест внутренней сети `internal` —— идёт через туннель и последовательно поднимает ①②③④ для внутренней сети",
            h("br"),
            "⑥ Главная сессия `plan` —— только планирует, раздаёт задачи, сводит и докладывает, руками не работает",
          ),
        ),
        h(ConcurrencyCard, { concurrency, onSaved: load }),
        h(
          "div",
          { className: "rt-card" },
          h("h4", null, "Промпты ролей (хранятся по цели, здесь их можно править)"),
          h(
            "div",
            {
              style: {
                fontSize: 11.5,
                color: "var(--dsw-alias-label-secondary)",
                marginBottom: 6,
              },
            },
            "«Промпты агента» теперь на этой странице; ниже полный редактор (после правок нажмите «Сохранить», влияет только на текущую цель).",
          ),
          h(PromptsTab, { engagement: eng, refreshKey: refreshKey }),
        ),
      ),
    );
  }

  function ConcurrencyCard(props) {
    const info = props.concurrency || {};
    const [draft, setDraft] = React.useState("");
    const [busy, setBusy] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    React.useEffect(() => {
      if (info.max) setDraft(String(info.max));
    }, [info.max]);

    const limit = info.limit || 10;
    const used = typeof info.used === "number" ? info.used : null;
    const source =
      info.source === "settings"
        ? "задано в панели"
        : info.source === "env"
          ? "переменная окружения REDTEAM_MAX_AGENTS"
          : "значение по умолчанию";
    const n = Number(draft);
    const invalid =
      !Number.isFinite(n) || Math.floor(n) !== n || n < 1 || n > limit;
    const save = () => {
      if (invalid) return;
      setBusy(true);
      setMsg(null);
      api({ op: "setAgentsMax", max: n }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка сохранения" });
            return;
          }
          setMsg({
            ok: "Сохранено: лимит одновременных " + r.max + " (действует сразу, перезапуск не нужен)",
          });
          if (props.onSaved) props.onSaved();
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };
    return h(
      "div",
      { className: "rt-card" },
      h("h4", null, "Число одновременных"),
      h(
        "div",
        { style: { fontSize: 12, lineHeight: 1.8, marginBottom: 8 } },
        "Сколько исполнительных агентов **одновременно по одной цели**. Сейчас действует: **" +
          (info.max || "?") +
          "**" +
          (used === null
            ? ""
            : " (в работе " +
              used +
              ", свободно " +
              Math.max((info.max || 0) - used, 0) +
              ")") +
          ", источник: " +
          source +
          ". После изменения **действует сразу**, перезапуск не нужен.",
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          },
        },
        h("input", {
          className: "rt-input",
          style: { width: 90 },
          type: "number",
          min: 1,
          max: limit,
          value: draft,
          onChange: (e) => setDraft(e.target.value),
        }),
        h(
          "span",
          {
            style: {
              fontSize: 11.5,
              color: "var(--dsw-alias-label-secondary)",
            },
          },
          "Диапазон 1 – " + limit,
        ),
        h(
          "button",
          {
            className: "rt-btn rt-btn-primary",
            disabled: busy || invalid,
            onClick: save,
          },
          busy ? "Сохранение…" : "Сохранить",
        ),
        msg && msg.err
          ? h(
              "span",
              { style: { fontSize: 12, color: "var(--rt-danger, #d33)" } },
              msg.err,
            )
          : null,
        msg && msg.ok
          ? h(
              "span",
              {
                style: {
                  fontSize: 12,
                  color: "var(--dsw-alias-label-secondary)",
                },
              },
              msg.ok,
            )
          : null,
      ),
      h(
        "div",
        { className: "rt-note", style: { marginTop: 8 } },
        "⚠️ Больше не значит быстрее: **лимиты параллельности и скорости на один API Key модели общие**, и слишком много одновременных задач мешают друг другу: " +
          "это видно как ожидание в очереди, таймауты, обрезанные ответы и даже ошибки rate limit —— результаты теста становятся нестабильными (пропуски, брошенные задачи). " +
          "Начинайте с 2–3 и увеличивайте только когда уверены, что квоты Key хватает и задачи действительно независимы.",
      ),
    );
  }

  /**
   * Отображение версии + кнопка автообновления.
   *
   * Поведение: при монтировании тихо проверяется последняя версия (npm registry), при наличии новой кнопка подсвечивается как
   * «Есть новая версия vX»; по клику открывается окно подтверждения (текущая версия / последняя версия / место установки / блокеры),
   * после подтверждения host выполняет установку → перезапуск dsh web (страница отключится, после перезапуска достаточно обновить).
   */
  function VersionBar(props) {
    const [info, setInfo] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const [countdown, setCountdown] = React.useState(0);
    const countdownRef = React.useRef(null);
    const clearCountdown = React.useCallback(() => {
      if (countdownRef.current) {
        try {
          clearInterval(countdownRef.current);
        } catch {
          /* ignore */
        }
      }
      countdownRef.current = null;
    }, []);
    React.useEffect(() => () => clearCountdown(), [clearCountdown]);
    const closeModal = React.useCallback(() => {
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
            /* Dev-режим или registry недоступен: показываем только текущую версию и не мешаем пользователю ошибками */
            if (!silent) setErr((r && r.error) || "Ошибка проверки обновлений");
            api({ op: "version" }).then(
              (v) => {
                if (v && v.ok !== false) setInfo(v);
              },
              () => {},
            );
            return;
          }
          setErr(null);
          setInfo(r);
        },
        (e) => {
          setBusy(false);
          if (!silent) setErr(String((e && e.message) || e));
          api({ op: "version" }).then(
            (v) => {
              if (v && v.ok !== false) setInfo(v);
            },
            () => {},
          );
        },
      );
    };
    React.useEffect(() => {
      check(true);
    }, []);

    const apply = () => {
      setBusy(true);
      setMsg(null);
      api({
        op: "updateApply",
        target: (info && info.latest) || undefined,
      }).then(
        (r) => {
          setBusy(false);
          if (!r || r.ok === false) {
            setMsg({ err: (r && r.error) || "Ошибка обновления" });
            return;
          }
          setMsg({
            ok: "Установлено " + (r.installed || "") + " , перезапускаем текущий хост…",
          });
          /* Перезапуск отключает эту страницу: обратный отсчёт подсказывает обновить её позже */
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
          }, 1000);
        },
        (e) => {
          setBusy(false);
          setMsg({ err: String((e && e.message) || e) });
        },
      );
    };

    const current =
      info && info.current
        ? info.current
        : info && info.plugin
          ? info.plugin.version
          : null;
    const latest = info && info.latest ? info.latest : null;
    const hasNew = !!(info && info.updateAvailable);
    const blockers = (info && info.blockers) || [];
    const notes = (info && info.notes) || [];
    const mode = info && info.install ? info.install.mode : null;

    return h(
      "span",
      { style: { display: "inline-flex", alignItems: "center", gap: 6 } },
      h(
        "span",
        {
          className: "rt-tag" + (hasNew ? " rt-tag-warn" : ""),
          title:
            "Текущая версия " +
            (current || "неизвестно") +
            (latest ? "\nПоследняя версия " + latest : "") +
            (mode === "dev"
              ? "\nСпособ установки: dev-режим (симлинк на исходники)"
              : mode === "package"
                ? "\nСпособ установки: установка пакетом"
                : "") +
            (info && info.check_error ? "\nОшибка проверки: " + info.check_error : ""),
        },
        "v" + (current || "?"),
      ),
      hasNew
        ? h(
            "button",
            {
              className: "rt-btn rt-btn-primary",
              disabled: busy,
              onClick: () => {
                setOpen(true);
                setMsg(null);
              },
              title:
                "Найдена новая версия " +
                latest +
                ": нажмите, чтобы посмотреть и обновиться одной кнопкой (текущий хост перезапустится)",
            },
            busy ? "Проверка…" : "Есть новая версия v" + latest,
          )
        : h(
            "button",
            {
              className: "rt-btn",
              disabled: busy,
              onClick: () => check(false),
              title: "Ещё раз проверить последнюю версию в npm",
            },
            busy ? "Проверка…" : "Проверить обновления",
          ),
      open
        ? h(
            "div",
            {
              className: "rt-modal",
              "aria-hidden": "true",
              onClick: closeModal,
            },
            h(
              "div",
              {
                className: "rt-modal-box",
                onClick: (e) => e.stopPropagation(),
              },
              h("h4", { style: { marginTop: 0 } }, "Обновление режима RedTeam"),
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Текущая версия"),
                h("span", null, current || "неизвестно"),
              ),
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Последняя версия"),
                h("span", null, latest || "неизвестно"),
              ),
              h(
                "div",
                { className: "rt-kv" },
                h("b", null, "Способ установки"),
                h(
                  "span",
                  null,
                  mode === "dev"
                    ? "dev-режим (симлинк на исходники)"
                    : mode === "package"
                      ? "установка пакетом (" +
                        ((info.install && info.install.packageManager) ||
                          "npm") +
                        ")"
                      : "неизвестно",
                ),
              ),
              info && info.install && info.install.dir
                ? h(
                    "div",
                    { className: "rt-kv" },
                    h("b", null, "Место установки"),
                    h("span", { className: "rt-mono" }, info.install.dir),
                  )
                : null,
              blockers.length
                ? h(
                    "div",
                    { className: "rt-hint" },
                    h(
                      "div",
                      { style: { fontWeight: 600, marginBottom: 4 } },
                      "Сейчас обновиться нельзя:",
                    ),
                    blockers.map((b, i) =>
                      h("div", { key: "b" + i }, "· " + b),
                    ),
                  )
                : null,
              notes.length
                ? h(
                    "div",
                    { className: "rt-foot", style: { padding: "4px 0" } },
                    notes.map((n, i) => h("div", { key: "n" + i }, n)),
                  )
                : null,
              h(
                "div",
                {
                  style: {
                    fontSize: 12,
                    color: "var(--dsw-alias-label-secondary)",
                    margin: "8px 0",
                  },
                },
                "Ход обновления: установка новой версии → автоматический перезапуск текущего хоста (официальный exe / Community Edition / dsh web; текущая страница отключится и через 5–10 секунд обновится сама). " +
                  "Перед перезапуском проверяется, не работают ли агенты: если работают, обновление останавливается.",
              ),
              msg
                ? h(
                    "div",
                    { className: msg.err ? "rt-err" : "rt-foot" },
                    msg.err || msg.ok,
                  )
                : null,
              countdown > 0
                ? h(
                    "div",
                    { className: "rt-foot" },
                    "Хост перезапускается, страница обновится через " + countdown + " с…",
                  )
                : null,
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                    marginTop: 10,
                  },
                },
                h(
                  "button",
                  { className: "rt-btn", onClick: closeModal },
                  "Закрыть",
                ),
                h(
                  "button",
                  {
                    className: "rt-btn rt-btn-primary",
                    disabled: busy || blockers.length > 0 || mode === "dev",
                    title:
                      mode === "dev"
                        ? "При dev-установке обновляйтесь через процесс репозитория"
                        : blockers.length
                          ? "Сначала устраните блокеры выше"
                          : "Установить и перезапустить",
                    onClick: apply,
                  },
                  busy ? "Обновление…" : "Обновить и перезапустить",
                ),
              ),
            ),
          )
        : null,
    );
  }

  /* ---------------------------------------------------------- Основная часть постоянной панели */
  /**
   * Состояние «непрочитано» хранится в localStorage по цели, раз в 25 секунд запрашивается consoleDigest у host
   * (число записей по каждой вкладке + время последнего обновления). Свежее запомненного локально снимка → на вкладке красная точка;
   * пользователь открывает вкладку — текущие значения записываются как прочитанные, точка исчезает.
   */
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
      /* Приватный режим и т.п.: работает и без сохранения */
    }
  };
  /** Есть ли на вкладке новое с прошлого просмотра (записей стало больше или последняя новее прошлого просмотра). */
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
    const vw = (typeof window !== "undefined" && window.innerWidth) || 1280;
    const vh = (typeof window !== "undefined" && window.innerHeight) || 800;
    const w = Math.min(
      Math.max(320, Number(g && g.w) || 620),
      Math.max(320, vw),
    );
    const h = Math.min(
      Math.max(240, Number(g && g.h) || 520),
      Math.max(240, vh),
    );
    const x = Math.min(Math.max(0, Number(g && g.x) || 0), Math.max(0, vw - w));
    const y = Math.min(Math.max(0, Number(g && g.y) || 0), Math.max(0, vh - h));
    return { x: x, y: y, w: w, h: h };
  }
  function defaultRtGeom() {
    const vw = (typeof window !== "undefined" && window.innerWidth) || 1280;
    const vh = (typeof window !== "undefined" && window.innerHeight) || 800;
    let w = 620;
    try {
      const saved = Number(window.localStorage.getItem("rt-dock-width"));
      if (Number.isFinite(saved) && saved >= 320 && saved <= 1200) w = saved;
    } catch (e) {
      /* Приватный режим */
    }
    const h = Math.max(240, Math.min(640, vh - 24));
    return clampRtGeom({ x: Math.max(0, vw - w - 12), y: 12, w: w, h: h });
  }
  function loadRtGeom() {
    try {
      const raw = JSON.parse(
        window.localStorage.getItem(RT_GEOM_KEY) || "null",
      );
      if (raw && typeof raw === "object") return clampRtGeom(raw);
    } catch (e) {
      /* Приватный режим или повреждённые данные */
    }
    return defaultRtGeom();
  }

  function Panel(props) {
    /* embedded: при встраивании во внешний dock dsh-purge не рисуем свои «свернуть/полный просмотр/перетаскивание», чтобы не перекрывать кнопки внешнего слоя */
    const embedded = !!(props && props.embedded);
    const st = useUI();
    const [engagements, setEngagements] = React.useState([]);
    const [eng, setEng] = React.useState(null);
    const [snapshot, setSnapshot] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [newName, setNewName] = React.useState("");
    const [geom, setGeom] = React.useState(loadRtGeom);
    const [creating, setCreating] = React.useState(false);
    const [refreshKey, setRefreshKey] = React.useState(0);
    const [digest, setDigest] = React.useState(null);
    const [seen, setSeen] = React.useState(null);

    React.useEffect(() => {
      if (embedded) return undefined;
      try {
        window.localStorage.setItem(RT_GEOM_KEY, JSON.stringify(geom));
      } catch (e) {
        /* Приватный режим */
      }
    }, [geom, embedded]);
    React.useEffect(() => {
      if (embedded) return undefined;
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
            setErr((r && r.error) || "Ошибка загрузки");
            return;
          }
          setErr(null);
          setSnapshot(r);
        },
        (e) => setErr(String((e && e.message) || e)),
      );
    };

    const refreshList = (selectId) => {
      api({ op: "bootstrap" }).then(
        (b) => {
          setEngagements((b && b.engagements) || []);
          if (selectId) {
            setEng(selectId);
            loadSnapshot(selectId);
          }
        },
        () => {},
      );
    };

    React.useEffect(() => {
      api({ op: "bootstrap" }).then(
        (r) => {
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Нет связи с базой активов");
            return;
          }
          setEngagements(r.engagements || []);
          const id =
            r.current ||
            (r.engagements && r.engagements[0] && r.engagements[0].id) ||
            null;
          if (id) {
            setEng(id);
            loadSnapshot(id);
          }
        },
        (e) => setErr(String((e && e.message) || e)),
      );
    }, []);

    const openEngagement = (nameArg) => {
      const name = String(nameArg || newName).trim();
      if (!name) return;
      setCreating(true);
      api({ op: "openEngagement", name: name }).then(
        (r) => {
          setCreating(false);
          if (!r || r.ok === false) {
            setErr((r && r.error) || "Ошибка создания");
            return;
          }
          setNewName("");
          refreshList(r.engagement && r.engagement.id);
        },
        (e) => {
          setCreating(false);
          setErr(String((e && e.message) || e));
        },
      );
    };

    /** Обновление: заново тянем реестр/снимок и заставляем текущую вкладку перезагрузить данные. */
    const refreshAll = () => {
      setRefreshKey((k) => k + 1);
      api({ op: "bootstrap" }).then(
        (b) => {
          setEngagements((b && b.engagements) || []);
          if (eng) loadSnapshot(eng);
        },
        () => {
          if (eng) loadSnapshot(eng);
        },
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
      if (
        e.target &&
        e.target.closest &&
        e.target.closest("button,a,input,select,textarea,label")
      )
        return;
      const sx = e.clientX;
      const sy = e.clientY;
      const ox = geom.x;
      const oy = geom.y;
      trackPointer(e, (ev) =>
        setGeom((g) =>
          clampRtGeom({
            x: ox + (ev.clientX - sx),
            y: oy + (ev.clientY - sy),
            w: g.w,
            h: g.h,
          }),
        ),
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
      trackPointer(e, (ev) =>
        setGeom((g) =>
          clampRtGeom({ x: g.x, y: g.y, w: ow + (ev.clientX - sx), h: g.h }),
        ),
      );
    };
    const startResizeBottom = (e) => {
      const sy = e.clientY;
      const oh = geom.h;
      trackPointer(e, (ev) =>
        setGeom((g) =>
          clampRtGeom({ x: g.x, y: g.y, w: g.w, h: oh + (ev.clientY - sy) }),
        ),
      );
    };
    const startResizeCorner = (e) => {
      const sx = e.clientX;
      const sy = e.clientY;
      const ow = geom.w;
      const oh = geom.h;
      trackPointer(e, (ev) =>
        setGeom((g) =>
          clampRtGeom({
            x: g.x,
            y: g.y,
            w: ow + (ev.clientX - sx),
            h: oh + (ev.clientY - sy),
          }),
        ),
      );
    };

    /* Смена цели: заново читаем снимок непрочитанного для этой цели и сразу берём сводку */
    React.useEffect(() => {
      if (!eng) {
        setDigest(null);
        setSeen(null);
        return undefined;
      }
      setSeen(loadUnread(eng));
      let alive = true;
      let digestInflight = false;
      const tick = () => {
        if (digestInflight)
          return; /* предыдущий раунд ещё не вернулся — пропускаем этот, чтобы не копить запросы */
        digestInflight = true;
        api({ op: "consoleDigest", engagement: eng })
          .then(
            (r) => {
              if (alive && r && r.ok !== false && r.sections)
                setDigest(r.sections);
            },
            () => {
              /* Сетевая ошибка: не прерываемся, ждём следующий раунд */
            },
          )
          .finally(() => {
            digestInflight = false;
          });
      };
      tick();
      const timer = window.setInterval(tick, 25000);
      return () => {
        alive = false;
        window.clearInterval(timer);
      };
    }, [eng, refreshKey]);

    /**
     * Открыть вкладку = посмотреть её содержимое: текущая сводка помечается прочитанной.
     * Если ещё не читали (первый вход в панель) — это не новое, иначе при входе всё в красных точках и не видно, «где действительно новое».
     */
    const markTabSeen = React.useCallback(
      (tab) => {
        if (!eng) return;
        setSeen((prev) => {
          const base =
            prev ||
            (() => {
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
      [eng, digest],
    );

    const unreadOf = (tab) => {
      if (!eng || !digest) return false;
      if (!seen) return false;
      return digestHasNew(seen[tab], digest[tab]);
    };

    const stats = (snapshot && snapshot.stats) || {};
    const tabs = [
      ["assets", "Карта активов"],
      ["env", "Адаптация окружения"],
      ["agents", "Агенты"],
      ["sessions", "Сессии и туннели"],
      ["findings", "Результаты по уязвимостям"],
      ["chain", "Цепочка атаки"],
      ["scores", "Цели начисления"],
      ["report", "Отчёт"],
      ["knowledge", "База знаний"],
      ["skills", "Библиотека навыков"],
    ];
    const full = isFullWindow();
    const openFull = () => {
      try {
        window.open(
          window.location.href.split("#")[0] + "#redteam-full",
          "_blank",
          "noopener",
        );
      } catch (e) {
        setErr("Не удалось открыть новое окно: " + ((e && e.message) || e));
      }
    };
    const exitFull = () => {
      /* Сначала пытаемся закрыть окно, открытое скриптом; если не выходит — возвращаемся в обычный интерфейс с боковой панелью */
      try {
        window.close();
      } catch (e) {
        /* Окно, открытое не скриптом, закрыть нельзя */
      }
      try {
        if (window.location.hash) {
          window.location.hash = "";
          window.location.reload();
        }
      } catch (e) {
        /* ignore */
      }
    };
    React.useEffect(() => {
      if (!full) return undefined;
      const onKey = (e) => {
        if (e.key === "Escape") exitFull();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [full]);

    let body;
    if (err) body = h("div", { className: "rt-err" }, err);
    /* Глобальные страницы: доступны и без цели (база знаний / адаптация окружения / библиотека навыков / обзор агентов) */
    else if (st.tab === "knowledge")
      body = h(KnowledgeTab, { refreshKey: refreshKey });
    else if (st.tab === "env") body = h(EnvTab, { refreshKey: refreshKey });
    else if (st.tab === "skills")
      body = h(SkillsTab, { refreshKey: refreshKey });
    else if (st.tab === "agents" || st.tab === "prompts")
      body = h(AgentsTab, { engagement: eng, refreshKey: refreshKey });
    else if (!eng) {
      body = h(
        "div",
        { className: "rt-pane" },
        h(
          "div",
          { className: "rt-card" },
          h("h4", null, "Целей пока нет"),
          h(
            "div",
            {
              style: {
                fontSize: 12,
                color: "var(--dsw-alias-label-secondary)",
                marginBottom: 8,
              },
            },
            "Введите название организации-цели учений по ИБ, создайте учения и начните карту активов.",
          ),
          h(
            "div",
            { style: { display: "flex", gap: 8 } },
            h("input", {
              className: "rt-input",
              style: { flex: 1 },
              placeholder: "например: ООО «Пример»",
              value: newName,
              onChange: (e) => setNewName(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") openEngagement();
              },
            }),
            h(
              "button",
              {
                className: "rt-btn rt-btn-primary",
                disabled: creating,
                onClick: () => openEngagement(),
              },
              creating ? "Создание…" : "Создать цель",
            ),
          ),
        ),
      );
    } else if (st.tab === "assets")
      body = h(AssetsTab, {
        engagement: eng,
        snapshot: snapshot,
        refreshKey: refreshKey,
        onRefresh: refreshAll,
        onData: () => loadSnapshot(eng),
      });
    else if (st.tab === "testing")
      body = h(AssetsTab, {
        engagement: eng,
        snapshot: snapshot,
        refreshKey: refreshKey,
        onRefresh: refreshAll,
        onData: () => loadSnapshot(eng),
      });
    else if (st.tab === "sessions")
      body = h(SessionTab, { engagement: eng, refreshKey: refreshKey });
    else if (st.tab === "findings")
      body = h(FindingsTab, { engagement: eng, refreshKey: refreshKey });
    else if (st.tab === "chain")
      body = h(ChainTab, { engagement: eng, refreshKey: refreshKey });
    else if (st.tab === "report")
      body = h(ReportTab, { engagement: eng, refreshKey: refreshKey });
    else if (st.tab === "attackfiles")
      body = h(FindingsTab, { engagement: eng, refreshKey: refreshKey });
    else if (st.tab === "scores")
      body = h(ScoreTab, { engagement: eng, refreshKey: refreshKey });
    else body = h("div", { className: "rt-empty" }, "Неизвестная вкладка");

    const shellProps = full
      ? { className: "rt-full", style: { display: "flex" } }
      : embedded
        ? {
            className: "rt-dock rt-embedded",
            "data-open": "1",
            style: { width: "100%", display: "flex" },
          }
        : {
            className: "rt-dock",
            "data-open": st.open ? "1" : "0",
            style: {
              left: geom.x + "px",
              top: geom.y + "px",
              right: "auto",
              bottom: "auto",
              width: geom.w + "px",
              height: geom.h + "px",
              display: st.open ? "flex" : "none",
            },
          };

    return h(
      "div",
      shellProps,
      full || embedded
        ? null
        : h("div", {
            className: "rt-grip",
            title: "Потяните, чтобы изменить ширину",
            onMouseDown: startResizeLeft,
          }),
      full || embedded
        ? null
        : h("div", {
            className: "rt-resize-r",
            title: "Потяните, чтобы изменить ширину",
            onMouseDown: startResizeRight,
          }),
      full || embedded
        ? null
        : h("div", {
            className: "rt-resize-b",
            title: "Потяните, чтобы изменить высоту",
            onMouseDown: startResizeBottom,
          }),
      full || embedded
        ? null
        : h("div", {
            className: "rt-resize-c",
            title: "Потяните, чтобы изменить размер",
            onMouseDown: startResizeCorner,
          }),
      h(
        "div",
        {
          className: "rt-head",
          onMouseDown: full || embedded ? undefined : startDrag,
          title: full || embedded ? undefined : "Зажмите и перетащите панель",
        },
        embedded
          ? null
          : h(
              "div",
              { className: "rt-title" },
              h("span", { className: "rt-dot" }),
              full ? "Полигон · полный просмотр" : "Полигон",
              full
                ? h(
                    "span",
                    { className: "rt-tag", style: { marginLeft: 6 } },
                    "Отдельное окно",
                  )
                : null,
            ),
        h(
          "select",
          {
            className: "rt-input rt-eng-select",
            style: {
              maxWidth: embedded ? "100%" : "170px",
              minWidth: embedded ? "160px" : undefined,
              flex: embedded ? "1 1 200px" : undefined,
            },
            value: eng || "",
            onChange: (e) => {
              setEng(e.target.value);
              loadSnapshot(e.target.value);
              /* Синхронизируем «текущую цель»: по ней нативный каталог skill определяет корень навыков */
              api({
                op: "activateEngagement",
                engagement: e.target.value,
              }).catch(() => {});
            },
          },
          h(
            "option",
            { value: "", disabled: true },
            engagements.length ? "Выбрать цель" : "Целей нет",
          ),
          engagements.map((x) =>
            h("option", { key: x.id, value: x.id }, x.name || x.id || "без названия"),
          ),
        ),
        h("div", { className: "rt-spacer" }),
        embedded ? null : h(VersionBar, null),
        full
          ? h(
              "button",
              {
                className: "rt-btn",
                title: "Вернуться в обычный интерфейс с боковой панелью (или Esc)",
                onClick: exitFull,
              },
              "Выйти из полного просмотра",
            )
          : null,
        embedded
          ? null
          : h(
              "button",
              {
                className: "rt-btn",
                title: "Обновить реестр, снимок и данные текущей страницы",
                onClick: refreshAll,
              },
              "Обновить",
            ),
        full || embedded
          ? null
          : h(
              "button",
              {
                className: "rt-btn",
                title: "Открыть полную консоль в новом окне браузера",
                onClick: openFull,
              },
              "Полный просмотр",
            ),
        full || embedded
          ? null
          : h(
              "button",
              {
                className: "rt-btn",
                title: "Свернуть панель",
                onClick: () => setUI({ open: false }),
              },
              "Свернуть",
            ),
      ),
      /* Для полосы вкладок используем стандартные роли tablist/tab: скринридер сообщает «какая вкладка и выбрана ли она».
           Пользователь клавиатуры, дойдя Tab, переключается через Enter/Space (даёт clickable). */
      h(
        "div",
        { className: "rt-tabs", role: "tablist" },
        tabs.map((t) => {
          const activate = () => {
            markTabSeen(t[0]);
            setUI({ tab: t[0] });
            /* Принудительно перезагружаем данные текущей страницы, чтобы после переключения не оставался вид предыдущей */
            setRefreshKey((k) => k + 1);
          };
          return h(
            "div",
            Object.assign({}, clickable(activate, { label: t[1] }), {
              key: t[0],
              className: "rt-tab" + (st.tab === t[0] ? " on" : ""),
              role: "tab",
              "aria-selected": st.tab === t[0] ? "true" : "false",
              title: unreadOf(t[0])
                ? t[1] + ": появился новый контент, откройте и посмотрите — точка исчезнет"
                : t[1],
            }),
            t[1],
            unreadOf(t[0])
              ? /* Красная точка — чисто визуальная информация, даём скринридеру текстовую замену */
                h("span", { className: "rt-tab-dot", "aria-label": "Есть новый контент" })
              : null,
          );
        }),
      ),
      h(
        "div",
        { className: "rt-body", key: "body-" + st.tab },
        h(RtBoundary, { key: st.tab }, body),
      ),
      h(
        "div",
        { className: "rt-foot" },
        h("span", null, "C-сегментов " + (stats.segments || 0)),
        h(
          "span",
          null,
          "Активов " +
            (stats.assets || 0) +
            " (живых " +
            (stats.liveAssets || 0) +
            ")",
        ),
        h("span", null, "Портов " + (stats.openPorts || 0)),
        h("span", null, "Фингерпринтов " + (stats.fingerprints || 0)),
        h("span", null, "Уязвимостей " + (stats.vulns || 0)),
        h(
          "span",
          null,
          "Пассивные/активные " +
            (stats.passiveSignals || 0) +
            "/" +
            (stats.activeSignals || 0),
        ),
        h("div", { className: "rt-spacer" }),
        full
          ? h("span", null, "Нажмите Esc или «Выйти из полного просмотра» справа сверху, чтобы вернуться к интерфейсу с боковой панелью")
          : null,
        h(
          "span",
          null,
          "SQLite · " +
            (snapshot && snapshot.engagement ? snapshot.engagement.name : ""),
        ),
      ),
    );
  }

  /* ---------------------------------------------------------- Кнопка входа */
  function SidebarButton(props) {
    const st = useUI();
    return h(
      "button",
      {
        className: "rt-icon-btn" + (st.open ? " on" : ""),
        title: "Консоль RedTeam (постоянная в правой боковой панели)",
        onClick: () => setUI({ open: !st.open }),
      },
      h("span", { style: { fontSize: 14 } }, "⛨"),
      props.wide ? h("span", null, "RedTeam") : null,
    );
  }

  function HeaderButton() {
    const st = useUI();
    return h(
      "button",
      {
        className: "rt-hbtn" + (st.open ? " on" : ""),
        title: "Консоль RedTeam (постоянная в правой боковой панели)",
        onClick: () => setUI({ open: !st.open }),
      },
      "⛨ RedTeam",
    );
  }

  /** «Полный просмотр» в боковой панели: открывает полную консоль в новом окне браузера (текущее окно не затрагивается). */
  function FullButton(props) {
    const open = () => {
      try {
        window.open(
          window.location.href.split("#")[0] + "#redteam-full",
          "_blank",
          "noopener",
        );
      } catch {
        /* Заблокировано браузером */
      }
    };
    return h(
      "button",
      {
        className: "rt-icon-btn",
        title:
          "Полный просмотр: открыть полную консоль в новом окне (текущее окно не затрагивается; в новом окне выйдите по Esc)",
        onClick: open,
      },
      h("span", { style: { fontSize: 14 } }, "⛶"),
      props.wide ? h("span", null, "Полный просмотр") : null,
    );
  }

  /* ---------------------------------------------------------- Точка входа плагина */
  /** Единственная жёсткая зависимость: реестр слотов. */
  const inject = ["slots"];

  /**
   * Внедряем стили + три слота. Тег стилей и переменная ширины удаляются при размонтировании fiber.
   * @param ctx - корневой контекст клиента.
   */
  function applyDrillParts() {
    return {
      CSS: CSS,
      Panel: Panel,
      setUI: setUI,
      useUI: useUI,
      isFullWindow: isFullWindow,
      setDockWidth: setDockWidth,
    };
  }

  exports.inject = inject;
  return applyDrillParts();
})();
