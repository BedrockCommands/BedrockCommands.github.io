---
title: Cook-Off! | Tasks
layout: default
permalink: /projects/cook-off/tasks/
description: >-
  BCC Task Management System for the Cook-Off! Project.
image: /assets/images/projects/2025.Logo.png
color: "#FA6D0B"
---

<div id="task-board"></div>

<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script type="module">
  import TaskBoard from '/assets/js/components/TaskBoard.js'

  Vue.createApp(TaskBoard).mount('#task-board')
</script>
