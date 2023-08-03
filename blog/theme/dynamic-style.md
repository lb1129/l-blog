# 使用动态插入 style 实现主题色运行时切换

实现任意颜色的主题色

## 手动维护

```ts
const themeStyleId = "dynamic-theme-style";

const generateStyle = (themeColor: string) => {
  // 维护项目中包含主题色的替换样式
  return `.selector{color: ${themeColor}}.selector1{background-color: ${themeColor}}`;
};

export const toggleTheme = (themeColor: string) => {
  let styleEl = document.getElementById(themeStyleId);
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = themeStyleId;
    document.body.appendChild(styleEl);
  }
  styleEl.textContent = generateStyle(themeColor);
};
```

## 构建工具维护

### webpack

安装插件

```sh
npm i webpack-theme-color-replacer -D
```

如果项目用 `typescript` 创建 `webpack-theme-color-replacer` 类型声明文件

```ts
// webpack-theme-color-replacer.d.ts
module "webpack-theme-color-replacer/client" {
  export const changer = {
    changeColor: (options: { newColors: string[] }) => Promise,
  };
}
```

配置 webpack plugin

@vue/cli

```js
// vue.config.js
const { defineConfig } = require("@vue/cli-service");
const ThemeColorReplacer = require("webpack-theme-color-replacer");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new ThemeColorReplacer({
        // 选择颜色值 可多个
        // 如 antd 可使用 @ant-design/colors 下的 generate 方法 由一个基本色算出一个梯度色板
        matchColors: ["#1890ff"],
      }),
    ],
  },
});
```

create-react-app

```js
// craco.config.js
const ThemeColorReplacer = require("webpack-theme-color-replacer");

module.exports = {
  webpack: {
    plugins: [
      new ThemeColorReplacer({
        // 选择颜色值 可多个
        // 如 antd 可使用 @ant-design/colors 下的 generate 方法 由一个基本色算出一个梯度色板
        matchColors: ["#1890ff"],
      }),
    ],
  },
};
```

切换主题

```ts
import client from "webpack-theme-color-replacer/client";

export const toggleTheme = (themeColor: string) => {
  const options = {
    // 如 antd 可使用 @ant-design/colors 下的 generate 方法 由一个基本色算出一个梯度色板
    newColors: [themeColor],
  };
  client.changer.changeColor(themeColor, Promise);
};
```

### vite

创建 vite 自定义插件 `vite-plugin-dynamic-theme.ts`

