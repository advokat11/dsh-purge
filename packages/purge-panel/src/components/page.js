// Full-page shell for the left sidebar entry. Replaces the old right-sidebar
// drawer: same components, but laid out like a DSH settings page (host font,
// host tokens, one column, explanations in "?" tips instead of paragraphs).
import { h, useState, useEffect, useCallback } from "../shared/react.js";
import { PURGE_CSS, NATIVE_CSS, PAGE_CSS } from "../styles/index.js";
import { useT } from "../shared/locale.js";
import { apiJson, unavailableStatus } from "../api/client.js";
import { Btn, HelpTip } from "./primitives.js";
import { PurgifySection } from "./settings-form.js";
import { RulesSection } from "./rules.js";
import { SkillsSection } from "./skills.js";
import { CommunityMaintenance, StatusExtras } from "./maintenance.js";
import { __dshPurgeDrill } from "../vendor/drill.js";
import { readDrillAuth, setDock, requestDrill } from "../state/dock.js";

const TABS = [
  ["status", "Статус", "совместимость с хостом, патчи, самопроверка снятия защиты"],
  ["prompt", "Промпт", "текст инъекции и усиливающий блок снятия защиты"],
  ["rules", "Правила", "наборы правил и политики рабочего пространства"],
  ["skills", "Навыки", "каталог навыков DSH"],
  ["drill", "Полигон", "учения RedTeam и адаптация окружения"],
  ["more", "Ещё", "список серверов, обновление и обслуживание"],
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
      "aria-hidden": true,
    },
    h("path", { d: "M12 3l7 3v6c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6l7-3z" }),
    h("path", { d: "M9.5 12.2l1.8 1.8 3.4-3.6" }),
  );
}

export function StatusStrip({ info }) {
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
        className: "dshpp-dot " + (ok ? "is-ok" : level ? "is-warn" : ""),
      }),
      "DSH ",
      h("b", null, compat.host_version || "…"),
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "уровень совместимости ",
      h(
        "b",
        null,
        level === "qualified"
          ? "подтверждено регрессией"
          : level === "unverified"
            ? "непроверенная версия"
            : level === "mixed"
              ? "версии компонентов расходятся"
              : level
                ? "хост не найден"
                : info?.ok === false
                  ? "ошибка чтения"
                  : "проверка",
      ),
      h(
        HelpTip,
        { title: "уровень совместимости" },
        compat.message ||
          "Вердикт по версиям компонентов хоста. qualified значит, что якоря патчей для этой версии DSH проверены по одному.",
      ),
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "счётчик записи на диск ",
      h(
        "b",
        null,
        `${info?.patches_applied ?? "?"}/${info?.patches_total ?? "?"}`,
        info?.patches_na > 0 ? ` · ${info.patches_na} шт. неприменимы на этой машине` : "",
      ),
      h(
        HelpTip,
        { title: "патчи хоста" },
        `Сколько патчей реально записано в код хоста DSH (в знаменателе только применимые здесь). Всего патчей ${info?.patches_total_all ?? "?"}, из них ${info?.patches_na ?? 0} — целевой плагин/пресет не установлен; «ожидает применения» значит якорь на месте, записи ещё не было; «не совпало» значит исходники хоста изменились и якорь нужно искать заново.`,
      ),
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "плагин ",
      h("b", null, info?.plugin_version || __PANEL_VERSION__),
    ),
  );
}

/** Дисковый архив и точка входа процесса показываются отдельно; по записи на диск нельзя судить о том, что загружено в рантайме. */
export function LayoutNotice({ info }) {
  if (!info || (!info.asar_still_sealed && !info.host_layout)) return null;
  const sealed = info.asar_still_sealed === true;
  const note =
    info.host_layout?.note ||
    "На целевом диске всё ещё лежит app.asar; источник загрузки текущего процесса ещё не подтверждён.";
  const handoff = info.asar_handoff
      ? ` Фаза замены пакета: ${{ not_scheduled: "ещё не применено: замена пакета планируется только после нажатия «Применить»", archive_reappeared: "архив появился снова; старая запись о замене не значит, что текущая уже завершена", backup_missing: "резервная копия исходного архива отсутствует, проверьте диагностику", unknown_target: "целевой экземпляр не определён", unreadable: "запись о замене не читается, проверьте диагностику", starting: "помощник запускается (готовность пока не подтверждена)", ready: "помощник готов", waiting_for_quit: "ждём полного выхода (macOS ⌘Q / системный трей Windows)", waiting_for_unlock: "ждём разблокировки архива", moving: "сохраняем исходный архив", complete: "замена пакета завершена, откройте DSH вручную", already_unsealed: "архив уже убран, откройте DSH вручную", failed: "сбой, смотрите диагностику и действуйте по документу восстановления", expired: "ожидание истекло, примените заново или действуйте по документу восстановления", helper_stopped: "помощник неожиданно завершился, примените заново или действуйте по документу восстановления" }[info.asar_handoff.phase] || info.asar_handoff.phase}.`
    : "";
  const diskNote =
    info.host_layout?.disk.archive_exists === true
      ? " На целевом диске всё ещё лежит app.asar."
      : "";
  if (sealed) {
    return h(
      "p",
      { className: "dshpp-warn", role: "status" },
      note,
      diskNote,
      handoff,
    );
  }
  // при нормальной замене пакета оставляем одну строку подтверждения, а пояснение прячем в details: оно говорит, что «точка входа не значит перезагрузку»,
  // это постоянное объяснение и не должно каждый раз занимать строку внимания.
  return h(
    "details",
    { className: "dshpp-layout-details" },
    h("summary", null, "✓ запущено из распакованного каталога (замена пакета завершена)"),
    h("p", { className: "dshpp-note" }, note, diskNote, handoff),
  );
}

