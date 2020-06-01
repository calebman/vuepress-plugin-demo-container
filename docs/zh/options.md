# 配置

## component

- 类型：`string`
- 默认值：`demo-block`

包裹代码与示例的组件名称。

使用本参数自定义 Demo Container 内部的**示例块**组件，自定义的组件应当支持以下三个挂载点：

- Slot demo：被渲染成示例
- Slot description：被渲染成示例描述信息
- Slot source：被渲染成示例的源代码

::: warning 注意
配置的组件名称必须在 Vuepress 全局注册，可在 enhanceApp.js 中使用 `Vue.component` 进行注册。
:::

```js
module.exports = {
  plugins: {
    'demo-container': {
      component: 'CustomDemoBlock'
    }
  }
}
```

设置自定义示例块组件 CustomDemoBlock.vue

```html
<template>
  <div>
    <h3>Description</h3>
    <slot name="description"></slot>
    <h3>Example</h3>
    <slot name="demo"></slot>
    <h3>Source Code</h3>
    <slot name="source"></slot>
  </div>
</template>
```

经过 Demo Container 渲染后，下方只保留了渲染的主体结构

```html
<custom-demo-block>
  <template slot="demo">
    <!--render-demo:xxx:render-demo-->
  </template>
  <div v-if="description" slot="description">
    <!--render-description:xxx:render-description-->
  </div>
  <template slot="source">
    <!--render-source:xxx:render-source-->
  </template>
</custom-demo-block>
```

## locales

- 类型：`Array`
- 默认值

<<< @/src/i18n/default_lang.json

使用 `locales` 自定义国际化配置，插件将根据 Vuepress 中匹配的 lang 字段完成语言切换，[点此查看 Vuepress 的多语言支持](https://vuepress.vuejs.org/zh/guide/i18n.html)。