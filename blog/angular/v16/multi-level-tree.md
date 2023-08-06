# 不限层级树

## 模板递归

```ts
import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

interface Item {
  id: string;
  name: string;
  children?: Item[];
}

@Component({
  selector: "app-tree",
  template: `<ul>
    <li *ngFor="let item of source">
      <div>{{ item.name }}</div>
      <app-tree
        *ngIf="item.children && item.children.length"
        [source]="item.children"
      />
    </li>
  </ul>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  @Input() source: Item[] = [];
  constructor() {}
}
```

## 使用 ngTemplateOutlet

```ts
import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

interface Item {
  id: string;
  name: string;
  children?: Item[];
}

@Component({
  selector: "app-tree",
  template: `<ul>
    <ng-container
      *ngTemplateOutlet="itemTpl; context: { $implicit: source }"
    ></ng-container>
    <ng-template #itemTpl let-items>
      <ng-container *ngFor="let item of items">
        <li>
          {{ item.name }}
        </li>
        <li *ngIf="item.children">
          <ul>
            <ng-container
              *ngTemplateOutlet="itemTpl; context: { $implicit: item.children }"
            ></ng-container>
          </ul>
        </li>
      </ng-container>
    </ng-template>
  </ul>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  @Input() source: Item[] = [];
  constructor() {}
}
```
