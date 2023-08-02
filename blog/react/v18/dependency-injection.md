# 依赖注入

任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖

## Provide

### 创建 context

```ts
// context.ts
import React from "react";

export const themeContext = React.createContext<{
  value: string;
  setValue?: (value: string) => void;
}>({
  value: "",
});
```

### 提供服务

在所有可能的消费组件层级之上提供服务（普通数据，组件状态数据及其更新方法）

```tsx
// 伪代码
import { ThemeContext } from "./context";

const [themeValue, setThemeValue] = useState('1890ff')

<ThemeContext.Provider
  value={{
      value: themeValue,
      setValue: setThemeValue
    }}
>
  // ...
</ThemeContext.Provider>;
```

## Inject

### 类组件消费

使用 contextType

```tsx
import React, { Component } from "react";
import { themeContext } from "./context";

class ClassDemo extends Component {
  // 可使用 ClassDemo.contextType = themeContext 替代
  static contextType = themeContext;

  context!: React.ContextType<typeof ThemeContext>;

  // this.context
}
// or
// ClassDemo.contextType = themeContext
```

### 函数组件消费

使用 useContext

```tsx
import React, { useContext } from "react";
import { ThemeContext } from "./context";

function FCDemo() {
  const theme = useContext(ThemeContext);
  // 多次调用useContext 可消费多个context
}
```

### jsx 中消费

```tsx
import React from "react";
import { ThemeContext } from "./context";

// 可消费多个context
<ThemeContext.Consumer>
  {(theme) => (
    <>
      <span>{theme.value}</span>
      <button
        onClick={() => {
          theme.setValue && theme.setValue("#52c41a");
        }}
      >
        toggle theme
      </button>
    </>
  )}
</ThemeContext.Consumer>;
```
