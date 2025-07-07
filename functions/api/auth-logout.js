export async function onRequestPost() {
  return new Response('Logged out', {
    status: 200,
    headers: {
      'Set-Cookie': 'discord_user=deleted; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax'
    }
  })
}
