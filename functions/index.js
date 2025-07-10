import { TaskboardStorage } from './TaskboardStorage.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    if (url.pathname === '/api/taskboards') {
      const id = env.TASKBOARD.idFromName('main')
      const stub = env.TASKBOARD.get(id)
      return stub.fetch(request)
    }

    return new Response('Not Found', { status: 404 })
  }
}

export { TaskboardStorage }
