---
name: dir-bruteforce
description: Брутфорс каталогов и файлов: входы в админку, бэкапы, утечки конфигурации, раскрытие исходников и репозиториев (ffuf/feroxbuster/dirsearch/gobuster)
whenToUse: Веб-сервис уже подтверждённо жив, но фингерпринт не даёт зацепок на Nday; нужно найти скрытые пути — админку, бэкапы, конфиги, исходники, точки загрузки
role: vuln-scan
enabled: true
---

# Брутфорс каталогов и файлов (основная сила для поиска входов)

**В реальной работе большинство входов находится не через CVE, а через брутфорс каталогов**: админка `/admin`, бэкап `www.zip`, конфиг `.env`,
исходники `.git/`, документация API `swagger-ui.html`, точки загрузки, отладочные страницы, консоли мониторинга actuator/druid.
Этот навык покрывает четыре уже установленных на машине инструмента, и **использовать нужно не один** — у них разные словари и логика определения попаданий, они дополняют друг друга.

## Инструменты на этой машине

| Инструмент | Путь | Версия | Особенности |
| --- | --- | --- | --- |
| **feroxbuster** | `/usr/bin/feroxbuster` | 2.13.1 | Rust, лучший рекурсивный брутфорс, сам обходит уровни каталогов, **первый выбор** |
| **ffuf** | `/usr/bin/ffuf` | 2.1.0-dev | Самый быстрый и гибкий, поддерживает несколько словарей/vhost/fuzz параметров |
| **dirsearch** | `$DSH_HOME/redteam/toolkit/dirsearch/dirsearch` | v0.5.0 | Python. `setup.sh` его не скачивает, нужно положить по этому пути самостоятельно |
| **gobuster** | `/usr/bin/gobuster` | — | Лёгкий и стабильный, режимы dir/dns/vhost |

## 1. feroxbuster (первый выбор: рекурсия + автофильтрация)

```bash
feroxbuster -u https://target.example.com \
  -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt \
  -x php,asp,aspx,jsp,html,js,zip,tar.gz,bak,sql,txt,xml,json,config \
  -d 3 -t 30 --rate-limit 80 --timeout 10 \
  --filter-status 404 --filter-size 0 \
  -o runs/ferox-target.txt --json -o runs/ferox-target.json
```

Важное: `-d 3` (глубина рекурсии) не задирайте; `--rate-limit` даёт серверу дышать; в списке `-x` обязательно должны быть **бэкапы и конфиги**.

## 2. ffuf (самый быстрый, несколько словарей / vhost / параметры)

```bash
# каталоги и файлы (два прохода: сначала каталоги, затем по найденным каталогам с расширениями)
ffuf -u https://target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt \
  -mc 200,204,301,302,307,401,403,500 -fc 404 -t 40 -rate 80 -timeout 10 \
  -o runs/ffuf-dir.json -of json

# чувствительные файлы (бэкапы/конфиги/исходники/ключи)
ffuf -u https://target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/quickhits.txt \
  -mc all -fc 404 -t 40 -o runs/ffuf-quick.json -of json

# поиск виртуальных хостов vhost (несколько сайтов на одном IP, периферийные активы часто находятся здесь)
ffuf -u https://target/ -H "Host: FUZZ.example.com" \
  -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt \
  -fs 0 -mc all -t 50 -o runs/ffuf-vhost.json -of json
```

## 3. dirsearch (полные словари, удобно закрывать пробелы)

```bash
$DSH_HOME/redteam/toolkit/dirsearch/dirsearch \
  -u https://target.example.com -e php,asp,aspx,jsp,zip,bak,txt,sql,json \
  --random-agent -t 30 --delay 0.1 --exclude-status 404 \
  -r -R 3 --format json -o runs/dirsearch-target.json
```

## 4. gobuster (лёгкий вариант на подхвате)

```bash
gobuster dir -u https://target -w /usr/share/seclists/Discovery/Web-Content/common.txt \
  -x php,asp,aspx,jsp,zip,bak -t 30 -k -o runs/gobuster-target.txt
```

## Словари (уже есть на машине, используйте в приоритете)

