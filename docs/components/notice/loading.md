# Loading 加载

[[toc]]

## 基本用法
```html
<template>
  <el-button
    type="primary"
    @click="openFullScreen"
    v-loading.fullscreen.lock="fullscreenLoading">
    指令方式
  </el-button>
  <el-button
    type="primary"
    @click="openFullScreen">
    服务方式
  </el-button>
</template>

<script>
  export default {
    data() {
      return {
        fullscreenLoading: false
      }
    },
    methods: {
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
      openFullScreen() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }
    }
  }
</script>
```

## loading

### 目录结构
```bash
packages/loading/
├── index.js  #组件入口文件
└── src #组件源码
    ├── directive.js  #Loading指令插件
    ├── index.js  #Loading服务组件
    └── loading.vue #Loading基础组件
```

### 入口文件
```js
// index.js

// 导入指令模块
import directive from './src/directive';
// 导入服务模块
import service from './src/index';

// 导出默认对象
export default {
  // install()方法
  install(Vue) {
    // Vue安装指令插件
    Vue.use(directive);
    // Vue原型上挂载$loading方法
    Vue.prototype.$loading = service;
  },
  directive,
  service
};
```
::: tip
思考题：
1. 导出对象的install的方法作用是什么？
2. 导出对象里面directive, service的用途是什么？
:::


### 基础组件
```vue
<!-- src/loading.vue -->
<template>
  <!-- 使用Vue transition内置组件，并使用自定义过渡效果el-loading-fade -->
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <!-- Loading遮罩 -->
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <!-- loading图标 -->
      <div class="el-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <i v-else :class="spinner"></i>
        <!-- Loading文本 -->
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    // 默认data设置
    data() {
      return {
        text: null,
        spinner: null,
        background: null,
        fullscreen: true,
        visible: false,
        customClass: ''
      };
    },

    methods: {
      // transition after leave处理函数
      handleAfterLeave() {
        this.$emit('after-leave');
      },
      // 设置loading文本方法
      setText(text) {
        this.text = text;
      }
    }
  };
</script>
```
Loading基础组件定义了Loading组件的Dom节点内容，基本属性设置，以及更新Loading文本的方法。

后面的指令插件和服务组件都是基于基础配置扩展功能。

