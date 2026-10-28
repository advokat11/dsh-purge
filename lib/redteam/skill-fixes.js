/**
 * 技能修复文案（零依赖，纯 ESM）
 *
 * 用途：给控制台「技能库」页签用 —— 每个**不可用**的技能都要能直接告诉用户"Как исправить"，
 * 而不是只报"Чего не хватает"。`skill-availability.js` 负责判定（缺环境变量 / 缺工具 / 占位符没填 / 被同名技能盖住），
 * 这里负责把每一类判定翻译成可执行的中文步骤：
 *   · `TOOL_FIXES`   —— 逐工具的装法（与 `scripts/redteam-setup.sh` 保持一致：能自动装的就让人跑该脚本）
 *   · `SKILL_FIXES`  —— 逐技能的额外修复步骤（FOFA_KEY、VPS 地址、浏览器扩展…）
 *   · `toolNameOfPath` / `fixesForIssue` —— 把"Указанный путь не существует"这类判定转成具体建议
 *
 * 文案约定：中文、一句话说清"Что это / как дополнить"、命令一律用反引号包住、不编造 URL 与版本号、
 * 正文不用 markdown 强调符（面板按纯文本渲染）。`fixesForIssue()` 按判定分支给出的建议是**单行**的
 * （当列表项渲染不会塌）；回退到 `SKILL_FIXES` 时可能带换行 —— 技能文案允许 1–3 行。
 */

/** 仓库自带的一键修复入口（工具下载、FOFA_KEY/VPS 引导都在这一个脚本里）。 */
const SETUP = 'bash $DSH_HOME/redteam/setup.sh --yes'

/** 完全不知道缺什么时的兜底建议。 */
const GENERIC_FIX = 'Выполняет пользователь: `' + SETUP + '` — доустановка инструментов и настроек (идемпотентно, можно запускать повторно; отсутствующее скачается, повреждённое удалится и скачается заново),'
  + 'После изменения `$DSH_HOME/.env` нужно перезапустить `dsh web`, иначе не применится; если не помогло — переустановите плагин redteam и повторите самопроверку.'

/** 工具箱附件实际装了什么。不要写成「缺了就从附件里解出来」。 */
const TOOLKIT_TARBALL = 'Артефакт release upstream dsh-redteam-mode — `dsh-redteam-mode-<версия>-toolkit.tar.gz` (сейчас внутри только README, несколько md-файлов навыков и redteam-setup.sh, без перечисленных ниже бинарников и скриптов)'

/* ── 逐工具修法 ───────────────────────────────────────────────────────────── */

const FRP_FIX = {
  what: 'frp для проникновения во внутреннюю сеть: `frps` работает сервером на VPS, `frpc` — клиентом на цели (два бинарника из одного release-пакета)',
  install: 'Запустите `' + SETUP + '` За один раз распаковать `frpc` + `frps` в `$DSH_HOME/redteam/toolkit/frp/`; '
    + 'Если скрипт это не покрывает, возьмите вручную из GitHub releases fatedier/frp `frp_<версия>_linux_amd64.tar.gz`, распакуйте, положите `frpc`/`frps` в один каталог и выполните `chmod +x`',
}

