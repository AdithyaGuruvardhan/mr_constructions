import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../content/ContentContext';
import { api } from './api';
import { Button, Loading } from './fields';

export default function CertificatesPage() {
  const { certificates, projects, loaded, reload } = useSiteContent();
  const [status, setStatus] = useState({ saving: false, error: '' });

  if (!loaded) return <Loading />;

  const move = async (i, d) => {
    const ids = certificates.map(c => c.id);
    [ids[i], ids[i + d]] = [ids[i + d], ids[i]];
    setStatus({ saving: true, error: '' });
    try {
      await api.saveCertificateOrder(ids);
      await reload();
      setStatus({ saving: false, error: '' });
    } catch (err) {
      setStatus({ saving: false, error: err.message });
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Certificates</h1>
          <p className="mt-1 text-sm text-gray-500">Shown in this order on the Certificates page. Reordering saves right away.</p>
        </div>
        <Link to="/admin/certificates/new"><Button>+ New certificate</Button></Link>
      </div>

      {status.error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{status.error}</p>}

      <ul className={`divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white ${status.saving ? 'pointer-events-none opacity-60' : ''}`}>
        {certificates.map((c, i) => (
          <li key={c.id} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{c.projectName}</p>
              <p className="truncate text-xs text-gray-500">
                {c.client}
                {c.projectId && <> · Photos from <span className="text-gray-700">{projects[c.projectId]?.title ?? c.projectId}</span></>}
              </p>
            </div>
            <Button variant="ghost" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</Button>
            <Button variant="ghost" disabled={i === certificates.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</Button>
            <Link to={`/admin/certificates/${c.id}`}><Button variant="secondary">Edit</Button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
