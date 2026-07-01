<script setup>
import { ref } from "vue";
import SideBar from "../components/SideBar.vue";

import TasksManager from "../components/TasksManager.vue";

const sideBarIsVisible = ref(true);
</script>

<template>
  <div class="homepage">
    <SideBar v-if="sideBarIsVisible" />
    <TasksManager />
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  justify-content: end;
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  background-color: var(--blackTheme-back-secondary2) !important;
}
</style>
