# 生产环境搭建

## 区分环境

安装依赖

```sh
npm i cross-env -D
```

修改 scripts

```json
{
  "dev": "cross-env NODE_ENV=development webpack server",
  "build": "cross-env NODE_ENV=production webpack"
}
```

修改 `webpack.config.cjs`

```js
// ...
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "production";
// ...
module.exports = {
  // ...
  mode: NODE_ENV,
  // sourcemap 配置
  devtool: isProduction ? false : "eval-cheap-module-source-map",
  // ...
};
```

## 配置 output

修改 `webpack.config.cjs`

```js
// ...
module.exports = {
  // ...
  // 资源输出配置
  output: {
    // 输出目录
    path: resolveApp("dist"),
    // 公共基础路径（资源部署时所处的url路径）
    publicPath: "/",
    //  bundle的文件名
    filename: "static/js/[name].[contenthash:8].js",
    // 分包chunk的文件名
    chunkFilename: "static/js/[name].[contenthash:8].js",
    // 静态资源输出文件名
    assetModuleFilename: "static/media/[name].[hash][ext]",
    // 在生成文件之前清空 output 目录
    clean: true,
  },
  // ...
};
```

## 输出 css 文件

安装依赖

```sh
npm i mini-css-extract-plugin -D
```

修改 `webpack.config.cjs`

```js
// ...
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// ...
const getStyleLoader = (preprocessing) => {
  const preset = [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    // ...
  ];
  return [...preset, preprocessing];
};
// ...
module.exports = {
  // ...
  plugins: [
    // ...
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
      }),
    // ...
  ].filter(Boolean),
  // ...
};
```

## 拷贝静态资源

安装依赖

```sh
npm i copy-webpack-plugin -D
```

修改 `webpack.config.cjs`

```js
// ...
const CopyPlugin = require("copy-webpack-plugin");
// ...
module.exports = {
  // ...
  plugins: [
    // ...
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    // ...
  ].filter(Boolean),
  // ...
};
```

## 配置 optimization

安装依赖

```sh
npm i terser-webpack-plugin css-minimizer-webpack-plugin -D
```

修改 `webpack.config.cjs`

```js
// ...
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// ...
module.exports = {
  // ...
  // 优化项配置
  optimization: {
    // 是否压缩
    minimize: isProduction,
    // 压缩工具
    minimizer: [
      new TerserPlugin({
        // 是否将注释剥离到单独的文件中
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  // ...
};
```
