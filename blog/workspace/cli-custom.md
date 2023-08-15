# 常见脚手架定制

请求代理，部署路径（history 路由 base），模块解析路径别名，css 预处理（对无法选择 css 预处理的脚手架进行配置）

## @vue/cli

```sh
npx @vue/cli create vue2
```

vue.config.js

```js
const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  // 基础路径（服务器部署路径，history路由base）
  publicPath: process.env.NODE_ENV === "production" ? "/vue2" : "/",
  devServer: {
    // 请求代理
    proxy: {
      "/api": {
        target: "https://api.leibo.group",
      },
    },
  },
  configureWebpack: {
    resolve: {
      // 模块解析路径别名
      alias: {
        // src 目录别名 @ 默认已有
        "~": path.resolve(__dirname, "node_modules"),
      },
    },
  },
});
```

## create-vue

```sh
npx create-vue vue3
```

vite.config.js

```js
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    // 基础路径（服务器部署路径，history路由base）
    base: mode === "production" ? "/vue3" : "/",
    server: {
      // 请求代理
      proxy: {
        "/api": "https://api.leibo.group",
      },
    },
    // ...
    resolve: {
      // 模块解析路径别名
      alias: {
        // 默认已有
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL("./node_modules", import.meta.url)),
      },
    },
  };
});
```

## create-react-app

```sh
npx create-react-app react18
```

### 配置请求代理

通过 craco 定制，使用 eject 那就直接去 config 目录新增修改 webpack 配置

```sh
npm i @craco/craco -D
```

项目根目录创建 craco.config.js

```js
const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      // 请求代理
      "/api": {
        target: "https://api.leibo.group",
        changeOrigin: true,
      },
    },
  },
  webpack: {
    // 模块解析路径别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
  },
};
```

### 配置 less 预处理

```sh
npm i craco-less -D
```

修改 craco.config.js

```js
// ...
const CracoLessPlugin = require("craco-less");

module.exports = {
  // ...
  plugins: [{ plugin: CracoLessPlugin }],
};
```

### 配置部署路径

使用 env 配置基础路径（服务器部署路径，history 路由 base），如果通过 package.json 的 homepage 字段配置也行（无法区分环境不推荐）

.env.development

```
PUBLIC_URL=/
```

.env.production

```
PUBLIC_URL=/react
```

## @angular/cli

```sh
npx @angular/cli new angular16
```

### 配置请求代理

项目根目录创建 proxy.config.json

```json
{
  "/api": {
    "target": "https://api.leibo.group",
    "changeOrigin": true
  }
}
```

修改 angular.json

```json
{
  "projects": {
    "appName": {
      "architect": {
        "serve": {
          // ...
          "configurations": {
            "production": {
              // ...
            },
            "development": {
              "proxyConfig": "proxy.config.json"
              // ...
            }
          }
          // ...
        }
      }
    }
  }
}
```

### 配置部署路径

直接使用命令行参数（对路由及资源路径都起效）

```sh
ng build --base-href /angular/
```

对于 `APP_BASE_HREF` token，只能对 router base 起效，不能对 index.html base 起效
