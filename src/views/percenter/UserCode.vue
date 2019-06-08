<template>
    <div>
        <div class="setUserInfo">
            <el-form class="userform">
                <el-form-item>
                <div class="avatar2">
                   <p>修改登录密码</p>
                </div>
                </el-form-item>
                    <!--验证码修改-->
                    <div>
                        <div class="userbox codesbox">
                            <el-form-item>
                                <label class="numbertag">您的手机号为</label>
                                <el-button v-model="phone" type="text" class="numberbtn">{{phone}}</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:343px"></el-input>
                                <el-button @click="codeBtntion" style="width:15%" v-bind:class="{ codesbtn2: isActive, codesbtn: noActive }" class="codesbtn" :disabled="disabled"><span>{{btnText}}</span></el-button>
                            </el-form-item>
                            <el-form-item>
                                 <el-input v-model="set_password" title="" type="password" placeholder="请输入修改密码" style="width:343px;"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="CodeEditPass" class="successbtn">确认</el-button>
                                <router-link to="/userset"><el-button class="backbtn">返回</el-button></router-link>
                            </el-form-item>
                            
                        </div>
                         <div class="codebox"> <router-link to="/usersetedit"><el-button class="ycodebtn" type="text">原密码修改</el-button></router-link></div>
                    </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            phone:'',
            set_password:'',
            oldset_password:'',
            disabled: false,
            btnText:'获取验证码',
            captcha:'',
            isActive: false,
            noActive: true
            
        }
    },
    components:{
      
    },
    //声明周期
    created(){
        this.getUserInfo();
    },
    methods: {
        //获取用户信息
        getUserInfo(){
            axios({
                url:this.API+'/user/user/getSetInfo',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response);
                console.log(response.data.data.phone);
                if(response.data.code==200){
                    this.phone = response.data.data.phone;
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        //验证码修改密码
        CodeEditPass(){
            axios({
                url:this.API+'/user/password/setPassword',
                method:'post',
                data:{
                    // phone:this.phone,
                    captcha:this.captcha,
                    set_password:this.set_password
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    this.$router.push('/userset');
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            }).catch(err=>{
                this.$message({
                    message:response.data.msg,
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                console.log(err);
            })

        },
        //点击获取验证码
          codeBtntion:function(){
            this.time = 60;
            this.disabled = true;
            this.timer();
             //发送请求
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url: this.API+'/user/password/sms',
                method:'post',
                data:{
                    phone:this.phone,
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    console.log('success');
                }else{
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
                this.isActive = true;
                this.noActive = false;
                setTimeout(this.timer,1000);
            }else{
                this.time = 0;
                this.btnText = '获取验证码';
                this.disabled = false;
                this.isActive = false;
                this.noActive = true;
            }
        },
    },
    watch:{
     
    },
}
</script>
<style>
.setUserInfo{
    width:700px;
    height:500px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 1px #eaeaea;
    padding:15px 20px 15px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
    /* text-align: center; */
}
.setUserInfo .avatar2{
    text-align: center;
    border-bottom:1px #eaeaea solid;
    margin-top:-10px;
}
.setUserInfo .avatar2 p{
    font-size: 16px;
}
.setUserInfo .userform{
    text-align: center;
}

.setUserInfo .el-button+.el-button {
    margin-left: 21px;
    margin-top:20px;
}
.setUserInfo .codebox{
    text-align: center;
    margin-top:-10px;
}
.setUserInfo .ycodebtn{
    margin-top: 20px;
    color: #18C26A !important;
}
.setUserInfo .ycodebtn:focus ,.setUserInfo .ycodebtn:hover{
    color: #18C26A !important;
    text-decoration: underline
}
.setUserInfo .successbtn{
    width:155px;
    background-color: #18C26A;
    border: none;
    color: #ffffff;
    /* height:30px;
    line-height: 5px; */
}
.setUserInfo .successbtn:focus, .successbtn:hover{
    color: #ffffff;
    border:1px solid #18C26A;
    background-color: #18C26A;
    width:155px;
}
.setUserInfo .backbtn{
    background-color: #f3f3f3;
    border: none;
    color: #afafaf;
     width:155px;
     margin-left:30px;
}
.setUserInfo .backbtn:focus, .backbtn:hover{
    color: #fff;
    /* border:1px solid #dcdfe6; */
    background-color: #18C26A;
    width:155px;
}
.setUserInfo .pwd-wrap{
    width: 52%;
    height: 44px;
    margin-top:1px;
    /* background: #fff; */
    display: flex;
    float: left;
    cursor: pointer;
    margin-left:-30px;
  }
 .setUserInfo .pwd-wrap li{
    list-style-type:none;
    line-height: 44px;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    border:1px solid #ddd ;
    margin-right: 15px;
     border-radius: 5px;
  }
 
 .setUserInfo .pwd-wrap li i{
    height: 10px;
    width: 10px;
    border-radius:50% ;
    background: #000;
    display: inline-block;
  }
.setUserInfo .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #cccccc;
    line-height: 40px;
    padding: 0 12px 0 120px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

}
.setUserInfo .more .el-form-item__label{
    padding: 0 12px 0 120px;
}
.setUserInfo .more1 .el-form-item__label{
    padding: 0 12px 0 106px;
}
.el-form-item{
    margin-bottom: 20px !important;
}

.setUserInfo .userinput{
    position: absolute;z-index: -1;left:-100%;opacity: 0
}
.setUserInfo .userbox{
    margin-top: 80px;
}
.setUserInfo .numbertag{
    color: #cccccc;
    font-size: 16px;
}
.setUserInfo .numberbtn{
    color: #18C26A;;
    font-size: 16px;
}
.el-input{
    margin-left: 0 !important
}
 .setUserInfo .userform .el-input__inner {
    border: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 343px;
    background-color: #F4F4F4;
}
.setUserInfo .codesbtn {
    margin-left: -105px !important;
    background-color: #2F77ED !important;
    color: #fff !important;
    padding: 12px 12px !important;
    position: absolute;
}
.setUserInfo .codesbtn2 {
    margin-left: -4px !important;
    background-color: #cccccc !important;
    color: #999999 !important;
    padding: 12px  4px !important;
}
.setUserInfo .codesbtn:hover{background:#2d71e3!important;color: #ffffff !important;padding: 12px 12px !important;}
.setUserInfo .codesbtn:focus{background:#2d71e3!important;color: #ffffff !important;padding: 12px 12px !important;}
.setUserInfo .codesbtn2:hover{background:#cccccc !important;color: #999999 !important;padding:12px  4px !important;}
.setUserInfo .codesbtn2:focus{background:#cccccc !important;color: #999999 !important;padding: 12px  4px !important;}

.setUserInfo .codesbox{
    margin-top:40px;
}
.setUserInfo .codesmore{
    padding-top:30px;
}
.setUserInfo .am_payPwd {
  display: inline-block;
  width: 347px;
  height: 40px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  padding: 10px 0;
  position: relative;
  margin-left: -80px;
  margin-top:-10px;

}

.setUserInfo .am_payPwd .shortInput {
    text-align: center;
    font-size: 20px;
    float: left;
    width: 57px;
    height: 30px;
    color: #333;
    border:none;
    margin-top: 5px;
    outline:none;
}
.setUserInfo .am_payPwd .shortInput:focus{
    border:none;
}
.setUserInfo .am_payPwd .shortInput:not(:last-child) {
    border-right: 1px solid #E5E5E5;
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
input:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}

</style>


