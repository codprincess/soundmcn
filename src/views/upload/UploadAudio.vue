<template>
  <uploader :options="options" class="uploader-example" @file-success="fileSuccess">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <uploader-btn>+批量上传</uploader-btn>
      <!-- <uploader-btn :attrs="attrs">select images</uploader-btn>
      <uploader-btn :directory="true">select folder</uploader-btn> -->
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
import axios from 'axios';
  export default {
    data () {
      return {
        options: {
          target: 'https://center.soundatm.heard-gl.com/api/core/v1/audio/upload.json',
          testChunks: false,
          headers:{
                // 'Content-Type':'multipart/form-data',
                'signature':localStorage.getItem('sign'),
                'accessKey':localStorage.getItem('accessKey'),
                'time':localStorage.getItem('timestap'),
            },
            data:{
                file:'file',
                k:this.k
            }
        },
        // attrs: {
        //   accept: 'image/*'
        // }

      }
    },
    created(){
        this.getHeardToken();
    },
    methods:{
         //获取声音银行的token
        getHeardToken(){
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/upload/getBankSign',
                method:'post'
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.accessKey = response.data.data.accessKey,
                    this.sign = response.data.data.sign,
                    this.timestap = response.data.data.time,
                    localStorage.setItem('accessKey',this.accessKey);
                    localStorage.setItem('sign',this.sign);
                    localStorage.setItem('timestap',this.timestap);
                }
            })
        },
        //上传成功之的事件
        // fileSuccess (file,fileList) {
        //     console.log(file, fileList)
        // },

        fileSuccess (rootFile, file, message, chunk) {
          console.log(rootFile, file, message, chunk);
        },
         //批量上传文件
        // submitUpload: function(content) {
        //     let param = new FormData(); 
        //     param.append('file',content.file);
        //     console.log(param.append);
        //     let config = {
        //         headers:{
        //             'Content-Type':'multipart/form-data',
        //             'signature':localStorage.getItem('sign'),
        //             'accessKey':localStorage.getItem('accessKey'),
        //             'time':localStorage.getItem('timestap'),
        //         },
        //     }
        //     let var_this = this;
        //     axios.post('https://center.soundatm.heard-gl.com/api/core/v1/audio/upload.json', param, config)
        //         .then(function(response) {
        //             console.log(response);
                   
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         })
        // },

    },
    mounted () {
    // 获取uploader对象
      this.$nextTick(() => {
        window.uploader = this.$refs.uploader.uploader
      })
    }
  }
</script>

<style>
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    background: #ffffff;
    box-shadow: 0 0 3px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
    display: inline-block;
    position: relative;
    padding: 4px 8px;
    font-size: 100%;
    line-height: 1.4;
    color: #ffffff;
    border: 1px solid #1E3B97;
    cursor: pointer;
    border-radius: 2px;
    background: none;
    outline: none;
    background: #1E3B97;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
 .uploader-example .uploader-drop{
      background: #ffffff;
      position: relative;
      padding: 10px;
      overflow: hidden;
     border: none;
 }
 .uploader-btn:hover {
    background-color: #1E3B97 !important;
}
</style>