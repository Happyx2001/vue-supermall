// 封装首页 home 的网络请求
// 面向这个 home 文件进行开发， 获取文件...等操作
import { request } from "./request";

// 请求首页的 mutildata 数据
export function getHomeMultiData() {
  return request({
    url: "/home/multidata"
  });
}

// 请求首页的 goods 数据
export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page
    }
  });
}
