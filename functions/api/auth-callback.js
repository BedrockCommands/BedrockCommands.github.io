export async function onRequestGet(context) {
  const url = new URL(context.request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return new Response('Missing code', { status: 400 })
  }

  const params = new URLSearchParams()
  params.append('client_id', context.env.DISCORD_CLIENT_ID)
  params.append('client_secret', context.env.DISCORD_CLIENT_SECRET)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', context.env.DISCORD_REDIRECT_URI)
  params.append('scope', 'identify guilds')

  // Step 1: Exchange code for access token
  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })

  if (!tokenResponse.ok) {
    return new Response('Failed to get token', { status: 500 })
  }

  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  // Step 2: Fetch user info
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!userResponse.ok) {
    return new Response('Failed to fetch user', { status: 500 })
  }

  const userInfo = await userResponse.json()

  // Step 3: Store essential user info in a cookie
  const userSession = {
    id: userInfo.id,
    username: userInfo.username,
    avatar: userInfo.avatar,
    discriminator: userInfo.discriminator
  }

  const encoded = btoa(JSON.stringify(userSession))

  // Step 4: Redirect back to the app with cookie set
  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': `discord_user=${encodeURIComponent(encoded)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`, // 7 days
      'Location': '/projects/cook-off/tasks'
    }
  })
}
