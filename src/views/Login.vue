<template>
    <div class="loginbg" :style="loginbg">
        <div class="login-box">
            <div class="login-top"><img src="../assets/image/logo.png" alt="超声波发行logo" @click="jumpToHome"/></div>
            <div class="title"><h4 style="-webkit-transform: skew(-10deg); font-size: 14px; font-weight: 400;color:#282828;margin-top:-15px">一站式音频渠道发行系统</h4></div>
            <div class="formbox">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-ruleForm login-container">
                    <el-tab-pane label="密码登录" name="first" style="margin-top:30px;text-aline:50px" >
                        <el-form  ref="ruleForm" label-position="left" label-width="0px">
                            <el-form-item prop="username">
                                <el-input v-model="username" name="text" autocomplete="off" onfocus="this.type='text'" type="text"  @keyup.native="number" placeholder="请输入手机号" @keyup.native.enter="LoginAction"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="password" name="password"  autocomplete="off" onfocus="this.type='password'"  type="text " placeholder="请输入密码" @keyup.enter.native='LoginAction'></el-input>
                            </el-form-item>
                            <!-- <el-checkbox checked class="remember">记住密码</el-checkbox> -->
                            <el-form-item style="width:100%">
                                <!-- <el-button @click.native.prevent="handleSubmit"  type="primary" style="width:100%;">登录</el-button> -->
                                <el-button @click="LoginAction"  type="primary" style="width:336px;"  >登录</el-button>
                            </el-form-item>
                            <div class="forget-pass">
                                <router-link to="/resetpass" >忘记密码</router-link>
                                <span class="single-line">|</span>
                                <router-link to="/register" >注册</router-link>
                            </div>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="验证码登录" name="second" style="margin-top:30px;margin-top:30px">
                        <el-form label-position="left" label-width="0px" class="regist">
                            <el-form-item>
                                <el-input v-model="phone" type="china-mobile" auto-complete="off" @keyup.native="number2" placeholder="请输入手机号" keyboard="number" @keyup.native.enter="LoginCodeUser"></el-input>
                            </el-form-item>
                            <el-form-item>
                                    <div class="youWannaIDo"></div>
                                <el-input v-model="captcha" title=""  type="text" placeholder="请输入验证码" style="width:68%"  required @keyup.native.enter="LoginCodeUser"></el-input>
                                <el-button @click="codeBtntion"  v-bind:class="{ codesbtn2: isActive, codesbtn: noActive }" :disabled="disabled" style="width:100px"><span>{{btnText}}</span></el-button>
                            </el-form-item>
                            <el-form-item style="width:100%">
                                <el-button @click="LoginCodeUser" type="primary" style="width:336px"  >登录</el-button>
                            </el-form-item>
                            <div class="forget-pass">
                                <router-link to="/resetpass">忘记密码</router-link>
                                <span class="single-line">|</span>
                                <router-link to="/register">注册</router-link>
                            </div>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>

    
