<script setup lang="ts">
import { computed, ref } from "vue";
import {
  useCategoriesStore,
  useTasksSStore,
  useUsersStore,
} from "../stores/store.js";
import Filter from "./Filter.vue";
import TaskCard from "./TaskCard.vue";
import { useI18n } from "vue-i18n";
const newTaskTitle = ref("");
const newTaskDate = ref(null);
const newTaskCategory = ref("work");

import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import TasksTable from "./TasksTable.vue";
const todayDate = computed(() => dayjs().format("YYYY-MM-DD"));

const viewDataMode = ref<"grid" | "table">("grid");

const { t, locale } = useI18n();

const users = useUsersStore();
const categories = useCategoriesStore();
const tasks = useTasksSStore();

const currentMode = ref("all");
function switchModes(mode: string) {
  currentMode.value = mode;
  if (mode == "all") {
    tasks.clearCategory();
  }
}
const filteredTasks = computed(() => {
  let result = tasks.tasks.filter(
    (task: { userId: number }) => task.userId === users.currentUser?.id,
  );

  if (tasks.selectedCategory) {
    result = result.filter(
      (task: { category: string }) => task.category === tasks.selectedCategory,
    );
  }
  if (currentMode.value === "active") {
    return result.filter((task: { isDone: boolean }) => !task.isDone);
  } else if (currentMode.value === "done") {
    return result.filter((task: { isDone: boolean }) => task.isDone);
  } else if (currentMode.value === "today") {
    return result.filter(
      (task: { date: string }) => task.date === todayDate.value,
    );
  }
  return result;
});

const availableCategories = computed(() => {
  const currentUserId = users.currentUser?.id;
  const currCustomCategories = categories.customCategories.filter(
    (category: { userId: number }) => category.userId == currentUserId,
  );
  return [...categories.categories, ...currCustomCategories];
});

function formatTaskDate(rawDate: string) {
  if (!rawDate) return "";

  const dateObj = dayjs(rawDate);
  if (!dateObj.isValid()) return null;

  return dateObj.locale(locale.value).format("D MMMM");
}

function createNewTask() {
  if (newTaskTitle.value.trim() === "") return;

  tasks.createNewTask(
    newTaskTitle.value,
    newTaskDate.value ? newTaskDate.value : "",
    newTaskCategory.value,
  );

  newTaskTitle.value = "";
  newTaskDate.value = null;
}
</script>

<template>
  <div class="taskManager">
    <div class="createTask">
      <input
        type="text"
        :placeholder="$t('taskManager.addTaskInput')"
        v-model="newTaskTitle"
      />
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

      <button type="submit" @click="createNewTask">
        {{ $t("taskManager.addTaskButton") }}
      </button>
    </div>
    <Filter :tasks="filteredTasks" @switchModes="switchModes" />

    <h3 v-if="currentMode == 'all'">{{ $t("taskManager.titleAllTasks") }}</h3>
    <h3 v-if="currentMode == 'today'">
      {{ $t("taskManager.titleTodayTasks") }}
    </h3>
    <h3 v-if="currentMode == 'done'">{{ $t("taskManager.titleDoneTasks") }}</h3>
    <h3 v-if="currentMode == 'active'">
      {{ $t("taskManager.titleActiveTasks") }}
    </h3>

    <button
      @click="
        viewDataMode == 'table'
          ? (viewDataMode = 'grid')
          : (viewDataMode = 'table')
      "
      class="viewSwitcher"
    >
      {{
        viewDataMode == "table"
          ? $t("taskManager.switcherGrid")
          : $t("taskManager.switcherTable")
      }}
    </button>

    <div v-if="filteredTasks.length > 0 && viewDataMode == 'grid'" class="grid">
      <TaskCard
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :category="task.category"
        :date="formatTaskDate(task.date) ?? undefined"
        :catColor="task.catCol"
        :isDone="task.isDone"
        v-for="task in filteredTasks.filter(
          (task: { userId: number }) => task.userId == users.currentUser?.id,
        )"
      />
    </div>
    <TasksTable
      v-else-if="viewDataMode == 'table'"
      :tasksList="filteredTasks"
      :key="JSON.stringify(filteredTasks)"
    />

    <p class="message" v-else>{{ $t("taskManager.noTasksMessage") }}</p>
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

.viewSwitcher {
  background-color: white;
  filter: brightness(0.6);
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  position: absolute;
  top: 315px;
  right: 250px;
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
  width: 15%;
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
