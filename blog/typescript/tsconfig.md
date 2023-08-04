# tsconfig

常用选项说明 [文档](https://www.typescriptlang.org/tsconfig)

```json
{
  // 方案1： 使用 tsc 进行类型检查及编译
  // 方案2：结合 webpack 使用 ts-loader 进行类型检查及编译
  // 方案3：结合 webpack 使用 ts-loader 进行编译 使用 fork-ts-checker-webpack-plugin 插件进行类型校验
  // 方案4：结合 webpack 使用 babel-loader 进行编译 使用 fork-ts-checker-webpack-plugin 插件进行类型校验
  // 编译选项
  "compilerOptions": {
    // 编译输出的ECMAScript版本（后续交给 babel-loader 结合 babel配置 及 browserslist 继续编译）
    "target": "ESNext",
    // 编译过程中需要引入的库文件的列表
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    // 指定生成哪个模块系统代码 "None"， "CommonJS"， "AMD"， "System"， "UMD" "ES"
    "module": "ESNext",
    // 模块解析策略
    "moduleResolution": "Node",
    // 解析非相对模块名的基准目录 根目录
    "baseUrl": ".",
    // 模块名到基于 baseUrl 的路径映射的列表（类似webpack resolve alias，项目中不被此文件包含的 ts js 模块 或 样式模块 内使用了 路径映射 则同时需要配置webpack resolve alias）
    "paths": {
      "@/*": ["./src/*"],
      "~/*": ["./node_modules/*"]
    },
    // 解析json模块
    "resolveJsonModule": true,
    // 将每个文件作为单独的模块
    "isolatedModules": true,
    // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查
    "allowSyntheticDefaultImports": true,
    // fix treats CommonJS/AMD/UMD modules problems
    "esModuleInterop": true,
    // 禁止对同一个文件的不一致的引用
    "forceConsistentCasingInFileNames": true,
    // 启用所有严格类型检查
    "strict": true,
    // 报告switch语句的fallthrough错误
    "noFallthroughCasesInSwitch": true,
    // 忽略所有的声明文件（ *.d.ts）的类型检查
    "skipLibCheck": true,
    // 不生成输出文件（如果用 方案4 则需开启该选项）
    // "noEmit": true,
    // .tsx中jsx处理方式
    // 在preserve模式下生成代码中会保留JSX以供后续的转换操作使用，如babel（除react外，其他应该选择preserve模式，如vue项目中在.tsx中使用jsx）
    // react模式会生成React.createElement，在使用前不需要再进行转换操作了
    "jsx": "react-jsx" // preserve
  },
  // 编译及类型检查 包含的目录和文件
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  // 编译及类型检查 排除的目录和文件
  "exclude": ["node_modules"]
}
```
