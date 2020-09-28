# 简介

`Demo Container` 是一个基于 `Vuepress` 的插件，它可以帮助你在编写文档的时候增加 `Vue` 示例，它的诞生初衷是为了降低编写组件文档时增加一些相关示例的难度。

使用 Vuepress 编写组件示例有以下尴尬之处：

1. 组件示例和示例代码本质上一样，却需要写两遍；
2. Vuepress 无法渲染 Markdown 中的 `export default {}` 代码块；

Demo Container 参考了 Element UI 的文档渲染，实现了和它一样的，可在 Markdown 中直接编写示例的语法。

- Element UI ColorPicker 组件的**文档编写示例**，[点此查看](https://github.com/ElemeFE/element/blob/dev/examples/docs/zh-CN/color-picker.md)
- Element UI ColorPicker 组件的**文档示例预览**，[点此查看](https://element.eleme.cn/2.0/#/zh-CN/component/color-picker)

[点此查看示例与使用文档](https://docs.chenjianhui.site/vuepress-plugin-block-winyh/zh/)
