---
name: fofa-recon
description: Массовое картирование активов цели через FOFA API (домен/IP/порт/заголовок/фингерпринт); встроенный клиент с ограничением скорости — строго один поток + минимальный интервал + backoff-повторы, чтобы не поймать 45012
whenToUse: Когда на этапе разведки нужно быстро развернуть интернет-поверхность активов организации или домена
role: recon
enabled: true
---

# Картирование активов FOFA (безопасная версия с лимитами)

## Учётные данные
- API Key: читается из переменной окружения `FOFA_KEY` (**никакой key не пишите в репозиторий**; все скрипты навыка читают только переменную окружения)
- Эндпоинт: `GET https://fofa.info/api/v1/search/all`
- Параметры: `key`, `qbase64` (base64 от поискового запроса), `size`, `page`, `fields`

## Официальные лимиты (fofa.info/vip, проверено 2026-09)

| Тариф | Запросы | Объём данных | **Параллельность API** |
|---|---|---|---|
| Зарегистрированный пользователь (бесплатно) | API нет (страница: 300 раз/мес) | 3,000 записей/мес через страницу | — |
| Персональный | 10,000 раз/мес | 100,000 записей/мес | **1 раз в секунду** |
| Профессиональный | 80,000 раз/мес | 800,000 записей/мес | **1 раз в секунду** |
| Коммерческий | 900,000 раз/мес | 9,000,000 записей/мес | **2 раза в секунду** |
| Корпоративный V2 | 5,000,000 раз/мес | 50,000,000 записей/мес | **5 раз в секунду** |

## Фактическое поведение (проверено на практике)
- Частые запросы подряд → **HTTP 429**, тело ответа `{"error":true,"errmsg":"[45012] слишком высокая частота запросов"}`
- Неверный key → HTTP 200 + `{"error":true,"errmsg":"[-700] недействительный аккаунт"}`
- `size` до 1000 на одну страницу работает нормально; при интервале ≥1 секунды все последовательные запросы возвращают 200
- Вывод: **работаем консервативно — 1 запрос/сек, никакой параллельности**; при 45012 обязателен backoff, не повторяйте сразу

## Дисциплина использования (важно)
1. **Точные запросы в приоритете**: `domain=` / `cert=` / `org=` сначала сужают область, и только потом берите широкие `body=` / `title=`. Широкие запросы отдают сотни тысяч записей — бесполезно и сжигает квоту.
2. **Не перелистывайте всё**: по умолчанию берите первые 1–3 страницы (по 100 записей) — этого достаточно, чтобы получить точку входа для картирования.
3. **Один процесс, один поток**: одновременно выполняется только одна задача сбора; несколько запросов выстраиваются в очередь последовательно.
4. **Результаты кешируются на диск**: один и тот же запрос не тяните повторно, сначала проверьте, есть ли уже `runs/fofa-*.jsonl`.
5. **Долгие задачи — в фон**: запускайте через `run_in_background`, не блокируйте диалог.
6. Когда квота исчерпана или вас ограничили по скорости, переходите на другие источники (прозрачность сертификатов, DNS, поисковые системы), не упирайтесь в одно.

