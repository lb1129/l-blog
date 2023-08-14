# Github Actions

## GitHub Pages

### 创建目录

在项目根目录下创建如下目录

```
└─ .github
   └─ workflows
      └─ gh-pages.yml

```

### gh-pages.yml

```yml
name: Deployment
# 监听master分支push（或者其他分支，或具体的commit message）
on:
  push:
    branches:
      - master
# 任务
jobs:
  deployment:
    runs-on: ubuntu-latest
    permissions:
      # 配置写权限（或者去代码仓库的Settings -> Actions 配置）
      contents: write
      packages: write
    steps:
      - uses: actions/checkout@v3
      # 安装nodejs
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "16.x"
      # 安装项目依赖（yarn pnpm）
      - name: Install dependencies
        run: npm install
      # 打包（根据项目打包命令来）
      - name: Build
        run: npm run github-pages
      # 发布
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # 打包输出的目录
          publish_dir: dist
```
