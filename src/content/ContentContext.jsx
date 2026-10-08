import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { projectsData, getProjectData } from '../data/projectsData';
import { certificatesData } from '../data/certificatesData';
import { portfolioCategories } from '../data/portfolioCategories';

// The bundled data is the first render and the fallback if the API is unreachable,
// so the public site never depends on the admin server being up.
const bundled = {
  projects: projectsData,
  portfolioCategories,
  certificates: certificatesData,
  site: {},
};

const emptyDraft = () => ({ site: {}, projects: {}, portfolioCategories: undefined, certificates: {} });

// Flag set when the admin logs in, so ordinary visitors never hit /api/auth/me
const ADMIN_FLAG = 'mrc_admin';
const readFlag = () => { try { return localStorage.getItem(ADMIN_FLAG) === '1'; } catch { return false; } };
export const setAdminFlag = (on) => { try { if (on) localStorage.setItem(ADMIN_FLAG, '1'); else localStorage.removeItem(ADMIN_FLAG); } catch { /* storage unavailable */ } };

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(bundled);
  // True once content has come from the API (the admin panel waits for this)
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // Unsaved edits made on the live site; merged over the saved content below
  const [draft, setDraft] = useState(emptyDraft);

  const reload = useCallback(async () => {
    try {
      const res = await fetch('/api/content', { cache: 'no-cache' });
      if (!res.ok) return;
      const data = await res.json();
      setContent({
        projects: data.projects ?? bundled.projects,
        portfolioCategories: data.portfolioCategories ?? bundled.portfolioCategories,
        certificates: data.certificates ?? bundled.certificates,
        site: data.site ?? {},
      });
      setLoaded(true);
    } catch {
      // Keep the bundled content
    }
  }, []);

  const checkAdmin = useCallback(async () => {
    if (!readFlag()) { setIsAdmin(false); return; }
    try {
      const res = await fetch('/api/auth/me');
      setIsAdmin(res.ok);
      if (!res.ok) setAdminFlag(false);
    } catch {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => { reload(); checkAdmin(); }, [reload, checkAdmin]);

  const merged = useMemo(() => {
    const site = { ...content.site };
    for (const [k, v] of Object.entries(draft.site)) {
      if (v === null) delete site[k]; else site[k] = v;
    }
    return {
      site,
      projects: { ...content.projects, ...draft.projects },
      portfolioCategories: draft.portfolioCategories ?? content.portfolioCategories,
      certificates: content.certificates.map(c => draft.certificates[c.id] ?? c),
    };
  }, [content, draft]);

  const changeCount = Object.keys(draft.site).length + Object.keys(draft.projects).length
    + Object.keys(draft.certificates).length + (draft.portfolioCategories ? 1 : 0);

  const edits = useMemo(() => ({
    setField: (key, value) => setDraft(d => ({ ...d, site: { ...d.site, [key]: value } })),
    setProject: (id, project) => setDraft(d => ({ ...d, projects: { ...d.projects, [id]: project } })),
    setCategories: (cats) => setDraft(d => ({ ...d, portfolioCategories: cats })),
    setCertificate: (id, cert) => setDraft(d => ({ ...d, certificates: { ...d.certificates, [id]: cert } })),
    discard: () => setDraft(emptyDraft()),
  }), []);

  const save = useCallback(async () => {
    const res = await fetch('/api/admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-MRC-Admin': '1' },
      body: JSON.stringify(draft),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Save failed (${res.status})`);
    await reload();
    setDraft(emptyDraft());
  }, [draft, reload]);

  const value = {
    ...merged,
    loaded,
    reload,
    isAdmin,
    checkAdmin,
    editMode: isAdmin && editMode,
    setEditMode,
    changeCount,
    save,
    ...edits,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export const useSiteContent = () => useContext(ContentContext);

export function useProject(id) {
  const { projects } = useSiteContent();
  return projects[id] ?? getProjectData(id);
}
