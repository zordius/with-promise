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
        return this.wrap(this._with_promise.then(
            resolve ? resolve.bind(self._with_context) : undefined,
            reject ? reject.bind(self._with_context) : undefined
        ));
    },

    'catch': function (next) {
        var self = this;
        return this.wrap(this._with_promise['catch'](next.bind(self._with_context)));
    }
};

WithPromise.create = function (executor, context) {
    return new WithPromise(new Promise(executor.bind(context)), context);
};

WithPromise.resolve = function (value, context) {
    return new WithPromise(Promise.resolve(value), context);
};

WithPromise.reject = function (error, context) {
    return new WithPromise(Promise.reject(error), context);
};

WithPromise.all = function (list, context) {
    var promises = [];

    if (list && list.forEach) {
        list.forEach(function (V) {
            promises.push(WithPromise.resolve(V, context));
        });
    }

    return new WithPromise(Promise.all(promises), context);
};

module.exports = WithPromise;