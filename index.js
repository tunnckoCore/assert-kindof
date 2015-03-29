/**
 * assert-kindof <https://github.com/tunnckoCore/assert-kindof>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var path = require('path');
var kindof = require('kind-of');
var format = require('util').format

var assertKindof = module.exports = {};
assertKindof.not = {};

var nativeTypes = [
  'undefined',
  'null',
  'boolean',
  'buffer',
  'number',
  'string',
  // 'arguments',
  'object',
  'date',
  'array',
  'regexp',
  'function',
  'map',
  'weakmap',
  'set',
  'weakset',
  'symbol',
  'error'
];

nativeTypes.forEach(function _each(kind) {
  /**
   * Check given value against `kind` native type,
   * then throws if not okey
   *
   * @param  {*} `value`
   * @param  {String} `message`
   */
  var filepath = module.parent.filename;

  assertKindof[kind] = function(value, message) {
    var actual = kindof(value);

    if (actual === kind) {
      return true;
    }

    throw new KindError({
      filepath: filepath,
      filename: path.basename(filepath),
      actual: actual,
      expected: kind,
      message: message,
      value: value,
      not: false
    });
  };

  assertKindof.not[kind] = function(value, message) {
    var actual = kindof(value);

    if (actual !== kind) {
      return true;
    }

    throw new KindError({
      filepath: filepath,
      filename: path.basename(filepath),
      actual: actual,
      expected: kind,
      message: message,
      value: value,
      not: true
    });
  };
});

function KindError(e) {
  var eq = e.not ? '===' : '!==';
  var tobe = e.not ? 'not to be' : 'to be';
  var err = new TypeError();
  var stack = err.stack;
  var fmt = '%s:%s, expect `value` %s %s, but %s given';
  this._stack = err.stack;;

  stack = stack.slice(err.stack.indexOf(e.filepath));
  stack = stack.slice(0, stack.indexOf('\n') - 1);

  this.name = 'TypeError';
  this.line = Number(stack.match(/(\d+):\d+$/)[1]);
  this.value = e.value;
  this.actual = e.actual;
  this.expected = e.expected;

  this.problem = format('actual %s expected', eq);

  this.filepath = e.filepath;
  this.filename = e.filename;

  if (kindof(e.message) === 'function') {
    e.message = e.message(this)
  }
  this.message = e.message || format(msg, e.filename, this.line, tobe, e.expected, e.actual);

  Error.captureStackTrace(this);
}

assertKindof.a = assertKindof.an = assertKindof;
assertKindof.not.a = assertKindof.not.an = assertKindof.not;
assertKindof.a.not = assertKindof.an.not = assertKindof.not;



