'use strict';

var assert = require('assert');
var Jst = require('../lib/jst');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Jst).run(
    [{
        contents: '<%=foo%>'
    }], // inputs
    {}, // options
    console // logger
).then(function(inputs){

}).catch(errorHandler)
