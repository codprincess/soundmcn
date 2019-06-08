<template>
    <div class="msgbox2">
        <div class="redBadge" v-if="this.unread.length > 0"></div>
          <el-tabs v-model="message" @tab-click="handleClick">
                <el-tab-pane label="未读消息" name="first">
                    <div style="height:850px">
                        <el-row v-for="(item,index) in unread" :key="index" style="height:60px;line-height:60px ;border-bottom:1px solid #eaeaea">
                            <el-col :span="20">
                                <router-link tag="div" :to="'/msgdetail/' + item.id" style=" cursor: pointer;width:680px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"   class="grid-content bg-purple">
                                    <p style="display:inline;">{{item.title}}</p>
                                    </router-link>
                            </el-col>
                            <el-col :span="4"><div class="grid-content bg-purple-light" style="float:right;color:#7e7f80">{{item.create_time}}</div></el-col>  
                        </el-row>
                    </div>
                    <div class="noMsgData" v-if="this.total == 0">
                        <img src="../../assets/image/hint.png"><p>没有任何消息唷！</p>
                    </div>
                    <div class="paginationbox" v-if="this.total != 0">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            layout="total,prev, pager, next, jumper"
                            :total="total"
                            :page-size='13'>
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已读消息" name="second">
                    <template v-if="message === 'second'">
                        <div style="height:850px">
                            <el-row v-for="(item,index) in hasread" :key="index" style="height:60px;line-height:60px ;border-bottom:1px solid #eaeaea">
                                <el-col :span="20">
                                    <router-link tag="div" :to="'/msgdetail/' + item.id"   style="cursor: pointer;width:580px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" class="grid-content bg-purple">
                                        <p style="display:inline;"> {{item.title}}</p>
                                    </router-link>

                                </el-col>
                                <el-col :span='4'>
                                    <div class="grid-content bg-purple-light" style="float:right;color:#7e7f80">{{item.create_time}}</div>
                                </el-col>
                                <!-- <el-col :span="4"><div class="grid-content bg-purple" style="float:right"> <el-button style="padding:0px 0px;color:red" type="text" @click="handleDelete(index,item.id)">删除</el-button></div></el-col> -->
                            </el-row>
                        </div>
                        <div class="noMsgData" v-if="this.total2 == 0">
                            <img src="../../assets/image/hint.png"><p>没有任何消息哦！</p>
                        </div>
                         <div class="paginationbox" v-if="this.total2 != 0">
                            <el-pagination
                                @size-change="handleSizeChange2"
                                @current-change="handleCurrentChange2"
                                :current-page="page"
                                layout="total,prev, pager, next, jumper"
                                :total="total2"
                                :page-size='13'>
                            </el-pagination>
                        </div>
                    </template>
                   
                </el-tab-pane>
            </el-tabs>
            <!-- 删除提示框 -->
                <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center :close-on-click-modal="false">
                    <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="delVisible = false">取 消</el-button>
                        <el-button type="primary" @click="deleteRow()">确 定</el-button>
                    </span>
                </el-dialog> -->
    </div>
