<template>
    <div>
    <div class="container">
        <!-- ================================ -->
        <header class="header">
            <div class="headLeft" style="width:1182px;">
                <el-row :gutter="30" style="">
                    <el-col :span="4"><div class="grid-content logoBg">
                    <img style="width:128px;line-height: 30px" src="../assets/image/logo.png"/>                        
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content null"></div></el-col>
                    <el-col :span="2"><div class="grid-content null"></div></el-col>
                    <el-row :gutter="40" style="">
                    <!-- 栏目下拉 -->
                    <el-col :span="2">
                        <div class="grid-content select" >
                            <div class="catelist1" v-if="this.allCates.length > 0">
                                <el-select @change=" pickRoleName" class="cateinput" v-model="title" value-key="id" placeholder="选择" style="width:80px;height:30px;color:#000">
                                    <el-option
                                    v-for="item in allCates"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id" 
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-col>
                     <!-- 添加栏目 -->
                    <el-col :span="2">
                        <div class="grid-content addBtn">
                                <!-- <AddChannel></AddChannel> -->
                                <div class="addcateBtn" @click="addCatePath">添加栏目</div>
                        </div>
                    </el-col>
                    <!-- 邮箱 -->
                    <el-col :span="1.5">
                        <div class="grid-content userEmail">
                            <el-tooltip class="item" effect="dark" content="CEO邮箱" placement="bottom" style="">
                                <i class="iconfont icon-youxiang" style="cursor:pointer" @click="goCEO"></i>
                            </el-tooltip>
                         </div>
                    </el-col>
                    <!-- 客服 -->
                    <el-col :span="1.5">
                        <div class="grid-content kefu">
                            <el-tooltip class="item" effect="dark" content="客服" placement="bottom">
                                <i class="iconfont icon-kefuerji" style="cursor:pointer"></i>
                            </el-tooltip>
                        </div>
                    </el-col>
                    <!-- 消息 -->
                    <el-col :span="1.5">
                        <div class="grid-content usermsg">
                            <el-badge :is-dot="this.showRed" class="unreadmsg">
                                <el-tooltip class="item" effect="dark" content="我的消息" placement="bottom" >
                                    <i class="iconfont icon-lingdang1" style="cursor:pointer" @click="UnreadMsg"></i>
                                </el-tooltip>
                            </el-badge>
                        </div>
                    </el-col>
                    <!-- 头像 -->
                    <el-col :span="2">
                        <div class="grid-content usertouxiang">
                            <el-dropdown trigger="hover" class="userinfo">
                                <span class="el-dropdown-link userinfo-inner">
                                    <img v-if="imageUrl==null" src="../assets/image/moren.png"/>
                                    <img v-else :src="imageUrl"/>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="userSet">我的账户</el-dropdown-item>
                                    <el-dropdown-item @click.native="mycase">我的钱包</el-dropdown-item>
                                    <el-dropdown-item @click.native="authinfo">认证信息</el-dropdown-item>
                                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                    </el-row>
                </el-row>
            </div>
            <!-- ====================================================================================================================== -->
            <div class="lifi-header-cont" v-if="a = false">
                <div class="hint-step-2" v-show="showHint">
                    &nbsp;&nbsp;当您的用户信息通过审核后,&nbsp;您需要给<br>&nbsp;&nbsp;您的账号<span>添加栏目</span>。
                    <div class="arrow-up"></div>
                    <div class="step-2">第二步</div>
                    <div class="addColumn">+添加栏目</div>
                </div>
                <el-col style="width:300px" class="logo" :class="collapsed?'logo-collapse-width':'logo-width' ">
                    <img style="margin-top:12px;width:128px" src="../assets/image/logo.png"/>
                </el-col>
                <el-col style="width:455px">
                    <div class="tools" @click.prevent="collapse">
                        <i class="fa fa-align-justify"></i>
                    </div>
                </el-col>
                <!-- 添加栏目 -->
                <el-col style=" width: 115px;
                                left: 57%;
                                top: 3px;" v-if="allCates==''">
                    <!-- <div @click="goAdd()"> -->
                    <!-- <AddChannel></AddChannel> -->
                    <!-- </div> -->
                </el-col>
                <!-- <el-col style="width:200px;">
                    <AddChannel></AddChannel>
                </el-col> -->
                <!--已经有栏目-->
                <el-col style="width:84px;" v-else>
                    <div class="catelist">
                        <el-select @change=" pickRoleName" class="cateinput" v-model="title" value-key="id" placeholder="选择" style="width:120px;height:30px">
                            <el-option
                            v-for="item in allCates"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id" 
                            >
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <!--金额-->
                <el-col :span="1" class="userinfo">
                    <div class="money">
                        <span class="el-dropdown-link userinfo-inners ">
                            <img src="../assets/image/cus_ser_icon.png" @click="savemoney"/>
                            <!-- <img src="../assets/image/remind_icon.png"/> -->
                        </span>
                        </div>
                </el-col>
                <!--CEO-->
                <el-col :span="1" class="userinfo">
                    <div class="msg">
                        <span class="el-dropdown-link userinfo-inners ">
                            <img src="../assets/image/email_icon.png" @click="goCEO"/>
                        </span>
                    </div>
                </el-col>
                <!--客服-->
                <el-col :span="1" class="userinfo">
                    <!-- <el-popover
                        placement="top-start"
                        title="标题"
                        width="200"
                        trigger="hover"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"> -->
                        <!-- <img src="../assets/image/kf.png" slot="reference"/> -->
                        <!-- <el-button slot="reference">hover 激活</el-button> -->
                    <!-- </el-popover> -->
                    <div class="server">
                    <span class="el-dropdown-link userinfo-inners">
                        <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start"> -->
                        <img src="../assets/image/kf.png"/>
                        <!-- </el-tooltip> -->
                    </span>
                    </div>
                </el-col>
                <!--提醒-->
                <el-col :span="1" class="userinfo">
                    <span class="el-dropdown-link userinfo-inners">
                            <el-badge :is-dot="this.showRed" class="item">

                            <img src="../assets/image/my_news_icon_slt.png" @click="UnreadMsg" style="cursor:pointer"/> 
                            </el-badge>
                    </span>
                    
                </el-col>
                
                <!--用户-->
                <el-col :span="1" class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            <img v-if="imageUrl==null" src="../assets/image/moren.png"/>
                            <img v-else :src="imageUrl"/>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item @click.native="userSet">个人中心</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                </el-col>
            </div>
        </header>
        <div class="lifi-main-page" v-if="nav">
            <!-- 调用提示蒙版 -->
            <div class="hint" v-show="showHint"></div>
            <div class="goSound" v-show="showHint">
                <el-checkbox v-model="chacked">不再提示</el-checkbox>
                <div class="kownBtn" @click="notShowHint()">我知道了</div>
            </div>
            <!-- ====================================================================================================================== -->
            <div :span="24" class="main">
                <aside >
                    <!-- <el-menu v-if='false' class="el-menu-vertical-demo aside_el_menu" :default-active="$route.path" style="background:#FFF" @select="handleselect" unique-opened router >
                        <div class="menu-top" style="cursor:pointer">发行</div>
                        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                            <el-submenu :index="index + '' " v-if="!item.leaf" :key="index" style="background:#fff">
                                <template slot="title">
                                    <i :class="item.iconCls" class="iconfont"></i>{{item.name}}
                                </template>
                                <el-menu-item style="background:#fff;margin-left: 0px;" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-if="item.leaf && item.children.length>0" :index="item.children[0].path" :key="index" style="background:#fff">
                                <i :class="item.iconCls" class="iconfont"></i>{{item.children[0].name}}
                            </el-menu-item>
                        </template>
                    </el-menu> -->
                    <!-- 左导航 -->
                    <div class="leftNav">
                        <div class="titleNav">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发行<i class="el-icon-arrow-down" style="margin-left:35px;margin-right:20px;" ></i></div>
                        <div class="allNav"  @click="toPerInfo" :style="showArrow1 == true ? 'color:#07c16c':'color:#000'">
                            <div class="leftSign"  v-if="showArrow1"></div>
                            <div class="mailModule"><i class="iconfont icon-ShapeCopy"></i> 主页 <i class="el-icon-arrow-right" style="margin-left:106px;" v-if="showArrow1"></i></div>
                        </div>
                        <div class="allNav"  @click="toPublish" :style="showArrow2 == true ? 'color:#07c16c':'color:#000'">
                            <div class="leftSign"  v-if="showArrow2"></div>
                            <div class="mailModule"><i class="iconfont icon-anniuicon"></i>发行管理 <i class="el-icon-arrow-right" style="margin-left:82px;"  v-if="showArrow2"></i></div>
                        </div>
                        <div class="allNav"   @click="toCates" :style="showArrow3 == true ? 'color:#07c16c':'color:#000'">
                            <div class="leftSign"  v-if="showArrow3" ></div>
                            <div class="mailModule"><i class="iconfont icon-iconfontlanmu"></i>我的栏目 <i class="el-icon-arrow-right" style="margin-left:82px;" v-if="showArrow3"></i></div>
                        </div>
                        <div class="allNav"  @click="toChannelList" :style="showArrow4 == true ? 'color:#07c16c':'color:#000'">
                            <div class="leftSign"  v-if="showArrow4" ></div>
                            <div class="mailModule" ><i class="iconfont icon-qudaoguanli1"></i>渠道管理 <i class="el-icon-arrow-right" style="margin-left:82px;" v-if="showArrow4"></i></div>
                        </div>
                    </div>
                    <!-- 推广位 -->
                    <div class="advertising">
                        <div class="adverImg">
                            <img src="../assets/image/ad.png" alt="">
                        </div>
                        <li style="margin-top:10px;margin-left:25px;">您的内容一键发行</li>
                    </div>
                </aside>
                <section class="content-container">
                    <div class="hint-step-1" v-show="showHint">
                    <span class="el-textBefore"> &nbsp;&nbsp;请在<span class="changeColor">个人中心</span>的<span class="changeColor">用户信息</span>留意您的审核<br>&nbsp;&nbsp;状态,&nbsp;大概需要<span class="changeColor">1个工作日</span>的审核时间。</span>
                        <div class="arrow-left"></div>
                        <div class="step-1">第一步</div>
                        <div class="userCenter"><i class="iconfont icon-icon_zhanghao">个人中心</i></div>
                    </div>
                    <div class="hint-step-3" v-show="showHint">
                        &nbsp;&nbsp;当您的栏目通过审核之后,需要给您进入<br>&nbsp;&nbsp;<span>渠道管理</span>开通您的渠道。
                        <div class="arrow-left-3"></div>
                        <div class="step-3">第三步</div>
                        <div class="channelManagement"><i class="iconfont icon-wumoxing">渠道管理</i></div>
                    </div>
                        <div class="grid-content bg-purple-light">
                            <el-col :span="24" class="content-wrapper">
                                <transition name="fade" mode="out-in">
                                    <router-view></router-view>
                                </transition>
                            </el-col>
                    </div>
                </section>
            </div>
        </div>
        <el-col class="footer" style="">
            <!-- <p style="color:#cccccc;">京ICP25015638号/京ICP证182639号 北京市公安局朝阳分局备案编号110250000560</p> -->
            <p style="color:#cccccc;">&copy; &nbsp;2019 Copyright 超声波发行 桂ICP备18009283号-5</p>
            <!-- <div class="playbox"><audio-play></audio-play></div> -->
        </el-col>
    </div>
     </div>
