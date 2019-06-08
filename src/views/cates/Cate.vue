<template>
    <div class="catebox">
        <div v-if="false">
        <!-- <div v-if="cateId"> -->
            <div class="cateform" v-if="showCate">
                <el-form>
                    <el-form-item>
                        <el-col :span="5" class="catetag"><label >栏目名</label></el-col>
                        <el-col :span="12" class="catetags"><span>{{cateInfos.title}}</span></el-col>
                        <el-col :span="7" class="catetags"><el-button type="text" class="catedata" >栏目综合数据</el-button></el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="catetag-pic"><label>栏目Logo</label></el-col>
                        <el-col :span="19" class="catetags"><div class="catepic"><img :src="cateInfos.logo" width="100px" height="100px"/></div></el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="catetag">
                            <label>内容更新时段</label>
                        </el-col>
                        <div v-if="times!=''">
                            <el-col :span="14" class="catetags">
                                <div  v-for="(items,index) in times" :key="index" style="margin-top:5px;height:60px;">
                                    <div style="float:left" class="datebox">
                                        <el-col :span="6" class="databox-time">
                                            <el-select v-model="items.cycle_zh" :disabled="disabled1" placeholder="选择" style="width:85px;"></el-select>
                                        </el-col>
                                        <el-col :span="6" class="databox-week">
                                            <el-select v-model="items.week_zh" :disabled="disabled1" placeholder="选择" style="width:85px;">
                                            </el-select>
                                        </el-col>
                                        <!-- <el-col :span="1" class="databox-hours" v-else>
                                            <div style="width:20px;hieght:5px;"></div>
                                        </el-col> -->
                                        <el-col :span="5" class="databox-hours">
                                            <el-select v-model="items.hour" :disabled="disabled1" placeholder="选择" style="width:70px;">
                                            </el-select>
                                        </el-col>
                                        <el-col :span="1" class="chosehours">时</el-col>
                                        <el-col :span="5" class="databox-hours">
                                            <el-select v-model="items.minute" :disabled="disabled1" placeholder="选择" style="width:70px;">
                                            </el-select>
                                        </el-col>
                                        <el-col :span="1" class="chosehours">分</el-col>
                                    </div>
                                    <div style="float:right;margin-top:10px;margin-right:-60px;" :span="2">
                                        <div class="addtag2" @click="editTag(items.id)">修改</div>
                                        <div class="addtag2" @click="delTimeTag(items.id)">删除</div>
                                    </div>
                                </div>
                                 <div class="addtag3" @click="addTimeTag()">添加</div>
                            </el-col>
                        </div>
                        <div v-else>
                            <el-col :span="6"><span style="margin-left:20px;">无固定时间段</span> <span style="margin-left:20px;cursor: pointer;" class="" @click="addTimeTag()">添加</span></el-col>
                        </div>
                    </el-form-item>
                    <!--添加时间段-->
                    <el-form-item v-show="addtag">
                    <el-col :span="5" class="catetag">
                        <label class="nullbox"></label>
                    </el-col>
                    <el-col :span="14" class="catetags">
                        
                    </el-col>
                    <!-- <el-col :span="2"><div class="deltag">删除</div></el-col> -->
                    </el-form-item>
                    <el-form-item>
                    <el-col :span="5" class="catetag">
                        <label>内容类型</label>
                    </el-col>
                    <el-col :span="12" class="catetags">
                            <div class="tagsbox">   
                                <li v-for="(item,index) in categorys" :key="index" >
                                    <div class="Seltag-icon"><div class="crl-icon"></div></div><div class="Seltagtitle"><span style="cursor:pointer">{{item.name}}</span></div>
                                </li>
                            </div>
                    </el-col>
                    <el-col :span="2"><div class="edittag" @click="chosecateVisible=true" type="text">修改</div></el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="catetag"> <label>一句话介绍</label></el-col>
                        <el-col :span="19" class="catetags">{{cateInfos.briefing}}</el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="catetag"> <label>内容简介</label></el-col>
                        <el-col :span="19" class="catetags">{{cateInfos.about}}</el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="catetag"> <label>关键词</label></el-col>
                        <el-col :span="19" class="catetags">{{cateInfos.keywords}}</el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="catetag"> <label>子分类</label></el-col>
                        <el-col :span="19" class="catetags"><li class="childlist" v-for="(item,index) in childcates" :key="index">{{item.name}}</li></el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="5" class="catetag"> <label>状态</label></el-col>
                        <el-col :span="19" class="catetags" v-if="cateInfos.status=='2'"><span class="review">已通过审核</span><i class="el-icon-circle-check"></i></el-col>
                        <el-col :span="19" class="catetags" ><span class="" style="color:#FF6E40">{{cateInfos.status=="0"?"待审核":((cateInfos.status=="1")?"拒绝":"")}}</span></el-col>
                    </el-form-item>
                </el-form>
                <div class="catebtnbox">
                    <el-row style="text-align:center">
                    <el-col :span="9" style="margin-left:40px;text-align: right;">
                        <el-button class="confirmbtn2"  style="width:50%;" @click="shelvesDialogVisible=true">下架</el-button>
                    </el-col>
                
                    <!-- <el-button>新增栏目</el-button> -->
                    <el-col :span="10" style="text-align:left;margin-left:20px;">
                        <AddChannel></AddChannel>
                    </el-col>
                    </el-row>
                </div>
            </div>
            <!--下架提示-->
            <el-dialog width="448px" title="下架提示" :visible.sync="shelvesDialogVisible" center :close-on-click-modal="false" top="20%">
                <div class="cate-sheltag"><p>确认下架该栏目吗？下架后该栏目将从当前账号删除，请谨慎选择！</p></div>
                <div class="cate-shelbtn">
                    <el-button @click="closeCate()" class="confirmbtn">确认下架</el-button>
                    <el-button @click="shelvesDialogVisible=false" >再想想</el-button>
                </div>
            </el-dialog>
            <!--重新选择分类-->
            <el-dialog width="526px" title="重新选择分类" :visible.sync="chosecateVisible" center :close-on-click-modal="false" top="20%">
                <div class="catedialog">
                    <el-form>
                        <el-form-item>
                            <el-col :span="4" class="editcatetag">
                                <label>内容类型</label>
                                <div class="catechose">(可多选)</div>
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
                        <div class="cate-line">更多分类敬请期待！</div>
                    </el-form>
                </div>
                <div class="cate-shelbtn">
                    <el-button @click="editCate()" style="width:20%" class="confirmbtn">确认</el-button>
                    <el-button @click="chosecateVisible=false" >再想想</el-button>
                </div>
            </el-dialog>
            <!--编辑时间段-->
            <el-dialog width="526px" title="修改时间段" :visible.sync="TimecateVisible" center :close-on-click-modal="false" top="20%">
                <div class="datebox" style="margin-bottom:30px;">
                    <el-col :span="6" class="databox-time">
                        <el-select v-model="editcycle" placeholder="选择">
                            <el-option
                            v-for="item in options"
                            :key="item.cycle"
                            :label="item.label"
                            :value="item.cycle">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" class="databox-week">
                        <el-select v-model="editweek" placeholder="选择" >
                            <el-option
                            v-for="item in options2"
                            :key="item.week"
                            :label="item.label"
                            :value="item.week">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="databox-hours">
                        <el-select v-model="edithour" placeholder="12" >
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
                        <el-select v-model="editminute" placeholder="12">
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
                <div class="cate-shelbtn">
                    <el-button @click="changeTime()" style="width:20%" class="confirmbtn">确认</el-button>
                    <el-button @click="TimecateVisible=false" >再想想</el-button>
                </div>
            </el-dialog>
            <!--添加时间段-->
            <el-dialog width="526px" title="添加时间段" :visible.sync="addTimeVisible" center :close-on-click-modal="false" top="20%">
                <div class="datebox" style="margin-bottom:30px;">
                    <el-col :span="6" class="databox-time">
                        <el-select v-model="cycle" placeholder="选择">
                            <el-option
                            v-for="item in options"
                            :key="item.cycle"
                            :label="item.label"
                            :value="item.cycle">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" class="databox-week">
                        <el-select v-model="week" placeholder="选择" >
                            <el-option
                            v-for="item in options2"
                            :key="item.week"
                            :label="item.label"
                            :value="item.week">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="databox-hours">
                        <el-select v-model="hour" placeholder="12" >
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
                        <el-select v-model="minute" placeholder="12">
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
                <div class="cate-shelbtn">
                    <el-button @click="addTime()" style="width:20%" class="confirmbtn">确认</el-button>
                    <el-button @click="addTimeVisible=false" >再想想</el-button>
                </div>
            </el-dialog>
            <!--删除时间段-->
             <el-dialog title="提示" :visible.sync="deltimecateVisible" width="400px" center :close-on-click-modal="false">
                <div class="del-dialog-cnt" style="text-align:center">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deltimecateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="delTime()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div  class="noCateInfo" v-if="false">
            <div style="text-align:center;margin-top:200px;" v-if="noCate">
                <div class="note"><img src="../../assets/image/colum_bg.jpg" alt=""></div>
                <p>您当前没有添加栏目,&nbsp;需要添加栏目后使用该功能</p>
                <div>
                    <AddChannel></AddChannel>
                </div>
            </div>
            <!-- <div style="text-align:center;margin-top:200px;">
                <div class="note"><img src="../../assets/image/noqudao_bg.jpg" alt=""></div>
                <p>您的用户信息还没有通过审核,&nbsp;暂时不能使用该功能</p>
                <el-button>查看状态</el-button>
            </div>   -->
 
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import AddChannel from '@/components/AddChannel.vue'
export default {
    
    inject:['reload'],
    data(){
        return{
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
            options:[{cycle:'1',label:'每周'},{cycle:'2',label:'每日'},{cycle:'无固定时间',label:'无固定时间'}],
            options2:[{week:'0',label:'选择'},{week:'1',label:'周一'},{week:'2',label:'周二'},{week:'3',label:'周三'},{week:'4',label:'周四'},{week:'5',label:'周五'},{week:'6',label:'周六'},{week:'7',label:'周天'}],
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
            // activeIndex:-1,
        }
    },
    components:{
       AddChannel,
    },
    created(){
        //this.cateId= this.$route.params.id,
        //console.log('111111111',this.$route.params.id)
       // console.log('传过来的id值',this.cateId);
       this.goTocate();
        this.cateInfo();
        this.getquerySystemcate();                                                                                                                                                                                              
    },
    methods:{
        goTocate(){
            if(this.$route.params.id>0){
                this.cateId= this.$route.params.id
            }else{
                this.cateId= localStorage.getItem('cateId');
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
                this.querySystemcate = response.data.data;
            }).catch(err=>{
            })
        },
        //修改时间段
        editTag(id){
           // this.timeId = id;
            let obj = {}; 
            obj = this.times.find((item)=>{
                return item.id === id;
            }); 
            console.log(obj)
            this.editcycle_zh = obj.cycle_zh;
            this.editcycle = obj.cycle;
            this.editweek = obj.week;
            this.edithour = obj.hour;
            this.editminute = obj.minute;
            console.log(this.editcycle)
            this.timeId = id;
            this.addtag = !this.addtag;
            this.TimecateVisible = true;
        },

        //添加时间段
        addTimeTag(id){
           // this.timeId = id;
            console.log(this.timeId);
            this.addTimeVisible = true;
        },
   
        //删除时间段
        delTimeTag(id){
            this.timeId = id;
            this.deltimecateVisible = true;
        },

        //获取周
        getCycle(cycle){
            this.cycle = cycle;
            console.log(cycle);
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
                this.time[0].week ='';
                //this.time[0].week = 0;
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
        changeClick:function(index){
            // this.activeIndex = index;
            this.isShow = !this.isShow;
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
        //获取栏目详情
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
                    //console.log(this.time);
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
        //获取用户审核信息
        getUserAudit(){
            // axios({
            //     url:this.API+""
            // })
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
                    this.chosecateVisible = false;
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
                console.log(err);
            })
        },

        //获取时间段的id


        //编辑内容更新时段
        changeTime(){
            axios({
                url:this.API+'/section/time/edit',
                method:'post',
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    id:this.timeId,  
                    cycle:this.editcycle,
                    week:this.editweek?this.editweek:'0',
                    hour:this.edithour,
                    minute:this.editminute,
                  
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
                console.log(err);
            })
        },

        //添加内容更新时间
        addTime(){
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
        delTime(){
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
                    this.$router.push('/catelist');
                    localStorage.removeItem('title')
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
                console.log(err);
            })
        }
    }
}
</script>
<style>
.catebox{
    width:904px;
    /* height:1000px; */
    margin:40px;
    -webkit-border-radius:2px;
    border-radius: 2px;
    /* box-shadow: 0 0 1px #eaeaea; */
    /* padding:35px 20px 15px 20px; */
    background: #ffffff;
    /* border:1px solid #eaeaea; */
    background-clip:padding-box;
}
.cateform{
   /* text-align: center; */
   padding:35px 130px 15px 200px;
}
.nullbox{
    width: 20.83%;
    height:60px;
    border:1px #ffffff solid;
}
.cateform .catetag{
  text-align: right;
  color: #cccccc;
}
.cateform .catetag-pic{
     text-align: right;
    color: #cccccc;
    padding-top: 10px;
}
.cateform .catetags{
    padding-left:20px;
}
.el-form-item__content {
    line-height: 30px;
}
.catepic{
    border:1px #cccccc solid;
    height:100px;
    width: 100px;
    border-radius: 5px;
}
.catepic img{
    border-radius: 5px;
}
.datebox{
    height: 50px;
    line-height: 50px;
    background-color: #F4F4F4;
    border-radius: 5px;
}
.datebox .databox-week .el-input {
    width: 80%;
    /* margin-left:-10px; */
}
.datebox .databox-time .el-input {
    width: 80%;
    margin-left:10px;
}
.databox-hours .el-input{
    width: 70%;
    margin-left:-10px;
}
.chosehours{
    margin-left:-30px;
}
.catebox .el-select .el-input__inner {
    background-color: #EDEDED !important;
    color: #606266 !important;
    height: 30px !important;
    line-height: 30px !important;
    outline: 0 !important;
    padding: 0 2px !important;
    width: 90% !important;
    border-radius: 2px !important;
}
.catebox .el-input__icon {
    width: 20px;
}
.catebox .el-input--suffix .el-input__inner {
    padding-right: 10px;
}
.catebox .el-input__suffix {
    width: 80px !important;
}
.el-input__suffix-inner {
    pointer-events: all;
    margin-left: 50px !important;
}
.catebox .el-select .el-input.is-focus .el-input__inner {
    border-color: #cccccc;
}
.catebox .el-select .el-input__inner:focus {
    border-color: #cccccc;
}
.catebox .el-button--text {
    color: #18C26A;
}
.catebox .catedata{
    color: #2F5CED
}
.catebox .addtag2{
    float: left;
    color: #FFFF;
    border-radius: 4px;
    background-color: #18c26A;
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
    cursor: pointer;
}
.catebox .addtag3{
    float: left;
    color: #FFFF;
    border-radius: 4px;
    background-color: #18c26A;
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
    cursor: pointer;
}
.catebox .addtag{
    width: 50px;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    margin-left:20px;
    background-color: #F4F4F4;
    font-size: 20px;
    color: #18C26A;
}
.catebox .deltag{
     width: 50px;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    margin-left:10px;
    font-size: 14px;
}
.catebox .deltag .deltag-btn{
    color: #18C26A;
}
.catebox .tagsbox{
    height: 100px !important;  
}

