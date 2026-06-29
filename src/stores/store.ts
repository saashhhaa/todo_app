import { defineStore } from "pinia";
import { i18n } from "../lang.ts";
import { ref, type ComputedRef } from "vue";
import dayjs from "dayjs";

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
  createDate: string;
  doneDate: string;
  deadlineDate: string;
  isDone: boolean;
  isDeadlined: boolean;
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
  getters: {
    getDeadlinedTasks: (state) => {
      const usersStore = useUsersStore();
      const currentUserId = usersStore.currentUser?.id;
      const today = dayjs().format("YYYY-MM-DD");

      return state.tasks.filter((task) => {
        if (task.userId !== currentUserId || task.isDone || !task.deadlineDate) {
          return false;
        }
        return dayjs(today).isAfter(dayjs(task.deadlineDate)) ;
      });
    }
  },
  actions: {
    createNewTask(
      newTitle: string,
      newDeadline: string,
      todayDate: string,
      newCategory: string,
    ) {
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
        createDate: todayDate,
        doneDate: "",
        deadlineDate: newDeadline || "",
        category: newCategory,
        catCol: found ? found.color : "#ffffff",
        isDone: false,
        isDeadlined: false
      };
      this.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(taskToDelete: number): void {
      this.tasks = this.tasks.filter((task) => task.id != taskToDelete);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    switchTaskState(taskId: number, createDate: string): void {
      const taskToChange = this.tasks.find((task) => task.id == taskId);
      if (!taskToChange) {
        return;
      }
      taskToChange.isDone = !taskToChange.isDone;
      !taskToChange.isDone
        ? (taskToChange.doneDate = "-")
        : (taskToChange.doneDate = createDate);

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
    }
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
    theme: (localStorage.getItem("theme") || "dark") as "dark" | "light",
  }),
  actions: {
    switchTheme(mode: "dark" | "light"): void {
      this.theme = mode;
      localStorage.setItem("theme", mode);
      this.applyTheme();
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

export const useDateStore = defineStore("date", () => {
  const selectedDate = ref(new Date());
  return { selectedDate };
});
