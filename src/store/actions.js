import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

// Vuex 中的 actions模块
export default {
  addCart(context, payload) {
    return new Promise((resolve) => {
      // 1. 查找之前数组中是否有该商品(根据iid判断)
      // 数组的find()方法：在数组中按条件（item.iid === payload.iid）遍历查找数组，如查找成功则返回 item
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      // 2. 判断 product
      // 若proudct存在，则给 product.count+1 即：商品数量加一
      // 若product不存在，则给 product 添加 count属性，并令其等于1
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前商品数量+1");
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve("添加了新的商品");
      }
    });
  }
};
