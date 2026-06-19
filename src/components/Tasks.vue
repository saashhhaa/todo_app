<script setup lang="js">
import { useUsersStore } from "../stores/store";

const usersStore = useUsersStore();

import { computed } from "vue";

const formattedDate = computed(() => {
  const today = new Date();
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(today);
});
</script>

<template>
  <div class="main">
    <div class="cover">
    <div class="greeting">
      <div class="profileImage"></div>
      <div class="block">
        <h1>TodoApp</h1>
        <p class="current-user-greeting">Hello {{ usersStore.currentUser?.username }}!</p>
      </div>
    </div>
    <div class="date">{{ formattedDate }}</div>
  </div>
  </div>
  
</template>

<style scoped>
.date {
  font-weight: 700;
  filter: brightness(0.5);
  font-size: 20px;
}
.main {
  /* color: black; */
  width: 70vw;
  margin:  5vh 5vw 0 2vw;
  padding: 2vh 3vw;
  /* background-color: antiquewhite; */
}

.profileImage {
  border-radius: 100px;
  width: 70px;
  height: 70px;
  background-image: url('/public/profileImageTest.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.cover {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2vh;
  border-bottom: 1px solid rgb(92, 94, 117);
}

.greeting {
  display: flex;
  gap: 20px;
}

.current-user-greeting {
  filter:brightness(0.6)
}

</style>
