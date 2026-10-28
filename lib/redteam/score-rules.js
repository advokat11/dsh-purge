/**
 * 计分规则：判定口径 + 默认得分点（零依赖，只用 node: 内置模块）。
 *
 * 从 core.js 抽出来的模块，也是本项目**最该单独读的一份代码**：
 * 面板 / 报告 / 攻击链三处总分必须一致，靠的就是这里的 applyScoreCaps 与
 * evaluateScoreBoard 是**唯一实现** —— 三处各写一遍必然漂移成不同口径。
 *
 * 分工：
 *   · applyScoreCaps       —— 给定命中行，标出哪条计分、哪条被封顶/超上限；
 *   · evaluateScoreBoard   —— 把"读元数据 + 调 applyScoreCaps + 回填标记"包成一个入口；
 *   · DEFAULT_SCORE_POINTS —— 规则文档展开后的得分点定义（src/rule/cap/dedup_scope）。
 */

/* targetHasIpv6Host 要判定 IPv6 字面量：复用 ip-utils 的同一份实现，避免两套正则漂移 */
import { isIpv6 } from './ip-utils.js'

/* ------------------------------------------------------------------ 判定规则 */

/* ------------------------------------------------------------------ 判定规则 */

/**
 * 什么算"真隧道"（算边界突破/内网突破的凭证）：**必须跨越了靶标边界**，
 * 即通道的一端在目标侧。三种情况：
 *   · target-outbound：目标主动连出到我的服务器（反弹 shell 落地、目标上跑 frp/Stowaway 客户端）
 *   · target-http：经目标 WebShell/HTTP 通道（suo5、Neo-ReGeorg、reGeorg、自研 HTTP 隧道）
 *   · target-agent：经目标上已控进程/会话转发的隧道（SSH -R 由目标发起等）
 * 不算的：self-only —— 只在自己 VPS / 自建服务器上开的代理或服务端，没碰到目标。
 */
const TUNNEL_ENTRY_KINDS = {
  'target-outbound': 'Цель сама инициирует соединение (reverse shell / запуск frp-клиента на цели)',
  'target-http': 'Через WebShell/HTTP-канал на цели (suo5 / Neo-ReGeorg)',
  'target-agent': 'Через захваченный процесс/сессию на цели (SSH -R и т. п.)',
  'self-only': 'Только на своём VPS/собственном сервере (не считается прорывом)',
}
export { TUNNEL_ENTRY_KINDS }

/** 这条隧道算不算"跨越了靶标边界"。未声明（老数据/没填）返回 null，界面按"待确认"显示。 */
export function tunnelIsLegit(entryKind) {
  const k = String(entryKind || '').trim()
  if (k === '') return null
  return k !== 'self-only'
}

/**
 * 账号/权限类得分点：**自己注册、自己创建的账号不算拿到权限**（演练得分针对"拿到别人已有的"）。
 * 这些得分点命中时会要求声明 self_created，避免把自助注册当成战果。
 */
const ACCOUNT_POINT_CODES = ['web-account-user', 'web-account-admin', 'server-shell', 'db-access', 'internal-pivot', 'core-system']
export { ACCOUNT_POINT_CODES }

/**
 * 按「服务」封顶的得分点：**同一个资产的同一个端口只算一次分**。
 *
 *   · 账号类（web-account-user / web-account-admin）——拿到最高权限账号即该服务拿满：
 *     普通账号 10 分、管理员 20 分，同一服务上再刷几个账号都不再累加
 *     （两种账号算**同一类**：先拿普通账号、后拿管理员，只有管理员那条计分，总分按最高那条算）。
 *   · 数据库类（db-access）——同口径：一个库权限拿满，同服务再刷第二个库账号不重复计分。
 *
 * 其它得分点（webshell/rce/sensitive-data/boundary/…）仍然不设上限，按命中次数累加。
 */
const SERVICE_CAPPED_POINT_CODES = ['web-account-user', 'web-account-admin', 'db-access']
export { SERVICE_CAPPED_POINT_CODES }

/**
 * 从 target 里解析端口：`http://h:8080/x`、`10.0.0.5:6379`、`10.0.0.5:22`。
 * 没有端口或解析不出返回 null（**不要编造 80/443**，否则会把不同服务并成一个）。
 */
