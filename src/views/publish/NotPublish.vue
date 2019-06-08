<template>
    <div class="notpublishbox">
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
                        <el-button @click="getunPush()" style="margin-left:-100px;" class="searchbtn">搜索</el-button>
                        <!-- <el-button type="danger"  style="height: 30px;padding: 7px 20px;"  @click='onSelectionChange'>全选</el-button> -->
                        <el-button type="danger"  :disabled="batch_flag"  style="height: 30px;padding: 7px 20px;" @click="handleDelete()" >删除</el-button>
                    </el-form-item>
                    <!-- <el-form-item style="width:100px;float:right">
                        <el-button type="danger"  style="margin-left:350px;height: 30px;padding: 7px 20px;"  @click='onSelectionChange'>全选</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger"  :disabled="batch_flag"  style="margin-left:135px; height: 30px;padding: 7px 20px;" @click="onDeletePayList()" >删除</el-button>
                    </el-form-item> -->
                </el-form>

            </el-col>
            <!--列表-->
            <div class="table_container">
                <el-table @sort-change='sortChange' :data="unpushList" style="width:100%" align='left'  @selection-change='onSelectionChange'>
                     <el-table-column width="80px" align="left">
                         <template slot-scope="scope">
                            <el-tag >{{ scope.row.cname}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="title" width="300" label="标题" align="center">
                        
                    </el-table-column>                                                                           
                    <el-table-column property="create_time" width="150" label="最后编辑时间" sortable='custom' align="center"></el-table-column>
                    <el-table-column property="status" width="" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button class="editbtn" type="text" @click="getContentId(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="selection"
                        align='center'
                        width="80"
                        label="全选">
                    </el-table-column>
                     <el-table-column
                        v-if="idFlag"
                        prop="id"
                        label="id"
                        align='center'
                        width="220">
                    </el-table-column>
                    <!-- <el-table-column align="center" label="删除"  width="70px">
                        <template slot-scope="scope">
                            <el-checkbox-group v-model="checked">
                                <el-checkbox :value="scope.row.id" style="border-radius:50%"></el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column align="center" label="操作" width="">
                        <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>                   
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>                   
                        </template>                   
                    </el-table-column> -->

                </el-table>
                 <div class="paginationbox">
                    <!-- <div>
                        <span style="color:#cccccc">到第</span>
                        <input style="width:4%;padding:8px 0px;border-radius:4px;text-align:center;display: inline-block;outline:0;border: 1px solid #dcdfe6;" placeholder="1" v-model="page">
                        <span style="color:#cccccc">页</span>
                        <el-button @click="getunPush()" class="pagbtn" style="width:5%;padding: 8px 1px;">确定</el-button>
                    </div> -->
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
                 <div class="sheltag"><p>确认删除该条未发布内容吗？</p></div>
                 <div class="shelbtn">
                      <el-button style="width:40%"  icon="##"  @click="onDeletePayList()" >确认</el-button>
                      <el-button style="width:40%"  icon="##" @click="delDialogVisible=false">再想想</el-button>
                 </div>
            </el-dialog>
            
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    inject:['reload'],
    data(){
        return{
            checked:[],
            delDialogVisible:false,
            unpushList:[{}],
            search_time:'',
            keywords:'',
            value:'',
            sort_way:'',
            idFlag:false,
            content_ids:[],
            batch_flag:true,//符合批量删除
            cateId:localStorage.getItem('cateId'),
            page:1,
            total:0
        }
    },
    // created(){
    //     this.getunPush();
    // },
    mounted(){
        this.getunPush();
    },
    methods:{
        //获取未发布列表
        getunPush(){
            axios({
                url:this.API+'/content/content/unPush',
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
                console.log(response);
                if(response.data.code==200){
                    this.unpushList = response.data.data.data;
                    this.contentId = response.data.data.data[0].id;
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
            this.getunPush();
         },

        //page改变时
        handleCurrentChange(val) {
            this.page = val;
            this.getunPush();
        },


        //点击获取内容id
        getContentId(row){
            this.editid = row.id;
            //console.log(this.editid);
            this.$router.push({name:'editpublish',params:{id:this.editid}})
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
               // console.log(this.content_ids);
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
                    del_type:0
                }
            }).then(response=>{
                //console.log(response);
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    this.reload();
                    this.delDialogVisible = false;
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            })
        },
        //排序
        sortChange: function(column, prop, order) {
            // console.log(column)
            //console.log(column.prop)
            // console.log(column.order)
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
                url:this.API+'/content/content/unPush',
                data:{
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
                    this.unpushList = response.data.data.data;
                    this.contentId = response.data.data.data[0].id;
                }
            })
        },

    }
}
</script>
<style>
.notpublishbox{
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
.notpublishbox .sheltag{
    text-align: center;
}
.notpublishbox .shelbtn{
    margin-top:40px;
    text-align: center
}
.notpublishbox .line{
    padding:5px 10px 0px 10px;
}
.notpublishbox .el-input__inner{
    width:40%;
}
.notpublishbox .el-input__suffix {
    left: -70px;
    -webkit-transition: all .3s;
    transition: all .3s;
}
.notpublishbox .el-form--inline .el-form-item {
    display: inline-block;
    margin-right: -120px;
    vertical-align: top;
}
.notpublishbox .select_box{
    min-width: 110px;
}
.notpublishbox .el-tag {
    background-color:#ffffff;
    padding-left: 2px;
    padding-right: 2px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #7BD7A4;
    border-radius: 4px;
    border: 1px solid #7BD7A4;
    width: 55px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
}
.notpublishbox .el-dialog__header{
    border-bottom: 1px #cccccc solid;
    margin-left: 30px;
    width: 90%;
    padding:20px 0px 10px;
}
.notpublishbox .el-dialog .el-table td, .el-table th.is-leaf {
    border-bottom:none;
}
.notpublishbox .el-checkbox__inner:hover {
    border-color: #FE6C3F;
}
.notpublishbox .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #FE6C3F;
    border-color: #FE6C3F;
}
.notpublishbox .el-checkbox__input.is-focus .el-checkbox__inner{
     border-color: #FE6C3F;
}

