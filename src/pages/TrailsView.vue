<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTrailsStore } from "../stores/trails.store";
import { useFavoritesStore } from "../stores/favorites.store";
import { useUiStore } from "../stores/ui.store";

const router = useRouter();

const trailsStore = useTrailsStore();
const favStore = useFavoritesStore();
const ui = useUiStore();

const { search, selectedDifficulty, selectedRegion } = storeToRefs(trailsStore);

// getters:
const filteredTrails = computed(() => trailsStore.filteredTrails);
const totalTrails = computed(() => trailsStore.filteredCount);
const regions = computed(() => trailsStore.regions);

function openTrail(id) {
  router.push({ name: "trail-details", params: { id } });
}

function toggleFav(id) {
  favStore.toggle(id);
  ui.showToast(favStore.isFavorite(id) ? "Added to favorites" : "Removed from favorites");
}
</script>

<template>
  <div>
    <h1>Trails</h1>

    <input
      :value="search"
      @input="trailsStore.setSearch($event.target.value)"
      placeholder="Search trails"
    />

    <div style="display:flex; gap:10px; margin:10px 0;">
      <select :value="selectedDifficulty" @change="trailsStore.setDifficulty($event.target.value)">
        <option value="all">All difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select :value="selectedRegion" @change="trailsStore.setRegion($event.target.value)">
        <option v-for="r in regions" :key="r" :value="r">
          {{ r }}
        </option>
      </select>

      <button v-if="trailsStore.hasFilters" @click="trailsStore.clearFilters()">Clear filters</button>
    </div>

    <p>Trails found: {{ totalTrails }}</p>

    <ul>
      <li v-for="t in filteredTrails" :key="t.id" style="display:flex; gap:10px; align-items:center;">
        <span>{{ t.name }}</span>

        <button @click="openTrail(t.id)">Details</button>

        <button @click="toggleFav(t.id)">
          {{ favStore.isFavorite(t.id) ? "★ Favorited" : "☆ Add favorite" }}
        </button>
      </li>
    </ul>

    <small v-if="ui.toastVisible">{{ ui.toastText }}</small>
  </div>
</template>
