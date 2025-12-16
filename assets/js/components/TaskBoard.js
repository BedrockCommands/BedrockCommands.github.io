const { ref, onMounted, nextTick, watch } = Vue
const draggable = window.vuedraggable

const TaskBoard = {
  template: `
    <div>
  <div v-if="loading" class="tb-loading">Loading user info...</div>

  <div v-else>
    <div v-if="!user.loggedIn">
      <button @click="startGithubLogin" class="tb-login-btn">
        <img src="/assets/images/github_logo.svg" />
        <p>Login with Github to Manage Task Boards</p>
      </button>
    </div>

    <div v-else>
      <div class="tb-user-info">
        Welcome, {{ user.name }}.
        <button @click="logout" class="tb-logout-btn">
          <img v-if="user.picture" :src="user.picture" alt="Avatar" class="tb-user-avatar" />
          <p>Log out</p>
        </button>
      </div>

      <div v-if="canEdit" class="tb-edit-toolbar">
        <button @click="createGhostTaskboard" class="tb-add-tb">✚ New Taskboard</button>
      </div>

      <div v-else class="tb-view-only-msg">
        <br />This page is view only — only authorized users may edit.
      </div>
    </div>

    <!-- 🔹 Draggable Taskboards -->
    <draggable
      v-model="taskboards"
      group="taskboards"
      item-key="id"
      animation="400"
      class="tb-container"
      :class="{ 'tb-container-logged-in': canEdit }"
      :disabled="!canEdit"
      ghost-class="tb-drag-ghost"
      @end="() => nextTick(saveTaskboards)"
      :delay="canEdit ? 200 : 0"
      :delay-on-touch-only="true"
      >
      <template #item="{ element: taskboard, index: tbIndex }">
        <div class="tb">
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
            <button v-if="canEdit" @click="confirmDeleteTaskboard(tbIndex)" class="tb-delete-tb">❌</button>
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

          <!-- 🔹 Draggable Bins -->
          <draggable
            v-model="taskboard.bins"
            group="bins"
            item-key="id"
            animation="400"
            class="tb-bins-container"
            :disabled="!canEdit"
            @end="() => nextTick(saveTaskboards)"
            :delay="canEdit ? 200 : 0"
            :delay-on-touch-only="true"
          >
            <template #item="{ element: bin, index: binIndex }">
              <div class="tb-bin">
                <div class="tb-labels-container">
                  <span v-for="(label, labelIndex) in bin.labels" :key="labelIndex" class="tb-label" :class="getLabelColorClass(label)">
                    {{ label }}
                    <button v-if="canEdit" class="tb-label-remove" @click="removeLabel(tbIndex, binIndex, labelIndex)">❌</button>
                  </span>

                  <div v-if="canEdit" class="tb-add-label-wrapper">
                    <input
                      v-model="newLabelInputs[tbIndex + '-' + binIndex]"
                      @keyup.enter="addLabel(tbIndex, binIndex)"
                      placeholder="Label Name"
                      class="tb-add-label-input"
                    />
                    <button @click="addLabel(tbIndex, binIndex)" class="tb-add-label">✅</button>
                  </div>
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
                    @click="confirmDeleteBin(tbIndex, binIndex)"
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

                <div class="tb-progress-wrapper" v-if="bin.tasks.length > 0">
                  <span class="tb-progress-text">
                    {{ bin.tasks.filter(t => t.checked).length }} / {{ bin.tasks.length }}
                  </span>
                  <div class="tb-progress-bar">
                    <div
                      class="tb-progress-fill"
                      :style="{ width: (bin.tasks.filter(t => t.checked).length / bin.tasks.length * 100) + '%' }"
                    ></div>
                  </div>
                  <span class="tb-progress-percent">
                    {{
                      Math.round(bin.tasks.filter(t => t.checked).length / bin.tasks.length * 100)
                    }}%
                  </span>
                </div>

                <div class="tb-filter-bar" v-if="bin.tasks.length > 2 && (!canEdit ? bin.expanded : true)">
                  <input
                    type="text"
                    v-model="ensureFilterState(tbIndex, binIndex).searchUser"
                    placeholder="Filter by username..."
                    class="tb-filter-input"
                  />

                  <div class="tb-filter-buttons">
                    <button
                      class="tb-btn-completed"
                      :class="{ active: ensureFilterState(tbIndex, binIndex).showCompleted }"
                      @click="toggleFilter(tbIndex, binIndex, 'showCompleted')"
                    >
                      COMPLETED
                    </button>

                    <button
                      class="tb-btn-pending"
                      :class="{ active: ensureFilterState(tbIndex, binIndex).showPending }"
                      @click="toggleFilter(tbIndex, binIndex, 'showPending')"
                    >
                      PENDING
                    </button>
                  </div>
                </div>

                <!-- 🔹 Draggable Tasks -->
                <draggable
                  v-model="taskboards[tbIndex].bins[binIndex].tasks"
                  group="tasks"
                  item-key="id"
                  animation="400"
                  class="tb-tasks-container"
                  :disabled="!canEdit"
                  v-show="canEdit || bin.expanded"
                  @end="() => nextTick(saveTaskboards)"
                  :delay="canEdit ? 200 : 0"
                  :delay-on-touch-only="true"
                >
                  <template #item="{ element: task, index: taskIndex }">
                   <li v-show="shouldShowTask(tbIndex, binIndex, task)">
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
                        <button v-if="canEdit" @click="confirmDeleteTask(tbIndex, binIndex, taskIndex)" class="tb-delete-task">❌</button>
                      </div>
                    </li>
                  </template>
                </draggable>

                <div v-if="canEdit">
                  <button @click="createGhostTask(tbIndex, binIndex)" class="tb-add-task">✚ Add a Task</button>
                </div>
              </div>
            </template>
          </draggable>

          <div v-if="canEdit">
            <button @click="createGhostBin(tbIndex)" class="tb-add-bin">✚ Add a Card</button>
          </div>
        </div>
      </template>
    </draggable>

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

    <div v-if="confirmDialog.show" class="tb-confirm-dialog">
      <div class="tb-confirm-box">
        <p>{{ confirmDialog.message }}</p>
        <button @click="confirmDialog.onConfirm" class="tb-confirm-btn">Confirm</button>
        <button @click="confirmDialog.show = false" class="tb-cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</div>
  `,
  components: { draggable },
  setup() {
    const loading = ref(true)
    const user = ref({ loggedIn: false, id: null, name: null, picture: null })
    const canEdit = ref(false)
    const taskboards = ref([])
    const newLabelInputs = ref({})
    const filterState = ref({})

    // Authorized to Manage Tasks: califerr, jeanmajid, spacebarninja, zheaevyline, zruby
    const allowedGithubIDs = [84600834, 124172979, 142201872, 99989764, 96641071]
    // Team Members who can be assigned tasks
    const knownUsernames = ref(["ax_titan", "bellarmina", "bm6", "blitzbolts", "brodblox09", "califerr", "catfederation", "ccjjkk95", "cornyflex", "crepaspmkinpie", "crunchycookie", "dinosscar", "finnthedemoncat", "frozty000", "felixchats", "faramir1616", "hi_rynnn", "itzbeasty", "jeanmajid", "kuba12ki6", "kittenb0y", "levy_mcgarden307", "lustfulleche", "nayvid", "poolroxjosh", "r_kidds", "siwudot", "sheep_shiloh", "spacebarninja", "thejonathanlongly", "theemonster395", "vactricaking", "veyscold", "your_friend6254", "zheaevyline", "zruby"])
    // Usernames with dot
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

      taskboards.value.forEach((tb, tbi) => {
        if (tbi !== tbIndex) return
        tb.bins.forEach((b, bi) => {
        if (bi !== binIndex) b.expanded = false
        })
      })
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
      taskboards.value.unshift({
        id: Date.now() + Math.random(), // unique stable key
        title: '',
        description: '',
        image: '',
        bins: [],
        _isGhost: true
      })
      nextTick(autoResizeAll)
    }

    function finalizeTaskboard(tbIndex) {
      const board = taskboards.value[tbIndex]
      if (!board.title && !board.description && !board.image) {
        taskboards.value.splice(tbIndex, 1)
      } else {
        delete board._isGhost
      }
      saveTaskboards()
    }

    // When creating bins/tasks, add a unique id
    function createGhostBin(tbIndex) {
    taskboards.value[tbIndex].bins.push({ id: Date.now(), title: '', description: '', labels: [], tasks: [], expanded: true, _isGhost: true })
    nextTick(autoResizeAll)
    }

    function finalizeBin(tbIndex, binIndex) {
      const bin = taskboards.value[tbIndex].bins[binIndex]
      if (!bin.title && !bin.description) {
        taskboards.value[tbIndex].bins.splice(binIndex, 1)
      } else {
        delete bin._isGhost
      }
      saveTaskboards()
    }

    function createGhostTask(tbIndex, binIndex) {
    taskboards.value[tbIndex].bins[binIndex].tasks.push({
      id: Date.now() + Math.random(), // unique
      text: '',
      checked: false,
      users: [],
      _isGhost: true
      })
    }

    function finalizeTask(tbIndex, binIndex, taskIndex) {
      const task = taskboards.value[tbIndex].bins[binIndex].tasks[taskIndex]
      if (!task.text) {
        taskboards.value[tbIndex].bins[binIndex].tasks.splice(taskIndex, 1)
      } else {
        delete task._isGhost
      }
      saveTaskboards()
    }

    function toggleTask(tbIndex, binIndex, taskIndex) {
      const task = taskboards.value[tbIndex].bins[binIndex].tasks[taskIndex]
      if (!canEdit.value) return
      task.checked = !task.checked
      saveTaskboards()
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
      saveTaskboards()
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

    async function fetchTaskboards() {
     try {
        const res = await fetch('/api/taskboards')
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        taskboards.value = data
      } catch (err) {
        console.error('Failed to load taskboards', err)
        taskboards.value = []
      } finally {
        nextTick(() => {
          autoResizeAll()
        })
      }
    }

  async function saveTaskboards() {
    if (!canEdit.value) return
    try {
      await fetch('/api/taskboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskboards.value)
      })
    } catch (err) {
      console.error('Failed to save taskboards', err)
    }
  }

  onMounted(() => {
    fetchUser().then(() => {
      fetchTaskboards().then(() => {
        collapseAllBinsIfNeeded()
        nextTick(() => {
          autoResizeAll()
        })
      })
    })
  })

  watch(taskboards, (newVal) => {
    if (canEdit.value) saveTaskboards()
  }, { deep: true })

  const confirmDialog = ref({ show: false, message: '', onConfirm: null })

    function showConfirmDialog(message, onConfirm) {
      confirmDialog.value.message = message
      confirmDialog.value.onConfirm = () => {
      onConfirm()
      confirmDialog.value.show = false
      }
      confirmDialog.value.show = true
    }

    function confirmDeleteTaskboard(i) {
      showConfirmDialog('Are you sure you want to delete this taskboard and all its cards?', () => {
        taskboards.value.splice(i, 1)
        saveTaskboards()
      })
    }

    function confirmDeleteBin(tbI, bI) {
      showConfirmDialog('Are you sure you want to delete this card and all its tasks?', () => {
        taskboards.value[tbI].bins.splice(bI, 1)
        saveTaskboards()
      })
    }

    function confirmDeleteTask(tbI, bI, tI) {
      showConfirmDialog('Are you sure you want to delete this task?', () => {
        taskboards.value[tbI].bins[bI].tasks.splice(tI, 1)
        saveTaskboards()
      })
    }

    function addLabel(tbIndex, binIndex) {
      const key = `${tbIndex}-${binIndex}`
      const newLabel = (newLabelInputs.value[key] || '').trim()
      if (!newLabel) return
      const bin = taskboards.value[tbIndex].bins[binIndex]
      if (!bin.labels.includes(newLabel)) {
      bin.labels.push(newLabel)
      saveTaskboards()
      }
      newLabelInputs.value[key] = ''
    }

    function removeLabel(tbIndex, binIndex, labelIndex) {
      const bin = taskboards.value[tbIndex].bins[binIndex]
      bin.labels.splice(labelIndex, 1)
      saveTaskboards()
    }

    function getLabelColorClass(label) {
      const normalized = label.trim().toLowerCase()
      switch (normalized) {
        case 'low':
          return 'tb-label-low'
        case 'medium':
          return 'tb-label-medium'
        case 'high':
          return 'tb-label-high'
        case 'very high':
          return 'tb-label-very-high'
        default:
          return ''
      }
    }

    function toggleFilter(tbIndex, binIndex, type) {
      const filter = ensureFilterState(tbIndex, binIndex)

      if (filter[type]) {
        filter.showCompleted = false
        filter.showPending = false
      } else {
      filter.showCompleted = type === 'showCompleted'
      filter.showPending = type === 'showPending'
      }
    }

    function filteredTasks(tbIndex, binIndex) {
      const binKey = `${tbIndex}-${binIndex}`
      const bin = taskboards.value[tbIndex].bins[binIndex]
      const filter = filterState.value[binKey] || { showCompleted: false, showPending: false, searchUser: '' }

      return bin.tasks.filter(task => {
        const userMatch =
          !filter.searchUser ||
          (task.users && task.users.some(u => u.toLowerCase().includes(filter.searchUser.toLowerCase())))

        let statusMatch = true
        if (filter.showCompleted && !filter.showPending) statusMatch = task.checked
        if (!filter.showCompleted && filter.showPending) statusMatch = !task.checked
        return userMatch && statusMatch
      })
    }

    function ensureFilterState(tbIndex, binIndex) {
      const bin = taskboards.value[tbIndex].bins[binIndex]
      if (!bin.tasks.length) return null

      const key = `${tbIndex}-${binIndex}`
      if (!filterState.value[key]) {
       filterState.value[key] = { showCompleted: false, showPending: false, searchUser: '' }
      }
      return filterState.value[key]
    }

    function shouldShowTask(tbIndex, binIndex, task) {
      const key = `${tbIndex}-${binIndex}`
      const filter = filterState.value[key] || { showCompleted: false, showPending: false, searchUser: '' }

      const userMatch =
        !filter.searchUser ||
        (task.users && task.users.some(u => u.toLowerCase().includes(filter.searchUser.toLowerCase())))

      let statusMatch = true
      if (filter.showCompleted && !filter.showPending) statusMatch = task.checked
      if (!filter.showCompleted && filter.showPending) statusMatch = !task.checked

      return userMatch && statusMatch
    }

    watch(canEdit, (newVal) => {
      if (newVal) nextTick(autoResizeAll)
    })

    function autoResizeAll() {
      const selectors = ['.tb-desc-input','.tb-bin-desc-input','.tb-title-input','.tb-bin-title-input','.tb-tasks-input']
      document.querySelectorAll(selectors.join(', '))
      .forEach(el => {
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
      })
    }

    return {
      loading,
      user,
      canEdit,
      taskboards,
      createGhostTaskboard,
      createGhostBin,
      createGhostTask,
      deleteTaskboard: (i) => {
        taskboards.value.splice(i, 1)
        saveTaskboards()
      },
      deleteBin: (tbI, bI) => {
        taskboards.value[tbI].bins.splice(bI, 1)
        saveTaskboards()
      },
      deleteTask: (tbI, bI, tI) => {
        taskboards.value[tbI].bins[bI].tasks.splice(tI, 1)
        saveTaskboards()
      },
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
      toggleBinVisibility,
      confirmDialog,
      showConfirmDialog,
      confirmDeleteTaskboard,
      confirmDeleteBin,
      confirmDeleteTask,
      newLabelInputs,
      addLabel,
      removeLabel,
      getLabelColorClass,
      filteredTasks,
      ensureFilterState,
      toggleFilter,
      shouldShowTask
    }
  }
}

window.TaskBoard = TaskBoard