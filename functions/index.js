import { TaskboardStorage } from './TaskboardStorage.js'
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/taskboards')) {
      const id = env.TASKBOARD.idFromName('main')
      const stub = env.TASKBOARD.get(id)
      return stub.fetch(request)
    }
    if (url.pathname.startsWith('/api/')) {
      try {
        const module = await import(`./api${url.pathname}.js`)
        if (module?.onRequestGet && request.method === 'GET') {
          return module.onRequestGet({ request, env, ctx })
        }
        if (module?.onRequestPost && request.method === 'POST') {
          return module.onRequestPost({ request, env, ctx })
        }
        return new Response('Method Not Allowed', { status: 405 })
      } catch (err) {
        return new Response('Not Found', { status: 404 })
      }
    }
    return env.ASSETS.fetch(request)
  }
}

export { TaskboardStorage }
