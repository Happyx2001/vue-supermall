<template>
  <div id="cart-list-item">
    <div class="item-selector">
      <check-button
        @click.native="checkClick"
        :is-checked="product.checked"
      ></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/common/checkbutton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style scoped>
#cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  position: relative;
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 20px;
  width: 100%;
}

.info-bottom .item-price {
  color: orangered;
}
</style>