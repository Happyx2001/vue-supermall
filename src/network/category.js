// 分类页面的网络请求

import { request } from "./request";
export function getCategory() {
  return request({
    url: "/category"
  });
}

export function getSubCategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  }).catch(err => err);
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type
    }
  }).catch(err => err);
}
