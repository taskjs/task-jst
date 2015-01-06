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
        },
        namespace: {
            label: 'Global namespace',
            type: 'string'
        },
        wrapper: {
            label: 'Module wrapper',
            select: ['amd', 'kmd']
        }
    },
    run: function (inputs, options, logger) {
        return this._run(inputs, options, logger);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;
        var wrapper = options.wrapper;
        var namespace = options.namespace;

        var jst = require('jstx');
        if(options.settings){
            jst.settings = options.settings;
        }

        var records = inputs.map(function(input){
            var originExt = path.extname(input.path);
            var compiledExt = '.js';
            var compiled = jst(input.contents).source.trim();
            var output = [];

            if (namespace && input.path) {
                var nsInfo = getNamespaceDeclaration(namespace);
                output.push(nsInfo.declaration);
            }

            if(wrapper == 'kmd'){
                output.unshift('KISSY.add(function(){');
                output.push('return ');
                output.push(nsInfo.namespace+'['+JSON.stringify(input.path)+']=' + compiled);
                output.push("});");
            }else if(wrapper == 'amd'){
                output.unshift("define(function(){");
                output.push('return ');
                output.push(nsInfo.namespace+'['+JSON.stringify(input.path)+']=' + compiled);
                output.push("});");
            }else{
                output.push(nsInfo.namespace+'['+JSON.stringify(input.path)+']=' + compiled);
            }

            return new Record({
                contents: output.join(''),
                path: input.path && input.path.replace(originExt, compiledExt)
            })
        });

        resolve(records);
    }
})


function getNamespaceDeclaration(ns) {
    var output = [];
    var curPath = 'this';
    if (ns !== 'this') {
        var nsParts = ns.split('.');
        nsParts.forEach(function(curPart, index) {
            if (curPart !== 'this') {
                curPath += '[' + JSON.stringify(curPart) + ']';
                output.push(curPath + ' = ' + curPath + ' || {};');
            }
        });
    }

    return {
        namespace: curPath,
        declaration: output.join('\n')
    }
}

