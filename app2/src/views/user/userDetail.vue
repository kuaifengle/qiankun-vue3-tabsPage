<template>
  <h1>App2 userDetailuserDetailuserDetailuserDetailuserDetailuserDetail</h1>
  <router-link to="/app2/user">to user</router-link>
  <el-input v-model="value" placeholder></el-input>
  <e-button @click="$router.go(-1)">返回User</e-button>
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