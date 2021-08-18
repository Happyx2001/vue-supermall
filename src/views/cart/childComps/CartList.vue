<template>
  <div id="cart-list">
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";

import Scroll from "@/components/common/scroll/Scroll";
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll,
  },
  data() {
    return {
      abc: 300,
    };
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // 每次进入购物车界面就刷新一次，刷新出 Scroll 的可滚动高度
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
#cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>