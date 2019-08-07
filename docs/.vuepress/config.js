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
      "/" : {
        lastUpdated: '上次更新',
        label: "简体中文",
        selectText: "语言选择",
        sidebar: {
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
          ],
          "/contributing/": [],
          "/": [
            {
              title: "概览",
              collapsable: false,
              path: "/"
            }
          ]
        },
        nav: [
          { text: '概览', link: '/' },
          { text: '组件', link: '/components/basic/layout' },
          { text: '贡献代码', link: '/contributing/' }
        ]
      },

      // "/en/" :{
      //   lastUpdated: 'Last Updated',
      //   label: "English",
      //   selectText: "Languages",
      //   sidebar: {
      //     "/en/components/": [
      //       {
      //         title: "Basic",
      //         collapsable: false,
      //         children: [
      //           '/en/components/basic/layout',
      //           '/en/components/basic/container',
      //         ]
      //       },
      //       {
      //         title: "Form",
      //         collapsable: false,
      //         children: [
      //           '/en/components/form/radio',
      //         ]
      //       },
      //       {
      //         title: "Data",
      //         collapsable: false,
      //         children: [
      //           '/en/components/data/tag',
      //         ]
      //       },
      //       {
      //         title: "Notice",
      //         collapsable: false,
      //         children: [
      //           '/en/components/notice/loading',
      //         ]
      //       },
      //       {
      //         title: "Navigation",
      //         collapsable: false,
      //         children: [
      //           '/en/components/navigation/breadcrumb',
      //         ]
      //       },
      //       {
      //         title: "Others",
      //         collapsable: false,
      //         children: [
      //           '/en/components/others/divider',
      //         ]
      //       }
      //     ],
      //     "/en/contributing": [],
      //     "/en/": [
      //       {
      //         title: "Guide",
      //         collapsable: false,
      //         path: "/en/"
      //       }
      //     ]
      //   },
      //   nav: [
      //     { text: 'Guide', link: '/en/' },
      //     { text: 'Components', link: '/en/components/basic/layout' },
      //     { text: 'Contributing', link: '/en/contributing/' }
      //   ]
      // }
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