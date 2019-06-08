<template>
    <div class="addCatePage">
        <div class="fnTitle">
            <div class="title-text">添加栏目</div>
        </div>
        <div class="bage-line"></div>
        <div class="underline"></div>
        <div class="cateContent">
            <el-form class="baseform">
                <div class="first-one">
                    <!-- 第一步 -->
                    <div class="basetop"><span>基本信息</span></div>
                    <div class="underline"></div>
                    <div class="triangle"></div>
                    <el-form-item label="栏目名称" class="cateNameTable">                             
                        <el-input v-model="name" @input="checkCateExists()" maxlength="10" placeholder="" style="width:344px;height:40px;border-radius:2px;"></el-input>  
                        <!-- <span style="margin-left: -30px;" :class="{ 'successmsg': isA, 'errorMsg': isB}">{{Errnote}}</span> -->
                        <!-- <p style="color:#ff6e40;margin-left: 72px;line-height: 4px;">{{errortxt}}</p> -->
                    </el-form-item>
                    <div class="hint-text"><span><b>温馨提示：</b>栏目名一旦设置不可修改</span></div>
                    <el-form-item label="栏目Logo" class="cateLogo">
                        <div class="upload-box"
                        v-loading="logoLoading"
                        element-loading-text="正在上传..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
                            <el-upload 
                                type="file"
                                class="avatar-uploader"
                                :action="actionUrl"
                                ref="logoUrl"
                                :show-file-list="false"
                                :on-success="uploadSuccess"
                                :before-upload="beforeUpload"
                                :on-remove="removeHandler"
                                :http-request="httpRequest"
                                accept="image/jpeg,image/png"
                                >
                                <img v-if="logoUrl" :src="logoUrl" class="avatar" style="width:100px;height:100px;">
                                <i v-else class="iconfont icon-camera_icon" style="font-size:65px;position: absolute;margin-left: -33px;margin-top: 25px;"></i>
                                <!-- <div class="top-pic1"><img src="../assets/image/ID_front.png"/></div> -->
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item label="简单介绍" class="morelabel" > 
                        <el-input v-model="briefing" @input="briefingVal()" maxlength="15" placeholder="最多可输入2-15个字" style="width:740px;height:40px;" :class="{'redinput': isBB}"></el-input>
                        <!-- <p style="color:#ff6e40;margin-left: 72px;line-height: 4px;">{{morebriefing}}</p> -->
                    </el-form-item>
                    <el-form-item label="内容简介"> 
                        <el-input @input="textVal" maxlength="256" v-model="about" type="textarea" placeholder="最多可输入256个字" class="conteninput" style="width: 740px;" rows="4"></el-input>  
                    </el-form-item>
                    <el-form-item label="关键词" class="morelabel2"> 
                        <el-input v-model="keywords" placeholder="关键词之间用“、”隔开" style="width:740px;margin-left:14px;"></el-input>  
                    </el-form-item>
                </div>
                <!-- 第二步 -->
                <div class="secend-step">
                    <div class="basetop"><span>栏目设置</span></div>
                    <div class="underline"></div>
                    <div class="triangle" style="margin-bottom:10px;"></div>
                    <el-form-item>
                    <el-col :span="2" class="catetag">
                        <label style="color:#ccc">更新时段</label>
                    </el-col>
                    <el-col :span="14" class="catetag">
                            <div class="datebox" style="margin-left:20px;">
                                <el-col :span="4" class="databox-time">
                                    <el-select v-model="cycle" placeholder="请选择" @change="getCycle(cycle)" style="width:85px;">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.cycle"
                                        :label="item.label"
                                        :value="item.cycle">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4" class="databox-week">
                                    <el-select :disabled="disabledweek" v-model="week" placeholder="请选择" @change="getWeek(week)" style="width:85px;">
                                        <el-option
                                        v-for="item in options2"
                                        :key="item.week"
                                        :label="item.label"
                                        :value="item.week">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4" class="databox-hours">
                                    <el-select  :disabled="disabled" v-model="hour" placeholder="0"  @change="getHour(hour)" style="width:70px;">
                                        <el-option
                                        v-for="item in options3"
                                        :key="item.hour"
                                        :label="item.label"
                                        :value="item.hour">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="1" class="chosehours">时</el-col>
                                <el-col :span="4" class="databox-hours">
                                    <el-select  :disabled="disabled" v-model="minute" placeholder="0"  @change="getMinute(minute)" style="width:70px;">
                                        <el-option
                                        v-for="item in options4"
                                        :key="item.minute"
                                        :label="item.label"
                                        :value="item.minute">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="1" class="chosehours">分</el-col>
                            </div>
                    </el-col>
                    <div class="addTimeBtn" @click="addTime" v-if="this.cycle != 3">添加</div>
                    </el-form-item>
                    <div class="addtimeDiv">
                        <el-tag
                        v-for="(item,index) in time"
                        :key="item.index"
                        >
                            {{item.cycle==1?'每周 / ':item.cycle == 2?'每日 / ':""}}{{item.week==1?'周一 / ':item.week==2?'周二 / ':item.week==3?'周三 / ':item.week==4?'周四 / ':item.week==5?'周五 / ':item.week==6?'周六 / ':item.week==7?'周日 / ':''}}{{item.hour}}:{{item.minute}}
                            <i class="el-icon-close" @click="deltime(index)"></i>
                        </el-tag>
                    </div>
                    <el-form-item>
                        <el-col :span="3" class="catetag">
                            <label style="color:#ccc;">内容类型</label>
                        </el-col>
                        <el-col :span="18" class="catetags">
                                <div class="tagsbox">  
                                    <li v-for="(item,index) in querySystemcate" :key="index"   @click='addquerySystemcate(item.id,$event,index)'>
                                        <div  v-bind:class='{"Selistagtitle":cid.indexOf(item.id)>-1}' class="Notagtitle"  style="cursor:pointer"><span>{{item.name}}</span></div>
                                    </li>
                                </div>
                        </el-col>
                    </el-form-item>
                </div>
                <!-- 第三步 -->
                <div class="third-step">
                    <div class="basetop"><span>测试数据</span></div>
                    <div class="underline"></div>
                    <div class="triangle" style="margin-bottom:10px;"></div>
                    <el-form-item label="测试标题"> 
                    <el-input @input="applyVal" v-model="apply_title"  maxlength="30" placeholder="点击输入测试标题" style="width:740px" :class="{'redinput': isBB}"></el-input>  
                    <p style="color:#ff6e40;margin-left: 72px;line-height: 4px;">{{apply_titleing}}</p>
                </el-form-item>
                <el-form-item label="测试简介"> 
                    <el-input @input="textVal" v-model="content"  maxlength="256" type="textarea" placeholder="最多可输入256个字" class="conteninput" style="width:740px;" rows="4"></el-input>  
                </el-form-item>
                <el-form-item label="测试封面">
                    <!-- <div class="testLoading" 
                    v-loading="testLogoLoading"
                    element-loading-text="正在上传..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    ></div> -->
                    <div class="upload-box"
                    v-loading="testLogoLoading"
                    element-loading-text="正在上传..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)">
                       <el-upload 
                            type="file"
                            class="avatar-uploader"
                            :action="actionUrl"
                            ref="testUrl"
                            :show-file-list="false"
                            :on-success="uploadSuccess2"
                            :before-upload="beforeUpload2"
                            :on-remove="removeHandler2"
                            :http-request="httpRequest2"
                            accept="image/jpeg,image/png"
                            >
                            <img v-if="testUrl" :src="testUrl" class="avatar" style="width:100px;height:100px;">
                            <i v-else class="iconfont icon-camera_icon" style="font-size:65px;position: absolute;margin-left: -33px;margin-top: 25px;"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="上传音频" class="videoupload"> 
                   <a href='javascript:void(0);' class="upaudio"
                    v-loading="fileLoading"
                    element-loading-text="正在上传..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)">
                       <i class="el-icon-upload" style="padding-right:10px;padding-left:10px;color:#07c160;float: left;margin-top: 14px;"></i>
                       <span v-if="uploadfile==''" class="choiceFile">选择您要的音频文件</span>
                       <span v-else class="choiceFile">{{uploadfile}}</span>
                       <input class="file" name="file" type="file" accept="audio/mp3,audio/wav" @change="update"/>
                       <span style="padding-right:10px;color:#57B9A1; cursor: pointer;float: right;">点击上传</span>
                   </a>
                    <div class="hint-text" style="margin-top:0px;"><span><b>温馨提示：</b>目前仅支持.mp3和.wav格式的音频文件</span></div>
                </el-form-item>
                </div>
                <div class="userbtn3">
                <el-button  class="backBtn">返回</el-button>
                <el-button  @click.stop="addCateApply()" class="successBtn">完成</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    inject:['reload'],
    name:'AddChannel',
    data(){
        return{
            logoLoading:false,
            testLogoLoading:false,
            fileLoading:false,
            //表单内容
            uploadfile:'',
            disabled:false,
            // classItem:'',
            addinfoVisible:false,
            sconsetcate:false,
            uploadDialogVisible:false,
            // Selectchannel:false,
            dynamicTags: [],
            inputVisible: false,
            checkAll: false,
            isIndeterminate: true,
            isShow:false,
            name: '',
            actionUrl:this.API+'/system/upload/qiniu',
            fileList: [],
            fileReader: '',
            logoUrl: '',
            testUrl:'',
            videoUrl:'',
            title:'',
            name:'',
            childname:'',
            logo:'',
            briefing:'',
            about:'',
            keywords:'',
            timing:1,
            cycle:'',
            week:'',
            hour:'',                            
            minute:'',
            time:[],
            cid:[],
            child:[],
            cover:'',
            apply_title:'',
            content:'',
            sid:[],
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
            // active:'',
            value:'',
            value2:'',
            value3:'',
            options:[{cycle:'1',label:'每周'},{cycle:'2',label:'每日'},{cycle:'3',label:'无固定'}],
            options2:[{week:'1',label:'周一'},{week:'2',label:'周二'},{week:'3',label:'周三'},{week:'4',label:'周四'},{week:'5',label:'周五'},{week:'6',label:'周六'},{week:'7',label:'周日'}],
            options3:[
                    {hour:'01',label:'01'},{hour:'02',label:'02'},{hour:'03',label:'03'},{hour:'04',label:'04'},
                    {hour:'05',label:'05'},{hour:'06',label:'06'},{hour:'07',label:'07'},{hour:'08',label:'08'},
                    {hour:'09',label:'09'},{hour:'10',label:'10'},{hour:'11',label:'11'},{hour:'12',label:'12'},
                    {hour:'13',label:'13'},{hour:'14',label:'14'},{hour:'15',label:'15'},{hour:'16',label:'16'},
                    {hour:'17',label:'17'},{hour:'18',label:'18'},{hour:'19',label:'19'},{hour:'20',label:'20'},
                    {hour:'21',label:'21'},{hour:'22',label:'22'},{hour:'23',label:'23'},{hour:'24',label:'24'}
                ],
            options4:[
                    {minute:'01',label:'01'},{minute:'02',label:'02'},{minute:'03',label:'03'},{minute:'04',label:'04'},{minute:'05',label:'05'},{minute:'06',label:'06'},
                    {minute:'07',label:'07'},{minute:'08',label:'08'},{minute:'09',label:'09'},{minute:'10',label:'10'},{minute:'11',label:'11'},{minute:'12',label:'12'},
                    {minute:'13',label:'13'},{minute:'14',label:'14'},{minute:'15',label:'15'},{minute:'16',label:'16'},{minute:'17',label:'17'},{minute:'18',label:'18'},
                    {minute:'19',label:'19'},{minute:'20',label:'20'},{minute:'21',label:'21'},{minute:'22',label:'22'},{minute:'23',label:'23'},{minute:'24',label:'24'},
                    {minute:'25',label:'25'},{minute:'26',label:'26'},{minute:'27',label:'27'},{minute:'28',label:'28'},{minute:'29',label:'29'},{minute:'30',label:'30'},
                    {minute:'31',label:'31'},{minute:'32',label:'32'},{minute:'33',label:'33'},{minute:'34',label:'34'},{minute:'35',label:'35'},{minute:'36',label:'36'},
                    {minute:'37',label:'37'},{minute:'38',label:'38'},{minute:'39',label:'39'},{minute:'40',label:'40'},{minute:'41',label:'41'},{minute:'42',label:'42'},
                    {minute:'43',label:'43'},{minute:'44',label:'44'},{minute:'45',label:'45'},{minute:'46',label:'46'},{minute:'47',label:'47'},{minute:'48',label:'48'},
                    {minute:'49',label:'49'},{minute:'50',label:'50'},{minute:'51',label:'51'},{minute:'52',label:'52'},{minute:'53',label:'53'},{minute:'54',label:'54'},
                    {minute:'55',label:'55'},{minute:'56',label:'56'},{minute:'57',label:'57'},{minute:'58',label:'58'},{minute:'59',label:'59'},{minute:'60',label:'60'},
                        ],
            addtag:false,
            isShow:false,
            querySystemcate:[],
            isactive: -1,
            label:'',
            Errnote:'',
            msgCode:'',
            isA: false,  
            isB: true  ,
            isBB:false,
            morebriefing:'',
            maxlength:'',
            section_id:'',
            type:'',
            apply_titleing:'',
            // useraudit_status:localStorage.getItem('useraudit_status')
            errortxt:'',
            disabledweek:false,
            current:''
        }
        
    },
    created(){
        this.getHeardToken();
        this.getquerySystemcate();
        this.getUserInfo();
        //console.info(typeof this.this.cycle);
    },
    methods:{
        getUserInfo(){
            axios({
                url:this.API+'/user/user/getUserInfo',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
               // console.log(response);
                this.getuserinfo = response.data.data;
                this.audit_status = response.data.data.audit_status;
                //this.useraudit_status = localStorage.setItem('useraudit_status',this.audit_status);
                //console.log( this.audit_status);
                this.imageUrl = response.data.data.business_license_path;
                this.imageUrl_front = response.data.data.card_positive_path;
                this.imageUrl_back = response.data.data.card_reverse_path
                
            }).catch(err=>{
                console.log(err);
            })
        },
        goToAddchan(){
            if(this.audit_status!=2){
                this.addinfoVisible=false;
                this.$message({
                    message:'您的信息还未审核通过，暂不能添加栏目',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })

            }else{
                this.addinfoVisible=true
            }
        },
        //获取内容分类
        getquerySystemcate(){
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/category/querySystem',
                method:'post'
            }).then(response=>{
                console.log(response);
                this.querySystemcate = response.data.data;
                console.log('456465',this.querySystemcate)
            }).catch(err=>{
                console.log(err)
            })
        },

        //获取周
        getCycle(cycle){
            this.cycle = cycle;
            if(this.cycle==3){
                this.timing = 0;
                this.disabled = true;
                this.disabledweek = true;
                this.week = '';
                this.hour = '';
                this.minute = '';
            }
            if(this.cycle==1){//周
                this.timing = 1;
                this.disabled = false;
                 this.disabledweek = false;
            }
            if(this.cycle==2){//日
                this.timing = 1;
                this.disabledweek = true;
                this.disabled = false;
                this.week = '';
            }
        },
        //获取星期
        getWeek(week){
            this.week = week;
        },
        //获取小时
        getHour(hour){
            this.hour = hour;
        },
        //获取分钟
        getMinute(minute){
            this.minute = minute;
        },

        //获取时间将时间存到数组里面
        addTime(){
            if(this.cycle == 1 && (this.week == '' || this.hour == '' || this.minute == '')){
                this.$message({
                    message:'请填写完整的时间段',
                    type:'error',
                    center:true,
                    customClass:'user-defind-style'
                })
            }else if(this.cycle == 2 && ( this.hour == '' || this.minute == '')){
                this.$message({
                    message:'请填写完整的时间段',
                    type:'error',
                    center:true,
                    customClass:'user-defind-style'
                })
            }else if(this.time.length>=8){
                this.$message({
                    message:'时间段最多只能添加8个',
                    type:'error',
                    center:true,
                    customClass:'user-defind-style'
                })
            }
            else this.time.push(
                    {
                        cycle:this.cycle,
                        week:this.week,
                        hour:this.hour,
                        minute:this.minute
                    }
           )
           console.log('time',this.time)
            
        },
        //从数组移除时间
        deltime(index){
           this.time.splice(index,1)
        },
        //获取栏目分类id
        addquerySystemcate(id,index){
            let idindex = this.cid.indexOf(id);
            if(idindex>=0){
                this.cid.splice(idindex,1);
            }else{
                this.cid.push(id);
               // this.$set(this.cid.indexOf,index,true)
                console.log(this.cid);
            }
        },
        
        //删除子分类
        handleClose(cycle) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(cycle), 1);
        },
        //添加输入框
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        //添加子分类
        handleInputConfirm() {
            if(this.childname.length>6){
                this.$message({
                    message:'子分类最多1-6个字',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else{
                let childname = this.childname;
                if (childname) {
                    this.dynamicTags.push(childname);
                }
                console.log(this.dynamicTags);
                this.inputVisible = false;
                this.childname = '';
            }
            
        },
         //验证输入字数
        textVal(){
            var txtVal = this.about.length;
            if(txtVal>256){
                this.$message({
                    message:'最多只能输入256个字',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                    
                })
            }
        },
        //检测表单
        briefingVal(){
            if(this.briefing.length>=15){
                this.isBB = true;
                this.morebriefing = "最多只能输入30个字"
            }else{
                this.isBB = false;
                this.morebriefing = ""
            }
        },
        //测试数据标题检测
        applyVal(){
            if(this.apply_title.length>=30){
                this.isBB = true;
                this.apply_titleing = "最多只能输入30个字"
            }else{
                this.isBB = false;
                this.apply_titleing  = ""
            }
        },
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
        //检测栏目是否存在
        checkCateExists(){
            if(this.name.length>=10){
                this.errortxt = '*栏目名称为2-10位数字、字母、中文组合'
            }else{
                this.errortxt = ''
            }
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/section/manage/checkExists',
                method:'post',
                data:{
                    title:this.name
                }
            }).then(response=>{
                //console.log(response)
                if(response.data.code==200){
                    this.Errnote = response.data.msg;
                    this.msgCode = response.data.code;
                    console.log(this.msgCode);
                    this.isA = true;
                    this.isB = false;

                }else{
                    this.Errnote = response.data.msg
                    //console.log(this.Errnote);
                    this.isA = false;
                    this.isB = true;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //选择渠道
        addchannelClick(){
            this.isShow = !this.isShow;
        },

        //全选
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        //添加栏目
        addCateApply(){
           // console.log(this.time);
           if(this.apply_title==''){
               this.$message({
                    message:'测试标题不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
           }
           if(this.content==''){
               this.$message({
                    message:'简介不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
           }
           if(this.coverid==''){
               this.$message({
                    message:'封面图不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
           }else{
                 axios({
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    url:this.API+'/section/manage/apply',
                    method:'post',
                    data:{
                        name:this.name,
                        logo:this.logoid,
                        briefing:this.briefing,
                        about:this.about,
                        keywords:this.keywords,
                        timing:this.timing,
                        time:this.time,
                        cid:this.cid,
                        child:this.dynamicTags,
                        cover:this.coverid,
                        apply_title:this.apply_title,
                        content:this.content,
                        file:{
                            ext:this.ext,
                            creator:this.creator,
                            updateTime:this.updateTime,
                            invalidTime:this.invalidTime,
                            duration:this.duration,
                            path:this.path,
                            size:this.size,
                            createTime:this.createTime,
                            updator:this.updator,
                            id:this.id,
                            status:this.status
                        },
                        // active:this.active,
                        // sid:this.sid
                        // sid:1
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.$message({
                            message:response.data.msg,
                            type:'success',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        this.uploadDialogVisible = false;
                        this.reload();
                    }else{
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
           }
           
        },

        //上传logo
        httpRequest (options) {
            let file = options.file
            if (file) {
                this.fileReader.readAsDataURL(file)
            }
            this.fileReader.onload = () => {
                let base64Str = this.fileReader.result
                let config = {
                    url:this.API+'/system/upload/qiniu',
                    method: 'post',
                    data: {
                        file: base64Str,
                        type: "6",
                        name:"file"
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    timeout: 10000,
                    onUploadProgress: function (progressEvent) {
                        progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
                        options.onProgress(progressEvent, file)
                    },
                }
                this.logoLoading = true
                axios(config)
                .then(res => {
                    this.logoLoading = false
                    console.log(res);
                    this.logoUrl = base64Str;
                    this.logoid = res.data.data.id;
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
            //const isLt5M = file.size < 5 * 1024 * 1024
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
            // if (!isLt5M) {
            //     alert('The max size is 5MB')
            //     return false
            // }
            return isbmp || isjpeg ||  ispng;
        },
        uploadSuccess (res, file, fileList) {
            let data = res.data
            console.log('upload result:', res, file)
            file.key = data.key
            this.fileList.push(data.key)
        },

        //上传测试封面
         httpRequest2 (options) {
            let file = options.file
            if (file) {
                this.fileReader.readAsDataURL(file)
            }
            this.fileReader.onload = () => {
                let base64Str = this.fileReader.result
                let config = {
                    // url: 'https://api.soundmcn.heard-gl.com/system/upload/qiniu',
                    url:this.API+'/system/upload/qiniu',
                    method: 'post',
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
                        progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
                        options.onProgress(progressEvent, file)
                    },
                }
                this.testLogoLoading = true
                axios(config)
                .then(res => {
                    this.testLogoLoading = false
                    console.log(res);
                    this.testUrl = base64Str;
                    this.coverid = res.data.data.id;
                    console.log(this.id);
                    options.onSuccess(res, file)
                })
                .catch(err => {
                    options.onError(err)
                })
            }
        },
        removeHandler2 (file, fileList) {
        },
        beforeUpload2 (file) {
            //const isLt5M = file.size < 5 * 1024 * 1024
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
            // if (!isLt5M) {
            //     alert('The max size is 5MB')
            //     return false
            // }
            return isbmp || isjpeg ||  ispng;
        },
        uploadSuccess2 (res, file, fileList) {
            let data = res.data
            console.log('upload result:', res, file)
            file.key = data.key
            this.fileList.push(data.key)
        },

        //上传音频文件
        update(e){
            let file = e.target.files[0];
            let param = new FormData(); 
            param.append('file',file);
            // console.log(param.get('file')); 
            console.log(file.name)
            
            let config = {
            headers:{
                'Content-Type':'multipart/form-data',
                'signature':localStorage.getItem('sign'),
                'accessKey':localStorage.getItem('accessKey'),
                'time':localStorage.getItem('timestap'),
                },
                
            }; 
            this.fileLoading = true
            this.$http.post('https://center.soundatm.heard-gl.com/api/core/v1/audio/upload.json',param,config)
            .then(response=>{
                 console.log(response); 
                if(response.data.code==1){    
                    this.fileLoading = false 
                    this.ext = response.data.data.ext,
                    this.creator = response.data.data.creator,
                    this.updateTime = response.data.data.updateTime,
                    this.invalidTime = response.data.data.invalidTime,
                    this.duration = response.data.data.duration,
                    this.path = response.data.data.path,
                    this.size = response.data.data.size,
                    this.createTime = response.data.data.createTime,
                    this.updator = response.data.data.updator, 
                    this.id = response.data.data.id,
                    this.status= response.data.data.status,
                    this.uploadfile = file.name;
                    this.$message({
                        message:'文件上传成功',
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }else{
                     this.$message({
                        message:'文件上传失败',
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
               
                    
            })
        
        },




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
.testLoading{
    width: 100px;
    height: 100px;
    background-color: #ccc;
    position: absolute;
    margin-left: 88px;
    border-radius: 2px;
    z-index: 0
}
.el-select-dropdown__item.selected{
    color: #07C160;
    font-weight: 700;
}
.el-select-dropdown__item:hover{
    color: #07C160;
}
.addCatePage .Selistagtitle{
    float: left;
    width: 60px;
    background-color: #07c160;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    color: #fff;
}

.addtimeDiv .el-tag{
    background-color: #fff;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #1B1D1F;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #ededed;
    white-space: nowrap;
    margin-right: 12px;
    margin-bottom: 20px;
}
.addtimeDiv .el-tag .el-icon-close {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    top: -1px;
    right: -5px;
    color: #000;
}
.choiceFile{
    height: 40px;
    width: 140px;
    text-overflow: ellipsis;
    white-space:nowrap; 
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
}
.addCatePage .userbtn3{
    margin-left: 87px;
}
.addCatePage .userbtn3 .successBtn{
    width: 86px;
    height: 30px;
    background-color: #07c160;
    color: #fff;
    border-radius: 2px;
    border: 1px solid #07c160;
    text-align: center;
    padding: 9px 20px;
    /* line-height: 30px; */
}
.addCatePage .userbtn3 .successBtn:hover,.addCatePage .userbtn3 .successBtn:focus{
    width: 86px;
    height: 30px;
    background-color: #07c160;
    color: #fff;
    border-radius: 2px;
    border: 1px solid #07c160;
    text-align: center;
    padding: 9px 20px;
    /* line-height: 30px; */
}
.addCatePage .userbtn3 .backBtn{
    width: 86px;
    height: 30px;
    background-color: #ffffff;
    color: #9b9b9b;
    border-radius: 2px;
    border: 1px solid #ededed;
    text-align: center;
    padding: 9px 20px;
    /* line-height: 30px; */
}
.addCatePage .userbtn3 .backBtn:hover{
    width: 86px;
    height: 30px;
    background-color: #ededed;
    color: #9b9b9b;
    border-radius: 2px;
    border: 1px solid #afafaf;
    text-align: center;
    padding: 9px 20px;
    /* line-height: 30px; */
}
.addCatePage .addTimeBtn{
    width: 60px;
    height: 40px;
    background-color: #07c160;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 2px;
    margin: -40px 309px 0 0px;
    float: right;
    cursor: pointer;
    z-index: 9999;
}
.addCatePage .datebox .chosehours{
    width:20px;
    height:40px;
    line-height:40px;
    color:#9b9b9b;
    margin-left: -10px;
}
.addCatePage .databox-hours{
    margin-right: -4px;
}
.addCatePage .databox-time,.databox-week{
    margin-right: 24px;
}
.addCatePage .el-input--suffix .el-input__inner{
    padding: 0 10px 0 10px !important
}
 .databox-time .el-input.el-input--suffix,.databox-week .el-input.el-input--suffix{
    width: 84px;
    height: 40px;
}
.databox-hours .el-input.el-input--suffix{
    width: 56px;
    height: 40px;
}
.addCatePage .datebox .el-input>input{
    border-radius: 2px;
    border-color: #ededed;
    margin-right: 8px;
}
.third-step .videoupload{
    /* margin-left:-28px; */
    margin-top: 40px;
    }
.videoupload input{
    /* position: absolute;
    font-size: 100px;
    right: 0;
    top: 0; */
    opacity: 0; 
    position: absolute;
    left: 40px;
    top: 5px;
    width: 300px;
    cursor: pointer;

}
.third-step .videoupload .upaudio{
    position: relative;
    display: inline-block;
    background: #fff !important;
    border: 1px solid #ededed !important;
    border-radius: 2px;
    /* padding: 8px 100px; */
    overflow: hidden;
    color: #c7c7c7;
    text-decoration: none;
    text-indent: 0;
    line-height: 40px;
    margin-left:20px;
    width: 344px;
    height: 40px    ;

}
.third-step .el-input>input{
    border-radius: 2px;
    margin-left: 20px;
}
.addCatePage .catetags{
    margin-left: -20px;
    width: 740px;
}
.addCatePage .tagsbox li{
    list-style: none;
    float: left;
    width: 62px;
    height: 30px;
    /* border:1px red solid; */
    background-color: #ededed;
    margin-top: 10px;
    margin-right: 10px;
    text-align: center;
    line-height: 30px;
    border-radius: 2px;
    color: #7E7F80;
}
.addCatePage .addtimeDiv{
    width: 700px;
    height: 116px;
    background-color: #fafafa;
    border-radius: 2px;
    margin-left: 88px;
    /* margin-top: 40px; */
    margin-bottom: 30px;
    padding: 20px;
}
.conteninput.el-textarea{
    margin-left: 20px;
    width: 740px;
    margin-bottom: 15px;
}
.conteninput.el-textarea>textarea{
    border-radius: 2px;
}
.addCatePage .cateLogo{
    margin:30px 0;
}
.addCatePage .avatar-uploader-icon{
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    /* line-height: 130px; */
    text-align: center;
    margin-top: -10px;
}
.addCatePage .upload-box{
    width: 100px;
    height: 100px;
    border-radius: 2px;
    background-color: #fafafa;
    color: #9b9b9b;
    margin-left: 88px;
    text-align: center;
    line-height: 20px;
}
.addCatePage .hint-text{
    width: 361px;
    height: 40px;
    padding-left: 15px;
    background-color: #fafafa;
    border-radius: 2px;
    /* text-align: center; */
    line-height: 40px;
    color: #8D8E8F;
    float: right;
    margin-top: -61px;
}
.addCatePage .el-form-item.cateNameTable{
    margin-top: 30px;
    height: 40px;
}
.first-one .el-input>input{
    border-radius: 2px;
    margin-left: 20px;
}
.addCatePage .triangle{
    width: 0px;
    height: 0px;
    /* background-color: #07C160; */
    margin: 0 auto;
    border-top: 11px solid #07c160;
    border-left:11px solid transparent;
    border-right:11px solid transparent;
    border-bottom:11px solid transparent;
}
.addCatePage .basetop{
    /* margin: 10px auto; */
    text-align: center;
    /* line-height: 40px; */
    margin-bottom: 23px;

}
.addCatePage .cateContent{
    padding: 30px 37px 60px;
}
.addCatePage{
    width: 904px;
    border-radius: 2px;
    background-color: #fff;
    margin: 40px;
}
.addCatePage .fnTitle{
    height: 53px;
    line-height: 54px;
}

.addCatePage .bage-line{
    height: 2px;
    width: 64px;
    background-color: #07C160;
    margin-left: 33px;
    position: absolute;
    margin-top: -1px;
}
.addCatePage .underline{
    width: 100%;
    height:1px;
    background-color: #f6f6f6;
}
.addCatePage .title-text{
    width: 100px !important;
    height: 16px;
    font-weight: 600;
    margin-left: 37px;
}
</style>