## Клиент с ограничением скорости (используйте его, не пишите цикл curl руками)
```bash
cat > runs/fofa_client.py <<'PY'
#!/usr/bin/env python3
"""Сбор данных FOFA (безопасно по лимитам): один поток + минимальный интервал + экспоненциальный backoff + кеш результатов.

Использование:
  python3 runs/fofa_client.py 'domain="example.com"' --pages 2 --size 100 --interval 2.0
Вывод:
  runs/fofa-<slug>.jsonl   по одной строке на актив {host,ip,port,title,domain,server,protocol}
"""
import argparse, base64, hashlib, json, os, sys, time, urllib.error, urllib.parse, urllib.request

KEY = os.environ["FOFA_KEY"]
API = "https://fofa.info/api/v1/search/all"
FIELDS = "host,ip,port,title,domain,server,protocol"
RETRY_BACKOFF = [5, 15, 45]          # секунды backoff при 45012
HARD_BUDGET = 30                      # максимум запросов за один запуск


def fetch(query, page, size, timeout=30):
    qs = urllib.parse.urlencode({
        "key": KEY, "qbase64": base64.b64encode(query.encode()).decode(),
        "size": size, "page": page, "fields": FIELDS,
    })
    req = urllib.request.Request(API + "?" + qs, headers={"User-Agent": "redteam-recon/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "ignore")
        try:
            return e.code, json.loads(body)
        except Exception:
            return e.code, {"error": True, "errmsg": body[:200]}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("query")
    ap.add_argument("--pages", type=int, default=2, help="сколько страниц максимум (по умолчанию 2)")
    ap.add_argument("--size", type=int, default=100, help="записей на страницу (по умолчанию 100, не увеличивайте)")
    ap.add_argument("--interval", type=float, default=2.0, help="минимальный интервал между запросами в секундах (по умолчанию 2.0)")
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    slug = hashlib.md5(args.query.encode()).hexdigest()[:8]
    out = args.out or f"runs/fofa-{slug}.jsonl"
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)

    if os.path.exists(out) and os.path.getsize(out) > 0:
        print(f"[cache] {out} уже существует ({os.path.getsize(out)} bytes), для повторной загрузки удалите файл", file=sys.stderr)
        return 0

    seen, rows, requests_made, last_ts = set(), [], 0, 0.0
    for page in range(1, args.pages + 1):
        # ---- ограничение скорости: между запросами минимум interval секунд ----
        wait = args.interval - (time.time() - last_ts)
        if wait > 0:
            time.sleep(wait)

        status, data = None, None
        for attempt, backoff in enumerate([0] + RETRY_BACKOFF):
            if attempt:
                print(f"[backoff] ждём {backoff}s и повторяем (page={page})", file=sys.stderr)
                time.sleep(backoff)
            last_ts = time.time()
            requests_made += 1
            if requests_made > HARD_BUDGET:
                print(f"[stop] достигнут бюджет запросов {HARD_BUDGET}", file=sys.stderr)
                break
            status, data = fetch(args.query, page, args.size)
            if status == 200 and not data.get("error"):
                break
            errmsg = str(data.get("errmsg", ""))
            if "45012" in errmsg or status == 429:
                continue                      # ограничение скорости → backoff и повтор
            print(f"[stop] неповторяемая ошибка http={status} {errmsg}", file=sys.stderr)
            data = None
            break
        if data is None:
            break

        results = data.get("results") or []
        print(f"[page {page}] {len(results)} записей (size={data.get('size')}, потрачено F-точек={data.get('consumed_fpoint')})", file=sys.stderr)
        for item in results:
            if isinstance(item, str):
                item = [item]
            host = item[0] if len(item) > 0 else ""
            ip = item[1] if len(item) > 1 else ""
            port = item[2] if len(item) > 2 else ""
            key = (host, ip, port)
            if key in seen:
                continue
            seen.add(key)
            rows.append({
                "host": host, "ip": ip, "port": port,
                "title": item[3] if len(item) > 3 else "",
                "domain": item[4] if len(item) > 4 else "",
                "server": item[5] if len(item) > 5 else "",
                "protocol": item[6] if len(item) > 6 else "",
            })
        if len(results) < args.size:
            break                              # последняя страница

    with open(out, "w", encoding="utf-8") as f:
        for row in rows:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")
    print(f"[done] {len(rows)} активов → {out} (всего {requests_made} запросов)", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
PY
```

### Использование
```bash
mkdir -p runs
python3 runs/fofa_client.py 'domain="example.com"' --pages 2 --size 100 --interval 2.0
python3 runs/fofa_client.py 'cert="example.com"' --pages 3 --interval 2.0
python3 runs/fofa_client.py 'org="ООО «Пример»"' --pages 2 --interval 2.0
```

### Запись в базу
Читайте `runs/fofa-*.jsonl` и для каждой записи вызывайте `redteam_asset_add`: `provenance="passive"`, `tool="fofa"`, порт с `url=host`, `title`, `product=server`; домен записывается в `names`.

## Частые поисковые запросы
| Цель | Запрос |
|---|---|
| Все активы домена | `domain="example.com"` |
| Сертификат содержит домен | `cert="example.com"` |
| Некая подсеть C | `ip="203.0.113.0/24"` |
| Название организации | `org="ООО «Пример»"` |
| Найти админку по заголовку | `title="login" && domain="example.com"` |
| По признаку в body | `body="/seeyon/"` |
| Конкретный порт | `ip="203.0.113.0/24" && port="3306"` |

> Широкие запросы (только `body=` / `title=`) дают много результатов и быстро сжигают квоту — обязательно добавляйте ограничение по домену или IP.
