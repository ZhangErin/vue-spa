import router from './router'

import _import from '@/router/_import_development.js'//获取组件的方法
import Layout from '@/views/Layout' 

import { getRoutersList } from '@/api/api.js'


var dynRouter //用来获取后台拿到的路由
if (getRouter('router') && !localStorage.getItem('openWindow')) {
  dynRouter = '';
  saveRouter('router', '');
}
router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);

      if (!dynRouter) {
        if (!getRouter('router')) {
            
          getRoutersList().then(res => {
        
            dynRouter = res.data.router;//后台拿到路由

            dynRouter && saveRouter('router', dynRouter);

            localStorage.setItem('openWindow', '');

            routerGo(to, next);
          })


        } else {
          dynRouter = getRouter('router');
          routerGo(to, next);
        }
      } else {
        next()
      }
  


})


function routerGo(to, next) {

  dynRouter = filterAsyncRouter(dynRouter) //过滤路由

  router.addRoutes(dynRouter) //动态添加路由

  global.antRouter = dynRouter 
  next({ ...to, replace: true })
}

export function saveRouter(name, data) { 
  localStorage.setItem(name, JSON.stringify(data))
}


export function getRouter(name) { 
  if (window.localStorage.getItem(name) && window.localStorage.getItem(name) !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(name) || {});
  } else {
    return undefined;
  }

}

function filterAsyncRouter(asyncRouterMap) { 

  const accessedRouters = asyncRouterMap.filter(route => {
    
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
