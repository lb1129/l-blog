# CSS-in-JS

[emotion](https://github.com/emotion-js/emotion) 一款 `CSS-in-JS` 库，编码阶段使用 `emotion` 书写样式，实现主题色运行时切换（依然是动态插入 style）

## 安装

```sh
npm i @emotion/css
```

## 结合 vue

```vue
<template>
  <div :class="testClass">xxx</div>
  <button @click="toggleTheme">切换</button>
</template>

<script>
import { css } from "@emotion/css";

export default {
  data() {
    return {
      // 把 themeColor 提升到 根组件使用依赖注入 或者 vuex pinia 实现全局控制
      themeColor: "#1890ff",
    };
  },
  computed: {
    testClass() {
      return css({
        color: this.themeColor,
        fontSize: 16,
        // 其他样式
      });
    },
  },
  methods: {
    toggleTheme() {
      this.themeColor = "#2c3e50";
    },
  },
};
</script>
```

说明：`ant-design-vue` v4 全面支持 `CSS-in-JS`，项目中可使用 `antv` 封装好的主题定制能力 [文档](https://antdv.com/docs/vue/customize-theme-cn)

## 结合 react

也可使用 `@emotion/react` `@emotion/styled` 这两个封装好的库

```tsx
import React, { useMemo, useState } from "react";
import { css } from "@emotion/css";

export default function FCDemo() {
  // 把 themeColor 提升到 根组件使用依赖注入 或者 redux react-redux 实现全局控制
  const [themeColor, setThemeColor] = useState("#1890ff");

  const style = useMemo(
    () =>
      css({
        color: themeColor,
        fontSize: 16,
      }),
    [themeColor]
  );

  const toggleTheme = () => {
    setThemeColor("#2c3e50");
  };

  return (
    <>
      <div className={style}>xxx</div>
      <button onClick={toggleTheme}>切换</button>
    </>
  );
}
```

说明：`ant.design` v5 全面支持 `CSS-in-JS`，项目中可使用 `ant` 封装好的主题定制能力 [文档](https://ant.design/docs/react/customize-theme-cn)
