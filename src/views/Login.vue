<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm cus-login-container">
    <h3 class="cus-title">赞同管理系统</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
        <el-form-item prop="identify">
      <identifyInput v-model="ruleForm2.identifyCode"  placeholder="验证码"></identifyInput>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" class="cus-submit-btn" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
     <el-form-item style="width:100%;">
     <el-checkbox v-model="checked" checked class="cus-remember" text-color="#771faa">记住密码</el-checkbox>
     <el-button type="text" class="cus-forget-passWord">忘记密码</el-button>
     </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin ,getRoutersList} from '@/api/api'
  import { saveRouter,getRouter,addDynRoute} from '@/promission.js'

  import identifyInput from '../components/identifyInput.vue'

  export default {
    data() {
      return {
        logining: false,
        user:{
          name:'admin',
          avatar:'https://s.gravatar.com/avatar/f30a9191dda93b5389965ed99f57f850?s=50&d=retro'
         },
        ruleForm2: {
          account: 'admin',
          checkPass: '123456',
          identifyCode:''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
  
            this.logining = true;
         
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
           
              requestLogin(loginParams).then(((response)=>{
        
                  sessionStorage.setItem('user', JSON.stringify(response));
                  global.hasLogin = true;
               

                     getRoutersList().then(res => {

                        addDynRoute(res.data.router);

                         _this.$router.push({ path: '/spa/spa'});
                       
                    })

              }))
                    // sessionStorage.setItem('user', JSON.stringify(_this.user));
                    // _this.$router.push({ path: '/'});

         
  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    components:{
      identifyInput
    }
  }

</script>

 <style lang="less" >


   .cus-submit-btn{
    width:100%;
   }
  .cus-login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .cus-title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .cus-remember {
      float:left;

    }
    
    .cus-forget-passWord {
     float: right;

    }
  }
</style>