# 排序

## 实现

```js
/**
 * @description 对数字数组进行排序（升序，降序）
 * @param {number[]} numberList
 * @param {string} operator 指定是哪种操作（升序，降序）
 * @returns {number[]}
 */
const sort = (numberList, operator) => {
  const len = numberList.length;
  if (len < 2) return numberList;
  let result = [numberList[0]];
  for (let i = 1; i < numberList.length; i++) {
    const number = numberList[i];
    for (let n = 0; n < result.length; n++) {
      let condition = false;
      switch (operator) {
        case sort.DES:
          condition = result[n] <= number;
          break;
        case sort.ASC:
        default:
          condition = result[n] >= number;
          break;
      }
      if (condition) {
        result.splice(n, 0, number);
        break;
      } else if (n === result.length - 1) {
        result.push(number);
        break;
      }
    }
  }
  return result;
};
sort.ASC = "ASC";
sort.DES = "DES";
```

## 使用

```js
const ascResult = sort([5, 4, 7, 4, 6, 8], sort.ASC);
const desResult = sort([5, 4, 7, 4, 6, 8], sort.DES);
```
