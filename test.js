/*!
 * assert-kindof <https://github.com/tunnckoCore/assert-kindof>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

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
