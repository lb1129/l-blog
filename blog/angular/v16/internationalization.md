# 国际化

| 模块名称               | 官方维护 | 支持运行时切换 | 支持资源按需加载 |
| ---------------------- | -------- | -------------- | ---------------- |
| @angular/localize@16   | 是       | 否             | 否               |
| @ngx-translate/core@15 | 否       | 是             | 是               |

## @angular/localize

移步到[文档](https://angular.cn/guide/i18n-common-add-package)

## 使用@ngx-translate/core

### 资源文件

在 assets/i18n 目录编写资源文件

zh-CN.json

```json
{
  "helloWorld": "你好世界"
}
```

en-US.json

```json
{
  "helloWorld": "Hello World"
}
```

### 在根模块配置

```ts
import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Interceptor } from "@/app/http/interceptor";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

registerLocaleData(zh);

const HttpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, "assets/i18n/");
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: "zh-CN",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "zh-CN" },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## 使用

注入 TranslateService 依赖

```ts
import { TranslateService } from '@ngx-translate/core'

constructor(public translate: TranslateService) {}
```

js 中使用

```ts
this.translate.get("helloWorld").subscribe((message) => {
  // ...
});
```

模板中使用

```html
<input [placeholder]="translate.get('helloWorld') | async" />
<div>{{translate.get('pleaseEnterPassword') | async}}</div>
```

## 切换语言

```ts
import { TranslateService } from '@ngx-translate/core'

// 注入 TranslateService 依赖
constructor(public translate: TranslateService) {}

setLocale(locale: string) {
  // 切换语言
  this.translate.setDefaultLang(locale)
}
```
