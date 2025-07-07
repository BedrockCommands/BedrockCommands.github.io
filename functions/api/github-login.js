export async function onRequestGet(context) {
  const clientId = context.env.GITHUB_CLIENT_ID
  const redirectUri = 'https://bedrockcommands.org/api/github-callback'
  const scope = 'read:user'  // adjust scopes if needed

  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`

  return Response.redirect(githubOAuthUrl, 302)
}
