import request from '@/utils/request'


export function generatePresignedUrl(v) {
  console.log(v)
  return request({
    url: '/minio/generatePresignedUrl/' + v,
    method: 'get'
  })
}
