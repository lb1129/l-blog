# 路由

| 模块名称           | 官方维护 | 声明式路由 | 支持命名路由 | 支持动态路由 | 支持导航守卫 |
| ------------------ | -------- | ---------- | ------------ | ------------ | ------------ |
| react-router-dom@6 | 否       | 是         | 否           | 是           | 否           |

## 声明路由表

baseRoutes.ts

```ts
import { type RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    id: "Index",
    async lazy() {
      const module = await import('@/views/index/Index')
      return {
        Component: module.default
      }
    }
    children: [
      {
        // 默认渲染的子路由
        index: true,
        id: "Home",
        async lazy() {
          const module = await import('@/views/index/Home')
          return {
            Component: module.default
          }
        }
      },
      {
        id: 'PersonalCenter',
        path: 'personalCenter',
        async lazy() {
          const module = await import('@/views/index/Home')
          return {
            Component: module.default
          }
        },
        children: [
          {
            // 默认子路由有path 则使用Navigate导航到子路由
            index: true,
            element: <Navigate to='/personalCenter/basicInfo' />
          },
          {
            id: 'BasicInfo',
            path: 'basicInfo',
            handle: { needAuth: true, menuName: 'basicInfo' },
            element: lazyLoad('personal-center/BasicInfo')
          }
        ]
      }
    ],
  },
  {
    path: "/login",
    id: "Login",
    async lazy() {
      const module = await import("@/views/authenticate/Login");
      return {
        Component: module.default,
      };
    },
  },
  {
    path: "*",
    id: "NotFound",
    async lazy() {
      const module = await import("@/views/sundry/NotFound");
      return {
        Component: module.default,
      };
    },
  },
];

export default routes;
```

## 配置

index.ts

```ts
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import baseRoutes from "./baseRoutes";

// 根据运行或部署环境是否支持history路由模式 选取不同路由模式及basename
let createRouter = createBrowserRouter;
let basename: string | undefined = process.env.PUBLIC_URL;
if (process.env.REACT_APP_NOT_SUPPORT_HISTORY === "true") {
  createRouter = createHashRouter;
  basename = undefined;
}
const router = createRouter(baseRoutes, { basename });

export default router;
```

## 在根组件 App 中使用

```tsx
import { RouterProvider } from "react-router-dom";
import router from "@/router";

export default function App() {
  return <RouterProvider router={router} />;
}
```

## 路由导航

### 组件导航

```tsx
// 伪代码
import { Link } from 'react-router-dom'

// 点击触发导航
<Link to='/register' >to register</Link>
<Link to='/register' replace>replace to register</Link>
<Link to={{ pathname: '/register', search: '?a=1' }}>to register with search</Link>
```

### 导航组件

```tsx
// 伪代码
import { Navigate } from "react-router-dom";

// 组件挂载即导航
<Navigate to='/register' />;
```

### 编程式导航

函数组件

```ts
// 伪代码
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate("/register");
navigate("/register", {
  replace: true,
});
navigate({
  pathname: "/register",
  search: "?a=1",
});
navigate(-1);
```

react-router v6 不提供导航高阶组件，先实现自定义导航高阶组件

```tsx
import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export interface WithNavigation {
  navigate: NavigateFunction;
}

export function withNavigation<P>(
  Component: React.ComponentType<P & WithNavigation>
) {
  return (props: P) => <Component {...props} navigate={useNavigate()} />;
}
```

类组件

```tsx
import React, { Component } from "react";
import { withNavigation, type WithNavigation } from "./hoc";

type props = {
  name: string;
} & WithNavigation;

class ClassDemo extends Component<props> {
  render() {
    return (
      <button
        onClick={() => {
          this.props.navigate("/register");
        }}
      >
        to register
      </button>
    );
  }
}

export default withNavigation(ClassDemo);
```
