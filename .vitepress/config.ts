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
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/lb1129" }],

    sidebar: [
      {
        text: "vue",
        collapsed: false,
        items: [
          {
            text: "v3",
            collapsed: false,
            items: [
              { text: "变更检查机制", link: "/blog/vue/v3/change-detection" },
              { text: "依赖注入", link: "/blog/vue/v3/dependency-injection" },
              { text: "前端储存", link: "/blog/vue/v3/storage" },
              { text: "http请求", link: "/blog/vue/v3/http" },
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
            collapsed: false,
            items: [
              {
                text: "变更检查机制",
                link: "/blog/react/v18/change-detection",
              },
              {
                text: "依赖注入",
                link: "/blog/react/v18/dependency-injection",
              },
              { text: "http请求", link: "/blog/react/v18/http" },
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
            collapsed: false,
            items: [
              {
                text: "变更检查机制",
                link: "/blog/angular/v16/change-detection",
              },
              {
                text: "依赖注入",
                link: "/blog/angular/v16/dependency-injection",
              },
              { text: "http请求", link: "/blog/angular/v16/http" },
              {
                text: "国际化",
                link: "/blog/angular/v16/internationalization",
              },
              { text: "keep-alive", link: "/blog/angular/v16/keep-alive" },
              { text: "路由", link: "/blog/angular/v16/router" },
              { text: "数据仓库", link: "/blog/angular/v16/store" },
              { text: "多级树", link: "/blog/angular/v16/multi-level-tree" },
            ],
          },
        ],
      },
      {
        text: "uni-app",
        collapsed: false,
        items: [
          { text: "国际化", link: "/blog/uni-app/internationalization" },
          { text: "数据仓库", link: "/blog/uni-app/store" },
          { text: "主题色", link: "/blog/uni-app/theme" },
        ],
      },
      {
        text: "uni-clound",
        collapsed: false,
        items: [{ text: "url化", link: "/blog/uni-clound/urlization" }],
      },
      {
        text: "webpack",
        collapsed: false,
        items: [
          {
            text: "v5",
            items: [
              { text: "loader", link: "/blog/webpack/v5/loader" },
              { text: "plugin", link: "/blog/webpack/v5/plugin" },
              { text: "env", link: "/blog/webpack/v5/env" },
              { text: "dev-server", link: "/blog/webpack/v5/dev-server" },
            ],
          },
        ],
      },
      {
        text: "typescript",
        collapsed: false,
        items: [
          { text: "类型注解", link: "/blog/typescript/annotation" },
          { text: "类型断言", link: "/blog/typescript/assertion" },
          { text: "tsconfig", link: "/blog/typescript/tsconfig" },
        ],
      },
      {
        text: "ci-cd",
        collapsed: false,
        items: [
          { text: "代码及提交检查", link: "/blog/ci-cd/code-lint" },
          { text: "vscode配置", link: "/blog/ci-cd/vscode-config" },
          { text: "gh-pages", link: "/blog/ci-cd/gh-pages" },
        ],
      },
      {
        text: "theme",
        collapsed: false,
        items: [
          { text: "css变量", link: "/blog/theme/css-variable" },
          { text: "动态style", link: "/blog/theme/dynamic-style" },
        ],
      },
      {
        text: "common",
        collapsed: false,
        items: [{ text: "订阅发布", link: "/blog/common/pubsub" }],
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
