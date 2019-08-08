# Layout布局

[[toc]]

## 基本用法
```html
<el-row :gutter="16">
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
```

## 1. el-row
行组件
- 创建行标签。
  
### 1.1 源码
```js
// row.js
export default {
  name: 'ElRow',

  componentName: 'ElRow',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    style() {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },

  render(h) {
    return h(this.tag, {
      class: [
        'el-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align !== 'top' ? `is-align-${this.align}` : '',
        { 'el-row--flex': this.type === 'flex' }
      ],
      style: this.style
    }, this.$slots.default);
  }
};
```

### 1.2 组件声明
代码从上往下看，首先第一部分定义了Vue Component ID名称和自定义属性componentName
```js
export default {
  name: 'ElRow', //定义组件id名
  componentName: 'ElRow' //自定义属性componentName
  ...
}
```
::: tip
这里有一个问题是name是Vue官方规范，每个component需要一个id名称，允许组件模板递归调用自身，另外对于信息展示也有标识作用。
componentName作为自定义属性的作用是什么呢？
:::

### 1.3 props属性
然后声明组件的属性列表
```js
export default {
  ...
  // 声明组件属性列表
  props: {
    // tag属性，用于定义el-row渲染出来的html标签名
    tag: {
      type: String,
      default: 'div'
    },
    // gutter属性，Number类型，定义栅格栏之间的间隔，单位px
    gutter: Number,
    // type属性，定义布局类型，可以定义为flex
    type: String,
    // flex布局模式下的水平排列方式
    justify: {
      type: String,
      default: 'start'
    },
    // flex布局下垂直排列方式
    align: {
      type: String,
      default: 'top'
    }
  },
  ...
}
```

### 1.4 计算属性
后面接着定义计算属性style，用于动态计算gutter属性定义的栅格栏之间的间隔。
```js {13,15}
export default {
  ...
  // 声明计算属性
  computed: {
    // style样式
    style() {
      // 声明返回结果为空对象
      const ret = {};

      // 如果设置了gutter属性
      if (this.gutter) {
        // 左边距margin-left等于负的(gutter / 2)，单位px
        ret.marginLeft = `-${this.gutter / 2}px`;
        // 右边距等于左边距
        ret.marginRight = ret.marginLeft;
      }

      // 返回计算结果
      return ret;
    }
  },
  ...
}
```
::: tip
这里留个思考题，为什么el-row的左右边距都是负值？
:::

### 1.5 render函数
最后一段定义组件的render函数，创建VNode虚拟DOM节点。
```js
export default {
  ...
  // 定义render函数
  render(h) {
    // h => createElement({String | Object | Function}, {Object}, {String | Array})
    // 参考: https://vuejs.org/v2/guide/render-function.html#createElement-Arguments

    // this.tag即是上面props里面定义的tag属性，默认为div，所以el-row默认渲染成<div></div>
    return h(this.tag, {
      // 定义VNode的className
      class: [
        // 默认el-row
        'el-row',

        // 如果定义了justify属性，且值不是start，返回"is-justify-xx"
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',

        // 如果定义了align属性，且值不是top，返回"is-align-xx"
        this.align !== 'top' ? `is-align-${this.align}` : '',

        // 如果定义了type属性，且值是flex，返回"el-row--flex"
        { 'el-row--flex': this.type === 'flex' }
      ],

      // 使用计算属性里面计算出来的gutter style
      style: this.style
    }, 

    // 组件内部匿名slot
    this.$slots.default);
  }
}
```

::: tip
思考题：this.$slots.default的作用是什么？
:::

## 2. el-col
定义水平布局分割

### 2.1 源码
```js
// col.js
export default {
  name: 'ElCol',

  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    let classList = [];
    let style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `el-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`
        );
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        let props = this[size];
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          );
        });
      }
    });

    return h(this.tag, {
      class: ['el-col', classList],
      style
    }, this.$slots.default);
  }
};
```

