<template>
    <div>
    <!--充值页面-->
    <div class="msgboxpay">
          <el-tabs v-model="message">
                <el-tab-pane label="余额充值" name="first">
                    <div class="pay_box">
                        <el-form :inline="true" label-position="center" label-width="0px">
                            <el-col :span="24">
                                <ul>
                                    <li class="lifi-money-item" v-for="(item, index) in moneyList" :key="index" @click="chooseMoney(item.value,index)" :class="{ active:index==current}"><div class="money_box"><p>￥{{item.label}}</p></div></li>
                                    <li @click="chooseOther">
                                        <el-input class="other-money-inp money_box" v-model="OtherMoney" placeholder="其他金额" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"></el-input>
                                    </li>
                                </ul>
                            </el-col>
                            <!-- <el-col :span="24">
                                <div class="totalpay">         
                                        <el-col :span="4">
                                            <el-col :span="24" class="total_title">充值</el-col>
                                            <el-col :span="24" class="tatal_size">500</el-col>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-col :span="24"><br></el-col>
                                            <el-col :span="24" class="tatal_size">+</el-col>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-col :span="24" class="total_title">赠送</el-col>
                                            <el-col :span="24" class="tatal_size">25</el-col>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-col :span="24"><br></el-col>
                                            <el-col :span="24" class="tatal_size">=</el-col>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-col :span="24" class="total_title">入账</el-col>
                                            <el-col :span="24" class="tatal_size">525</el-col>
                                        </el-col>            
                                </div>
                            </el-col> -->
                            <el-col :span="24">
                                <div class="total_tag">
                                    <p>充值金额将直接放入个人账号中，下单即可使用，主播级别可任选</p>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="total_tag">
                                    <el-button @click="openPayDialog" style="width:16%;background-color:#18C26A;color:#fff;font-size:18px;">立即充值</el-button>
                                </div>
                            </el-col>
                        </el-form>
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane label="购买套餐" name="second">
                     <div class="pay_box">
                        <el-form :inline="true" label-position="center" label-width="0px">
                            <el-col :span="24">
                                <ul>
                                    <li><div class="money_box"><p>会员套餐A（￥1000）</p></div></li>
                                    <li><div class="money_box"><p>会员套餐B（￥1000）</p></div></li>
                                    <li><div class="money_box"><p>会员套餐C（￥500）</p></div></li>
                                </ul>
                            </el-col>
                            <el-col :span="24">
                                <div class="packagepay">         
                                    <ul>
                                        <li>增加2个开通渠道数上线 <el-checkbox style="border-radius:50%"></el-checkbox></li>
                                        <li>增加2个开通渠道数上线 <el-checkbox style="border-radius:50%"></el-checkbox></li>
                                        <li>增加2个开通渠道数上线 <el-checkbox style="border-radius:50%"></el-checkbox></li>
                                        <li>增加2个开通渠道数上线 <el-checkbox style="border-radius:50%"></el-checkbox></li>
                                        <li>增加2个开通渠道数上线 <el-checkbox style="border-radius:50%"></el-checkbox></li>
                                        <li>增加2个开通渠道数上线 <el-checkbox style="border-radius:50%"></el-checkbox></li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="total_tag">
                                    <el-button @click="packpayDialogVisible=true" style="width:16%;background-color:#18C26A;color:#fff;font-size:18px;">立即充值</el-button>
                                </div>
                            </el-col>
                        </el-form>
                    </div>
                </el-tab-pane> -->
          </el-tabs>
    </div>
    <!--余额充值弹框-->
     <el-dialog width="448px" title="余额充值" :visible.sync="payDialogVisible" center :close="payDialogClose">
        <div class="payLine"></div>
        <el-form v-show="!qrcodeValue">
            <p>支付方式</p>
            <el-form-item> 
                <el-button type="primary" plain><i class="iconfont icon-zhifubao"></i></el-button>
                <el-button type="success" plain><i class="iconfont icon-weixin3"></i></el-button>
            </el-form-item>
            <el-form-item>
                <span>总计：<label style="color:red">￥{{currMoney}}</label></span>
            </el-form-item>
            <el-form-item>
                <el-button @click="payComfirm" style="width:100%" >立即支付</el-button>
            </el-form-item>
        </el-form>
        <qrcode-vue :value="qrcodeValue" :size="qrcodeSize" level="H" class="lifi-qr-code-img" v-show="qrcodeValue"></qrcode-vue>
        
    </el-dialog>
    <!--购买套餐弹框-->
    <!-- <el-dialog width="448px" title="购买套餐（会员套餐A）" :visible.sync="packpayDialogVisible" center>
        <span>支付方式</span><br><br>
        <el-form>
            <el-form-item> 
                <el-button style="width:30%"  icon="##" >余额</el-button>
                <el-button style="width:30%"  icon="##">支付宝</el-button>
                </el-form-item>
                <el-form-item>
                <el-checkbox checked class="">我已阅读并同意签署<span style="color:red;">《服务协议》</span></el-checkbox>
                <span style="margin-left:40px">总计：<i style="color:red">￥500</i></span>
            </el-form-item>
        </el-form>
        <div class="paybtnbox"> <el-button  style="width:100%"  class="paybtn"  icon="##" >立即充值</el-button></div>
    </el-dialog> -->
    <!--输入支付密码-->
    </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
    data(){
        return{
            moneyList:[
                {
                    label:500,
                    value:500
                },
                {
                    label:1000,
                    value:1000
                },
                {
                    label:2000,
                    value:2000
                },
                {
                    label:3000,
                    value:3000
                },
                {
                    label:5000,
                    value:5000
                },
                {
                    label:8000,
                    value:8000
                },
                {
                    label:10000,
                    value:10000
                },
                {
                    label:20000,
                    value:20000
                }
            ],
            message:'first',
            currMoney: 0,
            OtherMoney: '',
            current: -1,
            payDialogVisible:false,
            packpayDialogVisible:false,
            qrcodeValue:'',
            qrcodeSize: 240,
            token: localStorage.getItem('token'),
            order:''
        }
    },
    methods:{
        chooseMoney(value,index){
            this.current = index;
            this.currMoney = value;
        },
        chooseOther(){
            this.current = -1;
            this.currMoney = 0;
        },
        openPayDialog(){
            if(this.currMoney > 0 || this.OtherMoney > 0){
                this.currMoney = this.currMoney > 0 ? this.currMoney : this.OtherMoney;
                this.payDialogVisible = true;
            }else{
                this.$message({
                    type: "warning",
                    message: '请选择金额或者输入金额~'
                });
            }
        },
        payDialogClose(){
            this.qrcodeValue = '';
        },
        payComfirm(){
            let _this = this;
            if(_this.currMoney > 0 || this.OtherMoney > 0){
                _this.$axios({
                    url:_this.API+'/system/pay/recharge',
                    method:'post',
                    data:{
                        price: this.currMoney > 0 ? this.currMoney : this.OtherMoney
                    },
                    headers: {
                        'auth-key': _this.token
                    }
                }).then(response=>{
                    if(response.data.code == 200){
                        _this.order = response.data.data;
                        if(_this.order){//成功创建订单
                            _this.$axios({
                                url:_this.API+'/system/pay/alipay',
                                method:'post',
                                data:{
                                    order:_this.order
                                },
                                headers: {
                                    'auth-key': _this.token
                                }
                            }).then(response=>{
                                if(response.data.code == 200){
                                    _this.qrcodeValue = response.data.data;
                                    if(_this.qrcodeValue){//创建二维码成功
                                        _this.checkorder();
                                    }else{
                                        this.$message({
                                            type: "error",
                                            message: response.data.msg
                                        });
                                    }
                                    
                                }
                            }).catch((error)=>{
                                console.log(error);
                            });
                        }else{
                            this.$message({
                                type: "error",
                                message: response.data.msg
                            });
                        }
                    }
                }).catch((error)=>{
                    console.log(error);
                }); 
            }else{
                _this.$message({
                    type: "error",
                    message: '请选择金额或者输入金额~'
                });
            }
        },
        checkorder(){//每秒发送一个查询请求
            let _this = this;
            if(_this.qrcodeValue != ""){//增加判断，如果订单不存在则不发请求
                _this.timeout = setTimeout(() => {
                    _this.$axios({
                        url:_this.API+'/system/pay/checkorder',
                        method:'post',
                        data:{
                            order:_this.order
                        },
                        headers: {
                            'auth-key': _this.token
                        }
                    }).then(response=>{
                        if(response.data.data == 0){//等待付款
                            _this.checkorder();
                            console.log("1111111111111111")
                        }
                        if(response.data.data == 1){//支付成功
                            clearTimeout(_this.timeout);
                            console.log("22222222222222222");
                            _this.qrcodeValue = '';
                            _this.$message({
                                type: "success",
                                message: '支付成功!'
                            });
                            //路由跳转或者是关闭弹窗之类的
                            //_this.$router.push('xxxxxxxxxxxxxxxx');
                        }
                        if(response.data.data == 2){//取消订单
                            clearTimeout(_this.timeout);
                            console.log("3333333333");
                            _this.qrcodeValue = '';
                            _this.$message({
                                type: "error",
                                message: '您取消了支付'
                            });
                            //路由跳转或者是关闭弹窗之类的
                            //_this.$router.push('xxxxxxxxxxxxxxxx');
                        }
                    }).catch((error)=>{
                        console.log(error);
                    });
                }, 1000);
            }else{
                clearTimeout(_this.timeout);
            }
        }
    },
    components: {
        QrcodeVue
    }
}
</script>
<style >
.msgboxpay{
    width:950px;
    height:700px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 5px #eaeaea;
    padding:35px 20px 15px 20px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
}
.msgboxpay .el-checkbox {
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: 5px;
}
.msgboxpay .pay_box{
    margin-top: 10px;
}
.msgboxpay .pay_box ul{
    margin-left:-40px;
}
.msgboxpay .pay_box ul li{
    width:315px;
    float: left;
}
.msgboxpay li{
    list-style: none;
}
.msgboxpay .money_box{
    height: 60px;
    -webkit-border-radius:5px;
    border-radius: 5px;
    border:1px solid #eaeaea;
    box-shadow: 0 0 1px #eaeaea;
    background-clip:padding-box;
    line-height: 30px;
    text-align: center;
    margin-right:10px;
    margin-bottom: 10px;
    cursor: pointer;
}
.moneyafter_box{
    border:1px solid #F24132;
    box-shadow: 0 0 1px #F24132;
}
.moneyafter_box > p{
    color: #F24132;
}
.msgboxpay .money_box  p{
    /* font-size:18px; */
}
.msgboxpay .totalpay{
    padding-top:50px;
    margin-left:210px;
    margin-right:140px;
    text-align: center;
    height:100px;
    line-height: 25px;
}
.msgboxpay .total_title{
    font-size: 16px;
    color: #cccccc;
}
.msgboxpay .tatal_size{
    font-size: 30px;
    padding-top:10px;
}
.msgboxpay .total_tag{
    text-align: center;
    margin-bottom: 50px;
}
.msgboxpay .total_tag p{
    font-size: 16px;
    color: #cccccc;
}
.msgboxpay .packagepay{
    height: 235px;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 1px #eaeaea;
    background-clip:padding-box;
    background-color: #F5F5F5;
    text-align: center;
    margin-top:20px;
    padding-top:10px;
    margin-bottom: 30px;
}
.msgboxpay .packagepay .el-checkbox__inner:hover {
    border-color: #FE6C3F;
}
.msgboxpay .packagepay .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #fff;
    border-color: #FE6C3F;
}
.packagepay .el-checkbox__input.is-focus .el-checkbox__inner{
     border-color: #FE6C3F;
}

