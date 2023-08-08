# angular 应用测试

直接使用 `@angular/cli` 基于 [jasmine](https://github.com/jasmine/jasmine) [karma](https://github.com/karma-runner/karma) 封装好的单元测试

## 组件测试

编写组件

```ts
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-demo",
  template: `<div (click)="clickHander()">{{ msg }}</div>`,
})
export class DemoComponent {
  @Input() msg!: string;
  @Output() click = new EventEmitter();

  clickHander() {
    this.click.emit();
  }
}
```

编写测试用例

```ts
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DemoComponent } from "./demo.component";
import { first } from "rxjs";
import { By } from "@angular/platform-browser";

describe("DemoComponent", () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoComponent],
    });
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("param msg should work", () => {
    component.msg = "hello world";
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("div").textContent).toBe(
      "hello world"
    );
  });

  it("click event should work", () => {
    let flag = false;
    component.click.pipe(first()).subscribe(() => {
      flag = true;
    });
    fixture.debugElement.query(By.css("div")).triggerEventHandler("click");
    expect(flag).toBeTrue();
  });
});
```

## 指令测试

编写指令

```ts
import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[highlight]",
})
export class DemoDirective {
  defaultColor = "rgb(211, 211, 211)";

  @Input("highlight") bgColor = "";

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
}
```

编写测试用例

```ts
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DemoDirective } from "./demo.directive";
import { Component } from "@angular/core";

// 定义一个使用指令的组件
@Component({
  template: `<h2 highlight="skyblue">test</h2>`,
})
export class TestComponent {}

describe("DemoDirective", () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, DemoDirective],
    }).createComponent(TestComponent);
    fixture.detectChanges();
  });

  it("should have skyblue <h2>", () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector("h2");
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe("skyblue");
  });
});
```

## 管道测试

编写管道

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "demo",
})
export class DemoPipe implements PipeTransform {
  transform(value: number) {
    return Math.floor(value);
  }
}
```

编写测试用例

```ts
import { DemoPipe } from "./demo.pipe";

describe("DemoPipe", () => {
  let pipe: DemoPipe;

  beforeEach(() => {
    pipe = new DemoPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("transform should work", () => {
    expect(pipe.transform(0.8)).toBe(0);
  });
});
```

## 服务测试

编写服务

```ts
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DemoService {
  constructor() {}

  getName() {
    return "viho";
  }

  getAge() {
    return of(18);
  }
}
```

编写测试用例

```ts
import { TestBed } from "@angular/core/testing";
import { DemoService } from "./demo.service";

describe("DemoService", () => {
  let service: DemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#getName should return viho", () => {
    expect(service.getName()).toBe("viho");
  });

  it("#getAge should return value from observable", (done) => {
    service.getAge().subscribe((value) => {
      expect(value).toBe(18);
      done();
    });
  });
});
```

## 运行测试用例

```sh
ng serve
# 或者
npm run test
```
