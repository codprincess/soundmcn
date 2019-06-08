<template>
    <div>
        <div class="userinfo3">
            <el-form class="userform">
                <el-form-item>
                <div class="avatar3">
                   <p>设置支付密码</p>
                </div>
                </el-form-item>
                <div class="userbox2">
                    <el-form-item label="请输入支付密码">
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
                    <el-form-item label="请再次输入" class="more">
                         <div class='am_payPwd' :id="`ids_${id}`">
                            <input type="password"
                            maxlength="1"
                            @input="changeInput2"
                            @click="changePwd2"
                            v-model="pay_password_confirm[i2]"
                            @keyup="keyUp2($event)"
                            @keydown="oldPwdList2 = pay_password_confirm.length"
                            class="shortInput2"
                            v-for="(v2, i2) in 6" :key="i2">
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="SetpayPass" class="successbtn">确认</el-button>
                         <router-link to="/userset"><el-button class="backbtn">返回</el-button></router-link>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Passwdbox from '@/components/Passwdbox.vue'
export default {
    data(){
        return{
            pay_password: [],
            pay_password_confirm:[],
            oldPwdList: [],
            oldPwdList2: [],
            isDelete: false,
            ipt: '',
            ipt2:'',
            msg:'',
            msgLength:0,
        }
    },
    props: {
        id1: String, // 当一个页面有多个密码输入框时，用id来区分
        default: '1',
        id:String,
        default: '2'
    },
    mounted () {　　
        this.ipt = document.querySelectorAll(`#ids_${this.id1} .shortInput`)
        this.ipt2 = document.querySelectorAll(`#ids_${this.id} .shortInput2`)
    },
    methods: {
        //设置支付密码
        SetpayPass(){
            axios({
                url:this.API+'/user/password/setPayPassword',
                method:'post',
                data:{
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
            }
    },
    watch:{
     
    },
}
</script>
<style scoped>
.userinfo3{
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
.userinfo3 .avatar3{
    text-align: center;
    border-bottom:1px #eaeaea solid;
    margin-top:-10px;
}
.userinfo3 .avatar3 p{
    font-size: 16px;
}
.userinfo3 .userform{
    text-align: center;
}
.userinfo3 .backbtn{
     width:141px;
     margin-left:30px;
     background-color: #F3F3F3;
     color: #afafaf;
     border: none
}
.userinfo3 .backbtn:focus, .backbtn:hover{
    /* color: #333333; */
    border:1px solid #dcdfe6;
    background-color: #18C26A;
    color: #fff;
    width:141px;
}
.userinfo3 .el-button+.el-button {
    margin-left: 21px;
    margin-top:20px;
}
.userinfo3 .successbtn{
    width:141px;
    border:1px solid #18C26A;
    background-color: #18C26A;
    color: #ffffff;
    margin-left: 150px;
}
.userinfo3 .successbtn:focus, .successbtn:hover{
    color: #ffffff;
    border:1px solid #16b864;
    background-color: #16b864;
    width:141px;

}
.userinfo3 .pwd-wrap{
    width: 52%;
    height: 44px;
    margin-top:1px;
    /* background: #fff; */
    display: flex;
    float: left;
    cursor: pointer;
    margin-left:-30px;
  }
 .userinfo3 .pwd-wrap li{
    list-style-type:none;
    line-height: 44px;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    border:1px solid #ddd ;
    margin-right: 15px;
     border-radius: 5px;
  }
 
 .userinfo3 .pwd-wrap li i{
    height: 10px;
    width: 10px;
    border-radius:50% ;
    background: #000;
    display: inline-block;
  }
.userinfo3 .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #cccccc;
    line-height: 40px;
    padding: 0 12px 0 120px;

}
.userinfo3 .more .el-form-item__label{
    text-align: right;
    float: left;
    font-size: 14px;
    color: #cccccc;
    line-height: 40px;
    padding: 0 12px 0 148px;
}
.userinfo3 .userinput{
    position: absolute;z-index: -1;left:-100%;opacity: 0
}
.userinfo3 .userbox2{
    margin-top: 60px;
}
.el-form-item__content{
    line-height: 40px !important;
}
.el-form-item{
    margin-bottom: 20px;
}
.userinfo3 .am_payPwd {
  display: inline-block;
  width: 310px;
  height: 30px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  padding: 10px 0;
  position: relative;
  margin-left: -80px;
  margin-top:-10px;

}

.userinfo3 .am_payPwd .shortInput {
    text-align: center;
    font-size: 18px;
    float: left;
    width: 50px;
    height: 20px;
    color: #333;
    border:none;
    margin-top: 5px;
    outline:none;
}
.userinfo3 .am_payPwd .shortInput:focus{
    border:none;
}
.userinfo3 .am_payPwd .shortInput:not(:last-child) {
    border-right: 1px solid #E5E5E5;
}

.userinfo3 .am_payPwd .shortInput2 {
    text-align: center;
    font-size: 18px;
    float: left;
    width: 50px;
    height: 20px;
    color: #333;
    border:none;
    margin-top: 5px;
    outline:none;
}
.userinfo3 .am_payPwd .shortInput2:focus{
    border:none;
}
.userinfo3 .am_payPwd .shortInput2:not(:last-child) {
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


