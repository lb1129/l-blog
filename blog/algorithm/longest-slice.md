# 最长字串

## 实现

```js
/**
 * @description 从数字数组中获取最长字串（递增，递减，重复，不重复）
 * @param {number[]} numberList 数字数组中
 * @param {string} operator 指定是哪种操作（递增 递减 重复 不重复）
 * @returns {number[]} 最长字串
 */
const getLongestSlice = (numberList, operator) => {
  const listLen = numberList.length;
  if (listLen < 2) return numberList;
  // 结果可能是多组长度相等的字串
  let result = [];
  let current = [];
  for (let i = 0; i < listLen; i++) {
    let prev = numberList[i];
    current.push(prev);
    if (i === listLen - 1) {
      // 长度相等就添加
      if (result[0].length === current.length) {
        result.push(current);
      } else if (result[0].length < current.length) {
        // 长度小于就覆盖
        result = [current];
      }
    }
    for (let m = i + 1; m < listLen; m++) {
      const next = numberList[m];
      let condition = false;
      switch (operator) {
        case getLongestSlice.DECREMENT:
          condition = next < prev;
          break;
        case getLongestSlice.REPEAT:
          condition = current.indexOf(next) !== -1;
          break;
        case getLongestSlice.NOREPEAT:
          condition = current.indexOf(next) === -1;
          break;
        case getLongestSlice.INCREMENTAL:
        default:
          condition = next > prev;
          break;
      }
      if (condition) {
        prev = next;
        current.push(next);
        if (m === listLen - 1) {
          // 长度相等就添加
          if (!result.length || result[0].length === current.length) {
            result.push(current);
          } else if (result[0].length < current.length) {
            // 长度小于就覆盖
            result = [current];
          }
          current = [];
          i = m;
          break;
        }
      } else {
        // 长度相等就添加
        if (!result.length || result[0].length === current.length) {
          result.push(current);
        } else if (result[0].length < current.length) {
          // 长度小于就覆盖
          result = [current];
        }
        current = [];
        i = m - 1;
        break;
      }
    }
  }
  return result;
};
getLongestSlice.INCREMENTAL = "INCREMENTAL";
getLongestSlice.DECREMENT = "DECREMENT";
getLongestSlice.REPEAT = "REPEAT";
getLongestSlice.NOREPEAT = "NOREPEAT";
```

## 使用

```js
const incrementalResult = getLongestSlice(
  [1, 2, 3, 4, 5, 1, 1, 2, 3, 4, 5],
  getLongestSlice.INCREMENTAL
);
const decrementResult = getLongestSlice(
  [1, 2, 3, 4, 5, 1, 1, 2, 3, 4, 5],
  getLongestSlice.DECREMENT
);
const repeatResult = getLongestSlice(
  [1, 2, 3, 4, 5, 1, 1, 2, 3, 4, 5],
  getLongestSlice.REPEAT
);
const noRepeatResult = getLongestSlice(
  [1, 2, 3, 4, 5, 1, 1, 2, 2, 4, 5],
  getLongestSlice.NOREPEAT
);
```
