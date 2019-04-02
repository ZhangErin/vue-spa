<template>
	<section>
	
		<el-row class="aweb-app-info">
		<h3>打开新页面</h3>
		<pre>
	app.open({
		status:true,
		title:'新增页面',
		path:'example/add', //相当于页面的id，也是页面的路由
		page:'example/newPage',//vue页面组件的路径
		type:'BLANK',
		vm:this,
		params:{
			role:'tab页面'
		}
	 })
	     </pre>
		</el-row>
		<el-row class="aweb-app-btn-ctn">
		<el-button type="primary" @click="openNewPage">打开新增页面</el-button>
		<el-button type="primary" @click="openNewPage2">打开编辑页面</el-button>

		</el-row>
		<el-row class="aweb-app-info">
			<h3>打开子页面</h3>
			<pre>
	app.open({
	  status:true,
		title:'子页面',
		path:'example/sub',
		page:'example/newPage',
		type:'SUB',
		params:{id:'12'},
		vm:this,//必填,子页面需要附带传递当前调用的页面上下文
		confirmCallback:() => { 
			console.log('点击确定')
		},
		cancelCallback:(e) => {
			console.log('点击取消')
		}
	})
			</pre>
        </el-row>

	   <el-row class="aweb-app-btn-ctn">
        <el-button type="primary" @click="openSubPage">打开子页面</el-button>
	   </el-row>

		<el-row class="aweb-app-info">
			<h3>打开新窗口页面</h3>
			<pre>
	app.open({
		status:true,
		title:'window页面',
		page:'example/newPage',
		type:'WINDOW'
	})
			</pre>
		</el-row>
	   <el-row class="aweb-app-btn-ctn">
	       <el-button type="info" @click="openWindowPage">打开新窗口页面</el-button>
	   </el-row>

		<el-row class="aweb-app-info">
		<h3>打开自身页面</h3>
	     <pre>
	 app.open({
		 status:true,
		 title:'自身页面',
		 path:'example/self',
		 page:'example/newPage',
		 type:'SELF',
		 vm:this
	 })
		</pre>
		</el-row>
	   <el-row class="aweb-app-btn-ctn last">
	    <el-button type="primary" @click="openSelfpage">打开自身页面</el-button>
	   </el-row>


	   		<el-row class="aweb-app-info">
		<h3>关闭当前页面</h3>
	     <pre>
     app.close({
         vm:this
       });
		</pre>
		</el-row>
	   <el-row class="aweb-app-btn-ctn last">
	    <el-button type="primary" @click="closeCurrentPage">关闭当前页</el-button>
	   </el-row>

	   		<el-row class="aweb-app-info">
		<h3>关闭指定页面</h3>
	     <pre>
     app.close({
         vm:this,
		 path:'example/add'
       });
		</pre>
		</el-row>
	   <el-row class="aweb-app-btn-ctn last">
		<el-button type="primary" @click="closeAddPage">关闭指定的新增页面</el-button>
	   </el-row>
	</section>
</template>
<script>
import { app } from '@/utils/app.js'

	export default {
		data() {
			return {
			
			}
		},
		methods: {
			openNewPage(){
					app.open({
						status:true,
						title:'新增页面',
						path:'example/add',
						page:'example/newPage',
						vm:this,
						type:'BLANK',
						params:{
							role:'参数1'
						}
					})
			},
			openNewPage2(){
					app.open({
						status:true,
						title:'编辑页面',
						path:'example/edit',
						page:'example/newPage',
						type:'BLANK',
						vm:this,
						params:{
							id:'相同页面组件不同页面实例'
						}
					})
			},
			closeAddPage(){
				app.close({
						vm:this,
						path:'example/add'
					});
			},
			closeCurrentPage(){
                app.close({
						vm:this
					});
			},
			openSubPage(){
						app.open({
							status:true,
							title:'子页面',
							path:'example/sub',
							page:'example/newPage',
							type:'SUB',
							vm:this,//必填
							confirmCallback:() => {
								console.log('点击确定')
							},
							cancelCallback:(e) => {
								console.log('点击取消')
							}
						})
				
			},
			openWindowPage(){
					app.open({
								status:true,
								title:'window页面',
								page:'example/newPage',
								type:'WINDOW',
								params:{
									role:'新窗口'
								}
							})
			},
			openSelfpage(){
				  app.open({
						status:true,
						title:'自身页面',
						path:'example/self',
						page:'example/newPage',
						type:'SELF',
						vm:this
					})
			}
		},
		mounted() {
		   
		}
	};

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
