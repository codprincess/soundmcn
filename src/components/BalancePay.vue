<template>
    <el-form-item class="balancebox">
        <p class="total-money">总计：￥1500</p>
        <p class="baltag">账户余额</p>
        <p class="all-money"><span>￥</span>5025.00</p>
        <div class="paybtn3"> <el-button class="ispaybtn" style="width:90%" >立即支付</el-button></div>
        <div class="paybtn3"> <el-button style="width:90%" >上一步</el-button></div>
    </el-form-item>
</template>
<script>
export default {
    name:'BalancePay',
    data(){
        return{

        }
    }
}
</script>

<style>
.paybtn3 {
    text-align: center;
    margin-bottom: 10px;
}
</style>

