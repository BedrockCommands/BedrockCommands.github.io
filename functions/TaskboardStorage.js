export class TaskboardStorage {
  constructor(state, env) {
    this.state = state
    this.env = env
  }

  async fetch(request) {
    if (request.method === 'GET') {
      const data = await this.state.storage.get('data')
      return new Response(JSON.stringify(data || []), { headers: { 'Content-Type': 'application/json' } })
    }

    if (request.method === 'POST') {
      const body = await request.json()
      await this.state.storage.put('data', body)
      return new Response('OK')
    }

    return new Response('Method Not Allowed', { status: 405 })
  }
}
