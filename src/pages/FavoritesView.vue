<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useFavoritesStore } from "../stores/favorites.store";
import { useTrailsStore } from "../stores/trails.store";

const router = useRouter();
const favStore = useFavoritesStore();
const trailsStore = useTrailsStore();

const favoriteTrails = computed(() =>
  favStore.ids.map((id) => trailsStore.getById(id)).filter(Boolean)
);

function openTrail(id) {
  router.push({ name: "trail-details", params: { id } });
}

function clearFavorites() {
  // folosești actions existente:
  favStore.ids = [];
  favStore.persist();
}
</script>

<template>
  <div>
    <h1>Favorites ({{ favStore.totalFavorites }})</h1>

    <p v-if="!favStore.hasFavorites">No favorites yet.</p>

    <ul v-else>
      <li v-for="t in favoriteTrails" :key="t.id" style="display:flex; gap:10px;">
        <span>{{ t.name }}</span>
        <button @click="openTrail(t.id)">Details</button>
        <button @click="favStore.remove(t.id)">Remove</button>
      </li>
    </ul>

    <button @click="clearFavorites" :disabled="!favStore.hasFavorites">
      Clear favorites
    </button>
  </div>
</template>
