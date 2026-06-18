<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { UseUsersStore } from "../stores/store";
const passwordInput = ref("");
const emailInput = ref("");
const usernameInput = ref("");
const hasAccount = ref(true);

const usersStore = UseUsersStore();

const router = useRouter();
const message = ref("");

function createUsers() {
  if (
    usernameInput.value.trim().length > 1 &&
    passwordInput.value.trim().length < 6
  ) {
    message.value = "password must be at least 6 symbols";
  } else if (
    usernameInput.value.trim().length < 1 &&
    passwordInput.value.trim().length >= 6
  ) {
    message.value = "usersname must be at least 1 symbol";
  } else {
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

<template>
  <div v-if="hasAccount">
    <h1>Log in</h1>
    <form @submit.prevent="validate">
      <div>
        <label for="usersname">
          <img src="" alt="" />
        </label>
        <input
          v-model="usernameInput"
          type=""
          placeholder="usersname"
          id="usersname"
        />
      </div>
      <div>
        <label for="password">
          <img src="" alt="" />
        </label>
        <input
          v-model="passwordInput"
          type="password"
          placeholder="password"
          id="password"
        />
      </div>
      <p>{{ message }}</p>
      <button @click="validate">log in</button>
      <p>
        Don't have an account?
        <a href="#" @click="hasAccount = false">Register.</a>
      </p>
    </form>
  </div>

  <div v-else>
    <h1>Registrate</h1>
    <form @submit.prevent="createUsers">
      <div>
        <label for="usersname">
          <img src="" alt="" />
        </label>
        <input
          v-model="usernameInput"
          type=""
          placeholder="usersname"
          id="usersname"
        />
      </div>
      <div>
        <label for="password">
          <img src="" alt="" />
        </label>
        <input
          v-model="passwordInput"
          type="password"
          placeholder="password"
          id="password"
        />
      </div>
      <div>
        <label for="email">
          <img src="" alt="" />
        </label>
        <input
          v-model="emailInput"
          type="email"
          placeholder="email"
          id="email"
          required
        />
      </div>
      <p>{{ message }}</p>
      <button @click="createUsers">register</button>
      <p>
        Already have an account?
        <a href="#" @click="hasAccount = true">Log in.</a>
      </p>
    </form>
  </div>
</template>