.catebox .tagsbox li{
    list-style: none !important;
    float: left !important;
    width: 60px !important;
    height: 30px !important;
    /* border:1px red solid; */
    margin-top: 10px !important;
    margin-right: 10px !important;
}
.catebox .tagsbox .Seltag-icon{
     width: 0;
     height: 0;
     float: left;
     border-top: 15px solid transparent;
     border-right: 20px solid #FF6E40;
     border-bottom: 15px solid transparent;
     position: relative;
}
.catebox .tagsbox .tag-icon{
     width: 0;
     height: 0;
     float: left;
     border-top: 15px solid transparent;
     border-right: 20px solid #FF6E40;
     border-bottom: 15px solid transparent;
     position: relative;
}

.catebox .tagsbox .catetag-icon{
     width: 0;
     height: 0;
     float: left;
     border-top: 15px solid transparent;
     border-right: 20px solid #f5f5f5;
     border-bottom: 15px solid transparent;
     position: relative;
}
.catebox .tagsbox .tag-icon{
     width: 0;
     height: 0;
     float: left;
     border-top: 15px solid transparent;
     border-right: 20px solid #FF6E40;
     border-bottom: 15px solid transparent;
     position: relative;
}
.catebox .tagsbox .Seltagtitle{
    float: left;
    width: 40px;
    background-color: #FF6E40;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    color: #ffffff;
}

