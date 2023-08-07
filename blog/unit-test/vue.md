# 测试 vue 组件

## vue2

### 安装依赖

```sh
npm i vue@2
```

```sh
npm i @vue/test-utils@1 @vue/vue2-jest -D
```

### 修改 jest.config.cjs

```js
module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    ".+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$":
      "jest-transform-stub",
    "^.+\\.vue$": "@vue/vue2-jest",
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
};
```

### 编写组件

HelloWorldVue.vue

```vue
<template>
  <div @click="changeMsg" class="wrap">
    {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello world",
    };
  },
  methods: {
    changeMsg() {
      this.msg = "hello viho";
    },
  },
};
</script>

<style scoped>
.wrap {
  color: red;
}
</style>
```

### 编写测试用例

HelloWorld.spec.js

```js
import { mount } from "@vue/test-utils";
import HelloWorld from "./HelloWorldVue.vue";

describe("HelloWorld", () => {
  test("component could be mount and unmounted without errors", () => {
    const wrapper = mount(HelloWorld);
    expect(() => wrapper.destroy()).not.toThrow();
  });
  test("param msg should work", () => {
    const wrapper = mount(HelloWorld, {
      propsData: {
        msg: "hello world",
      },
    });
    expect(wrapper.text()).toBe("hello world");
  });
  test("click event should work", async () => {
    const clickFn = jest.fn();
    const wrapper = mount(HelloWorld, {
      listeners: {
        click: clickFn,
      },
    });
    await wrapper.trigger("click");
    expect(clickFn).toBeCalledTimes(1);
  });
});
```

### 运行测试用例

```sh
npm run test
```

## vue3

### 安装依赖

```sh
npm i vue
```

```sh
npm i @vue/test-utils @vue/vue3-jest -D
```

### 修改 jest.config.cjs

```js
module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    ".+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$":
      "jest-transform-stub",
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
```

### 编写组件

HelloWorld.vue

```vue
<template>
  <div @click="clickHandler" class="wrap">
    {{ msg }}
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["click"]);

const clickHandler = () => {
  emit("click");
};
</script>

<style scoped>
.wrap {
  color: red;
}
</style>
```

### 编写测试用例

HelloWorld.spec.js

```js
import { mount } from "@vue/test-utils";
import HelloWorld from "./HelloWorldVue.vue";

describe("HelloWorld", () => {
  test("component could be mount and unmounted without errors", () => {
    const wrapper = mount(HelloWorld);
    expect(() => wrapper.unmount()).not.toThrow();
  });
  test("param msg should work", () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: "hello world",
      },
    });
    expect(wrapper.text()).toBe("hello world");
  });
  test("click event should work", async () => {
    const wrapper = mount(HelloWorld);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
```

### 运行测试用例

```sh
npm run test
```

## 已有脚手架

直接使用脚手架里封装好的单元测试即可，`@vue/cli` `create-vue` 里的单元测试封装就是按上述配置来实现的