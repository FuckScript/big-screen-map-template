<template>
  <div class="app-main">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.app-main {
  position: absolute;
  top: 90px;
  /* background-color: #000; */
}
</style>
