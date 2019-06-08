<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
      return{
          reload:this.reload
      }
  },
  data(){
      return{
          isRouterAlive:true
      }
  },
  methods:{
      reload(){
          this.isRouterAlive = false
          this.$nextTick(function(){
              this.isRouterAlive = true
          })
      }
  }
}
</script>

<style>
  body {
	margin: 0px;
	padding: 0px;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
    background:#F7F7F7;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
}
.paybtn, .paybtn:focus, .paybtn:hover {
    color: #fff;
    background-color: #18c26a;
    border-color: #18c26a;
    font-size: 18px;
}

.userinfo3 .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #cccccc;
    line-height: 40px;
    padding: 0 12px 0 120px;

}
.userinfo3 .more .el-form-item__label{
    text-align: right;
    float: left;
    font-size: 14px;
    color: #cccccc;
    line-height: 40px;
    padding: 0 12px 0 148px;
}
.userinfo8 .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130x;
    line-height: 130px;
    text-align: center;
}
.changebtn {
    margin-right: 90px;
    margin-top: 10px;
    color: #000;
}
.el_menu {
        border-right: none;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        border:none;
    } 
</style>
