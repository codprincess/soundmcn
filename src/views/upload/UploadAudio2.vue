<template>
    <div class="moreupload">
        <div class="header-top">
            <!-- <el-button>+添加音频</el-button> -->
            <!-- <el-button>+批量删除</el-button>
            <el-button>全选</el-button> -->
            <el-upload type="file" name="file" class="upload-demo" action="https://center.soundatm.heard-gl.com/api/core/v1/audio/upload.json" multiple :limit='50'  ref="upload" :http-request='submitUpload' :on-change='changeUpload'>
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class="table_container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column
                    prop="date"
                    label="音频文件名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            tableData: [{
            date: '音频文件名',
            name: '',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
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

        //批量上传文件
        submitUpload: function(content) {
            let param = new FormData(); 
            param.append('file',content.file);
            console.log(param.append);
            let config = {
                headers:{
                    'Content-Type':'multipart/form-data',
                    'signature':localStorage.getItem('sign'),
                    'accessKey':localStorage.getItem('accessKey'),
                    'time':localStorage.getItem('timestap'),
                },
            }
            let var_this = this;
            axios.post('https://center.soundatm.heard-gl.com/api/core/v1/audio/upload.json', param, config)
                .then(function(response) {
                    console.log(response);
                   
                })
                .catch(function(error) {
                    console.log(error);
                })
        },

        changeUpload: function(file, fileList) {
            this.fileList = fileList;
            console.log(this.fileList);
            for(let i = 0; i<this.fileList.length;i++){
                 this.k = fileList[i].uid;
                //console.log(this.k);
            }
        },

    }

}
</script>
<style>
.moreupload{
    width:910px;
    height:700px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 5px #eaeaea;
    padding:35px 35px 15px 35px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
}
</style>


