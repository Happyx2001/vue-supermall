// 封装详情页面的 Detail 网络请求
import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  });
}

export function getRecommend() {
  return request({
    url: "/recommend"
  });
}

/**
 * 由于从后端获取的数据比较杂乱无章
 * 因此在这里创建几个 类 ， 用于 “筛选数据”，区分数据
 */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.realPrice = itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 某些商品参数 goodsparam 中，可能没有值，因此需要加个判断
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
