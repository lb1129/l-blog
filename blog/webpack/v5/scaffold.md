# 搭建单入口脚手架

## 目录结构

```
└─ public
   ├─ favicon.ico
   └─ index.html
└─ src
   └─ main.js
.browserslistrc
.env
.env.development
.env.production
babel.config.cjs
package.json
tsconfig.json
webpack.common.cjs
webpack.config.cjs
webpack.dev.cjs
webpack.prod.cjs
webpack.utils.cjs
```

## main.js

```js
import "core-js";
// ...
```

## index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="<%= PUBLIC_URL %>favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= L_SYSTEM_NAME %></title>
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but <%= L_SYSTEM_NAME %> doesn't work properly without
        JavaScript enabled. Please enable it to continue.</strong
      >
    </noscript>
  </body>
</html>
```

## .browserslistrc

生产环境（请根据项目运行的目标浏览器指定）

```
[production]
>0.2%
not dead

[development]
last 1 chrome version
last 1 firefox version
last 1 safari version
```

## .env

自定义通用环境变量

```
PUBLIC_URL = /
L_SYSTEM_NAME = l-project
```

## .env.development

自定义开发环境变量

```
PORT = 3000
```

## .env.production

自定义生产环境变量

```
BUILD_PATH = dist
```

## babel.config.cjs

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

## package.json

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack server",
    "build": "cross-env NODE_ENV=production webpack",
    "analyze": "cross-env IS_ANALYZE=true npm run build"
  }
}
```

## tsconfig.json

不上 typescript 该文件去掉 [常用配置说明](/blog/typescript/tsconfig)

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

## webpack.common.cjs

结合 eslint [详见文档代码及提交检查](/blog/workspace/code-lint.md)

```js
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 不上 typescript 该 plugin 去掉
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ESLintPlugin = require('eslint-webpack-plugin')
const { resolveApp } = require("./webpack.utils.cjs");

const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "production";

const getStyleLoader = (preprocessing) => {
  const preset = [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    // 对于 .module. 的文件会自动处理 CSS modules
    {
      loader: "css-loader",
      options: {
        importLoaders: preprocessing ? 2 : 1,
      },
    },
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

module.exports = ({
  PUBLIC_URL,
  BUILD_PATH,
  GENERATE_SOURCEMAP,
  resolveClientEnv,
}) => {
  return {
    // 入口文件 这里为单入口
    entry: [resolveApp("src/main.js")],
    // 资源输出配置
    output: {
      // 输出目录
      path: resolveApp(BUILD_PATH),
      // 公共基础路径（资源部署时所处的url路径）
      publicPath: PUBLIC_URL,
      //  bundle的文件名
      filename: "static/js/[name].[contenthash:8].js",
      // 分包chunk的文件名
      chunkFilename: "static/js/[name].[contenthash:8].js",
      // 静态资源输出文件名
      assetModuleFilename: "static/media/[name].[hash][ext]",
      // 在生成文件之前清空 output 目录
      clean: true,
    },
    mode: NODE_ENV,
    // sourcemap 配置
    devtool: GENERATE_SOURCEMAP
      ? "source-map"
      : isProduction
      ? false
      : "eval-cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: [resolveApp("src")],
        },
        // 不上 typescript 该 loader 去掉
        {
          test: /\.ts$/,
          include: [resolveApp("src")],
          use: [
            "babel-loader",
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: getStyleLoader(),
        },
        {
          test: /\.less$/,
          use: getStyleLoader("less-loader"),
        },
        {
          test: /\.(svg)(\?.*)?$/,
          // 资源模块类型
          type: "asset/resource",
        },
        {
          test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
          type: "asset",
          parser: {
            // 转换成base64的最大size
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
    performance: {
      // warn 500K
      maxAssetSize: 500000,
      maxEntrypointSize: 500000,
    },
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
    // 构建文件系统级别的缓存
    cache: {
      type: "filesystem",
      // 缓存依赖项（依赖项变更可使缓存失效）
      buildDependencies: {
        defaultWebpack: ["webpack/lib/"],
        config: [__filename],
        tsconfig: [resolveApp("tsconfig.json")].filter((f) => fs.existsSync(f)),
        env: [
          resolveApp(".env"),
          resolveApp(".env.development"),
          resolveApp(".env.production"),
        ].filter((f) => fs.existsSync(f)),
      },
    },
    plugins: [
      // new ESLintPlugin({
      //   extensions: ['js', 'ts']
      // }),
      // 不上 typescript 该 plugin 去掉
      new ForkTsCheckerWebpackPlugin(),
      new webpack.ProgressPlugin(),
      // 编译时可替换的变量
      new webpack.DefinePlugin(resolveClientEnv()),
      // 输出html文件 并处理好 js css 等资源的引入
      new HtmlWebpackPlugin({
        template: resolveApp("public/index.html"),
        templateParameters: resolveClientEnv(true),
      }),
    ],
    // bundle 信息只在发生错误时输出
    stats: "errors-warnings",
  };
};
```

