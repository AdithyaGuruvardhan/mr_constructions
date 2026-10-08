import React, { useEffect, useRef, useState } from 'react';
import { api } from './api';

export const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#2c52a1] focus:outline-none focus:ring-2 focus:ring-[#2c52a1]/20';

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

export function TextField({ label, hint, value, onChange, placeholder, ...rest }) {
  return (
    <Field label={label} hint={hint}>
      <input className={inputClass} value={value ?? ''} placeholder={placeholder} onChange={e => onChange(e.target.value)} {...rest} />
    </Field>
  );
}

export function TextArea({ label, hint, value, onChange, rows = 4, placeholder }) {
  return (
    <Field label={label} hint={hint}>
      <textarea className={inputClass} rows={rows} value={value ?? ''} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </Field>
  );
}

export function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function Button({ variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-[#2c52a1] text-white hover:bg-[#23428a] disabled:opacity-50',
    secondary: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50',
    danger: 'border border-red-200 bg-white text-red-700 hover:bg-red-50 disabled:opacity-50',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-40',
  };
  return <button type="button" className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${styles[variant]} ${className}`} {...props} />;
}

function useUploader(folder, onUploaded) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pick = () => inputRef.current?.click();
  const onFiles = async (e) => {
    const files = [...e.target.files];
    e.target.value = '';
    if (!files.length) return;
    setBusy(true);
    setError('');
    try {
      const { urls } = await api.upload(files, folder);
      onUploaded(urls);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return { inputRef, busy, error, pick, onFiles };
}

// A single image: preview, upload a replacement, or type a path to an existing file.
export function ImageField({ label, hint, value, onChange, folder }) {
  const up = useUploader(folder, urls => onChange(urls[0]));
  return (
    <Field label={label} hint={hint}>
      <div className="flex gap-3">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          {value && <img src={value} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input className={inputClass} value={value ?? ''} placeholder="/path/to/image.webp" onChange={e => onChange(e.target.value)} />
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={up.pick} disabled={up.busy}>{up.busy ? 'Uploading…' : 'Upload image'}</Button>
            {up.error && <span className="text-xs text-red-600">{up.error}</span>}
          </div>
        </div>
      </div>
      <input ref={up.inputRef} type="file" accept="image/*" className="hidden" onChange={up.onFiles} />
    </Field>
  );
}

// An ordered list of images, for galleries.
export function ImageListField({ label, hint, value = [], onChange, folder }) {
  const up = useUploader(folder, urls => onChange([...value, ...urls]));
  const move = (i, d) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-2">
          {up.error && <span className="text-xs text-red-600">{up.error}</span>}
          <Button variant="secondary" onClick={up.pick} disabled={up.busy}>{up.busy ? 'Uploading…' : 'Add images'}</Button>
        </div>
      </div>
      {hint && <p className="mb-2 text-xs text-gray-500">{hint}</p>}
      {value.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">No images yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {value.map((src, i) => (
            <div key={`${src}-${i}`} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="relative aspect-[4/3] bg-gray-100">
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 text-xs text-white">{i + 1}</span>
              </div>
              <div className="flex items-center justify-between px-1 py-1">
                <div className="flex">
                  <Button variant="ghost" className="!px-2" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier">←</Button>
                  <Button variant="ghost" className="!px-2" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move later">→</Button>
                </div>
                <Button variant="ghost" className="!px-2 text-red-600" onClick={() => onChange(value.filter((_, j) => j !== i))}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <input ref={up.inputRef} type="file" accept="image/*" multiple className="hidden" onChange={up.onFiles} />
    </div>
  );
}

export function SaveBar({ dirty, saving, message, error, onSave, children }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
      <div className="flex flex-wrap items-center justify-end gap-3">
        {error && <span className="mr-auto text-sm text-red-600">{error}</span>}
        {!error && message && <span className="mr-auto text-sm text-green-700">{message}</span>}
        {!error && !message && dirty && <span className="mr-auto text-sm text-amber-700">Unsaved changes</span>}
        {children}
        <Button onClick={onSave} disabled={saving || !dirty}>{saving ? 'Saving…' : 'Save changes'}</Button>
      </div>
    </div>
  );
}

export function Loading() {
  return <p className="py-16 text-center text-sm text-gray-500">Loading content… If this doesn't go away, the admin server isn't reachable.</p>;
}

// Warn before closing the tab with unsaved edits
export function useUnsavedWarning(dirty) {
  useEffect(() => {
    if (!dirty) return;
    const handler = (e) => { e.preventDefault(); };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);
}
