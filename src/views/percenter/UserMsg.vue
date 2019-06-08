<template>
    <div  class="userinfo8">
        <div v-if='getuserinfo.user_type=="1"'>
            <el-form style="margin-top:30px;" class="userFrom">
                <el-form-item class="userType">
                    <label class="msglabel">用户类型</label>
                    <span>
                        <i class="iconfont icon-gou" style="color:#18C26A"></i>
                        个人</span>
                   <el-button @click="goTocompany" class="userbtn" type="text"><a class="setUserType">修改为公司</a></el-button>
                </el-form-item>
                <el-form-item class="userRelName">
                    <label class="msglabel">真实姓名</label>
                    <span>
                        <!-- <i class="iconfont icon-gou" style="color:#18C26A"></i> -->
                        {{getuserinfo.real_name}}</span>
                </el-form-item>
                <el-form-item class="userNo.">
                    <label class="msglabel">
                    身份证号</label>
                    <span>
                        <!-- <i class="iconfont icon-gou" style="color:#18C26A">&nbsp;</i> -->
                        {{getuserinfo.card}}</span>
                </el-form-item>
                <el-form-item class="userHoldPic">
                    <label class="piclabel" style="margin-left: 0px;">手持身份证照</label>
                    <div class="upload-box">
                        <div class="avatar-uploader" @click="Imgbig2">
                             <img :src="imageUrl_front" class="avatar">
                            <div class="top-pic2"><img src="../../assets/image/front_icon.png"/></div>
                        </div>
                       
                         <div class="avatar-uploader2" @click="Imgbig3">
                             <img :src="imageUrl_back" class="avatar">
                            <div class="top-pic2"><img src="../../assets/image/back_icon.png"/></div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item class="userStatus">
                    <label class="msgstatus">状态</label>
                    <i :class="audit_status==1? 'iconfont icon-cha': audit_status==0 ? 'iconfont icon-shalou1':'iconfont icon-gou'" :style="audit_status==1 || audit_status==0 ? 'color:red':'color:#18C26A' "></i>
                    <span :class="audit_status==1 || audit_status==0 ?'noered':'cregred'" > {{audit_status == 0 ? "审核中":((audit_status == 1) ? "未通过":"审核通过")}}</span>
                </el-form-item>
                <el-form-item v-if='getuserinfo.audit_status==1' class="showNoPass" style="">
                    <label class="notpass1">
                        <!-- <i class="iconfont icon-yuanyin" style="color:#18C26A">&nbsp;</i> -->
                        未通过的原因</label>
                    <span style="color:red;position:absolute;margin-top:10px;margin-left:-26px;">{{getuserinfo.note}}</span>
                </el-form-item>
                <el-form-item v-else></el-form-item>
                
            </el-form>    
            <div v-if="getuserinfo.audit_status==0">
                <el-button disabled="disabled" class="waitbtn">重新上传</el-button>
            </div>
            <div v-if='getuserinfo.audit_status==1' class="reLoadPhoto"><router-link to="/usersmsg"><el-button class="resetbtn">重新上传</el-button></router-link></div>
        </div>
        <!--公司-->
        <div v-if='getuserinfo.user_type=="2"'>
            <el-form style="margin-top:30px;">
                <el-form-item>
                    <label class="msglabel"> 
                        <!-- <i class="iconfont icon-gongsi" >&nbsp;</i> -->
                        公司名称</label>
                    <!-- <i class="iconfont icon-gou" style="color:#18C26A"></i> -->
                    <span>{{getuserinfo.company_name}}</span>
                </el-form-item>
                <el-form-item>
                    <label style="margin-top:-30px;position:absolute;color:#cccccc;">
                        <!-- <i class="iconfont icon-shehuixinyongdaima">&nbsp;</i> -->
                        统一社会信用代码</label>
                    <!-- <i class="iconfont icon-gou" style="color:#18C26A"></i> -->
                    <span style="margin-left:0px;">{{getuserinfo.business_license}}</span>
                </el-form-item>
                <el-form-item>
                    <label class="piclabel" style="margin-left: 1px;">
                        <!-- <i class="iconfont icon-yingyezhizhao">&nbsp;</i> -->
                    营业执照</label>
                    <div class="upload-box">
                        <div class="avatar-uploader-3" @click="Imgbig1()">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <div class="top-pic2"><img src="../../assets/image/Bus_icon.png"/></div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <label class="msgstatus">状态</label>
                    <i :class="audit_status==1 ?'iconfont icon-cha':audit_status==0 ?'iconfont icon-shalou1':'iconfont icon-gou'" :style="audit_status==1 || audit_status==0 ? 'color:red':'color:#18C26A' "></i>
                    <span :class="audit_status==1 || audit_status==0 ? 'noered':'cregred'" > {{audit_status == 0 ? "审核中":((audit_status == 1) ? "未通过":"审核通过")}}</span>
                </el-form-item>
                <el-form-item v-if="audit_status==1">
                    <label class="notpass">
                        未通过的原因</label>
                    <span style="color:red">{{getuserinfo.note}}</span>
                </el-form-item>
                <el-form-item v-else>
                   
                </el-form-item>
            </el-form>    
            <div v-if="getuserinfo.audit_status==0">
                <el-button disabled="disabled" class="waitbtn">重新上传</el-button>
            </div>
            <div v-if='getuserinfo.audit_status==1' style="margin-top:-20px;"><router-link to="/companymsg"><el-button class="resetbtn">重新上传</el-button></router-link></div>

        </div>
        <!--大图显示框-->
        <el-dialog :visible.sync="Imgbigbox1" width="30%" center>
            <img style="width:100%;height:100%;outline-width:0px;vertical-align:top;" :src="imageUrl" />
        </el-dialog>
        <el-dialog :visible.sync="Imgbigbox2" width="50%" center>
            <div><img style="width:100%;height:100%;outline-width:0px;vertical-align:top;" :src="imageUrl_front" /></div>
        </el-dialog>
        <el-dialog :visible.sync="Imgbigbox3" width="50%" center>
            <div><img style="width:100%;height:100%; outline-width:0px;vertical-align:top;" :src="imageUrl_back" /></div>
        </el-dialog>
        <!--个人转公司提醒-->
        <el-dialog title="提示" :visible.sync="noteVisiblebox" width="400px" center :close-on-click-modal="false">
            <div class="text-line-2"></div>
                <div style="text-align:center;height:70px;line-height:70px;">个人转企业是不可逆的</div>
                <span slot="footer" class="dialog-footer">
                    <router-link to="/companymsg"><el-button type="primary" class="personageToCompanyBtn">确 定</el-button></router-link>
                    <el-button @click="noteVisiblebox = false" class="deselectBtn">取 消</el-button>                  
                </span>
        </el-dialog>

    </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
