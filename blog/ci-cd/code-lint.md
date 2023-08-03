# 代码及提交检查

在多人协作的项目中，由于开发人员的个人习惯，在项目中会充斥着各式各样的代码风格，代码写法，使项目迭代维护变得举步维艰；即使是单人项目，也会存在上面的问题。

口头约定或在开发文档内约定，这依然是无力的，应该交由工具来管控

## 代码校验

使用 `eslint` 对 `.js`, `.jsx` 实现代码校验，并结合 `prettier` 实现代码风格校验

### 安装依赖

```sh
npm i eslint eslint-config-prettier eslint-plugin-prettier prettier -D
```

### 创建.prettierrc.json

```json
{
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}
```

### 创建.eslintrc.cjs

```js
module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "warn",
    // 添加或禁用规则
    // ...
  },
  overrides: [
    {
      // node 环境
      files: ["*.cjs"],
      env: {
        node: true,
      },
    },
    {
      // jest 环境
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
```

### 对 .ts .tsx 校验

安装依赖

```sh
npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

将 `.eslintrc.cjs` 修改为

```js
module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "warn",
    // 添加或禁用规则
    // ...
  },
  overrides: [
    {
      // node 环境
      files: ["*.cjs"],
      env: {
        node: true,
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      // jest 环境
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
```

### 对 .vue .ts .tsx 校验

安装依赖

```sh
npm i eslint-plugin-vue @vue/eslint-config-typescript -D
```

将 `.eslintrc.cjs` 修改为

```js
module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    // 'plugin:vue/vue3-essential', 可选 vue3
    "plugin:vue/essential",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "warn",
    // 添加或禁用规则
    // ...
  },
  overrides: [
    {
      // node 环境
      files: ["*.cjs"],
      env: {
        node: true,
      },
    },
    {
      // jest 环境
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
```

## 样式校验

使用 `stylelint` 对 .css 实现样式校验，并结合 `prettier` 实现样式风格校验

### 安装依赖

```sh
npm i stylelint stylelint-config-standard stylelint-prettier -D
```

### 创建.stylelintrc.json

```json
{
  "plugins": ["stylelint-prettier"],
  "extends": ["stylelint-config-standard"],
  "rules": {
    "prettier/prettier": true,
    "no-empty-source": null,
    "no-descending-specificity": null
  }
}
```

### 对 .less 校验

安装依赖

```sh
npm i postcss-less -D
```

修改 `.stylelintrc.json`

```json
{
  "plugins": ["stylelint-prettier"],
  "extends": ["stylelint-config-standard"],
  "overrides": [
    {
      "files": ["*.less", "**/*.less"],
      "customSyntax": "postcss-less"
    }
  ],
  "rules": {
    "prettier/prettier": true,
    "no-empty-source": null,
    "no-descending-specificity": null
  }
}
```

### 对 .vue .less 校验

安装依赖

```sh
npm i stylelint-config-html -D
```

将 `.eslintrc.cjs` 修改为

```json
{
  "plugins": ["stylelint-prettier"],
  "extends": ["stylelint-config-standard"],
  "overrides": [
    {
      "files": ["*.vue", "**/*.vue"],
      "extends": ["stylelint-config-html"]
    },
    {
      "files": ["*.less", "**/*.less"],
      "customSyntax": "postcss-less"
    }
  ],
  "rules": {
    "prettier/prettier": true,
    "no-empty-source": null,
    "no-descending-specificity": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["deep", "global"]
      }
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        "ignorePseudoElements": ["v-deep", "v-global", "v-slotted"]
      }
    ]
  }
}
```

### 其他样式预处理校验

`.scss` `.sass` 使用 `stylelint-config-standard-scss` 扩展

`vue` SFC 内使用 `scss` `sass` 使用 `stylelint-config-standard-vue` 扩展

此外可前往 [awesome stylelint](https://github.com/stylelint/awesome-stylelint#readme) 找寻其他样式预处理校验工具

## 提交检查

### lint-staged

只针对本次 git 提交的文件进行检查

#### 安装依赖

```sh
npm i lint-staged -D
```

#### 配置

package.json

```json
// 下述文件后缀规则根据实际项目进行删减
{
  "lint-staged": {
    "*.{js,jsx,cjs,mjs,ts,tsx,cts,mts,vue}": "eslint --fix",
    "*.{css,less,vue}": "stylelint --fix",
    "*.{md,json}": "prettier --write"
  }
}
```

### commitlint

对 commit message 进行格式校验 [commit message 规范文档](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

#### 安装依赖

```sh
npm i @commitlint/cli @commitlint/config-conventional -D
```

#### 创建 commitlint.config.cjs

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

### husky

添加 git 钩子

#### 安装依赖

```sh
npm i husky -D
```

### 创建 .husky 目录

```sh
npx husky install
```

#### 添加 pre-commit 钩子

```sh
npx husky add .husky/pre-commit 'npx lint-staged'
```

#### 添加 commit-msg 钩子

```sh
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

## 目录结构

```
├─ .husky
│  ├─ commit-msg
│  └─ pre-commit
├─ .eslintrc.cjs
├─ .prettierrc.json
├─ .stylelintrc.json
├─ commitlint.config.cjs
└─ package.json
```

## 添加 script

package.json

```json
// 下述文件后缀规则根据实际项目进行删减
{
  "scripts": {
    // ...
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "lint:style": "stylelint \"**/*.{css,less,vue}\" --fix --ignore-path .gitignore",
    "format": "prettier --write . --ignore-path .gitignore"
  }
}
```

## 结合脚手架

`@vue/cli` `create-vue` `create-react-app` `@angular/cli` 等脚手架在创建项目时可选择是否使用 `eslint`，像 `@vue/cli` `create-vue` 还可选择是否使用 `prettier`

项目已有的 `eslint` `prettier` 配置 一般在 根目录 或 package.json 中

如果项目内已有 `eslint` 配置，但是没有 `prettier` 配置，可查看上方步骤从 `eslint` 结合 `prettier` 开始进行后续所有配置

如果项目内已有 `eslint` `prettier` 配置，可查看上方步骤从 `stylelint` 结合 `prettier` 开始进行后续所有配置

如果项目内没有 `eslint`，有些脚手架有添加功能，比如：

@vue/cli

```sh
npx @vue/cli add eslint
```

@angular/cli

```sh
ng add @angular-eslint/schematics
```

或者 查看上方步骤从 [代码校验](#代码校验) 开始进行后续所有配置
