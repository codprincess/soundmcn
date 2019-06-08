<template>
<div>
    <div  class="userinfo2" v-if="false">
        <el-form style="margin-top:30px;margin-left:120px;">
            <el-form-item>
                <label class="msglabel">公司名称</label>
                <el-input v-model="company_name" placeholder="填写公司名称"></el-input>
            </el-form-item>
             <el-form-item>
                <label class="codelabel">统一社会信用代码</label>
                <el-input v-model="company_code" placeholder="填写信用代码"></el-input>
            </el-form-item>
             <el-form-item>
                <label class="piclabel">请上传营业执照</label>
                <div class="upload-box">
                    <el-upload
                        class="avatar-uploadercomp"
                        ref="upload" 
                        accept="image/jpeg,image/png"
                        :action="actionUrl"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUpload"
                        :on-remove="removeHandler"
                        :http-request="httpRequest">
                        <img v-if="imageUrl" :src="imageUrl" class="avatarcomp">
                        <div class="top-pic1"><img :src="businessImg"/></div>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item>
                <span class="noticetag">*营业执照需上传扫描文件，我们会在1个工作日内为您审核，请知悉!</span>
            </el-form-item>
            
        </el-form>
        <div style="margin-left:120px;">
            <el-button @click="ChanToComp" class="resetbtn">上传</el-button> 
            <router-link to="/usermsg"><el-button class="backresetbtn">返回</el-button></router-link>
        </div>
    </div>
    <div class="userinfo2"
        v-loading="loading2"
        element-loading-text="正在为您智能审核中，请稍后..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        >
        <div class="authTitle">
        <div class="title-text">认证信息</div>
        </div>
        <div class="bage-line"></div>
        <div class="underline"></div>
        <el-row :gutter="20" class="type-1">
                <el-col :span="2"><div class="grid-content userTypes"><span> 用户类型</span></div></el-col>
                <el-col :span="3"><div class="grid-content nom">企业</div></el-col>
        </el-row>
         <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content companyName">企业名称</div></el-col>
                <el-col :span="10">
                    <div class="grid-content companyNameLable">
                        <el-input v-model="company_name" placeholder="请输入企业名称"></el-input>                    
                    </div>
                </el-col>
                <el-col :span="2"><div class="grid-content bankID">统一社会信用代码</div></el-col>
                <el-col :span="10">
                    <div class="grid-content bankIDLable">
                        <el-input v-model="company_code" placeholder="请输入统一社会信用代码"></el-input>
                    </div></el-col>                    
            </el-row>
            <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content IDCardPhoto">营业执照</div></el-col>
                <el-col :span="5">
                    <!-- 照 -->
                    <div class="grid-content RegistrationNo"
                        v-loading="loading3"
                        element-loading-text="图片正在上传中..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-upload
                        class="avatar-uploadercomp"
                        ref="upload" 
                        accept="image/jpeg,image/png"
                        :action="actionUrl"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUpload"
                        :on-remove="removeHandler"
                        :http-request="httpRequest">
                        <img v-if="imageUrl" :src="imageUrl" class="avatarcomp">
                        <img v-else src="../../assets/image/组 114.png" class="nophoto">
                        <div class="top-pic1"><img :src="businessImg"/></div>
                    </el-upload>
                    </div>
                </el-col>
                <el-col :span="5">
                    <!-- 上传须知 -->
                    <div class="grid-content upload-text">
                        <h3>上传须知:</h3>
                        <p>营业执照需上传扫描文件，我们会在1个工作日内为您审核，请知晓!</p>
                    </div>
                </el-col>
            </el-row>
            <div style="margin-top:50px;">
                <router-link to="/authinfo"><el-button class="backresetbtn">返回</el-button></router-link>
                <el-button @click="ChanToComp" class="resetbtn">确定</el-button> 
            </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    // name: 'basic-upload-field',
    data () {
        return {
            loading3:false,
            loading2:false,
            imageUrl:'',
            company_name:'',
            company_code:'',
            fileList: [],
            // actionUrl: 'https://api.soundmcn.heard-gl.com/system/upload/qiniu',
            actionUrl:this.API+'/system/upload/qiniu',
            fileReader: '',
            businessImg:require('../../assets/image/组 1162.png'),
            warningDialogVisible:false,

        }
    },
    created(){
    },
    methods: {
        //修改为公司
        ChanToComp(){
            var COMPANY_NAME = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
            var _CODE = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g; 
            if(this.company_name == ''){
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
            }else if(this.imageUrl == ''){
                this.$message({
                    message:'请上传营业执照',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'})
            }
            else if(!_CODE.test(this.company_code)){
                this.$message({
                    message:'请输入正确的统一社会信用代码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'})
            }else
            this.loading2 = true 
            axios({
                    url:this.API+'/user/auth/changeType',
                    method:'post',
                    data:{
                        type:2,
                        company_name:this.company_name,
                        company_code:this. company_code,
                        business:this.id,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.loading2 = false
                        this.$message({
                            message:response.data.msg,
                            type:'success',
                            center: true,
                            customClass:'user-defind-style'
                    })
                    this.$router.push('/authinfo');
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
                })
        },

        //上传营业执照
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
                this.loading3 = true
                axios(config)
                .then(res => {
                    this.loading3 = false
                    console.log(res);
                    this.businessImg = require('../../assets/image/组 116.png')
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
            if (this.fileList.length >= 6) {
                alert('At most 6 files')
                return false
            }
            // if (!isLt5M) {
            //     alert('The max size is 5MB')
            //     return false
            // }
        },
        uploadSuccess (res, file, fileList) {
            let data = res.data
            console.log('upload result:', res, file)
            file.key = data.key
            this.fileList.push(data.key)
        },
        reUploadInfo(){
            this.$router.push('/usersmsg')
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

.userinfo2{
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
.userinfo2 .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 12px;
    padding-left:90px;
    margin-top: 20px;
}
.userinfo2 .msglabel{
    padding-right:25px;
    color: #cccccc;
    float: left;
    margin-top: -40px;
}
.userinfo2 .codelabel{
    /* margin-left:-56px;   */
    color: #cccccc;
    padding-right:25px;
    float: left;
    margin-top: -40px;
}
.userinfo2 .userbtn{
    color: #07c160;
    margin-left:20px;
}
.userinfo2 .el-form-item {
    margin-bottom: 0px;
}
.userinfo2 .piclabel{
    /* margin-left:-42px; */
    margin-top: -40px;
    color: #cccccc;
    float: left;
}
.userinfo2 .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 80%;
}
.userinfo2 .el-input__inner {
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width: 70%;
    background-color: #F4F4F4;
    float: left;
    margin-bottom: 15px;

}
.userinfo2 .el-input__inner:focus{
    background-color: #fff;
    border-color: #ccc;
}
.userinfo2 .avatar-uploadercomp .el-upload {
    /* border: 1px dashed #d9d9d9; */
    /* border-radius: 6px; */
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    /* margin-top:20px; */
    /* margin-left:40px; */
    /* margin-bottom: 15px; */
    border-radius: 10px;
    width: 128px;
    height: 128px;
    background-color: #F4F4F4;
  }
.userinfo2 .avatar-uploadercomp .el-upload:hover {
    border-color: #409EFF;
  }
 .userinfo2 .avatar-uploadercomp-icon1 {
    font-size: 28px;
    color: #858a91;
    width: 90px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
/* .userinfo2 .avatarcomp {
    width: 130px;
    height: 130px;
    display: block;
    border: 1px #eaeaea solid;
  } */
.userinfo2 .resetbtn{
    border-color: #07c160;
    background-color: #07c160;
    margin-top:20px;
    margin-left:12px;
    color: #ffffff;
    width:88px;
    line-height:10px;
    padding: 9px 20px;
    border-radius: 2px;
  }
.userinfo2 .resetbtn:focus,.userinfo2 .resetbtn:hover{
    border-color: #16b864;
    background-color: #16b864;
    margin-top:20px;
    margin-left:12px;
    color: #ffffff;
    width:88px;
    line-height:10px;
    padding: 9px 20px;
}
.userinfo2 .backresetbtn{
    border:1px solid #ededed;
    background-color: #f3f3f3;
    margin-top:20px;
    margin-left:115px;
    color:#afafaf;
    width:88px;
    line-height:10px;
    padding: 9px 20px;
    border-radius: 2px;
}
.userinfo2 .backresetbtn:focus,.userinfo2 .backresetbtn:hover{
    background-color: #ededed;
    border:1px solid #dcdfe6;
    color: #afafaf;
    margin-top:20px;
    margin-left:115px;
    /* color: #fff; */
    width:88px;
    line-height:10px;
    padding: 9px 20px;
}
 .userinfo2 .noticetag{
      /* margin-left:80px; */
      color:rgb(255, 110, 64)
  }
 .userinfo2 .el-upload-list__item {
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
.userinfo2 .top-pic1{width:45px;height: 45px;position: absolute;top:0px;left: 88px;}
/* ======================== */
.userinfo2 .authTitle{
    height: 53px;
    line-height: 54px;
}
.userinfo2 .bage-line{
    height: 2px;
    width: 64px;
    background-color: #07C160;
    margin-left: 33px;

}
.userinfo2 .underline{
    width: 100%;
    height:1px;
    background-color: #f6f6f6;
}
.userinfo2 .title-text{
    width: 64px;
    height: 16px;
    font-weight: 600;
    font-size: 16px;
    margin-left: 37px;
}
.userTypes,.company{
    margin-left: 35px;
    width: 60px;
    margin-top: 30px;
    text-align: left;
    line-height: 40px;
    /* background: #d3dce6; */
}
.userinfo2 .userTypes span{
    color: #9b9b9b;
}
.userinfo2 .nom{
    margin-left: 40px;
    width: 60px;
    margin-top: 30px;
    text-align: left;
    line-height: 40px;
}
.userinfo2 .companyNameLable,.userinfo2 .bankIDLable{
    line-height: 40px;
    /* background:#d3dce6; */
    /* border: 1px solid #EDEDED; */
    border-radius: 2px;
    text-align: left;
    /* padding-left: 25px; */
    margin-bottom: 25px;
    margin-top: 10px;
    height: 40px;
    width: 284px;
    /* margin: 10px 0 25px 0px; */
}
/* .companyNameLable{
    margin-left: 40px;
} */

.bankIDLable{
    margin-left: 48px;
}
.companyName{
    /* margin-left: 30px; */
    width: 60px;
    margin-top: 10px;
    line-height: 40px;
    /* background:#d3dce6; */
    text-align: left ;
    color:  #9b9b9b;
}
.bankID{
    /* position: absolute; */
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    color: #9b9b9b;
    margin: 10px 20px 0px -10px;
}
.companyName{
    margin-left: 35px;
}
.IDCard{
    margin-left: -15px;
}
.companyNameLable .el-input,.bankIDLable .el-input{
    width: 100%;
    height: 40px;
    border: 1px solid #ededed;
}
.companyNameLable .el-input{
    margin-left: 40px;
}
.companyNameLable .el-input__inner,.bankIDLable .el-input__inner{
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
.userinfo2 .bankNumber{
    border: 1px solid #ededed;
    border-radius: 2px;
    text-align: left;
    width: 262px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    /* margin-left: 66px;
    margin-top: 10px; */
    margin: 10px 10px 0 50px;
}
.IDCardPhoto{
    /* background-color: #ccc; */
    width: 60px;
    height: 40px;
    line-height: 40px;
    color: #9b9b9b;
    text-align: left;
    margin-left: 35px;
}
.RegistrationNo{
    width: 128px;
    height: 128px;
    margin-left: 40px;
    /* height: 68px; */
    border-radius: 10px;
    background: #d3dce6;
}
.userinfo2 .upload-text{
    height: 32px;
    width: 564px;
    color: #9b9b9b;
    padding: 47px 20px;
    background-color: #fafafa;
    line-height: 20px;
    /* padding-top: 25px; */
    border-radius: 2px;
}
.userinfo2 .upload-text h3,.upload-text p{
    margin: 0;
}
.userinfo2 .avatarcomp {
    width: 128px;
    height: 128px;
    border-radius: 10px;
    display: block;
    /* border: 1px #eaeaea solid; */
  }
.nophoto{
    width: 128px;
    height: 128px;
    /* height: 93px    ; */
    /* margin-top: 1px;
    box-shadow: 1px 2px 3px #cccccc; */
}
.editInfoBtn{
    /* float: right; */
    width: 200px;
    margin-top: 10px;
    margin-left: 317px;
}
.userinfo2 .backbtn{
    color: #9b9b9b;  
    width: 80px;
    height: 30px;
    border: 1px solid #ededed;
    /* text-align: center; */
    padding:6px;
    line-height: 5px;
    border-radius: 2px;

}
.userinfo2 .el-dialog__header{
    padding: 0px
}
.userinfo2 .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 0px 10px;
}
.el-dialog__headerbtn .el-dialog__close{
    margin: 0 5px 0 0 !important;
    }
/* .userinfo2 .successinfobtn{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #07C160;
    background-color: #07c160;
}
.userinfo2 .successinfobtn:hover{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #16b864;
    background-color: #16b864;
} */
.RegistrationNo .el-loading-mask{
    border-radius: 10px
}
</style>



