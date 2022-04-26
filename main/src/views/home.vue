<template>
  <div class="home">
    <h1>HOME</h1>
    <el-input v-model="value" placeholder="我是首页的输入框"></el-input>

    <el-button @click="$router.push('/user')">点我跳转Main的User页面</el-button>
    <el-button @click="$router.push('/app2/user')">点我跳转App2的User页面</el-button>
    <el-button @click="$router.push('/app1/about')">点我跳转App1的About页面</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      value: '',
    }
  },
  components: {},
}
</script>
