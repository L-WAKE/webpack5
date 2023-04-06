const webpack = require("webpack");
const webpackCommonConf = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { distPath } = require("./paths");
module.exports = merge(webpackCommonConf, {
  mode: "production",
  output: {
    filename: "[name].[contenthash:8].js", // 打包代码时，webpac4 用contentHash,webpack5用contenthash;
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名）
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify("production"), // window.ENV = 'production'
    }),
  ],
});
