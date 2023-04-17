import service from '@/api/http'

const mapApi = {
  // 获取地图统计人数
  getCountBjDataByArea: (params: object | undefined) => service.post('/system/bjAnalysis/countBjDataByArea', params)
}
export default mapApi
