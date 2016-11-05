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
  return function assertIs (value, message) {
    var actual = utils.kindOf(value)
    var result = utils.is[expected](value)
    var operator = control === false ? '===' : '!=='

    if (utils.kindOf(message) === 'function') {
      message = message(actual, expected, value)
    }

    message = utils.kindOf(message) !== 'string'
      ? actual + ' ' + operator + ' ' + expected
      : message

    test(result === control, {
      actual: actual,
      expected: expected,
      operator: operator,
      value: value,
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
