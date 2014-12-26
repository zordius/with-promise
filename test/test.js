'use strict';

var assert = require('chai').assert,
    WithPromise = require('..');

describe('WithPromise', function () {
    it('.create() should return a promise', function (done) {
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

    it('should call .then() handler with context', function (done) {
        WithPromise.create(function (resolve, reject) {
            resolve({b: this, c: 'OK'});
        }, {a: 1}).then(function (D) {
            assert.equal(1, D.b.a);
            assert.equal('OK', D.c);
            done();
        });
    });

    it('should call .then() reject handler with context', function (done) {
        WithPromise.create(function (resolve, reject) {
            reject({b: this, c: 'OK'});
        }, {a: 1}).then(undefined, function (D) {
            assert.equal(1, D.b.a);
            assert.equal('OK', D.c);
            done();
        });
    });

    it('should call .catch() with context', function (done) {
        WithPromise.create(function (resolve, reject) {
            reject({b: this, c: 'OK'});
        }, {a: 1})['catch'](function (D) {
            assert.equal(1, D.b.a);
            assert.equal('OK', D.c);
            done();
        });
    });

    it('should keep context when .then() many times', function (done) {
        WithPromise.create(function (resolve, reject) {
            resolve({b: this, c: 'OK'});
        }, {a: 1}).then(function (D) {
            D.d = 'ya';
            D.two = this;
            return D;
        }).then(function (E) {
            assert.deepEqual({b: {a: 1 }, c:'OK', d:'ya', two:{a: 1 }}, E);
            assert.equal(1, this.a);
            done();
        });
    });

    it('.resolve() should create a resolved promise', function (done) {
        WithPromise.resolve(123, {a: 2}).then(function (D) {
            assert.equal(123, D);
            assert.equal(2, this.a);
            done();
        });
    });

    it('.reject() should create a rejected promise', function (done) {
        WithPromise.reject(123, {a: 2})['catch'](function (D) {
            assert.equal(123, D);
            assert.equal(2, this.a);
            done();
        });
    });

    it('should create a rejected promise when error in executor', function (done) {
        WithPromise.create(function () {throw new Error(123)}, {a: 2}).catch(function (E) {
            assert.equal(2, this.a);
            assert.equal(123, E.message);
            done();
        });
    });
});