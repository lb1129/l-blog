# 变更检查机制

## 检查流程

1. 对响应式数据进行变更操作（赋值，数组操作等）触发变更检查
2. 在“next tick”更新周期中缓冲所有状态的修改（异步更新）（批处理）
3. 依赖该响应式数据的组件进入 rerender ，生成新的 vnode 与它旧的 vnode 进行 diff（依赖追踪）（精确到具体组件）
4. 将必要的更新应用到真实 DOM

## 批处理

### js 事件循环机制

同步代码执行，遇到异步任务则推入异步任务队列（宏任务队列，微任务队列），当前调用栈为空，js 引擎从异步任务队列以微任务优先（可插队）及先进先出的规则取出异步任务并按同步代码执行，以此循环往复

### 流程

当响应式数据变化后，vue 为本次更新创建一个缓冲队列和一个回调队列，并创建一个处理本次更新的异步任务（浏览器支持创建微任务则为微任务，否则降级为宏任务）后续在当前调用栈下多次对响应式数据进行变更操作，都将推入本次更新的缓冲队列中，后续在当前调用栈下通过 nextTick 注入的回调，都将推入本次更新的回调队列中；处理本次更新的异步任务何时执行交给事件循环机制调度；

## 响应式系统

Vue 3 使用 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 来创建响应式对象，仅将 getter / setter 用于 ref

## 响应式数据创建

```vue
<script setup lang="ts">
import { ref, reactive } from "vue";
// 原始类型
const msg = ref("");
// 引用类型
const obj = reactive({});
const arr = ref([]);
</script>
```

## 依赖追踪

组件挂载时，会追踪其中所用到的所有响应式依赖