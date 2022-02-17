<template>
  <div class="about">
    <h1>我是主应用的UserUserUserUserUserUserUserUserUserUserUserUserUserUser</h1>
    <el-input v-model="value" placeholder></el-input>
    <div>
      <el-radio v-model="radio1" :label="1" size="large">Option 1</el-radio>
      <el-radio v-model="radio1" :label="2" size="large">Option 2</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      value: '123',
      radio1: 1,
    }
  },
}
</script>
