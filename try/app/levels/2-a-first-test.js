var child = require('../lib/child');

module.exports = function(prompt, php, success, fail) {
    child.spawn('atoum', ['-f', php], function(code) {
        prompt(function() {
            if (code == 0) {
                success();
            } else {
                fail();
            }
        });
    });
};
