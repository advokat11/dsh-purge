/**
 * RedTeam 智能体工具集（preset 平面）
 *
 * 这些行只向 `tools` 注册模型可见工具，自身不发布任何服务，因此不需要 isolate realm；
 * 它们解析的是 host 平面的 `ctx.redteam`（dsh-redteam-store 发布的进程级实例）。
 *
 * 设计约定：
 *   · 写入一律走 redteam_asset_add / redteam_asset_link，智能体不直接碰 SQL；
 *   · 每次发现都带 provenance（passive|active）与 tool，保证界面上的来源标注可信；
 *   · **靶标按根会话隔离**：绑定键是会话的根祖先 id，子智能体顺着
 *     `session.header.parentSession` 继承父会话的靶标 —— 多会话并行时互不串写，
 *     报告不会再被别的靶标的成果污染（v0.9.0 之前的全局「当前靶标」指针正是串写的根源）；
 *   · 并发硬约束：`redteam_agent_slot` 用 `ctx.subagents.listChildren` 的真实运行数
 *     卡住"Не более 3 исполняющих агентов на один таргет"，超了直接拒绝，不靠提示词自觉。
 */
import { createRequire } from 'node:module'
import { existsSync, realpathSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { ROLE_TITLES, PLANNER_ROLE, ROLE_ORDER } from './store-core.js'
/* 技能可用性判定只有一份实现：面板的「技能库」页签与这里共用（见该文件头注释） */
import { bundledSkillSummaries, checkSkill, summarizeSkills, expandSkillPath, redteamSummariesForCheck } from './skill-availability.js'
import {
  loadPlatformConfig,
  mergeConfigEnv,
  platformSummary,
  toolkitDirOf,
} from './platform-config.js'
import { maxAgentsOf, DEFAULT_MAX_AGENTS, MAX_AGENTS_LIMIT } from './settings.js'

/**
 * link: 源码包不在 profile node_modules 树内，静态 import `@deepseek-ai/dsh-tools`
 * 会解析失败 → 预设行 fiber 为 undefined（never started）→ 整份「红队模式」被下拉过滤。
 * 这里从运行中的 dsh / profile 路径 createRequire。
 */
function addCandidate(list, pkg) {
  if (!pkg) return
  const norm = String(pkg).replace(/\\/g, '/')
  if (!list.includes(norm)) list.push(norm)
}

function considerBin(list, bin) {
  if (!bin) return
  let text = String(bin).replace(/\\/g, '/')
  try { text = realpathSync(bin).replace(/\\/g, '/') } catch { /* 解析不了就用原路径 */ }
  const needle = '/node_modules/@deepseek-ai/dsh/'
  const at = text.lastIndexOf(needle)
  if (at >= 0) addCandidate(list, text.slice(0, at + needle.length - 1) + '/package.json')
  const nm = text.lastIndexOf('/node_modules/')
  if (nm >= 0) addCandidate(list, join(text.slice(0, nm), 'node_modules', '@deepseek-ai', 'dsh', 'package.json'))
  const dir = dirname(text)
  // A user-owned copy keeps the official layout but is no longer nested under
  // node_modules/@deepseek-ai/dsh. Resolve from its verified package/bin pair.
  const ownPackage = join(dir, '..', 'package.json')
  try {
    const pkg = JSON.parse(readFileSync(ownPackage, 'utf8'))
    const entry = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin?.dsh
    if (pkg.name === '@deepseek-ai/dsh' && typeof entry === 'string'
      && realpathSync(resolve(dirname(ownPackage), entry)).replace(/\\/g, '/') === text) addCandidate(list, ownPackage)
  } catch { /* other launcher layouts below */ }
  /* npm 全局的 argv 常常是 …/bin/dsh，真正的包在旁边的 lib/node_modules。 */
  addCandidate(list, join(dir, '..', 'lib', 'node_modules', '@deepseek-ai', 'dsh', 'package.json'))
  addCandidate(list, join(dir, '..', 'node_modules', '@deepseek-ai', 'dsh', 'package.json'))
}

function loadDefineTool() {
  const candidates = []
  try { considerBin(candidates, process.argv[1]) } catch { /* ignore */ }
  try { considerBin(candidates, process.env.PURGE_DSH_CLI) } catch { /* ignore */ }
  const homes = [process.env.DSH_HOME, join(homedir(), '.dsh')].filter(Boolean)
  for (const home of homes) {
    addCandidate(candidates, join(home, 'package.json'))
    for (const profile of ['web', 'desktop', 'default']) {
      addCandidate(candidates, join(home, 'profiles', profile, 'package.json'))
      addCandidate(candidates, join(home, 'profiles', profile, 'node_modules', '@deepseek-ai', 'dsh', 'package.json'))
    }
  }
  addCandidate(candidates, join(process.cwd(), 'package.json'))
  addCandidate(candidates, join('D:', 'DeepSeek Harness', 'npm-global', 'node_modules', '@deepseek-ai', 'dsh', 'package.json'))
  for (const pkg of candidates) {
    try {
      if (!pkg || !existsSync(pkg)) continue
      const mod = createRequire(pkg)('@deepseek-ai/dsh-tools')
      const fn = mod && (mod.defineTool || (mod.default && mod.default.defineTool))
      if (typeof fn === 'function') return fn
    } catch { /* try next */ }
  }
  throw new Error('dsh-purge/redteam/tools: cannot resolve @deepseek-ai/dsh-tools from host')
}

const defineTool = loadDefineTool()

/** Cordis 插件名。 */
export const name = 'dsh-purge-redteam-tools'

/** 硬依赖工具注册表；`redteam` 在 host 平面由 store 发布，预设域内用软取。 */
export const inject = ['tools']

/** 根会话 id → engagementId 绑定（一次会话内稳定；进程重启后由 agent 重新绑定）。 */
const bindings = new Map()

/** 并发闸门：根会话 id → Map(子智能体键 → 预留时间戳)。子智能体结束时自动释放。 */
const reservations = new Map()

/** FIFO cap:长会话累积失效的 session id,防无限涨。订单最老的被淘汰(FIFO,近似 LRU)。 */
const BINDINGS_CAP = 500
const RESERVATIONS_CAP = 500
function capMap(m, cap) {
  const origSet = m.set.bind(m)
  m.set = (k, v) => {
    if (!m.has(k) && m.size >= cap) {
      const first = m.keys().next().value
      if (first !== undefined) m.delete(first)
    }
    return origSet(k, v)
  }
}
capMap(bindings, BINDINGS_CAP)
capMap(reservations, RESERVATIONS_CAP)

/** 并发上限：每次调用现读 settings.json → REDTEAM_MAX_AGENTS → 默认 3。 */
function maxAgentsNow(ctx) {
  const root = (() => { try { return ctx.redteam.root } catch { return undefined } })()
  return maxAgentsOf(root, process.env)
}

/** 一次调用的会话解析结果。 */
function sessionInfoOf(exec) {
  const agent = exec && exec.agent
  const session = agent && agent.session
  if (session === undefined || session === null) return {}
  const id = session.id === undefined ? undefined : String(session.id)
  let parentId
  try {
    const header = session.header
    parentId = header && header.parentSession !== undefined && header.parentSession !== null
      ? String(header.parentSession)
      : undefined
  } catch { parentId = undefined }
  return { id: id, parentId: parentId, session: session }
}

/** 会话 id（兼容旧调用点）。 */
function sessionOf(exec) {
  return sessionInfoOf(exec).id
}

/**
 * 解析"Корневая сессия"：一路沿 parentSession 走到最顶层的会话 id。
 * 主会话派出的子智能体因此共享同一个绑定键，而**不同主会话之间天然隔离**。
 * 顺手把沿途会话 id 都返回，便于把绑定缓存到子会话上。
 */
function resolveRootSession(session) {
  const chain = []
  let cur = session
  let guard = 0
  while (cur !== undefined && cur !== null && guard < 64) {
    const info = sessionInfoOf({ agent: { session: cur } })
    if (info.id === undefined) break
    chain.push(info.id)
    if (info.parentId === undefined || info.parentId === '') break
    let parent
    try {
      const store = cur.store
      parent = store && typeof store.get === 'function' ? store.get(info.parentId) : undefined
    } catch { parent = undefined }
    if (parent === undefined || parent === null) {
      /* 父会话不在内存里（被回收 / 冷启动）：父 id 本身就是稳定的根键 */
      return { rootId: info.parentId, chain: chain.concat([info.parentId]) }
    }
    cur = parent
    guard += 1
  }
  return { rootId: chain.length > 0 ? chain[chain.length - 1] : undefined, chain: chain }
}

/** 绑定键 + 会话链。 */
function bindingKeyOf(exec) {
  const info = sessionInfoOf(exec)
  if (info.id === undefined) return { rootId: undefined, sessionId: undefined, chain: [] }
  const resolved = resolveRootSession(info.session)
  const rootId = resolved.rootId === undefined ? info.id : resolved.rootId
  return { rootId, sessionId: info.id, chain: resolved.chain }
}

/**
 * 解析本次调用应作用在哪个靶标上（会话隔离版）。
 *
 * 顺序：① 显式传入 → ② 本会话/父链上的绑定 → ③ 全局「当前靶标」指针
 * （仅当没有被别的会话占用；被占用时报错并提示显式绑定，**绝不静默串写**）。
 *
 * 抛错而不是"Выберите любой"是刻意的：多会话并行时挑错靶标 = 把 A 单位的成果写进
 * B 单位的库、A 的报告里出现 B 的数据（这正是要多会话隔离的原因）。
 */
function resolveEngagement(store, exec, explicit) {
  if (typeof explicit === 'string' && explicit.length > 0) return explicit
  const { rootId, sessionId, chain } = bindingKeyOf(exec)
  const keys = Array.from(new Set([rootId, sessionId, ...chain].filter(Boolean)))
  for (const key of keys) {
    const bound = bindings.get(key)
    if (typeof bound === 'string' && bound.length > 0) return bound
  }
  if (typeof store.activeEngagementId === 'function') {
    const active = store.activeEngagementId()
    if (active !== undefined) {
      const holder = Array.from(bindings.entries()).find(([k, v]) => v === active && !keys.includes(k))
      if (holder !== undefined) {
        throw new Error(
          'Эта сессия ещё не привязана к таргету, а глобальный «текущий таргет»' + active + ' уже занят другой сессией;'
          + 'Чтобы несколько сессий не писали в одну базу таргета, привяжитесь явно: redteam_engagement_open (создать/открыть)'
          + ' или redteam_session_bind (привязка к существующему таргету).',
        )
      }
      for (const key of keys) bindings.set(key, active)
      return active
    }
  }
  const list = store.listEngagements()
  if (list.length === 1) {
    for (const key of keys) bindings.set(key, list[0].id)
    return list[0].id
  }
  throw new Error('Таргет не привязан: сначала вызовите redteam_engagement_open и передайте название организации-таргета')
}

/** 当前会话的绑定关系（redteam_session_info 与面板展示用）。 */
function bindingViewOf(exec) {
  const info = sessionInfoOf(exec)
  const { rootId, chain } = bindingKeyOf(exec)
  return {
    session_id: info.id ?? null,
    parent_session: info.parentId ?? null,
    root_session: rootId ?? null,
    session_chain: chain,
    is_subagent: info.parentId !== undefined,
    bound_engagement: rootId !== undefined ? (bindings.get(rootId) ?? null) : null,
  }
}

/** 逗号/空白分隔的清单 → 去重数组。 */
function splitList(value) {
  return String(value || '').split(/[,，\s]+/).map((x) => x.trim()).filter(Boolean)
}

/** 把一行资产压成模型可读的紧凑结构（避免把整库原始数据塞进上下文）。 */
function compactAsset(a) {
  return {
    id: a.id,
    ip: a.ip,
    segment: a.segment_cidr,
    state: a.state,
    name: a.primary_name,
    names: a.names.map((n) => n.name),
    ports: a.ports.filter((p) => p.state === 'open')
      .map((p) => p.port + '/' + p.proto + (p.service ? ' ' + [p.service, p.product, p.version].filter(Boolean).join(' ') : '') + ' [' + p.provenance + ']'),
    fingerprints: a.fingerprints.map((f) => [f.category, f.vendor, f.product, f.version].filter(Boolean).join(' ') + ' [' + f.provenance + ']'),
    passive: a.passive,
    active: a.active,
    /* 发现时间：这条资产第一次进入本库的时刻（面板与报告都按它排时间线） */
    discovered_at: a.discovered_at,
    first_seen: a.first_seen,
    last_seen: a.last_seen,
    test_status: a.test_status,
    priority: a.priority,
  }
}

const text = (value) => [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }]

/** 角色 code 的合法值说明（写进工具 description，模型不用猜）。 */
const ROLE_HINT = 'Код роли:' + ROLE_ORDER.map((r) => '`' + r + '`(' + ROLE_TITLES[r] + ')').join(', ')

function bindKeysOf(exec) {
  const { rootId, sessionId, chain } = bindingKeyOf(exec)
  return Array.from(new Set([rootId, sessionId, ...chain].filter(Boolean)))
}

/** 实时并发占用：读 subagents 注册表里"Реально работает"的直接子会话数。 */
async function liveRunningChildren(ctx, rootSessionId) {
  const subagents = ctx.get('subagents')
  if (subagents === undefined || subagents === null || typeof subagents.listChildren !== 'function') {
    return { available: false, running: 0, error: 'Реестр subagents недоступен (фактическую параллельность не проверить, счёт только по резервам)' }
  }
  try {
    const entries = await subagents.listChildren(rootSessionId)
    const rows = Array.isArray(entries) ? entries : []
    const running = rows.filter((e) => e && e.kind === 'child' && e.activity === 'running')
    return {
      available: true,
      running: running.length,
      running_labels: running.map((e) => e.label || e.id).slice(0, 20),
      total_children: rows.filter((e) => e && e.kind === 'child').length,
    }
  } catch (error) {
    return { available: false, running: 0, error: 'Не удалось перечислить подсессии:' + (error && error.message ? error.message : String(error)) }
  }
}

