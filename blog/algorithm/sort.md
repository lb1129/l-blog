# 排序

## 冒泡排序

每一轮，从索引 0 开始 到 len - i - 1，进行相邻值比较  
降序 前一位值比后一位值小 就进行交换  
升序 前一位值比后一位值大 就进行交换

### 实现

```js
/**
 * @description 冒泡排序
 * @param {number[]} numberList
 * @param {string} operator 指定是哪种操作（升序，降序）
 * @returns {number[]}
 */
const bubbleSort = (numberList, operator) => {
  const len = numberList.length;
  if (len < 2) return numberList;
  for (let i = 0; i < len; i++) {
    // 每一轮 将确定一个值 需减去轮次 并且相邻比较是当前与后一位比较 需再减去1
    for (let n = 0; n < len - i - 1; n++) {
      // 相邻比较
      let condition = false;
      switch (operator) {
        // 降序 前一位值比后一位值小 就进行交换
        case bubbleSort.DES:
          condition = numberList[n] < numberList[n + 1];
          break;
        // 升序 前一位值比后一位值大 就进行交换
        case bubbleSort.ASC:
        default:
          condition = numberList[n] > numberList[n + 1];
          break;
      }
      if (condition) {
        let tem = numberList[n];
        numberList[n] = numberList[n + 1];
        numberList[n + 1] = tem;
      }
    }
  }
  return numberList;
};
bubbleSort.ASC = "ASC";
bubbleSort.DES = "DES";
```

### 使用

```js
const ascResult = bubbleSort([5, 4, 7, 4, 6, 8], bubbleSort.ASC);
const desResult = bubbleSort([5, 4, 7, 4, 6, 8], bubbleSort.DES);
```

## 选择排序

每一轮，从当前索引+1 开始  
降序 找到最大值索引  
升序 找到最小值索引  
然后与当前索引进行值交换

### 实现

```js
/**
 * @description 选择排序
 * @param {number[]} numberList
 * @param {string} operator 指定是哪种操作（升序，降序）
 * @returns {number[]}
 */
const selectSort = (numberList, operator) => {
  const len = numberList.length;
  if (len < 2) return numberList;
  for (let i = 0; i < len; i++) {
    // 每一轮 索引初始为 i
    let index = i;
    // 从 i+1 开始
    for (let n = i + 1; n < len; n++) {
      // 降序 找到最大值索引
      // 升序 找到最小值索引
      if (
        operator === selectSort.DES
          ? numberList[n] > numberList[index]
          : numberList[n] < numberList[index]
      ) {
        index = n;
      }
    }
    // 交换
    if (i !== index) {
      const tem = numberList[i];
      numberList[i] = numberList[index];
      numberList[index] = tem;
    }
  }
  return numberList;
};
selectSort.ASC = "ASC";
selectSort.DES = "DES";
```

### 使用

```js
const ascResult = selectSort([5, 4, 7, 4, 6, 8], selectSort.ASC);
const desResult = selectSort([5, 4, 7, 4, 6, 8], selectSort.DES);
```

## 插入排序

每一轮，取出当前值，然后从当前索引开始往前进行 当前值与前面每一位值 的比较  
降序 前一位值比当前值小 前一位值就往后挪  
升序 前一位值比当前值大 前一位值就往后挪  
在挪动结束索引 插入当前值

### 实现

```js
/**
 * @description 插入排序
 * @param {number[]} numberList
 * @param {string} operator 指定是哪种操作（升序，降序）
 * @returns {number[]}
 */
const insertionSort = (numberList, operator) => {
  const len = numberList.length;
  if (len < 2) return numberList;
  for (let i = 1; i < len; i++) {
    // 每一轮 拿出当前值
    const current = numberList[i];
    let n = i;
    // 从 i 开始 往前比对
    // 降序 前一位值比当前值小 前一位值就往后挪
    // 升序 前一位值比当前值大 前一位值就往后挪
    while (
      n > 0 && operator === insertionSort.DES
        ? numberList[n - 1] < current
        : numberList[n - 1] > current
    ) {
      numberList[n] = numberList[n - 1];
      --n;
    }
    // 在挪动结束索引 插入当前值
    numberList[n] = current;
  }
  return numberList;
};
insertionSort.ASC = "ASC";
insertionSort.DES = "DES";
```

### 使用

```js
const ascResult = insertionSort([5, 4, 7, 4, 6, 8], insertionSort.ASC);
const desResult = insertionSort([5, 4, 7, 4, 6, 8], insertionSort.DES);
```
