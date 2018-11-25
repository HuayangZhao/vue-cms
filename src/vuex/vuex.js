import Vue from 'vue'
// 导入Vuex
import Vuex from "vuex"
Vue.use(Vuex)
export default  new Vuex.Store({
  state:{
    count:20,
    car:[] //将购物车中的信息存储在数组中
  },
  mutations:{
      //利用mutations实现点击购物车时把商品相关信息加入car数组中
      addToCar(state,goodsObj){
        //   设置截流阀
          var flag = true;
        //   加入之前需要判断数组中是否已经存在 如果存在就只用数量相加
        state.car.some(item=>{
            if(item.id ==goodsObj.id){
                item.number += parseInt(goodsObj.number)
                flag = false;
                return true //some方法当返回true时就会结束
            }
        })
        if(flag){
            state.car.push(goodsObj)  //只有当car里面没有goodsObj时才执行这一步 所以这里需要设置截流阀
        }
      }
  },
  getters:{
    //   getters相当于计算属性 类似于截流阀 只要里面的数据改变 用到的里面数据的地方都会相应刷新改变
    shopCarNum(state){
        var c = 0;
        state.car.forEach(item=>{
            c += item.number;
        })
        return c
    }
  }
})
