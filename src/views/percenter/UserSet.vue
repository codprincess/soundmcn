<template>
    <div class="userinfo10">
        <div class="changepass">
            <el-row>
                <el-col :span="10">
                    <div class="box0">
                        <img @click="goUsersetedit()" src="../../assets/image/icon01.png"/>
                    </div>
                    <router-link to="/usersetedit"><el-button class="changebtn" type="text"><a class="isline">
                        <!-- <i class="iconfont icon-mima">&nbsp;</i> -->
                        修改登录密码</a></el-button></router-link>
                </el-col>
                <el-col :span="4">
                    <div class="box1"></div>
                </el-col>
                <el-col :span="10">
                    <div class="box2"><img @click="goSetPass()" src="../../assets/image/icon02.png"/></div>
                     <!-- <router-link to="/passset"><el-button class="changebtn" type="text">修改支付密码</el-button></router-link> -->
                     <el-button @click="goSetPass" class="changebtn" type="text"><a class="isline">
                         <!-- <i class="iconfont icon-mima">&nbsp;</i> -->
                         {{ setPayPassWord }}</a></el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            is_set:'',
            setPayPassWord:''
        }
    },
    created(){
        this. getSetUserInfo();
    },
    methods:{
        //获取用户信息
         getSetUserInfo(){
            axios({
                url:this.API+'/user/user/getSetInfo',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response);
                console.log(response.data.data.phone);
                 console.log(response.data.data.is_set);
                if(response.data.code==200){
                    this.phone = response.data.data.phone;
                    this.is_set = response.data.data.is_set;
                    if(response.data.data.is_set==1){
                        this.setPayPassWord = '修改支付密码'
                    }
                    if(response.data.data.is_set==0){
                        this.setPayPassWord = '设置支付密码'
                    }
                    // console.log(this.is_set)
                    localStorage.setItem('is_set', this.is_set);
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

        //is_set=1已经设置过密码->paypass，is_set=0还未设置密码->passset，判断跳到不同的页面
        goSetPass(){
            if(this.is_set==1){
                this.$router.push('/paypass');
            }
            if(this.is_set==0){
                this.$router.push('/passset');
            }
        },
        //跳转
        goUsersetedit(){
            this.$router.push('/usersetedit');
        }

    }
}
</script>
<style>
.userinfo10{
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
}
.userinfo10 .changepass{
    text-align: center;
    padding:150px 90px 30px 140px;
}
.userinfo10 .box0, .box2{
    width:120px;
    height:120px;
    cursor: pointer;
}
.userinfo10 .box0 img , .box2 img{
    height:120px;
    width:120px;
    border-radius: 50%;
}
.userinfo10 .box1{
    widows: 20px;
    height:60px;
    border-left:1px solid #eaeaea;
    margin-top:50px;
}
.userinfo10 .changebtn{
    margin-right:75px;
    margin-top:10px;
    color: #18c26a;
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
.isline{
    color:  #18c26a;
}
.isline:hover{
    text-decoration: underline;
}
</style>


