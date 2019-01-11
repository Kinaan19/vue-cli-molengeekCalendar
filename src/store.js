import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [
      {name:'Deadpool', route:'deadpool', active: false},
      {name:'GTO', route:'gto', active: false},
      {name:'Joker', route:'joker', active: false},
      {name:'Star Wars', route:'starwars', active: false},
      {name:'Meeting #1', route:'meeting_1', active: false},
      {name:'Meeting #2', route:'meeting_2', active: false},
      {name:'Brain Storming', route:'brainstorm', active: false}
    ],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    month_days: [],
    weeks: [],
    months_fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekDays_fr: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    reservationState: false,
    daySelect: {},
    shifts: [],
    makeReservState: false,
    shift1State: false,
    shift2State: false
  },
  getters: {
    rooms(state) {
      return state.rooms;
    },
    year(state) {
      return state.year;
    },
    monthString(state) {
      return state.months_fr[state.month];
    },
    weekDays(state) {
      return state.weekDays_fr;
    },
    weeks(state) {
      return state.weeks;
    },
    reservationState(state) {
      return state.reservationState;
    },
    daySelect(state) {
      return state.daySelect;
    },
    shifts(state) {
      return state.shifts;
    },
    makeReservState(state) {
      return state.makeReservState;
    },
    shift1State(state) {
      return state.shift1State;
    },
    shift2State(state) {
      return state.shift2State;
    }
  },
  mutations: {
    monthDays(state) {
      state.weeks = [];
      var date = new Date(state.year, state.month, 1);
      // Days of the current month
      while(date.getMonth() === state.month) {
        if(new Date(date).getDate() === new Date().getDate() && new Date(date).getMonth() === new Date().getMonth()) {
          state.month_days.push({m_day: new Date(date).getDate(), w_day: new Date(date).getDay(), otherMonth: false, today: true});  
        }else { 
          state.month_days.push({m_day: new Date(date).getDate(), w_day: new Date(date).getDay(), otherMonth: false});
        }
        date.setDate(date.getDate() + 1);
      }
      // Days before the current month
      if(state.month_days[0].w_day != 1) {
        let i = 0;
        let month = new Date(state.year, state.month, i);
        while(month.getDay() != 0) {
          state.month_days.unshift({m_day: month.getDate(), w_day: month.getDay(), otherMonth: true}); 
          i--;
          month = new Date(state.year, state.month, i);
        }
      }
      // Days after the current month
      if(state.month_days[state.month_days.length-1].w_day != 0) {
        let i = 1;
        let month = new Date(state.year, state.month, i);
        if(state.month === 11) {
          month = new Date(state.year+1, 0, i);
        }else {
          month = new Date(state.year, state.month+1, i);
        }
        while(month.getDay() != 1) {
          state.month_days.push({m_day: month.getDate(), w_day: month.getDay(), otherMonth: true}); 
          i++;
          if(state.month === 11) {
            month = new Date(state.year+1, 0, i);
          }else {
            month = new Date(state.year, state.month+1, i);
          }
        }
      }
    },
    weeks(state) {
      while(state.month_days.length > 0) {
        state.weeks.push(state.month_days.splice(0,7));
      }
    },
    previousMonth(state) {
      if(state.month == 0) {
        state.year -= 1;
        state.month = 11;  
      }else {
        state.month -= 1;
      }
      state.weeks = [];
    },
    nextMonth(state) {
      if(state.month == 11) {
        state.year += 1;
        state.month = 0;  
      }else {
        state.month += 1;
      }
      state.weeks = [];
    },
    reservSee(state, {indexWeek, indexDay}) {
      var week = state.weeks[indexWeek];
      if(state.reservationState == false && week[indexDay].otherMonth == false) {
        state.reservationState = true;
        state.daySelect = week[indexDay];
        state.daySelect.w_day = state.weekDays_fr[indexDay];
      }
    },
    reservCancel(state) {
      state.reservationState = false;
      state.roomSelect = 'Les Salles';
      state.roomDropDownState = false;
      state.rooms.forEach(room => {
        room.active = false;
      });
      state.shiftState = false;
      state.shiftDropDownState1 = false;
      state.shiftDropDownState2 = false;
    },
    scroll() {
      var myScroll = document.getElementById('test');
      myScroll.scrollTop = 515;
    },
    shifts(state) {
      var hours = 0;
      while(hours < 24) {
        if(hours < 10) {
          state.shifts.push({shift: `0${hours}:00`, hour: hours, selected: false});
        }else {
          state.shifts.push({shift: `${hours}:00`, hour: hours, selected: false});
        }
        hours++;
      }
    },
    makeReserv(state, index) {
      if(state.shift1State == false) {
        state.shift1State = true;
        state.shifts[index].selected = true;
      }else if(state.shift1State == true && state.shift2State == false) {
        state.shift2State = true;
        state.shifts[index].selected = true;
        state.makeReservState = true;
      }else {
      }
    },
    makeReservCancel(state) {
      state.shifts.forEach(el => {
        el.selected = false;
      })
      state.shift1State = false;
      state.shift2State = false;
      state.makeReservState = false;
    }
  },
  actions: {
    onload(context) {
      context.commit('monthDays');
      context.commit('weeks');
      context.commit('shifts');
    },
    previousMonth(context) {
      context.commit('previousMonth');
      context.commit('monthDays');
      context.commit('weeks');
    },
    nextMonth(context) {
      context.commit('nextMonth');
      context.commit('monthDays');
      context.commit('weeks');
    },
    reservSee(context, {indexWeek, indexDay}) {
      context.commit('monthDays');
      context.commit('weeks');
      context.commit('reservSee', {indexWeek, indexDay});
    },
    reservCancel(context) {
      context.commit('reservCancel');
    },
    scroll(context) {
      context.commit('scroll');
    },
    makeReserv(context, index) {
      context.commit('makeReserv', index);
    },
    makeReservCancel(context) {
      context.commit('makeReservCancel');
    }
  }
})
