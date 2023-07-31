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
        link: "/blog/vue/change-detection",
        activeMatch: "/blog/",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/lb1129" }],

    sidebar: [
      {
        text: "vue",
        collapsed: false,
        items: [
          { text: "变更检查机制", link: "/blog/vue/change-detection" },
          { text: "依赖注入", link: "/blog/vue/dependency-injection" },
          { text: "http请求", link: "/blog/vue/http" },
          { text: "国际化", link: "/blog/vue/internationalization" },
          { text: "jsx", link: "/blog/vue/jsx" },
          { text: "keep-alive", link: "/blog/vue/keep-alive" },
          { text: "路由", link: "/blog/vue/router" },
          { text: "数据仓库", link: "/blog/vue/store" },
          { text: "模板语法", link: "/blog/vue/template" },
        ],
      },
      {
        text: "react",
        collapsed: false,
        items: [
          { text: "变更检查机制", link: "/blog/react/change-detection" },
          { text: "依赖注入", link: "/blog/react/dependency-injection" },
          { text: "http请求", link: "/blog/react/http" },
          { text: "国际化", link: "/blog/react/internationalization" },
          { text: "jsx", link: "/blog/react/jsx" },
          { text: "keep-alive", link: "/blog/react/keep-alive" },
          { text: "路由", link: "/blog/react/router" },
          { text: "数据仓库", link: "/blog/react/store" },
        ],
      },
      {
        text: "angular",
        collapsed: false,
        items: [
          { text: "变更检查机制", link: "/blog/angular/change-detection" },
          { text: "依赖注入", link: "/blog/angular/dependency-injection" },
          { text: "http请求", link: "/blog/angular/http" },
          { text: "国际化", link: "/blog/angular/internationalization" },
          { text: "keep-alive", link: "/blog/angular/keep-alive" },
          { text: "路由", link: "/blog/angular/router" },
          { text: "数据仓库", link: "/blog/angular/store" },
          { text: "模板语法", link: "/blog/angular/template" },
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
          { text: "loader", link: "/blog/webpack/loader" },
          { text: "plugin", link: "/blog/webpack/plugin" },
          { text: "env", link: "/blog/webpack/env" },
          { text: "dev-server", link: "/blog/webpack/dev-server" },
        ],
      },
      {
        text: "ci-cd",
        collapsed: false,
        items: [
          { text: "代码检查校验", link: "/blog/ci-cd/code-lint" },
          { text: "gh-pages", link: "/blog/ci-cd/gh-pages" },
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

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    footer: {
      copyright: "Copyright © 2023 Viho Lei",
    },
  },
});
