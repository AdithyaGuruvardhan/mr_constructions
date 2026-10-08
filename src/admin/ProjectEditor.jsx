import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSiteContent } from '../content/ContentContext';
import { api } from './api';
import { Button, Field, ImageField, ImageListField, inputClass, Loading, SaveBar, Section, TextArea, TextField, useUnsavedWarning } from './fields';

const emptyProject = () => ({
  title: '',
  location: '',
  number: '',
  heroBg: '',
  images: { desktopLeft: '', desktopRight: '', mobile1: '', mobile2: '' },
  introText1: '',
  introText2: '',
  droneSection: { img1: '', img2: '', cardTitle: '', cardDesc: '', stats: [] },
  galleryImages: [],
});

// Fill in missing sub-objects so the form can bind to every field
function toDraft(project) {
  const base = emptyProject();
  return {
    ...base,
    ...project,
    images: { ...base.images, ...project.images },
    droneSection: { ...base.droneSection, ...project.droneSection, stats: project.droneSection?.stats ?? [] },
    galleryImages: project.galleryImages ?? [],
  };
}

// Drop sections left blank, so the project page hides them instead of showing empty boxes
function fromDraft(draft) {
  const p = structuredClone(draft);
  const img = p.images;
  img.mobile1 ||= img.desktopLeft;
  img.mobile2 ||= img.desktopRight;
  if (!img.desktopLeft && !img.desktopRight) delete p.images;

  const d = p.droneSection;
  d.stats = d.stats.filter(s => s.title.trim() || s.desc.trim());
  if (!d.img1 && !d.img2 && !d.cardTitle && !d.cardDesc && !d.stats.length) delete p.droneSection;

  if (p.video && !p.video.src) delete p.video;
  for (const k of ['location', 'number', 'introText1', 'introText2']) if (!p[k]) delete p[k];
  return p;
}

function findCard(cats, id) {
  for (let ci = 0; ci < cats.length; ci++) {
    const pi = cats[ci].projects.findIndex(p => p.id === id);
    if (pi !== -1) return { ci, pi, card: cats[ci].projects[pi] };
  }
  return null;
}

