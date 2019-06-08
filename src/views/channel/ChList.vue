<template>
    <div class="channelbox-2">
        <section>
            <!--工具条-->
            <el-col :span="24" style="padding-bottom:0px" class="channelbox-tool">
                <el-form :inline="true">
                    <el-form-item label="开通状态">
                        <el-select placeholder="全部"  v-model="value" style="width:105px" @change="selectStatus(value)">
                                <el-option 
                                 v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                               </el-option>
                                
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开通类型">
                        <el-select placeholder="全部" v-model="value2" style="width:105px" @change="selectType(value2)">
                                <el-option 
                                 v-for="item in options2"
                                    :key="item.value2"
                                    :label="item.label"
                                    :value="item.value2">
                                </el-option>
                               
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="channeladdbtn"  @click="checkCateStatus">+新增渠道</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
            <!--列表-->
            <div class="table_container">
                <el-table :data="getsectionList" style="width:100%" align='left'>
                    <el-table-column property="cover" label="渠道名称" align='left' width='100'>
                        <template slot-scope="scope">
                            <div style="width:80px;height:80px; position:relative;text-align:center">
                                <img style="width:50px;height:50px" :src="scope.row.cover"/>
                                <span style="display: block;">{{scope.row.name}}</span>
                            </div>
                            <!-- <img style="width:60px;height:60px; position:relative;" :src="scope.row.cover"/>
                            <span style="position: absolute; display: block;left:25px;">{{scope.row.name}}</span> -->
                        </template>
                    </el-table-column>
                    <el-table-column property="type" label="开通类型" align='center' width='150'>
                        <template slot-scope="scope">
                            <span> {{scope.row.type == "1" ? "自定义":"接口skill"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="type" label="开通状态" align='center' width='250'>
                        <template slot-scope="scope">   
                                <div class="speed" id="speed">
                                    <div class="line"></div>
                                    <ul class="liui-row" style="margin-left: -38px;position: absolute;top: 38px;">
                                        <li :class="(scope.row.active_status=='0' && scope.row.apply_status=='0' && scope.row.status=='0' || scope.row.active_status=='1')?'curr':'currerror'">
                                            <div class="dot"></div>
                                        </li>                       
                                        <li  :class="((scope.row.active_status==1 && scope.row.is_pay==1)||(scope.row.active_status==1 && scope.row.is_pay==0))?'curr':''">
                                            <div class="dot"></div>
                                        </li>
                                        <li  :class="(scope.row.apply_status==1 && scope.row.is_pay==1 || (scope.row.apply_status==0 && scope.row.is_pay==1))?'curr':(scope.row.apply_status==2)?'currerror':''">
                                            <div class="dot"></div>
                                        </li>

                                        <li v-if="(scope.row.status==1 || scope.row.status==0)" :class="(scope.row.status==1 && scope.row.apply_status==1 && scope.row.active_status==1)?'curr':''">
                                            <div class="dot"></div>
                                        </li>
                                        <li v-else :class="(scope.row.status==2)?'currerror':'currerror'">
                                            <div class="dot"></div>
                                        </li>     
                                    </ul>                                                     
                                </div>
                           
                            <div style="position: absolute;top:60px;left:30px;">
                                <span>{{scope.row.active_status==0 ? "唤醒词待检测" :((scope.row.active_status == 2) ? "唤醒词不通过:":((scope.row.is_pay == 0) ? "待支付":((scope.row.apply_status==2)?"渠道异常:":((scope.row.status == 1 && scope.row.active_status == 1 && scope.row.apply_status == 1 && scope.row.is_pay==1)?"通过":"等待渠道通过"))))}}
                                    <span v-if="scope.row.active_status==0"></span>
                                    <span v-else>{{scope.row.remark}}</span>
                                </span>
                            </div>
                        </template>            
                    </el-table-column>
                    <el-table-column property="active" label="唤醒词" align='left' width='150'></el-table-column>
                    <el-table-column  label="操作" align='center' width=''>
                        <template slot-scope="scope">
                            <el-button v-if="(scope.row.apply_status=='1' && scope.row.active_status=='1' && scope.row.status=='1')" class="channel-action" type="text">已开通</el-button>                       
                            <el-button v-else-if="scope.row.active_status=='2'" @click="getsourceActive(scope.row)" :class="(scope.row.active_status==0 || scope.row.active_status==2)?'ischannel-active':'channel-out'"  type="text">修改唤醒词</el-button>
                            <el-button v-else-if="(scope.row.active_status==1 && scope.row.is_pay==0) " class="ischannel-out"  type="text" @click="handlePrice(scope.row)">支付</el-button>
                            <el-button v-else-if="((scope.row.apply_status==1 && scope.row.active_status==1 && scope.row.is_pay==1 &&  scope.row.status==2)||(scope.row.apply_status==2 && scope.row.active_status==1 && scope.row.is_pay==1) || (scope.row.active_status==1 && scope.row.apply_status==0 && scope.row.status==1) || (scope.row.active_status==0 && scope.row.apply_status==0 && scope.row.status==0) || (scope.row.active_status==1 && scope.row.apply_status==0 && scope.row.status==0 && scope.row.is_pay==1) ||(scope.row.active_status==1 && scope.row.apply_status==1 && scope.row.status==0 && scope.row.is_pay==1) )" type="text">
                                <span v-if="((scope.row.apply_status==1 && scope.row.active_status==1 && scope.row.is_pay==1 &&  scope.row.status==2)||(scope.row.apply_status==2 && scope.row.active_status==1 && scope.row.is_pay==1)|| (scope.row.apply_status==2 && scope.row.active_status==1 && scope.row.is_pay==1 && scope.row.status==0))" @click="handleChange(scope.row)" class="passing">渠道变更</span>
                                <span v-else class="pass">渠道变更</span>
                            </el-button>
                            <span>|</span>
                            <el-button :disabled="is_flag" class="ischannel-out" type="text" @click="handleClose(scope.row)">下架</el-button>
                        </template>
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
            <!--添加渠道-->
            <el-dialog title="" :visible.sync="dialogTableVisible" width="600px" class="addlist" center>
                <el-form style="text-align:center">
                    <el-form-item>
                        <label style="margin-right:20px;">唤醒词</label>
                        <el-input v-model="active" placeholder="填写唤醒词" style="width:43%"></el-input>
                    </el-form-item>
                </el-form>
                <div class="pic-list">
                    <el-form style="text-align:center">
                        <el-row style="border:1px #eaeaea solid;padding-top:10px;height:250px;">
                            <el-form :inline="true">
                                <el-col :span="2"  v-for="(item,index) in allSource" :key="index" class="noSel" :class='{"yesSel ":ids.indexOf(item.id)>-1}'>
                                    <img @click="getSourceId(item.id,index)" style="width:58px;height:58px;border-radius:10px;" :src="item.cover" alt="item.name"/>
                                    <p>{{item.name}}</p>
                                </el-col>
                            </el-form>   
                        </el-row>
                    </el-form>
                </div>
                <div class="chbut" >
                    <el-button style="width:18%;" class="confirmbtn" @click="applySource()" >确 定</el-button>
                    <el-button style="width:18%;" class="" @click="dialogTableVisible=false" >返回</el-button>
                </div>
                    <!-- <div class="chbut"><el-button style="width:18%;float:left;" class="confirmbtn" @click="dialogTableVisible=true" >返回</el-button></div> -->
                
            </el-dialog>

            <!--购买渠道-->
            <el-dialog width="447px" title="购买渠道" :visible.sync="payVisible" center>
                <span>支付方式</span><br><br>
                <el-form>
                    <el-form-item> 
                         <el-button @click=" selectPay(index)" v-for="(item,index) in payList" :key="index" style="width:30%" class="balancebtn tab"><i class="iconfont">&#xe653;</i>{{item}}</el-button>
                     </el-form-item>
                     <!--余额支付框-->
                     <div class="paybox">
                        <!-- <BalancePay :is="currentTab"></BalancePay> -->
                         <el-form-item class="balancebox" v-show="paybox1">
                            <p class="total-money">总计：￥{{sourcePrice}}</p>
                            <p class="baltag">账户余额</p>
                            <p class="all-money"><span>￥</span>{{data}}</p>
                            <div class="rechargebtn" style="margin-bottom:10px;font-size:14px;" v-if="(data==0||data<this.sourcePrice)"><el-button @click="TomoreMoney" style="color:#FF6E40" type="text">余额不足,点我充值</el-button></div>
                            <div class="paybtn3" style="margin-bottom:10px;"> <el-button @click="visiblebalancePay()" class="ispaybtn" style="width:90%" :disabled="not_pay">立即支付</el-button></div>
                            <!-- <div class="paybtn3"> <el-button style="width:90%" >上一步</el-button></div> -->
                        </el-form-item>
                        
                        <el-form-item class="balancebox" v-show="paybox2">
                            <div class="alipay">
                                <img src="https://git.heard-gl.com/avatars/10?s=290" />
                            </div>                                 
                        </el-form-item>

                        <el-form-item class="balancebox" v-show="paybox3">
                            <div class="wechatpay">
                                <img src="https://gitee.com/uploads/73/1581273_bugpress.png?1526978945" />
                            </div>
                        </el-form-item>
                     </div>


                </el-form>
               
            </el-dialog>

            <!--下架提示-->
             <el-dialog width="412px" title="下架提示" :visible.sync="shelvesDialogVisible" center>
                 <div class="sheltag"><p>确认下架该渠道吗吗？</p></div>
                 <div class="shelbtn">
                      <el-button @click="closeSource()" style="width:40%" class="confirmbtn" >确认</el-button>
                      <el-button style="width:40%"  icon="##" @click="shelvesDialogVisible=false" >再想想</el-button>
                 </div>
             </el-dialog>
             <!--修改唤醒词-->
              <el-dialog width="412px" title="修改唤醒词" :visible.sync="editactivelog" center>
                  <el-form style="text-align:center;margin-top:20px;">
                      <el-form-item>
                          <label style="margin-right:15px;">唤醒词</label>
                          <el-input v-model="active"  style="width:70%;"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-button  @click="editactive()" style="width:40%" class="confirmbtn" >确认</el-button>
                      </el-form-item>
                  </el-form>
             </el-dialog>
             <!--退款提示-->
              <el-dialog width="465px" title="下架提示" :visible.sync="refundDialogVisible" center>
                 <div class="sheltag"><p>退款金额将退还至账户余额中</p></div>
                 <div class="shelbtn">
                      <el-button style="width:40%" class="confirmbtn" >确认</el-button>
                      <el-button style="width:40%"  @click="refundDialogVisible=false">再想想</el-button>
                 </div>
             </el-dialog>
             <!--渠道变更提醒-->
              <el-dialog width="600px" title="渠道变更" :visible.sync="changechannelVisible" center>
                 <el-form style="text-align:center">
                    <el-form-item>
                        <label style="margin-right:20px;">唤醒词</label>
                        <el-input v-model="active" placeholder="填写唤醒词" style="width:43%"></el-input>
                    </el-form-item>
                </el-form>
                <div class="pic-list">
                    <el-form style="text-align:center">
                        <el-row style="border:1px #eaeaea solid;padding-top:10px;height:250px;">
                            <el-form :inline="true">
                                <el-col :span="2"  v-for="(item,index) in allSource" :key="index" class="noSel" v-bind:class='{yesSel:index==isactive}'>
                                    <img @click="getCSourceId(item.id,index)" style="width:58px;height:58px;border-radius:10px;" :src="item.cover" alt="item.name"/>
                                    <p>{{item.name}}</p>
                                </el-col>
                            </el-form>   
                        </el-row>
                    </el-form>
                </div>
                <div class="chbut" >
                    <el-button style="width:18%;" class="confirmbtn" @click="changeSource()" >确 定</el-button>
                    <el-button style="width:18%;" class="" @click="changechannelVisible=false" >返回</el-button>
                </div>
             </el-dialog>
             <!--支付宝余额充值选择充值的方式-->                                                                                                                                                                              
             <el-dialog width="465px" title="余额充值" :visible.sync="rechargebox" center :close="payDialogClose">
                <span>选择支付方式</span><br><br>
                <div v-show="!qrcodeValue">
                    <el-form style="padding-top:20px;">
                        <el-form-item>                      
                            <a href="javascript:" style="" class="payradiobox" :class="{selpayradiobox: selalipay }" @click="selPayType">
                                <input class="payradio" type="radio" id="one" value="alipay" v-model="pay_type">支付宝
                            </a>
                            <a href="javascript:" class="payradiobox" :class="{selwechatradiobox: selwechat }"  @click="selwechatTpye">
                               <input  class="payradio" type="radio"  id="two" value="wechat" v-model="pay_type">微信
                            </a>
                        </el-form-item>
                         <!-- <el-form-item> 
                            <el-button @click=" selectPay(index)" v-for="(item,index) in payList" :key="index" style="width:30%"  v-bind:class="{ 'Selbalancebtn': index==isactive}"  class="balancebtn tab"><i class="iconfont">&#xe653;</i>{{item}}</el-button>
                        </el-form-item> -->
                        <el-form-item >
                            <el-input v-model="OtherMoney" style="width:60%;" placeholder="请输入您要充值得金额"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="shelbtn3" style="margin-bottom:40px;margin-top:20px;">
                        <div class="paybtn3" style="margin-bottom:10px;"> <el-button @click="balancePay()" class="ispaybtn" style="width:40%" >立即支付</el-button><el-button style="width:40%" >取消</el-button></div>
                        <!-- <div class="paybtn3"> <el-button style="width:40%" >取消</el-button></div> -->
                    </div>
                </div>
                <div>
                    <qrcode-vue :value="qrcodeValue" :size="qrcodeSize" level="H" class="lifi-qr-code-img" v-show="qrcodeValue"></qrcode-vue>
                </div>
             </el-dialog>

             <!--余额支付密码填写-->
             <el-dialog width="465px" class="chlistbox" title="输入支付密码" :visible.sync="rechargebox_pay" center :close="rechargebox_pay" top="20%">
                <div id="payPwd">
                    <input ref="pwd" type="password" maxlength="6" v-model="pay_password"  style="position: absolute;margin-left: 100%;z-index: -1;opacity: 0;left:-100%;opacity: 0"/>
                    <ul class="pwd-wrap" @click="focus">
                        <li><i v-if="msgLength > 0"></i></li>
                        <li><i v-if="msgLength > 1"></i></li>
                        <li><i v-if="msgLength > 2"></i></li>
                        <li><i v-if="msgLength > 3"></i></li>
                        <li><i v-if="msgLength > 4"></i></li>
                        <li><i v-if="msgLength > 5"></i></li>
                    </ul>
                </div>
                <div>
                    <div class="shelbtn">
                        <div class="paybtn3" style="margin-bottom:10px;"> <el-button @click="balancePay()" class="ispaybtn" style="width:90%" >立即支付</el-button></div>
                        <div class="paybtn3"> <router-link to="/paycode"><el-button style="width:90%" >忘记密码</el-button></router-link></div>
                    </div>
                </div>
             </el-dialog>
             <!--未设置密码提醒-->
             <el-dialog width="465px" title="未设置支付密码" :visible.sync="setPassbox" center>
                 <div style="text-align:center"><p>您未设置支付密码，是否先去设置</p></div>
                  <div class="shelbtn">
                      <router-link to="/passset"><el-button  style="width:40%" class="confirmbtn" >去设置</el-button></router-link>
                      <el-button style="width:40%"  icon="##" @click="setPassbox=false" >返回</el-button>
                 </div>
             </el-dialog>

        </section>
    </div>
</template>
<script>
import axios from 'axios';
import { setTimeout, clearTimeout } from 'timers';
import QrcodeVue from 'qrcode.vue'
export default {
    inject:['reload'],
    data(){
        return{
            msg:'',
            pay_type: '',
            not_pay:false,
            setPassbox:false,
            rechargebox_pay:false,
            isactive:-1,
            selalipay:false,
            selwechat:false,
            rechargebox:false,
            recharge:false,
            editactivelog:false,
            paybox1:true,
            paybox2:false,
            paybox3:false,
            showtxt:false,
            is_flag:false,
            currentTab: 'BalancePay',
            options:[{
                value:'0',
                label:'开通中'
            },{
                value:'1',
                label:'已开通'
            },{
                value:'2',
                label:'失败'
            },{
                value:'3',
                label:'异常'
            }],
             options2:[{
                value2:'1',
                label:'自定义skill'
            },{
                value2:'2',
                label:'接口skill'
            }],
            payList:['余额','支付宝','微信'],
            value:'',
            value2:'',
            changechannelVisible:false,
            dialogTableVisible: false,
            payVisible:false,
            shelvesDialogVisible:false,
            refundDialogVisible:false,
            isShow:false,
            cateId:localStorage.getItem('cateId'),
            cateStatus:localStorage.getItem('cateStatus'),
            is_set:localStorage.getItem('is_set'),
            allSource:[{}],
            active:'',
            ids:[],
            getsectionList:[{}],
            curr:2,
            sourcePrice:'',
            data:'',//用户余额
            OtherMoney:'',
            qrcodeValue:'',
            qrcodeSize: 240,
            pay_password:'',
            // oldset_pay_password:[],
            // isDelete: false,
            // ipt: '',
            // // msg:'',
            msgLength:0,
            //分页
            page:1,
            total:0,
            current_page:'',
            last_page:'',
            per_page:'',
            // focus:''
        }
    },
    components:{
        QrcodeVue
    },
    // props: {
    //     id: String,
    //     default: 1
    // },
    mounted(){　　
        this.getsection();
    },
    created(){
        this.getAllSource();
        this.getbalance();
    },
    watch:{
        pay_password(curVal){
            if(/[^\d]/g.test(curVal)){
            this.pay_password = this.pay_password.replace(/[^\d]/g,'');
            }else{
                this.msgLength = curVal.length;
            }
        },
    },
    methods:{
        focus(){
            //alert('1214234324');
            this.$refs.pwd.focus();
           // alert('1214234324');
        },
        //选择支付方式
        selPayType(){
            this.selalipay = true;
            this.selwechat = false;
        },
        selwechatTpye(){
            this.selalipay = false;
            this.selwechat = true;
        },
        //判断栏目是否审核成功
        checkCateStatus(){
            if(this.cateStatus==2){
                this.dialogTableVisible = true
            }else{
                this.$message({
                    message:'当前栏目正在审核中',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }
        },

        //判断是否已经设置支付密码

        visiblebalancePay(){
            if(this.data<this.sourcePrice){
                this.$message({
                    message:'您目前余额不足，请先充值',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else{
                if(this.is_set==1){
                    this.payVisible = false;
                    this.rechargebox_pay = true;
                }else{
                    this.setPassbox = true;
                }  
            }
              
        },

        addchannelClick:function(){
            this.isShow = !this.isShow;
        },
        toggleTab:function(tab){
           this.currentTab = tab;
        },
        //获取全部渠道列表
        getAllSource(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/sources/manage/all',
                method:'post',
                data:{
                    id:this.cateId                                            
                }
            }).then(response=>{
                console.log('全部渠道列表',response);
                if(response.data.code==200){
                    this.allSource = response.data.data;
                    console.log('全部渠道列表',this.allSource);
                    //this.select = response
                   // console.log(this.allSource);
                }
            }).catch(err=>{
                console.log(err);
            })
        },

        //点击获取渠道的id
        getSourceId(id,index){
            //this.isactive=index;
            let idindex = this.ids.indexOf(id)
            if(idindex>=0){
                this.ids.splice(idindex,1)
            }else{
                this.ids.push(id);
                this.$set(this.ids);//添加样式和清楚样式
                console.log(this.ids);
            }

        },

        //点击添加样式


        //点击选取改变渠道id
        getCSourceId(id,index){
            this.isactive=index;
            this.target_id = id;
            console.log(this.target_id);
        },
        
        //开通渠道
        applySource(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/sources/manage/apply',
                method:'post',
                data:{
                   active:this.active,
                   ids:this.ids,
                   sid:this.cateId,
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.dialogTableVisible = false;
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
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

        //获取渠道信息
        getsection(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/sources/manage/section',
                method:'post',
                data:{
                    id:this.cateId,
                    status:this.status,
                    type:this.type,
                    list_rows:5,
                } 
            }).then(response=>{
                console.log('66666',response);
                if(response.data.code==200){
                    this.current_page = response.data.data.current_page;
                    this.last_page = response.data.data.last_page;
                    this.per_page = response.data.data.per_page;
                    this.total = response.data.data.total;
                    console.log('4545',this.total)
                    this.getsectionList = response.data.data.data;
                    console.log('++++++',this.getsectionList)
                    this.sourceId = response.data.data.data[0].id;
                    console.log('sourceId',this.sourceId)
                    this.sourcePrice = response.data.data.data[0].price;
                    this.sourceActive = response.data.data.data[0].active;
                    //console.log(this.sourceActive);
                }
            })
        },

       //进行分页,list_rows改变时
        handleSizeChange(val){
            this.list_rows = val;
            this.getsection();
         },

        //page改变时
        handleCurrentChange(val) {
            this.page = val;
            this.getsection();
        },

        //点击获取唤醒词
        getsourceActive(row){
            this.active = row.active;
            this.sourceId = row.id;
           // console.log(this.active);
            this.editactivelog=true;
        },
        //修改唤醒词
        editactive(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                },
                url:this.API+'/sources/manage/active',
                method:'post',
                data:{
                    id:this.sourceId,
                    active:this.active
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
                    this.editactivelog = false;
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

        //点击获取当前渠道的id
        handleClose(row){
           // console.log(row);
            this.sourceId = row.id;
            console.log('++++++1111',this.sourceId);
            this.shelvesDialogVisible = true;
        },
        //下架渠道
        closeSource(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token')
                }, 
                url:this.API+'/sources/manage/close',
                method:'post',
                data:{
                    id:this.sourceId,//渠道id
                } 
            }).then(response=>{
                if(response.data.code==200){
                    this.is_flag = true;
                    this.getsectionList.splice(this.sourceId, 1);
                    this.$message.success('下架成功');
                    this.shelvesDialogVisible = false;
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

        //点击选择支付方式
        selectPay(index){
            if(index==0){//余额
                this.paybox1 = true;
                this.paybox2 = false;
                this.paybox3 =false;
                this.isactive=index;
            }
            if(index==1){//支付宝
                this.paybox1 = false;
                this.paybox2 = true;
                this.paybox3 =false;
                this.pay_type = alipay;
                this.isactive=index;
            }
            if(index==2){//微信
                this.paybox1 = false;
                this.paybox2 = false;
                this.paybox3 =true;
                this.pay_type = wechat;
                this.isactive=index;
            }
        },
        //获取渠道费用
        handlePrice(row){
            this.sourceId = row.id;
            this.checkactive_status = row.active_status;
           // console.log( this.checkactive_status)
            //console.log(this.sourceId);
            if(this.checkactive_status==0||this.checkactive_status==2){
                this.$message({
                    message:'唤醒词通过之后才能支付',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else{
                this.payVisible = true;
            }
        },
        //充值弹框
        TomoreMoney(){
            this.rechargebox = true;
            this.payVisible = false;
        },
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
                   // console.log(this.data);
                }
            })
        },
        //变更渠道获取当前的渠道id
        handleChange(row){
            this.sourceId = row.id;
            this.active = row.active;
            console.log(this.sourceId);
            this.changechannelVisible = true;
        },
        //渠道变更
        changeSource(){
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token') 
                },
                url:this.API+'/sources/manage/change',
                method:'post',
                data:{
                    id:this.sourceId,
                    target_id:this.target_id,//变更的渠道id
                    active:this.active
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.$message({
                        message:response.data.msg,
                        type:'success',
                        center: true,
                        customClass:'user-defind-style'
                    })
                    this.changechannelVisible = false;
                }
            })
        },

        //选择状态

         //筛选
        selectStatus(value){
            this.status = value; 
           // this.type = value2;
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token') 
                },
                url:this.API+'/sources/manage/section',
                method:'post',
                data:{
                    id:this.cateId,
                    status:this.status,
                    type:this.type,
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){ 
                    this.getsectionList = response.data.data;
                    this.sourceId = response.data.data[0].id;
                    this.sourcePrice = response.data.data[0].price;
                    this.sourceActive = response.data.data[0].active;
                   // console.log(this.sourceActive);
                }else{

                }
            })
        },
        selectType(value2){
            // this.status = value; 
            this.type = value2;
            console.log(this.type);
            axios({
                headers:{
                    'auth-key': localStorage.getItem('token') 
                },
                url:this.API+'/sources/manage/section',
                method:'post',
                data:{
                    id:this.cateId,
                    status:this.status,
                    type:this.type,
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){ 
                    this.getsectionList = response.data.data;
                    this.sourceId = response.data.data[0].id;
                    this.sourcePrice = response.data.data[0].price;
                    this.sourceActive = response.data.data[0].active;
                   // console.log(this.sourceActive);
                }else{

                }
            })
        },

        //余额支付
        balancePay(){
           // let _this = this;
            if(this.data>0 && this.data >= this.sourcePrice){
                axios({
                    headers:{
                        'auth-key': localStorage.getItem('token') 
                    },
                    url:this.API+'/sources/manage/balance',
                    method:'post',
                    data:{
                        id:this.sourceId,
                        pay_password:this.pay_password,
                    }
                }).then(response=>{
                   console.log(response);
                    if(response.data.code==200){
                        this.$message({
                            message:response.data.msg,
                            type:'success',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        this.rechargebox_pay = false;
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
            }else{
                if(this.pay_type=='alipay'){
                    if(this.OtherMoney>0){
                        axios({
                            headers:{
                                'auth-key': localStorage.getItem('token') 
                            },
                            url:this.API+'/system/pay/recharge',
                            method:'post',
                            data:{
                                price:this.OtherMoney,
                                pay_type:this.pay_type
                            }
                        }).then(response=>{
                            console.log(response);
                            if(response.data.code==200){
                                this.order = response.data.data;
                                if(this.order){
                                    //创建订单成功,进行支付
                                    axios({
                                        headers:{
                                            'auth-key': localStorage.getItem('token') 
                                        },
                                        url:this.API+'/system/pay/alipay',
                                        method:'post',
                                        data:{
                                            order:this.order
                                        }
                                    }).then(response=>{
                                        console.log(response);
                                        if(response.data.code==200){
                                            this.qrcodeValue = response.data.data;
                                            if(this.qrcodeValue){
                                                //创建二维码成功
                                                this.checkorder();
                                            }else{
                                                this.$message({
                                                    message:response.data.msg,
                                                    type:'error',
                                                    center: true,
                                                    customClass:'user-defind-style'
                                                })
                                            }
                                        }

                                    }).catch(err=>{
                                        console.log(err);
                                    })

                                }else{
                                    this.$message({
                                        message:response.data.msg,
                                        type:'error',
                                        center: true,
                                        customClass:'user-defind-style'
                                    })
                                }
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                         console.log('请输入金额');
                    }
                }else if(this.pay_type=='wechat'){
                     if(this.OtherMoney>0){
                        axios({
                            headers:{
                                'auth-key': localStorage.getItem('token') 
                            },
                            url:this.API+'/system/pay/recharge',
                            method:'post',
                            data:{
                                price:this.OtherMoney,
                                pay_type:this.pay_type
                            }
                        }).then(response=>{
                            console.log(response);
                            if(response.data.code==200){
                                this.order = response.data.data;
                                if(this.order){
                                    //创建订单成功,进行支付
                                    axios({
                                        headers:{
                                            'auth-key': localStorage.getItem('token') 
                                        },
                                        url:this.API+'/system/pay/wxpayQr',
                                        method:'post',
                                        data:{
                                            order:this.order
                                        }
                                    }).then(response=>{
                                        console.log(response);
                                        if(response.data.code==200){
                                            this.qrcodeValue = response.data.data;
                                            if(this.qrcodeValue){
                                                //创建二维码成功
                                                this.checkorder();
                                            }else{
                                                this.$message({
                                                    message:response.data.msg,
                                                    type:'error',
                                                    center: true,
                                                    customClass:'user-defind-style'
                                                })
                                            }
                                        }

                                    }).catch(err=>{
                                        console.log(err);
                                    })

                                }else{
                                    this.$message({
                                        message:response.data.msg,
                                        type:'error',
                                        center: true,
                                        customClass:'user-defind-style'
                                    })
                                }
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                         console.log('请输入金额');
                    }
                }

            }
        },

        payDialogClose(){
            this.qrcodeValue = '';
        },

        //订单轮询
        checkorder(){
            //每秒发送一个请求
            //如果订单不存在则不发送请求
            if(this.qrcodeValue != ""){
                this.timeout = setTimeout(()=>{
                    axios({
                        headers:{
                            'auth-key': localStorage.getItem('token') 
                        },
                        url:this.API+'/system/pay/checkorder',
                        method:'post',
                        data:{
                            order:this.order
                        }
                    }).then(response=>{
                        console.log(response);
                        if(response.data.data == 0){
                            //等待付款
                            this.checkorder();
                            console.log('等待付款');
                        }
                        if(response.data.data == 1){
                            //支付成功
                            clearTimeout(this.timeout);
                            console.log('支付成功');
                            this.qrcodeValue = '';
                            this.$message({
                                message:response.data.msg,
                                type:'success',
                                center: true,
                                customClass:'user-defind-style'
                            })
                        }

                        if(response.data.data == 2){
                            //取消订单
                            clearTimeout(this.timeout);
                            console.log('取消订单');
                            this.qrcodeValue = '';
                            this.$message({
                                message:'该订单已经取消',
                                type:'error',
                                center: true,
                                customClass:'user-defind-style'
                            })
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                },1000)
            }else{
                clearTimeout(this.timeout);
            }
        },
   

    },
   
}
</script>
<style>
.payradiobox{
    width:60px;
    height:40px;
    line-height:40px;
    padding-left:15px;
    padding-right:15px;
    border:1px #18C26A solid;
    position: relative;
    text-decoration: none;
    color: #333;
    margin-right: 30px;
    display: block;
    float: left;
    text-align: center;
}
.selpayradiobox{
    width:60px;
    height:40px;
    line-height:40px;
    padding-left:15px;
    padding-right:15px;
    border:1px #18C26A solid;
    background: #18C26A;
    position: relative;
    text-decoration: none;
    color: #ffffff;
    margin-right: 30px;
    display: block;
    float: left;
    text-align: center;
}
.selwechatradiobox{
    width:60px;
    height:40px;
    line-height:40px;
    padding-left:15px;
    padding-right:15px;
    border:1px #18C26A solid;
    background: #18C26A;
    position: relative;
    text-decoration: none;
    color: #ffffff;
    margin-right: 30px;
    display: block;
    float: left;
    text-align: center;
}

.payradio{
    width: 60px;
    height: 40px;
    opacity: 0;
    position: absolute;
    top: -5px;
    left: 5px;
}
.channelbox-2 .paginationbox{
    width: 70%;
    text-align: center;
    position: absolute;
    bottom: 40px;
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
.channelbox-2{
    width:834px;
    height:700px;
    margin:40px;
    -webkit-border-radius:2px;
    border-radius: 2px;
    /* box-shadow: 0 0 5px #eaeaea; */
    padding:35px 35px 15px 35px;
    background: #ffffff;
    /* border:1px solid #eaeaea; */
    background-clip:padding-box;
}
.channelbox-2 .el-input__inner{
    height: 40px !important;
    line-height: 40px !important;
}
.rechargebtn span{
    font-size: 14px !important;
}

.channelbox-2 .el-dialog__body{
    padding:5px 20px;
}
.channelbox-2 .el-dialog__header{
    border-bottom: 1px #cccccc solid;
    margin-left: 20px;
    width: 95.5%;
    padding:20px 0px 10px;
}
.channelbox-2 .addlist .el-dialog__header{
    border-bottom: none;
}
.channelbox-2 .addlist .el-dialog__headerbtn .el-dialog__close {
    display: none;
}
.channelbox-2 .chbut{
    margin-bottom: 100px;
    margin-top: 40px;
    text-align: center;
}
.channelbox-2 .chtab{
    color: #cccccc
}
.channelbox-2 .pic-list{
    margin-top:20px;
    height: 300px;
    overflow :auto;
    /* filter:blur(1px) */

}
.channelbox-2 .pic-list::-webkit-scrollbar {
  width: 3px;
}
.channelbox-2 .pic-list::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #2852E1,#58BC9F, #67DB73);
}
.channelbox-2 .noSel{
    margin-bottom: 20px;
    height: 60px;
    width: 60px;
    /* border:1px #cccccc solid; */
    margin-left:15px;
    -webkit-box-shadow:0px 4px 4px #c8c8c8 ;
    -moz-box-shadow:0px 4px 4px #c8c8c8 ;
    box-shadow:0px 4px 4px #c8c8c8 ;
    border-radius: 10px;

}
 .noSel{
    margin-bottom: 20px;
    height: 60px;
    width: 60px;
    /* border:1px #cccccc solid; */
    margin-left:15px;
    -webkit-box-shadow:0px 4px 4px #c8c8c8 ;
    -moz-box-shadow:0px 4px 4px #c8c8c8 ;
    box-shadow:0px 4px 4px #c8c8c8 ;
    border-radius: 10px;
    border:1px #c8c8c8 solid;
}
 .yesSel{
    margin-bottom: 20px;
    height: 60px;
    width: 60px;
    /* border:1px #cccccc solid; */
    margin-left:15px;
    -webkit-box-shadow:0px 4px 4px #c8c8c8 ;
    -moz-box-shadow:0px 4px 4px #c8c8c8 ;
    box-shadow:0px 4px 4px #c8c8c8 ;
    border-radius: 10px;
    border:1px #18C26A solid;
}
.el-dialog--center .el-dialog__header {
    /* border-bottom: 1px #cccccc solid; */
    margin-left: 20px;
    width: 90%;
    padding:20px 0px 10px;
}
.paybox{
    height:400px;
}
.paybtn{
    text-align: center;
    margin-bottom: 10px;
}
.ispaybtn{
    background-color: #18C26A;
    color: #ffffff;
}
.ispaybtn:hover,.ispaybtn:focus{
     background-color: #18C26A;
    color: #ffffff;
}
.sheltag{
    margin-top: 40px;
    text-align: center;
}
.shelbtn{
    margin-top:40px;
    text-align: center;
    margin-bottom:40px;
}
.channeladdbtn{
    background-color: #2F5CED !important;
    border-color: #2F5CED !important;
    padding:8px 20px !important;
}
.el-table th {
    background-color: #f5f5f5;
}
.channel-action{
    color: #666666;
    padding-right: 10px;
}
.is-channel-action{
    color: #666666;
    padding-right: 10px;
}
.channel-out{
    color: #cccccc;
    padding-left:10px;
}
.channel-out:focus,.channel-out:hover{
    color: #cccccc;
    padding-left:10px;
}

.ischannel-out{
    color: #666666;
    padding-left:10px;
}
.ischannel-out:focus,.ischannel-out:hover{
    color: #666666;
    padding-left:10px;
}
.ischannel-active{
    color: #666666;
    padding-left:10px;
}
.ischannel-active:focus,.ischannel-active:hover{
    color: #666666;
    padding-left:10px;
}
.confirmbtn{
    background-color: #18C26A;
    color: #ffffff;
}
.balancebtn{

}
/* .balancebtn:focus{
    border: 1px #18C26A solid;
    background-color: #ffffff;
    color: #606266;
} */
.balancebtn:hover{
    background-color: #ffffff;
    color: #606266;
}
.Selbalancebtn{
    background-color: #18C26A;
    color: #ffffff;
}
.balancebox{
    text-align: center;
}
.balancebox .total-money{
    font-size: 16px;
    color: #FF6E40;
}
.balancebox .baltag{
    font-size: 16px;
    height: 10px;
}
.balancebox .all-money{
    color: #FF6E40;
    font-size: 36px;
    margin-bottom: 60px;
}
.balancebox span{
    font-size:20px;
}
.alipay img, .wechatpay img{
 height: 280px;
 width: 280px;
}
.el-select .el-input .el-select__caret {
    color: #c0c4cc;
    font-size: 14px;
    transition: transform .3s;
    transform: rotate(180deg);
    cursor: pointer;
    margin-left: 130px !important;
}

.speed{
	/* margin:0.5rem 0 1rem 0; */
   margin-top: 1px;
}

.speed .line {
    position: relative;
    /* z-index: 2; */
    width: 53%;
    height: 1px;
    margin: 0 10%;
    background-color: #cccccc;
}
.speed ul li{
	/* position: relative; */
	z-index: 5;
	float: left;
	width: 40px;
	text-align:center;
    list-style: none;
}
.speed ul li .dot{
	display: block;
	width: 6px;
	height: 6px;
	margin:-3px auto 0 auto;
	border-radius: 50%;
	background-color: #cccccc;
}
.speed ul li.curr .dot{
	background-color: #4BCB89;
}
/* .speed ul li.currerror .dot{
	background-color: #4BCB89;
} */
.speed ul li.curr p{
	font-weight: bold;
	color: #222;
}
.speed ul li.currerror .dot{
	background-color: #FE6C3F;
}
.speed ul li.currerror p{
	font-weight: bold;
	color: #222;
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
 /* .chlistbox .am_payPwd {
  display: inline-block;
  width: 310px;
  height: 30px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  padding: 10px 0;
  position: relative;
  margin-left: 50px;
  margin-top:40px;
  margin-bottom: 40px;

} */
 .chlistbox #payPwd .pwd-wrap{
    margin-top: 20px;
    width: 300px;
    height: 44px;
    padding-bottom: 1px;
    /* margin: 0 auto; */
    background: #fff;
    border:1px solid #ddd;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    cursor: pointer;
    margin-left: 50px;
    padding-inline-start: 0px;
    border-radius: 5px;
  }
  .chlistbox .pwd-wrap li{
    width: 40px;
    list-style-type:none;
    text-align: center;
    line-height: 25px;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    height: 25px;
    border-right:1px solid #ddd ;
    margin-top: 10px;
    /*border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd; */


  }
  .chlistbox  .pwd-wrap li:first-child{
    border-left: 0 ;
  }
  .chlistbox .pwd-wrap li:last-child{
    border-right:0;
  }
 .chlistbox .pwd-wrap li i{
    height: 5px;
    width: 5px;
    border-radius:50% ;
    background: #000;
    display: inline-block;
  }
/* .chlistbox .am_payPwd .shortInput {
    text-align: center;
    font-size: 20px;
    float: left;
    width: 50px;
    height: 20px;
    color: #333;
    border:none;
    margin-top: 5px;
    outline:none;
}
.chlistbox .am_payPwd .shortInput:focus{
    border:none;
}
.chlistbox .am_payPwd .shortInput:not(:last-child) {
    border-right: 1px solid #E5E5E5;
} */
.passing{
    color: #666666;
}
.pass{
    color: #cccccc;
}
</style>

