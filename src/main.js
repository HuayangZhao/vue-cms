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
import {Header, Swipe, SwipeItem,Button,Switch} from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
// 导入mui字体图标样式
import "./lib/mui/css/icons-extra.css"
import  "./lib/mui/fonts/mui-icons-extra.ttf"
// 导入vue-resource请求
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.lovegf.cn:8899/';
// 引入时间格式化包
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD HH:mm:ss"){
 // pattern="YYYY-MM-DD HH:mm:ss" 第二个参数是给过滤器设置默认格式参数 这里设置后 管道符后如果没有传参也不会是undifinde
 // moment(dataStr 不传这个参数获取的就是目前时间).format(pattern format内这个参数是指定格式)
  return moment(dateStr).format(pattern)
})
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: '/src/img/menu2.png',
  loading: '/src/img/menu3.png',
})
// 图片预览
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

// 导入Vuex
import store from "./vuex/vuex.js"

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
