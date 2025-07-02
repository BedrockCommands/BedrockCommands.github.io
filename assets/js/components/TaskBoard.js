const { ref, onMounted } = Vue

export default {
  template: `
    <div>
      <div v-if="canEdit" class="mb-4">
        <button @click="showForm = true" class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          ➕ Add Table
        </button>
      </div>

      <div v-else class="italic text-gray-500 mb-4">
        <br>This page is view only — only designated roles may edit.
      </div>

      <div v-if="user.name" class="text-sm text-gray-600 mb-6 flex items-center gap-2">
        Welcome, {{ user.name }}
        <img v-if="user.picture" :src="user.picture" alt="Avatar" class="w-6 h-6 rounded-full" />
      </div>

      <div v-if="showForm" class="mt-6 p-4 bg-gray-800 rounded shadow-lg text-white max-w-2xl">
        <h3 class="text-xl mb-4 font-bold">Create New Taskboard</h3>
        <label class="block mb-2 text-sm">Title</label>
        <input v-model="newTable.title" class="w-full mb-3 p-2 bg-gray-900 border border-gray-600 rounded text-white" />

        <label class="block mb-2 text-sm">Description</label>
        <textarea v-model="newTable.description" rows="3"
          class="w-full mb-3 p-2 bg-gray-900 border border-gray-600 rounded text-white"></textarea>

        <label class="block mb-2 text-sm">Image URL</label>
        <input v-model="newTable.image" class="w-full mb-3 p-2 bg-gray-900 border border-gray-600 rounded text-white" />

        <label class="block mb-2 text-sm">Labels (comma-separated)</label>
        <input v-model="newTable.labels" class="w-full mb-3 p-2 bg-gray-900 border border-gray-600 rounded text-white" />

        <button @click="saveNewTable" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">💾 Save</button>
        <button @click="showForm = false" class="ml-3 text-gray-400 hover:text-white">Cancel</button>
      </div>

      <div class="tb-tables-container mt-6">
        <div class="tb-table" v-for="(table, index) in exampleTables" :key="index">
          <div class="tb-table-labels">
            <span class="tb-table-label" v-for="(label, i) in table.labels" :key="i">{{ label }}</span>
          </div>
          <h2>{{ table.title }}</h2>
          <p>{{ table.description }}</p>
          <img :src="table.image" v-if="table.image">

          <ul class="tb-table-tasks">
            <li v-for="(task, tIndex) in table.tasks" :key="tIndex">
              <label>
                <input
                  type="checkbox"
                  :checked="task.checked"
                  :disabled="!canEdit"
                  @change="toggleTask(table, task)"
                />
                {{ task.text }}
              </label>
              <img
                v-if="task.user"
                :src="'https://github.com/' + task.user + '.png'"
                :alt="task.user"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  setup() {
    const canEdit = ref(false)
    const user = ref({})
    const showForm = ref(false)
    const exampleTables = ref([
      {
        title: 'Test Table 1',
        description: 'This is a test description.',
        image: '/assets/images/banners/testboard2.png',
        labels: ['Test Label 1', 'Test Label 2'],
        tasks: [
          { text: 'Task 1', checked: false, user: 'octocat' },
          { text: 'Task 2', checked: true, user: null }
        ]
      }
    ])

    const newTable = ref({
      title: '',
      description: '',
      image: '',
      labels: ''
    })

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth-check', { credentials: 'include' })
        const { isAuthorized, userInfo } = await res.json()
        canEdit.value = isAuthorized
        user.value = userInfo
      } catch (err) {
        console.error('Auth check failed:', err)
        canEdit.value = false
      }
    }

    function toggleTask(table, task) {
      if (!canEdit.value) return
      task.checked = !task.checked
      // TODO: Save change via backend API
    }

    function saveNewTable() {
      if (!newTable.value.title) return
      exampleTables.value.push({
        title: newTable.value.title,
        description: newTable.value.description,
        image: newTable.value.image,
        labels: newTable.value.labels.split(',').map(l => l.trim()),
        tasks: []
      })
      newTable.value = { title: '', description: '', image: '', labels: '' }
      showForm.value = false
      // TODO: Save new table to backend API
    }

    onMounted(() => {
      checkAuth()
    })

    return {
      canEdit,
      user,
      showForm,
      newTable,
      exampleTables,
      toggleTask,
      saveNewTable
    }
  }
}
