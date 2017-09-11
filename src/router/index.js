// import Vue from 'vue'
// import Router from 'vue-router'
import Index from './../components/index'
import Result from './../components/result'

// Vue.use(Router)

const myRouter = (vue) => {
  var IndexVue = vue.extend(Index)
  var ResultVue = vue.extend(Result)
  return {
    routes: [
      {
        path: '/index',
        // name: 'index',
        component: IndexVue
      },
      {
        path: '/result',
        // name: 'result',
        component: ResultVue
      },
      {
        path: '*',
        component: IndexVue
      }
    ]
  }
}
export default myRouter
