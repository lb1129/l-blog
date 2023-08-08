# 支持自定义环境变量

## 安装依赖

```sh
npm i dotenv -D
```

## 创建 .env

```
PUBLIC_URL = /
L_SYSTEM_NAME = l-project
```

## 创建 .env.development

```
PORT = 3000
```

## 创建 .env.production

```
BUILD_PATH = dist
```

## 修改 webpack.config.cjs

```js
// ...
const dotenv = require("dotenv");
// ...
// 内置环境变量 外部自定义环境变量也扩展到该对象 剥离对process.env的污染
const builtInEnvs = {
  PUBLIC_URL: "/",
  PORT: "9000",
  BUILD_PATH: "dist",
  GENERATE_SOURCEMAP: "false",
};

// 加载自定义环境变量
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

// 仅加载以 L_ 开头的环境变量
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

module.export = {
  // ...
  // 资源输出配置
  output: {
    // 输出目录
    path: resolveApp(BUILD_PATH),
    // 公共基础路径（资源部署时所处的url路径）
    publicPath: PUBLIC_URL,
    // ...
  },
  // ...
  // sourcemap 配置
  devtool: GENERATE_SOURCEMAP
    ? "source-map"
    : isProduction
    ? false
    : "eval-cheap-module-source-map",
  // ...
  plugins: [
    // ...
    // 编译时可替换的变量
    new webpack.DefinePlugin(resolveClientEnv()),
    // 输出html文件 并处理好 js css 等资源的引入
    new HtmlWebpackPlugin({
      template: resolveApp("public/index.html"),
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options,
          },
          // html模板上 编译时可替换的自定义变量
          ...resolveClientEnv(true),
        };
      },
    }),
    // ...
  ],
  // ...
  // 开发服务器配置
  devServer: {
    // ...
    // 静态资源托管
    static: {
      // ...
      // 公共基础路径（告诉开发服务器在哪个 URL 上提供 static.directory 的内容）
      publicPath: PUBLIC_URL,
      // ...
    },
    // ...
    // port
    port: PORT,
    // ...
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
// ...
```

## 修改 index.html

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
