# 依赖注入

## 定义依赖项

class 依赖项

```ts
import { Injectable } from "@angular/core";

@Injectable()
export class DemoService {
  constructor() {}
  getName() {
    return "viho";
  }
}
```

其他值 依赖项

```ts
import { InjectionToken } from "@angular/core";

export interface AppConfig {
  baseURL: string;
}

export const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>("app.config");

export const appConfig: AppConfig = {
  baseURL: "",
};
```

## 提供依赖项

组件级别

```ts
// DemoService 可用于此组件的所有实例以及它的模板中使用的其他组件和指令
@Component({
  providers: [DemoService]
})
```

模块级别

```ts
// DemoService 可用于此 NgModule 或与本模块位于同一个 ModuleInjector 的其它模块中声明的所有组件、指令和管道
@NgModule({
  providers: [DemoService]
})
```

根模块级别

```ts
// DemoService 整个应用程序中可用
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DemoService {
  constructor() {}
  getName() {
    return "viho";
  }
}
```

## 配置依赖项

useClass

```ts
import { DemoService } from "../demo.service";

providers: [
  // 下方的简写形式
  DemoService,
  { provide: DemoService, useClass: DemoService },
  // 注入 DemoService 时，将实例化 OtherService
  { provide: DemoService, useClass: OtherService },
];
```

useExisting

```ts
import { DemoService } from "../demo.service";

providers: [
  // DemoService 为 OtherService 别名 共享 OtherService 实例
  { provide: DemoService, useExisting: OtherService },
];
```

useFactory

```ts
import { DemoService } from "../demo.service";

providers: [
  {
    provide: DemoService,
    useFactory: (Logger) => {
      // 自定义逻辑
      return new DemoService();
    },
    // 工厂函数依赖的服务 将作为工厂函数的参数注入
    deps: [Logger],
  },
];
```

useValue

```ts
import { APP_CONFIG_TOKEN, appConfig } from "../app.config";

providers: [{ provide: APP_CONFIG_TOKEN, useValue: appConfig }];
```

## 使用依赖项

### 构造函数注入

```ts
import { Component, Inject } from "@angular/core";
import { DemoService } from "../demo.service";
import { APP_CONFIG_TOKEN, AppConfig, appConfig } from "../app.config";

@Component({
  selector: "app-demo",
  template: `<p></p>`,
  providers: [
    DemoService,
    {
      provide: APP_CONFIG_TOKEN,
      useValue: appConfig,
    },
  ],
})
export class DemoComponent {
  constructor(
    private demoService: DemoService,
    @Inject(APP_CONFIG_TOKEN) config: AppConfig
  ) {}
}
```

### inject 方法注入

```ts
import { inject } from "@angular/core";
import { DemoService } from "../demo.service";

export const demoFn = () => {
  const demoService = inject(DemoService);
};
```

## 参数装饰器

```ts
constructor(
    @Host() // 在宿主组件注入器中查找依赖项（宿主组件通常就是请求该依赖的那个组件。不过，当该组件投影进某个父组件时，那个父组件就会变成宿主）
    @Optional() // 让依赖项可选 找不到时不报错返回null
    private demoService?: DemoService,

    @Self() // 在该组件注入器中查找依赖项
    private demoService: DemoService,

    @SkipSelf() // 跳过当前组件注入器 并在注入器树中向上查找
    private demoService: DemoService,
  ) {}
```
