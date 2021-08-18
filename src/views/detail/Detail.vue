<template>
  <div id="detail">
    <!-- 详情页的导航栏 -->
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      :probe-type="3"
      :pull-up-load="true"
      ref="scroll"
      @scrollPosition="scrollPosition"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backtop" v-show="isShowBackTop"></back-top>
    <!-- <toast class="toast" :message="message" v-show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "@/components/common/scroll/Scroll";
// import Toast from "@/components/common/toast/Toast";
import GoodsList from "@/components/contents/goods/GoodsList.vue";
// import { itemListenerMixin} from "@/common/mixin.js"
import { backTopMixin } from "@/common/mixin.js";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    // Toast,
    GoodsList,
  },
  // 使用混入 mixin
  // 混入 backTopMixin
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
      message: "",
      show: false,
    };
  },
  created() {
    // 1. 保存传入的 iid
    this.iid = this.$route.params.iid;

    // 2. 根据 iid 请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 2.1 获取顶部的 图片轮播数据(需要轮播的图片)
      this.topImages = data.itemInfo.topImages;

      // 2.2 获取商品信息 Goods
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.3 获取店铺信息 Shop
      this.shop = new Shop(data.shopInfo);

      // 2.4 获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 2.5 保存商品参数信息 paramInfo
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 2.6 获取评论信息 commentInfo
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3. 请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });

    // 组件渲染完毕之后调用 nextTick 方法   （Vue生命周期）
    this.$nextTick(() => {
      // 根据最新的数据，对应的DOM是已经被渲染出来
      // 但是其中的图片依然没有加载完毕，导致 offsetTop 值不对
      // 因此：此时的offsetTop获取的数值是没有包含图片的
      // （PS：offsetTop值不对的原因，一般都是因为图片没有加载完）
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh;
      console.log("图片加载完毕");
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      console.log(index);
      // 点击之后通过 scrollTo 跳转到目标位置
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    scrollPosition(position) {
      // console.log(position);

      // 1. 获取Y值
      const positionY = -position.y;

      // 2. positionY 与 themeTopYs 进行比较判断： 滚动内容显示对应标题(联动效果)
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 3. 判断是否显示 返回顶部: BackTop
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 1. 获取要添加到购物车里面的数据 (保存在一个对象中)
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2. 将数据添加到购物车中  (利用 Vuex 管理、传递数据)
      // 利用 Vuex 中的 actions (如果用直接用mutation的话, 不利于跟踪数据改变)
      // 注：dispatch返回的是一个promise对象，可以使用then 查看actions中的执行结果
      this.$store.dispatch("addCart", product).then((res) => {
        // 1. 正常方式使用 toast 组件
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);

        // 2. 将 toast 组件注册为插件使用
        console.log(this.$toast);
        console.log(res);
        this.$toast.show(res, 1500);
        
      });
    },
  },
  activated() {},
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 50px);
}
</style>