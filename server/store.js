import fs from 'node:fs';
import path from 'node:path';
import { config } from './config.js';

const contentFile = path.join(config.dataDir, 'content.json');
const backupDir = path.join(config.dataDir, 'backups');
const MAX_BACKUPS = 50;

let cache = null;

export function readContent() {
  if (!cache) {
    if (!fs.existsSync(contentFile)) {
      throw new Error(`No content file at ${contentFile}. Run "npm run server:seed" first.`);
    }
    cache = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
  }
  return cache;
}

// Writes are serialized through this function: back up the current file, then
// write to a temp file and rename so a crash never leaves half-written JSON.
export function writeContent(next) {
  fs.mkdirSync(backupDir, { recursive: true });
  if (fs.existsSync(contentFile)) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(contentFile, path.join(backupDir, `content-${stamp}.json`));
    pruneBackups();
  }
  next.updatedAt = new Date().toISOString();
  const tmp = `${contentFile}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(next, null, 2));
  fs.renameSync(tmp, contentFile);
  cache = next;
  return next;
}

export function updateContent(mutator) {
  const draft = structuredClone(readContent());
  mutator(draft);
  return writeContent(draft);
}

function pruneBackups() {
  const files = fs.readdirSync(backupDir).filter(f => f.startsWith('content-')).sort();
  for (const f of files.slice(0, Math.max(0, files.length - MAX_BACKUPS))) {
    fs.unlinkSync(path.join(backupDir, f));
  }
}