.catebox .tagsbox .catetagtitle{
    float: left;
    width: 40px;
    background-color: #f5f5f5;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
}
.catebox .tagsbox .tagtitle{
    float: left;
    width: 40px;
    background-color: #FF6E40;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
}
.catebox .tagsbox .crl-icon{
    width: 5px;
    height: 5px;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    left:8px;
    top:-2px;
}
.catebox .tagsbox .is-tagtitle{
    float: left;
    width: 40px;
    background-color: #D2D2D2;
    color: #ffffff;
}
.catebox .tagsbox .is-tagtitle span{
    color: #ffffff;
    margin-left:5px;
}
.catebox .tagsbox .tagtitle span{
    color: #ffffff;
    margin-left:5px;
}
.catebox .edittag{
    float: right;
    color: #FFFF;
    border-radius: 4px;
    background-color: #18c26A;
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
    cursor: pointer;
    margin-left:-20px;
    margin-top: 10px;
}
/* .catebox .edittag .edittag-btn{ 
    float: right;
    color: #FFFF;
    border-radius: 4px;
    background-color: #18c26A;
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
    cursor: pointer;
    } */
.catebox .catetags .review{
    color: #18C26A;
}
.catebox .catetags i{
    color: #18C26A;
    font-size: 20px;
    margin-left:5px;
}
.catebox .catebtnbox{
    margin-top: 50px;
    text-align: center;
}

