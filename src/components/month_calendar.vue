<template>
  <div id="month">
    <!-- Month & Year -->
    <div class="month_header row">
      <div class="col-sm-2 d-flex justify-content-center">
        <button class="btn bg-transparent" @click="previousMonth">
          <i class="fas fa-angle-left"></i>
        </button>
      </div>
      <div class="col-sm-8 d-flex justify-content-center">
        <h3 class="my-0">{{monthString}} -</h3>  
        <h3 class="my-0">&nbsp;{{year}}</h3>
      </div>
      <div class="col-sm-2 d-flex justify-content-center">
        <button class="btn bg-transparent" @click="nextMonth">
          <i class="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
    <!-- Week Days -->
    <div class="row">
      <div class="weekDays col-sm-12 d-flex justify-content-between p-0">
        <div class="weekDay text-center py-3" v-for="(weekDay, index) in weekDays" :key="index">{{weekDay}}</div>
      </div>
    </div>
    <!-- Month Days -->
    <div class="row" v-for="(week, indexWeek) in weeks" :key="indexWeek">
      <div class="monthDays col-sm-12 d-flex justify-content-between p-0">
        <div class= "monthDay pl-3 py-2" :class="{otherMonth: day.otherMonth, today: day.today}" v-for="(day, indexDay) in week" :key="indexDay" @click="reservSee({indexWeek, indexDay})">
          {{day.m_day}}
        </div>
      </div>
    </div>
    <!-- Reservations Component -->
    <transition name="fade">
      <reserv id="reserv" v-if="reservationState"/>
    </transition>
  </div>
</template>

<script>
import reserv from '@/components/reservations.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {

    }
  },
  components: {
    reserv
  },
  computed: {
    ...mapGetters([ 
      'year',
      'monthString',
      'weekDays',
      'weeks',
      'reservationState'
    ]),
  },
  methods: {
    ...mapActions([
      'onload',
      'previousMonth',
      'nextMonth',
      'reservSee'
    ]),
  },
  beforeMount() {
    this.onload();
  }
}
</script>

<style lang="scss" scoped>
 
#month {
  position: relative;
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  #reserv {
    position: absolute;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0; 
    z-index: 10;
  }
  :focus {
    box-shadow: none;
  }
  .btn:focus i {
    font-size: 50px;
  } 
  margin: 50px auto;
  padding: 0;
  background-color: #fff;
  height: 100vh;
  .month_header {
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
    position: relative;
    height: 10vh;
    padding: 0;
    h3 {
      line-height: 10vh;
    }
    i {
      line-height: 10vh;
      font-size: 30px;
      transition: 0.5s;
      color: #888;
    }
  }
  .weekDays {
    border-bottom: 2px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    .weekDay {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      flex-grow: 1;
      flex-basis: 100%; 
    }
  }
  .monthDays {
    border-bottom: 2px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    .monthDay {
      position: relative;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      flex-grow: 1;
      flex-basis: 100%; 
      height: 12vh;
    }
    .monthDay:hover {
      cursor: pointer;
    }
    .otherMonth {
      background-color: #eee;
    }
    .today {
      background-color: #555;
      color: #fff;
    }
  }
}
 
</style>
