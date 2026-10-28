import { DatabaseSync } from 'node:sqlite'
/* 计分/判定规则的唯一实现在 score-rules.js；本文件只留 DDL 与迁移。
   migrate() 里用到的 parseTargetPort 也从那里取，不再保留副本。 */
import { parseTargetPort } from './score-rules.js'

/**
 * 事实库 schema 与增量迁移（零依赖）。
 *
 * 从 core.js 抽出来的模块：**DDL 与迁移是"数据形状"的唯一定义处**，
 * 与"怎么用这些数据"（RedteamStore 的方法）分开之后，
 * 看 schema 不用翻过 500 行计分逻辑，改表结构也不会误碰业务代码。
 *
 * 两处迁移遵循同一条纪律：**先查 PRAGMA 再 ADD COLUMN**，可重复执行、老库不用重建。
 * 读不到表结构一律按"没有这一列"处理（返回 false），交给 ensure 去尝试 ALTER；
 * 反过来当成"列已存在"会让迁移被静默跳过，故障点从"迁移失败"漂到远端 SQL 执行处。
 */

/* ------------------------------------------------------------------ FTS5 能力检测 */

/**
 * 本机 `node:sqlite` 是否带 FTS5。
 *
 * **必须检测**：FTS5 是编译期选项，不同 Node 构建并不一致 ——
 * Node 22.14 的 `node:sqlite` 没有（`no such module: fts5`），22.23 有。
 * 因此不能假定它存在：CI 与本地 Node 版本不一致时，整个 DDL 都建不起来。
 * 语义：只有 FTS5 缺席时才降级成 LIKE 检索 —— 装了 FTS5 的机器行为完全不变。
 *
 * `REDTEAM_NO_FTS5=1` 可强制走降级路径：CI 的 Node 一旦换了带 FTS5 的版本，
 * 降级分支就再没人执行了，得留一个能主动触发它的开关（见 test/fts-fallback.test.mjs）。
 */
export const HAS_FTS5 = (() => {
  if (process.env.REDTEAM_NO_FTS5 === '1') return false
  try {
    const probe = new DatabaseSync(':memory:')
    try {
      probe.exec('CREATE VIRTUAL TABLE __fts5_probe USING fts5(x)')
      return true
    } finally {
      probe.close()
    }
  } catch {
    return false
  }
})()

/* ------------------------------------------------------------------ FTS 虚拟表 DDL */

/**
 * 两张全文检索虚拟表。**单独导出**，因为它们依赖 FTS5：
 * FTS5 缺席的构建上建表会抛 `no such module: fts5`，把整份 DDL 一起带崩。
 * 调用方按 `HAS_FTS5` 决定是否拼进 DDL（见 core.js 的 db() / kb()）。
 */
export const ASSET_FTS_DDL = `
CREATE VIRTUAL TABLE IF NOT EXISTS asset_fts USING fts5(
  asset_id UNINDEXED, ip, names, banners, titles, fingerprints
);
`

export const POC_FTS_DDL = `
CREATE VIRTUAL TABLE IF NOT EXISTS poc_fts USING fts5(
  poc_id UNINDEXED, title, cve, component, versions, tags, description, content
);
`

/* ------------------------------------------------------------------ 靶标库 schema */

export const DDL = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;

CREATE TABLE IF NOT EXISTS scan_run (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_session_id TEXT, tool TEXT, argv TEXT,
  started_at TEXT, finished_at TEXT, status TEXT DEFAULT 'running'
);

CREATE TABLE IF NOT EXISTS segment (
  cidr TEXT PRIMARY KEY, ip_start TEXT, ip_end TEXT,
  org TEXT, asn TEXT, country TEXT, city TEXT,
  source TEXT, first_seen TEXT, last_seen TEXT
);

CREATE TABLE IF NOT EXISTS asset (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  segment_cidr TEXT NOT NULL, ip TEXT NOT NULL, ip_int INTEGER,
  state TEXT DEFAULT 'unknown', primary_name TEXT, confidence REAL,
  first_seen TEXT, last_seen TEXT, discovered_at TEXT,
  test_status TEXT DEFAULT 'untested', test_notes TEXT, test_surface TEXT,
  test_updated_at TEXT, test_updated_by TEXT, blocked_count INTEGER DEFAULT 0,
  priority TEXT, potential TEXT, assess_reason TEXT, assessed_at TEXT, assessed_by TEXT,
  UNIQUE(segment_cidr, ip)
);

CREATE TABLE IF NOT EXISTS asset_name (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER NOT NULL, name TEXT NOT NULL, kind TEXT,
  provenance TEXT, tool TEXT, first_seen TEXT, last_seen TEXT,
  UNIQUE(asset_id, name, kind)
);

CREATE TABLE IF NOT EXISTS port (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER NOT NULL, proto TEXT DEFAULT 'tcp', port INTEGER NOT NULL,
  state TEXT DEFAULT 'open', provenance TEXT, tool TEXT, banner TEXT,
  url TEXT, title TEXT,
  first_seen TEXT, last_seen TEXT,
  UNIQUE(asset_id, proto, port)
);

