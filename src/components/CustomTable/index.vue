<template>
  <div class="app-container">
    <el-button
      v-if="showAddButton"
      size="small"
      type="primary"
      @click="showSaveDialog(undefined)"
    >
      新增
    </el-button>
    <div style="height: 10px" />
    <span
      v-for="item of form"
      v-show="item.type"
      :key="item.name"
      style="margin-right: 5px;margin-left: 0"
    >
      <el-input
        v-if="item.type==='input' || item.type==='textarea'"
        v-model="item.condition"
        :placeholder="item.label"
        style="width: 200px"
        @input="$forceUpdate()"
      />
      <el-select
        v-else-if="item.type==='select'"
        v-model="item.condition"
        :placeholder="item.label"
        @input="$forceUpdate()"
      >
        <el-option
          v-for="option in item.options"
          :key="option.id"
          :label="option.name"
          :value="option.id"
        />
      </el-select>
      <el-cascader
        v-else-if="item.type==='cascader'"
        v-model="item.condition"
        :placeholder="item.label"
        :options="item.options"
        :props="{ expandTrigger: 'hover',label: 'name', value: 'id',emitPath:false}"
      />
    </span>
    <el-button
      type="primary"
      style=""
      @click="page"
    >
      搜索
    </el-button>
    <el-table
      :data="displayRows"
      style="width: 100%"
    >
      <el-table-column
        v-for="col of imageColumns"
        :key="col.prop"
        :label="col.label"
        :width="col.width"
      >
        <template #default="scope">
          <img
            :key="scope.row.id"
            :src=" scope.row.imageURL"
            style="max-height: 200px;max-width: 200px;background-size: contain"
            alt=""
          >
        </template>
      </el-table-column>
      <el-table-column
        v-for="url of urlColumns"
        :key="url.label"
        :label="url.label"
        :width="url.width"
      >
        <template #default="scope">
          <el-link type="primary" :href="getLink(scope.row.url)" @click.native.prevent="handleClick(scope.row.url)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>

      <el-table-column
        v-for="col of commonColumns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
      />

      <el-table-column
        v-for="action of actionColumns"
        :key="action.label"
        :label="action.label"
        :width="action.width"
      >
        <template #default="scope">
          <el-button
            v-for="button of action.buttons"
            :key="button.name"
            type="text"
            :size="button.size"
            @click="button.click(scope.row)"
          >
            {{ button.name }}
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="showSaveDialog(scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="del(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev, pager, next"
      :page-size="pageSize"
      :current-page="pageNumber"
      :total="total"
      @current-change="changePage"
    />
    <CustomDialog
      v-model="saveDialog"
      :submit="save"
      :form="form"
    />
  </div>
</template>

<script>

import { formatTime } from '@/utils'
import CustomDialog from '@/components/CustomDialog'

export default {
  name: 'CustomTable',
  components: { CustomDialog },
  props: {
    showAddButton: {
      type: Boolean,
      default: true
    },
    pageFunction: {
      type: Function,
      default: undefined
    },
    listFunction: {
      type: Function,
      default: undefined
    },
    saveFunction: {
      type: Function,
      default: undefined
    },
    deleteFunction: {
      type: Function,
      default: undefined
    },
    columns: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      saveDialog: false,
      pageSize: 20,
      pageNumber: 1,
      total: 0,
      row: {},
      rows: []
    }
  },
  computed: {
    displayRows() {
      for (const row of this.rows) {
        row.createTime = formatTime(row.createTime)
        row.updateTime = formatTime(row.updateTime)
      }
      return this.rows
    },
    urlColumns() {
      return this.columns.filter(item => {
        return item.type === 'url'
      })
    },
    commonColumns() {
      return this.columns.filter(item => {
        return item.type === undefined && item.prop !== undefined
      })
    },
    actionColumns() {
      return this.columns.filter(item => {
        return item.type === 'action'
      })
    },
    imageColumns() {
      return this.columns.filter(item => {
        return item.type === 'image'
      })
    },
    form() {
      const form = []
      for (const col of this.columns) {
        if (col.form) {
          if (this.row) {
            col.form.value = this.row[col.form.key]
          } else {
            col.form.value = undefined
          }
          form.push(col.form)
        }
      }
      return form
    }
  },
  mounted() {
    console.log(this.columns)
  },
  beforeMount() {
    this.page()
  },
  methods: {
    getLink(url) {
      // 这里返回原链接，但实际上我们不需要在这里做任何处理，因为@click事件会处理打开新标签页
      return url
    },
    handleClick(url) {
      // 使用 window.open 来在新标签页中打开链接
      window.open(url, '_blank')
      // 使用 .prevent 修饰符阻止默认的链接点击行为
    },
    showSaveDialog(row) {
      console.log(row)
      this.row = row
      this.saveDialog = true
    },
    getPageCondition() {
      const pageCondition = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        params: {}
      }
      for (const item of this.form) {
        if (isNaN(Number(item.condition))) {
          pageCondition.params[item.key + 'Contains'] = item.condition
        } else {
          pageCondition.params[item.key + 'Equals'] = item.condition
        }
      }
      return pageCondition
    },
    changePage(pageNumber) {
      this.pageNumber = pageNumber
      this.page()
    },
    page() {
      this.pageFunction(this.getPageCondition()).then(response => {
        this.rows = response.data.content
        this.total = response.data.totalElements
        const totalPages = response.data.totalPages
        if (this.pageNumber > totalPages && totalPages > 0) {
          this.pageNumber = totalPages
          this.page()
        }
      })
    },
    async save(row) {
      this.saveDialog = false
      await this.saveFunction(row).then(resp => {
        const { code } = resp
        if (code === 200) {
          this.$message.success('操作成功')
        }
      })
      this.page()
    },
    del(row) {
      this.$confirm('确认删除？', '提示').then(async() => {
        await this.deleteFunction({ id: row.id }).then(resp => {
          const { code } = resp
          if (code === 200) {
            this.$message.success('删除成功')
          }
        })
        this.page()
      })
    }
  }
}
</script>

<style scoped>

</style>
