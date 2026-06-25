<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const temperature = ref<number | null>(null);
const loading = ref<boolean>(true);

const weatherCode = ref<number | null>(null);

async function fetchBishkekWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=42.87&longitude=74.59&current=temperature_2m,weather_code";

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result && result.current) {
      temperature.value = Math.round(result.current.temperature_2m);
      weatherCode.value = result.current.weather_code;
    }
  } catch (error) {
    console.error("Ошибка при получении погоды:", error);
  } finally {
    loading.value = false;
  }
}

const condition = computed(() => {
  const code = weatherCode.value;
  if (code === null) return "";

  if (code === 0) return t("wheather.code1");
  if (code >= 1 && code <= 3) return t("wheather.code2");
  if (code >= 45 && code <= 48) return t("wheather.code3");
  if (code >= 51 && code <= 67) return t("wheather.code4");
  if (code >= 71 && code <= 77) return t("wheather.code5");
  if (code >= 80 && code <= 82) return t("wheather.code6");
  return t("wheather.code7");
});

onMounted(() => {
  fetchBishkekWeather();
});
</script>

<template>
  <div class="weather-widget">
    <div v-if="loading">{{ $t("wheather.loading") }}</div>
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
</style>