const LIGOLO_FIX = {
  what: 'TUN-туннель ligolo-ng (`proxy` — серверная часть, `agent` — на стороне цели), альтернативный канал помимо chisel/frp, для создания виртуального интерфейса нужен root',
  install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/ligolo/proxy` и `.../ligolo/agent`; '
    + 'Или возьмите из GitHub releases nicocha30/ligolo-ng `proxy_*_linux_amd64.tar.gz` / `agent_*_linux_amd64.tar.gz`, распакуйте, положите под указанными выше именами в `toolkit/ligolo/` и выполните `chmod +x`',
}

export const TOOL_FIXES = {
  /* ── setup.sh 会下载到 toolkit/ 的二进制 ── */
  fscan: {
    what: 'Комплексное сканирование внутренней сети (живые хосты/порты/определение служб/28 типов слабых паролей/доступ без авторизации/опасные уязвимости, v2.2.1)',
    install: 'Запустите `' + SETUP + '` дополнить в `$DSH_HOME/redteam/toolkit/fscan/fscan`; '
      + 'Если скачался только `fscan.zip` без распаковки, распакуйте бинарник `fscan` вручную и выполните `chmod +x`; если скрипт всё равно не справляется, скачайте из GitHub releases shadow1ng/fscan бинарник для нужной платформы (включая `fscan_windows_x64.exe`, `fscan_linux_arm64`) и положите в этот каталог',
  },
  gogo: {
    what: 'Движок инвентаризации внутренней сети и отпечатков (v2.15.0, активные и пассивные отпечатки, извлечение ключевой информации, POC по шаблонам nuclei)',
    install: 'setup.sh для gogo только выдаёт подсказку и не скачивает автоматически (имена upstream-артефактов не фиксированы): запустите `' + SETUP + '` — посмотрите подсказку,'
      + 'затем сами возьмите бинарник под свою платформу из GitHub releases chainreactors/gogo: основной положите в `$DSH_HOME/redteam/toolkit/gogo/gogo`, варианты для Windows/arm64 (`gogo_windows_amd64.exe`, `gogo_linux_arm64`) — в тот же каталог, всем `chmod +x`',
  },
  suo5: {
    what: 'suo5: ключевой инструмент прорыва во внутреннюю сеть — поднимает SOCKS5-туннель через WebShell/HTTP (v2.2.0, статический Go без зависимостей)',
    install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/suo5/suo5-linux-amd64`; '
      + 'Или возьмите из GitHub releases zema1/suo5 `suo5-linux-amd64`, положите по этому пути и выполните `chmod +x`',
  },
  chisel: {
    what: 'HTTP-туннель chisel (сервер и клиент — один и тот же бинарник, v1.12.0)',
    install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/chisel/chisel`; '
      + 'Или возьмите из GitHub releases jpillora/chisel `chisel_<версия>_linux_amd64.gz`, выполните `gunzip`, затем `chmod +x`',
  },
  frp: FRP_FIX,
  frpc: FRP_FIX,
  frps: FRP_FIX,
  subfinder: {
    what: 'Пассивное перечисление поддоменов (ProjectDiscovery, v2.16.0, агрегация нескольких источников)',
    install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/subfinder/subfinder`; '
      + 'Или возьмите из GitHub releases projectdiscovery/subfinder `subfinder_<версия>_linux_amd64.zip`, распакуйте, положите и выполните `chmod +x`',
  },
  dnsx: {
    what: 'Пакетное разрешение DNS / брутфорс / фильтрация wildcard (ProjectDiscovery, v1.3.1)',
    install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/dnsx/dnsx`; '
      + 'Или возьмите из GitHub releases projectdiscovery/dnsx `dnsx_<версия>_linux_amd64.zip`, распакуйте, положите и выполните `chmod +x`',
  },
  naabu: {
    what: 'Быстрое сканирование портов (ProjectDiscovery, v2.6.1; SYN требует root, без root добавьте `-scan-type c`)',
    install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/naabu/naabu`; '
      + 'Или возьмите из GitHub releases projectdiscovery/naabu `naabu_<версия>_linux_amd64.zip`, распакуйте, положите и выполните `chmod +x`',
  },
  httpx: {
    what: 'Проверка живости HTTP / заголовка / кода состояния / технологического стека (версия ProjectDiscovery, v1.12.0; `/usr/bin/httpx` — это CLI библиотеки httpx для Python, а не этот инструмент)',
    install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/httpx/httpx`; '
      + 'Или возьмите из GitHub releases projectdiscovery/httpx `httpx_<версия>_linux_amd64.zip`, распакуйте, положите и выполните `chmod +x`;'
      + 'в командной строке вызывайте его через обёртку `pd-httpx` (см. пункт `pd-httpx`)',
  },
  ksubdomain: {
    what: 'Безовая (stateless) брутфорс поддоменов (knownsec ksubdomain v0.7, быстрее брутфорса dnsx, для отправки пакетов нужен root)',
    install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/ksubdomain/ksubdomain`; '
      + 'Или возьмите из GitHub releases knownsec/ksubdomain архив для linux, распакуйте, положите и выполните `chmod +x`',
  },
  ligolo: LIGOLO_FIX,
  'ligolo-proxy': LIGOLO_FIX,
  'ligolo-agent': LIGOLO_FIX,
  gowitness: {
    what: 'Пакетные скриншоты веб-страниц как доказательства (sensepost/gowitness)',
    install: 'Запустите `' + SETUP + '` установить в `$DSH_HOME/redteam/toolkit/gowitness/gowitness`; '
      + 'Или возьмите из GitHub releases sensepost/gowitness `gowitness-<версия>-linux-amd64`, положите и выполните `chmod +x` — '
      + 'скачивание должно быть полным (усечённый бинарник существует, права выставлены, но при запуске даёт пустой вывод)',
  },
  oneforall: {
    what: 'Набор для сбора поддоменов OneForAll (v0.4.5, исходники + `.venv`, медленно, но полно)',
    install: 'Запустите `' + SETUP + '` положит исходники в `$DSH_HOME/redteam/toolkit/oneforall/OneForAll-0.4.5/` и создаст `.venv` с зависимостями;'
      + 'Если не установится, это не мешает основному процессу — достаточно заменить на `subfinder` + `ksubdomain`',
  },
  vps: {
    what: 'Способ входа на VPS (`REDTEAM_VPS_HOST` / `REDTEAM_VPS_KEY`) и скрипт-посредник `vps.sh`: конечная точка для reverse shell, доставки payload и выхода туннеля',
    install: 'Запустите `' + SETUP + '` предложит ввести адрес VPS и путь к приватному ключу; ключ положите в `$DSH_HOME/redteam/toolkit/vps/id_rsa` и выполните `chmod 600` (связность проверяется так: '
      + '`ssh -i $DSH_HOME/redteam/toolkit/vps/id_rsa -o BatchMode=yes <user>@<ip> \'echo ok\'`);'
      + 'Скрипт `$DSH_HOME/redteam/toolkit/vps/vps.sh` не входит в комплект: по подкомандам навыка `vps-reverse-shell` напишите свой исполняемый скрипт (как минимум `serve <port>` и `exec`) и выполните `chmod +x`',
  },
  'nuclei-templates': {
    what: 'Библиотека шаблонов nuclei (13 000+ шаблонов, на ней работают и `nuclei -t`, и `redteam_poc_search`)',
    install: 'Запустите `' + SETUP + '` установится в `~/.local/nuclei-templates`; можно также запустить отдельно `nuclei -update-templates` (не чаще раза в неделю);'
      + 'Если шаблонов меньше 1000, значит скачалось не всё: запустите ещё раз и проверьте через `nuclei -tl`, что библиотека шаблонов цела',
  },

  /* ── 技能里引用、但 setup.sh 不下载，工具箱附件里也没有 ── */
  dirsearch: {
    what: 'Брутфорс каталогов/файлов (Python, v0.5.0, полные словари, дружелюбен к отчётам, со своим рантаймом)',
    install: 'Нет в списке загрузок setup.sh: возьмите архив исходников из GitHub releases maurosoria/dirsearch и положите в `$DSH_HOME/redteam/toolkit/dirsearch/` '
      + '(добейтесь, чтобы `toolkit/dirsearch/dirsearch` был исполняемым, `chmod +x`); временно можно обойтись `feroxbuster` / `ffuf` / `gobuster`',
  },
  behinder: {
    what: 'Клиент Behinder v4.1 + шаблоны зашифрованных webshell (`toolkit/Behinder/server/*.jsp|php|aspx`, основной инструмент доставки WebShell)',
    install: 'setup.sh не скачивает,' + TOOLKIT_TARBALL + '. Клиент возьмите сами со страницы релизов Behinder и положите в `toolkit/Behinder/`;'
      + 'Если нужны только шаблоны webshell, достаточно держать в `toolkit/Behinder/server/` семь шаблонов (можно и без GUI — сгенерировать с заменой ключа через `sed`); клиенту нужен `java -jar`, поэтому на машине должна быть Java',
  },
  godzilla: {
    what: 'Клиент Godzilla v4.0.1 (`godzilla.jar`, в GUI генерируются полностью зашифрованные payload для JSP/PHP/ASPX)',
    install: 'setup.sh не скачивает,' + TOOLKIT_TARBALL + '. Возьмите `godzilla.jar` сами со страницы релизов Godzilla и положите в `toolkit/Godzilla/`;'
      + 'Для запуска нужны Java (`apt install openjdk-17-jre`) и графическая сессия (`DISPLAY=:10.0`)',
  },
  antsword: {
    what: 'AntSword (Loader + каталог исходников; при первом запуске нужно выбрать каталог исходников `antSword-2.1.16`)',
    install: 'setup.sh не скачивает,' + TOOLKIT_TARBALL + '. Возьмите Loader и каталог исходников из официального репозитория AntSword и положите в `toolkit/AntSword/` ('
      + '`toolkit/AntSword/AntSword-Loader-v4.0.3-linux-x64/AntSword` должен быть исполняемым)',
  },
  netexec: {
    what: 'netexec (nxc) — инструмент lateral movement и перечисления протоколов (`toolkit/netexec/`, на Kali также `apt install netexec`)',
    install: '`apt install netexec`; версия в локальном наборе инструментов — в `$DSH_HOME/redteam/toolkit/netexec/`,'
      + 'если её нет — возьмите из ' + TOOLKIT_TARBALL + ' и распакуйте, либо по официальной документации выполните `pipx install netexec`',
  },

  /* ── 技能里出现、setup.sh 不管的本机脚本/二进制 ── */
  'pd-httpx': {
    what: 'Обёртка для httpx от ProjectDiscovery (`~/.local/bin/pd-httpx`) — чтобы не путать с CLI библиотеки httpx для Python',
    install: 'Сначала запустите `' + SETUP + '`, затем установите `$DSH_HOME/redteam/toolkit/httpx/httpx`, пересоздайте обёртку и выдайте права:'
      + '`printf \'#!/usr/bin/env bash\\nexec "\${DSH_HOME:-$HOME/.dsh}/redteam/toolkit/httpx/httpx" "$@"\\n\' > ~/.local/bin/pd-httpx && chmod +x ~/.local/bin/pd-httpx`',
  },
  'kimi-chrome': {
    what: 'Стартовый скрипт браузера, «управляемого расширением Kimi WebBridge» (`~/.local/bin/kimi-chrome`)',
    install: 'Сначала установите браузер: `apt install google-chrome-stable` (или `apt install chromium`); затем создайте `~/.local/bin/kimi-chrome`:'
      + 'По умолчанию `exec /usr/bin/google-chrome --no-first-run --no-default-browser-check "$@"`; при `KIMI_BROWSER=chromium` используйте `/usr/bin/chromium`,'
      + 'в начале на всякий случай поднимите демон через `systemctl start kimi-webbridge`, в конце — `chmod +x ~/.local/bin/kimi-chrome`',
  },
  'kimi-webbridge': {
    what: 'Локальный демон Kimi WebBridge (systemd-служба `kimi-webbridge`, слушает `127.0.0.1:10086`; через него навык управляет реальным браузером)',
    install: 'Демон находится в `~/.kimi-webbridge/bin/kimi-webbridge`, управляется через `/etc/systemd/system/kimi-webbridge.service`:'
      + 'После переустановки выполните `sudo systemctl enable --now kimi-webbridge`, затем убедитесь через `~/.kimi-webbridge/bin/kimi-webbridge status`, что `"running": true`;'
      + 'Расширение браузера ставится автоматически корпоративной политикой из Chrome Web Store (ID `fldmhceldgbpfpkbgopacenieobmligc`); в Chrome 137+ не загружайте его из распакованного каталога',
  },
  chromium: {
    what: 'Браузер Chromium (решение без зависимостей для получения отрендеренного DOM в headless / скриншотов / генерации PDF, `/usr/bin/chromium`)',
    install: '`apt install chromium` (можно поставить и `google-chrome-stable`); использование: `/usr/bin/chromium --headless=new --no-sandbox --dump-dom <url>`,'
      + 'для скриншота добавьте `--screenshot=runs/shot.png`',
  },
  'playwright-cli': {
    what: 'Playwright CLI (автоматизация браузера, когда нужны клики/ожидания/несколько вкладок, `npx --yes @playwright/cli@latest`)',
    install: '`npx --yes @playwright/cli@latest`; если браузера нет, выполните `npx playwright install chromium`;'
      + 'при вызове обязательно добавляйте `--browser chromium` (по умолчанию используется канал chrome и будет ошибка `Chromium distribution \'chrome\' is not found`)',
  },

  /* ── 系统工具（setup.sh 只体检，缺了用 apt 补） ── */
  nmap: {
    what: 'Сканирование портов/служб/скриптов (входит в Kali, основа активного сканирования)',
    install: '`apt install nmap`; SYN-сканирование (`-sS`) требует `sudo`, без прав используйте `-sT`',
  },
  masscan: {
    what: 'Сверхбыстрое сканирование портов (сплошной охват больших сетей, много шума)',
    install: '`apt install masscan`; отправка пакетов требует root — обязательно сначала ограничьте `--rate` и разрешённую область',
  },
  nuclei: {
    what: 'Шаблонное сканирование уязвимостей (основа обнаружения Nday/1day, локально — `/usr/bin/nuclei`)',
    install: '`apt install nuclei`; после установки дополните и библиотеку шаблонов: `nuclei -update-templates` (шаблоны лежат в `~/.local/nuclei-templates`)',
  },
  sqlmap: {
    what: 'Обнаружение и эксплуатация SQL-инъекций',
    install: '`apt install sqlmap`',
  },
  ffuf: {
    what: 'Web-fuzz / брутфорс каталогов (самый быстрый и гибкий, поддерживает несколько словарей, vhost, фаззинг параметров)',
    install: '`apt install ffuf`',
  },
  feroxbuster: {
    what: 'Рекурсивный брутфорс каталогов (Rust, автоматически идёт по уровням каталогов, первый выбор для брутфорса каталогов)',
    install: '`apt install feroxbuster`',
  },
  gobuster: {
    what: 'Лёгкий брутфорс каталогов/DNS/vhost (три режима: dir/dns/vhost)',
    install: '`apt install gobuster`',
  },
  hydra: {
    what: 'Онлайн-брутфорс слабых паролей (50+ протоколов: SSH/FTP/RDP/SMB/MySQL/MSSQL/веб-формы)',
    install: '`apt install hydra`',
  },
  john: {
    what: 'Офлайн-взлом хешей John the Ripper (путь через CPU, подходит для небольших словарей/правил)',
    install: '`apt install john`; если нет словарей — сначала `apt install wordlists`, затем `gunzip /usr/share/wordlists/rockyou.txt.gz`',
  },
  hashcat: {
    what: 'Офлайн-взлом хешей/паролей hashcat (приоритет GPU, на CPU будет очень медленно)',
    install: '`apt install hashcat`; сначала `hashcat --identify hashes.txt`, чтобы определить номер режима (например NTLM `-m 1000`, Kerberoast `-m 13100`)',
  },
  wpscan: {
    what: 'Сканирование уязвимостей WordPress и перечисления пользователей',
    install: '`apt install wpscan`; если нужна база уязвимостей, по подсказке выполните `wpscan --update`',
  },
  nikto: {
    what: 'Сканирование конфигурации веб-сервера и известных проблем',
    install: '`apt install nikto`',
  },
  whatweb: {
    what: 'Определение веб-отпечатков (CMS/фреймворк/промежуточное ПО/версия)',
    install: '`apt install whatweb`',
  },
  amass: {
    what: 'Перечисление поддоменов и карта активов (OWASP Amass)',
    install: '`apt install amass`; пассивный режим: `amass enum -passive -d <domain>`',
  },
  theharvester: {
    what: 'Сбор адресов почты/поддоменов/хостов из открытых источников (theHarvester)',
    install: '`apt install theharvester`',
  },
  msfconsole: {
    what: 'Фреймворк Metasploit (`exploit/multi/handler` принимает reverse shell, `web_delivery` доставляет payload)',
    install: '`apt install metasploit-framework` (даёт `msfconsole`); при первом использовании — `msfdb init`',
  },
  searchsploit: {
    what: 'Поиск по локальной Exploit-DB (публичные POC по компоненту/версии)',
    install: '`apt install exploitdb` (даёт `searchsploit`); обновление базы — `searchsploit -u`',
  },
  proxychains4: {
    what: 'Проксировать TCP-трафик одной команды во внутреннюю сеть (используется вместе с socks5-туннелем)',
    install: '`apt install proxychains4`; используйте только `-f` с временным конфигом в `runs/` (например `proxychains4 -f runs/proxychains-1080.conf ...`), не трогайте `/etc/proxychains4.conf`',
  },
  socat: {
    what: 'Полноценный TTY reverse shell: слушатель / перенаправление портов (надёжнее nc, даёт PTY)',
    install: '`apt install socat`',
  },
  nc: {
    what: 'netcat: слушатель reverse shell и проверка связности (`nc -lvnp <port>`)',
    install: '`apt install netcat-traditional` (даёт `nc`; в Debian подойдёт и `netcat-openbsd`)',
  },
  tmux: {
    what: 'Сохранение сессий: слушатели и туннели должны работать в tmux, иначе при обрыве SSH всё пропадёт',
    install: '`apt install tmux`; использование: `tmux new -s handler`, `tmux a -t handler`',
  },
  impacket: {
    what: 'Набор протокольных инструментов Impacket (PtH/PsExec/WMI/DCOM/Kerberos/дамп учётных данных, в Kali 61 команда `impacket-*`)',
    install: '`apt install python3-impacket`; частые команды `impacket-wmiexec` / `impacket-psexec` / `impacket-secretsdump` / `impacket-GetNPUsers`',
  },
  enum4linux: {
    what: 'Перечисление информации SMB/домена (пользователи, общие ресурсы, группы, политика паролей)',
    install: '`apt install enum4linux` (в новых версиях есть также `enum4linux-ng`)',
  },
  'redis-cli': {
    what: 'Клиент Redis (чтение без авторизации и запись webshell в открытый Redis)',
    install: '`apt install redis-tools` (даёт `redis-cli`)',
  },
  mysql: {
    what: 'Клиент MySQL/MariaDB (подключение к базе без авторизации или со слабым паролем и выгрузка данных)',
    install: '`apt install default-mysql-client` (в Kali — `mariadb-client`)',
  },
}

