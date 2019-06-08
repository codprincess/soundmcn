// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import  VueResource  from 'vue-resource'
import uploader from 'vue-simple-uploader'
import moment from 'moment'
axios.defaults.withCredentials = true
//  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';    
Vue.prototype.$axios = axios
// Vue.prototype.API = '/api'
Vue.prototype.API = 'https://api.soundmcn.heard-gl.com'
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(uploader)

/* eslint-disable no-new */
// router.beforeEach((to,from,next)=>{
//   if(to.path == '/login'){
//     localStorage.removeItem('token');
//   }
//   let token = localStorage.getItem('token');
//   if(!token && to.path != '/login'){
//     next({path:'/login'})
//   }else{
//     next()
//   }
// })

//钩子函数，登录跳转
// router.beforeEach((to,from,next)=>{
//   if(to.meta.requireAuth){
//     if(localStorage.getItem('token')){
//       next();
//     }else{
//       next({path:'/login'})
//     }
//   }else{
//     //不需要登录的可以访问
//     next();
//   }
// })

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
