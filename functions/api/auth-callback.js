export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const params = new URLSearchParams();
  params.append('client_id', context.env.DISCORD_CLIENT_ID);
  params.append('client_secret', context.env.DISCORD_CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', context.env.DISCORD_REDIRECT_URI);
  params.append('scope', 'identify');

  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  if (!tokenRes.ok) return new Response('Auth token error', { status: 500 });

  const { access_token } = await tokenRes.json();

  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  if (!userRes.ok) return new Response('User fetch failed', { status: 500 });

  const userInfo = await userRes.json();

  // Cookie must match the name expected in /api/auth-user.js
  const cookieValue = btoa(JSON.stringify({
    id:       userInfo.id,
    username: userInfo.username,
    avatar:   userInfo.avatar
  }));

  const headers = new Headers({
    'Set-Cookie': `discord_user=${cookieValue}; Path=/; HttpOnly; SameSite=Lax; Secure`,
    'Location': '/projects/cook-off/tasks'
  });

  return new Response(null, { status: 302, headers });
}