/* ── 逐技能修法 ───────────────────────────────────────────────────────────── */

export const SKILL_FIXES = {
  'active-scan': 'Установите сканеры: `apt install nmap masscan`; если нет `toolkit/naabu/naabu` — запустите `' + SETUP + '`.'
    + 'Без root для naabu добавляйте `-scan-type c`; SYN-сканирование nmap/masscan требует `sudo`; перед началом сканирования убедитесь, что цель входит в разрешённую область.',

  'asset-correlation': 'Навык только записи в базу и связывания, внешних инструментов не требует и переменные окружения не читает; недоступность обычно означает отсутствие файла навыка или старую версию плагина — '
    + 'переустановите плагин redteam, перезапустите `dsh web` и проверьте, что инструмент `redteam_asset_link` доступен.',

  'browser-automation': 'Установите браузер: `apt install chromium` (или `google-chrome-stable`); для варианта с playwright затем `npx playwright install chromium`.'
    + 'при вызове обязательно добавляйте `--browser chromium` (по умолчанию используется канал chrome и будет ошибка `Chromium distribution \'chrome\' is not found`).',

  'chisel-tunnel': 'Добавьте бинарник `toolkit/chisel/chisel`: запустите `' + SETUP + '`.\n'
    + 'Для обеих сторон туннеля нужен VPS: убедитесь, что в `$DSH_HOME/.env` есть `REDTEAM_VPS_HOST` / `REDTEAM_VPS_USER` / `REDTEAM_VPS_KEY`,'
    + 'перед командой `set -a; . "$DSH_HOME/.env"; set +a`; после правки `.env` нужно перезапустить `dsh web`, и не забудьте открыть порт туннеля в security group.',

  'cn-proxy-pool': 'Нужны только `curl` / `python3` (если нет — `apt install curl`); недоступность чаще всего означает отсутствие файла навыка — переустановите плагин и перезапустите `dsh web`.'
    + 'Прокси указывайте только для отдельной команды через `-proxy` / `-x` / `--proxy`, не меняйте системный прокси и `/etc/proxychains4.conf`.',

  'credential-attack': '`apt install hydra hashcat john`; словари: `sudo apt install wordlists`, затем `gunzip /usr/share/wordlists/rockyou.txt.gz`.'
    + 'Без GPU `hashcat` очень медленный: в первую очередь небольшие словари + правила (`-r /usr/share/hashcat/rules/best64.rule`).',

  'dir-bruteforce': '`apt install feroxbuster ffuf gobuster`; `toolkit/dirsearch/dirsearch` нет в списке загрузок setup.sh — '
    + 'возьмите исходники из GitHub releases maurosoria/dirsearch, положите в `$DSH_HOME/redteam/toolkit/dirsearch/` и сделайте исполняемыми.',

  'fofa-recon': 'Настройка `FOFA_KEY`: войдите на <https://fofa.info> → личный кабинет → API Key.\n'
    + 'запишите в `$DSH_HOME/.env` (`FOFA_KEY=ваш_ключ`, `chmod 600`) или временно `export FOFA_KEY=…`, затем перезапустите `dsh web` — только тогда значение появится в этом процессе;'
    + 'проверьте: `curl -s "https://fofa.info/api/v1/info/my?key=$FOFA_KEY"` должен вернуть `"error":false`.\n'
    + 'Можно также, чтобы пользователь запустил `' + SETUP + '` (скрипт сам запишет и сразу проверит).',

  'frp-tunnel': 'Добавьте `toolkit/frp/frps`, `toolkit/frp/frpc`: запустите `' + SETUP + '` (за один раз извлекаются оба бинарника).\n'
    + 'На стороне VPS нужны `REDTEAM_VPS_HOST` / `REDTEAM_VPS_KEY` (`$DSH_HOME/.env`), перед командой `set -a; . "$DSH_HOME/.env"; set +a`,'
    + 'после изменений перезапустите `dsh web` и откройте порт прослушивания frps в security group облака.',

  'fscan-intranet': 'Добавьте `toolkit/fscan/fscan`: запустите `' + SETUP + '`; если скачалось только `fscan.zip`, распакуйте вручную `fscan` и `chmod +x`.\n'
    + 'В тексте навыка `<ВАШ_VPS_IP>` — заглушка: запишите в `$DSH_HOME/.env` `REDTEAM_VPS_HOST=<реальный_IP>` и перезапустите `dsh web`,'
    + 'или отредактируйте `$DSH_HOME/skills/fscan-intranet.md`, заменив `<ВАШ_VPS_IP>` на реальный адрес (служба доставки payload: на VPS выполните `vps.sh serve 9100`).',

  'gogo-intranet': '`gogo` setup.sh не скачивает автоматически: возьмите бинарник под свою платформу из GitHub releases chainreactors/gogo,'
    + 'положите в `$DSH_HOME/redteam/toolkit/gogo/gogo` (варианты для Windows/arm64 — в тот же каталог) и выполните `chmod +x`.\n'
    + 'Заглушку `<ВАШ_VPS_IP>` заполняйте так же, как в `fscan-intranet`: запишите `REDTEAM_VPS_HOST` в `.env` и перезапустите `dsh web`,'
    + 'или отредактируйте `$DSH_HOME/skills/gogo-intranet.md`, заменив заглушку.',

  'kimi-webbridge': 'Две вещи: расширение браузера и лаунчер — расширение ставится автоматически корпоративной политикой из Chrome Web Store (ID `fldmhceldgbpfpkbgopacenieobmligc`),'
    + 'в Chrome 137+ не используйте больше `--load-extension`; если Chrome/Chromium нет — сначала `apt install chromium` или установите `google-chrome-stable`.\n'
    + 'создайте лаунчер `~/.local/bin/kimi-chrome` (по умолчанию запускает `/usr/bin/google-chrome`, при `KIMI_BROWSER=chromium` переключается на Chromium) и выполните `chmod +x`;'
    + 'демон поднимите командой `sudo systemctl enable --now kimi-webbridge`.\n'
    + 'Если в `curl -s http://127.0.0.1:10086/status` поле `extension_connected` равно `false`, сначала откройте браузер (`kimi-chrome`) и проверьте снова.',

  'lateral-movement': '`apt install python3-impacket enum4linux smbclient` (в Kali уже есть 61 файл `/usr/bin/impacket-*`); для офлайн-взлома `apt install hashcat`.'
    + 'Все команды по целям во внутренней сети должны идти через туннель: `proxychains4 -f runs/proxychains-<port>.conf ...`, не меняйте системный конфиг `proxychains`.',

  'nuclei-scan': '`apt install nuclei`; если нет библиотеки шаблонов `~/.local/nuclei-templates` — `nuclei -update-templates` (запуск `' + SETUP + '` тоже её установит).'
    + 'после обновления проверьте через `nuclei -tl`, что библиотека шаблонов цела; меньше 1000 шаблонов — значит скачалось не всё.',

  'passive-recon': 'Нужны только `curl` / `dig` / `jq`: `apt install curl dnsutils jq`; этому навыку никакой API key не требуется.'
    + 'Недоступность обычно означает отсутствие файла навыка или старую версию плагина — переустановите плагин и перезапустите `dsh web`.',

  'recon-pipeline': 'Доустановить набор инструментов за один раз: запустите `' + SETUP + '` (внутри есть subfinder / dnsx / naabu / httpx / ksubdomain).\n'
    + '`~/.local/bin/pd-httpx` — обёртка, указывающая на `toolkit/httpx/httpx`; если её нет, пересоздайте по `TOOL_FIXES["pd-httpx"]`;'
    + 'Если OneForAll не установится, это не мешает основному процессу: замените на subfinder + ksubdomain.',

  'redteam-setup': 'Скрипт окружения — `$DSH_HOME/redteam/setup.sh`; если файла нет, значит это версия из npm: скачайте с GitHub Release проекта '
    + '`dsh-redteam-mode-<версия>-toolkit.tar.gz`, распакуйте, и пусть пользователь сам выполнит шаги из README.\n'
    + 'После настройки `FOFA_KEY` и VPS перезапустите `dsh web` и запишите отметку о завершении: `mkdir -p "$DSH_HOME/redteam" && date -Is > "$DSH_HOME/redteam/.setup-complete"`, а в конце запустите ещё раз `redteam_preflight` для повторной проверки.',

  'shell-handler': 'Инструменты слушателя на этой машине: `apt install netcat-traditional socat tmux` (для варианта с MSF дополнительно `apt install metasploit-framework`).\n'
    + 'Переменные VPS читаются из `$DSH_HOME/.env`: перед командой `set -a; . "$DSH_HOME/.env"; set +a`; если нет `REDTEAM_VPS_HOST`, запустите `' + SETUP + '` — дополните,'
    + 'После изменения `.env` обязательно перезапустите `dsh web`. Слушатели всегда держите в tmux, чтобы обрыв SSH не унёс сессию.',

  'suo5-tunnel': 'Добавьте `toolkit/suo5/suo5-linux-amd64`: запустите `' + SETUP + '`(или возьмите одноимённый бинарник из GitHub releases zema1/suo5) и `chmod +x`.\n'
    + 'Выход туннеля и посредник зависят от VPS: настройте `REDTEAM_VPS_HOST` / `REDTEAM_VPS_KEY` в `$DSH_HOME/.env` и перезапустите `dsh web`;'
    + 'WebShell на входе туннеля должен быть webshell-ом Behinder/Godzilla (см. навык `webshell-toolkit`), иначе пользователь не сможет его переиспользовать.',

  'unauth-exploit': 'Установите клиенты: `apt install redis-tools default-mysql-client python3-impacket` (для MSSQL — `impacket-mssqlclient`).\n'
    + 'Для целей во внутренней сети нужен туннель: `apt install proxychains4` и работайте через `-f runs/proxychains-<port>.conf`, либо сначала поднимите socks5 по навыку `suo5-tunnel`;'
    + 'Если `REDTEAM_VPS_HOST` не задан, шаги, требующие VPS, считаются недоступными.',

  'vps-reverse-shell': 'Заполнить VPS: запустите `' + SETUP + '` предложит записать `REDTEAM_VPS_HOST` (`пользователь@хост`) и `REDTEAM_VPS_KEY` (путь к приватному ключу, по умолчанию `$DSH_HOME/redteam/toolkit/vps/id_rsa`).\n'
    + 'Можно также вручную прописать значения в `$DSH_HOME/.env` и перезапустить `dsh web`, либо отредактировать `$DSH_HOME/skills/vps-reverse-shell.md`, заменив `<ВАШ_VPS_IP>` / `<имя_хоста_VPS>` на реальный адрес.\n'
    + 'Приватному ключу обязательно `chmod 600`; связность проверяется так: `ssh -i $DSH_HOME/redteam/toolkit/vps/id_rsa -o BatchMode=yes <user>@<ip> \'echo ok\'`; в security group откройте 22 и 9000-9999.',

  'web-fingerprint': 'если нет `~/.local/bin/pd-httpx`, пересоздайте его по `TOOL_FIXES["pd-httpx"]` (он запускает `toolkit/httpx/httpx`);'
    + 'если нет `nuclei` — `apt install nuclei`; библиотеку шаблонов для распознавания технологий дополните через `nuclei -update-templates`.',

  'webshell-toolkit': '`toolkit/Behinder`, `toolkit/Godzilla`, `toolkit/AntSword` нет ни в setup.sh, ни в' + TOOLKIT_TARBALL + ': '
    + 'возьмите их сами со страниц релизов и положите в соответствующие каталоги.\n'
    + 'для GUI нужны Java и графическая сессия: проверьте `java -version` (если нет — `apt install openjdk-17-jre`), `DISPLAY=:10.0`;'
    + 'без GUI генерируйте webshell Behinder заменой ключа через `sed` (шаблоны в `toolkit/Behinder/server/`).',
}

