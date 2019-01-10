<template>
  <div id="home">
    <!-- <rooms class="container"/> 
    <choose class="container"/> -->
    <month class="container"/>
    <!-- <dayspan/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import dayspan from '@/components/dayspan.vue'
import rooms from '@/components/rooms.vue'
import choose from '@/components/choose.vue'
import month from '@/components/month_calendar.vue'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    rooms,
    choose,
    month
    // dayspan
  }
}
</script>

<style lang="scss" scoped>

</style>
