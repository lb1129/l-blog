# 开发环境搭建

## 安装依赖

```sh
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```

## 创建 webpack.config.cjs

```js
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  // 入口文件路径
  entry: [resolveApp("src/main.js")],
  // 编译模式
  mode: "development",
  plugins: [
    new webpack.ProgressPlugin(),
    // 输出html文件 并处理好 js css 等资源的引入
    new HtmlWebpackPlugin({
      template: resolveApp("public/index.html"),
    }),
  ],
  // bundle 信息只在发生错误时输出
  stats: "errors-warnings",
  // 开发服务器配置
  devServer: {
    // 开发服务器启动后是否打开浏览器
    open: true,
    // 静态资源托管
    static: {
      // 目录
      directory: resolveApp("public"),
      // 公共基础路径（告诉开发服务器在哪个 URL 上提供 static.directory 的内容）
      publicPath: "/",
      // 是否监听 directory 目录文件更改
      watch: true,
    },
    // 是否启用 gzip
    compress: true,
    // host
    host: "0.0.0.0",
    // port
    port: 8080,
    client: {
      // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
      overlay: {
        // 仅有错误时 显示 overlay
        errors: true,
        warnings: false,
      },
    },
  },
};
```

## 添加 scripts

package.json

```json
{
  "scripts": {
    "dev": "webpack server"
  }
}
```

## 启动开发服务器

```sh
npm run dev
```

## 添加 browserslist

package.json

```json
{
  "browserslist": {
    // 生产环境（根据项目运行的目标浏览器指定）
    "production": [">0.2%", "not dead"],
    // 开发环境
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

## 模块编译处理

### js 处理

安装依赖

```sh
npm i babel-loader @babel/preset-env @babel/plugin-proposal-decorators -D
```

```sh
npm i core-js@3
```

创建 `babel.config.cjs`

```js
module.exports = {
  plugins: [["@babel/plugin-proposal-decorators", { version: "legacy" }]],
  presets: [
    [
      // 根据 browserslist 配置转目标浏览器语法
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: "3.0",
      },
    ],
  ],
};
```

在 `main.js` 第一行添加

```js
import "core-js";
// ...
```

在 `webpack.config.cjs` 添加 `rules`

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolveApp("src")],
      },
      // ...
    ],
  },
  // ...
};
```

### css 处理

安装依赖

```sh
npm i postcss-loader postcss-preset-env css-loader style-loader -D
```

在 `webpack.config.cjs` 添加 `getStyleLoader` 方法

```js
// ...
const getStyleLoader = (preprocessing) => {
  const preset = [
    "style-loader",
    // 对于 .module. 的文件会自动处理 CSS modules
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            [
              // 支持转换高级 CSS 特性
              // 将读取 browserslist 目标浏览器配置
              "postcss-preset-env",
              {
                // 添加浏览器前缀
                autoprefixer: {
                  flexbox: "no-2009",
                },
                stage: 3,
              },
            ],
          ],
        },
      },
    },
  ];
  return [...preset, preprocessing];
};
// ...
```

在 `webpack.config.cjs` 添加 `rules`

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
    ],
  },
  // ...
};
```

### less 处理

安装依赖

```sh
npm i less-loader -D
```

在 `webpack.config.cjs` 添加 `rules`

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.less$/,
        use: getStyleLoader("less-loader"),
      },
    ],
  },
  // ...
};
```

### 其他 css 预处理器

安装预处理器 `loader`，类似 `less` 预处理器 配置即可

## 资源文件处理

`webpack5` 内置资源文件处理 无需 `file-loader` `url-loader` [详见](https://webpack.docschina.org/guides/asset-modules/)

在 `webpack.config.cjs` 添加 `rules`

```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(svg)(\?.*)?$/,
        // 资源模块类型
        type: "asset/resource",
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: "asset",
        parser: {
          // 转换成 base64 的最大size
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset",
      },
    ],
  },
  // ...
};
```

## typescript 处理

安装依赖

```sh
npm i typescript
```

创建 tsconfig.json [常用配置说明](/blog/typescript/tsconfig)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

修改 `webpack.config.cjs`

```js
// ...
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
//...

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.ts$/,
        include: [resolveApp("src")],
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              // 仅编译 类型校验交给 fork-ts-checker-webpack-plugin 插件
              transpileOnly: true,
            },
          },
        ],
      },
      // ...
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    // ...
  ],
  // ...
};
```

## resolve

```js
module.exports = {
  // ...
  // 模块解析配置
  resolve: {
    // 不带文件后缀时，尝试找寻的文件后缀
    extensions: [".mjs", ".js", ".ts", ".json"],
    // 路径别名
    alias: {
      "@": resolveApp("src"),
      "~": resolveApp("node_modules"),
    },
  },
  // ...
};
```

## sourcemap

修改 `webpack.config.cjs`

```js
module.exports = {
  // ...
  // sourcemap 配置
  devtool: "eval-cheap-module-source-map",
  // ...
};
```

## 构建缓存

修改 `webpack.config.cjs`

```js
module.exports = {
  // ...
  // 构建文件系统级别的缓存
  cache: {
    type: "filesystem",
  },
  // ...
};
```
