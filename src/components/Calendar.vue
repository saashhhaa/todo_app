<script setup>
import { useDateStore } from '../stores/store.ts';
import { useI18n } from 'vue-i18n';
const {locale} = useI18n()
const dateStore = useDateStore()

</script>

<template>
    <VDatePicker 
      v-model="dateStore.selectedDate" 
      mode="date"
      :locale="locale"
      expanded
    />
</template>

<style scoped>

</style>