<template>
  <div class="about">
    <h1>This is an App1 about page</h1>
    <div>如果App2未加载就会先加载App2微应用再新建tab标签跳转</div>
    <div>如果App2已加载就会切换tab标签再跳转</div>
    <el-button @click="jump">点我跳转App2的User页面</el-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'About',
  setup() {
    const instance = getCurrentInstance()

    let jump = () => {
      instance.appContext.config.globalProperties.$parentRouter.push(
        '/app2/user'
      )
    }

    return {
      jump,
    }
  },
}
</script>
