<template>
  <div id="profile-list">
    <div class="line"></div>
    <div class="profile-list-item">
      <van-icon class="profile-list-icon" name="manager"></van-icon>
      <span>我的消息</span>
    </div>
    <div class="profile-list-item">
      <van-icon class="profile-list-icon" name="point-gift"></van-icon>
      <span>积分商城</span>
    </div>
    <div class="profile-list-item">
      <van-icon class="profile-list-icon" name="gem"></van-icon>
      <span>会员卡</span>
    </div>
    <div class="line"></div>
    <div class="profile-list-item" @click="$router.push('/cart')">
      <van-icon class="profile-list-icon" name="shopping-cart"></van-icon>
      <span>我的购物车</span>
    </div>
    <div class="profile-list-item">
      <van-icon class="profile-list-icon" name="good-job"></van-icon>
      <span>点赞购物APP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileList",
  data() {
    return {};
  },
};
</script>

<style scoped>
#profile-list {
  width: 100%;
}

.profile-list-item {
  height: 45px;
  line-height: 45px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.profile-list-item .profile-list-icon {
  font-size: 24px;
  display: inline-block;
  margin-right: 7px;
}

.profile-list-item span {
  font-size: 16px;
  display: inline-block;
  width: 100%;
  color: #333333;
  border-bottom: 1px solid #dddddd;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}
</style>