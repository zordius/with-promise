!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.WithPromise=e()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module){"use strict";var WithPromise=function(promise,context){this._with_context=context,this._with_promise=promise};WithPromise.prototype={constructor:WithPromise,wrap:function(promise){return new WithPromise(promise,this)},then:function(resolve,reject){var self=this;return this.wrap(this._with_promise.then(function(){return resolve.apply(self._with_context,arguments)},reject?function(){return reject.apply(self._with_context,arguments)}:void 0))},"catch":function(next){var self=this;return this.wrap(this._with_promise["catch"](function(){return next.apply(self._with_context,arguments)}))}},WithPromise.create=function(executor,context){return new WithPromise(new Promise(function(){executor.apply(context,arguments)}),context)},WithPromise.resolve=function(value,context){return new WithPromise(Promise.resolve(value),context)},WithPromise.reject=function(error,context){return new WithPromise(Promise.reject(error),context)},module.exports=WithPromise},{}]},{},[1])(1)});