<template>
  <div id="reserv">
    <div class="row">
      <div class="col-sm-12">
        <!-- DATE DISPLAY -->
        <div class="reservHeader text-center p-3">
          <h5>{{daySelect.w_day}}&nbsp;{{daySelect.m_day}}&nbsp;{{monthString}}&nbsp;{{year}}</h5>
        </div>
        <!-- STOP -->
        <!-- RESERVATIONS -->
        <div class="reservs" id="test">
          <div class="row" v-for="(el, index) in shifts" :key="index">
            <div class="col-sm-2 p-3 shifts">
              {{el.shift}}
            </div>
            <div class="col-sm-10 p-3 reserv" :class="{shiftSelected: el.selected}" @click="makeReserv(index)">

            </div>
          </div>
        </div>
        <!-- STOP -->
        <!-- CHOOSING ROOM -->
        <div class="makeReserv" v-if="makeReservState">
          <div class="makeReservHeader text-center p-3">
            <h5>test</h5>
          </div>
          <div class="makeReservBody">
            <button class="btn bg-transparent" v-for="(room, index) in rooms" :key="index">{{room.name}}</button>
          </div>
          <button class="btn bg-transparent" @click="makeReservCancel"><i class="fas fa-times"></i></button>
        </div>
        <!-- STOP -->
      </div>
    </div>
    <!-- CANCEL BUTTON -->
    <div class="cancel">
      <button class="btn bg-transparent" @click="reservCancel"><i class="fas fa-times"></i></button>
    </div>
    <!-- STOP -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'rooms',
      'year',
      'monthString',
      'daySelect',
      'weeks',
      'shifts',
      'makeReservState'
    ])
  },
  methods: {
    ...mapActions([
      'reservCancel',
      'scroll',
      'makeReserv',
      'makeReservCancel'
    ])
  },
  mounted() {
    this.scroll();
  }
}
</script>

<style lang="scss" scoped>

#reserv {
  position: relative;
  width: 60vw;
  height: 70vh;
  box-shadow: 0 0 0 100vh rgba(0,0,0,0.5);
  background-color: #fff;
  .reservHeader {
    position: relative;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
    height: 8vh;
    h5 {
      line-height: 4vh;
    }
  }
  .shiftPadding {
    margin-bottom: 20px;
  }
  .makeReservs {
    position: relative;
    .checkBox {
      width: 80px;
      position: relative;
      .tgl-flip {
        + .tgl-btn {
          transition: all .2s ease;
          font-family: sans-serif;
          // perspective: 500px;
          &:after,
          &:before {
            display: inline-block;
            transition: all .4s ease;
            width: 100%;
            text-align: center;
            line-height: 37px;
            font-weight: bold;
            color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            backface-visibility: hidden;
            border-radius: 4px;
          }
          &:after {
            content: attr(data-tg-on);
            background: #000;
            transform: rotateY(-180deg);
          }
          &:before {
            background: #bbb;
            content: attr(data-tg-off);
          }
          &:active:before {
            transform: rotateY(-20deg);
          }
        }
        &:checked + .tgl-btn {
          &:before {
            transform: rotateY(180deg);
          }
          &:after {
            transform: rotateY(0);
            left: 0;
            background: #eee;
            color: #bbb;
          }
          &:active:after {
            transform: rotateY(20deg);
          }
        }
      }
    }
    .shift {
      z-index: -1;
    }
    .dropDownActive {
      border-radius: 4px;
      background: #bbb;
    }
    .dropDownRooms {
      width: 140px;
      position: absolute;
      top: 16px;
      left: 40%;
    }
    .dropDownShift1 {
      position: absolute;
      top: 70px;
      left: 15px;
    }
    .dropDownShift2 {
      position: absolute;
      top: 70px;
      left: 150px;
    }
    .dropDown {
      .dropDownHeader {
        border-radius: 4px;
        background: #bbb;
      }
      .dropDownBody {
        border-radius: 4px;
        background: #bbb;
      }
      .dropDownBodyShifts {
        height: 300px;
        overflow-x: auto;
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
      ul {
        padding: 0;
        margin: 0;
        .dropdownTitle {
          cursor: pointer;
          color: #fff;
        }
        .dropdownItems {
          color: #fff;
        }
        .dropdownItems:hover {
          cursor: pointer;
          color: #bbb;
          background: #fff;
        }
        li {
          font-weight: bold;
          list-style: none;
          padding: 7px;
        }
      }
    }
    .add {
      .btn {
        color: #fff;
        font-weight: bold;
        background: #bbb;
      }
    }
  }
  .seeReservs {
    border-top: 1px solid #bbb;
    padding: 20px 20px;
    height: 46vh;
    overflow: auto;
    .reservations {
      background-color: #bbb;
      padding: 15px;
      border-radius: 4px;
      color: #fff;
      font-weight: bolder;
      text-align: center;
      font-size: 18px;  
      margin: 15px auto;
      p {
        margin: 0;
      }
    }
  }
  .cancel {
    position: absolute;
    right: 15px;
    top: 15px;
    i {
      color: #777;
      font-size: 18px;
    }
  }
  .alert {
    text-align: center;
    background: #cc010b;
    position: absolute;
    top: 30%;
    left: 25%;
    h5,p {
      color: #fff;
      font-weight: bold;
    }
    .btn {
      position: absolute;
      right: 1px;
      top: 1px;
    }
    i {
      color: #fff;
      font-size: 18px;
    }
  }

  .reservs {
    overflow-y: auto;
    height: 62vh;
    .row {
      margin: auto;
      border-bottom: 1px solid #bbb;
      .shifts {
        border-right: 1px solid #bbb;
        text-align: center;
      }
      .shiftSelected {
        background: #eee;
      }
      .reserv:hover {
        cursor: pointer;
      }
    }
  }
  .makeReserv {
    position: absolute;
    top: 50%;
    left: 35%;
    background: #fff;
    box-shadow: 0 0 0 100vh rgba(0,0,0,0.5);
    width: 300px;
    .btn {
      position: absolute;
      right: 15px;
      top: 10px;
      i {
        color: #777;
        font-size: 18px;
      }
    }
  }
}

</style>
