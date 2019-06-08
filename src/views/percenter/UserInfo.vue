<template>
    <div>
        <div class="userinfo7">
            <el-form>
                <el-form-item style="line-height: 30px;">
                    <div class="avatar-top">
                        <div v-if="imageUrl==null" class="avatar-uploaderinfo22">
                            <img src="../../assets/image/moren.png" class="avatar">
                        </div> 
                        <el-upload
                            v-else
                            class="avatar-uploaderinfo"
                            ref="upload" 
                            accept="image/jpeg,image/gif,image/png"
                            :action="actionUrl"
                            :on-success="uploadSuccess"
                            :before-upload="beforeUpload"
                            :on-remove="removeHandler"
                            :http-request="httpRequest">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <el-button type="text" v-else class="avatar-uploader-iconlogo" style="color:#18C26A;font-size:14px;"></el-button>
                        </el-upload> 
                        <div class="relogoupload">
                            <el-upload
                                accept="image/jpeg,image/gif,image/png"
                                :action="actionUrl"
                                :on-success="uploadSuccess"
                                :before-upload="beforeUpload"
                                :on-remove="removeHandler"
                                :http-request="httpRequest">
                                <!-- <i class=" avatar-uploader-icon">重新上传</i> -->
                                <el-button type="text" class="usersinfobtnpic">
                                    <!-- <i class="iconfont  icon-xiugaitouxiang">&nbsp;</i> -->
                                    <a class="txtActive">修改头像</a></el-button>
                            </el-upload>
                        </div>
                    </div>
                    <div class="text-line-3"></div>
                </el-form-item>
                <div class="userbox">
                    <el-form-item style="line-height: 30px;" class="userInfo-form">
                        <!-- <i class="iconfont icon-icon_zhanghao"></i> -->
                        <label class="labelbox">
                            <!-- <i class="iconfont icon-icon_zhanghao">&nbsp;</i> -->
                            用户名</label>
                        <div class="userspan">{{userInfo.nickname}}</div>
                        <div @click="usereditDialogVisible=true" class="usersinfobtn" type="text">
                            <!-- <i class="iconfont icon-xiugai">&nbsp;</i> -->
                            <a class="txtActive">修改</a></div>
                    </el-form-item>
                    <el-form-item>
                        <label class="labelbox">
                            <!-- <i class="iconfont icon-iconfontshouji">&nbsp;</i> -->
                        手机号</label>
                        <div class="userspan-1" >{{userInfo.phone}}</div>
                        <div @click="teleditDialogVisible=true" class="usersinfobtn" type="text">
                            <!-- <i class="iconfont icon-xiugai">&nbsp;</i> -->
                            <a class="txtActive">换绑</a></div>
                    </el-form-item>
                    <el-form-item v-if="userInfo.email==null">
                        <label class="labelbox"  style="padding-right:27px;">
                            <!-- <i class="iconfont icon-youxiang1">&nbsp;</i> -->
                            邮箱</label>
                        <div @click="emailDialogVisible=true" class="usersinfobtn" type="text"><a  class="txtActive">立即绑定</a></div>
                    </el-form-item>
                     <el-form-item v-else>
                        <label class="labelbox">
                            <!-- <i class="iconfont icon-youxiang1">&nbsp;</i> -->
                        邮箱</label>
                        <div class="userspan-2" style="padding-left:32px;">{{userInfo.email}}</div>
                        <div @click="changeemail=true" class="usersinfobtn" type="text">
                            <!-- <i class="iconfont icon-xiugai"></i> -->
                            <a class="txtActive">换绑</a></div>
                    </el-form-item>
                    <el-form-item v-if="notbindingwe">
                        <label class="labelbox" style="padding-right:27px;">
                            <!-- <i class="iconfont icon-weixin1">&nbsp;</i> -->
                            微信</label>
                        <div @click="wechatDialogVisible=true" class="usersinfobtn" type="text"><a class="txtActive">立即绑定</a></div>
                    </el-form-item>
                    <el-form-item v-else>
                        <label class="labelbox">
                            <!-- <i class="iconfont icon-weixin1">&nbsp;</i> -->
                            微信</label>
                        <div class="userspan" style="padding-left:36px;"></div>
                        <div @click="wechatDialogVisible=true" class="usersinfobtn" type="text">
                            <!-- <i class="iconfont icon-xiugai"></i> -->
                            <a class="txtActive">换绑</a></div>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <!--修改用户名弹框-->
        <el-dialog class="" width="688px" title="修改用户名" :visible.sync="usereditDialogVisible" center :close-on-click-modal="false">
            <div class="text-line"></div>
            <el-form class="userform">
                <el-form-item class="editInfo"> 
                    <el-input class="user-form-input-1" v-model="nickname" placeholder="请输入新用户名" style="width:50.5%"></el-input>  
                </el-form-item>
            </el-form>
            <div class="userbtn3">
                <el-button @click="NickNameedit" class="successinfobtn">确认</el-button>
                <el-button class="backbtn" @click="usereditDialogVisible=false">返回</el-button>
            </div>
        </el-dialog>
        <!--绑定邮箱邮箱-->
        <el-dialog width="688px" title="绑定邮箱" :visible.sync="emailDialogVisible" center :close-on-click-modal="false">
            <div class="text-line"></div>
            <el-form class="userform">
                <el-form-item class="editEmail"> 
                    <!-- <el-input class="user-form-input" v-model="email" type="email"  :fetch-suggestions="appendEmailSuffix" :trigger-on-focus="false" placeholder="请输入新邮箱" style="width:50.5%"></el-input>   -->
                    <el-autocomplete
                        class="user-form-inputemail2"
                        v-model="email"
                        :fetch-suggestions="appendEmailSuffix"
                        :trigger-on-focus="false"
                        placeholder="请输入新邮箱"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item class="sendEmail">
                    <el-input class="user-form-input" v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:35%"></el-input>
                    <el-button @click="sendEmail" style="width:16%" v-bind:class="{ isemailcodesbtnone: isActiveemailone, noemailcodesbtnone: noActiveemailone }"  :disabled="disemailone"><span>{{btnText}}</span></el-button>
                </el-form-item>
            </el-form>
            <div class="userbtn3">
                <el-button @click="BandEmail"  class="successinfobtn">绑定</el-button>
                <el-button class="backbtn"  @click="emailDialogVisible=false">返回</el-button>
            </div>
        </el-dialog>
        <!--换绑邮箱-->
        <el-dialog width="688px" title="换绑邮箱验证" :visible.sync="changeemail" center :close-on-click-modal="false">
            <div class="text-line"></div>
            <el-form class="userform">
                <el-form-item class="bindEmail"> 
                    <!-- <el-input class="user-form-inputemail" v-model="email" placeholder="请输入原邮箱" style="width:50.5%;color:#cccccc"></el-input>   -->
                     <label class="numbertag">您绑定的邮箱为<span style="color:#18C26A">{{email}}</span></label>
                </el-form-item>
                <el-form-item>
                    <el-input class="user-form-input" v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:35%"></el-input>
                    <el-button @click="sendEmailVali" style="width:16%" v-bind:class="{ isemailcodesbtnone: isActiveemailone, noemailcodesbtnone: noActiveemailone }"  :disabled="disemailone"><span>{{btnText}}</span></el-button>
                </el-form-item>
            </el-form>
            <div class="userbtn3">
                <el-button @click="reEmail" class="successinfobtn">下一步</el-button>
                <el-button class="backbtn" @click="changeemail=false">返回</el-button>
            </div>
        </el-dialog>
        <!--换绑邮箱的第二步-->
        <el-dialog  width="688px" title="新换绑邮箱" :visible.sync="changeemail2" center :close-on-click-modal="false">
            <div class="text-line"></div>

            <el-form class="userform">
                <el-form-item> 
                    <!-- <el-input class="user-form-input" v-model="new_email" autocomplete="on" placeholder="请输入新邮箱" style="width:50.5%"></el-input>   -->
                    <el-autocomplete
                        class="user-form-inputemail2"
                        v-model="new_email"
                        :fetch-suggestions="appendEmailSuffix"
                        :trigger-on-focus="false"
                        placeholder="请输入新邮箱"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-input class="user-form-input" v-model="newcaptcha" title="" type="text" placeholder="请输入验证码" style="width:35%"></el-input>
                    <el-button @click="sendEmail2" style="width:16%" v-bind:class="{ isemailcodesbtntwo: isActiveemailtwo, noemailcodesbtntwo: noActiveemailtwo }" :disabled="disemailtwo"><span>{{btnText}}</span></el-button>
                </el-form-item>
            </el-form>
            <div class="userbtn3">
                <el-button @click="reSconEmail" class="successinfobtn">绑定</el-button>
                <el-button class="backbtn" @click="changeemail2=false">返回</el-button>
            </div>
        </el-dialog>
        
        <!--换绑微信-->
        <el-dialog width="443px" class="wechatbox" title="换绑微信" :visible.sync="wechatDialogVisible" center :close-on-click-modal="false">
            <div class="text-line-1"></div>
            <div class="wechatpic">
                <img src="https://git.heard-gl.com/avatars/10?s=290"/>
                <p>使用微信扫描二维码，同意授权后即可绑定</p>
            </div>
        </el-dialog>
        <!--换绑手机号-->
         <el-dialog width="688px" title="换绑手机号" :visible.sync="teleditDialogVisible" center :close-on-click-modal="false">
            <div class="text-line"></div>
            <el-form class="userform2">
                <el-form-item> 
                    <label class="numbertag">您之前绑定的手机号为<span style="color:#18C26A">{{userInfo.phone}}</span></label>
                    <el-button type="text" class="numberbtn"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="Telcaptcha"  class="codeinput" title="" placeholder="请输入验证码" style="width:34%"  required></el-input>
                    <!-- <el-button @click="codeTelBtn" style="width:16%;margin:0 -47px 0 0;"  v-bind:class="{ isemailcodesbtnone: isActiveemailone, noemailcodesbtnone: noActiveemailone }" :disabled="disemailone"><span>{{btnText}}</span></el-button> -->
                    <el-button @click="codeTelBtn" style="width:16%;margin:0 -47px 0 0;"  v-bind:class="{ isTelcodesbtnone: isActiveemailone, noTelcodesbtnone: noActiveemailone }" :disabled="disemailone"><span>{{phoneBtnText}}</span></el-button>
                </el-form-item>
            </el-form>
            <div class="userbtn3">
                <el-button class="successinfobtn" @click="rePhone">下一步</el-button>
                <el-button @click="teleditDialogVisible=false" class="backbtn-1">返回</el-button>
            </div>
        </el-dialog>
        <!--输入新的手机号-->
        <el-dialog width="688px" title="换绑手机号" :visible.sync="telnextVisible" center :close-on-click-modal="false">
            <div class="text-line"></div>
            
            <el-form class="userform2">
                <el-form-item> 
                   <el-input v-model="new_phone" placeholder="请输入新的手机号" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="new_phone_captcha" class="codeinput" title="" placeholder="请输入验证码" style="width:34%"  required></el-input>
                    <el-button @click="CodeNewTel" style="width:16%" v-bind:class="{ isemailcodesbtntwo: isActiveemailtwo, noemailcodesbtntwo: noActiveemailtwo }" :disabled="disemailtwo"><span>{{btnText}}</span></el-button>
                </el-form-item>
            </el-form>
            <div class="userbtn3">
                <el-button @click="setPhone" class="successinfobtn">确认</el-button>
                <el-button @click="telnextVisible=false" class="backbtn">返回</el-button>
            </div>
        </el-dialog>
        <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="用户信息" name="1">
    <div> <span>用户类型</span> <span>个人</span> <span>企业</span> </div>
    <div> <span>真实姓名</span><input type="text"> <span>身份证号码</span><input type="text"></div>
    <div> <span>身份证照</span></div>
    <div> <span>用户状态</span><span></span> </div>
  </el-collapse-item>

