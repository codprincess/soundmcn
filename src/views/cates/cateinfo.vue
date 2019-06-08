<template>
    <div class="cateInfo">
        <div class="fnTitle">
            <div class="title-text">我的栏目</div>
        </div>
        <div class="bage-line"></div>
        <div class="underline"></div>
        <!-- 列表 -->
        <div class="cateList" v-if="this.allCates.length > 0" >
            <div class="listLeftBtn"><i class="el-icon-arrow-left"></i></div>
            <div @click="goToCate(item.id)" class="catelists" v-for="(item,index) in allCates" :key="index">
                <div class="catename">
                    <img :src="item.cover" style="width:100px;height:100px;">
                    <div class="cateTitle">{{ item.title }}</div>
                    <!-- <div v-if="item.status==0" class="catestatuspassing">审核中</div>
                    <div v-else-if="item.status==2" class="catestatuspass">已通过</div>
                    <div v-else class="catestatusnot">未通过</div> -->
                </div>
            </div>
             <div class="listRightBtn"><i class="el-icon-arrow-right"></i></div>
        </div>

        <div class="underline" style="width:830px;margin:0 auto;"></div>
        <!-- 详情 -->
        <div class="infoOfCate">
            <div class="info-text">栏目详情</div>
            <div class="cateauth">
                <div class="catelog">
                    <img :src="cateInfos.logo">
                    <span :class="this.status == 0 ? 'stateTagStating': this.status == 1 ? 'stateTagNoPass' : 'stateTagPass'">{{this.status == 0 ? '审核中': this.status == 1 ? '未通过' : '已通过'}}</span>
                </div>
                <div class="cate-text">
                    <b>{{cateInfos.title}}</b><br>
                    <span style="color:#9b9b9b;font-size:12px;">{{cateInfos.briefing}}</span>
                    <div>
                        <li  v-for="(item,index) in categorys" :key="index">
                            <div class="type">{{item.name}}</div>
                        </li>
                        <a  @click="editeChildClass" v-if="this.status != 0"><i class="iconfont icon-edit" style="font-size:12px">&nbsp;</i>修改</a>
                    </div>
                    
                    <div style="font-size:12px;
                                height: 30px;
                                position: absolute;
                                margin-top: 30px;
                                color:#1B1D1F">关键词：{{cateInfos.keywords}}</div>
                </div>
                <div class="soldOutBtn" @click="soldOut" v-if="this.status == 2">下架</div>
                <div class="intro">
                    <b>内容简介</b><br>
                    <span>{{cateInfos.about}}</span>
                </div>
            </div>
        </div>
        <!-- 时段 -->
        <div class="updateTime">
            <div class="info-text">内容更新时段</div>
                <div class="datebox" style="margin-bottom:30px;">
                    <el-col :span="2" class="databox-time">
                        <el-select v-model="cycle" @change="getCycle(cycle)" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.cycle"
                            :label="item.label"
                            :value="item.cycle">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2" class="databox-week">
                        <el-select v-model="week" @change="getWeek(week)" placeholder="请选择" :disabled="disabledweek" >
                            <el-option
                            v-for="item in options2"
                            :key="item.week"
                            :label="item.label"
                            :value="item.week">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2" class="databox-hours">
                        <el-select v-model="hour" @change="getHour(hour)" placeholder="0" :disabled="disableddate" >
                            <el-option
                            v-for="item in options3"
                            :key="item.hour"
                            :label="item.label"
                            :value="item.hour">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" class="chosehours" style="width:20px;height:40px;line-height:40px;color:#9b9b9b">时</el-col>
                    <el-col :span="2" class="databox-hours">
                        <el-select v-model="minute" @change="getMinute(minute)" placeholder="0" :disabled="disableddate">
                            <el-option
                            v-for="item in options4"
                            :key="item.minute"
                            :label="item.label"
                            :value="item.minute">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1" class="chosehours" style="width:20px;height:40px;line-height:40px;color:#9b9b9b" :disabled="disabled">分</el-col> 
                </div>
            <div class="addTimeBtn" @click="addTime" v-if="this.cycle != 3">添加</div>
            <div class="time">
                <el-tag
                v-for="tag in times"
                :key="tag.id"
                >
                {{tag.cycle==1?'每周 / ':tag.cycle==2?'每日 / ':''}}{{tag.week==1?'周一 / ':tag.week==2?'周二 / ':tag.week==3?'周三 / ':tag.week==4?'周四 / ':tag.week==5?'周五 / ':tag.week==6?'周六 / ':tag.week==7?'周日 / ':''}}{{tag.hour}}:{{tag.minute}}
                <i class="el-icon-close" @click="delTimeTag(tag.id)"></i>
                </el-tag>
                
            </div>
        </div>
        <!-- 分类 -->
        <div class="classify">
            <div class="info-text" style="margin:20px 37px 10px">内容分类</div>
            <div style="padding:0 37px 20px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="已通过" name="first">
                    <div class="alreadyPassed">
                        <div class="cate" v-for="(item,index) in categorys2" :key="index" v-if="item.status == '2'">
                            <div class="cate-title">{{item.name}}</div>
                            <div class="cate-warn" @click="CateDisable(item.id)">
                                <i class="iconfont icon-suo" ></i>
                            </div>
                        </div>
                        <div class="addClassifyBtn"  @click="addcate = true" v-if="this.status != 0">添加分类</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="未审核" name="second">
                    <div class="unreviewed">
                        <div class="cate" v-for="(item,index) in categorys1" :key="index" v-if='item.status=="0"'>
                            <div class="cate-title">{{item.name}}</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已禁用" name="third">
                    <div class="disabled">
                        <div class="catedis" v-for="(item,index) in categorys3" :key="index" v-if='item.status=="3"'>
                            <div class="cate-title">{{item.name}}</div>
                            <div class="cate-warn"  @click="CateRestore(item.id)"><i class="iconfont icon-suo1"></i></div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            </div>
        </div>
        <!-- 弹窗 -->
        <!-- 修改子分类 -->
        <el-dialog width="526px" title="" :visible.sync="chosecateVisible" center :close-on-click-modal="false">
            <div class="fnTitle">
                <div class="title-text">修改类型</div>
            </div>
            <div class="bage-line"></div>
            <div class="underline"></div>
                <div class="catedialog">
                    <el-form>
                        <el-form-item>
                            <el-col :span="4" class="editcatetag">
                            </el-col>
                            <el-col :span="20" class="catetags">
                                <div class="tagsbox">  
                                    <li v-for="(item, index) in  querySystemcate" :key="index" @click='addquerySystemcate(item.id,index)'>
                                        <div  v-bind:class='{"tag-icon ":cid.indexOf(item.id)>-1}' class="catetag-icon"><div class="crl-icon"></div></div>
                                        <div v-bind:class='{"tagtitle":cid.indexOf(item.id)>-1}'  class="catetagtitle"  style="cursor:pointer"><span >{{item.name}}</span></div>
                                    </li>
                                </div>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="underline"></div>
                <div class="cate-shelbtn">
                    <el-button @click="chosecateVisible=false"  class="backbtn">取消</el-button>
                    <el-button @click="editCate()" class="confirmbtn">确认</el-button>
                </div>
        </el-dialog>
         <!--添加分类弹出框-->
        <div>
            
            <el-dialog
            title=""
            :visible.sync="addcate"
            width="526px"
            center
            :close-on-click-modal="false">
            <div class="fnTitle">
                <div class="title-text">添加分类</div>
            </div>
            <div class="bage-line"></div>
            <div class="underline"></div>
            <el-form class="addcateform">
                <el-form-item label="添加子分类"> 
                    <el-input v-model="name" placeholder="请输入子分类" style="width:60%"></el-input>
                </el-form-item>
            </el-form>
            <div class="underline"></div>
                <div class="cate-shelbtn">
                    <el-button  @click="addcate = false"  class="backbtn">取消</el-button>
                    <el-button @click="Addcategory" class="confirmbtn">确认</el-button>
                </div>
            <!-- <div class="underline"></div>

            <span slot="footer" class="dialog-footer">
                <el-button class="addcate-btn" @click="Addcategory">确 认</el-button>
                <el-button  class="addcate-back" @click="addcate = false">再想想</el-button>
            </span> -->
            </el-dialog>
        </div>
        <!-- 下架弹框 -->
        <el-dialog width="526px" title="" :visible.sync="shelvesDialogVisible" center :close-on-click-modal="false">
            <div class="fnTitle">
                <div class="title-text">下架提示</div>
            </div>
            <div class="bage-line"></div>
            <div class="underline"></div>
            <div class="cate-sheltag" style="margin:30px;"><p>确认下架该栏目吗？下架后该栏目将从当前账号删除，请谨慎选择！</p></div>
            <div class="underline"></div>
            <div class="cate-shelbtn">
                <el-button @click="shelvesDialogVisible=false" class="backbtn">取消</el-button>
                <el-button @click="closeCate()" class="confirmbtn">确认</el-button>
            </div>
        </el-dialog>
        <div class="noCatePage" v-if="this.allCates.length < 1">
            <img src="../../assets/image/hint.png" alt="">
            <p>您当前还没添加任何栏目唷！</p>

        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    inject:['reload'],
    data() {
      return {
        disabledweek:false,
        childcate:'first',
        disableddate:false,
        status:'',
        addcate:false,
        name:'',
        categorys1:[],
        categorys2:[],
        categorys3:[],
        restoretxt:'解除禁用',
        // cateId:localStorage.getItem('cateId'),
        allCates:[],
        activeName: 'first',
        failedAudit:false,
        showCate:true,
        noCate:false,
        deltimecateVisible:false,
        TimecateVisible:false,
        addTimeVisible:false,
        isActive:true,
        hasError: false,
        shelvesDialogVisible:false,
        chosecateVisible:false,
        time:[{
            cycle:'',
            week:'',
            hour:'',
            minute:'',
        }],
        cid:[],
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
            {hour:'17',label:'17'},{hour:'18',label:'18'},{hour:'19',label:'19'},{hour:'20',label:'20'},{hour:'21',label:'21'},
            {hour:'22',label:'22'},{hour:'23',label:'23'},{hour:'24',label:'24'}],
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
        cateInfos:[],
        categorys:[{}],
        selecttimes:[{}],
        querySystemcate:[],
        isactive:'',
        disabled:false,
        disabled1:true,
        times:[],
        cateId :localStorage.getItem('cateId'),
        childcates:[],
        editcycle:'',
        editcycle_zh:'',
        editweek:'',
        edithour:'',
        editminute:'',
        cycle:'',
        week:'',
        hour:'',
        minute:'',
        id:''
        // cateId:''
        };
    },
    beforeCreate(){

    },
    created(){
        this.cateInfo()
        this.goTocate();
        this.getquerySystemcate(); 
        this.getAllCates();
        this.Getcategory();
        this.getpasscategory();
        this.getdiscategory();
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        goTocate(){
            // if(this.$route.params.id>0){
            //     this.cateId= this.$route.params.id
            //     console.log('id'.this.cateId)
            // }else{
                this.cateId= localStorage.getItem('cateId');
                console.log('logStrogeId',this.cateId)
            // }
        },
        //栏目详情
        cateInfo(){
            axios({
                url:this.API+'/section/manage/info',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    id:this.cateId
                }
            }).then(response=>{
               console.log('获取栏目详情',response);
                if(response.data.code==200){
                    this.cateInfos = response.data.data;
                    this.childcates = response.data.data.child;
                    this.status = response.data.data.status;
                    this.cateStatus  = localStorage.setItem('cateStatus', this.status)
                    this.categorys = response.data.data.category;
                    this.times = response.data.data.time;
                    
                    console.log("4545",response.data.data.category)
                    // this.editcycle = response.data.data.time[0].cycle
                    // this.editweek = response.data.data.time[0].week
                    // this.edithour = response.data.data.time[0].hour
                    // this.editminute = response.data.data.time[0].minute
                    console.log('我是时间',this.times);
                }
                else{
                    this.showCate = false;
                    console.log(this.showCate)
                    this.noCate = true
                }
            }).catch(err=>{
                console.log(err);
            })
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
                //console.log(response);
                this.querySystemcate = response.data.data;
            }).catch(err=>{
                //console.log(err)
            })
        },
        //获取栏目分类id
        addquerySystemcate(id,index){
            let idindex = this.cid.indexOf(id);
            if(idindex>=0){
                this.cid.splice(idindex,1);
            }else{
                this.cid.push(id);
                this.$set(this.cid);//添加样式和清除样式
                console.log(this.cid);
            }
        },
        //修改分类
        editCate(){                                                                                                                             
            axios({
                url:this.API+'/section/manage/changeCid',
                method:'post',
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    id:this.cateId,
                    cid:this.cid
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
                    this.reload();
                    this.chosecateVisible = false;
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
        //获取栏目列表
        getAllCates(){
            axios({
                url:this.API+'/section/manage/all',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    list_rows: 5
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.allCates = response.data.data.data;
                    //this.title = response.data.data[0].title;
                   // console.log(this.title);
                    //console.log(this.allCates )
                }
            })
        },
        Getcategory(){
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/category/queryUser',
                method:'post',
                data:{
                    status:0,
                    section_id:this.cateId,
                }
            }).then(response=>{
                if(response.data.code==200){
                    this.categorys1 = response.data.data
                    // this.id = response.data.data.id
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
                //console.log(response);
            }).catch(err=>{
                console.log(err);
            })
        },
        //获取通过的子分类
        getpasscategory(){
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/category/queryUser',
                method:'post',
                data:{
                    status:2,
                    section_id:this.cateId,
                }
            }).then(response=>{
                this.categorys2 = response.data.data,
                this.id = response.data.data.id
            }).catch(err=>{
                console.log(err);
            })
        },
        //获取禁用的子分类
        getdiscategory(){
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/category/queryUser',
                method:'post',
                data:{
                    status:3,
                    section_id:this.cateId,
                }
            }).then(response=>{
                this.categorys3 = response.data.data,
                this.id = response.data.data.id
                //console.log(response);
            }).catch(err=>{
                console.log(err);
            })
        },
        //添加子分类
        Addcategory(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/category/add',
                method:'post',
                data:{
                    name:this.name,
                    section_id:this.cateId,
                    // type:0,
                }
            }).then(response=>{
               // console.log(response);
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    this.addcate = false;
                    this.reload();
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            })
        },
        //禁用
        CateDisable(id){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/category/disable',
                method:'post',
                data:{
                    id:id
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.reload();
                     this.disabled = true;
                    //this.reload();
                }
               // console.log('禁用成功')

            }).catch(err=>{
                console.log(err);
            })
        },

        //解除禁用
        CateRestore(id){
            axios({
                 headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/system/category/restore',
                method:'post',
                data:{
                    id:id
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.reload();
                }
                //console.log('解除禁用成功')
            }).catch(err=>{
                console.log(err);
            })
        },
        //下架栏目
        closeCate(){
            axios({
                url:this.API+'/section/manage/close',
                method:'post',
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    id:this.cateId
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
                    this.shelvesDialogVisible = false;
                    // this.$router.push('/catelist');
                    this.id = this.$route.params.id
                    this.$router.push({name:'cateinfo',params:{id:this.id}})
                    localStorage.removeItem('title')
                    // this.reload();

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
        //添加内容更新时间
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
            }else
            axios({
                url:this.API+'/section/time/add',
                method:'post',
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    sid:this.cateId,
                    cycle:this.cycle,
                    week:this.week? this.week :'0',
                    hour:this.hour,
                    minute:this.minute
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

            })
        },
        //时间段删除
        delTimeTag(id){
            this.timeId = id;
            axios({
                url:this.API+'/section/time/del',
                method:'post',
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    id:this.timeId,
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
                    this.deltimecateVisible = false;
                    this.reload();
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            })
        },
         //获取周
        getCycle(cycle){
            this.cycle = cycle;
            console.log(cycle);
            if(this.cycle==3){
                this.timing = 0;
                this.disableddate = true;
                this.disabledweek = true;
                this.time[0].week = '';
                this.time[0].hour = '';
                this.time[0].minute = '';
            }
            if(this.cycle==1){//周
                this.timing = 1;
                this.disableddate = false;
                this.disabledweek = false;
            }
            if(this.cycle==2){//日
                this.timing = 1;
                this.disabledweek = true;
                this.disableddate = false;
                this.time[0].week ='';
            }
        },
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
        //列表单个方法跳转
        goToCate(id){
            let obj = {}; 
            obj = this.allCates.find((item)=>{//这里的allCates就是上面遍历的数据源 
                return item.id === id;//筛选出匹配数据 
            }); 
            this.id = obj.id;
            console.log(this.id);
            this.title = obj.title; 
            localStorage.setItem('title', this.title);
            localStorage.setItem('cateId',this.id);
            this.$router.push({name:'cateinfo',params:{id:this.id}})
            this.reload();
            // this.$router.push({path:'/cate/:id'})
        },
        // 子分类弹框
        editeChildClass(){
            this.chosecateVisible = true
        },
        //下架弹框
        soldOut(){
            this.shelvesDialogVisible = true
        },
        
        
    }
}
</script>
<style>
.el-select-dropdown__item.selected{
    color: #07C160;
    font-weight: 700;
}
.el-select-dropdown__item:hover{
    color: #07C160;
}
.catelists:last-child{
    margin-right: 0 !important;
}
.stateTagNoPass{
    /* display: inline-block; */
    position: absolute;
    width: 60px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    /* background:linear-gradient(to right, #67DB73,#07c160, transparent); */
    /* background:linear-gradient(to right, #ededed,#9b9b9b, transparent); */
    background:linear-gradient(to right, #FC625A,#FB3030, transparent);
    color: #fff;
    border-radius: 2px;
    margin-top: -23px;
}
.stateTagPass{
    position: absolute;
    width: 60px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background:linear-gradient(to right, #67DB73,#07c160, transparent);
    /* background:linear-gradient(to right, #ededed,#9b9b9b, transparent); */
    /* background:linear-gradient(to right, #FC625A,#FB3030, transparent); */
    color: #fff;
    border-radius: 2px;
    margin-top: -23px;
}
.stateTagStating{
    position: absolute;
    width: 60px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    /* background:linear-gradient(to right, #67DB73,#07c160, transparent); */
    background:linear-gradient(to right, #ededed,#9b9b9b, transparent);
    /* background:linear-gradient(to right, #FC625A,#FB3030, transparent); */
    color: #fff;
    border-radius: 2px;
    margin-top: -23px;
}
.time .el-tag{
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
.time .el-tag .el-icon-close {
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
.listLeftBtn{
    float: left;
    text-align: left;
    width: 45px;

}
.listRightBtn{
    float: right;
    text-align: right;
    width: 45px;
}
.listLeftBtn,.listRightBtn{
    height: 100px;
    /* background-color: #ccc; */
    /* display: inline-block; */
    line-height: 100px;
    font-size: 30px;
    /* text-align: center; */
    margin-top: 10px;
    color: #07C160;
    cursor: pointer;
}
.cateInfo .databox-hours{
    margin-right: -4px;
}
.cateInfo .databox-time,.databox-week{
    margin-right: 24px;
}
.cateInfo .el-input--suffix .el-input__inner{
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
.cateInfo .el-input>input{
    border-radius: 2px;
    border-color: #ededed;
    margin-right: 8px;
}
.updateTime{
    padding: 0 37px;
}
.cateInfo .addTimeBtn{
    width: 60px;
    height: 40px;
    background-color: #07c160;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 2px;
    position: absolute;
    margin: -10px 0 0 360px;
    cursor: pointer;
}
.databox-time.el-col.el-col-2{
    /* margin-left: 20px; */
    border-radius: 2px;
}
.cateInfo .catename .cateTitle{
    /* width: 76px; */
    height: 24px;
    border-radius: 20px;
    background-color: #fff;
    color: #000;
    text-align: center;
    line-height: 24px;
    margin: -26px 10px 20px 10px;
    overflow: hidden;

}
.cateInfo .catename img{
    border-radius: 2px;
}
.cateInfo .catelists{
    width: 100px;
    height: 100px;
    /* border: 1px #cccccc solid; */
    position: relative;
    float: left;
    border-radius: 2px;
    margin-right: 30px;
    margin-top: 10px;
    transition: all .1s linear;
    cursor: pointer;
}
.cateInfo .catelists:hover{
    width: 100px;
    height: 100px;
    /* border: 1px #cccccc solid; */
    position: relative;
    float: left;
    border-radius: 2px;
    margin-right: 30px;
    margin-top: 10px;
    transform: translateY(-10px);
    transition: all .1s linear;
}
.cateInfo .catelists:hover .cateTitle{
    color: #fff;
    background-color: #07c160;
    /* border: 1px solid #07c160; */
    box-shadow: 0px 5px 10px #C1EFD7



}

.cateInfo .catename{
    width: 100px;
    height: 100px;
    border-radius: 2px;
    /* top: 10px; */
    
    background-color: #ccc;
    /* display: inline-block; */
    position: absolute;
    /* float: left; */
    text-align: center;
    line-height: 80px
}
.cateInfo .noCatePage{
    width: 904px;
    height: 850px;
    background-color: #fff;
    position: absolute;
    margin-top: -830px;
    z-index: 10;
    text-align: center;
    /* line-height: 830px */
}
.noCatePage img{
    margin: 30% 0 0 0;
}
.cate{
    float: left;
    text-align: center;
    width: 80px;
    height: 30px;
    background: -webkit-linear-gradient(top right,transparent 10% ,#F9F9F9 0);
    position: relative;
    margin:0px 15px 15px 0px;
    /* border:1px solid #eaeaea; */
    
}
.addcateform{
    margin: 30px;
}
.addcateform .el-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.classify .addClassifyBtn{
    height: 30px;
    width: 80px;
    background-color: #07c160;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 2px;
    display: inline-block;
    cursor: pointer;
}
.classify .addClassifyBtn:hover,.classify .addClassifyBtn:visited{
    height: 30px;
    width: 80px;
    background-color: #87ecb8;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 2px;
    display: inline-block;
    cursor: pointer;
}
.classify .cate-title{
    width: 80px;
    height: 30px;
    background-color: #EEFAF4;
    /* background-color: red; */
    color: #07C160;
    text-align: center;
    line-height: 30px;
    border-radius: 2px; 
}
.classify .cate-warn{
    width: 80px;
    height: 30px;
    background-color: #EEFAF4;
    color: #07C160;
    text-align: center;
    line-height: 30px;
    border-radius: 2px;
    margin-top: -30px;
    opacity: 0;
}
.classify .cate-warn:hover{
    width: 80px;
    height: 30px;
    background-color: #1B1D1F;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 2px;
    margin-top: -30px;
    opacity: 0.8;
    cursor: pointer;
}
.cateInfo .tagsbox .tagtitle{
    float: left;
    width: 60px;
    background-color: #07c160;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    color: #fff;
}
.cate-shelbtn{
    width: 200px;
    margin: 10px 0 10px 330px !important;
}
.confirmbtn{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #07C160;
    background-color: #07c160;
}
.confirmbtn:hover,.confirmbtn:focus{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #07C160;
    background-color: #07c160;
}
.cateInfo .backbtn{
    color: #7e7f80;  
    width: 80px;
    height: 30px;
    border: 1px solid #ededed;
    /* text-align: center; */
    padding:6px;
    line-height: 5px;
    border-radius: 2px;

}
.cateInfo .backbtn:hover{
    color: #7e7f80;  
    width: 80px;
    height: 30px;
    border: 1px solid #ededed;
    /* text-align: center; */
    padding:6px;
    line-height: 5px;
    border-radius: 2px;
    background-color: #fafafa;

}
.cateInfo .el-dialog__header{
    padding: 0!important
}
.catedialog{
    margin: 30px;
}
.catetagtitle{
    background-color: #ededed;
    border-radius: 2px;
    font-size: 12px;
    /* margin: 5px ; */
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
.cateInfo .tagsbox{
    width: 360px;
    /* height: 30px; */
    margin: 0 17%;
}
.cateInfo .tagsbox li{
    list-style: none !important;
    float: left !important;
    width: 60px !important;
    height: 30px !important;
    /* border:1px red solid; */
    /* background-color: #ededed; */
    margin-top: 10px !important;
    margin-right: 10px !important;
}
.cateInfo .el-dialog--center .el-dialog__body{
    padding: 0 0 1px 0!important;
}
.cate-text li{
    list-style: none !important;
    float: left !important;
    width: 40px !important;
    height: 30px !important;
    /* border:1px red solid; */
    margin-top: 5px !important;
    margin-right: 10px !important;
}
.cateInfo .alreadyPassed,.cateInfo .unreviewed,.cateInfo .disabled{
    width: 824px;
    height: 100px;
    /* padding: 20px; */
    /* background-color: #ccc; */
}

.cateInfo .el-tabs__item:hover {
    color: #000;
    cursor: pointer;
}
.cateInfo .el-tabs__item{
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #cccccc;
    position: relative;
}
.cateInfo .el-tabs__item.is-active{
    color: #000;
    font-weight: 600;
}
.cateInfo .el-tabs__active-bar{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #07c160;
    z-index: 1;
    -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}
.cateInfo .el-tabs__nav-wrap::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e7ed;
    z-index: 1;
}
.cateInfo .time{
    width: 708px;
    height: 116px;
    background-color: #fafafa;
    padding: 20px;
    margin:  80px 0px 0;
    border-radius: 2px;
}
.cateInfo .intro{
    width: 790px;
    padding: 20px;
    height: 66px;
    border-radius: 2px;
    color: #9b9b9b;
    background-color: #fafafa;
    margin-top: 20px;

}
.cateInfo .soldOutBtn{
    width: 86px;
    height: 30px;
    color: #9b9b9b;
    border: 1px solid #ededed;
    background-color: #fff;
    border-radius: 2px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    float: right;
    /* margin-right: 20px; */
    margin-top: -100px;
}
.cateInfo .cate-text a{
    text-decoration: none;
    color: #07C160;
    margin-left: 10px;
    margin-top: 5px;
    position: absolute;
    width: 60px;
    cursor: pointer;
}
.cateInfo .type{
    width: 40px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: #07c160;
    border-radius: 2px;
    display: inline-block;
    color: #fff;
    font-size: 12px;
}
.cateauth .cate-text{
    position: absolute;
    margin-left: 120px;
    margin-top: -100px;
    width: 75%;
}
.cateInfo .cateauth{
    width: 100%;
    height: 250px;
    position: relative;
}
.cateauth .catelog{
    width: 100px;
    height: 100px;
    /* margin-left: 20px; */
    border-radius: 2px;
}
.cateInfo .info-text{
    width: 100%;
    height: 20px;
    font-size: 16px;
    font-weight: 600;
    margin:20px 0;
    border-left: 2px solid #07c160;
    padding-left: 10px;
}
.infoOfCate{
    padding: 0 37px;
}
.cateInfo{
    width: 904px;
    background-color: #fff;
    /* height: 1000px; */
    padding-bottom: 40px;
    margin: 40px;
    border-radius: 2px;
}
.cateInfo .fnTitle{
    height: 53px;
    line-height: 54px;
}

.cateInfo .bage-line{
    height: 2px;
    width: 56px;
    background-color: #07C160;
    margin-left: 37px;
    position: absolute;
    margin-top: -1px;
}
.cateInfo .underline{
    width: 100%;
    height:1px;
    background-color: #f6f6f6;
}
.cateInfo .title-text{
    width: 100px !important;
    height: 16px;
    font-weight: 600;
    margin-left: 37px;
}
.cateInfo .cateList{
    height: 155px;
    /* width: 100%; */
    width: 830px;
    padding:20px  37px ;
    /* border-bottom: 1px solid #f6f6f6; */
    /* background-color: #ccc; */
}
/*  */
.cateInfo .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  /*  */
  .cateInfo .catelog img{
    width: 100px;
    height: 100px;
    border-radius: 2px;

  }
</style>
