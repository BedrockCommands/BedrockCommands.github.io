<template>
  <div>
    <div v-if="canEdit">
      <button @click="addColumn">+ New Column</button>
    </div>
    <kanban-board
      :stages="columns"
      :blocks="tasks"
      @update-block="onTaskMoved"
      @add-stage="onColumnAdded"
      :is-editable="canEdit"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import KanbanBoard from 'vue-kanban'

const props = defineProps({ canEdit: Boolean })
const columns = ref(['To Do', 'In Progress', 'Done'])
const tasks = ref([
  { id: 1, status: 'To Do', title: 'Sample task', assigned: '' }
])

function addColumn() {
  const name = prompt('Column name:')
  if (name) columns.value.push(name)
}

function onTaskMoved(id, newStage) {
  const task = tasks.value.find(t => t.id === Number(id))
  if (task) task.status = newStage
  saveTasks()
}

function onColumnAdded(newStage) {
  if (!columns.value.includes(newStage)) columns.value.push(newStage)
  saveTasks()
}

function saveTasks() {
  if (!props.canEdit) return
  fetch('/api/tasks.json', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({columns: columns.value, tasks: tasks.value})
  })
}
</script>