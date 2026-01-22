<script setup>
import { ref, computed } from "vue";

const firstName = ref("Dani");
const lastName = ref("Lunganu");

const fullName = computed({
  get: () => firstName.value + " " + lastName.value,
  set: value => {
    const parts = value.split(" ");
    firstName.value = parts[0];
    lastName.value = parts[1] || "";
  }
});
</script>

<template>
  <input v-model="fullName" />
  <p>Hello {{ fullName }}</p>
</template>
