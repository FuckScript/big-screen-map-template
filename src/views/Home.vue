<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { useCounterStore } from '@/stores/counter'
import DocumentationIcon from '@/components/icons/IconDocumentation.vue'

const counterStore = useCounterStore()
</script>

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
    <div class="bg-red-600">
      <h1>{{ counterStore.count }}</h1>
      <el-button @click="counterStore.increment">++</el-button>
    </div>
  </AutoScale>
  <AutoScale
    :options="{
      width: 450,
      height: 960,
      top: 100,
      right: 10
    }"
  >
    <DocumentationIcon />
    <div class="bg-red-600">右</div>
  </AutoScale>
</template>
