<template>
  <div class="about">
    <div style="color: green; font-size: 20px;  ">query参数{{$route.query}}</div>
    <h1>This is an App2 about page</h1>
    <el-input v-model="value" placeholder></el-input>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      value: '',
    }
  },
  methods: {
  }
}
</script>
