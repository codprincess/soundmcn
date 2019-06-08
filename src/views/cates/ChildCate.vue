<template>
    <div class="childcate">
          <el-tabs v-model="childcate">
                <el-tab-pane label="已通过" name="first">
                    <template>
                        <div class="cate" v-for="(item,index) in categorys2" :key="index" v-if='item.status=="2"'>
                            <div class="cate-logo"><img src="../../assets/image/zfl_logo.png"/></div>
                            <div class="cate-title">{{item.name}}</div>
                            <div class="cate-bg"></div>
                            <div class="cate-pass">已通过</div>
                            <div class="cate-line"></div>
                            <div class="cate-warn">
                                <el-button :disabled="disabled" @click="CateDisable(item.id)"  type="text">禁用</el-button>
                            </div>
                        </div>

                        <div class="addcate" @click="addcate = true">
                           <i class="el-icon-plus"></i>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="审核中" name="second">
                    <template v-if="childcate === 'second'">
                        <div class="cate" v-for="(item,index) in categorys1" :key="index" v-if='item.status=="0"'>
                            <div class="cate-logoing"><img src="../../assets/image/zfl_logo.png"/></div>
                            <div class="cate-title">{{item.name}}</div>
                            <div class="cate-bging"></div>
                            <!-- <div class="cate-passing">{{item.status=="0"?"未审核":((item.status=="1")?"审核中":"未通过")}}</div> -->
                            <div class="cate-passing">{{item.status=="0"?"审核中":"未通过"}}</div>
                        </div>
                    </template>
                </el-tab-pane>
                 <el-tab-pane label="已禁用" name="third">
                    <template v-if="childcate === 'third'">
                        <div class="catedis" v-for="(item,index) in categorys3" :key="index" v-if='item.status=="3"'>
                            <div class="cate-logo-dis"><img src="../../assets/image/zfl_logo.png"/></div>
                            <div class="cate-title-dis">{{item.name}}</div>
                            <div class="cate-disable"  @click="CateRestore(item.id)">{{restoretxt}}</div>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
            <!--分类弹出框-->
             <div>
                 <el-dialog
                    title="添加子分类"
                    :visible.sync="addcate"
                    width="40%"
                    center
                    top="20%"
                    :close-on-click-modal="false">
                    <el-form class="addcateform">
                        <el-form-item label="添加子分类"> 
                            <el-input v-model="name" placeholder="请输入子分类" style="width:60%"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="addcate-btn" @click="Addcategory">确 认</el-button>
                        <el-button  class="addcate-back" @click="addcate = false">再想想</el-button>
                    </span>
                    </el-dialog>
             </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    inject:['reload'],
    data(){
        return{
            childcate:'first',
            disabled:false,
            status:'',
            addcate:false,
            name:'',
            categorys1:[],
            categorys2:[],
            categorys3:[],
            restoretxt:'解除禁用',
            cateId:localStorage.getItem('cateId'),

        }
    },
    created(){
        this.Getcategory();
        //console.log(this.cateId);
        this.getpasscategory();
        this.getdiscategory();
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
      //获取审核中子分类
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
        }

    }
}
</script>
<style>
.childcate{
    width:916px;
    min-height: 700px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 5px #eaeaea;
    padding:35px 35px 15px 35px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
}
.childcate .cate{
    float: left;
    text-align: center;
    width: 160px;
    height: 170px;
    background: -webkit-linear-gradient(top right,transparent 10% ,#F9F9F9 0);
    position: relative;
    margin:30px 15px 20px 15px;
    /* border:1px solid #eaeaea; */
}
.childcate .cate:after {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    background: -webkit-linear-gradient(top right,transparent 50% ,#cccccc 0);
    top: 0;
    right: 0;
    /* border: 1px solid #eaeaea; */
    border-bottom-left-radius:2px;
    border: bottom left 2px #cccccc;

}
.childcate .cate .cate-logo{
    padding-top: 20px;
}
.childcate .cate .cate-title{
    padding-top: 10px;
    padding-bottom: 10px;
}
.childcate .catedis .cate-logo-dis{
    padding-top: 20px;
    opacity: 0.4;
}
.childcate .catedis .cate-title-dis{
    padding-top: 10px;
    padding-bottom: 10px;
    color: #999999;
}
.childcate .cate .cate-bg{
    margin-left:40px;
    width: 80px;
    border: 1px solid #18C26A;
    height:15px;
}
.childcate .cate .cate-pass{
    background-color: #18C26A;
    width: 80px;
    height: 20px;
    line-height: 20px;
    color: #ffffff;
    margin-top:-12px;
    margin-left: 35px;
}
.childcate .cate .cate-line{
    width: 120px;
    margin-left: 20px;
    height: 10px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 10px;
}
.childcate .cate .cate-warn{

}
.childcate .cate .cate-logoing{
    padding-top: 20px;
    opacity: 0.3;
}
.childcate .cate .cate-bging{
    margin-left:40px;
    width: 80px;
    border: 1px solid #FF6E40;
    height:15px;
}
.childcate .cate .cate-passing{
    background-color: #FF6E40;
    width: 80px;
    height: 20px;
    line-height: 20px;
    color: #ffffff;
    margin-top:-12px;
    margin-left: 35px;
}
.childcate .catedis .cate-disable{
    background-color: #FF6E40;
    width: 90px;
    height: 30px;
    margin-left: 35px;
    line-height: 30px;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
}
.el-tabs__item:hover {
    color: #cccccc;
    cursor: pointer;
}
.childcate .el-button--text {
    color: #18C26A !important;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
}
.el-tabs__item.is-active {
    color: #515151 !important;
}
.childcate .catedis{
    float: left;
    text-align: center;
    width: 160px;
    height: 170px;
    background: -webkit-linear-gradient(top right,transparent 10% ,#cccccc 0);
    position: relative;
    margin:30px 15px 20px 15px;
}
.childcate .catedis:after {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    background: -webkit-linear-gradient(top right,transparent 50% ,#ffffff 0);
    top: 0;
    right: 0;
    /* border: 1px solid #eaeaea; */
    border-bottom-left-radius:2px;
    border: bottom left 2px #cccccc;
}
.childcate .cate-title-dis{
    
}

/*添加子分类*/
.childcate .addcate{
    float: left;
    text-align: center;
    width: 160px;
    height: 170px;
    background:#F9F9F9;
    position: relative;
    margin:30px 15px 20px 15px;
    /* border:1px solid #eaeaea; */
}
.childcate .addcate .el-icon-plus{
    font-size:80px !important;
    color: #18C26A !important;
    margin-top:40px !important;
}
.childcate .el-dialog--center .el-dialog__header {
    border-bottom: 1px #cccccc solid;
    margin-left: 20px;
    width: 90%;
    padding: 20px 0px 10px;
}
.childcate .addcateform{
    text-align: center;
    margin-top:20px;
}
.childcate .el-form-item__label {
    margin-left: 30px;
   
}
.childcate .el-input__inner {
    margin-left: -30px;
}
.childcate .addcate-btn{
    background: #18C26A;
    color: #ffffff;
    width:20%;
    border-color: #18C26A;
}
.childcate .addcate-btn:focus,.childcate .addcate-btn:hover,.childcate .addcate-btn:active{
    background: #18C26A;
    color: #ffffff;
    width:20%;
    border-color: #18C26A;
}
.childcate .addcate-back{
    background: #ffffff;
    color: #606266;
    width:20%;
    border-color: #dcdfe6;
}
.childcate .addcate-back:focus,.childcate .addcate-back:hover,.childcate .addcate-back:active{
    background: #ffffff;
    color: #606266;
    width:20%;
    border-color: #dcdfe6;
}

.childcate .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    /* background-color: #409EFF; */
    background: linear-gradient(90deg,#67db73,#4da3ae,#2852e1);
    z-index: 1;
    -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}
.childcate .el-tabs__item:hover {
    color: #515151 !important;
    cursor: pointer;
}
.el-tabs__item {
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

