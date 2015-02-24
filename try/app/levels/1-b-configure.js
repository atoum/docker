var child = require('../lib/child');

module.exports = function(prompt, php, success, fail) {
    child.spawn('cp', ['-r', '/app/assets/1-a-configure', '/tests'], function() {
        child.spawn('atoum', ['-c', php], function(code) {
            child.spawn('rm', ['-rf', '/tests']);

            prompt(function() {
                if (code == 0) {
                    success();
                } else {
                    fail();
                }
            });
        });
    });
};
