const { ref, onMounted, nextTick } = Vue

export default {
  template: `
    <div>
      <div v-if="loading" class="tb-loading">Loading user info...</div>

      <div v-else>
        <div v-if="!user.loggedIn">
          <button @click="startGithubLogin" class="tb-login-btn"><img src="/assets/images/github_logo.svg"/><p>Login with Github to Manage Task Boards</p></button>
        </div>

        <div v-else>
          <div class="tb-user-info">
            Welcome, {{ user.name }}.
            <button @click="logout" class="tb-logout-btn"><img v-if="user.picture" :src="user.picture" alt="Avatar" class="tb-user-avatar" /><p>Log out</p></button>
          </div>

          <div v-if="canEdit" class="tb-edit-toolbar">
            <button @click="createGhostTaskboard" class="tb-add-tb">✚ New Taskboard</button>
          </div>

          <div v-else class="tb-view-only-msg">
            <br>This page is view only — only authorized users may edit.
          </div>
        </div>

        <div class="tb-container" :class="{ 'tb-container-logged-in': canEdit }">
          <div v-for="(taskboard, tbIndex) in taskboards" :key="tbIndex" class="tb">
            <div class="tb-header">
              <textarea
                v-if="canEdit"
                v-model="taskboard.title"
                @input="autoResize($event)"
                @blur="finalizeTaskboard(tbIndex)"
                placeholder="Title"
                class="tb-title-input"
                rows="1"
              ></textarea>
              <h2 v-else class="tb-title">{{ taskboard.title }}</h2>
              <button v-if="canEdit" @click="deleteTaskboard(tbIndex)" class="tb-delete-tb">❌</button>
            </div>

            <img :src="taskboard.image || '/assets/images/banners/default.png'" v-if="taskboard.image" />
            <input
              v-if="canEdit"
              v-model="taskboard.image"
              @blur="finalizeTaskboard(tbIndex)"
              placeholder="Insert Image URL"
              class="tb-img-input"
            />

            <p v-if="!canEdit">{{ taskboard.description }}</p>
            <textarea
              v-if="canEdit"
              v-model="taskboard.description"
              @input="autoResize($event)"
              @blur="finalizeTaskboard(tbIndex)"
              placeholder="Description"
              class="tb-desc-input"
            ></textarea>

            <div class="tb-bins-container">
              <div v-for="(bin, binIndex) in taskboard.bins" :key="binIndex" class="tb-bin">
                <div class="tb-labels-container">
                  <span v-for="label in bin.labels" :key="label" class="tb-label">{{ label }}</span>
                </div>
                <div class="tb-header">
                  <textarea
                    v-if="canEdit"
                    v-model="bin.title"
                    @input="autoResize($event)"
                    @blur="finalizeBin(tbIndex, binIndex)"
                    placeholder="Card Title"
                    class="tb-bin-title-input"
                    rows="1"
                  ></textarea>
                  <h2 v-else class="tb-bin-title">{{ bin.title }}</h2>
                  <button
                    v-if="canEdit"
                    @click="deleteBin(tbIndex, binIndex)"
                    class="tb-delete-bin"
                  >❌</button>
                  <button
                    v-else
                    class="tb-delete-bin"
                    @click="toggleBinVisibility(tbIndex, binIndex)"
                  >{{ bin.expanded ? '❌' : '👁️' }}</button>
                </div>

                <p v-if="!canEdit">{{ bin.description }}</p>
                <textarea
                  v-if="canEdit"
                  v-model="bin.description"
                  @input="autoResize($event)"
                  @blur="finalizeBin(tbIndex, binIndex)"
                  placeholder="Card Description"
                  class="tb-bin-desc-input"
                ></textarea>

                <ul class="tb-tasks-container" :class="{ 'tb-tasks-container-logged-in': canEdit }" v-show="canEdit || bin.expanded">
                  <li v-for="(task, taskIndex) in bin.tasks" :key="taskIndex">
                    <label>
                      <input
                        type="checkbox"
                        :checked="task.checked"
                        :disabled="!canEdit"
                        @change="toggleTask(tbIndex, binIndex, taskIndex)"
                      />
                      <textarea
                        v-if="canEdit"
                        v-model="task.text"
                        @input="autoResize($event)"
                        @blur="finalizeTask(tbIndex, binIndex, taskIndex)"
                        placeholder="Task Text"
                        class="tb-tasks-input"
                        rows="1"
                      ></textarea>
                      <span v-else>{{ task.text }}</span>
                    </label>
                    <div class="tb-creator-box">
                      <button v-if="canEdit" @click="(e) => toggleAssignPopup(tbIndex, binIndex, taskIndex, e)" class="tb-assign-btn" title="Assign creator">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                        </svg>
                      </button>
                      <div class="tb-assigned-users" v-if="task.users && task.users.length">
                        <a
                          v-for="(username, idx) in task.users"
                          :key="idx"
                          @click="handleUserClick(username.trim(), $event)"
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            :src="'/assets/images/avatars/' + username.trim() + '.webp'"
                            :alt="username"
                            :title="'Assigned to ' + (usernameDisplayMap[username] || username)"
                          />
                        </a>
                      </div>
                      <button v-if="canEdit" @click="deleteTask(tbIndex, binIndex, taskIndex)" class="tb-delete-task">❌</button>
                    </div>
                  </li>
                </ul>
                <div v-if="canEdit">
                  <button @click="createGhostTask(tbIndex, binIndex)" class="tb-add-task">✚ Add a Task</button>
                </div>
              </div>
              <div v-if="canEdit">
                <button @click="createGhostBin(tbIndex)" class="tb-add-bin">✚ Add a Card</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activePopupTask?.showPopup" class="tb-popup" :style="{ top: activePopupTask.popupY + 'px', left: activePopupTask.popupX + 'px' }">
          <input
            v-model="activePopupTask.userInput"
            @input="filterSuggestions(activePopupTask)"
            @keydown.enter.prevent="assignUser(activePopupTask)"
            @blur="assignUser(activePopupTask)"
            placeholder="user1, user2"
            class="tb-popup-input"
            autofocus
          />
          <ul v-if="activePopupTask.filteredSuggestions.length" class="tb-suggestions">
            <li v-for="(suggestion, i) in activePopupTask.filteredSuggestions" :key="i" @mousedown.prevent="selectSuggestion(activePopupTask, suggestion)">
              {{ usernameDisplayMap[suggestion] || suggestion }}
            </li>
          </ul>
        </div>
      </div>
  `,
  setup() {
    const loading = ref(true)
    const user = ref({ loggedIn: false, id: null, name: null, picture: null })
    const canEdit = ref(false)
    const taskboards = ref([])

    const allowedGithubIDs = [124172979, 84600834, 99989764]
    const knownUsernames = ref(["ax_titan", "bm6", "brodblox09", "califerr", "catfederation", "ccjjkk95", "cornyflex", "crepaspmkinpie", "crunchycookie", "dinosscar", "itzbeasty", "jeanmajid", "kittenb0y", "poolroxjosh", "spacebarninja", "theemonster395", "vactricaking", "veyscold", "your_friend6254", "zheaevyline", "zruby"])
    const usernameDisplayMap = { zruby: ".zruby", bm6: "bm6." }
    const activePopupTask = ref(null)

    function autoResize(event) {
      const el = event.target
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
    }

    function toggleBinVisibility(tbIndex, binIndex) {
      const bin = taskboards.value[tbIndex].bins[binIndex]
      bin.expanded = !bin.expanded
    }

    function collapseAllBinsIfNeeded() {
      if (!canEdit.value) {
        taskboards.value.forEach(taskboard => {
          taskboard.bins.forEach(bin => {
            bin.expanded = false
          })
        })
      }
    }

    function createGhostTaskboard() {
      taskboards.value.unshift({ title: '', description: '', image: '', bins: [], _isGhost: true })
      nextTick(() => document.querySelectorAll('.tb-title-input').forEach(autoResize))
    }

    function finalizeTaskboard(tbIndex) {
      const board = taskboards.value[tbIndex]
      if (!board.title && !board.description && !board.image) {
        taskboards.value.splice(tbIndex, 1)
      } else {
        delete board._isGhost
      }
    }

    function createGhostBin(tbIndex) {
      taskboards.value[tbIndex].bins.push({ title: '', description: '', labels: [], tasks: [], expanded: true, _isGhost: true })
      nextTick(() => document.querySelectorAll('.tb-bin-title-input').forEach(autoResize))
    }

    function finalizeBin(tbIndex, binIndex) {
      const bin = taskboards.value[tbIndex].bins[binIndex]
      if (!bin.title && !bin.description) {
        taskboards.value[tbIndex].bins.splice(binIndex, 1)
      } else {
        delete bin._isGhost
      }
    }

    function createGhostTask(tbIndex, binIndex) {
      taskboards.value[tbIndex].bins[binIndex].tasks.push({ text: '', checked: false, user: null, userInput: '', users: [], showPopup: false, filteredSuggestions: [], popupX: 0, popupY: 0, _isGhost: true })
      nextTick(() => document.querySelectorAll('.tb-tasks-input').forEach(autoResize))
    }

    function finalizeTask(tbIndex, binIndex, taskIndex) {
      const task = taskboards.value[tbIndex].bins[binIndex].tasks[taskIndex]
      if (!task.text) {
        taskboards.value[tbIndex].bins[binIndex].tasks.splice(taskIndex, 1)
      } else {
        delete task._isGhost
      }
    }

    function toggleTask(tbIndex, binIndex, taskIndex) {
      const task = taskboards.value[tbIndex].bins[binIndex].tasks[taskIndex]
      if (!canEdit.value) return
      task.checked = !task.checked
    }

    function toggleAssignPopup(tbIndex, binIndex, taskIndex, event) {
      const task = taskboards.value[tbIndex].bins[binIndex].tasks[taskIndex]
      const rect = event.currentTarget.getBoundingClientRect()
      task.popupX = rect.left + window.scrollX
      task.popupY = rect.bottom + window.scrollY
      task.showPopup = true
      task.userInput = (task.users || []).join(', ')
      task.filteredSuggestions = []
      activePopupTask.value = task
    }

    function assignUser(task) {
      task.users = (task.userInput || '').split(',').map(u => u.trim()).filter(u => !!u)
      task.showPopup = false
      task.filteredSuggestions = []
      activePopupTask.value = null
    }

    function filterSuggestions(task) {
      const input = task.userInput.split(',').pop().trim().toLowerCase()
      task.filteredSuggestions = knownUsernames.value.filter(u => u.toLowerCase().startsWith(input) && !task.users.includes(u))
    }

    function selectSuggestion(task, suggestion) {
      let current = task.userInput.split(',').slice(0, -1)
      current.push(suggestion)
      task.userInput = current.join(', ') + ', '
      task.filteredSuggestions = []
    }

    async function handleUserClick(username, event) {
      event.preventDefault()
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (response.ok) {
          const newWindow = window.open(`https://github.com/${username}`, '_blank', 'noopener,noreferrer')
          if (newWindow) newWindow.opener = null
        }
      } catch (error) {
        console.warn(`Failed to verify user: ${username}`)
      }
    }

    async function fetchUser() {
      try {
        const res = await fetch('/api/github-user', { credentials: 'include' })
        if (!res.ok) throw new Error('Not logged in')
        const data = await res.json()
        user.value = {
          loggedIn: true,
          id: data.id,
          name: data.username,
          picture: data.avatarUrl
        }
        canEdit.value = allowedGithubIDs.includes(data.id)
      } catch {
        user.value = { loggedIn: false, id: null, name: null, picture: null }
        canEdit.value = false
      } finally {
        loading.value = false
        collapseAllBinsIfNeeded()
      }
    }

    function startGithubLogin() {
      window.location.href = '/api/github-login'
    }

    function logout() {
      fetch('/api/github-logout', { method: 'POST', credentials: 'include' }).then(() => {
        user.value = { loggedIn: false, id: null, name: null, picture: null }
        canEdit.value = false
        collapseAllBinsIfNeeded()
      })
    }

    onMounted(() => {
      fetchUser()
      nextTick(() => {
        document.querySelectorAll('.tb-desc-input, .tb-bin-desc-input, .tb-title-input, .tb-bin-title-input, .tb-tasks-input').forEach(autoResize)
      })
    })

    return {
      loading,
      user,
      canEdit,
      taskboards,
      createGhostTaskboard,
      deleteTaskboard: (i) => taskboards.value.splice(i, 1),
      createGhostBin,
      deleteBin: (tbI, bI) => taskboards.value[tbI].bins.splice(bI, 1),
      createGhostTask,
      deleteTask: (tbI, bI, tI) => taskboards.value[tbI].bins[bI].tasks.splice(tI, 1),
      toggleTask,
      finalizeTaskboard,
      finalizeBin,
      finalizeTask,
      toggleAssignPopup,
      assignUser,
      filterSuggestions,
      selectSuggestion,
      autoResize,
      activePopupTask,
      knownUsernames,
      usernameDisplayMap,
      startGithubLogin,
      logout,
      handleUserClick,
      toggleBinVisibility
    }
  }
}