/* ── 内部工具 ─────────────────────────────────────────────────────────────── */

/** 常见扩展名（`fscan_windows_x64.exe`、`vps.sh`、`godzilla.jar` …）。 */
const EXT_RE = /\.(exe|zip|tar\.gz|tgz|gz|bz2|xz|jar|sh|py|bin|txt|md|json)$/i
/** 平台后缀（`_windows_x64`、`-linux-amd64`、`_darwin_arm64` …）。 */
const PLATFORM_RE = /[-_](windows|win32|win64|win|linux|darwin|macos|osx|freebsd)[-_][a-z0-9_.]+$/
/** 架构后缀（裸的 `_amd64` / `-arm64`）。 */
const ARCH_RE = /[-_](amd64|x86_64|x64|arm64|aarch64|arm|386|i386|i686|mips[a-z0-9]*)$/

/**
 * 把二进制/目录名字清成工具名：剥扩展名、剥平台与架构后缀、转小写。
 * 清完不含 ASCII 字母（例如 `список.md`、纯符号）就返回 null —— 那就不是工具名。
 */
function cleanToolName(raw) {
  let out = String(raw == null ? '' : raw).trim()
  if (out === '') return null
  out = out.replace(EXT_RE, '')
  let prev = ''
  while (out !== '' && out !== prev) {
    prev = out
    out = out.replace(PLATFORM_RE, '').replace(ARCH_RE, '')
  }
  out = out.toLowerCase()
  return /[a-z]/.test(out) ? out : null
}

