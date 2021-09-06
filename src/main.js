import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 自我封装一个插件 toast 的引入：
import toast from "components/common/toast";

// 导入 FastClick 解决移动端300ms延迟的问题
import FastClick from "fastclick";

// 导入 vue-lazyload 实现图片懒加载
// 图片懒加载：图片需要显示在可视屏幕上时，才去加载图片
import VueLazyLoad from "vue-lazyload";

// 引入 Vant 组件库
import Vant from "vant";
import "vant/lib/index.css";
// 挂载 vant 组件库
Vue.use(Vant);

Vue.config.productionTip = false;

// 添加事件总线对象
Vue.prototype.$bus = new Vue();

// 安装toast插件
Vue.use(toast);

// 解决移动端300ms延迟 (使用attach)
FastClick.attach(document.body);

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  // 图片加载之前的替代图片设置
  loading: require("@/assets/img/common/placeholder.png")
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
