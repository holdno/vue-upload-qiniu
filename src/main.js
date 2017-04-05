// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import VueResource from 'vue-resource'
import qiniu from './pages/qiniu/uploadToQiniu'
import selfserver from './pages/self/uploadToSelf'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  { path: '/', component: qiniu },
  { path: '/self', component: selfserver}
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
