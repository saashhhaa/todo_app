<script setup>
import { ref, computed } from "vue";

const tasks = ref([
  { id: 1, title: "помыть кота", isDone: false },
  { id: 2, title: "погулять", isDone: false },
]);



const filterModes = ref({
  1: 'all',
  2: 'active',
  3: 'done'
})

const currentMode = ref(filterModes.value[1])

const doneTasks = computed(() => {
  return tasks.value.filter((task) => task.isDone)
})

const activeTasks = computed(() => {
  return tasks.value.filter((task) => !task.isDone)
})

const newTaskTitle = ref('')

function addTask (){
  tasks.value.push({
    id: tasks.value.length,
    title: newTaskTitle.value,
    isDone: false
  })
}

</script>

<template>
  <h1>TODO APP</h1>
  <input v-model="newTaskTitle"/> <button @click="addTask">добавить</button>
  <div>
    <div>фильтр</div>
    <button @click="currentMode = filterModes[1]">все</button>
    <button @click="currentMode = filterModes[2]">активные</button>
    <button @click="currentMode = filterModes[3]">завершенные</button>
  </div>
  <div>
    <h2>список задач</h2>
    <div v-if="currentMode == filterModes[1]">
<ul>
      <li class="" v-for="task in tasks" :key="task.id">
        <input @change="task.isDone = !task.isDone" type="checkbox" /><label>{{
          task.title
        }}</label
        ><button >удалить</button>
      </li>
    </ul>
    </div>

      <div v-if="currentMode == filterModes[2]">
    <ul>
      <li class="" v-for="task in activeTasks " :key="task.id">
        <input @change="task.isDone = !task.isDone" type="checkbox" /><label>{{
          task.title
        }}</label
        ><button >удалить</button>
      </li>
    </ul>
    </div>

      <div v-if="currentMode == filterModes[3]">
    <ul>
      <li class="" v-for="task in doneTasks" :key="task.id">
        <input @change="task.isDone = !task.isDone" type="checkbox" /><label>{{
          task.title
        }}</label
        ><button >удалить</button>
      </li>
    </ul>
    </div>
    
  </div>
  <div>Задачи: {{doneTasks.length}}/ {{tasks.length}}</div>
</template>