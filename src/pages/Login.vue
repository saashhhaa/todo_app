<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/store";
const passwordInput = ref("");
const passwordCheckInput = ref("");
const emailInput = ref("");
const usernameInput = ref("");
const hasAccount = ref(true);

const passwordIsVisible = ref(false);

const usersStore = useUsersStore();

const router = useRouter();
const message = ref("");

function createUsers() {
  const isNameTaken = usersStore.users?.some((user) => user.username == usernameInput.value)
  if (
    usernameInput.value.trim().length > 1 &&
    passwordInput.value.trim().length < 6 
  ) {
    message.value = "password must be at least 6 symbols";
  } else if (passwordInput.value.trim() !== passwordCheckInput.value.trim()) {
    message.value = "passwords do not match";
    
  }else if (
    usernameInput.value.trim().length < 1 &&
    passwordInput.value.trim().length >= 6 
  ) {
    message.value = "usersname must be at least 1 symbol";
  } else if (emailInput.value.trim().length == 0 || usernameInput.value.trim().length == 0 || passwordInput.value.trim().length == 0) {
    message.value = "please, write your data";
  } else if (isNameTaken){
    message.value = "this username is taken";
  } 
  else {
    usersStore.registerUser(
      usernameInput.value.trim(),
      passwordInput.value.trim(),
      emailInput.value.trim(),
    );
    router.push("/homepage");
  }
}

function validate() {
  if (
    usernameInput.value.trim().length == 0 ||
    passwordInput.value.trim().length == 0
  ) {
    message.value = "please, write your data";
  } else {
    const success = usersStore.loginUser(
      usernameInput.value,
      passwordInput.value,
    );

    if (success) {
      router.push("/homepage");
    } else {
      message.value = "no such account or wrong password";
    }
  }
}
</script>

<template >
  <div class="loginPage">
    <h1>TODO <span>APP</span></h1>

  <!-- LOG IN -->
  <div v-if="hasAccount" class="loginCard">
    <h2>Log in</h2>
    <form @submit.prevent="validate">
      <div class="grid1">
        <label for="usersname">
          <img src="/usernameIcon.svg" alt="User" />
        </label>
        <input
          v-model="usernameInput"
          type="text"
          placeholder="username"
          id="usersname"
        />
        <div class="grid-spacer"></div>

        <label for="password">
          <img src="/passwordIcon.svg" alt="Password" />
        </label>

        <input
          v-model="passwordInput"
          :type="passwordIsVisible ? 'text' : 'password'"
          placeholder="password"
          id="password"
        />

        <img
          :src="passwordIsVisible ? '/hidePassword.svg' : '/showPassword.svg'"
          @click="passwordIsVisible = !passwordIsVisible"
          alt="Toggle Password"
          class="toggle-password-btn"
        />
      </div>
      <p class="error">{{ message }}</p>
      <button @click="validate">log in</button>
      <p class="switch-login-link">
        Don't have an account?
        <a href="#" @click="hasAccount = false">Register.</a>
      </p>
    </form>
  </div>

  <!-- REGISTRATION -->

  <div v-else class="loginCard">
    <h2>Register</h2>
    <form @submit.prevent="createUsers">
      <div class="grid2">
        <label for="usersname">
          <img src="/usernameIcon.svg" alt="User" />
        </label>
        <input
          v-model="usernameInput"
          type="text"
          placeholder="username"
          id="usersname"
        />
        <div class="grid-spacer"></div>

        <label for="password">
          <img src="/passwordIcon.svg" alt="Password" />
        </label>
        <input
          v-model="passwordInput"
          :type="passwordIsVisible ? 'text' : 'password'"
          placeholder="password"
          id="password"
        />
        <img
          :src="passwordIsVisible ? '/hidePassword.svg' : '/showPassword.svg'"
          @click="passwordIsVisible = !passwordIsVisible"
          alt="Toggle Password"
          class="toggle-password-btn"
        />

        <div></div>
        <input
          v-model="passwordCheckInput"
          :type="passwordIsVisible ? 'text' : 'password'"
          placeholder="repeat password"
          id="passwordCheck"
        />
        <div class="grid-spacer"></div>

        <label for="email">
          <img src="/emailIcon.svg" alt="Email" />
        </label>
        <input
          v-model="emailInput"
          type="email"
          placeholder="email"
          id="email"
        />
        <div class="grid-spacer"></div>
      </div>

      <p class="error">{{ message }}</p>
      <button type="submit">register</button>
      <p class="switch-login-link">
        Already have an account?
        <a href="#" @click="hasAccount = true">Log in.</a>
      </p>
    </form>
  </div>

  </div>
  
</template>

<style scoped>
* {
  font-size: 0.9rem;
}
.loginPage{
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.603), transparent), url("/background.png") !important;

  color: var(--blackTheme-font);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loginCard {
  background-color: var(--blackTheme-back-secondary);
  display: flex;
  flex-direction: column;
  border-top: 2px solid rgba(135, 137, 157, 0.604);
  align-items: center;
  justify-content: center;
  padding: 5vh 5vw;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.742);
  border-radius: 10px;
}

h1,
span {
  font-size: 3rem;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: inset 0 -10px 0 var(--accent-color);
}

h2 {
    font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 500;
}

input {
  padding: 5px 10px;
  margin-bottom: 10px;
  border: 1px solid rgb(135, 137, 157);
  border-radius: 5px;
  background-color: rgb(92, 94, 117);
  color: white
}

input::placeholder {
  color: rgb(135, 137, 157);
}

input:focus {
  outline: 2px solid var(--accent-color);
}

img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

img:hover {
  filter: brightness(0.8);
}

.cover {
  gap: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-content: space-between; */
}

button {
  margin: 10px 0;
  background-color: var(--accent-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
}

button:hover {
  filter: brightness(1.1);
}

.grid1 {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: repeat(2, 40px);
  gap: 10px;
}


.switch-login-link {
  text-align: center;
  color: rgb(135, 137, 157);
}

.switch-login-link a {
  color: var(--accent-color);
  text-decoration: none;
}
.switch-login-link a:hover {
  color: var(--accent-color);
  text-decoration: underline;
}

.toggle-password-btn {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  filter: brightness(0.5);
}

.grid2{
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: repeat(4, 40px);
  gap: 10px;
}
</style>
