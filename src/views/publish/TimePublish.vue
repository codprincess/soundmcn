<template>
    <div class="timepublishbox">
        <section>
             <!--工具条-->
            <el-col :span="24" style="padding-bottom:0px;">
                <el-form :inline="true">
                    <el-form-item label="时间" style="width:350px">
                        <el-date-picker  type="date" v-model="search_time" placeholder="选择时间" style="width:300px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="关键字" style="margin-left:-50px;">
                        <el-input v-model="keywords" style="width:400px" placeholder="请输入关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="gettimePush()" style="margin-left:-100px;" class="searchbtn">搜索</el-button>
                        <!-- <el-button type="danger"  style="height: 30px;padding: 7px 20px;"  @click='onSelectionChange'>全选</el-button> -->
                        <el-button type="danger"  :disabled="batch_flag"  style="height: 30px;padding: 7px 20px;" @click="handleDelete()" >删除</el-button>
                    </el-form-item>
                     <!-- <el-form-item>
                        <el-button type="danger"  style="margin-left:350px;height: 30px;padding: 7px 20px;">全选</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger"  :disabled="batch_flag"  style="margin-left:135px; height: 30px;padding: 7px 20px;" @click="onDeletePayList()" >删除</el-button>
                    </el-form-item> -->
                </el-form>

            </el-col>
            <!--列表-->
            <div class="table_container">
                <el-table @sort-change='sortChange' :data="timePushList" style="width:100%" align='left'  @selection-change='onSelectionChange'>
                     <el-table-column width="80px" align="left">
                         <template slot-scope="scope">
                            <el-tag >{{ scope.row.cname}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="title" width="400" label="标题" align="center">
                        
                    </el-table-column>
                    <el-table-column property="openicon" width="50px">
                        <template slot-scope="scope">
                            <!--音频播放-->
                            <div class="playbox"><div @click="startPlayOrPause(scope.row.id)" style="cursor: pointer;">{{audio.playing | transPlayPause}}</div></div>
                        </template>
                    </el-table-column>
                    <el-table-column property="create_time" width="200" label="定时发布时间" sortable='custom' align="center"></el-table-column>
                    <el-table-column
                        type="selection"
                        align='center'
                        label="全选"
                        width="180px">
                    </el-table-column>
                     <el-table-column
                        v-if="idFlag"
                        prop="id"
                        label="id"
                        align='center'
                        >
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
                </div>
            </div>
            <!--删除提示-->
            <el-dialog width="412px" title="删除提示"  :visible.sync="delDialogVisible" center>
                
                 <div class="sheltag"><p>确认删除该条定时发布内容吗？</p></div>
                 <div class="shelbtn">
                      <el-button style="width:30%" class="confirmbtn" @click="onDeletePayList()">确认</el-button>
                      <el-button style="width:30%"  @click="delDialogVisible=false">再想想</el-button>
                 </div>
            </el-dialog>

             <audio ref="audio" class="dn" 
                :src="audioSrc" :preload="audio.preload"
                @play="onPlay" 
                @waiting="onWaiting"
                @pause="onPause" 
                @timeupdate="onTimeupdate" 
                @loadedmetadata="onLoadedmetadata">
            </audio>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    inject:['reload'],
    data(){
        return{
            delDialogVisible:false,
            checked:[],
            sort_way:'',
            search_time:'',
            keywords:'',
            timePushList:[{}],
            idFlag:false,
            content_ids:[],
            batch_flag:true,//符合批量删除
            cateId:localStorage.getItem('cateId'),
            audioSrc:'',
             audio: {
                currentTime: 0,
                maxTime: 0,
                playing: false,
                muted: false,
                speed: 1,
                waiting: true,
                preload: 'auto'
            },
            controlList: {
                onlyOnePlaying: true,
                
            },
            page:1,
            total:0,
            list_rows:'',
            current_page:'',
            last_page:'',
            per_page:''

        }
    },
    // created(){
    //     this.gettimePush();
    // },
    mounted(){
        this.gettimePush();
    },
    methods:{
        //获取定时发布列表
        gettimePush(){
            axios({
                url:this.API+'/content/content/timePush',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    page:this.page,
                    list_rows:10,
                    section_id:this.cateId,
                    keywords:this.keywords,
                    search_time:this.search_time,
                    sort_way:this.sort_way
                }
            }).then(response=>{
               //console.log('1111',response);
                if(response.data.code==200){
                    this.timePushList = response.data.data.data;
                    this.current_page = response.data.data.current_page;
                    this.last_page = response.data.data.last_page;
                    this.per_page = response.data.data.per_page;
                    this.total = response.data.data.total;
                }
            })
        },

         //进行分页,list_rows改变时
        handleSizeChange(val){
            this.list_rows = val;
            this.gettimePush();
         },

        //page改变时
        handleCurrentChange(val) {
            this.page = val;
            this.gettimePush();
        },


        //定时发布搜索
        timePushSearch(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/content/content/timePushSearch',
                method:'post',
                data:{
                    search_time:this.search_time,
                    keywords:this.keywords
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.timePushList = response.data.data;
                }
            })
        },
         //触发ceckbox事件
        onSelectionChange(val){
            if(val.length){
                this.batch_flag = false;
                const ids = [];
                for(var i=0;i<val.length;i++){
                    ids.push(val[i].id)
                }
                this.content_ids = ids;
                console.log(this.content_ids);
            }else{
                this.batch_flag = true;
                this.content_ids = '';
            }
        },
        handleDelete(index,id) {
            this.idx = index;
            // this.delId = id;
            //this.content_ids = ids
            this.delDialogVisible = true;
        },

        //删除
        onDeletePayList(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/content/content/del',
                method:'post',
                data:{
                    content_ids:this.content_ids,
                    del_type:1
                }
                
            }).then(response=>{
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                     //this.timePushList.splice( this.idx, 1);
                     this.reload();
                     this.delDialogVisible = false;
                }
            })
        },
         //排序
        sortChange: function(column, prop, order) {
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
                url:this.API+'/content/content/timePush',
                data:{
                    // sort_type:1,
                    // sort_way:this.sort_way,
                    // sort_condition:2
                    page:this.page,
                    list_rows:10,
                    section_id:this.cateId,
                    keywords:this.keywords,
                    search_time:this.search_time,
                    sort_way:this.sort_way
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                   this.timePushList = response.data.data.data;
                }
            })
        },
        startPlayOrPause(id) {
            this.id  = id;
            this.audioSrc = ''; 
            let obj = {}; 
            obj = this.timePushList.find((item)=>{ 
                return item.id === id;
            }); 
            // this.id = obj.id;
            if(this.id = obj.id){
                this.audioSrc = obj.path;
                return this.audio.playing ? this.pausePlay() : this.startPlay();
                console.log( this.audioSrc);    
            }
        },
         // 开始播放
        startPlay() {
            this.$refs.audio.play()
        },
        // 暂停
        pausePlay() {
            this.$refs.audio.pause()
        },
        // 当音频暂停
        onPause () {
            this.audio.playing = false
        },
        // 当音频开始等待
        onWaiting (res) {
            console.log(res)
        },
        // 当音频开始播放
        onPlay (res) {
            // console.log(res)
            // console.log(id);
            this.audio.playing = true
            this.audio.loading = false

            if(!this.controlList.onlyOnePlaying){
            return 
            }

            let target = res.target

            let audios = document.getElementsByTagName('audio');

            [...audios].forEach((item) => {
            if(item !== target){
                item.pause()
            }
            })
        },

      onTimeupdate(res) {
        // console.log('timeupdate')
        // console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      onLoadedmetadata(res) {
        //console.log('loadedmetadata')
       // console.log(res)
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      }


    },
    filters: {
    //   formatSecond(second = 0) {
    //     return realFormatSecond(second)
    //   },
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
    //   transMutedOrNot(value) {
    //     return value ? '放音' : '静音'
    //   },
    //   transSpeed(value) {
    //     return '快进: x' + value
    //   }
    },

}
</script>
<style>
.timepublishbox{
    width:910px;
    min-height:800px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 5px #eaeaea;
    padding:35px 35px 15px 35px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
     
}
.timepublishbox .sheltag{
    text-align: center;
}
.timepublishbox .shelbtn{
    margin-top:40px;
    text-align: center
}
.timepublishbox .line{
    padding:5px 10px 0px 10px;
}
.timepublishbox .el-input__inner{
    width:40%;
}
.timepublishbox .el-input__suffix {
    left: -70px;
    -webkit-transition: all .3s;
    transition: all .3s;
}
.timepublishbox .el-form--inline .el-form-item {
    display: inline-block;
    margin-right: -120px;
    vertical-align: top;
}
.timepublishbox .select_box{
    min-width: 110px;
}
.timepublishbox .el-tag {
    background-color:#ffffff;
    padding-left: 2px;
    padding-right: 2px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #7BD7A4;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #7BD7A4;
    width: 55px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
}
.timepublishbox .el-dialog__header{
    border-bottom: 1px #cccccc solid;
    margin-left: 30px;
    width: 90%;
    padding:20px 0px 10px;
}
.timepublishbox .el-dialog .el-table td, .el-table th.is-leaf {
    border-bottom:none;
}
.timepublishbox .el-checkbox__inner:hover {
    border-color: #FE6C3F;
}
.timepublishbox .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #FE6C3F;
    border-color: #FE6C3F;
}
.timepublishbox .el-checkbox__input.is-focus .el-checkbox__inner{
     border-color: #FE6C3F;
}

