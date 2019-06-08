<template>
    <div  class="userinfo2">
        <el-form style="margin-top:30px;">
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
                        class="avatar-uploader"
                        ref="upload" 
                        accept="image/jpeg,image/png"
                        :action="actionUrl"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUpload"
                        :on-remove="removeHandler"
                        :http-request="httpRequest">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                        <div class="top-pic1"><img src="../../assets/image/Bus_lic.png"/></div>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item>
                <span class="noticetag">*营业执照需上传扫描文件，我们会在1个工作日内为您审核，请知悉</span>
            </el-form-item>
            
        </el-form>
        <!-- <div><el-button @click="ChanToComps" class="resetbtn">上传</el-button></div> -->
        <div>
            <el-button @click="ChanToComps" class="resetbtn">上传</el-button> 
            <router-link to="/usermsg"><el-button class="backresetbtn">返回</el-button></router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    // name: 'basic-upload-field',
    data () {
        return {
            imageUrl:'',
            company_name:'',
            company_code:'',
            fileList: [],
            actionUrl:this.API+'/system/upload/qiniu',
            fileReader: '',
        }
    },
    methods: {
        //公司认证重新上传
        ChanToComps(){
            axios({
                url:this.API+'/user/auth/company',
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
                   this.$message({
                       message:'重新上传成功，请等待审核',
                       type:'success',
                       center: true,
                       customClass:'user-defind-style'
                   })
                   this.$router.push('/usermsg');
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
.userinfo2 .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    padding-left:90px;
}
.userinfo2 .msglabel{
    padding-right:25px;
    color: #cccccc;
    float: left;
}
.userinfo2 .codelabel{
    margin-left:-56px;
    color: #cccccc;
    padding-right:25px;
    float: left;
}
.userinfo2 .userbtn{
    color: #18C26A;
    margin-left:20px;
}
.userinfo2 .el-form-item {
    margin-bottom: 0px;
}
.userinfo2 .piclabel{
    margin-left:-42px;
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
.userinfo2 .avatar-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
    /* border-radius: 6px; */
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-top:20px;
    margin-left:30px;
    margin-bottom: 15px;
    background-color: #F4F4F4;
  }
.userinfo2 .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .userinfo2 .avatar-uploader-icon1 {
    font-size: 28px;
    color: #858a91;
    width: 130px;
    height: 130x;
    line-height: 130px;
    text-align: center;
  }
.userinfo2 .avatar {
    width: 130px;
    height: 130px;
    display: block;
    border: 1px #eaeaea solid;
  }
.userinfo2 .resetbtn{
    border-color: #18C26A;
    background-color: #18C26A;
    margin-top:20px;
    margin-left:185px;
    color: #ffffff;
    width:15%;
    line-height:10px;
    padding: 12px 20px;
  }
.userinfo2 .resetbtn:focus,.userinfo2 .resetbtn:hover{
    border-color: #18C26A;
    background-color: #18C26A;
    margin-top:20px;
    margin-left:185px;
    color: #ffffff;
    width:15%;
    line-height:10px;
    padding: 12px 20px;
}
.userinfo2 .backresetbtn{
    border-color: #dcdfe6;
    background-color: #ffffff;
    margin-top:20px;
    margin-left:20px;
    color:#333333;
    width:15%;
    line-height:10px;
    padding: 12px 20px;
}
.userinfo2 .backresetbtn:focus,.userinfo2 .backresetbtn:hover{
    border-color: #dcdfe6;
    background-color: #ffffff;
    margin-top:20px;
    margin-left:20px;
    color: #333333;
    width:15%;
    line-height:10px;
    padding: 12px 20px;
}
 .userinfo2 .noticetag{
      margin-left:80px;
      color:red;
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
</style>



