<template>
{{keepAliveList}}
  <router-view v-slot="{ Component }">
    <!-- :include="keepAliveList" -->
    <keep-alive >
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

<style lang="scss">
</style>
