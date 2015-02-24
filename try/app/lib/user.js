var markdown = require('./markdown'),
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

module.exports = {
    choose: function(choices, callback) {
        Object.keys(choices).forEach(function(choice) {
            console.log(markdown.renderTrim('`' + choice + '`' + ': ' + choices[choice].message));
        });

        console.log(markdown.renderTrim('`[ENTER]`' + ': Continue to the next step'));

        rl.resume();

        rl.question('', function(input) {
            rl.pause();

            if (choices[input[0]] && choices[input[0]].callback) {
                choices[input[0]].callback(input);
            } else {
                callback(input);
            }
        });
    }
};
