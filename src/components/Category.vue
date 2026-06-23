<script setup>
import { ref } from "vue";
import { useCategoriesStore } from "../stores/store";

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  count: {
    type: Number,
    required: false,
  },
  isCustom: {
    type: Boolean,
    required: false,
  },
});

const categories = useCategoriesStore();
const isClicked = ref(false)
function deleteCategory() {
  categories.deleteCategory(props.id);
  isClicked.value = true
}
</script>

<template>
  <div class="category">
    <div class="category-icon" :style="{ backgroundColor: props.color }"></div>
    <div>{{ props.title }}</div>
    <img
      v-if="isCustom"
      @click="deleteCategory"
      class="delete"
      src="/deleteIcon.svg"
      alt=""
    />
    <div class="box" v-else></div>
    <div class="category-count">{{ props.count }}</div>
  </div>
</template>

<style scoped>
.category {
  display: grid;
  grid-template-columns: 10% 60% 10% 10%;
  align-items: center;
  border-radius: 10px;
  padding: 15px 20px;
  background-color: var(--blackTheme-back-secondary);
    border: 1px solid transparent;
}

.delete {
  opacity: 0;
}

.active {
    background-color: rgba(215, 229, 250, 0.316) !important;
    border: 1px solid rgba(255, 255, 255, 0.477);
}

.box,
.delete {
  width: 25px;
  height: 25px;
}

.category:hover .delete {
  opacity: 1;
}

.category-icon {
  width: 10px;
  height: 10px;
  border-radius: 100px;
}

.category-count {
  filter: brightness(0.5);
  text-align: end;
}

.category:hover {
  filter: brightness(1.3);
  cursor: pointer;
}
</style>
