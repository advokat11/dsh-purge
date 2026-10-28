---
name: web-fingerprint
description: Фингерпринт веб-сервисов: фреймворк, промежуточное ПО, CMS, версии компонентов
whenToUse: Когда обнаружены HTTP/HTTPS-сервисы и нужно определить технологический стек
role: recon
enabled: true
---

## Методы
1. Заголовки ответа: признаки `Server`, `X-Powered-By`, `Set-Cookie`.
2. Признаки страницы: хеш favicon, пути статических ресурсов, страница ошибки, robots.txt.
3. Активное зондирование: шаблоны определения технологий nuclei `nuclei -u <url> -tags tech`; для сводки по доступности HTTP и стеку — `~/.local/bin/pd-httpx -l urls.txt -tech-detect -title -status-code -web-server` (**для версии ProjectDiscovery обязателен pd-httpx, `/usr/bin/httpx` — это CLI библиотеки Python**).
4. Для массового фингерпринта больших подсетей используйте навык `gogo-intranet` (`gogo -i <cidr> -p top2 -v --af`, для активного фингерпринта нужно добавить `-v`).
5. Сверка версий: по фингерпринту вывести продукт и версию, чтобы подготовиться к поиску уязвимостей.

## Требования к сохранению
Запись в таблицу fingerprint: category (фреймворк/промежуточное ПО/CMS/компонент), vendor, product, version, evidence.
