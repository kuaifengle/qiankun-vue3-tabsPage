<template>
  <h1>App2 userDetailuserDetailuserDetailuserDetailuserDetailuserDetail</h1>
  <router-link to="/app2/user">to user</router-link>
  <el-input v-model="value" placeholder></el-input>
</template>

<script>
export default {
  name: 'userDetail',
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    console.log(this.$route.id)
  },
}
</script>

<style>
</style>