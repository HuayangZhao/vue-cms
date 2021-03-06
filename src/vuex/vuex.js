import Vue from 'vue'
// 导入Vuex
import Vuex from "vuex"
Vue.use(Vuex)

// 重新打开页面就从本地存储中加载购物车数量 防止本地存储中没有数据 默认给个空数组
var car =JSON.parse(localStorage.getItem('car')|| "[]")
export default  new Vuex.Store({
  state:{
    car:car //将购物车中的信息存储在数组中
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
        // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中 转换成字符串
        localStorage.setItem('car', JSON.stringify(state.car))
      },
      addNum(state,id){
        state.car.some(item=>{
           if(item.id==id) {
               item.number ++;
               return true;
           }
        })
        localStorage.setItem('car', JSON.stringify(state.car))
      },
      reduceNum(state,id){
        state.car.some(item=>{
           if(item.id==id) {
               item.number--;
               return true;
           }
        })
        localStorage.setItem('car', JSON.stringify(state.car))
      },
      removeCar(state,id){
        state.car.some((item,i)=>{
            if(item.id==id) {
                state.car.splice(i,1);
                return true;
            }
        })
        localStorage.setItem('car', JSON.stringify(state.car))
      },
      updateSelect(state,info){
        state.car.some(item=>{
            if(item.id == info.id){
                item.state = info.state
            }
        })
        localStorage.setItem('car', JSON.stringify(state.car))
          
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
    },
    // 获取购物车中商品数量
    getShopNum(state){   
        var o = {}
        state.car.forEach(item=>{
            o[item.id] = item.number;
        })
        return o;
    },
    // 获取购物车中商品勾选状态
    getSelect(state){   
        var o = {}
        state.car.forEach(item=>{
            o[item.id] = item.state;
        })
        return o;
    },
    // 获取购物车商品总数
    getNumTrue(state){
        var o = {
            num : 0 ,//购物车勾选数量
            total : 0 //购物车总价
        } ;
        state.car.forEach(item=>{
            if(item.state){
                o.num += item.number;
                o.total += item.number * item.price
            }
        })
        return o;
    }
  }
})
