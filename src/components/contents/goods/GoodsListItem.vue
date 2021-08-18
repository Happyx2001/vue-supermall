<template>
  <div class="goods-item" @click="itemClick">
    <!-- 使用图片懒加载： :src替换为v-lazy -->
    <img v-lazy="showImage" alt="" />
    <div class="goods-info">
      <p>
        {{ goodsItem.title }}
      </p>
      <span class="price">{{ "￥" + goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    // 通过计算属性 判断：图片所在的位置
    // 1. 主页Home中获取的数据的图片位置为：.show.img
    // 2. 详情页Detail中获取的数据的图片位置为：.images
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    itemClick() {
      // 设置点击跳转到各个商品对应的 详情页  （根据iid）
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  height: 98%;
  border-radius: 5px;
}

.goods-info {
  font-style: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 2px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>