module.exports = {
  title: 'Element UI Source Guide',
  description: "Guide docs for element ui source code",
  base: "/",
  dest: "dist",
  markdown: {
    lineNumbers: true,
    // slugify: function(s) {
    //   return String(s).trim().toLowerCase().replace(/[\s\(\)\[\]]/g, "").replace(/\#\w+/, "");
    // }
  },
  themeConfig: {
    // displayAllHeaders: true,
    sidebarDepth: 2,
    locales: {
      "/en/" :{
        lastUpdated: 'Last Updated',
        sidebar: {
          "/en/guide": [
            {
              title: "Guide",
              collapsable: false,
              path: "/en/guide/"
            }
          ],
          "/en/components/": [
            {
              title: "Basic",
              collapsable: false,
              children: [
                '/en/components/basic/layout',
                '/en/components/basic/container',
              ]
            },
            {
              title: "Form",
              collapsable: false,
              children: [
                '/en/components/form/radio',
              ]
            },
            {
              title: "Data",
              collapsable: false,
              children: [
                '/en/components/data/tag',
              ]
            },
            {
              title: "Notice",
              collapsable: false,
              children: [
                '/en/components/notice/loading',
              ]
            },
            {
              title: "Navigation",
              collapsable: false,
              children: [
                '/en/components/navigation/breadcrumb',
              ]
            },
            {
              title: "Others",
              collapsable: false,
              children: [
                '/en/components/others/divider',
              ]
            }
          ]
        },
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Components', link: '/en/components/basic/layout' },
          { text: 'Contributing', link: '/en/contributing/' }
        ]
      },
      "/" : {
        lastUpdated: '上次更新',
        sidebar: {
          "/guide": [
            {
              title: "Guide",
              collapsable: false,
              path: "/guide/"
            }
          ],
          "/components/": [
            {
              title: "Basic",
              collapsable: false,
              path: "/components/",
              children: [
                '/components/basic/layout',
                '/components/basic/container',
              ]
            },
            {
              title: "Form",
              collapsable: false,
              path: "/components/",
              children: [
                '/components/form/radio',
              ]
            },
            {
              title: "Data",
              collapsable: false,
              children: [
                '/components/data/tag',
              ]
            },
            {
              title: "Notice",
              collapsable: false,
              children: [
                '/components/notice/loading',
              ]
            },
            {
              title: "Navigation",
              collapsable: false,
              children: [
                '/components/navigation/breadcrumb',
              ]
            },
            {
              title: "Others",
              collapsable: false,
              children: [
                '/components/others/divider',
              ]
            }
          ]
        },
        nav: [
          { text: '首页', link: '/' },
          { text: '概览', link: '/guide/' },
          { text: '组件', link: '/components/basic/layout' },
          { text: '贡献代码', link: '/contributing/' }
        ]
      }
    }
  },
  locales: {
    // '/en/': {
    //   lang: 'en-US',
    //   title: 'Element UI Source Guide',
    //   description: 'Guide docs for element ui source code'
    // },
    '/': {
      lang: 'zh-CN',
      title: 'Element源码分析',
      description: 'ElementUI源码阅读指南'
    }
  }
}