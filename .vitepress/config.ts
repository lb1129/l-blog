import { defineConfig } from "vitepress";

export default defineConfig({
  title: "l-blog",
  description: "blog",
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
        href: "https://mp-d2e0b969-5400-4832-adeb-d0127579976e.cdn.bspapp.com/favicon.ico",
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "博客", link: "/blog/api-examples", activeMatch: "/blog/" },
    ],

    sidebar: [
      {
        text: "示例",
        collapsed: false,
        items: [
          { text: "Runtime API Examples", link: "/blog/api-examples" },
          { text: "Markdown Examples", link: "/blog/markdown-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/lb1129/l-blog" }],

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
      pattern: "https://github.com/lb1129/l-blog/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      copyright: "Copyright © 2023 Viho Lei",
    },
  },
});
