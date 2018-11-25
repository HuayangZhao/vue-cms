<template>
    <div class="swiper">
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in bannerinfo" :key="item.img">
                <!-- 利用属性绑定类 为true就有类名 -->
                <a :href="item.url"><img :src="item.img" :class="{full: isfull}"></a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:["bannerinfo","isfull"]
}
</script>
<style lang="less">
 // 轮播图
.swiper{
    height: 200px;
    text-align: center;
    .mint-swipe {
        height: 100%;
    }
    .full {
        width: 100%;
    }
}
    
</style>