## webpack.config.cjs

```js
const { envHandler } = require("./webpack.utils.cjs");
const { merge } = require("webpack-merge");

const { PUBLIC_URL, PORT, BUILD_PATH, GENERATE_SOURCEMAP, resolveClientEnv } =
  envHandler();

module.exports = merge(
  require("./webpack.common.cjs")({
    PUBLIC_URL,
    BUILD_PATH,
    GENERATE_SOURCEMAP,
    resolveClientEnv,
  }),
  process.env.NODE_ENV === "production"
    ? require("./webpack.prod.cjs")()
    : require("./webpack.dev.cjs")({
        PUBLIC_URL,
        PORT,
      })
);
```

## webpack.dev.cjs

```js
const path = require("path");
const { resolveApp } = require("./webpack.utils.cjs");

module.exports = ({ PUBLIC_URL, PORT }) => {
  return {
    // 开发服务器配置
    devServer: {
      // 开发服务器启动后是否打开浏览器
      open: true,
      // 静态资源托管
      static: {
        // 目录
        directory: resolveApp("public"),
        // 公共基础路径（告诉开发服务器在哪个 URL 上提供 static.directory 的内容）
        publicPath: PUBLIC_URL,
        // 是否监听 directory 目录文件更改
        watch: true,
      },
      // 是否启用 gzip
      compress: true,
      // host
      host: "0.0.0.0",
      // port
      port: PORT,
      client: {
        // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
        overlay: {
          // 仅有错误时 显示 overlay
          errors: true,
          warnings: false,
        },
      },
      // 404 fallback
      historyApiFallback: {
        disableDotRule: true,
        index: PUBLIC_URL,
      },
      setupMiddlewares(middlewares, devServer) {
        // 如果url不存在 重定向到 PUBLIC_URL
        devServer.app.use((req, res, next) => {
          const servedPath = PUBLIC_URL.slice(0, -1);
          if (
            servedPath === "" ||
            req.url === servedPath ||
            req.url.startsWith(servedPath)
          ) {
            next();
          } else {
            const newPath = path.posix.join(
              servedPath,
              req.path !== "/" ? req.path : ""
            );
            res.redirect(newPath);
          }
        });
        return middlewares;
      },
    },
  };
};
```

## webpack.prod.cjs

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const IS_ANALYZE = process.env.IS_ANALYZE === "true";

module.exports = () => {
  let config = {
    plugins: [
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
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
      }),
    ],
    // 优化项配置
    optimization: {
      // 是否压缩
      minimize: true,
      // 压缩工具
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
        new CssMinimizerPlugin(),
      ],
    },
  };
  if (IS_ANALYZE) {
    config.plugins.unshift(
      new BundleAnalyzerPlugin({
        generateStatsFile: true,
      })
    );
    config.performance = false;
  }
  return config;
};
```

## webpack.utils.cjs

```js
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// 解析路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
exports.resolveApp = resolveApp;

// 处理环境变量
const envHandler = () => {
  // 内置环境变量 外部自定义环境变量也扩展到该对象 剥离对process.env的污染
  const builtInEnvs = {
    PUBLIC_URL: "/",
    PORT: "9000",
    BUILD_PATH: "dist",
    GENERATE_SOURCEMAP: "false",
  };

  // 加载自定义环境变量
  const NODE_ENV = process.env.NODE_ENV;
  dotenv.config({
    path: resolveApp(".env"),
    processEnv: builtInEnvs,
    override: true,
  });
  dotenv.config({
    path: resolveApp(`.env${NODE_ENV ? `.${NODE_ENV}` : ""}`),
    processEnv: builtInEnvs,
    override: true,
  });

  // 非 / 结尾
  if (!/\/$/.test(builtInEnvs.PUBLIC_URL)) {
    builtInEnvs.PUBLIC_URL = `${builtInEnvs.PUBLIC_URL}/`;
  }

  // PUBLIC_URL
  const PUBLIC_URL = builtInEnvs.PUBLIC_URL;
  // PORT
  const PORT = builtInEnvs.PORT;
  // BUILD_PATH
  const BUILD_PATH = builtInEnvs.BUILD_PATH;
  // GENERATE_SOURCEMAP
  const GENERATE_SOURCEMAP = builtInEnvs.GENERATE_SOURCEMAP === "true";

  // 自定义环境变量 仅加载以 L_ 开头的
  const prefixRE = /^L_/;
  const resolveClientEnv = (raw) => {
    const env = {};
    Object.keys(builtInEnvs).forEach((key) => {
      if (prefixRE.test(key) || key === "NODE_ENV" || builtInEnvs[key]) {
        env[key] = builtInEnvs[key];
      }
    });
    if (raw) {
      return env;
    }
    for (const key in env) {
      env[key] = JSON.stringify(env[key]);
    }
    return {
      "process.env": env,
    };
  };

  return { PUBLIC_URL, PORT, BUILD_PATH, GENERATE_SOURCEMAP, resolveClientEnv };
};
exports.envHandler = envHandler;
```
