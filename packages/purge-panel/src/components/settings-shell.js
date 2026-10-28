import { CommunityMaintenance } from "./maintenance.js";
// UI derived from YuJunZhiXue/dsh-purge 1.1.71 (MIT). See LICENSE.
import { h, useState, useEffect } from "../shared/react.js";
import { setTranslate, useT } from "../shared/locale.js";
import { apiJson } from "../api/client.js";
import { PURGE_CSS, NATIVE_CSS } from "../styles/index.js";
import { Btn } from "./primitives.js";
import { PurgifySection } from "./settings-form.js";
import { RulesSection } from "./rules.js";
import { SkillsSection } from "./skills.js";
import { __dshPurgeDrill } from "../vendor/drill.js";
import {
  readDrillAuth,
  setDock,
  useDock,
  requestDrill,
} from "../state/dock.js";

export function compatibilityLevelText(t, level) {
  const key = "compat.level." + (level || "unknown");
  const hit = t(key);
  return hit && hit !== key ? hit : level || t("unknown");
}

/**
 * Подсказка о совместимости для community-версии: читаем версию хоста и уровень совместимости, которые отдаёт бэкенд /dsh-purge/community.
 * В оригинале 1.1.71 CompatibilityNote предупреждал только о версии официального интерфейса; в community-версии берём
 * реальные версию хоста и уровень совместимости этого форка и рендерим всегда (без безусловного return null).
 */
export function CommunityCompatibilityNote() {
  const t = useT();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiJson("/dsh-purge/community")
      .then((d) => {
        if (d && d.ok !== false) setInfo(d);
        else setError((d && d.error) || "bad response");
      })
      .catch((e) => setError((e && e.message) || String(e)));
  }, []);
  const compat = (info && info.compatibility) || null;
  const host = (compat && compat.host_version) || "unknown";
  const text = compat
    ? t("compat.host", {
        version: info && info.version ? info.version : "—",
        host,
        level: compatibilityLevelText(t, compat.level),
      })
    : error
      ? t("compat.unavailable", { error })
      : t("compat.loading");
  return h(
    "p",
    {
      role: "status",
      className: "dshpp-hint",
      style: { margin: "0 20px 10px" },
    },
    text,
    compat && compat.message ? " " + compat.message : "",
  );
}

export function CompatibilityNote({ status }) {
  if (__COMMUNITY__) return h(CommunityCompatibilityNote);
  if (!status) return null;
  const v = String(status.plugin_version || "");
  const valid = typeof status.patches_total === "number" && !!v;
  if (valid && v === "1.1.71") return null;
  return h(
    "p",
    {
      role: "status",
      className: "dshpp-hint",
      style: { margin: "0 20px 10px" },
    },
    valid
      ? "Официальная версия " +
          v +
          "; этот интерфейс проверен на 1.1.71. Если настройки ведут себя странно, обновите плагин интерфейса."
      : "Не удалось подтвердить официальный интерфейс Purge. Проверьте, включён ли официальный плагин, или обновите плагин интерфейса.",
  );
}

export function SettingsRoot(props = {}) {
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
    h("style", null, PURGE_CSS + NATIVE_CSS),
    h(
      "header",
      { className: "dshpp-native-head" },
      h("div", null, h("h2", null, "Purge"), h("p", null, "настройки плагина")),
      h(
        "span",
        { className: "dshpp-native-badge" },
        (__COMMUNITY__ ? "community-версия " : "отдельный интерфейс ") + __PANEL_VERSION__,
      ),
    ),
    h(CompatibilityNote, { status: backendStatus }),
    h(
      "nav",
      { className: "dshpp-native-nav", "aria-label": "категории настроек Purge" },
      [
        ["status", "Статус"],
        ["prompt", "Промпт"],
        ["rules", "Правила"],
        ["skills", "Навыки"],
        ["more", "Ещё"],
      ].map(([id, label]) =>
        h(
          "button",
          {
            key: id,
            type: "button",
            "aria-pressed": page === id,
            onClick: () => select(id),
          },
          label,
        ),
      ),
    ),
    h(
      "div",
      { className: "dshpp-native-content" },
      __COMMUNITY__ && page === "status" ? h(CommunityMaintenance) : null,
      h(
        "div",
        { hidden: !["status", "prompt", "more"].includes(page) },
        h(PurgifySection, { page, onStatus: setBackendStatus }),
      ),
      visited.rules
        ? h("div", { hidden: page !== "rules" }, h(RulesSection))
        : null,
      visited.skills
        ? h("div", { hidden: page !== "skills" }, h(SkillsSection))
        : null,
      h(
        "div",
        { hidden: page !== "more", className: "dshpp-more" },
        h("h3", null, "Полигон"),
        h("p", null, "Открыть встроенные инструменты полигона и настройки окружения."),
        h(
          Btn,
          {
            onClick: () => {
              select("drill");
              requestDrill("tab");
            },
          },
          "Открыть полигон",
        ),
        h(
          "p",
          { className: "dshpp-attribution" },
          __COMMUNITY__
            ? "Поддерживается независимо на основе YuJunZhiXue/dsh-purge 1.1.71, авторство сохранено; обновления идут только из этого форка."
            : "Интерфейс поддерживается независимо; официальный Purge обновляется отдельно. На основе YuJunZhiXue/dsh-purge 1.1.71 (MIT).",
        ),
      ),
      page === "drill"
        ? h(
            "div",
            { className: "dshpp-native-drill" },
            // у полигона свой CSS (.rt-*); в старой версии его вставлял в <head> dock, при рефакторинге он потерялся,
            // и панель в правой колонке оставалась совсем без стилей, а текст сжимался в одну колонку. Здесь подключаем его вместе с компонентом.
            __dshPurgeDrill && __dshPurgeDrill.CSS
              ? h("style", { "data-dsh-purge-drill": "1" }, __dshPurgeDrill.CSS)
              : null,
            h(
              Btn,
              {
                onClick: () => {
                  setDock({ tab: "clean" });
                  select("more");
                },
              },
              "Вернуться к настройкам",
            ),
            readDrillAuth()
              ? h(__dshPurgeDrill.Panel, { embedded: true })
              : h("p", null, "сначала пройдите авторизацию полигона."),
          )
        : null,
    ),
  );
}
