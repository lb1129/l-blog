# 变更检查机制

## 检查流程

1. 手动，或通过异步事件触发变更检查
2. 从整颗组件树或部分开始对未设置跳过的组件进行检查（此处可进行编码优化）
3. 未设置跳过的组件进行数据模型（参数，状态）比对，模板表达式重新估算，寻找更改
4. 将更改应用到真实 DOM

## 手动触发

```ts
import {
  Component,
  ChangeDetectorRef,
  NgZone,
  ApplicationRef,
} from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<p>
      {{ count }}
    </p>
    <button id="button">addCount</button>`,
})
export class DemoComponent {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private applicationRef: ApplicationRef
  ) {}
  count = 0;

  ngAfterViewInit() {
    // 模拟数据模型改变 视图未更新
    this.ngZone.runOutsideAngular(() => {
      document.getElementById("button")?.addEventListener("click", () => {
        this.count++;
        // 该组件及其子组件进行变更检查
        this.changeDetectorRef.detectChanges();
        // 从根组件进行变更检查
        // this.applicationRef.tick();
      });
    });
  }
}
```

## 异步事件触发

Angular 使用 `zone.js` 来捕获异步操作，[zonejs 已补丁 api 列表](https://github.com/angular/angular/blob/main/packages/zone.js/MODULE.md)，当异步操作回调执行完成后，`ApplicationRef.tick`将被执行，从而触发变更检查

### 常用的异步操作

timers（MacroTask）

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<p>
    {{ count }}
  </p>`,
})
export class DemoComponent {
  constructor() {}
  count = 0;

  ngOnInit() {
    setTimeout(() => {
      this.count++;
    });
    setInterval(() => {
      this.count++;
    }, 1000);
  }
}
```

xhr（MacroTask）

```ts
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-demo",
  template: `<p>
    {{ count }}
  </p>`,
})
export class DemoComponent {
  constructor(private httpClient: HttpClient) {}
  count = 0;

  ngOnInit() {
    this.httpClient.get("/api/test").subscribe({
      next: () => {},
      error: () => {
        this.count++;
      },
    });
  }
}
```

dom 事件（EventTask）

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<p>
      {{ count }}
    </p>
    <button (click)="changeCount()">change count</button>`,
})
export class DemoComponent {
  constructor() {}
  count = 0;

  changeCount() {
    this.count++;
  }
}
```

promise（MicroTask）

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<p>
    {{ count }}
  </p>`,
})
export class DemoComponent {
  constructor() {}
  count = 0;

  ngOnInit() {
    new Promise((resolve, reject) => {
      resolve(true);
    }).then(() => {
      this.count++;
    });
  }
}
```

## 跳过检查

### OnPush 模式

组件设置了 OnPush，但以下情况也会触发变更检查

1. 组件 props 变化（原始类型值不相等，引用类型切换了引用地址）
2. 组件内有事件被触发
3. 组件的后代组件有事件被触发

```ts
import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<p>{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  @Input() text!: string;

  constructor() {}
}
```

### 分离视图

即使已分离的视图已标记为脏的，它们在重新附加上去之前也不会被检查。

```ts
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<p>{{ text }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  @Input() text!: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  detach() {
    // 分离视图
    this.changeDetectorRef.detach();
  }

  reattach() {
    // 附加回变更检测树
    this.changeDetectorRef.reattach();
  }
}
```

## 其他优化

### zone 污染

异步操作不需要执行变更检查时，可使用 `NgZone` `runOutsideAngular`

```ts
import { Component, NgZone } from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<p>
    {{ count }}
  </p>`,
})
export class DemoComponent {
  constructor(private ngZone: NgZone) {}
  count = 0;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        // TODO
      }, 1000);
      // 第三方库
      // this.myChart = echarts.init(this.chartDom.nativeElement)
    });
  }
}
```

### 使用纯管道

纯管道只在其参数发生改变时，才会重新进行运算

pure Pipe

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "random",
  pure: true,
})
export class DemoPipe implements PipeTransform {
  transform(value: number) {
    return Math.random() * value;
  }
}
```

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<p>
      {{ count | random }}
    </p>
    <button (click)="add()">add</button>`,
})
export class DemoComponent {
  constructor() {}
  count = 0;

  add() {
    this.count++;
  }
}
```
