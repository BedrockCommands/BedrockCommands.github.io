export async function onRequestGet(context) {
  const url = new URL(context.request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return new Response('Missing code', { status: 400 })
  }

  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: context.env.GITHUB_CLIENT_ID,
      client_secret: context.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: 'https://bedrockcommands.org/api/github-callback',
    }),
  })

  if (!tokenRes.ok) {
    return new Response('Failed to fetch access token', { status: 500 })
  }

  const tokenData = await tokenRes.json()

  if (!tokenData.access_token) {
    return new Response('No access token received', { status: 500 })
  }

  // Fetch user info from GitHub API
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'User-Agent': 'BedrockCommands-App',
      Accept: 'application/vnd.github+json',
    },
  })

  if (!userRes.ok) {
    return new Response('Failed to fetch user info', { status: 500 })
  }

  const userInfo = await userRes.json()

  // Save user info in cookie, base64 encoded JSON
  const cookieValue = btoa(JSON.stringify({
    id: userInfo.id,
    login: userInfo.login,
    name: userInfo.name,
    avatar_url: userInfo.avatar_url,
  }))

  const headers = new Headers({
    'Set-Cookie': `github_user=${cookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`, // 7 days
    'Location': '/projects/cook-off/tasks',
  })

  return new Response(null, { status: 302, headers })
}
