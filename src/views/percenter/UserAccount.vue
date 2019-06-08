<template>
    <div  class="userinfo6">
        <div class="accountb">
            <span class="abtag">账户余额</span>
            <span class="abmoney"><span class="moneytag">￥</span>{{data}}</span>
            <div class="abpaybox">
                <router-link to="/addpay"><el-button class="abpay">充值</el-button></router-link>
            </div>
        </div>
        <!--工具条-->
        <div class="toolaccount">
             <el-col :span="24" style="padding-bottom:0px;">
                <el-form :inline="true">
                    <el-form-item label="类型">
                        <el-select @change="getStatus(value)"  v-model="value" placeholder="全部" style="width:100px">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker @change="getTimeBill()" v-model="start"  type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
        <!--列表-->
        <div class="table_container">
            <el-table :data="billList" style="width:100%" align='left'>
                <el-table-column width="80px" align="center" label="序号">
                    <template slot-scope="scope">
                        <div class="sortnum">{{scope.row.id}}</div>
                    </template>
                </el-table-column>
                <el-table-column property="number" width="300px" label="流水号" align="center"></el-table-column>
                <el-table-column property="op_reason" width="" label="类型" align="center"></el-table-column>
                <el-table-column property="amount" width="" label="金额" align="center">
                    <template slot-scope="scope">
                        <span :class="scope.row.amount>='0'?'addtag':'relatag'">{{scope.row.amount}}</span>
                        <!-- <span hidden class="lesstag">-132</span> -->
                    </template>
                </el-table-column>
                <el-table-column property="add_time" :formatter="dateFormat"    width="170" label="日期" align="center"></el-table-column>
            </el-table>
            <div class="paginationbox">
                <!-- <div>
                    <span style="color:#cccccc">到第</span>
                    <input style="width:4%;padding:8px 0px;border-radius:4px;text-align:center;display: inline-block;outline:0;border: 1px solid #dcdfe6;" placeholder="1" v-model="page">
                    <span style="color:#cccccc">页</span>
                    <el-button @click="getBill()" class="pagbtn" style="width:5%;padding: 8px 12px;">确定</el-button>

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
    </div>
</template>
<script>
// Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
//   return moment.unix(dataStr).format(pattern);
// })
import dtime from 'time-formater'
// import moment from 'moment'
import axios from 'axios';
export default {
    inject:['reload'],
    data(){
        return{
            options: [{
                value: '1',
                label: '消费'
            }, 
            {
                value: '2',
                label: '充值'
            },
            {
                value:'3',
                label:'全部'
            }],
            value: '',
            date:'',
            billList:[],
            errorDialogVisible:false,
            data:'',
            type:'',
            start:'',
            end:'',
            page:1,
            total:0,
            list_rows:'',
            current_page:'',
            last_page:'',
            per_page:''
        }
    },
    created(){
        this.getbalance();
        // this.getBill();
        this.dateFormat();
    },
    mounted(){
        this.getBill();
    },
    methods:{
         //获取用户余额
        getbalance(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                }, 
                url:this.API+'/system/pay/balance',
                method:'post',
            }).then(response=>{
                //console.log('用户余额',response);
                if(response.data.code==200){
                    this.data = response.data.data;
                    //console.log(this.data);
                }
            })
        },

        getStatus(value){
            this.type = value;
            console.log(this.type);
            //this.reload();
            this.getBill();
        },

        //获取消费记录
        getBill(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                }, 
                url:this.API+'/user/user/getBill',
                method:'post',
                data:{
                    list_rows:10,
                    type:this.type,
                    page:this.page,
                }
            }).then(response=>{
                console.log('!!!',response);
                if(response.data.code==200){
                    this.billList = response.data.data.data;
                    this.total = response.data.data.total;
                    this.current_page = response.data.data.current_page;
                    this.last_page = response.data.data.last_page;
                    this.per_page = response.data.data.per_page;//分页数
                    
                   //console.log('!!!!',this.billList);
                }
            })
        },

        //进行分页,list_rows改变时
        handleSizeChange(val){
            this.list_rows = val;
            this.getBill();
         },

        //page改变时
        handleCurrentChange(val) {
            this.page = val;
            this.getBill();
        },
        //

        //根据时间进行筛选
        getTimeBill(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                }, 
                url:this.API+'/user/user/getBill',
                method:'post',
                data:{
                    list_rows:10,
                    type:this.type,
                    page:this.page,
                    start:this.start,
                }
            }).then(response=>{
                //console.log('!!!',response);
                if(response.data.code==200){
                    this.billList = response.data.data.data;
                    //console.log('!!!!',this.billList);
                }
            })
        },

        // 时间格式化
        dateFormat:function(row,column){
            var add_time = row[column.property] * 1000;
            //console.log(row[column.property]);
            if(add_time == undefined){
                return "";
            }
            return dtime(add_time).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}
</script>
<style>
.userinfo6{
    width:1000px;
    height:800px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 1px #eaeaea;
    padding:35px 20px 15px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
    /* text-align: center; */
    position: relative;
     
}
.userinfo6 .abtag{
    font-size: 16px;
}
.userinfo6 .abmoney{
    font-size: 40px;
    color:  #FF6E40;
    padding-left:10px;
    padding-right:10px;
}
.userinfo6 .moneytag{
    font-size: 20px;
}
.userinfo6 .abpaybox{
    float: right;
    padding-right: 670px;
    padding-top: 8px;
}
.userinfo6 .abpay{
    height: 30px;
    line-height: 15px;
    background-color: #18C26A;
    padding: 5px 15px 5px 15px;
    color: #ffffff;
}
.userinfo6 .el-input__inner{
    /* width:40%; */
    height: 40px;
}
/* .userinfo6 .el-input{
    margin-left: 0px !important
} */
.el-input{
    margin-left: 0px !important
}
.userinfo6 .el-input__suffix {
    /* left: -70px; */
    -webkit-transition: all .3s;
    transition: all .3s;
}
.userinfo6 .el-select .el-input.is-focus .el-input__inner {
    border-color: #dcdfe6;
}
.userinfo6 .toolaccount{
    margin-top: 20px;
}
.userinfo6 .sortnum{
    width: 30px;
    height:30px;
    border:1px #eaeaea solid;
    line-height:30px;
    border-radius: 5px;
    color: #cccccc;
    background-color: #F5F5F5;
    margin-left:12px;
}
.userinfo6 .el-table th {
    background-color: #F5F5F5;
}
.userinfo6 .addtag{
    color: #18C26A;
}
.userinfo6 .relatag{
    color: #FF6E40;
}
.userinfo6 .paginationbox{
   width:100%;text-align:center;
   position: absolute;
   bottom:10px;
}
.userinfo6 .paginationbox .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #18C26A;
    color: #fff;
}
.userinfo6 .paginationbox .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #18C26A;
}
.userinfo6 .pagbtn:focus,.userinfo6 .pagbtn:hover{
    background: #ffffff;
    color: #606266;
    border: 1px solid #dcdfe6;
}
</style>


