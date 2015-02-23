module.exports = function(spawn, prompt, php, success, fail) {
    spawn('cp', ['-r', '/app/sandbox/dummies', '/sandbox'], function() {
        spawn('atoum', ['-c', php], function(code) {
            spawn('rm', ['-rf', '/sandbox/dummies']);
            
            prompt(function() {
                if (code == 0) {
                    success();
                } else {
                    fail();
                }
            });
        });
    });
}
