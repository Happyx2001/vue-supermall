<template>
  <div id="home">
    <!-- 使用NavBar组件 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClicks="tabClick"
      ref="tabControlFixed"
      v-show="isTabFixed"
    ></tab-control>
    <!-- 使用Scroll组件包裹要滚动的组件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrollPosition="contentPosition"
      :pull-up-load="true"
      @pullingUp="loadMore"
    > 
      <!-- 使用HomeSwiper组件 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 使用HomeRecommendView组件 -->
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <!-- 使用FeatureView组件 -->
      <feature-view></feature-view>
      <!-- 使用TabControl组件 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClicks="tabClick"
        ref="tabControl"
      ></tab-control>
      <!-- 使用GoodsList组件 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 监听组件的原生事件时必须加给对应的事件加上修饰符  .native 才能进行监听-->
    <BackTop @click.native="backtop" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
// Home独有封装的组件导入
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

// common类、context类组件的导入
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/contents/tabcontrol/TabControl";
import GoodsList from "@/components/contents/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/contents/backtop/BackTop";

// 导入网络请求
import { getHomeMultiData, getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  // 注册组件
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,

    Scroll,
    BackTop,
  },
  data() {
    // 保存由axios请求来的数据
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },

      currentType: "pop",
      isShowBackTop: false,

      // 存储tabControl的offsetTop
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 钩子函数 destroyed，组件销毁后调用
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    // 路由活跃时调用： 滚动到 scroll.y 位置

    // 这里的滚动延时调大点，防止产生bug
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollToTop(0, this.saveY, 0);
  },
  deactivated() {
    // 路由不活跃时调用： 保存当前位置的 scroll.y
    this.saveY = this.$refs.scroll.scroll.y;
    console.log("记录离开时的 scroll.y :" + this.saveY);
  },
  /**
   * 当组件创建完成之后，应该立马发送网络请求
   * 因此将发送网络请求的函数放到，生命周期函数created函数中，created函数会在组件创建完毕之后立马运行
   */
  created() {
    // 一般 created 之中只调用函数，函数的具体代码实现应该写到 methods 中
    // 然后再调用已经在 methods 中写好的函数即可

    // 1. 请求多个数据
    this.getHomeMultiData();

    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1. 图片加载完成的事件监听
    // 2. 获取tabControl的offsetTop
    // 所有组件都有一个 $el 属性，用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    // console.log(this.tabOffsetTop);  输出 58  （错误）
    // 该方法的Bug： 由于组件加载和图片加载并不在同一时间，因此会获取到为加载组件时的 offsetTop
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell"; 
          break;
      }
      // 确保两个 tabControl 的 currentIndex 值是一样的
      this.$refs.tabControlFixed.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    backtop() {
      /**
       * 返回按钮实现 方法一:
       * 通过ref获取: scroll组件, 再获取scroll组件中的属性: scroll, 再更改scroll属性中的 scrollTo(x坐标, y坐标)
       * this.$refs.scroll.scroll.scrollTo(0, 0);
       */
      // 实现方法二: 调用scroll组件中的scrollToTop方法
      this.$refs.scroll.scrollToTop(0, 0);
    },
    contentPosition(position) {
      // console.log(position.y);
      // 1. 判断 BackTop 是否显示
      // 设置当 滚轮滚动到 -1000 以下位置时，才显示BackTop
      this.isShowBackTop = position.y < -1000;

      // 2. 决定 tabControl 是否吸顶（position.fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // 调用封装的getHomeGoods函数，上拉加载显示更多的数据
      this.getHomeGoods(this.currentType);
      console.log("已滚动到底部，上拉加载更多");
      console.log(
        "加载了" + this.currentType + "和" + this.goods[this.currentType].page
      );
      // 加载完之后更新scroll       scroll.refresh() 刷新
      this.$refs.scroll.refresh();
    },
    swiperImageLoad() {
      // 获取 tapControl  的 offsetTop 的值
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      // console.log(this.tabOffsetTop);
      // this.$refs.scroll.refresh();
    },

    /**
     * 网络请求相关事件
     */
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        // console.log(res);
        // 将请求到的数据保存到组件的 data() 中，使用数据时在调用data()
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 上拉加载更多数据之后，上拉加载执行完毕，使其可以再次执行
        this.$refs.scroll.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* margin-top: 44px; */
  /* padding: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  /* var(--color-tint) 获取basc.css中的 --color-tint 颜色 */
  background-color: var(--color-tint);
  color: white;

  /* 在使用浏览器原生滚动时，防止其随着滚动。 应该设置的样式 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
}
.tab-control {
  /* position: sticky;
  top: 44px; */
  position: relative;
  z-index: 999;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>