export function parseTargetPort(target) {
  const t = String(target || '').trim()
  if (t === '') return null
  const url = /^[a-z][a-z0-9+.-]*:\/\/([^/?#\s]+)/i.exec(t)
  const authority = url !== null ? url[1] : (/^([^\s/?#]+)/.exec(t) || [])[1]
  if (!authority) return null
  const m = /:(\d{1,5})$/.exec(authority)
  if (m === null) return null
  const n = Number(m[1])
  return Number.isInteger(n) && n > 0 && n <= 65535 ? n : null
}

/** 库列的 port 值（老库可能是 null/0/空串）。 */
function normalizePort(value) {
  if (value === null || value === undefined || value === '') return null
  const n = Number(value)
  return Number.isInteger(n) && n > 0 && n <= 65535 ? n : null
}

/**
 * 从 target 里取「服务标识」：host[:port]。
 *   · 端口取显式写的那个；没写就按协议推默认端口（http→80、https→443、其它→不推断），
 *     这样 `http://h/x` 与 `http://h:80/y` 会归到同一个服务；
 *   · 路径/参数/查询串一律丢掉（`http://h:8080/a/b?c=1` → `h:8080`）。
 * 解析不出 host 时返回 null。
 */
function targetAuthority(target) {
  const t = String(target || '').trim()
  if (t === '') return null
  const url = /^([a-z][a-z0-9+.-]*):\/\/([^/?#\s]+)/i.exec(t)
  const scheme = url !== null ? url[1].toLowerCase() : null
  const authority = url !== null ? url[2] : (/^([^\s/?#]+)/.exec(t) || [])[1]
  if (!authority) return null
  const host = authority.replace(/:\d{1,5}$/, '').toLowerCase()
  if (host === '') return null
  let port = parseTargetPort(t)
  /* 没写端口时按协议补默认端口：避免同一个服务的两种写法被算成两个服务而被重复计分 */
  if (port === null) {
    if (scheme === 'http') port = 80
    else if (scheme === 'https') port = 443
  }
  return port === null ? host : host + ':' + port
}

/**
 * 「服务」键：得分封顶的粒度 = 同一个资产的同一个端口。
 *   · target 能解析出 host[:port] → 就用它（`t10.20.30.40:3306`）——
 *     同一个服务可能由不同的人记分，有的带 asset_id、有的只写 target，
 *     以目标为准才能把它们归到一起；
 *   · target 解析不出（缺失/只写了名字）→ 退到资产：有端口用 `a<id>:<port>`，
 *     没端口记 `a<id>:0`（该资产的未知端口）；
 *   · 两样都没有 → null（拿不到服务信息，这条不参与封顶）。
 */
export function scoreServiceKey(hit = {}) {
  const authority = targetAuthority(hit.target)
  if (authority !== null) return 't' + authority
  const assetId = hit.asset_id === null || hit.asset_id === undefined || hit.asset_id === '' ? null : Number(hit.asset_id)
  if (assetId === null) return null
  const port = normalizePort(hit.port)
  return 'a' + assetId + ':' + (port === null ? 0 : port)
}

/** 「服务」的可读标签，给告警/报告用（如 `10.1.2.3:8080`）。 */
export function serviceLabel(hit = {}, assetIp) {
  const ip = assetIp || hit.asset_ip || ''
  const port = normalizePort(hit.port) ?? parseTargetPort(hit.target)
  if (ip !== '') return port === null ? ip : ip + ':' + port
  /* 没有资产 id 时用 target 的 host[:port]（去掉路径与参数，别把整条 URL 当服务名）；
     端口来自库列而 target 里没写时补上，便于一眼看出是哪个服务。 */
  const authority = targetAuthority(hit.target)
  if (authority === null) return hit.target ? String(hit.target) : '(сервис не указан)'
  if (port !== null && !/:\d{1,5}$/.test(authority)) return authority + ':' + port
  return authority
}

/**
 * 得分封顶与去重的**唯一实现**（数据驱动，v0.11.0 起）。
 *
 * 判定字段来自得分点本身（`score_point.rule / cap / dedup_scope`），不再靠代码里的硬编码名单：
 *   · `dedup_scope = service` —— 同一（资产, 端口）只算分值最高的一条；
 *   · `dedup_scope = system`  —— 同一（资产, 端口, 系统名）只算最高权限一条，
 *     用于"同一个系统只计算一次最高权限分"（邮箱/OA/集权系统等）；
 *   · `dedup_scope = target`  —— 整个目标只算一次（突破网络边界、IPv6 加成）；
 *   · `dedup_scope = none`    —— 不去重，按台/卡/节点数累加（算力卡等）。
 * 之后按 `rule` 分组累计，超过该规则 `cap` 的部分标 `capped`（cap = 0 表示不设上限）。
 *
 * `self_created = 1`（自己注册/自建的账号）本来就不计分，既不参与竞争也不占位。
 *
 * @param {Array} rows - 命中行（需带 code / points / asset_id / port / target / recorded_at；
 *                       可选 system_key 供 system 口径使用）
 * @param {Map|Object|null} pointsByCode - code → `{rule, cap, dedup_scope, points}`；
 *                       省略时退化为"每个 code 自成一组、只去重不封顶"（兼容旧调用）
 * @returns {{capped:number, items:Array, caps:Map}} 打过标记的行 + 被封顶条数 + 各规则上限用量
 */
export function applyScoreCaps(rows = [], pointsByCode = null, nameByAsset = null) {
  const metaOf = (r) => {
    const m = pointsByCode === null || pointsByCode === undefined
      ? undefined
      : (typeof pointsByCode.get === 'function' ? pointsByCode.get(r.code) : pointsByCode[r.code])
    const rule = m && m.rule !== null && m.rule !== undefined ? Number(m.rule) : null
    const legacyScope = legacyCapGroup(r.code)
    return {
      group: rule === null ? 'code:' + String(r.code || '') : 'rule:' + rule,
      cap: m && Number(m.cap) > 0 ? Number(m.cap) : 0,
      scope: (m && m.dedup_scope) || legacyScope || 'none',
      rule,
    }
  }
  const flagged = (rows || []).map((r) => {
    const m = metaOf(r)
    return {
      ...r, capped: false, capped_by_id: null, capped_reason_kind: null,
      service_key: null, cap_group: m.group, dedup_scope: m.scope, rule: m.rule, rule_cap: m.cap,
    }
  })

  /* ① 计分口径去重：同一口径键内只保留分值最高的一条（同分取更早记的） */
  const buckets = new Map()
  for (const r of flagged) {
    if (Number(r.self_created) === 1) continue
    const scope = r.dedup_scope
    if (scope === 'none' || scope === null || scope === undefined) continue
    let key
    if (scope === 'target') key = 'target'
    else if (scope === 'system') key = 'sys:' + String(systemKeyOf(r, nameByAsset) || '')
    else {
      /* `service` 口径必须有真正的服务键（`t<host[:port]>` / `a<id>:<port>`）。
         拿不到服务信息时**不参与去重**，而不是退回"每条自成一键" —— 后者会让
         `svc:#hit7` 这种键把同一口径的命中全部互相顶掉：实测 62 条无 target 的
         terminal-access 命中里 61 条被判 dedup 不计分、只留 1 条，等于静默吃掉成果。
         宁可少封顶也不能错封：认不出服务就各算各的。 */
      const svc = scoreServiceKey(r)
      if (svc === null || svc === undefined || String(svc) === '') continue
      key = 'svc:' + String(svc)
    }
    if (key === '' || key === 'svc:null' || key === 'sys:null') continue
    const k = r.cap_group + '|' + key
    if (!buckets.has(k)) buckets.set(k, [])
    buckets.get(k).push(r)
  }
  let capped = 0
  for (const list of buckets.values()) {
    if (list.length < 2) continue
    const best = pickBestHit(list)
    for (const r of list) {
      if (r === best) continue
      r.capped = true
      r.capped_by_id = best.id
      r.capped_by_points = Number(best.points) || 0
      r.capped_by_evidence = best.evidence || null
      r.capped_reason_kind = 'dedup'
      capped += 1
    }
  }

  /* ② 规则上限：同一 rule 的计分命中累计不得超过 cap（按分值从高到低累计，超出的标 capped） */
  const caps = new Map()
  const byRule = new Map()
  for (const r of flagged) {
    if (r.capped === true || Number(r.self_created) === 1) continue
    if (r.rule_cap <= 0) continue
    if (!byRule.has(r.cap_group)) byRule.set(r.cap_group, [])
    byRule.get(r.cap_group).push(r)
  }
  for (const [group, list] of byRule.entries()) {
    const cap = list[0].rule_cap
    const ordered = [...list].sort((a, b) => {
      const pa = Number(a.points) || 0; const pb = Number(b.points) || 0
      if (pb !== pa) return pb - pa
      return Number(a.id) - Number(b.id)
    })
    let used = 0; let nCapped = 0
    for (const r of ordered) {
      const pts = Number(r.points) || 0
      if (used + pts > cap) {
        r.capped = true
        r.capped_reason_kind = 'cap'
        r.capped_by_points = null
        nCapped += 1
        capped += 1
      } else {
        used += pts
      }
    }
    caps.set(group, { rule: list[0].rule, cap, used, capped: nCapped })
  }
  return { capped, items: flagged, caps }
}

/**
 * 参与 `system` 口径去重的"系统键"。
 *
 * 规则原文是"同一个系统只计算一次最高权限分"（邮箱、OA、集权系统等）。
 * 判定顺序：
 *   ① 命中自带的 `system_key`（调用方显式指定，最准）；
 *   ② 资产的 `primary_name`（系统名/域名的首选名）；资产名往往是同一套系统，最接近"同一个系统"；
 *   ③ 退回服务键（资产:端口）。
 * 三条都拿不到返回 null —— 此时**不参与该口径去重**，宁可不封顶也不要错封。
 */
function systemKeyOf(hit = {}, nameByAsset = null) {
  const svc = scoreServiceKey(hit)
  const svcText = svc === null || svc === undefined ? '' : String(svc)

  /* ① 调用方显式给的 system_key：**只有它带上服务键前缀（t<host[:port]> / a<id>:<port>）才采信**。
     调用方（listScorePoints / scoreReport / scoreChain）会预造 `资产名|端口` 这种键，
     资产还没有名字时会退化成 `"|8080"` —— 若直接采信，10.7.7.7:8080 与 10.7.7.8:8080
     会被并成"同一个系统"，把另一台主机的成果白白封顶。
     不能采信时**继续往下走**，用服务键兜底，而不是丢掉整个 system 口径。 */
  const explicit = String(hit.system_key || '').trim()
  if (explicit !== '' && (svcText === '' || explicit.includes(svcText))) {
    /* 没有服务键可校验时，要求"名字段非空"（避免只认端口的野键把所有服务并在一起） */
    const head = explicit.split('|')[0]
    if (svcText !== '' || String(head).trim() !== '') return explicit
  }

  /* ② 资产名（系统名/域名首选名）+ 服务键 —— **这是 system 口径的主力路径**。
     规则原文是"同一个系统只计算一次最高权限分"，覆盖面是"同一系统 + 同一端口"：
     同一套系统跑在多台主机、多个端口时是不同实例，各自算一次最高权限。
     ⚠️ 真的需要"跨主机、跨端口只算一次"时，应显式给 system_key 并用同一个值
     （见上 ①）——但那时请自己确认这些命中确实是同一个系统实例。 */
  const id = hit.asset_id === null || hit.asset_id === undefined || hit.asset_id === '' ? null : Number(hit.asset_id)
  const nameOf = (assetId) => {
    if (assetId === null || nameByAsset === null || nameByAsset === undefined) return null
    const raw = typeof nameByAsset.get === 'function' ? nameByAsset.get(assetId) : nameByAsset[assetId]
    const text = raw === null || raw === undefined ? '' : String(raw).trim()
    return text === '' ? null : text
  }
  const name = nameOf(id)
  if (name !== null) return name + '|' + svcText

  /* ③ 退到服务键：同（资产, 端口）只算一次最高权限 —— 与 service 口径等效，
     这是"同一主机上的系统权限、应用权限、数据库权限按最高权限只得一次分"（G1）的兜底。 */
  if (svcText !== '') return svcText

  /* ④ 三条都拿不到（没有 asset_id、没有系统名、target 也解析不出 host）：
     退回**本条命中自己的 id** —— 即"互不相同"，各算各的。
     宁可少封顶也不能错封：把两条无从区分的命中判成"同一个系统"会白白吃掉用户的成果。
     ⚠️ 这里**不能**用 Math.random()：同一个 hit 在两次调用（面板 / 报告 / 攻击链）里
     会拿到不同的键，计分口径就不稳定了。 */
  return '#hit' + String(hit.id ?? '0')
}

/** 从一组同口径命中里挑"计分的那一条"：分值最高，同分取更早记的（id 小的）。 */
function pickBestHit(list) {
  return list.reduce((a, b) => {
    const pa = Number(a.points) || 0; const pb = Number(b.points) || 0
    if (pb !== pa) return pb > pa ? b : a
    return Number(b.id) < Number(a.id) ? b : a
  }, list[0])
}

/** 旧口径分组（兼容 v0.10 及以前：账号类与数据库类按"同资产同端口"封顶）。 */
function legacyCapGroup(code) {
  const c = String(code || '').trim()
  if (c === 'web-account-user' || c === 'web-account-admin') return 'service'
  return SERVICE_CAPPED_POINT_CODES.includes(c) ? 'service' : null
}


/**
 * 读取得分点元数据（code → `{ rule, cap, dedup_scope, points, enabled, builtin, src }`）。
 * 面板 / 报告 / 攻击链三处共用，避免"同一份规则三处各读一遍、字段各漏一个"。
 * @param db - 靶标库句柄。
 */
function loadScoreMeta(db) {
  return new Map(db.prepare('SELECT code, rule, cap, dedup_scope, points, enabled, builtin, src FROM score_point')
    .all()
    .map((r) => [String(r.code), {
      rule: r.rule === null || r.rule === undefined ? null : Number(r.rule),
      cap: Number(r.cap) || 0,
      dedup_scope: r.dedup_scope || 'service',
      points: Number(r.points) || 0,
      enabled: r.enabled === null || r.enabled === undefined ? 1 : Number(r.enabled),
      builtin: Number(r.builtin) === 1,
      src: r.src === null || r.src === undefined ? null : Number(r.src),
    }]))
}

/**
 * 资产 id → 系统名（primary_name），`system` 口径要用它把"同一套系统"归到一起。
 * @param db - 靶标库句柄。
 */
function loadAssetNames(db) {
  return new Map(db.prepare('SELECT id, primary_name FROM asset').all()
    .filter((a) => a.primary_name).map((a) => [Number(a.id), a.primary_name]))
}

/**
 * 本条命中的**实际分值** = 档位分值 × 倍率。
 *   · 档位分值：命中自带优先（合并版同一条含多档），缺省回落到得分点默认分值；
 *   · 倍率：G5 数据规模翻倍（超 1 亿条 / 10TB，或控制知识库相关系统）×2、
 *     G6 IPv6 成果 ×3。倍率作用在**权限分**上，所以乘在分值里、随上限一起被 cap 约束
 *     （文档要求"上限仍按对应系统类型的原上限计算，不因倍数突破上限"）。
 */
function hitPointsOf(hit = {}, metaByCode = null) {
  let base = 0
  if (hit.points !== null && hit.points !== undefined && hit.points !== '') {
    base = Number(hit.points) || 0
  } else {
    const code = hit.code === null || hit.code === undefined ? null : String(hit.code)
    if (code !== null && metaByCode !== null && metaByCode !== undefined) {
      const meta = typeof metaByCode.get === 'function' ? metaByCode.get(code) : metaByCode[code]
      if (meta !== undefined && meta !== null) base = Number(meta.points) || 0
    }
  }
  const mult = Number(hit.multiplier)
  return Math.round(base * (Number.isFinite(mult) && mult > 0 ? mult : 1))
}

/**
 * 这个 target 的主机部分是 IPv6 字面量吗（http://[2001:db8::1]:8080/x、2001:db8::1、[::1]:22）。
 *
 * 不能用一条粗糙的字符类正则代替：IPv6 里混着十六进制字母（a-f），
 * 写成 /^\[[0-9a-f:]+\]/ 这类"只看冒号和十六进制"的写法会把带字母的地址漏判
 * （实测 2001:db8::1 里的 db8 就被漏掉，G6 的 ×3 完全不生效）。
 * 所以把主机部分交给 isIpv6() 判定 —— 与 cidrOf / scopeOfIp 用同一份实现。
 */
function targetHasIpv6Host(target) {
  const text = String(target || "").trim()
  if (text === "") return false
  const bracket = /^[a-z][a-z0-9+.-]*:\/\/(\[[^\]]+\])/i.exec(text)
  if (bracket !== null) return isIpv6(bracket[1].replace(/^\[|\]$/g, ""))
  const url = /^[a-z][a-z0-9+.-]*:\/\/([^/?#\s]+)/i.exec(text)
  const authority = url !== null ? url[1] : (/^([^\s/?#]+)/.exec(text) || [])[1]
  if (!authority) return false
  /* 裸写 IPv6 想带端口必须加方括号，所以这里去掉方括号后再尝试剥端口 */
  const host = authority.replace(/^\[|\]$/g, "").replace(/:\d{1,5}$/, "")
  return isIpv6(host)
}

/**
 * 把 G5 / G6 的倍率规则算成倍率值（只对权限分生效，且不突破原上限 —— 由 cap 兜住）。
 *   · `ip_version === 6` 或 target 是 IPv6 字面量 → ×3（G6）；
 *   · `data_scale === "large"` → ×2（G5：超 1 亿条 或 10TB）；
 *   · `data_scale === "knowledge-base"` → ×2（G5：控制知识库相关系统）；
 *   · 两者都命中 → 相乘。文档没写禁止叠加，取对演练方有利的解释并**如实标注原因**。
 * @param hit - 命中参数（ip_version / data_scale / target）。
 * @returns `{ multiplier, reasons }`
 */
function scoreMultiplierOf(hit = {}) {
  const reasons = []
  let multiplier = 1
  const target = String(hit.target || "")
  const ipv6 = Number(hit.ip_version) === 6 || targetHasIpv6Host(target)
    /* 裸写 IPv6 兜底的正则必须含 ≥2 个冒号：dc01:389 / ad01:8080 这类内网主机名:端口
       只有一个冒号，旧正则会把它们误判成 IPv6 让成果静默 ×3 */
    || /(^|\/\/)(?:\[[0-9a-f:]+\]|[0-9a-f]*(?::[0-9a-f]*){2,})/i.test(target)
  if (ipv6) { multiplier *= 3; reasons.push("G6 результаты по IPv6 ×3") }
  const scale = String(hit.data_scale || "").trim().toLowerCase()
  if (scale === "large") { multiplier *= 2; reasons.push("G5 объём данных свыше 100 млн записей / 10TB ×2") }
  else if (scale === "knowledge-base" || scale === "kb") { multiplier *= 2; reasons.push("G5 контроль систем, связанных с базой знаний, ×2") }
  return { multiplier, reasons }
}

/**
 * **统一的计分评估**：面板 / 报告 / 攻击链都调这一个函数算出"哪条计分、哪条被封顶"。
 *
 * 输入为一组"命中行"，输出它们的计分标记。调用方只需保证每行带
 * `{ id, code, points, asset_id, port, target, self_created }` 与**本条命中的实际分值**
 * （`points` 字段；不要传得分点默认值 —— 合并版里同一条含多档，传默认值会把哪条计分判反）。
 *
 * @param db - 靶标库句柄。
 * @param rows - 命中行数组。
 * @param options - `{ meta?, names?, enabledOnly? }`：可复用已读好的元数据；`enabledOnly` 为 true
 *                  时"停用得分点"的命中直接标为不计分（报告与面板口径必须一致）。
 * @returns `{ byId, items, caps, meta, names, disabledIds }`
 */
function evaluateScoreBoard(db, rows = [], options = {}) {
  const meta = options.meta || loadScoreMeta(db)
  const names = options.names || loadAssetNames(db)
  const prepared = (rows || []).map((h) => {
    const code = h.code === null || h.code === undefined ? null : String(h.code)
    const m = code === null ? undefined : meta.get(code)
    const nm = h.asset_id === null || h.asset_id === undefined ? null : names.get(Number(h.asset_id))
    return Object.assign({}, h, {
      code,
      /* points 必须是"本条命中的实际分值"（见上方说明） */
      points: hitPointsOf(h, meta),
      rule: m === undefined || m.rule === undefined ? null : m.rule,
      cap: m === undefined ? 0 : m.cap,
      dedup_scope: m === undefined ? 'service' : m.dedup_scope,
      cap_group: m === undefined || m.rule === null || m.rule === undefined ? 'code:' + String(code) : 'rule:' + m.rule,
      rule_cap: m === undefined ? 0 : m.cap,
      system_key: [nm || '', normalizePort(h.port) ?? parseTargetPort(h.target) ?? ''].join('|'),
    })
  })
  const evaluated = applyScoreCaps(prepared, meta, names)
  const byId = new Map(evaluated.items.map((x) => [x.id, x]))
  const disabledIds = new Set()
  if (options.enabledOnly === true) {
    for (const h of prepared) {
      const m = h.code === null ? undefined : meta.get(h.code)
      if (m !== undefined && Number(m.enabled) !== 1) disabledIds.add(h.id)
    }
  }
  return { byId, items: evaluated.items, caps: evaluated.caps, meta, names, disabledIds }
}

/**
 * 这条命中为什么不计分（告警 / 界面 / 报告共用一句话，避免三处口径写歪）。
 * @param hit - 命中行（带 code / target / port / rule / rule_cap / capped_reason_kind）
 * @param bestPoints - 去重时被哪条压住（该条的分值）
 */
export function scoreCapReasonText(hit = {}, bestPoints) {
  const label = serviceLabel(hit)
  if (hit.capped_reason_kind === 'cap') {
    return '«' + label + '» — за это очки не начисляются:'
      + (hit.rule === null || hit.rule === undefined ? '' : 'Правило ' + hit.rule + ' ')
      + '** — суммарный балл достиг лимита по этому правилу (' + (Number(hit.rule_cap) || 0) + ' балла)** — часть сверх лимита по тому же правилу больше не суммируется.'
      + 'Переключите усилия на другие правила или другие активы — не продолжайте накручивать по правилу, где лимит уже достигнут.'
  }
  return '«' + label + '» — доступ на этой цели уже получен полностью (методика подсчёта: по одной цели учитывается только строка с наибольшим числом баллов'
    + (bestPoints === undefined || bestPoints === null ? '' : ', +' + bestPoints + ' балл')
    + ') — по правилам за это больше не начисляются очки, остаётся только след процесса; **смените цель или правило и двигайтесь дальше, не накручивайте однотипные результаты на одной и той же цели**.'
}

/** 兼容旧名（v0.10 及以前叫 serviceCapReason）。 */
export const serviceCapReason = scoreCapReasonText


/**
 * 数据规模的**粗判门槛**：100 万条/行。
 * 用途已经从「大量敏感信息得分项」改成 G5 翻倍的量级自检 —— 见 addScoreHit 里的警告。
 * 文档里 G5 的正式门槛是「超 1 亿条 或 10TB」；这里用更低的一档做"有没有写量级"的粗筛，
 * 低于它会提示核对，但不阻断记分。
 */
export const SENSITIVE_DATA_MIN_ROWS = 1000000

/**
 * 从证据文本里解析数据量（行/条/记录数）。
 * 支持「120 万条」「1300万行」「1,200,000 条记录」「2.5万行」「1200000 records」。
 * **只认带量词（条/行/记录/records/rows）或中文量级（亿/万…）的写法**——
 * 裸数字不认，否则会把口令里的 `123456`、端口号当成数据量。
 * 解析不出来返回 null（由调用方提示补齐量级，不猜、不编数）。
 */
export function parseRowCount(evidence) {
  const text = String(evidence || '')
  if (text.trim() === '') return null
  const units = { 亿: 1e8, 千万: 1e7, 百万: 1e6, 十万: 1e5, 万: 1e4, 千: 1e3 }
  const nums = []
  /* 「数字 + 单位 + 条/行/记录」：单位是中文量词，或英文 records/rows/entries */
  const cn = /(\d[\d,]*(?:\.\d+)?)\s*(亿|千万|百万|十万|万|千)?\s*(条|行|记录|数据|records?|rows?|entries)/gi
  for (const m of text.matchAll(cn)) {
    const base = Number(String(m[1]).replace(/,/g, ''))
    if (!Number.isFinite(base)) continue
    const mult = m[2] === undefined ? 1 : units[m[2]]
    nums.push(Math.round(base * mult))
  }
  if (nums.length > 0) return Math.max(...nums)
  /* 只写了「导出 120 万」这类（没写条/行）也认，但必须带中文量级 */
  for (const m of text.matchAll(/(\d[\d,]*(?:\.\d+)?)\s*(亿|千万|百万|十万|万|千)/g)) {
    const base = Number(String(m[1]).replace(/,/g, ''))
    if (Number.isFinite(base)) nums.push(Math.round(base * units[m[2]]))
  }
  return nums.length === 0 ? null : Math.max(...nums)
}

/** 千分位展示，告警里读数更直观。 */
export function formatRows(n) {
  return Number(n).toLocaleString('en-US')
}


/* ------------------------------------------------------------------ 默认得分点 */

/**
 * 得分点 → 交付口径（怎么算拿到、拿什么自证、怎么复现）。
 *
 * 为什么单独一张表而不是塞进 `score_point.description`：
 * 描述是"规则文档的条款"（给智能体判档位用），这张表是"给验收人看的复现口径"，
 * 两者受众不同、详略也不同。报告与界面按 code 取这里的说明，
 * 规则文档更新时不必动这张表，反之亦然。
 *
 * 字段：
 *   · need   —— 判定标准：满足什么才算拿到这一项（给验收人对账用）
 *   · proof  —— 自证材料：该附什么证据（G7 的证明材料要求）
 *   · replay —— 复现入口：用哪条请求 / 哪条命令重放（"可复现"最直接的答案）
 *   · script —— 一线可直接照做的动作（尽量是可复制执行的）
 */
export const SCORE_CONFIRM = {
  'domain-control': {
    need: 'DNS-записи домена цели переведены под наш контроль (NS/A-записи вступили в силу), или доступна панель управления доменом',
    proof: 'скриншот панели управления + сравнение dig/nslookup до и после изменения записей',
    replay: 'nslookup <домен> <наш NS>; или исходный запрос операции из панели',
    script: 'dig NS <домен> @8.8.8.8\ndig <домен> @<нашNS>',
  },
  'terminal-access': {
    need: 'возможность отдать команду на терминал и получить результат выполнения (а не «обнаружено устройство»)',
    proof: 'вывод id/hostname с подконтрольного терминала + доказательство связи с организацией-целью (G7)',
    replay: 'выполнение id в сессии удалённого управления; или запись регистрации агента трояна/удалённого управления',
    script: 'id; whoami; hostname',
  },
  'server-host': {
    need: 'на хосте выполнена команда и получен вывод (WebShell / reverse shell / удалённое управление — любое)',
    proof: 'вывод команды (id / hostname) + параметры подключения WebShell или запись сессии',
    replay: 'исходный запрос WebShell (можно воспроизвести напрямую); или запись прослушивания reverse shell',
    script: 'id; uname -a; cat /etc/passwd | head',
  },
  'db-credential': {
    need: 'удалось подключиться к БД по учётной записи и выполнить запрос (неавторизованный доступ тоже считается: достаточно подключения)',
    proof: 'вывод запроса после успешного входа (select user(), version()) + уровень прав учётной записи',
    replay: 'mysql -h <host> -P <port> -u <user> -p\'<pass>\' -e "select user(),version()"',
    script: 'mysql -h <host> -u <user> -p -e "select user(),version(),current_user()"',
  },
  'web-app': {
    need: 'вход в систему под существующей учётной записью цели (обычной или административной) и доступ к защищённой странице',
    proof: 'содержимое страницы/вывод после входа + сессионный Cookie или Token (доказательство, что получен не только пароль)',
    replay: 'исходный запрос входа (с Cookie/Token-свидетелем) + один запрос защищённой страницы с сессией',
    script: 'curl -i -s -X POST <URL входа> -d "username=<u>&password=<p>" -c cookie.txt\ncurl -s -b cookie.txt <защищённая страница>',
  },
  'central-system': {
    need: 'вход в централизованные системы (bastion-хост/контроллер домена/SSO/панель управления терминалами) и получение административных прав',
    proof: 'скриншот страницы панели управления + операция, показывающая возможность управлять подчинёнными узлами (вход на 20% управляемых узлов или на 20 машин)',
    replay: 'исходный запрос входа + запрос и ответ одной операции управления (например, перечисление управляемых хостов)',
    script: 'curl -s -b cookie.txt "<интерфейс списка управления>"',
  },
  'bigdata-system': {
    need: 'получены административные или обычные права на платформе больших данных (Hadoop/Spark/ES и т. п.)',
    proof: 'вывод страницы управления/интерфейса платформы + объём доступных данных (число записей или ёмкость)',
    replay: 'исходный запрос к интерфейсу платформы (например, ES _cat/indices, YARN /ws/v1/cluster/apps)',
    script: 'curl -s "<интерфейс платформы>" | head -50',
  },
  netdev: {
    need: 'вход на сетевое устройство (межсетевой экран/маршрутизатор/коммутатор/VPN/шлюз безопасности) и получение прав',
    proof: 'скриншот страницы управления устройством + скриншот таблицы маршрутизации или числа соединений (требование G7)',
    replay: 'исходный запрос входа на устройство + вывод команды чтения таблицы маршрутизации',
    script: 'show ip route    # или display ip routing-table',
  },
  'netdev-redirect': {
    need: 'с помощью этого устройства реально изменено направление трафика (изменение политики/маршрута/DNS вступило в силу)',
    proof: 'сравнение таблицы маршрутизации или политик до и после изменения + доказательство получения трафика на нашем узле',
    replay: 'исходный запрос настройки политики + дамп трафика/журнал доступа на нашем подконтрольном узле',
    script: 'tcpdump -ni any port <порт> -c 10',
  },
  'netdev-implant': {
    need: 'на устройстве внедрено работоспособное удалённое управление/механизм закрепления, **и** с его помощью выполнена дальнейшая атака',
    proof: 'доказательства процесса удалённого управления или элемента закрепления + записи последующих результатов, инициированных через это устройство',
    replay: 'исходный запрос/команда внедрения + последующий журнал доступа через это устройство',
    script: '',
  },
  iiot: {
    need: 'получены административные права в системе промышленного интернета, или массово контролируются подключённые к ней устройства',
    proof: 'скриншот панели управления + перечень и количество подконтрольных устройств',
    replay: 'исходный запрос входа + ответ интерфейса списка устройств',
    script: '',
  },
  'cloud-platform': {
    need: 'административные права на платформе управления облаком; или массовое управление облачными узлами через ak/sk (баллы за узлы начисляются при ≥100)',
    proof: 'скриншот страницы управления платформой; в сценарии с ak/sk нужен перечень и количество подконтрольных узлов либо доказательство административных прав (создание узла/изменение прав)',
    replay: 'исходный запрос к интерфейсу платформы (перечисление экземпляров, создание пользователя и т. п.)',
    script: 'curl -s -H "Authorization: Bearer <token>" "<интерфейс списка платформы/экземпляров>"',
  },
  'iot-platform': {
    need: 'получены права на платформе управления IoT, или массово контролируются устройства через её точки подключения',
    proof: 'скриншот страницы управления платформой + количество точек подключения/устройств',
    replay: 'исходные запросы входа на платформу и интерфейса списка устройств',
    script: '',
  },
  'iot-corenet': {
    need: 'с IoT-устройства выполнен lateral movement в опорную сеть и получен контроль над важными системами, включая производственные',
    proof: 'описание пути (какая конечная точка → опорная сеть → какая система) + доказательство контроля над этой системой',
    replay: 'команды lateral movement, инициированные с конечной точки + запросы входа/операций в системе опорной сети',
    script: '',
  },
  secdev: {
    need: 'получены административные права на нецентрализованном средстве защиты (IPS/IDS/аудит/WAF)',
    proof: 'скриншот страницы управления устройством + операция, показывающая управляемость политик',
    replay: 'исходный запрос входа + ответ интерфейса чтения одной политики',
    script: '',
  },
  'file-storage': {
    need: 'получены права администратора файлового хранилища (FTP/NAS/сетевое хранилище/объектное хранилище) или его обычная учётная запись',
    proof: 'скриншот листинга каталога + перечень доступных для чтения файлов (результаты по данным оцениваются отдельно, см. G2)',
    replay: 'исходный запрос листинга каталога (FTP LIST / S3 ListObjects / WebDAV PROPFIND)',
    script: 'curl -s "<интерфейс хранилища>" | head -50',
  },
  'ai-agent': {
    need: 'контроль агентных инструментов вроде модели-агента/skill и **фактическое управление его действиями**',
    proof: 'запись диалога или вызовов + выполненные под управлением действия и их результаты (диапазон баллов определяется по глубине контроля)',
    replay: 'исходный запрос, управляющий agent, + вывод выполненных им действий',
    script: '',
  },
  'model-compute': {
    need: 'получены административные права на платформе управления вычислительными ресурсами/в системах обучающих данных и базы знаний',
    proof: 'скриншот панели управления + операция, показывающая планирование вычислений или чтение/запись данных',
    replay: 'исходные запросы входа на платформу и интерфейсов планирования/данных',
    script: '',
  },
  'model-data': {
    need: 'получены административные права в системе данных, связанной с моделями (влияние на обучение/инференс/эксплуатацию либо кража и подмена весов)',
    proof: 'скриншот панели управления + перечень моделей/наборов данных с доступом на чтение и запись',
    replay: 'исходные запросы интерфейса платформы (перечисление моделей, скачивание весов)',
    script: '',
  },
  'computepower-admin': {
    need: 'получены административные права на вычислительной инфраструктуре',
    proof: 'скриншот панели управления + доказательство доступности ресурсов для планирования',
    replay: 'исходные запросы входа на платформу и интерфейса списка ресурсов',
    script: '',
  },
  'computepower-cards': {
    need: 'фактически получены ресурсы вычислительных карт (10 баллов/карта) или контроль над платформой пула карт',
    proof: 'перечень карт (количество) + доказательство возможности отправлять задачи или занять карту монопольно',
    replay: 'вывод nvidia-smi / интерфейс списка карт платформы',
    script: 'nvidia-smi -L',
  },
  'boundary-logical': {
    need: 'со стороны цели установлен канал во внутреннюю сеть и есть **реальный доступ к целям внутренней сети**',
    proof: 'регистрация туннеля (точка входа обязательно на стороне цели) + вывод/скриншот доступа к цели внутренней сети через туннель (G7)',
    replay: 'команда доступа к цели внутренней сети через туннель и её вывод; команда построения туннеля',
    script: 'curl --socks5-hostname 127.0.0.1:<порт> http://<IP внутренней сети>/ -i',
  },
  'boundary-strong': {
    need: 'преодолено сильное изолирование типа шлюза, осуществлён вход в изолированную производственную внутреннюю сеть и есть реальный доступ к цели',
    proof: 'скриншот контроля устройства изолирования типа шлюза + скриншот, доказывающий доступ во внутреннюю сеть (G7)',
    replay: 'команда доступа к цели внутренней сети через канал сильного изолирования и её вывод',
    script: '',
  },
  'boundary-physical': {
    need: 'преодолено физическое изолирование/осуществлён вход в опорную производственную сеть и есть реальный доступ к цели',
    proof: 'скриншот контроля межсетевого экрана/VPN/хоста с несколькими сетевыми картами/шлюза + скриншот доступа во внутреннюю сеть (G7)',
    replay: 'команда доступа к цели после входа в опорную сеть и её вывод',
    script: '',
  },
  'boundary-supply': {
    need: 'вход во внутреннюю сеть основной обороняемой организации через канал сопровождения цепочки поставок или облачный сервис (баллы начисляются по ситуации)',
    proof: 'доказательства контроля на стороне цепочки поставок/облака + подтверждение входа во внутреннюю сеть основной обороняемой организации; укажите, какой это случай',
    replay: 'команда входа во внутреннюю сеть через канал цепочки поставок и её вывод',
    script: '',
  },
}

/** 取某个得分点的交付口径；没有专门条目时返回 null（报告会退回只显示 evidence）。 */
export function scoreConfirmOf(code) {
  const key = String(code || '').trim()
  return SCORE_CONFIRM[key] === undefined ? null : SCORE_CONFIRM[key]
}

export const DEDUP_SCOPES = ['service', 'system', 'target', 'none']

/**
 * 一条得分点的完整定义（工厂函数，避免 22 个对象重复字段）。
 *
 * 两个编号各司其职，**不要混用**：
 *   · `src`  —— 《突破入侵类得分规则（合并版）》里的"原序号"（合并行写首个原序号），
 *               只用于与原表逐条对账，出现在文档与代码注释里；
 *   · `rule` —— 本实现内部的**上限分组键**（`applyScoreCaps` 按它累计 cap）。
 *               它必须**唯一**：历史上曾直接用原序号当分组键，导致 16/17 合并行与
 *               19 的两个子项共用同一个键 —— 一条命中会把另一条的上限吃掉，
 *               而且 `rule` 编号出现重复（两个 19）与空号（6/17/20/21），
 *               模型读到"规则 19 已达上限"时分不清是哪一条。
 *               现在统一为 1..N 连续唯一，与数组顺序一一对应。
 */
const sp = (src, rule, tier, code, name, category, points, cap, dedup_scope, description) => ({
  src, rule, tier, code, name, category, points, cap, dedup_scope, description,
})

/* ── 通用规则（G1–G8，横切全部条目；不单独计分，写进说明与提示词）────────────
   G1 权限取高只计一次 ｜ G2 数据成果另行计分 ｜ G3 上限针对单个防守单位 ｜
   G4 设备按台（个）计分 ｜ G5 数据规模翻倍 ｜ G6 IPv6 ×3（不突破原上限）｜
   G7 证明材料要求 ｜ G8 兜底：其他系统由专项组研判后给分。
   完整原文见 docs/得分规则-合并版.md。 */
export const SCORE_GENERAL_RULES = [
  { code: 'G1', name: 'из прав берётся высшее, начисление однократное', detail: 'при получении нескольких видов прав на одной системе, одном хосте или одной базе данных баллы начисляются один раз по высшему праву (если получены и административные, и обычные права, начисляются только за административные).' },
  { code: 'G2', name: 'результаты по данным учитываются отдельно', detail: 'результаты по почтовым данным, бизнес-данным, активам данных и т. п. начисляются отдельно по важности данных и не смешиваются с баллами за права доступа.' },
  { code: 'G3', name: 'правила лимитов', detail: 'лимит по каждому пункту действует на одну обороняемую организацию и все её подразделения; после достижения лимита начисление не продолжается.' },
  { code: 'G4', name: 'устройства/терминалы считаются поштучно', detail: 'принтеры, wifi-роутеры — 5 баллов/шт.; PC, Pad, телефоны, камеры, электронные экраны — 10 баллов/шт.; облачные хосты, контейнеры, управляемые подключённые устройства, точки подключения IoT и т. п. — 10 баллов/шт. Массовый контроль пересчитывается по «подконтрольным узлам».' },
  { code: 'G5', name: 'удвоение за объём данных', detail: 'баллы удваиваются для систем с большим объёмом данных (важных данных свыше 100 млн записей или 10TB); удваиваются и баллы за контроль систем, связанных с базой знаний. Обычные журналы, генерируемые системой, не учитываются.' },
  { code: 'G6', name: 'множитель IPv6', detail: 'баллы за результаты, полученные через IPv6, ×3, но лимит по-прежнему считается по исходному лимиту соответствующего типа системы и множитель его не превышает.' },
  { code: 'G7', name: 'подтверждающие материалы', detail: 'при преодолении сетевой границы нужны скриншот контроля устройства изолирования, скриншот-подтверждение доступа во внутреннюю сеть и т. п.; для подконтрольных телефонов, Pad и других терминалов требуется доказательство связи с организацией-целью; для прав на сетевом устройстве — доказательства вроде таблицы маршрутизации или скриншот числа соединений.' },
  { code: 'G8', name: 'резервное положение', detail: 'для прав на прочих системах, серверах и устройствах баллы заранее не заданы — их определяет профильная группа по результатам оценки.' },
]

/**
 * 默认得分点 —— **严格对齐《突破入侵类得分规则（合并版）》，共 25 项**
 * （一、获取权限 21 条 + 二、突破网络边界 4 条，共 8 个类别；其中"同一行的不同计费单位"拆为独立得分点，如算力基础设施的管理员权限与算力卡）。
 *
 * 与上一版的区别：不再按"同一规则内的权限档位"拆条 —— 一条 = 合并版里的一行
 * （`tier` 字段写清该条的档位/子项），只有**计费单位不同**的多档才保留子项
 * （如算力基础设施的"管理员权限"与"算力卡 10 分/卡"）。
 *
 * 字段含义：
 *   · src    合并版里的"原序号"（用于与原表逐条对账）；
 *   · group  界面分组：GENERAL = 控制一般系统，WEB = 控制 Web 应用系统，
 *            CENTRAL = 控制集权系统，BIGDATA = 控制大数据系统，
 *            NETINFRA = 控制网络基础设施，STORAGE = 文件存储类系统，
 *            MODEL = 控制模型相关系统，BOUNDARY = 突破网络边界；
 *   · points 单次分值（一条内多档时取该条的主档，说明里写清各档）；
 *   · cap    该条上限（0 = 不设上限）；dedup_scope 计分口径。
 */
export const SCORE_GROUPS = [
  { code: 'GENERAL', name: 'контроль обычной системы' },
  { code: 'WEB', name: 'контроль веб-приложения' },
  { code: 'CENTRAL', name: 'контроль централизованной системы' },
  { code: 'BIGDATA', name: 'контроль системы больших данных' },
  { code: 'NETINFRA', name: 'контроль сетевой инфраструктуры' },
  { code: 'STORAGE', name: 'система файлового хранения' },
  { code: 'MODEL', name: 'контроль системы, связанной с моделями' },
  { code: 'BOUNDARY', name: 'преодоление сетевой границы' },
]

export const DEFAULT_SCORE_POINTS = [
  /* ══ 一、获取权限（18 条）══════════════════════════════════════════════ */

  /* 1 域名控制权限 */
  sp(1, 1, 'первый уровень 50 / второй уровень 20 баллов/шт.', 'domain-control', 'права контроля домена', 'GENERAL', 50, 400, 'system',
    '**домен первого уровня 50 баллов/шт., домен второго уровня 20 баллов/шт.**, баллы начисляются по типу домена; лимит пункта 400 баллов (G3).\n'
    + 'при начислении укажите в evidence домен и его тип; при получении домена второго уровня скорректируйте разовый балл на 20.'),

  /* 2 终端权限 */
  sp(2, 2, '5 / 10 баллов/шт.', 'terminal-access', 'права на терминалах (телефоны, Pad, PC, принтеры, камеры, wifi-роутеры и т. п.)', 'GENERAL', 10, 600, 'system',
    '**принтеры, wifi-роутеры — 5 баллов/шт.; PC, Pad, телефоны, камеры, электронные экраны — 10 баллов/шт.** (G4), суммируется поштучно; лимит пункта 600 баллов (G3).\n'
    + 'для подконтрольных терминалов нужно доказательство связи с организацией-целью (G7); при получении устройства категории 5 баллов скорректируйте разовый балл на 5.\n'
    + 'терминалы, полученные фишингом, также считаются по этому пункту; в evidence укажите роль сотрудника-цели (обычный офисный сотрудник / IT-эксплуатация / бизнес-операции).'),

  /* 3 服务器主机权限 */
  sp(3, 3, 'обычные 10 / административные 50 баллов/шт.', 'server-host', 'права на серверном хосте (включая права webshell)', 'GENERAL', 50, 600, 'system',
    '**обычные права 10 баллов/шт., административные права 50 баллов/шт.**; лимит пункта 600 баллов (G3).\n'
    + 'на одном хосте баллы начисляются один раз по высшему праву (G1) — после получения root/SYSTEM обычные права на том же хосте больше не суммируются.\n'
    + 'за один серверный хост баллы не снимаются; при получении обычных прав скорректируйте разовый балл на 10.'),

  /* 4 数据库连接账号密码 */
  sp(4, 4, 'обычные 10 / административные 50 / неавторизованный доступ 10 баллов/шт.', 'db-credential', 'учётные данные для подключения к БД (включая SQL-инъекцию)', 'GENERAL', 50, 400, 'system',
    '**права обычного пользователя 10 баллов/шт., административные права 50 баллов/шт.; результаты по redis и другим пустым паролям и неавторизованному доступу — единообразно 10 баллов/шт.**; лимит пункта 400 баллов (G3).\n'
    + 'равнозначные права на одной базе данных (включая административные) дают баллы только один раз; системные права, права приложения и права на БД на одном хосте дают баллы только один раз по высшему праву (G1).\n'
    + 'результаты по данным учитываются отдельно (G2); при получении обычных прав/неавторизованного доступа скорректируйте разовый балл на 10.'),

  /* 5、6 邮箱与业务生产系统（原表两项共用规则与上限） */
  sp(5, 5, 'административные 100 / обычные 50 баллов/шт.', 'web-app', 'права на почтовой системе / системе офисной автоматизации и производственных бизнес-системах / прочих веб-приложениях', 'WEB', 100, 2000, 'system',
    '**административные права 100 баллов/шт., права обычного пользователя 50 баллов/шт.; по одной системе баллы за высшее право начисляются только один раз** (G1); лимит пункта 2000 баллов (G3).\n'
    + 'этот пункт объединяет пункты 5 и 6 исходной таблицы (правила и лимиты полностью совпадают), **то есть категорию «контроль веб-приложения»**; при начислении укажите в evidence, к какому типу относится система:\n'
    + '· **почтовая система**;\n'
    + '· **системы офисной автоматизации и производственные бизнес-системы** (офисная OA, ERP, системы прямых донесений и мгновенных сообщений, финансовые системы, производственные бизнес-системы, хранилища данных и другие системы, захват или простой которых влияет на отраслевое или корпоративное производство, управление эксплуатацией и повседневную офисную работу);\n'
    + '· **прочие веб-приложения (резервная категория)** — сайты HTTP/HTTPS, на которых **фактически проверен вход** под учётной записью из списка учётных данных,'
    + 'если они не относятся к другой, более конкретной категории пунктов начисления (централизованные системы — пункт 7, системы больших данных — пункт 8, платформа управления облаком — пункт 11, платформа управления IoT — пункт 12, средства защиты — пункт 13 и т. д.),'
    + 'учитываются единообразно по этому пункту (административные 100 / обычные 50). **Сюда же относятся веб-входы, где в учётных данных указан только `host:port` без названия системы или бизнес-принадлежности (админки, панели управления, операционные платформы, собственные бизнес-системы и т. п.)** —'
    + 'сначала проверьте, нет ли более подходящей категории; если нет — относите к «контролю веб-приложения» и не пропускайте запись только потому, что «не видно, почта это или OA».'
    + 'при начислении в `target` указывайте фактический URL входа (с портом), в evidence — «какой сайт + какая учётная запись + административный/обычный уровень», и по красной линии 1 сначала проверьте вход на практике.\n'
    + 'почтовые данные дополнительно учитываются отдельно по важности (G2); при получении прав обычного пользователя скорректируйте разовый балл на 50.'),

  /* 7 集权系统 */
  sp(7, 6, 'административные 500 / обычные 50 баллов/шт.', 'central-system', 'права на централизованных системах (эксплуатация / идентификация / сеть / панели управления терминалами)', 'CENTRAL', 500, 4000, 'system',
    '**права системного администратора 500 баллов/шт., обычные права 50 баллов/шт.**; за одни и те же права баллы даются один раз, то есть при получении и административных, и обычных прав начисляются только административные (G1); лимит пункта 4000 баллов (G3).\n'
    + 'централизованные системы делятся на четыре типа:\n'
    + '· **эксплуатационные централизованные**: bastion-хосты, централизованный мониторинг, единая публикация ресурсов и т. п.;\n'
    + '· **управление идентификацией и правами**: SSO, 4A, IAM и т. п.;\n'
    + '· **сетевые централизованные**: контроллер домена, сертификационная аутентификация, единый контроллер SDWAN и т. п.;\n'
    + '· **панели управления терминалами и хостами**: панели ПО управления терминалами, центры управления zero trust и т. п.\n'
    + '⚠️ Для устройств, **которыми управляет централизованная система** (хосты, терминалы и т. п.), применяется межкатегорийный балл «контроля обычной системы» (например, PC, мобильный терминал — 10 баллов/шт., G4) —'
    + '**не считайте по максимальной ставке централизованной системы 500 баллов**, это сильно завышает; для массового контроля нужны доказательства: достаточно войти как минимум на 20% управляемых узлов, но не более чем на 20 машин.'),

  /* 8 大数据系统 */
  sp(8, 7, 'административные 1000 / обычные 100 баллов/шт.', 'bigdata-system', 'права на системах больших данных', 'BIGDATA', 1000, 4000, 'system',
    '**административные права 1000 баллов, обычные права 100 баллов/шт.**; за одни и те же права баллы даются один раз, при получении и административных, и обычных прав начисляются только административные (G1); лимит пункта 4000 баллов (G3).\n'
    + 'данные учитываются отдельно (G2); **при объёме действующих данных менее 500 млн записей или 1TB система считается обычной базой данных** (то есть применяются баллы пункта 4).'),

  /* 9 网络设备权限 */
  sp(9, 8, 'обычные 100 / административные 200 / надбавка 200–1000 баллов', 'netdev', 'права на сетевых устройствах (межсетевые экраны, маршрутизаторы, коммутаторы, шлюзы-диоды, оптические диоды, машины переброса данных, VPN и т. п.)', 'NETINFRA', 200, 2000, 'service',
    '**права обычного пользователя 100 баллов, административные права 200 баллов**; лимит пункта 2000 баллов (G3). Нужны доказательства вроде таблицы маршрутизации или скриншот числа соединений (G7).\n'
    + 'за выполнение на одном и том же устройстве перечисленных ниже действий **начисляется дополнительно** (баллы по достигнутому уровню):\n'
    + '· **перенаправление трафика или перехват бизнес-операций** с помощью этого устройства: +200 баллов;\n'
    + '· **внедрение программы удалённого управления на это устройство с успешной последующей атакой**: 1000 баллов.\n'
    + 'при получении обычных прав или надбавки скорректируйте разовый балл по фактическому уровню.'),

  /* 10 工业互联网系统 */
  sp(10, 9, 'административные 200 / устройства 10 баллов/шт.', 'iiot', 'права на системах промышленного интернета', 'NETINFRA', 200, 2000, 'system',
    '**административные права на панели управления 200 баллов; управляемые подключённые устройства 10 баллов/шт.** (G4); лимит пункта 2000 баллов (G3).\n'
    + 'включает подключённые автомобили, умное производство, удалённую диагностику, интеллектуальный транспорт и т. п. При поштучном суммировании устройств используйте отдельную запись попадания (балл 10).'),

  /* 11 云管理平台 */
  sp(11, 10, 'административные 500 / узлы 10 баллов/шт.', 'cloud-platform', 'контроль платформы управления облаком (включая PaaS-платформы, например K8S, Red Hat OpenShift и т. п.)', 'NETINFRA', 500, 2000, 'system',
    '**административные права 500 баллов; облачные хосты и контейнеры 10 баллов/шт.** (G4); лимит пункта 2000 баллов (G3). Облачные бизнес-системы учитываются отдельно по правилам для важных систем.\n'
    + 'при массовом контроле через ak/sk по умолчанию **начисляются только баллы за подконтрольные узлы, без баллов за административные права**, если не предоставлено доказательство административных прав (например, создание облачного узла, управление правами пользователей).\n'
    + '⚠️ **при числе узлов менее 100 баллы начисляются как за обычное веб-приложение, за узлы баллы не даются** (то есть по правилам пунктов 5 и 6).'),

  /* 12 物联网设备管控平台 */
  sp(12, 11, 'платформа 200 / точки подключения 10 / опорная сеть +5000 баллов', 'iot-platform', 'права на платформе управления устройствами IoT', 'NETINFRA', 200, 2000, 'system',
    '**платформа IoT с функциями управления 200 баллов; по числу точек подключения на платформе 10 баллов/шт.** (G4); лимит пункта 2000 баллов (G3).\n'
    + '**за вход в опорную сеть через конечное устройство IoT и контроль важных систем, включая производственные бизнес-системы, начисляется отдельно +5000 баллов** (не ограничивается лимитом 2000 баллов по этому пункту, оформляется отдельной записью попадания).'),

  /* 13 安全设备 */
  sp(13, 12, 'административные 200 баллов', 'secdev', 'права на средствах защиты (IPS, IDS, средства аудита, WAF и другие нецентрализованные средства защиты)', 'NETINFRA', 200, 1000, 'service',
    '**административные права 200 баллов**; лимит пункта 1000 баллов (G3). Только нецентрализованные средства защиты (централизованные — пункт 7).'),

  /* 14 文件存储类系统 */
  sp(14, 13, 'административные 50 / обычные 10 баллов/шт.', 'file-storage', 'права на системах файлового хранения (FTP, объектное хранилище, корпоративный NAS, корпоративное сетевое хранилище и т. п.)', 'STORAGE', 50, 500, 'system',
    '**административные права 50 баллов/шт.; права обычного пользователя, пустые системы или системы только с тестовыми данными 10 баллов/шт.**; лимит пункта 500 баллов (G3).\n'
    + 'включает FTP, объектное хранилище (считается по системе), корпоративный NAS, корпоративное сетевое хранилище и т. п.; данные учитываются отдельно (G2). При получении обычных прав скорректируйте разовый балл на 10.'),

  /* 15 模型智能体 / agent 工具 */
  sp(15, 14, '100–500 баллов/шт.', 'ai-agent', 'агентные инструменты вроде модели-агента, skill (с возможностью управлять agent при атаке)', 'MODEL', 100, 4000, 'service',
    '**100–500 баллов/шт.**, диапазон баллов, определяется по глубине контроля и управления; лимит пункта 4000 баллов (G3).\n'
    + 'включает агентные инструменты вроде модели-агента, skill; при начислении укажите в evidence глубину контроля/управления и скорректируйте разовый балл по определённому уровню.'),

  /* 16、17 算力管理平台 + 训练数据/知识库系统（原表两项规则逐字相同） */
  sp(16, 15, 'права системного администратора 500 баллов/шт.', 'model-compute', 'права на платформе управления вычислительными ресурсами / права на системах обучающих данных и базы знаний', 'MODEL', 500, 4000, 'system',
    '**за получение прав системного администратора 500 баллов/шт.**; лимит пункта 4000 баллов (G3).\n'
    + 'этот пункт объединяет пункты 16 и 17 исходной таблицы (правила дословно совпадают); при начислении укажите в evidence, к какому типу относится система:\n'
    + '· **платформа управления вычислительными ресурсами** (управление и планирование вычислительных ресурсов и т. п.);\n'
    + '· **системы обучающих данных, базы знаний и подобные** (кража и подмена обучающих данных или базы знаний, отравление данных и т. п.).\n'
    + 'для систем с большим объёмом данных (свыше 100 млн записей или 10TB) **баллы удваиваются**, за контроль систем, связанных с базой знаний, **баллы также удваиваются** (G5).'),

  /* 18 模型相关数据系统 */
  sp(18, 16, 'права системного администратора 500 баллов/шт.', 'model-data', 'права на системах данных, связанных с моделями', 'MODEL', 500, 4000, 'system',
    '**за получение прав системного администратора 500 баллов/шт.**; лимит пункта 4000 баллов (G3).\n'
    + 'позволяет вмешиваться в обучение моделей, инференс и сервисы эксплуатации, похищать и подменять файлы весов моделей и т. п.\n'
    + '⚠️ Разница с пунктами 16 и 17 **не сглаживается**: в этом пункте **нет «удвоения баллов за контроль систем, связанных с базой знаний»**, но есть «оценка результатов по активам данных по правилам данных» (G2);'
    + 'для систем со сверхбольшим объёмом данных (свыше 100 млн записей или свыше 10TB) баллы удваиваются (G5).'),

  /* 19 算力基础设施（权限与算力卡两种计费单位，保留两条） */
  sp(19, 17, 'административные 500 баллов/шт.', 'computepower-admin', 'вычислительная инфраструктура · административные права', 'MODEL', 500, 2000, 'system',
    '**административные права 500 баллов/шт.**; лимит пункта 2000 баллов (включая баллы за путь, G3).\n'
    + 'этот пункт вместе с «вычислительная инфраструктура · ресурсы вычислительных карт» входит в пункт 19 и делит лимит 2000 баллов; три позиции (административные права / большой объём ресурсов карт / платформа пула карт) могут давать баллы по отдельности, но ограничены общим лимитом этого пункта.'),
  sp(19, 18, '10 баллов/карта', 'computepower-cards', 'вычислительная инфраструктура · ресурсы вычислительных карт / платформа пула вычислительных карт', 'MODEL', 10, 2000, 'none',
    '**10 баллов/карта**, суммируется по картам (G4); баллы за получение большого объёма ресурсов карт и баллы за получение платформы пула карт имеют лимит по 2000 баллов каждый и делят с «административными правами» общий лимит пункта 19 в 2000 баллов.\n'
    + 'при начислении укажите в evidence число карт или название платформы.'),

  /* ══ 二、突破网络边界（4 项，整个目标单位同一类边界只给一次分）══════════ */

  sp(22, 19, '1000 баллов', 'boundary-logical', 'вход в логически изолированную производственную внутреннюю сеть', 'BOUNDARY', 1000, 0, 'target',
    '**1000 баллов**. Область применения: на всю организацию-цель за преодоление одного и того же типа сетевой границы баллы даются только один раз.\n'
    + 'подтверждающие материалы (G7): скриншот контроля устройства изолирования типа межсетевого экрана, скриншот-подтверждение доступа во внутреннюю сеть и т. п.'),
  sp(23, 20, '10000 баллов', 'boundary-strong', 'вход в производственную внутреннюю сеть с сильным логическим изолированием', 'BOUNDARY', 10000, 0, 'target',
    '**10000 баллов**. Область применения: на всю организацию-цель за преодоление одного и того же типа сетевой границы баллы даются только один раз.\n'
    + 'подтверждающие материалы (G7): скриншот контроля устройства изолирования типа шлюза-диода, скриншот-подтверждение доступа во внутреннюю сеть и т. п.'),
  sp(24, 21, '30000 баллов', 'boundary-physical', 'вход в физически изолированную внутреннюю сеть и опорную производственную сеть', 'BOUNDARY', 30000, 0, 'target',
    '**30000 баллов**. Область применения: на всю организацию-цель за преодоление одного и того же типа сетевой границы баллы даются только один раз.\n'
    + 'подтверждающие материалы (G7): скриншоты контроля межсетевого экрана, VPN, хоста с несколькими сетевыми картами, сетевого устройства, устройства изолирования типа шлюза-диода, скриншот-подтверждение доступа во внутреннюю сеть и т. п.\n'
    + 'например, выделенная сеть железнодорожной диспетчеризации, сеть основного бухгалтерского учёта банка, зона управления производством электроэнергии, сигнальная сеть оператора связи, IoT энергетического производства и т. п.'),
  sp(25, 22, '1000 баллов (максимум 3000)', 'boundary-supply', 'вход во внутреннюю сеть через канал сопровождения цепочки поставок или облачный сервис', 'BOUNDARY', 1000, 3000, 'service',
    'баллы начисляются по трём случаям:\n'
    + '· вход во **внутреннюю сеть одной основной обороняемой организации**: 1000 баллов;\n'
    + '· вход через **одну** организацию цепочки поставок или облачный сервис во внутренние сети **нескольких** основных обороняемых организаций: 1000 баллов за каждую основную обороняемую организацию;\n'
    + '· вход через **несколько** организаций цепочки поставок или облачных сервисов в разные сетевые зоны внутренней сети **одной** основной обороняемой организации: 1000 баллов за зону, максимум 3000 баллов.\n'
    + 'при начислении укажите в evidence, какой это случай, какая основная обороняемая организация и какая сетевая зона задействованы.'),

  /* ══ 附加成果加成（依附于上面某条权限，但**独立计分、独立上限**）══════════
     这些条目不是「再拿一个系统权限」，而是「在已拿到的权限上又做到了某件事」（文档里的 +N 分）。
     压在基础条目里会共用它的 rule 上限、被基础分吃掉，所以拆成独立得分点。 */

  /* 9 网络设备加成：能够借助该设备进行网络重定向或业务劫持 +200 分 */
  sp(9, 23, 'перенаправление / перехват бизнес-операций +200 баллов', 'netdev-redirect', 'сетевое устройство · перенаправление трафика или перехват бизнес-операций с помощью этого устройства', 'NETINFRA', 200, 2000, 'none',
    '**дополнительно 200 баллов сверх баллов «прав на сетевом устройстве»** (пункт 9 документа).\n'
    + 'применяется: изменение маршрутов/политик для направления трафика на наш подконтрольный узел, перехват DNS, перехват бизнес-трафика и другие реально сработавшие перенаправления.\n'
    + 'нужны доказательства (G7): таблица маршрутизации, конфигурация политик или скриншот числа соединений; в evidence укажите направление перенаправления и способ проверки.'),

  /* 9 网络设备加成：能在设备上植入远控程序并成功进行后续攻击 1000 分 */
  sp(9, 24, 'внедрение удалённого управления + последующая атака 1000 баллов', 'netdev-implant', 'сетевое устройство · внедрение программы удалённого управления с успешной последующей атакой', 'NETINFRA', 1000, 2000, 'none',
    '**дополнительно 1000 баллов сверх баллов «прав на сетевом устройстве»** (пункт 9 документа).\n'
    + 'нужно доказать обе вещи — «внедрение успешно **и** с его помощью выполнена последующая атака»: доказательства процесса удалённого управления/закрепления + последующие результаты, инициированные через это устройство.'),

  /* 12 物联网：通过端点设备打入核心网并控制业务生产等重要系统，单独加 5000 分 */
  sp(12, 25, 'опорная сеть +5000 баллов', 'iot-corenet', 'IoT · вход в опорную сеть через конечное устройство и контроль важных систем', 'NETINFRA', 5000, 5000, 'none',
    '**пункт 12 документа прямо указывает «дополнительно 5000 баллов»**; это не входит в лимит 2000 баллов по тому пункту.\n'
    + 'применяется: lateral movement с конечного устройства IoT в опорную сеть и контроль важных систем, включая производственные бизнес-системы;\n'
    + 'в evidence укажите: с какой конечной точки выполнен вход, какие системы в опорной сети взяты под контроль, какие права получены.'),
]

/* ------------------------------------------------------------------ 内部辅助的导出 */

/**
 * 下面这些原本是 core.js 里的模块级函数（不对外导出），拆出来之后 core.js 需要用到，
 * 所以显式导出。它们不属于"给别人用的 API"，改签名前先看 core.js 的用法。
 */
export {
  normalizePort, targetAuthority, systemKeyOf, pickBestHit, legacyCapGroup,
  targetHasIpv6Host, evaluateScoreBoard, loadScoreMeta, loadAssetNames, hitPointsOf,
  scoreMultiplierOf,
}
