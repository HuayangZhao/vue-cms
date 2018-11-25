<template>
  <div class="app-container">
    <!--头部-->
    <mt-header fixed title="三生三世十里桃花一心一意百年风月"></mt-header>
    <!--底部-->
    <footer>
        <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item1" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item1" to="/member">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item1" to="/shopcar">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">9</span></span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item1" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
    </footer>
    <!--中间部分-->
      <transition>
            <router-view class="centerContainer"></router-view>
      </transition>
  </div>
</template>
<script>
</script>
<style lang="less">
    body {
        background-color: #fff;
         margin: 0 auto;
         .mint-header.is-fixed {
            width: 100%;
            margin: 0 auto;
        }
    }
    body,footer,header{
        max-width: 460px;
        min-width: 300px;
    }
    .app-container {
        overflow-x: hidden;
        padding-top: 40px;
        padding-bottom: 50px;
        .v-enter {
            opacity: 0;
            transform: translateX(100%);
        }
        .v-leave-to {
            position: absolute;
            opacity: 0;
            transform: translateX(-100%);
        }
        .v-enter-active,
        .v-leave-active{
            transition: all 0.5s ease;
        }
        .mint-header-title {
            overflow: unset;
        }
    }
// 该类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item1.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
