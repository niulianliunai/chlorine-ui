import request from '@/utils/request'

export function statisticsWareHousePackageSource() {
  return request({
    url: '/Statistics/statisticsWareHousePackageSource',
    method: 'get'
  })
}
