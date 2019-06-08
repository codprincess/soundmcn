<template>
    <div class="mailbox">
         <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-ruleForm login-container">
             <el-tab-pane label="CEO信箱" name="first">
                <el-form label-position="left" label-width="0px" class="register_input">
                    <el-form-item>
                        <span class="u-tri"></span>
                        <div class="prompt-box">
                           <p style="height:25px; line-height:25px;">&nbsp;&nbsp;&nbsp;&nbsp;Hi,朋友，我是超声波发行创始人兼CEO蒙太奇，非常感谢您关注我们的成长和发展。超声波发行是一个非常年轻的团队，我们倡导创新力和执行力。如果您在使用过程中发现
                            我们可以改进的地方，不吝赐教。超声波发行致力追求"极致用户体验"，您的来信，我会十分重视。</p><br>
                            <p style="margin-left:70%;height:30px; line-height:30px;margin-top:0px;"> ———蒙太奇</p>
                        </div>
                    </el-form-item>
                    <div class="tableBody">
                        <el-form-item>
                            <span >如何称呼<i style="color:red">*</i></span>
                            <el-input v-model="nickname" type="text" auto-complete="off" style="width:282px;border-radius:2px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span>联系电话<i style="color:red">*</i></span>
                            <el-input v-model="phone" type="china-mobile" auto-complete="off" style="width:282px;border-radius:2px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span>联系邮箱<i style="color:red">*</i></span>
                            <el-input v-model="email" type="email" auto-complete="off" style="width:282px;border-radius:2px;"></el-input>
                        </el-form-item>
                        <el-form-item class='yijian'>
                            <span>意见反馈<i style="color:red">*</i></span>
                            <el-input @input="textVal" v-model="comment" maxlength="256" class="in_input" type="textarea" placeholder="请输入遇到的问题或建议,最多输入256个字" auto-complete="off" style="width:70%;" :rows="5"></el-input>
                        </el-form-item>
                        <el-form-item  style="width:100%;text-align:center;">
                            <el-button @click="CeoMail" class="submitbtn" type="primary">提交</el-button>
                        </el-form-item>
                    </div>
                </el-form>
             </el-tab-pane>
         </el-tabs>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    inject:['reload'],
    data(){
        return{
            activeName: 'first',
            nickname:'',
            phone:'',
            email:'',
            comment:'',
            maxlength:'',
            thanksemail:false,
        }
    },
    methods:{
        //验证输入字数
        textVal(){
            var txtVal = this.comment.length;
            if(txtVal>256){
                this.$message({
                    message:'最多只能输入256个字',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                    
                })
            }
        },
        //ceo邮箱
        CeoMail(){
            var regtel =/^1[34578]{1}\d{9}$/;
            if(this.nickname==''){
                this.$message({
                    message:'称呼不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                    
                })
                return;
            }
            if(this.phone==''){
                this.$message({
                    message:'联系电话不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                    
                })
                return;
            }else if(!regtel.test(this.phone)){
                this.$message({
                    message:'请填写正确的手机号',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            if(this.email==''){
                this.$message({
                    message:'邮箱不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                    
                })
                return;
            }
            if(this.comment.length>256){
                this.$message({
                    message:'最多只能输入256个字',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                    
                })
                return;
            }else{
                axios({
                    url:this.API+'/system/ceo/push',
                    method:'post',
                    data:{
                        nickname:this.nickname,
                        phone:this.phone,
                        email:this.email,
                        comment:this.comment,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        // this.$message({
                        //     message:response.data.msg,
                        //     type:'success',
                        // })
                        // this.thanksemail = true
                        // this.$alert('这是一段内容', '发送成功', {
                        // dangerouslyUseHTMLString:true})
                        // this.reload()
                        this.$message({
                            message:'感谢您的建议，我们将会把产品做得更好',
                            type:'success',
                            center:true,
                            customClass:'user-defind-style'
                        })
                        this.reload()
                    }else{
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                            
                        })
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            }
        },
         handleClick(tab,event){
            //console.log(tab,event);
        },
    }

}
</script>
<style>
/* 2019.1.27 ceomail精调 */
.el-form-item.yijian .el-form-item__content{
    line-height: 8;
}
.mailbox .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 1px !important;
    background-color: #e4e7ed !important;
    z-index: 1 !important;
}
.mailbox .el-form-item{
    margin-bottom:10px;
}
.mailbox .el-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 2px;
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
    width: 100%;
}
.mailbox{
    width: 904px;
    margin: 40px auto;
    height: 920px;
    /* margin: 30px 0; */
    /* -webkit-border-radius: 5px; */
    border-radius: 2px;
    /* box-shadow: 0 0 1px #f7f7f7; */
    /* padding: 35px 20px 15px 20px; */
    background: #ffffff;
    border: 1px solid #f7f7f7;
    margin-left: 40px;
    background-clip: padding-box;
}
.mailbox .prompt-box{
    width: 770px;
    height:130px;
    background-color: #F5F5F5;
    border-radius: 4px;
    margin: -16px auto 30px;
    padding:20px 23px 0;
    /* margin-top:-15px; */
}
.mailbox .el-textarea__inner {
    background-color: #ffffff;
    border: 1px #dcdfe6 solid;
    resize:none;
}
.mailbox .submitbtn{
    background-color: #07c160!important;
    border:1px solid #07c160!important;
    width: 142px;
    height: 36px;
    border-radius: 2px;
    padding: 0 !important;
    float: left;
    margin-left: 133px;
}
.mailbox .submitbtn:focus, .submitbtn:hover{
    background-color: #07c160!important;
    border:1px solid #07c160!important;
    width: 142px;
    height: 36px;
    border-radius: 2px;
    padding: 0 !important;
    float: left;
    margin-left: 133px;
}
.mailbox .el-tabs__header .is-top{
    height: 53px;
    line-height: 53px;
}
.mailbox .el-tabs__item.is-active {
    color: #303133;
    margin-left: 37px;
    font-weight: 600;
}
.mailbox .el-tabs__item:hover {
    color: #303133;
    cursor: pointer;
    margin-left: 37px;
}
.mailbox .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    border-radius: 2px;
    /* background:  linear-gradient(to right, #67DB73,#4DA3AE, #2852E1); */
    margin-left: 37px;
    background-color: #07c160;
}
.mailbox .u-tri{
    display: inline-block;
    border-right: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
    /* border-right: 20px solid red; */
    border-bottom: 15px solid #F5F5F5; 
    position: relative;
    /* margin-bottom: -15px; */
    margin-top:-30px;
    margin-left:60px;
}
.mailbox .el-message {
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
.mailbox .user-defind-style{
    top:300px !important;
}
.mailbox .tableBody span{
    margin: 0 30px 0 40px;
}
.mailbox .el-form-item__content{
    line-height: 40px;
    position: relative;
    font-size: 14px;
    margin-bottom: 30px;
}

</style>


