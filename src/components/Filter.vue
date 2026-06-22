<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["switchModes"]);
const props = defineProps({
    tasks: Array
})
</script>

<template>
  <div class="filter">
    <div class="cover">
        <button @click="emit('switchModes', 'today')" class="filterMode today">
        today
      </button>
      <img src="/filterIcon.svg" alt="">
      <button @click="emit('switchModes', 'all')" class="filterMode all">
        all
      </button>
      <button @click="emit('switchModes', 'active')" class="filterMode active">
        active
      </button>
      <button @click="emit('switchModes', 'done')" class="filterMode done">
        done
      </button>
    </div>
    <p class="tasksAmount">{{ tasks.length }} tasks</p>
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

.today {
    border: 1px solid rgba(98, 219, 98, 0.514);
  color: rgba(98, 219, 98, 0.843);
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

.done:hover {
  border: 1px solid rgb(98, 219, 98);
  color: rgb(98, 219, 98);
}

.active:hover {
  border: 1px solid rgb(228, 192, 12);
  color: rgb(228, 192, 12);
}

.all:hover {
  border: 1px solid rgb(67, 146, 237);
  color: rgb(102, 167, 241);
}
</style>
