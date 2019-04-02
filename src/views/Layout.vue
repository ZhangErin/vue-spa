	<template>
  <el-row class="aweb-container">
    <el-col :span="24" class="aweb-header">
      <el-col
        :span="10"
        class="aweb-logo"
        :class="collapsed?'logo-collapse-width':'logo-width'"
      >{{collapsed?'':sysName}}</el-col>
      <el-col :span="10">
        <div class="aweb-tools" @click.prevent="collapse">
          <i class="el-icon-menu"></i>
        </div>
      </el-col>

      <el-col :span="4" class="aweb-userinfo">
        <el-tooltip  effect="dark" content="下载案例" placement="left">
            <el-button icon="el-icon-sold-out" circle class="aweb-download-btn" @click="openMarket"></el-button>
        </el-tooltip>

        <el-dropdown trigger="hover">
          <span class="el-dropdown-link aweb-userinfo-inner">
            <img :src="sysUserAvatar">
            {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <el-col :span="24" class="aweb-body">
 <!-- 侧边导航 -->
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">

        <el-menu        
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#152028"
          text-color="#fff"
          active-text-color="#04bebd"
          hoverbgColor ="#04bebd"
          router
          :collapse="collapsed"
        >

          <template v-for="item in routerData" v-if="!item.hidden">
            
              <el-submenu  v-if="item.children && item.children.length && !item.isLeaf || (item.isLeaf && item.isRedirect)" :index="item.path" :key="item.path">
                <template slot="title">
                  <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
                  <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">

                      <el-submenu  v-if="child.children" :index="item.path+'/'+child.path" :key="item.path+'/'+child.path">
                              
                                    <template slot="title">
                                      <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
                                      <span v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
                                    </template>

                                    <template v-for="child3 in child.children" v-if="!child3.hidden">

                                            <el-submenu  v-if="child3.children" :index="item.path+'/'+child.path+'/'+child3.path+'/'+child3.children[0].path" :key="item.path+'/'+child.path+'/'+child3.path">                              
                                                    <template slot="title">
                                                      <i v-if="child3.meta && child3.meta.icon" :class="child3.meta.icon"></i>
                                                      <span v-if="child3.meta && child3.meta.title">{{child3.meta.title}}</span>
                                                    </template>

                                                    <template v-for="child4 in child3.children" v-if="!child4.hidden">                                         
                                                          <el-menu-item :index="item.path+'/'+child.path+'/'+child3.path+'/'+child4.path" :key="item.path+'/'+child.path+'/'+child3.path+'/'+child4.path">
                                                            <i v-if="child4.meta && child4.meta.icon" :class="child4.meta.icon"></i>
                                                            <span v-if="child4.meta&&child4.meta.title">{{child4.meta.title}}</span>
                                                          </el-menu-item>
                                                    </template>                             
                                              </el-submenu>


                                          <el-menu-item v-else :index="item.path+'/'+child.path+'/'+child3.path" :key="item.path+'/'+child.path+'/'+child3.path">
                                            <i v-if="child3.meta && child3.meta.icon" :class="child3.meta.icon"></i>
                                            <span v-if="child3.meta&&child3.meta.title">{{child3.meta.title}}</span>
                                          </el-menu-item>


                                    </template>
                              
                      </el-submenu>


                    <el-menu-item v-else  :index="item.path+'/'+child.path" :key="item.path+'/'+child.path">
                      <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
                      <span v-if="child.meta && child.meta.title" :data-role="item.path+'/'+child.path">{{child.meta.title}}</span>
                    </el-menu-item>
            
                </template>
              </el-submenu>

             
                <el-menu-item  v-else-if="item.isLeaf && !item.children[0].children"  :index="item.path+'/'+item.children[0].path" :key="item.path+'/'+item.children[0].path" >  
                  <i v-if="item.children[0].meta && item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>          
                    <span v-if="item.children[0].meta && item.children[0].meta.title">{{item.children[0].meta.title}}</span>
                  </el-menu-item>

                 <el-menu-item  v-else  :index="item.path" :key="item.path" >  
                  <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>          
                    <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
                  </el-menu-item>


            </template>        
        </el-menu>
      </aside>
 <!-- 侧边导航-->
      <section class="aweb-ctt">
        <div class="grid-content bg-purple-light">
          <div>
             <!-- tab 右键菜单 -->
             <!-- <div v-show="menuVisible" class="aweb-right-menu" ref="rightClickMenu">
                <el-menu
                   class="el-menu-vertical"
                   @select="handleRightSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#04bebd"
                     >
                  
                  <template v-for="(mItem,idx) in rightMenuData">
                    <el-menu-item :index="mItem.key" class="menuItem" :key="idx">
                    <span slot="title">{{mItem.name}}</span>
                     </el-menu-item>
                  </template>
                   
                </el-menu>
            </div> -->

          
         <!-- tab 右键菜单end -->
            <el-tabs
              v-model="activeIndex"
              type="border-card"
              closable
              v-if="openedTabs.length"
              @tab-click="tabClick"
              @tab-remove="tabRemove"
              @contextmenu.native.stop.prevent="tabRightClick"
            >
   
              <el-tab-pane
                :key="item.name"
                v-for="item in openedTabs"
                :label="item.name"
                :name="item.route"
              >
              <el-col :span="24" class="aweb-ctt-wrap">
                <!-- <el-col :span="24" class="breadcrumb-container">
                  <el-breadcrumb separator="/" class="breadcrumb-inner">
                    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col> -->
                <transition name="fade" mode="out-in" v-if="activeIndex===item.route" > 
                 
                      <router-view v-if="isRouterAlive" ></router-view>
                  
                </transition>
              </el-col>
         
			        </el-tab-pane>
            </el-tabs>

          </div>
              <!-- 子页面容器 -->
              <el-dialog :visible.sync='dialogVisible' @close="closeDialog">
                <transition name="fade" mode="out-in">
                  <router-view></router-view>
                </transition>           
                <div slot='footer' class='dialog-footer'>
                <el-button @click="cancel">取消</el-button>
                <el-button type='primary' @click="confirm">确定</el-button >
                </div> 
            </el-dialog>
             <!-- 子页面容器 -->
        </div>
      </section>
    </el-col>
      <right-menu :menuData="rightMenuData"  :eventHandler=rightClickHandler  v-on:handleSelect= "handleRightSelect"></right-menu> 
  </el-row>
</template>
<script>

import {getObjArr, getRouter,saveRouter} from '../promission.js'
import { app } from '@/utils/app.js'
import rightMenu from '@/components/rightMenu'


export default {
  name:'layout',
  data() {
    return {
      routerData:global.antRouter?global.antRouter:getRouter(),
      sysLogo:"img/logo.png",
      sysName: "AWEB_ADMIN",
      collapsed: false,
      sysUserName: "admin",
      sysUserAvatar: "https://s.gravatar.com/avatar/f30a9191dda93b5389965ed99f57f850?s=50&d=retro",  
      rightClickHandler:null,
      isRouterAlive: true
    };
  },
  methods: {
    tabRightClick:function(e){
       if(e.target.classList[0] ==='el-tabs__item'){

            this.rightClickHandler = e;  
       }
    },
     reload() {
          this.isRouterAlive = false;
          this.$nextTick(function () {
              this.isRouterAlive = true
          })
        },
    handleRightSelect:function(key){

       switch(key){
         case'refresh':
      
         this.reload();
            
          break;
         case'close':

            this.$store.commit("delete_tabs", this.activeIndex);
            if (this.openedTabs && this.openedTabs.length >= 1) {

              this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);

              this.$router.push({ path: this.activeIndex,query:this.URLQueryMap[this.activeIndex] ||{}});

            }
           break;

         case'closeAll':
           this.$store.commit("delete_allTabs");
           break;

       }

    },
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
           saveRouter('router','');
           saveRouter('menuRouter','');
        })
        .catch(() => {});
    },
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    tabClick(tab) {

      this.$router.push({ path: this.activeIndex,query:this.URLQueryMap[this.activeIndex] ||{}});

    },
    tabRemove(targetName) {
         
      this.$store.commit("delete_tabs", targetName);
      if (this.activeIndex === targetName) {
        if (this.openedTabs && this.openedTabs.length >= 1) {

          this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);

          this.$router.push({ path: this.activeIndex ,query:this.URLQueryMap[this.activeIndex] ||{}});

        }
      }
    },
    cancel(){
           this.$store.commit("set_D_visible",false);
           this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);
           this.$router.push({ path: this.activeIndex,query:this.URLQueryMap[this.activeIndex] ||{} });
           this.$store.commit("do_cancel");
    },
    confirm(){
         this.$store.commit("set_D_visible",false);
          this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);
          this.$router.push({ path: this.activeIndex,query:this.URLQueryMap[this.activeIndex] ||{} });
          this.$store.commit("do_confirm");
    },
    closeDialog(){

       this.$store.commit("set_D_visible",false);
    
       this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);
       this.$router.push({ path: this.activeIndex ,query:this.URLQueryMap[this.activeIndex] ||{}});
  
    },
    openMarket(){
      window.open('https://www.awebide.com:7002/package/@aweb-template/vue-spa');
    }
  },
  mounted() {

    let user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
 
     this.$store.commit("add_tabs", {
        route: this.$route.path,
        name: this.$route.meta.title,
        id:app.getUID()
      });
      this.$store.commit("set_active_index", this.$route.path);
  },
  computed: {
    openedTabs() {
      return this.$store.state.openedTabs;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    },
     dialogVisible(){
       return this.$store.state.dialogVisible;
     },
    rightMenuData() {
       return this.$store.state.rightMenuData;
    },
    URLQueryMap:{
      get() {
        return this.$store.state.URLQueryMap;
      },
      set(val) {
        this.$store.commit("set_url_map", val);
      }
    }
  },
  watch: {
    $route(to, from) {
      let flag = false;

     if(Object.keys(to.query).length){
       this.$store.commit("set_url_map",({path:to.path,query:to.query}))
     }
      if(to.meta.type==='BLANK' || !to.meta.type){
        for (let item of this.openedTabs) {
                if (item.name === to.meta.title) {
                  this.$store.commit("set_active_index", to.path);
                  flag = true;
                  break;
                }
              }
      
          if (!flag) {
            this.$store.commit("add_tabs", { 
              route: to.path, 
              name: to.meta.title
            });
            this.$store.commit("set_active_index", to.path);
          }
      }else if(to.meta.type==='SELF'){
    
          this.$store.commit("add_tabs", {
             route: to.path,
             name: to.meta.title 
           });
          this.$store.commit("set_active_index",to.path);
          this.$store.commit("delete_tabs", from.path);
       
      }
     
    }
  },
  components:{
    rightMenu
  }
};
</script>

