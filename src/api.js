import { getUser } from './auth';

const apiUrl = 'http://fragments-lb-589502560.us-east-1.elb.amazonaws.com';

async function authHeaders(contentType = 'application/json') {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');
  return user.authorizationHeaders(contentType);
}

export async function createFragment(type, content) {
  const headers = await authHeaders(type);
  const res = await fetch(`${apiUrl}/v1/fragments`, {
    method: 'POST',
    headers,
    body: content,
  });
  if (!res.ok) throw new Error('Failed to create fragment');
  return res.json();
}

export async function getUserFragments(expand = 1) {
  const headers = await authHeaders('application/json');
  const res = await fetch(`${apiUrl}/v1/fragments?expand=${expand}`, { headers });
  if (!res.ok) throw new Error('Failed to load fragments');
  const json = await res.json();
  return expand ? json.data?.fragments || json.fragments : json;
}

export async function deleteFragment(id) {
  const headers = await authHeaders('application/json');
  const res = await fetch(`${apiUrl}/v1/fragments/${id}`, { method: 'DELETE', headers });
  if (!res.ok) throw new Error('Failed to delete fragment');
  return res.json();
}
