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
    <div class="bg-white p-10">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="账号">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="formLabelAlign.code" />
          <img :src="codeUrl" alt="" @click="resetCode" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </AutoScale>
</template>

<script setup lang="ts">
type labelPositionType = 'top' | 'left' | 'right'

const labelPosition = ref<labelPositionType>('right')

const codeUrl = ref<string>('/prod-api/user/code')

const formLabelAlign = reactive({
  name: '',
  password: '',
  code: ''
})

const resetCode = () => (codeUrl.value = codeUrl.value + '?' + Math.random())

const submit = () => {
  fetch('/prod-api/user/create', {
    method: 'POST',
    body: JSON.stringify(formLabelAlign), // 要转一下不然传不过去
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('🚀 ~ file: About.vue:60 ~ submit ~ res:', res)
    })
}
</script>
