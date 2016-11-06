/*!
 * assert-kindof <https://github.com/tunnckoCore/assert-kindof>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var assert = require('assert')
var utils = require('./utils')

/**
 * > Testing if `ok` not truthy, throw AssertionError,
 * adds actual value to the error object and cleans the stack trace
 *
 * @param  {Boolean} `ok`
 * @param  {Object} `opts`
 * @return {Undefined} or throws the AssertionError
 * @api private
 */

function test (ok, opts) {
  if (!ok) {
    var err = new assert.AssertionError(opts)
    err.value = opts.value
    err.stack = utils.cleanStack(err.stack)
    throw err
  }
}

/**
 * > Creates exported methods. Such as `assert.strictEqual`, in
 * the context of `assert-kindof` it is like `is.object(val)`,
 * `is.number(val)`, `is.null(val)` or negative `is.not.null(val)` and
 * etc.
 *
 * @param  {String} `type` type of the given value
 * @param  {Boolean} `control` is normal or `is.not.object` for example
 * @return {Function} `fn` actual exported method to check type of some value
 * @api private
 */

function check (expected, control) {
  /**
   * > Type checking which throws AssertionError
   * if `value` not match to wanted type.
   *
   * **Example**
   *
   * ```js
   * var is = require('assert-kindof')
   *
   * is.object(123) // => AssertionError: number !== object
   * is.object(null) // => AssertionError: null !== object
   *
   * is.object({ foo: 'bar' }) // => nothing
   *
   * is.date('foo') // => AssertionError: string !== date
   * is.date(new Date()) // => nothing
   * ```
   *
   * @param  {Any} `value` value to be checked
   * @param  {String|Function} `message` if function, called with `fn(actual, expected, value)` signature
   */

  return function assertIs (value, message) {
    var actual = utils.kindOf(value)
    var result = utils.is[expected](value)
    var operator = control === false ? '===' : '!=='

    if (utils.kindOf(message) === 'function') {
      message = message(actual, expected, value)
    }

    message = utils.kindOf(message) === 'string'
      ? utils.format(message, { expected: expected, actual: actual })
      : actual + ' ' + operator + ' ' + expected

    test(result === control, {
      value: value,
      actual: actual,
      expected: expected,
      operator: operator,
      message: message,
      stackStartFunction: assertIs
    })
  }
}

/**
 * Expose method for each type.
 *
 * @type {Object}
 */

var assertKindof = module.exports

/**
 * Expose "not" modifier for negations.
 *
 * @type {Object}
 */

assertKindof.not = {}

Object.keys(utils.is).forEach(function (type) {
  assertKindof[type] = check(type, true)
  assertKindof.not[type] = check(type, false)
})

/**
 * > All methods from [is-kindof][] are also exposed,
 * so check its docs. That `.is` is object with methods
 * with same names as in this package.
 *
 * **Example**
 *
 * ```js
 * var assertKindof = require('assert-kindof')
 *
 * assertKindof.is.array(123) // => false
 * assertKindof.is.array([11, 22, 33]) // => true
 *
 * assertKindof.array([11, 22, 33]) // => not throws
 *
 * try {
 *   assertKindof.array(123) // => AssertionError: number !== array
 * } catch (err) {
 *   console.log(err.message) // => 'number !== array'
 * }
 * ```
 *
 * @name .is
 * @type {Object}
 * @api public
 */

assertKindof.is = utils.is

