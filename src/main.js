
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'

import './utils/global.js'
import './promission.js'

Vue.config.productionTip = false


import store from './store'




Vue.use(ElementUI)


router.beforeEach((to, from, next) => {

  
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));

  if (!user && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
      next()
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
