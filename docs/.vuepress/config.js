const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  base: isProd ? '/vuepress-plugin-demo-container/' : '/',
  port: '6700',
  dest: 'docs/.vuepress/dist/vuepress-plugin-demo-container/',
  markdown: {
    lineNumbers: false
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Demo Container',
      description: 'plugin for vuepress to display vue demo'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Demo Container',
      description: '用于编写 vue 组件示例的 vuepress 插件'
    }
  },
  themeConfig: {
    repo: 'calebman/vuepress-plugin-demo-container',
    editLinks: false,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        sidebar: {
          '/': genSidebarConfig('Guide')
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebar: {
          '/zh/': genSidebarConfig('指南')
        }
      }
    }
  },
  plugins: [
    require('../../src')
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './public/assets')
      }
    }
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'started',
        'complex'
      ]
    }
  ]
}