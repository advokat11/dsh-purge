import {
  h,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "../shared/react.js";
import { apiJson } from "../api/client.js";
import { Btn, HelpTip } from "./primitives.js";
/**
 * Два компактных блока в начале страницы статуса: самопроверка снятия защиты (по умолчанию свёрнута) + переключатель усиливающего блока.
 * Вынесено отдельно, чтобы кнопка «Применить» оставалась вверху страницы, а самопроверка не занимала весь экран.
 */
export function StatusExtras() {
  const [check, setCheck] = useState(null);
  const [boost, setBoost] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const load = () =>
    Promise.all([
      apiJson("/dsh-purge/selfcheck")
        .then(setCheck)
        .catch(() => setCheck(null)),
      apiJson("/dsh-purge/boost")
        .then((r) => setBoost(!!r.enabled))
        .catch(() => setBoost(null)),
    ]);
  useEffect(() => {
    load();
  }, []);
  async function toggle() {
    try {
      const r = await apiJson("/dsh-purge/boost", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enabled: !boost }),
      });
      setBoost(!!r.enabled);
      setNotice(r.enabled ? "Включено, подействует после перезапуска" : "Выключено, подействует после перезапуска");
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
    (l) => l.state === "broken" || (!l.state && !l.ok),
  );
  const pendingLayers = layers.filter((l) => l.state === "pending");
  const uncertain = layers.filter((l) =>
    ["inferred", "unknown"].includes(l.state),
  );
  const pendingPatches = pendingLayers.reduce(
    (n, l) => n + (l.pending?.length || 0),
    0,
  );
  const total = layers.filter((layer) => layer.applicable !== false).length;
  return h(
    "section",
    { className: "dshpp-card", "aria-label": "состояние снятия защиты" },
    h(
      "div",
      { className: "dshpp-line" },
      h(
        "span",
        { className: "dshpp-line-main" },
        h("i", {
          className:
            "dshpp-dot " +
            (check
              ? failed.length
                ? "is-bad"
                : pendingLayers.length || uncertain.length
                  ? "is-warn"
                  : "is-ok"
              : ""),
        }),
        "Самопроверка снятия защиты",
        h(
          "b",
          null,
          check
            ? failed.length
              ? `слоёв без эффекта: ${failed.length}`
              : pendingLayers.length
                ? `${pendingPatches} шт. ждут применения`
                : uncertain.length
                  ? `требуют проверки: ${uncertain.length}`
                  : `все ${total} слоёв на месте`
            : "Проверка…",
        ),
      ),
      h(
        "details",
        { className: "dshpp-fold-inline" },
        h("summary", null, "по слоям"),
        h(
          "div",
          { className: "dshpp-checks" },
          check && Array.isArray(check.layers)
            ? check.layers.map((layer) =>
                h(
                  "div",
                  {
                    key: layer.title,
                    className:
                      "dshpp-check" +
                      (["pending", "inferred", "unknown"].includes(layer.state)
                        ? " is-warn"
                        : layer.ok
                          ? ""
                          : " is-bad"),
                  },
                  h("i", {
                    className:
                      "dshpp-dot " +
                      (["pending", "inferred", "unknown"].includes(layer.state)
                        ? "is-warn"
                        : layer.ok
                          ? "is-ok"
                          : "is-bad"),
                  }),
                  h("span", { className: "dshpp-check-name" }, layer.title),
                  h(
                    "span",
                    { className: "dshpp-check-val" },
                    layer.applicable === false
                      ? "не применимо"
                      : layer.state === "pending"
                        ? `ждёт применения #${(layer.pending || []).join("/#")}`
                        : layer.state === "inferred"
                          ? "выведено из хоста"
                          : layer.state === "unknown"
                            ? "не подтверждено"
                            : `${layer.applied}/${layer.required ?? layer.total}`,
                  ),
                  layer.note
                    ? h(HelpTip, { title: layer.title }, layer.note)
                    : null,
                ),
              )
            : h("div", { className: "dshpp-muted" }, "Проверка…"),
        ),
      ),
      h(
        Btn,
        { tiny: true, disabled: busy, onClick: rerun },
        busy ? "…" : "Повторить",
      ),
      h(
        Btn,
        {
          tiny: true,
          title: "Создать одноразовый зонд: в следующем ответе видно, вернула ли модель эту метку дословно",
          onClick: async () => {
            try {
              const r = await apiJson("/dsh-purge/probe", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: "{}",
              });
              setNotice(r.message || "");
            } catch (e) {
              setNotice(e.message);
            }
          },
        },
        "Зонд",
      ),
    ),
    h(
      "div",
      { className: "dshpp-line" },
      h(
        "span",
        { className: "dshpp-line-main" },
        "Усиливающий блок снятия защиты",
        h(
          HelpTip,
          { title: "Усиливающий блок снятия защиты" },
          "Дописывает в конец системного промпта блок того же уровня, что и инъекция: объявление уровней / отказ как сбой / против подхалимства / повтор в нескольких раундах. Включено по умолчанию.",
        ),
        h("b", null, boost === null ? "…" : boost ? "Включено" : "Выключено"),
      ),
      h(
        Btn,
        { tiny: true, disabled: boost === null, onClick: toggle },
        boost ? "Выключить" : "Включить",
      ),
      notice ? h("span", { className: "dshpp-muted" }, notice) : null,
    ),
  );
}

