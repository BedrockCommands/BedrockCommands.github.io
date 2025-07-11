import { TaskboardStorage } from './TaskboardStorage.js'
import * as githubLogin from './api/github-login.js'
import * as githubCallback from './api/github-callback.js'
import * as githubUser from './api/github-user.js'
import * as githubLogout from './api/github-logout.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    if (url.pathname === '/api/taskboards') {
      const id = env.TASKBOARD.idFromName('main')
      const stub = env.TASKBOARD.get(id)
      return stub.fetch(request)
    }

    if (url.pathname === '/api/github-login') return githubLogin.onRequestGet({ request, env })
    if (url.pathname === '/api/github-callback') return githubCallback.onRequestGet({ request, env })
    if (url.pathname === '/api/github-user') return githubUser.onRequestGet({ request, env })
    if (url.pathname === '/api/github-logout') return githubLogout.onRequestPost({ request, env })

    // fallback: serve static files
    return env.ASSETS.fetch(request)
  }
}
export { TaskboardStorage }