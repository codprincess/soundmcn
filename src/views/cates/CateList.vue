<template>
    <div class="childcate">
        <!-- <router-link :to="'/cate/' + item.id" tag="div" class="catelists" v-for="(item,index) in allCates" :key="index">
            <div class="catelistpic">
                
            </div>
            <div class="catename">{{item.title}}</div>
            <div v-if="item.status==0" class="catestatuspassing">待审核</div>
            <div v-else-if="item.status==2" class="catestatuspass">已通过</div>
            <div v-else class="catestatusnot">未通过</div>
        </router-link> -->
         <div @click="goToCate(item.id)" class="catelists" v-for="(item,index) in allCates" :key="index">
            <div class="catelistpic">
                
            </div>
            <div class="catename">{{item.title}}</div>
            <div v-if="item.status==0" class="catestatuspassing">待审核</div>
            <div v-else-if="item.status==2" class="catestatuspass">已通过</div>
            <div v-else class="catestatusnot">未通过</div>
         </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    inject:['reload'],
    data(){
        return{
            allCates:[]
        }
    },
    created(){
        this.getAllCates();
    },
    methods:{
        //获取栏目列表
        getAllCates(){
            axios({
                url:this.API+'/section/manage/all',
                method:'post',
                headers: {
                    'auth-key': localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response);
                if(response.data.code==200){
                    this.allCates = response.data.data;
                    //this.title = response.data.data[0].title;
                   // console.log(this.title);
                    //console.log(this.allCates )
                }
            })
        },

        //方法跳转
        goToCate(id){
            let obj = {}; 
            obj = this.allCates.find((item)=>{//这里的allCates就是上面遍历的数据源 
                return item.id === id;//筛选出匹配数据 
            }); 
            this.id = obj.id;
            console.log(this.id);
            this.title = obj.title; 
            localStorage.setItem('title', this.title);
            localStorage.setItem('cateId',this.id);
            this.$router.push({name:'cate',params:{id:this.id}})
            this.reload();
            // this.$router.push({path:'/cate/:id'})
        },
    }

}
</script>
<style>
.childcate{
    width:916px;
    min-height: 700px;
    margin:30px 0;
    -webkit-border-radius:5px;
    border-radius: 5px;
    box-shadow: 0 0 5px #eaeaea;
    padding:35px 35px 15px 35px;
    background: #ffffff;
    border:1px solid #eaeaea;
    background-clip:padding-box;
}
.childcate .catelists{
    width: 200px;
    height: 200px;
    border: 1px #cccccc solid;
    position: relative;
    float: left;
    margin-right: 20px;
    margin-top: 15px;
}
.childcate .catelists .catename{
    position: absolute;
    top:75px;
    width: 200px;
    text-align: center;
    font-size: 22px;
    color: #666;
}
.childcate .catelists .catestatuspass{
    position: absolute;
    width: 70px; 
    top:5px;
    text-align: center;
    right:5px;
    border-radius: 5px;
    background: #18C26A;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
}
.childcate .catelists .catestatuspassing{
    position: absolute;
    width: 70px; 
    top:5px;
    text-align: center;
    right:5px;
    border-radius: 5px;
    background: #FF9800;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
}
.childcate .catelists .catestatusnot{
    position: absolute;
    width: 70px; 
    top:5px;
    text-align: center;
    right:5px;
    border-radius: 5px;
    background: #E51C23;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
}
</style>


