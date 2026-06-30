<script setup lang="ts">
import { ref, watch } from "vue";
import { useThemeStore, useUsersStore } from "../stores/store.ts";
import { useI18n } from "vue-i18n";
import defaulProfileImage from "../assets/profileImageTest.jpg";

const themeStore = useThemeStore();
const usersStore = useUsersStore();
const newUsernameInput = ref("");
const previewImage = ref("");
const editMode = ref<boolean>(false);

const isOpen =ref<boolean>(false)

function closeSettings () : void {
  isOpen.value = false
}

const { t } = useI18n();

watch(editMode, (newValue) => {
  if (newValue) {
    newUsernameInput.value = usersStore.currentUser?.username || "";
    previewImage.value = usersStore.currentUser?.image || defaulProfileImage;
  }
});

function handleFileChange(event: any): void {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}
const emit = defineEmits(["close"]);

function editUser(): void {
  usersStore.editUser(previewImage.value, newUsernameInput.value);
  editMode.value = false;
}
function logOut(): void {
  usersStore.logout();
}

function handleSwitch(mode: "light" | "dark"): void {
  themeStore.switchTheme(mode);
}
</script>

<template>
  <div class="settings">
    <div class="top">
      <img
        class="backButton"
        @click="emit('close')"
        src="/arrowIcon.svg"
        alt=""
      />
      <h1>{{ $t("settings.title") }}</h1>
    </div>

    <div class="account">
      <h3>{{ $t("settings.titleAccount") }}</h3>
      <div class="cover">
        <div class="profileImage" v-if="!editMode">
          <img
            :src="usersStore.currentUser?.image || defaulProfileImage"
            alt="Avatar"
          />
        </div>

        <label v-else class="profileImageUpload">
          <img :src="previewImage" alt="Preview" />
          <div class="uploadOverlay">{{ $t("settings.editButton") }}</div>
          <input
            type="file"
            @change="handleFileChange"
            accept="image/*"
            class="hiddenFileInput"
          />
        </label>
        <div>
          <div v-if="!editMode" class="username">
            {{ usersStore.currentUser?.username }}
          </div>
          <input v-model="newUsernameInput" type="text" v-else />
          <div class="email">{{ usersStore.currentUser?.email }}</div>
        </div>
        <button v-if="!editMode" @click="editMode = true" class="editButton">
          {{ $t("settings.editButton") }}<img src="/penIcon.svg" alt="" />
        </button>
        <div v-else class="cover2">
          <button @click="editUser" class="editButton save">∨</button>
          <button @click="editMode = false" class="editButton cancel">×</button>
        </div>
      </div>
    </div>
    <div class="todoSettings">
      <h3>{{ $t("settings.titleTodoSet") }}</h3>
      <p>{{ $t("settings.titleTheme") }}</p>
      <div class="coverTheme">
        <button @click="handleSwitch('light')" class="light theme">
          {{ $t("settings.themeLight") }}
        </button>
        <button @click="handleSwitch('dark')" class="dark theme">
          {{ $t("settings.themeDark") }}
        </button>
      </div>
    </div>
    <RouterLink to="/">
      <button @click="logOut" class="logOut error">
        {{ $t("settings.logOutButton") }}
      </button>
    </RouterLink>
  </div>
</template>

<style scoped>
.cover2 {
  display: flex;
  justify-content: center;
  gap: 10px;
}
button {
  cursor: pointer;
}

.coverTheme {
  display: flex;
  gap: 10px;
  margin: 20px 0 10vh 0;
}

.light {
  background-color: white;
  color: rgb(43, 48, 80);
}

.dark {
  background-color: rgb(24, 20, 60);
  color: white;
  border: 2px rgba(255, 255, 255, 0.36) solid !important;
}

.theme:hover {
  filter: brightness(0.5);
}

.theme {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  /* margin-top: 20vh; */
}

.logOut {
  padding: 10px 20px;
  border-radius: 50px;
  background-color: transparent;
  font-size: 16px;
  /* margin-top: 20vh; */
  border: 1px solid rgb(255, 118, 118);
  color: rgb(255, 118, 118);
}

button.save,
button.cancel {
  filter: brightness(0.7);
  margin-left: 0;
}
button.save {
  border: 1px solid rgb(105, 232, 105);
  color: rgb(88, 206, 88);
}
button.cancel {
  border: 1px solid rgb(202, 94, 94) !important;
  color: rgb(187, 87, 87) !important;
}

.account {
  margin-top: 5vh;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(135, 137, 157, 0.604);
  margin-bottom: 30px;
}

.username {
  font-weight: 700;
}

.cover {
  display: flex;
  gap: 20px;
}

.backButton {
  width: 30px;
  height: 30px;
  filter: brightness(0.6);
}

h3 {
  margin-bottom: 30px;
  color: rgba(135, 137, 157, 0.604);
}

img:hover {
  filter: brightness(1);
}

.email {
  filter: brightness(0.6);
}

.settings {
  width: 60vw;
  height: 60vh;
  background-color: var(--blackTheme-back);
  border-radius: 10px;
  padding: 4vh 5vw;
}

.top {
  display: flex;
  gap: 20px;
  align-items: center;
}

.editButton {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  border-radius: 50px;
  filter: brightness(0.5);
  height: fit-content;
  margin-left: 3vw;
}

.editButton img {
  width: 15px;
  height: 15px;
}

.editButton:hover {
  filter: brightness(1);
}

input {
  flex: 2;
  outline: none;
  font-size: 16px;
  border: 1px solid transparent;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: var(--blackTheme-back-secondary);
  color: white;
  margin-bottom: 20px;
}

input:hover {
  border: 1px solid var(--accent-color);
}

.profileImage {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
}

.profileImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profileImageUpload {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: block;
}

.profileImageUpload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.2s ease;
}

.uploadOverlay {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.profileImageUpload:hover .uploadOverlay {
  opacity: 1;
  border: 50px;
}

.profileImageUpload:hover img {
  filter: blur(1px);
  border-radius: 50px;
}

.hiddenFileInput {
  display: none;
}

@media (max-width: 400px) {

.settings {
  width: 80vw;
  position: fixed !important;
  min-height: 60vh;
  height: fit-content;
  background-color: var(--blackTheme-back);
  border-radius: 10px;
  padding: 4vh 5vw;
}
  .cover {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .editButton {
    margin-left: 0;
    width: 100%;
  }

  .cover2 {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
  }

  input[type="text"] {
    width: 100%;
    max-width: 250px;
  }

  .username {
    font-size: 18px;
    font-weight: 600;
  }

  .email {
    font-size: 14px;
    opacity: 0.7;
  }

}
</style>