/** 预留（未被 subagents 注册表覆盖的那部分，例如刚 acquire 还没起来的）。 */
function reservationList(rootId) {
  const map = reservations.get(rootId)
  if (map === undefined) return []
  return Array.from(map, ([key, at]) => ({ key, at }))
}

function addReservation(rootId, key) {
  if (!reservations.has(rootId)) reservations.set(rootId, new Map())
  reservations.get(rootId).set(key, Date.now())
}

function dropReservation(rootId, key) {
  const map = reservations.get(rootId)
  if (map === undefined) return false
  if (key === undefined) {
    /* 无 key 时只释放最早的一条（与工具描述一致）——清空整张表会把别的在途预留一起放掉，名额超卖 */
    let oldestKey = null
    let oldestAt = Infinity
    for (const [k, at] of map) {
      if (at < oldestAt) { oldestAt = at; oldestKey = k }
    }
    return oldestKey !== null ? map.delete(oldestKey) : false
  }
  return map.delete(key)
}

/**
 * 产出这条记录的智能体角色：显式传的优先，否则默认按主会话记账。
 * 这个值会写进库里的 `agent` 列，报告里"Кто выполнил этот шаг"就靠它。
 */
function agentOf(args) {
  const raw = typeof args.agent === 'string' ? args.agent.trim() : ''
  return raw !== '' ? raw : PLANNER_ROLE
}

/** 写库工具共用的 agent 参数（角色 code 白名单提示写进 description）。 */
const AGENT_PARAM = {
  type: 'string',
  description: '[рекомендуется] Роль, создавшая эту запись — ' + ROLE_HINT
    + '. В отчёте она будет отмечена как «Кто выполнил этот шаг»; если не заполнить — запись на основную сессию.',
}

/**
 * 把 store 层抛出的异常统一收敛成结构化的失败返回。
 *
 * 为什么需要：同一类错误（对象不存在 / 参数非法）此前有两种形态 ——
 * 有的工具 `return { ok:false, error }`，有的直接抛。模型拿到前者能换参数重试，
 * 拿到后者往往直接放弃这一次调用，行为不可预测。统一成前者，且**不吞原始信息**。
 * @param tool - defineTool 的返回值。
 * @returns 包了一层 try/catch 的同一个工具定义。
 */
function withStructuredErrors(tool) {
  const inner = tool.execute
  if (typeof inner !== 'function') return tool
  return Object.assign({}, tool, {
    async execute(args, exec) {
      try {
        return await inner(args, exec)
      } catch (error) {
        const message = error && error.message ? error.message : String(error)
        /* 参数类错误（非法值/缺必填）与"Объект не найден"分开提示，模型据此决定重试还是放弃 */
        const kind = /非法|invalid|required|不能为空|not found|不存在/i.test(message) ? 'bad_input' : 'failed'
        return JSON.stringify({
          ok: false,
          error: message,
          error_kind: kind,
          hint: kind === 'bad_input'
            ? 'Проблема в параметрах или идентификаторе объекта: проверьте имена параметров и значения (можно сначала посмотреть реальные id через соответствующие *_list / *_query), исправьте и повторите.'
            : 'Вызов инструмента завершился ошибкой, исходный текст ошибки — в поле error; не пропускайте молча, сначала объясните пользователю или координатору, где затык.',
        }, null, 2)
      }
    },
  })
}

