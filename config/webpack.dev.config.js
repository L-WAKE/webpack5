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
  optimization: {
    // 开发环境...
  },
  plugins: [
    // 开发环境...
    new RemoveConsolePlugin(),
  ],
});
