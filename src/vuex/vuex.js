import Vue from 'vue'
// 导入Vuex
import Vuex from "vuex"
Vue.use(Vuex)
export default  new Vuex.Store({
  state:{
    count:20,
    car:[] //将购物车中的信息存储在数组中
  },
  mutations:{},
  getters:{}
})
