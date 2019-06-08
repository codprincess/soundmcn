<template>
<div style="width:100%;">
    <div class="haspublishbox">
        <section>
            <!--工具条-->
            <el-col :span="24" style="padding-bottom:0px;">
                <el-form :inline="true">
                    <el-form-item label="异常状态">
                        <el-select @change="getStatus(value2)" placeholder="全部" v-model="value2" style="width:105px">
                                <el-option 
                                 v-for="item in options"
                                    :key="item.value2"
                                    :label="item.label"
                                    :value="item.value2">
                               </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="子分类">
                        <el-select @change="getchildCate(value)" placeholder="全部"  v-model="value" style="width:105px">
                                <el-option 
                                 v-for="item in childcateList" 
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                               </el-option>
                                
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker style="width:150px"  type="date" v-model="date" placeholder="选择时间" ></el-date-picker>
                        <i class="el-input__icon"></i>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input style="width:150px" v-model="keywords" placeholder="请输入关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="pushSearch()" style="margin-left:20px;" class="searchbtn">搜索</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
            <!--列表-->
            <div class="table_container">
                <el-table 
                 @sort-change='sortChange' 
                 :data="pushList"
                row-key="id"
                :expand-row-keys="expands"
                 @row-click="rowClick"
                  style="width:100%" align='left'>
                    <el-table-column width="80px" align="left">
                         <template slot-scope="scope">
                            <el-tag >{{ scope.row.cname}}</el-tag>
                        </template>                
                    </el-table-column>
                    <el-table-column property="title" width="250px" label="标题" align="center"></el-table-column>
                    <el-table-column property="openicon" width="50">
                        <template slot-scope="scope">
                            <!--音频播放-->
                            <div class="playbox"><div @click.stop="startPlayOrPause(scope.row.id)" style="cursor: pointer;">{{isplaying?'暂停':'播放'}} {{isplaying}}</div></div>
                        </template>
                    </el-table-column> 
                    <el-table-column property="channel" label="发布渠道"  sortable='custom' align="center">
                        <template slot-scope="scope">
                            <div @mouseenter="changeSource(scope.row.id)">
                                <el-dropdown>
                                    <span class="el-dropdown-link">{{ scope.row.source_total }}</span>
                                    <el-dropdown-menu slot="dropdown" >
                                        <div class="chbox" style=" width: 324px;height: 80px;">
                                            <div v-for="(item,index) in sourceLists" :key='index' class="chimg" style="float:left; margin-left: 20px;margin-top: 10px;width: 57px;height: 57px;box-shadow:0px 4px 4px #c8c8c8 ;border-radius: 12px;">
                                                <img style="width:60px;height:60px;" :src="item.cover"/>
                                            </div>
                                        </div>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="" width="" label="总收听量"  sortable align="center"></el-table-column> -->
                    <el-table-column property="create_time" width="150px" label="发布时间"  sortable='custom' align="center"></el-table-column>
                    <el-table-column property="content_status" width="" label="状态" align="right">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="scope.row.content_status=='0'" @click="changeSource()">审核中</el-button>
                            <el-button type="text" v-if="scope.row.content_status=='1'">正常</el-button>
                            <el-button   slot="append"  style="color:#FF6E40" type="text" v-if="scope.row.content_status=='2'">异常</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand" style="expand-box">
                        <template>
                            <el-table :data="sourceLists" class="errordialog" style="background:#ffffff">
                                <el-table-column property="channel" label="渠道名称" width="" align="center"  style="background:#ffffff">
                                    <template slot-scope="scope">
                                        <img style="width:60px;height:60px;" :src="scope.row.cover" :alt="scope.row.name"/>
                                    </template>
                                </el-table-column>
                                <el-table-column property="status" label="状态" width="" align="center"  style="background:#ffffff">
                                    <template slot-scope="scope">
                                    <el-button type="text" v-if="scope.row.status=='0'">审核中</el-button>
                                    <el-button type="text" v-if="scope.row.status=='1'">已发布</el-button>
                                    <el-button type="text" v-if="scope.row.status=='2'">失败</el-button>
                                    <el-button type="text" v-if="scope.row.status=='3'">异常</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column property="reason" label="异常原因" align="center"  style="background:#ffffff">
                                    <template slot-scope="scope">
                                        <el-button type="text" v-if="scope.row.remark==''">无</el-button>
                                        <el-button type="text">{{scope.row.remark}}</el-button>
                                    </template>
                                </el-table-column>
                        </el-table>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="paginationbox">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        layout="total,prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                    <div>
                         <audio ref="audio" class="dn" 
                            :src="audioSrc" :preload="audio.preload"
                            @play="onPlay" 
                            @pause="onPause" 
                           >
                        </audio>
                    </div>
                </div>
                
                
            </div>
            <!--异常弹框-->
            <el-dialog width="730px"  title="发行异常" :visible.sync="errorDialog" center :close-on-click-modal="false">
                <el-table :data="sourceLists" class="errordialog">
                    <el-table-column property="channel" label="异常渠道" width="" align="center">
                        <template slot-scope="scope">
                             <img style="width:60px;height:60px;" :src="scope.row.cover" :alt="scope.row.name"/>
                        </template>
                    </el-table-column>
                    <el-table-column property="status" label="状态" width="" align="center">
                        <template slot-scope="scope">
                           <el-button type="text" v-if="scope.row.status=='0'">审核中</el-button>
                           <el-button type="text" v-if="scope.row.status=='1'">已发布</el-button>
                           <el-button type="text" v-if="scope.row.status=='2'">失败</el-button>
                           <el-button type="text" v-if="scope.row.status=='3'">异常</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column property="reason" label="原因" align="center">
                        <template slot-scope="scope">
                            <el-button type="text">{{scope.row.remark}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
           
        </section>
       
    </div>
</div>
</template>
<script>
import axios from 'axios'
import AudioPlay from '@/components/AudioPlay'
export default {
    data(){
        return{
             expands: [],
            errorDialog:false,
             options:[{
                value2:'',
                label:'全部'
            },{
                value2:'1',
                label:'正常'
            },{
                value2:'3',
                label:'异常'
            },{
                value2:'2',
                label:'审核中'
            }
            ],
            addValue:{name: "全部",id:'',remark:'',status:''},
            value:'',
            value2:'',
            pushList:[],
            sourceLists:[],
            childcateList:[],
            child_cat_id:'',
            status:'',
            keywords:'',
            date:'',
            cateId:localStorage.getItem('cateId'),
            audioSrc:'',
            isplaying:false,
            page:1,
            total:0,
            current_page:'',
            last_page:'',
            per_page:'',
            audio: {//播放器开始
                currentTime: 0,
                maxTime: 0,
                muted: false,
                speed: 1,
                waiting: true,
                preload: 'auto'
            },
            controlList: {
                // 不显示下载
                noDownload: false,
                // 不显示静音
                noMuted: false,
                // 不显示音量条
                noVolume: false,
                // 不显示进度条
                noProcess: false,
                // 只能播放一个
                onlyOnePlaying: false,
                // 不要快进按钮
                noSpeed: false
            }

        }
    },
    created(){
        this.getqueryUser();
        this.rowClick();
        //this.getPush();
    },
    mounted(){
       this.getPush();
    },
    components:{
      // AddChannel,
        AudioPlay
    },
    methods:{
        //获取已发布列表
        getPush(){
            axios({
                url:this.API+'/content/content/push',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    page:this.page,
                    list_rows:10,
                    section_id:this.cateId,
                    status:'',
                    child_cat_id:this.child_cat_id,
                    search_time:this.date,
                    keywords:this.keywords,
                    sort_type:'',
                    sort_way:''
                }
            }).then(response=>{
                console.log('获取已发布列表',response);
                if(response.data.code==200){
                    this.pushList = response.data.data.data;
                    this.current_page = response.data.data.current_page;
                    this.last_page = response.data.data.last_page;
                    this.per_page = response.data.data.per_page;
                    this.total = response.data.data.total;                                       
                    this.id = response.data.data.data[0].id;
                    for(var i = 0; i < this.pushList.length;i++){
                        this.pushList[i].isplaying = false;
                    }
                    
                }
            })
        },
        //进行分页,list_rows改变时
        handleSizeChange(val){
            this.list_rows = val;
            this.getPush();
         },

        //page改变时
        handleCurrentChange(val) {
            this.page = val;
            this.getPush();
        },

        //鼠标移上去之后触发
        changeSource(id){
            let obj = {};
            obj = this.pushList.find((item)=>{
                return item.id === id;
            });
            this.id = obj.id;
            for(var i = 0;i < this.pushList.length; i++){
                if(this.pushList[i].id == this.id){
                    this.sourceLists = this.pushList[i].source_data;
                  //  console.log(this.sourceLists);
                }
            }
        },

        //内容异常显示
        errorSource(id){
            let obj = {};
            obj = this.pushList.find((item)=>{
                return item.id === id;
            });
            this.id = obj.id;
            console.log(this.id)
            this.errorDialog = true;
            for(var i = 0;i < this.pushList.length; i++){
                if(this.pushList[i].id == this.id){
                    this.sourceLists = this.pushList[i].source_data;
                    console.log(this.sourceLists);
                }
            }
        },
        //展开的数据请求
        rowClick(row, event, column) {
                this.id = row.id;
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
                if (this.expands.indexOf(row.id) < 0) {
                    this.expands= [];
                    this.expands.push(row.id);
                    for(var i = 0;i < this.pushList.length; i++){
                        if(this.pushList[i].id == this.id){
                            this.sourceLists = this.pushList[i].source_data;
                        }
                    }
                } else {
                    this.expands.remove(row.id);
                }
 
        },

        //点击获取渠道图片
        getSourceImg(row){
            this.cover = row.cover
            console.log(this.cover);
        },

        //点击异常查看原因
        chackError(index,id){
           // console.log(id);
            let obj = {}; 
            obj = this.pushList.find((item)=>{
                return item.id === id;
            }); 
            console.log(obj);
            this.id = obj.id;
            this.srcpic = obj.source_data.cover;
            this.errorDialog = true
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
                    this.childcateList.unshift(this.addValue);
                }
            }).catch(err=>{
                console.log(err);
            })
        },

        //获取异常或者正常
        getStatus(value2){
            this.status = value2;
           // console.log(this.status);
        },
        //获取选择分类的id
        getchildCate(value){
            this.child_cat_id = value;
        },
        //已发行搜索
        pushSearch(){
            axios({
                url:this.API+'/content/content/push',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    page:1,
                    list_rows:10,
                    section_id:this.cateId,
                    status:this.status,
                    child_cat_id:this.child_cat_id,
                    search_time:this.date,
                    keywords:this.keywords,
                    sort_type:'',
                    sort_way:''
                }
            }).then(response=>{
               // console.log('获取已发布列表',response);
                if(response.data.code==200){
                    this.pushList = response.data.data.data;
                    this.sourceList = response.data.data.data[0].source_data;
                    //this.audioSrc = response.data.data.data[0].path;
                   // console.log(this.audioSrc)

                }
            })
        },

        //已发布排序
        sortChange: function(column, prop, order) {
            console.log(column)
            console.log(column.prop)
            console.log(column.order)
            if(column.prop==='channel'){//渠道数
                if(column.order==='descending'){
                    this.sort_way = 1;
                    console.log(this.sort_way)
                }else{
                    this.sort_way = 2;
                    console.log(this.sort_way);
                }
                axios({
                    headers:{
                        'auth-key': localStorage.getItem('token')
                    },
                    method:'post',
                    url:this.API+'/content/content/push',
                    data:{
                        page:1,
                        list_rows:10,
                        section_id:this.cateId,
                        status:this.status,
                        child_cat_id:this.child_cat_id,
                        search_time:this.date,
                        keywords:this.keywords,
                        sort_type:1,
                        sort_way:this.sort_way,//排序方式
                        // sort_condition:1
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.pushList = response.data.data.data;
                        this.sourceList = response.data.data.data[0].source_data;
                    }
                })
            }else{
                if(column.order==='descending'){
                    this.sort_way = 1;
                }else{ 
                    this.sort_way = 2;
                    console.log(this.sort_way);
                }
                axios({
                    headers:{
                        'auth-key': localStorage.getItem('token')
                    },
                    method:'post',
                    url:this.API+'/content/content/push',
                    data:{
                        page:1,
                        list_rows:10,
                        section_id:this.cateId,
                        status:this.status,
                        child_cat_id:this.child_cat_id,
                        search_time:this.date,
                        keywords:this.keywords,
                        sort_type:2,
                        sort_way:this.sort_way,
                        // sort_condition:2
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.pushList = response.data.data.data;
                        this.sourceList = response.data.data.data[0].source_data;
                    }
                })
            }
            
        },
        //播放开始
        startPlayOrPause(id) {
            this.id  = id;
            this.audioSrc = ''; 
            let obj = {}; 
            obj = this.pushList.find((item)=>{ 
                return item.id === id;
            });
            this.audioSrc = obj.path; 
            if(this.id = obj.id){
                return this.isplaying ? this.pausePlay() : this.startPlay()
             }
           
        },
         // 开始播放
        startPlay() {
            this.$refs.audio.play() ;
            console.log('你的播放开启了');

        },
        // 暂停
        pausePlay(){
            this.$refs.audio.pause();
            console.log('停止播放')
        },
        // 当音频暂停
        onPause () {
            this.isplaying = false;
            console.log('停止播放1213212')
        },
         // 当音频开始播放
        onPlay (res) {
           this.isplaying = true;
           console.log('放不放')
        },
    },
    filters: {
        // transPlayPause(value) {
        //     return value ? '暂停' : '播放'
        // },
    },
}
</script>
<style>  
.haspublishbox .el-form--inline .el-form-item{
    display: inline-block;
    margin-right: 0px;
    vertical-align: top;
    margin-left: 10px;
}                         
.haspublishbox .el-input__icon:after {
    content: '';
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle;
    position: relative;
}
.haspublishbox{
    width:896px;
    min-height:900px;
    margin:40px;
    -webkit-border-radius:2px;
    border-radius: 2px;
    /* box-shadow: 0 0 5px #eaeaea; */
    padding:35px 4px 40px 4px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
}

