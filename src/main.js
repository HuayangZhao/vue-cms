// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 导入app.vue
import App from './App'
// 导入路由
import router from './router'
// 引入MUI
import "./lib/mui/css/mui.css"
// 引入头部,轮播图
import {Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 导入mui字体图标样式
import "./lib/mui/css/icons-extra.css"
import  "./lib/mui/fonts/mui-icons-extra.ttf"
// 导入vue-resource请求
import VueResource from 'vue-resource'
Vue.use(VueResource)


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
