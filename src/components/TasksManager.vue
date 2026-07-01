<script setup lang="ts">
import { computed, ref } from "vue";
import { useTasksSStore, useUsersStore } from "../stores/store.js";
import Filter from "./Filter.vue";
import TaskCard from "./TaskCard.vue";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import TasksTable from "./TasksTable.vue";
import TaskForm from "./TaskForm.vue";
import Greeting from "./Greeting.vue";

const usersStore = useUsersStore();
const tasks = useTasksSStore();
const { t, locale } = useI18n();
const todayDate = computed(() => dayjs().format("YYYY-MM-DD"));
const viewDataMode = ref<"grid" | "table">("grid");

const currentMode = ref("all");

const filteredTasks = computed(() => {
  let result = tasks.tasks.filter(
    (task: { userId: number }) => task.userId === usersStore.currentUser?.id,
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
  } else if (currentMode.value === "deadlined") {
    return tasks.getDeadlinedTasks.filter((task) =>
      tasks.selectedCategory ? task.category === tasks.selectedCategory : true,
    );
  } else if (currentMode.value === "today") {
    return result.filter(
      (task: { deadlineDate: string }) => task.deadlineDate === todayDate.value,
    );
  }

  return result;
});

function deleteAllDone() {
  tasks.tasks = tasks.tasks.filter((task) => !task.isDone);
  localStorage.setItem("tasks", JSON.stringify(tasks.tasks));
}

function formatTaskDate(rawDate: string) {
  if (!rawDate) return "";
  const dateObj = dayjs(rawDate);
  if (!dateObj.isValid()) return null;
  return dateObj.locale(locale.value).format("D MMMM");
}

function switchModes(mode: string) {
  currentMode.value = mode;
  if (mode == "all") {
    tasks.clearCategory();
  }
}
</script>

<template>
  <div class="taskManager">
    <Greeting />
    <TaskForm />
    <Filter :tasks="filteredTasks" @switchModes="switchModes" />

    <h3 v-if="currentMode == 'all'">
      {{ $t("taskManager.titleAllTasks") }}
    </h3>
    <h3 v-if="currentMode == 'today'">
      {{ $t("taskManager.titleTodayTasks") }}
    </h3>
    <h3 v-if="currentMode == 'done'">
      {{ $t("taskManager.titleDoneTasks") }}
    </h3>
    <h3 v-if="currentMode == 'active'">
      {{ $t("taskManager.titleActiveTasks") }}
    </h3>
    <h3 v-if="currentMode == 'deadlined'">
      {{ $t("taskManager.titleDeadlinedTasks") }}
    </h3>

    <div class="buttonsCover">
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
      <button @click="deleteAllDone" class="deleteAllDone">
        {{ $t("taskManager.deleteAllDoneTasksButton") }}
        <img src="/deleteIcon.svg" alt="" />
      </button>
    </div>

    <div
      v-if="filteredTasks.length > 0 && viewDataMode == 'grid'"
      class="tasksGrid"
    >
      <TaskCard
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :category="task.category"
        :deadlineDate="formatTaskDate(task.deadlineDate) || ''"
        :deadlineDateNoFormat="task.deadlineDate || ''"
        :createDate="todayDate || ''"
        :doneDate="'-'"
        :isDeadlined="task.isDeadlined"
        :catColor="task.catCol"
        :isDone="task.isDone"
        v-for="task in filteredTasks.filter(
          (task: { userId: number }) =>
            task.userId == usersStore.currentUser?.id,
        )"
      />
    </div>
    <TasksTable
      v-else-if="viewDataMode == 'table'"
      :tasksList="filteredTasks"
      :key="JSON.stringify(filteredTasks)"
    />

    <p class="noTasksMessage" v-else>{{ $t("taskManager.noTasksMessage") }}</p>
  </div>
</template>

<style scoped>
.taskManager {
  padding: 5vh 5vw;
  width: 65vw;
}

.tasksGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

h3 {
  color: rgba(135, 137, 157, 0.604);
  margin: 5vh 0 2vh;
}

.viewSwitcher,
.deleteAllDone {
  filter: brightness(0.6);
}

.viewSwitcher:hover,
.deleteAllDone:hover {
  filter: brightness(1);
}


.noTasksMessage {
  filter: brightness(0.5);
  text-align: center;
  margin-top: 15vh;
}

.deleteAllDone {
  background-color: transparent;
  border: 1px #cb5e5e solid;
  color: #cb5e5e;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
}

.viewSwitcher {
  background-color: transparent;
  border: 1px #ffffff solid;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
}

.buttonsCover {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 1190px) {
  .tasksGrid{
    grid-template-columns: 1fr;
  }
  
}

/* .grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-height: 45vh;
  overflow-y: auto;
}

.taskManager {
  width: 100%;
}

.createTask {
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  margin: 5vh 0;
}


@media (max-width:850px) {
  .viewSwitcher {
    display: none;
  }
}

.createTask input[type="text"] {
  width: 40%;
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

  flex-grow: 0.3;
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



@media (max-width: 750px) {
  .grid{
  grid-template-columns: repeat(1, 1fr);

  }

}


@media (max-width: 400px) {
  .createTask {
    flex-direction: column;
    width: 100%;
    max-width: 80vw;
    align-items: center;
  }
  .createTask input {
    width: 90% !important;
  }
  .date, .categorySwitch  {
    width: 90%;
    padding: 5px 20px;
  }
  .createTask button {
    width: 100%;
  }

  .grid {
    display: flex;
    flex-direction: column;
  }

  .message {
    margin-top: 10vh;
  }

  .viewSwitcher {
    top: 70vh;
    right: 20vw;
    display: none;
  }

} */
</style>
