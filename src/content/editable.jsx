import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useSiteContent } from './ContentContext';
import { api } from '../admin/api';
import { ImageListField } from '../admin/fields';

// ---------- Values ----------

// A single editable value stored under `key`; falls back to the default written in the component.
export function useField(key, defaultValue) {
  const { site, setField } = useSiteContent();
  const value = site[key] ?? defaultValue;
  return [value, (v) => setField(key, v)];
}

// An editable list (cards, FAQs, stats…) stored as one array under `key`.
export function useList(key, defaults) {
  const [items, setItems] = useField(key, defaults);
  return {
    items,
    update: (i, patch) => setItems(items.map((it, j) => (j === i ? (typeof it === 'object' ? { ...it, ...patch } : patch) : it))),
    remove: (i) => setItems(items.filter((_, j) => j !== i)),
    move: (i, d) => {
      const j = i + d;
      if (j < 0 || j >= items.length) return;
      const next = [...items];
      [next[i], next[j]] = [next[j], next[i]];
      setItems(next);
    },
    add: (item) => setItems([...items, item]),
    set: setItems,
  };
}

// ---------- Text ----------

// Text is stored as plain strings: "\n" is a line break and **double asterisks** mark bold.
const renderBold = (line) => line.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i} className="font-bold">{part}</strong> : part));

const lines = (text, brClassName) => String(text ?? '').split('\n').map((line, i) => (
  <React.Fragment key={i}>
    {i > 0 && <br className={brClassName} />}
    {renderBold(line)}
  </React.Fragment>
));

const isBold = (el) => el.nodeName === 'B' || el.nodeName === 'STRONG' || el.classList?.contains('font-bold') || /^(bold|[6-9]00)$/.test(el.style?.fontWeight ?? '');

// Reads what the admin typed back into the stored format. textContent-style reading is used
// (not innerText) so CSS like `uppercase` doesn't leak into the saved text.
function readText(node) {
  let out = '';
  node.childNodes.forEach((child, i) => {
    if (child.nodeType === Node.TEXT_NODE) out += child.nodeValue;
    else if (child.nodeName === 'BR') out += '\n';
    else {
      if ((child.nodeName === 'DIV' || child.nodeName === 'P') && i > 0) out += '\n';
      const inner = readText(child);
      out += isBold(child) && inner.trim() ? `**${inner}**` : inner;
    }
  });
  return out;
}

// Text that becomes typeable in edit mode. Enter adds a line break; Cmd/Ctrl+B toggles bold.
export function Editable({ value, onChange, brClassName, className }) {
  const { editMode } = useSiteContent();
  if (!editMode) return className ? <span className={className}>{lines(value, brClassName)}</span> : lines(value, brClassName);

  return (
    <span
      key={value}
      className={className}
      data-editable=""
      contentEditable
      suppressContentEditableWarning
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Escape') e.currentTarget.blur();
        if (e.key === 'Enter') { e.preventDefault(); document.execCommand('insertLineBreak'); }
      }}
      onPaste={(e) => {
        // Paste as plain text so formatting from Word/websites doesn't come along
        e.preventDefault();
        document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
      }}
      onBlur={(e) => {
        const text = readText(e.currentTarget).replace(/\u00a0/g, ' ').replace(/\*\*\*\*/g, '').replace(/\n+$/, '');
        if (text !== value) onChange(text);
      }}
    >
      {lines(value, brClassName)}
    </span>
  );
}

// Shorthand: <T k="home.hero.title">Default text</T>
export function T({ k, children, brClassName, className }) {
  const [value, setValue] = useField(k, children);
  return <Editable value={value} onChange={setValue} brClassName={brClassName} className={className} />;
}

// ---------- Images ----------

function pickAndUpload(folder) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      try {
        const { urls } = await api.upload([file], folder);
        resolve(urls[0]);
      } catch (err) {
        reject(err);
      }
    };
    input.click();
  });
}

function useImagePicker(onChange, folder = 'site') {
  const [busy, setBusy] = useState(false);
  const pick = async () => {
    setBusy(true);
    try {
      const url = await pickAndUpload(folder);
      if (url) onChange(url);
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };
  return { busy, pick };
}

// An <img> that can be clicked to replace it in edit mode.
export function EditableImg({ src, onChange, folder, style, onClick, ...imgProps }) {
  const { editMode } = useSiteContent();
  const { busy, pick } = useImagePicker(onChange, folder);
  if (!editMode) return <img src={src} style={style} onClick={onClick} {...imgProps} />;
  return (
    <img
      src={src}
      {...imgProps}
      data-editable-img=""
      title="Click to replace image"
      style={{ ...style, opacity: busy ? 0.4 : undefined }}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!busy) pick(); }}
    />
  );
}

