<script setup>
import { ref } from "vue";
import Category from "./Category.vue";

const props = defineProps({
  categories: {
    type: Array,
    required: false,
  },
});
</script>

<template>
  <div class="searchBar">
    <div>
      <input type="text" placeholder="search task by name" /><img
        src=""
        alt=""
      />
    </div>
    <div class="categories">
      <h2>Categories</h2>
      <div class="categories_list" v-for="category in categories">
        <Category :title="category.title" :img="category.img" />
      </div>
    </div>
    <div class="calendar">
      <h2>Calendar</h2>
      <div>тута буде календар</div>
    </div>

    <div class="sideBarButtons">
      <RouterLink to="/settings">
        <button>
          <div>Settings</div>
          <img src="" alt="" />
        </button>
      </RouterLink>
      <RouterLink to="/allTasks">
        <button>
          <div>All tasks</div>
          <img src="" alt="" />
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.searchBar {
  background-color: var(--blackTheme-back);
  padding: 30px;
  width: 20vw;
  height: 90vh;
  margin-left: -50vw;
  border-right: 2px solid rgba(135, 137, 157, 0.604);
  border-radius: 0px 10px 10px 0px;
  border-top: 1px solid rgba(135, 137, 157, 0.604);
  border-bottom: 1px solid rgba(135, 137, 157, 0.604);
  
}
</style>
