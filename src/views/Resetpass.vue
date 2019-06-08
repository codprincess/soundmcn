<template>
    <div class="loginbg" :style="loginbg">
        <div class="resetpass-box">
            <div class="login-top"><router-link to="/"><img src="../assets/image/logo.png" alt="超声波发行logo"/></router-link></div>
            <div class="title"><h4 style="-webkit-transform: skew(-10deg); font-size: 14px; font-weight: 400;color:#282828;margin-top:-15px">一站式音频渠道发行系统</h4></div>
            <div class="formbox">
                <div class="hasan">已有账号？<router-link to="/login" class="coloractive">马上登录</router-link></div>
                <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-ruleForm login-container">
                    <el-tab-pane label="重设密码" name="first" style="margin-top:30px;text-aline:50px;">
                        <el-form label-position="left" label-width="0px">
                            <el-form-item>
                                <el-input v-model="phone" type="china-mobile" auto-complete="off" @keyup.native="number"  placeholder="输入手机号" keyboard="number"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:68%"  required></el-input>
                                <el-button @click="codeBtntion" :disabled="disabled" style="width:102px" v-bind:class="{ codesbtn2: isActive, codesbtn: noActive }" ><span>{{btnText}}</span></el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="password" auto-complete="off"  type="password" placeholder="设置新密码（密码为6-20位英文数字）"></el-input>
                            </el-form-item>
                            <el-form-item style="width:100%">
                                <el-button @click="ResetPass"  type="primary" style="width:336px;margin-bottom:15px;">确认</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      return {
        activeName: 'first',
        disabled: false,
        btnText:'获取验证码',
        phone:'',
        captcha:'',
        password:'',
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
    methods: {
        //检测是否输入数字
        number(){　　
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
        ResetPass(){
            var regtel =/^1[345789]{1}\d{9}$/;
            if(this.phone == ''){
                this.$message({
                    message:'请输入手机号',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else if(!regtel.test(this.phone)){
                this.$message({
                    message:'请输入正确的手机号',
                    type:'error',
                    center:true,
                    customClass:'user-defind-style'
                })
                return;
            }else if(this.captcha==""){
                 this.$message({
                    message:'请输入验证码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else if(this.password == '' || this.password.length < 6 || this.password.length > 20){
                this.$message({
                    message:'请设置6-20位英文与数字的密码',
                    type:'error',
                    center:true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else
            axios({
                url:this.API+'/user/find/phone',
                method:'post',
                data:{
                    phone:this.phone,
                    captcha:this.captcha,
                    password:this.password
                }
            }).then(response=>{
                // console.log(response);
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style',
                        duration:1000
                    })
                    this.$router.push('/login');
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            }).catch(err=>{
                console.log(err);
            })
        },

        //获取验证码点击
        codeBtntion:function(){
            var regtel =/^1[345789]{1}\d{9}$/;
            if(this.phone==""){
                 this.$message({
                    message:'请输入手机号',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                // return;
            }else if(!regtel.test(this.phone)){
                this.$message({
                    message:'请输入正确的手机号',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else
             //发送请求
                this.disabled = true;
                this.btnText = '发送中'
                this.isActive = true;
                this.noActive = false;
             axios({
                 url:this.API+'/user/find/sms',
                 method:'post',
                 data:{
                     phone:this.phone
                 }
             }).then(response=>{
                 if(response.data.code==200){
                     console.log('验证码正确')
                     this.time = 60;
                     this.timer();
                 }else{
                    this.disabled = false;
                    this.btnText = '获取验证码'
                    this.isActive = false;
                    this.noActive = true;
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                 }
             })
        },
        //验证码倒计时60秒
        timer:function(){
            if(this.time>0){
                this.time--;
                // console.log(this.time);
                this.btnText = this.time+"s后重新获取";
                // this.isActive = true;
                // this.noActive = false;
                setTimeout(this.timer,1000);
            }else{
                this.time = 0;
                this.btnText = '获取验证码';
                this.disabled = false;
                this.isActive = false;
                this.noActive = true;
            }
        },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style>
.resetpass-box .formbox .hasan{
    width: 145px;
    height: 17px;
    margin-left:378px;
    position: relative;
    z-index: 1000;
    /* bottom: 368.5px; */
    top: 25px
}
.resetpass-box .formbox .el-tabs__item {
    height: 50px;
}
.resetpass-box .formbox .el-tabs__active-bar {
    background: #07c160
}
.resetpass-box .formbox .coloractive{color: #07c160}
.resetpass-box .formbox .el-tabs__item:hover {
    color: #c6c6c6;
    cursor: pointer;
}
.resetpass-box .formbox .el-tabs__item.is-active {
    color: #000;
}
.resetpass-box .formbox .el-input__inner {
    width:336px;
    height:42px;
    /* background:#F4F4F4; */
    border:1px solid #dcdcdc;
    border-radius:2px;
    color: #000 ;
    margin-left: 185px;
    font-size: 14PX;
}
.resetpass-box .formbox .el-input__inner:focus{
    background:#fff;

}

.resetpass-box .codesbtn {
    margin-left: -60px !important;
    background-color: #2F77ED !important;
    color: #fff !important;
    padding: 12px 12px !important;
    position: absolute;
    height: 42px;
    border-radius: 2px;
}
.resetpass-box .codesbtn2 {
    margin-left: -60px !important;
    background-color: #cccccc !important;
    color: #999999 !important;
    padding: 12px 4px !important;
    border-radius: 2px;
    position: absolute;
    width: 100px;
    height: 42px;
}
.resetpass-box .codesbtn:hover{background:#2d71e3 !important;color: #ffffff !important;padding: 12px 12px !important;}
.resetpass-box .codesbtn:active{background:#2F77ED !important;color: #ffffff !important;padding: 12px 12px !important;}
.resetpass-box .codesbtn2:hover{background:#cccccc !important;color: #999999 !important;padding: 12px 4px !important;}
.resetpass-box .codesbtn2:focus{background:#cccccc !important;color: #999999 !important;padding: 12px 4px !important;}
.resetpass-box{
    width:706px;
    /* height: 653px !important; */
    position: relative;
    top: 100px; 
    /* left: 27%; */
    -webkit-border-radius:5px;
    border-radius: 2px;
    box-shadow: 0 0 20px #eaeaea;
    padding-bottom: 65px;
    background: #ffffff;
    border:1px solid #eaeaea;
    /* margin-bottom: 10%;
    padding-bottom: 48px; */
    margin: auto;
}
.resetpass-box .login-top{
    text-align: center;
    margin-top:50px;
    margin-bottom: 38px;
}
.resetpass-box .title{
    text-align: center;
    margin-bottom: -10px;
}
.resetpass-box .forget_pass{
    text-align: right;
}
.resetpass-box a{
    text-decoration: none;
    color: #c6c6c6;
}
.resetpass-box a:hover{
    text-decoration: underline;
}
.resetpass-box .single_line{
    color: #c6c6c6;
    padding:0px 8px 0px 8px;
}

.resetpass-box .remember{
    margin:0px 0px 35px 0px;
}
.resetpass-box .el-button--primary {
    border-radius: 2px;
    color: #fff;
    background-color: #07c160;
    border-color: #07c160;
    margin-left: 185px;
}
.resetpass-box .el-button--primary:hover,.el-button--primary:focus{
    border-radius: 2px;
    color: #fff;
    background-color: #07c160;
    border-color: #07c160;
}
.loginbg{
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    /* background: url("../assets/image/bg2.png"); */
    background-size: 100% 100%;
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
    z-index: 99999;
}
.user-defind-style{
    top:300px;
}
.formbox .el-tabs__nav-scroll{
    width: 336px;
    margin-left: 185px;
}
.el-tabs__nav-wrap{
    margin-top:0px !important;
}
.resetpass-box .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 336px !important;
    height: 1px;
    background-color: #e4e7ed;
    z-index: 1;
    margin-left: 185px;
}
.resetpass-box .el-form-item{
    margin-bottom: 30px;
    height: 40px;
}
.resetpass-box .el-tabs__content{
    margin-top: -10px;
}
</style>