export function assertMaintenanceResult(result) {
  if (!result || typeof result !== "object")
    throw new Error("интерфейс обслуживания вернул некорректный результат");
  if (result.ok === false) {
    const errors = Array.isArray(result.errors)
      ? result.errors.filter(Boolean).join("; ")
      : "";
    const partial = result.applied
      ? "; часть целей обновлена — перезапустите соответствующие процессы DSH, чтобы загрузить изменения"
      : "";
    throw new Error((result.error || errors || "операция обслуживания не удалась") + partial);
  }
}
export function maintenanceNotice(op, result) {
  if (op === "backup") {
    if (!result.id)
      throw new Error("операция резервного копирования не вернула номер копии; обновите список и сверьте результат");
    return `Резервная копия создана: ${result.id}`;
  }
  if (op === "rollback")
    return (
      (result.note || "откат плагина завершён") +
      ". Перезапустите процесс DSH; простое обновление страницы не загрузит новый бэкенд."
    );
  if (op === "update") {
    if (result.applied === false || result.skipped)
      return result.note || "новая версия не установлена, текущая установка не изменилась.";
    if (result.applied || result.needRestart || result.restart_required) {
      const version =
        result.release?.version || result.localVersion || result.remoteVersion;
      const warnings = result.cleanup_warnings || [];
      const cleanup = warnings.length
        ? `очистка не завершена (${warnings.map((w) => `${w.stage}:${w.code}`).join(", ")}), остатки сохранены.`
        : "";
      return `${cleanup}плагин установлен${version ? ": " + version : ""}. Перезапустите процесс DSH; простое обновление страницы не загрузит новый бэкенд.`;
    }
    return result.note || "запрос на обновление выполнен; обновите состояние и сверьте результат установки.";
  }
  return result.note || "операция обслуживания завершена";
}

