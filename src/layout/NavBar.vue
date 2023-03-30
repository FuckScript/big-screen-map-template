<template>
  <div class="nav">
    <RouterLink to="/">首页</RouterLink> |
    <RouterLink to="/about">关于</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.nav {
  display: flex;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
