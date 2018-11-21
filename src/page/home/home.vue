<template>
    <div class="home-container">
        <!--轮播图-->
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in bannerinfo" :key="item.img">
                <a :href="item.url"><img src="item.img"></a>
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格导航栏-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newLists">
                    <img src="../../img/menu1(1).png" >
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../img/menu2.png" >
                    <div class="mui-media-body">图片分享</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../img/menu3.png" >
                    <div class="mui-media-body">商品购买</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../img/menu4.png" >
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../img/menu5.png" >
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../img/menu6.png" >
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    // 导入提示框
    import {Toast} from 'mint-ui';

    export default {
        data() {
            return {
                // 接受请求回来的图片
                bannerinfo: []
            }
        },
        created() {
            this.getBanner()
        },
        methods: {
            getBanner() {
                this.$http.get('api/getlunbo').then(result => {
                    // console.log(result);
                    if (result.body.status === 0) {
                        this.bannerinfo = result.body.message
                    } else {
                        // 加载失败显示提示框
                        Toast({
                            message: '图片加载失败,请重试',
                            position: 'middle',
                            duration: 2000
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="less">
.home-container {
    // 轮播图
    .mint-swipe {
        height: 200px;
    }
    // 九宫格
    .mui-grid-view.mui-grid-view {
        background-color: #fff;
        border: none;
        li{
            border: none;
            img{
                width: 60%;
            }
        }
    }
}   
</style>