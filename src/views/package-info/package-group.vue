<template>
  <CustomTable
    :columns="columns"
    :page-function="page"
    :save-all-function="saveAll"
  />

</template>

<script>
import { saveAll, page } from '@/api/package-info/package-group'
import CustomTable from '@/components/CustomTable'

export default {
  name: 'PackageGroup',
  components: { CustomTable },
  data() {
    return {
      saveAll: saveAll,
      page: page,
      row: {}
    }
  },
  computed: {
    columns() {
      return [
        {
          prop: 'id',
          label: '序号',
          width: '80',
          form: {
            key: 'id',
            label: 'id'
          }
        },
        {
          prop: 'name',
          label: '名称',
          width: '180',
          form: {
            key: 'name',
            label: '名称',
            type: 'input'
          }
        }, {
          prop: 'trackingNumber',
          label: '快递单号',
          width: '180',
          form: {
            key: 'trackingNumber',
            label: '快递单号',
            type: 'input'
          }
        }, {
          prop: 'internationalFreight',
          label: '国际运费',
          width: '180',
          form: {
            key: 'internationalFreight',
            label: '国际运费',
            type: 'input'
          }
        }, {
          prop: 'exchangeRate',
          label: '汇率',
          width: '180',
          form: {
            key: 'exchangeRate',
            label: '汇率',
            type: 'input'
          }
        }, {
          prop: 'weight',
          label: '重量',
          width: '180',
          form: {
            key: 'weight',
            label: '重量',
            type: 'input'
          }
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: '200px'
        },
        {
          prop: 'updateTime',
          label: '更新时间',
          width: '200px'
        },
        {
          label: '操作',
          type: 'action',
          buttons: []
        }
      ]
    }
  },
  beforeMount() {
  },
  methods: {
    list() {

    }
  }
}
</script>

<style scoped>

</style>
