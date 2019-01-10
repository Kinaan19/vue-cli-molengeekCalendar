<template>
  <div id="rooms">
    <nav class="d-flex justify-content-between">
      <div class="img text-center">
        <transition>
          <router-link to="/"><img src="../../public/img/logo-molengeek.jpg" alt="logo_molengeek"></router-link>
        </transition>
      </div>
      <ul class="px-5 m-0 d-flex justify-content-between">
        <li v-for="(room, index) in rooms" :key="index">
          <transition>
            <router-link :to="{path: '/room/'+room.route}"><button class="btn" :class="{'activeRoom':room.active}" @click="activeRoom(room)">{{room.name}}</button></router-link>
          </transition>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'rooms'
    ])
  },
  methods: {
    activeRoom(clickedRoom){
      this.rooms.forEach(room => {
        room.active = false
      });
      clickedRoom.active = true;
    }
  }
}

</script>

<style lang="scss" scoped>

@media screen and (min-width: 769px) {
  li  button {
    font-size: 18px;
  }
}
#rooms {
  background-color: #fff;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}
li {
  list-style: none;
  padding: 30px 0;
}
.img {
  width: 150px;
  img {
    width: 50%;
  }
}
.btn {
  color: #777;
  transition: 0.5s;
  background-color: transparent;
}
.activeRoom {
  /* -webkit-box-shadow: -11px 11px 92px 0px rgba(0,0,0,0.43);
  -moz-box-shadow: -11px 11px 92px 0px rgba(0,0,0,0.43); */
  box-shadow: -10px 10px 5px 0px #ccc;
  border: 1px solid #ccc;
}

</style>
