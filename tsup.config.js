export default {
    entry: ['src/index.js'],
    format: ['esm', 'cjs'], // 両方のフォーマットを出力
    dts: false,              // 型定義ファイルを生成 (TypeScript を使う場合)
    clean: true             // 出力ディレクトリをクリーンアップ
}