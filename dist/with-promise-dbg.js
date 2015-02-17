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
        return this.wrap(this._with_promise.then(
            resolve ? resolve.bind(this._with_context) : undefined,
            reject ? reject.bind(this._with_context) : undefined
        ));
    },

    'catch': function (next) {
        return this.wrap(this._with_promise['catch'](next.bind(this._with_context)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qZ2xvYmFsIFByb21pc2UqL1xudmFyIFdpdGhQcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UsIGNvbnRleHQpIHtcbiAgICB0aGlzLl93aXRoX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX3dpdGhfcHJvbWlzZSA9IHByb21pc2U7XG59O1xuXG5XaXRoUHJvbWlzZS5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IFdpdGhQcm9taXNlLFxuICAgIHdyYXA6IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgV2l0aFByb21pc2UocHJvbWlzZSwgdGhpcy5fd2l0aF9jb250ZXh0KTtcbiAgICB9LFxuXG4gICAgdGhlbjogZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwKHRoaXMuX3dpdGhfcHJvbWlzZS50aGVuKFxuICAgICAgICAgICAgcmVzb2x2ZSA/IHJlc29sdmUuYmluZCh0aGlzLl93aXRoX2NvbnRleHQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVqZWN0ID8gcmVqZWN0LmJpbmQodGhpcy5fd2l0aF9jb250ZXh0KSA6IHVuZGVmaW5lZFxuICAgICAgICApKTtcbiAgICB9LFxuXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcCh0aGlzLl93aXRoX3Byb21pc2VbJ2NhdGNoJ10obmV4dC5iaW5kKHRoaXMuX3dpdGhfY29udGV4dCkpKTtcbiAgICB9XG59O1xuXG5XaXRoUHJvbWlzZS5jcmVhdGUgPSBmdW5jdGlvbiAoZXhlY3V0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFdpdGhQcm9taXNlKG5ldyBQcm9taXNlKGV4ZWN1dG9yLmJpbmQoY29udGV4dCkpLCBjb250ZXh0KTtcbn07XG5cbldpdGhQcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFdpdGhQcm9taXNlKFByb21pc2UucmVzb2x2ZSh2YWx1ZSksIGNvbnRleHQpO1xufTtcblxuV2l0aFByb21pc2UucmVqZWN0ID0gZnVuY3Rpb24gKGVycm9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBXaXRoUHJvbWlzZShQcm9taXNlLnJlamVjdChlcnJvciksIGNvbnRleHQpO1xufTtcblxuV2l0aFByb21pc2UuYWxsID0gZnVuY3Rpb24gKGxpc3QsIGNvbnRleHQpIHtcbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcblxuICAgIGlmIChsaXN0ICYmIGxpc3QuZm9yRWFjaCkge1xuICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKFYpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goV2l0aFByb21pc2UucmVzb2x2ZShWLCBjb250ZXh0KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV2l0aFByb21pc2UoUHJvbWlzZS5hbGwocHJvbWlzZXMpLCBjb250ZXh0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV2l0aFByb21pc2U7Il19
