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

<template>
  <RouterLink to="/">
      <button><-</button>
    </RouterLink>
  <button @click="sideBarIsVisible = !sideBarIsVisible">[x]</button>
  <!-- <img class="manageSideBar" src="" alt="" @click="!sideBarIsVisible"> -->
  <SideBar v-if="sideBarIsVisible" :categories="categories" />
  <Tasks />
</template>

<!-- {{ props.currentUser?.username }}
    <RouterLink to="/">
       <button >back</button> 
    </RouterLink> -->
