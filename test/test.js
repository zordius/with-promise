'use strict';

var assert = require('chai').assert,
    WithPromise = require('..');

describe('WithPromise', function () {
    it('should be a promise constructor', function (done) {
        var P = WithPromise.create(function () {});

        assert.equal('object', typeof P);
        assert.equal('function', typeof P.then);
        assert.equal('function', typeof P['catch']);
        done();
    });

    it('should call executor with context', function (done) {
        WithPromise.create(function (resolve, reject) {
            assert.equal(1, this.a);
            done();
        }, {a: 1});
    });
});