.packagepay .el-checkbox__inner {
    border-radius: 20px;
    display: inline-block;
    position: relative;
    border: 1px solid #FE6C3F;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    z-index: 1;
    -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.packagepay .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 1px solid #FE6C3F;
    border-left: 0;
    border-top: 0;
    height: 10px;
    left: 6px;
    position: absolute;
    top: 2px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 5px;
    -webkit-transition: -webkit-transform .15s ease-in .05s;
    transition: -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s, -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s;
    -webkit-transform-origin: center;
    transform-origin: center;
}
.packagepay ul li{
    width: 220px;
    padding-left:30px;
    padding-right: 31px;
    color: #A5A5A5;
    font-size: 16px;
    height:40px;
    margin-right:35px;
}
.el-dialog--center .el-dialog__header {
    /* border-bottom: 1px #cccccc solid; */
    margin-left: 20px;
    width: 90%;
    padding:20px 0px 10px;
}
.paybtnbox{
    text-align: center;
    margin-bottom: 220px;
    margin-top: 40px;
}
/* .el-button--primary {
    color: #fff;
    background-color: #18C26A;
    border-color: #18C26A;
} */
.paybtn{
    color: #fff;
    background-color: #18C26A;
    border-color: #18C26A;
    font-size: 18px;
}
 .paybtn:focus, .paybtn:hover{
    color: #ffffff;
    border-color: #18C26A;
    background-color: #18C26A;
     font-size: 18px;
}

.lifi-qr-code-img{
    width: 240px;
    margin: 0 auto;
}
.lifi-money-item.active .money_box{
    border-color: #18C26A;
    color: #18C26A;
}
.other-money-inp{
    width: 273px;
    padding:  0 15px;
}
.other-money-inp .el-input__inner{
    height: 60px;
    padding: 0;
    border:0;
    line-height: 60px;
    text-align: center;
}
.el-tabs__active-bar{
    background: linear-gradient(to right, #67DB73,#4DA3AE, #2852E1);
}
.payLine{
    width: 400px;
    height: 1px;
    background-color: #ccc;
    margin-top: -18px;
}
.el-button--primary.is-plain,.el-button--success.is-plain{
    /* border-color: #ECF5FF; */
    height: 40px;
    width: 120px;
    line-height: 20px;
}
.el-button--primary.is-plain .iconfont{
    font-size: 28px;
    /* position: absolute; */
}
.el-button--success.is-plain .iconfont{
    font-size: 28px;
}
</style>