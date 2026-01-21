<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="nav">
    <RouterLink to="/" class="nav__link">Home</RouterLink>
    <RouterLink to="/trails" class="nav__link">Trails</RouterLink>
    <RouterLink to="/favorites" class="nav__link">Favorites</RouterLink>
    <RouterLink to="/profile" class="nav__link">Profile</RouterLink>
  </header>

  <main class="page">
    <RouterView />
  </main>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}
.nav__link {
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
}
.is-active {
  font-weight: 700;
  border: 1px solid #999;
}
.page {
  padding: 16px;
}
</style>
