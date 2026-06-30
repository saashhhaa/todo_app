<!-- <script setup>
import { useDateStore } from '../stores/store.ts';
import { useI18n } from 'vue-i18n';
const {locale} = useI18n()
const dateStore = useDateStore()

</script>

<template  >
    <VDatePicker 
      v-model="dateStore.selectedDate" 
      mode="date"
      :locale="locale"
      expanded
    />
</template> -->
<script setup>
import { useDateStore } from '../stores/store.ts';
import { useI18n } from 'vue-i18n';
const {locale} = useI18n()
const dateStore = useDateStore()

</script>

<template>
  <div class="calendar-wrap">
    <VDatePicker 
      v-model="dateStore.selectedDate" 
      mode="date"
      :locale="locale"
      expanded
    />
  </div>
</template>

<style scoped>
.calendar-wrap {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.calendar-wrap :deep(.vc-container) {
  width: 100% !important;
  border: none;
}

@media (max-width: 480px) {
  .calendar-wrap :deep(.vc-container) {
    font-size: 13px;
  }
}
</style>