/*!
 * assert-kindof <https://github.com/tunnckoCore/assert-kindof>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var util = require('util')
var test = require('mukla')
var is = require('./index')

test('should throws if not okey', function (done) {
  try {
    is.object(null)
  } catch (err) {
    test.strictEqual(err.message, 'null !== object')
    test.strictEqual(err.actual, 'null')
    test.strictEqual(err.expected, 'object')
  }
  done()
})

test('should throws if negation not okey', function (done) {
  try {
    is.not.number(123)
  } catch (err) {
    test.strictEqual(err.message, 'number === number')
  }
  done()
})

test('should not throw if okey', function (done) {
  is.string('foo')
  done()
})

test('should allow custom assertion message', function (done) {
  var msg = 'expect a function, but got object'
  try {
    is.function({ foo: 'barrr' }, msg)
  } catch (err) {
    test.strictEqual(err.message, msg)
    test.strictEqual(err.value.foo, 'barrr')
  }
  done()
})

test('should allow msg to be function', function (done) {
  try {
    is.number({ aa: 'bb' }, function (actual, expected, value) {
      test.strictEqual(actual, 'object')
      test.strictEqual(expected, 'number')
      test.strictEqual(value.aa, 'bb')
      return 'expect value to be ' + expected + ', but got ' + util.inspect(value)
    })
  } catch (err) {
    test.strictEqual(/expect value to be number, but got/.test(err.message), true)
  }
  done()
})
