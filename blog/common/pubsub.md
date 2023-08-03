# 订阅发布

## api

`on`  
`off`  
`emit`  
`once`

## 实现

core.ts

```ts
type Key = symbol;
type Handler = (...args: unknown[]) => void;
interface Record {
  handler: Handler;
  once: boolean;
}

class Pubsub {
  store: Map<Key, Record[]>;
  constructor() {
    this.store = new Map();
  }
  on(key: Key, handler: Handler, once?: boolean) {
    const record: Record = { handler, once: !!once };
    if (this.store.has(key)) {
      const records = this.store.get(key);
      records?.push(record);
    } else {
      this.store.set(key, [record]);
    }
  }
  off(key: Key, handler: Handler) {
    if (this.store.has(key)) {
      const records = this.store.get(key);
      const handlerIndex = records?.findIndex(
        (record) => record.handler === handler
      );
      if (handlerIndex || handlerIndex === 0) records?.splice(handlerIndex, 1);
    }
  }
  emit(key: Key, ...args: unknown[]) {
    if (this.store.has(key)) {
      const records = this.store.get(key);
      records?.forEach((record) => {
        record.handler(...args);
        if (record.once) {
          this.off(key, record.handler);
        }
      });
    }
  }
  once(key: Key, handler: Handler) {
    this.on(key, handler, true);
  }
}

export default Pubsub;
```

## 配置

### index.ts

根据业务需求 来决定是用单例 还是多实例 这里先用单例

```ts
import Pubsub from "./core";

export default new Pubsub();
```

### events.ts

```ts
export const productEditDone = Symbol("productEditDone");
// ...
```

## 使用

```ts
// 伪代码
import pubsub from "@/pubsub";
import { productEditDone } from "@/pubsub/events";

const refreshData = () => {
  // TODO
};

pubsub.on(productEditDone, refreshData);
pubsub.off(productEditDone, refreshData);

pubsub.emit(
  productEditDone
  // 需派发的数据
);
```
