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
 * > Creates options object passed to AssertionError.
 *
 * @param  {String} `actual` type of the actual value
 * @param  {String} `expected` type of the expected
 * @param  {String} `operator`
 * @param  {Any} `value` actually passed value, not it's type
 * @param  {Function} `fn` stack start function
 * @return {Object} options object to be passed
 * @api private
 */

function create (actual, expected, operator, value, fn) {
  return {
    actual: actual,
    expected: expected,
    operator: operator,
    value: value,
    message: actual + ' ' + operator + ' ' + expected,
    stackStartFunction: fn
  }
}

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
 * @param  {[type]} `control` is normal or `is.not.object` for example
 * @return {Function} `fn` actual exported method to check type of some value
 * @api private
 */

function check (type, control) {
  return function assertIs (value) {
    var actual = utils.kindOf(value)
    var result = utils.is[type](value)
    var operator = control === false ? '===' : '!=='
    var options = create(actual, type, operator, value, assertIs)

    test(result === control, options)
  }
}

var assertKindof = module.exports
assertKindof.not = {}

Object.keys(utils.is).forEach(function (type) {
  assertKindof[type] = check(type, true)
  assertKindof.not[type] = check(type, false)
})
