async function request(method, url, body) {
  const res = await fetch(url, {
    method,
    credentials: 'same-origin',
    headers: {
      'X-MRC-Admin': '1',
      ...(body !== undefined && !(body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  me: () => request('GET', '/api/auth/me'),
  login: (username, password) => request('POST', '/api/auth/login', { username, password }),
  logout: () => request('POST', '/api/auth/logout'),
  saveProject: (id, project) => request('PUT', `/api/admin/projects/${encodeURIComponent(id)}`, project),
  deleteProject: (id) => request('DELETE', `/api/admin/projects/${encodeURIComponent(id)}`),
  saveCategories: (cats) => request('PUT', '/api/admin/portfolio-categories', cats),
  saveCertificate: (id, cert) => request('PUT', `/api/admin/certificates/${id}`, cert),
  deleteCertificate: (id) => request('DELETE', `/api/admin/certificates/${id}`),
  saveCertificateOrder: (ids) => request('PUT', '/api/admin/certificates-order', ids),
  upload: (files, folder) => {
    const form = new FormData();
    form.append('folder', folder);
    for (const f of files) form.append('files', f);
    return request('POST', '/api/admin/upload', form);
  },
};
