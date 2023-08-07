# 测试 react 组件

## 安装依赖

```sh
npm i react
```

```sh
npm i @babel/preset-react @testing-library/jest-dom @testing-library/react -D
```

## 修改 babel.config.cjs

```js
module.exports = {
  // 目前不做环境区分
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};
```

## 修改 jest.config.cjs

```js
module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    ".+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$":
      "jest-transform-stub",
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
```

## 编写组件

```jsx
import React from "react";

const HelloWorld = (props) => {
  return (
    <div
      onClick={() => {
        props.onClick && props.onClick();
      }}
    >
      {props.msg}
    </div>
  );
};

export default HelloWorld;
```

## 编写测试用例

```js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HelloWorld from "./HelloWorld.jsx";

describe("HelloWorld", () => {
  test("component could be updated and unmounted without errors", () => {
    const { unmount, rerender } = render(<HelloWorld />);
    expect(() => {
      rerender(<HelloWorld />);
      unmount();
    }).not.toThrow();
  });
  test("param msg should work", () => {
    render(<HelloWorld msg='hello world' />);
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
  test("click event should work", () => {
    const clickFn = jest.fn();
    const { container } = render(<HelloWorld onClick={clickFn} />);
    fireEvent.click(container.firstChild);
    expect(clickFn).toBeCalledTimes(1);
  });
});
```

## 运行测试用例

```sh
npm run test
```

## 已有脚手架

直接使用脚手架里封装好的单元测试即可，`create-react-app` 里的单元测试封装就是按上述配置来实现的