<template>
    <div class="step">

        <div class="userinfo101">
            <!-- 标题 -->
            <div class="fnTitle">
                <div class="title-text">我的账户</div>
            </div>
            <div class="bage-line"></div>
            <div class="underline"></div>
            <!-- 头像 -->
            <div @click="toggleShow" class="cutPhotoBtn">
                <img src="@/assets/image/tx.png">
                <my-upload field="img" @crop-success="cropSuccess" v-model="show" :width="100" :height="100" img-format="png" ></my-upload>
            </div>
            <div class="touxiang">
                <div  class="editPhoto"
                        v-loading="photoLoading"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">                    
                    <!-- <el-upload
                            class="avatar-uploaderinfo"
                            ref="upload" 
                            accept="image/jpeg,image/gif,image/png"
                            :show-file-list="false"
                            :action="actionUrl"
                            :on-success="uploadSuccess"
                            :before-upload="beforeUpload"
                            :on-remove="removeHandler"
                            :http-request="httpRequest">
                            <img src="@/assets/image/tx.png" class="avatar" style="opacity: 0.5; " v-show="bgPic" @mouseleave="leaveUpload">
                </el-upload>  -->
                    <img v-show="imageUrl" :src="imageUrl" class="avatar" @mouseenter="uploadPhoto">
                    <div class="img-text">{{ user_type == 1 ?'个人':'企业' }}</div>
                </div> 
            </div>
            <!-- 昵称 -->
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content nickName">
                            <!-- <img src="../../assets/image/65645561.png" style="position:absolute;top:10px;" v-if="this.user_type == 1">
                            <img src="../../assets/image/组 111.png" style="position:absolute;top:10px;" v-else> -->
                            <span style="font-width:600;margin-left:20px;">{{ userInfo.nickname }}</span>&nbsp;
                            <i class="iconfont icon-edit" style="cursor:pointer;font-size:14px;" @click="editUserName"></i>
                            <div :class="audit_status == 1?'zhuangtai2':audit_status == 2?'zhuangtai':'zhuangtai3' "  @click="toAuthInfo"> 
                                <i :class="audit_status==1 ?'iconfont icon-notpass-1-copy':audit_status==0 ?'iconfont icon-if_clock_':'iconfont icon-tongguo'"></i>
                                <span>{{audit_status == 0 ? "认证中...":((audit_status == 1) ? "认证失败":"认证成功")}}</span>
                            </div>
                           
                        </div>
                    </el-col>
                </el-row>
            </div>
            <!-- 修改用户名弹框 -->
            <el-dialog class="" width="520px" title="" :visible.sync="usereditDialogVisible" center :before-close="handleClose">
                <div class="fnTitle">
                    <div class="title-text">修改用户名</div>
                </div>
                <div class="bage-line" style="width:70px"></div>
                <div class="underline"></div>
                <el-form class="userform">
                    <el-form-item class="editInfo"> 
                        <div class="new" style="margin:20px;">
                            <span style="margin-left:60px;color: #7e7f80;margin-right:30px;">用户名</span>
                            <el-input class="user-form-input" v-model="nickname" placeholder="请输入新用户名" style="width:50.5%"></el-input>  
                        </div>
                    </el-form-item>
                </el-form>
                <div class="underline"></div>
                <div class="editInfoBtn">
                    <el-button class="backbtn" @click="colsePopWindows">取消</el-button>
                    <el-button @click="NickNameedit" class="successinfobtn">确认</el-button>
                </div>
            </el-dialog>
            <!-- 用户信息编辑 -->
            <div class="infoContain">
                <el-row :gutter="0">
                    <!-- 电话 -->
                    <el-col :span="4">
                        <div class="grid-content mobilePhone" style="cursor:pointer" @click="editMobilePhone">
                            <div class="infoContent">
                                <div class="phone-email-wechat">
                                    手机号
                                </div>
                                <div class="icon-yuan" :style="userInfo.phone==null ? 'background-color:#8D8E8F':'background-color:#07C160'">
                                    <i class="iconfont icon-shouji1" style="color:#fff;font-size:30px;"></i>
                                </div>
                                <p>{{ userInfo.phone }}</p> 

                                </div>
                            </div>
                    </el-col>
                    <!-- 修改手机弹框 -->
                    <el-dialog width="520px" title="" :visible.sync="teleditDialogVisible" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">换绑手机</div>
                        </div>
                        <div class="bage-line"></div>
                        <div class="underline"></div>
                        <el-form class="userform2">
                            <el-form-item>
                                <div class="old">
                                    <span style="margin-left:60px;color: #7e7f80; ">旧手机</span><div class="oldNumber">{{ userInfo.phone }}</div>
                                </div>
                                <div class="chack">
                                    <span style="margin-left:60px;color: #7e7f80;">验证码</span>
                                    <div class="removeBtnLeftCorners"></div>
                                    <el-input v-model="Telcaptcha"  class="codeinput" title="" placeholder="请输入验证码" style="width:282px;"  required></el-input>
                                    <!-- <el-button @click="codeTelBtn" style="width:16%;margin:0 -47px 0 0;"  v-bind:class="{ isemailcodesbtnone: isActiveemailone, noemailcodesbtnone: noActiveemailone }" :disabled="disemailone"><span>{{btnText}}</span></el-button> -->
                                    <el-button @click="codeTelBtn" class="yanzhengma"  v-bind:class="{ isTelcodesbtnone: isActivephoneone, noTelcodesbtnone: noActivephoneone }" :disabled="disPhoneone"><span>{{phoneBtnText}}</span></el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn">
                            <el-button @click="colsePopWindows" class="backbtn">取消</el-button>
                            <el-button class="successinfobtn" @click="rePhone">下一步</el-button>
                        </div>
                    </el-dialog>
                    <!-- 输入新手机号弹框 -->
                    <el-dialog width="520px" title="" :visible.sync="telnextVisible" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">换绑手机</div>
                        </div>
                        <div class="bage-line"></div>
                        <div class="underline"></div>
                        <el-form class="userform2">
                            <el-form-item> 
                                <div class="new">
                                    <span style="margin-left:60px;color: #7e7f80;">新号码</span>
                                    <div class="newNumber">
                                        <el-input v-model="new_phone" placeholder="请输入新的手机号" style="width:282px"></el-input>  
                                    </div>                                  
                                </div>
                            </el-form-item>
                            <div class="chack">
                                <span style="margin-left:60px;color: #7e7f80;">验证码</span>
                                <div class="removeBtnLeftCorners"></div>
                                <el-input v-model="new_phone_captcha" class="codeinput" title="" placeholder="请输入验证码" style="width:282px;"  required></el-input>
                                <el-button @click="CodeNewTel" class="yanzhengma" v-bind:class="{ isemailcodesbtnone: isActivephonetwo, noemailcodesbtnone: noActivephonetwo }" :disabled="disPhonetwo "><span>{{phoneBtnText}}</span></el-button>
                            </div>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn">
                            <el-button @click="colsePopWindows" class="backbtn">取消</el-button>
                            <el-button @click="setPhone" class="successinfobtn">绑定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 邮箱 -->
                    <el-col :span="4">
                        <div class="grid-content email" style="cursor:pointer" @click="bindEmail">
                            <div class="infoContent">
                                <div class="phone-email-wechat">
                                    邮箱
                                </div>
                                <div class="icon-yuan" :style="userInfo.my_email==null ? 'background-color:#8D8E8F':'background-color:#07C160'">
                                <i class="iconfont icon-youxiang2" style="color:#fff;font-size:30px;"></i>
                                </div>
                                <p v-if="userInfo.my_email==null" style="color:#7e7f80">未绑定</p>
                                <p v-else>{{ userInfo.my_email }}</p>

                                </div>
                            </div>
                    </el-col>
                    <!-- 绑定邮箱弹框 -->
                    <el-dialog width="520px" title="" :visible.sync="emailDialogVisible" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">绑定邮箱</div>
                        </div>
                        <div class="bage-line"></div>
                        <div class="underline"></div>
                        <el-form class="userform">
                            <el-form-item class="editEmail"> 
                                <div class="new">
                                    <span style="margin-left:60px;color: #7e7f80;">邮箱号</span>
                                    <!-- <el-input class="user-form-input" v-model="email" type="email"  :fetch-suggestions="appendEmailSuffix" :trigger-on-focus="false" placeholder="请输入新邮箱" style="width:50.5%"></el-input>   -->
                                    <div class="newNumber">
                                        <el-autocomplete
                                            class="user-form-inputemail2"
                                            v-model="email"
                                            :fetch-suggestions="appendEmailSuffix"
                                            :trigger-on-focus="false"
                                            placeholder="请输入新邮箱"
                                        ></el-autocomplete>
                                    </div>
                                </div>
                            </el-form-item>
                            <div class="chack">
                                    <span style="margin-left:60px;color: #7e7f80;">验证码</span>
                                    <div class="removeBtnLeftCorners"></div>
                                    <el-input class="codeinput" v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:282px;"></el-input>
                                    <el-button @click="sendEmail" class="emailyanzhengma" v-bind:class="{ isemailcodesbtnone: isActiveemailone, noemailcodesbtnone: noActiveemailone }"  :disabled="disemailone"><span>{{btnText}}</span></el-button>
                            </div>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn">
                            <el-button class="backbtn"  @click="colsePopWindows">取消</el-button>
                            <el-button @click="BandEmail"  class="successinfobtn">绑定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 修改邮箱弹框 -->
                    <el-dialog width="520px" title="" :visible.sync="changeemail" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">更换邮箱</div>
                        </div>
                        <div class="bage-line"></div>
                        <div class="underline"></div>
                        <el-form class="userform">
                            <el-form-item>
                                <div class="old">
                                        <span style="margin-left:60px;color: #7e7f80;">原邮箱</span><div class="oldNumber">{{ userInfo.my_email }}</div>
                                </div>
                                <div class="chack">
                                    <span style="margin-left:60px;color: #7e7f80;">验证码</span>
                                    <div class="removeBtnLeftCorners"></div>
                                    <el-input class="codeinput" v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:282px;"></el-input>
                                    <el-button @click="sendEmailVali" class="emailyanzhengma" v-bind:class="{ isemailcodesbtnone: isActiveemailone, noemailcodesbtnone: noActiveemailone }"  :disabled="disemailone"><span>{{btnText}}</span></el-button>
                            </div>
                            </el-form-item>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn">
                            <el-button class="backbtn" @click="colsePopWindows">取消</el-button>
                            <el-button @click="reEmail" class="successinfobtn">下一步</el-button>
                        </div>
                    </el-dialog>
                    <!--换绑邮箱的第二步-->
                    <el-dialog  width="520px" title="" :visible.sync="changeemail2" center :before-close="handleClose" @click="colsePopWindows">
                        <div class="fnTitle">
                            <div class="title-text">更换邮箱</div>
                        </div>
                        <div class="bage-line"></div>
                        <div class="underline"></div>
                        <el-form class="userform">
                            <el-form-item> 
                                <div class="new">
                                    <span style="margin-left:60px;color: #7e7f80;">新邮箱</span>
                                        <!-- <el-input class="user-form-input" v-model="new_email" autocomplete="on" placeholder="请输入新邮箱" style="width:50.5%"></el-input>   -->
                                        <div class="newNumber">
                                            <el-autocomplete
                                                class="user-form-inputemail2"
                                                v-model="new_email"
                                                :fetch-suggestions="appendEmailSuffix"
                                                :trigger-on-focus="false"
                                                placeholder="请输入新邮箱">
                                            </el-autocomplete>
                                        </div>
                                </div>
                            </el-form-item>
                            <div class="chack">
                                <span style="margin-left:60px;color: #7e7f80;">验证码</span>
                                <div class="removeBtnLeftCorners"></div>
                                <el-input class="codeinput" v-model="newcaptcha" title="" type="text" placeholder="请输入验证码" style="width:282px;"></el-input>
                                <el-button @click="sendEmail2" class="yanzhengma" v-bind:class="{ isemailcodesbtnone: isActiveemailtwo, noemailcodesbtnone: noActiveemailtwo }" :disabled="disemailtwo"><span>{{btnText}}</span></el-button>
                            </div>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn">
                            <el-button class="backbtn" @click="colsePopWindows">取消</el-button>
                            <el-button @click="reSconEmail" class="successinfobtn">绑定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 微信 -->
                    <el-col :span="4" v-if="false">
                        <div class="grid-content wechat" style="cursor:pointer" @click="editwechat">
                            <div class="infoContent">
                                <div class="phone-email-wechat">
                                    微信
                                </div>
                                <div class="icon-yuan" style="background-color:#8D8E8F">
                                <i class="iconfont icon-weixin5" style="color:#fff;font-size:30px;"></i>
                                </div>
                                <p style="color:#7e7f80">未绑定</p> 
                                </div>
                            </div>
                    </el-col>
                    <!-- 绑定微信 -->
                    <el-dialog width="520px" class="wechatbox" title="" :visible.sync="wechatDialogVisible" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">绑定微信</div>
                        </div>
                        <div class="bage-line"></div>
                        <div class="underline"></div>
                        <div class="wechatpic">
                            <!-- <img src="https://git.heard-gl.com/avatars/10?s=290"/> -->
                            <p style="color:#7e7f80;margin-left:80px;"> 该功能尚未开放！ </p>
                            <!-- <p>打&nbsp;开&nbsp;微&nbsp;信&nbsp;扫&nbsp;描&nbsp;上&nbsp;方&nbsp;二&nbsp;维&nbsp;码 </p> -->
                        </div>
                    </el-dialog>
                    <!-- 账号密码 -->
                    <el-col :span="4">
                        <div class="grid-content userPassWord" style="cursor:pointer" @click="jumpToPassSetPage">
                            <div class="infoContent">
                                <div class="password-paypassword">
                                    登录密码
                                </div>
                                <div class="icon-yuan" style="background-color:#07C160">
                                <i class="iconfont icon-mima" style="color:#fff;font-size:30px;"></i>
                                </div>
                                <p>***</p> 
                            </div>
                        </div>
                    </el-col>
                    <!-- 更换账号密码弹框 -->
                    <el-dialog class="" width="520px" title="" :visible.sync="passwordDialogVisible" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">修改密码</div>
                        </div>
                        <div class="bage-line1"></div>
                        <div class="underline"></div>
                        <el-form class="userform" style="height:200px;margin-bottom:45px;">
                            <el-form-item class="editInfo"> 
                                <div class="new" style="margin:20px;">
                                    <span style="margin-left:60px;margin-right: 30px;color: #7e7f80;">原密码</span>
                                    <el-input class="user-form-input" type="password" v-model="password"  style="width:50.5%" placeholder="请输入原密码"></el-input>  
                                </div>
                                <div class="new" style="margin:20px;">
                                    <span style="margin-left:60px;margin-right: 30px;color: #7e7f80;">新密码</span>
                                    <el-input class="user-form-input"  type="password" v-model="new_password"  style="width:50.5%"  placeholder="请输入新密码"></el-input>  
                                </div>
                                <div class="new" style="margin:5px;">
                                    <span style="margin-left:60px;margin-right: 30px;color: #7e7f80;">确认密码</span>
                                    <el-input class="user-form-input" type="password" v-model="new_password_confirm"  style="width:50.5%;magin-left:15px;" placeholder="请输入确认密码"></el-input>  
                                </div>
                            </el-form-item>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn1">
                            <el-button class="backbtn" style="width:92px" @click="YZedit">验证码修改</el-button>
                            <el-button class="backbtn" @click="colsePopWindows">取消</el-button>
                            <el-button @click="UserEdit" class="successinfobtn">确认</el-button>
                        </div>
                    </el-dialog>
                    <!-- 验证码修改弹框 -->
                    <el-dialog class="" width="520px" title="" :visible.sync="YZpasswordDialogVisible" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">修改密码</div>
                        </div>
                        <div class="bage-line1"></div>
                        <div class="underline"></div>
                        <el-form class="userform">
                            <el-form-item class="editInfo"> 
                                <div class="new" style="margin:20px;">
                                    <span style="margin-left:60px;color:#7e7f80 ">手机号</span><div class="oldNumber" style="margin-right:64px">{{ userInfo.phone }}</div>
                                </div>
                                <div class="chack">
                                    <span style="margin-left:80px;color: #7e7f80;">验证码</span>
                                    <div class="removeBtnLeftCorners"></div>
                                    <el-input class="codeinput3" v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:282px;" autocomplete="off" onfocus="this.type='text'" name="text"></el-input>
                                    <el-button @click="codeBtntion" class="yanzhengma1" style="margin-left:-100px;" v-bind:class="{ isemailcodesbtnone: isActive, noemailcodesbtnone: noActive }" :disabled="YZdisabled"><span>{{passBtnText}}</span></el-button>
                                </div>
                                <div class="new" style="margin:20px;">
                                    <span style="margin-left:60px;margin-right:29px;color: #7e7f80;">新密码</span>
                                    <el-input class="user-form-input"  type="password" v-model="set_password"  style="width:50.5%"  placeholder="请输入新密码" autocomplete="off" ></el-input>  
                                </div>
                                
                            </el-form-item>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn1">
                            <el-button class="backbtn" style="width:92px" @click="oldEdit">原密码修改</el-button>
                            <el-button class="backbtn" @click="colsePopWindows">取消</el-button>
                            <el-button @click="CodeEditPass" class="successinfobtn">确认</el-button>
                        </div>
                    </el-dialog>
                    <!-- 支付密码 -->
                    <el-col :span="4"> 
                        <div class="grid-content payPassWord" style="cursor:pointer" @click="jumpToPayPassWordSet">
                            <div class="infoContent">
                                <div class="password-paypassword">
                                    支付密码
                                </div>
                                <div class="icon-yuan" :style="userInfo.is_set==1? 'background-color:#07C160':'background-color:#8D8E8F'">
                                <i class="iconfont icon-mima" style="color:#fff;font-size:30px;"></i>
                                </div>
                                <p v-if="userInfo.is_set==0" style="color:#7e7f80">未设置</p>
                                <p v-else>***</p> 

                            </div>
                        </div>
                    </el-col>
                    <!-- 设置支付密码弹框 -->
                    <el-dialog class="" width="520px" title="" :visible.sync="nopaypasswordDialogVisible" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">设置支付密码</div>
                        </div>
                        <div class="bage-line1"></div>
                        <div class="underline"></div>
                        <el-form class="userform">
                            <el-form-item class="editPayPassWordInfo"> 
                                <div class="new" style="margin:20px;">
                                    <el-form-item label="支付密码" class="more1">
                                        <!-- <passwdboxthr></passwdboxthr> -->
                                        <div class="vue-pay-pwd">
                                            <input ref="pwd" type="tel" :style="{width:pwdWidth+200+'px','margin-left':20+'px'}" @focus="focus" @blur="blur" maxlength="6" v-model="set_payPassword" class="pwd" />
                                            <ul class="pwd-wrap" :style="{width:pwdWidth+'px'}">
                                                <li 
                                                v-for="(item,index) in pwdAry.length=6" 
                                                :key="index" 
                                                :style="{height:16+'px','line-height':16+'px','margin-top':11+'px','margin-bottom':11+'px'}"
                                                :class="set_payPassword.length == index ? set_isBour && isCursor  ? 'psd-blink': '' :''">
                                                <i v-if="set_payPassword.length > index"></i>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <!-- <div id="payPwd">
                                            <input ref="pwd1" type="password" maxlength="6" v-model="set_payPassword"  style="position: absolute;margin-left: 108%;width:282px;height:42px;left:-100%;opacity: 0"/>
                                            <ul class="pwd-wrap">
                                                <li><i v-if="msgLength4 > 0"></i></li>
                                                <li><i v-if="msgLength4 > 1"></i></li>
                                                <li><i v-if="msgLength4 > 2"></i></li>
                                                <li><i v-if="msgLength4 > 3"></i></li>
                                                <li><i v-if="msgLength4 > 4"></i></li>
                                                <li><i v-if="msgLength4 > 5"></i></li>
                                            </ul>
                                        </div> -->
                                    </el-form-item>
                                    <el-form-item label="再次输入" class="more2">
                                        <div class="vue-pay-pwd">
                                            <input ref="pwd" type="tel" :style="{width:pwdWidth+200+'px','margin-left':20+'px'}" @focus="focus1" @blur="blur1" maxlength="6" v-model="set_payPassword_confirm" class="pwd" />
                                            <ul class="pwd-wrap" :style="{width:pwdWidth+'px'}">
                                                <li 
                                                v-for="(item,index) in pwdAry.length=6" 
                                                :key="index" 
                                                :style="{height:16+'px','line-height':16+'px','margin-top':11+'px','margin-bottom':11+'px'}"
                                                :class="set_payPassword_confirm.length == index ? agine_isBour && isCursor  ? 'psd-blink': '' :''">
                                                <i v-if="set_payPassword_confirm.length > index"></i>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <!-- <passwdbox></passwdbox> -->
                                        <!-- <div id="payPwd">
                                            <input ref="pwd2" type="password" maxlength="6" v-model="set_payPassword_confirm"  style="position: absolute;margin-left: 108%;width:282px;height:42px;left:-100%;opacity: 0"/>
                                            <ul class="pwd-wrap">
                                                <li><i v-if="msgLength5 > 0"></i></li>
                                                <li><i v-if="msgLength5 > 1"></i></li>
                                                <li><i v-if="msgLength5 > 2"></i></li>
                                                <li><i v-if="msgLength5 > 3"></i></li>
                                                <li><i v-if="msgLength5 > 4"></i></li>
                                                <li><i v-if="msgLength5 > 5"></i></li>
                                            </ul>
                                        </div> -->
                                    </el-form-item>
                                </div>    
                            </el-form-item>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn">
                            <el-button class="backbtn" @click="colsePopWindows">取消</el-button>
                            <el-button @click="SetpayPass" class="successinfobtn">确认</el-button>
                        </div>
                    </el-dialog>
                    <!-- 更换支付密码弹框 -->
                    <el-dialog class="" width="520px" title="" :visible.sync="paypasswordDialogVisible" center   :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">修改支付密码</div>
                        </div>
                        <div class="bage-line1" style="width:87px;"></div>
                        <div class="underline"></div>
                        <el-form class="userform">
                            <el-form-item class="editPayPassWordInfo"> 
                                <div class="new" style="margin:20px;">
                                    <el-form-item label="原密码" class="more1">
                                        <div class="vue-pay-pwd">
                                            <input ref="pwd" type="tel" :style="{width:pwdWidth+200+'px','margin-left':20+'px'}" @focus="focus" @blur="blur" maxlength="6" v-model="pay_password" class="pwd" />
                                            <ul class="pwd-wrap" :style="{width:pwdWidth+20+'px'}">
                                                <li 
                                                v-for="(item,index) in pwdAry.length=6" 
                                                :key="index" 
                                                :style="{height:16+'px','line-height':16+'px','margin-top':11+'px','margin-bottom':11+'px'}"
                                                :class="pay_password.length == index ? set_isBour && isCursor  ? 'psd-blink': '' :''">
                                                <i v-if="pay_password.length > index"></i>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <!-- <passwdboxthr></passwdboxthr> -->
                                        <!-- <div id="payPwd">
                                            <input ref="pwd" type="password" maxlength="6" v-model="pay_password"  style="position: absolute;margin-left: 108%;width:282px;height:42px;left:-100%;opacity: 0"/>
                                            <ul class="pwd-wrap" @click="focus">
                                                <li><i v-if="msgLength > 0"></i></li>
                                                <li><i v-if="msgLength > 1"></i></li>
                                                <li><i v-if="msgLength > 2"></i></li>
                                                <li><i v-if="msgLength > 3"></i></li>
                                                <li><i v-if="msgLength > 4"></i></li>
                                                <li><i v-if="msgLength > 5"></i></li>
                                            </ul>
                                        </div> -->
                                    </el-form-item>
                                    <el-form-item label="新密码" class="more2">
                                        <div class="vue-pay-pwd">
                                            <input ref="pwd" type="tel" :style="{width:pwdWidth+200+'px','margin-left':20+'px'}" @focus="focus2" @blur="blur2" maxlength="6" v-model="new_payPassword" class="pwd" />
                                            <ul class="pwd-wrap" :style="{width:pwdWidth+20+'px'}">
                                                <li 
                                                v-for="(item,index) in pwdAry.length=6" 
                                                :key="index" 
                                                :style="{height:16+'px','line-height':16+'px','margin-top':11+'px','margin-bottom':11+'px'}"
                                                :class="new_payPassword.length == index ? re_isBour && isCursor  ? 'psd-blink': '' :''">
                                                <i v-if="new_payPassword.length > index"></i>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <!-- <passwdbox></passwdbox> -->
                                        <!-- <div id="payPwd">
                                            <input ref="pwd3" type="password" maxlength="6" v-model="new_payPassword"  style="position: absolute;margin-left: 108%;width:282px;height:42px;left:-100%;opacity: 0"/>
                                            <ul class="pwd-wrap" @click="focus">
                                                <li><i v-if="msgLength1 > 0"></i></li>
                                                <li><i v-if="msgLength1 > 1"></i></li>
                                                <li><i v-if="msgLength1 > 2"></i></li>
                                                <li><i v-if="msgLength1 > 3"></i></li>
                                                <li><i v-if="msgLength1 > 4"></i></li>
                                                <li><i v-if="msgLength1 > 5"></i></li>
                                            </ul>
                                        </div> -->
                                    </el-form-item>
                                    <el-form-item label="再次输入" class="more">
                                        <div class="vue-pay-pwd">
                                            <input ref="pwd" type="tel" :style="{width:pwdWidth+200+'px','margin-left':20+'px'}" @focus="focus1" @blur="blur1" maxlength="6" v-model="new_payPassword_confirm" class="pwd" />
                                            <ul class="pwd-wrap" :style="{width:pwdWidth+20+'px'}">
                                                <li 
                                                v-for="(item,index) in pwdAry.length=6" 
                                                :key="index" 
                                                :style="{height:16+'px','line-height':16+'px','margin-top':11+'px','margin-bottom':11+'px'}"
                                                :class="new_payPassword_confirm.length == index ? agine_isBour && isCursor  ? 'psd-blink': '' :''">
                                                <i v-if="new_payPassword_confirm.length > index"></i>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <!-- <div id="payPwd">
                                            <input ref="pwd4" type="password" maxlength="6" v-model="new_payPassword_confirm"  style="position: absolute;margin-left: 108%;width:282px;height:42px;left:-100%;opacity: 0"/>
                                            <ul class="pwd-wrap" @click="focus">
                                                <li><i v-if="msgLength2 > 0"></i></li>
                                                <li><i v-if="msgLength2 > 1"></i></li>
                                                <li><i v-if="msgLength2 > 2"></i></li>
                                                <li><i v-if="msgLength2 > 3"></i></li>
                                                <li><i v-if="msgLength2 > 4"></i></li>
                                                <li><i v-if="msgLength2 > 5"></i></li>
                                            </ul>
                                        </div> -->
                                    </el-form-item>
                                </div>    
                            </el-form-item>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn1">
                            <el-button class="backbtn" style="width:92px" @click="YZpaypwdedit">验证码修改</el-button>
                            <el-button class="backbtn" @click="colsePopWindows">取消</el-button>
                            <el-button @click="RepayPass" class="successinfobtn">确认</el-button>
                        </div>
                    </el-dialog>
                    <!-- 支付密码验证码修改 -->
                    <el-dialog class="" width="520px" title="" :visible.sync="YZpaypasswordDialogVisible" center :before-close="handleClose">
                        <div class="fnTitle">
                            <div class="title-text">修改支付密码</div>
                        </div>
                        <div class="bage-line1" style="width:87px;"></div>
                        <div class="underline"></div>
                        <el-form class="userform">
                            <el-form-item class="editInfo"> 
                                <div class="new" style="margin:20px;">
                                    <span style="margin-left:60px;color:#7e7f80">手机号</span><div class="oldNumber" style="margin-right:64px">{{ userInfo.phone }}</div>
                                </div>
                                <div class="chack">
                                    <span style="margin-left:80px;color:#7e7f80">验证码</span>
                                    <div class="removeBtnLeftCorners"></div>
                                    <el-input class="codeinput2" v-model="captcha" title="" type="text" placeholder="请输入验证码" style="width:282px;" autocomplete="off"></el-input>
                                    <el-button @click="codeBtnPaytion" class="yanzhengma1" v-bind:class="{ isemailcodesbtnone: isActive, noemailcodesbtnone: noActive }" :disabled="YZdisabled"><span>{{YZpassBtnText}}</span></el-button>
                                </div>
                                <el-form-item label="新密码" class="more3">
                                    <div class="vue-pay-pwd">
                                        <input ref="pwd" type="tel" :style="{width:pwdWidth+200+'px','margin-left':20+'px'}" @focus="focus" @blur="blur" maxlength="6" v-model="set_pay_password" class="pwd" />
                                        <ul class="pwd-wrap" :style="{width:pwdWidth+20+'px'}">
                                            <li 
                                            v-for="(item,index) in pwdAry.length=6" 
                                            :key="index" 
                                            :style="{height:16+'px','line-height':16+'px','margin-top':11+'px','margin-bottom':11+'px'}"
                                            :class="set_pay_password.length == index ? set_isBour && isCursor  ? 'psd-blink': '' :''">
                                            <i v-if="set_pay_password.length > index"></i>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                        <!-- <passwdbox></passwdbox> -->
                                        <!-- <div id="payPwd">
                                            <input ref="pwd5" type="password" maxlength="6" v-model="set_pay_password"  style="position: absolute;margin-left: 130%;width:282px;height:42px;left:-100%;opacity: 0"/>
                                            <ul class="pwd-wrap" @click="focus">
                                                <li><i v-if="msgLength3 > 0"></i></li>
                                                <li><i v-if="msgLength3 > 1"></i></li>
                                                <li><i v-if="msgLength3 > 2"></i></li>
                                                <li><i v-if="msgLength3 > 3"></i></li>
                                                <li><i v-if="msgLength3 > 4"></i></li>
                                                <li><i v-if="msgLength3 > 5"></i></li>
                                            </ul>
                                        </div> -->
                                </el-form-item>
                                
                            </el-form-item>
                        </el-form>
                        <div class="underline"></div>
                        <div class="editInfoBtn1">
                            <el-button class="backbtn" style="width:92px" @click="oldpaytEdit">原密码修改</el-button>
                            <el-button class="backbtn" @click="colsePopWindows">取消</el-button>
                            <el-button @click="CodeEditPayPass" class="successinfobtn">确认</el-button>
                        </div>
                    </el-dialog>
                </el-row>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import myUpload from "vue-image-crop-upload";
