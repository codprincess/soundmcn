<template>
    <div class="userbase">
        <div class="personbox">
            <!--平台公开-->
            <div class="notice_row">
                <div class="notice">
                    <el-col :span="0.5"><i class="el-icon-bell"></i></el-col>
                    <el-col :span="23.5">百度语音OS渠道在本平台下架了！！</el-col>
                </div>
            </div>
            <!--渠道、内容、账号-->
            <div class="date_row">
                <el-col :span="8">
                    <div class="channel_date">
                        <div>
                                <div class="date-title"><p>渠道数据</p></div>
                                <span class="datetag">Channel data</span>
                                <div class="notadd_box">
                                    <div class="iconbox"><span class="u-icon-qa"></span></div>
                                    <div class="not_title"><p>您当前尚未添加栏目</p></div>
                                </div>
                        </div>
                    <!--有数据-->
                        <div hidden>
                            <div class="date-info">
                                <div class="info-box"><p>渠道数据</p></div>
                                <el-button class="paybtn">查看</el-button>
                            </div>
                            <span class="datetag">Channel data</span>
                            <div class="hasadd_box">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="normal">
                                            <el-col :span="24"><img src="#" width="60px" height="60px"/></el-col>
                                            <el-col :span="24"><div class="normaltag"><span class="normalcount">9</span><span>正常</span></div></el-col>
                                        </div>
                                    </el-col>
                                    <el-col :span="8"><div class="line"></div></el-col>
                                    <el-col :span="8">
                                        <div class="normal">
                                            <el-col :span="24"><img src="#" width="60px" height="60px"/></el-col>
                                            <el-col :span="24"><div class="normaltag"><span class="normalcount">1</span><span>异常</span></div></el-col>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="conten_date">                                                                                                                                         
                        <!--无数据-->
                        <div>
                            <div class="date-title"><p>内容数据</p></div>
                            <span class="datetag">Content data</span>
                            <div class="notadd_box">
                                <div class="iconbox"><span class="u-icon-qa"></span></div>
                                <div class="not_title"><p>您当前尚未添加栏目</p></div>
                            </div>
                        </div>
                        <!--有数据-->
                        <div hidden>
                            <div class="date-info">
                                <div class="info-box"><p>内容数据</p></div>
                                <el-button class="paybtn">查看</el-button>
                            </div>
                            <span class="datetag">Content data</span>
                            <div class="hasdate">
                                <el-row>
                                    <el-col :span="12">
                                    <div style="text-align:center">
                                            <p class="counts">286568</p>
                                            <p>总唤醒量</p>
                                    </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div style="text-align:left">
                                            <p class="counts">35%</p>
                                            <p>完听率</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div style="text-align:center">
                                            <p class="counts">65%</p>
                                            <p>中断率</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>

                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="userinfo22">
                        <div class="date-info">
                            <div class="info-box"><p>账号信息</p></div>
                            <router-link to="/addpay"><el-button class="paybtn">充值</el-button></router-link>
                        </div>
                        <span class="datetag">Acount information</span>
                        <div class="totalprice">
                            <p>￥<span>{{data}}</span></p>
                            <span class="pricetag">当前余额</span>
                        </div>
                    </div>
                </el-col>
            </div>
            <!--渠道列表-->
            <div class="chennel_row">
                <el-col :span="24">
                    <div class="channel_list">
                        <div class="date-title"><p>渠道列表</p></div>
                        <span class="datetag">Content data</span>
                        <!--无数据-->
                        <div class="notdata">
                            <div class="notadd_box">
                                <div class="iconbox"><span class="u-icon-qa"></span></div>
                                <div class="not_title"><p>您当前尚未添加栏目</p></div>
                            </div>
                        </div>
                        <!--有数据-->
                        <div class="channel_pic" hidden>
                            <el-row>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                                <el-col :span="2"><i class="el-icon-bell"></i></el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </div>
            <!--内容发行列表top10-->
            <div class="push_row">

                <div class="content_list">
                    <div class="date-title"><p>内容发表列表Top10</p></div>
                    <span class="datetag">Content distribution list</span>
                    <!--无数据-->
                    <div class="notdata2">
                        <div class="notadd_box">
                            <div class="iconbox"><span class="u-icon-qa"></span></div>
                            <div class="not_title"><p>您当前尚未添加栏目</p></div>
                        </div>
                    </div>
                    <!--有数据-->
                    <div hidden>
                        <el-table  :data="gridData"  style="width:100%;margin-top:10px;" align="left">
                        <el-table-column width="80px" align="left">
                                <template slot-scope="scope">
                                    <el-tag >政治</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column property="title" width="300px" label="标题" align="center">
                                
                            </el-table-column>
                            <el-table-column property="openicon" width="50">
                                <template slot-scope="scope">
                                    <i class="el-icon-caret-right"></i>
                                </template>
                            </el-table-column>
                            <el-table-column property="channel" width="200" label="发布渠道数" align="center"></el-table-column>
                            <el-table-column property="counts" width="" label="总收听量" align="center"></el-table-column>
                            <el-table-column property="pubtime" width="150" label="发布时间" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>