.catebox .el-dialog--center .el-dialog__header {
    border-bottom: 1px #cccccc solid;
    margin-left: 20px;
    width: 90%;
    padding:20px 0px 10px;
}
.catebox .cate-sheltag p{
    text-align: center;
    font-size: 12px;
}
.catebox .cate-shelbtn{text-align: center;}
.catebox .cate-shelbtn .confirmbtn{
    color: #ffffff;
    background-color: #18C26A;
    border: 1px solid #18C26A;
}
.catebox .cate-shelbtn .confirmbtn:hover,.catebox .cate-shelbtn .confirmbtn:focus{
    border-color: #18C26A;
    border: 1px solid #18C26A;
}
.catebox .confirmbtn2{
    color: #ffffff;
    background-color: #18C26A;
     border: 1px solid #18C26A;
}
.catebox .confirmbtn2:hover,.catebox .confirmbtn2:focus{
    border-color: #18C26A;
     border: 1px solid #18C26A;
}
.catebox .editcatetag{
    padding-left:10px;
    color: #cccccc;
}
.catebox .catechose{
    margin-top: -10px;
}
.catebox .cate-line{
    width: 340px;
    height: 20px;
    line-height: 20px;
    border-top: 1px #cccccc solid;
    margin-left: 80px;
    font-size: 14px;
    margin-bottom: 30px;
    padding-top: 5px;
    color: #cccccc;

}
.catebox .catedialog .el-form-item {
    margin-bottom: 1px;
}
.catebox .childlist{
    list-style: none;
    float: left;
    margin-right: 10px;
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
.catebox .el-select .el-input .el-select__caret {
    margin-left: 0px!important;
}
.noCateInfo .el-button{
    background-color: #18C26A;
}
.noCateInfo .el-button:hover{
    background-color: #39b918;
}
.note p{
    color: #525252;
}
.catebox .addchal{
    width: 124px;
    height: 40px;
}
</style>

