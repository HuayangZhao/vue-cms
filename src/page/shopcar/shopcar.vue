<template>
    <div class="shoppingcar-Container">
        <div class="mui-card" v-for="item in goodsCar" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media">
                            <img class="mui-media-object mui-pull-left" :src="item.thumb_path">
                            <div class="mui-media-body">
                                {{item.title}}
                                <p class="mui-ellipsis">
                                    <span>￥{{item.sell_price}} </span>&nbsp;&nbsp;&nbsp;
                                    <input type="button" value="-">
                                    <input type="text" :value="item.cou">
                                    <input type="button" value="+" >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="javascript:;">删除</a>
                                </p>
                            </div>
                        </li>
			        </ul>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">5</span> 件， 总价 <span class="red">￥4444</span></p>
                     </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
           goodsCar:[] //购物车商品
        }
    },
    created(){
        this.getGoods()
    },
    methods:{
        getGoods(){
            // 这里要把购物车商品的id通过"api/goods/getshopcarlist/87,88,89"方式传递,购物车信息都存储在vuex的car中
            var carIds = [];
            this.$store.state.car.forEach(item => {
                carIds.push(item.id)
            });
            // 如果购物车中没有商品 carIds是空数组 不应该发送请求
            if(carIds.length <= 0){
                return;
            }
            this.$http.get('api/goods/getshopcarlist/'+ carIds.join(',')).then(result=>{
                // console.log(result)
                if(result.body.status==0 ){
                    this.goodsCar = result.body.message
                     console.log(this.goodsCar)
                }
            })
        }
    }
}
</script>
<style lang="less">
.shoppingcar-Container {
    .mui-table-view-cell {
        border-top: 1px solid #ccc;
         padding: 5px 20px;
         display: flex;
        //  justify-content: space-between;
         align-items:center;
    }
    .mui-card-content-inner{
        padding: 0;
        img {
            width: 60px;
            height: 60px;
            max-width: 70px;
            vertical-align: middle;
        }
    }
    .mui-ellipsis{
        margin-top: 10px;
        span {
            color: red;
            font-weight: 700;
            font-size: 16px
        }
        input{
            width: 30px;
            height: 30px;
            font-size: 16px;
            text-align: center;
            line-height: 30px;
            padding: 0;
            margin: 0;
        }
    }

    .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }

}

</style>
