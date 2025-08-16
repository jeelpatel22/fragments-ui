import { API_URL } from './config';
import { getIdToken, isLocalDevelopment } from './auth';

async function request(path, opts = {}) {
  const headers = new Headers(opts.headers || {});
  
  // Always use Cognito for assignment submission
  const idToken = getIdToken();
  if (idToken) {
    headers.set('Authorization', `Bearer ${idToken}`);
  }
  
  const resp = await fetch(`${API_URL}${path}`, { ...opts, headers });
  return resp;
}

export async function listFragments(expand = true) {
  const r = await request(`/v1/fragments?expand=${expand ? '1' : '0'}`);
  if (!r.ok) throw new Error('list failed');
  return r.json();
}

export async function createFragment(content, contentType) {
  const r = await request('/v1/fragments', { method: 'POST', headers: { 'Content-Type': contentType }, body: content });
  if (!r.ok) throw new Error('create failed');
  return r.json();
}

export async function deleteFragment(id) {
  const r = await request(`/v1/fragments/${id}`, { method: 'DELETE' });
  if (!r.ok) {
    const errorMessage = `delete failed: ${r.status} ${r.statusText}`;
    const error = new Error(errorMessage);
    error.status = r.status;
    error.statusText = r.statusText;
    throw error;
  }
  return r.json();
}

export async function updateFragment(id, content, contentType) {
  const r = await request(`/v1/fragments/${id}`, { method: 'PUT', headers: { 'Content-Type': contentType }, body: content });
  if (!r.ok) throw new Error('update failed');
  return r.json();
}

export async function getFragmentData(id, ext = '') {
  const path = ext ? `/v1/fragments/${id}.${ext}` : `/v1/fragments/${id}`;
  const r = await request(path);
  if (!r.ok) throw new Error('get data failed');
  return r;
}

export async function getFragmentInfo(id) {
  const r = await request(`/v1/fragments/${id}/info`);
  if (!r.ok) throw new Error('get info failed');
  return r.json();
}
