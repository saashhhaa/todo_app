<script setup>
import { ref } from "vue";
import Category from "./Category.vue";
import { useCategoriesStore } from "../stores/store.js";
import Settings from "../pages/Settings.vue";

const categoriesStore = useCategoriesStore();

const categotyTitle = ref("");
const categoryColor = ref("#1a9185");
const categoryCount = ref(0);

const cantAddMore = ref(false)

const modalIsVisible = ref(false);

const isSettings = ref(false)

function addCategory() {
  if(categoriesStore.categories.length > 4){
    cantAddMore.value = true
  }
  else if (categotyTitle.value.trim() == "") {
    modalIsVisible.value = false;
    return;
  } else {
    categoriesStore.addCategory(categotyTitle.value, categoryColor.value, categoryCount.value);
  }
  categotyTitle.value = "";
  categoryColor.value = "#1a9185";
  modalIsVisible.value = false;
}
</script>

<template>
  <div class="sideBar">
    <div class="top">

    <div class="search">
      <img src="/searchIcon.svg" alt="" />
      <input type="text" placeholder="search task by name" />
    </div>
      <div class="categories">
      <h2>Categories</h2>
      <div class="categories_list">
        <Category
          v-for="category in categoriesStore.categories"
          :key="category.title"
          :title="category.title"
          :color="category.color"
          :count="category.count"
        />
      </div>
      <button
        v-if="!modalIsVisible"
        @click="modalIsVisible = true"
        :class="cantAddMore ? 'add-category-button disabled' :'add-category-button'"
      >
        add category <span>+</span>
      </button>
      <div v-else class="addCategory_input">
        <input
          type="text"
          id="categoryTitle"
          v-model="categotyTitle"
          placeholder="Category title"
          class="categoryInput"
        />
        <input type="color" id="categoryColor" v-model="categoryColor" />
        <button @click="addCategory">+</button>
      </div>
    </div>
    <div class="calendar">
      <h2>Calendar</h2>
      <div>тута буде календар</div>
    </div>
    </div>
    

    <div class="sideBarButtons">
      <!-- <RouterLink to="/settings"> -->
        <button @click="isSettings = true" class="linkToPage">
          <div>settings</div>
          <img src="/settingsIcon.svg" alt="" />
        </button>
      <!-- </RouterLink> -->
      <RouterLink to="/allTasks">
        <button class="linkToPage">
          <div>all tasks</div>
          <img src="/tasksIcon.svg" alt="" />
        </button>
      </RouterLink>
    </div>
  </div>

  <div v-if="isSettings" class="modal">
    <Settings @close="isSettings=false" />
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

.add-category-button.disabled{
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