### 指令插件
```js
// src/directive.js

// 导入Vue对象
import Vue from 'vue';
// 导入Loading基础组件
import Loading from './loading.vue';
// 从utils/dom导入样式处理函数
import { addClass, removeClass, getStyle } from 'element-ui/src/utils/dom';
// 从utils/popup导入弹窗管理器
import { PopupManager } from 'element-ui/src/utils/popup';
// 从utils/after-leave导入transition after-leave事件绑定函数
import afterLeave from 'element-ui/src/utils/after-leave';
// 基于Loading基础组件创建新的Vue子类Mask
const Mask = Vue.extend(Loading);

// 声明loadingDirective对象
const loadingDirective = {};
// loading指令对象的install方法，用于插件的初始化安装
loadingDirective.install = Vue => {
  // 如果原型上已经有$isServer属性，证明Loading组件或者Element已经被Vue安装过了，直接返回
  if (Vue.prototype.$isServer) return;

  // Loading开关函数
  const toggleLoading = (el, binding) => {
    // 如果binging.vue为true，说明需要开启loading显示
    if (binding.value) {
      // Vue下一次异步更新队列执行之后，调用回调函数
      Vue.nextTick(() => {
        // 如果指令修饰符设置了fullscreen为true，说明需要开启全面模式
        if (binding.modifiers.fullscreen) {
          // 通过getComputedStyle()计算出当前body的css属性值，获取position,overflow属性
          el.originalPosition = getStyle(document.body, 'position');
          el.originalOverflow = getStyle(document.body, 'overflow');
          // 通过PopupManager生成下一个z-index高度值
          el.maskStyle.zIndex = PopupManager.nextZIndex();

          // 给loading mask元素添加className is-fullscreen
          addClass(el.mask, 'is-fullscreen');
          // 调用insertDom函数，把loading el元素插入到document.body元素内部
          insertDom(document.body, el, binding);
        } else {
          // 如果不需要全屏，移除is-fullscreen
          removeClass(el.mask, 'is-fullscreen');

          // 如果修饰符加了body
          if (binding.modifiers.body) {
            // 通过getComputedStyle()方法计算document.body的初始位置
            el.originalPosition = getStyle(document.body, 'position');

            // 计算el元素实际的位置
            ['top', 'left'].forEach(property => {
              const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
              el.maskStyle[property] = el.getBoundingClientRect()[property] +
                document.body[scroll] +
                document.documentElement[scroll] -
                parseInt(getStyle(document.body, `margin-${ property }`), 10) +
                'px';
            });
            // 计算el的高和宽，让遮罩跟el一样大小
            ['height', 'width'].forEach(property => {
              el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
            });

            // 把el插入到document.body
            insertDom(document.body, el, binding);
          } else {
            // 通过getComputedStyle()方法计算el的初始位置
            el.originalPosition = getStyle(el, 'position');
            // 将loading DOM插入到指令绑定元素内部
            insertDom(el, el, binding);
          }
        }
      });
    } else {
      // 如果binding.value的不为true，需要关闭loading
      // loading UI组件使用了transition过渡，绑定after-leave事件触发后的处理函数
      afterLeave(el.instance, _ => {
        // 如果组件不课件，直接返回
        if (!el.instance.hiding) return;
        //  降el元素domVisible属性设置为false
        el.domVisible = false;
        // 通过指令修饰符获取loading的父级目标对象
        const target = binding.modifiers.fullscreen || binding.modifiers.body
          ? document.body
          : el;
        // 移除目标Dom节点样式
        removeClass(target, 'el-loading-parent--relative');
        removeClass(target, 'el-loading-parent--hidden');
        el.instance.hiding = false;
      }, 300, true);
      // 将loading实例visible属性设置为false
      el.instance.visible = false;
      // 将loading实例hiding属性设置为true
      el.instance.hiding = true;
    }
  };

  // 插入Dom节点操作函数
  const insertDom = (parent, el, binding) => {
    // 如果指令绑定元素处于可见状态
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      // 遍历并设置mask样式
      Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property];
      });
      
      // 如果loading容器原始position不是absolute，或者fixed，添加relative属性
      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'el-loading-parent--relative');
      }
      // 如果指令有fullscreen或者lock修饰符，增加overflow: hidden属性设置
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        addClass(parent, 'el-loading-parent--hidden');
      }
      // 降domVisible状态改为true
      el.domVisible = true;

      // 将loading Vue实例添加到parent元素末尾
      parent.appendChild(el.mask);
      // 下一个Vue更新队列执行完
      Vue.nextTick(() => {
        // 如果正在向不可见过渡
        if (el.instance.hiding) {
          // $emit after-leave事件
          el.instance.$emit('after-leave');
        } else {
          // 否则设置实例visible属性为true
          el.instance.visible = true;
        }
      });
      // domIserted属性设置为true
      el.domInserted = true;
    // 否则，如果loading已经显示，并且正在向不可见状态过渡中
    } else if (el.domVisible && el.instance.hiding === true) {
      // 将实例状态重新改成可见
      el.instance.visible = true;
      el.instance.hiding = false;
    }
  };

  // 定义loading指令，传入指令钩子函数设置
  Vue.directive('loading', {
    // 绑定元素时的初始化设置
    bind: function(el, binding, vnode) {
      // 从被绑定元素上获取loading的文本内容
      const textExr = el.getAttribute('element-loading-text');
      // 从被绑定元素上获取loading的icon设置
      const spinnerExr = el.getAttribute('element-loading-spinner');
      // 从被绑定元素上获取loading的遮罩背景色
      const backgroundExr = el.getAttribute('element-loading-background');
      // 从被绑定元素上获取loading的自定义className
      const customClassExr = el.getAttribute('element-loading-custom-class');
      // 获取虚拟Dom的上下文，即Vue实例
      const vm = vnode.context;
      // 初始化基于Loading基础组件的类的实例
      const mask = new Mask({
        // 设置挂载dom节点
        el: document.createElement('div'),
        // 传入data对象设置
        data: {
          text: vm && vm[textExr] || textExr,
          spinner: vm && vm[spinnerExr] || spinnerExr,
          background: vm && vm[backgroundExr] || backgroundExr,
          customClass: vm && vm[customClassExr] || customClassExr,
          fullscreen: !!binding.modifiers.fullscreen
        }
      });
      // 设置el对象属性
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {};

      // 如果binging.value为true，调用loading显示开关
      binding.value && toggleLoading(el, binding);
    },

    // 指令绑定组件更新虚拟Dom钩子函数
    update: function(el, binding) {
      // 调用loading基础组件方法setText(text)，更新loading文本
      el.instance.setText(el.getAttribute('element-loading-text'));
      // 如果value不相等，切换loading组件状态
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    // 指令与组件解绑钩子函数
    unbind: function(el, binding) {
      // 如果loading已经插入到真实Dom
      if (el.domInserted) {
        // 移除loading Dom节点
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
        // 切换loading状态为关闭
        toggleLoading(el, { value: false, modifiers: binding.modifiers });
      }
      // 销毁loading实例
      el.instance && el.instance.$destroy();
    }
  });
};
// 导出默认对象为loadingDirective
export default loadingDirective;
```
Loading指令流程图
<img :src="$withBase('/images/loading-directive.png')" alt="loading directive">

