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
 * > Check `value` is array, if not throws AssertionError.
 *
 * **Example**
 *
 * ```js
 * is.array([1, 2, 3]) // => not throws
 * is.array(123) // => AssertionError: number !== array
 *
 * try {
 *   is.array({ foo: 'bar' }, 'expect `val` to be {expected}')
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
 * is.boolean(true) // => not throws
 * is.boolean(false) // => not throws
 * is.boolean(123) // => AssertionError: number !== boolean
 * is.boolean(null) // => AssertionError: null !== boolean
 *
 * try {
 *   is.boolean([1, 2, 3], 'expect `val` to be {expected}')
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
 * is.buffer(new Buffer('foo')) // => not throws
 * is.buffer(123) // => AssertionError: number !== buffer
 *
 * try {
 *   is.buffer(true, 'expect `val` to be {expected}')
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
 * is.date(new Date()) // => not throws
 * is.date(123) // => AssertionError: number !== date
 *
 * try {
 *   is.date({ a: 'b' }, 'expect `val` to be {expected}')
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
 * is.error(new Error()) // => not throws
 * is.error(new TypeError()) // => not throws
 * is.error(123) // => AssertionError: number !== error
 *
 * try {
 *   is.error({ a: 'b' }, 'expect `val` to be {expected}')
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
 * is.function(function noop () {}) // => not throws
 * is.function((a, b) => {}) // => not throws
 * is.function(123) // => AssertionError: number !== error
 *
 * is.function(function * noop () {})
 * // => AssertionError: generatorfunction !== function
 *
 * try {
 *   is.function({ a: 'b' }, 'expect `val` to be {expected}')
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
 * is.generator(generator) // => not throws
 * is.generator(genFn) // => AssertionError: generatorfunction !== generator
 * is.generator(noop) // => AssertionError: function !== generator
 * is.generator(123) // => AssertionError: number !== generator
 *
 * try {
 *   is.generator({ a: 'b' }, 'expect `val` to be {expected}')
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
 * is.generatorfunction(genFn) // => not throws
 *
 * is.generatorfunction(generator) // => AssertionError: generator !== generatorfunction
 * is.generatorfunction(noop) // => AssertionError: function !== generatorfunction
 * is.generatorfunction(123) // => AssertionError: number !== generatorfunction
 *
 * try {
 *   is.generatorfunction({ a: 'b' }, 'expect `val` to be {expected}')
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
 * is.map(new Map()) // => not throws
 * is.map(new WeakMap()) // => AssertionError: weakmap !== map
 * is.map(123) // => AssertionError: number !== map
 *
 * try {
 *   is.map(123, 'expect `val` to be {expected}')
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
 * is.null(null) // => not throws
 * is.null({ a: 'b' }) // => AssertionError: object !== null
 * is.null(123) // => AssertionError: number !== null
 *
 * try {
 *   is.null(123, 'expect `val` to be {expected}')
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
 * is.number(123) // => not throws
 * is.number({ a: 'b' }) // => AssertionError: object !== number
 * is.number(null) // => AssertionError: null !== number
 *
 * try {
 *   is.number([111, 222], 'expect `val` to be {expected}')
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
 * is.object({ aaa: 'bbb' }) // => not throws
 * is.object([1, 2, 3]) // => AssertionError: array !== object
 * is.object(null) // => AssertionError: null !== object
 *
 * try {
 *   is.object([111, 222], 'expect `val` to be {expected}')
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
 * is.promise(Promise.resolve(123)) // => not throws
 * is.promise(Promise.reject(new Error('foo'))) // => not throws
 *
 * is.promise(new Map()) // => AssertionError: map !== promise
 * is.promise(123) // => AssertionError: number !== promise
 *
 * try {
 *   is.promise({ a: 1 }, 'expect `val` to be {expected}')
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
 * is.regexp(/foo ba?r abz/i) // => not throws
 * is.regexp(new RegExp('aa bb')) // => not throws
 *
 * is.regexp(new Map()) // => AssertionError: map !== regexp
 * is.regexp(123) // => AssertionError: number !== regexp
 *
 * try {
 *   is.regexp({ a: 1 }, 'expect `val` to be {expected}')
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
 * is.set(new Set()) // => not throws
 * is.set(new Map()) // => AssertionError: map !== set
 * is.set(123) // => AssertionError: number !== set
 *
 * try {
 *   is.set({ a: 1 }, 'expect `val` to be {expected}')
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
 * is.stream(through2()) // => not throws
 * is.stream(through2.obj()) // => not throws
 *
 * is.stream(new Map()) // => AssertionError: map !== stream
 * is.stream(123) // => AssertionError: number !== stream
 *
 * try {
 *   is.stream({ a: 1 }, 'expect `val` to be {expected}')
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
 * is.string('foo bar baz') // => not throws
 * is.string(fn.toString()) // => not throws
 * is.string(new String('abc')) // => not throws
 *
 * is.string(new Map()) // => AssertionError: map !== string
 * is.string(123) // => AssertionError: number !== string
 *
 * try {
 *   is.string({ a: 1 }, 'expect `val` to be {expected}')
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
 *
 * ```js
 * is.symbol(Symbol()) // => not throws
 *
 * is.symbol(new Map()) // => AssertionError: map !== symbol
 * is.symbol(123) // => AssertionError: number !== symbol
 *
 * try {
 *   is.symbol({ a: 1 }, 'expect `val` to be {expected}')
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
 * is.undefined() // => not throws
 * is.undefined(undefined) // => not throws
 *
 * is.undefined(new Map()) // => AssertionError: map !== undefined
 * is.undefined(123) // => AssertionError: number !== undefined
 *
 * try {
 *   is.undefined({ a: 1 }, 'expect `val` to be {expected}')
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
 * is.weakmap(new WeakMap()) // => not throws
 *
 * is.weakmap(new WeakSet()) // => AssertionError: weakset !== weakmap
 * is.weakmap(new Map()) // => AssertionError: map !== weakmap
 * is.weakmap(123) // => AssertionError: number !== weakmap
 *
 * try {
 *   is.weakmap({ a: 1 }, 'expect `val` to be {expected}')
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
 * is.weakmap(new WeakSet()) // => not throws
 *
 * is.weakset(new WeakMap()) // => AssertionError: weakmap !== weakset
 * is.weakset(new Map()) // => AssertionError: map !== weakset
 * is.weakset(123) // => AssertionError: number !== weakset
 *
 * try {
 *   is.weakset({ a: 1 }, 'expect `val` to be {expected}')
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
