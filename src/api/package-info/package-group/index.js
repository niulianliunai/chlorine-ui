import request from '@/utils/request'

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
