import { defineStore } from "pinia";
import { i18n } from "../lang";
import { lang } from "../lang";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  }),
  actions: {
    registerUser(username, password, email) {
      const newUser = {
        id: Date.now(),
        username: username,
        password: password,
        email: email,
        image: "",
      };
      this.users.push(newUser);
      this.currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      localStorage.setItem("users", JSON.stringify(this.users));
    },
    loginUser(username, password) {
      const foundUser = this.users.find(
        (user) => user.username == username && user.password == password,
      );
      if (foundUser) {
        this.currentUser = foundUser;
        localStorage.setItem("currentUser", JSON.stringify(foundUser));

        return true;
      } else {
        return false;
      }
    },
    logout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    editUser(newImage, newUsername) {
      this.currentUser.username = newUsername;
      this.currentUser.image = newImage;
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
});

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [
      {
        color: "#ffb32f",
        title: "work",
        count: 0,
        isCustom: false,
      },
      {
        color: "#7fde82",
        title: "study",
        count: 0,
        isCustom: false,
      },
      {
        color: "#d574e6",
        title: "personal",
        count: 0,
        isCustom: false,
      },
    ],
    customCategories: JSON.parse(localStorage.getItem("categories")) || [],
  }),
  actions: {
    addCategory(categotyTitle, categoryColor) {
      const users = useUsersStore();
      const newCategory = {
        id: Date.now(),
        userId: users.currentUser.id,
        title: categotyTitle,
        color: categoryColor,
        count: 0,
        isCustom: true,
      };
      this.customCategories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(this.customCategories));
    },
    deleteCategory(categoryId) {
      this.customCategories = this.customCategories.filter(
        (category) => category.id != categoryId,
      );
      localStorage.setItem("categories", JSON.stringify(this.customCategories));
    },
    nya() {
      const langStore = useLangStore();
      const currLang = langStore.lang;
      return currLang;
    },
  },
});

export const useTasksSStore = defineStore("tasks", {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    selectedCategory: null,
  }),
  actions: {
    createNewTask(newTitle, newDate, newCategory) {
      const categories = useCategoriesStore();
      const users = useUsersStore();
      const found =
        categories.customCategories.find((c) => c.title == newCategory) ||
        categories.categories.find((c) => c.title == newCategory);
      const newTask = {
        id: Date.now(),
        userId: users.currentUser.id || null,
        title: newTitle,
        date: newDate || "No date",
        category: newCategory,
        catCol: found ? found.color : "#fffff",
        isDone: false,
      };
      this.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(taskToDelete) {
      this.tasks = this.tasks.filter((task) => task.id != taskToDelete);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    switchTaskState(taskId) {
      const taskToChange = this.tasks.find((task) => task.id == taskId);
      taskToChange.isDone = !taskToChange.isDone;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    selectCategory(categoryTitle) {
      if (this.selectedCategory == categoryTitle) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = categoryTitle;
      }
    },
    clearCategory() {
      this.selectedCategory = null;
    },
  },
});

export const useLangStore = defineStore("language", {
  state: () => ({
    lang: localStorage.getItem("lang") || "en",
  }),
  actions: {
    switchLang() {
      this.lang = this.lang === "en" ? "ru" : "en";
      localStorage.setItem("lang", this.lang);
      i18n.global.locale.value = this.lang;
    },
    initLang() {
      i18n.global.locale.value = this.lang;
    },
  },
});

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: localStorage.getItem("theme") || "dark",
  }),
  actions: {
    switchTheme(mode) {
      localStorage.setItem("theme", mode);
    },
    applyTheme() {
      const body = document.body;
      if (this.theme === "light") {
        body.classList.add("light-theme");
      } else {
        body.classList.remove("light-theme");
      }
    },
  },
});
