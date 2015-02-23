#!/usr/bin/env nodejs

var marked = require('marked'),
    TerminalRenderer = require('marked-terminal'),
    child_process = require('child_process'),
    tty = require('tty'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    readline = require('readline'),
    spawn = function(command, args, cb) {
        var child = child_process.spawn(command, args, {
                stdio: 'inherit',
                cwd: '/sandbox'
            });

        child.on('exit', function(code) {
            (cb || function() {})(code);
        });
    },
    level = function(current) {
        glob('/app/levels/' + current + '-*.md', {}, function (er, files) {
            if (fs.existsSync(files[0]) === false) {
                console.log('\033[2J\033[0;0H');
                console.log(marked(fs.readFileSync('/app/levels/z-end.md').toString()));

                return;
            }

            var infos = {
                dir: path.dirname(files[0]),
                name: path.basename(files[0], '.md')
            }

            console.log('\033[2J\033[0;0H');
            console.log(marked(fs.readFileSync(files[0]).toString()));

            prompt(function() {
                var php = path.join('/app/sandbox', infos.name + '.php'),
                    js = path.join(infos.dir, infos.name + '.js'),
                    run = function() {
                        edit(php, function(code) {
                            if(fs.existsSync(js)) {
                                setTimeout(
                                    function() {
                                        test(
                                            js, php, spawn, prompt,
                                            function() { level(current + 1); },
                                            function() { run(); }
                                        );
                                    },
                                    500
                                );
                            } else {
                                level(current + 1);
                            }
                        });
                    }

                if(fs.existsSync(php)) {
                    fs.createReadStream(php).pipe(fs.createWriteStream(php = path.join('/sandbox', infos.name + '.php')));

                    run();
                } else {
                    level(current + 1);
                }
            });
        });
    },
    edit = function(filename, callback) {
        spawn('vim', [filename], callback);
    },
    test = function(js, php, spawn, prompt, success, fail) {
        require(js)(spawn, prompt, php, success, fail);
    },
    prompt = function(callback) {
        rl.resume();

        rl.question('Press [ENTER] to continue', function() {
            rl.pause();

            callback();
        });
    },
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


marked.setOptions({
    renderer: new TerminalRenderer()
});

level(0);
