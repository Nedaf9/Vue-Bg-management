<!--  -->
<template>
  <div class="wrap">
    <div class="myadmin-login">
      <h1>后台管理系统</h1>
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="手机号登录"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item label="" prop="password">
          <!-- 键盘enter事件 要加.native -->
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="密码"
            show-password
            
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.code" placeholder="验证码" class="login-inputCode" @keyup.enter.native="handleLogin('loginForm')"></el-input>
           <el-button 
           
           :plain="true" 
           :class="[{'login-codeBtn':true},{'disable':Show}]" 
            @click="handleSendCode" 
            >{{Codename}}</el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            @click.enter="handleLogin('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <div class="login-p">
        <p>温馨提示</p>
        <p>未登录过的新用户，自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </div> -->
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

 import { login } from "@/api/api"
 import axios from "axios"
 import qs from 'qs';  //引入qs 模块

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      Codename:'获取验证码',
      Show:false,
      CreateCode:"", //生成验证码
      form: {
        username: "",
        password: "",
        code:''
      },

      rules: {
        username: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度为11个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
     
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
   //发送验证码倒计时
   handleSendCode:  function(){
      // console.log(this.$refs.btn);
      // console.log(this.form.code);  //获取短信输入框的验证码
    
     //  this.btn.attr('disabled',true); 
     //随机验证码
     let CreateCode = (('000000'+Math.floor(Math.random() * 999999))).slice(-6);
     this.CreateCode = CreateCode
     /*
        判断输入手机号和密码之后 才执行  
      */
     if(this.form.username && this.form.password){
      //向后台发送请求
       this.$axios.post('/code',qs.stringify({ //通过qs.stringify转换为表单参数
              Phone:"+86"+this.form.username,
              Code: CreateCode,
            }))
            .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

       //按钮倒计时
       this.Codenum = 10;
       this.Show = true;
       let p =  new Promise((resolve, reject) => {
	      let setTimer = setInterval(() => {
            //声明一个变量countdown 来存 this.Codenum--
           const countdown = this.Codenum--;
            console.log(countdown);
            /* 倒计时进行的时候 将倒计时显示在按钮上 */
            this.Codename = countdown +'S';
	          if (!countdown ) {  
               this.Codename='获取验证码';           
	            resolve(setTimer)
	          }
	        },1000)
	    })
     p.then((setTimer) => {
	      clearInterval(setTimer); //清楚计时器
        this.Show = false;    //恢复按钮可点击
	    })   
     }else{
        this.$message.error('请输入手机号');
      }
      
     },

     handleLogin(loginForm) {
        //接收上一个函数传递过来的CreateCode
      //  let getCode = this.CreateCode;
       this.$refs[loginForm].validate(async (valid) => {
         if (valid) {
           //发请求 拿数据
           /*  this.$message({
             message: "恭喜你,登录成功",
             type: "success",
           }); */
           let result = await login({
             user_name: this.form.username,
             password: this.form.password,
           })
          console.log(result);
           console.log(this.CreateCode);
          console.log(this.form.code)
         if(result.status === 1 && this.CreateCode == this.form.code){
            this.$message({
             message: "恭喜你,登录成功",
             type: "success",
           }); 
           //在本地保存一个值 判断登录的状态
           localStorage.setItem("is_login","true");
               //跳转到dash 
               this.$router.push("Dashboard");
          }else{
              this.$message({
               message: "登录没有成功",
               type: "warning",
             });
          }
         } else {
          this.$message({
             type: "warning",
             message: "校验没有成功",
           });
           return false;
         }
       });
     },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
.wrap {
  height: 100vh;
  background: url(../assets/bg1.png) no-repeat top;
  background-size: 100% 100%;
  padding-top: 25vh;
}
h1 {
  font-weight: 200;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px;
}
.myadmin-login {
  border-radius: 10px;
  margin: 0 auto;
  width: 400px;
  height: 400px;
  padding: 20px;
  background-color: #ffffff;
  .login-button {
    width: 100%;
  }
  .login-inputCode{
   width: 60%;
  }
  .login-codeBtn{
    width: 30%;
    margin-left: 8%;
    text-align: center;
  }
  .login-p {
    text-align: center;
    color: red;
  }
 } //按钮禁用
.disable{
    pointer-events: none;
}

</style>