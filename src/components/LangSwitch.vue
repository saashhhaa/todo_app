<script setup >
import { useLangStore } from "../stores/store";
const langStore = useLangStore();


</script>

<template>
  <button @click="langStore.switchLang" class="linkToPage">
    <div>{{ langStore.lang }}</div>
    <img src="/languageIcon.svg" alt="" />
  </button>
</template>

<style scoped>
img {
  width: 20px;
  height: 20px;
}

.linkToPage {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(92, 94, 117);
  color: white;
  padding: 10px 30px;
  width: fit-content;
  font-size: 16px;
  background-color: var(--blackTheme-back-secondary2);
  border-radius: 30px;
  cursor: pointer;
  filter: brightness(0.8);
}

.linkToPage:hover {
  filter: brightness(1);
}
</style>
