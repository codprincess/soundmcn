<template>
    <div style="width:100%;">
        <ul class="stepBar">
            <!--唤醒词检测-->
            <li class="select"><p class="bgline"></p><div class="stepCont"><p class="number"><div class="numberbox"></div></p></div></li>
            <!--待支付-->
            <li class="select selectLast"><p class="bgline"></p><div class="stepCont"><p class="number"><div class="numberbox"></div></p><p class="text">开通中</p></div></li>
            <!--开通中-->
            <li><p class="bgline"></p><div class="stepCont"><p class="number"><div class="numberbox"></div></p></div></li>
            <!--正常-->
            <li><div class="stepCont"><p class="number"><div class="numberbox"></div></p></div></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'StepBar',
    data(){
        return{

        }
    }
}
</script>
<style>
   .stepBar{
       position: relative;
       overflow:hidden;
       margin-left:-20px;
   }
   .stepBar li{
       float:left; width:30%;  height:50px; position:relative;list-style: none;
   }
  .stepBar li .bgline{position:absolute; height:3px; line-height:14px; overflow:hidden; left:-1px; top:4px; background:#e1e4e9; width:100%;}
  .stepCont{position:absolute; width:120px; left:-2px; top:0; }
  .stepCont .number{position: absolute; width:15px; height:15px; line-height:36px;left:0; background:#e1e4e9;  border-radius:50%; text-align:center; color:#afb4bc; font-weight:bold;}
  .stepCont .text{width:100%; text-align:left; position:absolute;left:0;color: #4BCB89;}
  .stepBar li:first-child .bgline{left: 1px;}
  .stepBar li:first-child .stepCont{left: 0;}
  .stepBar li:last-child{position:absolute; top:0; right: 0; clear:both;left:90%;}
  .stepBar li:last-child .stepCont{left:0;}
   /* li:last-child .stepCont .number{left:84px;} */
  .stepBar li:last-child .stepCont .text{right:0!important; text-align:right;}
   .numberbox{width: 8px;height: 8px;border-radius: 50%; position: absolute;top: 18px;left: 4px;}
  .stepBar  li.select .numberbox{background:#4BCB89}
  .stepBar li.select .bgline{background:#e1e4e9;}
  .stepBar li.select .number{background:#e1e4e9; color:white;}
  .stepBar  li.select.selectLast .bgline{background:#e1e4e9;}
    
</style>


