(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WithPromise = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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