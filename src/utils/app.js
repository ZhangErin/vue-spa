import _import from '@/router/_import_production.js'
import router from '../router'
import Layout from '@/views/Layout'

export const app = {
    open: (option) => {
        let { status, page,path, title, type, vm, params, confirmCallback, cancelCallback } = option;
        let routerTemp = global.antRouter;
        let globalPageMap = global.pageMap; 
        let rt, routerUrl;
        let openedTabs;
        if (!status) return;
   
        switch (type) {
            case 'SUB':
                       
                vm.$store.commit("set_D_visible", true);
                vm.$store.commit("setModalCallback", { cancel: cancelCallback, confirm: confirmCallback})
                if (!globalPageMap['/' + path]) {
                     rt = {
                        path: '/',
                         component: Layout,
                        hidden:true,
                        meta: {
                            title: title
                        },
                        children: [
                            {
                                path: path,
                                component: _import(page),

                                meta: {
                                    title: title,
                                    type: 'SUB'
                                },
                            }
                        ]
                    };
               
                    routerTemp = routerTemp.concat([rt]);

                } else {
                   routerTemp.forEach((item) => {
                        if (item.children && item.children.length && item.children[0].path === '/' + path) {
                            item.children[0].meta.type = 'SUB';
                             item.children[0].meta.type = title
                        }
                    });
                }    
           
                router.addRoutes(routerTemp);
                global.antRouter = routerTemp;
         
                globalPageMap['/' + path] = true;

                router.push({ path: '/' + path, query: params });

                break;
            case 'WINDOW':
             
             
                localStorage.setItem('openWindow', page);
                
         
                routerUrl = window.location.origin + '/#/' + page + (params && '?params=' + JSON.stringify(params));
              
                window.open(encodeURI(routerUrl))
              

                break;

            case 'SELF':
                if (!globalPageMap['/' + path]) {
                    routerTemp = routerTemp.concat([{
                        path: '/',
                        component: Layout,
                         hidden: true,
                        meta: {
                            title: title
                        },
                        children: [
                            {
                                path: '/' + path,
                                component: _import(page),
                                meta: {
                                    title: title,
                                    type: 'SELF'
                                },
                            }
                        ]
                    }]);

                    router.addRoutes(routerTemp);
                    global.antRouter = routerTemp;

                    globalPageMap['/' + path] = true;
                } else {
                    routerTemp = routerTemp.map((item) => {
                        if (item.children && item.children.length && item.children[0].path === '/' + path) {
                            item.children[0].meta.type = 'SELF';
                            item.children[0].meta.type = title
                        }
                    });
                }

                router.push({
                    path: '/' + path,
                    query: params
                });
                  

                break;
            default:
            
                openedTabs = vm.$store.state.openedTabs;
             
                if (openedTabs.filter(item => item.route === '/' + path).length) {
                       router.push({
                           path: '/' + path,
                           query: params
                       });
                     vm.$store.commit("set_active_index", '/'+path);
                } else {
                      if (!globalPageMap['/' + path]) {
                          routerTemp = routerTemp.concat([{
                              path: '/',
                              component: Layout,
                              hidden: true,
                              meta: {
                                  title: title
                              },
                              children: [{
                                  path: path,
                                  component: _import(page),
                                  meta: {
                                      title: title,
                                      type: 'BLANK'
                                  },
                              }]
                          }]);

                          router.addRoutes(routerTemp);
                          global.antRouter = routerTemp;

                          globalPageMap['/' + path] = true;
                      } else {

                          routerTemp = routerTemp.map((item) => {
                              if (item.children && item.children.length && item.children[0].path === path) {
                                  item.children[0].meta.type = 'BLANK';
                                  item.children[0].meta.type = title
                              }
                          });
                      }

                      router.push({
                          path: '/' + path,
                          query: params
                      });
                }
              
              
        }

    },
    close: (option) => {
        let { vm ,path} = option,
            openedTabs,
            globalPageMap = global.pageMap;
        
        globalPageMap[(path && '/' + path) || vm.$router.currentRoute.path] = false;
        vm.$store.commit("delete_tabs", (path && '/' + path) || vm.$router.currentRoute.path);
        openedTabs = vm.$store.state.openedTabs;
        vm.$store.commit("set_D_visible", false);
        if (openedTabs && openedTabs.length >= 1) {

            vm.$store.commit("set_active_index", openedTabs[openedTabs.length - 1].route);
            
            router.push({
                path: vm.$store.state.activeIndex
            });

        }
            

    },
    getUID: () => {
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    },
    getParams: () => {
         let reg = new RegExp("(^|&)params=([^&]*)(&|$)");
         let query = window.location.hash.split("?")[1] && window.location.hash.split("?")[1].match(reg);
 
        query && (query = JSON.parse(unescape(decodeURI(query[2]))));

        return query||{};
    },
    rightClickMenu: (e) => {
        
    }
}