<script>
import axios from 'axios';

export default {
    inject:['reload'],
    data(){
        return{
            addinfoVisible:false,
            basesetinfoDialogVisible:false,
            uploadDialogVisible:false,
            imageUrl: '',
            data:'',
            gridData: [{
                title:'故事的小黄花，从出生那年就飘落。。。。。',
                channel:'4',
                counts:'12909',
                pubtime:'2018.10.11 15:10',
                // status:'正常'
            },{
                title:'河边的风在吹着头发感动。。。。。。。。。',
                channel:'6',
                counts:'12909',
                pubtime:'2018.10.11 15:10',
                // status:'正常'
            }],
        }
    },
     created(){
        this.getbalance();
        // this.getpayOrder();
    },
    methods:{
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //获取用户余额
        getbalance(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                }, 
                url:this.API+'/system/pay/balance',
                method:'post',
            }).then(response=>{
                //console.log('用户余额',response);
                if(response.data.code==200){
                    this.data = response.data.data;
                    //console.log(this.data);
                }
            })
        },

        //获取栏目的全部渠道
        
    }

}
</script>
<style>
.personbox{
    width: 904px;
    margin: 40px;
}
.date_row{width: 100%;height:220px;margin:0 0;}
.hasadd_box{padding:10px 40px 0px 40px;text-align: center;}
.normal .normaltag .normalcount{font-size: 40px;}
.normal .normaltag span{font-size: 16px;}
.line{margin-top:10px; width: 35px;height:40px;border-right:1px #cccccc solid;}
.hasdate .counts{font-size: 30px;height:10px;}
.hasdate p{font-size:16px;}
.date_row .channel_date,.conten_date,.userinfo22{
    width:258px;
    height:200px;
    -webkit-border-radius:2px;
    border-radius: 2px;
    /* box-shadow: 0 0 5px #eaeaea; */
    padding:0px 20px 0px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
    }
.date-title{border-bottom:1px #eaeaea solid;height:30px;margin-bottom: 5px;}
.date-info{ border-bottom:1px #eaeaea solid; height:30px;margin-bottom: 5px;}
.date-info .info-box p{font-size: 18px;}
.paybtn{float: right !important;margin-top:-45px !important;height:30px !important;line-height:-10px !important;line-height: -0px !important;background-color: #18C26A !important;color: #FFFFFF !important;}
.paybtn:hover,.paybtn:focus{
    float: right !important;margin-top:-45px !important;height:30px !important;line-height:-10px !important;line-height: -0px !important;background-color: #18C26A !important;color: #FFFFFF !important;
}
.date-title p{font-size: 18px;}
.datetag{color: #cccccc;font-size: 12px;}
.notadd_box{ margin-left:50px; margin-top: 30px;}
.iconbox{height:45px; width:45px;position: relative;float: left;/* margin-left: 55px; */}
.not_title{float: left;}
.not_title p{color: #B4B4B4;}
.u-icon-qa {width: 60px;height:44px;text-align: center;color: #FFFFFF;font-size: 26px;}
.u-icon-qa:before {position: absolute;top:10px;right: 8px;width: 30px;height: 30px;background: #B4B4B4;-webkit-border-radius: 24px;border-radius: 24px;content: '';}
.u-icon-qa:after {position: absolute;top:10px;right: 16px;content: '?';}
.totalprice{text-align: center;}
.totalprice p{color: #FF6E40;font-size:20px;height:30px;line-height: 40px;}
.totalprice span{ font-size: 40px;}
.totalprice .pricetag{font-size: 18px;}
.chennel_row{width: 100%;height:300px;margin:0 0;}
.chennel_row .channel_list{
    width:864px;
    height:280px;
    -webkit-border-radius:2px;
    border-radius: 2px;
    /* box-shadow: 0 0 5px #eaeaea; */
    padding:0px 20px 0px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
    }
.chennel_row .channel_pic{ margin-top:20px;text-align: center;}
.push_row{width: 100%;height:600px;margin:0 0;}
.push_row .content_list{
    width:864px;
    height:500px;
    -webkit-border-radius:2px;
    border-radius: 2px;
    /* box-shadow: 0 0 5px #eaeaea; */
    padding:0px 20px 0px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
    }
.el-tag {background-color:#ffffff;padding: 0 20px;height: 32px;line-height: 30px;font-size: 12px;color: #7BD7A4;border-radius: 4px;-webkit-box-sizing: border-box;box-sizing: border-box;border: 1px solid #7BD7A4;white-space: nowrap;}
.notice_row{width: 100%;height:30px;margin: 30px 0 20px 0;}
.notice_row .notice{
    width:864px;
    height:30px;
    line-height: 30px;
    -webkit-border-radius:2px;
    border-radius: 2px;
    /* box-shadow: 0 0 5px #eaeaea; */
    padding:0px 20px 0px 20px;
    background: #ffffff;
    /* border:1px solid #eaeaea; */
    background-clip:padding-box;
    }
.notdata{margin-left: 330px;margin-top:60px;}
.notdata2{margin-left: 330px; margin-top:150px;}
/*弹框的样式*/
.tagsbox{
    height: 100px;  
}

.tagsbox li{
    list-style: none;
    float: left;
    width: 60px;
    height: 30px;
    /* border:1px red solid; */
    margin-top: 10px;
    margin-right: 10px;
}
/* .tag-icon{
     width: 0;
     height: 0;
     float: left;
     border-top: 15px solid transparent;
     border-right: 20px solid #FF6E40;
     border-bottom: 15px solid transparent;
     position: relative;
} */
.crl-icon{
    width: 5px;
    height: 5px;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    left:8px;
    top:-2px;
}
.tagtitle{
    float: left;
    width: 40px;
    background-color: #FF6E40;
}
.tagtitle span{
    color: #ffffff;
    margin-left:5px;
}
.userbase .el-dialog--center .el-dialog__header {
    border-bottom: 1px #cccccc solid;
    margin-left: 50px;
    width: 78%;
    padding:30px 30px 20px 30px;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #909399;
    margin-right: 20px;
}
.baseform{
   margin-left:55px;
}
.basetop{
    text-align: center;
}
.userbtn3{
    text-align: center;
    padding-top:30px;
    padding-bottom: 30px;
}
.userbtn3 .successbtn{
    width:20%;
    background-color: #18C26A;
    color: #ffffff;
}
.userbtn3 .backbtn{
     width:20%;
     margin-left:20px;
}
.baseform .el-input__inner {
    border: none;
    background-color: #F4F4F4;
    /* margin-right:-500px; */
}
.addbox .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-left:-2px;
    margin-bottom: 15px;
    background-color: #F4F4F4;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 12px;
    color:#57B9A1 ;
    width: 85px;
    height: 85px;
    line-height: 85px;
    text-align: center;
  }
.el-textarea__inner {
    background-color: #F4F4F4;
    border:none;
}
.el-form-item__label {
    text-align: right;
    float: left;
    padding: 0 18px 0 0;
}
.morelabel .el-form-item__label{
    margin-left:-14px;
}
.morelabel2 .el-form-item__label{
    margin-left: 10px;
    margin-right:5px;
}
.userbase .el-icon-plus:before {
    content: "";
}
.fixedbtn{width: 14%;height: 35px;padding-top:10px;background-color: #18C26A;color: #FFFFFF;}
.unfixedbtn{width: 14%;height: 35px;padding-top:10px;color: #18C26A;border: 1px solid #18C26A}
.userbtn3 .el-form-item__content {
    line-height: 20px;
    position: relative;
    font-size: 14px;
}
.taglabel{
    margin-left:24px;
    width:55px;
    margin-top:-10px; 
    color: #cccccc;
}
.taglabel span{margin-left:18px;}
.noticebox{width:330px;height:30px;border-top:1px #eaeaea solid;margin-top:45px;margin-left:100px;line-height: 5px;}
.noticebox p{color: #D2D2D2;}
.selecttype{width: 100%}
.el-input {width: 100%;}
.selecttype .el-input__inner {
    border: none;
    background-color: #FFFFFF;
}
.beforebtn{ width:20%;margin-left:20px;color: #cccccc}
.userbtn4{margin-top: 60px;}
.addtype{margin-left:10px;}
/* .el-form-item__label {
    color: #cccccc;
} */
.el-upload-dragger {
    border: none;
    background-color: #F4F4F4;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 360px;
    height: 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.el-upload-dragger .el-icon-upload {
    font-size: 30px;
    color: #c0c4cc;
    margin:-5px 0px 0px -300px;
    line-height: 50px;
}
.el-upload-dragger .el-upload__text {
    color: #606266;
    font-size: 14px;
    text-align: right;
    margin-top:-35px;
    padding-right:10px;
}
.el-upload-dragger .el-upload_select{
   float: left;
   padding-left:100px;
}
.videoupload{margin-left:-28px;}
.el-upload-dragger .el-upload__text em {
    color: #57B9A1;
    font-style: normal;
}
.el-upload-dragger .el-upload__text span{
    margin-right:120px;
}
.el-upload__tip {
    font-size: 12px;
    color: #cccccc;
    margin-top: 7px;
    margin-left: 75px;
}
.keyword{margin-left:-16px;}
.el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: none;
    
}
.el-upload-list__item-name {
    color: #606266;
    /* display: block; */
    margin-right: 40px;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
    -webkit-transition: color .3s;
    transition: color .3s;
    white-space: nowrap;
    display: none;
}
.el-upload-list__item .el-icon-close {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    opacity: .75;
    color: #606266;
}
.el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none;
}
</style>

