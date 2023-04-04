<template>
  <AutoScale
    :options="{
      width: 1920,
      height: 90,
      top: 0
    }"
  >
    <div class="header"><h1>header</h1></div>
  </AutoScale>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  background-color: #0006;
  text-align: center;
  height: 100%;
  color: #fff;
}
</style>
