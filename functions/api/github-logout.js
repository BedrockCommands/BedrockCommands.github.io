export async function onRequestPost() {
  return new Response('Logged out', {
    status: 200,
    headers: {
      'Set-Cookie': 'github_user=deleted; Path=/; Max-Age=0; HttpOnly; SameSite=Lax',
    },
  })
}
