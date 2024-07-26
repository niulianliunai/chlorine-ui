import { recursionTreeHidden } from '@/chlorine/utils/tree'

export async function commonSaveAll(that, func, afterFunc) {
  that.saveDialog = false
  await func({ data: JSON.stringify([that.row]) }).then(resp => {
    const { code } = resp
    if (code === 200) {
      that.$message.success('操作成功')
    }
  })
  if (afterFunc) {
    afterFunc()
  } else {
    that.page()
  }
}

// export function commonDel(that) {
//   that.$confirmBox().then(() => {
//     that.row.deleted = true
//     that.saveAll(that.row)
//     that.resetForm()
//   })
// }
//
// export function commonPage(that) {
//   that.pageFunction({
//     pageNumber: that.pageNumber,
//     pageSize: that.pageSize,
//     contain: that.contain
//   }).then(response => {
//     that.rows = response.data.content
//     that.total = response.data.totalElements
//     const totalPages = response.data.totalPages
//     if (that.pageNumber > totalPages) {
//       that.pageNumber = totalPages
//       that.page()
//     }
//   })
// }

export function commonList(rows, func, showHidden = true) {
  func().then(response => {
    const { data } = response
    rows.length = 0
    if (showHidden) {
      rows.push(...data)
    } else {
      rows.push(...recursionTreeHidden(data))
    }
  })
}
