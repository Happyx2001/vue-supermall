<template>
  <!-- PS：将Home页面的子组件封装于childComps中 -->
  <!-- 封装属于Home 的 Swiper 轮播图组件 -->
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// 导入轮播图组件（正常导入组件）
// import Swiper from "@/components/common/swiper/Swiper";
// import SwiperItem from "@/components/common/swiper/SwiperItem";
// 将 Swiper 和 SwiperItem 先导入到一个.js文件中，则可以如下导入
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      // 设置只发射一次事件，即：第一张图加载完毕之后，就不能再次发射了
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        console.log("图片加载完");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style>
</style>