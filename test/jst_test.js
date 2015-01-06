'use strict';

var assert = require('assert');
var Jst = require('../lib/jst');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Jst).run(
    [{
        path: 'foo/bar-jst.html',
        contents: '<%=foo%>'
    }], // inputs
    {
        wrapper: 'kmd'
    }, // options
    console // logger
).then(function(inputs){
    console.log(inputs[0].toString())
}).catch(errorHandler)
