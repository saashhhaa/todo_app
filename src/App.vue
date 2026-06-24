<script setup>
import { onMounted, ref } from "vue";
import { useThemeStore } from "./stores/store";
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.applyTheme(); 
});
</script>

<template>
  <RouterView />
</template>
