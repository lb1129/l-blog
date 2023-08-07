# 结合 typescript

## 初始 tsconfig.json

目前不涉及 tsc 编译 用默认生成的配置项即可

```sh
npx tsc -init
```

## 安装依赖

```sh
npm i typescript
```

```sh
npm i @babel/preset-typescript @types/jest -D
```

## 修改 babel.config.cjs

```js
module.exports = {
  // 目前不做环境区分
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
```

## 使用.ts

fn.ts

```ts
export const getName = (name: string = "viho") => {
  return name;
};
```

fn.spec.ts

```ts
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
