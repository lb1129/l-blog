# vscode 配置

## 安装扩展

[Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) 来结合项目的 [代码及提交检查](./code-lint) 在 IDE 内进行错误或警告提示

左侧扩展按钮（Ctrl+Shift+X）点击进入应用商店搜索上述扩展并安装

## 工具区设置

仅对当前项目生效的设置

### 配置文件保存自动格式化

settings.json

```json
{
  "files.eol": "\n",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 配置 Tode Tree

安装 [Tode Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) 扩展  

修改 settings.json 为

```json
{
  "files.eol": "\n",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "todo-tree.filtering.excludeGlobs": ["**/node_modules", "**/dist"],
  "todo-tree.general.tags": [
    "BUG",
    "FIXME",
    "TODO",
    "HACK",
    "XXX",
    "TAG",
    "DONE",
    "NOTE",
    "INFO"
  ],
  "todo-tree.highlights.customHighlight": {
    "BUG": {
      "icon": "bug",
      "foreground": "#F56C6C"
    },
    "FIXME": {
      "icon": "flame",
      "foreground": "#FF9800"
    },
    "TODO": {
      "icon": "checklist",
      "foreground": "#FFEB38"
    },
    "HACK": {
      "icon": "versions",
      "foreground": "#E040FB"
    },
    "XXX": {
      "icon": "unverified",
      "foreground": "#E91E63"
    },
    "TAG": {
      "icon": "tag",
      "foreground": "#409EFF"
    },
    "DONE": {
      "icon": "verified",
      "foreground": "#0dff00"
    },
    "NOTE": {
      "icon": "note",
      "foreground": "#67C23A"
    },
    "INFO": {
      "icon": "info",
      "foreground": "#909399"
    }
  }
}
```

## launch.json

调试服务配置，可使用 vscode 断点调试

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "针对 localhost 启动 Chrome",
      // 端口根据项目本地服务器实际端口进行修改
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```
