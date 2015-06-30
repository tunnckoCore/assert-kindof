/*!
 * assert-kindof <https://github.com/tunnckoCore/assert-kindof>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var extend = require('extend-shallow')
var KindError = require('kind-error')
var kindof = require('kind-of')
var is = require('is-kindof')

var methods = Object.keys(is)
var filename = lastParentFilename(module.parent)

module.exports = AssertKindof

function AssertKindof (value, types, message) {
  if (arguments.length >= 2) {
    if (!is(value, types)) {
      throw createError(value, types, message)
    }
    return true
  }
  if (!(this instanceof AssertKindof)) {
    return new AssertKindof(value)
  }
  this.value = value
}

// is(val, types, message)
// is(val).number()
// is().number(val, message)
// is.number(val, message)
methods.forEach(function (method) {
  AssertKindof[method] = function assertValue (value, message) {
    var has = Object.hasOwnProperty
    if (!arguments.length && has.call(this, 'value')) {
      if (!is(this.value, method)) {
        throw createError(this.value, method)
      }
      return true
    }
    if (!is(value, method)) {
      throw createError(value, method, message)
    }
    return true
  }
})

function createError (val, method, msg) {
  method = method[0] === 'i' && method[1] === 's' ? method.slice(2) : method

  var expected = method

  if (kindof(expected) === 'array') {
    expected = expected.join(' or ')
  }

  var meta = metadata(new TypeError())
  return new KindError(extend(meta, {
    name: 'AssertError',
    value: val,
    actual: kindof(val),
    expected: expected
  }))
}

function metadata (err) {
  var stack = err.stack || ''
  stack = stack.slice(err.stack.indexOf(filename))
  stack = stack.slice(0, stack.indexOf('\n') - 1)

  var matches = stack.match(/([^:\s]+):(\d+)(?::(\d+))$/)

  err.filepath = stack
  err.filename = matches && matches[1]
  err.line = Number(matches && matches[2])
  err.column = Number(matches && matches[3])

  return err
}

function lastParentFilename (parent) {
  if (parent && parent.parent) {
    return lastParentFilename(parent.parent)
  }
  return parent.filename
}
