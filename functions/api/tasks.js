const TASKS_KEY = 'tasks-json';

export async function onRequest({ request, env }) {
  if (request.method === 'GET') {
    const tasks = await env.TASKS_KV.get(TASKS_KEY);
    return new Response(tasks ?? '{}', { headers: { 'Content-Type': 'application/json' } });
  }

  if (request.method === 'POST') {
    const data = await request.json();
    await env.TASKS_KV.put(TASKS_KEY, JSON.stringify(data));
    return new Response(null, { status: 204 });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
