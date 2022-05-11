<template>
  <h1>App2 userInfo 第三级子页面</h1>

  <el-button @click="windowReload">刷新后会返回一级页面 User</el-button>
  <el-input v-model="value" placeholder></el-input>
  <el-button @click="$router.go(-1)">返回userDetail</el-button>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    // console.log(this.$route.id)
  },
  methods: {
    windowReload() {
      window.location.reload();
    },
  },
};
</script>

<style>
</style>