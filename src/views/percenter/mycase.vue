<template>
    <div style="margin-bottom:40px;">
        <!-- 上半部分画图 -->
        <div class="caseHeard">
            <div class="authTitle">
                <div class="title-text">我的钱包</div>
            </div>
            <div class="bage-line"></div>
            <div class="underline"></div>
            <!-- 钱包样式 -->
            <div class="case">
                <div class="pushmoney">充值</div>
                <div class="money-txt">账户余额</div>
                <div class="money">￥<span>{{data}}</span></div>
                <!-- <div class="caseTop">
                    <div class="card3"><div class="card2"><div class="card1"></div></div></div>
                </div> -->
                <!-- <div class="caseBottom">
                    <div class="caseright">
                    </div>
                    
                    <div class="caseleft">
                        <div class="cycle">
                            <div class="smallcycle"></div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <!-- 下半部分流水 -->
        <div class="caseBody">
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
                             <el-date-picker
                                v-model="start"
                                type="date"
                                placeholder="选择开始日期"
                                >
                            </el-date-picker>
                            <el-date-picker @change="getTimeBill()" v-model="end"  type="date" placeholder="选择结束时间"></el-date-picker>
                        </el-form-item>
                    </el-form>
                </el-col>
            </div>
            <!--列表-->
            <div class="table_container">
                <el-table :data="billList" style="width:100%" align='left'>
                    <el-table-column width="80px" align="center" type="index" label="序号">
                    </el-table-column>
                    <el-table-column property="number" width="300px" label="流水号" align="center"></el-table-column>
                    <el-table-column property="op_reason" width="" label="类型" align="center"></el-table-column>
                    <el-table-column property="amount" width="" label="金额" align="center">
                        <template slot-scope="scope">
                            <span :style="scope.row.bill_type_id>1?'color:#fa5151':'color:#07c160'">{{scope.row.amount}}</span>
                            <!-- <span hidden class="lesstag">-132</span> -->
                        </template>
                    </el-table-column>
                    <el-table-column property="add_time" :formatter="dateFormat"    width="170" label="日期" align="center"></el-table-column>
                </el-table>
                <div class="noDataPage" v-if="this.billList.length == 0">
                    <img src="../../assets/image/hint.png" >
                    <div class="noData-text">还没有任何数据唷！</div>
                </div>
                <!-- 分页 -->
                <div class="paginationbox" v-if="this.billList.length != 0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-size="5"
                        layout="total,prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dtime from 'time-formater'
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
                value:'0',
                label:'全部'
            }],
            id:0,
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
                list_rows:5,
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
                // console.log('45w4e',this.per_page)
                console.log('!!!!',this.billList);
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
                list_rows:5,
                type:this.type,
                page:this.page,
                start:this.start,
                end:this.end
            }
        }).then(response=>{
            console.log('!!!gfdg',response);
            if(response.data.code==200){
                this.billList = response.data.data.data;
            }
        })
    },

    // 时间格式化
    dateFormat:function(row,column){
        var add_time = (row[column.property] * 1000);
        console.log(row[column.property]);
        if(add_time == undefined){
            return "";
        }
        return dtime(add_time).format('YYYY-MM-DD HH:mm:ss');
    }
    }
}

