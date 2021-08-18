import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

// Vuex 中的 mutaions 模块
export default {
  // 注1:只能通过 mutations 修改 state 中的值
  // 注2:mutations中的每个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  [ADD_TO_CART](state, payload) {
    // console.log("添加成功");
    // 设置在添加进购物车时，添加一个checked属性用于表示选中，（默认选中）
    payload.checked = true;
    state.cartList.push(payload);
  }
};
