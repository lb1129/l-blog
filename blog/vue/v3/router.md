# 路由

| 模块名称     | 官方维护 | 声明式路由 | 支持命名路由 | 支持动态路由 | 支持导航守卫 |
| ------------ | -------- | ---------- | ------------ | ------------ | ------------ |
| vue-router@4 | 是       | 是         | 是           | 是           | 是           |

## 声明路由表

routes.ts

```ts
import { type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Index",
    meta: {},
    component: () => import("@/views/Index.vue"),
    children: [
      {
        // 默认渲染的子路由
        path: "",
        name: "Home",
        meta: {},
        component: () => import("@/views/Home.vue"),
      },
      // ...
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {},
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

export default routes;
```

## 配置

index.ts

```ts
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

// 根据环境变量 切换路由模式
const createHistory =
  import.meta.env.VITE_NOT_SUPPORT_HISTORY === 'true' ? createWebHashHistory : createWebHistory

const router = createRouter({
  // 从环境变量取 BASE_URL
  history: createHistory(import.meta.env.BASE_URL),
  routes
})

// 前置全局导航守卫
router.beforeEach(async (to， from) => {
  // 是否已登录 跳转控制 可进行异步控制
})

// 后置全局导航守卫
router.afterEach((to, from) => {
  // 修改标题 ...
})

export default router
```

## 接入 app

```ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";

const app = createApp(App);
app.use(router);
app.mount("#app");
```

## 路由导航

### 组件导航

```vue
<template>
  <router-link :to="{ name: 'Index' }">to index</router-link>
  <router-link :to="{ name: 'Login', replace: true }">to login</router-link>
</template>
```

### 编程式导航

```ts
import { useRouter } from "vue-router";

const router = useRouter();

router.push({
  name: "Home",
});
router.replace({
  name: "Home",
});
router.back();
```

## 动态路由

```vue
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// 根据业务逻辑 生成动态路由（比如用户菜单）
const routes = generateRoutes(menuDataStore.menuData);

// 将动态路由插入基础路由（根据业务逻辑选择插入位置）
routes.forEach((route) => {
  router.addRoute("Index", route);
});

// 触发重新匹配
router.replace(router.currentRoute.value.fullPath);
</script>
```
