'use strict';

/*global Promise*/
var WithPromise = function (promise, context) {
    this._with_context = context;
    this._with_promise = promise;
};

WithPromise.prototype = {
    constructor: WithPromise,
    wrap: function (promise) {
        return new WithPromise(promise, this._with_context);
    },

    then: function (resolve, reject) {
        var self = this;
        return this.wrap(this._with_promise.then(resolve ? function () {
            return resolve.apply(self._with_context, arguments);
        } : undefined, reject ? function () {
            return reject.apply(self._with_context, arguments);
        } : undefined));
    },

    'catch': function (next) {
        var self = this;
        return this.wrap(this._with_promise['catch'](function () {
            return next.apply(self._with_context, arguments);
        }));
    }
};

WithPromise.create = function (executor, context) {
    return new WithPromise(new Promise(function () {
        executor.apply(context, arguments);
    }), context);
};

WithPromise.resolve = function (value, context) {
    return new WithPromise(Promise.resolve(value), context);
};

WithPromise.reject = function (error, context) {
    return new WithPromise(Promise.reject(error), context);
};

module.exports = WithPromise;