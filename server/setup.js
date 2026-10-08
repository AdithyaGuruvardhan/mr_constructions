// Creates server/.env with the admin login and a random session secret.
// Usage: npm run server:setup -- <username> <password>
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { hashPassword } from './password.js';

const [username, password] = process.argv.slice(2);
if (!username || !password) {
  console.error('Usage: npm run server:setup -- <username> <password>');
  process.exit(1);
}
if (password.length < 8) {
  console.error('Use a password of at least 8 characters.');
  process.exit(1);
}

const envFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env');
const existing = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf8') : '';
const keep = existing.split('\n').filter(l => l && !/^(ADMIN_USER|ADMIN_PASSWORD_HASH|SESSION_SECRET)=/.test(l));

const lines = [
  ...keep,
  `ADMIN_USER=${username}`,
  `ADMIN_PASSWORD_HASH=${hashPassword(password)}`,
  `SESSION_SECRET=${crypto.randomBytes(32).toString('hex')}`,
];
fs.writeFileSync(envFile, lines.join('\n') + '\n', { mode: 0o600 });
console.log(`Wrote ${envFile}. Restart the server for the new login to take effect.`);
