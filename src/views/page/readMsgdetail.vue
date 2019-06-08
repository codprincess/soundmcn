<template>
    <div class="msgdetailbox">
        <div class="msg-title">
            <i style="float:left;font-size:16px;color:#cccccc;cursor: pointer;" class="el-icon-arrow-left" @click="pageBack">返回</i>
            <div class="msgTitle">{{ this.title }}</div>
            <span v-html="create_time" style="top:10px;"></span>
        </div>
        <div style="height:1px;background:#07c160;width:100%"></div>
        <div class="content">
            <p v-html="content">
                <!-- &nbsp;&nbsp;&nbsp;&nbsp; -->
            </p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            id:'',
            create_time:'',
            title:'',
            content:''
        }
    },
    created(){
        this.id= this.$route.params.id,
        this.getdetail();
    },
    methods:{
        //获取消息详情
         getdetail(){
            axios({
                url:this.API+'/msg/msg/Info',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    id:this.id,
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.create_time = response.data.data.create_time,
                    this.title = response.data.data.title,
                    this.content = response.data.data.content
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
        pageBack(){
            this.$router.go(-1)
        }
    }
}
</script>
<style>
/* 2019.1.27 精调 */
.el-icon-arrow-left{
    float:left;
    font-size:16px;
    color:#FF1B1D1F;
    margin: 0px 0 0 20px;
}
.msgTitle{
    width: 400px;
    height: 30px;
    /* background-color: #ccc; */
    text-align: center;
    line-height: 30px;
    /* text-overflow: ellipsis; */
    margin: 0 auto;
    /* margin-left: 317px; */
    white-space:nowrap; 
    /* overflow:hidden; */
    font-size: 16px;
    font-weight: 600;
}
.msgdetailbox{
    width:904px;
    min-height:920px;
    margin:40px;
    -webkit-border-radius:2px;
    border-radius: 2px;
    /* box-shadow: 0 0 5px #eaeaea; */
    /* padding:35px 35px 15px 35px; */
    background: #ffffff;
    /* border:1px solid #eaeaea; */
    background-clip:padding-box;
}
.msg-title{
    /* margin-top: 25px; */
    /* border-bottom: 1px solid #cccccc; */
    text-align: center;
    padding-top: 20px;
    width: 904px;
    height: 96px;
    line-height: 30px;
    /* margin-left:30px; */
    /* display: inline; */
}
.msg-title b{
    width: 300px;
    text-overflow: ellipsis;
    margin: 0;
    font-size: 16px;
}
.msg-title span{
    /* position: absolute; */
    width: 300px;
    margin-top: 30px;
    /* margin-right: 40%;  */
    color: #9B9B9b;
    font-size: 14px;
    right: 310px;
}
.content {
    margin-top: 40px;
    padding: 0 20px;
    height: 100%;
    background: #ffffff;
}
.content p{
    height:30px;
    line-height: 30px;
    display: inline;
}

</style>


