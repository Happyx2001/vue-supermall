<template>
  <div class="cart-bottom-bar">
    <div class="check-countent">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/common/checkbutton/CheckButton";

export default {
  name: "CartButtomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    // 控制是否全部选中
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      // 控制是否全部选中：如果cartList中存在没有.checked属性的成员，则不全选
      // 使用 filter
      // return !this.$store.state.cartList.filter((item) => !item.checked).length;
      // 使用 find
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // 全部选中时
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;
}

.check-countent {
  display: flex;
  align-content: center;
  margin-left: 10px;
}

.check-button {
  margin-top: 8px;
  margin-right: 5px;
  width: 22px;
  height: 22px;
  line-height: 22px;
}

.price {
  margin-left: 10px;
}
.calculate {
  position: absolute;
  right: 0;
  width: 100px;
  text-align: center;
  background-color: red;
  color: #fff;
}
</style>