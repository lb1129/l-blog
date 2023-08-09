import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Viho Lei",
  description: "个人博客",
  lang: "zh-CN",
  base: "/l-blog",
  lastUpdated: true,
  cleanUrls: true,

  sitemap: {
    hostname: "https://www.leibo.group",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    },
  },

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/l-blog/favicon.ico",
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      {
        text: "博客",
        link: "/blog/vue/v3/change-detection",
        activeMatch: "/blog/",
      },
      {
        text: '个人项目',
        items: [
          { text: 'l-admin-vue', link: 'https://www.leibo.group/l-admin-vue/' },
          { text: 'l-admin-react', link: 'https://www.leibo.group/l-admin-react/' },
          { text: 'l-admin-angular', link: 'https://www.leibo.group/l-admin-angular/' },
          { text: 'l-uni', link: 'https://www.leibo.group/l-uni/' },
          { text: 'l-project', link: 'https://github.com/lb1129/l-project' },
          { text: 'l-project-vue', link: 'https://github.com/lb1129/l-project-vue' },
          { text: 'l-project-react', link: 'https://github.com/lb1129/l-project-react' },
          { text: 'l-blog', link: 'https://github.com/lb1129/l-blog' }
        ]
      }
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/lb1129" }],

    sidebar: [
      {
        text: "vue",
        collapsed: false,
        items: [
          {
            text: "v3",
            collapsed: true,
            items: [
              { text: "变更检查机制", link: "/blog/vue/v3/change-detection" },
              { text: "依赖注入", link: "/blog/vue/v3/dependency-injection" },
              { text: "前端储存", link: "/blog/vue/v3/storage" },
              { text: "http 请求", link: "/blog/vue/v3/http" },
              { text: "国际化", link: "/blog/vue/v3/internationalization" },
              { text: "jsx", link: "/blog/vue/v3/jsx" },
              { text: "keep-alive", link: "/blog/vue/v3/keep-alive" },
              { text: "路由", link: "/blog/vue/v3/router" },
              { text: "数据仓库", link: "/blog/vue/v3/store" },
              { text: "不限层级树", link: "/blog/vue/v3/multi-level-tree" },
            ],
          },
        ],
      },
      {
        text: "react",
        collapsed: false,
        items: [
          {
            text: "v18",
            collapsed: true,
            items: [
              {
                text: "变更检查机制",
                link: "/blog/react/v18/change-detection",
              },
              {
                text: "依赖注入",
                link: "/blog/react/v18/dependency-injection",
              },
              { text: "http 请求", link: "/blog/react/v18/http" },
              { text: "国际化", link: "/blog/react/v18/internationalization" },
              { text: "keep-alive", link: "/blog/react/v18/keep-alive" },
              { text: "路由", link: "/blog/react/v18/router" },
              { text: "数据仓库", link: "/blog/react/v18/store" },
              { text: "不限层级树", link: "/blog/react/v18/multi-level-tree" },
            ],
          },
        ],
      },
      {
        text: "angular",
        collapsed: false,
        items: [
          {
            text: "v16",
            collapsed: true,
            items: [
              {
                text: "变更检查机制",
                link: "/blog/angular/v16/change-detection",
              },
              {
                text: "依赖注入",
                link: "/blog/angular/v16/dependency-injection",
              },
              { text: "http 请求", link: "/blog/angular/v16/http" },
              {
                text: "国际化",
                link: "/blog/angular/v16/internationalization",
              },
              { text: "keep-alive", link: "/blog/angular/v16/keep-alive" },
              { text: "路由", link: "/blog/angular/v16/router" },
              { text: "数据仓库", link: "/blog/angular/v16/store" },
              {
                text: "不限层级树",
                link: "/blog/angular/v16/multi-level-tree",
              },
            ],
          },
        ],
      },
      {
        text: "uni-app",
        collapsed: false,
        items: [
          { text: "本地储存", link: "/blog/uni-app/storage" },
          { text: "数据仓库", link: "/blog/uni-app/store" },
          { text: "主题色", link: "/blog/uni-app/theme" },
          { text: "国际化", link: "/blog/uni-app/internationalization" },
          { text: "拦截器", link: "/blog/uni-app/interceptor" },
          { text: "wgt 热更新", link: "/blog/uni-app/wgt-update" },
        ],
      },
      {
        text: "uni-clound",
        collapsed: false,
        items: [
          { text: "公共模块", link: "/blog/uni-clound/common-module" },
          { text: "单入口 url 化", link: "/blog/uni-clound/urlization" },
          { text: "附件上传", link: "/blog/uni-clound/file-upload" },
          { text: "备注", link: "/blog/uni-clound/notes" },
        ],
      },
      {
        text: "theme",
        collapsed: false,
        items: [
          { text: "css 变量", link: "/blog/theme/css-variables" },
          { text: "动态 style", link: "/blog/theme/dynamic-style" },
          { text: "css-in-js", link: "/blog/theme/css-in-js" },
        ],
      },
      {
        text: "common",
        collapsed: false,
        items: [{ text: "订阅发布", link: "/blog/common/pubsub" }],
      },
      {
        text: "unit-test",
        collapsed: false,
        items: [
          { text: "前端单元测试", link: "/blog/unit-test/frontend" },
          { text: "结合 Typescript", link: "/blog/unit-test/typescript" },
          { text: "vue 测试", link: "/blog/unit-test/vue" },
          { text: "react 测试", link: "/blog/unit-test/react" },
          { text: "angular 测试", link: "/blog/unit-test/angular" },
        ],
      },
      {
        text: "webpack",
        collapsed: false,
        items: [
          {
            text: "v5",
            items: [
              { text: "搭建单入口脚手架", link: "/blog/webpack/v5/scaffold.md" }
            ],
          },
          {
            text: '优化打包速度',
            link: '/blog/webpack/optimization.md'
          }
        ],
      },
      {
        text: "ci-cd",
        collapsed: false,
        items: [
          { text: "代码及提交检查", link: "/blog/ci-cd/code-lint" },
          { text: "vscode 配置", link: "/blog/ci-cd/vscode-config" },
          { text: "gh-pages", link: "/blog/ci-cd/gh-pages" },
        ],
      },
      {
        text: "typescript",
        collapsed: false,
        items: [{ text: "tsconfig", link: "/blog/typescript/tsconfig" }],
      },
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    editLink: {
      pattern: "https://github.com/lb1129/l-blog/edit/master/:path",
      text: "在 GitHub 上编辑此页",
    },

    lastUpdated: {
      text: "上次更新",
    },

    outlineTitle: "本页目录",

    darkModeSwitchLabel: "主题模式",

    sidebarMenuLabel: "菜单",

    returnToTopLabel: "返回顶部",

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    footer: {
      copyright: "Copyright © 2023 Viho Lei",
    },
  },
});