| Назначение | Путь |
| --- | --- |
| Большой словарь каталогов | `/usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt` |
| Средний словарь каталогов | `/usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt` |
| Частые файлы | `/usr/share/seclists/Discovery/Web-Content/common.txt` |
| Чувствительные файлы (quickhits) | `/usr/share/seclists/Discovery/Web-Content/quickhits.txt` |
| Поддомены (для vhost) | `/usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt` |

Каталоги словарей: `/usr/share/seclists`, `/usr/share/wordlists`. **Если словаря нет**, соберите небольшой словарь из слов организации
(название бренда, аббревиатуры из пиньиня), уже собранных в `redteam_credential_list` — целевой словарь обычно результативнее общего большого.

## Ключевые цели (нашли — доводите до конца)

| Попадание | Что дальше |
| --- | --- |
| `/admin`, `/manage`, `/login`, пути админки | Передать в линию доступа к аккаунтам: пароли по умолчанию/слабые пароли (навык `credential-attack`) |
| `.git/`, `.svn/`, `.env`, `config.php.bak`, `www.zip`, `web.rar` | **Утечка исходников и конфигурации**: скачать и искать строки подключения к БД, ключи, захардкоженные учётные данные → `redteam_credential_add` |
| `swagger-ui.html`, `/v2/api-docs`, `/openapi.json` | Извлечь полный список интерфейсов → проверка на отсутствие авторизации и обход прав (навык `unauth-exploit`) |
| `actuator`, `druid`, `/console`, `/jmx` | Консоли мониторинга без авторизации, часто ведут сразу к RCE или базе данных |
| Точки загрузки, импорт, восстановление из бэкапа, дизайн шаблонов/отчётов | Передать роли эксплуатации для сборки цепочки получения shell |
| `.ssh/`, `id_rsa`, `*.pem`, `*.jks` | Утечка приватных ключей → сразу пробовать вход (`ssh -i`) |

## Снижение шума и самосохранение

1. **Сначала нужно отфильтровать «мягкие» 404**: запросите несуществующий случайный путь, посмотрите код ответа и длину тела — по ним задайте `--filter-size` / `-fs`.
2. **Ограничение скорости**: начинайте с `-rate 80` / `--delay 0.1` / `-t 30`; если поймал WAF (много 403/429), снижайте до 5–10 req/s.
3. **Не трогайте опасные пути**: `/logout`, `/reboot`, `/shutdown`, `/delete*`, `/reset*` — меняющие состояние не брутфорсьте,
   и из словарей их исключайте (это ломает бизнес, и в зачёт учения такие находки не идут).
4. **Больше 3 блокировок — отказывайтесь** от актива (`redteam_asset_test` status=abandoned + blocked=true) и переходите к следующему.
5. **Цели во внутренней сети — через туннель**: feroxbuster `--proxy socks5://127.0.0.1:1080`, ffuf `-x socks5://127.0.0.1:1080`
   (навык `suo5-tunnel`).

## Вывод и запись в базу (обязательно)

1. **Сам по себе скрытый путь очков не даёт**, но **каждый путь, где что-то нашлось, нужно записать в базу**:
   - найдена админка/точка загрузки/документация API → записать в `surface` теста актива `redteam_asset_test` (в режиме добавления) и передать следующему действию поиска/эксплуатации уязвимостей;
   - утёкшие исходники/конфиги/ключи/учётные данные → `redteam_credential_add` (`source=утечка конфигурации`, в `tool` путь и команда, открытый пароль в `secret_value`);
   - интерфейсы и консоли, доступные без авторизации → сразу `redteam_vuln_add` (с выдержкой в `evidence`) + `redteam_http_evidence_add`.
2. Каждое ключевое действие — `redteam_chain_add`: `stage_code=internet` (или `internal`),
   в `tool` — фактический текст команды (например `feroxbuster -u https://target -w raft-large-directories.txt -x php,zip,bak -d 3 --rate-limit 80`),
   в `result` — сводка попаданий (например `найдены /admin/, /backup/www.zip, /.env`).
3. Сразу после прогона пишите обратно `status`/`test`/`surface` через `redteam_asset_test` — без статуса следующий человек обязательно пересканирует.
4. Словари и файлы результатов — всегда в `runs/` (отчёт должен воспроизводиться).
