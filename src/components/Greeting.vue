<script setup>
import { useUsersStore } from "../stores/store";
import defaulProfileImage from "../assets/profileImageTest.jpg";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
const usersStore = useUsersStore();
const { locale, t } = useI18n();

const date = computed(() => {
  const currentLocale = locale.value === "en" ? "en-US" : "ru-RU";
  const today = new Date();
  return new Intl.DateTimeFormat(currentLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(today);
});
</script>

<template>
  <div class="greeting">
    <div class="accountData">
      <img
        :src="usersStore.currentUser?.image || defaulProfileImage"
        class="profileImage"
      />
      <div class="block">
        <h1>TodoApp</h1>
        <p class="currentUser">
          {{ $t("taskManager.greeting") }}
          {{ usersStore.currentUser?.username }}!
        </p>
      </div>
    </div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<style scoped>
.greeting {
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.accountData {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profileImage {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.currentUser {
  filter: brightness(0.5);
}

.date {
  font-size: 24px;
}
</style>
