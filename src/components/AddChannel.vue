<template>
    <div class="addbox">
        <el-button  @click="goToAddchan" class="addchal">+添加栏目</el-button>
         <!--添加栏目弹框-->
        <el-dialog width="708px" title="添加栏目" :visible.sync="addinfoVisible" center :close-on-click-modal="false">
            <el-form class="baseform">
                <div class="basetop"><p><1.栏目基本信息></p></div>
                <el-form-item label="栏目名称">                             
                    <el-input v-model="name" @input="checkCateExists()" maxlength="10" placeholder="栏目名称只能设置一次" style="width:50%"></el-input>  
                    <span style="margin-left: -30px;" :class="{ 'successmsg': isA, 'errorMsg': isB}">{{Errnote}}</span>
                    <p style="color:#ff6e40;margin-left: 72px;line-height: 4px;">{{errortxt}}</p>
                </el-form-item>
                <el-form-item label="栏目Logo">
                    <div class="upload-box">
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
                            <img v-if="logoUrl" :src="logoUrl" class="avatar" style="width:84px;height:84px;">
                            <i v-else class="el-icon-plus avatar-uploader-icon">选择文件</i>
                            <!-- <div class="top-pic1"><img src="../assets/image/ID_front.png"/></div> -->
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="一句话介绍" class="morelabel" > 
                    <el-input v-model="briefing" @input="briefingVal()" maxlength="15" placeholder="最多可输入2-15个字" style="width:66.5%;" :class="{'redinput': isBB}"></el-input>
                    <p style="color:#ff6e40;margin-left: 72px;line-height: 4px;">{{morebriefing}}</p>
                </el-form-item>
                 <el-form-item label="内容简介"> 
                    <el-input @input="textVal" maxlength="256" v-model="about" type="textarea" placeholder="最多可输入256个字" class="conteninput" style="width:60%;" rows="4"></el-input>  
                </el-form-item>
                 <el-form-item label="关键词" class="morelabel2"> 
                    <el-input v-model="keywords" placeholder="关键词之间用“、”隔开" style="width:50%"></el-input>  
                </el-form-item>
            </el-form>
            <div class="userbtn3">
                <el-button @click="onenext()" class="successbtn">下一步</el-button>
                <el-button  @click="addinfoVisible=false" class="backbtn">下次再说</el-button>
            </div>
        </el-dialog>

         <!--设置栏目-->
        <el-dialog width="708px" title="添加栏目" :visible.sync="sconsetcate" center :close-on-click-modal="false">
            <el-form class="baseform">
                <div class="basetop"><p><2.栏目设置></p></div>
                <!--内容更新时段-->
                <el-form-item>
                   <el-col :span="5" class="catetag">
                       <label style="color:#ccc">内容更新时段</label>
                   </el-col>
                   <el-col :span="14" class="catetags">
                        <div class="datebox">
                            <el-col :span="6" class="databox-time">
                                <el-select v-model="time[0].cycle" placeholder="选择" @change="getCycle(time[0].cycle)" style="width:85px;">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.cycle"
                                    :label="item.label"
                                    :value="item.cycle">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="databox-week">
                                <el-select :disabled="disabledweek" v-model="time[0].week" placeholder="选择" @change="getWeek(time[0].week)" style="width:85px;">
                                    <el-option
                                    v-for="item in options2"
                                    :key="item.week"
                                    :label="item.label"
                                    :value="item.week">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" class="databox-hours">
                                <el-select  :disabled="disabled" v-model="time[0].hour" placeholder="选择" @change="getHour(time[0].hour)" style="width:70px;">
                                    <el-option
                                    v-for="item in options3"
                                    :key="item.hour"
                                    :label="item.label"
                                    :value="item.hour">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="1" class="chosehours">时</el-col>
                            <el-col :span="5" class="databox-hours">
                                <el-select  :disabled="disabled" v-model="time[0].minute" placeholder="选择"  @change="getMinute(time[0].minute)" style="width:70px;">
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
                   <el-col :span="2"><div class="addtag" @click="addTag()" style="cursor:pointer">+</div></el-col>
                   <!-- <el-col :span="2"><div class="deltag"><el-button type="text" class="deltag-btn" v-show="!addtag">删除</el-button></div></el-col> -->
                </el-form-item>
                 <!--添加时间段-->
                <el-form-item v-show="addtag">
                   <el-col :span="5" class="catetag">
                       <label class="nullbox"></label>
                   </el-col>
                   <el-col :span="14" class="catetags">
                        <div class="datebox">
                            <el-col :span="6" class="databox-time">
                                <el-select v-model="time.cycle" placeholder="选择" @change="getCycle(time.cycle)">
                                    <el-option
                                    v-for="item in options5"
                                    :key="item.cycle"
                                    :label="item.label"
                                    :value="item.cycle">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="databox-week">
                                <el-select v-model="time.week" placeholder="选择" @change="getWeek(time.week)">
                                    <el-option
                                    v-for="item in options6"
                                    :key="item.week"
                                    :label="item.label"
                                    :value="item.week">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" class="databox-hours">
                                <el-select v-model="time.hour" placeholder="选择" @change="getHour(time.hour)">
                                    <el-option
                                    v-for="item in options7"
                                    :key="item.hour"
                                    :label="item.label"
                                    :value="item.hour">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="1" class="chosehours">时</el-col>
                            <el-col :span="5" class="databox-hours">
                                <el-select v-model="time.minute" placeholder="选择"  @change="getMinute(time.minute)">
                                    <el-option
                                    v-for="item in options8"
                                    :key="item.minute"
                                    :label="item.label"
                                    :value="item.minute">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="1" class="chosehours">分</el-col>
                        </div>
                   </el-col>
                   <el-col :span="2"><div class="addtag" @click="add" style="cursor:pointer">+</div></el-col>
                   <el-col :span="2"><div class="deltag" style="cursor:pointer">删除</div></el-col>
                </el-form-item>
                <el-form-item>
                   <el-col :span="5" class="catetag">
                       <label style="color:#ccc;margin-left:25px;">内容类型</label>
                   </el-col>
                   <el-col :span="16" class="catetags">
                        <div class="tagsbox">  
                            <li v-for="(item,index) in querySystemcate" :key="index"   @click='addquerySystemcate(item.id,$event,index)'>
                                <div  v-bind:class='{"Selisactive-tag-icon":cid.indexOf(item.id)>-1}'  class="Notag-icon"><div class="crl-icon"></div></div>
                                <div  v-bind:class='{"Selistagtitle":cid.indexOf(item.id)>-1}' class="Notagtitle"  style="cursor:pointer"><span style="cursor:pointer">{{item.name}}</span></div>
                            </li>
                        </div>
                   </el-col>
                </el-form-item>
                <div class="wait">更多分类敬请期待!</div>
                <el-form-item style="margin-left: 45px;" label="添加子分类" class="addtype"> 
                    <el-tag
                        :key="childname"
                        v-for="childname in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(childname)">
                        {{childname}}
                    </el-tag>
                    <el-input  
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="childname"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        >
                    </el-input>
                    <el-button v-else class="button-new-tag tagb" size="small" @click="showInput">+</el-button>
                </el-form-item>
            </el-form>
            <div class="userbtn3 userbtn4">
                <el-button   @click="sconnext()"  class="successbtn">下一步</el-button>
                <el-button @click="backstep1" class="beforebtn">上一步</el-button>
            </div>
        </el-dialog>

         <!--上传测试数据-->
        <el-dialog width="708px" title="添加栏目" :visible.sync="uploadDialogVisible" center :close-on-click-modal="false">
            <el-form class="baseform">
                <div class="basetop"><p><3.上传测试数据></p></div>
                <el-form-item label="标题"> 
                    <el-input @input="applyVal" v-model="apply_title"  maxlength="30" placeholder="请输入标题" style="width:66.5%" :class="{'redinput': isBB}"></el-input>  
                    <p style="color:#ff6e40;margin-left: 72px;line-height: 4px;">{{apply_titleing}}</p>
                </el-form-item>
                <el-form-item label="简介"> 
                    <el-input @input="textVal" v-model="content"  maxlength="256" type="textarea" placeholder="最多可输入256个字" class="conteninput" style="width:60%;" rows="4"></el-input>  
                </el-form-item>
                <el-form-item label="封面">
                    <div class="upload-box">
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
                            <img v-if="testUrl" :src="testUrl" class="avatar" style="width:84px;height:84px;">
                             <i v-else class="el-icon-plus avatar-uploader-icon">选择文件</i>
                            <!-- <div class="top-pic1"><img src="../assets/image/ID_front.png"/></div> -->
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="上传音频" class="videoupload"> 
                   <a href='javascript:void(0);' class="upaudio">
                       <i class="el-icon-upload" style="padding-right:10px;padding-left:10px;"></i>
                       <span v-if="uploadfile==''" style=" cursor: pointer;">选择您要的音频文件</span>
                       <span v-else style=" cursor: pointer;">{{uploadfile}}</span>
                       <input class="file" name="file" type="file" accept="audio/mp3,audio/wav" @change="update"/>
                       <span style="padding-right:10px;color:#57B9A1;padding-left: 130px; cursor: pointer;">点击上传</span>
                   </a><br>
                    <span style="margin-left:75px;color:#ccc">目前仅支持.mp3和.wav格式的音频文件</span>
                </el-form-item>
            </el-form>
            <div class="userbtn3">
                <el-button  @click.stop="addCateApply()" class="successbtn">完成</el-button>
                <el-button @click="backstep2" class="backbtn">上一步</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    inject:['reload'],
    name:'AddChannel',
    data(){
        return{
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
            time:[
                {
                cycle:'',
                week:'',
                hour:'',                            
                minute:'',
               },
            ],
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
            options:[{cycle:'1',label:'每周'},{cycle:'2',label:'每日'},{cycle:'3',label:'无固定时间'}],
            options2:[{week:'1',label:'周一'},{week:'2',label:'周二'},{week:'3',label:'周三'},{week:'4',label:'周四'},{week:'5',label:'周五'},{week:'6',label:'周六'},{week:'7',label:'周日'}],
            options3:[
                    {hour:'01',label:'01'},{hour:'02',label:'02'},{hour:'03',label:'03'},{hour:'04',label:'04'},
                    {hour:'05',label:'05'},{hour:'06',label:'06'},{hour:'07',label:'07'},{hour:'08',label:'08'},
                    {hour:'09',label:'09'},{hour:'10',label:'10'},{hour:'11',label:'11'},{hour:'12',label:'12'},
                    {hour:'13',label:'13'},{hour:'14',label:'14'},{hour:'15',label:'15'},{hour:'16',label:'16'},
                    {hour:'17',label:'17'},{hour:'18',label:'18'},{hour:'19',label:'19'},{hour:'20',label:'20'},{hour:'21',label:'21'},
                    {hour:'22',label:'22'},{hour:'23',label:'23'},{hour:'24',label:'24'}
                ],
            options4:[
                    {minute:'01',label:'01'},{minute:'02',label:'02'},{minute:'03',label:'03'},{minute:'04',label:'04'},{minute:'05',label:'05'},{minute:'06',label:'06'},
                    {minute:'07',label:'07'},{minute:'08',label:'08'},{minute:'09',label:'09'},{minute:'10',label:'10'},{minute:'11',label:'11'},{minute:'12',label:'12'},
                    {minute:'13',label:'13'},{minute:'14',label:'14'},{minute:'15',label:'15'},{minute:'16',label:'16'},{minute:'17',label:'17'},{minute:'18',label:'18'},
                    {minute:'19',label:'19'},{minute:'20',label:'20'},{minute:'21',label:'21'},{minute:'22',label:'22'},{minute:'23',label:'23'},{minute:'24',label:'24'},
                    {minute:'25',label:'25'},{minute:'26',label:'26'},{minute:'27',label:'27'},{minute:'28',label:'28'},{minute:'29',label:'29'},{minute:'30',label:'30'},
                ],

            options5:[{addcycle:'1',label:'每周'},{addcycle:'2',label:'每日'},{addcycle:'3',label:'无固定时间'}],
            options6:[{addweek:'1',label:'周一'},{addweek:'2',label:'周二'},{addweek:'3',label:'周三'},{addweek:'4',label:'周四'},{addweek:'5',label:'周五'},{addweek:'6',label:'周六'},{addweek:'7',label:'周日'}],
            options7:[{addminute:'24',label:'24'},{addminute:'27',label:'27'}],
            options8:[{addhour:'12',label:'12'},{ addhour:'15',label:'15'}],
            addtag:false,
            isShow:false,
            // activeIndex:-1,
            querySystemcate:[],
            isactive: -1,
            // noActive: true,
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
            
        }
        
    },
    created(){
        this.getHeardToken();
        this.getquerySystemcate();
        this.getUserInfo();
        //console.info(typeof this.time[0].cycle);
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
           // console.log(cycle);
            if(this.cycle==3){
                this.timing = 0;
                this.disabled = true;
                this.disabledweek = true;
                this.time[0].week = '';
                this.time[0].hour = '';
                this.time[0].minute = '';
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
                //this.time[0].week = 0;
            }
        },
        // getCycle(cycle){
        //     this.cycle = cycle;
        //    // console.log(cycle);
        //     if(this.cycle==3){
        //         this.timing = 0;
        //         this.disabled = true;
        //          this.disabledweek = true;
        //         this.time[1].week = '';
        //         this.time[1].hour = '';
        //         this.time[1].minute = '';
        //     }
        //     if(this.cycle==1){//周
        //         this.timing = 1;
        //         this.disabled = false;
        //     }
        //     if(this.cycle==2){//日
        //         this.timing = 1;
        //         this.disabledweek = true;
        //         this.disabled = false;
        //     }
        // },
        //获取星期
        getWeek(week){
            this.week = week;
            console.log(week)
        },
        //获取小时
        getHour(hour){
            this.hour = hour;
            console.log(hour)
        },
        //获取分钟
        getMinute(minute){
            this.minute = minute;
            console.log(minute)
        },

        //获取时间将时间存到数组里面


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
        handleClose(name) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(name), 1);
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
        //下一步
        onenext(){
            //表单验证
            if(this.name==''){
                this.$message({
                    message:'栏目名称不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
               return;
            }
            if(this.logoUrl==''){
                 this.$message({
                    message:'栏目封面不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            if(this.briefing==''){
                this.$message({
                    message:'栏目介绍不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            if(this.about==''){
                this.$message({
                    message:'栏目简介不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }
            if(this.keywords==''){
                this.$message({
                    message:'关键词不能为空',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                this.addinfoVisible = false;
                this.sconsetcate = true;
            }
           
        },
        sconnext(){
            if(this.timing==1){
                if(this.cycle==1 || this.cycle == 2){
                    if(this.time[0].cycle=='' || this.time[0].hour =='' || this.time[0].minute == '' || this.time[0].week == ''){
                        this.$message({
                            message:'请将内容更新时段填写完整',
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        return;
                    }
                    // if(this.time[0].week=='' ){
                    //     this.$message({
                    //         message:'请将内容更新时段填写完整',
                    //         type:'error',
                    //         center: true,
                    //         customClass:'user-defind-style'
                    //     })
                    //     return;
                    // }
                    // if(this.time[0].hour==''){
                    //     this.$message({
                    //         message:'请将内容更新时段填写完整',
                    //         type:'error',
                    //         center: true,
                    //         customClass:'user-defind-style'
                    //     })
                    //     return;
                    // }
                    // if(this.time[0].minute==''){
                    //     this.$message({
                    //         message:'请将内容更新时段填写完整',
                    //         type:'error',
                    //         center: true,
                    //         customClass:'user-defind-style'
                    //     })
                    //     return;
                    // }
                    if(this.cid==''){
                        this.$message({
                            message:'至少选择一个内容分类',
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        return;
                    }
                    if(this.ccid==''){
                        this.$message({
                            message:'子分类名称不能为空',
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        return;
                    }else{
                         this.sconsetcate = false;
                         this.uploadDialogVisible = true;
                    }
                // }else if(this.cycle==2){
                //      if(this.time[0].cycle==''){
                //         this.$message({
                //             message:'请将内容更新时段填写完整',
                //             type:'error',
                //             center: true,
                //             customClass:'user-defind-style'
                //         })
                //         return;
                //     }
                //     if(this.time[0].week==''){
                //         this.$message({
                //             message:'请将内容更新时段填写完整',
                //             type:'error',
                //             center: true,
                //             customClass:'user-defind-style'
                //         })
                //         return;
                //     }
                //     if(this.time[0].hour==''){
                //         this.$message({
                //             message:'请将内容更新时段填写完整',
                //             type:'error',
                //             center: true,
                //             customClass:'user-defind-style'
                //         })
                //         return;
                //     }
                //     if(this.time[0].minute==''){
                //         this.$message({
                //             message:'请将内容更新时段填写完整',
                //             type:'error',
                //             center: true,
                //             customClass:'user-defind-style'
                //         })
                //         return;
                    // }
                    if(this.cid==''){
                        this.$message({
                            message:'至少选择一个内容分类',
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        return;
                    }
                    if(this.ccid==''){
                        this.$message({
                            message:'子分类名称不能为空',
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        return;
                    }else{
                         this.sconsetcate = false;
                         this.uploadDialogVisible = true;
                    }
                }
                
            }else{
                if(this.cid==''){
                    this.$message({
                        message:'至少选择一个内容分类',
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    return;
                }
                if(this.ccid==''){
                    this.$message({
                        message:'子分类不能为空',
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    return;
                }
                else if(this.childname.length>6){
                    this.$message({
                        message:'子分类为1-6个字',
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    return;
                }
                else{
                    this.sconsetcate = false;
                    this.uploadDialogVisible = true;
                }
            }
            
        },
        thrnext(){
            this.uploadDialogVisible = false;
            // this.Selectchannel = true;
        },
        //上一步
        backstep1(){

            this.addinfoVisible = true;
            this.sconsetcate = false;
        },
        backstep2(){
            this.uploadDialogVisible = false;
            this.sconsetcate = true;
        },
        backstep3(){
            this.uploadDialogVisible = true;
            // this.Selectchannel = false;
        },
        //添加时间段
        addTag:function(){
            this.addtag = !this.addtag;
            let obj = {
                cycle : '',
                week : '',
                hour :'',
                minute : ''
            }
            this.time.push(obj)
            console.log(this.time)
        },
        add(){

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
                        time:[{
                            cycle:this.cycle,
                            week:this.week?'1':'0',
                            hour:this.hour,
                            minute:this.minute,
                        }],
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
                axios(config)
                .then(res => {
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
                axios(config)
                .then(res => {
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
            this.$http.post('https://center.soundatm.heard-gl.com/api/core/v1/audio/upload.json',param,config)
            .then(response=>{
                 console.log(response); 
                if(response.data.code==1){     
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
.addbox .baseform{
   margin-left:55px;
}
.addbox .basetop{
    text-align: center;
}
.addbox .userbtn3{
    text-align: center;
    padding-top:30px;
    padding-bottom: 30px;
}
.addbox .userbtn3 .successbtn{
    width:20%;
    background-color: #18C26A;
    color: #ffffff;
}
.addbox .userbtn3 .backbtn{
     width:20%;
     margin-left:20px;
     color: #afafaf !important;
     background-color: #f3f3f3;
}
/* .addbox .baseform .el-input__inner {
    border: none;
    background-color: #F4F4F4;
    margin-right:-500px;
    border: 1px solid #cccccc;
} */
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
 .addbox .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .addbox .avatar-uploader-icon {
    font-size: 12px;
    color:#57B9A1 ;
    width: 85px;
    height: 85px;
    line-height: 85px;
    text-align: center;
  }
.addbox .el-textarea__inner {
    background-color: #F4F4F4;
    border:none;
}
.addbox .el-form-item__label {
    text-align: right;
    float: left;
    padding: 0 18px 0 0;
}
.addbox .morelabel .el-form-item__label{
    margin-left:-14px;
}
.addbox .morelabel2 .el-form-item__label{
    margin-left: 10px;
    margin-right:5px;
}
.addbox .el-icon-plus:before {
    content: "";
}
.addbox .fixedbtn{width: 14%;height: 35px;padding-top:10px;background-color: #18C26A;color: #FFFFFF;}
.addbox .unfixedbtn{width: 14%;height: 35px;padding-top:10px;color: #18C26A;border: 1px solid #18C26A}
.addbox .el-form-item__content {
    line-height: 20px;
    position: relative;
    font-size: 14px;
}
.addbox .addtype .el-form-item__content {
    line-height: 20px;
    position: relative;
    font-size: 14px;
    width: 460px;
    float: right;
    margin-top: -40px;
    margin-left: 20px;
}
/* .addbox .taglabel{
    margin-left:24px;
    width:55px;
    margin-top:-10px; 
    color: #cccccc;
}
.addbox .taglabel span{margin-left:18px;} */
.addbox .noticebox{width:330px;height:30px;border-top:1px #eaeaea solid;margin-top:45px;margin-left:100px;line-height: 5px;}
.addbox .noticebox p{color: #D2D2D2;}
.addbox .el-input {
    width: 100%;
    margin-left: 0px !important;
    }
.beforebtn{ 
    width:20%;
    margin-left:20px;
    color: #afafaf;
    background-color: #fafafa !important;
    }
.userbtn4{margin-top: 60px;}
.addtype{margin-left:10px;}
.el-form-item__label {
    color: #cccccc;
}
.addbox .el-upload-dragger {
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
.addbox .el-upload-dragger .el-icon-upload {
    font-size: 30px;
    color: #c0c4cc;
    margin:-5px 0px 0px -300px;
    line-height: 50px;
}
.addbox .el-upload-dragger .el-upload__text {
    color: #606266;
    font-size: 14px;
    text-align: right;
    margin-top:-35px;
    padding-right:10px;
}
.addbox .el-upload-dragger .el-upload_select{
   float: left;
   padding-left:100px;
}
.addbox .videoupload{margin-left:-28px;}
.addbox .videoupload .upaudio{
    position: relative;
    display: inline-block;
    background: #F4F4F4 !important;
    border: 1px solid #cccccc !important;
    border-radius: 4px;
    /* padding: 8px 100px; */
    overflow: hidden;
    color: #333;
    text-decoration: none;
    text-indent: 0;
    line-height: 34px;
}
.addbox .videoupload input{
    /* position: absolute;
    font-size: 100px;
    right: 0;
    top: 0; */
    opacity: 0; 
    position: absolute;
    left: 40px;
    top: 5px;
    width: 300px;
}
/* .addbox .el-upload-dragger .el-upload__text em {
    color: #57B9A1;
    font-style: normal;
}
.addbox .el-upload-dragger .el-upload__text span{
    margin-right:120px;
} */
.addbox .el-upload__tip {
    font-size: 12px;
    color: #cccccc;
    margin-top: 7px;
    margin-left: 75px;
}
.addbox .keyword{margin-left:-16px;}
.addbox .el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: none;
    
}
.addbox .el-upload-list__item-name {
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
.addbox .el-upload-list__item .el-icon-close {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    opacity: .75;
    color: #606266;
}
.addbox .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none;
}
.addbox .el-textarea__inner{
    resize:none;
}

/*分类样式*/
.addbox .datebox{
    height: 50px;
    line-height: 50px;
    background-color: #F4F4F4;
    border-radius: 5px;
}
.addbox .datebox .databox-week .el-input {
    width: 80% !important;
    /* margin-left:-10px; */
}
.addbox .datebox .databox-time .el-input {
    width: 80%;
    margin-left:10px;
}
.addbox .datebox .el-input__inner {
    background-color: #F4F4F4 !important;
    color: #606266 !important;
    height: 30px !important;
    line-height: 30px !important;
    outline: 0 !important;
    padding: 0 2px !important;
    width: 90% !important;
    border-radius: 2px !important;
    border: 1px solid #dcdfe6;
}
.addbox .databox-hours .el-input{
    width: 70%;
    margin-left:-10px;
}
.addbox .chosehours{
    margin-left:-30px;
}
.addbox .el-input__inner {
    background-color: #F4F4F4 !important;
    color: #606266 !important;
    height: 40px !important;
    line-height: 40px !important;
    outline: 0 !important;
    padding: 0 10px !important;
    width: 90% !important;
    border-radius: 2px !important;
    border: none;
}
.addbox .redinput .el-input__inner{
    border:1px #ff6e40 solid !important;
    background-color: #F4F4F4 !important;
    color: #606266 !important;
    height: 40px !important;
    line-height: 40px !important;
    outline: 0 !important;
    padding: 0 2px !important;
    width: 90% !important;
    border-radius: 2px !important;
    /* border: none; */
}
.addbox .el-input__icon {
    width: 20px;
}
.addbox .el-input--suffix .el-input__inner {
    padding-right: 10px;
}
.addbox .el-input__suffix {
   /* left: -110px; */
}
.addbox .el-select .el-input.is-focus .el-input__inner {
    border-color: #cccccc;
}
.addbox .el-select .el-input__inner:focus {
    border-color: #cccccc;
}
.addbox .el-button--text {
    color: #18C26A;
}
.addbox .catedata{
    color: #2F5CED
}
.addbox .addtag{
    width: 50px;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    margin-left:10px;
    background-color: #F4F4F4;
    font-size: 20px;
    color: #18C26A;
}
.addbox .deltag{
     width: 50px;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    margin-left:10px;
    font-size: 14px;
}
.addbox .deltag .deltag-btn{
    color: #18C26A;
}
.addbox .tagsbox{
    height: 100px;  
}

.addbox .tagsbox li{
    list-style: none;
    float: left;
    width: 60px;
    height: 30px;
    /* border:1px red solid; */
    margin-top: 10px;
    margin-right: 10px;
}
.addbox .Notag-icon{
     width: 0;
     height: 0;
     float: left;
     border-top: 15px solid transparent;
     border-right: 20px solid #F4F4F4;
     border-bottom: 15px solid transparent;
     position: relative;
     
}
.addbox .Selisactive-tag-icon{
     width: 0;
     height: 0;
     float: left;
     border-top: 15px solid transparent;
     border-right: 20px solid #FF6E40;
     border-bottom: 15px solid transparent;
     position: relative;
     /* overflow: hidden; */
}
.addbox .crl-icon{
    width: 5px;
    height: 5px;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    left:8px;
    top:-2px;
}
.addbox .Notagtitle{
    float: left;
    width: 40px; 
    background-color: #F4F4F4;
    height:30px;
    line-height: 30px;
    overflow: hidden;
}
.addbox .Selistagtitle{
    float: left;
    width: 40px;
    background-color: #FF6E40;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    color: #ffffff;
}
/* .addbox .istagicon{
     width: 0;
     height: 0;
     float: left;
     border-top: 15px solid transparent;
     border-right: 20px solid #D2D2D2;
     border-bottom: 15px solid transparent;
     position: relative;
} */
.addbox .is-tagtitle{
    float: left;
    width: 40px;
    background-color: #D2D2D2;
    color: #ffffff;
}
.addbox .is-tagtitle span{
    color: #ffffff;
    margin-left:5px;
}
.addbox .tagtitle span{
    color: #ffffff;
    margin-left:5px;
}
.addbox .edittag{
    margin-left:-20px;
    margin-top: 5px;
}
.addbox .edittag .edittag-btn{ color: #18C26A;}
.addbox .catetags .review{
    color: #18C26A;
}
.addbox .catetags i{
    color: #18C26A;
    font-size: 20px;
    margin-left:5px;
}
.addbox .catebtnbox{
    margin-top: 50px;
    text-align: center;
}
.addbox .catebtnbox .el-button{
    width: 20%;
    background-color: #18C26A;
    color: #ffffff;
}
.addbox .el-dialog--center .el-dialog__header {
    border-bottom: 1px #cccccc solid;
    margin-left: 20px;
    width: 90%;
    padding:20px 0px 10px;
}
.addbox .el-tag + .el-tag {
    margin-left: 10px;
  }
 .addbox .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    background: #F4F4F4;

  }
  .addbox .tagb:focus, .tagb:hover {
    color: #18C26A;
    border-color: #18C26A;
    background-color: #F4F4F4;
}
.addbox .addtype .el-form-item__label {
    text-align: right;
    float: left;
    padding: 0 25px 0 0;
}
.addbox .el-tag {
    background-color:#fff;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #18C26A;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #18C26A;
    white-space: nowrap;
    margin-top: 5px;
}
.addbox .el-tag .el-icon-close {
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
    color: #18C26A;
}
.addbox .el-tag .el-icon-close:hover {
    background-color: #18C26A;
    color: #fff;
}
.addbox .el-button--mini, .el-button--small {
    font-size: 18px;
    border-radius: 3px;
    color: #18C26A;
}
 .addbox .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .addbox .nullbox{
    width: 20.83%;
    height:60px;
    border:1px #ffffff solid;
 }
 .chanbox{
     width:540px;
    height: 210px;
    overflow :auto;
    /* filter:blur(1px) */

}
.chanbox::-webkit-scrollbar {
  width: 3px;
}
.chanbox::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #2852E1,#58BC9F, #67DB73);
}
.chanbox .list-icon{
    margin-bottom: 20px;
    height: 60px;
    width: 60px;
    /* border:1px #cccccc solid; */
    margin-left:15px;
    -webkit-box-shadow:0px 4px 4px #c8c8c8 ;
    -moz-box-shadow:0px 4px 4px #c8c8c8 ;
    box-shadow:0px 4px 4px #c8c8c8 ;
    border-radius: 10px;

}
 .chanbox .islist-icon{
    margin-bottom: 20px;
    height: 60px;
    width: 60px;
    /* border:1px #cccccc solid; */
    margin-left:15px;
    -webkit-box-shadow:0px 4px 4px #c8c8c8 ;
    -moz-box-shadow:0px 4px 4px #c8c8c8 ;
    box-shadow:0px 4px 4px #c8c8c8 ;
    border-radius: 10px;
    border:2px #18C26A solid;
}

/*全选按钮*/
 .chanbox .select-box .el-checkbox__inner {
    border-radius: 20px;
    border: 1px solid #FE6C3F;
    border-radius: 2px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    z-index: 1;
}
 .chanbox .select-box .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #FE6C3F;
    border-color: #FE6C3F;
}
 .chanbox .select-box .el-checkbox__inner::after {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 10px;
    left: 6px;
    position: absolute;
    top: 2px;
    width: 5px;
}
 .chanbox .select-box .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #FE6C3F;
}
 .chanbox .el-select .el-input .el-select__caret {
    margin-left: 0px !important;
}

/*栏目检测提示样式*/
.successmsg{color: #18C26A;}
.errorMsg{color:#FE6C3F }
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
.wait{
    height:40px;
    line-height:40px;
    border-top:1px #ccc solid;
    color:#ccc;
    font-size:16px;
    text-align: center;
}
.addchal{
    height: 28px;
    width: 84px;
    /* text-align: center; */
    line-height: .5px;
}
.addchal span{
    margin: -10px;
    font-size: 12px;
}
</style>


