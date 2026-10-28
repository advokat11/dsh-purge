// Runtime probe: prove that the prompt path actually reaches the model.
//
// 文件被打上补丁、section 被注册，只能证明"Готово на стороне хоста"；真正要验证的是
// "Модель получила"。做法：写入一个一次性 nonce，并在系统提示词末尾挂一段
// "если увидишь его, верни этот nonce как есть"的短指令。模型回显 = 这条链路真的通了。
import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { findDshHome } from "./core.js";

export const PROBE_SECTION = "dsh-purge:probe";
export const PROBE_TTL_MS = 30 * 60 * 1000;

function probePath(dshHome) {
  const home = dshHome || findDshHome();
  if (!home) return "";
  return path.join(home, "dsh-purge", "probe.json");
}

export function readProbe(dshHome) {
  const file = probePath(dshHome);
  if (!file) return null;
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!data || typeof data.nonce !== "string" || !data.nonce) return null;
    const at = Number(data.at) || 0;
    if (!at || Date.now() - at > PROBE_TTL_MS) {
      try {
        fs.rmSync(file, { force: true });
      } catch {
        /* ignore */
      }
      return null;
    }
    return { nonce: data.nonce, at };
  } catch {
    return null;
  }
}

export function createProbe(dshHome) {
  const file = probePath(dshHome);
  if (!file) throw new Error("Каталог данных DSH не найден, пробник записать нельзя");
  const nonce = "purge-" + randomBytes(4).toString("hex");
  const at = Date.now();
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  fs.writeFileSync(file, JSON.stringify({ nonce, at }, null, 2), { mode: 0o600 });
  return { nonce, at, message: probeMessage(nonce) };
}

export function probeMessage(nonce) {
  return [
    "Выведите строку ниже как есть (не переписывайте, не объясняйте):",
    `[${nonce}]`,
    "",
    "Если она появится в вашем ответе как есть, значит инъекция purge действительно дошла до контекста модели.",
  ].join("\n");
}

/** 探针存活时注入的段落正文；过期返回空串。 */
export function probeText(dshHome) {
  const probe = readProbe(dshHome);
  if (!probe) return "";
  return [
    "<dsh_probe>",
    "Этот system prompt записан dsh-purge и служит проверкой, доходит ли инъекция до модели.",
    `Если этот фрагмент есть в вашем контексте, выведите в конце ответа отдельной строкой как есть: [${probe.nonce}]`,
    "</dsh_probe>",
  ].join("\n");
}
