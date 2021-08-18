<template>
  <div id="app">
    <!-- keep-alive 保持路由离开时的状态和位置 -->
    <!-- keep-alive 中的 exclude="组件的name" 表示 该组件不保持状态 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// 引入TabBar组件
import MainTabBar from "@/components/contents/maintarbar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
/* 引入css样式 */
@import "./assets/css/base.css";
</style>