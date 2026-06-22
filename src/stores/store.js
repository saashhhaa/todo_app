import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [
      {
        id: Date.now(),
        username: "test",
        password: "password",
        email: "email@gmail.com",
        image: "../public/profileImageTest.jpg",
      },
    ],
    currentUser: null,
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
    },
    loginUser(username, password) {
      const foundUser = this.users.find(
        (user) => user.username == username && user.password == password,
      );
      if (foundUser) {
        this.currentUser = foundUser;
        return true;
      } else {
        return false;
      }
    },
    logout() {
      this.currentUser = null;
    },
    editUser(newImage, newUsername) {
      this.currentUser.username = newUsername;
      this.currentUser.image = newImage;
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
      },
      {
        color: "#7fde82",
        title: "study",
        count: 0,
      },
      {
        color: "#d574e6",
        title: "personal",
        count: 0,
      },
    ],
  }),
  actions: {
    addCategory(categotyTitle, categoryColor, categoryCount) {
      const newCategory = {
        title: categotyTitle,
        color: categoryColor,
        count: categoryCount,
      };
      this.categories.push(newCategory);
    }
  },
});

export const useTasksSStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    createNewTask(newTitle, newDate, newCategory) {
      const categories = useCategoriesStore();

      const found = categories.categories.find((c) => c.title == newCategory);
      const newTask = {
        id: this.tasks.length + 1,
        title: newTitle,
        date: newDate,
        category: newCategory,
        catCol: found.color,
        isDone: false,
      };
      this.tasks.push(newTask);
    },
    deleteTask(taskToDelete) {
      this.tasks = this.tasks.filter((task) => task.id != taskToDelete);
    },
    switchTaskState(taskId){
      const taskToChange = this.tasks.find(task => task.id == taskId)
      taskToChange.isDone = !taskToChange.isDone
    },
    // deleteDoneTasks(){

    // }
  },
});
