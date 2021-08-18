module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      // 配置别名，方便路径的编写
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    }
  }
};
