<template>
  <div id="money">
    <div class="money-item">
      <p>
        0.00
        <span>元</span>
      </p>
      <p>我的余额</p>
    </div>
    <div class="money-item">
      <p>
        0
        <span>个</span>
      </p>
      <p>我的优惠</p>
    </div>
    <div class="money-item">
      <p>
        0
        <span>分</span>
      </p>
      <p>我的积分</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Money",
  data() {
    return {};
  },
};
</script>

<style scoped>
#money {
  display: flex;
  width: 100%;
}

#money .money-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  height: 85px;
}

#money .money-item:nth-of-type(1),
#money .money-item:nth-of-type(2) {
  border-right: 1px solid #eeeeee;
}

#money .money-item p:first-child {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 3px;
  color: #ff5f3e;
}

#money .money-item p:first-child span {
  font-size: 16px;
  font-weight: normal;
  margin-left: 3px;
  color: #666666;
}

#money .money-item p:last-child {
  font-size: 16px;
  color: #666666;
}
</style>