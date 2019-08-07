# 概览
[[toc]]

## 简介
本文所有章节代码基于`Element(v2.10.1)`版本

## 目录结构
```bash
.
|──.github  #github issues相关说明及配置
|──build  #打包发布相关配置脚本
|──examples #Element官方网站模板
|──packages #Element组件源码
|──src  #Element Common源码
|──test #单元测试及测试用例集
|──types  #TypeScript类型声明
|──.babelrc #Babel配置
|──.eslintignore  #eslint检查需要忽略的文件配置
|──.eslintrc  #eslint代码检查配置文件
|──.gitattributes #目录Git属性配置
|──.gitignore #Git需要忽略的目录配置
|──.travis.yml  #Travis CI配置
|──CHANGELOG.en-US.md #更新日志英文版
|──CHANGELOG.es.md  #更新日志西班牙语版，实际未翻译
|──CHANGELOG.fr-FR.md #更新日志法语版，实际未翻译
|──CHANGELOG.zh-CN.md #更新日志简体中文版
|──components.json  #组件列表，JSON数据
|──element_logo.svg #Element Logo
|──FAQ.md #常见问题
|──LICENSE  #MIT License协议
|──Makefile #Makefile 程序执行集
|──package.json #NPM配置文件
|──README.md  #项目说明文档
└──yarn.lock  #yarn版本锁定文件
```

### .github
目录结构
```bash
.
|____CONTRIBUTING.en-US.md #贡献代码说明英文版
|____stale.yml  #自动关闭issues设置
|____PULL_REQUEST_TEMPLATE.md #Pull Request模板设置
|____CONTRIBUTING.es.md #贡献代码说明西班牙语版
|____ISSUE_TEMPLATE.md  #issues模板说明
|____CONTRIBUTING.zh-CN.md  #贡献代码说明简体中文版
|____CONTRIBUTING.fr-FR.md #贡献代码说明法语版
```

### build
目录结构
```bash
.
|____webpack.test.js
|____bin  #打包脚本集
| |____gen-cssfile.js #打包theme文件
| |____build-locale.js  #把es6 lang文件转换成umd
| |____build-entry.js #创建src/index.js
| |____new-lang.js  #添加新的语言文件及设置
| |____version.js #创建版本文件
| |____iconInit.js  #初始化Icon
| |____gen-indices.js #创建不同语言的suggestion
| |____new.js #创建和配置新组建
| |____i18n.js  #i18n设置
| |____template.js  #按照template更新examples
|____git-release.sh #版本发布前检查
|____webpack.conf.js
|____gen-single-config.js
|____config.js  #build base config
|____webpack.component.js #webpack config for element components
|____deploy-ci.sh
|____release.sh #发布版本
|____webpack.demo.js  #webpack config for dev site
|____webpack.common.js #common config for webpack
|____deploy-faas.sh
|____md-loader  #.md file webpack loader
| |____fence.js
| |____containers.js
| |____util.js
| |____index.js
| |____config.js
```

### examples
```bash
examples/
├── app.vue #首页模板
├── assets  #图片，字体，公共样式
├── bus.js  #Vue Instance for EventBus
├── color.js  #颜色处理
├── components  #页面组件
├── demo-styles #Demo样式
├── docs  #Demo及API说明文档markdown
├── dom #Dom操作
├── entry.js  #Vue入口文件
├── favicon.ico
├── i18n  #国际化
├── icon.json
├── index.tpl
├── nav.config.json #导航菜单
├── pages #页面模板
├── play
├── play.js
├── route.config.js #Vue路由配置
├── util.js
└── versions.json
```

### src
```bash
src
├── directives  #Vue自定义指令集合
├── index.js  #build脚本生成的element入口文件
├── locale  #国际化语言相关
├── mixins  #Vue mixins模块
├── transitions #transition过渡
└── utils #工具函数集合
```

### packages
element各组件源码，备注省略
```html
packages/
├── alert
├── aside
├── autocomplete
├── avatar
├── backtop
├── badge
├── breadcrumb
├── breadcrumb-item
├── button
├── button-group
├── calendar
├── card
├── carousel
├── carousel-item
├── cascader
├── cascader-panel
├── checkbox
├── checkbox-button
├── checkbox-group
├── col
├── collapse
├── collapse-item
├── color-picker
├── container
├── date-picker
├── dialog
├── divider
├── dropdown
├── dropdown-item
├── dropdown-menu
├── footer
├── form
├── form-item
├── header
├── icon
├── image
├── infinite-scroll
├── input
├── input-number
├── link
├── loading
├── main
├── menu
├── menu-item
├── menu-item-group
├── message
├── message-box
├── notification
├── option
├── option-group
├── page-header
├── pagination
├── popover
├── progress
├── radio
├── radio-button
├── radio-group
├── rate
├── row
├── scrollbar
├── select
├── slider
├── spinner
├── step
├── steps
├── submenu
├── switch
├── tab-pane
├── table
├── table-column
├── tabs
├── tag
├── theme-chalk
├── time-picker
├── time-select
├── timeline
├── timeline-item
├── tooltip
├── transfer
├── tree
└── upload
```

