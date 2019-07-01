import VueSocketIO from 'vue-socket.io'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import axios from 'axios'
import SocketIO from 'socket.io-client'

import App from './App'
import router from './router'
import store from './store'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  connection: SocketIO('http://localhost:4000')
}))
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
