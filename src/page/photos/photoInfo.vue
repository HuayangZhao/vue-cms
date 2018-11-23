<template>
    <div class="photoInfo-container">
        <!-- 大标题 -->
        <h5 class="title">{{ content.title }}</h5>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ content.add_time | dateFormat }}</span>
            <span>点击：{{ content.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in imgList" :src="item.src" height="100" @click="$preview.open(index, imgList)" :key="item.src">
            <!-- <img class="preview-img" v-for="(item, index) in imgList" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2073776686,2667685421&fm=26&gp=0.jpg" @click="$preview.open(index, imgList)" :key="item.src"> -->
        </div>
        <!-- 内容区域 -->
        <div class="content" v-html="content.content"></div>

        <!-- 评论区组件 -->
         <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import comment from "../../components/comment.vue"
export default {
    data(){
        return {
            id:this.$route.params.id,
            // 图文详情
            content:[],
            // 缩略图数组
            imgList:[]
        }
    },
    created(){
        this.getPhotoInfo();
        this.getImgList()
    },
    methods:{
        // 获取图文详情
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+ this.id).then(result=>{
                // console.log(result)
                this.content = result.body.message[0]
            })
        },
        // 获取缩略图
        getImgList(){
            this.$http.get('api/getthumimages/'+ this.id).then(result=>{
                // console.log(result)
                // 循环每个图片数据，补全图片的宽和高
                result.body.message.forEach(element => {
                    element.w = 600;
                    element.h = 400;
                });
                this.imgList = result.body.message
            })
        }
    },
    components:{
        'comment-box':comment,
    }
}
</script>
<style lang="less">
    .photoInfo-container {
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
    .thumbs{
        img{
        margin: 10px;
        width: 50px;
        height: 50px;
        box-shadow: 0 0 8px #999;
        }
    }
</style>
