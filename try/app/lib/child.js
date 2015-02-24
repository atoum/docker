var child_process = require('child_process');

module.exports = {
    spawn: function(command, args, cb) {
        var child = child_process.spawn(
            command, args,
            {
                stdio: 'inherit',
                cwd: '/sandbox'
            }
        );

        child.on('exit', function(code) {
            (cb || function() {})(code);
        });
    }
};
