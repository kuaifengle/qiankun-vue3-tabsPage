<template>
  <h1>这里是主页面[main]的About页面</h1>
  <el-radio-group v-model="labelPosition">
    <el-radio-button label="left">Left</el-radio-button>
    <el-radio-button label="right">Right</el-radio-button>
    <el-radio-button label="top">Top</el-radio-button>
  </el-radio-group>
  <div style="margin: 20px"></div>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="Name">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-input v-model="formLabelAlign.region"></el-input>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="formLabelAlign.type"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'About',
  setup() {
    const labelPosition = ref('right')
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: '',
    })
    return {
      labelPosition,
      formLabelAlign,
    }
  },
}
</script>