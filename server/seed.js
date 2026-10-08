// One-time import of the site's built-in data into server/data/content.json.
// Usage: npm run server:seed            (refuses to overwrite existing content)
//        npm run server:seed -- --force (overwrites; the old file is backed up)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectsData } from '../src/data/projectsData.js';
import { certificatesData } from '../src/data/certificatesData.js';
import { portfolioCategories } from '../src/data/portfolioCategories.js';

const serverDir = path.dirname(fileURLToPath(import.meta.url));
if (fs.existsSync(path.join(serverDir, '.env'))) process.loadEnvFile(path.join(serverDir, '.env'));
const dataDir = path.resolve(serverDir, process.env.DATA_DIR || 'data');
const contentFile = path.join(dataDir, 'content.json');
const force = process.argv.includes('--force');

if (fs.existsSync(contentFile) && !force) {
  console.error(`${contentFile} already exists. Use --force to overwrite it (a backup is kept).`);
  process.exit(1);
}

fs.mkdirSync(dataDir, { recursive: true });
if (fs.existsSync(contentFile)) {
  fs.mkdirSync(path.join(dataDir, 'backups'), { recursive: true });
  fs.copyFileSync(contentFile, path.join(dataDir, 'backups', `content-before-seed-${Date.now()}.json`));
}

const content = {
  projects: projectsData,
  portfolioCategories,
  certificates: certificatesData,
  site: {},
  updatedAt: new Date().toISOString(),
};
fs.writeFileSync(contentFile, JSON.stringify(content, null, 2));
console.log(`Seeded ${Object.keys(projectsData).length} projects and ${certificatesData.length} certificates into ${contentFile}`);
