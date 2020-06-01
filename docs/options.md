# Options

## component

- Type: `string`
- Default: demo-block

The component name of the warp code and example.

Use this parameter to customize the **demo block** component inside the Demo Container. The customized component should support the following three slots:

- Slot demo：Is rendered as an example
- Slot description：Is rendered as example description information
- Slot source：Source code rendered as an example

::: warning
The configured component name must be registered globally in Vuepress, which can be registered using `Vue.component` in enhanceApp.js.
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

Set custom sample block component CustomDemoBlock.vue.

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

After the Demo Container is rendered, only the main structure of the rendering is retained below.

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