export default {
    data(){
        return{
            noteVisiblebox:false,
            disabled:false,
            imageUrl:'',
            imageUrl_front: '',
            imageUrl_back:'',
            getuserinfo:{},
            fileList: [],
            actionUrl: this.API+'/system/upload/qiniu',
            fileReader: '',
            audit_status:'',
            Imgbigbox1:false,
            Imgbigbox2:false,
            Imgbigbox3:false,

        }
    },
     created(){
        this.getUserInfo();
    },
    methods:{
        //获取用户消息
        getUserInfo(){
            axios({
                url:this.API+'/user/user/getUserInfo',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log('23123123',response);
                this.getuserinfo = response.data.data;
                this.audit_status = response.data.data.audit_status;
                this.useraudit_status = localStorage.setItem('useraudit_status',this.audit_status);
                //console.log( this.audit_status);
                this.imageUrl = response.data.data.business_license_path;
                console.log(this.imageUrl)
                this.imageUrl_front = response.data.data.card_positive_path;
                this.imageUrl_back = response.data.data.card_reverse_path;
                
            }).catch(err=>{
                console.log(err);
            })
        },

        //点击查看大图
        Imgbig1(){
            this.Imgbigbox1 = true;
        },
        Imgbig2(){
            this.Imgbigbox2 = true;
        },
        Imgbig3(){
            this.Imgbigbox3 = true;
        },
        goTocompany(){
            this.noteVisiblebox = true;
        },
        //第一张图
        httpRequest2 (options) {
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
                axios(config)
                .then(res => {              
                        console.log(res);
                        this.imageUrl_front = base64Str;
                        this.id = res.data.data.id;
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
            if (this.fileList.length >= 3) {
                alert('最多只能上传3张')
                return false
            }
            if (!isLt5M) {
                alert('图片太大了')
                return false
            }
        },
        uploadSuccess2 (res, file, fileList) {
            let data = res.data
            console.log('upload result:', res, file)
            file.key = data.key
            this.fileList.push(data.key)
        },


        //第二张图
        httpRequest3 (options) {
            let file = options.file
            if (file) {
                this.fileReader.readAsDataURL(file)
            }
            this.fileReader.onload = () => {
                let base64Str = this.fileReader.result
                let config = {
                    url:this.API+'/system/upload/qiniu',
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
                axios(config)
                .then(res => {              
                        console.log(res);
                        this.imageUrl_back = base64Str;
                        this.id = res.data.data.id;
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
            if (this.fileList.length >= 3) {
                alert('最多只能上传3张')
                return false
            }
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


        //公司营业执照
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
                        type: "4",
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
                alert('最多只能上传3张')
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
<style>
.userinfo8{
    width:700px;
    /* height:500px; */
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
.userinfo8 .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    padding-left: 15px;
    margin-bottom: 30px;
    width: 312px;
    border-radius: 4px;
    /* border:1px solid; */
    border-color: #16b864;
    /* background-color: #f3f3f3; */
    margin-left: 28%;
    margin-top: 0px;
}
.userinfo8 .el-form-item__content:hover{
    border-color: #F3F3F3;
    /* background-color: #c9dcfa */
}
.userinfo8 .msglabel{
    padding-right:40px;
    color: #cccccc;
    position: absolute;
    margin-top:-35px;
    /* margin-left: 90px; */
}
.userinfo8 .userbtn{
    color: #18C26A;
    margin-left:20px;
}
.userinfo8 .el-form-item {
    margin-bottom: 0px;
}
.userinfo8 .piclabel{
    margin-left:-40px;
    margin-top: -35px;
    color: #cccccc;
    float: left;
}
.userinfo8 .avatar-uploader  {
    /* border: 1px solid #d9d9d9; */
    border-radius: 0px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-top:15px;
    margin-left:-85px;
    /* margin-bottom: 15px; */
  }
  .userinfo8 .avatar-uploader2{
    border-radius: 0px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-top:15px;
    margin-left:30px;
    /* margin-bottom: 15px; */
  }
 .userinfo8 .avatar-uploader-3{
    border-radius: 0px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-top:15px;
    margin-left:-55px;
  }
 /* .userinfo8 .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  } */
 .userinfo8 .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130x;
    line-height: 130px;
    text-align: center;
  }
 .userinfo8 .avatar {
    width: 130px;
    height: 130px;
    display: block;
    border:1px #eaeaea solid;
  }
 .userinfo8 .msgstatus{
    padding-right: 45px;
    color: #cccccc;
    margin-left: 24px;
    position: absolute;
    margin-top: -30px;
    margin-left: 0px;
  }
.userinfo8 .notpass{
    padding-right:40px;
    color: #cccccc;
    position: absolute;
    /* margin-left: -30px; */
    margin-top: -30px
  }
  .userinfo8 .notpass1{
    padding-right:40px;
    color: #cccccc;
    position: absolute;
    margin-left: -28px;
    margin-top: -14px
  }
 .userinfo8 .resetbtn{
    /* margin-top:20px; */
    margin-left:210px;
    background-color: #18C26A;
    color: #ffffff;
    width:15%;
    height:35px;
    line-height:10px;
  }
.userinfo8 .resetbtn:focus,.userinfo8 .resetbtn:hover{
    border-color: #16b864;
    /* margin-top:20px; */
    /* margin-left:210px; */
    color: #ffffff;
    width:15%;
    height:35px;
    line-height:10px;
}
.userinfo8 .waitbtn{
    margin-top:-50px;
    margin-left:210px;
    margin-bottom: 30px;
    background-color: #ffffff;
    color: #cccccc;
    width:140px;
    height:35px;
    line-height:10px;
    position: absolute;
  }
  .userinfo8 .el-upload-list__item {
    display: none;
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
  .userinfo8 .reupload .el-upload {
    display: block !important;
    text-align: left !important;
    cursor: pointer !important;
    outline: 0 !important;
}
.userinfo8 .top-pic2{width:45px;height: 45px;position: absolute;top:0px;left: 92px;}
.userinfo8 .noered{
    color: red;
}
.userinfo8 .cregred{
    color: #18C26A;
}
.userinfo8 .el-dialog__header {
    /* margin:; */
    padding: 30px 20px 10px !important;
}
.userinfo8 .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 0px 0px 0px !important;
}
.userinfo8 .el-dialog__body {
    padding: 0px 0px !important;
    color: #606266;
    font-size: 14px;
}
.text-line-2{
    width: 356px;
    height: 1px;
    background-color: #dcdcdc;
    margin-left: 22px;
    margin-bottom: 0;
    margin-top: 20px;
}
.el-dialog__headerbtn{
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    margin-top: -10px;
    font-size: 16px;
    /* margin-right: -19px; */
}
.setUserType:hover{
    text-decoration: underline
}
/* JLX */
.personageToCompanyBtn{
    width: 100px;
    border-color: #18C26A;
    color: #fff;
    font-size: 14px;
    background-color: #18C26A;
    height: 40px;
}
.personageToCompanyBtn:hover{
    background-color: #16b864;
    border-color: #16b864;
}
.deselectBtn{
    width: 100px;
    margin-left: 25px;
    background-color: #F3F3F3;
    color: #afafaf;
    border: none
}
.deselectBtn:hover{
    background-color: #18C26A;
    color: #fff;
    border: none
}
.showNoPass{
    margin-top: -30px;
    margin-left: 40px;
}
.reLoadPhoto{
    margin-top: 25px;
    margin-left: 0px;
    margin-bottom: 60px;
}
</style>


