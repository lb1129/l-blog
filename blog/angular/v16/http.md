# http 请求

| 模块名称           | 官方维护 | 支持拦截器 | 支持上传下载进度 | 异步处理机制 |
| ------------------ | -------- | ---------- | ---------------- | ------------ |
| @angular/common@16 | 是       | 是         | 是               | rxjs         |

## api.ts

后台接口 url 声明

```ts
// auth 模块
export const isLogin_api = "/api/auth/isLogin";

// oauth模块
export const login_by_wx_api = "/api/oauth/loginByWx";

// user模块
export const userInfo_get_api = "/api/user/getUserInfo";

// 产品模块
export const product_get_by_id_api = "/api/product/getProductById";

// 菜单模块
export const menu_get_api = "/api/menu/getMenu";

// rsa加密公钥
export const rsa_public_key_api = "/api/rsa/getPublicKey";

// 其他
export const sendCode_api = "/api/sendCode";

// 文件上传
export const upload_get_params_api = "/api/getUploadParams";
```

## 编写拦截器

interceptor.ts

```ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { catchError, map, switchMap, from } from "rxjs";
import { TokenLocalforage } from "@/app/storage/localforage";
import { Config } from "@/app/config";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private tokenLocalforage: TokenLocalforage,
    private config: Config
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 从本地存储获取token
    return from(this.tokenLocalforage.get()).pipe(
      map((token) => {
        let url = req.url;
        // api补全url
        if (/^\/?api\//i.test(url)) {
          url = `${this.config.http.baseURL}${url}`;
        }
        return req.clone({
          url,
          setHeaders: {
            Authorization: `Bearer ${token}`,
            // 希望服务器返回的数据语言类型
            // 结合i18n
            "Accept-Language": "",
          },
        });
      }),
      switchMap((newReq) => {
        return next.handle(newReq);
      }),
      // 错误处理
      catchError(async (error) => {
        // 401 未登录
        if (error.status === 401) {
          // 清除 token
          // 重置 store
          // 其他清理工作
          // ...
          // 跳转登录页
        } else {
          // 进行错误提示
          // ...
        }
        // 再往外抛 让外部的错误处理可执行
        throw error;
      })
    );
  }
}
```

## 在根模块提供拦截器

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Interceptor } from "@/app/http/interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## 使用

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { isLogin_api } from "@/app/http/api";
import type { IResponse } from "@/app/http/types";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  isLogin() {
    return this.httpClient.get<IResponse<boolean>>(isLogin_api);
  }
}
```
