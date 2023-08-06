# 路由

| 模块名称           | 官方维护 | 声明式路由 | 支持命名路由 | 支持动态路由 | 支持导航守卫 |
| ------------------ | -------- | ---------- | ------------ | ------------ | ------------ |
| @angular/router@16 | 是       | 是         | 否           | 是           | 是           |

## 声明路由表

```ts
const baseRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/index/index/index.component"),
    data: {},
    children: [
      {
        // 默认渲染的子路由
        path: "",
        loadComponent: () => import("./pages/index/home/home.component"),
        data: {},
      },
      {
        path: "personalCenter",
        loadComponent: () =>
          import("./pages/personal-center/index/index.component"),
        data: {},
        children: [
          {
            // 默认子路由有path 则使用redirectTo导航到子路由
            path: "",
            redirectTo: "basicInfo",
            pathMatch: "full",
          },
          {
            path: "basicInfo",
            loadComponent: () =>
              import("./pages/personal-center/basic-info/basic-info.component"),
            data: {},
          },
        ],
      },
    ],
  },
  {
    path: "login",
    loadComponent: () => import("./pages/authenticate/login/login.component"),
    data: {},
  },
  {
    path: "**",
    loadComponent: () => import("./pages/sundry/not-found/not-found.component"),
  },
];
```

## 配置根路由模块

```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "@/environments/environment";

@NgModule({
  imports: [
    RouterModule.forRoot(baseRoutes, {
      useHash: environment.NOT_SUPPORT_HISTORY,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

## 在根模块导入根路由模块

```ts
import { AppRoutingModule } from "./app-routing.module";

imports: [AppRoutingModule],
```

## 导航

### 指令导航

```html
<a routerLink="/register">to register</a>
<a routerLink="/register" replaceUrl>to register</a>
```

### 编程式导航

```ts
import { Router } from '@angular/router'
import { Location } from '@angular/common'

constructor(private router: Router, private location: Location) {}

this.router.navigate(['/register'])
this.router.navigate(['/register'], { replaceUrl: true })
this.location.back()
```

## 路由守卫

### 定义路由守卫

authGuard.ts

```ts
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { map } from "rxjs";
import isAuthenticated from "./isAuthenticated";

// 是否已登录跳转控制
export const authGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return isAuthenticated.value.pipe(
    map((val) => {
      if (val) {
        if (route.data["needAuth"] === false) {
          router.navigate([""], { replaceUrl: true });
          return false;
        }
      } else {
        if (route.data["needAuth"] == true) {
          router.navigate(["login"], { replaceUrl: true });
          return false;
        }
      }
      return true;
    })
  );
};
```

### 使用路由守卫

```ts
{
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () => import('./pages/index/index/index.component'),
    data: {  },
}
```
