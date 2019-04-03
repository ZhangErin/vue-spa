<template>
  <div class="app-container">
    新页面
    <span>传递的参数:{{this.$route.query.id}}</span>
    <el-row>
     	<el-button type="success" @click="closeCurrentPage">关闭当前页</el-button>
    </el-row>
  </div>
</template>

<script>
  import { app } from '@/utils/app.js'
export default {

  data() {
    return {
    }
  },
  filters: {
   
  },
  created() {
  },
  methods: {
   closeCurrentPage(){
       app.close({
         vm:this
       });
   }
  },
  mounted(){
  console.log('当前页面参数',this.$route.query);
  console.log('当前页面参数',JSON.stringify(app.getParams()));
  }
}
</script>
<style lang="less" scoped>
     .app-container{
       text-align: center;
     }
</style>
