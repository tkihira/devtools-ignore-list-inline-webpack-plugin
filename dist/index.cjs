var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_webpack = require("webpack");
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
          stage: import_webpack.Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING
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
DevToolsIgnoreListInlinePlugin.default = DevToolsIgnoreListInlinePlugin;
var src_default = DevToolsIgnoreListInlinePlugin;