CREATE TABLE IF NOT EXISTS service (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  port_id INTEGER NOT NULL, name TEXT, product TEXT, version TEXT, cpe TEXT,
  provenance TEXT, tool TEXT, first_seen TEXT, last_seen TEXT
);

CREATE TABLE IF NOT EXISTS fingerprint (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER NOT NULL, port_id INTEGER,
  category TEXT, vendor TEXT, product TEXT, version TEXT,
  evidence TEXT, confidence REAL, provenance TEXT, tool TEXT,
  first_seen TEXT, last_seen TEXT
);

CREATE TABLE IF NOT EXISTS observation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_kind TEXT NOT NULL, entity_id INTEGER NOT NULL,
  attr TEXT, value TEXT, provenance TEXT, tool TEXT,
  scan_run_id INTEGER, collected_at TEXT, raw_ref TEXT
);

CREATE TABLE IF NOT EXISTS edge (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  src_kind TEXT NOT NULL, src_id TEXT NOT NULL,
  dst_kind TEXT NOT NULL, dst_id TEXT NOT NULL,
  relation TEXT NOT NULL, confidence REAL, scan_run_id INTEGER,
  first_seen TEXT, last_seen TEXT,
  UNIQUE(src_kind, src_id, dst_kind, dst_id, relation)
);

CREATE TABLE IF NOT EXISTS tag (
  entity_kind TEXT NOT NULL, entity_id INTEGER NOT NULL, tag TEXT NOT NULL,
  note TEXT, created_by TEXT, created_at TEXT,
  PRIMARY KEY (entity_kind, entity_id, tag)
);

CREATE TABLE IF NOT EXISTS vuln (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER, port_id INTEGER, cve TEXT, title TEXT, severity TEXT,
  source TEXT, confidence REAL, status TEXT, evidence TEXT, target TEXT,
  found_by_agent TEXT, found_at TEXT, gained TEXT, agent TEXT
);

/* Пункт начисления: из правил начисления баллов учений, редактируется пользователем (баллы, включение, категория) */
CREATE TABLE IF NOT EXISTS score_point (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE,
  name TEXT NOT NULL,
  category TEXT,
  points INTEGER DEFAULT 0,
  max_hits INTEGER DEFAULT 1,
  description TEXT,
  enabled INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT, updated_at TEXT,
  /* ── Новые поля оценки по «Правилам начисления баллов за прорыв и вторжение» (v0.11.0) ────────────────────
     rule: номер правила (RULE 1…25); **пункты начисления одного rule делят лимит баллов этого правила**
     tier: уровень внутри правила (обычные права/административные права/надбавка…), панель и отчёт группируют по нему
     cap: лимит суммарных баллов этого rule (0 = без лимита)
     dedup_scope: методика начисления service (по одному активу и порту считается только высшая запись) / system (по одной системе считается только высшее право один раз)
                  / target (по всей цели считается один раз) / none (суммируется поштучно по числу узлов)
     legacy: 1 = пункт начисления старой версии (после миграции сохранён, но отключён; служит только исторической справкой и не участвует в начислении по новой методике) */
  /* src: исходный номер в «Правилах начисления баллов за прорыв и вторжение (объединённая версия)» (для объединённых строк — первый исходный номер); используется только для сверки с исходной таблицей */
  src INTEGER,
  rule INTEGER,
  tier TEXT,
  cap INTEGER DEFAULT 0,
  dedup_scope TEXT DEFAULT 'service',
  legacy INTEGER DEFAULT 0,
  /* builtin: 1 = встроенный пункт начисления, поставляемый с «Правилами начисления баллов за прорыв и вторжение» (баллы/лимит/методика зафиксированы правилами,
     пользователь может менять только «включить/отключить»); 0 = пункт, созданный пользователем (редактируется свободно и не удаляется логикой первичного заполнения).
     при определении встроенности **нужно смотреть именно на этот флаг**, а не на список code: если созданный пользователем пункт будет признан остатком старой системы,
     он будет удалён вместе с попаданиями при следующем чтении панели начисления, хотя сторона записи всё равно вернёт успех. */
  builtin INTEGER DEFAULT 0
);

/* Запись начисления: пункт начисления взят на конкретной цели */
/* Этап операции: пять этапов схемы полного пути атаки (содержимое редактируется) */
CREATE TABLE IF NOT EXISTS stage (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  color TEXT,
  goal TEXT,
  sections TEXT,
  tools TEXT,
  transition TEXT,
  sort_order INTEGER DEFAULT 0,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS score_hit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  point_id INTEGER NOT NULL,
  asset_id INTEGER, vuln_id INTEGER, step_id INTEGER, target TEXT,
  evidence TEXT, note TEXT,
  self_created INTEGER DEFAULT 0,
  port INTEGER,
  recorded_by TEXT, recorded_at TEXT,
  /* Фактические баллы этого попадания (NULL = используются points пункта начисления по умолчанию).
     «Объединённая версия» сводит несколько уровней одного пункта в одну запись (например, права на серверном хосте «обычные 10 / административные 50»,
     контроль домена «первый уровень 50 / второй уровень 20»), **разница уровней может выражаться только в каждой отдельной записи попадания**,
     иначе «из прав берётся высшее, начисление однократное» выразить невозможно. */
  points INTEGER,
  /* Множитель: G5 удвоение за объём данных (×2) / G6 результаты по IPv6 ×3. **Применяется к баллам за права**,
     умножается на points и затем участвует в накоплении до лимита. Хранится, чтобы панель и отчёт могли объяснить, «почему здесь 200 баллов»,
     а не заставлять читателя думать, что баллы посчитаны неверно. */
  multiplier REAL DEFAULT 1
);

