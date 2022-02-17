<template>
  <h1>App2 userDetailuserDetailuserDetailuserDetailuserDetailuserDetail</h1>
  <router-link to="/app2/user">to user</router-link>
  <el-input v-model="value" placeholder></el-input>
  <el-button @click="$router.push('/app2/user')">返回User</el-button>
</template>

<script>
export default {
  name: 'UserDetail',
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    // console.log(this.$route.id)
  },
}
</script>

<style>
</style>