export function UpdatePreferences({ value, status = {}, onSaved }) {
  const [saving, setSaving] = useState(false),
    [error, setError] = useState("");
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
        body: JSON.stringify({ op: "preferences", value: patch }),
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
    { "aria-label": "настройки автообновления", className: "dshpp-card" },
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
          "aria-label": "автоматическая проверка обновлений",
        }),
        "Автопроверка обновлений",
      ),
      h(HelpTip, {
        title: "автоматическая проверка обновлений",
        children:
          "Проверка через 30 секунд после запуска, далее — с заданным интервалом. Выключение не меняет сохранённые предпочтения автоустановки, но приостанавливает её.",
      }),
      h(
        "select",
        {
          "aria-label": "интервал проверки обновлений",
          value: value.intervalHours,
          disabled: saving || !value.autoCheck,
          onChange: (e) => save({ intervalHours: Number(e.target.value) }),
        },
        [...new Set([1, 6, 12, 24, value.intervalHours])]
          .sort((a, b) => a - b)
          .map((v) => h("option", { key: v, value: v }, `каждые ${v} ч.`)),
      ),
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
          "aria-label": "автоматическая установка обновлений",
        }),
        "Автоустановка обновлений",
      ),
      h(HelpTip, {
        title: "автоматическая установка обновлений",
        children:
          "Ставится только когда автопроверка включена и найдена незаблокированная новая стабильная версия. Перед установкой — резервная копия и проверка пакета; при сбое источник не переключается автоматически. После установки ждём вашего ручного перезапуска, DSH сам не перезапускается.",
      }),
    ),
    h(
      "p",
      { className: "dshpp-hint" },
      status.reconciliationError
        ? "Состояние установки не сверено, автоустановка приостановлена."
        : status.restartRequired
          ? `Версия на диске ${status.pendingVersion}, сейчас работает ${status.runningVersion || "неизвестно"}; ждём вашего ручного перезапуска DSH.`
          : !value.autoCheck
            ? "Автопроверка выключена, автоустановка приостановлена."
            : status.checkedAt
              ? `Последняя проверка: ${new Date(status.checkedAt).toLocaleString()}${status.hasUpdate ? ` · доступна версия ${status.availableVersion}` : ""}`
              : "Проверка выполняется после запуска; после установки только предлагаем ручной перезапуск.",
    ),
    status.reconciliationError
      ? h("p", { role: "alert" }, status.reconciliationError)
      : null,
    [...new Set([status.error, status.installError].filter(Boolean))].map(
      (message) => h("p", { key: message, role: "alert" }, message),
    ),
    error ? h("p", { role: "alert" }, error) : null,
  );
}

