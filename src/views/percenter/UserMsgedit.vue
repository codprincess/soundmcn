<template>
    <div  class="userinfo9">
        <el-form>
            <el-form-item>
                <label class="msglabel">用户类型</label>
                <span>个人</span>
                <el-button class="userbtn" type="text">修改为公司</el-button>
            </el-form-item>
            <el-form-item>
                <label class="msglabel">身份证号</label>
                <span>1263176321848274927492</span>
            </el-form-item>
             <el-form-item>
                <label class="piclabel">手持身份证照</label>
                <div class="upload-box">
                        <el-upload 
                        class="avatar-uploader"
                        accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-upload 
                        class="avatar-uploader"
                        ref=""
                        accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-form-item>
            
        </el-form>
        <div class="msgbtn">
            <el-button class="resetbtn">上传</el-button>
            <el-button class="resetbtn">返回</el-button>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            imageUrl: ''
        }
    },
    methods:{
         handleAvatarSuccess(res,file){
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file){
            console.log(file.type);
            const isJPG = file.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if(!isJPG){
                this.$message.error('上传图片只能是jpg格式');
            }
            if(!isLt2M){
                this.$message.error('上传图片不能超过2MB');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>
<style>
.userinfo9{
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
.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    padding-left:90px;
}
.msglabel{
    padding-right:40px;
    color: #cccccc;
}
.userbtn{
    color: #18C26A;
    margin-left:20px;
}
.el-form-item {
    margin-bottom: 0px;
}
.piclabel{
    margin-left:-30px;
    color: #cccccc;
    float: left;
}
.avatar-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-top:20px;
    margin-left:45px;
    margin-bottom: 15px;
    background-color: #F4F4F4;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130x;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
  .msgstatus{
    padding-right:40px;
    color: #cccccc;
    margin-left: 24px;
  }
  .notpass{
    padding-right:40px;
    color: #cccccc;
    margin-left: -30px;
  }
  .msgbtn{text-align: center;}
  .resetbtn{
    margin-top:20px;
    margin-left:-90px;
    background-color: #18C26A;
    color: #ffffff;
    width:15%;
    height:35px;
    line-height:10px;
  }
</style>


