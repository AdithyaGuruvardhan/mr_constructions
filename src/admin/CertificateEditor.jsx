import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSiteContent } from '../content/ContentContext';
import { api } from './api';
import { Button, Field, inputClass, Loading, SaveBar, Section, TextArea, TextField, useUnsavedWarning } from './fields';

const RATINGS = ['Outstanding', 'Very Good', 'Good', 'Satisfactory'];
const PERFORMANCE = [
  ['qualityOfWork', 'Quality of work'],
  ['resourcefulness', 'Resourcefulness'],
  ['financialSoundness', 'Financial soundness'],
  ['technicalProficiency', 'Technical proficiency'],
  ['generalBehaviour', 'General behaviour'],
];

const emptyCertificate = () => ({
  projectId: '',
  projectName: '',
  client: '',
  location: '',
  description: '',
  donor: { name: '', address: '' },
  financials: { workOrderValue: '', costOnCompletion: '', compensationLevied: 'NOT APPLICABLE' },
  timeline: { dateOfStart: '', stipulatedCompletion: '', actualCompletion: '' },
  specifications: { typeOfWork: '', totalBuiltUpArea: '', basements: '', maximumHeight: '', storeys: '' },
  performance: Object.fromEntries(PERFORMANCE.map(([k]) => [k, 'Outstanding'])),
});

function toDraft(cert) {
  const base = emptyCertificate();
  const merged = { ...base, ...cert };
  for (const k of ['donor', 'financials', 'timeline', 'specifications', 'performance']) merged[k] = { ...base[k], ...cert[k] };
  merged.projectId ??= '';
  return merged;
}

