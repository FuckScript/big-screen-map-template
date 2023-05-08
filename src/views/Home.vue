<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { useCounterStore } from '@/stores/counter'
import { useUserInfoStore } from '@/stores/userInfo'
import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
import api from '@/api/modules/login'

const counterStore = useCounterStore()
const userInfoStore = useUserInfoStore()

const id = ref(2)
const getUserInfo = async () => {
  const res = await api.getUserInfo(id.value)
  userInfoStore.updateUserInfo(res.data)
}
// onMounted(() => {})

watch(id, () => {
  getUserInfo()
})
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
      <el-button @click="id = 1">setUserName</el-button>
      <div>
        {{ userInfoStore.userInfoName }}
      </div>
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
