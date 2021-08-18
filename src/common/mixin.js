//  mixin 混入 ！！！
// Vue 高级用法

import { debounce } from "./utils";
import BackTop from "@/components/contents/backtop/BackTop";

export const itemListenerMixin = {
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
    console.log("我是混入中的内容");
  }
};

// 混入 BackTop 组件
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backtop() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 300);
    }
  }
};
