export async function onRequestGet(context) {
  const code = new URL(context.request.url).searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const params = new URLSearchParams();
  params.append('client_id', context.env.GITHUB_CLIENT_ID);
  params.append('client_secret', context.env.GITHUB_CLIENT_SECRET);
  params.append('code', code);

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: params.toString()
  });

  const tokenData = await tokenRes.json();
  console.log('GitHub Token Response:', JSON.stringify(tokenData));
  
  const access_token = tokenData.access_token;
  if (!access_token) return new Response('No access token returned', { status: 500 });

  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`,
      'User-Agent': 'BCC-Taskboard-App'
    }
  });

  if (!userRes.ok) {
    const errorText = await userRes.text();
    return new Response('User fetch failed: ' + errorText, { status: 500 });
  }

  const user = await userRes.json();

  const cookieValue = btoa(JSON.stringify({
    id: user.id,
    username: user.login,
    avatarUrl: user.avatar_url
  }));

  return new Response('Redirecting...', {
    status: 302,
    headers: {
      'Set-Cookie': `github_user=${cookieValue}; Path=/; HttpOnly; SameSite=Lax`,
      'Location': '/projects/cook-off/tasks'
    }
  });
}
