const apiUrl = process.env.API_URL || 'http://localhost:8080';

export async function createFragment(type, content) {
  const res = await fetch(`${apiUrl}/v1/fragments`, {
    method: 'POST',
    headers: {
      'Content-Type': type,
      Authorization: `Basic ${btoa('user1@email.com:Test123!')}`,
    },
    body: content,
  });

  if (!res.ok) throw new Error('Failed to create fragment');

  return res.json();
}
export async function getUserFragments() {
  const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
    headers: {
      Authorization: `Basic ${btoa('user1@email.com:Test123!')}`,
    },
  });

  if (!res.ok) throw new Error('Failed to load fragments');

  const json = await res.json();
  return json.fragments;
}
