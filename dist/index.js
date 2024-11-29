// src/index.js
import { Compilation } from "webpack";
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
DevToolsIgnoreListInlinePlugin.default = DevToolsIgnoreListInlinePlugin;
var src_default = DevToolsIgnoreListInlinePlugin;
export {
  src_default as default
};
