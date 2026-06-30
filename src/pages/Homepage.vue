<script setup>
import { ref } from "vue";
import SideBar from "../components/SideBar.vue";
import Tasks from "../components/Tasks.vue";
import closeSideBarIcon from '../assets/closeSideBarIcon.svg'
import openSideBarIcon from '../assets/openSideBarIcon.svg'


const sideBarIsVisible = ref(true);
</script>

<template>
  <div class="homepage">
    <SideBar v-if="sideBarIsVisible" />
    <Tasks />
  </div>
  <img
    :class="sideBarIsVisible ? 'manageSideBar' : 'manageSideBar hidden'"
    :src="sideBarIsVisible ? closeSideBarIcon : openSideBarIcon"
    alt=""
    @click="sideBarIsVisible = !sideBarIsVisible"
  />
</template>


<style scoped>
.homepage {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-right: 20px;
  background-color: var(--blackTheme-back-secondary2) !important;
}

.hidden {
  left: 1vw !important;
}

.manageSideBar {
  position: absolute;
  top: 5px;
  left: 20vw;
  width: 20px;
  height: 20px;
  cursor: pointer;
  filter: brightness(0.5);
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.375);
  border-radius: 5px;
}

.manageSideBar:hover {
  filter: brightness(1);
}

@media (max-width: 400px) {

  .manageSideBar {
    /* visibility: hidden !important; */
    left: 85vw;
  }

  .manageSideBar.hidden{
    left: 82vw
  }

  .homepage {
    padding-top: 5vh;
    padding-right: 0;
  }

}
</style>
