!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.WithPromise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKmdsb2JhbCBQcm9taXNlKi9cbnZhciBXaXRoUHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fd2l0aF9jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLl93aXRoX3Byb21pc2UgPSBwcm9taXNlO1xufTtcblxuV2l0aFByb21pc2UucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBXaXRoUHJvbWlzZSxcbiAgICB3cmFwOiBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gbmV3IFdpdGhQcm9taXNlKHByb21pc2UsIHRoaXMuX3dpdGhfY29udGV4dCk7XG4gICAgfSxcblxuICAgIHRoZW46IGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwKHRoaXMuX3dpdGhfcHJvbWlzZS50aGVuKFxuICAgICAgICAgICAgcmVzb2x2ZSA/IHJlc29sdmUuYmluZChzZWxmLl93aXRoX2NvbnRleHQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVqZWN0ID8gcmVqZWN0LmJpbmQoc2VsZi5fd2l0aF9jb250ZXh0KSA6IHVuZGVmaW5lZFxuICAgICAgICApKTtcbiAgICB9LFxuXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwKHRoaXMuX3dpdGhfcHJvbWlzZVsnY2F0Y2gnXShuZXh0LmJpbmQoc2VsZi5fd2l0aF9jb250ZXh0KSkpO1xuICAgIH1cbn07XG5cbldpdGhQcm9taXNlLmNyZWF0ZSA9IGZ1bmN0aW9uIChleGVjdXRvciwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgV2l0aFByb21pc2UobmV3IFByb21pc2UoZXhlY3V0b3IuYmluZChjb250ZXh0KSksIGNvbnRleHQpO1xufTtcblxuV2l0aFByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgV2l0aFByb21pc2UoUHJvbWlzZS5yZXNvbHZlKHZhbHVlKSwgY29udGV4dCk7XG59O1xuXG5XaXRoUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbiAoZXJyb3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFdpdGhQcm9taXNlKFByb21pc2UucmVqZWN0KGVycm9yKSwgY29udGV4dCk7XG59O1xuXG5XaXRoUHJvbWlzZS5hbGwgPSBmdW5jdGlvbiAobGlzdCwgY29udGV4dCkge1xuICAgIHZhciBwcm9taXNlcyA9IFtdO1xuXG4gICAgaWYgKGxpc3QgJiYgbGlzdC5mb3JFYWNoKSB7XG4gICAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoVikge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChXaXRoUHJvbWlzZS5yZXNvbHZlKFYsIGNvbnRleHQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBXaXRoUHJvbWlzZShQcm9taXNlLmFsbChwcm9taXNlcyksIGNvbnRleHQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXaXRoUHJvbWlzZTsiXX0=
