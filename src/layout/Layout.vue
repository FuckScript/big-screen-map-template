<script setup lang="ts">
import Header from './Header.vue'
import Map from './Map/Map.vue'
import NavBar from './NavBar.vue'
import Main from './Main.vue'
</script>

<template>
  <div class="app-wrapper">
    <Header />
    <Map />
    <Main />
    <NavBar />
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
