export async function onRequestGet({ request }) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/github_user=([^;]+)/);

  if (!match) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userStr = decodeURIComponent(match[1]);
  let user;

  try {
    user = JSON.parse(atob(userStr));
  } catch {
    return new Response('Invalid cookie', { status: 400 });
  }

  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' }
  });
}
