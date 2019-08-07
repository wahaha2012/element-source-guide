# Divider 分割线

[[toc]]

## 基本用法
```html
<template>
  <div>
    <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
    <el-divider></el-divider>
    <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
  </div>
</template>
```

## el-divider
区隔内容的分割线。

### 源码
```js
export default {
  functional: true,

  name: 'ElDivider',

  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },

    contentPosition: {
      type: String,
      default: 'center',
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1;
      }
    }
  },

  render(h, context) {
    const $slots = context.slots();
    const { direction, contentPosition } = context.props;
    return (
      <div class={['el-divider', `el-divider--${direction}`]}>
        {
          $slots.default && direction !== 'vertical'
            ? <div class={['el-divider__text', `is-${contentPosition}`]}>{$slots.default}</div>
            : null
        }
      </div>
    );
  }
};
```

### 组件声明
这里没有定义componentName属性，但是新增了functional属性，声明为函数式组件，意味着它是无状态的，只接收props，没有this上下文。
```js
export default {
  functional: true,

  name: 'ElDivider',
  ...
}
```

### props属性定义
props定义了两个属性：
- `direction` {String} 设置分割线方向
- `contentPosition` {String } 设置分割线文案的位置
```js
export default {
  ...
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      // 自定义属性验证函数，只接收'horizontal', 'vertical'两个值
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },

    contentPosition: {
      type: String,
      default: 'center',
      // 自定义属性验证函数，只接收'left', 'center', 'right'三个值
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1;
      }
    }
  },
  ...
}
```


### render函数
由于前面声明了组件为functional，函数式组件没有实例和this上下文，为了弥补这个问题，render函数需要第二个上下文参数context
```js
export default {
  ...
  render(h, context) {
    // 获取所有slot插槽
    const $slots = context.slots();
    // 解构props传入的属性设置
    const { direction, contentPosition } = context.props;
    // 这里没有使用h或者createElement包裹，而是直接使用jsx语法
    return (
      <div class={['el-divider', `el-divider--${direction}`]}>
        {
          // 如果有子元素，并且不是垂直方向，创建内层div元素
          $slots.default && direction !== 'vertical'
            ? <div class={['el-divider__text', `is-${contentPosition}`]}>{$slots.default}</div>
            : null
        }
      </div>
    );
  }
}
```

::: tip
思考题：为什么要把分割线设置成functional: true?
:::