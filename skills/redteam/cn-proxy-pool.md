---
name: cn-proxy-pool
description: Пул бесплатных китайских HTTP/SOCKS5-прокси: сбор, проверка живости, ротация по необходимости; прокси задаётся только параметром команды, сетевые и прокси-настройки машины не меняются никогда
whenToUse: Когда у цели есть WAF или риск блокировки IP, либо нужны высокочастотные запросы (брутфорс интерфейсов, сканирование каталогов, password spraying)
role: vuln-scan
enabled: true
---

# Пул бесплатных китайских IP-прокси

Бесплатные прокси нестабильны: их задача — **снизить риск блокировки**, а не скрыть личность. Для ключевых целей в приоритете собственный выход или туннель suo5.

## ⛔ Железное правило: не трогать сетевые и прокси-настройки машины

Прокси **разрешается задавать только временно, в одной команде**; ни при каких условиях не меняйте настройки машины. Всё перечисленное ниже запрещено:

| Запрещено | Пояснение |
|---|---|
| Установка системного прокси | Сетевые настройки GNOME/KDE, `gsettings set org.gnome.system.proxy …`, `networksetup -setwebproxy`, Windows `netsh winhttp set proxy` |
| Запись глобальных переменных окружения | Правка `http_proxy` / `https_proxy` / `all_proxy` / `no_proxy` в `/etc/environment`, `/etc/profile`, `/etc/profile.d/*`, `~/.bashrc`, `~/.bash_profile`, `~/.profile`, `~/.zshrc` |
| Правка глобальной конфигурации инструментов | Пункты proxy в `~/.curlrc`, `~/.wgetrc`, `~/.npmrc`, `/etc/apt/apt.conf.d/*proxy*`, `/etc/pip.conf`, `~/.docker/config.json`, `~/.gitconfig` |
| Правка глобальной конфигурации proxychains | Не изменять `/etc/proxychains4.conf`, `~/.proxychains/proxychains.conf`; если действительно нужно — указать через `-f` временный конфиг в `runs/` и удалить его после работы |
| Вмешательство в сеть системы | Правила iptables/nftables, таблица маршрутизации, DNS (`/etc/resolv.conf`), NetworkManager, запуск и остановка устройств VPN/tun |
| Постоянный export | Не оставлять в shell `export http_proxy=…` на всю сессию; передавать **инлайном** перед конкретной командой |

**Правильный подход** (всё на уровне отдельной команды, однократно):

```bash
P=$(shuf -n1 runs/live-proxies.txt)

# способ 1: собственный параметр прокси у инструмента (предпочтительно)
curl -s --proxy "http://$P" --max-time 15 -I "https://target.example.com/"
nuclei -u https://target.example.com/ -proxy "http://$P" -rate-limit 20
sqlmap -u "https://target.example.com/item?id=1" --proxy="http://$P" --batch --random-agent
ffuf -u https://target.example.com/api/FUZZ -w wordlist.txt -x "http://$P" -rate 20

# способ 2: инлайн-переменные окружения только для этой команды (без export, исчезают по завершении процесса)
http_proxy="http://$P" https_proxy="http://$P" curl -s --max-time 15 "https://target.example.com/"

# способ 3: инструменты, поддерживающие только «сырой» TCP → использовать SOCKS5-туннель suo5 (навык suo5-tunnel),
#        не менять из-за них системный прокси; для proxychains — временный файл конфигурации:
proxychains4 -f runs/proxychains.tmp.conf -q nmap -sT -Pn -p 80,443 10.0.0.5
```

## 1. Сбор (объединение нескольких источников)
```bash
mkdir -p runs && cd runs
curl -s --max-time 20 "https://www.89ip.cn/tqdl.html?api=1&num=50&port=&address=%E4%B8%AD%E5%9B%BD&isp=" \
  | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}:[0-9]{2,5}' >> raw-proxies.txt
curl -s --max-time 20 "http://www.ip3366.net/free/?stype=1" \
  | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}</td>[[:space:]]*<td>[0-9]{2,5}' \
  | sed -E 's#</td>[[:space:]]*<td>#:#' >> raw-proxies.txt
curl -s --max-time 20 "https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/countries/CN/data.txt" \
  | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}:[0-9]{2,5}' >> raw-proxies.txt
sort -u raw-proxies.txt -o raw-proxies.txt && wc -l raw-proxies.txt
```

## 2. Проверка (параллельная проверка живости, оставить рабочие)
```bash
cat > runs/check_proxy.py <<'PY'
import concurrent.futures, sys, urllib.request
TARGET = "http://www.baidu.com"   # только проверка связности, без каких-либо чувствительных данных
def ok(proxy):
    try:
        op = urllib.request.build_opener(urllib.request.ProxyHandler({"http": "http://" + proxy, "https": "http://" + proxy}))
        with op.open(TARGET, timeout=6) as r:
            return proxy if r.status == 200 else None
    except Exception:
        return None
with open(sys.argv[1]) as f:
    cands = [l.strip() for l in f if l.strip()]
with concurrent.futures.ThreadPoolExecutor(max_workers=50) as ex:
    for res in ex.map(ok, cands):
        if res: print(res, flush=True)
PY
python3 runs/check_proxy.py runs/raw-proxies.txt > runs/live-proxies.txt
wc -l runs/live-proxies.txt
```

## 3. Ротация и ограничение скорости
- На каждый запрос берётся случайный прокси; при сбое он автоматически исключается и берётся следующий.
- На стороне цели всё равно нужно ограничивать скорость (`-rate-limit` / `--delay`): прокси меняет только выходной IP, это не ускоритель.
- Фиксируйте успех и неудачу по каждому выходному IP; если по одной цели три раза подряд получена блокировка — **прекратите работу по этой цели** по правилам из промпта поиска уязвимостей.

## 4. Замечания
- **Не передавайте через бесплатные прокси учётные данные, Cookie и загруженные shell** — бесплатный прокси может логировать трафик.
- При проверке живости проверяйте только связность, не используйте реальные бизнес-запросы.
- Перед высокочастотным брутфорсом убедитесь, что у цели нет политики блокировки учётных записей; прекращайте до её срабатывания.
- После работы удаляйте временные конфиги в `runs/` (например `proxychains.tmp.conf`), не оставляйте в системе следов прокси.
- Использовать только в рамках авторизованного учения.
