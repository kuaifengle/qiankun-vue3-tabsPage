<template>
  <h1 style="color:pink; font-size:30px;">App2 UserUserUserUserUserUserUserUserUserUserUserUser</h1>

  <div
    style="margin-top:40px;"
  >因为userDetail是User的子页面所以会在keepAliveList中=====>删除User====> 再添加UserDetail</div>
  <router-link to="/app2/user/detail">to userDetail</router-link>

  <div style="margin-top:40px;">因为about不是User的子页面所以不能用$router.push跳转 需要新生成一个tab标签</div>
  <el-button @click="jump">点击跳转about</el-button>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'User',
  setup() {
    const instance = getCurrentInstance()

    let jump = () => {
      instance.appContext.config.globalProperties.$parentRouter.push(
        '/app2/about'
      )
    }

    return {
      jump,
    }
  },
}
</script>

<style>
</style>