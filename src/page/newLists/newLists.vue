<template>
       <div class="newList-container">
           <h4>新闻资讯</h4>
           <!-- 这里要想在url中拼接ID 因为ID是变了 需要绑定属性才能解析 ==> :to="'/home/newInfo'+ item.id" -->
           <router-link :to="'/home/newInfo/'+ item.id" v-for="item in msg" :key="item.id">
            <div class="mui-card">
                    <div class="mui-card-header mui-card-media">
                        <!-- <img :src="item.img_url" > -->
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543456659&di=a2804a2d6af71c1247125269bfbb7a9e&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd058ccbf6c81800abeb44537ba3533fa828b47b2.jpg" >
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <p>{{item.title}}</p>
                            <p style="color: #999;font-size: 14px;margin: 0px;">{{item.zhaiyao}}</p>
                        </div>
                    </div>
                    <div class="mui-card-footer">
                        <a class="mui-card-link">发表时间:{{item.add_time | dateFormat('YYYY-MM-DD')}}</a>
                        <a class="mui-card-link">点击量:{{item.click}}</a>
                    </div>
                </div>
            </router-link>
       </div>

</template>
<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return {
            msg:[]
        }
    },
    created(){
        this.getNewLists()
    },
    methods:{
        getNewLists(){
            this.$http.get('api/getnewslist').then(result=>{
            //    console.log(result) 
                if (result.body.status === 0) {
                    // 如果没有失败，应该把数据保存到 data 上
                    this.msg = result.body.message
                } else {
                    Toast("获取新闻列表失败！");
                }
                
            })
        },
        
    }
}
</script>
<style lang="less">
    .newList-container {
       padding: 10px 10px 0;
       h4 {
           margin-left: 10px;
           line-height: 25px;
       }
       .mui-card {
           .mui-card-header {
                height:140px;
                img{
                    width: 100%;
                    height: 248px;
                    margin-bottom: 10px;
                }
           }
           .mui-card-content{
               p{
                   font-size: 18px;
                   color: blue;
               }
           }
       }
    }
</style>


