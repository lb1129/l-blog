# 树

## 数据源

```js
const source = [
  {
    name: "a",
    children: [
      {
        name: "a-a",
        children: [
          {
            name: "a-a-a",
            children: [],
          },
        ],
      },
      {
        name: "a-b",
        children: [
          {
            name: "a-b-a",
            children: [],
          },
          {
            name: "a-b-b",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "b",
    children: [
      {
        name: "b-a",
        children: [
          {
            name: "b-a-a",
            children: [],
          },
        ],
      },
    ],
  },
];
```

## 以深度优先递归树

```js
/**
 * @description 以深度优先递归树
 * @param {[]} list
 */
const loop = (list) => {
  list.forEach((item) => {
    console.log(item.name);
    if (item.children && item.children.length) {
      loop(item.children);
    }
  });
};

loop(source);
```

## 以深度优先递归树 可中断

```js
/**
 * @description 以深度优先递归树 可中断
 * @param {[]} list
 */
let flag = true;
const loopCanBreak = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (flag) {
      const item = list[i];
      console.log(item.name);
      if (item.name === "a-b-a") {
        flag = false;
        break;
      }
      if (item.children && item.children.length) {
        loopCanBreak(item.children);
      }
    }
  }
};

loopCanBreak(source);
```

## 以深度优先遍历树

```js
/**
 * @description 一层循环以深度优先遍历树
 * @param {[]} list
 */
const byWhile = (list) => {
  let copyList = [...list];
  while (copyList.length) {
    const item = copyList.shift();
    console.log(item.name);
    if (item.children && item.children.length)
      copyList = [...item.children, ...copyList];
  }
};

byWhile(source);
```

## 以深度优先遍历树 可中断

```js
/**
 * @description 一层循环以深度优先遍历树 可中断
 * @param {[]} list
 */
const byWhileBreak = (list) => {
  let copyList = [...list];
  while (copyList.length) {
    const item = copyList.shift();
    console.log(item.name);
    if (item.name === "a-b-a") {
      break;
    }
    if (item.children && item.children.length)
      copyList = [...item.children, ...copyList];
  }
};

byWhileBreak(source);
```

## 以广度优先遍历树

```js
/**
 * @description 一层循环以广度优先遍历树
 * @param {[]} list
 */
const byWhileBreadthFirst = (list) => {
  let copyList = [...list];
  while (copyList.length) {
    const item = copyList.shift();
    console.log(item.name);
    if (item.children && item.children.length)
      copyList = [...copyList, ...item.children];
  }
};

byWhileBreadthFirst(source);
```

## 广度优先遍历树 可中断

```js
/**
 * @description 一层循环以广度优先遍历树 可中断
 * @param {[]} list
 */
const byWhileBreadthFirstBreak = (list) => {
  let copyList = [...list];
  while (copyList.length) {
    const item = copyList.shift();
    console.log(item.name);
    if (item.name === "a-b-a") {
      break;
    }
    if (item.children && item.children.length)
      copyList = [...copyList, ...item.children];
  }
};

byWhileBreadthFirstBreak(source);
```