import { throws } from 'assert';
import { userInfo } from 'os';
// import userinfo from '@/views/percenter/UserInfo' ;
  export default {
    inject:['reload'],
    name: 'vue-pay-pwd',
    components: {},
    props:{
        getPassword: {
            type: Function,
            default: function(){
                console.log("请传入获取密码的函数")
            }
        },
        isCursor:{
        type:Boolean,
        default:true
        },
        pwdWidth:{
        type: Number,
        default:260
        },
        pwdHeight:{
        type: Number,
        default:36
        },
    },
    data() {
      return {
            photoLoading:false,
            user_type:'',
            acter:'',
            show: false,
            set_isBour:false,
            agine_isBour:false,
            re_isBour:false,
            pwdAry:[],
            set_payPassword:'',
            set_payPassword_confirm:'',
            set_pay_password:'',
            phone:'',
            set_password:'',
            oldset_password:'',
            YZdisabled: false,
            passBtnText:'获取验证码',
            YZpassBtnText:'获取验证码',
            captcha:'',
            isActive: false,
            noActive: true,
            new_payPassword_confirm:[],
            new_payPassword:[],
            oldPwdList: [],
            oldPwdList2: [],
            oldPwdList3:[],
            isDelete: false,
            ipt: '',
            ipt2:'',
            ipt3:'',
            yanzhengma1:true,
            msg:'',
            msgLength:0,
            msgLength1:0,
            msgLength2:0,
            msgLength3 :0,
            msgLength4 :0,
            msgLength5 :0,
            password:'',
            new_password:'',
            new_password_confirm:'',
            bgPic:false,
            audit_status:'',
            activeNames: ['1'],
            imageUrl: '',
            fileList: [],
            actionUrl:this.API+'/system/upload/qiniu',
            fileReader: '',
            YZpaypasswordDialogVisible:false,
            YZpasswordDialogVisible:false,
            nopaypasswordDialogVisible:false,
            passwordDialogVisible:false,
            paypasswordDialogVisible:false,
            usereditDialogVisible:false,
            emailDialogVisible:false,
            changeemail:false,
            changeemail2:false,
            wechatDialogVisible:false,
            teleditDialogVisible:false,
            telnextVisible:false,
            notbinding:false,
            notbindingwe:true,
            nickname:'',
            userInfo:{},
            pay_password:'',
            email:'',
            myemail:'',
            new_email:'',
            Telcaptcha:'',
            captcha:'',
            newcaptcha:'',
            new_phone_captcha:'',
            new_phone:'',
            disPhoneone:false,
            disPhonetwo:false,
            disemailone:false,
            disemailtwo:false,
            disabled:false,
            phoneBtnText:'获取验证码',
            phoneSendbtnText:'发送验证码',
            btnText:'获取验证码',
            sendbtnText:'发送验证码',
            isActivephoneone:false,
            noActivephoneone:true,
            isActivephonetwo:false,
            noActivephonetwo:true,
            isActiveemailone:false,
            noActiveemailone:true,
            isActiveemailtwo:false,
            noActiveemailtwo:true,
            oldNickname:'',
            emailSuffix: [
                '@qq.com',
                '@yahoo.com',
                '@163.com',
                '@126.com',
                '@gmail.com',
                '@foxmail.com',
                '@sina.com',
                '@sina.cn',
                '@sohu.com',
                '@tom.com',
                '@139.com',
                '@188.com',
            ]
        };
    },
    components: {
       "my-upload": myUpload
    },
    created(){
        this.getSetUserInfo();
        this.getUserInfo()
    },

    methods: {
        
        //支付密码框光标显示
        focus(){
            // this.$refs.pwd.focus(); 
            this.set_isBour =true

        },
        focus1(){
            // this.$refs.pwd3.focus();
            this.agine_isBour = true
        },
        focus2(){
            // this.$refs.pwd4.focus();
            this.re_isBour = true
        },
        blur1(){
            this.agine_isBour = false
        },
        blur2(){
            this.re_isBour = false
        },
        // focus5() {
        //       this.isBour = true
        //       // this.$refs.pwd.focus();
        //     },
        blur(){
            this.set_isBour = false
        },
        //验证码修改密码
        CodeEditPass(){
            axios({
                url:this.API+'/user/password/setPassword',
                method:'post',
                data:{
                    // phone:this.phone,
                    captcha:this.captcha,
                    set_password:this.set_password
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
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
                    this.reload()
                    this.YZpasswordDialogVisible = false;
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            }).catch(err=>{
                this.$message({
                    message:response.data.msg,
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                console.log(err);
            })

        },
        //点击获取验证码
        codeBtntion:function(){
            this.passBtnText = '发送中'
            this.disabled = true
            this.isActive = true
            this.noActive = false
             //发送请求
            axios({
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                url: this.API+'/user/password/sms',
                method:'post',
                data:{
                    // phone:this.phone,
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.time = 60;
                    this.passtimer();
                    console.log('success');
                }else{
                    this.passBtnText = '获取验证码'
                    this.disabled = false
                    this.isActive= false;
                    this.noActive = true;
                    this.$message({
                        
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            })
        },
        //验证码倒计时60秒
        passtimer:function(){
            if(this.time>0){
                this.time--;
                // console.log(this.time);
                this.passBtnText = this.time+"s后重新获取";
                this.isActive = true;
                this.noActive = false;
                setTimeout(this.passtimer,1000);
            }else{
                this.time = 0;
                this.passBtnText = '获取验证码';
                this.disabled = false;
                this.isActive = false;
                this.noActive = true;
            }
        },
        appendEmailSuffix (queryString, cb) {
            if (queryString.indexOf('@') !== -1) {
            return cb([])
            }
            let triggerList = []
            for (let i = 0; i < this.emailSuffix.length; i++) {
            triggerList.push({value: queryString + this.emailSuffix[i]})
            }
            cb(triggerList)
        },
        //获取用户设置信息
        getSetUserInfo(){
                axios({
                    url:this.API+'/user/user/getSetInfo',
                    method:'post',
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    console.log(response);
                    // console.log(response.data.data);
                    if(response.data.code==200){
                        this.userInfo = response.data.data;
                        // console.log('5454',this.userInfo)
                        this.myemail = response.data.data.my_email
                        this.oldNickname = response.data.data.nickname
                        // this.localStorage.setItem('oldNickname',this.oldNickname)
                        this.phone = response.data.data.phone;
                        // console.log('1111',this.phone)
                        this.imageUrl = response.data.data.head_image;
                        this.email = response.data.data.email;
                        if(this.imageUrl==null){
                            this.imageUrl = require('../../assets/image/moren.png')
                        }
                        console.log(this.imageUrl);
                        localStorage.setItem('imageUrl',this.imageUrl)
                    }else{
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
        //获取用户认证信息
        getUserInfo(){
            axios({
                url:this.API+'/user/user/getUserInfo',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log('23123123',response);
                if(response.data.code == 200){
                this.getuserinfo = response.data.data;
                this.user_type = response.data.data.user_type;
                this.audit_status = response.data.data.audit_status;
                console.log('2232',this.audit_status)
                this.useraudit_status = localStorage.setItem('useraudit_status',this.audit_status);
                //console.log( this.audit_status);
                // this.imageUrl = response.data.data.business_license_path;
                // console.log('sdasa',this.imageUrl)
                this.imageUrl_front = response.data.data.card_positive_path;
                this.imageUrl_back = response.data.data.card_reverse_path;}
                
            }).catch(err=>{
                console.log(err);
            })
        },
        //原密码修改密码
        UserEdit(){
            if(this.new_password != this.new_password_confirm){
                this.$message({
                    message:'两次密码不一致',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else axios({
                    url:this.API+'/user/password/rePassword',
                    method:'post',
                    data:{
                        password:this.password,
                        new_password:this.new_password,
                        new_password_confirm:this.new_password_confirm,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.$message({
                            message:response.data.msg,
                            type:'success',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                        this.reload()
                        this.passwordDialogVisible = false
                    }else{
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
        },
        //修改昵称弹框
        editUserName(){
            // this.nickname = this.localStorage.getItem('oldNickname')
            if(this.nickname == ''){
                this.nickname = this.oldNickname
            }
            this.usereditDialogVisible =true;
        },
        //修改手机弹框
        editMobilePhone(){
            this.teleditDialogVisible = true;
        },
        //绑定邮箱弹框
        bindEmail(){
            if(this.userInfo.my_email == null){
                this.emailDialogVisible = true;
            }else{
                this.changeemail = true;
            }
        },
        //修改用户昵称       
        NickNameedit(){
            var regtel =/^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
            if(this.nickname == this.oldNickname){
                this.usereditDialogVisible = false
            }else if(this.nickname == ''){
                this.$message({
                    message:('请输入用户名'),
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'})
            }else if(!regtel.test(this.nickname) || this.nickname.length < 2 || this.nickname.length > 10){
                this.$message({
                    message:('用户名应由2-10位英文、数字、汉字组成'),
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'})
            }else axios({
                    url:this.API+'/user/bind/reName',
                    method:'post',
                    data:{
                        nickname:this.nickname,
                        type:4,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.$message({
                        message:response.data.msg,
                        type:'success',
                        duration:1000,
                        center: true,
                        customClass:'user-defind-style'
                        })
                        this.reload()
                        this.usereditDialogVisible=false;
                    }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        duration:1000,
                        customClass:'user-defind-style'
                        })
                    }
                }).catch(error=>{
                    console.log(error);
            })
        },
        //修改用户手机号第一步
        codeTelBtn:function(){              
                    this.phoneBtnText = '发送中'
                    this.disPhoneone = true;
                    this.isActivephoneone = true;
                    this.noActivephoneone = false;
                    //发送请求
                    axios({
                        url:this.API+'/user/bind/firsStepSms',
                        method:'post',
                        headers: {
                            'auth-key': localStorage.getItem('token')
                        },
                        data:{
                            // phone : this.phone,
                            // is_check:0
                        }
                    }).then(response=>{
                        if(response.data.code==200){
                            console.log('success')
                            this.time = 60;
                            // this.disPhoneone = true;
                            this.phonetimer();
                        }else{
                            this.phoneBtnText = '获取验证码'
                            this.disPhoneone = false;
                            this.isActivephoneone = false;
                            this.noActivephoneone = true;
                            this.$message({
                                message:response.data.msg,
                                type:'error',
                                center: true,
                                customClass:'user-defind-style'
                            })
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                
                
            },
        //验证码倒计时60秒
        phonetimer:function(){
            if(this.time>0){
                this.time--;
                // console.log(this.time);
                this.phoneBtnText = this.time+"s后重新获取";
                this.isActivephoneone = true;
                this.noActivephoneone = false;
                setTimeout(this.phonetimer,1000);
            }else{
                this.time = 0;
                this.phoneBtnText = '获取验证码';
                this.disabled = false;
                this.isActivephoneone = false;
                this.noActivephoneone = true;
            }
        },

        //验证手机号
        rePhone(){
            if(this.Telcaptcha == ''){
                this.$message({
                    message:'请输入验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else if(this.Telcaptcha.length != 6){
                this.$message({
                    message:'请输入正确的验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else
            axios({
                url:this.API+'/user/bind/rePhone',
                method:'post',
                data:{
                    // phone:this.phone,
                    captcha:this.Telcaptcha,
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.telnextVisible=true,
                    this.teleditDialogVisible = false,
                    this.time = 0;
                }else{
                        this.$message({
                        message:response.data.msg,
                        type:'error',
                        duration:1000,
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        //点击获取新号码的验证码
        CodeNewTel:function(){
            var regtel =/^1[345789]{1}\d{9}$/;
            if(this.new_phone==""){
                    this.$message({
                    message:'请填写手机号码',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                    return;
            }else if(!regtel.test(this.new_phone)){
                this.$message({
                    message:'请填写正确的手机格式',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                
                return;
            }else{
                this.phoneBtnText = '发送中'
                this.disPhoneone = true;
                this.isActivephonetwo = true;
                this.noActivephonetwo = false;
                //发送请求
                axios({
                    url:this.API+'/user/bind/SecondStepSms',
                    method:'post',
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    },
                    data:{
                        new_phone:this.new_phone,
                        // is_check:1
                    }
                }).then(response=>{
                    
                    if(response.data.code==200){
                        //console.log('success')
                        this.times = 60;
                        this.phonetimers();
                    }else{
                        this.times = 0;
                        this.phoneBtnText = '获取验证码' 
                        this.disabled = false;
                        this.isActivephonetwo = false;
                        this.noActivephonetwo = true;
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })

                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        phonetimers:function(){
                if(this.times>0){
                    this.times--;
                    // console.log(this.time);
                    this.phoneBtnText = this.times+"s后重新获取";
                    // this.isActivephonetwo = true;
                    // this.noActivephonetwo = false;
                    setTimeout(this.phonetimers,1000);
                }else{
                    this.times = 0;
                    this.phoneBtnText = '获取验证码';
                    this.disabled = false;
                    this.isActivephonetwo = false;
                    this.noActivephonetwo = true;
                }
            },
        //重新绑定手机号
        setPhone(){
            if(this.new_phone_captcha == ''){
                this.$message({
                    message:'请输入验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else if(this.new_phone_captcha.length != 6){
                this.$message({
                    message:'请输入正确的验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else axios({
                    url:this.API+'/user/bind/setPhone',
                    method:'post',
                    data:{
                        new_phone:this.new_phone,
                        captcha:this.new_phone_captcha,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    // console.log(response);
                    if(response.data.code==200){
                        this.$message({
                            message:response.data.msg,
                            type:'success',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                        this.reload();
                        this.telnextVisible=false;
                    }else{
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch(error=>{
                    console.log(error);
                })
        },
        //绑定邮箱
        BandEmail(){
            if(this.captcha == ''){
                this.$message({
                    message:'请输入验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else if(this.captcha.length != 6){
                this.$message({
                    message:'请输入正确的验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else axios({
                    url:this.API+'/user/bind/email',
                    method:'post',
                    data:{
                        email:this.email,
                        type:2,
                        captcha:this.captcha
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
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
                        this.reload()
                        this.notbinding=false,
                        this.emailDialogVisible=false;
                    }else{
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
            },

        //验证邮箱第一步
        reEmail(){
            if(this.captcha == ''){
                this.$message({
                    message:'请输入验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else if(this.captcha.length != 6){
                this.$message({
                    message:'请输入正确的验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
                }else axios({
                        url:this.API+'/user/bind/reEmail',
                        method:'post',
                        data:{
                            // email:this.email,
                            captcha:this.captcha
                        },
                        headers: {
                            'auth-key': localStorage.getItem('token')
                        }
                    }).then(response=>{
                        console.log(response);
                        if(response.data.code==200){
                            this.changeemail = false;
                            this.changeemail2 = true;
                            this.time = 0;
                        }else{
                            this.$message({
                                message:response.data.msg,
                                type:'error',
                                center: true,
                                customClass:'user-defind-style'
                            })
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
        },

        //换绑邮箱第二步
        reSconEmail(){
            if(this.newcaptcha == ''){
                this.$message({
                    message:'请输入验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
            }else if(this.newcaptcha.length != 6){
                this.$message({
                    message:'请输入正确的验证码',
                    type:'error',
                    duration:1000,
                    center:true,
                    customClass:'user-defind-style'
                })
                }else axios({
                            url:this.API+'/user/bind/setEmail',
                            method:'post',
                            data:{
                                new_email:this.new_email,
                                captcha:this.newcaptcha
                            },
                            headers: {
                                'auth-key': localStorage.getItem('token')
                            }
                            }).then(response=>{
                            if(response.data.code==200){
                                this.$message({
                                    message:response.data.msg,
                                    type:'success',
                                    center: true,
                                    customClass:'user-defind-style'
                                })
                                this.changeemail2 = false;
                                this.reload();
                                this.times = 0;
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
        //首次绑定邮箱发送验证码
        sendEmail(){
            var regemai =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(this.email==""){
                    this.$message({
                    message:'请输入邮箱',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else if(!regemai.test(this.email)){
                    this.$message({
                    message:'请输入正确的邮箱',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                this.btnText = '发送中'
                this.disemailone = true;
                this.isActiveemailone = true;
                this.noActiveemailone = false
                axios({   
                    url:this.API+'/user/bind/sendEmail',
                    method:'post',
                    data:{
                        email:this.email,
                        is_check:1,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    //console.log(response);
                    if(response.data.code==200){
                        console.log('success')
                        this.time = 60;
                        this.timer();
                    }else{
                        this.btnText = '获取验证码'
                        this.disemailone = false;
                        this.isActiveemailone= false,
                        this.noActiveemailone = true
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
            
            
        },
        //换绑邮箱发送原邮箱验证码
        sendEmailVali(){
                this.btnText = '发送中'
                this.disemailone = true;
                this.isActiveemailone = true;
                this.noActiveemailone = false;
                axios({   
                    url:this.API+'/user/bind/sendEmail',
                    method:'post',
                    data:{
                        email:this.myemail,
                        is_check:0,
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    if(response.data.code==200){
                        this.time = 60
                        
                        this.timer();
                        console.log('111',this.isActiveemailone,'++++',this.noActiveemailone)
                    }else{
                        this.disemailone = false;
                        this.btnText = '获取验证码'
                        this.isActiveemailone= false,
                        this.noActiveemailone = true
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
                
        },
        //换绑邮箱发送新邮箱验证码
        sendEmail2(){
            var regemai =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(this.new_email==""){
                    this.$message({
                    message:'请输入新邮箱',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
            }else if(!regemai.test(this.new_email)){
                    this.$message({
                    message:'请输入正确的邮箱',
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                return;
            }else{
                this.btnText = '发送中'
                this.disemailtwo = true;
                this.isActiveemailtwo = true;
                this.noActiveemailtwo = false;
                axios({   
                    url:this.API+'/user/bind/sendEmail',
                    method:'post',
                    data:{
                        email:this.new_email,
                        is_check:1
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    if(response.data.code==200){
                        this.times = 60;
                        this.timers();
                    }else{
                        this.disemailtwo = false;
                        this.btnText = '获取验证码'
                        this.isActiveemailtwo= false,
                        this.noActiveemailtwo = true
                        this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            customClass:'user-defind-style'
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
            
        },
        //邮箱倒计时
        timer:function(){
            if(this.time>0){
                this.time--;
                this.btnText = this.time+"s后重新获取";
                setTimeout(this.timer,1000);
            }else{
                this.time = 0;
                this.btnText = '获取验证码';
                this.disemailone = false;
                this.isActiveemailone = false;
                this.noActiveemailone = true;
            }
            
        },
        //第二次倒计时60秒
        timers:function(){
            if(this.times>0){
                this.times--;
                // console.log(this.time);
                this.btnText = this.times+"s后重新获取";
                setTimeout(this.timers,1000);
                this.isActiveemailtwo = true;
                this.noActiveemailtwo = false;
            }else{
                this.times = 0;
                this.btnText = '获取验证码';
                this.disemailtwo = false;
                this.isActiveemailtwo = false;
                this.noActiveemailtwo = true;
            }
        },
        //验证码修改
        YZedit(){
                this.passwordDialogVisible = false;
                this.YZpasswordDialogVisible = true;
                
        },
        //原密码修改
        oldEdit(){
            
            // if(this.YZpasswordDialogVisible =false)
            this.passwordDialogVisible = true;
            this.YZpasswordDialogVisible = false;
        },
        // 微信弹框
        editwechat(){
            this.wechatDialogVisible = true;
        },
        // 跳转至账号密码修改页
        jumpToPassSetPage(){
            this.passwordDialogVisible = true;
            // this.$router.push('/usersetedit')
        },
        //跳转至支付密码修改页
        jumpToPayPassWordSet(){
            if(this.userInfo.is_set == 0){
            //未设置支付密码
            // this.$router.push('/passset')
            this.nopaypasswordDialogVisible = true;
    
            }else{
                 // 已设置支付密码
                this.paypasswordDialogVisible = true;
            }
            // this.$router.push('/paypass')
        },
        //跳转至认证信息页
        toAuthInfo(){
            this.$router.push('/authinfo')
        },
        //重置支付密码
        RepayPass(){
            if(this.new_payPassword != this.new_payPassword_confirm){
                this.$message({
                        message:'两次密码不一致',
                        type:'error',
                        center: true,
                        duration:1000,
                        customClass:'user-defind-style'
                    })
            }else axios({
                    url:this.API+'/user/password/rePayPassword',
                    method:'post',
                    data:{
                        pay_password:this.pay_password,
                        new_payPassword:this.new_payPassword,
                        new_payPassword_confirm:this.new_payPassword_confirm
                    },
                    headers: {
                        'auth-key': localStorage.getItem('token')
                    }
                }).then(response=>{
                    console.log(response);
                if(response.data.code==200){
                    this.$message({
                            message:response.data.msg,
                            type:'success',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                        this.reload()
                        this.paypasswordDialogVisible =false;
                }else{
                    this.$message({
                            message:response.data.msg,
                            type:'error',
                            center: true,
                            duration:1000,
                            customClass:'user-defind-style'
                        })
                }
                }).catch(err=>{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        duration:1000,
                        customClass:'user-defind-style'
                    })
                    console.log(err);
                })

        },
        //裁剪头像框
        toggleShow() {
            this.show = true;
        },
        //头像修改
        cropSuccess(imgDataUrl,file) {
            //  imgDataUrl其实就是经过base64转码过的图片
            // this.imageUrl = imgDataUrl;
            this.acter = imgDataUrl
            // console.log('+++++',file)
            this.photoLoading = true
            axios({
                url:this.API+'/system/upload/qiniu',
                 method: 'post',
                // file: file,
                data: {
                    // file: base64Str.split(',')[1],
                    file: imgDataUrl,
                    type: "1",
                    name:"file"
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                timeout: 10000,
            }).then(res=>{
                this.photoLoading=false
                // console.log('4545+++',res)
                // if(this.res.data.code = 1 ){
                    this.imageUrl = imgDataUrl
                    this.reload()
                    this.id = res.data.data.id;
                // }
            })
        },
        //修改新头像
            // httpRequest (options) {
            //         let file = options.file
            //         console.log('+++sda',file)
            //         // let filename = file.name
            //         console.log('6++++ssds',file)
            //         if (file) {
            //             this.fileReader.readAsDataURL(file)
            //         }
            //         this.fileReader.onload = () => {
            //             let base64Str = this.fileReader.result
            //             console.log('64bra++++', this.fileReader.result);
            //             let config = {
            //                 url:this.API+'/system/upload/qiniu',
            //                 method: 'post',
            //                 // file: file,
            //                 data: {
            //                     // file: base64Str.split(',')[1],
            //                     file: base64Str,
            //                     type: "1",
            //                     name:"file"
            //                 },
            //                 headers: {
            //                     'auth-key': localStorage.getItem('token')
            //                 },
            //                 timeout: 10000,
            //                 // onUploadProgress: function (progressEvent) {
            //                     // console.log(progressEvent)
            //                 //     progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
            //                 //     options.onProgress(progressEvent, file)
            //                 // },
            //             }
            //             axios(config)
            //             .then(res => {
            //                 console.log('res++++++++',res);
            //                 this.imageUrl = base64Str;
            //                 console.log("45s4d",this.imageUrl)
            //                 this.id = res.data.data.id;
            //                 this.reload();
            //                 console.log(this.id);
            //                 options.onSuccess(res, file)
            //             })
            //             .catch(err => {
            //                 options.onError(err)
            //             })
            //         }
            //     },
            // removeHandler (file, fileList) {
            // },
            // beforeUpload (file) {
            //     const isLt5M = file.size < 5 * 1024 * 1024
            //     if (this.fileList.length >= 3) {
            //         alert('At most 1 files')
            //         return false
            //     }
            //     if (!isLt5M) {
            //         alert('The max size is 5MB')
            //         return false
            //     }
            // },
            // uploadSuccess (res, file, fileList) {
            //     let data = res.data
            //     console.log('upload result:', res, file)
            //     file.key = data.key
            //     this.fileList.push(data.key)
            // },
        uploadPhoto(){
            this.bgPic = true;
        },
        leaveUpload(){
            this.bgPic = false;
        },
        //YZM修改支付密码
        YZpaypwdedit(){
            this.paypasswordDialogVisible = false;
            this.YZpaypasswordDialogVisible = true;
        },
        //原密码支付修改密码
        oldpaytEdit(){
            this.paypasswordDialogVisible = true;
            this.YZpaypasswordDialogVisible = false;
        },
        //验证码修改支付密码
        CodeEditPayPass(){
            if(this.captcha == ''){
                this.$message({
                    message:'请输入验证码',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
            }else if(this.captcha.length != 6){
                this.$message({
                    message:'请输入正确的验证码',
                    type:'error',
                    center: true,
                    duration:1000,
                    customClass:'user-defind-style'
                })
            }
            axios({
                url:this.API+'/user/password/smsPayPassword',
                method:'post',
                data:{
                    // phone:this.phone,
                    captcha:this.captcha,
                    set_pay_password:this.set_pay_password
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
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
                    this.YZpaypasswordDialogVisible = false
                }else{
                    this.$message({
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            }).catch(err=>{
                this.$message({
                    message:response.data.msg,
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                console.log(err);
            })

        },
        //支付密码点击获取验证码
        codeBtnPaytion:function(){
            this.disabled = true;
            this.YZpassBtnText = '发送中'
            this.isActive = true
            this.noActive = false
            //发送请求
            axios({
                url:this.API+'/user/password/sms',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                },
                data:{
                    // phone:this.phone
                }
            }).then(response=>{
                if(response.data.code==200){
                    this.time = 60;
                    this.passwordtimer();
                }else{
                    this.YZpassBtnText = '获取验证码'
                    this.isActivephoneone = false;
                    this.noActive = true;
                    this.$message({
                        
                        message:response.data.msg,
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
                }
            })
        },
        //验证码倒计时60秒
        passwordtimer:function(){
            if(this.time>0){
                this.time--;
                // console.log(this.time);
                this.YZpassBtnText = this.time+"s后重新获取";
                setTimeout(this.passwordtimer,1000);
            }else{
                this.time = 0;
                this.YZpassBtnText = '获取验证码';
                this.disabled = false;
                this.isActive = false;
                this.noActive = true;
            }
        },
        //设置支付密码
        SetpayPass(){
            if(this.set_payPassword != this.set_payPassword_confirm){
                this.$message({
                        message:'两次密码不一致',
                        type:'error',
                        center: true,
                        customClass:'user-defind-style'
                    })
            }else
            axios({
                url:this.API+'/user/password/setPayPassword',
                method:'post',
                data:{
                    set_payPassword:this.set_payPassword,
                    set_payPassword_confirm:this.set_payPassword_confirm
                },
                headers: {
                    'auth-key': localStorage.getItem('token')
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
                    this.reload()
                    this.nopaypasswordDialogVisible = false
            }
            }).catch(err=>{
                this.$message({
                    message:response.data.msg,
                    type:'error',
                    center: true,
                    customClass:'user-defind-style'
                })
                console.log(err);
            })
        },
        //弹窗统一关闭清理数据
        colsePopWindows(){
            this.YZpaypasswordDialogVisible=false;
            this.YZpasswordDialogVisible=false;
            this.nopaypasswordDialogVisible=false;
            this.passwordDialogVisible=false;
            this.paypasswordDialogVisible=false;
            this.usereditDialogVisible=false;
            this.emailDialogVisible=false;
            this.changeemail=false;
            this.changeemail2=false;
            this.wechatDialogVisible=false;
            this.teleditDialogVisible=false;
            this.telnextVisible=false;
            this.Telcaptcha = '';
            this.new_phone='';
            this.new_phone_captcha = '';
            this.captcha = '';
            this.newcaptcha = '';
            this.password = '';
            this.new_password = '';
            this.new_password_confirm = '';
            this.set_password = '';
            this.set_payPassword = '';
            this.set_payPassword_confirm = '';
            this.set_pay_password = '';
            this.new_payPassword_confirm = '';
            this.new_payPassword = '';
            this.pay_password = ''
            this.nickname = this.oldNickname

        },
        //叉叉清数据
        handleClose(done){
            this.YZpaypasswordDialogVisible=false;
            this.YZpasswordDialogVisible=false;
            this.nopaypasswordDialogVisible=false;
            this.passwordDialogVisible=false;
            this.paypasswordDialogVisible=false;
            this.usereditDialogVisible=false;
            this.emailDialogVisible=false;
            this.changeemail=false;
            this.changeemail2=false;
            this.wechatDialogVisible=false;
            this.teleditDialogVisible=false;
            this.telnextVisible=false;
            this.Telcaptcha = '';
            this.new_phone='';
            this.new_phone_captcha = '';
            this.captcha = '';
            this.newcaptcha = '';
            this.password = '';
            this.new_password = '';
            this.new_password_confirm = '';
            this.set_password = '';
            this.set_payPassword = '';
            this.set_payPassword_confirm = '';
            this.set_pay_password = '';
            this.new_payPassword_confirm = '';
            this.new_payPassword = '';
            this.pay_password = '';
            this.email = ''
            this.nickname = this.oldNickname
        },

    },
    mounted () {
        if (!window.FileReader) {
        console.error('Your browser does not support FileReader API!')
        }
        this.fileReader = new FileReader()
        // this.ipt = document.querySelectorAll(`#ids_${this.id1} .shortInput`)
        // this.ipt2 = document.querySelectorAll(`#ids_${this.id2} .shortInput2`)
        // this.ipt3 = document.querySelectorAll(`#ids_${this.id3} .shortInput3`)
    },
    watch:{
        pay_password(curVal){
            if(/[^\d]/g.test(curVal)){
            this.pay_password = this.pay_password.replace(/[^\d]/g,'');
            }else{
                this.msgLength = curVal.length;
            }
        },
        new_payPassword(curVal){
            if(/[^\d]/g.test(curVal)){
            this.new_payPassword1 = this.new_payPassword.replace(/[^\d]/g,'');
            }else{
                this.msgLength1 = curVal.length;
            }
        },
        new_payPassword_confirm(curVal){
            if(/[^\d]/g.test(curVal)){
            this.new_payPassword_confirm = this.new_payPassword_confirm.replace(/[^\d]/g,'');
            }else{
                this.msgLength2 = curVal.length;
            }
        },
        set_pay_password(curVal){
            if(/[^\d]/g.test(curVal)){
            this.set_pay_password = this.set_pay_password.replace(/[^\d]/g,'');
            }else{
                this.msgLength3 = curVal.length;
            }
        },
        set_payPassword(curVal){
            if(/[^\d]/g.test(curVal)){
            this.set_payPassword = this.set_payPassword.replace(/[^\d]/g,'');
            }
            console.log(this.set_payPassword)

        },
        set_payPassword_confirm(curVal){
            if(/[^\d]/g.test(curVal)){
            this.set_payPassword_confirm = this.set_payPassword_confirm.replace(/[^\d]/g,'');
            }else{
                this.msgLength5 = curVal.length;
            }
        },

    }
   
    
}
</script>

<style> 
.editPhoto .el-loading-mask{
    position: absolute;
    z-index: 2000;
    background-color: rgba(255,255,255,.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
    line-height: 42px;
}
.img-text{
    height: 20px;
    width: 80px;
    background-color: #07c160;
    color: #fff;
    position: absolute;
    text-align: center;
    line-height: 20px;
    margin: -22px 2px 0;
    /* opacity: .8; */
}
.cutPhotoBtn{
    width: 84px;
    height: 84px;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    margin-left: 412px;
    margin-top: 13px;
    z-index: 1;
    text-align: center;
    line-height: 100px;
    opacity: 0;
}
.cutPhotoBtn:hover{
    width: 84px;
    height: 84px;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    margin-left: 412px;
    margin-top: 13px;
    z-index: 9999;
    text-align: center;
    line-height: 100px;
    opacity: 1;
}
ul{
    padding: 0;
    /* margin-top:20px; */
    /* width: 280px; */
}
::-ms-clear,::-ms-reveal{display:none;}
.vue-pay-pwd {
    position: relative;
    display: inline-block;
    overflow: hidden;}
.vue-pay-pwd input[type=tel]{
    position: absolute;
    left: -200px;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    height: 100%;
    color: transparent;
    cursor: pointer;
    background-color:transparent;
    border: none;
    opacity: 0;
    
}
.vue-pay-pwd .psd-blink {
        display: inline-block;
        
    }
.vue-pay-pwd .psd-blink::after{
    
        content: "";
        display: block;
        height: 20px;
        position: relative;
        left:5px;
        top:0px;
        width: 1px;
        background: #000
    
}
.pwd-wrap {
    display: flex;
    width: 260px;
    border-radius: 2px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #ddd;
    cursor: pointer;}
.pwd-wrap li{
    list-style-type: none;
    text-align: center;
    line-height: 20px;
    flex: 1;
    border-right: 1px solid #ddd;
}
.pwd-wrap li::list-child{
    border-right: 0;

}
.pwd-wrap li i {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #000;
    display: inline-block;
}
.more .el-form-item__label{
    margin-left: -13px !important;
}
/* 头像 */
.avatar-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploaderinfo{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    /* border-radius: 50%; */
  }
  .avatar {
    border-radius: 50%;
    width: 84px;
    height: 84px;
    /* display: block; */
    z-index: 99;
    /* box-shadow: 1px 2px 7px #c8c8c8; */
    /* border: 2px solid #fff; */


    /* border-radius: 50%; */
  }
  /* 昵称 */
.nickName {
    text-align: center;
    line-height: 40px;
    color: #1B1D1F;
    font-size: 16px;
    font-weight: 600;
    /* background: #99a9bf; */
    margin-bottom: 10px;
  }
/* 主题 */
.infoContain{
    width: 688px;
    height: 206px;
    /* margin-left: 22px; */
    margin-bottom: 54px;
    padding: 0 110px;
}
.infoContain .el-col{
    width: 172px;
    height: 206px;
    /* margin-left: 22px; */
}
.touxiang{
    width: 80px;
    height: 80px;
    /* background: #99a9bf; */
    z-index: 1;
    margin: 13px auto 0;
    border-radius: 50%;
    /* border-left: 2px solid #fff;
    border: 2px solid #fff; */
    
}
.userinfo99{
    margin: auto;
    width: 904px;
    -webkit-border-radius:5px;
    border-radius: 5px;
    /* box-shadow: 0 0 1px #eaeaea; */
    padding:0 20px;
    background: #ffffff;
    border:1px solid #f7f7f7;
    background-clip:padding-box;
}
.userinfo101{
    margin:40px auto;
    width:904px;
    height: 497px;
    /* margin:30px 0; */
    /* -webkit-border-radius:5px; */
    border-radius: 2px;
    /* box-shadow: 0 0 1px #f7f7f7; */
    /* padding:35px 20px 15px 20px; */
    background: #ffffff;
    border:1px solid #f7f7f7;
    margin-left: 40px;
    background-clip:padding-box;
    /* text-align: center; */
}
  .infoContent{
      width: 100%;
      position: absolute;
      /* margin-top: 40px; */
  }
  .mobilePhone,.email,.wechat,.userPassWord,.payPassWord{
      position: relative;
      /* padding-top: 30px;  */
      text-align: center;
      /* background: #d3dce6; */
      height: 200px;
      /* margin-left: 22px; */

  }
.mobilePhone,.email,.wechat,.userPassWord{
    border-right: 1px solid #F6F6F6
}
.mobilePhone{
      /* color: #07C160; */
      /* font-size: 60px; */
  }

.mobilePhone:hover,.email:hover,.wechat:hover,.userPassWord:hover,.payPassWord:hover{
    /* padding-top: 30px;  */
    text-align: center;
    background: #F6F6F6;
    height: 200px;

}

  /* 钱包 */
.moneyCase{
    text-align: center;
    line-height: 40px;
    background: #99a9bf;
    margin-top: 20px;
}
/* 用户信息折叠样式 */

.icon-yuan{
    width: 42px;
    height: 42px;
    /* background-color: #07C160; */
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 34px;
    line-height: 42px;
}
.zhuangtai{
    margin: 0 0 0 406px;
    width: 88px;
    height: 22px;
    border-radius: 30px;
    background-color: #07C160;
    color: #ffffff;
    line-height: 22px;
    font-size: 12px;
    padding: 2px 5px;
    cursor: pointer;
}
.zhuangtai2{
    margin: 0 0 0 406px;
    width: 88px;
    height: 22px;
    border-radius: 30px;
    background-color: #FA5151;
    color: #ffffff;
    line-height: 22px;
    font-size: 12px;
    padding: 2px 5px;
    cursor: pointer;
}
.zhuangtai3{
    margin: 0 0 0 406px;
    width: 88px;
    height: 22px;
    border-radius: 30px;
    background-color: rgb(141, 142, 143);
    color: #ffffff;
    line-height: 22px;
    font-size: 12px;
    padding: 2px 5px;
    cursor: pointer;
}
.zhuangtai i,.zhuangtai2 i{
    font-size: 14px;
}
.phone-email-wechat{
    margin: 30px auto;
    width: 42px;
    height: 12px; 
    color: rgb(143, 143, 143);
}

.password-paypassword{
    margin: 30px auto;
    width: 60px;
    height: 12px;
    color: #7e7f80;
}
.fnTitle{
    height: 53px;
    line-height: 54px;
}

.bage-line{
    height: 2px;
    width: 58px;
    background-color: #07C160;
    margin-left: 37px;
    position: absolute;
    margin-top: -1px;
}
.bage-line1{
    height: 2px;
    width: 60px;
    background-color: #07C160;
    margin-left: 35px;
    position: absolute;
    margin-top: -1px;
}
.underline{
    width: 100%;
    height:1px;
    background-color: #f6f6f6;
}
.title-text{
    width: 100px !important;
    height: 16px;
    font-weight: 600;
    margin-left: 37px;
}
.touxiang .editPhoto{
    width: 84px;
    height: 84px;
    /* font-size: 12px; */
    /* z-index: 100; */
    /* background-color: #000; */
    position: absolute;
    /* cursor: pointer; */
    border-radius: 50%;
    border:2px solid #fff;
    text-align: center;
    overflow: hidden;
    box-shadow: 1px 2px 7px #c8c8c8;
}
.el-dialog__body{
    /* width: 520px; */
    /* height: 380px; */
    padding: 0 0 10px 0 !important;
}
.el-dialog__header{
    padding: 0 !important;
}
.editInfo{
    margin: 50px 24px;
}
.editInfo span{
    /* color: #7e7f80; */
}
.editInfo input{
    /* margin-left: 30px; */
}
.step .editInfoBtn{
    /* float: right; */
    width: 200px;
    margin-top: 10px;
    margin-left: 317px;
}
.step .editInfoBtn1{
    /* float: right; */
    width: 300px;
    margin-top: 10px;
    margin-left: 210px;
}
.step .backbtn:hover{
    width: 80px;
    height: 30px;
    background-color: #fafafa;
     padding:6px;
    line-height: 5px;
    border-radius: 2px;
    border: 1px solid #ededed; 
    color: #7e7f80;  
}
.step .backbtn{
    color: #7e7f80;  
    width: 80px;
    height: 30px;
    border: 1px solid #ededed;
    /* text-align: center; */
    padding:6px;
    line-height: 5px;
    border-radius: 2px;

}
.el-dialog__headerbtn .el-dialog__close{
    margin: 0 5px 0 0 !important;
}
.step .successinfobtn{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #07C160;
    background-color: #07c160;
}
.step .successinfobtn:hover{
    width: 80px;
    height: 30px;
    padding: 6px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #16b864;
    background-color: #16b864;
}
.old{
    margin-top: 20px;
}
.new{
    margin-top: 20px;
}
.oldNumber{
    padding-left:15px; 
    float: right;
    margin-right: 84px;
    height: 40px;
    width: 265px;
    border-radius: 2px;
    background:#ededed;
    /* margin-left: 100px; */
    border: 1px solid #ededed;
}
.newNumber{
    /* padding-left:20px;  */
    float: right;
    margin-right: 84px;
    height: 40px;
    width: 282px;
    border-radius: 2px;
    /* margin-left: 100px; */
    /* border: 1px solid #eeddee; */
}
.yanzhengma{
    background-color: #2f77ed;
    /* text-align: center; */
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #2f77ed;
    border-radius: 2px;
    color: #fff;
    padding: 12px 4px;
    /* margin-left: 12px; */
    margin: -40px 0px 0 336px;

}
.yanzhengma:hover,.yanzhengma:focus{
    background-color: #2d71e3;
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #2d71e3;
    border-radius: 2px;
    color: #fff;
    padding: 12px 4px;

}
.yanzhengma1{
    background-color: #2f77ed;
    /* text-align: center; */
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #2f77ed;
    border-radius: 2px;
    color: #fff;
    padding: 12px 4px;
    /* margin-left: 12px; */
    margin: 0px 0px 0 -108px;

}
.yanzhengma1:hover,.yanzhengma1:focus{
    background-color: #2d71e3;
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #2d71e3;
    border-radius: 2px;
    color: #fff;
    padding: 12px 4px;

}
.emailyanzhengma{
    background-color: #2f77ed;
    /* text-align: center; */
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #2f77ed;
    border-radius: 2px;
    color: #fff;
    padding: 12px 4px;
    /* margin-left: 12px; */
    margin: -40px 0px 0 336px;

}
.emailyanzhengma:hover,.emailyanzhengma:focus{
    background-color: #2d71e3;
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #2d71e3;
    border-radius: 2px;
    color: #fff;
    padding: 12px 4px;

}
.chack{

    margin: 30px 0  30px 0;
    /* height: 40px; */
    /* width: 100% */
}
.codeinput{
    margin: 0 84px 0 48px;
    margin-right:84px;
    border-radius: 2px;
}
.codeinput1{
    margin: 0 84px 0 48px;
    margin-right:84px;
    border-radius: 2px;
}
.codeinput3{
    margin-left: 29px;
    border-radius: 2px;
}
.codeinput1 input{
    margin-left: 0;
}
.step .el-input__inner{
    width: 282px;
    border-radius: 2px;
}
.step .el-input__inner:focus{
    width: 282px;
    border: 1px solid #ededed;
}
.step .el-form-item{
    /* height: 40px; */
    margin: 30px 0px;
}
.wechatpic{
    width: 200px;
    height: 200px;
    margin: 130px auto 180px;
}
.wechatpic img{
    width: 200px;
    height: 200px;
    margin: 0;
}
 .am_payPwd {
  display: inline-block;
  width: 282px;
  height: 12px;
  border: 1px solid #E5E5E5;
  border-radius: 2px;
  padding: 14px 0;
  position: relative;
  margin-left: 30px;
  /* margin-top:-10px; */

}
.am_payPwd2 {
  display: inline-block;
  width: 282px;
  height: 12px;
  border: 1px solid #E5E5E5;
  border-radius: 2px;
  padding: 14px 0;
  position: relative;
  margin-left: 17px;
  /* margin-top:-10px; */

}
.editPayPassWordInfo .el-form-item__content{
    height: 40px;
    margin-left: 55px;
}
.editPayPassWordInfo{
    margin:30px 0 60px 0 !important;
}
.am_payPwd .shortInput {
    text-align: center;
    font-size: 14px;
    float: left;
    width: 46px;
    height: 12px;
    color: #333;
    border:none;
    /* margin-top: 5px; */
    outline:none;
    margin-left: 0px;
}
.am_payPwd .shortInput:focus{
    border:none;
}
.step .am_payPwd .shortInput:not(:last-child) {
    border-right: 1px solid #E5E5E5;
}
.step .am_payPwd .shortInput2 {
     text-align: center;
    font-size: 14px;
    float: left;
    width: 46px;
    height: 12px;
    color: #333;
    border:none;
    /* margin-top: 5px; */
    outline:none;
    margin-left: 0px;
}
.step .am_payPwd .shortInput2:focus{
    border:none;
}
.step .am_payPwd .shortInput2:not(:last-child) {
    border-right: 1px solid #E5E5E5;
}
.step .am_payPwd .shortInput3,.am_payPwd2 .shortInput2 {
    text-align: center;
    font-size: 14px;
    float: left;
    width: 46px;
    height: 12px;
    color: #333;
    border:none;
    /* margin-top: 5px; */
    outline:none;
    margin-left: 0;
}
.step .am_payPwd .shortInput3:focus,.am_payPwd2 .shortInput2:focus{
    border:none;
}
.step .am_payPwd .shortInput3:not(:last-child),.am_payPwd2 .shortInput2:not(:last-child) {
    border-right: 1px solid #E5E5E5;
}
.isemailcodesbtnone,.isTelcodesbtnone{
    /* margin-left: 336px !important; */
    background-color: #cccccc !important;
    color: #999999 !important;
    padding: 12px 4px !important;
    position: absolute;
    /* margin-top: -40px; */
    height: 40px;
    width: 100px;
    border: 1px solid #ccc !important;
}
.noTelcodesbtnone,.noemailcodesbtnone{
    /* margin-left: 336px !important; */
    background-color: #2e77ed !important;
    color: #ffff !important;
    padding: 12px 4px !important;
    position: absolute;
    /* margin-top: -40px; */
    height: 40px;
    width: 100px;
    border: 1px solid #2e77ed !important;
}
#payPwd .pwd-wrap{
    margin-top: 2px;
    width: 282px;
    height: 38px;
    padding-bottom: 1px;
    /* margin: 0 auto; */
    background: #fff;
    border:1px solid #e5e5e5;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    cursor: pointer;
    margin-left: 30px;
    padding-inline-start: 0px;
    border-radius: 2px;
  }
 .pwd-wrap li{
    width: 40px;
    list-style-type: none;
    text-align: center;
    line-height: 8px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    height: 8px;
    border-right: 1px solid #ddd;
    margin-top: 5px;
    margin-bottom: 5px;

  }
 .pwd-wrap li:first-child{
    border-left: 0 ;
  }
 .pwd-wrap li:last-child{
    border-right:0;
  }
  /* .pwd-wrap li:focus{
      background-color: #000;
  } */
 .pwd-wrap li i{
    height: 5px;
    width: 5px;
    border-radius:50% ;
    background: #000;
    display: inline-block;
  }
  .more3 .el-form-item__label{
    text-align: right;
    float: left;
    font-size: 14px;
    color: #7e7f80;
    line-height: 40px;
    padding: 0 12px 0 0;
    margin-left: 80px;
    margin-right: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
.codeinput2{
    margin: 0px 8px 0 29px;
    /* margin-right: 80px; */
    border-radius: 2px;
}

.el-form-item__label{
    color: #7e7f80;
}
input:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}
.icon-edit:hover{
    color: #07C160;
}
.removeBtnLeftCorners{
    position: absolute;
    width: 2px;
    height: 38px;
    background-color: #fff;
    margin-left: 336px;
    margin-top: -40px;
    z-index: 22;
    border-bottom: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
}
</style>