</script>
<style>
.caseHeard{
    width: 904px;
    margin:40px 40px auto;
    height: 285px;
    border-radius: 2px;
    background: #ffffff;
    border:1px solid #f7f7f7;
    margin-left: 40px;
    background-clip:padding-box;    
}
.caseBody{
    width: 834px;
    height: 569px;
    border-radius: 2px;
    background: #ffffff;
    border:1px solid #f7f7f7;
    margin-left: 40px;
    padding: 0px 35px;
    background-clip:padding-box; 
    margin-top: -30px;
    /* margin-bottom: 30px;  */
    /* box-shadow: 0px -5px 10px #c8c8c8; */

}
.authTitle{
    height: 53px;
    line-height: 54px;
}
.bage-line{
    height: 2px;
    width: 64px;
    background-color: #07C160;
    margin-left: 33px;

}
.underline{
    width: 100%;
    height:1px;
    background-color: #f6f6f6;
}
.title-text{
    width: 64px;
    height: 16px;
    font-weight: 600;
    margin-left: 37px;
}
.caseHeard .case{
    width: 828px;
    height: 208px;
    margin: 30px auto;
    border-radius: 20px;
    background-color: #1BB866;
}
.caseTop{
    height: 80px;
    padding-top: 27px;
    /* background-color: #000; */
    /* border-bottom: 1px solid #000; */


}
.caseBottom{
    width: 100%;
    /* margin-top: 10px; */
    height: 200px;
    background-color: #07C160;
    border-top: 1px solid #34CB7C;
}
.card1,.card2,.card3{
    /* margin-top: 40px; */
    /* width: 412px; */
    height: 100px;
    margin-top: 0px;
    border-radius: 20px;
    /* position: absolute; */
}
.card1{
    width: 412px;
    background-color: #fff;
    box-shadow: 3px 0px 8px #34CB7C;

}
.card2{
    /* margin-left: 138px; */
    width: 540px;
    background-color: #7DEDB2;
    box-shadow: 3px 0px 8px #07C160;
}
.card3{
    margin-left: 32px;
    width: 668px;    
    background-color: #4ED18C;
    box-shadow: 3px -3px 8px #17A058;

}
.caseright{
    width: 50%;
    /* transform:skew(-30deg); */
    transform:skew(-30deg);
    margin-left: -30px;
    height: 100%;
    background-color: #fff;
    opacity: .1;
}
.caseleft{
    width: 210px;
    height: 100px;
    /* border-radius: 50px; */
    background-color: #20C770;
    /* opacity: .1; */
    margin-top: -170px;
    /* margin-right: -40px; */
    float: right;
    box-shadow: -5px 0px 4px #17A058;
}
.cycle{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    line-height: 100px;
    margin-left: -50px;
    background-color: #20C770;
    position: absolute;
    box-shadow: -5px 0px 3px #17A058;

}
.smallcycle{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: auto;
    background-color: #07C160;
    float: left;
    margin-left: 25px;
    margin-top:25px;
    box-shadow: -2px 1px 10px #17A058;

}
.pushmoney{
    cursor: pointer;
    float: right;
    background-color: #fff;
    color: #07C160;
    width: 70px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 2px;
    margin-top: 35px;
    margin-right: 625px;
}
.money-txt{
    height: 20px;
    width: 80px;
    font-size: 20px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    float: left;
    margin-top: 40px;
    margin-left: 30px;

}
.money{
    font-size: 30px;
    height: 60px;
    width: 200px;
    text-align: left;
    line-height: 60px;
    margin-top: 20px;
    float: left;
    margin-left: 25px;
    color: #fff;

}
.money span{
    font-size: 60px;
    font-weight: 900;
}
.caseBody .toolaccount{
    margin-top: 30px;
}
.caseBody .paginationbox{
   width:100%;
   text-align:center;
   margin-top: 20px;
   /* position: absolute; */
    /* margin-left: -240px; */
    /* margin-bottom: 20px; */
    /* bottom: 20px; */
}
.caseBody .paginationbox .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #18C26A;
    color: #fff;
}
.caseBody .paginationbox .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #18C26A;
}
.caseBody .pagbtn:focus,.caseBody .pagbtn:hover{
    background: #ffffff;
    color: #606266;
    border: 1px solid #dcdfe6;
}
.caseBody .el-table td, .el-table th{
    /* padding: 8px; */
}
.sortnum{
    background-color: #f7f7f7;
    /* padding: 0 auto; */
    margin: 0 auto;
    width: 28px;
    line-height: 28px;
    height: 28px;
    border-radius: 2px;
}
.caseBody .el-table th{
    background-color: #f5f5f5;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    /* border: 1px solid #07c160; */
    color: #07C160;
    border-radius: 2px;
}
.el-select-dropdown__item.selected{
    color: #07C160;
}
.noDataPage{
    width: 904px;
    height: 430px;
    position: absolute;
    background-color: #ffffff;
    margin-top: -60px;
    margin-left: -35px;
    text-align: center;
    line-height: 529px;
    z-index: 22
} 
.noData-text{
    position: absolute;
    margin-top: -235px;
    z-index: 88;
    width: 200px;
    height: 40px;
    color: #000;
    /* background: #ccc; */
    margin-left: 352px;
    text-align: center;
    line-height: 40px;
}
</style>
