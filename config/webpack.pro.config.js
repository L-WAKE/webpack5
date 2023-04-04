// 放生产环境的配置
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge"); // 引入区分环境的工具
const common = require("./webpack.common.config.js"); // 引入公共配置文件

const TerserPlugin = require("terser-webpack-plugin"); //删除debugger等

module.exports = merge(common, {
  // 使用 merge方法
  // 如果有生产环境的配置，就写上
  module: {
    // 生产环境module...
  },
  optimization: {
    // 生产环境...
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ["console.log", "console.warn"], //删除打印语句
          },
          format: {
            comments: false, //删除所有注释
          },
        },
        parallel: true, //多核打包，提升打包速度
        extractComments: false, //是否将注释全部集中到一个文件中
      }),
    ],
  },
  plugins: [
    // 生产环境插件...
  ],
});
