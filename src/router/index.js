import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Resetpass from '@/views/Resetpass'
import Register from '@/views/Register'
import CeoMail from '@/views/page/CeoMail'
import CeoMailsuccess from '@/views/page/CeoMailsuccess'
import MsgList from '@/views/page/MsgList'
import MsgDetail from '@/views/page/MsgDetail'
import readMsgdetail from '@/views/page/readMsgdetail'
import ChList from '@/views/channel/ChList'
import EditPublish from '@/views/publish/EditPublish'
import HasPublish from '@/views/publish/HasPublish'
import NotPublish from '@/views/publish/NotPublish'
import TimePublish from '@/views/publish/TimePublish' 
import PerInfo from '@/views/personal/PerInfo'
import AddPay from '@/views/personal/AddPay'
import UserInfo from '@/views/percenter/UserInfo'
import UserSetedit from '@/views/percenter/UserSetedit'
import UserSet from '@/views/percenter/UserSet'
import PassSet from '@/views/percenter/PassSet'
import PayPass from '@/views/percenter/PayPass'
import UserMsg from '@/views/percenter/UserMsg'
import PayCode from '@/views/percenter/PayCode'
import UsersMsg from '@/views/percenter/UsersMsg'
import CompanyMsg from '@/views/percenter/CompanyMsg'
import CompMsg from '@/views/percenter/CompMsg'
import UserCode from '@/views/percenter/UserCode'
import UserAccount from '@/views/percenter/UserAccount'
import Cate from '@/views/cates/Cate'
import ChildCate from '@/views/cates/ChildCate'
import CateList from '@/views/cates/CateList'
import AudioPlay from '@/components/AudioPlay'
import UploadAudio2 from '@/views/upload/UploadAudio2'
import UploadAudio from '@/views/upload/UploadAudio'
import settings from '@/views/percenter/setting'
import authinfo from '@/views/percenter/authinfo'
import mycase from '@/views/percenter/mycase'
import cateinfo from "@/views/cates/cateinfo"
import useragreement from "@/views/useragreement"
import addcate from '@/views/cates/addCate'
Vue.use(Router)
// const cateId = localStorage.getItem('cateId') || '';
const cateId = 0;
export default new Router({
  // mode: 'history',
  routes: [
    {path:'/',name:Home,component:Home,hidden:true,leaf:true},
    {path: '/login',name: 'Login',component: Login,hidden:true,leaf:true},
    {path:'/resetpass',name:'Resetpass',component:Resetpass,hidden:true,leaf:true},
    {path:'/register',name:'Register',component:Register,hidden:true,leaf:true},
    {path:'/audioplay',name:'播放器',component:AudioPlay,hidden:true,leaf:true},
    {path:'/useragreenment',name:'用户协议',component:useragreement},
    {
      path:'/index',name:'个人主页',component:Index,leaf:true,
      iconCls:'icon-shouye1',
      children:[
        {path:'/perinfo',name:'个人主页',component:PerInfo},
        {path:'/perinfo/:id',name:'perinfo',component:PerInfo},
      ]
    },
    // {path:'/perinfo',name:'个人主页',component:Register,hidden:true},
    {
      path:'/index',name:'渠道管理',component:Index,leaf:true,
      iconCls:'icon-wumoxing',
      children:[
        {path:'/chlist',name:'渠道管理',component:ChList}
      ]
    },
    {
      path:'/index',name:'发行管理',component:Index,
      iconCls:'icon-icon_fabu',
      children:[
        {path:'/addpay',name:'AddPay',component:AddPay,hidden:true},
        {path:'/haspublish',name:'已发行',component:HasPublish,hidden:false},
        {path:'/notpublish',name:'未发布',component:NotPublish,hidden:false},
        {path:'/timepublish',name:'定时发布',component:TimePublish,hidden:false},
      ]
    },
    {
      path:'/index',name:'个人中心',component:Index,hidden:true,
      iconCls:'icon-icon_zhanghao',
      children:[
        {path:'/setting',name:'个人设置',component:settings},
        {path:'/authinfo',name:'认证信息',component:authinfo},
        {path:'/mycase',name:'我的钱包',component:mycase},
        {path:'/usersetedit',name:'修改登录密码',component:UserSetedit,hidden:true},
        {path:'/userset',name:'账号设置',component:UserSet},
        {path:'/usermsg',name:'用户信息',component:UserMsg},
        {path:'/companymsg',name:'公司信息',component:CompanyMsg,hidden:true},
        {path:'/compmsg',name:'公司信息',component:CompMsg,hidden:true},
        {path:'/usercode',name:'验证码设置登录密码',component:UserCode,hidden:true},
        {path:'/passset',name:'设置支付密码',component:PassSet,hidden:true},
        {path:'/paypass',name:'修改支付密码',component:PayPass,hidden:true},
        {path:'/paycode',name:'验证码修改',component:PayCode,hidden:true},
        {path:'/useraccount',name:'用户账号',component:UserAccount},
        {path:'/usersmsg',name:'个人修改',component:UsersMsg,hidden:true},

      ]
    },
    {
      path:'/index',name:'我的消息',component:Index,hidden:true,
      iconCls:'icon-xiaoxi',
      children:[
        { path:'/ceomail',name:'CEO信箱',component:CeoMail},
        {path:'/msglist',name:'我的消息',component:MsgList},
        {path:'/msgdetail/:id',name:'msgdetail',component:MsgDetail,hidden:true},
        {path:'/readmsgdetail',name:'readmsgdetail',component:readMsgdetail,hidden:true},
        {path:'/ceomailsuccess',name:'ceomailsuccess',component:CeoMailsuccess,hidden:true},

      ]
    },
    {
      path:'/index',name:'我的栏目',component:Index,
      iconCls:'icon-icon_yingyongguanli',
      children:[
        {path:'/cateinfo/:id',name:'cateinfo',component:cateinfo},
        {path:`/cateInfo/${cateId}`,name:'我的栏目',component:Cate,hidden:true},
        {path:'/cate/:id',name:'cate',component:Cate,hidden:true},
        // {path:`/cate/${cateId}`,name:'我的栏目',component:Cate,hidden:true},
        {path:'/catelist',name:'栏目列表',component:CateList,hidden:true},
        {path:'/childcate',name:'子分类',component:ChildCate,hidden:true},
        {path:'/addcate',name:'添加栏目',component:addcate}
      ]
    },
    { path:'/editpublish',name:'单音频发布',component:Index,hidden:false,
      iconCls:'icon-liujisuan',
      children:[
        {path:'/editpublish',name:'单音频上传',component:EditPublish},
        {path:'/editpublish',name:'editpublish',component:EditPublish,hidden:true},
        // {path:'/editpublish',name:'单音频上传',component:EditPublish},
      ]
    },
    {
      path:'/index',name:'多音频上传',component:Index,hidden:false,
      iconCls:'el-icon-message',
      children:[
        {path:'/uploadaudio2',name:'多音频上传1',component:UploadAudio2},
        {path:'/uploadaudio',name:'多音频上传',component:UploadAudio},
      ]
    },
    // {
    //  path:'/settings',name:'账号设置',component:settings,hidden:true,
    //  children:[
    //   {path:'/userinfo',name:'个人设置',component:UserInfo},
    //   {path:'/usersetedit',name:'修改登录密码',component:UserSetedit,hidden:true},
    //   {path:'/userset',name:'账号设置',component:UserSet},
    //   {path:'/usermsg',name:'用户信息',component:UserMsg},
    //   {path:'/companymsg',name:'公司信息',component:CompanyMsg,hidden:true},
    //   {path:'/compmsg',name:'公司信息',component:CompMsg,hidden:true},
    //   {path:'/usercode',name:'验证码设置登录密码',component:UserCode,hidden:true},
    //   {path:'/passset',name:'设置支付密码',component:PassSet,hidden:true},
    //   {path:'/paypass',name:'修改支付密码',component:PayPass,hidden:true},
    //   {path:'/paycode',name:'验证码修改',component:PayCode,hidden:true},
    //   {path:'/useraccount',name:'用户账号',component:UserAccount},
    //   {path:'/usersmsg',name:'个人修改',component:UsersMsg,hidden:true},
    //  ]
    // }
    
    // {path:'/editpublish',name:'单音频发布',component:EditPublish},
    // {
    //   path:'/index',name:'文件上传',component:Index,leaf:true,
    //   iconCls:'el-icon-message',
    //   children:[
    //     {path:'/uploadtest',name:'文件上传',component:uploadtest},
    //   ]
    // },
    // {path:'/passwdbox',name:'Passwdbox',component:Passwdbox}
  ]

})
