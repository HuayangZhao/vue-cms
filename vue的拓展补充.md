# vue-cli中常见插件的使用及配置
## 配置echars
1. 安装`npm install echarts  -S`
2. 在组件中定义图表容器并初始化数据
   ```vue
    // 假设是 index.vue
    // 1. 在template中的html标签中定义容器
    <div id="echarsbox" :style="{width: '300px', height: '300px'}"></div>
    // 2. 在script中引入
    <script>
        import echarts from 'echarts'
        export default {
          name: 'Echars',
          mounted () {
            // 在虚拟dom被渲染之后 初始化图表
            this.initEchats()
          },
          methods: {
            initEchats () {
              // 基于准备好的dom，初始化echarts实例
              let myChart = echarts.init(document.getElementById('echarsbox'))
              // 绘制图表
              myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                  data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                  {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                  }
                ]
              })
            }
          }
        }
        </script>
   ```

## 配置百度地图
1. 在index.html中引入百度地图js文件并配置ak密钥
   ```html
    <!-- ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key -->
    <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=vzXNzSyKlreYULh0hLNcYj9uN1iOLnd9"></script>
   ```

2. 在需要使用的.vue组件中配置百度地图
   ```javascript
    // 2.1 设置地图容器设置宽高 
    <div id="allmap" style="width: 80%; height: 500px;">百度地图。。。</div>
    // 2.2 在index.html中引入百度之后就有BMap构造函数了
    // 2.3 在mounted钩子函数中初始化百度地图
    var map = new BMap.Map('allmap') // 创建地图实例
    var point = new BMap.Point(116.331398, 39.897445) // 创建点坐标
    map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别    
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.ScaleControl())
    map.addControl(new BMap.OverviewMapControl())
    map.addControl(new BMap.MapTypeControl())
    map.setCurrentCity('武汉') // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    map.setMapStyle({style: 'midnight'}) // 地图风格
   ```

## 使用mui
### 引入mui.js
1. 将mui放到vue-cli项目的`src/assets`路径下
2. 在webpack.base.conf.js中配置
   ```javascript
    // 2.1 在webpack.base.conf.js的resolve中的alias中添加 mui当前行代码
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            // 定义别名和插件位置
            'mui': path.resolve(__dirname, '../src/assets/mui/js/mui.js')
        }
    }
   ```

3. 在webpack.dev.conf.js中配置mui相关
   ```javascript
    plugins: [
        new webpack.ProvidePlugin({
            mui: "mui",
            "window.mui": "mui"
        }),
        new webpack.DefinePlugin({
          'process.env': require('../config/dev.env')
        }),
    ]
   ```

