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
      this.currentUser.username = newUsername
      this.currentUser.image = newImage
    },
  },
});

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [
      {
        color: "#F9A109",
        title: "work",
        count: 1
      },
      {
        color: "#4CAF50",
        title: "study",
        count: 2
      },
      {
        color: "#9C27B0",
        title: "personal",
        count: 2
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
    },
  },
});
