import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vuetify from 'vuetify'
// import DaySpanVuetify from 'dayspan-vuetify'

// import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'

// Vue.use(Vuetify)
// Vue.use(DaySpanVuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// import VueScheduler from 'v-calendar-scheduler'
// import 'v-calendar-scheduler/lib/main.css'
// Vue.use(VueScheduler)