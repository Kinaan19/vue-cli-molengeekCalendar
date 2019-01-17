<template>
  <div id="reserv">
    <div class="row">
      <div class="col-sm-12">
        <div class="reservHeader text-center p-3">
          <h5>{{daySelect.w_day}}&nbsp;{{daySelect.m_day}}&nbsp;{{monthString}}&nbsp;{{year}}</h5>
          <!-- FILTERS -->
          <div class="filters text-center py-2">
            <button class="btn bg-transparent mx-2" v-for="(room, index) in rooms" :key="index" :class="{roomSelected: room.active}" @click="selectRoom(index)">{{room.name}}</button>
          </div>
          <!-- STOP -->
        </div>
        <!-- NO ROOM CHOSEN -->
        <div class="choose text-center" v-if="!selectRoomState">
          <h4>Choisis une des salles qui s'offrent à toi, ou passe ton chemin !</h4>
        </div>
        <!-- STOP -->
        <!-- RESERVATIONS -->
        <div class="reservs" v-if="selectRoomState">
          <div class="row" v-for="(el, index) in shifts" :key="index" :hidden="el.hide">
            <div class="col-sm-2 p-3 shifts">
              {{el.shift}}
            </div>
            <div class="col-sm-10 p-3 reserv" :class="{shiftSelected: el.selected}" @click="selectShifts(index)">

            </div>
          </div>
        </div>
        <!-- STOP -->
        <!-- CONFIRM RESERVATION -->
        <div class="makeReserv" v-if="makeReservState">
          <div class="makeReservHeader text-center p-3">
            <h5>{{selectedRoom}} de {{shift1}} à {{shift2}}</h5>
          </div>
          <div class="makeReservBody text-center py-3">
            <button class="btn bg-transparent" @click="confirmReserv">Confirmer</button>
            <button class="btn bg-transparent" @click="confirmReservCancel">Annuler</button>
          </div>
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
      'shift1',
      'shift2',
      'selectRoomState',
      'selectedRoom',
      'makeReservState'
    ])
  },
  methods: {
    ...mapActions([
      'scroll',
      'reservCancel',
      'selectShifts',
      'selectRoom',
      'confirmReserv',
      'confirmReservCancel'
    ])
  },
  mounted() {
    // this.scroll();
  }
}
</script>

<style lang="scss" scoped>

#reserv {
  position: relative;
  width: 60vw;
  height: 72vh;
  box-shadow: 0 0 0 100vh rgba(0,0,0,0.5);
  background-color: #fff;
  .reservHeader {
    position: relative;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
    height: 14vh;
    h5 {
      line-height: 4vh;
    }
    .filters {
      margin-bottom: 20px auto;
      flex-wrap: wrap;
      .roomSelected {
        box-shadow: -10px 10px 5px 0px #ccc;
        border: 1px solid #ccc;
      }
    }
  }
  .choose {
    box-shadow: inset 0px 20px 70px 5px #ccc;
    background-color: #eee;
    border: 30px solid #fff;
    height: 58vh;
    padding: 23vh 4vw;
  }
  .reservs {
    overflow-y: auto;
    height: 58vh;
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
    top: 30%;
    left: 200px;
    background: #fff;
    box-shadow: 0 0 0 100vh rgba(0,0,0,0.5);
    width: 500px;
    .makeReservHeader {
      box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
    }
    .makeReservBody {
      
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
}

</style>
