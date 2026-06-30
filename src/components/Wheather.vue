<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@vue/apollo-composable";
import { useDateStore } from "../stores/store.ts";
import gql from "graphql-tag";

const { t } = useI18n();
const dateStore = useDateStore();
const formattedDate = computed(() => {
  const date = dateStore.selectedDate;
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
});

const WEATHER_QUERY = gql`
  query GetWeather($latitude: Float!, $longitude: Float!, $date: String!) {
    weather(latitude: $latitude, longitude: $longitude, date: $date) {
      temperature
      weatherCode
    }
  }
`;

const { result, loading, error } = useQuery(WEATHER_QUERY, () => ({
  latitude: 42.87,
  longitude: 74.59,
  date: formattedDate.value,
}));

const temperature = computed(() => result.value?.weather?.temperature ?? null);

const condition = computed(() => {
  const code = result.value?.weather?.weatherCode;
  if (code === undefined || code === null) return "";

  if (code === 0) return t("wheather.code1");
  if (code >= 1 && code <= 3) return t("wheather.code2");
  if (code >= 45 && code <= 48) return t("wheather.code3");
  if (code >= 51 && code <= 67) return t("wheather.code4");
  if (code >= 71 && code <= 77) return t("wheather.code5");
  if (code >= 80 && code <= 82) return t("wheather.code6");
  return t("wheather.code7");
});
</script>

<template>
  <div class="weather-widget">
    <div v-if="loading">{{ $t("wheather.loading") }}</div>

    <div v-else-if="error"></div>

    <div v-else-if="result?.weather === null">
      <h3>{{ $t("wheather.title1") }}</h3>
      <p>{{ $t("wheather.error") }}</p>
    </div>

    <div v-else>
      <h3>{{ $t("wheather.title1") }}</h3>
      <p>{{ $t("wheather.title2") }} {{ temperature }}°C</p>
      <p>{{ $t("wheather.title3") }} {{ condition }}</p>
    </div>
  </div>
</template>

<style scoped>
.weather-widget {
  background-color: var(--blackTheme-back-secondary2);
  padding: 20px;
  border-radius: 10px;
  color: rgb(255, 255, 255);
  width: fit-content;
}

@media (max-width: 400px) {
  .weather-widget {
    width: 80%;
    margin: 20px 0;
    font-size: 12px;
  }
}
</style>
