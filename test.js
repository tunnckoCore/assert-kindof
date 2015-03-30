/**
 * assert-kindof <https://github.com/tunnckoCore/assert-kindof>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var is = require('./index');

describe('assert-kindof:', function() {
  it('is.object({}) returns true', function(done) {
    assert.strictEqual(is.object({}), true);
    done();
  });

  it('is.object(\'foo\') throws', function(done) {
    assert.throws(function _fixture() {
      is.object('foo');
    }, /to be object, but string given/);
    done();
  });

  it('is.not.object(\'foo\') returns true', function(done) {
    assert.strictEqual(is.not.object('foo'), true);
    done();
  });

  it('is.not.object({}) throws', function(done) {
    assert.throws(function _fixture() {
      is.not.object({});
    }, /not to be object, but object given/);
    done();
  });

  it('should support custom error message', function(done) {
    assert.throws(function _fixture() {
      is.object('foo', 'should be object');
    }, /should be object/);
    done();
  });

  it('should support message formatter function', function(done) {
    assert.throws(function _fixture() {
      is.object('foo', function(err) {
        return 'custom:' + err.actual + ':' + err.expected;
      });
    }, /custom:string:object/);
    done();
  });

  it('should have `is-kindof` exposed as `is.kindof`', function(done) {
    assert.strictEqual(is.kindof.object({}), true);
    assert.strictEqual(is.kindof.object('foo'), false);
    done();
  });

  it('should thrown TypeError have some useful properties', function(done) {
    try {
      is.number('foo');
    } catch(e) {
      assert.strictEqual(e instanceof TypeError, true);
      assert.strictEqual(e.actual, 'string');
      assert.strictEqual(e.expected, 'number');
      assert.strictEqual(is.kindof.number(e.line), true);
      assert.strictEqual(e.name, 'TypeError');
      assert.strictEqual(e.filename, 'test.js');
      done();
    }
  });

  it('should thrown error be instanceof TypeError', function(done) {
    assert.throws(function _fixture() {
      is.number('foo');
    }, TypeError);
    done();
  });
});
