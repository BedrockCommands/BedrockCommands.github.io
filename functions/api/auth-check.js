import { jwtVerify } from 'jose'

// Cache this key once fetched
let CF_JWT_PUBLIC_KEY = null

async function getCloudflareKey(env) {
  if (CF_JWT_PUBLIC_KEY) return CF_JWT_PUBLIC_KEY

  const res = await fetch('https://bedrockcommands.cloudflareaccess.com/cdn-cgi/access/certs')
  const { keys } = await res.json()
  CF_JWT_PUBLIC_KEY = await crypto.subtle.importKey(
    'jwk',
    keys[0],
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  )
  return CF_JWT_PUBLIC_KEY
}

export async function onRequest({ request, env }) {
  const token = request.headers.get('cf-access-jwt-assertion')
  if (!token) {
    return new Response(JSON.stringify({ isAuthorized: false }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const key = await getCloudflareKey(env)
    const { payload } = await jwtVerify(token, key)

    const isTeamMember = payload.team_name === 'cook_off_team' || payload.groups?.includes('cook_off_team')

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
    return new Response(JSON.stringify({ isAuthorized: false }), {
      headers: { 'Content-Type': 'application/json' },
      status: 401,
    })
  }
}
