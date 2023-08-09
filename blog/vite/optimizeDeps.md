# 预构建

使用 `esbuild` 编译  
非 ES 模块 转换为 ES 模块  
具有许多内部模块的 ESM 依赖项转换为单个模块  
生成缓存  
在服务器已经启动后，如果遇到尚未在缓存中的新依赖项导入，则 Vite 将重新运行依赖项构建过程，并在需要时`重新加载页面`

## 强制预构建

```ts
import { defineConfig, loadEnv } from "vite";
import fs from "node:fs";

// NOTE mergeConfig 对于 defineConfig(() => ({})) 合并无效
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // 开发环境强制预构建 ant-design-vue 所有组件样式 避免懒加载时造成页面刷新
  const optimizeDepsAntdIncludes: string[] = [];
  if (mode === "development") {
    fs.readdirSync("node_modules/ant-design-vue/es").map((componentName) => {
      if (
        fs.existsSync(
          `node_modules/ant-design-vue/es/${componentName}/style/index.js`
        )
      )
        optimizeDepsAntdIncludes.push(
          `ant-design-vue/es/${componentName}/style`
        );
    });
  }
  return {
    base: env.VITE_PUBLIC_URL,
    // ...
    optimizeDeps: {
      include: optimizeDepsAntdIncludes,
    },
    // ...
  };
});
```
