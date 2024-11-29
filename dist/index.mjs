var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/index.js
var require_src = __commonJS({
  "src/index.js"(exports, module) {
    var { Compilation } = __require("webpack");
    var DevToolsIgnoreListInlinePlugin = class {
      constructor(options) {
        this.options = {
          isTarget: (options == null ? void 0 : options.isTarget) ?? ((filename) => filename.endsWith(".js"))
        };
      }
      apply(compiler) {
        compiler.hooks.compilation.tap("DevToolsIgnoreListInlinePlugin", (compilation) => {
          compilation.hooks.processAssets.tap(
            {
              name: "DevToolsIgnoreListInlinePlugin",
              stage: Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING
            },
            (assets) => {
              for (const [filename, asset] of Object.entries(assets)) {
                const fullPath = path.resolve(compilation.outputOptions.path, filename);
                if (this.options.isTarget(filename)) {
                  const code = asset.source().toString();
                  ;
                  const sourceMapContent = `{"version":3,"file":"${filename}","mappings":"AAAA","sources":["${filename}"],"sourcesContent":[""],"ignoreList":[0]}`;
                  const base64SourceMapContent = Buffer.from(sourceMapContent).toString("base64");
                  const inlineSourceMapComment = `
//# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64SourceMapContent}`;
                  compilation.updateAsset(
                    filename,
                    new compiler.webpack.sources.RawSource(code + inlineSourceMapComment)
                  );
                }
              }
            }
          );
        });
      }
    };
    module.exports = DevToolsIgnoreListInlinePlugin;
  }
});
export default require_src();
