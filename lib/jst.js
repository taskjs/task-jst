var Execution = require('execution');
var Record = require('record');
var path = require('path');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        settings: {
            label: 'Template delimiters',
            type: 'object'
        }
    },
    run: function (inputs, options, logger) {
        return this._run(inputs, options, logger);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        var jst = require('jstx');
        if(options.settings){
            jst.settings = options.settings;
        }

        var records = inputs.map(function(input){
            var originExt = path.extname(input.path);
            var compiledExt = '.js';
            return new Record({
                contents: jst(input.contents).source,
                path: input.path && input.path.replace(originExt, compiledExt)
            })
        });

        resolve(records);
    }
})
