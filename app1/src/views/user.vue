<template>
  <div class="about">
    <h1>This is an USER page</h1>
    <el-button @click="closeActiveTab">点击我关闭当前活跃的tab标签页</el-button>
    <el-button @click="closeOtherTab">点击我关闭[/app1/about]标签页</el-button>
  </div>
</template>

<script>
import action from '@/shared/action.js'
export default {
  name: 'User',
  setup() {
    let closeActiveTab = () => {
      action.setGlobalState({
        changeMicoTabsPath: {
          type: 'closeActiveTab',
        },
      })
    }
    let closeOtherTab = () => {
      action.setGlobalState({
        changeMicoTabsPath: {
          type: 'closeOtherTab',
          path: '/app1/about',
        },
      })
    }

    return {
      closeActiveTab,
      closeOtherTab,
    }
  },
}
</script>
