# Tag 标签

[[toc]]

## 基本用法
```html
<el-tag>标签一</el-tag>
<el-tag type="success">标签二</el-tag>
<el-tag type="info">标签三</el-tag>
<el-tag type="warning">标签四</el-tag>
<el-tag type="danger">标签五</el-tag>
```

## el-tag
用于标记和选择。

### 源码
与前面col.js,row.js不同，tag使用了.vue文件
```js
// tag.vue
<script>
  export default {
    name: 'ElTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String,
      effect: {
        type: String,
        default: 'light',
        validator(val) {
          return ['dark', 'light', 'plain'].indexOf(val) !== -1;
        }
      }
    },
    methods: {
      handleClose(event) {
        event.stopPropagation();
        this.$emit('close', event);
      },
      handleClick(event) {
        this.$emit('click', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    },
    render(h) {
      const { type, tagSize, hit, effect } = this;
      const classes = [
        'el-tag',
        type ? `el-tag--${type}` : '',
        tagSize ? `el-tag--${tagSize}` : '',
        effect ? `el-tag--${effect}` : '',
        hit && 'is-hit'
      ];
      const tagEl = (
        <span
          class={ classes }
          style={{ backgroundColor: this.color }}
          on-click={ this.handleClick }>
          { this.$slots.default }
          {
            this.closable && <i class="el-tag__close el-icon-close" on-click={ this.handleClose }></i>
          }
        </span>
      );

      return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
    }
  };
</script>
```

### 组件声明
```js
export default {
  name: 'ElTag',
  ...
}
```

### props属性
```js
export default {
  ...
  props: {
    // text属性有定义，但实际并未使用，猜想开始应该是为了设置tag的文本内容，后来使用slots替代了
    text: String,

    // tag是否可关闭，从下文可以看到，这个属性决定了关闭按钮是否显示
    closable: Boolean,

    // 类型，可选值success/info/warning/danger，但未做属性验证
    type: String,

    // 是否有边框描边，这个属性名有点怪怪的，不容易理解
    hit: Boolean,

    // 是否禁用渐变动画，默认值false
    disableTransitions: Boolean,

    // 标签背景色，这里又是一个难以理解的属性名，背景色不应该使用backgroundColor吗？
    color: String,
    
    // 标签的大小尺寸，可选值medium/small/mini，未做属性校验
    size: String,
    
    // 标签的主题设置，可选值dark/light/plain，默认值light
    // 第三个奇怪的属性名，theme是否更好一些？
    effect: {
      type: String,
      default: 'light',
      // 属性值校验
      validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1;
      }
    }
  },
  ...
}
```

### 计算属性
```js
export default {
  ...
  computed: {
    // 计算标签的大小尺寸，优先使用props里面设置的size属性，如果没有，再使用$ELEMENT全局设置的属性
    tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },
  ...
}
```
::: tip
思考题：this.$ELEMENT是什么，怎么绑定到this上下文的？
:::


### 实例方法
```js
export default {
  ...
  methods: {
    // 标签关闭事件处理函数
    handleClose(event) {
      // 阻止事件冒泡
      event.stopPropagation();
      // 使用$emit向外发送事件和数据
      this.$emit('close', event);
    },
    // 标签点击处理函数
    handleClick(event) {
      // 利用$emit向外发送click事件及处理函数
      this.$emit('click', event);
    }
  },
  ...
}
```
从代码里面看，ElTag组件并没有自己处理`点击`和`关闭`事件对应的Dom响应，只是把事件抛出来，交给使用者自己处理。

所以如果只是设置了`closable: true`，点击关闭按钮，并不会自动关闭标签。

### render函数
```js {19}
export default {
  ...
  render(h) {
    // 从this解构props属性
    const { type, tagSize, hit, effect } = this;
    // 通过属性设置构建className list
    const classes = [
      'el-tag',
      type ? `el-tag--${type}` : '',
      tagSize ? `el-tag--${tagSize}` : '',
      effect ? `el-tag--${effect}` : '',
      hit && 'is-hit'
    ];
    // tag使用span标签渲染
    const tagEl = (
      <span
        class={ classes }
        // 奇葩的属性明backgroundColor: this.color
        style={{ backgroundColor: this.color }}
        on-click={ this.handleClick }>
        // 存入默认匿名slots
        { this.$slots.default }
        {
          // 如果设置了可关闭，创建关闭按钮
          this.closable && <i class="el-tag__close el-icon-close" on-click={ this.handleClose }></i>
        }
      </span>
    );

    // 如果禁用了过渡效果，直接返回jsx span标签，否则返回<transiton>组件包裹的tag组件
    return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
  }
}
```
