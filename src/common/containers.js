const mdContainer = require('markdown-it-container');

module.exports = md => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `<demo-block>
          <!--pre-render-demo:${content}:pre-render-demo-->
          ${description ? `<div slot="description">${md.render(description).html}</div>` : ''}
          <template slot="source">
        `;
      }
      return '</template></demo-block>';
    }
  });
};