export function apply(ctx) {
  let store
  try {
    store = ctx.redteam
  } catch {
    store = undefined
  }
  if (!store) {
    try { store = ctx.get('redteam') } catch { store = undefined }
  }
  if (!store) {
    ctx.logger?.warn?.('redteam-tools: host ctx.redteam unavailable — tools will report store_missing')
    store = {
      openEngagement: () => { throw new Error('redteam store unavailable') },
      listEngagements: () => [],
      stats: () => ({}),
    }
  }

  /* ── 子智能体结束时自动释放并发名额（不依赖模型记得调 release）──────────── */
  /* ctx.effect 包起来 → plugin dispose 时解绑 subagent/end,否则 handler 残留 + 热重载翻倍。 */
  ctx.effect(() => {
    let disposer = null
    try {
      disposer = ctx.on('subagent/end', (info, parent) => {
        const parentSession = parent && parent.session
        const { rootId } = bindingKeyOf({ agent: { session: parentSession } })
        const childId = info && info.id !== undefined ? String(info.id) : undefined
        if (rootId === undefined) return
        if (childId !== undefined && dropReservation(rootId, childId)) return
        /* 注册表里的键可能与 runId 不同：按时间兜底清掉最早的一个预留 */
        const map = reservations.get(rootId)
        if (map === undefined || map.size === 0) return
        let oldestKey
        let oldestAt = Number.POSITIVE_INFINITY
        for (const [key, at] of map) { if (at < oldestAt) { oldestAt = at; oldestKey = key } }
        if (oldestKey !== undefined) map.delete(oldestKey)
      })
    } catch { /* 事件不可用时只影响自动释放，手动 release 仍然可用 */ }
    return () => { try { if (typeof disposer === 'function') disposer() } catch { /* ignore */ } }
  })

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_engagement_open',
    description: 'Открывает или создаёт таргет учебного пентеста (по названию организации) и привязывает **текущую сессию** к нему (субагенты наследуют автоматически). Все последующие инструменты активов по умолчанию работают с ним. Если таргет уже существует, используется его база активов. Записывается привязка только этой сессии, таргеты других сессий не затрагиваются.',
    parameters: {
      target: { type: 'string', required: true, description: 'Название организации-таргета, например «ООО Пример»' },
      scope: {
        type: 'array',
        description: 'Список CIDR в пределах авторизации (необязательно: если пользователь не дал — не спрашивайте, действуйте по публично видимой поверхности активов)',
        items: { type: 'string' },
      },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      /* bindCurrent: false —— 不动全局「当前靶标」指针：多会话并行时那个指针是串写的根源 */
      const engagement = store.openEngagement(args.target, args.scope, { bindCurrent: false })
      const keys = bindKeysOf(exec)
      for (const key of keys) bindings.set(key, engagement.id)
      const view = bindingViewOf(exec)
      return JSON.stringify({
        ok: true,
        engagement,
        stats: store.stats(engagement.id),
        session: view,
        note: 'Привязано к этой сессии (изоляция сессий: привязки других сессий не затронуты); субагенты наследуют этот таргет.'
          + (view.is_subagent ? ' Внимание: эта сессия — субагент, обычно повторный open не нужен, достаточно унаследовать таргет родительской сессии.' : ''),
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_session_bind',
    description: 'Привязывает **уже существующий** таргет к текущей сессии (для параллельных сессий: каждая привязывает свой таргет и не мешает другим). Можно указать id таргета или название организации; если не указано — выводится список доступных.',
    parameters: {
      engagement: { type: 'string', description: 'id таргета или название организации; если не указано — только список кандидатов' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const list = store.listEngagements()
      const wanted = typeof args.engagement === 'string' ? args.engagement.trim() : ''
      if (wanted === '') {
        return JSON.stringify({
          ok: false,
          candidates: list.map((e) => ({ id: e.id, name: e.name, created_at: e.created_at, stats: e.stats })),
          note: 'Передайте engagement (id таргета или название организации), чтобы завершить привязку.',
        }, null, 2)
      }
      const hit = list.find((e) => e.id === wanted)
        || list.find((e) => String(e.name) === wanted)
        || list.find((e) => String(e.name).includes(wanted))
      if (hit === undefined) {
        return JSON.stringify({ ok: false, error: 'Таргет не существует:' + wanted, candidates: list.map((e) => e.id) }, null, 2)
      }
      const keys = bindKeysOf(exec)
      for (const key of keys) bindings.set(key, hit.id)
      return JSON.stringify({
        ok: true, engagement: { id: hit.id, name: hit.name },
        session: bindingViewOf(exec),
        note: 'Эта сессия привязана к «' + hit.name + '»; последующие инструменты и отчёты работают только с ним.',
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_session_info',
    description: 'Показывает, **к какому таргету привязана текущая сессия** (id сессии, родительская сессия, корневая сессия, цепочка привязок). При параллельной работе сначала запустите его и убедитесь, что не попали на чужой таргет.',
    parameters: {},
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(_args, exec) {
      const view = bindingViewOf(exec)
      const changed = view.bound_engagement !== null ? store.stats(view.bound_engagement) : null
      return JSON.stringify({
        ok: true, session: view, stats: changed,
        bindings_now: Array.from(bindings, ([k, v]) => ({ session: k, engagement: v })),
        note: 'Привязка хранится в памяти процесса: после перезапуска dsh каждой сессии нужно привязаться заново (redteam_engagement_open / redteam_session_bind).',
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_preflight',
    description: '[Обязательно выполнить один раз перед началом работы] Самопроверка навыков и ресурсов платформы: по очереди проверить обязательные переменные окружения redteam-навыков (например, FOFA_KEY для FOFA-разведки), локальные инструменты и бинарники (suo5 / fscan / gogo / frp / Behinder / Godzilla / nmap / nuclei…), внешнюю инфраструктуру (VPS для reverse shell). Вернуть список available/broken и для каждого сломанного навыка — «Чего не хватает и как дополнить». **Если не хватает key / VPS — сразу спрашивайте у пользователя или переходите на альтернативу, не делайте вид, что всё работает.**',
    parameters: {
      include: { type: 'string', description: 'Проверять только эти навыки (через запятую); если не указано — проверяются все redteam-навыки' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args) {
      let skills
      try { skills = typeof ctx.get === 'function' ? ctx.get('skills') : null } catch { skills = null }
      const plat = platformSummary()
      const cfg = loadPlatformConfig()
      /* 环境变量的真实来源：进程环境 + $DSH_HOME/.env + 平台 config.json env */
      const envFile = expandSkillPath('$DSH_HOME/.env')
      const effectiveEnv = mergeConfigEnv({ ...process.env }, cfg)
      let envFileKeys = []
      try {
        if (existsSync(envFile)) {
          const { readFileSync } = await import('node:fs')
          for (const line of readFileSync(envFile, 'utf8').split('\n')) {
            /* 兼容 shell 习惯写法：`export KEY=value`；未加引号的行内注释（`KEY=v # комментарий`）剥掉 */
            const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line)
            if (m === null) continue
            const key = m[1]
            let raw = m[2].trim()
            if (!/^["']/.test(raw)) raw = raw.replace(/\s+#.*$/, '')
            const value = raw.replace(/^["']|["']$/g, '').trim()
            if (value === '') continue
            envFileKeys.push(key)
            if (effectiveEnv[key] === undefined || effectiveEnv[key] === '') effectiveEnv[key] = value
          }
        }
      } catch { /* .env 读不到不影响主流程 */ }

      const toolkit = toolkitDirOf(cfg)
      let toolkitEntries = []
      try {
        if (existsSync(toolkit)) {
          const { readdirSync } = await import('node:fs')
          toolkitEntries = readdirSync(toolkit).slice(0, 60)
        }
      } catch { /* 忽略 */ }

      const redteamDir = expandSkillPath('$DSH_HOME/redteam')
      const markerFile = redteamDir + '/.setup-complete'
      const setupScript = redteamDir + '/setup.sh'
      const hasMarker = existsSync(markerFile)
      const hasSetupScript = existsSync(setupScript)
      const toolkitHint = 'Плагин не скачивает и не устанавливает инструменты за пользователя. На Windows и при отсутствии setup.sh заполните на Полигоне в «Адаптация окружения» пути, FOFA_KEY и VPS; если `$DSH_HOME/redteam/setup.sh` уже есть, пользователь сам выполняет `--check` — агент не должен запускать `--yes` для скачивания бинарников.'
      let fofaKey = effectiveEnv.FOFA_KEY || ''
      const vpsKey = effectiveEnv.REDTEAM_VPS_KEY || (toolkit + (plat.runtime.windows ? '\\vps\\id_rsa' : '/vps/id_rsa'))
      const vpsHost = effectiveEnv.REDTEAM_VPS_HOST || ''
      const hasVps = existsSync(vpsKey)
      const missing = []
      if (fofaKey === '') missing.push('FOFA_KEY (Карта активов: заполните на странице «Адаптация окружения» или пропишите в $DSH_HOME/.env)')
      if (!hasVps) {
        missing.push(plat.runtime.windows
          ? 'Приватный ключ VPS (в «Адаптация окружения» укажите путь REDTEAM_VPS_KEY и REDTEAM_VPS_HOST; на Windows setup.sh не требуется)'
          : 'Способ входа на VPS — положите приватный ключ в ' + vpsKey + ' и задайте REDTEAM_VPS_HOST (шаги — в навыке redteam-setup или на Полигоне в «Адаптация окружения»)')
      }
      const fofaShown = fofaKey.length > 8 ? fofaKey.slice(0, 4) + '…' + fofaKey.slice(-4) : '(настроено)'
      const runtimeHint = plat.runtime.windows
        ? 'Сейчас включена **адаптация под Windows**: на Полигоне в «Адаптация окружения» задайте пути к инструментам/каталоги поиска и FOFA/VPS; не рассчитывайте на наличие Kali/`bash setup.sh`. По-прежнему рекомендуется отдельная машина для работы: не оставляйте приватные ключи и сканеры на повседневном рабочем ПК.'
        : 'В этом режиме рекомендуется работать в **виртуальной машине Kali, выделенной только для работы**, а не на повседневном ПК/хосте'
          + '(на этой машине останутся приватный ключ VPS и webshell, а трафик сканирования пойдёт с обычного выходного IP; после работы виртуальную машину можно просто удалить).'

      let checked = []
      let allBroken = []
      let allAvailable = []
      let broken = []
      let available = []
      let only = splitList(args.include)
      let unknownIncludes = []

      const bundledSkills = bundledSkillSummaries()
      const skillsMissing = skills === undefined || skills === null || typeof skills.list !== 'function'
      if (skillsMissing && bundledSkills.length === 0) {
        /* 桌面端常无 skills inject：仍返回平台工具探测，避免整条 preflight 报废 */
        const toolMissing = (plat.tools.items || []).filter((t) => !t.path).map((t) => t.id)
        if (toolMissing.length) {
          missing.push('Ненайденные инструменты (укажите путь или добавьте каталог поиска в «Адаптация окружения»):' + toolMissing.slice(0, 12).join(', '))
        }
        const onboarding = {
          complete: hasMarker && missing.length === 0,
          runtime_hint: runtimeHint,
          first_run: !hasMarker,
          marker: { path: markerFile, exists: hasMarker },
          setup_script: { path: setupScript, exists: hasSetupScript },
          toolkit_hint: toolkitHint,
          configured: {
            fofa_key: fofaKey === '' ? 'missing' : 'configured(' + fofaShown + ')',
            vps_key: hasVps ? 'configured(' + vpsKey + ')' : 'missing',
            vps_host: vpsHost,
            env_file: { path: envFile, exists: existsSync(envFile), keys: envFileKeys },
            platform_config: { path: cfg.path, exists: !!cfg.exists },
          },
          missing,
        }
        return JSON.stringify({
          ok: missing.length === 0 && toolMissing.length === 0,
          onboarding,
          platform: plat,
          toolkit: { dir: toolkit, exists: existsSync(toolkit), entries: toolkitEntries, hint: toolkitHint },
          skills_root_hint: 'Сервис skills хоста недоступен: проверка содержимого навыков пропущена, возвращён только опрос инструментов платформы. Укажите пути в «Адаптация окружения».',
          next: plat.runtime.windows
            ? 'Откройте на Полигоне «Адаптация окружения»: ① заполните binDirs (папка с вашими инструментами) или пути по каждому tools ② заполните FOFA_KEY / VPS ③ сохраните и повторите preflight. Не скачивайте инструменты за пользователя.'
            : (hasSetupScript
              ? 'Пользователь может сам выполнить bash "$DSH_HOME/redteam/setup.sh" --check или вписать пути в «Адаптация окружения». Агент не скачивает инструменты.'
              : 'На этой машине нет setup.sh — это нормально. Впишите пути вручную на Полигоне в «Адаптация окружения» или настройте всё по шагам согласно навыку redteam-setup.'),
        }, null, 2)
      }

      let summaries = []
      let fromBundle = skillsMissing
      let scoped = false
      if (fromBundle) {
        summaries = bundledSkills
      } else {
        try {
          let scope = null
          try {
            const presets = typeof ctx.get === 'function' ? ctx.get('agentPresets') : null
            if (presets && typeof presets.standingKeyFor === 'function') {
              scope = await presets.standingKeyFor('redteam')
            }
          } catch { scope = null }
          scoped = scope != null
          const listed = scoped ? await skills.list({ scope }) : await skills.list()
          summaries = redteamSummariesForCheck(listed, bundledSkills, scoped)
          fromBundle = summaries.every((item) => item && item.library === 'redteam' && item.content)
        } catch (error) {
          if (bundledSkills.length === 0) {
            return JSON.stringify({ ok: false, error: 'Не удалось прочитать каталог навыков:' + (error && error.message ? error.message : String(error)), platform: plat }, null, 2)
          }
          summaries = bundledSkills
          fromBundle = true
        }
      }
      summaries = redteamSummariesForCheck(summaries, bundledSkills, scoped)
      const wanted = summaries.filter((s) => only.length === 0 || only.includes(s.name))
      /* include 时只体检点名的技能：否则 ok 被无关 broken 拖成 false，模型会误以为目标技能坏了 */
      const toCheck = only.length > 0 ? wanted : summaries
      unknownIncludes = only.filter((n) => !summaries.some((s) => s.name === n))
      const rootsWith = new Map()
      for (const x of summaries) {
        const dir = x.resourceBase && x.resourceBase.kind === 'directory' ? x.resourceBase.path : null
        if (dir === null) continue
        if (!rootsWith.has(x.name)) rootsWith.set(x.name, [])
        if (!rootsWith.get(x.name).includes(dir)) rootsWith.get(x.name).push(dir)
      }
      for (const summary of toCheck) {
        let def
        if (!fromBundle && skills && typeof skills.get === 'function') {
          try { def = await skills.get(summary.name) } catch { def = undefined }
        }
        const path = def && typeof def.path === 'string'
          ? def.path
          : (typeof summary.path === 'string'
            ? summary.path
            : (summary.resourceBase && summary.resourceBase.kind === 'directory' ? summary.resourceBase.path : null))
        const root = summary.resourceBase && summary.resourceBase.kind === 'directory' ? summary.resourceBase.path : null
        const content = def && typeof def.content === 'string' && def.content.trim() !== ''
          ? def.content
          : summary.content
        const verdict = checkSkill({ name: summary.name, content, path, root },
          { env: effectiveEnv, sameNameIn: rootsWith.get(summary.name) || [] })
        checked.push(Object.assign({}, verdict, {
          title: summary.description,
          path,
          when_to_use: summary.whenToUse || '',
          needs_user: verdict.needs_user.map((n) => (n.startsWith('Переменная окружения')
            ? n + (plat.runtime.windows ? '(можно заполнить на странице «Адаптация окружения»)' : '(после получения выполните export и перезапустите dsh web)')
            : n === 'Адрес VPS' || n === 'Имя хоста VPS'
              ? 'Используется для reverse shell / доставки payload: ' + n + '(в навыке пока заглушка)'
              : n)),
        }))
      }
      allBroken = checked.filter((s) => s.status === 'broken')
      allAvailable = checked.filter((s) => s.status === 'available')
      const shown = (x) => only.length === 0 || only.includes(x.name)
      broken = allBroken.filter(shown)
      available = allAvailable.filter(shown)
      const toolMissing = (plat.tools.items || []).filter((t) => !t.path)
      if (toolMissing.length) {
        missing.push('Ненайденные локальные инструменты (укажите путь в «Адаптация окружения»):' + toolMissing.slice(0, 10).map((t) => t.id).join(', '))
      }
      const needsUser = Array.from(new Set(broken.flatMap((s) => s.needs_user)))
      const onboarding = {
        complete: hasMarker && missing.length === 0 && allBroken.length === 0,
        runtime_hint: runtimeHint,
        first_run: !hasMarker,
        marker: { path: markerFile, exists: hasMarker },
        setup_script: { path: setupScript, exists: hasSetupScript },
        toolkit_hint: toolkitHint,
        configured: {
          fofa_key: fofaKey === '' ? 'missing' : 'configured(' + fofaShown + ')',
          vps_key: hasVps ? 'configured(' + vpsKey + ')' : 'missing',
          vps_host: vpsHost,
          env_file: { path: envFile, exists: existsSync(envFile), keys: envFileKeys },
          platform_config: { path: cfg.path, exists: !!cfg.exists },
        },
        missing,
      }
      let next
      if (plat.runtime.windows && (!hasMarker || missing.length > 0 || allBroken.length > 0)) {
        next = 'Windows: откройте на Полигоне «Адаптация окружения», настройте пути toolkit/binDirs/tools и FOFA/VPS, сохраните и повторите redteam_preflight; если в тексте навыка нет пути — используйте абсолютный путь уже найденного инструмента.'
      } else if (!hasMarker && !hasSetupScript) {
        next = 'Первый запуск, и на этой машине нет скрипта установки ' + setupScript + '(это нормально, не сбой).'
          + toolkitHint + ' Один раз перечислите пользователю onboarding.missing; если закрыть не удаётся — объясните деградацию: без FOFA используйте crt.sh / пассивный DNS, без VPS делайте только результаты без развёртывания.'
      } else if (!hasMarker) {
        next = '**Первый запуск**: пусть пользователь сам выполнит `bash ' + setupScript + ' --check`, или откройте на Полигоне «Адаптация окружения». Агент не должен запускать --yes для скачивания инструментов.'
      } else if (missing.length > 0) {
        next = 'Есть пробелы: один раз перечислите пользователю onboarding.missing. На Windows или без setup.sh идите через «Адаптация окружения»; даже при наличии скрипта запускать его должен только пользователь — не скачивайте инструменты за него.'
      } else if (allBroken.length > 0) {
        next = 'Один раз перечислите пользователю элементы needs_user из broken; если закрыть не удаётся — опишите план деградации.'
      } else {
        next = 'Всё доступно, можно приступать.'
      }

      const summary = summarizeSkills(checked)
      return JSON.stringify({
        /* include 模式：ok 只反映点名技能的体检结果；测绘 key/VPS 等 missing 与此无关，降为参考不拖 ok */
        ok: allBroken.length === 0 && (only.length > 0 || missing.length === 0),
        include: only.length > 0 ? { requested: only, unknown: unknownIncludes, note: 'ok охватывает только перечисленные навыки; onboarding.missing — общая справка, на текущий ok не влияет' } : undefined,
        all_checked: { registry_total: summaries.length, checked: checked.length, broken: allBroken.length, available: allAvailable.length },
        onboarding,
        platform: plat,
        summary,
        checked: checked.length,
        available: available.map((s) => s.name),
        broken: broken.map((s) => ({ name: s.name, problems: s.problems, needs_user: s.needs_user,
          fixes: (s.issues || []).map((i) => i && i.fix).filter(Boolean),
          fix_note: 'Шаги исправления выполняет пользователь (или через страницу «Адаптация окружения»); вы не скачиваете и не устанавливаете инструменты.' })),
        unknown: checked.filter((s) => s.status === 'unknown').map((s) => s.name),
        toolkit: { dir: toolkit, exists: existsSync(toolkit), entries: toolkitEntries, hint: toolkitHint },
        skills_root_hint: 'Здесь проверяются только redteam-навыки. Официальные навыки лежат в $DSH_HOME/skills и не считаются недоступными из-за путей redteam-инструментов.',
        next,
        needs_user_flat: needsUser,
        wanted_count: wanted.length,
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_agent_slot',
    description: '[Использовать до и после выдачи задач основной сессией] Ограничитель параллелизма исполняющих агентов: на одну цель **не более 3 одновременно** (настраивается через REDTEAM_MAX_AGENTS). action=status — сколько мест осталось и кто работает; action=acquire — занять место (при заполнении будет прямой отказ, **не повторяйте попытки**); action=release — освободить (при завершении субагента сервер освобождает место сам).',
    parameters: {
      action: { type: 'string', required: true, enum: ['status', 'acquire', 'release'], description: 'status — просмотр / acquire — занятие / release — освобождение' },
      label: { type: 'string', description: 'Метка задачи для acquire, например «Разведка: основной домен и C-блок»' },
      key: { type: 'string', description: 'Ключ для освобождения при release (если не указан — освобождается самое раннее резервирование)' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const { rootId, sessionId } = bindingKeyOf(exec)
      const owner = rootId ?? sessionId
      if (owner === undefined) {
        return JSON.stringify({ ok: false, error: 'Не удалось получить id сессии: подсчёт параллелизма невозможен (убедитесь, что вызов инструмента передаёт контекст агента).' }, null, 2)
      }
      const live = await liveRunningChildren(ctx, owner)
      const reserved = reservationList(owner)
      /* 注册表里 running 的子会话已经包含正在跑的；预留是"Только зарезервирован, в реестре ещё нет"的那部分，
         两者取较大值，避免重复计数又不会漏计 */
      const used = Math.max(live.running, reserved.length)
      const cap = maxAgentsNow(ctx)
      const free = Math.max(cap - used, 0)
      const base = {
        ok: true, max: cap, used, free,
        running_from_registry: live.running,
        running_labels: live.running_labels ?? [],
        reservations: reserved,
        registry_available: live.available,
        registry_note: live.available ? undefined : live.error,
      }
      if (args.action === 'status') {
        return JSON.stringify(Object.assign(base, {
          hint: free === 0
            ? 'Лимит исчерпан: дождитесь отчёта текущих агентов и только потом назначайте (самый надёжный ритм — по одному и по порядку).'
            : 'Осталось ' + free + ' мест. По умолчанию назначайте по одному; параллельте только действительно независимые задачи.',
        }), null, 2)
      }
      if (args.action === 'acquire') {
        if (free <= 0) {
          return JSON.stringify(Object.assign(base, {
            ok: false,
            error: 'Параллельность исчерпана (максимум ' + cap + '): сейчас нельзя назначать новых агентов. Дождитесь отчёта работающих или сначала сделайте release для завершённых.',
          }), null, 2)
        }
        const key = (typeof args.label === 'string' && args.label.trim() !== '' ? args.label.trim() : 'slot') + '#' + Date.now()
        addReservation(owner, key)
        return JSON.stringify(Object.assign(base, { slot: key, used: used + 1, free: Math.max(cap - used - 1, 0) }, {
          hint: 'Зарезервировано (' + key + '). **После назначения помните**: субагент освобождает слот сам; если назначение сорвалось (например, ошибка инструмента), освободите вручную: redteam_agent_slot action=release key=' + key + ' и освободите его.',
        }), null, 2)
      }
      const dropped = dropReservation(owner, typeof args.key === 'string' && args.key.trim() !== '' ? args.key.trim() : undefined)
      return JSON.stringify(Object.assign(base, { ok: true, released: dropped, used: Math.max(used - (dropped ? 1 : 0), 0) }), null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_add',
    description: 'Записывает актив и его порты/сервисы/отпечатки в базу активов (идемпотентный upsert). У каждой находки должен быть provenance: для пассивного сбора — passive, для активного зондирования — active, а также tool (источник данных или имя инструмента).',
    parameters: {
      engagement: { type: 'string', description: 'id таргета; если не указано — таргет, привязанный к текущей сессии' },
      ip: { type: 'string', required: true, description: 'IP актива (IPv4)' },
      state: { type: 'string', description: 'live | dead | unknown, по умолчанию unknown' },
      primary_name: { type: 'string', description: 'Основной домен/имя хоста' },
      provenance: { type: 'string', required: true, enum: ['passive', 'active'], description: 'Источник этой находки: пассивный или активный' },
      tool: { type: 'string', description: 'Источник данных или имя инструмента, например crt.sh / nmap / nuclei / curl' },
      discovered_at: { type: 'string', description: '[Необязательно] Время обнаружения этого актива (ISO, например 2026-09-17T09:30:00Z). Если не заполнять, записывается «Момент первой записи в базу»; если источник данных даёт историческое время первого появления — передайте его, будет точнее. **Повторный сбор его не перезаписывает**.' },
      first_seen: { type: 'string', description: '[Необязательно] Время первого появления по данным источника/инструмента (хранится отдельно от времени обнаружения)' },
      names: {
        type: 'array',
        description: 'Домен/имя сертификата, связанные с активом',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: { type: 'string', required: true },
            kind: { type: 'string', description: 'domain | hostname | cert_cn, по умолчанию domain' },
            provenance: { type: 'string', enum: ['passive', 'active'] },
          },
        },
      },
      ports: {
        type: 'array',
        description: 'Открытые порты и их службы/отпечатки',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            port: { type: 'number', required: true },
            proto: { type: 'string', description: 'tcp (по умолчанию) | udp' },
            service: { type: 'string', description: 'Имя службы, например http / mysql' },
            product: { type: 'string', description: 'Название продукта, например nginx' },
            version: { type: 'string', description: 'Версия, например 1.24.0' },
            banner: { type: 'string', description: 'Фрагмент исходного banner' },
            url: { type: 'string', description: 'Полный URL веб-сервиса для прямого доступа, например https://oa.example.com:8443/portal' },
            title: { type: 'string', description: 'Заголовок веб-страницы (получен HTTP-запросом), например «Seeyon OA: вход»' },
            provenance: { type: 'string', enum: ['passive', 'active'] },
            tool: { type: 'string' },
            fingerprints: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  category: { type: 'string', description: 'Веб-сервер | промежуточное ПО | фреймворк | CMS | СУБД | VPN-шлюз …' },
                  vendor: { type: 'string' },
                  product: { type: 'string' },
                  version: { type: 'string' },
                  evidence: { type: 'string', description: 'Основание для вывода, например заголовки ответа / путь / banner' },
                  confidence: { type: 'number', description: '0–1' },
                },
              },
            },
          },
        },
      },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const asset = {
        ip: args.ip, state: args.state, primary_name: args.primary_name,
        provenance: args.provenance, tool: args.tool,
        names: args.names, ports: args.ports,
        /* 发现时间：不传则由服务端按"Момент первой записи в базу"自动记录；
           数据源能给历史时间（FOFA 的 first_seen 等）就传进来，报告时间线更准 */
        discovered_at: args.discovered_at,
        first_seen: args.first_seen,
      }
      const result = store.importBundle(id, { scan: { tool: args.tool, argv: ['redteam_asset_add'] }, assets: [asset] })
      const written = store.listAssets(id, { ip: args.ip, limit: 1 }).items[0]
      return JSON.stringify({
        ok: true, engagement: id, counts: result.counts,
        asset: written ? compactAsset(written) : null,
        discovered_at: written ? written.discovered_at : null,
        hint: 'Время обнаружения этого актива сохранено как ' + (written && written.discovered_at ? written.discovered_at : '(неизвестно)')
          + '; повторный сбор обновляет только last_seen, время обнаружения не меняется.',
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_link',
    description: 'Записывает ребро связи в базу активов (используется графом и последующим анализом lateral movement). relation, например resolves / exposes / contains / trusts / shares_cert.',
    parameters: {
      engagement: { type: 'string' },
      src_kind: { type: 'string', required: true, description: 'segment | asset | domain | port …' },
      src_id: { type: 'string', required: true },
      dst_kind: { type: 'string', required: true },
      dst_id: { type: 'string', required: true },
      relation: { type: 'string', required: true },
      confidence: { type: 'number' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.importBundle(id, {
        edges: [{
          src_kind: args.src_kind, src_id: args.src_id,
          dst_kind: args.dst_kind, dst_id: args.dst_id,
          relation: args.relation, confidence: args.confidence,
        }],
      })
      return JSON.stringify({ ok: true, edges: result.counts.edges }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_query',
    description: 'Поиск по базе активов. Фильтры: C-сегмент (/24), порт, сервис, отпечаток, источник, измерение сети внутренняя/внешняя (scope), сортировка (sort), ключевые слова (полнотекстовый поиск по IP/домену/banner/сервису/отпечатку). Возвращает компактный результат с открытыми портами и отпечатками каждого актива и его принадлежностью к внутренней/внешней сети.',
    parameters: {
      engagement: { type: 'string' },
      cidr: { type: 'string', description: 'C-сегмент (/24), например 203.0.113.0/24' },
      port: { type: 'number', description: 'Открытый порт' },
      service: { type: 'string', description: 'Ключевое слово сервиса/продукта, например nginx' },
      fingerprint: { type: 'string', description: 'Ключевое слово отпечатка, например Tomcat / Spring' },
      provenance: { type: 'string', enum: ['passive', 'active'], description: 'Только пассивный или только активный источник' },
      q: { type: 'string', description: 'Полнотекстовый запрос (несколько слов через пробел — условие AND)' },
      state: { type: 'string', enum: ['live', 'dead', 'unknown'] },
      scope: { type: 'string', enum: ['internal', 'external'], description: 'Измерение сети: internal = внутренние/приватные адреса, external = доступно из интернета' },
      sort: { type: 'string', enum: ['priority', 'todo', 'ports', 'ip'], description: 'Сортировка: priority = сначала легче атаковать (по умолчанию), todo = сначала непроверенные, ports = сначала с большим числом портов, ip = по IP' },
      limit: { type: 'number', description: 'Лимит количества, по умолчанию 50, максимум 200' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const limit = Math.min(Number(args.limit) || 50, 200)
      const result = store.listAssets(id, {
        cidr: args.cidr, port: args.port, service: args.service,
        fingerprint: args.fingerprint, provenance: args.provenance,
        q: args.q, state: args.state, scope: args.scope, sort: args.sort, limit,
      })
      return JSON.stringify({
        ok: true, engagement: id, total: result.total, returned: result.items.length,
        items: result.items.map(compactAsset),
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_get',
    description: 'Полные данные одного актива: все порты и сервисы, отпечатки, таймлайн сбора, рёбра связей. Для углублённого анализа конкретной цели.',
    parameters: {
      engagement: { type: 'string' },
      id: { type: 'number', required: true, description: 'id актива (из результата redteam_asset_query)' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const asset = store.getAsset(id, args.id)
      if (asset === undefined) return JSON.stringify({ ok: false, error: 'asset not found' })
      return JSON.stringify({ ok: true, asset }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_stats',
    description: 'Обзор инвентаризации активов: число C-сегментов, активов (живых), открытых портов, сервисов, отпечатков, число пассивных/активных источников, а также детализация по каждому C-сегменту.',
    parameters: { engagement: { type: 'string' } },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: id, stats: store.stats(id), segments: store.listSegments(id) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_graph',
    description: 'Экспорт графа активов (C-сегмент → актив → открытые порты, включая рёбра разрешения домён) для анализа топологии и планирования путей lateral movement. Если узлов больше лимита — сузьте область по C-сегменту.',
    parameters: {
      engagement: { type: 'string' },
      cidr: { type: 'string', description: 'Только подграф указанного C-сегмента' },
      maxNodes: { type: 'number', description: 'Лимит узлов, по умолчанию 300' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const maxNodes = Math.min(Number(args.maxNodes) || 300, 1000)
      const graph = store.graph(id, { cidr: args.cidr })
      if (graph.nodes.length > maxNodes) {
        return JSON.stringify({
          ok: false,
          error: 'Слишком много узлов графа (' + graph.nodes.length + ' > ' + maxNodes + '), укажите cidr, чтобы сузить область',
          segments: store.listSegments(id).map((s) => ({ cidr: s.cidr, assets: s.assets })),
        }, null, 2)
      }
      return JSON.stringify({ ok: true, engagement: id, nodes: graph.nodes, edges: graph.edges }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_role_prompt',
    description: 'Возвращает действующий системный промпт выбранной роли RedTeam, только для просмотра. При постановке задачи не копируйте весь текст в задание; в первой строке prompt для subagent напишите redteamRole: <code> — текст роли попадёт в системный промпт подсессии.',
    parameters: {
      engagement: { type: 'string' },
      role: { type: 'string', required: true, /* 角色白名单**从 ROLE_ORDER 派生**：写死 4 个值曾漏掉 assess，
          而预设明确要求主会话用本工具取资产梳理角色的提示词 —— 结果 enum 直接拒绝，
          资产梳理子智能体永远拿不到角色约束。派生后新增角色不会再漏。 */
      enum: ROLE_ORDER },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const found = store.listPrompts(id).find((p) => p.role === args.role)
      if (found === undefined) return JSON.stringify({ ok: false, error: 'unknown role' })
      return JSON.stringify({
        ok: true, role: found.role, title: found.title,
        updated_at: found.updated_at, prompt: found.content,
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_roles',
    description: 'Список ролей RedTeam и их задач (разведка / поиск уязвимостей / эксплуатация / внутренняя сеть).',
    parameters: {},
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute() {
      return JSON.stringify({
        ok: true,
        roles: Object.entries(ROLE_TITLES).map(([role, title]) => ({ role, title })),
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_test',
    description: 'Записать состояние тестирования актива: что тестировалось в этот раз (`test`, с добавлением), какая поверхность атаки осталась (`surface`, с перезаписью), текущий статус тестирования, заблокировал ли WAF. **Вызывайте один раз перед началом тестирования каждого актива (status=testing) и ещё раз после завершения или отказа** — по этому на странице «Карта активов» показывается «не тестировался / в тестировании / протестирован / заблокирован / отказ / нет поверхности атаки». Выводы об исключении, причины неудачного входа и поводы для перепроверки пишите в `test`.',
    parameters: {
      engagement: { type: 'string' },
      asset_id: { type: 'number', description: 'id актива (или ip — одно из двух, приоритет у asset_id)' },
      ip: { type: 'string', description: 'IP актива' },
      status: { type: 'string', enum: ['untested', 'testing', 'tested', 'blocked', 'abandoned', 'no_surface'], description: 'Статус тестирования: не тестировался/в тестировании/протестирован/заблокирован/отказ/нет поверхности атаки' },
      test: { type: 'string', description: 'Что тестировалось в этот раз (**добавляется** к записи тестирования, например «nmap все порты + шаблоны nuclei cve + IDOR на API»). Выводы об исключении, причины неудачного входа и поводы для перепроверки пишите здесь.' },
      notes: { type: 'string', description: 'Совместимый псевдоним test (написание из старых промптов), действует так же, как test, и добавляется в запись тестирования.' },
      surface: { type: 'string', description: 'Что ещё можно протестировать (с перезаписью, например «SMB 445 не тестировался; на веб /api не проверялся IDOR»)' },
      blocked: { type: 'boolean', description: 'Заблокировала ли WAF/защита в этот раз (при true счётчик блокировок +1)' },
      updated_by: { type: 'string', description: 'Роль записи, например recon / vuln-scan' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.updateAssetTest(id, { ...args, engagement: undefined })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  /* ================================================================== 漏洞检测 */

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_vuln_add',
    description: 'Записать найденную уязвимость (роль поиска уязвимостей). При наличии cve обновление идемпотентно по (asset_id, cve, target). severity: critical|high|medium|low|info; status: candidate (ожидает проверки)|confirmed (подтверждена)|false-positive|exploited|fixed. Обязательно прикладывайте доказательства (фрагменты запроса/ответа, команды воспроизведения, путь к файлу с доказательствами).',
    parameters: {
      engagement: { type: 'string' },
      agent: AGENT_PARAM,
      asset_id: { type: 'number', description: 'id актива (из redteam_asset_query)' },
      cve: { type: 'string', description: 'Номер CVE / CNVD (если номера нет — можно опустить)' },
      title: { type: 'string', required: true, description: 'Заголовок уязвимости' },
      severity: { type: 'string', required: true, enum: ['critical', 'high', 'medium', 'low', 'info'] },
      status: { type: 'string', enum: ['candidate', 'confirmed', 'false-positive', 'exploited', 'fixed'] },
      target: { type: 'string', description: 'Затронутая цель, например https://host:443/path или ip:port' },
      source: { type: 'string', description: 'Способ обнаружения: nuclei / sqlmap / curl / manual …' },
      confidence: { type: 'number', description: '0–1' },
      evidence: { type: 'string', description: 'Доказательства: сводка запроса/ответа, команды, путь к файлу с доказательствами' },
      found_by_agent: { type: 'string', description: 'Роль обнаружения, по умолчанию vuln-scan' },
      gained: { type: 'string', description: '[Важно] Какие права/результаты получены через эту уязвимость — короткая метка в терминах начисления, несколько разделяйте запятой, например «права на сервер, туннель во внутреннюю сеть», «учётная запись администратора панели», «права на базу данных»' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addVuln(id, { ...args, engagement: undefined, agent: agentOf(args), found_by_agent: args.found_by_agent || args.agent || 'vuln-scan' })
      return JSON.stringify({ ok: true, engagement: id, ...result, stats: store.vulnStats(id) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_vuln_query',
    description: 'Поиск по базе уязвимостей: фильтр по критичности, статусу, CVE, активу, C-блоку или ключевому слову. Нужен для выбора целей под эксплуатацию и сверки ложных срабатываний.',
    parameters: {
      engagement: { type: 'string' },
      severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low', 'info'] },
      status: { type: 'string', enum: ['candidate', 'confirmed', 'false-positive', 'exploited', 'fixed'] },
      cve: { type: 'string' },
      asset_id: { type: 'number' },
      cidr: { type: 'string' },
      q: { type: 'string', description: 'Ключевое слово заголовка/CVE/цели/доказательств' },
      limit: { type: 'number', description: 'По умолчанию 50, максимум 200' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.listVulns(id, { ...args, engagement: undefined, limit: Math.min(Number(args.limit) || 50, 200) })
      return JSON.stringify({ ok: true, engagement: id, total: result.total, items: result.items, stats: store.vulnStats(id) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_vuln_update',
    description: 'Обновить статус/критичность/доказательства уязвимости (например, после проверки — confirmed, после успешной эксплуатации — exploited, ложное срабатывание — false-positive).',
    parameters: {
      engagement: { type: 'string' },
      id: { type: 'number', required: true, description: 'id уязвимости' },
      status: { type: 'string', enum: ['candidate', 'confirmed', 'false-positive', 'exploited', 'fixed'] },
      severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low', 'info'] },
      evidence: { type: 'string' },
      confidence: { type: 'number' },
      gained: { type: 'string', description: 'Какие права/результаты получены через эту уязвимость (короткая метка в терминах начисления, несколько — через запятую)' },
      title: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.updateVuln(id, args.id, { status: args.status, severity: args.severity, evidence: args.evidence, confidence: args.confidence, gained: args.gained, title: args.title })
      return JSON.stringify({ ok: result.updated, engagement: id, ...result, stats: store.vulnStats(id) }, null, 2)
    },
  })))

  /* ================================================================== 漏洞利用 / 内网渗透 */

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_credential_add',
    description: 'Записать учётные данные (роль эксплуатации/работы во внутренней сети). **Пароль/ключ обязательно записывайте в secret_value в открытом виде** — панель показывает открытый текст для быстрого повторного использования; параллельно укажите secret_ref на файл доказательств в runs/. Внимание: база существует только на этой машине, не добавляйте её файлы и экспорт в какие-либо репозитории.',
    parameters: {
      engagement: { type: 'string' },
      agent: AGENT_PARAM,
      host: { type: 'string', required: true, description: 'Хост (IP или домен)' },
      username: { type: 'string' },
      secret_type: { type: 'string', description: 'password | hash | key | token | connection-string, по умолчанию password' },
      secret_value: { type: 'string', description: '[Обязательно] Учётные данные в открытом виде: пароль / Hash / приватный ключ / Token / строка подключения' },
      secret_ref: { type: 'string', description: 'Путь к ссылке на доказательства, например runs/cred-vnc-10.0.0.5.txt' },
      privilege: { type: 'string', description: 'Уровень прав этих учётных данных, например admin / user / db-read' },
      asset_id: { type: 'number' },
      source: { type: 'string', description: 'Источник: exploit / dump / config-leak …' },
      tool: { type: 'string' },
      note: { type: 'string' },
      found_by_agent: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addCredential(id, { ...args, engagement: undefined, agent: agentOf(args) })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_shot_add',
    description: 'Зарегистрировать скриншот-доказательство: скопируйте изображение в каталог цели и привяжите к пункту начисления/попаданию (в панели достаточно раскрыть пункт начисления, в отчёт изображение также вставляется). Для массовых пунктов начисления (например права на терминал) на каждый пункт показывается не более 3 характерных снимков — снимать каждую машину не нужно.',
    parameters: {
      engagement: { type: 'string' },
      agent: AGENT_PARAM,
      path: { type: 'string', description: 'Путь к изображению на этой машине (относительно каталога цели или абсолютный); либо data_base64 — одно из двух' },
      data_base64: { type: 'string', description: '(base64, можно с префиксом data:) содержимое изображения; используйте, если инструмент скриншотов не сохранил файл' },
      label: { type: 'string', description: 'Описание изображения, например «контроллер домена WEB-SHDC1, atexec вернул nt authority\\system»' },
      kind: { type: 'string', description: 'screenshot (снимок на месте, по умолчанию) | card (карточка-выдержка доказательств, сгенерированная из записи; в отчёте будет помечена)' },
      point_code: { type: 'string', description: 'code пункта начисления, например terminal-access / central-system' },
      hit_id: { type: 'number', description: 'Привязать к конкретному попаданию по начислению (score_hit id); если указано, изображение относится только к этой записи' },
      asset_id: { type: 'number' },
      target: { type: 'string', description: 'Цель, к которой относится изображение (IP / URL)' },
      note: { type: 'string', description: 'Дополнительное пояснение: что подтверждает изображение' },
      source_ref: { type: 'string', description: 'Исходный источник: путь сохранённого скриншота или файл доказательств в runs/' },
      captured_at: { type: 'string', description: 'Время снимка (ISO), по умолчанию текущее время' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addShot(id, { ...args, engagement: undefined, agent: agentOf(args) })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_shot_list',
    description: 'Показать зарегистрированные скриншоты-доказательства (с пунктом начисления, целью, типом и сохранённым файлом).',
    parameters: {
      engagement: { type: 'string' },
      point_code: { type: 'string' },
      hit_id: { type: 'number' },
      asset_id: { type: 'number' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: id, ...store.listShots(id, {
        point_code: args.point_code, hit_id: args.hit_id, asset_id: args.asset_id,
      }) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_shot_delete',
    description: 'Удалить скриншот-доказательство (вместе с файлом на диске).',
    parameters: {
      engagement: { type: 'string' },
      id: { type: 'number', required: true, description: 'shot id (id, возвращённый redteam_shot_list)' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const eng = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: eng, ...store.deleteShot(eng, args.id) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_credential_list',
    description: 'Показать собранные учётные данные (с открытым secret_value) для повторного использования и lateral movement.',
    parameters: {
      engagement: { type: 'string' },
      host: { type: 'string' },
      username: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: id, items: store.listCredentials(id, { host: args.host, username: args.username }) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_access_add',
    description: 'Записать успешно полученную сессию доступа (точку старта lateral movement). method, например vnc/rdp/ssh/web-shell/webshell/db; privilege, например admin/user/system.',
    parameters: {
      engagement: { type: 'string' },
      host: { type: 'string', required: true },
      username: { type: 'string' },
      method: { type: 'string', required: true, description: 'Способ получения доступа' },
      privilege: { type: 'string' },
      asset_id: { type: 'number' },
      session_ref: { type: 'string', description: 'Ссылка на сессию/доказательства, например runs/session-vnc-10.0.0.5.md' },
      note: { type: 'string' },
      found_by_agent: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addAccess(id, { ...args, engagement: undefined })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_access_list',
    description: 'Показать полученные сессии доступа.',
    parameters: {
      engagement: { type: 'string' },
      host: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: id, items: store.listAccess(id, { host: args.host }) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_role_prompt_reset',
    description: 'Вернуть системный промпт роли к встроенному значению по умолчанию (новая версия шаблона). Нужно, когда старые цели должны получить актуальные промпты ролей; если role не указан, сбрасываются все четыре роли.',
    parameters: {
      engagement: { type: 'string' },
      role: { type: 'string', /* 角色白名单**从 ROLE_ORDER 派生**：写死 4 个值曾漏掉 assess，
          而预设明确要求主会话用本工具取资产梳理角色的提示词 —— 结果 enum 直接拒绝，
          资产梳理子智能体永远拿不到角色约束。派生后新增角色不会再漏。 */
      enum: ROLE_ORDER },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.resetPrompts(id, args.role)
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  /* ---------- WebShell 与内网隧道：打的过程中随时复用，避免"В разгаре атаки забыли про готовые точки входа" ---------- */

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_sessions',
    description: '[смотреть до и после каждого решения] Один экран со всеми доступными точками входа: развёрнутые WebShell, рабочие туннели во внутреннюю сеть (с адресами прослушивания и достижимыми подсетями), учётные данные, сессии доступа — плюс статистика online/offline. Перед работой во внутренней сети загляните сюда: не изобретайте заново и не забывайте про готовые туннели.',
    parameters: { engagement: { type: 'string' } },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const summary = store.sessionSummary(id)
      return JSON.stringify({
        ok: true, engagement: id, totals: summary.totals,
        webshells: summary.webshells.map((w) => ({
          id: w.id, url: w.url, type: w.shell_type, pass_key: w.pass_key, privilege: w.privilege,
          status: w.status, asset_ip: w.asset_ip, last_check: w.last_check, note: w.note,
        })),
        tunnels: summary.tunnels.map((t) => ({
          id: t.id, kind: t.kind, listen: t.listen, entry: t.entry, reach: t.reach,
          entry_kind: t.entry_kind, legit: t.legit,
          status: t.status, asset_ip: t.asset_ip, command: t.command, last_check: t.last_check, note: t.note,
        })),
        hint: 'При status=active туннель сразу годится для сканера: -socks5 <listen> или --proxy socks5://<listen>; при webshell status=online подключайтесь соответствующим клиентом.'
          + ' Внимание: legit=false (entry_kind=self-only, только на своём VPS/собственном сервере) **не считается пересечением границы таргета и не считается прорывом**; legit=null означает, что entry_kind не указан — дополните сторону цели через redteam_tunnel_update.',
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_webshell_add',
    description: 'Регистрирует развёрнутый WebShell. **Нужно загружать зашифрованный шелл Behinder (behinder) или Godzilla (godzilla)** — в консоли пользователь подключается соответствующим клиентом напрямую; one-liner-шелл, самописный шелл или MemShell пользователь не подключит, это не сдаваемая точка входа. shell_type допускает только godzilla | behinder; если реально доступна лишь другая форма, укажите other и объясните в note причину. Повторная регистрация с тем же url+pass_key объединяется и обновляется. После регистрации все агенты ролей могут её использовать — не пробивайте повторно.',
    parameters: {
      engagement: { type: 'string' },
      agent: AGENT_PARAM,
      url: { type: 'string', required: true, description: 'Полный URL WebShell' },
      shell_type: { type: 'string', description: 'godzilla (Godzilla) | behinder (Behinder); antsword/other — только для других форм, с указанием причины' },
      pass_key: { type: 'string', description: 'Пароль подключения / ключ (для Behinder — pass, для Godzilla — key)' },
      privilege: { type: 'string', description: 'Текущие права, например www-data / root / iis' },
      secret_ref: { type: 'string', description: 'Ссылка на учётные данные/доказательства, например runs/ws-10.0.0.5.txt (не записывайте пароли в открытом виде в базу)' },
      asset_id: { type: 'number' },
      note: { type: 'string' },
      found_by_agent: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addWebshell(id, { ...args, engagement: undefined, status: 'online', agent: agentOf(args) })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_webshell_list',
    description: 'Список зарегистрированных WebShell (со статусом online и временем последней проверки).',
    parameters: {
      engagement: { type: 'string' },
      status: { type: 'string', description: 'online | offline | unknown' },
      asset_id: { type: 'number' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: id, items: store.listWebshells(id, args) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_webshell_update',
    description: 'Обновляет статус WebShell (удалён/офлайн/изменились права) или добавляет пояснение.',
    parameters: {
      engagement: { type: 'string' },
      id: { type: 'number', required: true, description: 'id записи WebShell' },
      status: { type: 'string', description: 'online | offline | dead | unknown' },
      privilege: { type: 'string' },
      note: { type: 'string' },
      check_note: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const eng = resolveEngagement(store, exec, args.engagement)
      const result = store.updateWebshell(eng, args.id, args)
      return JSON.stringify({ ok: true, engagement: eng, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_tunnel_add',
    description: 'Зарегистрировать туннель во внутреннюю сеть. **Чтобы войти во внутреннюю сеть, сначала поднимите socks5 через WebShell/HTTP с помощью навыка suo5-tunnel (kind=suo5)**; без туннеля не пишите самодельные скрипты разведки внутренней сети. В listen указывайте адрес, доступный на этой машине (например 127.0.0.1:1080), в reach — сеть, до которой он достаёт. После регистрации сканер может сразу использовать -socks5 <listen>.\n\n**Красная линия: собственный VPS / собственный настроенный сервер не считается туннелем.** socks5, сервер frp или прокси, поднятые только на вашем сервере и не касающиеся цели, **не считаются пересечением границы цели, прорывом периметра или внутренней сети** (для таких указывайте entry_kind=self-only, они будут помечены как «не прорыв»). **Обязательно опишите сторону цели**:\n· target-outbound — цель сама инициирует соединение к нам (**ваш сервер принимает reverse shell с цели**, на цели запущен клиент frp/Stowaway);\n· target-http — через WebShell/HTTP-канал цели (suo5, Neo-ReGeorg, reGeorg);\n· target-agent — через процесс/сессию под контролем цели (SSH -R, инициированный целью, и т.п.).',
    parameters: {
      engagement: { type: 'string' },
      agent: AGENT_PARAM,
      kind: { type: 'string', required: true, description: 'suo5 (предпочтительно, через WebShell/HTTP) | socks5 | ssh-r | frp | chisel | other' },
      listen: { type: 'string', required: true, description: 'Локальный адрес прослушивания host:port' },
      entry: { type: 'string', description: 'Точка входа: URL WebShell / промежуточный хост / команда' },
      reach: { type: 'string', description: 'Достижимая сеть, например 10.0.0.0/8' },
      entry_kind: { type: 'string', description: '[Важно] Что находится на стороне цели в канале: target-outbound (цель делает reverse shell к нам / на цели запущен клиент frp) | target-http (suo5/Neo-ReGeorg через WebShell цели) | target-agent (через процесс под контролем цели) | self-only (только на своём VPS/своём сервере, **не считается прорывом**)' },
      webshell_id: { type: 'number', description: 'Через какой WebShell создан' },
      asset_id: { type: 'number' },
      command: { type: 'string', description: 'Команда создания — чтобы можно было воссоздать' },
      pid: { type: 'string' },
      note: { type: 'string' },
      found_by_agent: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addTunnel(id, { ...args, engagement: undefined, status: 'active', agent: agentOf(args) })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_tunnel_list',
    description: 'Показать зарегистрированные туннели во внутреннюю сеть (со статусом, адресом прослушивания, достижимой сетью, entry_kind и признаком legit). **legit=false означает канал, поднятый только на своём VPS/своём сервере: он не считается пересечением границы цели и не считается прорывом**; legit=null — entry_kind не указан.',
    parameters: {
      engagement: { type: 'string' },
      status: { type: 'string', description: 'active | down | unknown' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: id, items: store.listTunnels(id, args) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_tunnel_update',
    description: 'Обновить статус туннеля (закрыт/не работает/смена адреса прослушивания) или дополнить признак entry_kind. После использования обязательно помечайте туннель как down с пояснением, чтобы его не применили по ошибке. **В старых записях без указания принадлежности входа (legit=null, в интерфейсе «требует подтверждения») дополните сторону цели через entry_kind** — только после этого запись считается подтверждением прорыва.',
    parameters: {
      engagement: { type: 'string' },
      id: { type: 'number', required: true },
      status: { type: 'string', description: 'active | down | closed | unknown' },
      listen: { type: 'string' },
      reach: { type: 'string' },
      entry: { type: 'string', description: 'Точка входа: URL WebShell / промежуточный хост / команда' },
      entry_kind: { type: 'string', description: 'Дополнительно укажите сторону цели: target-outbound | target-http | target-agent | self-only (только на своём сервере, не прорыв)' },
      note: { type: 'string' },
      check_note: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const eng = resolveEngagement(store, exec, args.engagement)
      const result = store.updateTunnel(eng, args.id, args)
      return JSON.stringify({ ok: true, engagement: eng, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_session_check',
    description: 'Проверить связность всех WebShell и туннелей фактически (реальные HTTP/TCP-соединения со стороны host) и записать состояние онлайн/офлайн в базу. Запускайте перед началом работы и после длительных задач.',
    parameters: {
      engagement: { type: 'string' },
      timeoutMs: { type: 'number', description: 'Таймаут одной проверки, по умолчанию 6000ms' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = await store.probeSessions(id, { timeoutMs: args.timeoutMs })
      const online = result.webshells.filter((w) => w.status === 'online').length
      const active = result.tunnels.filter((t) => t.status === 'active').length
      return JSON.stringify({
        ok: true, engagement: id, checked_at: result.checkedAt,
        summary: `WebShell онлайн ${online}/${result.webshells.length}, туннелей доступно ${active}/${result.tunnels.length}`,
        webshells: result.webshells, tunnels: result.tunnels,
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_attack_path',
    description: 'Экспорт графа атаки: топология активов + узлы уязвимостей + скомпрометированные активы (meta.owned). Для планирования путей lateral movement и отчёта о результатах. Если узлов слишком много — сузьте область через cidr.',
    parameters: {
      engagement: { type: 'string' },
      cidr: { type: 'string' },
      maxNodes: { type: 'number', description: 'По умолчанию 400' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const maxNodes = Math.min(Number(args.maxNodes) || 400, 1500)
      const graph = store.attackGraph(id, { cidr: args.cidr })
      if (graph.nodes.length > maxNodes) {
        return JSON.stringify({
          ok: false,
          error: 'Слишком много узлов графа (' + graph.nodes.length + ' > ' + maxNodes + '), укажите cidr, чтобы сузить область',
          summary: graph.summary,
        }, null, 2)
      }
      return JSON.stringify({
        ok: true, engagement: id, summary: graph.summary,
        owned: graph.nodes.filter((n) => n.meta && n.meta.owned).map((n) => n.label),
        nodes: graph.nodes, edges: graph.edges,
      }, null, 2)
    },
  })))

  /* ================================================================== 域名 / Web 资产 */

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_web_list',
    description: 'Список веб-активов (с доступными URL и заголовками страниц). Перед веб-пентестом загляните сюда, начинайте с интерфейсов.',
    parameters: {
      engagement: { type: 'string' },
      cidr: { type: 'string' },
      limit: { type: 'number' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.listWeb(id, { cidr: args.cidr, limit: args.limit })
      return JSON.stringify({
        ok: true, engagement: id, total: result.total,
        items: result.items.map((w) => ({
          url: w.url || ('http' + (w.port === 443 || w.port === 8443 || w.port === 9443 ? 's' : '') + '://' + w.ip + (w.port === 80 || w.port === 443 ? '' : ':' + w.port)),
          title: w.title, ip: w.ip, segment: w.segment_cidr, port: w.port,
          service: [w.service, w.product, w.version].filter(Boolean).join(' '),
          provenance: w.provenance, asset_id: w.asset_id,
        })),
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_domain_index',
    description: 'Агрегация активов по доменам: какие IP/активы связаны с каждым доменом. Для понимания связей основного домена, поддоменов и C-сегментов.',
    parameters: { engagement: { type: 'string' } },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: id, items: store.domainIndex(id) }, null, 2)
    },
  })))

  /* ================================================================== 得分目标 */

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_score_list',
    description: 'Панель целей по очкам: все пункты (название/категория/баллы/взято или нет/подтверждающие доказательства) и прогресс общей суммы. **Смотрите сюда перед каждым планированием следующего шага** и выбирайте, что бить, по величине баллов.',
    parameters: { engagement: { type: 'string' } },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.listScorePoints(id, {})
      /* 按合并版的 8 个类别分组返回：智能体一眼看到"Какие категории ещё не тронуты и сколько использовано от лимита по каждому пункту" */
      const groups = (result.ruleGroups || []).map((g) => ({
        category: g.name,
        items: g.tiers.length,
        points: g.points,
        cap_sum: g.capSum,
      }))
      return JSON.stringify({
        ok: true, engagement: id, summary: result.summary,
        groups,
        items: result.items.map((p) => ({
          id: p.id, code: p.code, name: p.name, category: p.category, points: p.points,
          /* 合并版的档位说明（一条含多档时，记分要用 points 参数指定本档分值） */
          tier: p.tier, cap: p.cap, cap_used: p.cap_used, dedup_scope: p.dedup_scope,
          scope_label: p.scope_label,
          enabled: p.enabled, achieved: p.hits.length > 0, hits: p.hits.length,
          counted: p.counted, earned: p.earned,
          /* 该条因计分口径 / 已达上限而不计分的条数（把它当停止信号，别在同一条上刷） */
          capped: p.capped,
          /* 两个字段各司其职：service_summary 是"Почему попадание по этому пункту не засчитано"的整段说明；
             capped_reason 留给**逐条命中**的具体原因（在 hits[] 里），不要拿摘要冒充它。 */
          capped_summary: p.service_summary,
          evidence: p.hits.map((h) => (h.target ? h.target + ': ' : '') + h.evidence).slice(0, 3),
        })),
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_score_hit',
    description: 'Записывает начисление очков. Правила начисления по «Правилам начисления за категорию прорыва и вторжения (объединённая версия)» переработаны в **25 пунктов** (I. Получение доступа — 21 пункт + II. Прорыв границы сети — 4 пункта, всего 8 категорий),'
      + 'Есть также 8 общих правил G1–G8, действующих для всех пунктов. **Перед начислением сначала прочитайте в `redteam_score_list` фактический code и лимит/правило подсчёта этого пункта**, не пишите по памяти.\n\n'
      + '**В доказательствах только результат**: целевой актив + что получено (учётная запись/пароль/права/объём данных), не описывайте ход получения и маршрут — за процесс отвечают шаги цепочки начисления за атаку.'
      + 'Если можно указать «Уязвимость, через которую получено», добавьте vuln_id — отчёт автоматически приложит исходный запрос этой уязвимости.\n\n'
      + '**Для пунктов с несколькими уровнями задавайте очки текущего уровня в `points`**: «объединённая версия» сливает несколько уровней одного пункта в одну запись (например «права на сервер» обычные 10 / администратор 50,'
      + '«права на домен» первый уровень 50 / второй 20, «права на сетевое устройство» обычные 100 / администратор 200). При начислении ставьте в `points` очки фактического уровня этой записи;'
      + 'если не заполнить — берётся значение основного уровня этого пункта. **Одна система учитывается один раз по максимальным правам** (G1) — если сначала записан обычный уровень, а затем получено повышение привилегий до администратора,'
      + 'запишите ещё одну запись уровня администратора (в points — значение высокого уровня), система сама вытеснит запись обычного уровня.\n\n'
      + '**Красная линия первая: очки за учётные записи начисляются только после фактической проверки входа.** Получив учётную запись/пароль, через браузер (browser-automation / kimi-webbridge) или равноценную сессию'
      + 'фактически войдите и убедитесь в интерактивном доступе к страницам — только тогда начисляйте очки за права учётной записи: **одни лишь учётные данные не означают полученную учётную запись**; неудачные попытки входа пишите в параметр `test` у redteam_asset_test.\n\n'
      + '**Красная линия вторая: самостоятельно зарегистрированная учётная запись не даёт очков за права.** Самостоятельная регистрация, созданные вами пользователи/роли/учётные записи панели, выданные себе права не считаются —'
      + 'очки за работу начисляются за **получение уже существующих чужих** учётных записей и прав. Такие случаи записывайте с self_created=true (чтобы остался след процесса): очки не начисляются, в счётчики и отчёт не попадают.\n\n'
      + '**Красная линия третья: учитывайте правило подсчёта пункта (G1/G3).** У каждого пункта начисления своё правило:'
      + '`одна система — только по максимальным правам один раз` / `одна служба — только одна запись по максимуму` / `вся цель — один раз` (прорыв сетевого периметра) / `Накопительно: по хостам · картам · шт.` (терминалы, облачные узлы, вычислительные карты).'
      + 'и у каждого пункта есть свой **лимит** (например сервер 600 очков, веб-приложение 2000 очков, централизованная система 4000 очков); после достижения лимита этот пункт больше не накапливается (G3) —'
      + 'в ответе будет warning «Достигнут лимит / вытеснено» — считайте его **сигналом остановиться**, переходите к другому пункту или другому активу, не накручивайте один и тот же пункт.\n\n'
      + '**Результаты по данным считаются отдельно (G2)**: почтовые данные, бизнес-данные, информационные активы записываются отдельно по степени важности и не смешиваются с очками за права;'
      + 'в evidence обязательно указывайте **фактический объём данных** (например «выгружено 1 320 000 записей пользователей»).',
    parameters: {
      engagement: { type: 'string' },
      code: { type: 'string', description: 'code пункта начисления (либо point_id / point_name — что-то одно); сначала сверьте фактический code в redteam_score_list' },
      point_id: { type: 'number' },
      point_name: { type: 'string' },
      points: { type: 'number', description: '[Обязательно для пунктов с уровнями] По какому уровню начислять за это попадание (например права на сервер: обычные — 10, администратор — 50; контроль домена: первый уровень 50, второй 20). Если не заполнить — берётся значение основного уровня пункта.' },
      target: { type: 'string', description: 'Целевой актив: URL / ip:port / имя хоста (**с портом** — по нему определяется правило службы/системы)' },
      asset_id: { type: 'number', description: 'id целевого актива в базе' },
      port: { type: 'number', description: '[Рекомендуется заполнить] На какой порт приходится это начисление (правило считается по «актив + порт»; если в target порт уже есть, можно не заполнять)' },
      vuln_id: { type: 'number', description: '[Рекомендуется заполнить] Через какую уязвимость получены очки (по ней отчёт приложит исходный запрос)' },
      step_id: { type: 'number', description: 'id соответствующего шага цепочки атаки (необязательно)' },
      evidence: { type: 'string', required: true, description: '[Обязательно] Результат: что получено, например «администратор панели tomcat/Tomcat@2024 (вход через браузер фактически проверен)», «учётная запись базы данных root/xxx», «выгружено 1,32 млн записей пользователей». Для пунктов с уровнями укажите уровень (например «права администратора»).' },
      self_created: { type: 'boolean', description: '[Важно] Эти учётная запись/права **зарегистрированы или созданы вами сами**? Если да — true: это только след процесса, очки не начисляются, в отчёт не попадает. Если получены уже существующие чужие учётная запись/права — не заполняйте (по умолчанию false).' },
      note: { type: 'string' },
      recorded_by: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addScoreHit(id, { ...args, engagement: undefined })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_score_point_save',
    description: 'Добавить или изменить пункт начисления (очки/название/категория/описание/включён). Пользователь также редактирует их в интерфейсе; агент пользуется инструментом только при необходимости (например, нашёл в правилах ещё не записанный пункт начисления). С id — изменение, без id — добавление.',
    parameters: {
      engagement: { type: 'string' },
      id: { type: 'number', description: 'id существующего пункта начисления (передаётся при изменении)' },
      name: { type: 'string', required: true },
      code: { type: 'string', description: 'Короткий code (при добавлении лучше указать — удобнее фиксировать начисления)' },
      category: { type: 'string', description: 'Категория, например права на учётные записи / права на сервер / база данных / прорыв сети / данные / ключевая цель' },
      points: { type: 'number', description: 'Очки' },
      description: { type: 'string', description: 'Пояснение к условиям начисления' },
      enabled: { type: 'boolean' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.saveScorePoint(id, { ...args, engagement: undefined })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_assess',
    description: 'Оценить «простоту поражения» актива: какие результаты ожидаются (права на учётные записи/RCE/права на сервер/права на базу данных/чувствительные данные/прорыв периметра), насколько высок приоритет и почему так считаете. Вызывайте один раз по каждому активу при завершении разведки — чтобы ведущий расставил приоритеты по соотношению выгоды и затрат.',
    parameters: {
      engagement: { type: 'string' },
      asset_id: { type: 'number' },
      ip: { type: 'string' },
      priority: { type: 'string', enum: ['high', 'medium', 'low'], description: 'high — легко получить результат / medium — средне / low — сложно или мало ценности' },
      potential: { type: 'string', description: 'Ожидаемый результат, например «права на учётные записи+RCE», «права на базу данных», «много чувствительной информации»' },
      reason: { type: 'string', description: 'Обоснование: версия по отпечатку попадает под Nday, API без аутентификации, слабые пароли, открытая база данных, сила WAF и т.п.' },
      assessed_by: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.assessAsset(id, { ...args, engagement: undefined })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  /* ================================================================== 证据 / 攻击链 / 报告 */

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_http_evidence_add',
    description: 'Сохранить одно HTTP-доказательство: исходный запрос и ответ. Отчёт отрисует его как сырое сообщение, которое можно вставить в Burp Suite / Yakit, поэтому request должен быть полным воспроизводимым исходным запросом (строка запроса, заголовки включая Host, при необходимости body).',
    parameters: {
      engagement: { type: 'string' },
      vuln_id: { type: 'number', description: 'id связанной уязвимости (рекомендуется заполнить)' },
      asset_id: { type: 'number' },
      label: { type: 'string', description: 'Назначение этого доказательства, например «чтение списка пользователей в обход прав»' },
      method: { type: 'string', description: 'GET/POST/…' },
      url: { type: 'string' },
      status: { type: 'number', description: 'Код состояния ответа' },
      request: { type: 'string', required: true, description: 'Полный исходный запрос (вставляется в Burp напрямую)' },
      response: { type: 'string', description: 'Полный ответ или ключевой фрагмент' },
      note: { type: 'string' },
      captured_by: { type: 'string', description: 'Роль сбора' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addHttpEvidence(id, { ...args, engagement: undefined })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_chain_add',
    description: 'Записать шаг цепочки атаки. **Раздел отчёта «откуда взялся этот шаг» держится только на этой записи**: откуда взялись логин и пароль, как загружен webshell Behinder, как построен туннель — всё это описывайте здесь через `tool` (фактическая команда как есть) + `detail` (зачем так делали, откуда взялась зацепка) + `result` (фактический вывод/результат). Страница цепочки атаки и отчёт показывают записи в порядке seq.',
    parameters: {
      engagement: { type: 'string' },
      agent: AGENT_PARAM,
      stage: { type: 'string', required: true, enum: ['recon', 'vuln', 'exploit', 'access', 'pivot', 'data', 'other'], description: 'Тип действия (совместимое поле): recon — разведка | vuln — поиск уязвимостей | exploit — эксплуатация | access — получение доступа | pivot — прорыв во внутреннюю сеть | data — чувствительные данные | other. **Этап задаётся через stage_code**, это поле нужно только как запасной вариант для старых данных.' },
      title: { type: 'string', required: true, description: 'Одной фразой, что сделано на этом шаге, например «загрузил webshell Behinder через точку загрузки шаблонов в панели», «поднял socks5-туннель через suo5»' },
      detail: { type: 'string', description: 'Почему так делали и откуда зацепка, например «страница входа раскрывает версию Coremail XT 5.0 → совпадает с CVE-2023-xxxx → в управлении шаблонами панели возможна загрузка»' },
      tool: { type: 'string', description: '[Ключ к воспроизведению в отчёте] **Фактически выполненная команда как есть**, например `nuclei -t CVE-2021-xxxx.yaml -u http://x`, `suo5-linux-amd64 -t http://x/shell.jsp -l 1080`, `sqlmap -u "http://x?id=1" --dump`. Без этой записи шаг в отчёте не воспроизвести.' },
      result: { type: 'string', description: '[Ключ к воспроизведению в отчёте] Сводка фактического результата/вывода, например `uid=0(root) gid=0(root)`, «вернулся 200, внутри 12 тыс. записей пользователей», «вход администратора панели tomcat выполнен»' },
      asset_id: { type: 'number' },
      vuln_id: { type: 'number' },
      access_id: { type: 'number' },
      evidence_ref: { type: 'string', description: 'Ссылка на файл доказательств/сессию, например runs/session-vnc.md' },
      recorded_by: { type: 'string' },
      point_code: { type: 'string', description: '[Заполняйте, если на этом шаге начислены очки] code пункта начисления (например rce / webshell / boundary): сервер сам начислит очки и свяжет шаг с начислением. **Обязательно передайте вместе evidence, иначе очки не начислятся** (шаг в базу всё равно попадёт).' },
      stage_code: { type: 'string', enum: ['recon', 'internet', 'boundary', 'internal', 'target'], description: 'Этап операции, к которому относится шаг (только эти 5 допустимых значений): recon (разведка) | internet (права на интернет-активы) | boundary (прорыв периметра · построение туннеля) | internal (права на активы внутренней сети) | target (права на систему цели). Любое другое значение (например частые у внешних инструментов external/foothold/tunnel/privilege) будет проигнорировано с откатом на stage, и шаг не попадёт ни в один этап.' },
      evidence: { type: 'string', description: 'Используется вместе с point_code: что получено за эти очки (целевой актив + учётная запись/права/объём данных) — **если не заполнить, очки не начисляются**.' },
      self_created: { type: 'boolean', description: 'Используется вместе с point_code: полученные на этом шаге учётная запись/права **созданы вами сами**? Если да — true (остаётся только след процесса, очки не начисляются)' },
      target: { type: 'string', description: 'Используется вместе с point_code: целевой актив' },
      seq: { type: 'number', description: 'Если не заполнить — шаг добавляется в конец цепочки' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addChainStep(id, { ...args, engagement: undefined, agent: agentOf(args), recorded_by: args.recorded_by || args.agent })
      /* 步骤落库后提醒两件事：报告要用的 tool/result 有没有写、这一步的得分有没有记 */
      const hints = []
      if (!args.tool) hints.push('На этом шаге не указан `tool` (фактическая команда): раздел «как сделано» в отчёте останется пустым — лучше допишите шаг с командой.')
      if (!args.result) hints.push('На этом шаге не указан `result` (фактический вывод/результат): при воспроизведении в отчёте не хватит доказательства «Пробито или нет».')
      if (result && result.score_hint) hints.push(result.score_hint)
      return JSON.stringify({ ok: true, engagement: id, ...result, hints: hints.length > 0 ? hints : undefined }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_chain',
    description: 'Прочитать полную цепочку атаки (в порядке шагов) для отчёта и проверки её замкнутости (вход → права → прорыв во внутреннюю сеть).',
    parameters: { engagement: { type: 'string' } },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      return JSON.stringify({ ok: true, engagement: id, items: store.listChain(id) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_attack_file_add',
    description: 'Сохранить **фактически сработавший** файл атаки (скрипт/POC/EXP/словарь) в папку цели для повторного использования и передачи. Структура каталогов: attack-files/<IP|хост URL|C-блок>/<имя файла>. evidence обязательно и должно явно описывать проверенный эффект (например «Вывод uid=0», «Без авторизации возвращает 200 и содержит данные») — **нерабочие и просто опробованные скрипты сюда не кладите**.',
    parameters: {
      engagement: { type: 'string' },
      target: { type: 'string', required: true, description: 'Цель: IP, URL или C-блок (несколько портов одного IP попадают в папку этого IP)' },
      name: { type: 'string', required: true, description: 'Имя файла, например cve-2021-22893.sh / vnc_brute.py' },
      kind: { type: 'string', enum: ['poc', 'exp', 'script', 'wordlist', 'other'], description: 'Тип: poc — проверка / exp — эксплуатация / script — скрипт / wordlist — словарь' },
      description: { type: 'string', description: 'Что делает этот файл (одной фразой)' },
      evidence: { type: 'string', required: true, description: 'Доказательство работоспособности: фактический вывод/отклик/эффект или id соответствующей уязвимости/доказательства' },
      content: { type: 'string', description: 'Содержимое файла (или path — одно из двух)' },
      path: { type: 'string', description: 'Путь к существующему файлу (относительно каталога цели или абсолютный): он будет скопирован в папку цели (или content — одно из двух)' },
      asset_id: { type: 'number' },
      vuln_id: { type: 'number' },
      created_by: { type: 'string' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.addAttackFile(id, { ...args, engagement: undefined })
      return JSON.stringify({ ok: true, engagement: id, ...result }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_attack_file_list',
    description: 'Показать сохранённые файлы атаки (с группировкой по папкам целей). Перед началом работы по цели смотрите сюда, чтобы не делать одно и то же дважды.',
    parameters: {
      engagement: { type: 'string' },
      target: { type: 'string', description: 'Только по одной цели' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      if (args.target) return JSON.stringify({ ok: true, engagement: id, items: store.listAttackFiles(id, { target: args.target }) }, null, 2)
      return JSON.stringify({ ok: true, engagement: id, folders: store.attackFileTree(id) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_report_targets',
    description: '[Устарело, используйте redteam_score_report] Отчёт о результатах в разрезе целей (по одному на каждый IP / URL / C-блок): уязвимости с результатом (с исходными запросами для вставки в Burp/Yakit), полученные права, учётные данные, файлы атаки, цепочка атаки. Нужен для отчёта по цели или проверки, чего ещё не хватает.',
    parameters: {
      engagement: { type: 'string' },
      target: { type: 'string', description: 'Отчёт только по одной цели' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.reportTargets(id, {})
      const picked = args.target ? result.targets.filter((t) => t.key === args.target || t.label === args.target) : result.targets
      return JSON.stringify({
        ok: true, engagement: id, generated_at: result.generated_at, totals: result.totals,
        targets: picked.map((t) => ({ key: t.key, label: t.label, segment: t.segment, stats: t.stats })),
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_attack_chain',
    description: 'Цепочка атаки: пять этапов, выстроенных по расположению поверхности атаки — ① разведка (внешняя сторона) → ② права на интернет-активы → ③ прорыв периметра (построение туннеля) → ④ права на активы внутренней сети → ⑤ права на цель. Возвращает цель каждого этапа, **сколько очков фактически получено и накопленный итог**, задействованные активы и реальные туннели этапа прорыва периметра. В начале работы по ней видно «На какой стадии сейчас и какую стадию бить следующей», в отчёте — выводы по этапам.',
    parameters: { engagement: { type: 'string' } },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const chain = store.scoreChain(id)
      return JSON.stringify({
        ok: true, engagement: id,
        totals: { points: chain.summary.points, totalPoints: chain.summary.totalPoints, hits: chain.summary.hits,
          /* 按服务封顶（同资产同端口只算一次）而没计分的条数：账号类/数据库权限 */
          serviceCappedHits: chain.summary.serviceCappedHits || 0 },
        stages: (chain.stages || []).map((st) => ({
          code: st.code, name: st.name, goal: st.goal,
          points: st.points, cumulative: st.cumulative, counted: st.counted, hits: st.hits,
          steps: st.steps, tools: st.tools,
          methods: (st.sections || []).map((x) => x.label + ': ' + (x.items || []).join(', ')),
          scored: st.items.map((x) => ({ point: x.point_name, points: x.points, counted: x.counted, target: x.target,
            service: x.service || null, capped: x.capped === true, capped_reason: x.capped_reason || null })),
          assets: (st.assets || []).map((a) => a.ip + (a.scope === 'internal' ? '(внутренняя сеть)' : '(внешняя сеть)') + ' вклад' + a.points + 'очк.'),
          tunnels: (st.tunnels || []).map((t) => t.kind + ' ' + t.listen + ' [' + t.status + '] достижимо ' + (t.reach || '—')),
        })),
        hint: 'Этап начисления выводится автоматически (core-system → цель, boundary → прорыв периметра, остальные — по принадлежности актива к внутренней или внешней сети); при записи шага цепочки атаки указывайте stage_code (принимаются только recon/internet/boundary/internal/target) — тогда счётчик шагов попадёт в нужный этап, другие значения игнорируются. Права на учётные записи и права на базу данных ограничены правилом «тот же актив, тот же порт»: набрав максимум по службе, вы выбираете лимит, повторное попадание по той же службе помечается capped=true и очки не начисляются.',
      }, null, 2)
    },
  })))


  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_score_report',
    description: 'Отчёт о воспроизведении цепочки начисления за атаку: включает только результаты, «за которые начислены очки» (уязвимости без очков в отчёт не попадают), к каждому пункту по возможности приложен исходный запрос, который можно сразу вставить в Yakit Repeater для воспроизведения. Для передачи заказчику используйте его, а не redteam_report.',
    parameters: {
      engagement: { type: 'string' },
      limit: { type: 'number', description: 'Сколько пунктов максимум, по умолчанию 500' },
      markdown: { type: 'boolean', description: 'true — вернуть весь markdown (по умолчанию true); false — вернуть только сводку по пунктам' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const r = store.scoreReport(id, { limit: args.limit })
      if (args.markdown === false) {
        return JSON.stringify({ ok: true, engagement: id, summary: r.summary,
          items: r.items.map((x) => ({ seq: x.seq, point: x.point_name, points: x.points, counted: x.counted,
            target: x.target, gained: x.gained, requests: x.requests.length, missing_evidence: x.missing_evidence })) }, null, 2)
      }
      return JSON.stringify({ ok: true, engagement: id, summary: r.summary, markdown: r.markdown }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_report',
    description: '[Устарело, используйте redteam_score_report] Сформировать отчёт о результатах (Markdown): включает только **подтверждённые/проэксплуатированные уязвимости с результатом не ниже средней критичности** (к каждой — исходный запрос для вставки в Burp/Yakit), цепочку атаки, полученные права и учётные данные, рекомендации по устранению. Список активов из разведки, ожидающие проверки/ложные срабатывания, низкая критичность и информационные уязвимости в отчёт не попадают. Чтобы находка попала в отчёт: сначала redteam_vuln_update в confirmed (проверка пройдена) или exploited (эксплуатация успешна), затем redteam_http_evidence_add для исходного запроса.',
    parameters: { engagement: { type: 'string' } },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const result = store.report(id)
      return JSON.stringify({ ok: true, engagement: id, generated_at: result.generated_at, stats: result.stats, markdown: result.markdown }, null, 2)
    },
  })))

  /* ── 知识库（POC/EXP）：全局共享，跨靶标复用 ───────────────────────────────
     为什么单列一组工具：通用 POC/EXP 是一次性投入、长期复用的资产。打 Nday/1day
     之前先查这里，能省掉整轮"Искать в интернете + писать вручную + отлаживать"的时间；验证有效的通用
     POC/EXP 必须回填，后面的靶标和智能体直接就能用。 */

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_poc_search',
    description: '[Первый шаг перед атакой на Nday/1day] Сначала проверьте «готовое» на двух уровнях: ① **база знаний** (накопленные на этой машине общие POC/EXP, общие для всех целей, сортировка «Проверено → число переиспользований») ② **локальная библиотека шаблонов nuclei** (десятки тысяч шаблонов, CVE/имя компонента находится напрямую). Есть попадание — используйте его: из базы знаний возьмите полный текст через redteam_poc_get, шаблон запустите как `nuclei -t <относительный путь>`. **Не ищите заново в интернете и не пишите с нуля**. Если нет ни там, ни там — ищите в интернете или пишите сами, а после подтверждения работоспособности пополните базу знаний через redteam_poc_add.',
    parameters: {
      q: { type: 'string', description: 'Ключевое слово: компонент+версия, название уязвимости, фрагмент пути, характерная строка из содержимого — подойдёт любое' },
      cve: { type: 'string', description: 'Номер CVE / CNVD, например CVE-2023-21839' },
      component: { type: 'string', description: 'Название компонента/продукта, например Weblogic, Shiro, Weaver OA, Nacos' },
      kind: { type: 'string', description: 'poc | exp | script | template | payload' },
      category: { type: 'string', description: 'Фильтр по **категории** (можно несколько значений через запятую): rce | deserialization | file-upload | sqli | unauthorized | auth-bypass | weak-password | ssrf | xxe | path-traversal | info-leak | privesc | tunnel | other' },
      engagement: { type: 'string', description: 'Фильтр по **цели-источнику** (id цели или слово из названия): только опыт «Проверено на какой-либо организации»' },
      asset_target: { type: 'string', description: 'Фильтр по **найденному активу** (IP / домен / фрагмент URL)' },
      language: { type: 'string', description: 'python | go | java | bash | http | nuclei | js | php' },
      source: { type: 'string', description: 'web (интернет) | self (написано вручную) | manual (вручную) | nuclei-template' },
      verified: { type: 'boolean', description: 'true — только фактически проверенные (используйте их в первую очередь)' },
      templateLimit: { type: 'number', description: 'Сколько локальных шаблонов nuclei возвращать максимум, по умолчанию 20' },
      limit: { type: 'number', description: 'Лимит записей базы знаний, по умолчанию 200' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args) {
      const items = store.searchPocs(args)
      const stats = store.pocStats()
      const q = args.q || args.cve || args.component || ''
      /* templateStats() / nucleiTemplatesDir() 都要扫模板目录：**一次调用只算一次**。
         原来这一小段里 templateStats() 被连着算了三遍（13k 模板的目录每次都要走一遍）。 */
      const tplStats = store.templateStats()
      const tpl = (q || args.category)
        ? store.searchTemplates(q, Math.min(Number(args.templateLimit) || 20, 100), 0, args.category || '')
        : { dir: tplStats.dir || store.nucleiTemplatesDir() || null, total: tplStats.total, items: [], byCategory: tplStats.byCategory }
      const hit = items.length > 0 || (tpl.items || []).length > 0
      return JSON.stringify({
        ok: true,
        knowledge_base: {
          total: stats.total, verified: stats.verified, reused: stats.reused,
          /* 归类概览：让智能体知道"哪类武器已经攒了多少"，缺哪类心里有数 */
          by_category: (stats.byCategory || []).filter((c) => c.n > 0).map((c) => c.name + ' ' + c.n + '(проверено ' + c.verified + ')'),
          by_engagement: (stats.byEngagement || []).slice(0, 10).map((e) => e.engagement + ' ' + e.n),
        },
        local_templates: {
          dir: tplStats.dir, total: tplStats.total, cve_templates: tplStats.cve, matched: (tpl.items || []).length,
          by_category: (tplStats.byCategory || []).filter((c) => c.n > 0).map((c) => c.name + ' ' + c.n),
        },
        count: items.length,
        hint: hit
          ? 'Есть готовое: полный текст записи базы знаний возьмите через redteam_poc_get; шаблон nuclei запускайте сразу как `nuclei -t <относительный путь шаблона>`. После использования отметьте повторное применение через redteam_poc_use.'
          : 'Нет ни в базе знаний, ни в локальной библиотеке шаблонов: ищите в интернете (web_search / GitHub / ExploitDB / бюллетени вендора) или напишите сами, а после подтверждения работоспособности обязательно пополните базу знаний через redteam_poc_add (с category + engagement + asset_target + verified_note).',
        templates: (tpl.items || []).map((t) => ({ path: t.path, name: t.name, severity: t.severity, tags: t.tags })),
        items: items.map((x) => ({
          id: x.id, code: x.code, title: x.title, kind: x.kind, category: x.category, cve: x.cve, component: x.component,
          versions: x.versions, language: x.language, source: x.source, source_url: x.source_url,
          verified: x.verified === 1, verified_note: x.verified_note, hit_count: x.hit_count,
          /* 来源溯源：哪条经验、哪个靶标、哪台资产、什么时候建的 */
          engagement: x.engagement_name || x.engagement_id || null, asset_target: x.asset_target || null,
          found_by_agent: x.found_by_agent || null, created_at: x.created_at,
          tags: x.tags, usage: x.usage, path: x.path, has_content: x.has_content === 1,
        })),
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_poc_get',
    description: 'Получить **полное содержимое** записи POC/EXP из базы знаний (текст + использование + запись проверки + путь сохранения): можно применять как есть или переделать под конкретную цель. Если id не передан, можно указать code (поле code из ответа redteam_poc_search).',
    parameters: {
      id: { type: 'number', description: 'id записи базы знаний' },
      code: { type: 'string', description: 'Стабильный идентификатор записи базы знаний (code из результата search)' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args) {
      const row = store.getPoc(args.id !== undefined ? args.id : args.code)
      if (row === undefined) return JSON.stringify({ ok: false, error: 'В базе знаний такой записи нет (сначала выполните поиск redteam_poc_search)' }, null, 2)
      return JSON.stringify({ ok: true, ...row }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_poc_add',
    description: 'Положить **универсальный переиспользуемый** POC/EXP в базу знаний (общая для всех целей). Сюда идёт всё, что взято из интернета, написано самостоятельно или уже отлажено и проверено — включайте только действительно рабочее и указывайте источник и доказательства проверки. Критерий: то, что **пригодится и на другой цели**, идёт в базу знаний; скрипты, работающие только для текущей цели, — через redteam_attack_file_add (страница файлов атаки). Записи с тем же именем (тем же code) объединяются и обновляются, так можно выпускать новые версии.\n\n**Три обязательных части при пополнении (без них в панели не будет категории и не отследить источник)**: ① `category` — категория; ② `engagement` + `asset_target` — на какой цели и на каком активе знание найдено и проверено; ③ `verified` + `verified_note` — доказательства проверки.',
    parameters: {
      title: { type: 'string', required: true, description: 'Заголовок: компонент + название/номер уязвимости, например «Weblogic T3 десериализация CVE-2023-21839»' },
      kind: { type: 'string', description: 'poc (проверка) | exp (эксплуатация) | script | template | payload' },
      category: { type: 'string', description: '[Категория, лучше заполнять] rce — удалённое выполнение команд | deserialization — десериализация | file-upload — загрузка файлов / getshell | sqli — SQL-инъекция | unauthorized — доступ без авторизации | auth-bypass — обход аутентификации / IDOR | weak-password — слабые пароли | ssrf | xxe | path-traversal — обход каталогов / чтение произвольных файлов | info-leak — утечка информации | privesc — повышение привилегий / lateral movement | tunnel — туннель / прокси | other — прочее' },
      cve: { type: 'string', description: 'Номер CVE / CNVD' },
      component: { type: 'string', description: 'Название компонента/продукта (удобно для поиска по компоненту)' },
      versions: { type: 'string', description: 'Диапазон затронутых версий' },
      severity: { type: 'string', description: 'critical | high | medium | low' },
      language: { type: 'string', description: 'python | go | java | bash | http | nuclei | js | php' },
      source: { type: 'string', description: 'web (взято из интернета) | self (написано самостоятельно) | manual (вручную) | nuclei-template' },
      source_url: { type: 'string', description: 'Ссылка на источник (для источников из интернета обязательна — для сверки)' },
      description: { type: 'string', description: 'Что делает этот POC, ключевая идея, предварительные условия' },
      usage: { type: 'string', description: 'Использование: полный пример командной строки + параметры, которые нужно заменить' },
      content: { type: 'string', description: 'Текст: исходник скрипта/POC, исходный пакет запроса, шаблон nuclei, шаги вызова' },
      path: { type: 'string', description: 'Можно указать путь к существующему файлу на этой машине (относительно pocs/ или абсолютный) — база знаний прочитает текст из него' },
      filename: { type: 'string', description: 'Имя файла для сохранения текста, по умолчанию по языку (poc.py / poc.sh / poc.yaml…)' },
      verified: { type: 'boolean', description: 'Проверено ли фактически (**true только если проверено на реальной цели**)' },
      verified_note: { type: 'string', description: 'Доказательства проверки: на какой цели, какой вывод/результат, нужна ли аутентификация' },
      engagement: { type: 'string', description: '[Цель-источник] На какой цели найдено/проверено это знание (id цели или название организации)' },
      asset_target: { type: 'string', description: '[Найденный актив] На каком именно активе/объекте проверка прошла успешно, например 10.1.2.3:8080 или http://oa.demo.com' },
      found_by_agent: { type: 'string', description: 'code роли, которая его обнаружила (recon / assess / vuln-scan / exploit / internal)' },
      tags: { type: 'string', description: 'Метки через запятую, например «java,десериализация,rce»' },
      created_by: { type: 'string', description: 'Какая роль/агент это накопил' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args) {
      /* engagement 这个参数名在本工具里表示"Исходный таргет"，不是"К какому таргету относится"，
         所以不能走 resolveEngagement；只做名称补全，把 id 与中文名都记下来便于面板归类。 */
      const payload = Object.assign({}, args)
      if (typeof args.engagement === 'string' && args.engagement.trim() !== '') {
        const wanted = args.engagement.trim()
        const hit = store.listEngagements().find((e) => e.id === wanted || String(e.name) === wanted || String(e.name).includes(wanted))
        payload.engagement_id = hit ? hit.id : wanted
        payload.engagement_name = hit ? hit.name : wanted
      }
      const r = store.savePoc(payload)
      const stats = store.pocStats()
      return JSON.stringify({
        ok: true, created: r.created, code: r.poc.code, path: r.path,
        category: r.poc.category, engagement: r.poc.engagement_name || r.poc.engagement_id || null,
        asset_target: r.poc.asset_target || null, created_at: r.poc.created_at,
        verified: r.poc.verified === 1,
        hint: 'Добавлено в базу знаний (категория: ' + (r.poc.category || 'other') + ', время создания: ' + r.poc.created_at + '), '
          + 'агенты любого таргета позже найдут это через redteam_poc_search; всего в базе знаний ' + stats.total + ' записей.',
      }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_poc_list',
    description: 'Показать POC/EXP в базе знаний (можно фильтровать по kind/source/component/verified; без условий — всё). Нужно, чтобы понять «Какие готовые средства у нас уже есть» и не собирать одно и то же дважды.',
    parameters: {
      kind: { type: 'string' }, source: { type: 'string' }, component: { type: 'string' },
      verified: { type: 'boolean' }, limit: { type: 'number' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args) {
      const items = store.searchPocs(args)
      const stats = store.pocStats()
      return JSON.stringify({ ok: true, stats: { total: stats.total, verified: stats.verified, by_kind: stats.byKind, by_source: stats.bySource },
        count: items.length,
        items: items.map((x) => ({ id: x.id, code: x.code, title: x.title, kind: x.kind, cve: x.cve, component: x.component,
          language: x.language, source: x.source, verified: x.verified === 1, hit_count: x.hit_count, tags: x.tags })) }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_poc_update',
    description: 'Обновить запись базы знаний: дополнить вывод проверки (verified + verified_note), исправить затронутые версии, добавить использование или текст, изменить метки. **После успешной проверки на реальной цели обязательно вернитесь, выставьте verified=true и напишите понятные доказательства** — последующие агенты в первую очередь берут проверенное.',
    parameters: {
      id: { type: 'number', description: 'id записи базы знаний' },
      code: { type: 'string', description: 'Или укажите запись через code' },
      patch: {
        type: 'object', additionalProperties: true,
        description: '{ verified, verified_note, versions, usage, description, content, tags, severity, component, cve, source, source_url, language }',
      },
      verified: { type: 'boolean', description: 'Удобная форма: передать verified напрямую' },
      verified_note: { type: 'string', description: 'Удобная форма: передать доказательства проверки напрямую' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args) {
      const patch = Object.assign({}, args.patch || {})
      if (args.verified !== undefined) patch.verified = args.verified
      if (args.verified_note !== undefined) patch.verified_note = args.verified_note
      const row = store.updatePoc(args.id !== undefined ? args.id : args.code, patch)
      return JSON.stringify({ ok: true, id: row.id, code: row.code, verified: row.verified === 1, verified_note: row.verified_note, updated_at: row.updated_at }, null, 2)
    },
  })))

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_poc_use',
    description: 'Отметить повторное применение POC/EXP из базы знаний (на какой цели/объекте). Записи с большим числом применений идут выше, чтобы следующие брали проверенное в бою.',
    parameters: {
      id: { type: 'number' },
      code: { type: 'string' },
      used_on: { type: 'string', description: 'Где применено: название цели / IP объекта / URL' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args) {
      const r = store.markPocUsed(args.id !== undefined ? args.id : args.code, args.used_on)
      return JSON.stringify(r, null, 2)
    },
  })))

  /* ================================================================== 资产发现时间线 */

  ctx.tools.register(withStructuredErrors(defineTool({
    name: 'redteam_asset_timeline',
    description: 'Представление «время обнаружения» активов: агрегация по дням «Сколько активов собрано по дням» (с разделением внутренняя/внешняя сеть) и список последних найденных активов. Нужно, чтобы ответить «Когда обнаружен этот актив», проверить, нет ли провалов в разведке, а также сверить итоги текущего сбора.',
    parameters: {
      engagement: { type: 'string' },
      limit: { type: 'number', description: 'Сколько последних активов показать, по умолчанию 50' },
    },
    output: { schema: { type: 'string' }, render: (_args, value) => text(value) },
    async execute(args, exec) {
      const id = resolveEngagement(store, exec, args.engagement)
      const data = store.discoveryTimeline(id, { limit: args.limit })
      return JSON.stringify({
        ok: true, engagement: id,
        span: data.span,
        days: data.days,
        recent: data.recent.map((a) => ({
          id: a.id, ip: a.ip, scope: a.scope, state: a.state, name: a.primary_name,
          discovered_at: a.discovered_at, last_seen: a.last_seen, open_ports: a.open_ports, priority: a.priority,
        })),
        hint: 'Время обнаружения = момент, когда актив **впервые попал в эту базу**; повторный сбор обновляет только last_seen.'
          + 'По нему сортируются приложение к отчёту и страница «Карта активов».',
      }, null, 2)
    },
  })))
}
