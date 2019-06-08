<template>
    <div  class="setUserInfo8"
        v-loading="loading4"
        element-loading-text="正在为您智能审核中，请稍等..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <div>
            <div class="authTitle">
            <div class="title-text">认证信息</div>
            </div>
            <div class="bage-line"></div>
            <div class="underline"></div>
            <el-row :gutter="20" class="type-1">
                <el-col :span="2"><div class="grid-content userTypes"><span> 用户类型</span></div></el-col>
                <el-col :span="3"><div class="grid-content nom">个人</div></el-col>
                <el-col :span="3"><div class="grid-content company"><div class="changeTypeBtn" @click="warningDialogVisible=true">转为企业</div></div></el-col>
            </el-row>
            <!-- 用户信息 -->
            <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content realName">真实姓名</div></el-col>
                <el-col :span="10">
                    <div class="grid-content realNameLable">
                        <el-input v-model="real_name" placeholder="填写真实姓名"></el-input>                    
                    </div>
                </el-col>
                <el-col :span="2"><div class="grid-content IDCard">身份证号</div></el-col>
                <el-col :span="10">
                    <div class="grid-content IDNumberLable">
                        <el-input v-model="id_code" placeholder="填写身份证号"></el-input>
                    </div></el-col>                    
            </el-row>
            <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content IDCardPhoto">身份证照</div></el-col>
                <el-col :span="5">
                    <!-- 正面照 -->
                    <div class="grid-content IDPhotoFace"
                        v-loading="loading"
                        element-loading-text="图片正在上传中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-upload 
                            type="file"
                            class="avatar-uploaderuser"
                            action="/api/system/upload/qiniu"
                            ref="frontPic"
                            style="position:absolute;"
                            :show-file-list="false"
                            :on-success="uploadSuccess2"
                            :before-upload="beforeUpload2"
                            :on-remove="removeHandler2"
                            :http-request="httpRequest2"
                            accept="image/jpeg,image/png"
                            >
                            <img v-if=" imageUrl_front" :src="imageUrl_front" class="avatarusers">
                            <img v-else src="../../assets/image/组 120.png" style="width:135px;height:90px;">
                            <div class="top-pic1"><img :src="frontImage"/></div>
                        </el-upload>
                    </div>
                </el-col>
                <el-col :span="5">
                    <!-- 反面 -->
                    <div class="grid-content IDPhotoBack"
                        v-loading="loading1"
                        element-loading-text="图片正在上传中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-upload 
                            class="avatar-uploaderuser"
                            action="/api/system/upload/qiniu"
                            ref="backPic"
                            :show-file-list="false"
                            :on-success="uploadSuccess3"
                            accept="image/jpeg,image/png"
                            :before-upload="beforeUpload3"
                            :on-remove="removeHandler3"
                            :http-request="httpRequest3"
                            >
                            <img v-if="imageUrl_back" :src="imageUrl_back" class="avatarusers">
                            <img v-else src="../../assets/image/组 115.png" style="width:135px;height:90px;">
                                <div class="top-pic1"><img :src="backImage"/></div>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
            <div style="margin-top:50px;">
                <el-button class="backresetbtn" @click="backtoauthing">返回</el-button>
                <el-button @click="resetSetType()" class="resetbtn">确定</el-button> 
            </div>
            
        </div>
        <!-- 警告 -->
            <el-dialog class="" width="520px" title="" :visible.sync="warningDialogVisible" center :close-on-click-modal="false">
                <div class="fnTitle">
                    <div class="title-text" style="margin-bottom:10px;">提&nbsp;&nbsp;&nbsp;&nbsp;示</div>
                </div>
                <div class="bage-line" style="width:51px;"></div>
                <div class="underline"></div>
                <p style="margin:50px 100px;">用户类型&nbsp;<span style="color:#07c160">转为企业</span>&nbsp;并通过审核后，将不能转为个人</p>
                <div class="underline"></div>
                <div class="editInfoBtn">
                    <el-button class="backbtn" @click="warningDialogVisible=false">取消</el-button>
                    <el-button @click="reUploadCompanyInfo" class="successinfobtn">继续</el-button>
                </div>
            </el-dialog>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            warningDialogVisible:false,
            real_name:'',
            id_code:'',
            disabled:false,
            imageUrl_front: '',
            imageUrl_back:'',
            fileList: [],
            actionUrl: this.API+'/system/upload/qiniu',
            fileReader: '',
            backImage:require("../../assets/image/back.png"),
            frontImage:require("../../assets/image/face.png"),
            loading:false,
            loading1:false,
            loading4:false
        }
    },
    methods:{
        //重新上传
         resetSetType(){
            var regtel =/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            var realName = /^[\u4e00-\u9fa5]/
            var ID_CODE_LEN = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
            if(this.real_name==""){
                this.$message({
                    message:'请输入真实姓名',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else if(!regtel.test(this.real_name) ||this.real_name.length < 2 || this.real_name.length > 6){
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
                
            }else if(this.id_code.length != 18 || !ID_CODE_LEN.test(this.id_code)){
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
                
            }else {
                this.loading4 = true 
                axios({
                    url:this.API+'/user/auth/individual',
                    method:'post',
                    data:{
                        type:1,
                        real_name:this.real_name,
                        id_code:this.id_code,
                        id_up:this.id_up,
                        id_down:this.id_down,
                        // business:this.id,
                        // company_name:this.company_name,
                        // company_code:this.company_code
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    console.log('44',response);
                    if(response.data.code==200){
                        this.loading4 = false
                        this.$message({
                            message:response.data.msg,
                            type:'success',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        this.$router.push('/authinfo');
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
                })}
        },

        //第一张图正面
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
                this.loading =true
                axios(config)
                .then(res => {   
                        this.loading = false           
                        console.log(res);
                        this.frontImage = require("../../assets/image/组 118.png"),
                        this.imageUrl_front = base64Str;
                        this.id_up = res.data.data.id;
                        console.log(this.id_up);
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
            if (this.fileList.length >= 8) {
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


        //第二张图反面
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
                this.loading1 = true
                axios(config)
                .then(res => {  
                        this.loading1 = false            
                        console.log(res);
                        this.backImage = require("../../assets/image/组 119.png"),
                        this.imageUrl_back = base64Str;
                        this.id_down = res.data.data.id;
                        console.log(this.id_down);
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
            if (this.fileList.length >= 8) {
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
        //跳转上传公司信息
        reUploadCompanyInfo(){
        this.$router.push('/companymsg')
    },
    //返回认证信息
    backtoauthing(){
        this.$router.push('/authinfo')
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
.setUserInfo8{
     width: 904px;
    margin:40px auto;
    height: 497px;
    /* margin:30px 0; */
    /* -webkit-border-radius:5px; */
    border-radius: 2px;
    /* box-shadow: 0 0 1px #f7f7f7; */
    /* padding:35px 20px 15px 20px; */
    background: #ffffff;
    border:1px solid #f7f7f7;
    margin-left: 40px;
    background-clip:padding-box;
}
.setUserInfo8 .authTitle{
    height: 53px;
    line-height: 54px;
}
.setUserInfo8 .bage-line{
    height: 2px;
    width: 64px;
    background-color: #07C160;
    margin-left: 33px;

}
.setUserInfo8 .underline{
    width: 100%;
    height:1px;
    background-color: #f6f6f6;
}
.setUserInfo8 .title-text{
    width: 64px;
    height: 16px;
    font-weight: 600;
    margin-left: 37px;
}
.setUserInfo8 .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    /* padding-left:90px; */
}
.setUserInfo8 .msglabelusers{
    padding-right:40px;
    color: #cccccc;
    position: absolute;
    margin-top:-35px;
}
.setUserInfo8 .userbtn{
    color: #07c160;
    margin-left:20px;
}
.setUserInfo8 .userbtn:hover{
    text-decoration: underline;
}
.setUserInfo8 .el-form-item {
    margin-bottom: 0px;
}
.setUserInfo8 .piclabel{
    margin-left:-40px;
    margin-top: -35px;
    color: #cccccc;
    float: left;
}
.setUserInfo8 .avatar-uploaderuser .el-upload {
    border: none;
    border-radius: 0px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    background: #F4F4F4;
    width: 130px;
    height: 90px;;
    border-radius: 10px;
  }
 .setUserInfo8 .avatar-uploaderuser .el-upload:hover {
    border-color: #d9d9d9;
  }

 .setUserInfo8 .avatarusers {
    width: 130px;
    height: 90px;
    border-radius: 10px;
    display: block;
    /* border: 1px #eaeaea solid; */
  }
 .setUserInfo8 .msgstatus{
    padding-right:40px;
    color: #cccccc;
    margin-left: 24px;
  }
.setUserInfo8 .notpass{
    padding-right:40px;
    color: #cccccc;
    margin-left: -30px;
  }


  .setUserInfo8 .el-upload-list__item {
    display: none;
 }
 .setUserInfo8 .avatar-uploader-iconuser {
    font-size: 60px;
    color: #ffffff;
    width: 130px;
    height: 90px;
    line-height: 90px;
    text-align: center;
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
  .setUserInfo8 .reupload .el-upload {
    display: block !important;
    text-align: left !important;
    cursor: pointer !important;
    outline: 0 !important;
}
.setUserInfo8 .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 80%;
}
.setUserInfo8 .el-input__inner {
    border: none;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 50%;
    background-color: #F4F4F4;
    float: left;
}

.setUserInfo8 .top-pic1{
    width:45px;
    height: 45px;
    position: absolute;
    top:0px;
    margin: 0 0 0 90px;
    }

.setUserInfo8 .resetbtn{
    border-color: #07c160;
    background-color: #07c160;
    margin-top:20px;
    margin-left:220px;
    border-radius: 2px;
    color: #ffffff;
    width:86px;
    height: 30px;
    line-height:10px;
    padding: 9px 20px;
    position: absolute;
  }

.setUserInfo8 .backresetbtn{
    background-color: #f3f3f3;
    border: 1px solid #ededed;
    border-radius: 2px; 
    color: #afafaf;
    margin-top:20px;
    margin-left:115px;
    /* color:#333333; */
    width:86px;
    height: 30px;
    /* line-height:10px; */
    padding: 8px 20px;
    position: absolute;
}
.setUserInfo8 .backresetbtn:focus,.setUserInfo8 .backresetbtn:hover{
    color: #afafaf;
    width:86px;
    height: 30px;
    border:1px solid #dcdfe6;
    background-color: #ededed;
    margin-left:115px;
    /* width:130px; */
    /* line-height:10px; */
    padding: 8px 20px;
    margin-top:20px;
    margin-left:115px;
}
.checkedUserType{
    margin-bottom: 10px !important;
    margin-left: 180px !important;
    padding-left: 0px !important; 
    height: 40px !important;

}
.relName{
    margin-left: 180px !important;
    height: 40px !important;
    margin-top: 30px !important;
    padding-left: 0px !important; 
}
.idCardNumber{
    margin-top: 45px !important;
    margin-left: 180px !important;
    padding-left: 0px !important; 

}
.holdIdCardPhoto{
    /* margin-top: 30px !important; */
    margin-left: 85px !important;
    padding-left: 0px !important;
}
.holdIdCardPhoto .el-form-item__content{
    margin-top: 20px !important;
    margin-left: 134px !important;
    padding-left: 0px !important;   
}
.el-upload .el-upload--text{
    position: absolute;
    margin-left: -135px;
}
/* ======================== */
.setUserInfo8 .userTypes,.company{
    margin-left: 35px;
    width: 60px;
    margin-top: 30px;
    text-align: left;
    line-height: 40px;
    /* background: #d3dce6; */
}
.setUserInfo8 .nom{
    margin-left: 40px;
    width: 60px;
    margin-top: 30px;
    text-align: left;
    line-height: 40px;
}
.setUserInfo8 .userTypes span{
    color: #7e7f80;
}
.setUserInfo8 .changeTypeBtn{
    width: 86px;
    height: 30px;
    text-align: center;
    line-height: 31px;
    border-radius: 2px;
    color: #ffffff;
    background-color: #07C160;
    cursor: pointer;
    margin-top: 34px;
    margin-left: -69px;
}
.setUserInfo8 .realNameLable,.setUserInfo8 .IDNumberLable{
    line-height: 40px;
    /* background:#d3dce6; */
    /* border: 1px solid #EDEDED; */
    border-radius: 2px;
    text-align: left;
    /* padding-left: 20px; */
    /* margin-top: 10px; */
    height: 40px;
    width: 284px;
    margin: 10px 0 25px 0px;
}

.realNameLable{
    margin-left: 40px;
}
.IDNumberLable{
    margin-left: -10px;
}
.realName,.IDCard{
    /* margin-left: 30px; */
    width: 60px;
    margin-top: 10px;
    line-height: 40px;
    /* background:#d3dce6; */
    text-align: left ;
    color:  #7e7f80;
}
.realName{
    margin-left: 35px;
}
.IDCard{
    margin-left: -15px;
}
.setUserInfo8 .realNameLable .el-input,.setUserInfo8 .IDNumberLable .el-input{
    width: 100%;
    height: 40px;
    border: 1px solid #ededed;
}
.setUserInfo8 .realNameLable .el-input:hover,.setUserInfo8 .IDNumberLable .el-input:hover{
    width: 100%;
    height: 40px;
    border: 1px solid #7e7f80;
}
.setUserInfo8 .realNameLable .el-input:focus,.setUserInfo8 .IDNumberLable .el-input:focus{
    width: 100%;
    height: 40px;
    border: 1px solid #7e7f80;
}
.setUserInfo8 .realNameLable .el-input{
    margin-left: 40px;
}
.setUserInfo8 .realNameLable .el-input__inner,.setUserInfo8 .IDNumberLable .el-input__inner{
    border: none;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    height: 40px;
    width: 100%;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    background-color: #fff;
}

.setUserInfo8 .IDCardPhoto{
    /* background-color: #ccc; */
    width: 60px;
    height: 40px;
    line-height: 40px;
    color: #7e7f80;
    text-align: left;
    margin-left: 35px;
}
.setUserInfo8 .IDPhotoFace,.setUserInfo8 .IDPhotoBack{
    width: 130px !important;
    height: 90px;
    margin-left: 40px;
    /* height: 68px; */
    border-radius: 10px;
    background: #d3dce6;
    /* border: 1px solid #ededed; */
}
.IDPhotoBack{
    margin-left: 0px
}
.setUserInfo8 .successinfobtn:hover{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #16b864;
    background-color: #16b864;
}
.setUserInfo8 .backbtn{
    color: #7e7f80;  
    width: 80px;
    height: 30px;
    border: 1px solid #ededed;
    /* text-align: center; */
    padding:6px;
    line-height: 5px;
    border-radius: 2px;
    /* margin-left: 310px */

}
.setUserInfo8 .backbtn:hover{
    color: #7e7f80;
    background-color: #ededed;  
    width: 80px;
    height: 30px;
    border: 1px solid #cccc;
    /* text-align: center; */
    padding:6px;
    line-height: 5px;
    border-radius: 2px;
    /* margin-left: 310px */


}
.setUserInfo8 .successinfobtn{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #07C160;
    background-color: #07c160;
}
.setUserInfo8 .el-dialog--center .el-dialog__body{
    padding: 0 0 1px 0 !important;
}
.setUserInfo8 .editInfoBtn{
    margin: 10px 0 10px 320px;
}
.setUserInfo8 .el-loading-mask{
    border-radius: 10px
}
</style>


