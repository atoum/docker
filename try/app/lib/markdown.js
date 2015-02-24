var marked = require('marked'),
    TerminalRenderer = require('marked-terminal'),
    render = function(markdown) {
        return marked(markdown.toString());
    },
    renderTrim = function(markdown) {
        return render(markdown).replace(/^[\s\n]+|[\s\n]+$/, '');
    };

marked.setOptions({
    renderer: new TerminalRenderer()
});

module.exports = {
    render: render,
    renderTrim: renderTrim,

    renderTo: function(markdown, writable) {
        writable.write(render(markdown));
    },

    renderTrimTo: function(markdown, writable) {
        writable.write(renderTrim(markdown));
    }
};
