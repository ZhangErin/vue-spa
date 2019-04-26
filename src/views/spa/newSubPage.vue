<template>
  <div class="app-container">
     	<el-row class="aweb-app-info">
		<h3>子弹窗页面传参</h3>
	     <pre>

       props:{
          params:Object    // 获取参数在props里面拿params
      }

		</pre>
		</el-row>

    <el-row class="aweb-app-btn-ctn" >
     	<el-button type="success" @click="closeCurrentPage">关闭当前页</el-button>    <span>参数结果:{{params}}</span>
    </el-row>
  </div>
</template>

<script>

export default {

  data() {
    return {
    }
  },
  props:{
    params:Object
  },
  created() {
  },
  methods: {
   closeCurrentPage(e){
       this.close();
   }
  },
  mounted(){

   console.log('当前弹窗页面参数',this.params);

  }
}
</script>
<style lang="less" scoped>
	.aweb-app-info{
	
		padding: 20px;
		width: 100%;
		margin: 20px 0;
		>h3{
			margin-bottom:12px;
		}
		
	}
	pre{
	  color: #666;
		padding: 12px;
		border: 1px dashed #ddd;
		border-left: 4px solid #bbb;
		background: #fafafa;
		white-space: pre-wrap;
		word-wrap: break-word;
		letter-spacing: 1.5px;
		font: 14px/25px 'Comic Sans MS','courier new';
		line-height: 22px;
		background-size: 100% 44px;
	}
	.aweb-app-btn-ctn{
		padding-left: 20px;
		&.last{
			padding-bottom: 20px;
		}
	}
</style>
