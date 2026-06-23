<script setup lang="ts">
import { computed, ref } from "vue";
import {
  useCategoriesStore,
  useTasksSStore,
  useUsersStore,
} from "../stores/store.js";
import Filter from "./Filter.vue";
import TaskCard from "./TaskCard.vue";
const newTaskTitle = ref("");
const newTaskDate = ref(null);
const newTaskCategory = ref("work");

const todayDate = computed(() => {
  const today = new Date();
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
  }).format(today);
});

const users = useUsersStore();
const categories = useCategoriesStore();
const tasks = useTasksSStore();

const currentMode = ref("all");
function switchModes(mode) {
  currentMode.value = mode;
  if (mode == "all") {
    tasks.clearCategory();
  }
}
const filteredTasks = computed(() => {
  let result = tasks.tasks.filter((task) => task.userId === users.currentUser.id);

  if (tasks.selectedCategory) {
    result = result.filter((task) => task.category === tasks.selectedCategory);
  }
  if (currentMode.value === "active") {
    return result.filter((task) => !task.isDone); 
  } else if (currentMode.value === "done") {
    return result.filter((task) => task.isDone);
  } else if (currentMode.value === "today") {
    return result.filter((task) => task.date === todayDate.value);
  }
  return result;
});

const availableCategories = computed(() => {
  const currentUserId = users.currentUser.id;
  const currCustomCategories = categories.customCategories.filter(
    (category) => category.userId == currentUserId,
  );
  return [...categories.categories, ...currCustomCategories];
});

function createNewTask() {
  if (newTaskTitle.value.trim() === "") return;

  let formattedDate = "No date";

  if (newTaskDate.value) {
    const dateObj = new Date(newTaskDate.value);
    formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
    }).format(dateObj);
  }

  tasks.createNewTask(newTaskTitle.value, formattedDate, newTaskCategory.value);
  newTaskTitle.value = "";
  newTaskDate.value = "";
}
</script>

<template>
  <div class="taskManager">
    <div class="createTask">
      <input type="text" placeholder="new task title" v-model="newTaskTitle" />
      <div class="date">
        <label for="date"><img src="/calendarIcon.svg" alt="" /></label>
        <input v-model="newTaskDate" type="date" name="" id="date" required />
      </div>
      <div class="categorySwitch">
        <label for="category"><img src="/categoryIcon.svg" alt="" /></label>
        <select v-model="newTaskCategory" name="category" id="">
          <option
            v-for="category in availableCategories"
            :key="category.title"
            :value="category.title"
          >
            {{ category.title }}
          </option>
        </select>
      </div>

      <button type="submit" @click="createNewTask">add +</button>
    </div>
    <Filter :tasks="filteredTasks" @switchModes="switchModes" />

    <h3 v-if="currentMode == 'all'">All tasks</h3>
    <h3 v-if="currentMode == 'today'">Today tasks</h3>
    <h3 v-if="currentMode == 'done'">Done tasks</h3>
    <h3 v-if="currentMode == 'active'">Active tasks</h3>
    <!-- <h3 v-if="currentMode == 'active'">Active tasks</h3> -->

    <div v-if="filteredTasks.length > 0" class="grid">
      <TaskCard
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :category="task.category"
        :date="task.date"
        :catColor="task.catCol"
        :isDone="task.isDone"
        v-for="task in filteredTasks.filter(
          (task) => task.userId == users.currentUser.id,
        )"
      />
    </div>

    <p class="message" v-else>No tasks found</p>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-height: 45vh;
  overflow-y: auto;
  /* background-color: aqua; */
}

.taskManager {
  width: 100%;
}

.createTask {
  display: flex;
  width: 100%;
  gap: 10px;
  margin: 5vh 0;
}

.createTask input[type="text"] {
  width: 60%;
  color: white;
  font-size: 1rem;
  background-color: var(--blackTheme-back-secondary);
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.159);
}
.createTask input[type="text"]:focus {
  outline: 1px solid var(--accent-color);
}
.createTask button {
  background-color: var(--accent-color);
  padding: 10px 20px;
  border-radius: 50px;
  width: 10%;
  font-size: 1rem;
  color: white;
  border: none;
}

.taskManager img {
  width: 30px;
  filter: brightness(0.6);
  height: 30px;
}
.date,
.categorySwitch {
  display: flex;
  align-items: center;
  background-color: var(--blackTheme-back-secondary);
  border-radius: 50px;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.date input,
.categorySwitch select {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: white;
  filter: brightness(0.9);
}

.date:hover,
.categorySwitch:hover,
.createTask button:hover,
input:hover {
  filter: brightness(1.2);
}

.createTask button:hover {
  box-shadow: 0 0 10px var(--accent-color);
}
.message {
  filter: brightness(0.5);
  text-align: center;
  margin-top: 20vh;
}

h3 {
  margin-top: 30px;
  color: rgba(135, 137, 157, 0.604);
}
</style>
