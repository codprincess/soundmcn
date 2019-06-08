<template>
    <div>
        <div class="userinfo4">
            <el-form class="userform">
                <el-form-item>
                <div class="avatar-code">
                   <p>修改支付密码</p>
                </div>
                </el-form-item>
                    <!--验证码修改-->
                    <div>
                        <div class="userbox codesbox">
                            <el-form-item>
                                <label class="numbertag">您的手机号为</label>
                                <span style="color:#18C26A">{{phone}}</span>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:34%"></el-input>
                                <el-button @click="codeBtnPaytion" style="width:110px" v-bind:class="{ codesbtn2: isActive, codesbtn: noActive }" :disabled="disabled"><span>{{btnText}}</span></el-button>
                            </el-form-item>
                            <el-form-item label="请再次输入修改的密码" class="more1 codesmore">
                                <!-- <passwdbox></passwdbox> -->
                                 <div class='am_payPwd' :id="`ids_${id}`">
                                    <input type="password"
                                    maxlength="1"
                                    @input="changeInput"
                                    @click="changePwd"
                                    v-model="set_pay_password[i]"
                                    @keyup="keyUp($event)"
                                    class="shortInput"
                                    v-for="(v, i) in 6" :key="i">
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="CodeEditPayPass" class="successbtn">确认</el-button>
                                <router-link to="/setting"><el-button class="backbtn">返回</el-button></router-link>
                            </el-form-item>
                            
                        </div>
                        <!-- <router-link to="/usersetedit"> <div class="codebox"> <el-button class="codebtn" type="text">原密码修改</el-button></div></router-link> -->
                    </div>
            </el-form>
        </div>
    </div>
