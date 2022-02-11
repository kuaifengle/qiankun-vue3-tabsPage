<template>
  <router-view v-slot="{ Component }">
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
