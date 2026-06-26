<script setup lang="ts">
import { ref } from "vue";
import Category from "./Category.vue";
import {
  useCategoriesStore,
  useTasksSStore,
  useUsersStore,
} from "../stores/store.js";
import Settings from "../pages/Settings.vue";
import LangSwitch from "./LangSwitch.vue";
import { useI18n } from "vue-i18n";
import Wheather from "./Wheather.vue";

import { onClickOutside } from "@vueuse/core";
const settingsRef = ref(null);
onClickOutside(settingsRef, () => {
  isSettings.value = false;
});

const { t } = useI18n();
const categoriesStore = useCategoriesStore();
const users = useUsersStore();
const categotyTitle = ref("");
const categoryColor = ref("#1a9185");
const tasksStore = useTasksSStore();
const newCategoryFormVisible = ref(false);
const isSettings = ref(false);

function getTaskCount(categoryTitle: string): number {
  return tasksStore.tasks.filter(
    (task) =>
      task.userId === users.currentUser?.id && task.category === categoryTitle,
  ).length;
}

function addCategory(): void {
  if (categotyTitle.value.trim() == "") {
    newCategoryFormVisible.value = false;
    return;
  } else {
    categoriesStore.addCategory(categotyTitle.value, categoryColor.value);
  }
  categotyTitle.value = "";
  categoryColor.value = "#1a9185";
  newCategoryFormVisible.value = false;
}

</script>

<template>
  <div class="sideBar">
    <div class="top">
      <div class="search">
        <img src="/searchIcon.svg" alt="" />
        <input type="text" :placeholder="$t('sideBar.searchInput')" />
      </div>
      <div class="categories">
        <h2>{{ $t("sideBar.categTitle") }}</h2>
        <div class="categories_list">
          <Category
            v-for="category in categoriesStore.categories"
            @click="tasksStore.selectCategory(category.title)"
            :key="category.title"
            :title="category.title"
            :color="category.color"
            :count="getTaskCount(category.title)"
            :class="{ active: tasksStore.selectedCategory === category.title }"
          />
          <Category
            v-if="categoriesStore.customCategories.length"
            v-for="category in categoriesStore.customCategories.filter(
              (cat) => cat.userId == users.currentUser?.id,
            )"
            @click="tasksStore.selectCategory(category.title)"
            :key="category.id"
            :id="category.id"
            :title="category.title"
            :color="category.color"
            :count="getTaskCount(category.title)"
            :isCustom="category.isCustom"
            :class="{ active: tasksStore.selectedCategory === category.title }"
          />
        </div>
        <button
          v-if="
            !newCategoryFormVisible &&
            categoriesStore.customCategories.length != 5
          "
          @click="newCategoryFormVisible = true"
          class="add-category-button"
        >
          {{ $t("sideBar.addCategButton") }}
        </button>
        <div v-if="newCategoryFormVisible" class="addCategory_input">
          <input
            type="text"
            id="categoryTitle"
            v-model="categotyTitle"
            :placeholder="$t('sideBar.categoryName')"
            class="categoryInput"
          />
          <input type="color" id="categoryColor" v-model="categoryColor" />
          <button @click="addCategory">+</button>
        </div>
      </div>
    </div>
    <Wheather />
    <div class="sideBarButtons">
      <button @click="isSettings = true" class="linkToPage">
        <div>{{ $t("sideBar.settings") }}</div>
        <img src="/settingsIcon.svg" alt="" />
      </button>
      <LangSwitch />
    </div>
  </div>

  <div v-if="isSettings" class="modal">
    <Settings
      ref="settingsRef"
      class="settings-window"
      @close="isSettings = false"
    />
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  z-index: 100;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.526);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.addCategory_input {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.add-category-button.disabled {
  display: none;
}
.addCategory_input input[type="text"] {
  flex: 2;
  outline: none;
  font-size: 16px;
  border: 1px solid transparent;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: var(--blackTheme-back-secondary);
  color: white;
}
.addCategory_input input[type="color"] {
  outline: none;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 10px;
}

.addCategory_input button {
  padding: 10px 15px;
  background-color: var(--accent-color);
  border: none;
  font-size: 16px;
  border-radius: 10px;
  color: white;
}

.addCategory_input button:hover {
  filter: brightness(1.2);
}

.addCategory_input input[type="text"]:hover {
  border: 1px solid var(--accent-color);
}

img {
  width: 20px;
  height: 20px;
}

.sideBar {
  background-color: var(--blackTheme-back);
  padding: 30px;
  width: 20vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(135, 137, 157, 0.604);
  border-radius: 0px 5px 5px 0px;
  border-top: 1px solid rgba(135, 137, 157, 0.604);
  border-bottom: 1px solid rgba(135, 137, 157, 0.604);
}

.categories_list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

h2 {
  margin: 30px 0 20px 0;
  color: rgb(135, 137, 157);
  font-weight: 500;
  font-size: 16px;
}

.search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border: 1px solid var(--blackTheme-back-secondary);
  border-radius: 30px;
  background-color: var(--blackTheme-back-secondary2);
  color: white;
}

.search img {
  filter: brightness(0.6);
}

.search input {
  width: 80%;
  font-size: 16px;
  background-color: transparent;
  padding: 5px 10px;
  color: white;
  border: none;
  outline: none;
}

input::placeholder {
  color: rgb(135, 137, 157);
}

.search:hover {
  border: 1px solid var(--accent-color);
}

.add-category-button {
  width: 100%;
  margin-top: 20px;
  background-color: transparent;
  color: rgb(92, 94, 117);
  border: 1px solid rgb(92, 94, 117);
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
}

.add-category-button span {
  color: rgb(92, 94, 117);
}

.add-category-button:hover {
  filter: brightness(1.5);
}

.visible {
  display: block;
}
.hidden {
  display: none;
}

.sideBarButtons {
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid rgb(92, 94, 117);
}

.linkToPage {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(92, 94, 117);
  color: white;
  padding: 10px 30px;
  font-size: 16px;
  background-color: var(--blackTheme-back-secondary2);
  border-radius: 30px;
  cursor: pointer;
  filter: brightness(0.6);
}

.linkToPage:hover {
  filter: brightness(1);
}
</style>