### 2.2 组件声明
```js
export default {
  // component name
  name: 'ElCol',
  ...
}
```

### 2.3 props属性
```js
export default {
  ...
  props: {
    // 定义el-col的宽度值，栅格占据的列数，element默认采用24栅格布局
    span: {
      type: Number,
      default: 24
    },

    // tag属性，用于定义el-col渲染出来的html标签名
    tag: {
      type: String,
      default: 'div'
    },

    // 栅格左侧的间隔数，通过margin-left实现
    offset: Number,

    // 栅格向右移动格数
    pull: Number,

    // 栅格向左移动格数
    push: Number,

    // <768px 响应式栅格数或者栅格属性对象
    xs: [Number, Object],

    // ≥768px 响应式栅格数或者栅格属性对象
    sm: [Number, Object],

    // ≥992px 响应式栅格数或者栅格属性对象
    md: [Number, Object],

    // ≥1200px 响应式栅格数或者栅格属性对象
    lg: [Number, Object],

    // ≥1920px 响应式栅格数或者栅格属性对象
    xl: [Number, Object]
  },
  ...
}
```

### 2.4 计算属性
通过父组件(el-row)设置的gutter属性，计算子组件(el-col)的间距
```js {10}
export default {
  ...
  computed: {
    // 声明gutter属性
    gutter() {
      // 获取父组件
      let parent = this.$parent;
      // 如果有父组件，且父组件的componentName不是ElRow，递归向上查找父组件。
      // 这里回答了上文的思考题，组件自定义componentName属性的用途，但这只是其中一种用途
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent;
      }
      // 如果有父组件，返回父组件的gutter属性值，否则返回0
      return parent ? parent.gutter : 0;
    }
  },
  ...
}
```
::: tip
这里有个问题，while循环一直向上查找，如果始终找不到满足条件的parent组件会怎么样？
:::

### 2.5 render函数
```js {14,22,40}
export default {
  ...
  // 定义render函数
  render(h) {
    // 声明VNode的class列表
    let classList = [];
    // 声明VNode的style样式属性对象
    let style = {};

    // 如果gutter计算属性不为false，注意0, "", undefined, null都是false
    if (this.gutter) {
      // el-col元素的左内边距padding-left为this.gutter / 2，单位px
      // 这里基本回答了为何el-row的左边距为负值
      style.paddingLeft = this.gutter / 2 + 'px';
      // 右内边距等于左内边距
      style.paddingRight = style.paddingLeft;
    }

    // 遍历span, offset, pull, push属性
    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      // 如果属性存在，或者属性值为0
      if (this[prop] || this[prop] === 0) {
        // 如果属性为span，返回el-col-${span的值}，设置el-col占据的栅格数
        // 如果属性不是span，返回el-col-${prop名}-${prop的值}
        // 将className存入class列表
        classList.push(
          prop !== 'span'
            ? `el-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`
        );
      }
    });

    // 遍历xs, sm, md, lg, xl属性，用于响应式布局设置
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      // 如果属性值类型为Number，classList存入el-col-${属性名}-${属性值}
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`);
      // 如果属性为对象类型，遍历属性对象
      } else if (typeof this[size] === 'object') {
        let props = this[size];
        Object.keys(props).forEach(prop => {
          // 如果对象属性为span，返回el-col-${属性名}-{对象属性值}
          // 如果对象属性不是span，返回el-col-${属性名}-${对象属性名}-{对象属性值}
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          );
        });
      }
    });

    // this.tag即是props属性里面的tag，定义el-col渲染成的HTML标签名，默认值为div，
    return h(this.tag, {
      // 定义VNode的className
      class: ['el-col', classList],
      // 定义VNode style属性
      style
    }, 
    // 组件内部匿名slot
    this.$slots.default);
  }
}
```

::: tip
思考题: render函数如何处理gutter计算属性异常情况的？
:::