</template>
<script>
// import { requestLogin } from '../api/api';
import axios from 'axios'
import url from '@/serviceAPI.config.js'
export default {
    inject:['reload'],
    data() {
      return {
        activeName: 'first',
        username:'',
        password:'',
        phone:'',
        captcha:'',
        disabled: false,
        btnText:'获取验证码',
        loginbg:{
            backgroundImage: "url(" + require("../assets/image/bg2.png") + ")",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
        },
        isActive: false,
        noActive: true

      };
    },
    // created(){
    //     if(localStorage.userInfo){
    //         this.$message({
    //             message:'亲，您已经登录(*^_^*)',
    //             type:'success',
    //         })
    //     }
    // },
    methods: {
        //输入时自动检测
        number(){　　
    // 　　　  this.username=this.username.replace(/[^\.\d]/g,'');
    //         this.username=this.username.replace('.','');
            // this.$message({
            //     message:('请输入正确的号码'),
            //     type:'error',
            //     center: true,
            //     duration:500,
            //     customClass:'user-defind-style'
            // })
    　　},
        number2(){　　
    // 　　　  this.phone=this.phone.replace(/[^\.\d]/g,'');
    //         this.phone=this.phone.replace('.','');
            // this.$message({
            //     message:('请输入正确的号码'),
            //     type:'error',
            //     center: true,
            //     duration:500,
            //     customClass:'user-defind-style'
            // })
    　　},
        //表单验证和获取用户消息
        // LoginAction(){
        //    this.LoginUser();
        // },
        //密码登录
        LoginAction(){
            var regtel =/^1[345789]{1}\d{9}$/;
            if(this.username==""){
                this.$message({
                    message:'请输入手机号',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
            }else if(!regtel.test(this.username)){
                this.$message({
                    message:'请输入正确的手机号',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                axios({
                url:this.API+'/user/login/password',
                method:'post',
                data:{
                    username:this.username,
                    password:this.password
                }
                }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    
                    this.token = response.data.data.token;
                    this.is_login = response.data.data.is_login;
                    console.log('sda',this.is_login)
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        duration:1000,
                        customClass:'user-defind-style'
                    })
                    localStorage.userInfo = {userName:this.username}
                    localStorage.setItem('userInfo',this.username)
                    localStorage.setItem("is_login",this.is_login)
                    localStorage.setItem('token',this.token)
                    // this.reload
                    this.$router.push('/perinfo');
                    
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        duration:1000,
                        customClass:'user-defind-style'
                    })
                }
            }).catch(error=>{
                // console.log(11111);
            })}
        },

        //验证码登录
        LoginCodeUser(){
            
            var regtel =/^1[345789]{1}\d{9}$/;
            if(this.phone==""){
                this.$message({
                    message:'请输入手机号',
                    type:'error',
                    center: true,
                    duration:1000,                    
                    customClass:'user-defind-style'
                })
            }else if(!regtel.test(this.phone)){
                this.$message({
                    message:'请输入正确的手机号',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else if(this.captcha==""){
                this.$message({
                    message:'请输入验证码',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
                return;
            }else{
            axios({
                url:this.API+'/user/login/code',
                method:'post',
                data:{
                    phone:this.phone,
                    captcha:this.captcha,
                }
                }).then(response=>{
                    console.log(response);                                                                                                                                                                                                                                                     
                    if(response.data.code==200){
                        this.token = response.data.data.token;
                        this.$message({
                            message:response.data.msg,
                            type:'success',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                        localStorage.userInfo = {userName:this.username}
                        localStorage.setItem('userInfo',this.username)
                        localStorage.setItem('token',this.token)
                        this.$router.push('/perinfo');
                    }else{
                        this.$message({
                            message:'验证码不正确',
                            type:'error',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch((error)=>{
                })}
        },
        //获取验证码点击
        codeBtntion:function(index){
            var regtel =/^1[345789]{1}\d{9}$/;
            if(this.phone==""){
                 this.$message({
                    message:'请输入手机号',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
                // return;
            }else if(!regtel.test(this.phone)){
                this.$message({
                    message:'请输入正确的手机号',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                //发送请求
                this.btnText = '发送中'
                this.disabled = true;
                this.isActive = true;
                this.noActive = false;
                axios({
                    url:this.API+'/user/login/sms',
                    method:'post',
                    data:{
                        phone:this.phone
                    },
                    withCredentials : true
                }).then(response=>{
                    if(response.data.code==200){
                         this.time = 60;
                         this.timer();
                    }else{
                        this.btnText = '获取验证码';
                        this.disabled = false;
                        this.isActive = false;
                        this.noActive = true;
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                    }
                    console.log('验证码正确')
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        //验证码倒计时60秒
        timer:function(){
            if(this.time>0){
                this.time--;
                // console.log(this.time);
                this.btnText = this.time+"s后重新获取";
                setTimeout(this.timer,1000);
            }else{
                this.time = 0;
                this.btnText = '获取验证码';
                this.disabled = false;
                this.isActive = false;
                this.noActive = true;
            }
        },

        //验证表单消息
        checkForm(){
            let isOK = true;
            var regtel =/^1[345789]{1}\d{9}$/;
            if(this.username==''){
                this.$message({
                    message:'请输入手机号',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
            }else if(!regtel.test(this.username)){
                this.$message({
                    message:'请填写正确的手机号',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
            }
            isOK = false;
            if(this.password.length<6){
                 this.$message({
                    message:'密码不能少于6位数',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
                // console.log('密码不能少于6位数');
                isOK = false;
            }else{
                console.log('密码填写正确');
            }
            return isOK;
        },

        //切换
        handleClick(tab, event) {
        },
        //注册引用信息
        handleReset(){
            this.$refs.ruleForm.resetFields();
        },
        //点击logo跳回首页
        jumpToHome(){
            this.$router.push({path: '/'});
        }
        //登录
        // handleSubmit(ev){
        //     var _this = this;
        //     this.$refs.ruleForm.validate((valid)=>{
        //         if(valid){
        //             var loginParams = {username:this.ruleForm.username,password:this.ruleForm.password};
        //             requestLogin(loginParams).then(data=>{
        //                 this.logining = false;
        //                 let {msg,code,user} = data;
        //                 if(code!==200){
        //                     this.$message({
        //                         message:msg,
        //                         type:'error'
        //                     })
        //                 }else{
        //                     sessionStorage.setItem('user',JSON.stringify(user));
        //                     this.$router.push({path:'/index'});
        //                 }
        //             })
        //         }else{
        //             console.log('error submit');
        //             return false;
        //         }
        //     })
        // }
        //退出登录
        

    }
  };
</script>
<style>
.login-box .el-form-item{
    height: 40px !important;
    margin-bottom: 30px !important;
}
.el-message {
    min-width: 230px;
    box-sizing: border-box;
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    transition: opacity .3s,transform .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;
}
.user-defind-style{
    top:300px;
}
.login-box .el-tabs__item {
    color: #B2B2B2;
    height:50px;
}
.login-box .el-input__inner {
    width:336px;
    height:40px;
    /* background:#F4F4F4; */
    border:1px solid #dcdcdc;
    border-radius:2px;
    color: #000;
    margin-left: 185px;
    font-size: 14PX;
}
.login-box .el-tabs__content{
    margin-top: -10px
}
.login-box .el-input__inner:focus{
    background:#fff;
}
.login-box img{
    margin-left: 256px;
    margin-right: 256px;
    cursor: pointer;
}
.login-box    .el-input{
    margin-left: 0px !important
}
.login-box .el-tabs__item:hover {
    color: #000;
    cursor: pointer;
}
.login-box .el-tabs__item.is-active {
    color: #000;
}
.login-box .el-tabs__active-bar {
    background:  #07c160
}
.login-box{
    width:706px;
    height: 560px !important;
    position: relative;
    top: 100px; 
    /* left: 27%; */
    -webkit-border-radius:5px;
    border-radius: 2px;
    box-shadow: 0 0 20px #eaeaea;
    padding-bottom:10px;
    background: #ffffff;
    border:1px solid #eaeaea;
    /* margin-bottom: 10%;
    padding-bottom: 30px; */
    margin: auto;
    /* padding-bottom: 8px; */
}
.login-box .codesbtn {
    width: 95px;
    margin-left: -59px !important;
    background-color: #2F77ED !important;
    color: #fff !important;
    padding: 12px 12px !important;
    z-index: 2;
    position: absolute;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #2f77ed;
}
.login-box .codesbtn2 {
    margin-left: -59px !important;
    background-color: #cccccc !important;
    color: #999999 !important;
    border-radius: 2px;
    padding:12px  4px !important;
    height: 40px;
    position: absolute;
}

.login-box .codesbtn:hover{background:#2d71e3 !important;color: #ffffff !important;padding: 12px 12px !important;}
.login-box .codesbtn:active{background:#2F77ED !important;color: #ffffff !important;padding: 12px 12px !important;}
.login-box .codesbtn2:hover{background:#dcdcdc !important;color: #dcdcdc !important;padding:12px  4px !important;}
.login-box .codesbtn2:focus{background:#dcdcdc !important;color: #dcdcdc !important;padding: 12px  4px!important;}
.login-box .login-top{
    text-align: center;
    margin-top:50px;
    margin-bottom: 38px;
}
.login-box .title{
    text-align: center;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    font-style: italic;
    color: #282828;
    line-height: 14px;
    margin-bottom: 40px;
}
.login-box .forget-pass{
    text-align: right;
    margin-bottom: 32px !important;
    width: 200px;
    height: 15px;
    margin-top: -20px !important;
    margin-left: 321px;
}
.login-box a{
    text-decoration: none;
    color: #c6c6c6;
}
.login-box a:hover{
    color: #07c160;
    text-decoration: underline;
}
.login-box .single-line{
    color: #c6c6c6;
    padding:0px 8px 0px 8px;
}
.login-box .el-button--primary {
    border-radius: 2px;
    color: #fff;
    background-color: #07c160 !important;
    border-color: #07c160 !important;
    margin-left: 185px;
    width: 336px;
}
.login-box .el-button--primary:hover{
    border-radius: 2px;
    color: #fff !important;
    background-color: #16b864 !important;
    border-color: #16b864 !important;
}
.login-box .el-button--primary:active{
    background-color: #07c160 !important;
    border-color: #07c160 !important;
}
.loginbg{
    position: relative;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 100%;
    /* background: url("../assets/image/bg2.png"); */
}
.el-message {
    min-width: 230px !important;
    box-sizing: border-box;
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    transition: opacity .3s,transform .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;
}
.user-defind-style{
    top:300px !important;
}

.login-box .el-tabs__nav-scroll{
    width: 336px;
    margin-left: 185px;
}
.login-top .el-tabs__nav-wrap{
    margin-top: -12px !important;
}
.login-box .el-tabs__nav-wrap::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 336px !important;
    height: 1px;
    background-color: #E5E5E5;
    z-index: 1;
    margin-left: 185px !important;
}
:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}
.login-box .el-form-item__content{
    margin-top: 0px !important;
    /* margin-top: 0px !important; */
}
.login-box .youWannaIDo{
    position: absolute;
    width: 2px;
    height: 38px;
    background-color: #fff;
    margin-left: 421px;
    margin-top: 0px;
    z-index: 22;
    border-bottom: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
}
</style>