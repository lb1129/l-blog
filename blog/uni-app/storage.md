# 本地储存

封装后再使用，方便查看管理维护

## keys.js

```js
export const themeKey = "themeKey";
export const tokenKey = "tokenKey";
```

## index.js

```js
import { themeKey, tokenKey } from "./keys.js";

export const themeStorage = {
  get() {
    return uni.getStorageSync(themeKey);
  },
  set(value) {
    uni.setStorageSync(themeKey, value);
  },
  clear() {
    uni.removeStorageSync(themeKey);
  },
};

export const tokenStorage = {
  get() {
    return uni.getStorageSync(tokenKey);
  },
  set(value) {
    uni.setStorageSync(tokenKey, value);
  },
  clear() {
    uni.removeStorageSync(tokenKey);
  },
};
```
