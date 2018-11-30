<template>
  <div id="home">
    <filters class="container"/> 
    <choose class="container"/>
    <!-- <vue-scheduler id="scheduler" class="container" v-if="testVS"/> -->
    <ds-calendar/>
  </div>
</template>

<script>
// @ is an alias to /src
import filters from '@/components/filters.vue'
import choose from '@/components/choose.vue'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    filters,
    choose
  }
}
</script>

<style scoped>

</style>
