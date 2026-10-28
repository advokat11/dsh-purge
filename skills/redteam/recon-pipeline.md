---
name: recon-pipeline
description: Конвейер разведки ProjectDiscovery: subfinder→dnsx→naabu→httpx→katana — развернуть поверхность активов домена одной цепочкой
whenToUse: На этапе разведки, когда есть домен или название организации, — системно развернуть цепочку поддомены→резолвинг→порты→живость→страницы и интерфейсы
role: recon
enabled: true
---

# Конвейер внешней разведки (ProjectDiscovery)

Превратить «один домен» в «список живых активов с заголовками, технологическим стеком и портами» — стандартное действие этапа разведки.
У четырёх инструментов **фиксированный порядок**: сначала перечисление поддоменов → затем резолвинг → затем порты → затем проверка живости → в конце сбор страниц и интерфейсов.

## Инструменты на этой машине

| Инструмент | Путь | Версия | Назначение |
| --- | --- | --- | --- |
| subfinder | `$DSH_HOME/redteam/toolkit/subfinder/subfinder` | v2.16.0 | Пассивное перечисление поддоменов (агрегация нескольких источников) |
| dnsx | `$DSH_HOME/redteam/toolkit/dnsx/dnsx` | v1.3.1 | Массовый резолвинг, DNS-брутфорс, фильтрация wildcard-записей |
| naabu | `$DSH_HOME/redteam/toolkit/naabu/naabu` | v2.6.1 | Быстрое сканирование портов (SYN требует root, иначе `-scan-type c`) |
| httpx | `$DSH_HOME/redteam/toolkit/httpx/httpx` (обёртка `~/.local/bin/pd-httpx`) | v1.12.0 | HTTP-живость/заголовок/стек/код ответа |
| katana | ❌ не установлен (для сбора используйте навык `browser-automation`) | — | Паук для страниц и интерфейсов |
| ksubdomain | `$DSH_HOME/redteam/toolkit/ksubdomain/ksubdomain` | v0.7 | Безостановочный брутфорс поддоменов (быстрее, чем у dnsx) |
| OneForAll | `$DSH_HOME/redteam/toolkit/oneforall/OneForAll-0.4.5/` (исходники, нужен `.venv`) | v0.4.5 | Полный набор для сбора поддоменов (большие словари, медленно, но полно) |

> ⚠️ **`/usr/bin/httpx` — это CLI библиотеки Python httpx, а не ProjectDiscovery** — обязательно используйте `pd-httpx` или абсолютный путь.

## Стандартный конвейер

```bash
mkdir -p runs
TK=$DSH_HOME/redteam/toolkit
D=example.com

# ① перечисление поддоменов (пассивно, несколько источников)
$TK/subfinder/subfinder -d $D -all -silent -o runs/subfinder-$D.txt
# дополнение: безостановочный брутфорс (при наличии словаря)
# $TK/ksubdomain/ksubdomain -d $D -f /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt

# ② фильтрация wildcard + резолвинг живых (dnsx убирает шум wildcard-записей, шаг очень важен)
cat runs/subfinder-$D.txt | $TK/dnsx/dnsx -silent -a -resp -o runs/dnsx-$D.txt
awk '{print $1}' runs/dnsx-$D.txt | sort -u > runs/alive-domains-$D.txt

# ③ сканирование портов (сначала быстро top100, затем все порты по живым хостам)
$TK/naabu/naabu -l runs/alive-domains-$D.txt -top-ports 100 -silent -o runs/naabu-$D.txt
# все порты (медленно, делать после подтверждения области): -p - -rate 1000

# ④ живость HTTP и фингерпринт (заголовок/код ответа/стек/сервер)
$TK/httpx/httpx -l runs/alive-domains-$D.txt -ports 80,443,8080,8443,8000,8888,9000 \
  -title -status-code -tech-detect -web-server -follow-redirects -silent \
  -json -o runs/httpx-$D.jsonl

# ⑤ собрать список активов (список URL для брутфорса каталогов и сканирования уязвимостей)
python3 - <<'PY'
import json
out=set()
for line in open('runs/httpx-'+'$D'+'.jsonl'):
    try: j=json.loads(line)
    except: continue
    if j.get('url'): out.add(j['url'])
open('runs/alive-urls.txt','w').write('\n'.join(sorted(out)))
print('живых URL:', len(out))
PY
```

