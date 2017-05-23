/*jslint browser: false*/
'use strict';

const assert = require('assert');
const wdc = require('../index.js');

console.log('Expected 16 test passed');

// ============================================================================
// Simple testing framework

function setHook(o, fun) {
    // Create hooks for every function
    Object.getOwnPropertyNames(o).forEach(function (key) {
        if ('function' === typeof o[key]) {
            const f = o[key];
            o[key] = function () {
                fun();
                return f.apply(this, arguments);
            };
        }
    });
}

// Set hook for every method of the 'assert'
// Warning: Doesn't hooks assert itself, use assert.ok()
(function () {
    var cnt = 0;
    setHook(assert, function () {
        cnt += 1;
        console.log('passed', cnt);
    });
}());


// ============================================================================

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

assert.ok('function' === typeof wdc);

immediate(wdc(function (tout, data) {
    assert.ok(!tout);
    assert.equal(data, payload);
}));


delayed(wdc(function (tout, data) {
    assert.ok(!tout);
    assert.equal(data, payload);
    assert.equal(this, context);
}));


delayed(wdc(100, function (tout, data) {
    assert.ok(tout instanceof Error);
    assert.equal(tout.message, 'callback timeout');
    assert.equal(undefined, data);
    assert.equal(undefined, this);
}));


// Check the user's error is always at the second place, if used timeout

const error = new Error('some error');

(function (cb) {
    cb(null, payload);
}(wdc(function (tout, err, data) {
    assert.ok(!tout);
    assert.ok(!err);
    assert.equal(data, payload);
})));


(function (cb) {
    cb(error, payload);
}(wdc(function (tout, err, data) {
    assert.ok(!tout);
    assert.equal(err, error);
    assert.equal(data, payload);
})));