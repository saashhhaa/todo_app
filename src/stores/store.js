import { defineStore } from "pinia";

export const UseUsersStore = defineStore("users", {
  state: () => ({
    users: [],
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
      if(foundUser){
        this.currentUser = foundUser
        return true
      } else {
        return false
      }
    },
    logout() {
      this.currentUser = null;
    },
    editUser() {

    },
  },
});
