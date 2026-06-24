<script setup>
import { defineEmits, ref } from "vue";
import { useI18n } from "vue-i18n";
const emit = defineEmits(["switchModes"]);
const {t} = useI18n()
const props = defineProps({
  tasks: Array,
});
const currMode = ref("all");

function changeMode(mode) {
  currMode.value = mode;
  emit("switchModes", mode);
}

</script>

<template>
  <div class="filter">
    <div class="cover">
      <button
        @click="changeMode('today')"
        :class="currMode == 'today' ? 'filterMode activeToday' : 'filterMode'"
      >
        {{$t('taskManager.filterToday') }}
      </button>
      <img src="/filterIcon.svg" alt="" />
      <button
        @click="changeMode('all')"
        :class="currMode == 'all' ? 'filterMode activeAll' : 'filterMode'"
      >
        {{ $t('taskManager.filterAll') }}
      </button>
      <button
        @click="changeMode('active')"
        :class="currMode == 'active' ? 'filterMode activeActive' : 'filterMode'"
      >
        {{ $t('taskManager.filterActive')}}
      </button>
      <button
        @click="changeMode('done')"
        :class="currMode == 'done' ? 'filterMode  activeDone' : 'filterMode'"
      >
        {{ $t('taskManager.filterDone') }}
      </button>
    </div>
    <p class="tasksAmount">{{ tasks.length }} {{ $t('taskManager.tasks') }}</p>
  </div>
</template>

<style scoped>
.tasksAmount {
  color: rgba(255, 255, 255, 0.626);
}

.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cover img {
  width: 30px;
  height: 30px;
  filter: brightness(0.5);
}

.activeToday {
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  border-radius: 10px;
}

.cover {
  display: flex;
  gap: 10px;
  align-items: center;
}
button {
  padding: 10px 20px;
  background-color: var(--blackTheme-back-secondary);
  color: white;
  border-radius: 100px;
  border: 1px solid transparent;
  font-size: 16px;
  filter: brightness(0.9);
}

button:hover {
  filter: brightness(1);
}

.activeDone {
  border: 1px solid rgb(98, 219, 98);
  color: rgb(98, 219, 98);
}

.activeActive {
  border: 1px solid rgb(228, 192, 12);
  color: rgb(228, 192, 12);
}

.activeAll {
  border: 1px solid rgb(67, 146, 237);
  color: rgb(102, 167, 241);
}
</style>
