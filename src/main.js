// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/store'
import App from './App'
import VueRouter from 'vue-router'
import myRouter from './router/index'
// import FastClick from 'fastclick'
// console.log(FastClick)
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function () {
//     FastClick.attach(document.body)
//   }, false)
// }
import './less/common.css'
import './less/index.css'
import './less/result.css'
import './js/remDefine'

Vue.config.productionTip = false
Vue.config.debug = true
Vue.use(VueRouter)
const newRouter = new VueRouter(myRouter(Vue))
const index = Vue.extend(App)
newRouter.beforeEach((to, from, next) => {
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: newRouter,
  render: h => h(index)
})
