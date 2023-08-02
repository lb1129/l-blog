# 变更检查机制

## 检查流程

1. 对响应式数据进行变更操作（赋值，数组操作等）触发变更检查
2. 在“next tick”更新周期中缓冲所有状态的修改（异步更新）（更新合并）
3. 依赖该响应式数据的组件生成新的 vnode 与它旧的 vnode 进行 diff（依赖追踪）（精确到具体组件）
4. 将必要的更新应用到真实 DOM

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
