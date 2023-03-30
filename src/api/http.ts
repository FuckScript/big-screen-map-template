import axios, {
  AxiosError,
  AxiosInstance,
  //  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import showCodeMessage from '@/api/code'
import { formatJsonToUrlParams, instanceObject } from '@/utils/format'

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL

// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    config.headers['Authorization'] =
      'Bearer ' +
      'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjM3ZjA2ZjQ0LTM4ODUtNDZhZS1iMDYzLWMzMDRlOGUwZjgzNCJ9.8qKVdmwQ8Tx68nVrn3PbX2TlvCxFBrwfqpVsqn1VYwFRg8P53WDlhya2eg-cb8POOsECiqBrNU6_paCA_wCUAg'
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data
    }
    ElMessage.info(JSON.stringify(response.status))
    return response
  },
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      ElMessage.error(showCodeMessage(response.status))
      return Promise.reject(response.data)
    }
    ElMessage.warning('网络连接异常,请稍后再试!')
    return Promise.reject(error)
  }
)
const service = {
  get<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, { params: data })
  },

  post<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.post(url, data)
  },

  put<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.put(url, data)
  },

  delete<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.delete(url, data)
  },

  upload: (url: string, file: FormData | File) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  download: (url: string, data: instanceObject) => {
    window.location.href = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`
  }
}

export default service
