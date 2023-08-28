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

const useFetch = async (url: string) => {
  const res = await fetch(url).then((res) => res.arrayBuffer())
  // 把 BufferSource 转成 blob(二进制对象)
  const blob = new Blob([res])
  // 通过URL.createObjectURL方法把 blob 创建成 url
  const urlHref = URL.createObjectURL(blob)
  // 创建 a 元素
  const a = document.createElement('a')
  // 把 url 给 a.href
  a.href = urlHref
  // 下载为 kunquan.zip,默认为 .text 格式,这里我们指定为.zip
  a.download = 'kunquan.zip'
  // 调用点击事件下载
  a.click()
}

const download = () => {
  // 流文件解析下载成zip
  useFetch('prod-api/upload/stream')
}
const download2 = () => {
  // 或直接下载文件
  window.open('http://localhost:5173/prod-api/upload/export')
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
    <el-button @click="download">解析文件流再下载成zip</el-button>
    <el-button @click="download2">直接下载文件</el-button>
  </AutoScale>
</template>
