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

    // 🔍 TEMPORARY: Return full decoded JWT payload for inspection
    return new Response(JSON.stringify({ debugPayload: payload }, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    })

    // Commented out temporarily for debugging purposes
    /*
    const isTeamMember = isUserInTeam(payload, 'BedrockCommands', 'cook_off_team')

    return new Response(
      JSON.stringify({
        isAuthorized: isTeamMember,
        userInfo: {
          name: payload.name,
          email: payload.email,
          groups: payload.groups,
          avatar: payload.picture || null,
        },
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    */
  } catch (err) {
    return new Response(JSON.stringify({ isAuthorized: false, error: err.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
