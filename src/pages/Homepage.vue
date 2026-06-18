<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SideBar from "../components/SideBar.vue";
import Tasks from "../components/Tasks.vue";
const categories = ref([
  {
    img: "",
    title: "work",
  },
  {
    img: "",
    title: "study",
  },
  {
    img: "",
    title: "home",
  },
  {
    img: "",
    title: "personal",
  },
]);

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  currentUser: {
    type: [Object, null],
    required: false,
  },
});

const router = useRouter();

const sideBarIsVisible = ref(true);
</script>

<template >
  <div class="homepage">
    <SideBar v-if="sideBarIsVisible" :categories="categories" />
  <Tasks />
  </div>
  <!-- <button @click="sideBarIsVisible = !sideBarIsVisible">[x]</button> -->
  <!-- <img class="manageSideBar" src="" alt="" @click="!sideBarIsVisible"> -->
  
</template>

<!-- {{ props.currentUser?.username }}
    <RouterLink to="/">
       <button >back</button> 
    </RouterLink> -->

<style scoped>
.homepage {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: var(--blackTheme-back) !important;
}


</style>  