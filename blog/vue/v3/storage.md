# 前端储存

[IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API),
~~WebSQL~~,
[localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage), [sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage),
[cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie) 可使用 [js-cookie](https://github.com/js-cookie/js-cookie) 进行类似封装

## 本地储存

IndexedDB, ~~WebSQL~~, localStorage

### keys.ts

```ts
export const token = "token";
```

### index.ts

```ts
import localforage from "localforage"; // IndexedDB, WebSQL, or localStorage
import { token } from "./keys";

localforage.config({
  // 系统名称
  name: import.meta.env.VITE_SYSTEM_NAME,
  // 仓库名称
  storeName: "store",
});

export const tokenLocalforage = {
  async get() {
    const value = await localforage.getItem<string>(token);
    return value ?? "";
  },
  async set(value: string) {
    return localforage.setItem(token, value);
  },
  async clear() {
    return localforage.removeItem(token);
  },
};
```

## 会话储存

sessionStorage

### keys.ts

```ts
export const test = "test";
```

### index.ts

```ts
import { test } from "./keys";

export const testSeesion = {
  get() {
    let result: string[];
    const value = sessionStorage.getItem(test);
    if (value) {
      try {
        result = JSON.parse(value);
      } catch (error) {
        result = [];
      }
    } else {
      result = [];
    }
    return result;
  },
  set(value: string[]) {
    sessionStorage.setItem(test, JSON.stringify(value));
  },
  clear() {
    sessionStorage.removeItem(test);
  },
};
```
