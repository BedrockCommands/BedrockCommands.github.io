async function isInTeam(identity, orgName, teamName) {
  const grps = identity.groups;
  if (!Array.isArray(grps)) return false;
  return grps.some(o =>
    o.name === orgName &&
    Array.isArray(o.teams) &&
    o.teams.some(t => t.name === teamName)
  );
}

export async function onRequest({ request }) {
  const cookie = request.headers.get('cookie');
  const res = await fetch(
    'https://bedrockcommands.cloudflareaccess.com/cdn-cgi/access/get-identity',
    { headers: { cookie } }
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ isAuthorized: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const identity = await res.json();
  const isTeam = isInTeam(identity, 'BedrockCommands', 'cook_off_team');

  const isEditRequest = request.url.includes('/projects/cook-off/tasks');

  return new Response(JSON.stringify({
    isAuthorized: isEditRequest ? isTeam : true,
    userInfo: {
      name: identity.name,
      email: identity.email,
      groups: identity.groups,
      picture: identity.picture || null
    }
  }), { headers: { 'Content-Type': 'application/json' } });
}
