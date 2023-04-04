class RemoveConsolePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("RemoveConsolePlugin", (compilation) => {
      for (const fileName in compilation.assets) {
        if (/\.js$/.test(fileName)) {
          const source = compilation.assets[fileName].source();
          const newSource = source.replace(/(console\.log\()|debugger/g, "");
          compilation.assets[fileName] = {
            source: () => newSource,
            size: () => newSource.length,
          };
        }
      }
    });
  }
}
module.exports = RemoveConsolePlugin;
