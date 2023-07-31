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
      { text: "博客", link: "/blog/api-examples", activeMatch: "/blog/" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/lb1129" }],

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
      text: '上次更新'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    footer: {
      copyright: "Copyright © 2023 Viho Lei",
    },
  },
});
