<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTrailsStore } from "../stores/trails.store";
import { useFavoritesStore } from "../stores/favorites.store";
import { useWeatherStore } from "../stores/weather.store";

const route = useRoute();
const trailsStore = useTrailsStore();
const favStore = useFavoritesStore();
const weatherStore = useWeatherStore();

const id = computed(() => Number(route.params.id));
const trail = computed(() => trailsStore.getById(id.value));

const isFav = computed(() => favStore.isFavorite(id.value));
const weather = computed(() => weatherStore.getWeather(id.value));

async function loadWeather() {
  await weatherStore.fetchWeatherFake(id.value);
}

function toggleFavorite() {
  favStore.toggle(id.value);
}
</script>

<template>
  <div v-if="trail">
    <h1>{{ trail.name }}</h1>
    <p>Difficulty: {{ trail.difficulty }}</p>
    <p>Length: {{ trail.lengthKm }} km</p>
    <p>Region: {{ trail.region }}</p>

    <button @click="toggleFavorite">
      {{ isFav ? "Remove from favorites" : "Add to favorites" }}
    </button>

    <hr />

    <button @click="loadWeather" :disabled="weatherStore.loading">
      {{ weatherStore.loading ? "Loading..." : "Load weather" }}
    </button>

    <p v-if="weather">
      Weather: {{ weather.condition }}, {{ weather.tempC }}°C
    </p>
    <p v-if="weatherStore.error">{{ weatherStore.error }}</p>
  </div>

  <div v-else>
    <p>Trail not found.</p>
  </div>
</template>
