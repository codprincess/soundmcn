<template>
    <div class="registerbg" :style="registerbg">
    <div class="register-box">
        <div class="login-top"><img src="../assets/image/logo.png" alt="超声波发行logo" @click="goHome" style="cursor:pointer"/></div>
        <div class="title"><h4 style="-webkit-transform: skew(-10deg); font-size: 14px; font-weight: 400;color:#282828">一站式音频渠道发行系统</h4></div>
        <div class="formbox">
            <div class="hasan">已有账号？<router-link to="/login" class="coloractive">马上登录</router-link></div>
            <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-ruleForm login-container">
                <el-tab-pane label="账号注册" name="first" style="margin-top:30px;">
                     <div class="re-progress">
                        <el-steps :active="active" finish-status="success">
                             <el-step title="基本信息"></el-step>
                             <el-step title="选择类型"></el-step>
                             <el-step title="信息登记" style="margin-right:1px;"></el-step>
                        </el-steps>
                        <div class="step-modle"></div>
                        <div class="step-modleone"></div>
                        <transition name="mybox2">
                            <div class="step-modletwo" v-if="showline1"></div>
                        </transition>
                        <transition name="mybox">
                            <div class="step-modle-one" v-if="showline1"></div>
                        </transition>
                        <transition name="mybox">
                            <div class="step-modle-two" v-if="showline2"></div>
                        </transition>
                     </div>
                    <!--基本信息-->
                    <el-form label-position="left" label-width="1.5px" class="register_input" v-if="firstStep" >
                       <el-form-item>
                            <el-input v-model="phone" type="china-mobile" auto-complete="off" placeholder="输入手机号" @keyup.native="number"  keyboard="number" style="width:336px"  required></el-input>
                        </el-form-item>
                        <el-form-item>
                                    <div class="youWannaIDo"></div>

                            <el-input v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:336px" required>
                                
                            </el-input>
                            <el-button @click="codeBtntion" style="width:15%;" v-bind:class="{ codesbtn2: isActive, codesbtn: noActive }" :disabled="disabled"><span>{{btnText}}</span></el-button>
                        </el-form-item>
                         <el-form-item>
                            <el-input v-model="password" auto-complete="off"  type="password" style="width:336px" placeholder="密码为6-20位英文数字"  required></el-input>
                        </el-form-item>      
                        <el-form-item style="width:100%;">
                            <el-button  type="primary" @click="registerAction" style="width:336px;">下一步</el-button>
                        </el-form-item>
                        
                        <div class="agree">[注册]&nbsp;&nbsp;即表示您同意本网站的<router-link to="/useragreenment">用户协议</router-link></div>
                       
                    </el-form>
                    <!--选择类型-->
                    <el-form label-position="left" label-width="1.5px" class="register_input" v-else-if="sconedStep">
                       <el-form-item style="margin-top:-10px">
                            <el-radio v-model="type" id="type1" value="1"  style="border-radius:50%" label="个人"> </el-radio>
                            <el-radio v-model="type" id="type2" value="2" style="border-radius:50%" label="企业"></el-radio>
                       </el-form-item>
                       <el-form-item>
                           <div class="hint-text">
                               <span>
                                   <b>温馨提示：</b><br>
                                   注册后&nbsp;&nbsp;"个人"&nbsp;&nbsp;可转为公司，但&nbsp;&nbsp;"公司"&nbsp;&nbsp;不可转<br>为个人
                               </span>
                           </div>
                           <!-- <span class="Txt" style="color:#ff6e40">*注册后“个人”可转为公司，但选择“公司”后不转为个人</span> -->
                       </el-form-item>
                       <el-form-item style="width:100%;">
                            <el-button  type="primary" @click="twonext()" style="width:336px;">下一步</el-button>
                       </el-form-item>
                       <el-button class="returnBtn" @click="handlepreStep()"  type="info" style="width:336px;" plain>上一步</el-button>
                    </el-form>
                    <!--信息登记个人-->
                    <el-form label-position="left" label-width="1.5px" class="register_input" v-if="thirStep" 
                                    v-loading="finalyloading"
                                    element-loading-text="正在为您提交注册信息，请稍后..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)">
                        <label class="userlable" style="color:#A5A5A5">用户名</label>
                        <el-form-item>
                            <el-input v-model="nickname" type="text" auto-complete="off" placeholder="请输入用户名" style="width:50%;"></el-input>
                        </el-form-item>
                             <label class="namelabel" style="color:#A5A5A5">真实姓名</label>
                        <el-form-item>
                            <el-input v-model="real_name" type="text" auto-complete="off" placeholder="请输入真实姓名" style="width:50%"></el-input>
                        </el-form-item>
                             <label class="numberlabel" style="color:#A5A5A5">身份证号码</label>
                        <el-form-item>
                            <el-input v-model="id_code" type="text" auto-complete="off" placeholder="请输入身份证号码" style="width:50%"></el-input>
                        </el-form-item>
                        <div class="upload-txt"><span style="color:#A5A5A5">手持身份证照</span></div>
                        <el-form-item>
                            <div class="upload-box">
                                <div class="loadingFront"
                                    v-loading="nomLoadingfront"
                                    element-loading-text="图片正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)"></div>
                                <div class="loadingBack" 
                                    v-loading="nomLoadingback"
                                    element-loading-text="图片正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)"></div>      
                                <el-upload 
                                    type="file"
                                    class="avatar-uploader"
                                    :action="actionUrl"
                                    ref="frontPic"
                                    :show-file-list="false"
                                    :on-success="uploadSuccess2"
                                    :before-upload="beforeUpload2"
                                    :on-remove="removeHandler2"
                                    :http-request="httpRequest2"
                                    accept="image/jpeg,image/gif,image/png"
                                    :data="qiniuData">
                                    <img v-if=" imageUrl_front" :src="imageUrl_front" class="avatar1">
                                    <img v-else src="../assets/image/组 120.png" style="width:128px;">
                                    <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                                    <div class="top-pic1"  style="top:0px"><img :src="frontImg"/></div>
                                </el-upload>
                                <el-upload 
                                    class="avatar-uploader"
                                    :action="actionUrl"
                                    ref="backPic"
                                    :show-file-list="false"
                                    :on-success="uploadSuccess3"
                                    accept="image/jpeg,image/gif,image/png"
                                    :before-upload="beforeUpload3"
                                    :on-remove="removeHandler3"
                                    :http-request="httpRequest3"
                                    :data="qiniuData">
                                    <img v-if="imageUrl_back" :src="imageUrl_back" class="avatar1">
                                    <img v-else src="../assets/image/组 115.png" style="width:128px;height:90px;">

                                    <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                                     <div class="top-pic1"><img :src="bcakImg"/></div>
                                </el-upload>
                            </div>
                        </el-form-item>
                         <el-form-item>
                             <div class="uploadHint">
                                 <b>上传须知：</b><br>手持身份证不可遮挡面部，需能看清身份证上的内容，我们会在一个工作日内为您审核，请知悉
                             </div>
                           <!-- <span class="txt-line" style="color:rgb(255, 110, 64)">*手持身份证不可遮挡面部，需能看清身份证上的内容，我们会在<br>一个工作日内为您审核，请知悉</span> -->
                       </el-form-item>
                       <el-button  class="finalyBtn" type="primary" @click="RegisterSetType"  style="width:336px;margin-bottom:10px;">完成</el-button>
                       <el-form-item style="width:100%;">
                            <el-button class="returnBtn1" @click="handlepreStep2()"  type="info" style="width:336px;" plain>上一步</el-button>
                            
                       </el-form-item>
                    </el-form>
                    <!--信息登记企业-->
                    <el-form label-position="left" label-width="0px" class="register_input" v-show="companystep"
                                    v-loading="endLoading"
                                    element-loading-text="正在为您提交注册信息，请稍后..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)">
                        <label class="userlable" style="color:#A5A5A5">用户名</label>
                        <el-form-item>
                            <el-input type="text" v-model="nickname" auto-complete="off" placeholder="请输入用户名" style="width:50%;"></el-input>
                        </el-form-item>
                             <label class="namelabel" style="color:#A5A5A5">公司名称</label>
                        <el-form-item>
                            <el-input v-model="company_name" type="text" auto-complete="off" placeholder="公司名称" style="width:50%"></el-input>
                        </el-form-item>
                            <label class="blanklabel" style="color:#A5A5A5">统一社会信用代码</label>
                        <el-form-item>
                            <el-input v-model="company_code" type="text" auto-complete="off" placeholder="统一社会信用代码" style="width:50%"></el-input>
                        </el-form-item>
                        <div class="upload-2-txt"><span style="color:#A5A5A5;">营业执照</span></div>
                        <el-form-item>
                            <div class="upload-box2">
                                <div class='loading'
                                    v-loading="companyLoading"
                                    element-loading-text="图片正在上传中..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)">
                                </div>
                                     <el-upload                                    
                                        class="avatar-uploader"
                                        ref="upload" 
                                        accept="image/jpeg,image/gif,image/png"
                                        :action="actionUrl"
                                        :on-success="uploadSuccess"
                                        :before-upload="beforeUpload"
                                        :on-remove="removeHandler"
                                        :http-request="httpRequest"
                                        :show-file-list="false" >
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <img v-else src="../assets/image/组 114.png" class="nophoto">

                                        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                                        <div class="top-pic1"><img :src="BusCliImg"/></div>
                                    </el-upload>
                            </div>
                            <div class="right-text">
                                <span class="txt-line-2" ><b>上传须知：</b><br>营业执照需上传扫描文<br>件，我们会在一个工作日内为您审核，请知悉</span>
                            </div>
                        </el-form-item>
                         <el-form-item>
                           
                       </el-form-item>
                       <el-form-item style="width:100%;">
                            <el-button class="finalyBtn-2" @click="RegisterSetComType()"  type="primary" style="width:336px;">完成</el-button>
                       </el-form-item>
                       <el-button class="returnBtn" @click="handlepreStep2()"  type="info" style="width:336px;" plain>上一步</el-button>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    </div>
