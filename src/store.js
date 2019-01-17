import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [
      {name:'Deadpool', reservs: [], active: false},
      {name:'GTO', reservs: [], active: false},
      {name:'Joker', reservs: [], active: false},
      {name:'Star Wars', reservs: [], active: false},
      {name:'Meeting #1', reservs: [], active: false},
      {name:'Meeting #2', reservs: [], active: false},
      {name:'Brain Storming', reservs: [], active: false}
    ],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    month_days: [],
    weeks: [],
    months_fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekDays_fr: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    reservationState: false,
    daySelect: {},
    shiftsDefault: [],
    shifts: [],
    makeReservState: false,
    shift1State: false,
    shift2State: false,
    shift1: "",
    shift2: "",
    index1: 0,
    index2: 0,
    selectedRoom: "",
    selectRoomState: false,
    alert1State: false
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
    },
    alert1State(state) {
      return state.alert1State;
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
        state.daySelect = week[indexDay];
        state.daySelect.w_day = state.weekDays_fr[indexDay];
        state.reservationState = true;
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
    scroll(state) {
      var myScroll = document.getElementsByClassName('reservs');
      setTimeout(() => {
        if(state.selectRoomState == true) {
          myScroll[0].scrollTop = 515;
        }
      }, 1);
    },
    shifts(state) {
      var hours = 0;
      while(hours < 24) {
        if(hours < 10) {
          state.shifts.push({shift: `0${hours}:00`, selected: false, hide: false});
          state.shiftsDefault.push({shift: `0${hours}:00`, selected: false, hide: false});
        }else {
          state.shifts.push({shift: `${hours}:00`, selected: false, hide: false});
          state.shiftsDefault.push({shift: `${hours}:00`, selected: false, hide: false});
        }
        hours++;
      }
    },
    selectRoom(state, index) {
      if(state.alert1State == true) {
        
      }else if(state.rooms[index].active == false) {
        state.selectRoomState = true;
        state.rooms[index].active = true;
        state.selectedRoom = state.rooms[index].name;
        state.rooms.forEach(el => {
          if(el.name == state.selectedRoom) {
            if(el.reservs.length == false) {
              state.shifts = state.shiftsDefault;
            }else {
              el.reservs.forEach(el => {
                if(el.day == state.daySelect.m_day && el.month == state.month && el.year == state.year) {
                  state.shifts = el.shifts;
                }else {
                  state.shifts = state.shiftsDefault;
                }
              })
            }
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
      if(state.alert1State == true) {

      }else if(state.shift1State == false) {
        if(state.shifts[index].reserved == true){
          state.alert1State = true;
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
                state.shifts.forEach(el => {
                  el.selected = false;
                })
                state.shift1State = false;
                state.shift2State = false;
                state.alert1State = true;
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
                state.shifts.forEach(el => {
                  el.selected = false;
                })
                state.shift1State = false;
                state.shift2State = false;
                state.alert1State = true;
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
      state.rooms.forEach(el => {
        if(el.name == state.selectedRoom && el.reservs.length == false) {
          el.reservs.push({shifts: [], day: state.daySelect.m_day, month: state.month, year: state.year});
          el.reservs.forEach(el => {
            if(el.day == state.daySelect.m_day && el.month == state.month && el.year == state.year) {
              var hours = 0;
              while(hours < 24) {
                if(hours < 10) {
                  el.shifts.push({shift: `0${hours}:00`, selected: false, hide: false});
                }else {
                  el.shifts.push({shift: `${hours}:00`, selected: false, hide: false});
                }
                hours++;
              }
              for (let i = state.index1; i <= state.index2; i++) {
                el.shifts[i].hide = true;
              }
              el.shifts.splice(state.index1, 0, {shift: `de ${state.shift1} à ${state.shift2}`, selected: false, hide: false, reserved: true});
              state.shifts = el.shifts;
            }
          })
        }else if(el.name == state.selectedRoom) {
          el.reservs.forEach(el => {
            if(el.day == state.daySelect.m_day && el.month == state.month && el.year == state.year) {
              for (let i = state.index1; i <= state.index2; i++) {
                el.shifts[i].hide = true;
              }
              el.shifts.splice(state.index1, 0, {shift: `de ${state.shift1} à ${state.shift2}`, selected: false, hide: false, reserved: true});
              state.shifts = el.shifts;
            }
          })
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
    },
    cancelAlert(state) {
      state.alert1State = false;
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
    },
    cancelAlert(context) {
      context.commit('cancelAlert');
    }
  }
})
