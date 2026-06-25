import { defineStore } from "pinia";
import { i18n } from "../lang.ts";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  image: string;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  category: string;
  catCol: string;
  date: string;
  isDone: boolean;
}

export interface Category {
  color: string;
  title: string;
  count: number;
  isCustom: boolean;
}

export interface CustomCategory {
  id: number;
  userId: number;
  title: string;
  color: string;
  count: number;
  isCustom: boolean;
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users") || "[]") as User[],
    currentUser: JSON.parse(
      localStorage.getItem("currentUser") || "null",
    ) as User | null,
  }),
  actions: {
    registerUser(username: string, password: string, email: string): void {
      const newUser: User = {
        id: Date.now(),
        username,
        password,
        email,
        image: "",
      };
      this.users.push(newUser);
      this.currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      localStorage.setItem("users", JSON.stringify(this.users));
    },
    loginUser(username: string, password: string): boolean {
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
    logout(): void {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    editUser(newImage: string, newUsername: string): void {
      if (!this.currentUser) {
        return;
      }
      this.currentUser.username = newUsername;
      this.currentUser.image = newImage;
      const editedUserIndex = this.users.findIndex(
        (user) => user.id == this.currentUser?.id,
      );
      if (editedUserIndex != -1) {
        this.users[editedUserIndex].username = newUsername;
      }
      this.users[editedUserIndex].image = newImage;
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
    ] as Category[],
    customCategories: JSON.parse(
      localStorage.getItem("categories") || "[]",
    ) as CustomCategory[],
  }),
  actions: {
    addCategory(categotyTitle: string, categoryColor: string): void {
      const users = useUsersStore();
      if (!users.currentUser) {
        return;
      }
      const newCategory: CustomCategory = {
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
    deleteCategory(categoryId: number): void {
      this.customCategories = this.customCategories.filter(
        (category) => category.id != categoryId,
      );
      localStorage.setItem("categories", JSON.stringify(this.customCategories));
    },
  },
});

export const useTasksSStore = defineStore("tasks", {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]") as Task[],
    selectedCategory: "",
  }),
  actions: {
    createNewTask(newTitle: string, newDate: string, newCategory: string) {
      const categories = useCategoriesStore();
      const users = useUsersStore();
      const found =
        categories.customCategories.find((c) => c.title == newCategory) ||
        categories.categories.find((c) => c.title == newCategory);
      if (!users.currentUser) {
        return;
      }
      const newTask: Task = {
        id: Date.now(),
        userId: users.currentUser.id,
        title: newTitle,
        date: newDate || "No date",
        category: newCategory,
        catCol: found ? found.color : "#ffffff",
        isDone: false,
      };
      this.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(taskToDelete: number): void {
      this.tasks = this.tasks.filter((task) => task.id != taskToDelete);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    switchTaskState(taskId: number): void {
      const taskToChange = this.tasks.find((task) => task.id == taskId);
      if (!taskToChange) {
        return;
      }
      taskToChange.isDone = !taskToChange.isDone;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    selectCategory(categoryTitle: string): void {
      if (this.selectedCategory == categoryTitle) {
        this.selectedCategory = "";
      } else {
        this.selectedCategory = categoryTitle;
      }
    },
    clearCategory(): void {
      this.selectedCategory = "";
    },
  },
});

export const useLangStore = defineStore("language", {
  state: () => ({
    lang: ((): "en" | "ru" => {
      const stored = localStorage.getItem("lang");
      return stored === "ru" ? "ru" : "en";
    })(),
  }),
  actions: {
    switchLang(): void {
      this.lang = this.lang === "en" ? "ru" : "en";
      localStorage.setItem("lang", this.lang);
      i18n.global.locale.value = this.lang;
    },
    initLang(): void {
      i18n.global.locale.value = this.lang;
    },
  },
});

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: (localStorage.getItem("theme") || "dark") as 'light' | 'dark',
  }),
  actions: {
    switchTheme(mode: 'light' | 'dark'): void {
      this.theme = mode
      localStorage.setItem("theme", mode);
      this.applyTheme()
    },
    applyTheme(): void {
      const body = document.body;
      if (this.theme === "light") {
        body.classList.add("light-theme");
      } else {
        body.classList.remove("light-theme");
      }
    },
  },
});
