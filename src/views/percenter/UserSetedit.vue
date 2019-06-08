<template>
    <div>
        <div class="userinfo11">
            <el-form class="userform">
                <el-form-item>
                <div class="avatar1">
                   <p>修改密码</p>
                </div>
                </el-form-item>
                <div class="editPassWord" style="padding-top:30px;">
                    <el-form-item>
                        <el-input v-model="password" type="password" placeholder="请输入原密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="new_password" type="password"  placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                       <el-input v-model="new_password_confirm" type="password"  placeholder="请再次输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="UserEdit" class="successbtn">确认</el-button>
                        <router-link to="/setting"><el-button class="backbtn">返回</el-button></router-link>
                    </el-form-item>
                    <el-form-item>
                        <router-link to="/usercode"><el-button class="codebtn" type="text">验证码修改</el-button></router-link>
                    </el-form-item>
                    
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            password:'',
            new_password:'',
            new_password_confirm:'',
        }
    },
    methods:{
        //重新修改密码
        UserEdit(){
            axios({
                url:this.API+'/user/password/rePassword',
                method:'post',
                data:{
                    password:this.password,
                    new_password:this.new_password,
                    new_password_confirm:this.new_password_confirm,
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
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
                console.log(err);
            })
        }
    }
}
</script>
<style scoped>
.userinfo11{
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
.userinfo11 .avatar1{
    text-align: center;
    border-bottom:1px #eaeaea solid;
    margin-top:-10px;
}
.userinfo11 .avatar1 p{
    font-size: 16px;
}
.userinfo11 .userform{
    text-align: center;
}
.userinfo11 .userform .el-input__inner {
    /* border: none; */
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 322px !important;
    background-color: #F4F4F4;
    margin-bottom: 15px;
}
/* .el-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 322px !important;
} */


.userinfo11 .userform .el-input__inner:focus{
    background-color: #fff;
    border-color: #dcdcdc;
}
.editPassWord .el-input[data-v-3e57407a]{
    line-height: 40px !important;
    width: 322px !important;
    margin-left: 0px !important
}
.userinfo11 .successbtn{
    width:151.5px;
    background-color: #18C26A !important;
    border: none;
    color: #ffffff;
}
.userinfo11 .successbtn:hover{
    background-color: #16b864
}
.userinfo11 .backbtn{
    background-color: #f3f3f3;
    border: none;
    color: #afafaf;
    width:151.5px;
    margin-left:20px;
}
.userinfo11 .backbtn:focus, .backbtn:hover{
    color: #fff;
    /* border:1px solid #dcdfe6; */
    background-color: #18C26A;
    width:151.5px;
}
.userinfo11 .el-button+.el-button {
    margin-left: 21px;
    margin-top:20px;
}
.userinfo11[data-v-3e57407a]{
    padding: 15px 20px 15px 20px;
}
.userinfo11 .codebtn{
    color: #18C26A !important;
}
.userinfo11 .codebtn:focus, .codebtn:hover{
    /* color: #18C26A !important; */
    text-decoration: underline;
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
/* 取消浏览器自动填充附带的背景色 */
input:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}
/* JLX */
.el-form-item__content{
    line-height: 40px !important;
}
.userinfo11 .el-form-item{
    margin-bottom: 20px !important;
}
</style>