</template>
<script>
import axios from 'axios';
import { setTimeout } from 'timers';
export default {
    inject:['reload'],
    data(){
        return{
            delVisible:false,
            message: 'first',
            showHeader:false,
            hasread:[],
            unread:[],
            id:'',
            page:1,
            total:0,
            total2:0
        }
    },
     created(){
        this.getHasread();
        this.getunread();
        // this.getPullmsg();
    },
    methods:{
         handleClick(tab, event) {
            console.log(tab, event);
        },
        //获取已读消息
        getHasread(){
            axios({
                url:this.API+'/msg/msg/read',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    page:this.page,
                    list_rows:13
                }
            }).then(response=>{
                if(response.data.code = 200){
                    console.log('213123',response);
                    this.hasread = response.data.data.data;
                    this.id = response.data.data.data[0].id;
                    this.current_page = response.data.data.current_page;
                    this.last_page = response.data.data.last_page;
                    this.per_page = response.data.data.per_page;
                    this.total2 = response.data.data.total;
                }
                }).catch(err=>{
                    console.log(err); 
                })
        },
        //获取未读读消息
        getunread(){
            axios({
                url:this.API+'/msg/msg/unRead',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    page:this.page,
                    list_rows:13
                }
            }).then(response=>{
                if(response.data.code == 200){
                    this.current_page = response.data.data.current_page;
                    this.last_page = response.data.data.last_page;
                    this.per_page = response.data.data.per_page;
                    this.total = response.data.data.total;
                    this.unread = response.data.data.data;
                    this.id = response.data.data.data[0].id;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                    }
                }).catch(err=>{
                    console.log(err);
                })
        },

        //跳转到消息未读详情页
        goMsgdetail(id){
            console.log(id);
            this.$router.push({name:'msgdetail',params:{id:id}})
        },
        //跳到已读详情页
        goreadMsgdetail(id){
            console.log(id);
            this.$router.push({name:'readmsgdetail',params:{id:id}})
        },
        //删除
        handleDelete(index,id) {
            this.idx = index;
            this.delId = id;
            this.delVisible = true;
        },
        deleteRow(){
            axios({
                url:this.API+'/msg/msg/delMessage',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                   id:this.delId
                }
            }).then(response=>{
                if(response.data.code==200){
                    this.$message({
                        message:'删除成功',
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    this.delVisible = false
                    this.hasread.splice( this.idx, 1);
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
         //进行分页,list_rows改变时
        handleSizeChange(val){
            this.list_rows = val;
            this.getunread();
         },

        //page改变时
        handleCurrentChange(val) {
            this.page = val;
            this.getunread();
        },
          //进行分页,list_rows改变时
        handleSizeChange2(val){
            this.list_rows = val;
            this.getHasread();
         },

        //page改变时
        handleCurrentChange2(val) {
            this.page = val;
            this.getHasread();
        },
        // //分页
        // pagesListMsg(){
        //     if(this.message === 'second'){
        //         this. getHasread();
        //     }
        //     if(this.message === 'first'){
        //         // this.getunread();
                
        //     }
        // }

    }
}
</script>
<style>
/* 2019.1.27 */
.redBadge{
    width: 7px;
    height: 7px;
    background-color: #F56C6C;
    border-radius: 50%;
    position: absolute;
    margin-left: 91px;
    margin-top: 14px;
}
.msgbox2 .el-tabs__header .is-top{
    height: 53px;
    line-height: 53px;
}
.msgbox2 .el-row{
    margin-bottom: 0 !important;
}
.msgbox2 .el-tabs__nav {
    white-space: nowrap;
    position: relative;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    float: left;
    z-index: 2;
    margin-left: 37px;
}
.msgbox2 .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e7ed;
    z-index: 1;
}
.msgbox2 .noMsgData{
    width: 904px;
    height: 886px;
    /* background-color: #000; */
    /* position: absolute; */
    /* z-index: 22; */
    margin-top: -634px;
    margin-left: -42px;
    text-align: center;
    /* line-height: 886px; */
}
.msgbox2 .noMsgData img{
    /* position: absolute; */
    /* margin: 50% 50%; */
    margin-top:150px;
}
/*  */
.msgbox2{
    width:904px;
    height:920px;
    margin:40px;
    -webkit-border-radius:2px;
    border-radius: 2px !important;
    /* box-shadow: 0 0 5px #eaeaea; */
    /* padding:35px 35px 15px 35px; */
    background: #ffffff;
    /* border:1px solid #eaeaea; */
    border: 1px solid #f7f7f7;
    background-clip:padding-box;
    position: relative;
}
.msgbox2 .el-tabs__item.is-active {
    color: #303133;
    /* margin-left: 40px; */
    font-weight: 600;
}
.msgbox2 .el-tabs__item:hover {
    color: #303133;
    cursor: pointer;
    /* margin-left: 40px; */
}
.msgbox2 .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px !important;
    /* background:  linear-gradient(to right, #67DB73,#4DA3AE, #2852E1); */
    background: #07c160;
    /* margin-left: 40px; */
}
.msgbox2 .el-tabs__content {
    overflow: hidden;
    /* position: relative; */
    padding: 0 40px;
}
.msgbox2 .paginationbox{
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10px;
    margin-left: -40px;
    /* padding: 200px 35px 0px 35px; */
}
/* .msgbox2 .paginationbox .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #18C26A;
    color: #fff;
}
.msgbox2 .paginationbox .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #18C26A;
} */
.msgbox2 .pagbtn:focus,.msgbox2 .pagbtn:hover{
    background: #ffffff;
    color: #606266;
    border: 1px solid #dcdfe6;
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
</style>

