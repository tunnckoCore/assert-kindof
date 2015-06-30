/*!
 * assert-kindof <https://github.com/tunnckoCore/assert-kindof>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

// var tape = require('tape')
var is = require('./sasasa')

// it('should test tape', function (done) {
//   var ok = true
//   var ok = true
//   var ok = true
//   is.number('foo bar', 'foo')
//   done()
// })

function failing (val) {
  is(val, ['array', 'string'])
  console.log('actual')
}

function testing () {
  var data = true
  failing(123, data)
}

try {
  testing()
} catch (e) {
  console.log(e)
}

