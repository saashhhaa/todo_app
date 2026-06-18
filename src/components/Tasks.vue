<script setup lang="js">
import { UseUsersStore } from "../stores/store";

const usersStore = UseUsersStore();

const currentDay = new Date().getDate();
</script>

<template>
  <div class="cover">
    <div class="greeting">
      <img :src="usersStore.currentUser.image" alt="" class="profileImage" />
      <div class="block">
        <h1>TodoApp</h1>
        <p>Hello, {{ usersStore.currentUser.username }}!</p>
      </div>
    </div>
    <div class="date">{{ currentDay }}</div>
  </div>
</template>
