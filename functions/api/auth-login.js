export async function onRequestGet(context) {
  const clientId = context.env.DISCORD_CLIENT_ID
  const redirectUri = 'https://bedrockcommands.org/api/discord-callback'
  const scope = 'identify'

  const discordOAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`

  return Response.redirect(discordOAuthUrl, 302)
}
