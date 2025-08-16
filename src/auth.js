import { COGNITO_DOMAIN, COGNITO_CLIENT_ID, COGNITO_REDIRECT_URI, COGNITO_SCOPES, API_URL } from './config';

const STORAGE_KEY = 'tokens';

function base64UrlEncode(arrBuf) {
  return btoa(String.fromCharCode(...new Uint8Array(arrBuf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sha256(str) {
  const data = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(hash);
}

export async function handleCallback() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  if (!code) return false;

  const verifier = sessionStorage.getItem('pkce_verifier');
  if (!verifier) return false;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: COGNITO_CLIENT_ID,
    code,
    redirect_uri: COGNITO_REDIRECT_URI,
    code_verifier: verifier,
  });

  const resp = await fetch(`${COGNITO_DOMAIN}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!resp.ok) return false;

  const tokens = await resp.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  history.replaceState({}, '', '/');
  return true;
}

export function getIdToken() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw)?.id_token || null; } catch { return null; }
}

// Check if we're in local development mode
export function isLocalDevelopment() {
  return API_URL.includes('localhost') && window.location.hostname === 'localhost';
}

// For assignment submission, always use AWS Cognito authentication
export function isAuthenticated() {
  return Boolean(getIdToken());
}

// Always use AWS Cognito login flow
export async function login() {
  const verifier = base64UrlEncode(crypto.getRandomValues(new Uint8Array(32)));
  const challenge = await sha256(verifier);
  sessionStorage.setItem('pkce_verifier', verifier);

  const params = new URLSearchParams({
    client_id: COGNITO_CLIENT_ID,
    response_type: 'code',
    scope: COGNITO_SCOPES.join(' '),
    redirect_uri: COGNITO_REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });

  window.location = `${COGNITO_DOMAIN}/oauth2/authorize?${params.toString()}`;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
  const params = new URLSearchParams({
    client_id: COGNITO_CLIENT_ID,
    logout_uri: COGNITO_REDIRECT_URI,
  });
  window.location = `${COGNITO_DOMAIN}/logout?${params.toString()}`;
}
