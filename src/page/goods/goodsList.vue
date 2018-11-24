<template>
    <div class="goodsList-container">
        <div class="goodslist" v-for="item in goodsList" :key="item.id">
            <div class="goodsimg" >
                <img src="../../img/menu2.png" alt="">
            </div>
            <h3>{{ item.title }}</h3>
            <div class="goodsInfo">
                <p>￥{{ item.sell_price }}&nbsp;&nbsp;&nbsp;<del>￥{{ item.market_price}}</del></p>
                <div>
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
    export default {
        data(){
            return{
                pageIndex:1,
                goodsList:[]
            }
        },
        created(){
            this.getGoodsList();
        },
        mounted(){
            mui.init({
                pullRefresh : {
                    container:".goodsList-container",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                    up : {
                        height:50, //可选.默认50.触发上拉加载拖动距离
                        auto:true,  //可选,默认false.自动上拉加载一次
                        contentrefresh : "正在加载...",  //可选，正在加载状态时，上拉加载控件上显示的标题内容
                        contentnomore:'没有更多数据了',  //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback :this.getMore()   //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    }
                }
            })
        },
        methods:{
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result=>{
                    console.log(result);
                    if(result.body.status == 0){
                        this.goodsList = this.goodsList.concat(result.body.message)
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getGoodsList()
            }
        }
    }
</script>

<style lang="less">
.goodsList-container{
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
    padding: 10px;
    .goodslist {
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        width: 49%;
        border:1px solid #ccc;
        box-shadow: 0px 0px 8px #ccc;
        margin-bottom: 10px;
        min-height: 250px;
        h3 {
            font-size: 14px;
            margin-bottom: 10px;
        }
        .goodsimg{
            text-align: center;
            padding: 10px;
            img {
                width: 80%;
            }
        }
        .goodsInfo {
            bottom: 0;
            width: 100%;
            background-color: #eee;
            padding-top: 5px;
            p {
                margin: 0;
                padding: 0;
                font-size: 16px;
                color: red;
                font-weight: 700;
                del {
                    font-size: 12px;
                    color: #8f8f94;
                }
            }
           div {
                display: flex;
                justify-content:space-between;
                font-size: 12px;
                color: #666;
            }
        }

    }
}
</style>