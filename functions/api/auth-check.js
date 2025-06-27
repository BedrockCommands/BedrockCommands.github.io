async function getCloudflareKey() {
  const res = await fetch('https://bedrockcommands.cloudflareaccess.com/cdn-cgi/access/certs')
  const { keys } = await res.json()
  const jwk = keys[0]

  return await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  )
}

function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4 !== 0) str += '='
  return Uint8Array.from(atob(str), c => c.charCodeAt(0))
}

async function verifyJWT(jwt, key) {
  const [headerB64, payloadB64, signatureB64] = jwt.split('.')
  const encoder = new TextEncoder()
  const data = encoder.encode(`${headerB64}.${payloadB64}`)
  const signature = base64urlDecode(signatureB64)
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature, data)
  if (!valid) throw new Error('Invalid signature')
  return JSON.parse(atob(payloadB64))
}

export async function onRequest({ request }) {
  const token = request.headers.get('cf-access-jwt-assertion')
  if (!token) {
    return new Response(JSON.stringify({ isAuthorized: false }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const key = await getCloudflareKey()
    const payload = await verifyJWT(token, key)

    const isTeamMember =
      payload.team_name === 'cook_off_team' ||
      (payload.groups && payload.groups.includes('cook_off_team'))

    return new Response(
      JSON.stringify({
        isAuthorized: isTeamMember,
        userInfo: {
          name: payload.name,
          email: payload.email,
          team: payload.team_name,
          avatar: payload.picture,
        },
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(JSON.stringify({ isAuthorized: false, error: err.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