.expanded .has-gutter .el-table th{
    background-color: #ffffff;
}
 .haspublishbox .demo-table-expand {
    font-size: 0;
  }
 .haspublishbox .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
 .haspublishbox .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
.haspublishbox .el-table th{
    background-color: #ffffff !important;
}
.haspublishbox .el-tag {
    background-color:#ffffff;
    padding-left: 2px;
    padding-right: 2px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #18C26A;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #18C26A;
    width: 55px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
}
.haspublishbox .searchbtn {
   margin-left: -100px;
   height: 30px;
   padding: 7px 20px;
   background: #18C26A;
   border: #18C26A;
   color: #ffffff;
}
.haspublishbox .searchbtn:hover,.searchbtn:focus{
    margin-left: -100px;
   height: 30px;
   padding: 7px 20px;
   background: #18C26A;
   border: #18C26A;
   color: #ffffff;
}
.haspublishbox .el-dialog__header{
    border-bottom: 1px #cccccc solid;
    margin-left: 30px;
    width: 92%;
    padding:20px 0px 10px;
}
.haspublishbox .el-dialog .el-table td, .el-table th.is-leaf {
    border-bottom:none !important;
}
.haspublishbox .el-table th.is-center {
    text-align: center !important;
}
.haspublishbox .el-table td.el-table_1_column_2.is-center {
    text-align: left !important;
}
.haspublishbox .playbox i{
    color: #18C26A;
    font-size: 24px;
}
/*显示框*/
.haspublishbox .chbox {
    width: 324px;
    height: 80px;
}
.haspublishbox .chbox .chimg{
    list-style: none !important;
    float: left !important;
    margin-left: 20px;
    margin-top: 10px;
    border: 1px #cccccc solid;
    width: 57px;
    height: 57px;
   -webkit-box-shadow:0px 4px 4px #c8c8c8 ;
    -moz-box-shadow:0px 4px 4px #c8c8c8 ;
    box-shadow:0px 4px 4px #c8c8c8 ;
    border-radius: 12px;
}
.haspublishbox .isnormal{
    color: #000;
}
.haspublishbox .isnormal:hover, .isnormal:focus{
    color: #000;
}
.haspublishbox .iserror{
    color: #FE6C3F;
}
.haspublishbox .iserror:hover, .iserror:focus{
     color: #FE6C3F;
}
.haspublishbox .el-table .descending .sort-caret.descending {
    border-top-color: #2F5CED;
}
.haspublishbox .el-dialog__body .el-button--text {
    color: #FF6E40;
}
.haspublishbox .el-dialog__body .el-button--text:focus, .el-button--text:hover {
    color: #FF6E40;
}
.haspublishbox .el-select .el-input .el-select__caret {
    color: #c0c4cc;
    font-size: 14px;
    transition: transform .3s;
    transform: rotate(180deg);
    cursor: pointer;
    margin-left: 130px !important;
}
.haspublishbox .paginationbox{
    width: 70%;
    text-align: center;
    position: absolute;
    bottom: 40px;
}
.haspublishbox .pagbtn:focus,.msgbox2 .pagbtn:hover{
    background: #ffffff;
    color: #606266;
    border: 1px solid #dcdfe6;
}
</style>


