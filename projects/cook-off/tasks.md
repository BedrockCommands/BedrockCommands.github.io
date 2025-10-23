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

<!-- Vue -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>

<!-- Sortable + vuedraggable (CDN) -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.3/Sortable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuedraggable@next/dist/vuedraggable.umd.js"></script>

<!-- Your component -->
<script src="/assets/js/components/TaskBoard.js"></script>

<!-- Mount -->
<script>
  const app = Vue.createApp(TaskBoard)
  app.mount('#task-board')
</script>