/**
 * 从路径里抽工具名（抽不出来返回 `null`）。
 *   · `…/redteam/toolkit/<инструмент>/…` → `toolkit/` 之后的第一段目录名（`suo5-linux-amd64` → `suo5`）
 *   · `~/.local/bin/xxx`、`/usr/bin/xxx`、`~/.local/xxx` → 文件名
 *   · 裸名字（`fscan_windows_x64.exe`、`gogo_linux_arm64`）→ 剥平台后缀后的名字
 *   · 其它路径（`/usr/share/wordlists/rockyou.txt`、`skills/x.md`）→ `null`
 */
export function toolNameOfPath(p) {
  if (typeof p !== 'string') return null
  const s = p.trim()
    .replace(/^["'`]+|["'`]+$/g, '')
    .replace(/[，。；、：,;:)\]}>）】]+$/, '')
    .replace(/\\/g, '/')
  if (s === '') return null
  let candidate = null
  const at = s.lastIndexOf('toolkit/')
  if (at !== -1) {
    candidate = s.slice(at + 'toolkit/'.length).split('/').filter((seg) => seg !== '')[0] || null
  } else if (/\/bin\//.test(s) || /(^|\/)\.local\//.test(s)) {
    const segs = s.split('/').filter((seg) => seg !== '')
    candidate = segs.length > 0 ? segs[segs.length - 1] : null
  } else if (!s.includes('/')) {
    candidate = s
  }
  return candidate === null ? null : cleanToolName(candidate)
}

