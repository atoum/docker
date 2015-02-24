#!/usr/bin/env nodejs

var fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    markdown = require('./lib/markdown'),
    level = require('./lib/level'),
    end = function() {
        process.stdout.write('\033[2J\033[0;0H');
        markdown.renderTo(fs.readFileSync('/app/levels/z-end.md'), process.stdout);

        process.exit(0);
    },
    select = function(index) {
        current = new level(index);

        current.run(next, end, select);
    },
    current,
    next;

(next = function() {
    if (!current) {
        current = new level(0);
    } else {
        current = current.next();
    }

    current.run(next, end, select);
})();
