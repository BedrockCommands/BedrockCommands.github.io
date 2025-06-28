export async function onRequest({ request }) {
  const cookie = request.headers.get('cookie')
  const res = await fetch(
    'https://bedrockcommands.cloudflareaccess.com/cdn-cgi/access/get-identity',
    { headers: { cookie } }
  )
  const data = await res.json()
  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}
