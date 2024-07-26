import request from '@/utils/request'

export function logicDelete(params) {
  return request({
    url: '/PackageGroup/logicDelete',
    method: 'get',
    params
  })
}
export function save(data) {
  return request({
    url: '/PackageGroup/save',
    method: 'post',
    data
  })
}
export function saveAll(data) {
  return request({
    url: '/PackageGroup/saveAll',
    method: 'post',
    data
  })
}
export function page(data) {
  return request({
    url: '/PackageGroup/page',
    method: 'post',
    data
  })
}
export function list() {
  return request({
    url: '/PackageGroup/list',
    method: 'get'
  })
}