### 服务组件
```js
// src/index.js
import Vue from 'vue';
import loadingVue from './loading.vue';
import { addClass, removeClass, getStyle } from 'element-ui/src/utils/dom';
import { PopupManager } from 'element-ui/src/utils/popup';
import afterLeave from 'element-ui/src/utils/after-leave';
import merge from 'element-ui/src/utils/merge';

const LoadingConstructor = Vue.extend(loadingVue);

const defaults = {
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: ''
};

let fullscreenLoading;

LoadingConstructor.prototype.originalPosition = '';
LoadingConstructor.prototype.originalOverflow = '';

LoadingConstructor.prototype.close = function() {
  if (this.fullscreen) {
    fullscreenLoading = undefined;
  }
  afterLeave(this, _ => {
    const target = this.fullscreen || this.body
      ? document.body
      : this.target;
    removeClass(target, 'el-loading-parent--relative');
    removeClass(target, 'el-loading-parent--hidden');
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.$destroy();
  }, 300);
  this.visible = false;
};

const addStyle = (options, parent, instance) => {
  let maskStyle = {};
  if (options.fullscreen) {
    instance.originalPosition = getStyle(document.body, 'position');
    instance.originalOverflow = getStyle(document.body, 'overflow');
    maskStyle.zIndex = PopupManager.nextZIndex();
  } else if (options.body) {
    instance.originalPosition = getStyle(document.body, 'position');
    ['top', 'left'].forEach(property => {
      let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
      maskStyle[property] = options.target.getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] +
        'px';
    });
    ['height', 'width'].forEach(property => {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
    });
  } else {
    instance.originalPosition = getStyle(parent, 'position');
  }
  Object.keys(maskStyle).forEach(property => {
    instance.$el.style[property] = maskStyle[property];
  });
};

const Loading = (options = {}) => {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options);
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }

  let parent = options.body ? document.body : options.target;
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  });

  addStyle(options, parent, instance);
  if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
    addClass(parent, 'el-loading-parent--relative');
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, 'el-loading-parent--hidden');
  }
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};

export default Loading;
```