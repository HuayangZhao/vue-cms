import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 导入自己创建的路由模块
import homeContainer from "../page/home/home.vue"
import memberContainer from "../page/member/member.vue"
import searchContainer from "../page/search/search.vue"
import shopcarContainer from "../page/shopcar/shopcar.vue"
import newListsContainer from "../page/newLists/newLists.vue"
import newInfoContainer from "../page/newInfo/newInfo.vue"
// 创建路由并暴露出去
export default new Router({
  routes: [
      {path:'/',redirect:'/home'},
      {path:'/home',component:homeContainer},
      {path:'/member',component:memberContainer},
      {path:'/search',component:searchContainer},
      {path:'/shopcar',component:shopcarContainer},
      {path:'/home/newLists',component:newListsContainer},
      {path:'/home/newInfo/:id',component: newInfoContainer}
  ],
   // 设置当前选中类名 覆盖默认的选中类router-link-active
    linkActiveClass:'mui-active'
})
