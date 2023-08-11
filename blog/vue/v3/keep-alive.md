# keep-alive

| 模块名称   | 官方维护 | 支持路由组件 | 支持普通组件 |
| ---------- | -------- | ------------ | ------------ |
| keep-alive | 是       | 是           | 是           |

## 结合路由使用

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const keepAliveInclude = ref<string[]>([]);

watchEffect(() => {
  const record = route.matched[route.matched.length - 1];
  // 根据业务场景 将需要缓存的路由name（路由name与组件同名）添加到 include
  keepAliveInclude.value = [record.name as string];
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="keepAliveInclude">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

## 其他使用场景

### 动态组件

```vue
<script setup lang="ts">
import { defineComponent, h, shallowRef } from "vue";

// 组件A
const ComponnetA = defineComponent({
  setup(props, ctx) {
    return () => h("input");
  },
});
// 组件B
const ComponnetB = defineComponent({
  setup(props, ctx) {
    return () => h("input");
  },
});
// 组件选项对象不转为响应式 仅 activeComponent.value 是响应式
const activeComponent = shallowRef(ComponnetA);

const clickHandler = () => {
  activeComponent.value =
    activeComponent.value === ComponnetA ? ComponnetB : ComponnetA;
};
</script>

<template>
  <KeepAlive>
    <component :is="activeComponent" />
  </KeepAlive>
  <button @click="clickHandler">切换组件</button>
</template>
```

### v-if/v-else

```vue
<script setup lang="ts">
import { defineComponent, h, ref } from "vue";

// 组件A
const ComponnetA = defineComponent({
  setup(props, ctx) {
    return () => h("input");
  },
});
// 组件B
const ComponnetB = defineComponent({
  setup(props, ctx) {
    return () => h("input");
  },
});
const show = ref(false);

const clickHandler = () => {
  show.value = !show.value;
};
</script>

<template>
  <KeepAlive>
    <ComponnetA v-if="show" />
    <ComponnetB v-else />
  </KeepAlive>
  <button @click="clickHandler">切换组件</button>
</template>
```
