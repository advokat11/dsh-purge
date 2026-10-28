---
name: browser-automation
description: Управление Chrome/Chromium без зависимостей для сбора JS-отрендеренных страниц, скриншотов, выполнения JS и списка интерфейсов (headless-вариант + playwright-cli)
whenToUse: Когда нужно отрендерить SPA / получить контент, созданный JS / сделать скриншот как доказательство / массово собирать страницы (первый выбор, если расширение Kimi недоступно)
role: recon
enabled: true
---

# Автоматизация браузера (headless Chrome)

На этой машине: `/usr/bin/chromium` 150.0.7871.181, `DISPLAY=:10.0`, Node v22.23.2.

## 1. Без зависимостей: командная строка chromium (самый надёжный вариант)
```bash
CHROME=/usr/bin/chromium
FLAGS="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --virtual-time-budget=8000"

# 1) получить отрендеренный DOM (SPA тоже отдаст контент)
$CHROME $FLAGS --dump-dom "https://target.example.com/" 2>/dev/null > runs/page.html

# 2) только чистый текст
$CHROME $FLAGS --dump-dom "https://target.example.com/" 2>/dev/null \
  | python3 -c "import sys,re;h=sys.stdin.read();print(re.sub(r'<[^>]+>',' ',re.sub(r'(?is)<(script|style).*?</\1>',' ',h)))" | head -200

# 3) скриншот как доказательство
$CHROME $FLAGS --window-size=1440,900 --screenshot=runs/shot-$(date +%s).png "https://target.example.com/"

# 4) доступ с Cookie (переиспользование сессии: экспортируйте Cookie из Burp/браузера и подставьте)
$CHROME $FLAGS --user-data-dir=/tmp/rt-profile --dump-dom "https://target.example.com/admin"

# 5) сформировать PDF
$CHROME $FLAGS --print-to-pdf=runs/page.pdf "https://target.example.com/"
```

### Сбор списка фронтенд-интерфейсов (ключевой этап разведки)
```bash
# выполнить JS через chromium и вывести результат
$CHROME $FLAGS --dump-dom "https://target.example.com/" 2>/dev/null > runs/page.html
python3 - <<'PY'
import re, json, pathlib
html = pathlib.Path('runs/page.html').read_text(errors='ignore')
paths = set(re.findall(r'["\'](/(?:api|rest|v[0-9]|admin|user|order|upload|file)[A-Za-z0-9_\-/{}.:]{0,80})["\']', html))
print('\n'.join(sorted(paths)))
PY
# затем скачать JS-ресурсы по одному и извлечь из них:
grep -oE 'src="[^"]+\.js[^"]*"' runs/page.html | sed 's/src="//;s/"$//' | while read u; do
  case "$u" in http*) url="$u";; /*) url="https://target.example.com$u";; *) url="https://target.example.com/$u";; esac
  curl -s "$url" | grep -oE '["\'](/(api|rest|v[0-9])[A-Za-z0-9_\-/{}.:]{0,80})["\']' | tr -d '"'"'" >> runs/interfaces.txt
done
sort -u runs/interfaces.txt
```

## 2. playwright-cli (когда нужны взаимодействие, ожидание, много страниц)
**Браузер на этой машине уже установлен** (`~/.cache/ms-playwright/chromium-1243`, однократный `npx playwright install chromium` выполнен). Внимание: **по умолчанию используется канал chrome, что даёт ошибку `Chromium distribution 'chrome' is not found`, поэтому обязательно добавляйте `--browser chromium`**.

```bash
PW="npx --yes @playwright/cli@latest"
$PW -s=recon1 open --browser chromium "https://target.example.com/"   # открыть (-s задаёт имя сессии)
$PW -s=recon1 snapshot                                                # дерево доступности + ссылки на элементы @e
$PW -s=recon1 eval "() => document.title"                             # выполнить JS
$PW -s=recon1 find "login"                                              # искать текст в снапшоте
$PW -s=recon1 click "@e5"                                             # клик
$PW -s=recon1 fill "@e7" "admin"                                      # заполнить поле
$PW -s=recon1 screenshot --path runs/pw.png                           # скриншот
$PW -s=recon1 --persistent --profile runs/pw-profile open --browser chromium URL   # переиспользовать сессию
$PW -s=recon1 close                                                   # закрыть сессию
```

Переиспользование сессии: `--persistent --profile <dir>`; после первого входа этот profile сохраняет Cookie, и дальше достаточно открыть тот же profile — сессия уже авторизована.
Частые подкоманды: `open / goto / snapshot / find / eval / click / fill / press / upload / screenshot / resize / reload / go-back / close / list`.

## 3. Как выбирать
| Сценарий | Что использовать |
|---|---|
| Нужны только контент страницы, скриншот, список интерфейсов | командная строка chromium (без зависимостей, быстрее всего) |
| Нужны клики, формы, ожидание, несколько вкладок | playwright-cli (`--browser chromium`)|
| Нужно переиспользовать реальную сессию пользователя | Kimi WebBridge (навык `kimi-webbridge`, требуется расширение) |

## Замечания
- `--no-sandbox` используйте только в локальной лабораторной среде; не переносите этот флаг в продакшн.
- Собранные URL и заголовки записывайте обратно через `redteam_asset_add` (поля `url`/`title`), список интерфейсов — в `runs/`, ссылайтесь на него в цепочке атаки.
- Скриншоты и содержимое страниц могут содержать чувствительные данные: складывайте их только в `runs/`, не пишите в базу активов.
