<script setup lang="ts">
import { useCategoriesStore, useTasksSStore } from "../stores/store";
import doneIcon from '../assets/doneIcon.svg'
import activeIcon from '../assets/circleIcon.svg'

interface Task {
  id: number;
  title: string;
  category: string;
  catColor: string;
  date: string;
  isDone: boolean;
}

const props = defineProps<Task>();

const tasks = useTasksSStore();
const categories = useCategoriesStore();

function deleteTask() {
  tasks.deleteTask(props.id);
  const catAmount = categories.categories.find(
    (cat) => cat.title == props.category,
  );
  if (catAmount) {
    catAmount.count -= 1;
  }
}
</script>

<template>
  <div :class="props.isDone ? 'taskCard done' : 'taskCard'">
    <div class="cover">
      <img
        @click="tasks.switchTaskState(props.id)"
        class="doneButton"
        :src="props.isDone ? doneIcon : activeIcon"
        alt=""
      />
      <div class="taskInfo">
        <div class="taskTitle">{{ props.title }}</div>
        <div class="cover">
          <div class="category" :style="{ color: props.catColor }">
            <div
              class="categotyColor"
              :style="{ backgroundColor: props.catColor }"
            ></div>
            {{ props.category }}
          </div>
          <div v-if="props.date != null" class="date">
            <img src="/calendarIcon.svg" />
            <div class="">{{ props.date }}</div>
          </div>
        </div>
      </div>
    </div>

    <img @click="deleteTask" class="deleteTask" src="/deleteIcon.svg" />
  </div>
</template>

<style scoped>
.done {
  filter: brightness(0.9);
  background-color: rgba(89, 162, 134, 0.355) !important;
  color: rgb(126, 245, 197);
}

.done .category {
  filter: brightness(0.6);
}

.done .taskTitle {
  text-decoration: line-through;
  filter: brightness(0.6);
}

.done:hover {
  filter: brightness(1) !important;
}

.doneButton {
  width: 30px;
  height: 30px;
  margin-right: 30px;
  cursor: pointer;
}
.doneButton:hover {
  filter: brightness(1.2);
}

.taskTitle {
  margin-bottom: 10px;
}
.categotyColor {
  width: 5px;
  height: 5px;
  border-radius: 100px;
}

.date img {
  width: 15px;
  height: 15px;
}

.date {
  filter: brightness(0.6);
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 14px;
}

.taskCard {
  justify-content: space-between;
  display: flex;
  /* width: 100%; */
  background-color: var(--blackTheme-back-secondary);
  padding: 20px 40px;
  border-radius: 10px;
  align-items: center;
  margin: 20px 20px 0 0;
}
.taskCard:hover {
  filter: brightness(1.2);
  transform: scale(1.01);
}

.cover {
  display: flex;
  align-items: center;
  gap: 20px;
}

.category {
  display: flex;
  align-items: center;
  gap: 5px;
}

.deleteTask {
  opacity: 0;
  cursor: pointer;
  width: 25px;
  height: 25px;
}

.taskCard:hover .deleteTask {
  opacity: 1;
}
</style>
