module.exports = function (source) {
  return source.toUpperCase();
};
/*
    1.创建一个 Node.js 模块
    首先，你需要创建一个新的 Node.js 模块。这个模块会导出一个函数。

    2. 编写转换函数
    函数的参数是源文件的内容。你可以对这个内容进行任何你想要的转换。

    3. 返回转换后的内容
    函数的返回值应该是转换后的内容。Webpack 会使用这个返回值作为新的源文件内容。

    4. 配置 Webpack
    在你的 webpack 配置文件中，你需要指定你的 loader 应该应用于哪些文件。你可以使用 module.rules 属性来做这个配置。
*/
