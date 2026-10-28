---
name: active-scan
description: Активное сканирование портов и сервисов (nmap/masscan) со строгим соблюдением авторизованной области
whenToUse: Когда нужно подтвердить доступность активов и открытые порты
role: recon
enabled: true
---

## Предварительные проверки
1. Убедитесь, что целевой CIDR входит в авторизованную область.
2. Убедитесь, что текущее временное окно допускает активное сканирование.

## Команды
- Быстрая проверка доступности: `nmap -sn <cidr>`
- Все порты (с ограничением скорости): `nmap -sS -p- --min-rate 1000 -T4 <target> -oX runs/nmap-full.xml`
- Версии сервисов: `nmap -sV -sC -p <ports> <target> -oX runs/nmap-svc.xml`

## Локально подготовленные инструменты (абсолютные пути; используйте их в приоритете, не пишите вручную)
| Назначение | Команда |
| --- | --- |
| Сканирование портов | `nmap` / `masscan` / `~/.dsh/redteam/toolkit/naabu/naabu` (SYN требует root, иначе добавьте `-scan-type c`) |
| Комплексное сканирование внутренней сети | `~/.dsh/redteam/toolkit/fscan/fscan` (навык fscan-intranet) |
| Картирование/фингерпринт внутренней сети | `~/.dsh/redteam/toolkit/gogo/gogo` (навык gogo-intranet) |
| HTTP-проба (ProjectDiscovery) | `~/.local/bin/pd-httpx` (**внимание: `/usr/bin/httpx` — это CLI библиотеки Python httpx, а не этот инструмент**) |
| Поддомены/резолвинг | `~/.dsh/redteam/toolkit/subfinder/subfinder`, `~/.dsh/redteam/toolkit/dnsx/dnsx` |
| Сканирование PoC | `nuclei` (шаблоны уже в `~/.local/nuclei-templates`) |
| Брутфорс директорий | `ffuf`, `~/.dsh/redteam/toolkit/dirsearch/dirsearch` |
| Туннель | `~/.dsh/redteam/toolkit/suo5/suo5-linux-amd64`, `toolkit/chisel/chisel`, `toolkit/frp/{frpc,frps}` |
| Полный перечень | `~/.dsh/redteam/toolkit/清单.md`, `技能工具清单.md` |

`setup.sh` не скачивает dirsearch. `清单.md` — это файл описания, его отсутствие не значит, что сканер не установлен. Сборки для Windows и ARM тоже не входят в установочный скрипт.

## Требования к сохранению
provenance = `active`, tool = `nmap`/`masscan`, записывать scan_run.
