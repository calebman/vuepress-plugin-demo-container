const fs = require('fs');
const mdContainer = require('markdown-it-container');
module.exports = options => {
  const {
    component = 'demo-block'
  } = options;
  const componentName = component
    .replace(/^\S/, s => s.toLowerCase())
    .replace(/([A-Z])/g, "-$1").toLowerCase();
  return md => {
    md.use(mdContainer, 'demo', {
      validate(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : '';
          let content = ''
          if (tokens[idx + 1].type === 'fence') {
            if (tokens[idx + 1].content) {
              content = tokens[idx + 1].content
            } else if (tokens[idx + 1].src) {
              // 根据路径加载文件
              content = fs.readFileSync(tokens[idx + 1].src, 'utf-8')
            }
          }
          const encodeOptionsStr = encodeURI(JSON.stringify(options));
          return `<${componentName} :options="JSON.parse(decodeURI('${encodeOptionsStr}'))">
            <template slot="demo"><!--pre-render-demo:${content}:pre-render-demo--></template>
            ${description ? `<div slot="description">${md.render(description).html}</div>` : ''}
            <template slot="source">
          `;
        }
        return `</template></${componentName}>`;
      }
    });
  };
}