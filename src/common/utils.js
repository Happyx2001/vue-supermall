// JS工具库：

/**
 * 防抖函数 debounce
 */
export function debounce(func, delay = 50) {
  let timer = null;
  return function(...args) {
    // console.log(arguments);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * 时间戳转换为真实时间的函数
 * 时间格式化
 */
export function formatDate(date, fmt) {
  // 获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  // 2. 获取其他时间数据
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
