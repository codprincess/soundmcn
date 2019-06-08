<template>
    <div class="editpublish">
        <!--左列表-->
        <!-- <el-col :span="3">1</el-col> -->
        <!--上传音频主体-->
        <el-col :span="20">
            <div class="uploadbox">
               <el-form>
                   <el-form-item>
                       <!--上传音频-->
                        <div class="uploadaudio" v-show="notupload">
                           <a href="" class="audiofile">上传音频 <input class="file" name="file" type="file" accept="audio/mp3,audio/wav"  @change="update"/></a>
                        </div>
                        <!--重新上传-->
                        <div class="videoplay" v-show="hasupload">
                            <div class="upload_list">
                                <!-- <el-col :span="8"><div class="audioname">{{unPushEditList.title}}</div></el-col> -->
                                <el-col :span="8">
                                    <div class="audiopic">{{resourceName}}<audio :src="path" loop></audio></div>
                                </el-col>
                                <el-col :span="4"> <div class="uploadsuceess"><i class="el-icon-circle-check"></i>上传完成</div></el-col>
                            </div>
                            <div class="moreupload">
                                <a href="" class="reuploadbtn"><i class="el-icon-refresh"></i>重新上传<input class="file" name="file" type="file" accept="audio/mp3,audio/wav" @change="update"/></a>
                            </div>
                        </div>
                   </el-form-item>
                   <el-form-item>
                       <div class="titlebox">
                           <el-input v-model="title" placeholder="请在这里输入标题（30字内）" maxlength="30" @input="titleVal()"></el-input>
                           <!-- <textarea placeholder="从这里输入内容"></textarea> -->
                           <el-input v-model="about" type="textarea" maxlength="256" @input="aboutVal()" placeholder="从这里输入内容" rows="16" class="changarea"></el-input>
                       </div>
                   </el-form-item>
               </el-form>
            </div>
        </el-col>
        <!--右边栏-->
        <el-col :span="4" style="height: 800px; position: relative;background: #fff;">
            <el-row class="tac">
                <el-col :span="12">
                    <el-menu

                        default-active="2"
                        class="el-menu-vertical-demo backdemo"
                        @open="handleOpen"
                        @close="handleClose"
                        unique-opened>
                        <el-submenu index="1">
                            <template slot="title">  
                                <i class="icon-leimupinleifenleileibie2 iconfont"></i>                                                                                                                                                         
                                <span>请选择子分类</span>
                            </template>
                            <div class="childclass">
                                <ul>
                                    <li v-bind:class="[{ 'litag': index==isactive},{litag:cid==item.id}]" @click="getCateId(index,item.id)" v-for="(item,index) in childcateList" :key="index">{{item.name}}</li>
                                </ul>
                            </div>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="icon-qudao iconfont"></i>
                                <span>请选择渠道</span>
                            </template>
                            <div class="channelbox">
                                <ul>
                                    <div v-for="(item,index) in SectionList" :key="index"  style="height:80px;width:42px; margin-left:-20px;float:left;margin-right:40px;text-align:center">
                                        <li class="noSel"  :class='[{"yesSel":source_id.indexOf(item.id)>-1}]'>
                                            <img :src="item.cover" alt="item.name"  @click="getSourceId(item.id,index)"  style="width:42px;height:42px;border-radius:5px"/>
                                        </li>
                                        <span style="font-size:12px;">{{item.name}}</span>
                                    </div>
                                    
                                </ul>
                            </div>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                            <i class="icon-morenfengmiantu iconfont"></i>
                            <span>请设置封面</span>
                            </template>
                            <el-menu-item-group>
                                <div style="width: 168px;min-height: 178px; margin-left: -2px;background: #fff;margin-top: -13px;padding-top:20px;">
                                    <div class="cover-box" style="width:100px;height:100px;border:1px #ccc solid;margin-left:30px;">
                                        <div class="coverlogo" style="width:100px;height:100px">
                                            <el-upload 
                                                style="width:100px;height:100px"
                                                type="file"
                                                class="avatar-uploader"
                                                :action="actionUrl"
                                                ref="logoUrl"
                                                :show-file-list="false"
                                                :on-success="uploadSuccess"
                                                :before-upload="beforeUpload"
                                                :on-remove="removeHandler"
                                                :http-request="httpRequest"
                                                >
                                                <img v-if="logoUrl" :src="logoUrl" class="avatar" style="width:100px;height:100px;background-size: cover;">
                                                <i v-else class="avatar-uploader-iconedit">+</i>
                                                <!-- <div class="top-pic1"><img src="../assets/image/ID_front.png"/></div> -->
                                                
                                            </el-upload>
                                        </div>
                                    </div>
                                </div>
                            </el-menu-item-group>
                           
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="icon-shijian iconfont"></i>
                                <span>定时发布</span>
                            </template>
                            <el-menu-item-group>
                               <div style="width: 168px;min-height: 178px; margin-left: -2px;background: #fff;margin-top: -13px;padding-top:20px;" >
                                    <div class="block" style="width:140px;">
                                        <el-date-picker
                                            style="width:160px;margin-left:5px;"
                                            v-model="time"
                                            type="datetime"
                                            :picker-options="pickerOptions"
                                            placeholder="选择日期"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            >
                                        </el-date-picker>
                                    </div>
                                    <!--取消定时-->
                                    <div style="width:140px;text-align:center;"><el-button @click="delTime()" style="margin-top:20px;color:#18C26A;border:1px #18C26A solid;">取消定时</el-button></div>
                               </div>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                    <div class="savecontent" style="" v-if="editid==null">
                        <el-button  style="float:left" :disabled="isDisable"  @click.stop="addsavePush()">{{saveText}}</el-button>
                        <el-button style="width:50%;" :disabled="isDisableadd"  @click.stop="addPush()">{{buttonText}}</el-button>
                    </div>
                    <div class="savecontent" style="" v-else>
                        <el-button  style="float:left" :disabled="isDisable" @click.stop="DraftUpdate()">{{saveText}}</el-button>
                        <el-button style="width:50%;" :disabled="isDisableadd"  @click.stop="unPushUpdate()">{{buttonText}}</el-button>
                    </div>
                    <!-- <div class="addcontent" @click="addPush()" style="">{{buttonText}}</div> -->
                    <!-- <div @click="unPushUpdate()" v-else style="background:#2F5CED;width:167px;height:40px;line-height:40px;text-align:center;color:#fff;cursor: pointer;position: absolute;top:760px;">立即发布2</div> -->
                </el-col>
            </el-row>

        </el-col>
        <!--离开页面时提示框-->
         <el-dialog width="412px" title="" :visible.sync="savebox" center>
            <div class="sheltag" style="text-align:center"><p>您还没保存是否需要退出？</p></div>
            <div class="shelbtn">
                <el-button @click="addsavePush()" style="width:40%" class="confirmbtn" >保存</el-button>
                <!-- <el-button style="width:40%"  icon="##" @click="savebox=false" >{{}}</el-button> -->
            </div>
        </el-dialog>
        <div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