### 引入mui.js报错及解决
1. `caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
   ```javascript
   // 真正问题产生是由于babel-loader在编译代码时会加严格模式限制
   //  在项目根目录中的 .babelrc文件中忽略不需要使用严格模式转换的文件路径
    "plugins": ["transform-vue-jsx", "transform-runtime"],
    "ignore": [
      "./src/assets/mui/js/*.js",
    ]
   ```

2. mui中的滚动会在浏览器控制中报警告,需要添加一举样式代码

```css
* { touch-action: pan-y; }
```

3. mui.js导入之后,滚动效果的js代码和tabbar产生了冲突,导致路由跳转失效

> **原因**: js中有操作类名的代码,这些代码中的类名和tabbar上的类名一模一样
> **解决**: 需要自己手动的更改tabbar上的类名为自定义类名,然后将系统默认类名中样式拷贝过来

### vue-cli引入mui.css出错
1. 找到引入的mui.css
2. 搜索svg
3. 将svg最外层的单引号改为双引
   ```javascript
   .mui-spinner:after {
    //   background-image: url('data:image/..')
     //   background-image: url("data:image/..")
   }
   ```

4. [vue-cli引入mui.css出错](https://segmentfault.com/q/1010000010058553)

### 在vue-cli中创建本地mock接口
- 进入`build/webpack.dev.conf.js`在文件中添加如下信息
  
```javascript
const express = require("express");//需要先npm install --save express
const app = express(); 
const appData = require("../data.json"); //data.json,就是本地的模拟数据
const appRoutes = express.Router();
appRoutes.get("/seller", function(req, res) {
    res.json({
        errno: 0,
        data: ['三国演义', '水浒传']
    })
});
```

- 在第一步修改的文件中找到`devServe`对象然后添加`before函数`具体配置如下
  
```javascipt
devServer: {
    before(app) {
      app.use("/api", appRoutes);
    },
    // 上面的before中的是要添加内容
    ....
```



# Vue面试题
## 对于MVVM的理解？
- MVVM 是 Model-View-ViewModel 的缩写
  + Model 代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。
  + View 代表UI 组件，它负责将数据模型转化成UI 展现出来。
  + ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。
- 在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上
- ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

## scoped作用原理?怎么解决加了scoped后动态渲染的HTML标签样式不能修改的问题?

> scoped可以隔离组件之间的样式,避免样式污染

> 作用原理:当一个组件的style加了`scoped`后,首先vue解析当前组件时,会给当前组件中所有元素加上一个随机的属性,然后style中书写的样式会全部变成属性选择器,那么即使其他组件有相同的样式或者相同的标签，由于随机添加的属性是不一样的,组件之间的样式也不会相互影响

> 当在父组件中取修改子组件中标签样式,可以使用[vue-loader深度作用选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8),在父组件的样式名和子组件的样式名之间添加`>>>`或者`/deep/`

## Vue生命周期函数的理解?
### 生命周期的的钩子函数
> 生命周期的四个阶段:

> 实例创建阶段:

- `beforeCreate`:vue实例被创建时触发,此时仅仅是分配了内存,vue实例上的属性和方法都还没被绑定
- `created`:vue实例被创建完毕,data中的属性和methods中的方法都已经被挂载到了vue实例上

> DOM渲染阶段:

- `beforeMount`:vue实例中的数据已经被解析渲染到了内存中的虚拟DOM上,但真实DOM中指令还没有被解析
- `mounted`:vue实例中的数据已经完全被渲染到了真实DOM中

> 数据更新阶段:vue实例上的数据发生变化时触发

- `beforeUpdate`:模型中数据已经发生变化,但还没有同步更新到视图中
- `updated`:模型中数据发生了变化,而且已经同步到了视图中

> 实例销毁阶段:

- `beforeDestroy`:vue中的数据和方法还能继续使用,但是指令不能再被vue解析
- `destroyed`:vue中的数据和方法都已经被销毁

### 生命周期的问题与理解
1. 什么是vue生命周期？

   Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 Vue 的生命周期。

2. vue生命周期的作用是什么？

   它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。

3. vue生命周期总共有几个阶段？

   它可以总共分为8个阶段：创建前/后、载入前/后、更新前/后、销毁前/销毁后。

4. 第一次页面加载会触发哪几个钩子？

   会触发下面这几个beforeCreate、created、beforeMount、mounted 。

5. DOM 渲染在哪个周期中就已经完成？

   DOM 渲染在 mounted 中就已经完成了

## vue-router路由模式有几种,原理分别是什么?

> vue-router路由库是用哪种技术实现的,总共有两种,分别叫hash模式和history模式,默认是history模式

> hash模式:地址上带有#号;url地址可以放在任意标签中打开;可以兼容低版本的浏览器

> hash模式原理:监听`hashchange`事件,可以调用`window.location.hash`获取到锚点值,和路由规则进行匹配,匹配到之后将路由规则中定义的组件渲染到页面

> history模式:地址上没有#号,更加符合URL形式;url地址不能重复打开;

> history模式原理:利用HTML5新提供的`history.pushState` API 来完成 URL 跳转而无须重新加载页面

> history模式需要后台进行相关配置:要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面

## vue-router导航钩子函数使用场景?

> `beforeEach`:全局守卫,在路由跳转时会对路由进行拦截,只有调用了`next`函数才会释放路由,使用场景:通常在后台管理系统中,页面是需要登录之后才能访问,那么对于所有的页面跳转都需要使用`beforeEach`进行拦截判断是否登录

> `beforeEnter`:路由独享守卫,只会拦截加了独享守卫的路由跳转。使用场景:如果整个项目中只有某一部分页面是需要登录之后才能访问,此时只能针对这一部分页面的路由规则加上独享守卫进行拦截。

## vue-router路由懒加载怎么使用?(单页应用程序的性能优化)

> 路由懒加载:使用懒加载可以在跳转到具体路由时才去加载对应的组件代码,没有访问的路由的组件代码永远不会加载回来。

> 用法:将导入组件的方式换成:`const Foo = () => import('./Foo.vue')`

## axios拦截函数的使用场景?请求拦截/响应拦截

> 请求拦截:在发送请求之前,对请求对象做相关配置,给请求头添加验证属性(登录校验)、设置参数数据格式(Content-Type)

> 响应拦截:当接口返回的信息是统一的类型时,如果都在具体的请求函数里面去做处理,比较繁琐,可以在响应拦截器中先做统一处理,在分发到具体的函数中。例如当后台的token过期时,如果在每一个请求函数中都做判断,然后跳转页面比较麻烦,由于token过期后台会返回规定的统一状态码,那么就可以使用响应拦截在拦截器中进行判断然后跳转

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if(response.code = 400){
        this.$router.push('/login')
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

## 什么是Vue双向数据绑定?原理?
> vue实现数据双向绑定主要是：采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty() 将它们转为 getter/setter。用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

> vue的数据双向绑定 将MVVM作为数据绑定的入口，整合Observer，Compile和Watcher三者，通过Observer来监听自己的model的数据变化，通过Compile来解析编译模板指令（vue中是用来解析 {{}}），最终利用watcher搭起observer和Compile之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果

- 原生js实现双向数据绑定
  ```javascript
  <body>
    <input type="text">
    <p></p>
    <script>
        var data = {name: ''}
        Object.defineProperty(data, 'name', {
            get() { // 获取属性值
                return obj
            },
            set(newval) {
                console.log(99999)
                // 当data.name发生改变的时候会触发set
                // 当触发set的时候将输入框中最新的值设置给p完成p标签内容的改变
                document.querySelector('p').innerHTML = newval
                
            }
        })

        // 监听输入框文本改变
        document.addEventListener('input', (e) => {
            // 输入框中的值发生改变 --》 给data.name重新赋值 --》 data.name改变 --》触发set方法 --》将最新的值同步到view中
            data.name = e.target.value
            console.log(data)
        })
    </script>
  </body>
  ```

## Vue组件间的参数传递
1. 父组件与子组件传值

父组件传给子组件：子组件通过props方法接受数据；

子组件传给父组件： $emit 方法传递参数

2. 非父子组件间的数据传递，兄弟组件传值

eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。项目比较小时，用这个比较合适（虽然也有不少人推荐直接用VUEX，具体来说看需求咯。技术只是手段，目的达到才是王道）。

3. 复杂的状态管理使用vuex

## Vue与Angular以及React的区别？
> 版本在不断更新，以下的区别有可能不是很正确。我工作中只用到vue，对angular和react不怎么熟。

1. 与AngularJS的区别

相同点：都支持指令：内置指令和自定义指令；都支持过滤器：内置过滤器和自定义过滤器；都支持双向数据绑定；都不支持低端浏览器。

不同点：AngularJS的学习成本高，比如增加了Dependency Injection特性，而Vue.js本身提供的API都比较简单、直观；在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢；Vue.js使用基于依赖追踪的观察并且使用异步队列更新，所有的数据都是独立触发的。

2. 与React的区别

相同点：React采用特殊的JSX语法，Vue.js在组件开发中也推崇编写.vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用；中心思想相同：一切都是组件，组件实例之间可以嵌套；都提供合理的钩子函数，可以让开发者定制化地去处理需求；都不内置列数AJAX，Route等功能到核心包，而是以插件的方式加载；在组件开发中都支持mixins的特性。

不同点：React采用的Virtual DOM会对渲染出来的结果做脏检查；Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷地操作Virtual DOM。


## vuex是什么？怎么使用？哪种功能场景使用它？
只用来读取的状态集中放在store中； 改变状态的方式是提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。

在main.js引入store，注入。新建了一个目录store，… export 。

场景有：单页应用中，组件之间的状态、音乐播放、登录状态、加入购物车


## 什么是深拷贝?深拷贝浅拷贝的区别?如何实现?

> 深拷贝讨论的对象 主要是指定js中的复杂数据类型

> 最简单的实现方式:JSON.parse(JSON.stringify(obj)),这种方式的弊端不能实现对象中函数的拷贝

> 比较常见的实现方式: for-in循环加上递归

> for-in 循环需要判断不同的数据类型,如果是对象使用递归克隆,如果是数组,可以直接调用concat方法或者splice方法进行深拷贝,如果是函数/Date,使用constructor重新实例化函数和时间类型

```js
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0; i < obj.length; i++) {
            copy.push(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Object) {
        var copy = {};
        for (var key in obj) { //递归 
            if (obj.hasOwnProperty(key)) {
                copy[key] = deepClone(obj[key]);
            }
        }
        return copy;
    }
}
```

> https://juejin.im/entry/57bd3817a34131005b21cbdb


## Restful API理解

> REST是所有Web应用都应该遵守的架构设计指导原则。

> Restful API是基于REST原则设计开发出来的接口，本质上只是一种规则

> 面向资源是REST最明显的特征，对于同一个资源的一组不同的操作。资源是服务器上一个可命名的抽象概念，资源是以名词为核心来组织的，首先关注的是名词。REST要求，必须通过统一的接口来对资源执行各种操作。对于每个资源只能执行一组有限的操作。（7个HTTP方法：GET/POST/PUT/DELETE/PATCH/HEAD/OPTIONS）


> 传统接口开发风格:请求方法 + 动词 + 名词

获取用户列表: http://www.027xin.com:8899/api/getusers  get方法
获取用户详情: http://www.027xin.com:8899/api/getuserinfo get方法
新增用户: http://www.027xin.com:8899/api/adduser       post方法
编辑用户: http://www.027xin.com:8899/api/edituser      post方法
删除用户: http://www.027xin.com:8899/api/deleteuser    get方法

> Restful API风格: 请求方法 + 名词单复数(通过明确的请求方法和名词来操作同一个资源)

获取用户列表: http://www.027xin.com:8899/api/users     get方法
获取用户详情: http://www.027xin.com:8899/api/user/:id  get方法
新增用户: http://www.027xin.com:8899/api/user          post方法
编辑用户: http://www.027xin.com:8899/api/user/:id      put方法
删除用户: http://www.027xin.com:8899/api/user/:id      delete方法

## [图片懒加载原理](https://www.cnblogs.com/flyromance/p/5042187.html)

> 1. 当数据请求回来之后,有多少图片数据就创建多少个img标签,先给img标签的src属性设置一张占位图,然后给img标签设置一个自定义属性,属性值为真实的图片地址,例如:`<img data-src='http://xxxxxx.png' src='placeholder.jpg'/>`

> 2. 当页面进行滚动时,监听滚动的偏移和img元素的位置,当img元素出现在可视范围之内时,将当前img的src属性值设置为data-src属性的值,只要img标签src属性为真实图片地址,自然会去请求图片回来,对于还没有出现在可视范围之内的img,由于src属性没有设置网络地址,则不会去请求,这样图片的懒加载就可以实现了。


## 谈谈Promise的理解?怎么实现?

> Promise其实内部也有一个defers队列存放事件，.then的事件就在里面,程序开始执行的时候，.then就已经放入下一个事件，然后后面当异步操作完成时，resolve触发事件队列中的事件，便完成了一个.then操作，每次异步操作完成通过resolve触发事件并将事件从事件队列中移除，通过事件队列中的事件的resolve使事件的触发持续下去


## 工作中处理过的兼容性问题?

> [兼容性问题处理](https://juejin.im/entry/5b22686be51d4558af4015a1)

> [移动端开发的兼容问题](https://juejin.im/entry/5a17ad3af265da432240e1f2)

> 移动端滚动穿透

> 移动端输入框被键盘挡住问题

> IOS滚动不平滑的问题

> click 300ms 延时响应 

## 处理过的性能优化问题?

[性能优化](https://juejin.im/post/5b0bff30f265da08f76cc6f0)
[前端性能优化--从 10 多秒到 1.05 秒](https://juejin.im/post/5b0bff30f265da08f76cc6f0)

### webpack里面

1. 路由懒加载(组件按需加载)
2. 分离第三方包(抽取第三方模块安装的包的代码,较少build.js的体积)
3. 分离CSS

### JS
1. 对高频触发的事件进行节流或消抖(touchmove)
2. 尽量减少 HTTP 请求个数——须权衡(精灵图是合并请求,分离第三方包/css是拆分请求)
3. 避免空的 src 和 href
4. 减少 DOM 访问,减少DOM访问层级(迫不得已需要访问DOM,可以将DOM进行缓存)
5. 使用 CDN（内容分发网络）(静态资源使用CDN加速,用户访问时从CDN获取资源,CDN根据IP地址直接返回当前城市服务器中的资源)


## 工作中遇到的难解决的问题?后来是如何解决的?

- 组件绑定原生事件,无法绑定时使用native修饰符

- 后台系统中根据权限动态添加路由规则
```js
// 根据后台返回的权限列表,动态的向路由规则对象的routes数组中添加路由规则
	router.addRoutes([
	   {
		path:'/',
		component:user	
	])
```

- scoped问题(父组件无法直接修改子组件以及v-html渲染出来标签的样式,vue-loader深度作用选择器)

```js
// css中使用 >>> 作为操作符
.father >>> .son {

}
// css或者less中使用 /deep/ 作为操作符
.father /deep/ .son {

}
```


## SPA单页应用程序性能优化

> 问题:首页加载速度过慢,首页白屏

> 1. 分离第三方包:将自己写的代码和引用的第三方模块分开打包,一个js文件变成多个js文件之后,由于浏览器多线程的原因,当加载完第一个js的时候,可以使用一个线程解析渲染第一个js的内容,同时又可以用另外一个线程下载其他的js

> 2. 分离css文件:将css从js中分离出来后,在解析js的时候,又可以去下载对应的css

> 3. 路由懒加载:当用户访问到某个路由时,才会去加载该路由对应的组件代码,对于没有访问的页面,这些组件的代码一直不会被加载回来,可以提高首页的访问速度

> [路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)

```js
// 路由懒加载需要将导入组件的方式由 import 组件名 from '路径'改成以下代码
const 组件名 = () => import('路径')
```

## 其他
```
webpack打包:是将项目开发阶段的代码进过编译整合到一起,输出静态文件,包含html、css、js
App打包: 是将前端开发好的移动web打包成一个可以安装到手机上的App
- HBuilder打包:在线打包,不需要依赖任何环境,是将我们的代码上传到hbuilder所在公司的服务器里面进行打包,打包完成后将包在发送回来
- cordova
- ionic
- AppCan

移动web:在手机浏览器上运行的网站
移动App:安装到手机上运行的应用程序
android包文件名称:xxxx.apk
iOS包文件名称:xxxx.ipa

所有第三方模块:第三方登录、分享、推送、支付、地图这些功能如果要实现,都需要到对应的开发者网站注册账号,
在网站里面新建一个应用程序,会生成一个appid和一个key
```

## 项目中用到的技术

> webpack + axios + ES6 + mui 是所有框架都可以使用的技术

```js
// 技术栈:
(vue + vue-router + webpack)vue-cli + vuex + element-ui + axios + ES6

// 技术:
vue: 系统指令 + 生命周期函数(created、mounted) + 组件传值(父子组件通信) + 自定义过滤器  + ref获取DOM
     + watch + 过渡动画(css原生类实现路由切换动画/动画钩子函数实现购物车小球动画)

vue-router: 基本的路由配置 + 嵌套路由 + 路由导航钩子函数(beforeEach、beforeEnter) + 编程式导航(this.$router.push('/home')) + 路由高亮(linkActiveClass) + 路由传参(params/query) + 重定向(redirect) + 路由跳转(this.$router.go(-1))

webpack: 加载器 + 插件

vuex: state(定义公共数据) + mutations(定义修改数据的方法) + getters(定义随着依赖属性变化的数据)

element-ui: el-from + el-table + 弹窗 + 分页 + 面包屑 + 导航栏

mint-ui/mui: 轮播图 + 提示框(Toast) + 上拉加载更多/下拉刷新 + tabbar + 横向滚动条

axios:GET/POST/PUT/DELETE + 拦截器(请求拦截/响应拦截) + ResfulAPI
vue-resource:是vue的一个插件,需要使用Vue.use()进行绑定

ES6:箭头函数 + 模板字符串 + 函数的简写 + Promise

深度作用选择器: css中用 >>> scss和less中用/deep/

百度的echarts图表库集成

动态路由:通常后台会根据当前用户的权限返回该权限应该能够访问的路由规则,前端使用路由的router.addRoutes()方法添加路由规则

本地存储:localStorage

```


# 到公司后需要做的准备工作
- 配置开发环境(安装Node、git(svn)、编辑器)
  + sourcetree(git版本管理工具)
  + svn(TortoiseSVN)
  + vscode自带git管理
  + 公司内部会有自己的git服务器,所有的代码会放到自己的git服务器,在进入公司后,一般组长会给你一个项目的git地址和用户名、密码.

- 获取开发需要的文档或者代码
  + 原型图、UI图
  + 项目说明文档(逻辑交互文档)
  + 接口文档

- 二次开发
  + 找到之前开发者留下的文档信息
  + 阅读别人的代码
    (先看整体架构，总结出别人的技术栈:vue-cli+iview+fetch+vuex;找到自己要实现的功能，先看这个功能别人在项目中有没有类似的，如果有找到代码进行复制以及修正)
  + 注意查看别人书写的注释

- 新项目
  + 确定技术栈:vue-cli + element-ui/iview(mint-ui/vux) + axios + vuex
  + 确定需要实现的第一个模块是什么
  + 开发中一定是按照一个模块一个模块的进行开发
  + 遇到bug,如果半个小时解决不了,先做其他的。提高自己的开发效率

# vue-cli的其他注意事项
> vue-cli是官方的一个脚手架工具，所谓脚手架呢就是一个架子，什么架子呢？项目结构的架子，里面有一些最基本的结构配置。利用vue-cli呢，我们可以生成这样的一个脚手架，所以呢它就被称为vue脚手架工具。

1. `npm install vue-cli -g`     下载全局脚手架
2. `vue init webpack vue_admin` 使用脚手架初始化webpack项目
   - `注意`在初始化过程中，除了vue-router输入y之外其余的 一律是n

3. `cd vue_admin`进入初始化项目
4. `npm run dev`运行vue项目
   - 自动可能不会在浏览器中打开,解决方法如下
     + 手动在浏览器中输入网址`http://localhost:8080/#/`
     + 进入`vue_admin/config/index.js`文件，修改dev中的`autoOpenBrowser: true`即可,下次在启动就可以自动在浏览器中打开了
   - `npm run build`打包命令文件默认在`vue_admin/dist`目录，默认只能复制dist目录的文件到服务器中运行,不能双击以file形式打开，解决方式如下
     + 进入`vue_admin/config/index.js`文件，修改build中的`assetsPublicPath路径`./`
        ```
        // assetsPublicPath: '/', // 默认
        assetsPublicPath: './',   // 修改为
        ```
5. 其他注意事项
   - 默认不能使用ip访问vue_cli生成的项目，即不能使用手机通过局域网的ip访问电脑上的页面--解决方法如下
     + 进入`vue_admin/config/index.js`文件，修改dev中的`host: '0.0.0.0',`即可
     + 然后可以通过`http://localhost:8080/`和`http://ip地址:8080/`在浏览器中访问
   - 默认不能通过花生壳等工具将vue_cli项目映射到外网--解决方法如下
     +  进入`vue_admin/build/webpack.dev.conf.js`文件,在devServer中添加`disableHostCheck: true,`
   - Vue-cli proxyTable解决测试环境的跨域问题
     ```javascript
      // 1. 进入`vue_admin/config/index.js`文件
      // 2. 修改dev中的proxyTable配置测试的反向代理
        proxyTable: {
          '/api': {   //这里是我配置的名字
        　　　　target: 'http://www.klxin.cn', //这个路径是我代理到本地tp框架里面
        　　　　changeOrigin: true, //开启代理
        　　　　pathRewrite: { '^/api': '' }  //这里重写路径/run就代理到对应地址
        　　} 
        }
      // 3. 在vue中正常请求 会被反向代理 如下  解决测试环境的跨域问题
      // axios.get(`/api/login`) ==> 真正的请求路径为http://www.klxin.cn/api/login
     ```
     