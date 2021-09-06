<template>
  <!-- <div>{{ $store.state.cartList }}</div> -->
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 购物车中的商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总，工具栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

// 引入 mapGetters
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  // data() {},
  computed: {
    // 利用 mapGetters 将 Vuex store 中的 getters 映射到局部计算属性
    ...mapGetters(["cartLength", "cartList"]),
    // cartLength() {
    //   return this.$store.state.cartList.length;
    // },
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}
</style>