export function CommunityMaintenance() {
  const [value, setValue] = useState(null),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [selected, setSelected] = useState(""),
    [releases, setReleases] = useState(null),
    [release, setRelease] = useState("");
  const [listState, setListState] = useState("loading"),
    [listError, setListError] = useState("");
  const mounted = useRef(false),
    generation = useRef(0),
    running = useRef(false);
  const load = useCallback(async () => {
    const request = ++generation.current;
    setListState("loading");
    setListError("");
    try {
      const result = await apiJson("/dsh-purge/community");
      assertMaintenanceResult(result);
      if (!Array.isArray(result.backups)) throw new Error("некорректный ответ со списком резервных копий");
      if (!mounted.current || request !== generation.current) return;
      setValue(result);
      setSelected((current) =>
        result.backups.some((b) => b.id === current) ? current : "",
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
    if (
      op === "rollback" &&
      !window.confirm(
        "Откатывается только плагин Purge и его точка входа, текущий промпт и настройки сохраняются; после этого нужен перезапуск процесса DSH; обновление страницы не загрузит новый бэкенд. Продолжить?",
      )
    )
      return;
    if (
      op === "update" &&
      !window.confirm(
        "Сначала сделаем резервную копию, затем установим выбранный стабильный релиз community-версии; патчи хоста заново применяться не будут. После установки перезапустите процесс DSH; обновление страницы не загрузит новый бэкенд. Продолжить?",
      )
    )
      return;
    running.current = true;
    setBusy(true);
    setNotice("Выполняется…");
    try {
      const r = await apiJson("/dsh-purge/community", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ op, id: selected, ref: release }),
      });
      assertMaintenanceResult(r);
      if (!mounted.current) return;
      if (op === "check") {
        if (!Array.isArray(r.versions)) throw new Error("некорректный ответ со списком релизов");
        setReleases(r.versions.filter((v) => v.asset));
        setRelease(r.versions.find((v) => v.asset)?.ref || "");
        setNotice(
          r.degraded
            ? `${r.degraded}; ${r.stale ? "сейчас показан кэшированный список, повторите позже" : "показан резервный список"}`
            : r.error
              ? `ошибка проверки обновлений: ${r.error}`
              : r.hasUpdate
                ? `доступна новая версия ${r.remoteVersion}`
                : "установлена последняя стабильная версия",
        );
      } else {
        setNotice(maintenanceNotice(op, r));
      }
    } catch (e) {
      if (mounted.current)
        setNotice(
          e.message === "timeout"
            ? "тайм-аут запроса обслуживания: операция могла продолжиться; сначала обновите состояние и не отправляйте повторно."
            : e.message,
        );
    } finally {
      // A failed write may already have created a recovery snapshot. Read once;
      // never replay the mutation to discover whether it succeeded.
      if (op !== "check" && mounted.current) await load();
      running.current = false;
      if (mounted.current) setBusy(false);
    }
  }
  return h(
    "section",
    { className: "dshpp-panel", "aria-label": "обслуживание community-версии" },
    h("h3", null, "Обслуживание: обновления и локальные копии"),
    h(UpdatePreferences, {
      value: value?.update_preferences,
      status: value?.update_status,
      onSaved: (next) =>
        setValue((current) => ({ ...current, update_preferences: next })),
    }),
    h(
      "div",
      { className: "dshpp-row" },
      h(Btn, { disabled: busy, onClick: () => run("check") }, "Проверить обновления community-версии"),
      h(
        Btn,
        {
          disabled: busy,
          onClick: async () => {
            try {
              const r = await apiJson("/dsh-purge/audit?limit=10");
              const lines = (r.entries || []).map(
                (x) =>
                  `${new Date(x.at).toLocaleString()}  ${x.event}  ${JSON.stringify(
                    Object.fromEntries(
                      Object.entries(x).filter(
                        ([k]) => !["at", "event", "pid"].includes(k),
                      ),
                    ),
                  )}`,
              );
              setNotice(lines.length ? lines.join("\n") : "записей о действиях пока нет");
            } catch (e) {
              setNotice(e.message);
            }
          },
        },
        "Последние действия",
      ),
      h(
        "a",
        {
          href: "https://github.com/kingcharleslzy-ai/dsh-purge/releases",
          target: "_blank",
          rel: "noreferrer",
        },
        "Релизы",
      ),
    ),
    releases?.length
      ? h(
          "div",
          { className: "dshpp-row" },
          h(
            "select",
            {
              "aria-label": "выбор релиза community-версии",
              value: release,
              onChange: (e) => setRelease(e.target.value),
              disabled: busy,
            },
            releases.map((r) =>
              h("option", { key: r.ref, value: r.ref }, r.label),
            ),
          ),
          h(
            Btn,
            { disabled: busy || !release, onClick: () => run("update") },
            "Установить выбранную версию",
          ),
        )
      : null,
    h("h3", { style: { marginTop: 20 } }, "Локальные копии"),
    h(
      Btn,
      { disabled: busy || listState === "loading", onClick: load },
      "Обновить список копий",
    ),
    listState === "loading"
      ? h("p", { role: "status" }, "Читаем резервные копии…")
      : null,
    listState === "error"
      ? h("p", { role: "alert" }, `ошибка чтения резервных копий: ${listError}`)
      : null,
    listState === "ready" && !value.backups.length
      ? h("p", { role: "status" }, "резервных копий пока нет")
      : null,
    h(
      "div",
      { className: "dshpp-row" },
      h(Btn, { disabled: busy, onClick: () => run("backup") }, "Сделать копию"),
      h(
        "select",
        {
          "aria-label": "выбор копии для отката",
          value: selected,
          onChange: (e) => setSelected(e.target.value),
          disabled: busy || listState !== "ready",
        },
        h("option", { value: "" }, "Выберите копию"),
        ...(value?.backups || []).map((b) =>
          h(
            "option",
            { key: b.id, value: b.id },
            `${new Date(b.created_at).toLocaleString()} · ${b.plugins.map((p) => p.version).join(" / ")}`,
          ),
        ),
      ),
      h(
        Btn,
        {
          disabled: busy || !selected || listState !== "ready",
          onClick: () => run("rollback"),
        },
        "Откатить плагин",
      ),
    ),
    h(
      "p",
      { className: "dshpp-hint" },
      "Копии хранятся только на этой машине. Откат сохраняет текущий промпт, правила и настройки других плагинов; после установки или отката нужен перезапуск процесса DSH; обновление страницы не загрузит новый бэкенд.",
    ),
    notice ? h("p", { role: "status" }, notice) : null,
  );
}
