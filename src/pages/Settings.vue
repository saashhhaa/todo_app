<script setup>
import { UseUsersStore } from '../stores/store';

  const usersStore = UseUsersStore()
</script>

<template>
  <div class="top">
    <RouterLink to="/homepage">
      <button><-</button>
    </RouterLink>
    <h1>Settings</h1>
  </div>

  <div class="account">
    <div class="profileImage">
      <!-- <input v-if="props.currentUser.image==''" type="file"> -->
      <!-- <img :src="props.currentUser.image" alt=""> -->
    </div> 
    <div class="">
       <div>{{usersStore.currentUser?.username }}</div>
    <div>{{ usersStore.currentUser?.email }}</div>
    </div>
   
  </div>
</template>
