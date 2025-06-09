import { UserManager } from 'oidc-client-ts';

const clientId = '53lkg3nbp11fqunpjph06e9o77'; // from .env
const poolId = 'us-east-1_I0HiCcNzL';           // from .env
const redirectUri = 'http://localhost:1234';    // from .env

const region = poolId.split('_')[0]; // -> "us-east-1"

const userManager = new UserManager({
  authority: `https://cognito-idp.${region}.amazonaws.com/${poolId}`,
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: 'code',
  scope: 'openid email',
});

function formatUser(user) {
  console.log('✅ User Authenticated');
  console.log({ user });

  return {
    username: user.profile['cognito:username'],
    email: user.profile.email,
    idToken: user.id_token,
    accessToken: user.access_token,
    authorizationHeaders: (type = 'application/json') => ({
      'Content-Type': type,
      Authorization: `Bearer ${user.id_token}`,
    }),
  };
}

export async function getUser() {
  if (window.location.search.includes('code=')) {
    const user = await userManager.signinCallback();
    window.history.replaceState({}, document.title, window.location.pathname);
    return formatUser(user);
  }

  const user = await userManager.getUser();
  return user ? formatUser(user) : null;
}

export function signIn() {
  return userManager.signinRedirect();
}
