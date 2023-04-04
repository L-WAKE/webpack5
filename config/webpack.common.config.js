// 放公共的配置
//webpack5教程地址： https://www.dgrt.cn/news/show-3961996.html?action=onClick

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //自动生成HTML文件插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取分离css文件打包到单独文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //压缩及优化css结构
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包之前清除旧的打包文件 变量名称上的 花括号一定要带上

module.exports = {
  // 1：单入口 多文件的形式  多入口可写成数组格式，单入口只写一个就行
  entry: "./src/main.js",

  // 2：多入口 多出口的形式  可以是对象
  //   entry: {
  //     main: "../src/main.js",
  //     index: "../src/index.js",
  //   },
  output: {
    path: path.resolve(__dirname, "../build"), // 这里是出口文件夹-指文件打包后存放的路径
    filename: "bundle.js", // 这个是出口文件-针对第一种单入口
    // filename: "[name].js", // 这里的name对应着entry的属性名就是(pageOne、pageTwo)-针对第二种多入口
  },
  // 引入第三方文件库
  resolve: {
    alias: {
      jQuery: path.resolve(__dirname, "src/outflie/jquery-v3.6.4.js"), // 这里写第三方库所在的路径
    },
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 指定模板文件
      filename: "main.html", // 指定打包后的html文件名称
      minify: {
        minimize: true, //是否打包为最小值
        removeAttributeQuotes: true, //是否去除双引号
        removeComments: true, //是否去除注释
        collapseWhitespace: true, //是否去除空格
        minifyCSS: true, //是否压缩html中的css样式
        minifyJS: true, //是否压缩html中的js
        removeEmptyElements: true, //清理内容为空的元素
      },
      hash: true, //引入产出资源的时候加上哈希值避免缓存
    }),
    new webpack.ProvidePlugin({
      jQuery: "jQuery",
    }),
  ],
  devServer: {
    static: "./build", // 设置服务器访问的基本目录
    host: "localhost", // 服务器的ip地址
    port: 8088, // 端口号
    open: true, // 是否自动打开页面，true:自动打开，false:不打开
    compress: true, // 是否启用 gzip 压缩
    hot: true, // 模块热替换
  },
  module: {
    rules: [
      // 样式处理的loader
      //   {
      //     test: /\.(scss|less|css)$/,
      //     use: [
      //       MiniCssExtractPlugin.loader,
      //       "style-loader",
      //       "css-loader",
      //       "sass-loader",
      //       "less-loader",
      //       "postcss-loader",
      //     ],
      //   },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      //图片处理的loader
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
      // babel-loader 将高阶语法转换成ES5
      {
        test: /\.js$/,
        exclude: /node_modules/, // exclude:表示排除查找目录
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    sideEffects: true, //开启树摇，将没有使用的变量或方法剔除 不参与打包
    //     minimizer: [
    //       new CssMinimizerPlugin({
    //         test: /\.css(\?.*)?$/i, // 匹配要优化处理的文件，这个是默认值
    //         parallel: 2, // 是否使用多进程并发执行优化，// parallel: 4, 表示启用多进程并发执行且设置并发数
    //         minimizerOptions: {
    //           preset: [
    //             "default",
    //             { discardComments: { removeAll: true } }, // 是否去除注释
    //           ],
    //         },
    //       }),
    //     ],
    //     minimize: false, // 是否在开发环境下启用 CSS 优化
  },
};

/*
    path：指文件打包后存放的路径
    entry：入口打包文件
    path.resolve("", "")：将当前路径处理成绝对路径，第二个参数可以在第一个参数的绝对路径上使用../的方式指定到上级路径
    __dirname：表示当前所在目录的绝对路径
    filename：是打包后文件的名称
    webpack打包多入口、多出口
*/