// Shorthand: <Img k="home.about.photo" src="/default.webp" className="…" />
export function Img({ k, src, ...props }) {
  const [value, setValue] = useField(k, src);
  return <EditableImg src={value} onChange={setValue} {...props} />;
}

// For images used as CSS backgrounds (or anywhere an <img> can't be clicked):
// a floating button shown in edit mode. Place it inside a positioned element.
export function ImageButton({ onChange, label = 'Replace image', className = 'top-3 left-3', folder }) {
  const { editMode } = useSiteContent();
  const { busy, pick } = useImagePicker(onChange, folder);
  if (!editMode) return null;
  return (
    <button type="button" className={`mrc-tool-btn absolute z-[60] ${className}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); pick(); }} disabled={busy}>
      {busy ? 'Uploading…' : `🖼 ${label}`}
    </button>
  );
}

// A floating "Edit images" button that opens a gallery manager (add, remove, reorder).
export function ImagesButton({ images, onChange, label = 'Edit images', className = 'top-3 left-3', folder = 'site' }) {
  const { editMode } = useSiteContent();
  const [open, setOpen] = useState(false);
  if (!editMode) return null;
  return (
    <>
      <button type="button" className={`mrc-tool-btn absolute z-[60] ${className}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}>
        🖼 {label} ({images.length})
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 text-left font-sans text-gray-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <ImageListField label={label} value={images} onChange={onChange} folder={folder} />
            <div className="mt-6 flex justify-end">
              <button type="button" className="rounded-lg bg-[#2c52a1] px-4 py-2 text-sm font-medium text-white" onClick={() => setOpen(false)}>Done</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// Shorthand for an image list stored under a key
export function useImages(k, defaults) {
  return useField(k, defaults);
}

// ---------- Lists ----------

// Move/remove controls for one item of an editable list. Place inside a positioned element.
export function ItemTools({ list, index, className = 'top-2 right-2', vertical = false }) {
  const { editMode } = useSiteContent();
  if (!editMode) return null;
  const stop = (fn) => (e) => { e.preventDefault(); e.stopPropagation(); fn(); };
  return (
    <span className={`mrc-item-tools absolute z-[60] ${className}`} onMouseDown={(e) => e.stopPropagation()}>
      <button type="button" title="Move earlier" disabled={index === 0} onClick={stop(() => list.move(index, -1))}>{vertical ? '↑' : '←'}</button>
      <button type="button" title="Move later" disabled={index === list.items.length - 1} onClick={stop(() => list.move(index, 1))}>{vertical ? '↓' : '→'}</button>
      <button type="button" title="Remove" className="mrc-danger" onClick={stop(() => { if (confirm('Remove this item?')) list.remove(index); })}>✕</button>
    </span>
  );
}

export function AddItem({ onAdd, label = 'Add item', className = '' }) {
  const { editMode } = useSiteContent();
  if (!editMode) return null;
  return (
    <button type="button" className={`mrc-add-btn ${className}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(); }}>
      + {label}
    </button>
  );
}

// "Add" button that uploads an image first, then calls onAdd(url)
export function AddImageItem({ onAdd, label = 'Add image', className = '', folder }) {
  const { editMode } = useSiteContent();
  const { busy, pick } = useImagePicker(onAdd, folder);
  if (!editMode) return null;
  return (
    <button type="button" className={`mrc-add-btn ${className}`} disabled={busy} onClick={(e) => { e.preventDefault(); e.stopPropagation(); pick(); }}>
      {busy ? 'Uploading…' : `+ ${label}`}
    </button>
  );
}

// Small "edit link" chip shown in edit mode next to a button or link
export function LinkEdit({ value, onChange, className = '-top-3 -right-3', label = '🔗 Link', question = 'Where should this button go?\nExamples: /portfolio/c1, /contact, https://…' }) {
  const { editMode } = useSiteContent();
  if (!editMode) return null;
  return (
    <button
      type="button"
      className={`mrc-tool-btn absolute z-[60] ${className}`}
      title={`Links to: ${value}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const next = prompt(question, value);
        if (next !== null && next.trim()) onChange(next.trim());
      }}
    >
      {label}
    </button>
  );
}

// Renders children only in edit mode (for hints and extra controls)
export function EditOnly({ children }) {
  const { editMode } = useSiteContent();
  return editMode ? children : null;
}