/* Учётные данные: secret_value хранит пароль/ключ в открытом виде (панель показывает его сразу для повторного использования), secret_ref указывает на файл доказательства в runs/.
   Внимание: эта база существует только на локальной машине; коммитить файл базы или выгрузки в любой репозиторий запрещено. */
CREATE TABLE IF NOT EXISTS credential (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER, host TEXT, username TEXT, secret_type TEXT,
  secret_value TEXT, secret_ref TEXT,
  privilege TEXT, source TEXT, tool TEXT, note TEXT,
  found_by_agent TEXT, found_at TEXT, agent TEXT,
  UNIQUE(host, username, secret_type)
);

/* Сессия доступа: запись одного управляемого доступа после получения точки входа (начало lateral movement) */
CREATE TABLE IF NOT EXISTS access_session (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER, host TEXT, username TEXT, method TEXT, privilege TEXT,
  session_ref TEXT, note TEXT, found_by_agent TEXT, obtained_at TEXT
);

/* WebShell: уже поднятая управляемая точка входа. Агент может использовать её в любой момент, чтобы не получилось «в конце атаки забыли про webshell» */
CREATE TABLE IF NOT EXISTS webshell (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER, url TEXT NOT NULL, shell_type TEXT, pass_key TEXT,
  secret_ref TEXT, privilege TEXT,
  status TEXT DEFAULT 'unknown', last_check TEXT, check_note TEXT, latency_ms INTEGER,
  note TEXT, found_by_agent TEXT, created_at TEXT, updated_at TEXT, agent TEXT,
  UNIQUE(url, pass_key)
);

/* Туннель во внутреннюю сеть: suo5 / socks5 / ssh -R / frp и т. п. Хранит точку входа, адрес прослушивания и доступные сети */
CREATE TABLE IF NOT EXISTS tunnel (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER, webshell_id INTEGER, kind TEXT, listen TEXT,
  entry TEXT, reach TEXT,
  entry_kind TEXT,
  status TEXT DEFAULT 'unknown', last_check TEXT, check_note TEXT, latency_ms INTEGER,
  pid TEXT, command TEXT, note TEXT, found_by_agent TEXT, created_at TEXT, updated_at TEXT, agent TEXT
);

/* HTTP-доказательство: исходный запрос/ответ, можно сразу вставить в Burp Suite / Yakit для воспроизведения */
CREATE TABLE IF NOT EXISTS http_evidence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vuln_id INTEGER, asset_id INTEGER, label TEXT,
  method TEXT, url TEXT, status INTEGER,
  request TEXT, response TEXT, note TEXT,
  captured_by TEXT, captured_at TEXT
);

/* Файл атаки: скрипт/POC/EXP, реально сработавший на конкретной цели (сохраняются только проверенные) */
CREATE TABLE IF NOT EXISTS attack_file (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  target TEXT NOT NULL, target_kind TEXT, name TEXT NOT NULL, kind TEXT,
  path TEXT NOT NULL, description TEXT, evidence TEXT,
  asset_id INTEGER, vuln_id INTEGER, created_by TEXT, created_at TEXT,
  UNIQUE(target, name)
);

/* Шаг цепочки атаки: узел цепочки, записанный вручную или агентом, для страницы цепочки атаки и отчёта.
   Три столбца tool/agent/result — свидетельство «как сделан этот шаг»: именно по ним отчёт объясняет, откуда взялись логин с паролем
   и как построен туннель, — за счёт инструмента и исходной команды в шаге. */
CREATE TABLE IF NOT EXISTS attack_step (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seq INTEGER, stage TEXT, title TEXT, detail TEXT,
  asset_id INTEGER, vuln_id INTEGER, access_id INTEGER, point_id INTEGER,
  evidence_ref TEXT, tool TEXT, agent TEXT, result TEXT,
  recorded_by TEXT, recorded_at TEXT
);

/* Скриншот-доказательство: «видимая» часть материала по результату начисления.
   Место хранения: <каталог цели>/shots/, в базе хранятся только имя файла и метаданные — изображения в SQLite не попадают.
   kind: screenshot — снимок с места; card — карточка-выдержка доказательства, созданная из записи; в отчёте их нужно помечать раздельно. */
