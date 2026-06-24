<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/store";
import LangSwitch from "../components/LangSwitch.vue";
import { useI18n } from "vue-i18n";
const passwordInput = ref("");
const passwordCheckInput = ref("");
const emailInput = ref("");
const usernameInput = ref("");
const hasAccount = ref(true);
const passwordIsVisible = ref(false);

const router = useRouter();
const message = ref("");

const { t } = useI18n();

const usersStore = useUsersStore()

function createUsers() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordCheck = passwordCheckInput.value.trim();
  const email = emailInput.value.trim();

  const isNameTaken = usersStore.users?.some(
    (user) => user.username == username,
  );

  if (email.length === 0 || username.length === 0 || password.length === 0) {
    message.value = "errorNoData";
  } else if (username.length < 2) {
    message.value = "errorUsernameValid";
  } else if (password.length < 6) {
    message.value = "errorPasswordValid";
  } else if (password !== passwordCheck) {
    message.value = "errorPasswordMatch";
  } else if (isNameTaken) {
    message.value = "errorUsernameTaken";
  } else {
    message.value = "";
    usersStore.registerUser(username, password, email);
    router.push("/homepage");
  }
}

function validate() {
  if (
    usernameInput.value.trim().length == 0 ||
    passwordInput.value.trim().length == 0
  ) {
    message.value = "errorNoData";
  } else {
    const success = usersStore.loginUser(
      usernameInput.value,
      passwordInput.value,
    );

    if (success) {
      router.push("/homepage");
    } else {
      message.value = "errorNoSuchAcc";
    }
  }
}
</script>

<template>
  <div class="loginPage">
    <h1>TODO <span>APP</span></h1>

    <!-- LOG IN -->
    <div v-if="hasAccount" class="loginCard">
      <h2>{{ $t("login.titleLogIn") }}</h2>
      <form @submit.prevent="validate">
        <div class="grid1">
          <label for="usersname">
            <img src="/usernameIcon.svg" alt="User" />
          </label>
          <input
            v-model="usernameInput"
            type="text"
            :placeholder="$t('login.usernamePlaceholder')"
            id="usersname"
          />
          <div class="grid-spacer"></div>

          <label for="password">
            <img src="/passwordIcon.svg" alt="Password" />
          </label>

          <input
            v-model="passwordInput"
            :type="passwordIsVisible ? 'text' : 'password'"
            :placeholder="$t('login.passwordPlaceholder')"
            id="password"
          />

          <img
            :src="passwordIsVisible ? '/hidePassword.svg' : '/showPassword.svg'"
            @click="passwordIsVisible = !passwordIsVisible"
            alt="Toggle Password"
            class="toggle-password-btn"
          />
        </div>
        <p v-if="message" class="error">{{ $t(`login.${message}`) || '' }}</p>
        <button type="submit">{{ $t("login.submitButton") }}</button>
        <p class="switch-login-link">
          {{ $t("login.hintRegist") }}
          <a href="#" @click="hasAccount = false">{{
            $t("login.linkRegist")
          }}</a>
        </p>
      </form>
    </div>

    <!-- REGISTRATION -->

    <div v-else class="loginCard">
      <h2>{{ $t("login.titleRegist") }}</h2>
      <form @submit.prevent="createUsers">
        <div class="grid2">
          <label for="usersname">
            <img src="/usernameIcon.svg" alt="User" />
          </label>
          <input
            v-model="usernameInput"
            type="text"
            :placeholder="$t('login.usernamePlaceholder')"
            id="usersname"
          />
          <div class="grid-spacer"></div>

          <label for="password">
            <img src="/passwordIcon.svg" alt="Password" />
          </label>
          <input
            v-model="passwordInput"
            :type="passwordIsVisible ? 'text' : 'password'"
            :placeholder="$t('login.passwordPlaceholder')"
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
            :placeholder="$t('login.passwordRepeatPlaceholder')"
            id="passwordCheck"
          />
          <div class="grid-spacer"></div>

          <label for="email">
            <img src="/emailIcon.svg" alt="Email" />
          </label>
          <input
            v-model="emailInput"
            type="email"
            :placeholder="$t('login.emailPlaceholder')"
            id="email"
          />
          <div class="grid-spacer"></div>
        </div>

        <p v-if="message" class="error">{{ $t(`login.${message}`) }}</p>
        <button type="submit">{{ $t("login.regisButton") }}</button>
        <p class="switch-login-link">
          {{ $t("login.hintLogIn") }}
          <a href="#" @click="hasAccount = true">{{ $t("login.linkLogIn") }}</a>
        </p>
      </form>
    </div>
    <LangSwitch />
  </div>
</template>

<style scoped>
* {
  font-size: 0.9rem;
}
.loginPage {
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 0.603), transparent),
    url("/background.png") !important;

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
  color: white;
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

.grid2 {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: repeat(4, 40px);
  gap: 10px;
}
</style>
