<template>
  <router-view v-slot="{ Component }">
    <div style="color:red;">微应用App1的已缓存的页面有: =====> <span style="color:green;">{{ keepAliveList || '[暂无]' }}</span></div>
    <keep-alive :include="keepAliveList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['keepAliveList'])
  }
}
</script>

<style>
</style>