</template>
<script>
import axios from 'axios';
import AddChannel from '@/components/AddChannel.vue'
// import AudioPlay from '@/components/AudioPlay'

export default {
    inject:['reload'],
    data(){
        return{
            showArrow1:false,
            showArrow3:false,
            showArrow4:false,
            showArrow2:false,
            nav:true,
            showRed:false,
            chacked:false,
            showHint:false,
            collapsed:false,
            children:[],
            allCates:[{}],
            // value: '',
            label:'',
           // label:localStorage.getItem('label') || '',
           // label:'',
            value:localStorage.getItem('value') || '',
            //title:'',
            key:'',
            imageUrl:'',
            cateName:'',
            title:localStorage.getItem('title') || '',
            unreadMsg:[],
        }

    },
    components:{
       AddChannel,
    //    AudioPlay
    },
    created(){
        this.getAllCates();
        this.getPullmsg();
        this.getSetUserInfo();
        this. getUserMsg();//获取未读信息
        // this.useraudit_status =localStorage.getItem(' useraudit_status')
        // console.log(this.useraudit_status)
        this.firstlogin();
        this.id= this.$route.params.id
        console.log('路由id',this.id)

    },
    mounted(){

    },
    methods:{
        //拉取系统消息
        getPullmsg(){
            let self = this;
            axios({
                url:this.API+'/msg/msg/pull',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                //console.log(response);
                if(response.data.code==200){
                    setTimeout(()=>{
                        self.getPullmsg()
                    },10000)
                }else{
                    console.log('请求失败')
                    return;
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //获取未读信息
        getUserMsg(){
            axios({
                url:this.API+"/msg/msg/unRead",
                method:'post',
                data:{
                    page:1,
                    list_rows:1
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                if(response.data.code==200){
                    console.log('123145',response.data.data.data)
                    this.unreadMsg = response.data.data.data
                    if(this.unreadMsg != ''){
                        this.showRed = true
                    }

                }
            })
        },
        //获取数据
        getUserData(){
              
        },
        
        //获取栏目列表
        getAllCates(){
            axios({
                url:this.API+'/section/manage/all',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                //console.log(response);
                if(response.data.code==200){
                    this.allCates = response.data.data.data;
                    console.log('cate',this.allCates )
                    this.id = this.allCates[0].id
                    // var obj = {}; 
                    // obj = this.allCates.find((item)=>{//这里的allCates就是上面遍历的数据源 
                    //     return item.id == id;//筛选出匹配数据 
                    // }); 
                    // this.id = obj.id;
                    // //console.log(this.id);
                    // this.title = obj.title; 
                    // this.cateId = localStorage.setItem('cateId',this.id);
                        }
                    })
        },

        //用户信息
        getSetUserInfo(){
            axios({
                url:this.API+'/user/user/getSetInfo',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
               // console.log(response);
                if(response.data.code==200){
                    this.userInfo = response.data.data;
                    console.log('用户信息',response.data.data)
                    this.phone = response.data.data.phone;
                    this.imageUrl = response.data.data.head_image;
                    this.email = response.data.data.email;               
                    localStorage.setItem('imageUrl',this.imageUrl);
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    });
                    this.$router.push('/')
                }
            }).catch(error=>{
                console.log(error);
            })
        },

        //选择栏目
        pickRoleName(id){ 
            let obj = {}; 
            obj = this.allCates.find((item)=>{//这里的allCates就是上面遍历的数据源 
                return item.id == id;//筛选出匹配数据 
            }); 
            this.id = obj.id;
            console.log('isID',typeof(this.id));
            this.title = obj.title; 
            this.cateId = localStorage.setItem('cateId',this.id);
            if(window.location.href.indexOf("cateinfo") > -1){
                // this.$router.push({path:`/cateinfo/${id}`})
                this.$router.push({name:'cateinfo',params:{id:this.id}})
                console.log('isID+++',this.id);
            }else if(window.location.href.indexOf("chlist") > -1){
               
            }else if(window.location.href.indexOf("perinfo") > -1){  
                this.$router.push({name:'perinfo',params:{id:this.id}})
            }
            localStorage.setItem('title', this.title);
            this.reload();
        } ,
       
        handleselect:function(a,b){

        },
        logout(){
            axios({
                url:this.API+'/user/login/out',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response)
                if(response.data.code==200){
                    localStorage.removeItem('userInfo');
                    this.$message({
                        message:response.data.msg,
                        type:'success'
                        })
                        this.$router.push('/');
                        }
                    }).catch(err=>{
                     console.log(err);
                     })
            } , 
        //首次登录用户显示提示
        firstlogin(){
            this.firstLogin = localStorage.getItem('is_login')
            if(this.firstLogin == 0){
                // this.showHint = true;
            }
        },
        //点击去除提示蒙版
        notShowHint(){
            // console.log(this.showHint)
            localStorage.setItem('is_login',1)
            // this.showHint = false;
        },
        //不再显示提示蒙版
        notHintEver(){
        },
        // 检测账号是否为首次登录和登录失效跳回Home
        checkUser(){
            axios({
                url:this.API+"/user/user/getUserInfo",
                method:"post",
                headers:{
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                if(response.data.code == 200){
                    this.audit_status = response.data.data.audit_status
                    localStorage.setItem("audit_status",this.audit_status)
                }
            })
        },
        //未读消息
        UnreadMsg(){
            this.$router.push({path:"/msglist"})
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = false;
        },
        //CEO信箱
        goCEO(){
            this.$router.push({path:"/ceomail"})
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = false;
        },
        //充值
        savemoney(){
            this.$router.push({path:"/addpay"})
        },
        userSet(){
            this.$router.push({path:'/setting'})
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = false;
            // this.nav = false;
        },
        //认证信息
        authinfo(){
            this.$router.push('/authinfo')
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = false;
        },
        //我的钱包
        mycase(){
            this.$router.push('/mycase')
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = false;
        },
        //主页
        toPerInfo(){
            this.$router.push('/perinfo')
            this.showArrow1 = true;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = false;
            },
        //发行管理
        toPublish(){
            this.$router.push('/haspublish')
            this.showArrow1 = false;
            this.showArrow2 = true;
            this.showArrow3 = false;
            this.showArrow4 = false;
            },
        //栏目管理
        toCates(){
            this.$router.push({name:'cateinfo',params:{id:this.id}})
            // console.log('我是跳转id',this.cateId)

            // this.$router.push('/cateinfo')
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = true;
            this.showArrow4 = false;
            },
        //渠道管理
        toChannelList(){
            this.$router.push('/chlist')
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = true;
        },
        //添加栏目
        addCatePath(){
            this.$router.push('/addcate')
        },
        mouseEnter1(){
            this.showArrow1 = true;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = false;
        },
        mouseEnter2(){
            this.showArrow1 = false;
            this.showArrow2 = true;
            this.showArrow3 = false;
            this.showArrow4 = false;
        },
        mouseEnter3(){
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = true;
            this.showArrow4 = false;
        },
        mouseEnter4(){
            this.showArrow1 = false;
            this.showArrow2 = false;
            this.showArrow3 = false;
            this.showArrow4 = true;
        },
        mouseLeave1(){
            this.showArrow1 = false;
        },
        mouseLeave2(){
            this.showArrow2 = false;
        },
        mouseLeave3(){
            this.showArrow3 = false;
        },
        mouseLeave4(){
            this.showArrow4 = false;
        },
        
    },
}
</script>
<style>
.addcateBtn{
    width: 80px;
    height: 30px;
    color: #fff;
    background-color: #07c160;
    line-height: 30px;
    text-align: center;
    border-radius: 2px;
    margin: 15px 30px 30px -30px;
    cursor: pointer;
}
.addcateBtn:hover{
    width: 80px;
    height: 30px;
    color: #fff;
    background-color: #17C26A;
    line-height: 30px;
    text-align: center;
    border-radius: 2px;
    margin: 15px 30px 30px -30px;
    cursor: pointer;
}
.hint{
    z-index: 1;
    opacity: .3;
    position: fixed;
    top:0px;
    bottom: 0px;
    width:100%;
    background-color: #000;
}
.hint-step-1{
    color: #535353;
    border-style: solid;
    border-color: #fff;
    margin-top: 186px;
    margin-left: -39px;
    box-shadow: -1px 2px 6px 2px #909090;
    text-align: 20px;
    line-height: 25px;
    width: 250px;
    height: 50px;
    z-index: 2;
    position: absolute;
    background-color: #fff;
    border-radius: 5px;
    padding: 4px
}
.userCenter{
    width: 120px;
    height: 40px;
    background-color: #fff;
    box-shadow: -1px 2px 6px 2px #BDBDBD;
    border-radius: 5px;
    line-height: 40px;
    margin-left: -145px;
    margin-top:-40px;
    text-align: center;
    color: #c8c8c8;
    /* opacity: .3; */
}
.channelManagement{
    width: 120px;
    height: 40px;
    background-color: #fff;
    box-shadow: -1px 2px 6px 2px #BDBDBD;
    border-radius: 5px;
    line-height: 40px;
    margin-left: -145px;
    margin-top:-32px;
    text-align: center;
    color: #c8c8c8;
    font-size: 14px !important;
    /* opacity: .3; */
}
.addColumn{
        width: 84px;
    height: 28px;
    background-color: #2f77ed;
    box-shadow: -1px 2px 6px 2px #BDBDBD;
    border-radius: 4px;
    line-height: 28px;
    margin-left:-15px;
    margin-top:-100px;
    text-align: center;
    color: #fff;
    /* opacity: .3;  */
}
.hint-step-2{
    color: #535353;
    border-style: solid;
    border-color: #fff;
    margin-top: 73px;
    margin-left: 750.5px;
    box-shadow: -1px 2px 6px 2px #909090;
    text-align: 20px;
    line-height: 25px;
    width: 250px;
    height: 50px;
    z-index: 2;
    position: absolute;
    background-color: #fff;
    border-radius: 5px;    
    padding: 4px;
}
.hint-step-3{
    color: #535353;
    border-style: solid;
    border-color: #fff;
    margin-top: 98px;
    margin-left:-39px;
    box-shadow: -1px 2px 6px 2px #909090;
    text-align: 20px;
    line-height: 25px;
    width: 250px;
    height: 50px;
    z-index: 2;
    position: absolute;
    background-color: #fff;
    border-radius: 5px;   
    padding: 4px
}
.goSound{
    margin: 540px 50%;
    width: 100px;
    height: 100px;
    z-index: 2;
    position: absolute;

}
.goSound .el-checkbox{
    color: #fff;
    margin-left: 10px;
    margin-bottom: 10px;
}
.goSound .kownBtn{
    width: 100px;
    height: 40px;
    background: #07C160;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
}
    .goSound .kownBtn:hover{
        background-color: #16C950;
    }
    .goSound .kownBtn:active{
        background-color: #07C160;
    }
.hint-step-1 .arrow-left{
    width: 0;
    height: 0;
    margin-top: -40px;
    margin-left: -17.5px;
    border-top:10px solid transparent; 
    border-right: 15px solid #fff;
    border-bottom: 10px solid transparent;
}
.step-1,.step-2,.step-3{
    width: 70px;
    height: 28px;
    background: #17C26A;
    box-shadow: 4px -3px 0px 1px #fff;
    transform: skew(16deg);
    -webkit-transform: skew(-20deg);
    -moz-transform: skew(20deg);
    -ms-transform: skew(20deg);
    text-align: center;
    line-height: 28px;
    font-size: 18px;
    color: #fff;

}
.step-1,.step-3{
    margin-left: 269px;
    margin-top: -19px;
}
.step-2{
    margin-top: 10px;
    margin-left: -95px;
}
.hint-step-2 .arrow-up{
    width: 0;
    height: 0;
    margin-top: -65px;
    margin-left: 13.5px;
    border-left:10px solid transparent; 
    border-right: 10px solid transparent;
    border-bottom: 15px solid #fff;    
}
.hint-step-3 .arrow-left-3{
    /* border-radius: 18px; */
    width: 0;
    height: 0;
    margin-top: -40px;
    margin-left: -17.5px;
    border-top:10px solid transparent; 
    border-right: 15px solid #fff;
    border-bottom: 10px solid transparent;
    /* padding: 4px;   */
}
.hint-step-1 .changeColor{
    color: #17C26A;
}
.hint-step-1  .el-textBefore::before{}
.hint-step-2 span{
    color: #17c26a;
}
.hint-step-3 span{
    color: #17C26A;
}
.container{
    position: absolute;
    top:0px;
    bottom: 0px;
    width:100%
}
.container .header{
    height:60px;
    line-height: 60px;
    background-color: #ffffff;
    color: #ffffff;
    box-shadow:0px 2px 2px #c8c8c8;

}
.container .header .logo{
    height:60px;
    font-size:22px;
    padding-left:20px;
    padding-right:20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: none;
    border-right-style: none;
}
.container .header .logo .txt{
    color: #ffffff;
}
.container .header .logo-width{
    width: 230px;
}
.container .header .logo-collapse-width{
    width:60px;
}
.container .header .tools{
    padding:0 23px;
    width:14px;
    height:60px;
    line-height: 60px;
    cursor: pointer;
}
.container .header .userinfo{
    /* margin-left: 10px; */
    margin-top: 10px;
    width: 40px;
    height: 40px;
    text-align: right;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 1px 2px 7px #c8c8c8;
    /* padding-right: 35px; */
}
    .container .header .userinfo .userinfo-inner{
        cursor: pointer;
        color:#ffffff;
    }
.container .header .userinfo .userinfo-inners img {
    /* margin: 20px 0px 20px 20px;
    float: right; */
}
.container .header .userinfo .userinfo-inner img{
    width:40px;
    height:40px;
    border-radius: 50%;
    /* margin:10px 0px 10px 10px; */
    border: 2xp solid #fff;
    float: right;
}
.main{
    display: flex;
    position: relative;
    top:-20px;
    bottom: 0px;
    overflow: hidden;
    width: 1230px;
    margin: 0 auto;
}
.main aside{
    /* flex: 0 0 230px; */
    margin-top: 40px;
    width:240px;
    background-color: #F7F7F7;
}
    .main aside .el-aside_el_menu{
        height:100%;
    }
.main aside .collapsed{
    width:60px;
}
.main aside .collapsed .item{
    position: relative;
}
.main aside .collapsed .submenu{
    position: absolute;
    top:0px;
    left:60px;
    z-index:99999;
    height:auto;
    display: none;
}
.lifi-main-page .menu-collapsed{
    flex: 0 0 60px !important;
    width:60px !important;
}
.lifi-main-page .menu-expanded{
    flex: 0 0 230px !important;
    width:230px !important;
    margin-left:350px !important;
}
.lifi-main-page   .content-container .breadcrumb-container .title{
    width:200px !important;
    float: left !important;
    color: #475669 !important;
}
.lifi-main-page  .content-container .breadcrumb-container .breadcrumb-inner{
    float: right !important;
} 
.lifi-main-page  .content-wrapper {
    background-color: #f7f7f7 !important;
    box-sizing: border-box !important;
}
/* .el-submenu__title i {
    display: none;
} */
.lifi-main-page .el-submenu__title i[data-v-23543608] {
display: inline-block;
}
.lifi-main-page .el-aside_el_menu {
    border-right:none !important;
    list-style: none !important;
    position: relative !important;
    margin: 0 !important;
    padding-left: 0 !important;
}   
.lifi-main-page .menu-top{
    text-align: center !important;
    height:36px !important;
    border:1px #07C160 solid !important;
    width: 192px !important;
    line-height: 36px;
    border-radius: 2px;
    background: #07C160;
    color: #fff;
    margin: 31px auto;
    
}

.lifi-main-page .el-submenu:hover{
    color: #07C160 !important;
}
.lifi-main-page  .submenu__title:hover {
    color: #07C160 !important;
    background-color: #f7f7f7 !important;
}
.lifi-main-page  .el-submenu__title:hover,.el-submenu__title:focus {
    background-color: #f7f7f6 !important;
        color: #07C160 !important;
}
.lifi-main-page .el-submenu.is-active {
    border-bottom-color: #07C160 !important;
    color: #07C160 !important;
}
.lifi-main-page .el-menu-item:focus, .el-menu-item:hover {
    outline: 0 !important;
    background-color: #fff !important;
    color: #07C160 !important;
}
.lifi-main-page .el-menu-item.is-active {
    border-left:2px solid #07C160;
    color: #07C160 !important;
}

.lifi-main-page .el-submenu__title.is-active{
    color: #07C160 !important;
}
.lifi-main-page .el-menu-item, .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
    color: #000 !important;
    /* padding-left: 35px; */
    /* margin-right: 20px; */
    background-color: #fff;
    margin-top: 10px;
}
.lifi-main-page  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding-left:24px !important;
    min-width: 150px;
    /* margin-left: -10px; */
}   

.addchal{
    padding: 15px;
    border: none;
    background-color: #07c160;
    color: #fff !important; 
    margin-left:-50px;
    margin-top: 17px
}
.addchal:hover,.addchal:focus{
    background-color: #07c160;
    color: #fff !important; 
    margin-left:-50px;

}
/* textarea{ 
    resize:none 
}  */
.el-textarea {
display: inline-block;
width: 100%;
vertical-align: bottom;
font-size: 14px;
}
.el-menu-vertical-demo .el-submenu__icon-arrow {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -7px;
    -webkit-transform: rotateZ(-90deg); 
	-ms-transform: rotate(-90deg);
	transform: rotateZ(-90deg);
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    font-size: 12px;
    color: #000;
    /* display: none; */
}
.el-menu-vertical-demo .el-submenu__icon-arrow:hover,.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow:active{
    color: #07C160;
}
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
	-webkit-transform: rotateZ(0deg); 
	-ms-transform: rotate(0deg);
	transform: rotateZ(0deg);
}

