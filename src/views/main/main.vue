<template>
  <div class="app-container">
    <div class="welcome-wrapper">
      <div class="welcome-ctn">
          <img src="../../img/custom-aweb-logo.png">
          <h1 class="example-header"> 欢迎使用 AWEB！</h1>
      </div>
      <ul data-role="exampleLinkList" class="example-link-list">   
          <li class="example-link-item" v-for ="item in mainList">       
              <a target="_blank" :href="item.href" :title="item.name">{{item.name}}</a>  
          </li>                
      </ul>
    </div>
  </div>
</template>

<script>
  import  app  from '@/utils/app.js'
  import { getMainList } from '@/api/api'
  export default {

    data() {
      return {
        mainList:[]
      }
    },
    mixins:[app],
    methods: {
      closeCurrentPage(){
          this.close();
      }
    },
    mounted(){
      var _this = this;

      getMainList().then(function (response) {
    
        if(response.status===200){
            var content = response.data&&response.data.result;
            if(content.length){
              _this.mainList = content;
            }
            
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  }
</script>
<style lang="less" scoped>
  .app-container{
    text-align: center;
  }
  .welcome-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width:100%;
  }
  .example-link-list{
    margin:0;
    padding:0;
   // display:flex;
    width:100%;
    margin:10px 0;
    list-style:none;
    text-align:center;
    margin-top:50px;
  }
  .example-link-item{
      display:inline-block;
      list-style:none;
      padding:2em;
      margin:1em;
      border-radius:6px;
      box-shadow: 0px 0px 6px #efefef;
  }
  .example-link-item a{
    text-decoration:none;
    color:#04bebd;
  }
  .example-link-item a:hover{
    text-decoration: underline;
  }
</style>
