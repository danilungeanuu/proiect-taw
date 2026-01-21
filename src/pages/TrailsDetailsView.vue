<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const trailId = computed(() => route.params.id);

function goToFavorites() {
  router.push({ name: "favorites" });
}
</script>

<template>
  <div>
    <h1>Trail Details</h1>
    <p>Trail ID: {{ trailId }}</p>

    <button @click="goToFavorites">Add to favorites / Go favorites</button>
  </div>
</template>
