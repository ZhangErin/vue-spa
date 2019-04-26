
import _import from '@/router/_import_production.js'
import _require from '@/router/_require_pro.js'
import router from '../router'
import Layout from '@/views/Layout'


export default {
    data() {
        return {
        }
    },
    methods: {
        open(option){
                 let { status,page,path,title, type,params,confirmCallback,cancelCallback,other } = option;
                 let routerTemp = global.antRouter;
                 let globalPageMap = global.pageMap;
                 let  routerUrl;
                 let openedTabs;
                 if (!status) return;
            
            let haseAdded = path && !routerTemp.filter(item => item.children && item.children.length && item.children[0].path === path.replace('/', '')).length;
            
                 switch (type) {
                     case 'SUB':
                      
                         this.$store.commit("set_D_visible", true);
                         this.$store.commit("setModalCallback", {
                             cancel: cancelCallback,
                             confirm: confirmCallback
                         })

                         this.$store.commit("set_subPageHref", page);
                         this.$store.commit("set_subPageParams", params);
                         this.$store.commit("set_subPageTitle", title);
                 
                        
                         break;
                     case 'WINDOW':
                        

                         localStorage.setItem('openWindow', page);


                         routerUrl = window.location.origin + '/#/' + page + (params && '?params=' + JSON.stringify(params));
                       
                         window.open(encodeURI(routerUrl))


                         break;

                     case 'SELF':
                         if (haseAdded) {
                             routerTemp = routerTemp.concat([{
                                 path: '',
                                 component: Layout,
                                 hidden: true,
                                 meta: {
                                     title: title
                                 },
                                 children: [{
                                     path: path,
                                     component: other ? _require(page) : _import(page),
                                     //component:_import(page),
                                     meta: {
                                         title: title,
                                         type: 'SELF'
                                     },
                                 }]
                             }]);

                             router.addRoutes(routerTemp);
                             global.antRouter = routerTemp;

                             globalPageMap[path] = true;
                         } else {
                             routerTemp = routerTemp.map((item) => {
                                 if (item.children && item.children.length && item.children[0].path === path.replace('/', '')) {
                                     item.children[0].meta.type = 'SELF';
                                     item.children[0].meta.title = title
                                 }
                             });
                         }

                         router.push({
                             path: path,
                             query: params
                         });


                         break;
                     default:
               
                         openedTabs = this.$store.state.openedTabs;

                         if (openedTabs.filter(item => item.route === path).length) {
                             router.push({
                                 path: path,
                                 query: params
                             });
                             this.$store.commit("set_active_index", path);
                         } else {
                           
                             if (!page && path!=='') {
                                routerTemp = routerTemp.filter(item => (item.children && item.children.length && item.children[0].path !== path.replace('/', '')) || (!item.children) || !item.children.length)
                             }
                      

                             if (!routerTemp.filter(item => item.children && item.children.length && item.children[0].path === path.replace('/','')).length) {
                                 routerTemp = routerTemp.concat([{
                                     path: '',
                                     component: Layout,
                                     hidden: true,
                                     meta: {
                                         title: title
                                     },
                                     children: [{
                                         path: path,
                                         component: other ? _require(page) : _import(page),
                                         meta: {
                                             title: title,
                                             type: 'BLANK'
                                         },
                                     }]
                                 }]);


                                 router.addRoutes(routerTemp);
                                 global.antRouter = routerTemp;


                             } else {
                                
                                 routerTemp = routerTemp.map((item) => {
                                     if (item.children && item.children.length && item.children[0].path === path.replace('/', '')) {

                                         item.children[0].meta.type = 'BLANK';
                                         item.children[0].meta.title = title;
                                            // if (subName) {
                                            //    item.children[0].children
                                            // }
                                     }
                                 });
                             }

                             router.push({
                                 path: path,
                                 query: params
                             });
                         }


                 }

         },
        close(option){
            let {
                path
            } = option || {
                path: ''
            },
            openedTabs;


            if (this.$store.state.dialogVisible) {

                this.$store.commit("set_D_visible", false);
                
            } else {
                    !path ? (path = this.$router.currentRoute.path) : (path = path);


                    global.antRouter = global.antRouter.filter(item => (item.children && item.children.length && (item.children[0].path) !== path) || (item.children && !item.children.length) || (!item.children));


                    this.$store.commit("delete_tabs", path);
                    openedTabs = this.$store.state.openedTabs;             

                    if (openedTabs && openedTabs.length >= 1) {

                        this.$store.commit("set_active_index", openedTabs[openedTabs.length - 1].route);

                        router.push({
                            path: this.$store.state.activeIndex
                        });

                    }
            }
            


        },
        getUID(){
            return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
        },
        getParams(){
            let reg = new RegExp("(^|&)params=([^&]*)(&|$)");
            let query = window.location.hash.split("?")[1] && window.location.hash.split("?")[1].match(reg);

            query && (query = JSON.parse(unescape(decodeURI(query[2]))));

            return query || {};
        }
    }
}