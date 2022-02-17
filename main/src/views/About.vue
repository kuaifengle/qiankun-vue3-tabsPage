<template>
  <div class="about">
    <h1>这里是主页面[main]的About页面</h1>
    <el-rate v-model="value" size="large"></el-rate>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(null)
    return {
      value,
    }
  },
}
</script>
