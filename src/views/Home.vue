<template>
    <div class="contenbox">
        <div class="full-bg" :style="homebg"></div>
        <div class="nav">
            <div class="logo"><img src="../assets/image/logo.png"></div>
            <div class="nav-right">
                <ul>
                    <router-link to="/login"><li>登&nbsp;&nbsp;录</li></router-link>
                     <router-link to="/register"><li>注&nbsp;&nbsp;册</li></router-link>
                </ul>
            </div>
        </div>
        <footer class="footers" style="color:#999999;">
            <!-- <p>桂ICP备18009283号-5  北京市公安局朝阳分局备案编号110250000560</p> -->
            <p>&copy; &nbsp;2019 Copyright 超声波发行 桂ICP备18009283号-5</p>
        </footer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            homebg:{
                backgroundImage: "url(" + require("../assets/image/bg.png") + ")",
                backgroundRepeat: "no-repeat",
                'background-size': "cover",
                'background-position': "100% 100%",
                // width: "100%",
                // height: "100%",
            },
        }
    },
    created(){
        // localStorage.clear("cateId")
        // localStorage.clear("title")
    }
}
</script>
<style scoped>
.contenbox{
    width: 100%;
    height:100%;
}
.full-bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    
}
.nav{
    position: absolute;
    top:20px;
    z-index: 5;
    margin:20px 60px 0px 60px;
    height: 60px;
    width: 92%;
}
.nav .logo{float: left;width: 300px;height:60px;margin-left: 100px;}
.nav .nav-right{float: right;}
.nav .nav-right ul li{
    text-align: center;
    width: 50px;
    float: left;
    list-style: none;
    margin-right:30px;
    color: #ffffff;
    padding-bottom: 5px;
}
.nav .nav-right ul li:hover{
    border-bottom: 2px  transparent solid;
    border-image: linear-gradient(to right, #67DB73,#58BC9F, #2852E1);
    border-image-slice: 10;
}
.footers{
    position: absolute;
    bottom: 30px;
    z-index: 5;
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.12);
    line-height: 28px;
}
.footers p{
    margin: 0;
}
</style>