CREATE TABLE IF NOT EXISTS shot (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  point_id INTEGER, hit_id INTEGER, asset_id INTEGER, vuln_id INTEGER,
  target TEXT, label TEXT, note TEXT,
  file TEXT NOT NULL,
  kind TEXT DEFAULT 'screenshot',
  mime TEXT, bytes INTEGER, width INTEGER, height INTEGER, sha256 TEXT,
  source_ref TEXT, captured_at TEXT, found_by_agent TEXT, agent TEXT, created_at TEXT,
  UNIQUE(file)
);


CREATE INDEX IF NOT EXISTS ix_asset_segment ON asset(segment_cidr);
CREATE INDEX IF NOT EXISTS ix_asset_ip_int ON asset(ip_int);
CREATE INDEX IF NOT EXISTS ix_port_asset ON port(asset_id);
CREATE INDEX IF NOT EXISTS ix_port_port ON port(port);
CREATE INDEX IF NOT EXISTS ix_service_port ON service(port_id);
CREATE INDEX IF NOT EXISTS ix_service_name ON service(name, product, version);
CREATE INDEX IF NOT EXISTS ix_fp_asset ON fingerprint(asset_id);
CREATE INDEX IF NOT EXISTS ix_fp_product ON fingerprint(product, version);
CREATE INDEX IF NOT EXISTS ix_edge_src ON edge(src_kind, src_id);
CREATE INDEX IF NOT EXISTS ix_edge_dst ON edge(dst_kind, dst_id);
CREATE INDEX IF NOT EXISTS ix_obs_entity ON observation(entity_kind, entity_id);
CREATE INDEX IF NOT EXISTS ix_vuln_asset ON vuln(asset_id);
CREATE INDEX IF NOT EXISTS ix_vuln_sev ON vuln(severity, status);
CREATE INDEX IF NOT EXISTS ix_vuln_cve ON vuln(cve);
CREATE INDEX IF NOT EXISTS ix_cred_host ON credential(host);
CREATE INDEX IF NOT EXISTS ix_access_host ON access_session(host);
CREATE INDEX IF NOT EXISTS ix_webshell_status ON webshell(status);
CREATE INDEX IF NOT EXISTS ix_tunnel_status ON tunnel(status);
CREATE INDEX IF NOT EXISTS ix_shot_point ON shot(point_id);
CREATE INDEX IF NOT EXISTS ix_shot_hit ON shot(hit_id);
CREATE INDEX IF NOT EXISTS ix_shot_asset ON shot(asset_id);
CREATE INDEX IF NOT EXISTS ix_http_vuln ON http_evidence(vuln_id);
CREATE INDEX IF NOT EXISTS ix_http_asset ON http_evidence(asset_id);
CREATE INDEX IF NOT EXISTS ix_step_seq ON attack_step(seq, id);
CREATE INDEX IF NOT EXISTS ix_attack_target ON attack_file(target);
CREATE INDEX IF NOT EXISTS ix_score_hit_point ON score_hit(point_id);
/* Выборка попаданий для отчёта/цепочки атаки по времени (ORDER BY h.recorded_at, h.id в scoreReport) */
CREATE INDEX IF NOT EXISTS ix_score_hit_time ON score_hit(recorded_at, id);
/* Обратный поиск «какие шаги атаки связаны с этим шагом» для отчёта по asset_id / vuln_id / step_id */
CREATE INDEX IF NOT EXISTS ix_score_hit_vuln ON score_hit(vuln_id);
CREATE INDEX IF NOT EXISTS ix_score_hit_step ON score_hit(step_id);
/* Обратный поиск шагов атаки по активу/уязвимости (здесь же резервная атрибуция для трассировки отчёта и #hitTrace) */
CREATE INDEX IF NOT EXISTS ix_step_asset ON attack_step(asset_id);
CREATE INDEX IF NOT EXISTS ix_step_vuln ON attack_step(vuln_id);
CREATE INDEX IF NOT EXISTS ix_step_recorded ON attack_step(recorded_at);
/* Фильтр активов по C-блоку + состоянию (это та выборка, которая срабатывает при клике на C-блок слева в Карте активов) */
CREATE INDEX IF NOT EXISTS ix_asset_segment_state ON asset(segment_cidr, state);
/* Резервное сопоставление http-доказательств по URL цели через LIKE (когда scoreReport не находит явной связи) */
CREATE INDEX IF NOT EXISTS ix_http_url ON http_evidence(url);
/* Выборка туннелей/webshell по активу и состоянию (нужна и на странице сессий, и в цепочке атаки) */
CREATE INDEX IF NOT EXISTS ix_tunnel_asset ON tunnel(asset_id);
CREATE INDEX IF NOT EXISTS ix_webshell_asset ON webshell(asset_id);
CREATE INDEX IF NOT EXISTS ix_credential_asset ON credential(asset_id);
CREATE INDEX IF NOT EXISTS ix_access_asset ON access_session(asset_id);
CREATE INDEX IF NOT EXISTS ix_score_hit_asset ON score_hit(asset_id);

