# 这是一个NB的项目

## 牛不牛逼， 用心去感受，每一行代码中的诗情雅意

### 我是有灵魂程序员，所以，我的代码富有诗意；

#### 丫的，实在编不下去了,哈哈哈

### 不知道该BB些什么,就把思路写写
## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造 九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作
1. 使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getNewComment() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组(此处不能直接用 += ....哎~)


## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 当发表评论OK后，重新刷新列表，以查看最新的评论
 + 如果调用 getNewComment 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，如果用户正在第三页,前几页的评论会获取不到,因为用户看第三页时,pageIndex=3,调用getNewComment刷新只能得到第三页的十条评论
 + 可以在调用方法之前把pageIndex重置为1,把commentmsg重置为空数组,然后再调用getNewComment刷新
 + 也可以换一种思路： 当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用 数组的 unshift 方法， 把最新的评论，追加到  data 中 commentmsg的开头；这样，就能 完美实现刷新评论列表的需求；因为data中的数据改变后,用到data中数据的地方会自动更新.

## 改造图片分析 按钮为 路由的链接并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表
### 制作顶部滑动条：(MUI真是个神坑!!!)
 1. 需要借助于 MUI 中的 tab-top-webview-main.html 
 2. 需要把 slider 区域全屏 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，因为是JS组件，需要被初始化一下：
  + 导入 mui.js 
  + 调用官方提供的 方式 去初始化：
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
 4. (坑一)在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  +  webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
  + 最终，用过查询,选择了加装外挂 plan B  移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode
  + 然鹅,貌似不能用了...最终选择修改.babelrc略过模块
  ```
  {
    "ignore": [
        "./src/js/directive/datePicker.js"
    ]
  }
  ```
 5. (坑二)刚进入 图片分享页面的时候， 滑动条无法正常工作，但刷新一下就可以了, 经过分析(其实折腾了很久.....)，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，把初始化 滑动条的代码，搬到了 mounted 生命周期函数中；
 6. (坑三)当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候(简直一脸懵逼,有推到自己写个滑动导航的冲动,想想都到这一步了...算了吧)各种捯饬，最终发现需要把每个 tabbar 按钮的样式中  `mui-tab-item` 重新改一下名字就好了,原因,猜测是和mui的JS文件冲突了；
 7.谷歌浏览器对滑动会发出警告"[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive."
 在样式中加入` * { touch-action: pan-y; }`

### 制作图片列表区域
1. 图片列表需要使用懒加载技术
2. 渲染图片列表数据

## 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素

## 实现 详情页面的布局和美化，同时获取数据渲染页面

## 实现 图片详情中 缩略图的功能
1. 使用 插件 vue-preview 这个缩略图插件
2. img标签上的class不能去掉
3. 每个 图片数据对象中，必须有 w 和 h 属性

## 绘制 商品列表 页面基本结构并美化
1. 主要用到flex布局
2. 点击列表使用编程式导航跳转 `this.$router.push({ name: "goodsInfo", params: { id } });`

## 尝试在手机上 去进行项目的预览和测试

### 制作商品详情区域
1. 抽离轮播图组件,利用属性绑定`:class="{full: isfull}"` ,`.full {width:100%}`设置轮播图片在不同地方的宽度
2. 商品评论导航跳转根据id展示评论组件

### 制作加入购物车
1.点击加入购物执行半场动画时 transition需要单独给name属性 因为父组件也使用了transition 需要区分
2.半场动画做屏幕适配
 ```
   enter(el,done){
        el.offsetWidth;
         // 获取小球的 在页面中的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        // console.log( ballPosition)
        // 获取 购物车徽标 在页面中的位置
        const badgePosition = document
            .getElementById("badge")
            .getBoundingClientRect();
        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;

        el.style.transform = `translate(${xDist}px, ${yDist}px)`;
        el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
        done();
    }
  ```
3.利用vuex进行组件之间的传值

### 制作购物车
1.利用vuex和本地存储进行组件之间的传值，实现购物车数据状态之间的统一
（这之间的痛苦逻辑简直不忍回忆）
2.利用mutations,getters设置购物车中的状态管理，并同步到store中并进行金额计算

不搞了！！！脸上的豆子又起来了

 