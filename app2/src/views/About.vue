<template>
  <div class="about">
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
