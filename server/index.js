import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { config } from './config.js';
import { readContent, updateContent } from './store.js';
import { login, logout, me, requireAdmin } from './auth.js';

const app = express();
app.set('trust proxy', 'loopback'); // behind nginx on the same machine
app.disable('x-powered-by');
app.use(express.json({ limit: '2mb' }));

const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,40}$/i;

// ---------- Public ----------

app.get('/api/content', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.json(readContent());
});

app.use('/uploads', express.static(config.uploadDir, { maxAge: '30d', immutable: true }));

// ---------- Auth ----------

app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.get('/api/auth/me', me);

// ---------- Admin ----------

const admin = express.Router();
admin.use(requireAdmin);

admin.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = req.body;
  if (!ID_PATTERN.test(id)) return res.status(400).json({ error: 'Project ID may only contain letters, numbers and dashes.' });
  if (!project || typeof project !== 'object' || !project.title?.trim()) {
    return res.status(400).json({ error: 'Project title is required.' });
  }
  const content = updateContent(c => { c.projects[id] = { ...project, id }; });
  res.json(content.projects[id]);
});

admin.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  updateContent(c => {
    delete c.projects[id];
    for (const cat of c.portfolioCategories) cat.projects = cat.projects.filter(p => p.id !== id);
    for (const cert of c.certificates) {
      if (cert.projectId === id) delete cert.projectId;
      if (cert.projectIds) cert.projectIds = cert.projectIds.filter(p => p !== id);
    }
  });
  res.json({ ok: true });
});

admin.put('/portfolio-categories', (req, res) => {
  const cats = req.body;
  const valid = Array.isArray(cats) && cats.every(c =>
    typeof c.category === 'string' && c.category.trim() && Array.isArray(c.projects)
    && c.projects.every(p => typeof p.id === 'string' && typeof p.title === 'string'));
  if (!valid) return res.status(400).json({ error: 'Invalid categories.' });
  const content = updateContent(c => { c.portfolioCategories = cats; });
  res.json(content.portfolioCategories);
});

admin.put('/certificates/:id', (req, res) => {
  const id = Number(req.params.id);
  const cert = req.body;
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid certificate ID.' });
  if (!cert?.projectName?.trim()) return res.status(400).json({ error: 'Project name is required.' });
  const content = updateContent(c => {
    const idx = c.certificates.findIndex(x => x.id === id);
    if (idx === -1) c.certificates.push({ ...cert, id });
    else c.certificates[idx] = { ...cert, id };
  });
  res.json(content.certificates.find(x => x.id === id));
});

admin.delete('/certificates/:id', (req, res) => {
  const id = Number(req.params.id);
  updateContent(c => { c.certificates = c.certificates.filter(x => x.id !== id); });
  res.json({ ok: true });
});

admin.put('/certificates-order', (req, res) => {
  const ids = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'Expected a list of IDs.' });
  const content = updateContent(c => {
    const byId = new Map(c.certificates.map(x => [x.id, x]));
    const ordered = ids.map(id => byId.get(id)).filter(Boolean);
    const rest = c.certificates.filter(x => !ids.includes(x.id));
    c.certificates = [...ordered, ...rest];
  });
  res.json(content.certificates.map(x => x.id));
});

// Saves everything edited on the live site in one go (one backup per save).
// `site` maps element keys to their new value; null resets an element to its original content.
admin.post('/save', (req, res) => {
  const { site = {}, projects = {}, portfolioCategories, certificates = {} } = req.body || {};
  if (typeof site !== 'object' || Array.isArray(site)) return res.status(400).json({ error: 'Invalid page edits.' });
  for (const [id, p] of Object.entries(projects)) {
    if (!ID_PATTERN.test(id) || !p?.title?.trim()) return res.status(400).json({ error: `Project "${id}" needs a title.` });
  }
  for (const [id, cert] of Object.entries(certificates)) {
    if (!Number.isInteger(Number(id)) || !cert?.projectName?.trim()) return res.status(400).json({ error: 'Each certificate needs a project name.' });
  }
  if (portfolioCategories !== undefined && !Array.isArray(portfolioCategories)) return res.status(400).json({ error: 'Invalid categories.' });

  const content = updateContent(c => {
    c.site ??= {};
    for (const [key, value] of Object.entries(site)) {
      if (value === null) delete c.site[key];
      else c.site[key] = value;
    }
    for (const [id, p] of Object.entries(projects)) c.projects[id] = { ...p, id };
    if (portfolioCategories) c.portfolioCategories = portfolioCategories;
    for (const [id, cert] of Object.entries(certificates)) {
      const idx = c.certificates.findIndex(x => x.id === Number(id));
      if (idx !== -1) c.certificates[idx] = { ...cert, id: Number(id) };
    }
  });
  res.json({ updatedAt: content.updatedAt });
});

// Images are re-encoded as WebP (max 2560px wide) so uploads straight from a
// phone or camera don't bloat the site.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024, files: 20 },
  fileFilter: (req, file, cb) => cb(null, /^image\/(jpeg|png|webp|gif|avif|heic|heif|tiff)$/.test(file.mimetype)),
});

admin.post('/upload', upload.array('files'), async (req, res) => {
  const folder = String(req.body.folder || 'misc').toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 40) || 'misc';
  const dir = path.join(config.uploadDir, folder);
  fs.mkdirSync(dir, { recursive: true });

  if (!req.files?.length) return res.status(400).json({ error: 'No supported image files received.' });

  try {
    const urls = [];
    for (const file of req.files) {
      const base = path.parse(file.originalname).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'image';
      const name = `${base}-${crypto.randomBytes(3).toString('hex')}.webp`;
      await sharp(file.buffer)
        .rotate()
        .resize({ width: 2560, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(dir, name));
      urls.push(`/uploads/${folder}/${name}`);
    }
    res.json({ urls });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Could not process one of the images. Try a JPG or PNG.' });
  }
});

app.use('/api/admin', admin);

app.use((err, req, res, _next) => {
  if (err instanceof multer.MulterError) return res.status(400).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(config.port, '127.0.0.1', () => {
  console.log(`MRC admin API listening on http://127.0.0.1:${config.port}`);
});
