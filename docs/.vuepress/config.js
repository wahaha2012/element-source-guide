module.exports = {
  title: 'Element UI Source Guide',
  description: "Guide docs for element ui source code",
  base: "/",
  dest: "dist",
  markdown: {
    lineNumbers: true,
    slugify: function(s) {
      return String(s).trim().toLowerCase().replace(/[\s\(\)\[\]]/g, "").replace(/\#\w+/, "");
    }
  },
  themeConfig: {
    lastUpdated: 'Last Updated',
    // displayAllHeaders: true,
    sidebar: [
      {
        title: "Guide",
        collapsable: false,
        path: "/guide/"
      },
      {
        title: "Components",
        collapsable: false,
        children: [
          '/components/basic/layout',
          // '/components/form/radio',
          // '/components/data/table',
          // '/components/notice/alert',
          // '/components/navigation/nav-menu',
          // '/components/others/dialog',
        ]
      }
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/basic/layout' },
      { text: 'Contributing', link: '/contributing/' }
    ]
  }
}