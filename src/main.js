// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import index from './pages/create/create'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

import vuexI18n from 'vuex-i18n'

/**
* you can add your module here
*/
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

store.registerModule('basic', {
  state: {
    city: '',
    weather: '',
    title: '集合云',
    showBack: false,
    showMore: true,
    user: ''
  },
  mutations: {
    city (state, cityInfo) {
      state.city = cityInfo
    },
    weather (state, weather) {
      state.weather = weather
    },
    user (state, user) {
      state.user = user
      window.localStorage.setItem('user', window.JSON.stringify(user))
    },
    title (state, title) {
      state.title = title
    }
  }
})

Vue.use(vuexI18n.plugin, store)

const routes = [
  { path: '/', component: index }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
