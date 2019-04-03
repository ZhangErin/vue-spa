import router from './router'
import _import from '@/router/_import_production.js'
//import _import from '@/router/_import_development.js'

import Layout from '@/views/Layout'
import Login from "@/views/Login"
import noFound from "@/views/404"

import { getRoutersList } from '@/api/api.js'

var mainRouter = [{
  path: "/",
  component: Layout,
  hidden: true,
  meta: {
    title: "首页",
    icon: "el-icon-goods"
  },
  children: []

}, {
  path: "/login",
  component: Login,
  hidden: true
},
{
  path: '*',
  redirect: '/404',
  component: noFound,
  hidden: true
}
];
if (getRouter('router') && global.hasLogin) {
  saveRouter('router','')
}
 
var dynRouter; //用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
   
  let wpath = window.location.hash.split('?')[0].replace('#/', '');

  
   if (localStorage.getItem('openWindow') && localStorage.getItem('openWindow') === wpath) {

      router.options.routes.push({
        path: '/'+wpath,
        component: _import(wpath),
        hidden: true
      });
     router.addRoutes(router.options.routes);
    }
   if (!dynRouter) {
     router.options.routes.push(...mainRouter);
     router.addRoutes(router.options.routes);
 
     global.antRouter = router.options.routes;

     saveRouter('router', global.antRouter);
     if (sessionStorage.getItem('user')) {
       getRoutersList().then(res => {

         addDynRoute(res.data.router); //后台拿到路由

         next({
           ...to,
           replace: true
         })
       })
     } else {
       dynRouter = global.antRouter;
       next({
         ...to,
         replace: true
       })
        
     }
   } else {
     next()
   }

})

export function addDynRoute(data) {
  dynRouter = data;
  
  let menuRoute = filterAsyncRouter(dynRouter),
     menuData = [];
  menuRoute.forEach((e) => {
    if (e.children && e.children.length) {
           menuData.push({
             path: '/' + e.path,
             component: Layout,
             isLeaf: true,
             isRedirect:true,
             meta: {
               title: e.meta && e.meta.title,
               icon: e.meta && e.meta.icon
             },
             children: [...e.children]
           })
          
       } else {
          menuData.push({
            path: '/' + e.path,
            component: Layout,
            isLeaf: true,
            meta: {
              title: e.meta && e.meta.title,
              icon: e.meta && e.meta.icon
            },
            children: [e]
          })
        }
    
      })
             
      router.options.routes.push(...menuData);
           router.addRoutes(router.options.routes);
          
            global.antRouter = router.options.routes;
            
   saveRouter('router', global.antRouter);
   saveRouter('menuRouter', menuData);
   
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
      // if (route.component === 'Layout') {
       
      //    route.component = Layout;
        
      // } else {

      route.component = _import(route.component);
  

      // } 
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
