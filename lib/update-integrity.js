// Legacy source archives have no publisher SHA256SUMS. Pin the commit first,
// then verify every file against GitHub's Git tree, before copying any code.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fetchJson, UPSTREAM_REPO } from './update-net.js';
const shaPattern = /^[0-9a-f]{40}$/i;
export async function sourceManifest(ref, { json = fetchJson, ms = 45000 } = {}) {
  const base = `https://api.github.com/repos/${UPSTREAM_REPO}`;
  const commit = await json(`${base}/commits/${encodeURIComponent(ref)}`, ms);
  if (!shaPattern.test(commit?.sha || '') || !shaPattern.test(commit?.commit?.tree?.sha || ''))
    throw Error('Не удалось проверить upstream commit/tree; ничего не скачано и не установлено');
  if (shaPattern.test(ref) && ref.toLowerCase() !== commit.sha.toLowerCase()) throw Error('upstream commit не совпадает');
  const tree = await json(`${base}/git/trees/${commit.commit.tree.sha}?recursive=1`, ms);
  if (tree?.truncated || tree?.sha !== commit.commit.tree.sha || !Array.isArray(tree.tree) || !tree.tree.length)
    throw Error('upstream Git tree неполный; установка не выполнена');
  const files = new Map();
  for (const entry of tree.tree) {
    const rel = entry.path;
    if (typeof rel !== 'string' || !rel || /[\\\x00-\x1f:]/.test(rel) || rel.split('/').some(x => !x || x === '.' || x === '..'))
      throw Error('недействительный путь в upstream Git tree');
    if (entry.type === 'tree' && entry.mode === '040000') continue;
    if (entry.type !== 'blob' || !['100644','100755'].includes(entry.mode) || !shaPattern.test(entry.sha) || files.has(rel))
      throw Error('upstream Git tree содержит неподдерживаемые типы файлов или дубликаты; установка не выполнена');
    files.set(rel, entry);
  }
  if (!files.has('package.json')) throw Error('в upstream Git tree отсутствует package.json');
  return { sha: commit.sha, files };
}
export function verifySourceTree(root, manifest) {
  const seen = new Set();
  function visit(dir, prefix = '') {
    for (const name of fs.readdirSync(dir)) {
      const rel = prefix + name, file = path.join(dir, name), stat = fs.lstatSync(file);
      if (stat.isDirectory()) { visit(file, rel + '/'); continue; }
      if (!stat.isFile()) throw Error(`в архиве не обычный файл: ${rel}`);
      const entry = manifest.files.get(rel);
      if (!entry) throw Error(`в архиве незарегистрированный файл: ${rel}`);
      const bytes = fs.readFileSync(file);
      const hash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
      if (hash !== entry.sha) throw Error(`проверка целостности архива не пройдена: ${rel}`);
      seen.add(rel);
      if (process.platform !== 'win32') fs.chmodSync(file, entry.mode === '100755' ? 0o755 : 0o644);
    }
  }
  visit(root);
  for (const file of manifest.files.keys()) if (!seen.has(file)) throw Error(`в архиве отсутствует файл: ${file}`);
  return { sha: manifest.sha, verifiedFiles: seen.size, method: 'github-git-tree' };
}