CREATE VIEW IF NOT EXISTS v_asset_summary AS
SELECT a.id, a.ip, a.segment_cidr, a.state, a.primary_name, a.first_seen, a.last_seen,
  (SELECT COUNT(*) FROM port p WHERE p.asset_id = a.id AND p.state = 'open') AS open_ports,
  (SELECT COUNT(*) FROM observation o WHERE o.entity_kind = 'asset' AND o.entity_id = a.id AND o.provenance = 'passive') AS passive_signals,
  (SELECT COUNT(*) FROM observation o WHERE o.entity_kind = 'asset' AND o.entity_id = a.id AND o.provenance = 'active') AS active_signals
FROM asset a;

CREATE VIEW IF NOT EXISTS v_asset_service AS
SELECT p.asset_id, p.port, p.proto, p.provenance AS port_provenance,
       s.name AS service, s.product, s.version, s.provenance AS service_provenance
FROM port p LEFT JOIN service s ON s.port_id = p.id;
`

/* ------------------------------------------------------------------ 知识库 schema */

export const KNOWLEDGE_DDL = `
CREATE TABLE IF NOT EXISTS poc (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL,                -- стабильный идентификатор (slug), агент может ссылаться напрямую
  title TEXT NOT NULL,
  kind TEXT,                         -- poc | exp | script | template | payload
  category TEXT,                     -- категория: rce / deserialization / file-upload / sqli / unauthorized / auth-bypass / weak-password / ssrf / xxe / path-traversal / file-read / info-leak / privesc / tunnel / other
  cve TEXT,                          -- CVE / CNVD / номер производителя
  component TEXT,                    -- компонент/продукт (Weblogic, Shiro, Weaver OA…)
  versions TEXT,                     -- затронутые версии
  severity TEXT,
  language TEXT,                     -- python | go | java | bash | http | nuclei | js | php
  source TEXT,                       -- web | self | manual | nuclei-template | kb
  source_url TEXT,
  description TEXT,
  usage TEXT,                        -- использование/пример командной строки
  content TEXT,                      -- содержимое (скрипт / POC / исходный запрос)
  path TEXT,                         -- место хранения (pocs/<code>/<file>), чтобы агент мог сразу cat
  verified INTEGER DEFAULT 0,        -- проверено ли на практике
  verified_note TEXT,                -- доказательство проверки (какая цель, какой вывод)
  hit_count INTEGER DEFAULT 0,       -- сколько раз переиспользовано
  used_on TEXT,                      -- последнее использование: на каком объекте/цели
  -- Происхождение: на какой цели и каком активе найдено/проверено это знание (время создания — created_at)
  engagement_id TEXT,
  engagement_name TEXT,
  asset_target TEXT,
  found_by_agent TEXT,
  tags TEXT,
  created_by TEXT, created_at TEXT, updated_at TEXT,
  UNIQUE(code)
);
CREATE INDEX IF NOT EXISTS ix_poc_cve ON poc(cve);
CREATE INDEX IF NOT EXISTS ix_poc_component ON poc(component);
CREATE INDEX IF NOT EXISTS ix_poc_kind ON poc(kind, verified);
/* Внимание: индексы по категории и исходной цели **здесь создавать нельзя** — в таблице poc старой knowledge.db ещё нет
   этих двух столбцов, и CREATE INDEX сразу выбросит ошибку на этапе exec(DDL)
   "no such column: category", так что даже миграция добавления столбцов не выполнится. Они создаются после того, как migrateKnowledge() добавит столбцы. */