.timepublishbox .el-checkbox__inner {
    border-radius: 20px;
    border: 1px solid #FE6C3F;
    border-radius: 2px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    z-index: 1;
}
.timepublishbox .el-checkbox__inner::after {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 10px;
    left: 6px;
    position: absolute;
    top: 2px;
    width: 5px;
    transform-origin: center;
}
.timepublishbox .editbtn{
    color: #000;
}
.timepublishbox .delbtn{
    color: #FE6C3F;
}
.timepublishbox .searchbtn {
   margin-left: -100px;
   height: 30px;
   padding: 7px 20px;
   background: #18C26A;
   border: #18C26A;
   color: #ffffff;
}
.timepublishbox .playbox i{
    color: #18C26A;
    font-size: 24px;
}
.timepublishbox .el-table th.is-center {
    text-align: center;
}
.timepublishbox .el-table td.el-table_1_column_2.is-center {
    text-align: left;
}
.timepublishbox .el-table th{
    background-color: #f5f5f5;
}
.timepublishbox .el-input__inner{
    width:40%;
    height: 30px;
    line-height: 30px;
}
.timepublishbox .confirmbtn{
    background: #18C26A;
    border:1px #18C26A solid;
    color: #ffffff;
}

.timepublishbox .paginationbox{
    width: 70%;
    text-align: center;
    position: absolute;
    bottom: 40px;
}
.timepublishbox .pagbtn:focus,.msgbox2 .pagbtn:hover{
    background: #ffffff;
    color: #606266;
    border: 1px solid #dcdfe6;
}
.timepublishbox .paginationbox .el-pagination .el-input{
    width: 100%;
}
</style>


