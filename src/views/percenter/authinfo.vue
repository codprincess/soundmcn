<template>
    <div class="authinfopage">
        <div class="authTitle">
        <div class="title-text">认证信息</div>
        </div>
        <div class="bage-line"></div>
        <div class="underline"></div>
        <!-- 个人信息 -->
        <div class="nomInfo" v-if="this.user_type == 1 ">   
            <!-- 用户类型 -->
            <el-row :gutter="20" class="type-1">
                <el-col :span="2"><div class="grid-content userTypes"><span> 用户类型</span></div></el-col>
                <el-col :span="3"><div class="grid-content nom">个人</div></el-col>
                <el-col :span="3"><div class="grid-content company"><div class="changeTypeBtn" @click="warningDialogVisible =true "  v-if="audit_status == 2">转为企业</div></div></el-col>
            </el-row>
            <!-- 用户信息 -->
            <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content realName">真实姓名</div></el-col>
                <el-col :span="10"><div class="grid-content userRealName"><span>{{ this.getuserinfo.real_name }}</span></div></el-col>
                <el-col :span="2"><div class="grid-content IDCard">身份证号</div></el-col>
                <el-col :span="10"><div class="grid-content IDNumber"><span>{{ this.getuserinfo.card }}</span></div></el-col>                    
            </el-row>
            <!-- 用户照片 -->
            <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content IDCardPhoto">身份证照</div></el-col>
                <el-col :span="5">
                    <!-- 正面照 -->
                    <div class="grid-content IDPhotoFace">
                        <div class="avatar-uploader" @click="Imgbig2">
                            <img v-if="imageUrl_front" :src="imageUrl_front" class="showphoto">
                            <img v-else src="../../assets/image/组 120.png">
                            <div class="top-pic2"><img src="../../assets/image/组 118.png"/></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <!-- 反面 -->
                    <div class="grid-content IDPhotoBack">
                        <div class="avatar-uploader2" @click="Imgbig3">
                            <img  v-if="imageUrl_back" :src="imageUrl_back" class="showphoto">
                            <img v-else src="../../assets/image/组 115.png">
                            <div class="top-pic2"><img src="../../assets/image/组 119.png"/></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- 认证状态 -->
                <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content YHzhuangtai">认证状态</div></el-col>
                <el-col :span="2">
                    <div class="grid-content auditing">
                        <div class="audit-text" :style="audit_status == 1 ? 'background:#FA5151':audit_status == 2?'background:#07C160':'background:#7e7f80'">
                            <i :class="audit_status==1 ?'iconfont icon-notpass-1-copy':audit_status==0 ?'iconfont icon-if_clock_':'iconfont icon-tongguo'">&nbsp;</i>{{audit_status == 0 ? "认证中...":((audit_status == 1) ? "认证失败":"认证成功")}}
                            <el-button class="reUploadBtn" v-if="audit_status == 1" @click="reUploadInfo">重新上传</el-button>
                        </div>
                    </div>    
                </el-col>
            </el-row>
            <div class="why" v-if="audit_status == 1">
                <span class="failInfo">失败原因</span><span class="failInfo-text" style="margin-left:23px" >{{ this.getuserinfo.note }}</span>
            </div>
        </div>
        <!-- 企业信息 ，部分CSS样式采用个人信息-->
        <div class="companyInfo" v-else-if="this.user_type == 2">
            <el-row :gutter="20" class="type-1">
                <el-col :span="2"><div class="grid-content userTypes"><span> 用户类型</span></div></el-col>
                <el-col :span="3"><div class="grid-content nom">企业</div></el-col>

            </el-row>
            <!-- 用户信息 -->
            <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content realName">公司名称</div></el-col>
                <el-col :span="10"><div class="grid-content userRealName"><span>{{ this.getuserinfo.company_name }}</span></div></el-col>
                <el-col :span="2"><div class="grid-content bankID">统一社会信用代码</div></el-col>
                <el-col :span="10"><div class="grid-content bankNumber"><span>{{ this.getuserinfo.business_license }}</span></div></el-col>                    
            </el-row>
            <!-- 营业执照 -->
            <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content IDCardPhoto">营业执照</div></el-col>
                <el-col :span="5">
                    <!-- 照 -->
                    <div class="grid-content registrationPhoto">
                        <div class="avatar-uploader" @click="Imgbig1">
                            <img :src="imageUrl" class="showphoto">
                            <div class="top-pic3"><img src="../../assets/image/组 116.png"/></div>
                        </div>
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
            <!-- 企业状态 -->
            <el-row :gutter="20">
                <el-col :span="2"><div class="grid-content YHzhuangtai">认证状态</div></el-col>
                <el-col :span="2">
                    <div class="grid-content auditing">
                        <div class="audit-text" :style="audit_status == 1 ? 'background:#FA5151':audit_status == 2?'background:#07C160':'background:#7e7f80'">
                            <i :class="audit_status==1 ?'iconfont icon-notpass-1-copy':audit_status==0 ?'iconfont icon-if_clock_':'iconfont icon-tongguo'">&nbsp;</i>{{audit_status == 0 ? "认证中...":((audit_status == 1) ? "认证失败":"认证成功")}}
                            <el-button class="reUploadBtn" v-if="audit_status == 1" @click="reUploadCompanyInfo">重新提交</el-button>
                        </div>
                    </div>    
                </el-col>
            </el-row >
            <div class="QYwhy" v-if="audit_status == 1">
                <span class="failInfo">失败原因</span><span class="failInfo-text" style="margin-left:23px" >{{ this.getuserinfo.note }}</span>
            </div>
            <!-- 查看大图 -->
        </div>
            <el-dialog :visible.sync="Imgbigbox1" width="30%" center>
                <img style="width:100%;height:100%;outline-width:0px;vertical-align:top;" :src="imageUrl" />
            </el-dialog>
            <el-dialog :visible.sync="Imgbigbox2" width="50%" center>
                <div><img style="width:100%;height:100%;outline-width:0px;vertical-align:top;" :src="imageUrl_front" /></div>
            </el-dialog>
            <el-dialog :visible.sync="Imgbigbox3" width="50%" center>
                <div><img style="width:100%;height:100%; outline-width:0px;vertical-align:top;" :src="imageUrl_back" /></div>
            </el-dialog>
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
            user_type:'',
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
            warningDialogVisible:false
        }
     },
     created(){
         this.getUserInfo()
     },
     methods:{
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
    //获取用户信息 
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
            this.user_type = response.data.data.user_type
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
    //重新上传个人信息
    reUploadInfo(){
        this.$router.push('/usersmsg')
    },
    //跳转上传公司信息
    reUploadCompanyInfo(){
        this.$router.push('/companymsg')
    }
    }
}
</script>
<style>
.authinfopage{
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
.authTitle{
    height: 53px;
    line-height: 54px;
}
.bage-line{
    height: 2px;
    width: 56px;
    background-color: #07C160;
    margin-left: 37px;
    position: absolute;
    margin-top: -1px;
}
.underline{
    width: 100%;
    height:1px;
    background-color: #f6f6f6;
}
.title-text{
    width: 64px;
    height: 16px;
    font-weight: 600;
    margin-left: 37px;
}

  .authinfopage .bg-purple1{
    text-align: center;
    background: #d3dce6;
    line-height: 40px;
    color: #1B1D1F
    }
.authinfopage .el-row{
    margin-bottom: 15px;
    margin-top: 10px;
}
.IDPhotoFace,.IDPhotoBack{
    width: 126px;
    height: 90px;
    margin-left: 40px;
    /* height: 68px; */
    border-radius: 10px;
    /* background: #d3dce6; */
}
.registrationPhoto{
    margin-left: 40px;
}
.registrationPhoto,.registrationPhoto .showphoto{
    width: 126px;
    height: 126px;
    border-radius: 10px;
    /* background: #d3dce6; */
    cursor: pointer;
}
.IDPhotoFace .showphoto,.IDPhotoBack .showphoto{
    width: 126px;
    height: 90px;
    display: block;
    border-radius: 10px;
    /* border:1px #eaeaea solid; */
    cursor: pointer;
}
.IDPhotoBack{
    margin-left: 0px
}
.contentEdit{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #07C160;
    text-align: center;
    line-height: 30px;
    position: absolute;
    margin-left: 75px;
    margin-top: 35px;
    box-shadow:2px 5px 5px #888888;
}
.userRealName,.IDNumber{
    line-height: 40px;
    /* background:#d3dce6; */
    /* border: 1px solid #EDEDED; */
    border-radius: 2px;
    text-align: left;
    /* padding-left: 20px; */
    /* margin-top: 10px; */
    width: 262px;
    margin: 10px 0 25px 0px;
}
.userRealName{
    margin-left: 40px;
}
.IDNumber{
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
.top-pic2{
    border-radius: 10px;
    margin-top: -90px;
    margin-left: 90px;
}
.top-pic3{
    border-radius: 10px;
    margin-top: -129.5px;
    margin-left: 90px;
}
.userTypes,.company{
    margin-left: 35px;
    width: 60px;
    margin-top: 30px;
    text-align: left;
    line-height: 40px;
    /* background: #d3dce6; */
}
 .nom{
    margin-left: 40px;
    width: 60px;
    margin-top: 30px;
    text-align: left;
    line-height: 40px;
}
.userTypes span{
    color: #7e7f80;
}
.changeTypeBtn{
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
.changeTypeBtn:hover,.changeTypeBtn:focus{
    background-color: #16b864;
    width: 86px;
    height: 30px;
    text-align: center;
    line-height: 31px;
    border-radius: 2px;
    color: #ffffff;
    /* background-color: #07C160; */
    cursor: pointer;
    margin-top: 34px;
    margin-left: -69px;
}
.IDCardPhoto{
    /* background-color: #ccc; */
    width: 60px;
    height: 40px;
    line-height: 40px;
    color: #7e7f80;
    text-align: left;
    margin-left: 35px;
}
.YHzhuangtai{
    height: 40PX;
    width: 60px;
    margin-top: 10px;
    text-align: left;
    line-height: 40px;
    margin-left: 35px;
    color: #7e7f80;

}

.nopass-text{
    margin-top: -20px;
    height: 40px;
    width: 300px;
    color: #fa5151;
    margin-left: 120px;
    /* background-color: #fafafa; */
    border-radius: 2px;
}
.auditing{
    width: 100px;
    height: 30px;
    text-align: center;
    /* background-color: #ccc; */
    margin-top: 10px;
    line-height: 30px;
    margin-left: 38px;
    padding-top: 5px;
}
.audit-text{
    padding: 3px 5px;
    width: 88px;
    height: 20px;
    line-height: 20px;
    background-color: #07c160;
    border-radius: 20px;
    color: #fff;
    /* margin-left: 10px; */
}
.audit-text i{
    font-size: 14px;
}
.reUploadBtn{
    width: 88PX;
    height: 28px;
    color: #fff;
    text-align: center;
    line-height: 5px;
    border-radius: 2px;
    border: none;
    /* background-color: #07C160; */
    color: #07C160;
    padding: 0;
    position: absolute;
    margin-left: 30px;
    margin-top: -3px;
}
.reUploadBtn:hover,.reUploadBtn:focus{
    width: 88PX;
    height: 28px;
    color: #fff;
    text-align: center;
    line-height: 5px;
    /* background-color: #16b864; */
    /* border: 1px solid #16b864; */
    color:#07c160 ;
    text-decoration: underline;
    border:none;
    background: #fff;
    padding: 0;
    position: absolute;
    margin-left: 30px;
    margin-top: -3px;
    border-radius: 2px;

}
.authinfopage .companyInfo .upload-text{
    height: 32px;
    width: 545px;
    color: #7e7f80;
    padding:  47px 20px;
    background-color: #fafafa;
    line-height: 20px;
    /* padding-top: 25px; */
    border-radius: 2px;
}
.authinfopage .companyInfo .upload-text h3,.upload-text p{
    margin: 0;
}
.bankID{
    /* position: absolute; */
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    color: #7e7f80;
    margin: 10px 20px 0px -10px;
}
.authinfopage .bankNumber{
    /* border: 1px solid #ededed; */
    border-radius: 2px;
    text-align: left;
    width: 262px;
    height: 40px;
    line-height: 40px;
    /* padding-left: 20px; */
    /* margin-left: 66px;
    margin-top: 10px; */
    margin: 10px 10px 0 50px;
}
.authinfopage .why{
    height: 40px;
    margin: 40px 0 30px 35px;
}
.authinfopage .why .failInfo{
    color: #7e7f80
}
.authinfopage .why .failInfo-text{
    color: #fa5151
}
.authinfopage .QYwhy{
    height: 40px;
    margin: 20px 0 30px 35px;
}
.authinfopage .QYwhy .failInfo{
    color: #7e7f80
}
.authinfopage .QYwhy .failInfo-text{
    color: #fa5151
}
.authinfopage .successinfobtn{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #07C160;
    background-color: #07c160;
}
.authinfopage .successinfobtn:hover{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #16b864;
    background-color: #16b864;
}
.authinfopage .backbtn{
    color: #7e7f80;  
    width: 80px;
    height: 30px;
    border: 1px solid #ededed;
    /* text-align: center; */
    padding:6px;
    line-height: 5px;
    border-radius: 2px;

}
.authinfopage .backbtn:hover{
    color: #7e7f80;
    background-color: #ededed;  
    width: 80px;
    height: 30px;
    border: 1px solid #cccc;
    /* text-align: center; */
    padding:6px;
    line-height: 5px;
    border-radius: 2px;

}
.el-dialog--center .el-dialog__body{
    padding: 0 0 1px 0px;
}
.authinfopage .editInfoBtn{
    margin: 10px 0 10px 320px;
}
.top-pic2 img{
    border-top-right-radius: 10px;
}
.top-pic3 img{
    border-top-right-radius: 10px;
}
</style>

