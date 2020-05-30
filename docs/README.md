# Introduction

`Demo Container` is a `Vuepress-based` plug-in, which can help you add `Vue` examples when writing documents. Its original intention is to reduce the difficulty of adding some related examples when writing component documents.

::: warning Using Vuepress to write component examples has the following embarrassment:
Component examples and sample code are essentially the same, but need to be written twice;

Vuepress cannot render the `export default {}` code block in Markdown;
:::

The Demo Container refers to Element UI's document rendering and implements the same syntax as it can be used to write sample syntax directly in Markdown.
* Element UI ColorPicker component **documentation example**,[click here to view](https://github.com/ElemeFE/element/blob/dev/examples/docs/en-US/color-picker.md)
* Element UI ColorPicker component **document sample preview**,[click here to view](https://element.eleme.cn/2.0/#/en-US/component/color-picker)。


## How does it work?

The Demo Container uses Vuepress's [chainMarkdown, extendMarkdown API](https://vuepress.vuejs.org/plugin/option-api.html#extendmarkdown) to expand its internal markdown object and does the following:

1. Based on [markdown-it-container](https://github.com/markdown-it/markdown-it-container), a plug-in that recognizes the following code blocks is built
```
:::demo xxx
xxx
:::
```
Wrap the `<demo-block> </demo-block>` component for it, and pick up the sample code using `<!-Pre-render-demo: $ {content}: pre-render-demo->` comments Cache mode, wait for subsequent reading, specific implementation [click here to view](https://github.com/calebman/vuepress-plugin-demo-container/blob/master/src/common/container.js);

2. Expand the markdown.render method, based on its rendering results, read the sample code annotated by `pre-render-demo` and use [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler) compile it into a Redner Function and introduce it as a subcomponent of the entire sample page. The output of the expanded method is a code block that conforms to Vue Template syntax, specific implementation [click here to view](https://github.com/calebman/vuepress-plugin-demo-container/blob/master/src/common/render.js);

3. The sample page code will be processed by [vue-loader](https://vue-loader.vuejs.org/guide/) and compiled into the final document

## What is the rendering effect?

::: tip The following is an example of a component rendered using the Demo Container plugin
The display effect refers to the implementation of Element UI document component [demo-block.vue](https://github.com/ElemeFE/element/blob/dev/examples/components/demo-block.vue)
:::

::: demo This example refers to the [GitHub submission](https://vuejs.org/v2/examples/commits.html) implementation in the example of the `Vue` official document, uses the Github API to get the latest submission data of the repository, and displays them in a list.
```html
<template>
  <div class="vuepress-plugin-demo-container-example">
    <input
      class="repo-name-input"
      autofocus
      autocomplete="off"
      placeholder="Change the repo name and press enter, such as vuejs/vue."
      v-model="inputRepoName"
      @keyup.enter="changeRepoName"
    />
    <h1>Latest Commits</h1>
    <span v-for="(branch, i) in branches" :key="`branch${i}`" class="branch">
      <input type="radio" :id="branch" :value="branch" name="branch" v-model="currentBranch" />
      <label :for="branch">{{ branch }}</label>
    </span>
    <p>{{ repoName }}@{{ currentBranch }}</p>
    <p v-if="loading">Request loading...</p>
    <div v-else>
      <p v-if="errMsg" class="danger-msg">Error: {{ errMsg }}.</p>
      <p v-else-if="commits.length === 0">Found the repository is no commit.</p>
      <ul v-else>
        <li v-for="(record, i) in commits" :key="`record${i}`">
          <a :href="record.html_url" target="_blank" class="commit">{{ record.sha.slice(0, 7) }}</a>
          -
          <span class="message">{{ record.commit.message | truncate }}</span>
          <br />by
          <span class="author">
            <a :href="record.author && record.author.html_url" target="_blank">{{ record.commit.author.name }}</a>
          </span>
          at
          <span class="date">{{ record.commit.author.date | formatDate }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputRepoName: '',
      repoName: 'calebman/vuepress-plugin-demo-container',
      branches: ['master', 'dev'],
      currentBranch: 'master',
      loading: false,
      commits: [],
      errMsg: null
    };
  },

  mounted() {
    this.fetchData();
  },

  watch: {
    repoName: 'fetchData',
    currentBranch: 'fetchData'
  },

  filters: {
    truncate: function(v) {
      var newline = v.indexOf('\n');
      return newline > 0 ? v.slice(0, newline) : v;
    },
    formatDate: function(v) {
      return v.replace(/T|Z/g, ' ');
    }
  },

  methods: {
    changeRepoName() {
      this.repoName = this.inputRepoName;
    },
    fetchData() {
      this.loading = true;
      const apiURL = `https://api.github.com/repos/${this.repoName}/commits?per_page=3&sha=${this.currentBranch}`;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', apiURL);
      xhr.onerror = err => {
        this.errMsg = '连接错误,过于频繁的请求可能被拒绝';
      }
      xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        this.loading = false;
        if (Array.isArray(resp)) {
          this.errMsg = null;
          this.commits = resp
        } else {
          this.errMsg = resp.message;
        }
      };
      xhr.send();
    }
  }
};
</script>

<style>
.vuepress-plugin-demo-container-example .branch {
  margin-right: 8px;
}
.vuepress-plugin-demo-container-example .danger-msg {
  color: #f56c6c;
}
.repo-name-input,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 20px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.repo-name-input {
  padding: 16px;
  margin: 8px 0;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
```
:::

## Why not...?

::: tip Are there any other options
Before I created the Demo Container, I searched for plug-ins that meet the above requirements as much as possible, and found the following two useful plug-ins. If there are other available plug-ins that have been omitted by the author, I can add it by mentioning [Issus](https://github.com/calebman/vuepress-plugin-demo-container/issues). Thank you very much.
:::

### vuepress-plugin-demo-block

Repository [click here to view](https://github.com/xiguaxigua/vuepress-plugin-demo-block),the **use of this plugin is exactly the same as the author's ideal way**, and its implementation principle is

Through [Vuepress clientRootMixin API](https://vuepress.vuejs.org/plugin/option-api.html#clientrootmixin) mixed into the mounted and updated life cycle of the page, read the sample code to separate the `template`,` script`, `style` code blocks:
* The code block wrapped by the template is inserted directly into the example node;
* The code block wrapped by script compiles the Vue object through Vue.extend, and then calls its $ mount () method to mount it to the sample dom;
* The code block wrapped in style is inserted directly into the document;

The problem with this is that **template code blocks cannot contain globally registered components in Vuepress**, and writing component library examples will necessarily rely on globally registered components.


### vuepress-plugin-extract-code

Repository [click here to view](https://github.com/vuepress-reco/vuepress-plugin-extract-code),The usage of this plugin is not consistent with the author's ideal way, but it **resolves the problem that component examples and code need to be written twice**, and its implementation principle is:

Provide a RecoDemo component for constructing sample pages in Markdown, and add a plug-in to Vuepress's internal markdown through [Vuepress chainMarkdown API](https://vuepress.vuejs.org/plugin/option-api.html#chainmarkdown). This plug-in is responsible for manually parsing `<<< @/docs/.vuepress/demo/demo.vue?template` syntax, identify the code block and add it to the sample code description, if you do n’t know the syntax, you can click [click here to view the description](https://vuepress.vuejs.org/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E6%AE%B5).

This takes advantage of the features of Vuepress's ability to compile Vue components, and there is no problem in use, but if a component usage document contains multiple examples, even if the single example code is very small, you have to create a file for it and register it globally. Vuepress, **The problem is troublesome maintenance**.

## Contributor

<p>
  <a-tooltip title="JianhuiChen">
    <a href="https://github.com/calebman" target="_blank">
      <a-avatar :src="$withBase('contributor.png')" :size="54"/>
    </a>
  </a-tooltip>
</p>