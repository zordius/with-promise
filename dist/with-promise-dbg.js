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
        return new WithPromise(promise, this);
    },

    then: function (resolve, reject) {
        var self = this;
        return this.wrap(this._with_promise.then(function () {
            return resolve.apply(self._with_context, arguments);
        }, reject ? function () {
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
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLypnbG9iYWwgUHJvbWlzZSovXG52YXIgV2l0aFByb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZSwgY29udGV4dCkge1xuICAgIHRoaXMuX3dpdGhfY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fd2l0aF9wcm9taXNlID0gcHJvbWlzZTtcbn07XG5cbldpdGhQcm9taXNlLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogV2l0aFByb21pc2UsXG4gICAgd3JhcDogZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBXaXRoUHJvbWlzZShwcm9taXNlLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgdGhlbjogZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLndyYXAodGhpcy5fd2l0aF9wcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUuYXBwbHkoc2VsZi5fd2l0aF9jb250ZXh0LCBhcmd1bWVudHMpO1xuICAgICAgICB9LCByZWplY3QgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0LmFwcGx5KHNlbGYuX3dpdGhfY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICAgICAgfSA6IHVuZGVmaW5lZCkpO1xuICAgIH0sXG5cbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLndyYXAodGhpcy5fd2l0aF9wcm9taXNlWydjYXRjaCddKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmFwcGx5KHNlbGYuX3dpdGhfY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn07XG5cbldpdGhQcm9taXNlLmNyZWF0ZSA9IGZ1bmN0aW9uIChleGVjdXRvciwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgV2l0aFByb21pc2UobmV3IFByb21pc2UoZnVuY3Rpb24gKCkge1xuICAgICAgICBleGVjdXRvci5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH0pLCBjb250ZXh0KTtcbn07XG5cbldpdGhQcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFdpdGhQcm9taXNlKFByb21pc2UucmVzb2x2ZSh2YWx1ZSksIGNvbnRleHQpO1xufTtcblxuV2l0aFByb21pc2UucmVqZWN0ID0gZnVuY3Rpb24gKGVycm9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBXaXRoUHJvbWlzZShQcm9taXNlLnJlamVjdChlcnJvciksIGNvbnRleHQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXaXRoUHJvbWlzZTsiXX0=
