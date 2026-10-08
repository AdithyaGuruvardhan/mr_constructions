import crypto from 'node:crypto';
import { config } from './config.js';
import { verifyPassword } from './password.js';

const COOKIE = 'mrc_admin';

function sign(value) {
  return crypto.createHmac('sha256', config.sessionSecret).update(value).digest('base64url');
}

function createToken(user) {
  const payload = Buffer.from(JSON.stringify({ u: user, exp: Date.now() + config.sessionHours * 3600_000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

function getCookie(req, name) {
  const header = req.headers.cookie || '';
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

const cookieOptions = () => ({
  httpOnly: true,
  sameSite: 'strict',
  secure: config.isProduction,
  path: '/api',
});

// Simple in-memory brute-force guard: 5 failed attempts per IP per 15 minutes.
const failures = new Map();
const WINDOW_MS = 15 * 60_000;
const MAX_FAILURES = 5;

function isLockedOut(ip) {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(ip) {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.first > WINDOW_MS) failures.set(ip, { first: Date.now(), count: 1 });
  else entry.count++;
}

export function login(req, res) {
  const ip = req.ip;
  if (isLockedOut(ip)) return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });

  const { username, password } = req.body || {};
  const ok = typeof username === 'string' && typeof password === 'string'
    && username === config.adminUser
    && verifyPassword(password, config.adminPasswordHash);

  if (!ok) {
    recordFailure(ip);
    return res.status(401).json({ error: 'Incorrect username or password.' });
  }
  failures.delete(ip);
  res.cookie(COOKIE, createToken(username), { ...cookieOptions(), maxAge: config.sessionHours * 3600_000 });
  res.json({ user: username });
}

export function logout(req, res) {
  res.clearCookie(COOKIE, cookieOptions());
  res.json({ ok: true });
}

export function me(req, res) {
  const session = readToken(getCookie(req, COOKIE));
  if (!session) return res.status(401).json({ error: 'Not logged in' });
  res.json({ user: session.u });
}

// Mutating admin requests need a valid session cookie plus a custom header.
// Browsers won't attach custom headers cross-site without a CORS preflight
// (which this server never approves), so the header doubles as CSRF protection.
export function requireAdmin(req, res, next) {
  if (req.get('X-MRC-Admin') !== '1') return res.status(403).json({ error: 'Forbidden' });
  const session = readToken(getCookie(req, COOKIE));
  if (!session) return res.status(401).json({ error: 'Session expired. Please log in again.' });
  req.adminUser = session.u;
  next();
}
