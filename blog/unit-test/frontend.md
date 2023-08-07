# 前端单元测试

[jest](https://github.com/jestjs/jest)

## 从零开始

```sh
npm init -y
```

## 安装依赖

```sh
npm i jest jest-environment-jsdom jest-transform-stub -D
```

```sh
npm i babel-jest @babel/preset-env -D
```

## jest 配置

jest.config.cjs

```js
module.exports = {
  // 指定根目录
  roots: ['<rootDir>/test'],
  // 模块路径映射 类似 webpack alias
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // 测试环境
  testEnvironment: "jsdom",
  // 从指定根目录 匹配的测试文件
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  // 文件转换设置
  transform: {
    '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$':
      'jest-transform-stub',
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
};
```

## babel 配置

babel.config.cjs

```js
module.exports = {
  // 目前不做环境区分
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

## 添加 scripts

package.json

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## 测试普通方法

编写方法 fn.js

```js
export const getName = (name = "viho") => {
  return name;
};
```

编写测试用例 fn.spec.js

```js
import { getName } from "./fn";

// describe 是一个将多个相关的测试组合在一起的块
describe("getName", () => {
  // 运行测试的方法 test 别名 it
  test("param should work", () => {
    const name = getName("superviho");
    expect(name).toBe("superviho");
  });
  test("default param should work", () => {
    const name = getName();
    expect(name).toBe("viho");
  });
});
```

运行测试用例

```sh
npm run test
```

## 测试 DOM 操作

编写 dom 操作 dom.js

```js
export const createNode = () => {
  const div = document.createElement("div");
  div.textContent = "div content";
  div.onclick = () => {
    div.textContent = "div content clicked";
  };
  document.body.appendChild(div);
};
```

编写测试用例 dom.spec.js

```js
import { createNode } from "./dom";

describe("createNode", () => {
  let node;
  beforeEach(() => {
    createNode();
  });
  test("render should success", () => {
    node = document.querySelector("div");
    expect(node).toBeTruthy();
    if (node) {
      expect(node.textContent).toBe("div content");
    }
  });
  test("click event should work", () => {
    if (node) {
      node.click();
      expect(node.textContent).toBe("div content clicked");
    }
  });
});
```

运行测试用例

```sh
npm run test
```

## 监听文件修改并自动重启 jest 服务

package.json 修改 test 指令

```json
{
  "scripts": {
    "test": "jest --watchAll"
  }
}
```