.el-menu {
    /* border-right:none; */
    /* box-shadow: 0px 2px 2px #c8c8c8; */
    list-style: none;
    position: relative;
    width: 240px;
    border-radius: 2px;
    padding-bottom: 15px;
    border:1px solid #f7f7f7;
    /* box-shadow: 1px 5px 5px #c8c8c8; */
    /* margin: 0; */
    /* padding-left: 0; */
}
.catelist .el-select .el-input.is-focus .el-input__inner {
    border-color: #cccccc !important;
}
.catelist .el-select .el-input__inner:focus {
    border-color: #cccccc !important;
}
.cateinput .el-input__inner{
    height: 30px !important;
    line-height: 30px !important;
    border: none !important;
    min-width: 100px;
    margin-left: -20px;
}
.el-dropdown {
    display: inline-block;
    position: relative;
    color: #606266;
    font-size: 14px;
    /* margin-left: 290px; */
}
.el-dropdown-menu__item--divided:before,.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: #000 !important;
}
.footer{
    height:80px;
    width:100%;
    background-color:#F7F7F7;
    margin-top:-40px;
    text-align:center;
    position: relative;
}
.footer .playbox{
    position: absolute;
    top:60px;
    height:60px;
    border-top:1px #cccccc solid;
    width: 100%;
    text-align: center;
    background: #fff;
}