export default function CertificateEditor({ isNew }) {
  const params = useParams();
  const navigate = useNavigate();
  const { certificates, projects, loaded, reload } = useSiteContent();
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState({ saving: false, error: '', message: '' });
  useUnsavedWarning(dirty);

  const existing = certificates.find(c => String(c.id) === params.id);

  useEffect(() => {
    if (!loaded || draft) return;
    if (isNew) setDraft(emptyCertificate());
    else if (existing) setDraft(toDraft(existing));
  }, [loaded, draft, isNew, existing]);

  if (!loaded) return <Loading />;
  if (!isNew && !existing) {
    return <p className="py-16 text-center text-gray-600">Certificate not found. <Link className="text-[#2c52a1] underline" to="/admin/certificates">Back to certificates</Link></p>;
  }
  if (!draft) return <Loading />;

  const set = (path, value) => {
    setDraft(prev => {
      const next = structuredClone(prev);
      const [a, b] = path.split('.');
      if (b) next[a][b] = value; else next[a] = value;
      return next;
    });
    setDirty(true);
    setStatus(s => ({ ...s, message: '' }));
  };

  const save = async () => {
    if (!draft.projectName.trim()) {
      setStatus({ saving: false, error: 'Project name is required.', message: '' });
      return;
    }
    const id = isNew ? Math.max(0, ...certificates.map(c => c.id)) + 1 : existing.id;
    const cert = structuredClone(draft);
    if (!cert.projectId) delete cert.projectId;

    setStatus({ saving: true, error: '', message: '' });
    try {
      await api.saveCertificate(id, cert);
      await reload();
      setDirty(false);
      setStatus({ saving: false, error: '', message: 'Saved. Changes are live on the site.' });
      if (isNew) navigate(`/admin/certificates/${id}`, { replace: true });
    } catch (err) {
      setStatus({ saving: false, error: err.message, message: '' });
    }
  };

  const remove = async () => {
    if (!confirm(`Delete the certificate for "${draft.projectName}"?`)) return;
    try {
      await api.deleteCertificate(existing.id);
      await reload();
      navigate('/admin/certificates');
    } catch (err) {
      setStatus({ saving: false, error: err.message, message: '' });
    }
  };

  const projectOptions = Object.values(projects).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      <div className="mb-6">
        <Link to="/admin/certificates" className="text-sm text-gray-500 hover:text-gray-800">← All certificates</Link>
        <h1 className="mt-1 text-2xl font-semibold">{isNew ? 'New certificate' : draft.projectName || 'Untitled certificate'}</h1>
      </div>

      <div className="space-y-6">
        <Section title="Project">
          <TextField label="Project name" value={draft.projectName} onChange={v => set('projectName', v)} />
          <Field label="Photos from project" hint="The certificate's photo carousel shows this project's gallery.">
            <select className={inputClass} value={draft.projectId} onChange={e => set('projectId', e.target.value)}>
              <option value="">{draft.projectIds?.length ? `Several projects (${draft.projectIds.join(', ')})` : 'None (mix of all projects)'}</option>
              {projectOptions.map(p => <option key={p.id} value={p.id}>{p.title} ({p.id})</option>)}
            </select>
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Client" value={draft.client} onChange={v => set('client', v)} />
            <TextField label="Location" value={draft.location} onChange={v => set('location', v)} />
          </div>
          <TextArea label="Description" value={draft.description} onChange={v => set('description', v)} />
        </Section>

        <Section title="Donor" description="Leave empty if there's no donor.">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Name" value={draft.donor.name} onChange={v => set('donor.name', v)} />
            <TextField label="Address" value={draft.donor.address} onChange={v => set('donor.address', v)} />
          </div>
        </Section>

        <Section title="Financials">
          <div className="grid gap-4 md:grid-cols-3">
            <TextField label="Work order value" value={draft.financials.workOrderValue} onChange={v => set('financials.workOrderValue', v)} />
            <TextField label="Cost on completion" value={draft.financials.costOnCompletion} onChange={v => set('financials.costOnCompletion', v)} />
            <TextField label="Compensation levied" value={draft.financials.compensationLevied} onChange={v => set('financials.compensationLevied', v)} />
          </div>
        </Section>

        <Section title="Timeline">
          <div className="grid gap-4 md:grid-cols-3">
            <TextField label="Date of start" value={draft.timeline.dateOfStart} onChange={v => set('timeline.dateOfStart', v)} placeholder="20th October 2019" />
            <TextField label="Stipulated completion" value={draft.timeline.stipulatedCompletion} onChange={v => set('timeline.stipulatedCompletion', v)} />
            <TextField label="Actual completion" value={draft.timeline.actualCompletion} onChange={v => set('timeline.actualCompletion', v)} />
          </div>
        </Section>

        <Section title="Specifications">
          <div className="grid gap-4 md:grid-cols-3">
            <TextField label="Type of work" value={draft.specifications.typeOfWork} onChange={v => set('specifications.typeOfWork', v)} />
            <TextField label="Total built-up area" value={draft.specifications.totalBuiltUpArea} onChange={v => set('specifications.totalBuiltUpArea', v)} />
            <TextField label="Storeys" value={draft.specifications.storeys} onChange={v => set('specifications.storeys', v)} />
            <TextField label="Maximum height" value={draft.specifications.maximumHeight} onChange={v => set('specifications.maximumHeight', v)} />
            <TextField label="Basements" value={draft.specifications.basements} onChange={v => set('specifications.basements', v)} />
          </div>
        </Section>

        <Section title="Performance report">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {PERFORMANCE.map(([key, label]) => (
              <Field key={key} label={label}>
                <select className={inputClass} value={draft.performance[key]} onChange={e => set(`performance.${key}`, e.target.value)}>
                  {[...new Set([...RATINGS, draft.performance[key]])].map(r => <option key={r}>{r}</option>)}
                </select>
              </Field>
            ))}
          </div>
        </Section>
      </div>

      <SaveBar dirty={dirty || isNew} saving={status.saving} message={status.message} error={status.error} onSave={save}>
        {!isNew && <Button variant="danger" onClick={remove}>Delete certificate</Button>}
      </SaveBar>
    </div>
  );
}
