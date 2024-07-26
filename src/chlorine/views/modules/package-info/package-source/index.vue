<template>
  <CustomTable
    :columns="columns"
    :page-function="pageFunction"
    :save-function="saveFunction"
    :delete-function="deleteFunction"
  />

</template>

<script>
import { page, save, logicDelete } from '@/chlorine/api/modules/package-info/package-source'
import CustomTable from '@/chlorine/components/CustomTable'
import { commonList } from '@/chlorine/utils/common'
import { list as listPackageGroup } from '@/chlorine/api/modules/package-info/package-group'

export default {
  name: 'PackageSource',
  components: { CustomTable },
  data() {
    return {
      saveFunction: save,
      pageFunction: page,
      deleteFunction: logicDelete,
      row: {},
      packageGroup: []
    }
  },
  computed: {
    columns() {
      return [

        {
          prop: 'name',
          label: '名称',
          width: '280',
          type: 'url',
          form: {
            key: 'name',
            label: '名称',
            type: 'input'
          }
        }, {
          prop: 'computedPrice',
          label: '单个最低成本',
          width: '120'
        }, {
          prop: 'code',
          label: '包裹号',
          width: '150',
          form: {
            key: 'code',
            label: '包裹号',
            type: 'input'
          }
        }, {
          prop: 'goodsPrice',
          label: '商品价',
          width: '80',
          form: {
            key: 'goodsPrice',
            label: '商品价',
            type: 'input'
          }
        }, {
          prop: 'weight',
          label: '商品重量',
          width: '80',
          form: {
            key: 'weight',
            label: '商品重量',
            type: 'input'
          }
        }, {
          prop: 'jpFreight',
          label: '日本运费',
          width: '80',
          form: {
            key: 'jpFreight',
            label: '日本运费',
            type: 'input'
          }
        }, {
          prop: 'goodsCount',
          label: '商品数量',
          width: '80',
          form: {
            key: 'goodsCount',
            label: '商品数量',
            type: 'input'
          }
        },
        {
          prop: 'url',
          label: '链接',
          width: '180',
          form: {
            key: 'url',
            label: '链接',
            type: 'input'
          }
        },
        {
          prop: 'id',
          label: '序号',
          width: '80',
          type: 'hidden',
          form: {
            key: 'id',
            label: 'id'
          }
        },
        // {
        //   prop: 'length',
        //   label: '长',
        //   width: '80',
        //   form: {
        //     key: 'length',
        //     label: '长',
        //     type: 'input',
        //   }
        // }, {
        //   prop: 'width',
        //   label: '宽',
        //   width: '80',
        //   form: {
        //     key: 'width',
        //     label: '宽',
        //     type: 'input',
        //   }
        // }, {
        //   prop: 'height',
        //   label: '高',
        //   width: '80',
        //   form: {
        //     key: 'height',
        //     label: '高',
        //     type: 'input',
        //   }
        // },
        {
          prop: 'packageGroup.name',
          label: '组合',
          width: '80',
          form: {
            key: 'groupId',
            label: '组合',
            type: 'select',
            options: this.packageGroup
          }
        },
        {
          prop: 'imageURL',
          label: '图片',
          width: '200',
          type: 'image',
          form: {
            key: 'imageURL',
            label: '图片',
            type: 'image'
          }
        },
        // {
        //   prop: 'createTime',
        //   label: '创建时间',
        //   width: '100px'
        // },
        // {
        //   prop: 'updateTime',
        //   label: '更新时间',
        //   width: '100px'
        // },
        {
          label: '操作',
          type: 'action',
          buttons: []
        }
      ]
    }
  },
  beforeMount() {
    this.list()
  },
  methods: {
    list() {
      commonList(this.packageGroup, listPackageGroup, false)
    }
  }
}
</script>

<style scoped>

</style>
