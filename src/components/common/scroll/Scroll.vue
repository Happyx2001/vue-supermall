<template>
  <!-- 封装 BScroll 组件 -->
  <!-- 格式如下 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  // 为了防止影响性能，probeType 的值需要动态传入
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 必须配置的设置:
      // 设置监听Scroll
      probeType: this.probeType,
      // 设置下拉加载
      pullUpLoad: this.pullUpLoad,
      // 允许监听鼠标点击 ↓
      click: true,
      // 允许使用鼠标滚轮 ↓
      mouseWheel: true,

      // 避免异步加载图片时产生的Bug，需要如下的配置
      observeDOM: true,
      observeImage: true,
      /**  Bug
       * 由于图片的异步加载的，所以一开始 content 的高度是没有包含图片的高度
       * 再图片异步加载完之后，content 的高度会随着图片加载而改变
       * 因此会产生 scroll 刷新完成后，content 不能完整的滚动到底部
       */
    });

    // 2. 监听滚动位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      // 发射自定义事件 "scrollPosition" 和 参数 position
      this.$emit("scrollPosition", position);
    });

    // 3. 监听上拉事件 （scroll.pullingUp， content 滚到底部时触发的函数）
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载更多");
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollToTop(x, y, time = 300) {
      // 参数 time 默认300
      // scroll插件生成的组件自带的属性: scrollTo() 将content滚动到目标位置
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      console.log("Scroll已刷新");
    },
  },
};
</script>

<style scoped>
</style>