`

/* ------------------------------------------------------------------ 知识库归类 */



/**
 * 知识库归类（与得分点/攻击面口径对齐）：智能体回填时必须选一个，
 * 面板按它分组，用户才能"一类一类看"而不是几百条平铺。
 */
const POC_CATEGORIES = [
  { code: 'rce', name: 'Удалённое выполнение команд', hint: 'RCE во фреймворках/промежуточном ПО/компонентах, инъекция выражений, шаблонная инъекция' },
  { code: 'deserialization', name: 'Десериализация', hint: 'цепочки десериализации Java/PHP/.NET, fastjson/jackson и т. п.' },
  { code: 'file-upload', name: 'Загрузка файлов и getshell', hint: 'обход загрузки, уязвимости разбора, повторный рендеринг, состояние гонки' },
  { code: 'sqli', name: 'SQL-инъекция', hint: 'проверка точки инъекции, выкачивание базы, запись файлов, повышение привилегий' },
  { code: 'unauthorized', name: 'Неавторизованный доступ', hint: 'интерфейсы/сервисы без аутентификации (Redis, Docker, Actuator, вызовы Swagger)' },
  { code: 'auth-bypass', name: 'Обход аутентификации / нарушение прав доступа', hint: 'обход входа, дефекты JWT, несанкционированные чтение и запись, логические дефекты' },
  { code: 'weak-password', name: 'Слабые пароли / перебор паролей', hint: 'слабые пароли админок, слабые пароли БД, пароли по умолчанию' },
  { code: 'ssrf', name: 'SSRF', hint: 'Подделка серверных запросов, метаданные облака, трамплин для разведки внутренней сети' },
  { code: 'xxe', name: 'XXE', hint: 'чтение внешних сущностей XML и SSRF' },
  { code: 'path-traversal', name: 'Обход каталогов / произвольное чтение файлов', hint: 'обход путей, произвольное чтение файлов, чтение исходников/конфигураций' },
  { code: 'info-leak', name: 'Утечка информации', hint: 'утечки конфигураций/учётных данных/исходников/резервных копий (те, что можно превратить в баллы)' },
  { code: 'privesc', name: 'Повышение привилегий / lateral movement', hint: 'локальное повышение привилегий, переиспользование учётных данных, Pass-the-Hash, инструменты lateral movement' },
  { code: 'tunnel', name: 'Туннели / прокси', hint: 'suo5, frp, chisel, Neo-ReGeorg, прокси во внутреннюю сеть' },
  { code: 'other', name: 'Прочее', hint: 'не относится ни к одной категории выше (укажите назначение)' },
]
export { POC_CATEGORIES }

/** 归类 code → 中文名（未知值原样返回，允许用户自定义）。 */
export function pocCategoryName(code) {
  const hit = POC_CATEGORIES.find((c) => c.code === String(code || ''))
  return hit ? hit.name : (code ? String(code) : 'Без категории')
}

/**
 * 老条目的归类推测（迁移时给 category 为空的条目打标）。
 * 依据是 code/title/component 里的关键词 —— 命中就归那一类，都不中才落 `other`。
 * 顺序即优先级：越具体的越靠前（例如"任意文件上传"要压过泛化的"上传"）。
 * 新写入的条目由 `redteam_poc_add` 的 `category` 参数决定，不走这里。
 */
export function guessPocCategory(text) {
  const t = String(text || '').toLowerCase()
  const has = (...words) => words.some((w) => t.includes(w))
  if (has('Десериализация', 'deserial', 'shiro', 'fastjson', 'weblogic', 'log4j', 'jackson')) return 'deserialization'
  if (has('Загрузка файлов', 'file-upload', 'fileupload', 'upload', 'getshell', 'webshell', 'Запись webshell')) return 'file-upload'
  if (has('sql-инъекция', 'sqli', 'sql-инъекция', 'инъекция с выкачиванием базы', 'union select')) return 'sqli'
  if (has('слабые пароли', 'перебор', 'brute', 'пароли по умолчанию', 'учётные данные по умолчанию', 'hydra')) return 'weak-password'
  if (has('туннель', 'socks', 'suo5', 'frp', 'chisel', 'regeorg', 'прокси')) return 'tunnel'
  if (has('неавторизованный доступ', 'unauth', 'без аутентификации', 'без авторизации', 'без проверки прав', 'без аутентификации')) return 'unauthorized'
  if (has('нарушение прав доступа', 'обход аутентификации', 'обход авторизации', 'jwt', 'логическая уязвимость', 'обход капчи', 'auth-bypass')) return 'auth-bypass'
  if (has('rce', 'выполнение команд', 'выполнение кода', 'инъекция выражений', 'шаблонная инъекция', 'ssti', 'инъекция команд', 'удалённое выполнение')) return 'rce'
  if (has('ssrf', 'подделка серверных запросов')) return 'ssrf'
  if (has('xxe', 'внешние сущности')) return 'xxe'
  if (has('произвольное чтение файлов', 'чтение файлов', 'обход каталогов', 'обход путей', 'path traversal', 'lfi', 'произвольное скачивание файлов')) return 'path-traversal'
  if (has('повышение привилегий', 'lateral movement', 'pass-the-hash', 'mimikatz', 'impacket', 'переиспользование учётных данных')) return 'privesc'
  if (has('Утечка информации', 'утечка конфигурации', 'конфиденциальные данные', 'утечка исходников', 'утечка', 'leak')) return 'info-leak'
  return 'other'
}

/* ------------------------------------------------------------------ 靶标库迁移 */

/**
 * 轻量迁移：给既有库补列。先查 PRAGMA 再 ADD COLUMN，重复执行安全。
 * 只在新增列时执行，因此老靶标库不需要重建。
 */
export function migrate(db) {
  const has = (table, column) => {
    try {
      return db.prepare(`PRAGMA table_info(${table})`).all().some((row) => row.name === column)
    } catch {
      /* 读不到表结构必须返回 false（= "没有这一列"），让 ensure 去尝试 ALTER。
         返回 true 会让迁移被静默跳过，代码随后按新列写 SQL，故障表现为远端 SQL 报错
         而不是迁移失败。 */
      return false
    }
  }
  const ensure = (table, column, ddl) => {
    if (has(table, column)) return false
    try { db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`) } catch { /* 并发迁移时忽略 */ }
    return true
  }
  ensure('vuln', 'target', 'TEXT')
  ensure('vuln', 'found_by_agent', 'TEXT')
  ensure('vuln', 'found_at', 'TEXT')
  ensure('port', 'url', 'TEXT')
  ensure('port', 'title', 'TEXT')
  ensure('asset', 'test_status', "TEXT DEFAULT 'untested'")
  ensure('asset', 'test_notes', 'TEXT')
  ensure('asset', 'test_surface', 'TEXT')
  ensure('asset', 'test_updated_at', 'TEXT')
  ensure('asset', 'test_updated_by', 'TEXT')
  ensure('asset', 'blocked_count', 'INTEGER DEFAULT 0')
  ensure('asset', 'priority', 'TEXT')
  ensure('asset', 'potential', 'TEXT')
  ensure('asset', 'assess_reason', 'TEXT')
  ensure('asset', 'assessed_at', 'TEXT')
  ensure('asset', 'assessed_by', 'TEXT')
  /* 发现时间：本条资产**第一次进入本库**的时刻（不随重复采集刷新，便于"这条什么时候发现的"）。
     与 first_seen（数据源/工具给出的首次出现时间）不是一回事，两个都留。 */
  ensure('asset', 'discovered_at', 'TEXT')
  /* 产出这条记录的智能体角色（recon/assess/vuln-scan/exploit/internal），
     报告要写清"谁发现的、怎么拿到的" */
  ensure('vuln', 'agent', 'TEXT')
  ensure('credential', 'agent', 'TEXT')
  ensure('webshell', 'agent', 'TEXT')
  ensure('tunnel', 'agent', 'TEXT')
  /* 攻击步骤：用了什么工具/命令、由谁记录。报告里"隧道怎么搭的、马怎么上的"靠这三列说清 */
  ensure('attack_step', 'tool', 'TEXT')
  ensure('attack_step', 'agent', 'TEXT')
  ensure('attack_step', 'result', 'TEXT')
  /* 内外网维度：internal（内网/私网地址）| external（互联网可达）。手工指定优先于自动推导 */
  ensure('asset', 'scope', 'TEXT')
  /* 通过这个漏洞拿到了什么：账号权限 / 服务器权限 / 内网隧道 / 得分点等 */
  ensure('vuln', 'gained', 'TEXT')
  /* 凭据明文：面板要直接显示口令，不再只存引用（库在本机，禁止导出/提交） */
  ensure('credential', 'secret_value', 'TEXT')
  /* 得分点按《突破入侵类得分规则》重构（v0.11.0）：
     rule/tier/cap/dedup_scope 承载"规则号 + 档位 + 该规则上限 + 计分口径"。
     老库补列后由 seedScorePoints() 做一次性迁移（旧默认点转 legacy 停用，新增 25 条规则的得分点），
     用户自建的得分点与全部历史命中一律保留。 */
  ensure('score_point', 'rule', 'INTEGER')
  ensure('score_point', 'tier', 'TEXT')
  ensure('score_point', 'cap', 'INTEGER DEFAULT 0')
  ensure('score_point', 'dedup_scope', "TEXT DEFAULT 'service'")
  ensure('score_point', 'legacy', 'INTEGER DEFAULT 0')
  /* builtin：区分内置点与用户自建点（见 schema 注释）。
     老库先按 0 建列，再由 seedScorePoints 用 DEFAULT_SCORE_POINTS 的 code 名单回填。 */
  ensure('score_point', 'builtin', 'INTEGER DEFAULT 0')
  ensure('score_point', 'src', 'INTEGER')
  /* G5 / G6 倍率（老库补列，默认 1 = 不放大） */
  ensure('score_hit', 'multiplier', 'REAL DEFAULT 1')
  /* 每条命中自带分值（合并版把档位并进一条后必需，见 score_hit 建表注释） */
  ensure('score_hit', 'points', 'INTEGER')
  /* 得分类别不设数量上限（max_hits 列保留只为兼容老库结构，计分不再使用） */
  /* 得分 ↔ 漏洞/步骤 关联：报告取原始请求、流程图连线用 */
  ensure('score_hit', 'vuln_id', 'INTEGER')
  ensure('score_hit', 'step_id', 'INTEGER')
  ensure('attack_step', 'point_id', 'INTEGER')
  /* 攻击链已推倒重来：老的五阶段行整体作废，attck 列移除 */
  try {
    /* 注意：'target' 在新老两版里同名，必须按名称区分，否则第二次打开会把新版阶段删掉 */
    db.prepare("DELETE FROM stage WHERE code IN ('external','foothold','tunnel','privilege')").run()
    db.prepare("DELETE FROM stage WHERE code = 'target' AND name = 'права на системе цели'").run()
    db.prepare("DELETE FROM stage WHERE code NOT IN ('recon','internet','boundary','internal','target')").run()
  } catch { /* 表还不存在，忽略 */ }
  if (has('stage', 'attck')) {
    try { db.exec('ALTER TABLE stage DROP COLUMN attck') } catch { /* 老 SQLite 不支持则保留 */ }
  }
  /* 攻击步骤上的阶段：老值是上一版的阶段 code，清掉以便按 legacy stage 重新映射。
     注意：'target' 在新版里仍是合法阶段（⑤ 靶标权限），不能一起清——否则每次打开
     靶标都会把「显式指定 ⑤」的步骤与得分打回自动推导。 */
  try {
    db.prepare("UPDATE attack_step SET stage_code = NULL WHERE stage_code IN ('external','foothold','tunnel','privilege')").run()
    db.prepare("UPDATE score_hit SET stage_code = NULL WHERE stage_code IN ('external','foothold','tunnel','privilege')").run()
  } catch { /* 忽略 */ }
  /* 阶段归属改为按每条得分自动推导，得分点上的 stage_code 已废弃 */
  if (has('score_point', 'stage_code')) {
    try { db.exec('ALTER TABLE score_point DROP COLUMN stage_code') } catch { /* 忽略 */ }
  }
  /* 蓝队视角已从作战阶段中移除：老库把这一列删掉（失败则忽略，不影响使用） */
  if (has('stage', 'blue_team')) {
    try { db.exec('ALTER TABLE stage DROP COLUMN blue_team') } catch { /* 老 SQLite 不支持则保留 */ }
  }
  /* 阶段归属：得分命中可显式覆盖（默认自动推导）；攻击步骤记录所属阶段 */
  ensure('score_hit', 'stage_code', 'TEXT')
  /* 自建账号标记：自己注册/自己创建的账号不算得分权限，只作过程记录（老数据默认 0） */
  ensure('score_hit', 'self_created', 'INTEGER DEFAULT 0')
  /* 得分落在哪个「服务」上：账号类得分按 (资产, 端口) 封顶，同一服务只算一次最高权限。
     端口在写入时解析（工具传的 port → target 里的端口 → 该资产唯一登记的端口）；老数据打开靶标时按 target 回填一次。 */
  ensure('score_hit', 'port', 'INTEGER')
  try {
    const p = db.prepare("SELECT COUNT(*) AS n FROM score_hit WHERE port IS NULL AND target IS NOT NULL AND target <> ''").get().n
    if (p > 0) {
      const upd = db.prepare('UPDATE score_hit SET port = ? WHERE id = ?')
      for (const row of db.prepare("SELECT id, target FROM score_hit WHERE port IS NULL AND target IS NOT NULL AND target <> ''").all()) {
        const port = parseTargetPort(row.target)
        if (port !== null) upd.run(port, row.id)
      }
    }
  } catch { /* 表还不存在，忽略 */ }
  /* 隧道入口归属：判断这条通道有没有真的跨越靶标边界（self-only 不算突破） */
  ensure('tunnel', 'entry_kind', 'TEXT')
  if (ensure('attack_step', 'stage_code', 'TEXT')) {
    try {
      const stmt = db.prepare('UPDATE attack_step SET stage_code = ? WHERE stage = ?')
      for (const [legacy, code] of Object.entries(LEGACY_STAGE_MAP)) stmt.run(code, legacy)
    } catch { /* 忽略 */ }
  }
  /* 老库回填：按 IP 归属自动区分内外网 */
  try {
    db.exec(`UPDATE asset SET scope = (${SCOPE_SQL}) WHERE scope IS NULL OR scope = ''`)
  } catch { /* 首次建库时表为空，忽略 */ }
  /* 老库回填发现时间：没有 discovered_at 的用 first_seen 顶上（总比空白好） */
  try {
    db.exec("UPDATE asset SET discovered_at = COALESCE(first_seen, last_seen) WHERE discovered_at IS NULL OR discovered_at = ''")
  } catch { /* 忽略 */ }
}

