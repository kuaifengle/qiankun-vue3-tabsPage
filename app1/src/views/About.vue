<template>
  <div class="about">
    <h1>This is an App1 about page</h1>
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
