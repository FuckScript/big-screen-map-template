import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref()

  const userInfoName = computed(() => userInfo.value?.user_name ?? 'D')

  function updateUserInfo(value: object): void {
    userInfo.value = value
  }
  return { userInfo, userInfoName, updateUserInfo }
})
