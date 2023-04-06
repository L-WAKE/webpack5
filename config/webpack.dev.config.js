// 放开发环境的配置
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge"); // 引入区分环境的工具
const common = require("./webpack.common.config.js"); // 引入公共配置文件

// 自定义插件
const RemoveConsolePlugin = require("../src/plugins/RemoveConsolePlugin.js"); //去除代码中的debugger和console

module.exports = merge(common, {
  // 使用 merge方法
  // 如果有开发环境的配置，就写上
  module: {
    // 开发环境module...
  },
  devServer: {
    port: 8090, //服务器监听的端口
    host: "0.0.0.0", //服务器开起的ip地址
    open: false, // 是否打开浏览器提供访问
    // hot: true, // 需要配合webpack.HotModuleReplacementPlugin使用 热更新
    // compress: true, // 是否为每个静态文件启动gzip压缩 也可以使用命令：npx webpack serve --compress
    //开发环境下配置代理
    proxy: {
      "/cmsapi": {
        target: "https://dayuding.wisesoft.net.cn",
        changeOrigin: true,
        ws: false,
      },
      "/dsapi": {
        target: "https://dayuding.wisesoft.net.cn/api",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/dsapi": "",
        },
      },
    },
  },
  optimization: {
    // 开发环境...
  },
  plugins: [
    // 开发环境...
    new RemoveConsolePlugin(),
  ],
  mode: "development", //开发环境
});
