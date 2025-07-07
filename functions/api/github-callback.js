export async function onRequestGet(context) {
  const code = new URL(context.request.url).searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const params = new URLSearchParams();
  params.append('client_id', context.env.GITHUB_CLIENT_ID);
  params.append('client_secret', context.env.GITHUB_CLIENT_SECRET);
  params.append('code', code);

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: params.toString(), // <-- CRUCIAL
  });

  if (!tokenRes.ok) return new Response('Token exchange failed', { status: 500 });
  const { access_token } = await tokenRes.json();

  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  if (!userRes.ok) return new Response('User fetch failed', { status: 500 });
  const user = await userRes.json();

  const cookieValue = btoa(JSON.stringify({
    id: user.id,
    username: user.login,
    avatarUrl: user.avatar_url
  }));

  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': `github_user=${cookieValue}; Path=/; HttpOnly; SameSite=Lax`,
      'Location': '/projects/cook-off/tasks'
    }
  });
}