export default function ProjectEditor({ isNew }) {
  const params = useParams();
  const navigate = useNavigate();
  const { projects, portfolioCategories, loaded, reload } = useSiteContent();

  const [id, setId] = useState(isNew ? '' : params.id);
  const [draft, setDraft] = useState(null);
  const [card, setCard] = useState({ category: '', title: '', subtitle: '', img: '' });
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState({ saving: false, error: '', message: '' });
  useUnsavedWarning(dirty);

  useEffect(() => {
    if (!loaded || draft) return;
    if (isNew) {
      setDraft(emptyProject());
      return;
    }
    const project = projects[params.id];
    if (!project) return;
    setDraft(toDraft(project));
    const found = findCard(portfolioCategories, params.id);
    setCard(found ? { category: String(found.ci), title: found.card.title, subtitle: found.card.subtitle ?? '', img: found.card.img ?? '' } : { category: '', title: '', subtitle: '', img: '' });
  }, [loaded, draft, isNew, params.id, projects, portfolioCategories]);

  if (!loaded) return <Loading />;
  if (!isNew && !projects[params.id]) {
    return <p className="py-16 text-center text-gray-600">Project "{params.id}" not found. <Link className="text-[#2c52a1] underline" to="/admin/projects">Back to projects</Link></p>;
  }
  if (!draft) return <Loading />;

  const folder = `projects-${id || 'new'}`;
  const set = (path, value) => {
    setDraft(prev => {
      const next = structuredClone(prev);
      const keys = path.split('.');
      let o = next;
      for (const k of keys.slice(0, -1)) o = o[k];
      o[keys.at(-1)] = value;
      return next;
    });
    setDirty(true);
    setStatus(s => ({ ...s, message: '' }));
  };
  const setCardField = (k, v) => { setCard(c => ({ ...c, [k]: v })); setDirty(true); setStatus(s => ({ ...s, message: '' })); };

  const galleryLayout = draft.singleRowGallery ? 'row' : draft.showAllGallery ? 'all' : 'grid';
  const setGalleryLayout = (v) => {
    setDraft(prev => {
      const next = { ...prev };
      delete next.singleRowGallery;
      delete next.showAllGallery;
      if (v === 'row') next.singleRowGallery = true;
      if (v === 'all') next.showAllGallery = true;
      return next;
    });
    setDirty(true);
  };

  const save = async () => {
    const projectId = id.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]{0,40}$/.test(projectId)) {
      setStatus({ saving: false, error: 'Project ID may only contain lowercase letters, numbers and dashes (e.g. "h6" or "city-hospital").', message: '' });
      return;
    }
    if (isNew && projects[projectId]) {
      setStatus({ saving: false, error: `A project with ID "${projectId}" already exists.`, message: '' });
      return;
    }
    if (!draft.title.trim()) {
      setStatus({ saving: false, error: 'Title is required.', message: '' });
      return;
    }

    setStatus({ saving: true, error: '', message: '' });
    try {
      await api.saveProject(projectId, fromDraft(draft));

      // Place (or move) the project's card on the Portfolio page
      const cats = structuredClone(portfolioCategories);
      const found = findCard(cats, projectId);
      if (found) cats[found.ci].projects.splice(found.pi, 1);
      if (card.category !== '') {
        const ci = Number(card.category);
        const newCard = { id: projectId, title: card.title.trim() || draft.title.trim(), subtitle: card.subtitle.trim(), img: card.img || draft.heroBg };
        if (!newCard.subtitle) delete newCard.subtitle;
        const at = found && found.ci === ci ? found.pi : cats[ci].projects.length;
        cats[ci].projects.splice(at, 0, newCard);
      }
      await api.saveCategories(cats);
      await reload();

      setDirty(false);
      setStatus({ saving: false, error: '', message: 'Saved. Changes are live on the site.' });
      if (isNew) navigate(`/admin/projects/${projectId}`, { replace: true });
    } catch (err) {
      setStatus({ saving: false, error: err.message, message: '' });
    }
  };

  const remove = async () => {
    if (!confirm(`Delete "${draft.title}"? This removes its project page and portfolio card. Uploaded images are kept on the server.`)) return;
    try {
      await api.deleteProject(id);
      await reload();
      navigate('/admin/projects');
    } catch (err) {
      setStatus({ saving: false, error: err.message, message: '' });
    }
  };

  const stats = draft.droneSection.stats;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/admin/projects" className="text-sm text-gray-500 hover:text-gray-800">← All projects</Link>
          <h1 className="mt-1 text-2xl font-semibold">{isNew ? 'New project' : draft.title || 'Untitled project'}</h1>
        </div>
        {!isNew && <a href={`/portfolio/${id}`} target="_blank" rel="noreferrer"><Button variant="secondary">View page ↗</Button></a>}
      </div>

      <div className="space-y-6">
        <Section title="Basics">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Title" value={draft.title} onChange={v => set('title', v)} />
            <TextField label="Project ID" value={id} onChange={v => { setId(v); setDirty(true); }} disabled={!isNew}
              hint={isNew ? 'Used in the page address: /portfolio/<ID>. Cannot be changed later.' : `Page address: /portfolio/${id}`} />
            <TextField label="Location" value={draft.location} onChange={v => set('location', v)} placeholder="BENGALURU" />
            <TextField label="Number" value={draft.number} onChange={v => set('number', v)} hint="The large number shown on the hero image" />
          </div>
          <ImageField label="Hero image" value={draft.heroBg} onChange={v => set('heroBg', v)} folder={folder} hint="Full-width background at the top of the project page" />
        </Section>

        <Section title="Portfolio card" description="How this project appears on the Portfolio page.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Category">
              <select className={inputClass} value={card.category} onChange={e => setCardField('category', e.target.value)}>
                <option value="">Not shown on the Portfolio page</option>
                {portfolioCategories.map((c, i) => <option key={i} value={i}>{c.category}</option>)}
              </select>
            </Field>
            <TextField label="Card title" value={card.title} onChange={v => setCardField('title', v)} placeholder={draft.title} hint="Leave empty to use the project title" />
            <TextField label="Card subtitle" value={card.subtitle} onChange={v => setCardField('subtitle', v)} placeholder="e.g. Bengaluru" />
          </div>
          <ImageField label="Card image" value={card.img} onChange={v => setCardField('img', v)} folder={folder} hint="Leave empty to use the hero image" />
        </Section>

        <Section title="Introduction" description="Two paragraphs with an image on either side.">
          <TextArea label="Paragraph 1" value={draft.introText1} onChange={v => set('introText1', v)} />
          <TextArea label="Paragraph 2" value={draft.introText2} onChange={v => set('introText2', v)} />
          <div className="grid gap-4 md:grid-cols-2">
            <ImageField label="Left image" value={draft.images.desktopLeft} onChange={v => set('images.desktopLeft', v)} folder={folder} />
            <ImageField label="Right image" value={draft.images.desktopRight} onChange={v => set('images.desktopRight', v)} folder={folder} />
            <ImageField label="Mobile image 1 (optional)" value={draft.images.mobile1} onChange={v => set('images.mobile1', v)} folder={folder} hint="Defaults to the left image" />
            <ImageField label="Mobile image 2 (optional)" value={draft.images.mobile2} onChange={v => set('images.mobile2', v)} folder={folder} hint="Defaults to the right image" />
          </div>
        </Section>

        <Section title="Highlights" description="The section with a large image, a summary card and stat boxes.">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Summary card title" value={draft.droneSection.cardTitle} onChange={v => set('droneSection.cardTitle', v)} placeholder="1,28,600 Sqft" />
            <TextField label="Summary card text" value={draft.droneSection.cardDesc} onChange={v => set('droneSection.cardDesc', v)} />
            <ImageField label="Large image" value={draft.droneSection.img1} onChange={v => set('droneSection.img1', v)} folder={folder} />
            <ImageField label="Small image" value={draft.droneSection.img2} onChange={v => set('droneSection.img2', v)} folder={folder} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Stat boxes</p>
            <div className="space-y-2">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3 md:flex-row">
                  <input className={`${inputClass} md:w-1/3`} placeholder="Title (e.g. Rs. 34.61 Crore)" value={s.title} onChange={e => set(`droneSection.stats.${i}.title`, e.target.value)} />
                  <input className={inputClass} placeholder="Description" value={s.desc} onChange={e => set(`droneSection.stats.${i}.desc`, e.target.value)} />
                  <Button variant="ghost" className="text-red-600" onClick={() => set('droneSection.stats', stats.filter((_, j) => j !== i))}>Remove</Button>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="mt-2" onClick={() => set('droneSection.stats', [...stats, { title: '', desc: '' }])}>+ Add stat</Button>
          </div>
        </Section>

        <Section title="Gallery">
          <Field label="Layout">
            <select className={`${inputClass} max-w-sm`} value={galleryLayout} onChange={e => setGalleryLayout(e.target.value)}>
              <option value="grid">Grid (first 6 images)</option>
              <option value="all">Grid (all images)</option>
              <option value="row">Single scrolling row</option>
            </select>
          </Field>
          {draft.groupedGallery && (
            <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">This project uses a grouped gallery ({draft.groupedGallery.map(g => g.title).join(', ')}), which is displayed instead of the list below. It's kept as-is when you save.</p>
          )}
          <ImageListField label="Gallery images" value={draft.galleryImages} onChange={v => set('galleryImages', v)} folder={folder} />
        </Section>

        <Section title="Video (optional)" description="Video files are large, so they're added to the server separately. Enter the path of an existing video here.">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Video path" value={draft.video?.src ?? ''} onChange={v => set('video', { ...draft.video, src: v })} placeholder="/videos/project.mp4" />
          </div>
          <ImageField label="Video cover image" value={draft.video?.poster ?? ''} onChange={v => set('video', { ...draft.video, poster: v })} folder={folder} />
        </Section>
      </div>

      <SaveBar dirty={dirty || isNew} saving={status.saving} message={status.message} error={status.error} onSave={save}>
        {!isNew && <Button variant="danger" onClick={remove}>Delete project</Button>}
      </SaveBar>
    </div>
  );
}
