<template>
    <div>
        <div class="userinfo5">
            <el-form class="userform">
                <el-form-item>
                <div class="avatar4">
                   <p>修改支付密码</p>
                </div>
                </el-form-item>
                    <div>
                        <div class="userboxpay">
                             <el-form-item label="请输入原支付密码" class="more1">
                                <!-- <passwdboxthr></passwdboxthr> -->
                                <div class='am_payPwd' :id="`ids_${id3}`">
                                    <input type="password"
                                    maxlength="1"
                                    @input="changeInput3"
                                    @click="changePwd3"
                                    v-model="password[i]"
                                    @keyup="keyUp3($event)"
                                    @keydown="oldPwdList3 = password.length"
                                    class="shortInput3"
                                    v-for="(v, i) in 6" :key="i">
                                </div>
                            </el-form-item>
                            <el-form-item label="请输入修改的密码" class="more2">
                                <!-- <passwdbox></passwdbox> -->
                                <div class='am_payPwd' :id="`ids_${id1}`">
                                    <input type="password"
                                    maxlength="1"
                                    @input="changeInput"
                                    @click="changePwd"
                                    v-model="pay_password[i]"
                                    @keyup="keyUp($event)"
                                    @keydown="oldPwdList = pay_password.length"
                                    class="shortInput"
                                    v-for="(v, i) in 6" :key="i">
                                </div>
                            </el-form-item>
                            <el-form-item label="请再次输入修改的密码" class="more">
                                <div class='am_payPwd' :id="`ids_${id2}`">
                                    <input type="password"
                                    maxlength="1"
                                    @input="changeInput2"
                                    @click="changePwd2"
                                    v-model="pay_password_confirm[i]"
                                    @keyup="keyUp2($event)"
                                    @keydown="oldPwdList2 = pay_password_confirm.length"
                                    class="shortInput2"
                                    v-for="(v, i) in 6" :key="i">
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="RepayPass" class="successbtn">确认</el-button>
                                <router-link to="/setting"><el-button class="backbtn">返回</el-button></router-link>
                            </el-form-item>
                            
                        </div>
                        <div class="codebox">  <router-link to="/paycode"><el-button class="ycodebtn" type="text">验证码修改</el-button></router-link></div>
                    </div>
                    <!--验证码修改-->
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
// import Passwdboxone from '@/components/Passwdboxone.vue'
// import Passwdboxtwo from '@/components/Passwdboxtwo.vue'
// import Passwdboxthr from '@/components/Passwdboxthr.vue'
export default {
    data(){
        return{
            password: [],
            pay_password_confirm:[],
            pay_password:[],
            oldPwdList: [],
            oldPwdList2: [],
            oldPwdList3:[],
            isDelete: false,
            ipt: '',
            ipt2:'',
            ipt3:'',
            msg:'',
            msgLength:0,
        }
    },
     props: {
        id1: String, // 当一个页面有多个密码输入框时，用id来区分
        default: '1',
        id2:String,
        default: '2',
        id3:String,
        default: '3'
    },
     mounted () {　　
        this.ipt = document.querySelectorAll(`#ids_${this.id1} .shortInput`)
        this.ipt2 = document.querySelectorAll(`#ids_${this.id2} .shortInput2`)
        this.ipt3 = document.querySelectorAll(`#ids_${this.id3} .shortInput3`)
    },
    // components:{
    //     Passwdboxone,
    //     Passwdboxtwo,
    //     Passwdboxthr
    // },
   methods: {
        //设置支付密码
        RepayPass(){
            axios({
                url:this.API+'/user/password/rePayPassword',
                method:'post',
                data:{
                    password:this.password.join(""),
                    pay_password:this.pay_password.join(""),
                    pay_password_confirm:this.pay_password_confirm.join("")
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
           keyUp (ev) {
                let index = this.pay_password.length
                if (!index) return
                if (ev.keyCode === 8) {
                    this.isDelete = true
                    if (this.oldPwdList === this.pay_password.length) {
                    if (index === this.pay_password.length) {
                        this.pay_password.pop()
                    }
                    index--
                    } else {
                    index > 0 && index--
                    }
                    this.ipt[index].focus()
                } else if (this.isDelete && index === this.pay_password.length && /^\d$/.test(ev.key)) {
                    this.isDelete = false
                    this.pay_password.pop()
                    this.pay_password.push(ev.key)
                    this.ipt[this.pay_password.length] && this.ipt[this.pay_password.length].focus()
                }
                this.$emit('getPwd', this.pay_password.join(''))
            },
            changePwd () {
                let index = this.pay_password.length
                index === 6 && index--
                this.ipt[index].focus()
            },
            changeInput () {
                let index = this.pay_password.length
                let val = this.pay_password[index - 1]
            　　   if (!/[0-9]/.test(val)) {　
                    this.pay_password.pop() 　　　　  　　　　 
                    return 　　　 　　
                }
                if (!val) {
                    this.pay_password.pop()
                    index--
                    if (index > 0) this.ipt[index - 1].focus()
                } else {
                    if (index < 6) this.ipt[index].focus()
                }
            },


        keyUp2 (ev) {
                let index2 = this.pay_password_confirm.length
                if (!index2) return
                if (ev.keyCode === 8) {
                    this.isDelete = true 
                    if (this.oldPwdList2 === this.pay_password_confirm.length) {
                    if (index2 === this.pay_password_confirm.length) {
                        this.pay_password_confirm.pop()
                    }
                    index2--
                    } else {
                    index2 > 0 && index2--
                    }
                    this.ipt2[index2].focus()
                } else if (this.isDelete && index2 === this.pay_password_confirm.length && /^\d$/.test(ev.key)) {
                    this.isDelete = false
                    this.pay_password_confirm.pop()
                    this.pay_password_confirm.push(ev.key)
                    this.ipt2[this.pay_password_confirm.length] && this.ipt2[this.pay_password_confirm.length].focus()
                }
                this.$emit('getPwd', this.pay_password_confirm.join(''))
            },
            changePwd2 () {
                let index2 = this.pay_password_confirm.length
                index2 === 6 && index2--
                this.ipt2[index2].focus()
            },
            changeInput2 () {
                let index2 = this.pay_password_confirm.length
                let val = this.pay_password_confirm[index2 - 1]
            　　   if (!/[0-9]/.test(val)) {　
                    this.pay_password_confirm.pop() 　　　　  　　　　 
                    return 　　　 　　
                }
                if (!val) {
                    this.pay_password_confirm.pop()
                    index2--
                    if (index2 > 0) this.ipt2[index2 - 1].focus()
                } else {
                    if (index2 < 6) this.ipt2[index2].focus()
                }
            },

            keyUp3 (ev) {
                let index3 = this.password.length
                if (!index3) return
                if (ev.keyCode === 8) {
                    this.isDelete = true 
                    if (this.oldPwdList3 === this.password.length) {
                    if (index3 === this.password.length) {
                        this.password.pop()
                    }
                    index3--
                    } else {
                    index3 > 0 && index3--
                    }
                    this.ipt3[index3].focus()
                } else if (this.isDelete && index3 === this.password.length && /^\d$/.test(ev.key)) {
                    this.isDelete = false
                    this.password.pop()
                    this.password.push(ev.key)
                    this.ipt3[this.password.length] && this.ipt3[this.password.length].focus()
                }
                this.$emit('getPwd', this.password.join(''))
            },
            changePwd3 () {
                let index3 = this.password.length
                index3 === 6 && index3--
                this.ipt3[index3].focus()
            },
            changeInput3 () {
                let index3 = this.password.length
                let val = this.password[index3 - 1]
            　　   if (!/[0-9]/.test(val)) {　
                    this.pay_password.pop() 　　　　  　　　　 
                    return 　　　 　　
                }
                if (!val) {
                    this.password.pop()
                    index3--
                    if (index3 > 0) this.ipt3[index3 - 1].focus()
                } else {
                    if (index3 < 6) this.ipt3[index3].focus()
                }
            }
    },
    watch:{
   
    },
}
</script>
<style>
.userinfo5{
    width:700px;
    height:500px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 1px #eaeaea;
    padding:35px 20px 60px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
    /* text-align: center; */
}
.userinfo5 .avatar4{
    text-align: center;
    border-bottom:1px #eaeaea solid;
    margin-top:-10px;
}
.userinfo5 .avatar4 p{
    font-size: 16px;
}
.userinfo5 .userform{
    text-align: center;
}
.userinfo5 .successbtn{
    width:141.5px;
     border:1px solid #18C26A;
    background-color: #18C26A;
    color: #ffffff;
    margin-left: 100px;
}
.userinfo5 .successbtn:focus, .successbtn:hover{
    color: #ffffff;
    border:1px solid #18C26A;
    background-color: #18C26A;
    width:141.5px;
}
.userinfo5 .backbtn{
     width:141.5px;
     background-color: #f3f3f3;
     color: #afafaf;
     border: none;
     margin-left:30px;
}

.userinfo5 .backbtn:focus, .backbtn:hover{
    color: #fff;
    /* border:1px solid #dcdfe6; */
    background-color: #18C26A;
    width:141.5px;
}
.userinfo5 .el-button+.el-button {
    margin-left: 21px;
    margin-top:20px;
}
.userinfo5 .codebox{
    text-align: center;
    /* margin-top:-10px; */
}
.userinfo5 .ycodebtn{
    color: #18C26A !important;
    margin-left: 75px !important
}
.userinfo5 .ycodebtn:focus ,.userinfo5 .ycodebtn:hover{
    color: #18C26A !important;
    text-decoration: underline
}


.userinfo5 .more .el-form-item__label{
    padding: 0 12px 0 80px;
}
.userinfo5 .more1 .el-form-item__label{
    padding: 0 12px 0 106px;
}
.userinfo5 .more2 .el-form-item__label{
    padding: 0 12px 0 106px;
}
.userinfo5 .userinput{
    position: absolute;z-index: -1;left:-100%;opacity: 0
}
.userinfo5 .userboxpay{
    margin-top: 80px;
}
.userinfo5 .numbertag{
    color: #cccccc;
    font-size: 16px;
}
.userinfo5 .numberbtn{
    color: #000;
    font-size: 16px;
}
.userinfo5 .el-input__inner {
    border: none;
    border-radius: 4px;
    color: #606266;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 100%;
    background-color: #F4F4F4;
}
.userinfo5 .codesbtn {
    margin-left: -4px;
    background-color: #2F5CED;
    color: #fff;
}
.userinfo5 .codesbox{
    margin-top:40px;
}
.userinfo5 .codesmore{
    padding-top:30px;
}
.userinfo5 .am_payPwd {
  display: inline-block;
  width: 310px;
  height: 30px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  padding: 10px 0;
  position: relative;
  margin-left: -130px;
  margin-top:-10px;

}

.userinfo5 .am_payPwd .shortInput {
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
.userinfo5 .am_payPwd .shortInput:focus{
    border:none;
}
.userinfo5 .am_payPwd .shortInput:not(:last-child) {
    border-right: 1px solid #E5E5E5;
}
.userinfo5 .am_payPwd .shortInput2 {
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
.userinfo5 .am_payPwd .shortInput2:focus{
    border:none;
}
.userinfo5 .am_payPwd .shortInput2:not(:last-child) {
    border-right: 1px solid #E5E5E5;
}
.userinfo5 .am_payPwd .shortInput3 {
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
.userinfo5 .am_payPwd .shortInput3:focus{
    border:none;
}
.userinfo5 .am_payPwd .shortInput3:not(:last-child) {
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
</style>


