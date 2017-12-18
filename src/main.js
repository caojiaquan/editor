// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

import Axios from 'axios'
Vue.prototype.$axios = Axios

import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
Vue.use(Element)

import Vuex from 'vuex'
Vue.use(Vuex)

import store from './store/store.js'
// store.state.saveBaseUrl = 'http://10.169.8.51';
// store.state.pushBaseUrl = 'http://10.169.3.27';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  store
})
