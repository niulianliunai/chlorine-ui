import request from '@/utils/request'

// export function findPackageSource(data) {
//   return request({
//     url:'/PackageSource/findPackageSource',
//     method: 'post',
//     data
//   })
// }

export function logicDelete(params) {
  return request({
    url: '/PackageSource/logicDelete',
    method: 'get',
    params
  })
}
export function save(data) {
  return request({
    url: '/PackageSource/save',
    method: 'post',
    data
  })
}
export function saveAll(data) {
  return request({
    url: '/PackageSource/saveAll',
    method: 'post',
    data
  })
}
export function page(data) {
  return request({
    url: '/PackageSource/page',
    method: 'post',
    data
  })
}
export function list() {
  return request({
    url: '/PackageSource/list',
    method: 'get'
  })
}
