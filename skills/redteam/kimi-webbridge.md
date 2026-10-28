---
name: kimi-webbridge
description: Управление реальным Chrome/Chromium пользователя через браузерное расширение Kimi от Moonshot (WebBridge): навигация, чтение страницы, клики, формы, выполнение JS, скриншоты
whenToUse: Когда нужно переиспользовать сессию входа в браузере для доступа в админку / нужна страница с рендерингом JS / нужен настоящий фингерпринт браузера
role: recon
enabled: true
---

# Kimi WebBridge (браузерное расширение + локальный демон)

Установлено и работает: демон **v2.0.8** (systemd-служба `kimi-webbridge`, автозапуск), слушает `127.0.0.1:10086`, бинарник `~/.kimi-webbridge/bin/kimi-webbridge`.

## Текущее состояние (проверено 2026-09)
- Демон: **управляется systemd** (`/etc/systemd/system/kimi-webbridge.service`, `enabled` + `active`, `Restart=on-failure`).
  Проверка статуса: `systemctl status kimi-webbridge`; перезапуск — `sudo systemctl restart kimi-webbridge`.
  **Не запускайте вручную `kimi-webbridge start`/`upgrade`** — появится отдельный процесс, а systemd станет inactive; для обновления выполните
  `sudo systemctl stop kimi-webbridge && ~/.kimi-webbridge/bin/kimi-webbridge upgrade && sudo systemctl start kimi-webbridge`.
- Расширение: **Kimi WebBridge v2.0.8, ставится автоматически из Chrome Web Store по корпоративной политике** (ID расширения `fldmhceldgbpfpkbgopacenieobmligc`).
  Файлы политики `/etc/opt/chrome/policies/managed/kimi-webbridge.json` и `/etc/chromium/policies/managed/kimi-webbridge.json`
  задают `ExtensionSettings.force_installed` + `ExtensionInstallForcelist`, поэтому **любой профиль Chrome / Chromium открывается уже с расширением, обновляется автоматически и включён постоянно**.
- Chrome 137+ игнорирует `--load-extension` (обход через `--disable-features=…` тоже не работает), поэтому **больше не используйте загрузку распакованного расширения**.
- Если `status` показывает `extension_connected: false`: в 99% случаев **просто не запущен браузер** — запустите любой браузер (`kimi-chrome` или просто иконку Chrome/Chromium), и в течение 5 секунд соединение установится.
- Для простого получения содержимого страницы лучше навык `browser-automation` (быстрее, не зависит от окна браузера); **когда нужно переиспользовать реальную сессию входа, нужен этот навык**

## Предварительные требования
1. Демон запущен: `~/.kimi-webbridge/bin/kimi-webbridge status` должен показывать `"running": true` (автозапуск, обычно вмешательство не нужно).
2. **Обязательно должен работать браузер** (расширение держит соединение, только пока жив процесс браузера). Средство запуска `~/.local/bin/kimi-chrome`:
   - по умолчанию запускает Chrome с **профилем по умолчанию** (с реальной сессией входа — в этом и ценность моста);
   - `KIMI_BROWSER=chromium kimi-chrome` переключает на Chromium; `KIMI_PROFILE=/path kimi-chrome` задаёт отдельный профиль (без сессии входа).
3. Проверка соединения:
```bash
curl -s http://127.0.0.1:10086/status | python3 -m json.tool
# обязательно должно быть "extension_connected": true, иначе дальнейшие команды упадут
```

## Способ вызова
```bash
WB=http://127.0.0.1:10086/command
call() { printf '%s' "$2" > /tmp/wb.json; curl -s -X POST $WB -H 'Content-Type: application/json' --data-binary @/tmp/wb.json; }
```
> JSON с китайским текстом всегда передавайте через временный файл + `--data-binary`, не встраивайте через echo/heredoc.

### Частые действия
```bash
# открыть страницу (новая вкладка)
call navigate '{"action":"navigate","args":{"url":"https://target.example.com/login","newTab":true,"group_title":"recon"},"session":"recon1"}'

# прочитать чистый текст страницы (самое частое)
call evaluate '{"action":"evaluate","args":{"code":"(() => document.body.innerText.slice(0,6000))()"},"session":"recon1"}'

# получить дерево доступности (со ссылками на элементы @e для последующих click/fill)
call snapshot '{"action":"snapshot","args":{},"session":"recon1"}'

# выполнить произвольный JS: собрать список фронтенд-интерфейсов (главный инструмент разведки и поиска API)
call evaluate '{"action":"evaluate","args":{"code":"(() => {const s=new Set();for(const e of performance.getEntriesByType(\"resource\"))s.add(e.name);const m=document.documentElement.innerHTML.match(/[\\\"\\x27]\\/(api|v[0-9])\\/[a-zA-Z0-9_\\-\\/{}]+/g)||[];m.forEach(x=>s.add(x));return [...s].slice(0,200).join(\"\\n\")})()"},"session":"recon1"}'

# клик / заполнение формы
call click '{"action":"click","args":{"ref":"@e12"},"session":"recon1"}'
call fill  '{"action":"fill","args":{"ref":"@e15","value":"admin"},"session":"recon1"}'

# скриншот (возвращает путь к файлу, а не base64)
call screenshot '{"action":"screenshot","args":{"path":"$DSH_HOME/redteam/engagements/<цель>/runs/shot.png"},"session":"recon1"}'

# перехватить сетевые запросы (поиск API)
call network '{"action":"network","args":{},"session":"recon1"}'

# список/закрытие вкладок
call list_tabs '{"action":"list_tabs","args":{},"session":"recon1"}'
call close_session '{"action":"close_session","args":{},"session":"recon1"}'
```
Прямая передача CDP (для продвинутых): `{"action":"cdp","args":{"method":"Network.getAllCookies"}}`.

## Использование в процессе red team
- **Поиск интерфейсов**: открыть сайт → `evaluate` собирает resource timing + пути API из JS на странице → список интерфейсов передаётся роли поиска уязвимостей для проверки прав и отсутствия авторизации.
- **Страницы с сессией входа**: админку, где пользователь уже вошёл в браузере, можно читать через `navigate` + `evaluate` без повторного входа.
- **Сайты с рендерингом на JS**: реалистичнее curl, даёт DOM после рендеринга SPA.
- Найденные URL и заголовки как обычно записывайте через `redteam_asset_add` (`tool="kimi-webbridge"`).

## Ограничения (обязательно знать)
- **Без headless**: нужна графическая сессия (на этой машине `DISPLAY=:10.0` доступен).
- Поддерживаются только Chrome/Edge; кросс-доменные iframe не поддерживаются; `click`/`fill` — синтетические события, капча и банковские контролы не сработают.
- Расширение жёстко связано версией с демоном: если в `status` поле `update_available` не пустое, обновляйте демон по схеме systemd: остановка → `upgrade` → запуск; расширение политикой обновляется автоматически до последней версии.
- Linux не входит в официальную матрицу поддержки (работает, но без гарантий).

## Запасной вариант без расширения
См. навык `browser-automation` (headless chromium без зависимостей).
