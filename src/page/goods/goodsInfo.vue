<template>
    <div class="goodsInfo">
        <!-- 轮播图 -->
         <!-- <swiper :lunbotuList="lunbotu" :isfull="false"></swiper> -->

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 父组件向子组件传值 不需要担心异步响应没回来的问题 因为是单行下行绑定 -->
                 <swiper :bannerinfo="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!-- 商品名称 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                     <p class="price">
                        市场价：
                        <del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：
                        <span class="now_price">￥{{goodsInfo.sell_price}}</span>
                    </p>
                    <div class="shopNum"> 
                        购买数量:&nbsp;&nbsp;
                        <input type="button" value="-" @click="reduce">
                        <input type="text" v-model="number">
                        <input type="button" value="+" @click="add">
                    </div>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small" @click="addCar">加入购物车{{$store.state.count}}</mt-button>
            </div>
        </div>
        <!-- 购物车小球动画 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        name="zhy">
            <div class="ball" ref="ball" v-show="ballFlag" ></div>
        </transition>
        <!-- 商品参数 -->
        <div class="mui-card">
            <div class="mui-card-header">商品名称</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time |dateFormat('YYYY-MM-DD')}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
			
			
			
    </div>
</template>
<script>
 // 导入轮播图
import swiper from "../../components/swiper.vue"
import { Toast } from "mint-ui";
export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbotu:[],
            goodsInfo:{},
            number:1,
            ballFlag:false
        }
    },
    created(){
        this.getSwiper();
        this.geiGoodsComment()
    },
    methods:{
        // 获取商品轮播图
        getSwiper(){
            this.$http.get("api/getthumimages/" + this.id).then(result=>{
                // console.log(result)
                if (result.body.status === 0) {
                    // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
                    result.body.message.forEach(item => {
                        item.img = item.src;
                    });
                    this.lunbotu = result.body.message;
                    }
            })
        },
        // 跳转到商品详情
        goDesc(id){
            this.$router.push({name: "goodsdesc", params: { id } })
        },
        // 跳转到评论
        goComment(id) {
            // 点击跳转到 评论页面
            this.$router.push({ name: "goodscomment", params: { id } });
        },
        // 获取商品参数
        geiGoodsComment(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                // console.log(result)
                if(result.body.status== 0){
                    this.goodsInfo = result.body.message[0]
                }
            })
        },
        // 加数量
        add(){
            if(this.number >= this.goodsInfo.stock_quantity){
               return Toast('已到达库存上线')
            }
            this.number++;
        },
        // 减数量
        reduce(){
            if(this.number < 1){
               return Toast('购买数量不能低于1件')
            }
            this.number--;   
        },
        // 加入购物车
        addCar(){
            this.ballFlag = !this.ballFlag;
            var goodsObj = {}; //点击购物车把商品数量,ID存入对象{id:88,number:2} 传给购物车徽标
            goodsObj.number = this.number;
            goodsObj.id = this.id;
            // this.$store.state.car.push(goodsObj) 不推荐直接修改$store.state中的状态数据 出问题不容易找到哪里出错 只能用$store中的mutations来实现数据的修改
            this.$store.commit('addToCar',goodsObj)
            // console.log(this.$store.state.car)
        },
        beforeEnter(el){
            el.style.transform = "translate(0, 0)";
        },
        enter(el,done){
            el.offsetWidth;
             // 获取小球的 在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // console.log( ballPosition)
            // 获取 徽标 在页面中的位置
            const badgePosition = document
                .getElementById("badge")
                .getBoundingClientRect();


            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },  
    },
    components:{
        swiper
    } 

}
</script>
<style lang="less">
.shopNum {
    input{
        width: 30px;
        height: 30px;
        font-size: 16px;
        text-align: center;
        line-height: 30px;
        padding: 0;
    }
}
.mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
.mui-card-content-inner {
    padding-bottom: 0;
}
.ball{
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    top: 372px;
    left: 139px;
}
</style>
