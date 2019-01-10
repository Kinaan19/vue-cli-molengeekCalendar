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
    shiftState: false,
    shiftDropDownState1: false,
    shiftSelect1: {shift: '-- : --', hour: 0, quarter: 0},
    shiftDropDownState2: false,
    shiftSelect2: {shift: '-- : --', hour: 0, quarter: 0},
    shifts: [],
    roomDropDownState: false,
    roomSelect: 'Les Salles',
    reservations: [],
    isReservations: false,
    alertState1: false,
    alertState2: false,

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
    shiftState(state) {
      return state.shiftState;
    },
    shiftDropDownState1(state) {
      return state.shiftDropDownState1;
    },
    shiftSelect1(state) {
      return state.shiftSelect1.shift;
    },
    shiftDropDownState2(state) {
      return state.shiftDropDownState2;
    },
    shiftSelect2(state) {
      return state.shiftSelect2.shift;
    },
    shifts(state) {
      return state.shifts;
    },
    roomDropDownState(state) {
      return state.roomDropDownState;
    },
    roomSelect(state) {
      return state.roomSelect;
    },
    reservations(state) {
      return state.reservations;
    },
    isReservations(state) {
      return state.isReservations;
    },
    alertState1(state) {
      return state.alertState1;
    },
    alertState2(state) {
      return state.alertState2;
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
    shifts(state) {
      var hours = 0;
      var quarters = 0;
      while(hours < 24) {
        if(hours < 10 && quarters == 0 ) {
          state.shifts.push({shift: `0${hours}:00`, hour: hours, quarter: quarters, selected: false});
          quarters += 15;
        }else if(hours < 10 && quarters != 0) {
          state.shifts.push({shift: `0${hours}:${quarters}`, hour: hours, quarter: quarters, selected: false});
          quarters += 15;
          if(quarters == 60) {
            hours++;
            quarters = 0;
          }
        }else if(hours >= 10 && quarters == 0) {
          state.shifts.push({shift: `${hours}:00`, hour: hours, quarter: quarters, selected: false});
          quarters += 15;
        }else {
          state.shifts.push({shift: `${hours}:${quarters}`, hour: hours, quarter: quarters, selected: false});
          quarters += 15;
          if(quarters == 60) {
            hours++;
            quarters = 0;
          }
        }
      }
    },
    shiftStateSwitch(state) {
      state.shiftState = !state.shiftState;
      state.shiftDropDownState1 = false;
      state.shiftDropDownState2 = false;
      state.shiftSelect1.shift = '-- : --';
      state.shiftSelect2.shift = '-- : --';
      state.roomDropDownState = false;
    },
    shiftDropDownStateSwitch1(state) {
      state.roomDropDownState = false;
      state.shiftDropDownState2 = false;
      state.shiftDropDownState1 = !state.shiftDropDownState1;
    },
    shiftDropDownStateSwitch2(state) {
      state.roomDropDownState = false;
      state.shiftDropDownState1 = false;
      state.shiftDropDownState2 = !state.shiftDropDownState2;
    },
    shiftSelection1(state, index) {
      state.shiftDropDownState1 = false;
      state.shiftSelect1.shift = state.shifts[index].shift;
      state.shiftSelect1.hour = state.shifts[index].hour;
      state.shiftSelect1.quarter = state.shifts[index].quarter;
    },
    shiftSelection2(state, index) {
      state.shiftDropDownState2 = false;
      state.shiftSelect2.shift = state.shifts[index].shift;
      state.shiftSelect2.hour = state.shifts[index].hour;
      state.shiftSelect2.quarter = state.shifts[index].quarter;
    },
    roomDropDownStateSwitch(state) {
      state.shiftDropDownState1 = false;
      state.shiftDropDownState2 = false;
      state.roomDropDownState = !state.roomDropDownState;
    },
    roomSelection(state, index) {
      state.roomDropDownState = false;
      state.rooms.forEach(room => {
        room.active = false;
      });
      state.rooms[index].active = true;
      state.roomSelect = state.rooms[index].name;
    },
    confirmReservation(state) {
      state.rooms.forEach(room => {
        room.active = false;
      });
      if(state.shiftState == false){
        state.shiftSelect1.shift = '09:00';
        state.shiftSelect2.shift = '17:00';
        state.shiftSelect1.hour = 9;
        state.shiftSelect2.hour = 17;
        state.shiftSelect1.quarter = 0;
        state.shiftSelect2.quarter = 0;
      }

      state.reservations.forEach(el => {
        if(
          state.roomSelect == el.room && state.shiftSelect1.hour == el.hour1 && state.shiftSelect1.quarter >= el.quarter1 ||
          state.roomSelect == el.room && state.shiftSelect2.hour == el.hour2 && state.shiftSelect2.quarter >= el.quarter2
          ) {

          }
        if(
          state.roomSelect == el.room && state.shiftSelect1.hour >= el.hour1 && state.shiftSelect1.quarter >= el.quarter1 ||
          state.roomSelect == el.room && state.shiftSelect1.hour < el.hour2 && state.shiftSelect1.quarter < el.quarter2 ||
          state.roomSelect == el.room && state.shiftSelect2.hour > el.hour1 && state.shiftSelect2.quarter > el.quarter1 ||
          state.roomSelect == el.room && state.shiftSelect2.hour <= el.hour2 && state.shiftSelect2.quarter >= el.quarter2  
          ) {
          state.alertState2 = true;
        }
      }); 

      if(state.shiftSelect1.shift == '-- : --' || state.shiftSelect2.shift == '-- : --' || state.roomSelect  == 'Les Salles') {
        state.alertState1 = true;
      }else if(state.alertState2 == false) {
        state.reservations.push({
          room: state.roomSelect,
          shift1: state.shiftSelect1.shift, 
          shift2: state.shiftSelect2.shift, 
          hour1: state.shiftSelect1.hour,
          hour2: state.shiftSelect2.hour,
          quarter1: state.shiftSelect1.quarter,
          quarter2: state.shiftSelect2.quarter
        });
        state.isReservations = true;
        state.shiftState = false;
        state.shiftDropDownState1 = false;
        state.shiftDropDownState2 = false;
        state.roomDropDownState = false;
        state.roomSelect = 'Les Salles';
      }
    },
    alertCancel(state) {
      state.alertState1 = false;
      state.alertState2 = false;
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
    shiftStateSwitch(context) {
      context.commit('shiftStateSwitch');
    },
    shiftDropDownStateSwitch1(context) {
      context.commit('shiftDropDownStateSwitch1');
    },
    shiftDropDownStateSwitch2(context) {
      context.commit('shiftDropDownStateSwitch2');
    },
    shiftSelection1(context, index) {
      context.commit('shiftSelection1', index);
    },
    shiftSelection2(context, index) {
      context.commit('shiftSelection2', index);
    },
    roomDropDownStateSwitch(context) {
      context.commit('roomDropDownStateSwitch');
    },
    roomSelection(context, index) {
      context.commit('roomSelection', index);
    },
    confirmReservation(context) {
      context.commit('confirmReservation');
    },
    alertCancel(context) {
      context.commit('alertCancel');
    },

    makeReserv(context, index) {
      context.commit('makeReserv', index);
    }
  }
})
