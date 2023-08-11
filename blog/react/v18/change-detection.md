# 变更检查机制

## 检查流程

1. 类组件中调用 setState forceUpdate 触发变更检查，函数组件调用 useState、useReducer 状态管理 hooks 的 dispatch 触发变更检查
2. 触发变更检查的组件及其后代组件进入参数，状态比对，（此处可进行编码优化）
3. 未跳过更新的组件进入 rerender 流程，重新生成 vnode（类组件 render 被调用，函数组件重新执行）
4. vnode 转 fiber，新旧 fiber diff（可中断，由浏览器 requesetIdleCallback 调度）(中断恢复依靠父级，子级，兄弟指针)
5. diff 全部完成，如有差异，进入 commit 阶段，一次性更新真实 DOM（不可中断）

## 更新方式

### 异步

```tsx
// 函数组件
import React, { useState } from "react";

export default function FCDemo() {
  const [count, setCount] = useState(0);
  console.log("component render");
  return (
    <div>
      <span id='node'>{count}</span>
      <button
        onClick={() => {
          setCount(1);
          console.log(count);
          console.log(document.getElementById("node")?.textContent);
        }}
      >
        change count
      </button>
    </div>
  );
}
// 点击 button log
// 0
// 0
// component render
```

```tsx
// 类组件
import React, { Component } from "react";

export default class ClassDemo extends Component {
  state = {
    count: 0,
  };

  changeCount() {
    this.setState({
      count: 1,
    });
    console.log(this.state.count);
    console.log(document.getElementById("node")?.textContent);
  }

  render() {
    console.log("component render");
    return (
      <div>
        <span id='node'>{this.state.count}</span>
        <button
          onClick={() => {
            this.changeCount();
          }}
        >
          change count
        </button>
      </div>
    );
  }
}
// 点击 button log
// 0
// 0
// component render
```

### 同步

```tsx
// 函数组件
import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function FCDemo() {
  const [count, setCount] = useState(0);
  console.log("component render");
  return (
    <div>
      <span id='node'>{count}</span>
      <button
        onClick={() => {
          ReactDOM.flushSync(() => {
            setCount(1);
          });
          console.log(count);
          console.log(document.getElementById("node")?.textContent);
        }}
      >
        change count
      </button>
    </div>
  );
}
// 点击 button log（注意：函数组件中状态值更新依然是滞后的，这与类组件表现不同）
// component render
// 0
// 1
```

```tsx
// 类组件
import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class ClassDemo extends Component {
  state = {
    count: 0,
  };

  changeCount() {
    ReactDOM.flushSync(() => {
      this.setState({
        count: 1,
      });
    });
    console.log(this.state.count);
    console.log(document.getElementById("node")?.textContent);
  }

  render() {
    console.log("component render");
    return (
      <div>
        <span id='node'>{this.state.count}</span>
        <button
          onClick={() => {
            this.changeCount();
          }}
        >
          change count
        </button>
      </div>
    );
  }
}
// 点击 button log
// component render
// 1
// 1
```

## 批处理

react18 之前，在定时器，原生事件回调，promise 中， 同一调用栈中多次对状态变更不会进行批处理，除非手动使用 `ReactDOM.unstable_batchedUpdates`  
react18 在上述情况中也可以自动进行批处理，所以进行状态变更操作后，立即获取的状态值都将是旧值

```tsx
// 伪代码 以下都将输出 0
count = 0;
this.setState({
  count: 1,
});
console.log(this.state.count);
setCount(1);
console.log(count);
// or
setTimeout(() => {
  this.setState({
    count: 1,
  });
  console.log(this.state.count);
});
setTimeout(() => {
  setCount(1);
  console.log(count);
});
```

## 跳过更新

这里我们把 触发状态更新的组件 叫做 起始组件

起始组件及其所有后代组件都将进入变更检查流程，应用越复杂，起始组件包含的后代组件越多，那么需要 rerender 的组件就越多，需要执行 重新生成 vnode， vnode 转 fiber，fiber diff 的过程就越长，所以我们要在编码阶段进行优化，让不需要更新的组件在检查阶段就阻止 进入 rerender 流程

### 类组件

对于无 props 的组件，直接继承 PureComponent（浅比较）

```ts
class ClassDemo extends PureComponent {}
```

对于有 props 的组件，如果 props 中有引用类型，建议在 shouldComponentUpdate 生命周期函数中进行优化

```ts
class ClassDemo extends Component {
  shouldComponentUpdate(
    nextProps: Readonly<{}>,
    nextState: Readonly<{}>,
    nextContext: any
  ): boolean {
    // 比较 新旧 props state context
    // 返回 true false
  }
}
```

其他优化点：

1. 状态不变的时，保持状态值的同一引用（如果该状态值做为子组件的 props，这将变得尤为重要）
2. 保持方法的同一引用（如果该方法做为子组件的 props，这将变得尤为重要）

### 函数组件

对于无 props 的组件，直接使用 React.memo（浅比较）

```ts
React.memo(function FCDemo() {});
```

对于有 props 的组件，如果 props 中有引用类型，建议在 React.memo 第二个回调参数中进行优化

```ts
React.memo(
  function FCDemo() {},
  (prevProps, nextProps) => {
    // 比较 新旧 props
    // 返回 true false
  }
);
```

其他优化点：

1. 使用 useMemo 缓存值 避免重复计算 同一条件下使对象保持同一引用（如果该值做为子组件的 props，这将变得尤为重要）
2. 使用 useCallback 同一条件下使方法保持同一引用（如果该方法做为子组件的 props，这将变得尤为重要）
