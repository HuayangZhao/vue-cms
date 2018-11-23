<template>
    <div class="photos-container">
        <!-- 顶部导航 -->
       <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!-- 绑定属性可以用中括号 -->
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in photosClass" :key="item.id" @click=" getPhotosList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图文列表 -->
        <router-link :to="'/home/photoInfo/' + item.id" class="mui-card" v-for="item in photosList" :key="item.id" tag="div"> 
            <div class="mui-card-header mui-card-media">
                <img v-lazy="item.img_url">
                <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542965007487&di=505c71032125b4a0191f371c40ce724f&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0ff41bd5ad6eddc4802878ba34dbb6fd536633a0.jpg" > -->
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                         <p>{{ item.title }}</p>
                        <p style="color: #333;">{{ item.zhaiyao }}</p>
                    </div>
                </div>
            </div>
		</router-link>
    </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
// 初始化不能再这里  应该等组件挂在到页面之后再初始化
//    mui('.mui-scroll-wrapper').scroll({
//             deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//     }); 
export default {
    data(){
        return {
            // 分类数据
            photosClass:[],
            // 图片
            photosList:[]
        }
    },
    created(){
        this.getPhotosClass();
        // 默认页面一加载
        this.getPhotosList(0)
    },
    methods:{
        // 获取分类
        getPhotosClass(){
            this.$http.get('api/getimgcategory').then(result=>{
                // console.log(result)
                result.body.message.unshift({ title:'全部', id:0 })
                this.photosClass = result.body.message
            })
        },
        // 获取图片列表 id通过函数参数传递
        getPhotosList(id){
            this.$http.get('api/getimages/'+ id).then(result=>{
                // console.log(result)
                 this.photosList = result.body.message
            })
        }
    },
    mounted(){
        // 等页面加载完毕后初始化
        mui('.mui-scroll-wrapper').scroll({
           deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        }); 
    }
    
}
</script>
<style lang="less">
* {
  touch-action: pan-y;
}
.mui-card{
         margin-bottom: 10px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
    .mui-card-header{
        img:first-child {
            height: auto;
        }
        padding: 0;
        img{
            width: 100%;
            margin-bottom: 15px;
        }
        .mui-card-content{
            background-color:rgba(0, 0, 0, 0.034);
            position:static ;
        }
    }
}
img[lazy=loading] {
    width: 50px;
    height: 50px;
    display: block;
  margin: auto;
}
</style>
