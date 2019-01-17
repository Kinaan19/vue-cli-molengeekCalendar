import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [
      {name:'Deadpool', route:'deadpool', shifts: [], active: false},
      {name:'GTO', route:'gto', shifts: [], active: false},
      {name:'Joker', route:'joker', shifts: [], active: false},
      {name:'Star Wars', route:'starwars', shifts: [], active: false},
      {name:'Meeting #1', route:'meeting_1', shifts: [], active: false},
      {name:'Meeting #2', route:'meeting_2', shifts: [], active: false},
      {name:'Brain Storming', route:'brainstorm', shifts: [], active: false}
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
    shift2State: false,
    shift1: "",
    shift2: "",
    index1: 0,
    index2: 0,
    selectedRoom: "",
    selectRoomState: false
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
    },
    shift1(state) {
      return state.shift1;
    },
    shift2(state) {
      return state.shift2;
    },
    selectedRoom(state) {
      return state.selectedRoom;
    },
    selectRoomState(state) {
      return state.selectRoomState;
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
      state.selectRoomState = false;
      state.roomSelect = "";
      state.rooms.forEach(room => {
        room.active = false;
      });
    },
    scroll() {
      var myScroll = document.getElementsByClassName('reservs');
      setTimeout(() => {
        myScroll[0].scrollTop = 515;
      }, 1);
    },
    shifts(state) {
      var hours = 0;
      while(hours < 24) {
        if(hours < 10) {
          state.shifts.push({shift: `0${hours}:00`, hour: hours, selected: false, hide: false});
          state.rooms.forEach(el => {
            el.shifts.push({shift: `0${hours}:00`, hour: hours, selected: false, hide: false});
          })
        }else {
          state.shifts.push({shift: `${hours}:00`, hour: hours, selected: false, hide: false});
          state.rooms.forEach(el => {
            el.shifts.push({shift: `${hours}:00`, hour: hours, selected: false, hide: false});
          })
        }
        hours++;
      }
    },
    selectRoom(state, index) {
      if(state.rooms[index].active == false) {
        state.selectRoomState = true;
        state.rooms[index].active = true;
        state.selectedRoom = state.rooms[index].name;
        state.rooms.forEach(el => {
          if(el.name == state.selectedRoom) {
            state.shifts = el.shifts;
          }
          if(el.name != state.selectedRoom) {
            el.active = false;
          }
        })
      }else {
        state.selectRoomState = false;
        state.rooms[index].active = false;
        state.selectedRoom = "";
        state.shifts.forEach(el => {
          el.selected = false;
        })
      }
      if(state.selectedRoom != "" && state.shift1State == true && state.shift2State == true) {
        setTimeout(() => {   
          state.makeReservState = true;
        }, 500);
      }
    },
    selectShifts(state, index) {
      if(state.shift1State == false) {
        if(state.shifts[index].reserved == true){
          alert('tagueule !');
        }else {
          state.shift1State = true;
          state.shifts[index].selected = true;
          state.shift1 = state.shifts[index].shift;
          state.index1 = index;
        }
      }else if(state.shift1State == true && state.shift2State == false) {
        if(state.shifts[index].selected == true) {
          state.shifts[index].selected = false;
          state.shift1State = false;
        }else {
          state.shift2State = true;
          state.shifts[index].selected = true;
          var shiftY = state.shifts[index].shift;
          state.shift2 = state.shifts[index].shift;
          var indexY = index;
          state.index2 = index;
          if(state.index1 < state.index2) {
            for (let i = state.index1; i <= state.index2; i++) {
              if(state.shifts[i].reserved == true) {
                state.shift2State = false;
                state.shifts[index].selected = false;
                alert('tagueule');
                break;
              }else {
                state.shifts[i].selected = true;
              }
            }
          }else {
            state.index2 = state.index1;
            state.index1 = indexY; 
            state.shift2 = state.shift1;
            state.shift1 = shiftY;
            for (let i = state.index1; i <= state.index2; i++ ) {
              if(state.shifts[i].reserved == true) {
                state.shift2State = false;
                state.shifts[index].selected = false;
                alert('tagueule');
                break;
              }else {
                state.shifts[i].selected = true;
              }
            }
          }
        }
      }
      if(state.selectedRoom != "" && state.shift1State == true && state.shift2State == true) {
        setTimeout(() => {   
          state.makeReservState = true;
        }, 500);
      }
    },
    confirmReserv(state) {
      for (let i = state.index1; i <= state.index2; i++) {
        state.shifts[i].hide = true;
      }
      state.rooms.forEach(el => {
        if(el.name == state.selectedRoom) {
          el.shifts.splice(state.index1, 0, {shift: `de ${state.shift1} à ${state.shift2}`, selected: false, hide: false, reserved: true})
        }
      })
    },
    confirmReservCancel(state) {
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
    selectShifts(context, index) {
      context.commit('selectShifts', index);
    },
    selectRoom(context, index) {
      context.commit('selectRoom', index);
      context.commit('scroll');
    },
    confirmReservCancel(context) {
      context.commit('confirmReservCancel');
    },
    confirmReserv(context) {
      context.commit('confirmReserv');
      context.commit('confirmReservCancel');
    }
  }
})
