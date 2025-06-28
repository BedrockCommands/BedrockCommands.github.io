<template>
  <div>
    <div v-if="canEdit" class="mb-4">
      <button @click="addNewTable" class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
        ➕ Add Table
      </button>
    </div>

    <div v-else class="italic text-gray-500 mb-4">
      Viewing only — login required to edit.
    </div>

    <div v-if="user.name" class="text-sm text-gray-600 mb-6 flex items-center gap-2">
      Welcome, {{ user.name }}
      <img v-if="user.picture" :src="user.picture" alt="Avatar" class="w-6 h-6 rounded-full" />
    </div>

    <!-- Example task board placeholder -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 border border-gray-300 rounded-lg shadow bg-white">
        <h2 class="text-lg font-semibold">Example Table</h2>
        <p class="text-gray-600 mb-2">This is where your task list would go.</p>
        <ul class="list-disc ml-5 text-sm">
          <li>Task 1</li>
          <li>Task 2</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canEdit = ref(false)
const user = ref({})

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

function addNewTable() {
  alert('TODO: Implement table creation')
}

onMounted(() => {
  checkAuth()
})
</script>

<style scoped>
/* Optional: Add your styles here */
</style>