.lifi-main-page{
    margin-top: 20px;
    overflow: hidden;
    width: 100%;
}
.lifi-header-cont{
    width: 1230px;
    margin: 0 auto;
}
.el-select .el-input .el-select__caret {
    margin-left: 0!important;
}
.el-icon-arrow-up::before{
    /* content:"\E603" */
}

.icon-shouye1:before,.icon-wumoxing:before,.icon-icon_fabu:before,.icon-icon_zhanghao:before,.icon-xiaoxi:before,.icon-icon_yingyongguanli:before,.icon-liujisuan:before,.el-icon-message:before{
    margin-right: 10px;
}
/* 2019.1.10  JLX*/
/* .item{
    position: absolute;
    top: 20px;
    margin-left: -20px;
} */

/* .item,.server,.msg,.money{
    position: absolute;
    top:15px;
    margin-left: -40px;
} */
.item img{
    position: absolute;
    margin-top:5px;
    margin-left: 280px; 
}
 .header .el-col .el-col-24{
    width: 180px !important;
}
.server img{
    position: absolute;
    float: left;
    margin-top:5px;
    margin-left: 250px;
    cursor: pointer;
}
.msg img{
    position: absolute;
    margin-top:5px;
    margin-left: 200px;
    cursor: pointer;
}
.money img{
    position: absolute;
    margin-top:5px;
    margin-left:150px ;
    cursor: pointer;
}
.el-input .el-input--suffix{
    margin-left: 60px;
    cursor: pointer;
}
.header .el-input{
    margin-left: -50px !important;
}
.el-badge__content.is-fixed.is-dot{
    right: 10px;
    margin-top: 24px;
    /* margin-right: -296px; */
}
.el-checkbox__input.is-checked .el-checkbox__inner{
    background: #fff;
    border-color: #fff
}
.el-checkbox__inner::after{
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 1px solid #07C160;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    -webkit-transition: -webkit-transform .15s ease-in .05s;
    transition: -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s, -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s;
    -webkit-transform-origin: center;
    transform-origin: center;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
    color: #fff
}
.el-menu-vertical-demo .aside_el_menu .el-menu{
    margin-left: 40px;
}

