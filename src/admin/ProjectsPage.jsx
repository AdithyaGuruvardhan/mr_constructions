import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../content/ContentContext';
import { api } from './api';
import { Button, inputClass, Loading } from './fields';

export default function ProjectsPage() {
  const { projects, portfolioCategories, loaded, reload } = useSiteContent();
  const [status, setStatus] = useState({ saving: false, error: '' });
  const [newCategory, setNewCategory] = useState('');
  const [renaming, setRenaming] = useState(null); // { index, name }

  if (!loaded) return <Loading />;

  // Changes on this page save immediately
  const saveCats = async (next) => {
    setStatus({ saving: true, error: '' });
    try {
      await api.saveCategories(next);
      await reload();
      setStatus({ saving: false, error: '' });
    } catch (err) {
      setStatus({ saving: false, error: err.message });
    }
  };

  const cats = portfolioCategories;
  const update = (fn) => { const next = structuredClone(cats); fn(next); saveCats(next); };
  const swap = (arr, i, j) => { [arr[i], arr[j]] = [arr[j], arr[i]]; };

  const listedIds = new Set(cats.flatMap(c => c.projects.map(p => p.id)));
  const unlisted = Object.values(projects).filter(p => !listedIds.has(p.id));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">Categories and their order are exactly as shown on the Portfolio page. Reordering saves right away.</p>
        </div>
        <Link to="/admin/projects/new"><Button>+ New project</Button></Link>
      </div>

      {status.error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{status.error}</p>}

      <div className={`space-y-6 ${status.saving ? 'pointer-events-none opacity-60' : ''}`}>
        {cats.map((cat, ci) => (
          <section key={ci} className="rounded-2xl border border-gray-200 bg-white">
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-4 py-3">
              {renaming?.index === ci ? (
                <form className="flex flex-1 gap-2" onSubmit={e => { e.preventDefault(); if (renaming.name.trim()) update(c => { c[ci].category = renaming.name.trim(); }); setRenaming(null); }}>
                  <input className={inputClass} value={renaming.name} onChange={e => setRenaming({ index: ci, name: e.target.value })} autoFocus />
                  <Button type="submit">Save</Button>
                  <Button variant="ghost" onClick={() => setRenaming(null)}>Cancel</Button>
                </form>
              ) : (
                <>
                  <h2 className="flex-1 font-semibold">{cat.category} <span className="font-normal text-gray-400">({cat.projects.length})</span></h2>
                  <Button variant="ghost" onClick={() => setRenaming({ index: ci, name: cat.category })}>Rename</Button>
                  <Button variant="ghost" disabled={ci === 0} onClick={() => update(c => swap(c, ci, ci - 1))} aria-label="Move category up">↑</Button>
                  <Button variant="ghost" disabled={ci === cats.length - 1} onClick={() => update(c => swap(c, ci, ci + 1))} aria-label="Move category down">↓</Button>
                  <Button variant="ghost" className="text-red-600" onClick={() => {
                    if (cat.projects.length && !confirm(`Delete the "${cat.category}" category? Its ${cat.projects.length} projects won't be deleted, just hidden from the Portfolio page.`)) return;
                    update(c => c.splice(ci, 1));
                  }}>Delete</Button>
                </>
              )}
            </div>
            {cat.projects.length === 0 ? (
              <p className="px-4 py-6 text-sm text-gray-500">No projects in this category yet. Open a project and choose this category to add it.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cat.projects.map((card, pi) => (
                  <li key={card.id} className="flex items-center gap-3 px-4 py-2.5">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                      {card.img && <img src={card.img} alt="" className="h-full w-full object-cover" loading="lazy" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{card.title}</p>
                      <p className="truncate text-xs text-gray-500">{card.subtitle || '—'}{!projects[card.id] && <span className="ml-2 text-amber-700">(no project page)</span>}</p>
                    </div>
                    <Button variant="ghost" disabled={pi === 0} onClick={() => update(c => swap(c[ci].projects, pi, pi - 1))} aria-label="Move up">↑</Button>
                    <Button variant="ghost" disabled={pi === cat.projects.length - 1} onClick={() => update(c => swap(c[ci].projects, pi, pi + 1))} aria-label="Move down">↓</Button>
                    <Link to={`/admin/projects/${card.id}`}><Button variant="secondary">Edit</Button></Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (!newCategory.trim()) return; update(c => c.push({ category: newCategory.trim(), projects: [] })); setNewCategory(''); }}>
          <input className={`${inputClass} max-w-xs`} placeholder="New category name" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
          <Button type="submit" variant="secondary" disabled={!newCategory.trim()}>Add category</Button>
        </form>

        {unlisted.length > 0 && (
          <section className="rounded-2xl border border-dashed border-gray-300 bg-white">
            <div className="border-b border-gray-100 px-4 py-3">
              <h2 className="font-semibold">Not on the Portfolio page</h2>
              <p className="text-xs text-gray-500">These project pages exist but aren't listed in any category.</p>
            </div>
            <ul className="divide-y divide-gray-100">
              {unlisted.map(p => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {p.heroBg && <img src={p.heroBg} alt="" className="h-full w-full object-cover" loading="lazy" />}
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm font-medium">{p.title} <span className="text-xs font-normal text-gray-400">({p.id})</span></p>
                  <Link to={`/admin/projects/${p.id}`}><Button variant="secondary">Edit</Button></Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
