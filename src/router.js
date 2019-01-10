import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Deadpool from './views/deadpool.vue'
import Gto from './views/gto.vue'
import Joker from './views/joker.vue'
import Starwars from './views/starwars.vue'
import Meeting1 from './views/meeting_1.vue'
import Meeting2 from './views/meeting_2.vue'
import Brainstorm from './views/brainstorm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      // component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/room/deadpool',
      name: 'deadpool',
      component: Deadpool
    },
    {
      path: '/room/gto',
      name: 'gto',
      component: Gto
    },
    {
      path: '/room/joker',
      name: 'joker',
      component: Joker
    },
    {
      path: '/room/starwars',
      name: 'starwars',
      component: Starwars
    },
    {
      path: '/room/meeting_1',
      name: 'meeting_1',
      component: Meeting1
    },
    {
      path: '/room/meeting_2',
      name: 'meeting_2',
      component: Meeting2
    },
    {
      path: '/room/brainstorm',
      name: 'brainstorm',
      component: Brainstorm
    }
  ]
})