<style  lang="less">
.aweb-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  background-color: #f0f2f5;
  .aweb-header {
    line-height: 64px;
    background: #fff;
    height: 64px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-right: none;
    border-bottom: 1px solid #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    .aweb-userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .aweb-userinfo-inner {
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
      .aweb-download-btn{
        margin-right: 1em;
      }
    }
    .aweb-logo {
      height: 64px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: rgb(14, 9, 9);
      }
    }
    .logo-width,
    .logo-collapse-width {
      background-color: #152028;
      color: #fff;
      box-shadow: 2px 0 6px rgba(0,21,41,.35);  
      transition: width .28s;
      }
      .logo-collapse-width {
        width: 64px;
      }
      .logo-width {
      width: 230px;
      }
    .aweb-tools {
      padding: 0px 23px;
      width: 14px;
      height: 64px;
      line-height: 64px;
      cursor: pointer;
    }
  }
  .aweb-body {
    display: flex;
    position: absolute;
    top: 64px;
    bottom: 0px;
    overflow: hidden;
    aside {
    flex: 0 0 230px;
	  width: 230px;
		box-shadow: 2px 0 6px rgba(0,21,41,.35);
		transition: width .28s;
      .el-menu {
      height: 100%;
      border-right: 0;
      }
      a.router-link-exact-active.router-link-active{
        text-decoration: none;
      }
      .el-menu-item{
         &:hover{
            i{
                color: #fff;
            }
         }
         &.is-active:hover{
             color: #fff !important;
         }
      }
      .el-submenu{
          &:hover{
            .el-submenu__title i{
               color: #fff;
            } 
          }
      }
    }
    .menu-collapsed {
      flex: 0 0 64px;
      width: 64px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }

  }
   .aweb-ctt {
      flex: 1;
      overflow-y: scroll;
      padding: 10px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .aweb-ctt-wrap {
        background-color: #fff;
        box-sizing: border-box;
      }
      .grid-content{
          .el-tabs__content{
              height: calc(100vh - 125px);
              overflow: auto;
              padding: 0;
           }
           .el-tabs__item:focus, 
           .el-tabs__item:focus:active{
                 outline: none;
                outline-color: transparent;
           }
      }
     
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
  }
  // .aweb-right-menu{
  //   position: absolute;
  //   top: 28px;

  //    .el-menu-vertical{
  //        border:1px solid transparent;
  //       border-radius: 4px;
  //       z-index: 100;
  //   }
  
  //   .menuItem{
  //     height: 32px;
  //     line-height: 32px;
  //     font-size: 14px;
  //   }
  // }
}
</style>