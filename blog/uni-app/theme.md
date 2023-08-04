# 运行时主题色切换

使用 `vuex` 定义 `theme` store state，在 app 上 混入 `$theme`计算属性 以及 `onShow`生命周期，组件或页面使用 `$theme` 编写主题色相关样式，原生导航栏及原生底部导航栏在 `onShow` 生命周期中 针对不同平台使用条件编译调用 `uni.setNavigationBarColor` `uni.setTabBarItem` `uni.setTabBarStyle` api 切换原生导航栏背景色及原生底部导航栏 selectedColor selectedIconPath（主题色对应 icon 要先准备好）

## 定义 theme store state

store/index.js

```js
import { createStore } from "vuex";
import config from "@/config.json";

const store = createStore({
  state() {
    return {
      theme: config.theme,
    };
  },
  mutations: {
    updateTheme(state, theme) {
      state.theme = theme;
    },
  },
  actions: {
    setTheme({ commit }, theme) {
      commit("updateTheme", theme);
    },
  },
  modules: {},
});

export default store;
```

## 接入 app

main.js

```js
import App from "./App.vue";
import { createSSRApp } from "vue";
import store from "@/store/index.js";

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.mixin({
    computed: {
      $theme() {
        return this.$store.state.theme;
      },
    },
  });
  return {
    app,
  };
}
```

## 组件或页面中使用 $theme

```vue
<template>
  <view
    class="home-decoration"
    :style="{
      backgroundColor: $theme,
    }"
  ></view>
  <!-- uni扩展组件 -->
  <uni-easyinput :primaryColor="$theme" />
</template>
```

## mixin onShow

main.js 混入 `onShow` 生命周期，处理原生导航栏背景色及原生底部导航栏 selectedColor selectedIconPath

```js
import App from "./App.vue";
import { createSSRApp } from "vue";
import store from "@/store/index.js";

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.mixin({
    computed: {
      $theme() {
        return this.$store.state.theme;
      },
    },
    onShow() {
      // 页面onShow时 处理原生导航栏及原生底部导航栏多主题
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
              selectedIconPath: `/static/tabbar/home-${themeVal}.png`,
            });
            uni.setTabBarItem({
              index: 1,
              selectedIconPath: `/static/tabbar/message-${themeVal}.png`,
            });
            uni.setTabBarItem({
              index: 2,
              selectedIconPath: `/static/tabbar/user-${themeVal}.png`,
            });
            uni.setTabBarStyle({
              selectedColor: this.$theme,
            });
          }
        }
      }, time);
    },
  });
  return {
    app,
  };
}
```

## 切换主题色

```vue
<script>
import { mapActions } from "vuex";
import { themeStorage } from "@/storage/index";

export default {
  methods: {
    toggleTheme(theme) {
      this.setTheme(theme);
      // 设置当前页面原生导航栏背景色
      uni.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: theme,
      });
      // theme本地存储
      themeStorage.set(theme);
    },
    ...mapActions(["setTheme"]),
  },
};
</script>
```
