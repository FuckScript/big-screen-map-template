<script setup lang="ts"></script>

<template>
  <!-- <TheWelcome /> -->
  <AutoScale
    :options="{
      width: 450,
      height: 960,
      top: 100,
      left: 10
    }"
  >
    <div class="bg-red-600">关于</div>
  </AutoScale>
  <AutoScale
    :options="{
      width: 450,
      height: 960,
      top: 100,
      right: 10
    }"
  >
    <div class="bg-red-600">右</div>
  </AutoScale>
</template>
