
<template>
  <div>
    <!--<el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess2"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl_two" :src="imageUrl_two" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>-->


    <div><input class="file" name="file" type="file" accept="audio/mp3" @change="update"/></div>

    <div>
      <form>
        <input type="file" @change="getFile($event)">
        <button @click="submitForm($event)">提交</button>
      </form>

    </div>
  </div>

</template>
<script>
import axios from 'axios';
  export default {
    data() {
      return {
        // imageUrl: '',
        // imageUrl_two:'',
        name: '',
        age: '',
        // file: ''
      };
    },
    methods: {
      update(e){
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
        //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{
            'Content-Type':'multipart/form-data',
            'signature':localStorage.getItem('sign'),
            'accessKey':localStorage.getItem('secretKey'),
            'time':localStorage.getItem('time'),
            },
            // url:'http://192.168.1.167:8090/api/core/v1/audio/upload.json',
            // method: 'post',
        }; //添加请求头
        this.$http.post('http://192.168.1.167:8090/api/core/v1/audio/upload.json',param,config)
          .then(response=>{
            console.log(response.data);
        })
        // axios(param,config).then(response=>{
        //   console.log(response.data);
        // })
         
        
      },

      getFile(event) {
          this.file = event.target.files[0];
         // console.log(this.file);
        },
        submitForm(event) {
          event.preventDefault();
          let formData = new FormData();
          formData.append('file', this.file);

          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'signature':localStorage.getItem('sign'),
              'accessKey':localStorage.getItem('secretKey'),
              'time':localStorage.getItem('time'),
            }
          }

          this.$http.post('http://192.168.1.167:8090/api/core/v1/audio/upload.json', formData, config).then(function (response) {
            if (response.status === 200) {
              console.log(response.data);
            }
          })
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


