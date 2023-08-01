# 国际化

| 模块名称   | 官方维护 | 支持运行时切换 | 支持资源按需加载 |
| ---------- | -------- | -------------- | ---------------- |
| vue-i18n@9 | 否       | 是             | 是               |

## 资源文件

按需加载，移步[文档](https://kazupon.github.io/vue-i18n/guide/lazy-loading.html)

### zh-cn.ts

```ts
export default {
  helloWorld: "你好世界",
};
```

### en.ts

```ts
export default {
  helloWorld: "Hello World",
};
```

## 配置

```ts
import { createI18n } from "vue-i18n";
import zhCn from "./messages/zh-cn";
import en from "./messages/en";

const i18n = createI18n({
  legacy: false,
  locale: "zh-cn",
  fallbackLocale: "zh-cn",
  messages: {
    "zh-cn": zhCn,
    en,
  },
});

export default i18n;
```

## 接入 app

```ts
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "@/i18n";

const app = createApp(App);
app.use(i18n);
app.mount("#app");
```

## 使用

### 模板中使用

```vue
<template>
  <button>{{ $t("helloWorld") }}</button>
</template>
```

### 组合式函数中使用

```ts
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const msg = computed(() => t("helloWorld"));
```
