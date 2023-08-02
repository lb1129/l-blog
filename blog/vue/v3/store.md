# 数据仓库

| 模块名称 | 官方维护 |
| -------- | -------- |
| pinia@2  | 是       |

## 配置

index.ts

```ts
import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;
```

## 接入 app

```ts
import { createApp } from "vue";
import App from "./App.vue";
import pinia from "@/pinia";

const app = createApp(App);

app.use(pinia);
app.mount("#app");
```

## 定义 store state

stores/userInfo.ts 用户信息

```ts
import { reactive } from "vue";
import { defineStore } from "pinia";
import type { UserType } from "@/types/user";

export const useUserInfo = defineStore("userInfo", () => {
  const userInfo = reactive<UserType>({
    _id: "",
    username: "",
    nickname: "",
    phone: null,
    avatar: "",
    profile: "",
  });
  const setUserInfo = (info: Partial<UserType>) => {
    Object.assign(userInfo, info);
  };
  return { userInfo, setUserInfo };
});
```

## 使用 store state

```vue
<script setup lang="ts">
import { useUserInfo } from "@/pinia/stores/userInfo";

const userInfoStore = useUserInfo();

const clickHandler = () => {
  userInfoStore.setUserInfo({
    nickname: "viho",
  });
};
</script>

<template>
  <span>{{ userInfoStore.userInfo.nickname }}</span>
  <button @click="clickHandler">edit userInfo</button>
</template>
```

## pinia 插件系统

### 定义插件

plugins/subscribe.ts

```ts
import type { Store } from "pinia";

export default ({ store }: { store: Store }) => {
  store.$subscribe((mutation, state) => {
    // 响应 store 变化
  });
  // ...
};
```

### 注册插件

index.ts

```ts
import { createPinia } from "pinia";
import subscribe from "./plugins/subscribe";

const pinia = createPinia();

// 注册插件
pinia.use(subscribe);

export default pinia;
```
