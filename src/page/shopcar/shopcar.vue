<template>
    <div class="shoppingcar-Container">
        <!-- 购物车列表 -->
        <div class="mui-card" v-for="(item,i) in goodsCar" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media">
                            <mt-switch v-model="$store.getters.getSelect[item.id]" @change="selected(item.id,$store.getters.getSelect[item.id])"></mt-switch>
                            <img class="mui-media-object mui-pull-left" :src="item.thumb_path">
                            <div class="mui-media-body">
                                {{item.title}}
                                <p class="mui-ellipsis">
                                    <span>￥{{item.sell_price}} </span>
                                    <input type="button" value="-" @click="reduce(item.id)">
                                    <input type="text" readonly :value="$store.getters.getShopNum[item.id]">
                                    <input type="button" value="+" @click="add(item.id)">
                                    &nbsp;
                                    <a href="javascript:;" @click.prevent="remove(item.id,i)">删除</a>
                                </p>
                            </div>
                        </li>
			        </ul>
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 
                            <span class="red">{{$store.getters.getNumTrue.num}}</span> 件， 总价 
                            <span class="red">￥{{$store.getters.getNumTrue.total}}</span>
                        </p>
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
           goodsCar:[], //购物车商品
        }
    },
    created(){
        this.getGoods();
    },
    methods:{
        getGoods(){
            // 这里要把购物车商品的id通过"api/goods/getshopcarlist/87,88,89"方式传递,购物车信息都存储在vuex的car中
            var carIds = [];
            this.$store.state.car.forEach(item => {
                carIds.push(item.id)
            });
            // 如果购物车中没有商品 carIds是空 不应该发送请求
            if(carIds.length == 0){
                return;
            }
            this.$http.get('api/goods/getshopcarlist/'+ carIds.join(',')).then(result=>{
                // console.log(result)
                if(result.body.status==0 ){
                    this.goodsCar = result.body.message
                    // 服务器返回的数据商品数量都为1 所以我们需要把本地存储的数量取出来进行页面渲染
                    //  console.log(this.goodsCar)
                }
            })
        },
        add(id){
            this.$store.commit('addNum',id)
        },
        reduce(id){
            this.$store.commit('reduceNum',id)
        },
        remove(id,i){
           this.goodsCar.splice(i,1);
           this.$store.commit("removeCar", id);
        },
        selected(id,val){
           this.$store.commit("updateSelect",{ id, state: val })
        }
    }
}
</script>
<style lang="less">
.shoppingcar-Container {
    .mui-table-view-cell {
        border-top: 1px solid #ccc;
         padding: 5px 10px;
         display: flex;
        //  justify-content: space-between;
         align-items:center;
         .mui-switch{
             left:5px;
         }
    }
    .mui-card-content-inner{
        padding: 0;
        img {
            width: 60px;
            height: 60px;
            max-width: 70px;
            vertical-align: middle;
            margin-left: 10px;
        }
    }
    .mui-ellipsis{
        margin-top: 10px;
        span {
            color: red;
            font-weight: 700;
            font-size: 16px;
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
