# 有规律的

## 斐波拉契数列

[1, 1, 2, 3, 5, 8, 13, 21, 34, ...] 从第三位开始，后面每项的值等于前两项之和

### 递归

```js
/**
 * @description 获取斐波拉契数列中某位值
 * @param {number} index（从 1 开始）
 * @returns {number}
 */
const fibByLoop = (index) => {
  if (index <= 2) return 1;
  return fibByLoop(index - 1) + fibByLoop(index - 2);
};

const result = fibByLoop(9);
```

### 动态规划

```js
/**
 * @description 获取斐波拉契数列中某位值
 * @param {number} index（从 1 开始）
 * @returns {number}
 */
const fib = (index) => {
  if (index <= 2) return 1;
  // 动态规划
  let cache = [1, 1];
  for (let i = 2; i < index; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }
  return cache[index - 1];
};

const result = fib(9);
```
