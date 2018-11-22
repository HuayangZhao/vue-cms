<template>
    <div class="newInfo-container">
        <!-- 大标题 -->
        <h5 class="title">{{ newObj.title }}</h5>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newObj.add_time | dateFormat }}</span>
            <span>点击：{{ newObj.click }}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newObj.content"></div>

        <!-- 评论区组件 -->
         <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
// 导入评论组件  并在vue实例注册组件
import comment from "../../components/comment.vue"
import { Toast } from "mint-ui";
export default {
    data(){
        return {
            id:this.$route.params.id,
            newObj: {}
        }
    },
    created(){
        this.getNewInfo()
    },
    methods:{
        getNewInfo(){
            this.$http.get('api/getnew/'+ this.id).then(result=>{
                // console.log(result)
                if(result.body.status === 0){
                    this.newObj = result.body.message[0]
                }else{
                     Toast("获取新闻失败！");
                }
            })
        }
    },
    components:{
        "comment-box":comment,
    }
    
}
</script>
<style lang="less">
    .newInfo-container {
        padding: 15px;
        h5{
            text-align: center;
            font-weight: 700;
            color: #0a07f1;
            margin-bottom: 10px;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            color: SKYBLUE;
             font-size: 12px;
        }
        .content{
            p {
                color: #000;
                text-indent:2em;
                font-size: 12px;
            }
           
        }
        
    }
</style>

    



