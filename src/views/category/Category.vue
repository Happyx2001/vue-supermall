<template>
  <div class="category">
    <navbar class="category-nav">
      <template v-slot:center>商品分类</template>
    </navbar>
    <!-- 左侧 侧边栏滚动 -->
    <scroll class="slide-bar-scroll" :probe-type="3">
      <slide-bar
        :categoryList="categoryList"
        @slideBarItemClick="slideBarItemClick"
      ></slide-bar>
    </scroll>
    <!-- 右侧 商品信息滚动 -->
    <scroll class="subCategory-scroll" :probe-type="3">
      <sub-category :subCategoryList="subCategoryList"></sub-category>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="categoryDetailList"></goods-list>
    </scroll>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "@/components/contents/tabcontrol/TabControl";
import GoodsList from "@/components/contents/goods/GoodsList";

import SlideBar from "./childComps/SlideBar";
import SubCategory from "views/category/childComps/Subcategory";

import {
  getCategory,
  getSubCategory,
  getCategoryDetail,
} from "network/category";

export default {
  name: "Category",
  components: {
    Navbar,
    Scroll,
    SlideBar,
    SubCategory,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      // 分类侧边栏的数据
      categoryList: [],
      currentIndex: 0,

      // 分类标签数据
      subCategoryList: [],

      // 商品分类栏
      currentType: "pop",
      // 分类商品数据
      categoryDetailList: [],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    // 请求商品数据
    getCategory() {
      getCategory().then((res) => {
        const data = res.data;
        this.categoryList = data.category.list;
        console.log(this.categoryList);
        this.$nextTick(() => {
          // this.BolCategory = false;
          this.getSubCategory(this.categoryList[0].maitKey);
          this.getCategoryDetail(
            this.categoryList[0].miniWallkey,
            this.currentType
          );
        });
      });
    },

    // 请求商品分类标签数据
    getSubCategory(key) {
      // this.BolSubcategory = true;
      getSubCategory(key).then((res) => {
        const data = res.data;
        this.subCategoryList = data.list;
        console.log(this.subCategoryList);
        // console.log(data.list);
        // this.$nextTick(() => {
        //   this.BolSubcategory = false;
        // });
      });
    },

    // 请求商品分类详情数据
    getCategoryDetail(key, type) {
      // this.BolCategoryDetail = true;
      getCategoryDetail(key, type).then((res) => {
        this.categoryDetailList = res;
        console.log(this.categoryDetailList);
        // this.$nextTick(() => {
        //   this.BolCategoryDetail = false;
        // });
      });
    },

    // slide 提交的事件 更改侧边栏
    slideBarItemClick(obj) {
      this.currentIndex = obj.index;
      // 初始化商品分类栏
      this.currentType = "pop";
      this.$refs.tabControl.currentIndex = 0;
      // 请求数据
      this.getSubCategory(obj.maitKey);
      this.getCategoryDetail(obj.miniWallkey, this.currentType);
    },

    tabClick(index) {
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
      this.getCategoryDetail(
        this.categoryList[this.currentIndex].miniWallkey,
        this.currentType
      );
    },
  },
};
</script>

<style>
.category-nav {
  background-color: var(--color-tint);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
.slide-bar-scroll {
  position: fixed;
  top: 44px;
  bottom: 49px;
  width: 110px;
  background-color: #f6f6f6;
  overflow: hidden;
}
.subCategory-scroll {
  position: fixed;
  top: 44px;
  bottom: 49px;
  left: 110px;
}
</style>