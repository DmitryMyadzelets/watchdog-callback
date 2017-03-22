/*jslint browser: false*/
'use strict';

module.exports = function (tout, cb) {
    if ('function' === typeof tout) {
        cb = tout;
        tout = 5000; // default timeout
    }
    var called = false;
    var t = setTimeout(function () {
        if (!called) {
            called = true;
            cb(new Error('callback timeout'));
        }
    }, tout);

    return function () {
        clearTimeout(t);
        if (!called) {
            called = true;
            [].unshift.call(arguments, undefined);
            cb.apply(this, arguments);
        }
    };
};