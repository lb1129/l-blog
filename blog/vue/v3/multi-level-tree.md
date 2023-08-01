# 不限层级树

## 模板递归

### Tree.vue

```vue
<template>
  <ul>
    <li v-for="item in source" :key="item.id">
      <div>{{ item.name }}</div>
      <template v-if="item.children && item.children.length">
        <Tree :source="item.children" />
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Item {
  id: string;
  name: string;
  children?: Item[];
}

defineProps<{
  source: Item[];
}>();
</script>

<style scoped></style>
```

### 使用 Tree.vue

```vue
<script setup lang="ts">
import { reactive } from "vue";
import Tree from "@/components/Tree.vue";

const source = reactive([
  {
    id: "1",
    name: "1",
    children: [
      { id: "1-1", name: "1-1" },
      { id: "1-2", name: "1-2", children: [{ id: "1-2-1", name: "1-2-1" }] },
      { id: "1-3", name: "1-3" },
    ],
  },
  { id: "2", name: "2", children: [{ id: "2-1", name: "2-1" }] },
]);
</script>

<template>
  <Tree :source="source" />
</template>
```

## jsx 递归

### Tree.tsx

```tsx
import { defineComponent } from "vue";
import type { PropType } from "vue";

interface Item {
  id: string;
  name: string;
  children?: Item[];
}

export default defineComponent({
  props: {
    source: Array as PropType<Item[]>,
  },
  setup(props, ctx) {
    const loop = (list: Item[]) => (
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
            {item.children && item.children.length ? loop(item.children) : null}
          </li>
        ))}
      </ul>
    );

    return () => (props.source ? loop(props.source) : null);
  },
});
```

### 使用 Tree.tsx

```vue
<script setup lang="ts">
import { reactive } from "vue";
import Tree from "@/components/Tree.tsx";

const source = reactive([
  {
    id: "1",
    name: "1",
    children: [
      { id: "1-1", name: "1-1" },
      { id: "1-2", name: "1-2", children: [{ id: "1-2-1", name: "1-2-1" }] },
      { id: "1-3", name: "1-3" },
    ],
  },
  { id: "2", name: "2", children: [{ id: "2-1", name: "2-1" }] },
]);
</script>

<template>
  <Tree :source="source" />
</template>
```
