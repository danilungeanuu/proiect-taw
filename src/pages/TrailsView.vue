<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const trails = [
  { id: 1, name: "Bucegi - Jepii Mici" },
  { id: 2, name: "Piatra Craiului - Zărnești" },
  { id: 3, name: "Făgăraș - Bâlea Lac" },
];

function openTrail(id) {
  // navigare programatică (router.push) ca în curs :contentReference[oaicite:2]{index=2}
  router.push({ name: "trail-details", params: { id } });
}
</script>

<template>
  <div>
    <h1>Trails</h1>

    <ul>
      <li v-for="t in trails" :key="t.id">
        <span>{{ t.name }}</span>
        <button @click="openTrail(t.id)">Details</button>
      </li>
    </ul>
  </div>
</template>
