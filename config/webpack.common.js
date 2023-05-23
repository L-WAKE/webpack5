// 放公共的配置
//webpack5教程地址： https://www.dgrt.cn/news/show-3961996.html?action=onClick
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //自动生成HTML文件插件
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取分离css文件打包到单独文件
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //压缩及优化css结构
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包之前清除旧的打包文件 变量名称上的 花括号一定要带上
// const timeStamp = new Date().getTime(); //生成时间戳.避免发布新版本时读取缓存文件
const VueLoaderPlugin = require("vue-loader/lib/plugin"); //vue-loader

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const { srcPath, publicPath } = require("./paths");
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      // "@": resolve("src"), //配置可使用@表示项目 根src目录
      "@": path.resolve(__dirname, "../src"),
    },
  },
  entry: path.join(srcPath, "main"), //入口文件
  module: {
    rules: [
      // 处理vue文件
      {
        test: /\.vue$/,
        use: "vue-loader", //webpac4 用laoder:[],webpack5用use:[];
      },
      // 样式处理的loader
      {
        test: /\.(scss|less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "less-loader",
          "postcss-loader",
        ],
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
  plugins: [
    new BundleAnalyzerPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: `css/[name].${timeStamp}.css`,
    //   chunkFilename: `css/chunk.[id].${timeStamp}.css`,
    //   filename: "css/main.css",
    // }),
    new HtmlWebpackPlugin({
      template: path.join(publicPath, "index.html"), //模板html
      filename: "index.html", // 生成的文件名
      favicon: "public/favicon.ico", // 图标
      title: "我的webpack应用",
    }),
    new webpack.ProvidePlugin({
      jQuery: "jQuery",
    }),
  ],
  optimization: {
    sideEffects: true, //开启树摇，将没有使用的变量或方法剔除 不参与打包
    splitChunks: {
      chunks: "async", // 代码分割时对异步代码生效，all：所有代码有效，inital：同步代码有效
      minSize: 30000, // 代码分割最小的模块大小，引入的模块大于 30000B 才做代码分割
      minChunks: 1, // 引入的次数大于等于1时才进行代码分割
      maxAsyncRequests: 6, // 最大的异步请求数量,也就是同时加载的模块最大模块数量
      maxInitialRequests: 4, // 入口文件做代码分割最多分成 4 个 js 文件
      cacheGroups: {
        // 缓存组配置，默认有vendors和default
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 匹配需拆分chunk的目录
          priority: -10, // 拆分优先级
          name: "venders",
        },
        lodashVenodr: {
          // 将体积较大的lodash单独提取包，指定页面需要的时候再异步加载
          test: /lodash/,
          priority: -10,
          name: "lodashVenodr",
          chunks: "all",
        },
        default: {
          minChunks: 2, // 覆盖外层minChunks,用于提取被引用指定次数的公共模块，这里默认2次
          priority: -20,
          name: "common",
          reuseExistingChunk: true, // 是否重用已存在的chunk
        },
      },
    },
  },
};