.notpublishbox .el-checkbox__inner {
    border-radius: 20px;
    border: 1px solid #FE6C3F;
    border-radius: 2px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    z-index: 1;
}
.notpublishbox .el-checkbox__inner::after {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 10px;
    left: 6px;
    position: absolute;
    top: 2px;
    width: 5px;
}
.notpublishbox .editbtn{
    color: #000;
}
.notpublishbox .delbtn{
    color: #FE6C3F;
}
.notpublishbox .el-table th{
    background-color: #f5f5f5;
}
.notpublishbox .el-table th.is-center {
    text-align: center;
}
.notpublishbox .el-table td.el-table_1_column_2.is-center {
    text-align: left;
}
.notpublishbox .el-table td.el-table_1_column_6.is-center {
    text-align: left;
}
.notpublishbox .el-input__inner{
    width:40%;
    height: 30px;
    line-height: 30px;
}
.notpublishbox .searchbtn {
   margin-left: -100px;
   height: 30px;
   padding: 7px 20px;
   background: #18C26A;
   border: #18C26A;
   color: #ffffff;
}
/* .notpublishbox .el-table th.el-table_1_column_5 .cell{
    background-color: #FE6C3F;
    border-radius: 5px;
    padding:5px 5px 5px 5px;
    color: #fff;
} 
 .notpublishbox .el-table th.el-table_1_column_6 .cell{
    background-color: #FE6C3F;
    border-radius: 5px;
    padding:5px 5px 5px 5px;
    color: #fff;
    margin-left:10px;
    margin-right: 20px;
} */
.el-button--danger.is-disabled, .el-button--danger.is-disabled:active, .el-button--danger.is-disabled:focus, .el-button--danger.is-disabled:hover {
    color: #fff;
    background-color: #fdaaaa;
    border-color: #fdaaaa;
}
.el-button--danger {
    color: #fff;
    background-color: #FE6C3F;
    border-color: #FE6C3F;
}
.notpublishbox .paginationbox{
    width: 70%;
    text-align: center;
    position: absolute;
    bottom: 40px;
}
.notpublishbox .pagbtn:focus,.msgbox2 .pagbtn:hover{
    background: #ffffff;
    color: #606266;
    border: 1px solid #dcdfe6;
}
.paginationbox .el-pagination .el-input{
    width: 100%;
}
</style>


