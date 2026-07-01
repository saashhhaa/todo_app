<script setup lang="js">
import { useTasksSStore, useUsersStore } from "../stores/store";
const usersStore = useUsersStore();
const tasks = useTasksSStore();
import { computed } from "vue";
import TasksManager from "./TasksManager.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

</script>

<template>
 
</template>

<style scoped>
.deleteAll {
  background-color: transparent;
  border: 1px solid rgb(255, 118, 118);
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 10px;
  display: flex;
justify-self: center;
align-self: center;
  gap: 10px;
  color: rgb(255, 118, 118);
  align-items: center;  position: relative;
    /* bottom: -30px; */
    /* left: 5vw; */
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
  max-width: 100%;
  width: 80%;
  gap: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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

@media (max-width: 400px) {
  .main {
    margin: 0;
    padding: 5vh 10vw;

    /* background-color: antiquewhite; */
  }

  .main .cover {
    flex-direction: column;
    align-items: start;
    width: 80%;
  }

  .main .cover .date {
    margin-top: 20px;
  }
  /* .deleteAll {
    position: relative;
    bottom: -30px;
    left: 5vw;
  } */
}
</style>
