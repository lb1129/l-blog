# 优化打包速度

建议升级 webpack 最新版本，升级 Node.js，升级 package 管理工具（例如 npm 或者 yarn），项目中不必须的依赖库去掉，去掉 webpack 中不影响编译结果的 plugin（例如：显示编译进度的插件）

## 开启 cache

```js
module.exports = {
  // 构建文件系统级别的缓存
  cache: {
    type: "filesystem",
    // 缓存依赖项（依赖项变更可使缓存失效）
    buildDependencies: {
      defaultWebpack: ["webpack/lib/"],
      config: [__filename],
      // 不上 typescript 该 依赖项 去掉
      tsconfig: [path.resolve("tsconfig.json")].filter((f) => fs.existsSync(f)),
      // 其他依赖项 ...
      // 比如自定义环境变量的文件
    },
  },
};
```

## thread-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        use: ["thread-loader", "babel-loader"],
      },
      // 不上 typescript 该 loader 去掉
      {
        test: /\.ts$/,
        include: path.resolve("src"),
        use: [
          "thread-loader",
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              // 结合 thread-loader 使用
              happyPackMode: true,
              // 仅编译 不做类型校验
              transpileOnly: true,
            },
          },
        ],
      },
      // thread-loader 结合其他 loader 处理
      // ...
    ],
  },
  plugins: [
    // 不上 typescript 该 plugin 去掉
    new ForkTsCheckerWebpackPlugin({
      // 结合 thread-loader 使用
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};
```

## DllPlugin

只打首屏必须使用的第三方库（如框架 js vue react react-dom 等），懒加载的模块应排除  
对 tree-shaking 支持非常好的框架 js，如 vue3 ，不该打入 dll

### 创建 webpack.dll.cjs

```js
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // 打生产环境包 仅在生产环境使用 dll
  mode: "production",
  entry: {
    // 需要提取的库文件
    react: ["react", "react-dom"],
    vue: ["vue"],
  },
  output: {
    path: path.resolve("dll"),
    filename: "[name].dll.js",
    // 保持与 webpack.DllPlugin 插件配置中 name 名称一致
    library: "[name]_[fullhash]",
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: "[name]_[fullhash]",
      path: path.resolve("dll/[name]-manifest.json"),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            // 去掉 注释
            comments: false,
          },
        },
        // 是否将注释剥离到单独的文件中
        extractComments: false,
      }),
    ],
  },
  // bundle 信息只在发生错误时输出
  stats: "errors-warnings",
};
```

### 使用 dll

```js
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve("dll/react-manifest.json"),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve("dll/react.dll.js"),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve("dll/vue-manifest.json"),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve("dll/vue.dll.js"),
    }),
  ],
};
```

## 热插拔模式

项目按业务模块拆分成多个子项目，例如：主模块，授权模块，产品模块等，每个子项目可独立运行及打包，部署时子项目打包的产物整合到主模块打包的产物中（丢入固定的目录中，结合动态路由，进行懒加载）（对于私有化部署，如果系统中模块有购买功能，则可以只把用户购买的模块打包部署）

不同于 [qiankun](https://github.com/umijs/qiankun)，热插拔模式仅支持使用一种技术栈（本质就是按技术栈路由进行拆分，然后整合），所以部署时仅需要部署主模块项目即可，无需关心脚本污染，样式污染问题。

痛点：公共依赖使用及打包问题
