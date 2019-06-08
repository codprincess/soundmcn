// const LOCALURL = "https://api.soundmcn.heard-gl.com/"
const URL = {
    //密码登录接口
    login:this.API+'user/login/password',
    //验证码登录
    code:this.API+'user/login/code',
    //登录验证码
    
    //手机号注册
    phone:this.API+'user/reg/phone',
    //设置账号类型
    setInfo:this.API+'user/reg/setInfo',
}

module.exports = URL