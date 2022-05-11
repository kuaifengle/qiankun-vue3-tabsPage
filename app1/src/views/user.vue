<template>
  <div class="about">
    <h1>This is an USER page</h1>
    <el-button @click="closeActiveTab">点击我关闭当前活跃的tab标签页</el-button>
    <el-button @click="closeOtherTab">点击我关闭[/app1/about]标签页</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import action from '@/shared/action.js'
export default {
  name: 'User',
  setup() {
    const tableData = [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ]
    let closeActiveTab = () => {
      console.log(action)
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
      tableData,
    }
  },
}
</script>