.el-menu-vertical-demo .aside_el_menu .el-menu{
    margin-left: 22%
}
/* ================================JLX==================================== */
.headLeft{
    /* background-color: #ccc; */
    margin: 0 auto;
}
  .el-row {
    margin-bottom: 20px;
  
  }
  .last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    /* background: #99a9bf; */
  }
  .bg-purple {
    /* background: #d3dce6; */
  }
  .bg-purple-light {
    /* background: #e5e9f2; */
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /* background-color: #f9fafc; */
  }
.logoBg,.select,.addBtn,.userEmail,.kefu,.usermsg{

    /* margin-left: 20px; */
    /* background: #d3dce6; */
    text-align: center;
    /* line-height: 60px; */
}
.logoBg i,.userEmail i,.kefu i,.usermsg i{
    font-size: 25px;
    color: #000;
    margin-left: 0xp !important;
    top: 0 !important;
    position: relative;
    line-height: 40px;
}
.logo img{
    line-height: 30px !important;
}
.el-menu-vertical-demo .aside_el_menu .el-menu{
    /* border-right: none; */
    background: #fff !important;
    margin-top: 30px;
    border-radius: 4px;
    padding-bottom: 15px;
}
.userEmail,.kefu,.usermsg{
    line-height: 75px;
}
.advertising{
    width: 240px;
    height: 140px;
    margin-top: 18px;
    border-radius: 2xp;
    background-color: #fff;
    padding-top: 20px;

}
.advertising .adverImg{
    height: 90px;
    width: 192px;
    border-radius: 2px;
    background-color: #ccc;
    margin: 0px auto;

}
.el-tooltip__popper.is-dark{
    background-color:  #07C160 !important;
    border-radius: 2px !important;
    height: 10px !important;
    line-height: 10px !important;
    color: #fff;
}
.el-dropdown-menu__item:hover{
    color: #07C160 !important;
    background-color: #f7f7f7 !important;
}
.logoBg{
    margin: 10px 0;
}
.usertouxiang{
    width: 60px;
    height: 60px;
}

