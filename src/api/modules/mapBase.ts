import service from '@/api/http'

// 获取点位
export function getDropPoint(data) {
  return request({
    url: '/system/bjAnalysis/queryBjData',
    method: 'post',
    data: data
  })
}

// 经费形式
export function listQueryData(query) {
  return request({
    url: '/system/payType/listQueryData',
    method: 'get',
    params: query
  })
}

// 区域
export function areaLazy(data) {
  return request({
    url: '/system/address/listData',
    method: 'get',
    params: data
  })
}
export function deptList(data) {
  return request({
    url: '/system/address/listData',
    method: 'get',
    params: data
  })
}

// 获取饼图
export function getCountBjDataByAreaWithCycle(data) {
  return request({
    url: '/system/bjAnalysis/countBjDataByAreaWithCycle',
    method: 'post',
    data: data
  })
}

// 获取折线
export function getCountBjDataByYear(data) {
  return request({
    url: '/system/bjAnalysis/countBjDataBy5Year',
    method: 'post',
    data: data
  })
}

// 获取地图统计人数
export function getCountBjDataByArea(params) {
  return service.post('/system/bjAnalysis/countBjDataByArea', params)
}

// 保健对象弹窗
export function bjUser(id, data) {
  return request({
    url: '/system/bjUser/' + id,
    method: 'get',
    params: data
  })
}

// 基地医院落点
export function getHospitalByGeoJson(data) {
  return request({
    url: '/system//base-hospital/getHospitalByGeoJson',
    method: 'get',
    params: data
  })
}
