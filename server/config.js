import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDir = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(serverDir, '.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const isProduction = process.env.NODE_ENV === 'production';

export const config = {
  isProduction,
  port: Number(process.env.PORT) || 3001,
  dataDir: path.resolve(serverDir, process.env.DATA_DIR || 'data'),
  uploadDir: path.resolve(serverDir, process.env.UPLOAD_DIR || 'uploads'),
  adminUser: process.env.ADMIN_USER || 'admin',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
  sessionSecret: process.env.SESSION_SECRET || '',
  sessionHours: Number(process.env.SESSION_HOURS) || 12,
};

if (!config.adminPasswordHash || !config.sessionSecret) {
  console.error('Missing ADMIN_PASSWORD_HASH or SESSION_SECRET. Run "npm run server:setup" to create server/.env.');
  process.exit(1);
}