/** Когда интерфейс и бэкенд из разных пакетов, об этом надо сказать заметно — иначе пользователь решит, что настройки не применились. */
export function VersionNotice({ info }) {
  if (info && info.ok === false) {
    return h(
      "p",
      { className: "dshpp-warn", role: "status" },
      `Ошибка чтения статуса: ${info.error || "интерфейс недоступен"}. Состояние хоста и патчей неизвестно — нажмите «Обновить» и повторите; если ошибка не уходит, приложите ОС, версии DSH/плагина и этот текст.`,
    );
  }
  const backend = info?.plugin_version;
  if (!backend || backend === __PANEL_VERSION__) return null;
  return h(
    "p",
    { className: "dshpp-warn", role: "status" },
    `Официальная версия ${backend}; интерфейс ${__PANEL_VERSION__}. Если они расходятся, настройки могут не применяться — обновитесь до одной версии и перезапустите DSH.`,
  );
}

export function PurgePage() {
  const t = useT();
  const [tab, setTab] = useState("status");
  const [visited, setVisited] = useState({ status: true });
  const [info, setInfo] = useState(null);
  const select = (id) => {
    setTab(id);
    setVisited((v) => Object.assign({}, v, { [id]: true }));
  };
  const loadInfo = () =>
    apiJson("/dsh-purge/status")
      .then(setInfo)
      .catch((error) => setInfo(unavailableStatus(error)));
  // onStatus дочернего компонента лежит в зависимостях, значит ссылка должна быть стабильной, иначе setInfo будет вызываться на каждый рендер.
  const mergeInfo = useCallback((s) => s && setInfo(s), []);
  useEffect(() => {
    if (tab === "status") loadInfo();
  }, [tab]);
  useEffect(() => {
    const phase = info?.asar_handoff?.phase;
    if (
      ![
        "starting",
        "ready",
        "waiting_for_quit",
        "waiting_for_unlock",
        "moving",
      ].includes(phase)
    )
      return;
    const timer = setInterval(loadInfo, 2000);
    return () => clearInterval(timer);
  }, [info?.asar_handoff?.phase]);
  const active = TABS.find((row) => row[0] === tab) || TABS[0];
  return h(
    "div",
    { className: "dshpp-page" },
    h("style", null, PURGE_CSS + NATIVE_CSS + PAGE_CSS),
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
          __COMMUNITY__
            ? h(
                "span",
                { className: "dshpp-page-ver" },
                "community-версия " + __PANEL_VERSION__,
              )
            : null,
        ),
      ),
    ),
    h(StatusStrip, { info }),
    h(VersionNotice, { info }),
    h(LayoutNotice, { info }),
    h(
      "nav",
      { className: "dshpp-page-tabs", role: "tablist" },
      TABS.map(([id, label]) =>
        h(
          "button",
          {
            key: id,
            type: "button",
            role: "tab",
            "aria-selected": tab === id ? "true" : "false",
            className: tab === id ? "is-on" : "",
            onClick: () => select(id),
          },
          label,
        ),
      ),
    ),
    h(
      "div",
      { className: "dshpp-page-body" },
      h(
        "div",
        { hidden: tab !== "status", className: "dshpp-sec" },
        h(PurgifySection, { page: "status", onStatus: mergeInfo }),
        h(StatusExtras),
        h(CommunityMaintenance),
      ),
      h(
        "div",
        { hidden: tab !== "prompt", className: "dshpp-sec" },
        visited.prompt ? h(PurgifySection, { page: "prompt" }) : null,
      ),
      h(
        "div",
        { hidden: tab !== "rules", className: "dshpp-sec" },
        visited.rules ? h(RulesSection) : null,
      ),
      h(
        "div",
        { hidden: tab !== "skills", className: "dshpp-sec" },
        visited.skills ? h(SkillsSection) : null,
      ),
      h(
        "div",
        { hidden: tab !== "more", className: "dshpp-sec" },
        visited.more ? h(PurgifySection, { page: "more" }) : null,
      ),
      tab === "drill"
        ? h(
            "div",
            { className: "dshpp-sec dshpp-page-drill" },
            __dshPurgeDrill && __dshPurgeDrill.CSS
              ? h("style", { "data-dsh-purge-drill": "1" }, __dshPurgeDrill.CSS)
              : null,
            readDrillAuth()
              ? h(__dshPurgeDrill.Panel, { embedded: true })
              : h(
                  "div",
                  { className: "dshpp-card" },
                  h(
                    "p",
                    { className: "dshpp-muted" },
                    "для полигона сначала нужна авторизация.",
                  ),
                  h(
                    Btn,
                    {
                      kind: "primary",
                      onClick: () => {
                        setDock({ tab: "drill", authOpen: true });
                        requestDrill("auth");
                      },
                    },
                    "Перейти к авторизации",
                  ),
                ),
          )
        : null,
    ),
    h(
      "footer",
      { className: "dshpp-page-foot" },
      __COMMUNITY__
        ? "Поддерживается независимо · на основе YuJunZhiXue/dsh-purge 1.1.71 · MIT · авторство сохранено"
        : "Интерфейс поддерживается независимо · на основе YuJunZhiXue/dsh-purge 1.1.71 (MIT)",
    ),
  );
}

export { PurgeGlyph };