/**
 * > Check `value` is array, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.array([1, 2, 3]) // => not throws
 * assert.array(123) // => AssertionError: number !== array
 *
 * try {
 *   assert.array({ foo: 'bar' }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be array'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => array
 *   console.log(err.value) // => { foo: 'bar' }
 * }
 * ```
 *
 * @name  .array
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is boolean, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.boolean(true) // => not throws
 * assert.boolean(false) // => not throws
 * assert.boolean(123) // => AssertionError: number !== boolean
 * assert.boolean(null) // => AssertionError: null !== boolean
 *
 * try {
 *   assert.boolean([1, 2, 3], 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be boolean'
 *   console.log(err.actual) // => array
 *   console.log(err.expected) // => boolean
 *   console.log(err.value) // => [1, 2, 3]
 * }
 * ```
 *
 * @name  .boolean
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is buffer, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.buffer(new Buffer('foo')) // => not throws
 * assert.buffer(123) // => AssertionError: number !== buffer
 *
 * try {
 *   assert.buffer(true, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be buffer'
 *   console.log(err.actual) // => boolean
 *   console.log(err.expected) // => buffer
 *   console.log(err.value) // => true
 * }
 * ```
 *
 * @name  .buffer
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is date, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.date(new Date()) // => not throws
 * assert.date(123) // => AssertionError: number !== date
 *
 * try {
 *   assert.date({ a: 'b' }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be date'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => date
 *   console.log(err.value) // => { a: 'b' }
 * }
 * ```
 *
 * @name  .date
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is error, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.error(new Error()) // => not throws
 * assert.error(new TypeError()) // => not throws
 * assert.error(123) // => AssertionError: number !== error
 *
 * try {
 *   assert.error({ a: 'b' }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be error'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => error
 *   console.log(err.value) // => { a: 'b' }
 * }
 * ```
 *
 * @name  .error
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is function, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.function(function noop () {}) // => not throws
 * assert.function((a, b) => {}) // => not throws
 * assert.function(123) // => AssertionError: number !== error
 *
 * assert.function(function * noop () {})
 * // => AssertionError: generatorfunction !== function
 *
 * try {
 *   assert.function({ a: 'b' }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be function'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => function
 *   console.log(err.value) // => { a: 'b' }
 * }
 * ```
 *
 * @name  .function
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is generator, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var generator = (function * gen () { yield 42 })()
 * var genFn = function * genFn () {}
 * var noop = () => { return 123 }
 *
 * assert.generator(generator) // => not throws
 * assert.generator(genFn) // => AssertionError: generatorfunction !== generator
 * assert.generator(noop) // => AssertionError: function !== generator
 * assert.generator(123) // => AssertionError: number !== generator
 *
 * try {
 *   assert.generator({ a: 'b' }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be generator'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => generator
 *   console.log(err.value) // => { a: 'b' }
 * }
 * ```
 *
 * @name  .generator
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is generator function, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var generator = (function * gen () { yield 42 })()
 * var genFn = function * genFn () {}
 * var noop = () => { return 123 }
 *
 * assert.generatorfunction(genFn) // => not throws
 *
 * assert.generatorfunction(generator) // => AssertionError: generator !== generatorfunction
 * assert.generatorfunction(noop) // => AssertionError: function !== generatorfunction
 * assert.generatorfunction(123) // => AssertionError: number !== generatorfunction
 *
 * try {
 *   assert.generatorfunction({ a: 'b' }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be generatorfunction'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => generatorfunction
 *   console.log(err.value) // => { a: 'b' }
 * }
 * ```
 *
 * @name  .generatorfunction
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is ES2015/ES6 Map, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.map(new Map()) // => not throws
 * assert.map(new WeakMap()) // => AssertionError: weakmap !== map
 * assert.map(123) // => AssertionError: number !== map
 *
 * try {
 *   assert.map(123, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be map'
 *   console.log(err.actual) // => number
 *   console.log(err.expected) // => map
 *   console.log(err.value) // => { a: 'b' }
 * }
 * ```
 *
 * @name  .map
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is null, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.null(null) // => not throws
 * assert.null({ a: 'b' }) // => AssertionError: object !== null
 * assert.null(123) // => AssertionError: number !== null
 *
 * try {
 *   assert.null(123, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be null'
 *   console.log(err.actual) // => number
 *   console.log(err.expected) // => null
 *   console.log(err.value) // => 123
 * }
 * ```
 *
 * @name  .null
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is number, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.number(123) // => not throws
 * assert.number({ a: 'b' }) // => AssertionError: object !== number
 * assert.number(null) // => AssertionError: null !== number
 *
 * try {
 *   assert.number([111, 222], 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be number'
 *   console.log(err.actual) // => array
 *   console.log(err.expected) // => number
 *   console.log(err.value) // => [111, 222]
 * }
 * ```
 *
 * @name  .number
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is object, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.object({ aaa: 'bbb' }) // => not throws
 * assert.object([1, 2, 3]) // => AssertionError: array !== object
 * assert.object(null) // => AssertionError: null !== object
 *
 * try {
 *   assert.object([111, 222], 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be object'
 *   console.log(err.actual) // => array
 *   console.log(err.expected) // => object
 *   console.log(err.value) // => [111, 222]
 * }
 * ```
 *
 * @name  .object
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is promise, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.promise(Promise.resolve(123)) // => not throws
 * assert.promise(Promise.reject(new Error('foo'))) // => not throws
 *
 * assert.promise(new Map()) // => AssertionError: map !== promise
 * assert.promise(123) // => AssertionError: number !== promise
 *
 * try {
 *   assert.promise({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be promise'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => promise
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .promise
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is regexp, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.regexp(/foo ba?r abz/i) // => not throws
 * assert.regexp(new RegExp('aa bb')) // => not throws
 *
 * assert.regexp(new Map()) // => AssertionError: map !== regexp
 * assert.regexp(123) // => AssertionError: number !== regexp
 *
 * try {
 *   assert.regexp({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be regexp'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => regexp
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .regexp
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is ES2015/ES6 Set, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.set(new Set()) // => not throws
 * assert.set(new Map()) // => AssertionError: map !== set
 * assert.set(123) // => AssertionError: number !== set
 *
 * try {
 *   assert.set({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be set'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => set
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .set
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is stream, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var through2 = require('through2')
 * assert.stream(through2()) // => not throws
 * assert.stream(through2.obj()) // => not throws
 *
 * assert.stream(new Map()) // => AssertionError: map !== stream
 * assert.stream(123) // => AssertionError: number !== stream
 *
 * try {
 *   assert.stream({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be stream'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => stream
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .stream
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is string, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var fn = function aa () { return 123 }
 * assert.string('foo bar baz') // => not throws
 * assert.string(fn.toString()) // => not throws
 * assert.string(new String('abc')) // => not throws
 *
 * assert.string(new Map()) // => AssertionError: map !== string
 * assert.string(123) // => AssertionError: number !== string
 *
 * try {
 *   assert.string({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be string'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => string
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .string
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is Symbol, if not throws AssertionError.
 *
 * **Example**

 * var assert = require('assert-kindof')*
 * ```js
 * assert.symbol(Symbol()) // => not throws
 *
 * assert.symbol(new Map()) // => AssertionError: map !== symbol
 * assert.symbol(123) // => AssertionError: number !== symbol
 *
 * try {
 *   assert.symbol({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be symbol'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => symbol
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .symbol
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is undefined, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.undefined() // => not throws
 * assert.undefined(undefined) // => not throws
 *
 * assert.undefined(new Map()) // => AssertionError: map !== undefined
 * assert.undefined(123) // => AssertionError: number !== undefined
 *
 * try {
 *   assert.undefined({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be undefined'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => undefined
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .undefined
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is ES2015/ES6 WeakMap, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.weakmap(new WeakMap()) // => not throws
 *
 * assert.weakmap(new WeakSet()) // => AssertionError: weakset !== weakmap
 * assert.weakmap(new Map()) // => AssertionError: map !== weakmap
 * assert.weakmap(123) // => AssertionError: number !== weakmap
 *
 * try {
 *   assert.weakmap({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be weakmap'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => weakmap
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .weakmap
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */

/**
 * > Check `value` is ES2015/ES6 WeakSet, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * var assert = require('assert-kindof')
 * assert.weakmap(new WeakSet()) // => not throws
 *
 * assert.weakset(new WeakMap()) // => AssertionError: weakmap !== weakset
 * assert.weakset(new Map()) // => AssertionError: map !== weakset
 * assert.weakset(123) // => AssertionError: number !== weakset
 *
 * try {
 *   assert.weakset({ a: 1 }, 'expect `val` to be {expected}')
 * } catch (err) {
 *   console.log(err.message) // => 'expect `val` to be weakset'
 *   console.log(err.actual) // => object
 *   console.log(err.expected) // => weakset
 *   console.log(err.value) // => { a: 1 }
 * }
 * ```
 *
 * @name  .weakset
 * @param {any} `value` value to be checked
 * @param {String|Function} `message` error message; if function
 *                                    gets `fn(actual, expected, value)` signature
 * @return {Undefined} nothing is returned, throws if not okey
 * @api public
 */