/* ------------------------------------------------------------------ 知识库迁移 */

/**
 * 知识库轻量迁移：给既有 knowledge.db 补列（归类 / 来源溯源）。
 * 与靶标库迁移同样先查 PRAGMA 再 ADD COLUMN，重复执行安全、老库不用重建。
 */
export function migrateKnowledge(db) {
  const has = (column) => {
    try {
      return db.prepare('PRAGMA table_info(poc)').all().some((row) => row.name === column)
    } catch { return true }
  }
  const ensure = (column, ddl) => {
    if (has(column)) return
    try { db.exec(`ALTER TABLE poc ADD COLUMN ${column} ${ddl}`) } catch { /* 并发迁移时忽略 */ }
  }
  ensure('category', 'TEXT')
  ensure('engagement_id', 'TEXT')
  ensure('engagement_name', 'TEXT')
  ensure('asset_target', 'TEXT')
  ensure('found_by_agent', 'TEXT')
  try { db.exec('CREATE INDEX IF NOT EXISTS ix_poc_category ON poc(category)') } catch { /* 忽略 */ }
  try { db.exec('CREATE INDEX IF NOT EXISTS ix_poc_engagement ON poc(engagement_id)') } catch { /* 忽略 */ }
  /* 老条目没有归类：按 code/标题/组件的关键词推一个（推测逻辑只有一份，见 guessPocCategory） */
  try {
    const rows = db.prepare("SELECT id, code, title, component FROM poc WHERE COALESCE(category, '') = ''").all()
    const upd = db.prepare('UPDATE poc SET category = ? WHERE id = ?')
    for (const row of rows) {
      upd.run(guessPocCategory([row.code, row.title, row.component].filter(Boolean).join(' ')), row.id)
    }
  } catch { /* 忽略 */ }
}
