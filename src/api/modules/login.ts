import service from '@/api/http'

const loginApi = {
  // 验证登录实例
  postVerification: (params: object) => service.post(`/login`, params),
  getUserInfo: (id: number | string) => service.get(`/user/${id}`)
}

export default loginApi