.el-tooltip__popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color: #07C160;
}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow:after {
    border-bottom-color: #07C160;
}

.bgc-arrow{
    background-color: #07C160 !important;
}
.leftNav{
    width: 240px;
    height: 290px;
    border-radius: 2px;
    background-color: #fff;
    padding-top: 30px;
}
.titleNav{
    width: 192PX;
    height: 36PX;
    margin: 0 auto;
    text-align: center;
    line-height: 36px;
    border-radius: 2px;
    color: #fff;
    background-color: #07C160;
    font-weight: 400;
    margin-bottom: 30px;
    cursor: pointer;
}
.allNav{
    width: 100%;
    height: 40px;
    margin-top: 10px;
    line-height: 40px;
    cursor: pointer;
}
.allNav:hover,.allNav:active{
    width: 100%;
    height: 40px;
    background-color: #f7f7f7;
    color: #07C160;
    /* border-left: 4px solid #07c160; */
}
.mailModule{
    height: 20px;
    width: 100%;
    margin: auto 0;
    /* background-color: #ccc; */
    /* font-weight: 600 */
    /* line-height: 20px; */
}
.allNav i{
    margin-right: 20px;
    margin-left: 24px;
    font-weight: 600;
}
.leftSign{
    position: absolute;
    width: 4px;
    height: 20px;
    background-color: #07c160;
    margin-top: 10px;
}

.el-popper[x-placement^=bottom]{
    margin-top: 6px;
}
</style>


