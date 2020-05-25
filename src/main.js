import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'


Vue.config.productionTip = false

import store from './store'
import router  from './route'
import './utils/axios'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

// import with ES6
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// use
Vue.use(mavonEditor)


new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
