# Getting Started

## Installation

### Install VuePress

Please refer to the official Vuepress documentation, [click here to view](https://vuepress.vuejs.org/guide/)

### Install the plugin

Use `yarn` to install the` vuepress-plugin-demo-container` component:
```bash
yarn add vuepress-plugin-demo-container -D
```
Or use `npm` to install it:
```bash
npm i vuepress-plugin-demo-container --save-dev
```

### Configure plugin

Open the .vuepress/config.js file, and then reference the plugin in the appropriate location:

```js
module.exports = {
  ...
  plugins: ['demo-container']
  ...
}
```

If you are not familiar with VuePress plugin configuration, please click here: [Use plugin](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html)

After the configuration is complete, cd to the same level directory in the .vuepress folder, run `vuepress dev .` to start the document service

## Use plugin

::: warning
In order to show how to write an example, the three points used to mark the end of the code part have been separated by spaces, and the spaces need to be removed when used.
:::

Write the following code in the Markdown file:

```html
::: demo The description information of the code example is placed here, supporting the `Markdown` syntax, **the description information only supports a single line**
```html
<template>
  <div class="red-text">Vue {{ message }}</div>
</template>
<script>
export default {
  data: () => ({ message: 'Hello World' })
}
</script>
<style>
.red-text { color: red; }
</style>
` ` `  <= Remove the left space
:::
```

The running effect is as follows

::: demo The description information of the code example is placed here, supporting the `Markdown` syntax, **the description information only supports a single line**
```html
<template>
  <div class="red-text">Vue {{ message }}</div>
</template>
<script>
export default {
  data: () => ({ message: 'Hello World' })
}
</script>
<style>
.red-text { color: red; }
</style>
```
:::