</template>
<script>
//引入接口文件
import axios from 'axios'
import { types } from 'util';
// import url from '@/serviceAPI.config.js'
export default {
    data(){
        return {
            // isChecked:true,
            phone:'',
            password:'',
            captcha:'',
            disabled: false,
            btnText:'获取验证码',
            activeName: 'first',
            active: 0,
            imageUrl_front:'',
            imageUrl_back:'',
            imageUrl:'',
            firstStep:true,
            sconedStep:true,
            thirStep:false,
            companystep:false,
            personcheck:true,
            prestep:false,
            nickname:'',
            real_name:'',
            id_code:'',
            id_up:'',
            id_down:'',
            business:'',
            type:'',
            company_name:'',
            company_code:'',
            qiniuData:{},
            uploadSign: null,
            fileList: [],
            actionUrl: this.API+'/system/upload/qiniu',
            fileReader: '',
            registerbg:{
                backgroundImage: "url(" + require("../assets/image/bg2.png") + ")",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
            },
            bcakImg:require("../assets/image/back.png"),
            frontImg:require("../assets/image/face.png"),
            BusCliImg:require("../assets/image/组 1162.png"),
            isActive: false,
            noActive: true,
            showBall:true,
            showBall1:false,
            showBall2:false,
            showline1:false,
            showline2:false,
            nomLoadingfront:false,
            nomLoadingback:false,
            companyLoading:false,
            endLoading:false,
            finalyloading:false,

        }
    },
    methods:{
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
        //表单验证和注册
        registerAction(){
            this.RegisterUser()
            // this.checkForm() && this.RegisterUser();
            //         this.active = this.active+1
            //         console.log(this.active)
            //         this.firstStep = !this.firstStep;
            //         // this.sconedStep = !this.sconedStep;
            //         this.showBall = this.firstStep;
            //         this.showline1 = this.sconedStep;
            //         this.showline2 = this.thirStep;
            //         this.showBall1 = this.sconedStep;
            //         this.showBall2 = this.thirStep;
                
            
        },
        //注册，第一步                                                                                                                                                                                                                        
        RegisterUser(){
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
            }else if(this.captcha == ""){
                this.$message({
                    message:'请输入验证码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else if(this.password.length<6 || this.password.length>20){
                this.$message({
                    message:'请设置6-20位英文与数字的密码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else{
                axios({
                    url:this.API+'/user/reg/phone',
                    method:'post',
                    data:{
                        phone:this.phone,
                        captcha:this.captcha,
                        password:this.password
                    },
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.active = this.active+1
                        if (this.active > 2) this.active = 0;
                        this.firstStep = !this.firstStep;
                        // this.sconedStep = !this.sconedStep;
                        this.showline1 = this.sconedStep;
                        this.showBall = this.firstStep;
                        this.showBall1 = this.sconedStep;
                        this.showBall2 = this.thirStep;
                        this.retoken = response.data.data;
                        console.log( this.retoken);
                        this.phone = response.data.data.phone
                        this.password = response.data.data.password
                        // this.sconedStep = !this.sconedStep;
                        localStorage.setItem('token',this.retoken)
                    }else{
                        // console.log(response.data.msg);
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })

                    }
                    
                }).catch((error)=>{
                    console.log(error);
                })}
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
            }else{
                this.btnText = '发送中'
                this.disabled = true;
                this.isActive = true;
                this.noActive = false;
                //发送请求
                axios({
                    url:this.API+'/user/reg/sms',
                    method:'post',
                    withCredentials: true,
                    data:{
                        phone:this.phone,
                    },
                    withCredentials : true
                    // headers: {
                    //     'auth-key': localStorage.getItem('token')
                    // }
                }).then(response=>{
                    if(response.data.code==200){
                        this.time = 60;
                        this.timer();
                        // console.log('验证码正确')
                    }else{
                        this.btnText = '获取验证码'
                        this.disabled = false;
                        this.isActive = false;
                        this.noActive = true;
                        this.$message({
                            
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch(err=>{
                    console.log(err)
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

        //设置账号类型，第二步(个人)
        RegisterSetType(){
            var regtel =/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            var realName = /^[\u4e00-\u9fa5]+$/
            var ID_CODE_LEN = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
            if(this.nickname.length < 2 || this.nickname.length > 10 || !regtel.test(this.nickname)){
                this.$message({
                    message:'用户名应由为2-10英文、数字、中文组合',
                    type:'error',
                    center:true,
                    customClass:'user-defind-style'
                })
            }else if(this.real_name==""){
                this.$message({
                    message:'请输入真实姓名',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else if(!realName.test(this.real_name) ||this.real_name.length < 2 || this.real_name.length > 6){
                this.$message({
                    message:'请输入2-6个中文',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else if(this.id_code==""){
                this.$message({
                    message:'请输入身份证号',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                
            }else if(this.id_code.length < 18 || this.id_code.length > 18 || !ID_CODE_LEN.test(this.id_code)){
                this.$message({
                    message:'请输入正确的身份证号码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                    })
            }else if(this.imageUrl_front == '' || this.imageUrl_back ==''){
                this.$message({
                    message:'请上传身份证正面/反面照片',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                    })
                
            }
            else
            this.finalyloading = true
            axios({
                url:this.API+'/user/reg/setInfo',
                method:'post',
                data:{
                    type:1,
                    nickname:this.nickname,
                    real_name:this.real_name,
                    id_code:this.id_code,
                    id_up:this.id_up,
                    id_down:this.id_down,
                    business:this.id,
                    phone:this.phone,
                    password:this.password,
                    company_name:this.company_name,
                    company_code:this.company_code
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                this.finalyloading = false
                console.log(response);
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
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

        //设置公司类型，第二步（公司）
        RegisterSetComType(){
            var regtel =/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            var realName = /^[\u4e00-\u9fa5]+$/;
            var COMPANY_NAME = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
            var _CODE = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g; 
            if(!regtel.test(this.nickname) || this.nickname.length < 2 || this.nickname.length > 10){
                this.$message({
                    message:'用户名应由2-10位英文与数字组成',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'})
            }else if(this.company_name == ''){
                this.$message({
                    message:'请输入公司名称',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'})
            }else if(!COMPANY_NAME.test(this.company_name)){
                this.$message({
                    message:'请输入正确的公司名称',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'})
            }else if(this.company_code == ''){
                this.$message({
                    message:'请输入统一社会信用代码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'})
            }else if(!_CODE.test(this.company_code)){
                this.$message({
                    message:'请输入正确的统一社会信用代码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'})
            }
            else
            this.endLoading = true
            axios({
                url:this.API+'/user/reg/setInfo',
                method:'post',
                data:{
                    type:2,
                    company_name:this.company_name,
                    company_code:this.company_code,
                    business:this.id,
                    phone:this.phone,
                    password:this.password,
                    nickname:this.nickname
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response)
                if(response.data.code==200){
                    this.endLoading = false
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
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
                console.log(err)
            })
        },
        //获取七牛云的token
        qiniuToken(){
            axios({
                url:this.API+'/system/upload/getQnToken',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                this.qiniuData ={
                    token: response.data.data
                };

                console.log(response.data.data);
            }).catch(err=>{
                console.log(err);
            })
        },
        //表单验证
        checkForm(){
            let isOK = true;
            var regtel =/^1[345789]{1}\d{9}$/;
            if(this.phone==""){
                 this.$message({
                    message:'请填写手机号',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                // return;
            }else if(!regtel.test(this.phone)){
                this.$message({
                    message:'请填写正确的手机格式',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            if(this.captcha == ""){
                this.$message({
                    message:'验证码不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }
            if(this.password.length<6){
                this.$message({
                    message:'密码不能小于6位',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                isOK = false;
            }
            if(this.phone.length<11){
                this.$message({
                    message:'请输入手机号',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                isOK = false;
            }
            
            
            return isOK;
        },
        handleClick(tab,event){
            //console.log(tab,event);
        },
        //显示与隐藏
        twonext:function(){
            if(this.type ==''){
                this.$message({
                    message:'请选择注册类型',
                    type:'error',
                    center:true,
                    customClass:'user-defind-style'
                })
                return
            }else
            this.active = this.active+1
            if (this.active > 2) this.active = 0;
            console.log(this.active)
            if(this.active == 2){
                this.showBall1 = false;
                this.showBall2 = true;
                this.showline2 = true
            }
            if(this.type=="个人"){
                 this.sconedStep = !this.sconedStep;
                 this.thirStep = !this.firstStep;
            }else{
                this.companystep = true;
                this.sconedStep = !this.sconedStep;
            }
           
        },
        //检查注册类型
        // registerType(){
        //     if(this.type == '个人'){
        //         this.isChecked = true
        //     }
        // },
        companyStep:function(){

        },
        handlepreStep:function(){
            this.active = this.active - 1;
            console.log(this.active)
             if (this.active > 2) this.active = 0;
             this.showBall = true;
             this.showBall1 = false;
             this.showline1 = false;
            // this.sconedStep = !this.sconedStep;
            this.firstStep = true
            this.thirStep =false;
        },
         handlepreStep2:function(){
             this.active = this.active - 1
            console.log(this.active)
             if (this.active > 2) this.active = 0;
            this.sconedStep = !this.sconedStep;
            this.showBall1 = true;
            this.showBall2 = false;
            this.showline2 = false;
            this.thirStep =false;
            this.companystep = false
        },
        //上传营业执照
        httpRequest (options) {
            let file = options.file
            if (file) {
                this.fileReader.readAsDataURL(file)
            }
            this.fileReader.onload = () => {
                let base64Str = this.fileReader.result
                let config = {
                    url: this.API+'/system/upload/qiniu',
                    method: 'post',
                    data: {
                        file: base64Str,
                        type: "4",
                        name:"file"
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    timeout: 10000,
                    onUploadProgress: function (progressEvent) {
                        progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
                        options.onProgress(progressEvent, file)
                    },
                }
                this.companyLoading = true
                axios(config)
                .then(res => {
                    if(res.data.code == 1){
                    this.companyLoading = false
                    this.BusCliImg = require("../assets/image/组 116.png") 
                    this.imageUrl = base64Str;
                    this.id = res.data.data.id;
                    console.log('我是id啊'+this.id)
                    options.onSuccess(res, file)
                    
                    }
                   
                })
                .catch(err => {
                    options.onError(err)
                })
            }
        },
        removeHandler (file, fileList) {
        },
        beforeUpload (file) {
            const isLt5M = file.size < 5 * 1024 * 1024
            // if (this.fileList.length >= 1) {
            //     alert('At most 1 files')
            //     return false
            // }
            if (!isLt5M) {
                alert('The max size is 5MB')
                return false
            }
        },
        uploadSuccess (res, file, fileList) {
            let data = res.data
            console.log('upload result:', res, file)
            file.key = data.key
            this.fileList.push(data.key)
        },
        //两张图片上传，身份证正面
        httpRequest2 (options) {
            let file = options.file
            if (file) {
                this.fileReader.readAsDataURL(file)
            }
            this.fileReader.onload = () => {
                let base64Str = this.fileReader.result
                let config = {
                    // url: 'https://api.soundmcn.heard-gl.com/system/upload/qiniu',
                    url:this.API+'/system/upload/qiniu',
                    method: 'post',
                    data: {
                        file: base64Str,
                        type: "2",
                        name:"file"
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    timeout: 10000,
                    onUploadProgress: function (progressEvent) {
                        progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
                        options.onProgress(progressEvent, file)
                    },
                }
                this.nomLoadingfront = true
                axios(config)
                .then(res => {
                    this.nomLoadingfront = false
                    console.log(res);
                    this.frontImg = require("../assets/image/组 118.png")
                    this.imageUrl_front = base64Str;
                    this.id_up = res.data.data.id;
                    console.log(this.id);
                    options.onSuccess(res, file)
                })
                .catch(err => {
                    options.onError(err)
                })
            }
        },
        removeHandler2 (file, fileList) {
        },
        beforeUpload2 (file) {
            const isLt5M = file.size < 5 * 1024 * 1024
            // if (this.fileList.length >= 1) {
            //     alert('At most 1 files')
            //     return false
            // }
            if (!isLt5M) {
                alert('The max size is 5MB')
                return false
            }
        },
        uploadSuccess2 (res, file, fileList) {
            let data = res.data
            console.log('upload result:', res, file)
            file.key = data.key
            this.fileList.push(data.key)
        },

        //第三张图，身份证反面
         httpRequest3 (options) {
            let file = options.file
            if (file) {
                this.fileReader.readAsDataURL(file)
            }
            this.fileReader.onload = () => {
                let base64Str = this.fileReader.result
                let config = {
                    url: this.API+'/system/upload/qiniu',
                    method: 'post',
                    data: {
                        file: base64Str,
                        type: "3",
                        name:"file"
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    timeout: 10000,
                    onUploadProgress: function (progressEvent) {
                        progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
                        options.onProgress(progressEvent, file)
                    },
                }
                this.nomLoadingback = true
                axios(config)
                .then(res => {
                    this.nomLoadingback = false
                    console.log(res);
                    this.bcakImg = require("../assets/image/组 119.png")
                    this.imageUrl_back = base64Str;
                    this.id_down = res.data.data.id;
                    console.log(this.id);
                    options.onSuccess(res, file)
                })
                .catch(err => {
                    options.onError(err)
                })
            }
        },
        removeHandler3 (file, fileList) {
        },
        beforeUpload3 (file) {
            const isLt5M = file.size < 5 * 1024 * 1024
            // if (this.fileList.length >= 1) {
            //     alert('At most 1 files')
            //     return false
            // }
            if (!isLt5M) {
                alert('The max size is 5MB')
                return false
            }
        },
        uploadSuccess3 (res, file, fileList) {
            let data = res.data
            console.log('upload result:', res, file)
            file.key = data.key
            this.fileList.push(data.key)
        },
        goHome(){
            this.$router.push('/')
        }


    },

    mounted () {
        if (!window.FileReader) {
        console.error('Your browser does not support FileReader API!')
        }
        this.fileReader = new FileReader()
    }
}
</script>
<style>
/* 2019.1.25 注册页上传提醒样式修改 */
.loading{
    position: absolute;
    height: 126px;
    width: 128px;
    /* background-color: #ccc; */
    margin-top: -1px;
    margin-left: -82px;
    border-radius: 10px;
}
.loadingFront,.loadingBack{
    height: 90px;
    width: 128px;
    background-color: #ccc;
    position: absolute;
    border-radius: 10px;
}
.loadingFront .el-loading-spinner,.loadingBack .el-loading-spinner{
    top: 25%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
}
.loadingBack{
    margin-left: 158px;
}
.uploadHint{
    width: 305px;
    height: 53px;
    padding: 22px 17px;
    background-color: #fafafa;
    margin: 0 auto;
    text-align: left;
    line-height: 22px;
    font-size: 14px;
    color: #8D8E8F;
    border-radius: 2px;
}
/* 步骤条 */
.step-modletwo{
    transition: all .5s ease;
    /* transition-delay: .5s */
}
.mybox2-leave-active,.mybox2-enter{
    width:0px !important;
}
.mybox2-leave,.mybox2-enter-active{
    width:141px;
}
.step-modle-one,.step-modle-two{
    transition: all .5s ease;
}
.mybox-leave-active,.mybox-enter{
    width:0px !important;
}
.mybox-leave,.mybox-enter-active{
    width:141px;
}
.step-modle-one{
    width: 141px;
    height: 2px;
    background-color: #07c160;
    position: absolute;
    margin: 12px 0 0 23px;
}
.step-modle-two{
    width: 142px;
    height: 2px;
    background-color: #07c160;
    position: absolute;
    margin: 12px 0 0 164px;
}
.step-modleone{
    width: 141px;
    height: 2px;
    background-color: #fff;
    position: absolute;
    border-bottom: 2px dashed #07c160; 
    margin-top: 10px;
    margin-left: 24px;
}
.step-modle{
    width: 282px;
    height: 2px;
    background-color: #fff;
    position: absolute;
    border-bottom: 2px dashed #ededed; 
    margin-top: 10px;
    margin-left: 24px;
}
.step-modletwo{
    width: 141px;
    height: 2px;
    /* background-color: #000; */
    position: absolute;
    border-bottom: 2px dashed #07c160; 
    margin-top: 10px;
    margin-left: 165px;
}
.register-box .returnBtn{
    border-radius: 2px;
    color:#9b9b9b;
    background: #fff;
    border: none;
    margin-bottom: 35px;
    border:1px solid #ededed
    /* margin-top: 10px */
}
.register-box .returnBtn:hover{
    background-color:#ededed;
    color: #9b9b9b;
    border-radius: 2px;
    border:1px solid #ededed

}
.register-box .returnBtn1{
    border-radius: 2px;
    color:#9b9b9b;
    background: #Fff;
    /* border: none;
     */
    border:1px solid #ededed;

    margin-bottom: 0px;
}
.register-box .returnBtn1:hover{
    border-radius: 2px;
    /* background-color:#18C26A; */
    border:1px solid #ededed;
    color: #9b9b9b;
    background-color: #ededed;
}
.register-box .el-input__inner {
    width: 336px;
    /* background-color: #f4f4f4; */
    border-radius: 2px;
    color: #000;
    border:1px solid rgba(220,220,220,1);
}
.register-box .el-input__inner:focus{
    background-color: #fff;
}
/* .register-box .codebtn{margin-left:-4px;padding: 12px 10px;border:none;background:#2F5CED;color: #ffffff}
.register-box .codebtn:hover,.codebtn:focus{background:#2F5CED;color: #ffffff}
.register-box .codebtn2{margin-left:-4px;padding: 12px 10px;border:none;background:#666666 !important;color: #cccccc }
.register-box .codebtn2:hover{background:#666666 !important;color: #cccccc}
.register-box .codebtn2:focus{background:#666666 !important;color: #cccccc} */

.register-box .codesbtn {
    margin-left: -105px !important;
    background-color: #2f77ed !important;
    color: #fff !important;
    padding: 12px 12px !important;
    position: absolute;
    border-radius: 2px;
    border: 1px solid #2f77ed;

}
.register-box .codesbtn2 {
    margin-left: -105px !important;
    border: 1px solid #ccc;
    background-color: #cccccc !important;
    color: #999999 !important;
    padding: 12px  4px !important;
    position: absolute;
    border-radius: 2px;
}
.register-box .codesbtn:hover{background:#2d71e3 !important;color: #ffffff !important;padding: 12px 12px !important;}
.register-box .codesbtn:active{background:#2F5CED !important;color: #ffffff !important;padding: 12px 12px !important;}
.register-box .codesbtn2:hover{
    background:#cccccc !important;
    color: #999999 !important;
    padding: 12px  4px !important;
    border: 1px solid #ccc;    
    }
.register-box .codesbtn2:focus{background:#cccccc !important;color: #999999 !important;padding: 12px  12px !important;}
.register-box{
    position: relative;
    top: 100px;
    width:706px;
    /* left: 27%; */
    -webkit-border-radius:2px;
    border-radius: 2px;
    box-shadow: 0 0 20px #eaeaea;
    padding-bottom: 61px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box; 
    /* margin-bottom: 10%; */
    margin: auto

}
.register-box .el-tabs__item {
    height: 50px;
}
.register-box .re-progress{
    height: 66px;
    width: 338px;
    /* border: 1px #cccccc solid; */
    /* text-align: center; */
    padding-top: 22px;
    margin-bottom: -20px;
    margin-left: 185px;
}
.register-box .register_input{
    text-align: center;
}

.register-box .el-tabs__item:hover {
    color: #c6c6c6;
    cursor: pointer;
}
 .register-box .el-tabs__item.is-active {
    color: #000;
}
.register-box .login-top{
    text-align: center;
    margin-top:50px;
    margin-bottom: 16px;
}
.register-box .title{
    text-align: center;
    margin-bottom: 40px;
}
.register-box .agree{
    text-align: center;
    color: #c6c6c6;
    margin-bottom: 30px;
}
.register-box .agree a{
    color: #5BC29C
}
.register-box .upload-txt{
    margin-bottom:10px;
    margin-left: -256px;
}
.register-box .upload-txt span{
    font-size: 14px;
}
.register-box .upload-box{
   padding-left:26%;
}
.register-box .upload-box2{
    padding-left: 37.5%;
}

.register-box .upload-box .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-right: 30px;
    background: #F4F4F4;
    border-radius: 10px;
    margin-left:0px;
    height: 90px;
  }
  .register-box .upload-box2 .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-right: 20px;
    background: #F4F4F4;
    margin-left:-81px;
    width: 126px;
    height: 126px;
    border-radius: 6px;
  }
 .register-box .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .register-box .avatar-uploader-icon {
    font-size: 78px;
    color: #ffffff;
    width: 130px;
    height: 90px;
    line-height: 90px;
    border-radius: 5px;
    text-align: center;
  }
 .register-box .avatar {
    width: 128px;
    height: 128px;
    border-radius: 10px;
    display: block;
  }
  .register-box .avatar1{
    width: 128px;
    height: 90px;
    border-radius: 10px;
    display: block;
  }
 .register-box .hasan{
     margin-left:395px;
     margin-bottom: -29px;
     position: relative;
     z-index: 9999
     }
 .register-box .el-tabs__active-bar {
    background: #07c160
}
.register-box .coloractive{
    color: #18C26A;
    text-decoration: none
    }
.register-box .coloractive:hover{
    text-decoration: underline
}
.register-box .el-steps--horizontal {
    white-space: nowrap;
    margin-left:20px;
}
.register-box .el-step.is-horizontal .el-step__line {
    height: 3px;
    top: 8px;
    left: 0;
    right: 0;
    margin: 3.5px;
    /* background-color: #E5E5E5; */
    width: 140px;
    position: absolute;
    border-color: inherit;
    background-color: transparent;
}
.register-box .el-step__icon-inner {
    /* background-color: #2F5CED; */
    background-color: transparent;
    display: none;
}
.register-box .el-step__icon {
    width: 7px;
    height: 7px;
    background-color: #2F5CED;
}
.register-box .el-step__head.is-wait {
    /* color: #c0c4cc;
    border-color: #c0c4cc; */
    color: transparent;
    border-color: transparent;
}
.register-box .el-step__title.is-success {
    color: #303133;
    font-weight: 600;
}
.register-box .el-step__icon.is-text {
    border-radius: 50%;
    border: 4px solid;
    border-color: inherit; 
    background-color: #9b9b9b;
    /* background-color:transparent; */
}
.register-box .el-step__main {
    white-space: normal;
    text-align: left;
    margin-top: -50px;
    margin-left:-20px;
}
.register-box .el-step__title.is-process {
    font-weight: 600;
    /* color: #2F5CED; */
}
.register-box .el-step__title {
    font-size: 14px;
    line-height: 38px;
}
.register-box .el-button--primary {
    width: 336px;
    color: #fff;
    border-radius: 2px;
    background-color: #07c160!important;
    border-color: #07c160!important;
    margin-top: 0px;
}
.register-box .el-button--primary:hover{
    width: 336px;
    color: #fff;
    border-radius: 2px;
    background-color: #16b864 !important;
    border-color: #16b864 !important;
}
.el-button--primary:active{
    width: 336px;
    border-radius: 2px;
    background-color: #07c160!important;
    border-color: #07c160!important;
}
.register-box .el-step__head.is-process {
    /* color: #699cee  !important;
    border-color: #699cee  !important; */
    color: transparent;
    /* border-color: transparent; */
    border-color: #07c160
}
.register-box .el-step__head.is-success {
    color: transparent;
    border-color: #07c160;
    /* border-color: transparent; */
}
.register-box .el-checkbox__inner {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
}
.register-box .el-checkbox__inner::after {
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 10px;
    left: 6px;
    position: absolute;
    top: 2px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 5px;
}
.register-box .userlable{margin-left:-295px;}
.register-box .namelabel{margin-left: -283px;}
.register-box .numberlabel{margin-left: -269px;}
.register-box .blanklabel{margin-left: -220px;}
.register-box .backbtn{background: #F4F4F4;color:#cccccc;border:none }
.register-box .top-pic1{width:45px;height: 45px;position: absolute;top:0px;left: 90px;}
.top-pic1 img{
    border-top-right-radius: 10px;
}
.registerbg{
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background: url("../assets/image/bg2.png");
    background-size: 100% 100%;
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

.register-box .el-radio__input.is-checked .el-radio__inner {
    /* border-color: #2F5CED;
    background: #2F5CED;
    transform: rotate(45deg); */
    border:1px solid #ededed;
    background-color: #fff;
    width: 16px;
    height: 16px;
}
.el-radio__inner::after{
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: #07c160;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%) scale(0);
    transform: translate(-50%,-50%) scale(0);
    -webkit-transition: -webkit-transform .15s ease-in;
    transition: -webkit-transform .15s ease-in;
    transition: transform .15s ease-in;
    transition: transform .15s ease-in, -webkit-transform .15s ease-in;
    transition: transform .15s ease-in,-webkit-transform .15s ease-in;
}
.register-box .el-radio__inner:hover {
    border-color: #2F5CED;
}
.el-radio__input.is-checked+.el-radio__label{
    color: #07c160;
}
.register-box .el-radio__inner {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    background-color: #fff;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.register-box .el-radio__inner:hover {
    border: 1px solid #07c160;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    background-color: #fff;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.register-box .el-button+.el-button {
    margin-left: 30px;
}
/* .el-step__line {
    width: 140px;
    position: absolute;
    border-color: inherit;
    background-color: #E5E5E5;
} */
.el-step__line-inner{
    transition-delay: 0ms;
    border-width: 1px !important;
    width: 0% !important;
}
/* .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #e5e5e5;
    z-index: 1;
} */
.register-box .el-tabs__nav-scroll{
    width: 336px;
    margin-left: 185px;
}
.register-box .el-tabs__nav-wrap::after {
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
.register-box .el-input{
    margin-left: 0 !important
}
input:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}
.register-box .el-form-item__content {
    line-height: 40px !important;
    position: relative !important;
    font-size: 12px !important;
    margin-top: 10px !important;
}
.register-box .el-form-item{
    margin-bottom: 17px
}
.register-box .upload-2-txt{
    margin-bottom: 10px;
    margin-left: -280px;
}
.register-box .el-form-item__content .Txt{
    color: rgb(255, 110, 64);
    position: absolute;
    margin-top: -25px;
    margin-left: -149px;
} 
.register-box .txt-line{
    position: absolute;
    margin-top: 1px;
    margin-left: -172px;
    line-height: 16px;
    text-align: left;
    /* margin-bottom:  */
}
.finalyBtn{
    margin-top: 30px !important;
    color: #fff;
    background-color: #07c160!important;
    border-color: #07c160!important;
}
.finalyBtn-2{
    margin-top: 0px !important;
}
.txt-line-2{
    font-size: 14px;
    color: #8d8e8f;
}
.ball{
    width: 5px;
    height: 5px;
    position: absolute;
    background-color: #2e77ed;
    border:5px solid #c9dcfa;
    border-radius: 100%;
    opacity: .8;
    margin-left: 16.5px;
    margin-top: 5px;
    margin-bottom: 10px;
    transition: 0.15s ease-out;
}
.ball-1{
    width: 5px;
    height: 5px;
    position: absolute;
    background-color: #2e77ed;
    border:5px solid #c9dcfa;
    border-radius: 100%;
    opacity: .8;
    margin-left: 157.4px;
    margin-top: 5.5px;
    margin-bottom: 10px;
    transition: 0.15s ease-out;
    /* transform: translateX(142px) */
    
}
.ball-2{
    width: 5px;
    height: 5px;
    position: absolute;
    background-color: #2e77ed;
    border:5px solid #c9dcfa;
    border-radius: 100%;
    opacity: .8;
    /* margin-left: 17px; */
    margin-top: 5.5px;
    margin-bottom: 10px;
    /* transition: 0.15s ease-out; */
    margin-left: 299px;
    transition: 0.15s ease-out;
}
.stepline-1,.stepline-2{
    height: 3px;
    width: 141px;
    border: none;
    background-color: #699cee;
    position: absolute;
    margin-top: 11px;
    border: .2px solid #699cee;
    z-index: 99;
    /* transition: 0.15s ease-out; */
}
.stepline-1{
    
    margin-left: 24px;
    /* -webkit-transform: scaleX(.5); */
    /* transition-duration: .5s */
}
.stepline-2{
    margin-left: 164px;
    /* transition-duration: .5s; */
    /* transition: 0.15s ease-out; */
    transition-property:0px;


}
.register-box .el-radio__inner::after{
    /* width: 8px;
    height: 16px;
    border-color: #fff;
    border-style: solid;
    border-width: 0 3px 4px 0;
    -webkit-transform: rotate(45deg); */
        /* width: 4px; */
    /* height: 4px; */
    /* border-radius: 0%;
    background-color:transparent;
    position: absolute;
    left: 40%;
    top: 40%;
    -webkit-transform: translate(-50%,-50%) scale(0); */
    /* transform: translate(-50%,-50%) scale(0); */
    /* -webkit-transition: -webkit-transform .15s ease-in; */
    /* transition: -webkit-transform .15s ease-in; */
    /* transition: transform .15s ease-in; */
    /* transition: transform .15s ease-in, -webkit-transform .15s ease-in; */
    /* transition: transform .15s ease-in,-webkit-transform .15s ease-in; */
}
.avatar-uploader .el-upload{
    border-radius: 0px;
}
.register-box .youWannaIDo{
    position: absolute;
    width: 2px;
    height: 38px;
    background-color: #fff;
    margin-left: 415px;
    margin-top: 0px;
    z-index: 22;
    border-bottom: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
}
.hint-text{
    width: 302px;
    height: 47px;
    background-color: #fafafa;
    border-radius: 2px;
    color: #8d8e8f;
    margin: 0 auto;
    text-align: left;
    line-height: 20px;
    padding: 17px 20px;
    font-size: 14px;
    
}
.right-text{
    height: 72px;
    width: 145px;
    padding: 27px 20px;
    background-color: #fafafa;
    margin-left: 339px;
    border-radius: 2px;
    text-align: left;
    line-height: 20px
}
.register-box .el-loading-mask{
    border-radius: 10px
}
</style>


