# jsx

## 开启 jsx 支持

安装 @vitejs/plugin-vue

配置 vite.config.ts

```ts
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    // ...
    vueJsx(),
    // ...
  ],
});
```

## 使用

### 定义 HelloWorld.tsx 组件

```tsx
import { defineComponent, useSlots } from "vue";

export default defineComponent({
  props: {
    className: String,
  },
  emits: ["click"],
  setup(props, context) {
    const slots = useSlots();

    return () => (
      <div
        class={props.className}
        onClick={() => {
          context.emit("click", "clicked");
        }}
      >
        {slots.default ? slots.default() : null}
        {slots.scope ? slots.scope({ text: "your scope slot" }) : null}
      </div>
    );
  },
});
```

### 使用 HelloWorld.tsx 组件

```vue
<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.tsx";

const clickHandler = (msg: string) => {
  console.log(msg);
};
</script>

<template>
  <HelloWorld @click="clickHandler" className="className">
    <template #default>
      <button>xxx</button>
    </template>
    <template #scope="props">
      <button>{{ props.text }}</button>
    </template>
  </HelloWorld>
</template>
```
