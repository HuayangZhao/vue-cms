<template>
    <div class="photos-container">
       <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a data-v-83981720="" class="mui-control-item mui-active">
                        全部
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        家居生活
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        摄影设计
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        明星美女
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        空间设计
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        户型装饰
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        广告摄影
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        摄影学习
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        摄影器材
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        明星写真
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        清纯甜美
                    </a>
                    <a data-v-83981720="" class="mui-control-item">
                        古典美女
                    </a>
                </div>
            </div>
        </div>
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

        }
    },
    methods:{
       
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
</style>