/** 别名的规范化：`impacket-wmiexec` 这类命令归到 `impacket` 这一条修法上。 */
function canonicalTool(name) {
  const n = String(name || '')
  if (n.startsWith('impacket-')) return 'impacket'
  if (n.startsWith('enum4linux-')) return 'enum4linux'
  return n
}

/** 环境变量怎么拿（拿不准的就不编，直接让用户填值）。 */
const ENV_HINTS = {
  FOFA_KEY: 'Возьмите на <https://fofa.info>: вход → личный кабинет → API Key; если `curl -s "https://fofa.info/api/v1/info/my?key=$FOFA_KEY"` возвращает `"error":false`, ключ рабочий',
  REDTEAM_VPS_HOST: 'Укажите адрес входа на VPS `пользователь@хост` (например `export REDTEAM_VPS_HOST=ubuntu@203.0.113.10`)',
  REDTEAM_VPS_USER: 'Укажите пользователя для входа на VPS (по умолчанию `ubuntu`)',
  REDTEAM_VPS_KEY: 'Укажите путь к приватному ключу VPS (по умолчанию `$DSH_HOME/redteam/toolkit/vps/id_rsa`, права обязательно `chmod 600`)',
}

function asArray(v) {
  if (Array.isArray(v)) return v.filter((x) => typeof x === 'string' && x.trim() !== '')
  if (typeof v === 'string' && v.trim() !== '') return [v]
  return []
}

