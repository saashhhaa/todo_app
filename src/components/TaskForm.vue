<script setup lang="ts">
import {
  useCategoriesStore,
  useTasksSStore,
  useUsersStore,
} from "../stores/store";
import dayjs from "dayjs";
import { computed, ref } from "vue";

const tasks = useTasksSStore();
const users = useUsersStore();
const categories = useCategoriesStore();
const newTaskTitle = ref("");
const newTaskDeadline = ref("");
const newTaskCategory = ref("work");

const availableCategories = computed(() => {
  const currentUserId = users.currentUser?.id;
  const currCustomCategories = categories.customCategories.filter(
    (category: { userId: number }) => category.userId == currentUserId,
  );
  return [...categories.categories, ...currCustomCategories];
});
const todayDate = computed(() => dayjs().format("YYYY-MM-DD"));

function createNewTask() {
  if (newTaskTitle.value.trim() === "") return;

  tasks.createNewTask(
    newTaskTitle.value,
    newTaskDeadline.value ? newTaskDeadline.value : "", // when deadline
    todayDate.value, //when created
    newTaskCategory.value,
  );

  newTaskTitle.value = "";
  newTaskDeadline.value = "";
}
</script>

<template>
  <div class="createTask">
    <input
      class="taskTitle"
      type="text"
      :placeholder="$t('taskManager.addTaskInput')"
      v-model="newTaskTitle"
    />
    <div class="taskDateCover">
      <label for="date"><img src="/calendarIcon.svg" alt="" /></label>
      <input
        :min="todayDate"
        v-model="newTaskDeadline"
        type="date"
        name=""
        id="taskDate"
      />
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

    <button type="submit" @click="createNewTask" class="addTaskButton">
      {{ $t("taskManager.addTaskButton") }}
    </button>
  </div>
</template>

<style scoped>
.createTask {
  max-width: 100%;
  flex-wrap: wrap;
  display: flex;
  gap: 10px;
  margin: 5vh 0;
}

select,
input {
  color: white;
  font-size: 1rem;
}

.categorySwitch,
.taskDateCover {
  display: flex;
  align-items: center;
  background-color: var(--blackTheme-back-secondary);
  gap: 10px;
  cursor: pointer;
  min-width: 10%;
  width: fit-content;
}

.taskTitle,
.addTaskButton,
.categorySwitch,
.taskDateCover {
  border-radius: 50px;
  padding: 5px 20px;
}

.taskTitle {
  background-color: var(--blackTheme-back-secondary);
  border: 1px solid rgba(255, 255, 255, 0.159);
  width: 40%;
}
.taskTitle:focus {
  outline: 1px solid var(--accent-color);
}

.addTaskButton {
  background-color: var(--accent-color);
  color: white;
  border: none;
  font-size: 1rem;
  padding: 10px 20px;
  flex-grow: 0.2;
}

img {
  filter: brightness(0.6);
}

.taskDateCover input,
.categorySwitch select {
  background-color: transparent;
  border: none;
  outline: none;
  filter: brightness(0.9);
}

.taskDateCover:hover,
.categorySwitch:hover,
.addTaskButton:hover,
input:hover {
  filter: brightness(1.2);
}

.addTaskButton:hover {
  box-shadow: 0 0 10px var(--accent-color);
}
</style>