## 组件列表
|Index| Name | Intro |
|-----|------|------|
|---|Basic|---|
| 1   | [Layout布局](/components/basic/layout.html) | 通过基础的 24 分栏，迅速简便地创建布局。 |
| 2   | [Container布局容器](/components/basic/layout.html)  | 用于布局的容器组件，方便快速搭建页面的基本结构 |
| 3   | [Color色彩](/components/basic/layout.html) | Element 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。 |
| 4   | [Typography字体](/components/basic/layout.html)| 我们对字体进行统一规范，力求在各个操作系统下都有最佳展示效果。 |
| 5   | [Border边框](/components/basic/layout.html) | 我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。 |
| 6   | [Icon图标](/components/basic/layout.html)| 提供了一套常用的图标集合 |
| 7   | [Button按钮](/components/basic/layout.html)| 常用的操作按钮。 |
| 8   | [Link文字链接](/components/basic/layout.html)| 文字超链接 |
|---|Form|---|
| 9   | [Radio单选框](/components/basic/layout.html)| 在一组备选项中进行单选 |
| 10   | [Checkbox多选框](/components/basic/layout.html)| 一组备选项中进行多选 |
| 11   | [Input输入框](/components/basic/layout.html)| 通过鼠标或键盘输入字符 |
| 12   | [InputNumber计数器](/components/basic/layout.html)| 仅允许输入标准的数字值，可定义范围 |
| 13   | [Select选择器](/components/basic/layout.html)| 当选项过多时，使用下拉菜单展示并选择内容。 |
| 14   | [Cascader级联选择器](/components/basic/layout.html)| 当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。 |
| 15   | [Switch开关](/components/basic/layout.html)| 表示两种相互对立的状态间的切换，多用于触发「开/关」。 |
| 16   | [Slider滑块](/components/basic/layout.html)| 通过拖动滑块在一个固定区间内进行选择 |
| 17   | [TimePicker时间选择器](/components/basic/layout.html)| 用于选择或输入日期 |
| 18   | [DatePicker日期选择器](/components/basic/layout.html)| 用于选择或输入日期 |
| 19   | [DateTimePicker日期时间选择器](/components/basic/layout.html)| 在同一个选择器里选择日期和时间 |
| 20   | [Upload上传](/components/basic/layout.html)| 通过点击或者拖拽上传文件 |
| 21   | [Rate评分](/components/basic/layout.html)| 评分组件 |
| 22   | [ColorPicker颜色选择器](/components/basic/layout.html)| 用于颜色选择，支持多种格式。 |
| 23   | [Transfer穿梭框](/components/basic/layout.html)|  |
| 24   | [Form表单](/components/basic/layout.html)| 由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据 |
|---|Data|---|
| 25   | [Table表格](/components/basic/layout.html)| 用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。 |
| 26   | [Tag标签](/components/basic/layout.html)| 用于标记和选择。 |
| 27   | [Progress进度条](/components/basic/layout.html)| 用于展示操作进度，告知用户当前状态和预期。 |
| 28   | [Tree树形控件](/components/basic/layout.html)| 用清晰的层级结构展示信息，可展开或折叠。 |
| 29   | [Pagination分页](/components/basic/layout.html)| 当数据量过多时，使用分页分解数据。 |
| 30   | [Badge标记](/components/basic/layout.html)| 出现在按钮、图标旁的数字或状态标记。 |
| 31   | [Avatar头像](/components/basic/layout.html)| 用图标、图片或者字符的形式展示用户或事物信息。 |
|---|Notice|---|
| 32   | [Alert警告](/components/basic/layout.html)| 用于页面中展示重要的提示信息。 |
| 33   | [Loading加载](/components/basic/layout.html)| 加载数据时显示动效。 |
| 34   | [Message消息提示](/components/basic/layout.html)| 常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。 |
| 35   | [MessageBox弹框](/components/basic/layout.html)| 模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。 |
| 36   | [Notification通知](/components/basic/layout.html)| 悬浮出现在页面角落，显示全局的通知提醒消息。 |
|---|Navigation|---|
| 37   | [NavMenu导航菜单](/components/basic/layout.html)| 为网站提供导航功能的菜单。 |
| 38   | [Tabs标签页](/components/basic/layout.html)| 分隔内容上有关联但属于不同类别的数据集合。 |
| 39   | [Breadcrumb面包屑](/components/basic/layout.html)| 显示当前页面的路径，快速返回之前的任意页面。 |
| 40   | [PageHeader页头](/components/basic/layout.html)| 如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。 |
| 41   | [Dropdown下拉菜单](/components/basic/layout.html)| 将动作或菜单折叠到下拉菜单中。 |
| 42   | [Steps步骤条](/components/basic/layout.html)| 引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。 |
|---|Others|---|
| 43   | [Dialog对话框](/components/basic/layout.html)| 在保留当前页面状态的情况下，告知用户并承载相关操作。 |
| 44   | [Tooltip文字提示](/components/basic/layout.html)| 常用于展示鼠标 hover 时的提示信息。 |
| 45   | [Popover弹出框](/components/basic/layout.html)|  |
| 46   | [Card卡片](/components/basic/layout.html)| 将信息聚合在卡片容器中展示。 |
| 47   | [Carousel走马灯](/components/basic/layout.html)| 在有限空间内，循环播放同一类型的图片、文字等内容 |
| 48   | [Collapse折叠面板](/components/basic/layout.html)| 通过折叠面板收纳内容区域 |
| 49   | [Timeline时间线](/components/basic/layout.html)| 可视化地呈现时间流信息。 |
| 50   | [Divider分割线](/components/basic/layout.html)| 区隔内容的分割线。 |
| 51   | [Calendar日历](/components/basic/layout.html)| 显示日期 |
| 52   | [Image图片](/components/basic/layout.html)| 图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等 |
| 53   | [Backtop回到顶部](/components/basic/layout.html)| 返回页面顶部的操作按钮 |
| 54   | [InfiniteScroll无限滚动](/components/basic/layout.html)| 滚动至底部时，加载更多数据。 |
| 55   | [Drawer抽屉](/components/basic/layout.html)| 有些时候, Dialog 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Dialog 几乎相同的 API, 在 UI 上带来不一样的体验. |
