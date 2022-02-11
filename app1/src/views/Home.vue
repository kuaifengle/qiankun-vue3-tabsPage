<template>
  <div class="home">
    <HelloWorld msg="App1App1App1App1App1App1App1App1App1"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
