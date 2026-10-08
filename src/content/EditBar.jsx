import React, { useEffect, useState } from 'react';
import { useSiteContent } from './ContentContext';

// Floating bar shown on the live site to a logged-in admin.
export default function EditBar() {
  const { isAdmin, editMode, setEditMode, changeCount, save, discard } = useSiteContent();
  const [status, setStatus] = useState({ saving: false, error: '', saved: false });

  useEffect(() => {
    document.body.classList.toggle('mrc-edit', editMode);
    return () => document.body.classList.remove('mrc-edit');
  }, [editMode]);

  useEffect(() => {
    if (!changeCount) return;
    const handler = (e) => { e.preventDefault(); };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [changeCount]);

  if (!isAdmin) return null;

  const onSave = async () => {
    // Commit any text still being typed before saving
    if (document.activeElement?.isContentEditable) document.activeElement.blur();
    await new Promise(r => setTimeout(r, 0));
    setStatus({ saving: true, error: '', saved: false });
    try {
      await save();
      setStatus({ saving: false, error: '', saved: true });
      setTimeout(() => setStatus(s => ({ ...s, saved: false })), 2500);
    } catch (err) {
      setStatus({ saving: false, error: err.message, saved: false });
    }
  };

  const onDiscard = () => {
    if (confirm(`Discard ${changeCount} unsaved change${changeCount === 1 ? '' : 's'}?`)) discard();
  };

  return (
    <div className="mrc-edit-bar fixed bottom-4 left-1/2 z-[10000] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl bg-[#1c1c1e] px-3 py-2 font-sans text-sm text-white shadow-2xl">
      <button
        type="button"
        onClick={() => setEditMode(!editMode)}
        className={`rounded-lg px-3 py-1.5 font-medium ${editMode ? 'bg-[#2c52a1]' : 'bg-white/10 hover:bg-white/20'}`}
      >
        {editMode ? '✏️ Editing — click to stop' : '✏️ Edit this page'}
      </button>
      {changeCount > 0 && (
        <>
          <span className="px-1 text-amber-300">{changeCount} unsaved</span>
          <button type="button" onClick={onDiscard} className="rounded-lg px-3 py-1.5 text-gray-300 hover:bg-white/10">Discard</button>
          <button type="button" onClick={onSave} disabled={status.saving} className="rounded-lg bg-green-600 px-3 py-1.5 font-medium hover:bg-green-700 disabled:opacity-60">
            {status.saving ? 'Saving…' : 'Save'}
          </button>
        </>
      )}
      {status.saved && <span className="px-1 text-green-400">Saved ✓</span>}
      {status.error && <span className="max-w-xs px-1 text-red-300">{status.error}</span>}
      <a href="/admin" className="rounded-lg px-3 py-1.5 text-gray-300 hover:bg-white/10">Admin</a>
    </div>
  );
}
