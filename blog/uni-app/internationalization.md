# 运行时多语言切换

使用 `vue-i18n` 处理多语言，组件或页面使用 `$t` 方法翻译资源，原生导航栏及原生底部导航栏在 `onShow` 生命周期中 针对不同平台使用条件编译调用 `uni.setTabBarItem` `uni.setNavigationBarTitle` api 处理原生导航栏标题翻译及原生底部导航栏文字翻译，pages.json 使用字符串%%占位来翻译资源

[国际化开发指南](https://uniapp.dcloud.net.cn/tutorial/i18n.html)

## 创建 locale 目录

```
└─ locale
   ├─ en.json
   ├─ i18n.js
   └─ zh-Hans.json
```

## 资源文件

## en.json

```json
{
  "helloWorld": "Hello World"
  // ...
}
```

## zh-Hans.json

```json
{
  "helloWorld": "你好世界"
  // ...
}
```

## 配置 vue-i18n

```js
import { createI18n } from "vue-i18n";
import en from "./en.json";
import zhHans from "./zh-Hans.json";
const messages = {
  en,
  "zh-Hans": zhHans,
};

const i18nConfig = {
  locale: uni.getLocale(),
  messages,
};
const i18n = createI18n(i18nConfig);

export default i18n;
```

## 接入 app

```js
import App from "./App.vue";
import { createSSRApp } from "vue";
import i18n from "@/locale/i18n.js";

export function createApp() {
  const app = createSSRApp(App);
  app.use(i18n);
  return {
    app,
  };
}
```

## 使用

组件内使用

```vue
<template>
  <view>
    <text>{{ $t("helloWorld") }}</text>
  </view>
  <!-- uni扩展组件 -->
  <uni-easyinput :placeholder="$t('helloWorld')" />
</template>
<script>
export default {
  computed: {
    msg() {
      return this.$t("helloWorld");
    },
  },
  methods: {
    showToast() {
      uni.showToast({
        icon: "none",
        title: this.$t("helloWorld"),
      });
    },
  },
};
</script>
```

pages.json

```json
{
  "pages": [
    {
      "path": "pages/login/login",
      "style": {
        // %% 中间为语言资源 key
        "navigationBarTitleText": "%login%"
      }
    }
  ],
  "tabBar": {
    "list": [
      {
        "text": "%home%"
      },
      {
        "text": "%message%"
      },
      {
        "text": "%me%"
      }
    ]
  }
}
```

## mixin onShow

main.js 混入 `onShow` 生命周期，处理原生导航栏标题及原生底部导航栏文字

```js
// i18n store 完整 main.js
import App from "./App.vue";
import { createSSRApp } from "vue";
import store from "@/store/index.js";
import i18n from "@/locale/i18n.js";

// #ifdef MP-WEIXIN
import { camelCase } from "lodash-es";
// #endif

export function createApp() {
  const app = createSSRApp(App);
  app.use(i18n);
  app.use(store);
  app.mixin({
    computed: {
      $theme() {
        return this.$store.state.theme;
      },
      $userInfo() {
        return this.$store.state.userInfo;
      },
    },
    onShow() {
      // 页面onShow时 处理原生导航栏背景多主题，导航栏标题多语言，tabbar多主题多语言
      let time = 0;
      // #ifdef APP-PLUS
      time = 60;
      // #endif
      setTimeout(() => {
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        // 有页面时
        if (page) {
          const themeVal = this.$theme.slice(1);
          // 设置导航栏背景色
          uni.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: this.$theme,
          });
          // tabBar页面时
          if (
            page.route === "pages/home/home" ||
            page.route === "pages/me/me"
          ) {
            // 设置tabBar
            uni.setTabBarItem({
              index: 0,
              // #ifdef MP-WEIXIN
              text: this.$t("home"),
              // #endif
              selectedIconPath: `/static/tabbar/home-${themeVal}.png`,
            });
            uni.setTabBarItem({
              index: 1,
              // #ifdef MP-WEIXIN
              text: this.$t("me"),
              // #endif
              selectedIconPath: `/static/tabbar/message-${themeVal}.png`,
            });
            uni.setTabBarItem({
              index: 2,
              // #ifdef MP-WEIXIN
              text: this.$t("message"),
              // #endif
              selectedIconPath: `/static/tabbar/user-${themeVal}.png`,
            });
            uni.setTabBarStyle({
              selectedColor: this.$theme,
            });
          }
          // #ifdef MP-WEIXIN
          const arr = page.route.split("/");
          const str = arr[arr.length - 1];
          uni.setNavigationBarTitle({
            title: this.$t(camelCase(str)),
          });
          // #endif
        }
      }, time);
    },
  });
  return {
    app,
  };
}
```

## 切换语言

```vue
<script>
// #ifdef MP-WEIXIN
import { camelCase } from "lodash-es";
// #endif
export default {
  methods: {
    localeChangeHandler(locale) {
      // #ifdef APP-PLUS
      uni.showModal({
        content: this.$t("languageChangeConfirm"),
        success: (res) => {
          if (res.confirm) {
            // 将重启应用
            uni.setLocale(locale);
          }
        },
      });
      // #endif
      // #ifndef APP-PLUS
      uni.setLocale(locale);
      this.$i18n.locale = locale;
      this.localeIndex = index;
      // #endif
      // #ifdef MP-WEIXIN
      this.$nextTick(() => {
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        const arr = page.route.split("/");
        const str = arr[arr.length - 1];
        uni.setNavigationBarTitle({
          title: this.$t(camelCase(str)),
        });
      });
      // #endif
    },
  },
};
</script>
```
