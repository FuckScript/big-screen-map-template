import service from '@/api/http'

// 获取地图统计人数
export function getCountBjDataByArea(params: object | undefined) {
  return service.post('/system/bjAnalysis/countBjDataByArea', params)
}
