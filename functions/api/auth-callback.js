export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: context.env.GITHUB_CLIENT_ID,
      client_secret: context.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: 'https://bedrockcommands.org/api/auth-callback',
    }),
  });

  if (!tokenRes.ok) return new Response('Token exchange failed', { status: 500 });
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  if (!accessToken) return new Response('No access token', { status: 500 });

  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'bedrockcommands-site',
    },
  });

  if (!userRes.ok) return new Response('Failed to fetch user', { status: 500 });

  const userInfo = await userRes.json();

  const cookieValue = btoa(JSON.stringify({
    id: String(userInfo.id),
    username: userInfo.login,
    avatarUrl: userInfo.avatar_url,
  }));

  const headers = new Headers({
    'Set-Cookie': `github_user=${encodeURIComponent(cookieValue)}; Path=/; HttpOnly; SameSite=Lax`,
    'Location': '/projects/cook-off/tasks',
  });

  return new Response(null, { status: 302, headers });
}
