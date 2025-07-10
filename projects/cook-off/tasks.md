---
title: Cook Off | Tasks
layout: default
permalink: /projects/cook-off/tasks/
---

<div id="task-board"></div>

<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script type="module">
  import TaskBoard from '/assets/js/components/TaskBoard.js'

  Vue.createApp(TaskBoard).mount('#task-board')
</script>
