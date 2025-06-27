---
layout: default
title: Cook-Off! | Task Lists
---

<div id="cook-off-tasks"></div>

<script type="module">
  import TaskBoard from '/assets/js/components/TaskBoard.vue'
  import { createApp } from 'vue'
  import { getCurrentUserCanEdit } from '/assets/js/auth'

  const app = createApp({
    components: { TaskBoard },
    template: '<TaskBoard :canEdit="canEdit" />',
    data() {
      return {
        canEdit: false
      }
    },
    async mounted() {
      this.canEdit = await getCurrentUserCanEdit()
    }
  })
  app.mount('#cook-off-tasks')
</script>

<link rel="stylesheet" href="/assets/css/taskboard.css">