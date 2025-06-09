const apiUrl = process.env.API_URL || 'http://localhost:8080';

export async function getUserFragments(user) {
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    console.log('Fragments:', data);
    return data;
  } catch (err) {
    console.error('Error fetching fragments:', err);
  }
}
