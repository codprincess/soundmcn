<template>
    <div class="personbox">
        <!--渠道、内容、账号-->
        <div class="date_row">
            <el-col :span="8">
                <div class="channel_date">
                    <!-- <div class="date-title"><p>渠道数据</p></div>
                    <span class="datetag">Channel data</span> -->
                    <div class="date-info">
                        <div class="info-box"><p>账号信息</p></div>
                        <el-button class="paybtn">充值</el-button>
                    </div>
                    <span class="datetag">Acount information</span>
                    <div class="notadd_box">
                         <div class="iconbox"><span class="u-icon-qa"></span></div>
                         <div class="not_title"><p>您当前尚未添加栏目</p></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="conten_date">
                    <!-- <div class="date-title"><p>内容数据</p></div>
                    <span class="datetag">Content data</span> -->
                    <div class="date-info">
                        <div class="info-box"><p>账号信息</p></div>
                        <el-button class="paybtn">充值</el-button>
                    </div>
                    <span class="datetag">Acount information</span>
                     <div class="notadd_box">
                         <div class="iconbox"><span class="u-icon-qa"></span></div>
                         <div class="not_title"><p>您当前尚未添加栏目</p></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="userinfo">
                    <div class="date-info">
                        <div class="info-box"><p>账号信息</p></div>
                        <el-button class="paybtn">充值</el-button>
                    </div>
                    <span class="datetag">Acount information</span>
                    <div class="totalprice">
                        <p>￥<span>5025.00</span></p>
                        <span class="pricetag">当前余额</span>
                    </div>
                </div>
            </el-col>
        </div>
        <!--渠道列表-->
        <div class="chennel_row">
            <el-col :span="24">
                <div class="channel_list">
                    <div class="date-title"><p>内容数据</p></div>
                    <span class="datetag">Content data</span>
                </div>
            </el-col>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style>
    .date_row{
        width: 1000px;
        /* border:1px #cccccc solid; */
        height:200px;
        margin:180px auto 0px auto;
        /* text-align: center; */
    }
    .date_row .channel_date,.conten_date,.userinfo{
        width:280px;
        height:185px;
        -webkit-border-radius:5px;
        border-radius: 5px;
        box-shadow: 0 0 5px #eaeaea;
        padding:0px 20px 0px 20px;
        background: #ffffff;
        border:1px solid #eaeaea;
        background-clip:padding-box;
    }
    .date-title{
        border-bottom:1px #eaeaea solid;
        height:30px;
        margin-bottom: 5px;
    }
    .date-info{
        border-bottom:1px #eaeaea solid;
        height:30px;
        margin-bottom: 5px;
    }
    .date-info .info-box p{
        font-size: 18px;
    }
    .paybtn{
        float: right;
        margin-top:-45px;
        height:30px;
        line-height:-10px;
        line-height: -0px;
        background-color: #FE6C3F;
        color: #FFFFFF;
    }

    .date-title p{
        font-size: 18px;
    }
    .datetag{
        color: #cccccc;
        font-size: 12px;
    }
    .notadd_box{
        margin-left:50px;
        margin-top: 30px;
    }
    .iconbox{
        height:45px;
        width:45px;
        position: relative;
        float: left;
        /* margin-left: 55px; */
    }
    .not_title{
        float: left;
    }
    .not_title p{
        color: #B4B4B4;
    }
    .u-icon-qa 
    {
    width: 60px;
    height:44px;
    text-align: center;
    color: #FFFFFF;
    font-size: 26px;
    }
.u-icon-qa:before {
    position: absolute;
    top:10px;
    right: 8px;
    width: 30px;
    height: 30px;
    background: #B4B4B4;
    -webkit-border-radius: 24px;
    border-radius: 24px;
    content: '';

}
.u-icon-qa:after {
    position: absolute;
    top:10px;
    right: 16px;
    content: '?';

}
.totalprice{
    text-align: center;
}
.totalprice p{
    color: #F24132;
    font-size:20px;
    height:40px;
    line-height: 40px;
}
.totalprice span{
    font-size: 40px;
}
.totalprice .pricetag{
    font-size: 18px;
    /* padding-top:-20px; */
}
.chennel_row{
    width: 1000px;
    border:1px #cccccc solid;
    height:300px;
    margin:0 auto;
}
.chennel_row .channel_list{
    width:947px;
    height:280px;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 5px #eaeaea;
    padding:0px 20px 0px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
}

    
</style>