## Краткие отдельные команды (когда полный конвейер не нужен)

```bash
# только поддомены
$TK/subfinder/subfinder -d example.com -all -silent

# только живые URL (список доменов уже есть)
pd-httpx -l domains.txt -silent -o alive.txt

# только порты (один IP, все порты)
nmap -sS -p- --min-rate 1000 -T4 1.2.3.4 -oX runs/nmap-1.2.3.4.xml   # навык active-scan
$TK/naabu/naabu -host 1.2.3.4 -p - -rate 1000 -silent
```

## Разделение с другими навыками

| Сценарий | Что использовать |
| --- | --- |
| Название организации/домен → интернет-поверхность (включая незарегистрированные и принадлежащие тому же владельцу) | **`fofa-recon`** (картирование, находит полнее всего) |
| Домен → поддомены → живость → фингерпринт | **этот навык** (конвейер, стандартизированный) |
| Без обращения к цели (чисто пассивно) | `passive-recon` (crt.sh/dig/whois) |
| Картирование больших сегментов внутренней сети | `gogo-intranet` (**не используйте этот навык для внутренней сети**) |
| SPA/JS-рендеринг страниц, список интерфейсов | `browser-automation` / `kimi-webbridge` |
| Порты и версии сервисов на живых хостах | `active-scan` (nmap/masscan) |

**Рекомендуемый порядок**: `fofa-recon` разворачивает поверхность (общая картина активов организации) → этот навык прогоняет конвейер по каждому домену (живость и фингерпринты) → `active-scan` уточняет версии по ключевым IP.

## Дисциплина

1. **Проверяйте только цели в авторизованной области**: все порты naabu и брутфорс ksubdomain — **активные** действия, делайте их после подтверждения области.
2. **Ограничение скорости**: начинайте с `naabu -rate 1000`; `subfinder` без `-all` на пассивных источниках тише (и меньше тратит квоту).
3. **Wildcard-записи**: `dnsx` их фильтрует; если в результатах много случайных поддоменов с одним IP, значит у цели есть wildcard — используйте `-wd` или смените словарь брутфорса.
4. **API key (необязательное усиление)**: настроив `~/.config/subfinder/provider-config.yaml`, `subfinder` может подключать
   источники Shodan/Censys/VirusTotal и др. (**key должен предоставить пользователь**, см. навык `redteam-setup`); без key тоже работают бесплатные источники.

## Вывод и запись в базу (обязательно)

1. **По одной записи `redteam_asset_add`**: `target` (домен/IP), `names` (домены), `ports` (с `url=host`, `title`, `product=server`),
   `provenance=passive` (этап subfinder/dnsx) или `active` (активное зондирование naabu/httpx), `tool` (имя конкретного инструмента).
2. **Подсети C создаются по /24 автоматически** (`redteam_asset_add` делает это сам) → через `redteam_asset_link` создайте
   связи `resolves` (домен→IP), `contains` (подсеть C→IP) и получите граф (навык `asset-correlation`).
3. Каждый этап — `redteam_chain_add`: `stage_code=recon`, в `tool` — фактический текст команды, в `result` — сводка по числам
   (например `subfinder нашёл 42 поддомена → dnsx 31 живой → naabu 87 открытых портов → httpx 19 живых сайтов`).
4. **Отдельно помечайте периферийные активы**: тестовые/предпродукционные среды (test/dev/uat/pre/staging), устаревшие системы, нестандартные порты,
   сайты другого владельца, но в той же подсети C/IP, — пишите в `note`: на этапе инвентаризации это цели высокого приоритета.
5. Руководителю в выводах **давайте числа**: число поддоменов / живых IP / открытых портов / живых сайтов / сколько из них высокого приоритета.
