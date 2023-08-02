# 国际化

| 模块名称                    | 官方维护 | 支持运行时切换 | 支持资源按需加载 |
| --------------------------- | -------- | -------------- | ---------------- |
| i18next@22 react-i18next@12 | 否       | 是             | 是               |

## 资源文件

按需加载，移步[文档](https://www.i18next.com/how-to/add-or-load-translations)

### zh-cn.ts

```ts
export default {
  translation: {
    helloWorld: "你好世界",
  },
};
```

### en.ts

```ts
export default {
  translation: {
    helloWorld: "Hello World",
  },
};
```

## 配置

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zhCN from "./resources/zh-CN";
import en from "./resources/en";

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    "zh-CN": zhCN,
  },
  lng: "zh-CN",
  fallbackLng: "zh-CN",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

## 利用 context 提供服务

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
```

## 使用

函数组件

```ts
import React, { useMemo } from "react";
import { useTranslation, Translation } from "react-i18next";

export default function FCDemo() {
  const { t } = useTranslation();
  const msg = useMemo(() => t("helloWorld"), [t]);
  return (
    <>
      <Translation>{(t) => <span>{t("helloWorld")}</span>}</Translation>
      <span>{t("helloWorld")}</span>
      <input placeholder={t<string>("helloWorld")} />
    </>
  );
}
```

类组件

```tsx
import React, { Component } from "react";
import {
  type WithTranslation,
  withTranslation,
  Translation,
} from "react-i18next";

interface Props extends WithTranslation {}

type State = {};

class ClassDemo extends Component<Props, State> {
  state = {};

  render() {
    const { t } = this.props;
    return (
      <>
        <Translation>{(t) => <span>{t("helloWorld")}</span>}</Translation>
        <span>{t("helloWorld")}</span>
        <input placeholder={t<string>("helloWorld")} />
      </>
    );
  }
}

export default withTranslation()(demo);
```
