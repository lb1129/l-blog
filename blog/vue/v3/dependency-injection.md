# 依赖注入

任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖

## Provide

应用层提供服务（非响应式数据，响应式数据）

```ts
import { createApp, ref } from "vue";

const app = createApp({});

const message = ref("hello");

app.provide("hi", "hi");
app.provide("message", message);
```

上层组件提供服务（非响应式数据，响应式数据）

```vue
<script setup lang="ts">
import { provide, ref, readonly } from "vue";

const username = ref("");
const nickname = ref("");

const updateNickname = () => {
  nickname.value = "viho";
};

// 非响应式数据
provide("message", "hello");
// 响应式数据
provide("username", readonly(username));
// 响应式数据的变更由服务提供方提供变更方法
provide("nickname", {
  nickname: readonly(nickname),
  updateNickname,
});
</script>
```

## Inject

下层组件使用服务

```vue
<script setup lang="ts">
import { inject, type Ref, ref } from "vue";

const message = inject("message");
const username = inject("username");
const { nickname, updateNickname } = inject<{
  nickname: Readonly<Ref<string>>;
  updateNickname: () => void;
}>(
  "nickname",
  () => ({
    nickname: ref(""),
    updateNickname() {},
  }),
  true
);
</script>

<template>
  <span>{{ username }}</span>
  <button @click="updateNickname">{{ nickname }}</button>
</template>
```