```ts
import { type PluginOption, createFilter } from "vite";
import { generate } from "@ant-design/colors";

const filter = createFilter(/.css|less|sass|scss|stylus$/);

function vitePluginDynamicTheme(color: string): PluginOption {
  const colors = generate(color);
  // NOTE 可抽取成配置参数
  const matchColors = [colors[5], colors[4], colors[0]];
  let styleStr = "";
  const hadTransform = new Set();
  function loop(code: string) {
    let idx = -1;
    let done = false;
    let result = "";
    while (!done) {
      ++idx;
      const char = code[idx];
      const nextChar = code[idx + 1];
      let closeIdx = -1;
      // 注释区块跳过
      if (char === "/") {
        /* */
        if (nextChar === "*") {
          closeIdx = code.indexOf("*/", idx + 2);
          if (closeIdx > -1) {
            idx = closeIdx + 1;
          } else {
            // 文件内容有错误
            done = true;
          }
        } else if (nextChar === "/") {
          //
          closeIdx = code.indexOf("\n", idx + 2);
          if (closeIdx > -1) {
            idx = closeIdx + 1;
          } else {
            // 文件内容有错误
            done = true;
          }
        } else {
          // 文件内容有错误
          done = true;
        }
      } else {
        // 样式区块
        // 选择器结束idx
        const selectorEndIdx = code.indexOf("{", idx);
        if (selectorEndIdx > -1) {
          let selectorStyleEndIdx = -1;
          // 选择器样式结束idx 需考虑嵌套
          let nestDone = false;
          let nestIdx = selectorEndIdx;
          let hadNest = false;
          let hadNestFlag = false;
          while (!nestDone) {
            ++nestIdx;
            const nestChar = code[nestIdx];
            const nestNextChar = code[nestIdx + 1];
            let nestCloseIdx = -1;
            // 注释区块跳过
            if (nestChar === "/") {
              /* */
              if (nestNextChar === "*") {
                nestCloseIdx = code.indexOf("*/", nestIdx + 2);
                if (nestCloseIdx > -1) {
                  nestIdx = nestCloseIdx + 1;
                } else {
                  // 文件内容有错误
                  nestDone = true;
                }
              } else if (nestNextChar === "/") {
                //
                nestCloseIdx = code.indexOf("\n", nestIdx + 2);
                if (nestCloseIdx > -1) {
                  nestIdx = nestCloseIdx + 1;
                } else {
                  // 文件内容有错误
                  nestDone = true;
                }
              }
            } else {
              if (nestChar === "{") {
                hadNest = true;
                hadNestFlag = true;
              } else if (nestChar === "}") {
                if (hadNest) hadNest = false;
                else {
                  selectorStyleEndIdx = nestIdx;
                  nestDone = true;
                }
              }
            }
            if (nestIdx === code.length - 1) {
              nestDone = true;
            }
          }
          if (selectorStyleEndIdx > -1) {
            const styleBlockStr = code.slice(
              selectorEndIdx + 1,
              selectorStyleEndIdx
            );
            if (hadNestFlag) {
              const nestRes = loop(styleBlockStr);
              if (nestRes)
                result += `${code.slice(idx, selectorEndIdx + 1)}${nestRes}}`;
            } else {
              // 过滤包含颜色值的样式项 其他样式项不要
              const styleBlockArr = styleBlockStr.split(";");
              const styleBlockHadColorArr = styleBlockArr.filter((block) =>
                matchColors.some((color) => block.indexOf(color) > -1)
              );
              if (
                styleBlockHadColorArr.length &&
                // NOTE 排除 ant-btn:hover (可抽取成配置参数)
                code
                  .slice(idx, selectorEndIdx + 1)
                  .indexOf(".ant-btn:hover") === -1
              ) {
                // 将样式区块加入结果中
                result += `${code.slice(
                  idx,
                  selectorEndIdx + 1
                )}${styleBlockHadColorArr.join(";")}}`;
              }
            }
            idx = selectorStyleEndIdx;
          } else {
            // 文件内容有错误
            done = true;
          }
        } else {
          // 文件内容有错误
          done = true;
        }
      }
      if (idx === code.length - 1) {
        done = true;
      }
    }
    return result;
  }
  // NOTE 额外要处理的样式 (可抽取成配置参数)
  const extraStyle = `.ant-btn:not(.ant-btn-primary):hover, .ant-btn:not(.ant-btn-primary):focus{
    color: #40a9ff;
    border-color: #40a9ff;
  }`;
  return {
    name: "vite-plugin-dynamic-theme",
    transformIndexHtml() {
      return [
        {
          tag: "style",
          attrs: {
            type: "text/css",
            "data-color": colors[5],
            id: "vite-plugin-dynamic-theme",
          },
          children: `${styleStr}${extraStyle}`,
          injectTo: "body",
        },
      ];
    },
    transform(code, id) {
      if (filter(id)) {
        if (!hadTransform.has(id)) {
          hadTransform.add(id);
          styleStr += loop(code);
        }
      }
    },
  };
}

export default vitePluginDynamicTheme;
```

配置 vite plugins

```ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import dynamicTheme from "./vite-plugin-dynamic-theme";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dynamicTheme("#1890ff")],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

切换主题

```ts
import { generate } from "@ant-design/colors";

export const toggleTheme = (themeColor: string) => {
  const style = document.getElementById("vite-plugin-dynamic-theme");
  if (style) {
    // 由一个基本色算出一个梯度色板
    const currentColors = generate(style.getAttribute("data-color") as string);
    const toColors = generate(themeColor);
    style.innerHTML = style.innerHTML.replace(
      new RegExp(
        `${currentColors[5]}|${currentColors[4]}|${currentColors[0]}`,
        "g"
      ),
      (match) => {
        if (match === currentColors[5]) return toColors[5];
        if (match === currentColors[4]) return toColors[4];
        if (match === currentColors[0]) return toColors[0];
        return "";
      }
    );
    style.setAttribute("data-color", toColors[5]);
  }
};
```
