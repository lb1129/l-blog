# 数据仓库

项目公用 state store 项目进行服务拆分 数据获取不耦合在 vuex action 中 由外部调用服务 获取数据后再调用 vuex action 进行 state 更新

## 定义 store

```js
import { createStore } from "vuex";
import config from "@/config.json";

const store = createStore({
  state() {
    return {
      theme: config.theme,
      userInfo: {},
      menuData: [],
    };
  },
  mutations: {
    updateTheme(state, theme) {
      state.theme = theme;
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateMenuData(state, menuData) {
      state.menuData = menuData;
    },
  },
  actions: {
    setTheme({ commit }, theme) {
      commit("updateTheme", theme);
    },
    setUserInfo({ commit }, userInfo) {
      commit("updateUserInfo", userInfo);
    },
    resetUserInfo({ commit }) {
      commit("updateUserInfo", {});
    },
    setMenuData({ commit }, menuData) {
      commit("updateMenuData", menuData);
    },
    resetMenuData({ commit }) {
      commit("updateMenuData", []);
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
    // 常用 store state 进行 app 级别 混入
    computed: {
      $theme() {
        return this.$store.state.theme;
      },
      $userInfo() {
        return this.$store.state.userInfo;
      },
    },
  });
  return {
    app,
  };
}
```

## 使用

已进行 app 级别混入的 store `state` 直接使用即可，其他 store `state` 则使用 `mapState` 混入 `computed`再使用（也可使用 this.$store.state）  
`action` 则使用 `mapActions` 混入 `methods` 再使用（也可使用 this.$store.dispatch）

```vue
<template>
  <view
    class="home-decoration"
    :style="{
      backgroundColor: $theme,
    }"
  ></view>
  <view>
    <text>{{ $userInfo.nickname }}</text>
  </view>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["menuData"]),
  },
  methods: {
    confirmHandler() {
      this.setUserInfo({
        ...this.$userInfo,
        nickname: "viho",
      });
    },
    ...mapActions(["setUserInfo"]),
  },
  watch: {
    "$userInfo.nickname": {
      handler(newValue) {
        // TODO
      },
      immediate: true,
    },
  },
};
</script>
```