</template>
<script>
// import Passwdbox from '@/components/Passwdbox.vue'
import axios from 'axios';
export default {
    data(){
        return{
            phone:'',
            set_pay_password: [],
            oldset_pay_password: [],
            isDelete: false,
            ipt: '',
            msg:'',
            msgLength:0,
            disabled: false,
            btnText:'获取验证码',
            captcha:'',
            isActive: false,
            noActive: true
            
        }
    },
    components:{
        // Passwdbox,
    },
    props: {
        id: String,
        default: '1'
    },
    mounted () {　　
        this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`)
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
                        message:'亲，服务器出错了😭',
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
        CodeEditPayPass(){
            axios({
                url:this.API+'/user/password/smsPayPassword',
                method:'post',
                data:{
                    // phone:this.phone,
                    captcha:this.captcha,
                    set_pay_password:this.set_pay_password.join("")
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
          codeBtnPaytion:function(){
            this.time = 60;
            this.disabled = true;
            this.timer();
            //发送请求
            axios({
                url:this.API+'/user/password/sms',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    phone:this.phone
                }
            }).then(response=>{
                if(response.data.code==200){
                    console.log('验证码正确')
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
        keyUp (ev) {
        let index = this.set_pay_password.length
        if (!index) return
        if (ev.keyCode === 8) {
            this.isDelete = true
            if (this.oldset_pay_password === this.set_pay_password.length) {
            if (index === this.set_pay_password.length) {
                this.set_pay_password.pop()
            }
            index--
            } else {
            index > 0 && index--
            }
            this.ipt[index].focus()
        } else if (this.isDelete && index === this.set_pay_password.length && /^\d$/.test(ev.key)) {
            this.isDelete = false
            this.set_pay_password.pop()
            this.set_pay_password.push(ev.key)
            this.ipt[this.set_pay_password.length] && this.ipt[this.set_pay_password.length].focus()
        }
        this.$emit('getPwd', this.set_pay_password.join(''))
        },
        changePwd () {
        let index = this.set_pay_password.length
        index === 6 && index--
        this.ipt[index].focus()
        },
        changeInput () {
        let index = this.set_pay_password.length
        let val = this.set_pay_password[index - 1]
    　　   if (!/[0-9]/.test(val)) {　
            this.set_pay_password.pop() 　　　　  　　　　 
            return 　　　 　　
        }
        if (!val) {
            this.set_pay_password.pop()
            index--
            if (index > 0) this.ipt[index - 1].focus()
        } else {
            if (index < 6) this.ipt[index].focus()
        }
        }
    },
    watch:{
     
    },
}
</script>
<style>
.userinfo4{
    width:700px;
    height:500px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 1px #eaeaea;
    padding:35px 20px 15px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
    /* text-align: center; */
}
.userinfo4 .avatar-code{
    text-align: center;
    border-bottom:1px #eaeaea solid;
    margin-top:-10px;
}
.userinfo4 .avatar-code p{
    font-size: 16px;
}
.userinfo4 .userform{
    text-align: center;
}

.userinfo4 .backbtn{
    border: none;
    background-color: #F3F3F3;
    color: #afafaf;
     width:141px;
     margin-left:30px;
}

.userinfo4 .backbtn:focus, .backbtn:hover{
    color: #ffffff;
    /* border:1px solid #dcdfe6; */
    background-color: #18C26A;
    width:141px;
}
.userinfo4 .el-button+.el-button {
    margin-left: 21px;
    margin-top:20px;
}
.userinfo4 .codebox{
    text-align: center;
    margin-top:-10px;
}
.userinfo4 .successbtn{
    width:141px;
    border:1px solid #18C26A;
    background-color: #18C26A;
    color: #ffffff;
    margin-left: 54px;
    margin-top: 10px;
}
.userinfo4 .successbtn:focus, .successbtn:hover{
    color: #ffffff;
    border:1px solid #16b864;
    background-color: #16b864;
    width:141px;
}
.userinfo4 .pwd-wrap{
    width: 52%;
    height: 44px;
    margin-top:1px;
    /* background: #fff; */
    display: flex;
    float: left;
    cursor: pointer;
    margin-left:-30px;
  }
 .userinfo4 .pwd-wrap li{
    list-style-type:none;
    line-height: 44px;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    border:1px solid #ddd ;
    margin-right: 15px;
     border-radius: 5px;
  }
 
 .userinfo4 .pwd-wrap li i{
    height: 10px;
    width: 10px;
    border-radius:50% ;
    background: #000;
    display: inline-block;
  }
.userinfo4 .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #cccccc;
    line-height: 40px;
    padding: 0 12px 0 120px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

}
.userinfo4 .el-form-item{
    margin-bottom: 0 !important
}
.userinfo4 .more .el-form-item__label{
    padding: 0 12px 0 120px;
}
.userinfo4 .more1 .el-form-item__label{
    padding: 0 12px 0 60px;
    margin-top: 20px;
}
.userinfo4 .userinput{
    position: absolute;z-index: -1;left:-100%;opacity: 0
}
.userinfo4 .userbox{
    margin-top: 80px;
}
.userinfo4 .numbertag{
    color: #cccccc;
    font-size: 16px;
}
.userinfo4 .numberbtn{
    color: #000;
    font-size: 16px;
}
 .userinfo4 .el-input__inner {
    /* border: none; */
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 312px !important;
    margin-left: -11px;
    background-color: #F4F4F4;
}
.userinfo4 .el-input__inner:focus{
    background-color: #fff;
    color: #000
}
/* .userinfo4 .codesbtn {
    margin-left: -40px;
    background-color: #2F77ED;
    color: #fff;
    position: absolute;
} */
.userinfo4 .codesbox{
    margin-top:40px;
}
.userinfo4 .codesmore{
    padding-top:10px;
}
.userinfo4 .am_payPwd {
  display: inline-block;
  width: 310px;
  height: 30px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  padding: 10px 0;
  position: relative;
  margin-left: -160px;
  margin-top:20px;

}

.userinfo4 .am_payPwd .shortInput {
    text-align: center;
    font-size: 20px;
    float: left;
    width: 50px;
    height: 20px;
    color: #333;
    border:none;
    margin-top: 5px;
    outline:none;
}
.userinfo4 .am_payPwd .shortInput:focus{
    border:none;
}
.userinfo4 .am_payPwd .shortInput:not(:last-child) {
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

.userinfo4 .codesbtn {
    margin-left: -47px !important;
    background-color: #2F77ED !important;
    color: #fff !important;
    padding: 12px 12px !important;
    position: absolute;
}
.userinfo4 .codesbtn2 {
    margin-left: -47px !important;
    background-color: #cccccc !important;
    color: #999999 !important;
    padding: 12px 4px !important;
    position: absolute
}
.userinfo4  .codesbtn:hover{background:#2d71e3 !important;color: #ffffff !important;padding: 12px 12px !important;}
.userinfo4 .codesbtn:focus{background:#2F77ED !important;color: #ffffff !important;padding: 12px 12px !important;}
.userinfo4 .codesbtn2:hover{background:#cccccc !important;color: #999999 !important;padding: 12px 4px !important;}
.userinfo4 .codesbtn2:focus{background:#cccccc !important;color: #999999 !important;padding: 12px 4px !important;}
</style>