</el-collapse>
    </div>

</template>
<script>
import axios from 'axios';
export default {
    inject:['reload'],
    data(){
        return{
            imageUrl:'',
            fileList: [],
            actionUrl:this.API+'/system/upload/qiniu',
            fileReader: '',
            usereditDialogVisible:false,
            emailDialogVisible:false,
            changeemail:false,
            changeemail2:false,
            wechatDialogVisible:false,
            teleditDialogVisible:false,
            telnextVisible:false,
            notbinding:false,
            notbindingwe:true,
            nickname:'',
            userInfo:{},
            email:'',
            new_email:'',
            Telcaptcha:'',
            captcha:'',
            newcaptcha:'',
            new_phone_captcha:'',
            new_phone:'',
            disemailone:false,
            disemailtwo:false,
            disabled:false,
            phoneBtnText:'获取验证码',
            phoneSendbtnText:'发送验证码',
            btnText:'获取验证码',
            sendbtnText:'发送验证码',
            isActive: false,
            noActive: true,
            isActiveemailone:false,
            noActiveemailone:true,
            isActiveemailtwo:false,
            noActiveemailtwo:true,
            emailSuffix: [
                '@qq.com',
                '@163.com',
                '@126.com',
                '@gmail.com'
            ]
        }
    },
    created(){
        this.getSetUserInfo();
    },
    methods:{
        appendEmailSuffix (queryString, cb) {
            if (queryString.indexOf('@') !== -1) {
            return cb([])
            }
            let triggerList = []
            for (let i = 0; i < this.emailSuffix.length; i++) {
            triggerList.push({value: queryString + this.emailSuffix[i]})
            }
            cb(triggerList)
        },
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
                    // console.log(response.data.data);
                    if(response.data.code==200){
                        this.userInfo = response.data.data;
                        this.phone = response.data.data.phone;
                        console.log('1111',this.phone)
                        this.imageUrl = response.data.data.head_image;
                        this.email = response.data.data.email;
                        // console.log(this.imageUrl);
                        // if(this.imageUrl = null){
                        //     // this.imageUrl = require()
                        // }
                        localStorage.setItem('imageUrl',this.imageUrl)
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
        //修改用户名
        NickNameedit(){
            axios({
                url:this.API+'/user/bind/reName',
                method:'post',
                data:{
                    nickname:this.nickname,
                    type:4,
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
                    this.usereditDialogVisible=false;
                    this.reload()
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

        //换绑手机号验证码发送第一步
        codeTelBtn:function(){
            var regtel =/^1[34579]{1}\d{9}$/;
            if(this.phone==""){
                 this.$message({
                    message:'请填写手机号码',
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
            }else{
                //发送请求
                axios({
                    url:this.API+'/user/bind/sms',
                    method:'post',
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    data:{
                        phone : this.phone,
                        is_check:0
                    }
                }).then(response=>{
                    if(response.data.code==200){
                        console.log('success')
                        this.time = 60;
                        this.disemailone = true;
                        this.timer();
                    }else{
                        this.isActiveemailone = false;
                        this.noActiveemailone = true;
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
            
        },

        //验证手机号
        rePhone(){
            axios({
                url:this.API+'/user/bind/rePhone',
                method:'post',
                data:{
                    // phone:this.phone,
                    captcha:this.Telcaptcha,
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.telnextVisible=true,
                    this.teleditDialogVisible = false,
                    this.time = 0;
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
        

        //点击获取新号码的验证码
        CodeNewTel:function(){
            var regtel =/^1[34579]{1}\d{9}$/;
            if(this.new_phone==""){
                 this.$message({
                    message:'请填写手机号码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                 return;
            }else if(!regtel.test(this.new_phone)){
                this.$message({
                    message:'请填写正确的手机格式',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                //发送请求
                axios({
                    url:this.API+'/user/bind/sms',
                    method:'post',
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    data:{
                        phone:this.new_phone,
                         is_check:1
                    }
                }).then(response=>{
                    if(response.data.code==200){
                        //console.log('success')
                        this.times = 60;
                        this.disemailtwo = true;
                        this.timers();
                    }else{
                        this.times = 0;
                        this.isActiveemailtwo = false;
                        this.noActiveemailtwo = true;
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
        },
        //重新绑定手机号
        setPhone(){
            axios({
                url:this.API+'/user/bind/setPhone',
                method:'post',
                data:{
                    new_phone:this.new_phone,
                    captcha:this.new_phone_captcha,
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
                    this.telnextVisible=false;
                    this.times = 0;
                    this.reload();
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
        //绑定邮箱
        BandEmail(){
            axios({
                url:this.API+'/user/bind/email',
                method:'post',
                data:{
                    email:this.email,
                    type:2,
                    captcha:this.captcha
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                //console.log(response);
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    this.notbinding=false,
                    this.emailDialogVisible=false;
                    this.reload()
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

        //验证邮箱第一步
        reEmail(){
            axios({
                url:this.API+'/user/bind/reEmail',
                method:'post',
                data:{
                    // email:this.email,
                    captcha:this.captcha
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.changeemail = false;
                    this.changeemail2 = true;
                    this.time = 0;
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

        //换绑邮箱第二步
        reSconEmail(){
            axios({
                url:this.API+'/user/bind/setEmail',
                method:'post',
                data:{
                    new_email:this.new_email,
                    captcha:this.newcaptcha
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    this.changeemail2 = false;
                    this.reload();
                    this.times = 0;
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
        //第一次点击发送邮件,绑定邮箱
        sendEmail(){
            var regemai =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(this.email==""){
                 this.$message({
                    message:'邮箱不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else if(!regemai.test(this.email)){
                 this.$message({
                    message:'请填写正确的邮箱格式',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                this.btnText = '发送中'
                this.disemailone = true;
                this.isActiveemailone = true;
                this.noActiveemailone = false;
                axios({   
                    url:this.API+'/user/bind/sendEmail',
                    method:'post',
                    data:{
                        email:this.email,
                        is_check:1,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    //console.log(response);
                    if(response.data.code==200){
                        console.log('success')
                        this.time = 60;
                        this.timer();
                    }else{
                        this.btnText = '获取验证码'
                        this.disemailone = false;
                        this.isActiveemailone= false,
                        this.noActiveemailone = true
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
            
           
        },
        //验证邮箱
        sendEmailVali(){
            var regemai =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(this.email==""){
                 this.$message({
                    message:'邮箱不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else if(!regemai.test(this.email)){
                 this.$message({
                    message:'请填写正确的邮箱格式',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                this.btnText = '发送中'
                this.disemailone = true;
                this.isActiveemailone = true;
                this.noActiveemailone = false;
                axios({   
                    url:this.API+'/user/bind/sendEmail',
                    method:'post',
                    data:{
                        email:this.email,
                        is_check:0,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    if(response.data.code==200){
                        this.time = 60;
                        this.timer();
                    }else{
                        this.disemailone = false;
                        this.btnText = '获取验证码'
                        this.isActiveemailone= false,
                        this.noActiveemailone = true
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
            
           
        },
        sendEmail2(){
            var regemai =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(this.new_email==""){
                 this.$message({
                    message:'邮箱不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else if(!regemai.test(this.new_email)){
                 this.$message({
                    message:'请填写正确的邮箱格式',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                this.btnText = '发送中'
                this.disemailtwo = true;
                this.isActiveemailtwo = true;
                this.noActiveemailtwo = false;
                axios({   
                    url:this.API+'/user/bind/sendEmail',
                    method:'post',
                    data:{
                        email:this.new_email,
                        is_check:1
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    if(response.data.code==200){
                        this.times = 60;
                        this.timers();
                    }else{
                         this.disemailtwo = false;
                        this.btnText = '获取验证码'
                        this.isActiveemailtwo= false,
                        this.noActiveemailtwo = true
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
           
        },

        //绑定微信
        BandWechat(){

        },
         //第一次邮箱验证码倒计时60秒
        timer:function(){
            if(this.time>0){
                this.time--;
                this.btnText = this.time+"s后重新获取";
                this.isActiveemailone = true;
                this.noActiveemailone = false;
                setTimeout(this.timer,1000);
            }else{
                this.time = 0;
                this.btnText = '获取验证码';
                this.disemailone = false;
                this.isActiveemailone = false;
                this.noActiveemailone = true;
            }
        },
        //第二次倒计时60秒
        timers:function(){
            if(this.times>0){
                this.times--;
                // console.log(this.time);
                this.btnText = this.times+"s后重新获取";
                setTimeout(this.timers,1000);
                this.isActiveemailtwo = true;
                this.noActiveemailtwo = false;
            }else{
                this.times = 0;
                this.btnText = '获取验证码';
                 this.disemailtwo = false;
                this.isActiveemailtwo = false;
                this.noActiveemailtwo = true;
            }
        },

        //修改用户头像
        httpRequest (options) {
            let file = options.file
            // let filename = file.name
            if (file) {
                this.fileReader.readAsDataURL(file)
            }
            this.fileReader.onload = () => {
                let base64Str = this.fileReader.result
                //console.log(this.fileReader.result);
                let config = {
                    url:this.API+'/system/upload/qiniu',
                    method: 'post',
                    // file: file,
                    data: {
                        // file: base64Str.split(',')[1],
                        file: base64Str,
                        type: "1",
                        name:"file"
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    timeout: 10000,
                    onUploadProgress: function (progressEvent) {
                        // console.log(progressEvent)
                        progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
                        options.onProgress(progressEvent, file)
                    },
                }
                axios(config)
                .then(res => {
                    console.log(res);
                    this.imageUrl = base64Str;
                    this.id = res.data.data.id;
                    this.reload();
                    console.log(this.id);
                    options.onSuccess(res, file)
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
            if (this.fileList.length >= 3) {
                alert('At most 1 files')
                return false
            }
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
<style >
.userinfo7{
    width:1000px;
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
.userinfo7 .avatar-top {
    text-align: center;
    /* border-bottom: 1px solid #eaeaea; */
}
.userinfo7 .avatar-top img{
    width: 100px;
    height:100px;
    border-radius: 50%;
    /* background: #cccccc; */
    border:1px solid #eaeaea;
}
.userinfo7 .userbox{
    margin-top:60px;
    padding-left:227px;
    
}
.userinfo7 .labelbox{
    padding-right: 14px;
    color: #cccccc;
    float: left;
}
.userspan,.userspan-1,.userspan-2{
    padding-left:20px;
    float: left;
    width: 150px;
}
.userinfo7 .userbox .el-button--text {
    color: #18C26A;
    background: 0 0;
    padding-left: 13px;
    padding-right: 0;
}
.userinfo7 .usersinfobtn{
    margin-left:20px;
    float: left;
    color: #18C26A;
    cursor: pointer;
}
.userinfo7 .usersinfobtnpic{
    float: left;
    color: #18C26A;
    cursor: pointer;
}
.userinfo7 .el-dialog--center {
    text-align: center;
    border-radius: 5px;
}
.userinfo7 .el-dialog--center .el-dialog__header {
    /* border-bottom: 1px #cccccc solid; */
    margin-left: 40px;
    width: 86%;
    padding:30px 20px 0px !important;
}
.el-dialog__headerbtn{
    /* right: 0 !important; */
    top: 30px !important;
}
.userinfo7 .el-dialog__headerbtn .el-dialog__close {
    color: #909399;
    margin-right: 20px !important;
}
i{
    margin-right: 0 !important
}
.userinfo7 .userbtn2{
    text-align: center;

}
/* .el-dialog__close .el-icon .el-icon-close{
    margin-right:  0 !important
} */
.userform{
    text-align: center;
}
.user-form-input .el-input__inner {
    /* border: none !important; */
    background-color: #f4f4f4;
    background-image: none;
    border-radius: 4px;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 322px;
    margin-top: 15px;
    margin-left: -50px
}
.user-form-input .el-input__inner:focus{
    background: #fff;
    border-color: #dcdcdc;
}
.user-form-inputemail2 .el-input__inner{
    border-color:#dcdfe6 !important;
    background-color: #f4f4f4;
    background-image: none;
    border-radius: 4px;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 322px;
}
.user-form-inputemail2 .el-input__inner:focus{
    background-color: #fff;
    border-color: #dcdfe6 !important;

}
.userbtn3{
    text-align: center;
    padding-top:20px;
    padding-bottom: -15px;
}
.userbtn3 .successinfobtn{
    width:151px !important;
    background-color: #18C26A;
    color: #ffffff;
    border-color:#18C26A;
}
.userbtn3 .successinfobtn:hover{
    background-color: #16b864;
}
.userbtn3 .successinfobtn:focus{
    width: 151px;
    background-color: #18C26A;
    color: #ffffff;
    border-color:#18C26A;
}
.userbtn3 .backbtn{
    width: 151px !important;
    margin-left:20px;
    background-color: #F3F3F3;
    /* border: 1px solid #dcdfe6; */
    border: none;
    color: #acacac;
}
.backbtn-1{
    width: 151px !important;
    margin-left:10px;
    background-color: #F3F3F3;
    /* border: 1px solid #dcdfe6; */
    border: none;
    color: #acacac;
}
.backbtn-1:hover{
    background-color: #18C26A;
    color: #fff;
}
.userbtn3 .backbtn:hover,.userbtn3 .backbtn:focus{
    width:151px;
    margin-left:20px;
    /* border: 1px solid #dcdfe6; */
    background-color: #18C26A;
    border:none;
    color: #fff;
}
.el-dialog__header {
    padding:30px 20px 10px !important;
}
.wechatbox .el-dialog--center .el-dialog__header {
    /* border-bottom: 1px #cccccc solid; */
    margin-left: 40px;
    width: 76%;
    padding:30px 20px 0px !important;
}
.el-dialog--center .el-dialog__body{
    padding: 10px 25px 30px;
}
.wechatpic{
    text-align: center;
    padding-top:50px;
    padding-bottom: 4px;
}
.wechatpic img{
    width:200px;
    height:200px; 
}
.wechatpic p{
    font-size: 12px;
    color: #cccccc;
}
.numbertag{
    color: #cccccc;
    font-size: 16px;
}
.numberbtn{
    color: #000;
    font-size: 16px;
}

.userform2{
    text-align: center;
}
.userform2 .el-input__inner {
    margin: 0 -50px;
    border-radius: 4px;
    color: #606266;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 316px;
    background-color: #F4F4F4;
}
.userform2 .el-input__inner:focus{
    background-color: #fff;
    border-color: #dcdcdc;
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

.userinfo7 .el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: none !important;
}
.el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: none !important;
}
.userinfo7 .avatar-uploaderinfo22 {
    text-align: center;
}
.userinfo7 .avatar-uploaderinfo22 img {
    /* margin-left: 295px; */
}
.userinfo7 .avatar-uploaderinfo .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: -2px;
    margin-bottom: -20px;
    border: none !important;
    /* background-color: #F4F4F4; */
}
.userinfo7 .avatar-uploader-iconlogo{
    font-size: 16px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-radius: 50%;
    border:1px #eaeaea solid;
    margin-bottom: 20px;
    position: relative;
  }
.codesbtn {
    margin-left: -5px !important;
    background-color: #2F77ED !important;
    color: #fff !important;
    padding: 12px 12px !important;
}
.codesbtn:hover,.codesbtn:focus{background:#2d71e3 !important;color: #ffffff !important;padding: 12px 12px !important;}
.codesbtn2 {
    margin-left: -4px !important;
    background-color: #cccccc !important;
    color: #999999 !important;
    padding: 12px 4px !important;
}
.codesbtn2:hover,.codesbtn2:focus{background:#cccccc !important;color: #999999 !important;padding: 12px 4px !important;}
/*邮箱第一次验证*/
.noemailcodesbtnone,.noTelcodesbtnone{
    margin-left: -53px !important;
    background-color: #2F77ED !important;
    color: #fff !important;
    padding: 12px 12px !important;
    position: absolute;
    margin-top: 15px;
    height: 40px;
}
.noTelcodesbtnone:hover,.noemailcodesbtnone:hover{
    background:#2d71e3 !important;color: #ffffff !important;padding: 12px 12px !important;
}
.isemailcodesbtnone,.isTelcodesbtnone{
    margin-left: -52px !important;
    background-color: #cccccc !important;
    color: #999999 !important;
    padding: 12px 4px !important;
    position: absolute;
    margin-top: 15px;
    height: 40px;
}
.isemailcodesbtnone:focus,.isemailcodesbtnone:hover{
    background:#cccccc !important;color: #999999 !important;padding: 12px 4px !important;
}

/*邮箱第二次验证*/

.noemailcodesbtntwo{
    margin-left: -53px !important;
    background-color: #2F5CED !important;
    color: #fff !important;
    padding: 12px 12px !important;
    position: absolute;
    margin-top:15px;
}
.noemailcodesbtntwo:focus,.noemailcodesbtntwo:hover{
    background:#2F5CED !important;color: #ffffff !important;padding: 12px 12px !important;
}
.isemailcodesbtntwo{
    margin-left: -53px !important;
    background-color: #cccccc !important;
    color: #999999 !important;
    padding: 12px 4px !important;
    position: absolute;
     margin-top:15px;

}
.isemailcodesbtntwo:focus,.isemailcodesbtntwo:hover{
    background:#cccccc !important;color: #999999 !important;padding: 12px 4px !important;
}
.userinfo7 .el-form-item__content{
    line-height: 40px;
    position: relative;
    font-size: 14px;
    margin-top: 0px !important
}
.userinfo7 .el-autocomplete {
    position: relative;
    /* display: inline-block; */
    width: 100% !important;
    margin-left: 25% !important;
}
.text-line{
    background-color: #DADADA;
    margin:0 0 30px 0px;
    height: 1px;
    width: 640px;
}
.text-line-1{
    background-color: #dadada;
    margin-top: 15px;
    height: 1px;
    width: 396.68px;
    margin-left: 0px;
}
.el-input{
    margin-left: 0 !important
}
.user-form-input-1 .el-input__inner{
    margin: 0 -50px;
    border-radius: 4px;
    color: #606266;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 322px;
    background-color: #F4F4F4;  

}
.user-form-input-1 .el-input__inner:focus{
    background-color: #fff;
    border-color: #dcdcdc;
}
.text-line-3{
    width: 100%;
    height: 1px;
    background-color: #ccc;
}
.el-form-item{
    margin-bottom: 10px;
}
/* JLX */
.txtActive{
    color: #18C26A;
    text-decoration: none
}
.txtActive:hover{
    text-decoration: underline
}
.labelbox .icon-icon_zhanghao:before{
    margin-right: 0px;
}
</style>


