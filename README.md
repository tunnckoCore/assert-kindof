# assert-kindof [![NPM version](https://img.shields.io/npm/v/assert-kindof.svg?style=flat)](https://www.npmjs.com/package/assert-kindof) [![mit license][license-img]][license-url] [![NPM monthly downloads](https://img.shields.io/npm/dm/assert-kindof.svg?style=flat)](https://npmjs.org/package/assert-kindof) [![npm total downloads][downloads-img]][downloads-url]

> Check native type of value and throw AssertionError if not okey. Clean stack traces. Simplicity. Built on [is-kindof][].

[![code climate][codeclimate-img]][codeclimate-url] 
[![code style][standard-img]][standard-url] 
[![linux build][travis-img]][travis-url] 
[![windows build][appveyor-img]][appveyor-url] 
[![code coverage][coverage-img]][coverage-url] 
[![dependency status][david-img]][david-url]
[![paypal donate][paypalme-img]][paypalme-url] 

You might also be interested in [kind-of-extra](https://github.com/tunnckocore/kind-of-extra#readme).

## Highlights
- **simplicity:** pretty simple and stable codebase, built on [kind-of][] and [kind-of-extra][]
- **flexibility:** expose methods for each javascript type, using [kind-of-types][]
- **better coverage:** ensures that your code will not have many branches
- **clean stack traces:** clean and small stack traces, using [clean-stacktrace][]
- **type checking:** exposes [is-kindof][] methods for returning booleans
- **negations:** support "not" modifier, e.g. `is.not.array(val)`
- **errors:** enhanced error objects with `actual`, `expected`, `operator` and `value` props
- **messages:** customizable and clean error messages

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
  * [.is](#is)
  * [.array](#array)
  * [.boolean](#boolean)
  * [.buffer](#buffer)
  * [.date](#date)
  * [.error](#error)
  * [.function](#function)
  * [.generator](#generator)
  * [.generatorfunction](#generatorfunction)
  * [.map](#map)
  * [.null](#null)
  * [.number](#number)
  * [.object](#object)
  * [.promise](#promise)
  * [.regexp](#regexp)
  * [.set](#set)
  * [.stream](#stream)
  * [.string](#string)
  * [.symbol](#symbol)
  * [.undefined](#undefined)
  * [.weakmap](#weakmap)
  * [.weakset](#weakset)
- [Related](#related)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install
Install with [npm](https://www.npmjs.com/)

```
$ npm install assert-kindof --save
```

or install using [yarn](https://yarnpkg.com)

```
$ yarn add assert-kindof
```

## Usage
> For more use-cases see the [tests](test.js)

```js
const assertKindof = require('assert-kindof')
```

## API

### [.is](index.js#L139)
> All methods from [is-kindof][] are also exposed, so check its docs. That `.is` is object with methods with same names as in this package.

**Example**

```js
var assertKindof = require('assert-kindof')

assertKindof.is.array(123) // => false
assertKindof.is.array([11, 22, 33]) // => true

assertKindof.array([11, 22, 33]) // => not throws

try {
  assertKindof.array(123) // => AssertionError: number !== array
} catch (err) {
  console.log(err.message) // => 'number !== array'
}
```

### [.array](index.js#L169)
> Check `value` is array, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.array([1, 2, 3]) // => not throws
assert.array(123) // => AssertionError: number !== array

try {
  assert.array({ foo: 'bar' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be array'
  console.log(err.actual) // => object
  console.log(err.expected) // => array
  console.log(err.value) // => { foo: 'bar' }
}
```

### [.boolean](index.js#L199)
> Check `value` is boolean, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.boolean(true) // => not throws
assert.boolean(false) // => not throws
assert.boolean(123) // => AssertionError: number !== boolean
assert.boolean(null) // => AssertionError: null !== boolean

try {
  assert.boolean([1, 2, 3], 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be boolean'
  console.log(err.actual) // => array
  console.log(err.expected) // => boolean
  console.log(err.value) // => [1, 2, 3]
}
```

### [.buffer](index.js#L227)
> Check `value` is buffer, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.buffer(new Buffer('foo')) // => not throws
assert.buffer(123) // => AssertionError: number !== buffer

try {
  assert.buffer(true, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be buffer'
  console.log(err.actual) // => boolean
  console.log(err.expected) // => buffer
  console.log(err.value) // => true
}
```

### [.date](index.js#L255)
> Check `value` is date, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.date(new Date()) // => not throws
assert.date(123) // => AssertionError: number !== date

try {
  assert.date({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be date'
  console.log(err.actual) // => object
  console.log(err.expected) // => date
  console.log(err.value) // => { a: 'b' }
}
```

### [.error](index.js#L284)
> Check `value` is error, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.error(new Error()) // => not throws
assert.error(new TypeError()) // => not throws
assert.error(123) // => AssertionError: number !== error

try {
  assert.error({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be error'
  console.log(err.actual) // => object
  console.log(err.expected) // => error
  console.log(err.value) // => { a: 'b' }
}
```

### [.function](index.js#L316)
> Check `value` is function, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.function(function noop () {}) // => not throws
assert.function((a, b) => {}) // => not throws
assert.function(123) // => AssertionError: number !== error

assert.function(function * noop () {})
// => AssertionError: generatorfunction !== function

try {
  assert.function({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be function'
  console.log(err.actual) // => object
  console.log(err.expected) // => function
  console.log(err.value) // => { a: 'b' }
}
```

### [.generator](index.js#L349)
> Check `value` is generator, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var generator = (function * gen () { yield 42 })()
var genFn = function * genFn () {}
var noop = () => { return 123 }

assert.generator(generator) // => not throws
assert.generator(genFn) // => AssertionError: generatorfunction !== generator
assert.generator(noop) // => AssertionError: function !== generator
assert.generator(123) // => AssertionError: number !== generator

try {
  assert.generator({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be generator'
  console.log(err.actual) // => object
  console.log(err.expected) // => generator
  console.log(err.value) // => { a: 'b' }
}
```

### [.generatorfunction](index.js#L383)
> Check `value` is generator function, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var generator = (function * gen () { yield 42 })()
var genFn = function * genFn () {}
var noop = () => { return 123 }

assert.generatorfunction(genFn) // => not throws

assert.generatorfunction(generator) // => AssertionError: generator !== generatorfunction
assert.generatorfunction(noop) // => AssertionError: function !== generatorfunction
assert.generatorfunction(123) // => AssertionError: number !== generatorfunction

try {
  assert.generatorfunction({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be generatorfunction'
  console.log(err.actual) // => object
  console.log(err.expected) // => generatorfunction
  console.log(err.value) // => { a: 'b' }
}
```

### [.map](index.js#L412)
> Check `value` is ES2015/ES6 Map, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.map(new Map()) // => not throws
assert.map(new WeakMap()) // => AssertionError: weakmap !== map
assert.map(123) // => AssertionError: number !== map

try {
  assert.map(123, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be map'
  console.log(err.actual) // => number
  console.log(err.expected) // => map
  console.log(err.value) // => { a: 'b' }
}
```

### [.null](index.js#L441)
> Check `value` is null, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.null(null) // => not throws
assert.null({ a: 'b' }) // => AssertionError: object !== null
assert.null(123) // => AssertionError: number !== null

try {
  assert.null(123, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be null'
  console.log(err.actual) // => number
  console.log(err.expected) // => null
  console.log(err.value) // => 123
}
```

### [.number](index.js#L470)
> Check `value` is number, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.number(123) // => not throws
assert.number({ a: 'b' }) // => AssertionError: object !== number
assert.number(null) // => AssertionError: null !== number

try {
  assert.number([111, 222], 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be number'
  console.log(err.actual) // => array
  console.log(err.expected) // => number
  console.log(err.value) // => [111, 222]
}
```

### [.object](index.js#L499)
> Check `value` is object, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.object({ aaa: 'bbb' }) // => not throws
assert.object([1, 2, 3]) // => AssertionError: array !== object
assert.object(null) // => AssertionError: null !== object

try {
  assert.object([111, 222], 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be object'
  console.log(err.actual) // => array
  console.log(err.expected) // => object
  console.log(err.value) // => [111, 222]
}
```

### [.promise](index.js#L530)
> Check `value` is promise, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.promise(Promise.resolve(123)) // => not throws
assert.promise(Promise.reject(new Error('foo'))) // => not throws

assert.promise(new Map()) // => AssertionError: map !== promise
assert.promise(123) // => AssertionError: number !== promise

try {
  assert.promise({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be promise'
  console.log(err.actual) // => object
  console.log(err.expected) // => promise
  console.log(err.value) // => { a: 1 }
}
```

### [.regexp](index.js#L561)
> Check `value` is regexp, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.regexp(/foo ba?r abz/i) // => not throws
assert.regexp(new RegExp('aa bb')) // => not throws

assert.regexp(new Map()) // => AssertionError: map !== regexp
assert.regexp(123) // => AssertionError: number !== regexp

try {
  assert.regexp({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be regexp'
  console.log(err.actual) // => object
  console.log(err.expected) // => regexp
  console.log(err.value) // => { a: 1 }
}
```

### [.set](index.js#L590)
> Check `value` is ES2015/ES6 Set, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.set(new Set()) // => not throws
assert.set(new Map()) // => AssertionError: map !== set
assert.set(123) // => AssertionError: number !== set

try {
  assert.set({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be set'
  console.log(err.actual) // => object
  console.log(err.expected) // => set
  console.log(err.value) // => { a: 1 }
}
```

### [.stream](index.js#L621)
> Check `value` is stream, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var through2 = require('through2')
assert.stream(through2()) // => not throws
assert.stream(through2.obj()) // => not throws

assert.stream(new Map()) // => AssertionError: map !== stream
assert.stream(123) // => AssertionError: number !== stream

try {
  assert.stream({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be stream'
  console.log(err.actual) // => object
  console.log(err.expected) // => stream
  console.log(err.value) // => { a: 1 }
}
```

### [.string](index.js#L653)
> Check `value` is string, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var fn = function aa () { return 123 }
assert.string('foo bar baz') // => not throws
assert.string(fn.toString()) // => not throws
assert.string(new String('abc')) // => not throws

assert.string(new Map()) // => AssertionError: map !== string
assert.string(123) // => AssertionError: number !== string

try {
  assert.string({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be string'
  console.log(err.actual) // => object
  console.log(err.expected) // => string
  console.log(err.value) // => { a: 1 }
}
```

### [.symbol](index.js#L683)
> Check `value` is Symbol, if not throws AssertionError.

var assert = require('assert-kindof')*

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
assert.symbol(Symbol()) // => not throws

assert.symbol(new Map()) // => AssertionError: map !== symbol
assert.symbol(123) // => AssertionError: number !== symbol

try {
  assert.symbol({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be symbol'
  console.log(err.actual) // => object
  console.log(err.expected) // => symbol
  console.log(err.value) // => { a: 1 }
}
```

### [.undefined](index.js#L714)
> Check `value` is undefined, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.undefined() // => not throws
assert.undefined(undefined) // => not throws

assert.undefined(new Map()) // => AssertionError: map !== undefined
assert.undefined(123) // => AssertionError: number !== undefined

try {
  assert.undefined({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be undefined'
  console.log(err.actual) // => object
  console.log(err.expected) // => undefined
  console.log(err.value) // => { a: 1 }
}
```

### [.weakmap](index.js#L745)
> Check `value` is ES2015/ES6 WeakMap, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.weakmap(new WeakMap()) // => not throws

assert.weakmap(new WeakSet()) // => AssertionError: weakset !== weakmap
assert.weakmap(new Map()) // => AssertionError: map !== weakmap
assert.weakmap(123) // => AssertionError: number !== weakmap

try {
  assert.weakmap({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be weakmap'
  console.log(err.actual) // => object
  console.log(err.expected) // => weakmap
  console.log(err.value) // => { a: 1 }
}
```

### [.weakset](index.js#L776)
> Check `value` is ES2015/ES6 WeakSet, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var assert = require('assert-kindof')
assert.weakmap(new WeakSet()) // => not throws

assert.weakset(new WeakMap()) // => AssertionError: weakmap !== weakset
assert.weakset(new Map()) // => AssertionError: map !== weakset
assert.weakset(123) // => AssertionError: number !== weakset

try {
  assert.weakset({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be weakset'
  console.log(err.actual) // => object
  console.log(err.expected) // => weakset
  console.log(err.value) // => { a: 1 }
}
```

## Related
- [always-done](https://www.npmjs.com/package/always-done): Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement… [more](https://github.com/hybridables/always-done#readme) | [homepage](https://github.com/hybridables/always-done#readme "Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more")
- [assertit](https://www.npmjs.com/package/assertit): Thin sugar layer on top of `testit` framework, `is-kindof` and `assert`. | [homepage](https://github.com/tunnckoCore/assertit "Thin sugar layer on top of `testit` framework, `is-kindof` and `assert`.")
- [is-kindof](https://www.npmjs.com/package/is-kindof): Check type of given javascript value. Support promises, generators, streams, and native types. Built on [kind-of][] lib. | [homepage](https://github.com/tunnckocore/is-kindof#readme "Check type of given javascript value. Support promises, generators, streams, and native types. Built on [kind-of][] lib.")
- [kind-of-extra](https://www.npmjs.com/package/kind-of-extra): Additional functionality to [kind-of][] type check utility. Support promises, generators, streams, errors. | [homepage](https://github.com/tunnckocore/kind-of-extra#readme "Additional functionality to [kind-of][] type check utility. Support promises, generators, streams, errors.")
- [kind-of-types](https://www.npmjs.com/package/kind-of-types): List of all javascript types. Used and useful for checking, validation, sanitizing and testing. Like isStream, isPromise, isWeakset and etc. | [homepage](https://github.com/tunnckocore/kind-of-types#readme "List of all javascript types. Used and useful for checking, validation, sanitizing and testing. Like isStream, isPromise, isWeakset and etc.")
- [kind-of](https://www.npmjs.com/package/kind-of): Get the native type of a value. | [homepage](https://github.com/jonschlinkert/kind-of "Get the native type of a value.")
- [mukla](https://www.npmjs.com/package/mukla): Small, parallel and fast test framework with suppport for async/await, promises, callbacks, streams and observables. Targets and works at node.js… [more](https://github.com/tunnckocore/mukla#readme) | [homepage](https://github.com/tunnckocore/mukla#readme "Small, parallel and fast test framework with suppport for async/await, promises, callbacks, streams and observables. Targets and works at node.js v0.10 and above.")
- [try-catch-callback](https://www.npmjs.com/package/try-catch-callback): try/catch block with a callback, used in [try-catch-core][]. Use it when you don't care about asyncness so much and don't… [more](https://github.com/hybridables/try-catch-callback#readme) | [homepage](https://github.com/hybridables/try-catch-callback#readme "try/catch block with a callback, used in [try-catch-core][]. Use it when you don't care about asyncness so much and don't want guarantees. If you care use [try-catch-core][].")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")
- [try-read-json](https://www.npmjs.com/package/try-read-json): Graceful reading of JSON value, using JSON.parse with support for optional callback | [homepage](https://github.com/tunnckocore/try-read-json#readme "Graceful reading of JSON value, using JSON.parse with support for optional callback")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/assert-kindof/issues/new).  
Please read the [contributing guidelines](CONTRIBUTING.md) for advice on opening issues, pull requests, and coding standards.  
If you need some help and can spent some cash, feel free to [contact me at CodeMentor.io](https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github) too.

**In short:** If you want to contribute to that project, please follow these things

1. Please DO NOT edit [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) and [.verb.md](.verb.md) files. See ["Building docs"](#building-docs) section.
2. Ensure anything is okey by installing the dependencies and run the tests. See ["Running tests"](#running-tests) section.
3. Always use `npm run commit` to commit changes instead of `git commit`, because it is interactive and user-friendly. It uses [commitizen][] behind the scenes, which follows Conventional Changelog idealogy.
4. Do NOT bump the version in package.json. For that we use `npm run release`, which is [standard-version][] and follows Conventional Changelog idealogy.

Thanks a lot! :)

## Building docs
Documentation and that readme is generated using [verb-generate-readme][], which is a [verb][] generator, so you need to install both of them and then run `verb` command like that

```
$ npm install verbose/verb#dev verb-generate-readme --global && verb
```

_Please don't edit the README directly. Any changes to the readme must be made in [.verb.md](.verb.md)._

## Running tests
Clone repository and run the following in that cloned directory

```
$ npm install && npm test
```

## Author
**Charlike Mike Reagent**

+ [github/tunnckoCore](https://github.com/tunnckoCore)
+ [twitter/tunnckoCore](https://twitter.com/tunnckoCore)
+ [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
Copyright © 2015, 2017, [Charlike Mike Reagent](http://www.tunnckocore.tk). Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.3, on March 10, 2017._  
_Project scaffolded using [charlike][] cli._

[always-done]: https://github.com/hybridables/always-done
[async-done]: https://github.com/gulpjs/async-done
[charlike]: https://github.com/tunnckocore/charlike
[clean-stacktrace]: https://github.com/tunnckocore/clean-stacktrace
[commitizen]: https://github.com/commitizen/cz-cli
[dezalgo]: https://github.com/npm/dezalgo
[is-kindof]: https://github.com/tunnckocore/is-kindof
[kind-of-extra]: https://github.com/tunnckocore/kind-of-extra
[kind-of-types]: https://github.com/tunnckocore/kind-of-types
[kind-of]: https://github.com/jonschlinkert/kind-of
[once]: https://github.com/isaacs/once
[standard-version]: https://github.com/conventional-changelog/standard-version
[try-catch-core]: https://github.com/hybridables/try-catch-core
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb

[license-url]: https://www.npmjs.com/package/assert-kindof
[license-img]: https://img.shields.io/npm/l/assert-kindof.svg

[downloads-url]: https://www.npmjs.com/package/assert-kindof
[downloads-img]: https://img.shields.io/npm/dt/assert-kindof.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/assert-kindof
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/assert-kindof.svg

[travis-url]: https://travis-ci.org/tunnckoCore/assert-kindof
[travis-img]: https://img.shields.io/travis/tunnckoCore/assert-kindof/master.svg?label=linux

[appveyor-url]: https://ci.appveyor.com/project/tunnckoCore/assert-kindof
[appveyor-img]: https://img.shields.io/appveyor/ci/tunnckoCore/assert-kindof/master.svg?label=windows

[coverage-url]: https://codecov.io/gh/tunnckoCore/assert-kindof
[coverage-img]: https://img.shields.io/codecov/c/github/tunnckoCore/assert-kindof/master.svg

[david-url]: https://david-dm.org/tunnckoCore/assert-kindof
[david-img]: https://img.shields.io/david/tunnckoCore/assert-kindof.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[paypalme-url]: https://www.paypal.me/tunnckoCore
[paypalme-img]: https://img.shields.io/badge/paypal-donate-brightgreen.svg

