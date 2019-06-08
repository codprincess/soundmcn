<template>
    <div class="mailbox">
         <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-ruleForm login-container">
             <el-tab-pane label="CEO信箱" name="first">
                <el-form label-position="center" label-width="0px" class="register_input">
                     <el-form-item>
                        <span class="u-tri"></span>
                        <div class="prompt-box">
                            <p style="height:25px; line-height:25px;">&nbsp;&nbsp;&nbsp;&nbsp;Hi,朋友，我是超声波发行创始人兼CEO蒙太奇，非常感谢您关注我们的成长和发展。超声波发行是一个非常年轻的团队，我们倡导创新力和执行力。如果您在使用过程中发现
                            我们可以改进的地方，不吝赐教。超声波发行致力追求"极致用户体验"，您的来信，我会十分重视。</p><br>
                            <p style="margin-left:70%;height:30px; line-height:30px;"> ———蒙太奇</p>
                        </div>
                    </el-form-item>
                   <div class="successtitle">
                       <div class="successbox"><div class="u-icon-radioLB on"></div></div>
                       <p>感谢您提供的意见和建议，我们会用心把产品做得更好！</p>
                   </div>
                </el-form>
             </el-tab-pane>
         </el-tabs>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            activeName: 'first',
        }
    },
    methods:{
         handleClick(tab,event){
            //console.log(tab,event);
        },
    }

}
</script>
<style>
.el-form-item{
    margin-bottom:10px;
}

.mailbox{
    width:700px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 20px #eaeaea;
    padding:35px 35px 15px 35px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box; 
}
.mailbox .successtitle{
    height: 400px;
    text-align: center;
}
.mailbox .successtitle .successbox{
    margin-top: 100px;
}

.prompt-box{
    height:150px;
    background-color: #F5F5F5;
    border-radius: 5px;
    padding:10px 20px 10px 20px;
    margin-top:-15px;
}
.mailbox .el-textarea__inner {
    background-color: #ffffff;
    border: 1px #dcdfe6 solid;
}
.submitbtn{
    background-color: #18C26A !important;
    border:1px solid #18C26A !important;
}
.submitbtn:focus, .submitbtn:hover{
    background-color: #18C26A !important;
    border:1px solid #18C26A !important;
}
.u-icon-radioLB{   
    position: relative;
    width: 80px;
    height: 80px;
    border-radius:50%;
    -webkit-border-radius: 50%;
    margin-left: 300px;
}
.on .u-icon-radioLB,.on.u-icon-radioLB
{
    background: #18C26A !important;
}
.u-icon-radioLB::after{
    position: absolute;
    top: 10px;
    left: 30px;
    width: 20px;
    height: 40px;
    border-style: solid;
    border-color: #fff;
    border-width: 0 6px 6px 0;
    -webkit-transform: rotateZ(45deg);
    content: "";
}
 .u-tri{
    display: inline-block;
    border-right: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
    /* border-right: 20px solid red; */
    border-bottom: 15px solid #F5F5F5; 
    position: relative;
    /* margin-bottom: -15px; */
    margin-top:-30px;
    margin-left:20px;
}

</style>