// import {formatDate} from '@/assets/js/date.js';
import dtime from 'time-formater'
export default {

    data(){
        return{
            changeFlag:false,
            isDisable:false,
            isDisableadd:false,
            resourceName:'',
            value:'',
            savebox:false,
            notupload:true,
            hasupload:false,
            fileList:[],
            querySystemcate:[],
            actionUrl:'',
            logoUrl:'',
            title:'',
            about:'',
            contentHasSave: false ,//记录用户是否保存内容
            outText:'退出',
            saveText:'保存',
            buttonText:'立即发布',
            type:'',//发行类型0=发布，1=草稿
            source_id:[],
            audioid:'',
            time:'',
            file:{
                ext:'',
                creator:'',
                updateTime:'',
                invalidTime:'',
                duration:'', 
                path:'',
                size:'',
                createTime:'',
                updator:'',
                id:'',
                status:''
            },
            cid:'',
            cover_id:'',

            unPushEditList:{},
            childcateList:[{}],
            SectionList:[{}],
            path:'',
            allSource:'',
            // cateId:38,
            editid:'',
            isactive:-1,
            selstatus:'',
            cateId:localStorage.getItem('cateId'),
            //时间选择限制
            pickerOptions:{
                disabledDate(time){
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
        }
    },
    computed:{
        if(time = null){
            time='';
        }
    },
    created(){
        this.editid= this.$route.params.id,//编辑id
        this.getSectionSource();
        this.unPushEdit();
        this.getqueryUser();
        // this.getAllSource();
        // this.getHeardToken();
    },
    //  组件内导航钩子，处理未保存退出的情况
    beforeRouteLeave:function(to,from,next){
        if(this.saveText=='保存' && this.changeFlag == true ){
             next(false)
             this.$confirm('是否保存当前的内容?', '提示', {
                cancelButtonText: '是',
                confirmButtonText: '否',
                type: 'warning'
            }).then(() => {
                //this.changeFlag = false;
                next()

            })
        }else if(this.saveText=='已存'){
            next();
            //this.$router.push('/notpublish');

        }else{
            next();
        }
    },
    methods:{
        //formatTime
        timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            console.log(date);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ?  '0'+(date.getDate()) : date.getDate())+ ' ';
            var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
            console.warn(Y+M+D+h+m+s)
            return Y+M+D+h+m+s;
        },

        //取消定时
        delTime(){
            this.time = '';
        },
        //标题数字限制
        titleVal(e){
            if(this.title.length>0){
                this.changeFlag = true;
                if(this.title.length>=30){
                    this.$message({
                        message:'最多只能输入30个字',
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'  
                    })
                
                }
            }else{
                this.changeFlag = false;
            }
            console.log(this.changeFlag);
        },
        //内容数字限制
        aboutVal(e){
            if(this.about.length>0){
                this.changeFlag = true;
                if(this.about.length>=256){
                    this.$message({
                        message:'发行内容不能超过256个字',
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                        
                    })
                }
                console.log(this.changeFlag);
            }else{
                this.changeFlag = false;
                 console.log(this.changeFlag);
            }
           
           
        },

        //延迟执行
        // uploadFile(){
        //     this.getHeardToken();
        //     setTimeout(() =>{
        //        this.update()
        //     },500);
        // }
        
        //获取声音银行的token
         getHeardToken(){
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/upload/getBankSign',
                method:'post'
            }).then(response=>{
                //console.log('声音银行的token',response);
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
        // 图片上传前验证
        //上传音频
        update(e){
            this.getHeardToken();
            setTimeout(()=>{
                let file = e.target.files[0];
                let param = new FormData(); 
                param.append('file',file);
                if(!/\.(mp3|wav)$/.test(file.name)){
                    this.$message({
                        message:'请上传MP3,WAV格式的音频文件',
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }else{
                    let config = {
                    headers:{
                        'Content-Type':'multipart/form-data',
                        'signature':localStorage.getItem('sign'),
                        'accessKey':localStorage.getItem('accessKey'),
                        'time':localStorage.getItem('timestap'),
                        },
                        
                    }; 
                    this.$http.post('https://center.soundatm.heard-gl.com/api/core/v1/audio/upload.json',param,config)
                    .then(response=>{
                        console.log(response);  
                        if(response.data.code==1){
                            this.notupload = false;
                            this.hasupload = true;
                            // this.audio_id = response.data.data.id
                            this.ext = response.data.data.ext;
                            this.creator = response.data.data.creator;
                            this.updateTime = response.data.data.updateTime;
                            this.invalidTime = response.data.data.invalidTime;
                            this.duration = response.data.data.duration;
                            this.audio_path = response.data.data.path;
                            this.size = response.data.data.size;
                            this.createTime = response.data.data.createTime;
                            this.updator = response.data.data.updator;
                            this.audioid = response.data.data.id;
                            this.status= response.data.data.status;
                            this.resourceName = response.data.data.resourceName;
                            this.changeFlag = true;
                        }else if(response.data.code==9){
                            this.$message({
                                message:'签名过期',
                                type:'error',
                                center: true,
                                customClass:'user-defind-style'
                            })
                        }
                            
                    })
                }
            //console.log(file.name)
            //console.log(param.get('file')); 
            },500)
            
        
        },
        //获取子分类
        getqueryUser(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/category/queryUser',
                method:'post',
                data:{
                    status:2, 
                    section_id:this.cateId
                } 
            }).then(response=>{
                if(response.data.code==200){
                    this.childcateList = response.data.data;
                    //console.log(this.childcateList);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //点击获取分类 
        getCateId(index,id){
            this.isactive=index;
            this.cid = id;
            this.changeFlag = true;
           // console.log(this.cid);
        },
        //点击获取渠道id
        getSourceId(id,index){

            let idindex = this.source_id.indexOf(id)
            if(idindex>=0){
                this.source_id.splice(idindex,1)
            }else{
                this.source_id.push(id);
                this.changeFlag = true;
                //this.$set(this.source_id);
                console.log(this.source_id);
            }

        },
        //获取栏目渠道信息
        getSectionSource(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/sources/manage/section',
                method:'post',
                data:{
                    //栏目id
                    id:this.cateId,
                    //渠道状态
                     status:1,
                    // type:2
                }
            }).then(response=>{
                if(response.data.code==200){
                    this.SectionList = response.data.data.data;
                     console.log('渠道', this.SectionList);
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //草稿修改,修改之后上传
        DraftUpdate(){
            if(this.title==''){
                this.$message({
                    message:'标题不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.about==''){
                 this.$message({
                    message:'内容不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
             }else{
                  this.isDisable = true;
                    axios({
                        headers:{
                            'auth-key': localStorage.getItem('token')
                        },
                        url:this.API+'/content/content/DraftUpdate',
                        method:'post',
                        data:{
                            title:this.title,
                            about:this.about,
                            cid:this.cid,
                            // audio_id:this.audio_id,
                            source_id:this.source_id,//渠道id
                            cover_id:this.cover_id,
                            section_id:this.cateId,//栏目id
                            type:0,
                            time:this.time,
                            file:{
                                ext:this.ext,
                                creator:this.creator,
                                updateTime:this.updateTime,
                                invalidTime:this.invalidTime,
                                duration:this.duration,
                                path:this.audio_path,
                                size:this.size,
                                createTime:this.createTime,
                                updator:this.updator,
                                id:this.audioid,
                                status:this.status,
                                resourceName:this.resourceName 
                            },
                            id:this.editid
                        }
                    }).then(response=>{
                        
                        if(response.data.code==200){
                            this.saveText = '已存'
                            this.$message({                                                                                                                                                                                         
                                message:'已存',
                                type:'success',
                                center: true,
                                customClass:'user-defind-style'
                            })
                            this.isDisable = false;
                            this.$router.push('/notpublish');
                        }else{
                            this.$message({
                                message:response.data.msg,
                                type:'error',
                                center: true,
                                customClass:'user-defind-style'
                            })
                            this.isDisable = false;
                        }
                    })
             }
           
        },

        //未发布编辑，获取编辑的内容
        unPushEdit(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/content/content/unPushEdit',
                method:'post',
                data:{
                    id:this.editid
                }
            }).then(response=>{
                if(response.data.code==200){                       
                    console.log('!!!!!!!!!!',response);
                    this.unPushEditList = response.data.data;
                    this.title = response.data.data.title;
                    this.about = response.data.data.about;
                    this.logoUrl = response.data.data.cover_path;
                    this.audio_path = response.data.data.audio_path;
                    this.audioid = response.data.data.audio_id;
                    this.size = response.data.data.audio_size;
                    this.cid = response.data.data.cid;
                    this.cover_id = response.data.data.cover_id;
                    this.contentId = response.data.data.id;
                    this.time = response.data.data.time==''?'':this.timestampToTime(response.data.data.time);
                    //this.time = 
                    //console.log('12344',this.time);
                    this.sourceList = response.data.data.sources;
                    for(var i = 0; i < this.sourceList.length;i++){
                        this.source_id.push(this.sourceList[i].id);
                        //console.log(this.source_id);
                    }
                    this.resourceName  = response.data.data.audio_name;

                    if(this.resourceName==''){
                        this.notupload = true;
                    }else{
                        this.notupload = false
                        this.hasupload = true;
                    }
                }

            })
        },
        dateChangebirthday(val) {
            this.time = val;
        },

        //时间转化
        // TimesChang(time){
            
        // },

        //保存草稿
        addsavePush(){
            if(this.title==''){
                this.$message({
                    message:'标题不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.about==''){
                 this.$message({
                    message:'内容不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
             }else{
                this.isDisable = true;
                axios({
                    headers:{
                        'auth-key': localStorage.getItem('token')
                    },
                    url:this.API+'/content/content/addDraft',
                    method:'post',
                    data:{
                        title:this.title,
                        about:this.about,
                        cid:this.cid,
                        // audio_id:this.audio_id,
                        source_id:this.source_id,//渠道id
                        cover_id:this.cover_id,
                        section_id:this.cateId,//栏目id
                        type:0,
                        time:this.time,
                        file:{
                            ext:this.ext,
                            creator:this.creator,
                            updateTime:this.updateTime,
                            invalidTime:this.invalidTime,
                            duration:this.duration,
                            path:this.audio_path,
                            size:this.size,
                            createTime:this.createTime,
                            updator:this.updator,
                            id:this.audioid,
                            status:this.status,
                            resourceName:this.resourceName 
                        }

                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.$message({
                            message:'已保存',
                            type:'success',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        this.saveText = '已存'
                        this.isDisable = false;
                        this.$router.push('/notpublish');
                    }else{
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        this.isDisable = false;
                    }
                })
            }
            
        },

        //未发布修改点击发布
        unPushUpdate(){
            if( this.audioid==''){
                this.$message({
                    message:'请上传音频文件',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            if(this.title==''){
                this.$message({
                    message:'标题不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }

            else if(this.about==''){
                this.$message({
                    message:'内容不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.cid==''){
                this.$message({
                    message:'请选择一个子分类',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.source_id==''){
                this.$message({
                    message:'至少选择一个渠道',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.cover_id==''){
                this.$message({
                    message:'请选择图片',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                axios({
                    headers:{
                        'auth-key': localStorage.getItem('token')
                    },
                    url:this.API+'/content/content/unPushUpdate',
                    method:'post',
                    data:{
                        title:this.title,
                        about:this.about,
                        cid:this.cid,
                        // audio_id:this.audio_id,
                        source_id:this.source_id,//渠道id
                        cover_id:this.cover_id,
                        section_id:this.cateId,//栏目id
                        type:1,
                        time:this.time,
                        file:{
                            ext:this.ext,
                            creator:this.creator,
                            updateTime:this.updateTime,
                            invalidTime:this.invalidTime,
                            duration:this.duration,
                            path:this.audio_path,
                            size:this.size,
                            createTime:this.createTime,
                            updator:this.updator,
                            id:this.audioid,         
                            status:this.status,
                            resourceName:this.resourceName 
                        },
                        id:this.editid
                    }
                }).then(response=>{
                    if(response.data.code==200){
                        this.$message({
                            message:'发布成功，审核通过后将为您发行至渠道',
                            type:'success',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        this.$router.push('/haspublish');
                    }else{
                        this.$message({
                            message:'发布失败',
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                    }
                })
            }
        },

        //发布内容
        addPush(){
            if( this.audioid==''){
                this.$message({
                    message:'请上传音频文件',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.title==''){
                this.$message({
                    message:'标题不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }

            else if(this.about==''){
                this.$message({
                    message:'内容不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.cid==''){
                this.$message({
                    message:'请选择一个子分类',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.source_id==''){
                this.$message({
                    message:'至少选择一个渠道',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else if(this.cover_id==''){
                this.$message({
                    message:'请选择图片',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            else{
                this.isDisableadd = true;
                axios({
                    headers:{
                        'auth-key': localStorage.getItem('token')
                    },
                    url:this.API+'/content/content/addPush',
                    method:'post',
                    data:{
                        file:{
                            ext:this.ext,
                            creator:this.creator,
                            updateTime:this.updateTime,
                            invalidTime:this.invalidTime,
                            duration:this.duration,
                            path:this.audio_path,
                            size:this.size,
                            createTime:this.createTime,
                            updator:this.updator,
                            id:this.audioid,
                            status:this.status,
                            resourceName:this.resourceName 
                        },
                        title:this.title,
                        about:this.about,
                        cid:this.cid,
                        source_id:this.source_id,//渠道id
                        cover_id:this.cover_id,
                        section_id:this.cateId,//栏目id
                        type:1,
                        time:this.time,
                        
                    
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.$message({
                            message:'发布成功，审核通过后将为您发行至渠道',
                            type:'success',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        this.$router.push('/haspublish');
                    }else{
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                    }
                })

            }
            
        },

        //封面图片上传
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
                    url: this.API+'/system/upload/qiniu',
                    method: 'post',
                    // file: file,
                    data: {
                        file: base64Str,
                        type: "7",
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
                       // console.log(res);
                        this.logoUrl = base64Str;
                        this.cover_id = res.data.data.id;
                        //console.log(this.cover_id);
                        options.onSuccess(res, file);
                        this.changeFlag = true;
                })
                .catch(err => {
                    options.onError(err)
                })
            }
        },
        removeHandler (file, fileList) {
           
        },
        beforeUpload (file) {
             const isgif = file.type === 'image/gif';
            const isbmp = file.type === 'image/bmp';
            const isjpeg = file.type ==='image/jpeg';
            const ispng = file.type ==='image/png';
             if(!isbmp && !isjpeg && !ispng){
                this.$message({
                    message:'请上传bmp,jpg,png格式的图片',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }
            return isbmp || isjpeg ||  ispng;
        },
        uploadSuccess (res, file, fileList) {
            let data = res.data
            console.log('upload result:', res, file)
            file.key = data.key
            this.fileList.push(data.key)
        },
        handleOpen(key, keyPath) {
           
        },
        handleClose(key, keyPath) {
            
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
.editpublish .el-dropdown-menu__item--divided:before, .backdemo, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: #ffffff !important;
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
.editpublish{
    width: 1000px;
    height:800px;
    border:1px #cccccc solid;
    margin:30px auto;
}
.editpublish .uploadbox{
    width: 790px;
    height:748px;
    box-shadow: 0 0 1px #eaeaea;
    padding:35px 20px 15px 20px;
    background: #ffffff;
    /* border:1px solid #eaeaea; */
    background-clip:padding-box;
    text-align: center;
}
.editpublish .el-input--prefix .el-input__inner {
    padding-left: 23px;
}
.editpublish .uploadbtn{
    padding:12px 90px 12px 90px;
    background-color: #18C26A;
    color: #ffffff;
    font-size: 16px;
    margin-top:100px;
}
.editpublish .el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: none;
}

.editpublish .videoplay{
    height:100px;
    margin-top:100px;
    margin-left:32px;
}
.editpublish .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: block;
}
.editpublish .uploadbox .titlebox .el-input__inner {
    border-radius: 0px;
    border:none;
    border-top: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    height: 75px;
    line-height: 75px;
    width: 100%;
    font-size: 22px;
    font-weight: bold;
}
.editpublish .titlebox{
    margin-top: 90px;
}

.changarea .el-textarea__inner{
    margin-top:10px;
    border: none;
    resize:none;
    background: #ffffff;
    /* border: #FF6E40 1px solid; */
}

.editpublish .el-icon-document:before {
    content: "";
}
.editpublish .moreupload{
    width:200px;
    margin-left:40px;
    margin-top:-50px;
}
.editpublish .moreupload .reuploadbtn{
    position: relative;
    display: inline-block;
    border: 1px solid #18C26A;
    border-radius: 4px;
    overflow: hidden;
    color: #18C26A;
    /* padding: 8px 100px; */
    padding-left: 60px;
    padding-right: 60px;
    text-decoration: none;
    text-indent: 0;
    line-height: 40px;
    height: 40px;

}
.editpublish .moreupload .reuploadbtn input {
   position: absolute;
    font-size: 40px;
    right: 0;
    top: 0;
    width: 200px;
    opacity: 0;
    opacity: 0;
}

.editpublish .uploadsuceess{
    color: #18C26A;
}
/*右边栏*/
.editpublish .el-icon-location:before {
    content: "";
}
.editpublish .el-icon-arrow-down:before {
    content: "";
}
.editpublish .el-menu {
    border:none;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    /* margin-left: -4px; */
    width: 0px;
}
.editpublish .el-submenu__title:hover {
    background-color: #F7F7F7;
}
.editpublish .el-menu-item:hover {
    background-color: #F7F7F7;
}
.editpublish .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: #F7F7F7;
}
.editpublish .childclass{width:150px;height:100px;margin-left:10px;}
.editpublish .childclass ul {
    width: 130px;
}
.editpublish li{ list-style: none;}
.editpublish .childclass ul li{
    height:30px;
    line-height: 30px;
    width:58px;
    float: left;
    margin-left:-30px;
    border:1px #18C26A solid;
    text-align: center;
    margin-right:35px;
    margin-top:10px;
    border-radius: 5px;
    color: #18C26A;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.editpublish .childclass{
    width: 168px;
    /* height: 600px; */
    min-height: 100px;
    margin-left: -2px;
    background: #fff;
}
.editpublish .childclass ul {
    width: 130px;
}
.editpublish .currchildclass ul li{
    height:30px;
    line-height: 30px;
    width:58px;
    float: left;
    margin-left:-30px;
    border:1px #18C26A solid;
    text-align: center;
    margin-right:35px;
    margin-top:10px;
    border-radius: 5px;
    color: #18C26A;
}
.editpublish .channelbox {
    width: 168px;
    min-height: 100px;
    margin-left: -2px;
    background: #fff;
}
.editpublish .channelbox ul{width: 130px;}
.editpublish .channelbox ul .noSel{
    height:42px;
    line-height: 40px;
    width:42px;
    /* float: left; */
    /* margin-left:-20px; */
    text-align: center;
    margin-right:35px;
    margin-top:10px;
    border: 1px #cccccc solid;
    border-radius: 5px;
}
.editpublish .channelbox ul .yesSel{
    height:42px;
    line-height: 40px;
    width:42px;
    /* float: left; */
    /* margin-left:-20px; */
    text-align: center;
    margin-right:35px;
    margin-top:10px;
    border: #18C26A 1px solid;
    border-radius: 5px;
    opacity: 0.5;
}
.editpublish .uploadaudio{
    margin-top: 80px;
}

.editpublish .uploadaudio .audiofile{
    position: relative;
    display: inline-block;
    background: #18C26A !important;
    border: 1px solid #18C26A !important;
    border-radius: 4px;
    padding: 8px 100px;
    overflow: hidden;
    color: #ffffff;
    text-decoration: none;
    text-indent: 0;
    line-height: 34px;

}
.editpublish .uploadaudio .audiofile input {
    position: absolute;
    font-size: 40px;
    right: 0;
    top: 0;
    width: 300px;
    opacity: 0;
}
.editpublish .uploadaudio .audiofile:hover {
    background: #18C26A !important;
    border-color: #18C26A !important;
    color: #ffffff !important;
    text-decoration: none;
}
.editpublish .el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
    width: 100px;
}
.editpublish .avatar-uploader-iconedit {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height:100px;
    text-align: center;
}
.editpublish .dataselect .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 10px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.editpublish .dataselect .el-input__icon {
    height: 100%;
    width: 25px;
    text-align: center; 
    -webkit-transition: all .3s;
    transition: all .3s;
    line-height: 30px;
}

.editpublish .el-submenu__title{
    padding-left: 20px;border-bottom:1px #ccc solid;width:168px;margin-left:-1px;
    height: 40px;
    line-height: 40px;
    color: #BDBDBD;
    background: #f7f7f7;
}
.savecontent{
   width:167px;height:40px;line-height:40px;color:#fff;cursor: pointer;position: absolute;top:760px;
}
.editpublish .childclass ul .litag {
    height: 30px;
    line-height: 30px;
    width: 58px;
    float: left;
    margin-left: -30px;
    border: 1px #18C26A solid;
    text-align: center;
    margin-right: 35px;
    margin-top: 10px;
    border-radius: 5px;
    color: #ffffff;
    background: #18C26A;
}
.noSel{
    
}
/* .addcontent{
    background:#2F5CED;width:80px;height:40px;line-height:40px;text-align:center;color:#fff;cursor: pointer;position: absolute;top:760px;
} */
</style>


