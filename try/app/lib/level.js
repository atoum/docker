var fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    user = require('./user'),
    child = require('./child'),
    markdown = require('./markdown'),
    level = module.exports = function(index) {
        var files = [],
            current = -1;

        var run = function(next, end, select) {
                ++current;

                if (files.length === 0) {
                    end();
                }

                if (!files[current]) {
                    next();
                } else {
                    var infos = {
                        dir: path.dirname(files[current]),
                        name: path.basename(files[current], '.md')
                    };

                    process.stdout.write('\033[2J\033[0;0H');
                    markdown.renderTo(fs.readFileSync(files[current]).toString(), process.stdout);

                    prompt(
                        function() {
                            var php = path.join('/app', 'assets', infos.name + '.php'),
                                js = path.join(infos.dir, infos.name + '.js'),
                                execute = function() {
                                    edit(php, function() {
                                        if(fs.existsSync(js)) {
                                            setTimeout(
                                                function() {
                                                    test(
                                                        function(callback) {
                                                            prompt(callback, select)
                                                        },
                                                        js, php,
                                                        function() { run(next, end, select); },
                                                        function() { execute(); }
                                                    );
                                                },
                                                500
                                            );
                                        } else {
                                            run(next, end, select);
                                        }
                                    });
                                };

                            if(fs.existsSync(php)) {
                                fs.createReadStream(php).pipe(fs.createWriteStream(php = path.join('/sandbox', infos.name + '.php')));

                                execute();
                            } else {
                                run(next, end, select);
                            }
                        },
                        next, end, select
                    );
                }
            },
            edit = function(filename, callback) {
                child.spawn('vim', [filename], callback);
            },
            test = function(prompt, js, php, success, fail) {
                require(js)(prompt, php, success, fail);
            },
            restart = function(next, end, select) {
                current = -1;

                run(next, end, select);
            },
            prompt = function(callback, next, end, select) {
                user.choose(
                    {
                        r: {
                            message: 'Replay the current step',
                            callback: function() { restart(next, end, select) }
                        },
                        g: {
                            message: 'Go to the given step (For example `g2` will bring you to the second step)',
                            callback: function(input) { select(input.slice(1)); }
                        },
                        q: {
                            message: 'Quit the tutorial',
                            callback: function() { process.exit(0); }
                        }
                    },
                    callback
                );
            };

        return {
            next: function() {
                return new level(++index);
            },

            run: function(next, end, select) {
                glob('/app/levels/' + index + '-*.md', {}, function (er, mds) {
                    files = mds;

                    run(next, end, select);
                });
            }
        }
    };
