<script setup lang="ts">
import Header from './Header.vue'
import Map from './Map/index.vue'
import NavBar from './NavBar.vue'
import AppMain from './AppMain.vue'
</script>

<template>
  <div class="app-wrapper">
    <Header />
    <Map />
    <NavBar />
    <AppMain />
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
