import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { api } from './api';
import { setAdminFlag, useSiteContent } from '../content/ContentContext';
import { Button, Field, inputClass, TextField } from './fields';
import ProjectsPage from './ProjectsPage';
import ProjectEditor from './ProjectEditor';
import CertificatesPage from './CertificatesPage';
import CertificateEditor from './CertificateEditor';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { user } = await api.login(username, password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* The logo file has lots of blank space around it, so crop to the wordmark */}
        <div className="mx-auto w-24 overflow-hidden" style={{ aspectRatio: '982 / 336' }}>
          <img src="/mrc_blue_logo.png" alt="MR Constructions" className="h-full w-full object-cover" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Admin sign in</h1>
        <TextField label="Username" value={username} onChange={setUsername} autoComplete="username" autoFocus />
        <Field label="Password">
          <div className="relative">
            <input
              className={`${inputClass} pr-16`}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute inset-y-0 right-0 px-3 text-sm font-medium text-[#2c52a1] hover:text-[#23428a]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </Field>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={busy || !username || !password}>{busy ? 'Signing in…' : 'Sign in'}</Button>
      </form>
    </div>
  );
}

const navLinks = [
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/certificates', label: 'Certificates' },
];

export default function AdminApp() {
  const [user, setUser] = useState(undefined);
  const { checkAdmin } = useSiteContent();

  // Remember the login so the live site shows the edit bar
  useEffect(() => {
    if (user === undefined) return;
    setAdminFlag(!!user);
    checkAdmin();
  }, [user, checkAdmin]);

  useEffect(() => {
    document.title = 'Admin · MR Constructions';
    api.me().then(d => setUser(d.user)).catch(() => setUser(null));
  }, []);

  if (user === undefined) return null;
  if (!user) return <Login onLogin={setUser} />;

  const logout = async () => {
    await api.logout().catch(() => {});
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-8">
          <img src="/mrc_blue_logo.png" alt="MR Constructions" className="h-8" />
          <nav className="order-last flex w-full gap-1 overflow-x-auto md:order-none md:w-auto">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${isActive ? 'bg-[#2c52a1]/10 text-[#2c52a1]' : 'text-gray-600 hover:bg-gray-100'}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href="/" className="rounded-lg bg-[#2c52a1] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#23428a]">✏️ Edit the website</a>
            <Button variant="ghost" onClick={logout}>Sign out</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <Routes>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/new" element={<ProjectEditor isNew />} />
          <Route path="projects/:id" element={<ProjectEditor />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="certificates/new" element={<CertificateEditor isNew />} />
          <Route path="certificates/:id" element={<CertificateEditor />} />
          <Route path="*" element={<Navigate to="projects" replace />} />
        </Routes>
      </main>
    </div>
  );
}
