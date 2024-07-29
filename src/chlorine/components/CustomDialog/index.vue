<template>
  <el-dialog
    :title="title"
    :visible.sync="value"
    :width="width"
    :before-close="close"
  >
    <el-form
      ref="form"
      label-width="120px"
    >
      <el-form-item v-for="item of form" v-show="item.type" :key="item.name" :label="item.label">
        <el-input v-if="item.type==='input'" v-model="item.value" @input="$forceUpdate()" />
        <el-input v-else-if="item.type==='textarea'" v-model="item.value" type="textarea" />
        <el-select v-else-if="item.type==='select'" v-model="item.value" @input="$forceUpdate()">
          <el-option
            v-for="option in item.options"
            :key="option.id"
            :label="option.name"
            :value="option.id"
          />
        </el-select>
        <el-cascader
          v-else-if="item.type==='cascader'"
          v-model="item.value"
          :placeholder="item.placeholder"
          :options="item.options"
          :props="{ expandTrigger: 'hover',label: 'name', value: 'id',emitPath:false}"
        />
        <el-upload
          v-if="item.type==='image'"
          class="avatar-uploader"
          :action="actionUrl"
          :headers="{'Authorization':getToken()}"
          :show-file-list="false"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
        >
          <img v-if="item.value" :src="baseImgUrl + item.value" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit(getSubmitForm(form))">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>

import {getToken} from "@/utils/auth";

export default {
  name: 'CustomDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '对话框'
    },
    width: {
      type: String,
      default: '60%'
    },
    form: {
      type: Array,
      default: function() {
        return []
      }
    },
    submit: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      actionUrl: process.env.VUE_APP_NEW_API + process.env.VUE_APP_IMAGE_ACTION_API,
      baseImgUrl: process.env.VUE_APP_NEW_API + process.env.VUE_APP_IMAGE_GET_API
    }
  },
  methods: {
    getToken() {
      return getToken()
    },
    handleRemove(file) {
      console.log(file)
    },
    handleSuccess(res) {
      for (let i = 0; i < this.form.length; i++) {
        if (this.form[i].type === 'image') {
          this.form[i].value = res.data
          console.log(this.form)
          this.$forceUpdate()
        }
      }
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isLt10M
    },
    close() {
      this.$emit('input', false)
    },
    getSubmitForm(form) {
      const res = {}
      for (const item of form) {
        res[item.key] = item.value
      }
      return res
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  margin: 0;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