/**
 * 由 `skill-availability.js` 的判定生成一条中文修复建议。
 *
 * @param issue - `{ kind, skill, paths?, env?, placeholder? }`，
 *   `kind` ∈ `'file-missing' | 'content-missing' | 'env-missing' | 'path-missing' | 'placeholder' | 'shadowed'`。
 *   也接受 `checkSkill()` возвращаемое `problems` 之外的补充字段；字段类型宽松（字符串或数组都行）。
 * @returns 一条中文建议（不含换行；命令都在反引号里）。拿不准时回退到 `SKILL_FIXES[skill]`，再回退到通用建议。
 */
export function fixesForIssue(issue) {
  const it = issue && typeof issue === 'object' ? issue : {}
  const kind = typeof it.kind === 'string' ? it.kind : ''
  const skill = typeof it.skill === 'string' ? it.skill : ''
  const skillName = skill === '' ? '<имя_навыка>' : skill
  const skillHint = skill !== '' && Object.prototype.hasOwnProperty.call(SKILL_FIXES, skill) ? SKILL_FIXES[skill] : ''
  const parts = []

  if (kind === 'path-missing') {
    const tools = []
    const seen = new Set()
    for (const p of asArray(it.paths)) {
      const name = toolNameOfPath(p)
      if (name === null) continue
      const canon = canonicalTool(name)
      if (seen.has(canon)) continue          // 同一个工具只列一次
      seen.add(canon)
      tools.push({ name, canon, path: p })
    }
    if (tools.length > 0) {
      const items = tools.map(({ name, canon, path }) => {
        const fix = Object.prototype.hasOwnProperty.call(TOOL_FIXES, canon) ? TOOL_FIXES[canon] : null
        if (fix === null) {
          return '`' + name + '`(' + path + '): этого инструмента на машине нет, запустите `' + SETUP + '` — доустановите;'
            + 'если всё равно нет — возьмите с официальной страницы релизов бинарник под свою платформу, положите по этому пути и выполните `chmod +x`'
        }
        return '`' + name + '`(' + path + '): ' + fix.what + '. Как исправить:' + fix.install
      })
      parts.push('Не хватает ' + tools.length + ' инструментов, исправьте по пунктам:' + items.join('; '))
      parts.push('Если не уверены, сначала запустите общий `' + SETUP + '` (идемпотентно: отсутствующее скачается, повреждённое удалится и скачается заново), затем повторите самопроверку.')
    }
  } else if (kind === 'env-missing') {
    const names = asArray(it.env)
    if (names.length > 0) {
      const items = names.map((n) => {
        const hint = Object.prototype.hasOwnProperty.call(ENV_HINTS, n) ? ENV_HINTS[n] : 'Значение укажите сами'
        return '`' + n + '`: `export ' + n + '=<значение>` (' + hint + ')'
      })
      parts.push('Не хватает переменных окружения:' + items.join('; ') + '.')
      parts.push('Постоянно: пропишите в `$DSH_HOME/.env` (по одному `NAME=значение` в строке, рекомендуется `chmod 600`); после изменений нужно перезапустить `dsh web`, иначе текущий процесс их не прочитает;'
        + 'Или пусть пользователь запустит `' + SETUP + '` (скрипт подскажет и сразу проверит `FOFA_KEY` и переменные VPS).')
    }
  } else if (kind === 'placeholder') {
    const ph = typeof it.placeholder === 'string' && it.placeholder.trim() !== '' ? it.placeholder.trim() : 'Адрес внешней инфраструктуры'
    parts.push('В тексте навыка `' + ph + '` всё ещё заглушка (значит в этом окружении VPS не настроен).')
    parts.push('Как заполнить: запустите `' + SETUP + '` предложит записать `REDTEAM_VPS_HOST` (`пользователь@хост`) и `REDTEAM_VPS_KEY` (путь к приватному ключу, по умолчанию `$DSH_HOME/redteam/toolkit/vps/id_rsa`);'
      + 'Можно также вручную прописать в `$DSH_HOME/.env` и перезапустить `dsh web`, либо отредактировать `$DSH_HOME/skills/' + skillName + '.md`, замените плейсхолдеры на реальные адреса (не забудьте про приватный ключ `chmod 600`).')
  } else if (kind === 'shadowed') {
    parts.push('Навык перекрыт версией с тем же именем: `' + skillName + '` — в другом корне навыков есть ещё одна копия навыка с тем же именем (с более полной конфигурацией),'
      + 'но по текущему порядку корней навыков загружается та неполная копия, что стоит раньше.')
    parts.push('Как исправить: поставьте настроенный корень навыков первым в порядке корней (порядок меняется в настройках плагина/каталогов навыков), перезапустите `dsh web` и повторите самопроверку;'
      + 'если вторая копия не нужна — удалите её или переименуйте, чтобы она больше не перекрывала.')
  } else if (kind === 'file-stale') {
    parts.push('Записанный в навыке путь к файлу на этой машине не существует (текст навыка всё равно загружается, на вызов это не влияет): такие пути — абсолютные пути, полученные при разборе на другой машине, и после смены машины неизбежно ведут в пустоту.')
    parts.push('Как исправить: один раз перезапустите `dsh web` (при старте плагин синхронизирует поставляемые навыки в `$DSH_HOME/redteam/skills`);'
      + 'если локальный `DSH_HOME` не совпадает с каталогом, который реально использует хост (перенесли диск / установка не в каталог по умолчанию), укажите в `DSH_HOME` тот, который действительно используется, и перезапустите.')
  } else if (kind === 'file-missing') {
    parts.push('Файл навыка не существует: переустановите плагин redteam (или верните каталог навыков в корень навыков), чтобы файл навыка восстановился, затем перезапустите `dsh web` и повторите самопроверку.')
    parts.push('если навык добавлен вами, убедитесь, что файл лежит в корне навыков и его имя совпадает с именем навыка (`<имя_навыка>.md`).')
  } else if (kind === 'content-missing') {
    parts.push('Текст навыка не читается (есть только метаданные, доступность не определить): переустановите плагин redteam, чтобы восстановить файлы навыков;'
      + 'если источник навыков удалённый, убедитесь, что он доступен, загрузите заново и перезапустите `dsh web`.')
    parts.push('Если нужно быстро проверить работоспособность, пусть агент один раз реально загрузит навык инструментом `skill`: `' + skillName + '`.')
  }

  if (parts.length === 0) parts.push(skillHint !== '' ? skillHint : GENERIC_FIX)
  return parts.join(' ')
}
