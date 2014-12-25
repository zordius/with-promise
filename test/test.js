'use strict';

var assert = require('chai').assert,
    WithPromise = require('..');

describe('WithPromise', function () {
    it('should be a promise constructor', function (done) {
        var P = new WithPromise(function () {});

        assert.equal('object', typeof P);
        done();
    });
});