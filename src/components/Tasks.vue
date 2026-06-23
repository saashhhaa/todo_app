<script setup lang="js">
import { useTasksSStore, useUsersStore } from "../stores/store";

const usersStore = useUsersStore();
const tasks = useTasksSStore();
import { computed } from "vue";
import TasksManager from "./TasksManager.vue";

const formattedDate = computed(() => {
  const today = new Date();
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(today);
});

function deleteAllDone() {
  tasks.tasks = tasks.tasks.filter((task) => !task.isDone);
  localStorage.setItem("tasks", JSON.stringify(tasks.tasks));
}
</script>

<template>
  <div class="main">
    <div class="cover">
      <div class="greeting">
        <!-- <div class="profileImage"></div> -->
        <img
          :src="usersStore.currentUser?.image || '/public/profileImageTest.jpg'"
          class="profileImage"
        />
        <div class="block">
          <h1>TodoApp</h1>
          <p class="current-user-greeting">
            Hello {{ usersStore.currentUser?.username }}!
          </p>
        </div>
      </div>
      <div class="date">{{ formattedDate }}</div>
    </div>
    <TasksManager />
    <button @click="deleteAllDone" class="deleteAll">
      delete done tasks <img src="/deleteIcon.svg" alt="" />
    </button>
  </div>
</template>

<style scoped>
.deleteAll {
  position: absolute;
  bottom: 20px;
  right: 40px;
  background-color: transparent;
  border: 1px solid rgb(255, 118, 118);
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  color: rgb(255, 118, 118);
  align-items: center;
}

.deleteAll:hover {
  filter: brightness(1.2);
}

.deleteAll img {
  width: 25px;
  height: 25px;
}

.date {
  font-weight: 700;
  filter: brightness(0.5);
  font-size: 20px;
}
.main {
  /* color: black; */
  width: 100%;
  margin: 5vh 5vw 0 2vw;
  padding: 2vh 3vw;

  /* background-color: antiquewhite; */
}

.profileImage {
  border-radius: 100px;
  width: 73px;
  height: 70px;
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
  filter: brightness(0.6);
}
</style>
