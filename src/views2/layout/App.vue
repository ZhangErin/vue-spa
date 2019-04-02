		<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col
        :span="10"
        class="logo"
        :class="collapsed?'logo-collapse-width':'logo-width'"
      >{{collapsed?'':sysName}}</el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="el-icon-menu"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
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

    <el-col :span="24" class="main">
 <!-- 侧边导航 -->
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单  :default-active="$route.path"-->
        <el-menu        
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#04bebd"
          router
          :collapse="collapsed"
        >

          <template v-for="item in routerData" v-if="!item.hidden">
            
              <el-submenu  v-if="item.children && item.children.length && !item.isLeaf" :index="item.path" :key="item.path">
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

                                            <el-submenu  v-if="child3.children" :index="item.path+'/'+child.path+'/'+child3.path" :key="item.path+'/'+child.path+'/'+child3.path">                              
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
                      <span v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
                    </el-menu-item>
            
                </template>
              </el-submenu>

             
                <el-menu-item  v-else-if="item.isLeaf"  :index="item.path+'/'+item.children[0].path" :key="item.path+'/'+item.children[0].path" >  
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
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <div>
             <!-- tab 右键菜单 -->
             <div v-show="menuVisible" class="aw-right-menu" ref="rightClickMenu">
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
            </div>
         <!-- tab 右键菜单end -->
            <el-tabs
              v-model="activeIndex"
              type="border-card"
              closable
              v-if="openedTabs.length"
              @tab-click="tabClick"
              @tab-remove="tabRemove"
              @contextmenu.native.prevent="tabRightClick"
            >
   
              <el-tab-pane
                :key="item.name"
                v-for="item in openedTabs"
                :label="item.name"
                :name="item.route"
              >
              <el-col :span="24" class="content-wrapper">
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
              <el-dialog :visible.sync='dialogVisible'>
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
  </el-row>
</template>
<script>

import {getObjArr, getRouter} from '@/promission.js'
export default {
  data() {
    return {
      routerData:global.antRouter,
      sysLogo:"img/logo.png",
      sysName: "AWEB_ADMIN",
      collapsed: false,
      sysUserName: "admin",
      sysUserAvatar: "https://s.gravatar.com/avatar/f30a9191dda93b5389965ed99f57f850?s=50&d=retro",
      menuVisible:false,
      isRouterAlive: true
    };
  },
  methods: {
    tabRightClick:function(e){
       if(e.target.classList[0] ==='el-tabs__item'){
            this.menuVisible = true;
            this.$refs.rightClickMenu.style.left = e.clientX +'px';
       }
    },
     reload() {
          this.isRouterAlive = false;
          this.$nextTick(function () {
              this.isRouterAlive = true
          })
        },
    handleRightSelect:function(key, keyPath){
       this.menuVisible = false;

       switch(key){
         case'refresh':
      
         this.reload();
            
          break;
         case'close':

            this.$store.commit("delete_tabs", this.activeIndex);
            if (this.openedTabs && this.openedTabs.length >= 1) {

              this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);

              this.$router.push({ path: this.activeIndex });

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
        })
        .catch(() => {});
    },
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    tabClick(tab) {

      this.$router.push({ path: this.activeIndex });

    },
    tabRemove(targetName) {
         
      this.$store.commit("delete_tabs", targetName);
      if (this.activeIndex === targetName) {
        if (this.openedTabs && this.openedTabs.length >= 1) {

          this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);

          this.$router.push({ path: this.activeIndex });

        }
      }
    },
    cancel(){
           this.$store.commit("set_D_visible",false);
           this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);
           this.$router.push({ path: this.activeIndex });
           this.$store.commit("do_cancel");
    },
    confirm(){
         this.$store.commit("set_D_visible",false);
          this.$store.commit("set_active_index", this.openedTabs[this.openedTabs.length - 1].route);
          this.$router.push({ path: this.activeIndex });
            this.$store.commit("do_confirm");
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
        name: this.$route.meta.title
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
    }
  },
  watch: {
    $route(to, from) {
      let flag = false;
  
      if(to.meta.type==='BLANK' || !to.meta.type){
        for (let item of this.openedTabs) {
                if (item.name === to.meta.title) {
                  this.$store.commit("set_active_index", to.path);
                  flag = true;
                  break;
                }
              }
      
          if (!flag) {
            this.$store.commit("add_tabs", { route: to.path, name: to.meta.title });
            this.$store.commit("set_active_index", to.path);
          }
      }else if(to.meta.type==='SELF'){
    
          this.$store.commit("add_tabs", { route: to.path, name: to.meta.title });
          this.$store.commit("set_active_index",to.path);
           this.$store.commit("delete_tabs", from.path);
       
      }
     
    }
  }
};
</script>

<style  lang="less">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  background-color: #f0f2f5;
  .header {
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
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
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
      background-color: #545c64;
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
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 64px;
      line-height: 64px;
      cursor: pointer;
    }
  }
  .main {
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
   .content-container {
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
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
      .grid-content{
          .el-tabs__content{
              height: calc(100vh - 155px);
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
  .aw-right-menu{
    position: absolute;
    top: 28px;

     .el-menu-vertical{
         border:1px solid transparent;
        border-radius: 4px;
        z-index: 100;
    }
  
    .menuItem{
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
  }
}
</style>