/*jslint browser: false*/
'use strict';

const wdc = require('../index.js');

var cnt = 0;
const assert = function () {
    require('assert').apply(this, arguments);
    cnt += 1;
    console.log('passed ' + cnt);
};

var payload = 'Very usefull data';
var context = {};

function immediate(cb) {
    cb(payload);
}

function delayed(cb) {
    setTimeout(function () {
        cb.call(context, payload);
    }, 1000);
}

assert('function' === typeof wdc);

immediate(wdc(function (err, data) {
    assert(!err);
    assert(data === payload);
}));


delayed(wdc(function (err, data) {
    assert(!err);
    assert(data === payload);
    assert(this === context);
}));

delayed(wdc(100, function (err, data) {
    assert(err instanceof Error);
    assert(err.message === 'callback timeout');
    assert(undefined === data);
    assert(undefined === this);
}));

