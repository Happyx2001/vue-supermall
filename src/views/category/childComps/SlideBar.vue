<template>
  <div class="slide-bar">
    <div
      class="slide-bar-item"
      v-for="(item, index) in categoryList"
      :key="index"
    >
      <button
        @click="slideBarItemClick(item, index)"
        :class="currentIndex === index ? 'active' : ''"
      >
        {{ item.title }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideBar",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    slideBarItemClick(item, index) {
      this.currentIndex = index;
      const obj = {
        maitKey: item.maitKey,
        miniWallkey: item.miniWallkey,
        index,
      };
      this.$emit("slideBarItemClick", obj);
    },
  },
};
</script>

<style scoped>
.slide-bar-item button {
  width: 110px;
  height: 50px;
  outline: none;
  border: none;
  color: #666;
  background: none;
  border-left: 3px solid rgba(0, 0, 0, 0);
}
.slide-bar-item .active {
  color: #ff5777;
  background-color: #fff;
  border-left: 3px solid #ff5777;
  font-weight: bold;
}
</style>