import { defineConfig } from "vitepress";

export default defineConfig({
  title: `Docs`,
  description: "前端笔记文档",
  base: "/docs/",

  head: [
    // 网站图标
    ["link", { rel: "icon", type: "image/svg+xml", href: "logo.svg" }]
    // ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  ],
  appearance: true, // 默认 true，设为 false 则无法切换dark/light主题，可选 'dark' true false
  markdown: {
    lineNumbers: false // 是否显示行数，默认false
  },
  themeConfig: {
    logo: "/logo.svg",

    editLink: {
      pattern: "https://github.com/liulihao88/docs/tree/master/docs/:path",
      text: "Suggest changes to this page"
    },
    // 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
    socialLinks: [
      { icon: "github", link: "https://github.com/liulihao88/docs" },
      // 自定义icon
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
        },
        link: "https://www.npmjs.com/package/docs"
      }
    ],

    // search: { // vitepress 内置 search
    //   provider: 'local'
    // },

    algolia: {
      // algolia 搜索服务 与 内置 search 可二选一
      appId: "LPTNA0E8HM",
      apiKey: "8f1b68dfab6b0320adef728a1c3a77cc",
      indexName: "liulihao88_front-end"
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present The Muse Catcher"
    },

    nav: [
      { text: "技术点1", link: "/technology/note-1", activeMatch: "/technology/" },
      { text: "面试题1", link: "/interview/note-1", activeMatch: "/interview/" },
      {
        text: "links",
        items: [
          { text: "Github", link: "https://github.com/liulihao88" },
          {
            items: [
              {
                text: "技术点",
                link: "https://v2.cn.vuejs.org/v2/guide/"
              },
              {
                text: "面试题",
                link: "https://cn.vuejs.org/guide/introduction.html"
              },
              {
                text: "TypeScript Docs",
                link: "https://www.tslang.cn/docs/home.html"
              },
              {
                text: "MDN Web Docs",
                link: "https://developer.mozilla.org/zh-CN/"
              }
            ]
          },
          {
            items: [
              {
                text: "npm",
                link: "https://www.npmjs.com/"
              },
              {
                text: "vite",
                link: "https://cn.vitejs.dev/"
              },
              {
                text: "markdown",
                link: "https://markdown.com.cn/"
              },
              {
                text: "vitepress",
                link: "https://vitepress.dev/"
              }
            ]
          }
        ]
      }
    ],

    sidebar: {
      "/technology/": [
        {
          text: "指引",
          items: [
            {
              text: "开始",
              link: "/technology/started"
            }
          ]
        },
        {
          text: "技术点",
          items: [
            {
              text: "note-1",
              link: "/technology/note-1"
            },
            {
              text: "note-2",
              link: "/technology/note-2"
            }
          ]
        }
      ],
      "/interview/": [
        {
          text: "指引",
          items: [
            {
              text: "开始",
              link: "/interview/started"
            }
          ]
        },
        {
          text: "面试题",
          items: [
            {
              text: "note-1",
              link: "/interview/note-1"
            },
            {
              text: "note-2",
              link: "/interview/note-2"
            }
          ]
        }
      ]
    }
  }
});
