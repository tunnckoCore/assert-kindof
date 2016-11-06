# [assert-kindof][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Check native type of value and throw AssertionError if not okey. Clean stack traces. Simplicity. Built on [is-kindof][].

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i assert-kindof --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const is = require('assert-kindof')
```

## API

### [.array](index.js#L139)
> Check `value` is array, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.array([1, 2, 3]) // => not throws
is.array(123) // => AssertionError: number !== array

try {
  is.array({ foo: 'bar' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be array'
  console.log(err.actual) // => object
  console.log(err.expected) // => array
  console.log(err.value) // => { foo: 'bar' }
}
```

### [.boolean](index.js#L168)
> Check `value` is boolean, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.boolean(true) // => not throws
is.boolean(false) // => not throws
is.boolean(123) // => AssertionError: number !== boolean
is.boolean(null) // => AssertionError: null !== boolean

try {
  is.boolean([1, 2, 3], 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be boolean'
  console.log(err.actual) // => array
  console.log(err.expected) // => boolean
  console.log(err.value) // => [1, 2, 3]
}
```

### [.buffer](index.js#L195)
> Check `value` is buffer, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.buffer(new Buffer('foo')) // => not throws
is.buffer(123) // => AssertionError: number !== buffer

try {
  is.buffer(true, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be buffer'
  console.log(err.actual) // => boolean
  console.log(err.expected) // => buffer
  console.log(err.value) // => true
}
```

### [.date](index.js#L222)
> Check `value` is date, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.date(new Date()) // => not throws
is.date(123) // => AssertionError: number !== date

try {
  is.date({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be date'
  console.log(err.actual) // => object
  console.log(err.expected) // => date
  console.log(err.value) // => { a: 'b' }
}
```

### [.error](index.js#L250)
> Check `value` is error, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.error(new Error()) // => not throws
is.error(new TypeError()) // => not throws
is.error(123) // => AssertionError: number !== error

try {
  is.error({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be error'
  console.log(err.actual) // => object
  console.log(err.expected) // => error
  console.log(err.value) // => { a: 'b' }
}
```

### [.function](index.js#L281)
> Check `value` is function, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.function(function noop () {}) // => not throws
is.function((a, b) => {}) // => not throws
is.function(123) // => AssertionError: number !== error

is.function(function * noop () {})
// => AssertionError: generatorfunction !== function

try {
  is.function({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be function'
  console.log(err.actual) // => object
  console.log(err.expected) // => function
  console.log(err.value) // => { a: 'b' }
}
```

### [.generator](index.js#L314)
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

is.generator(generator) // => not throws
is.generator(genFn) // => AssertionError: generatorfunction !== generator
is.generator(noop) // => AssertionError: function !== generator
is.generator(123) // => AssertionError: number !== generator

try {
  is.generator({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be generator'
  console.log(err.actual) // => object
  console.log(err.expected) // => generator
  console.log(err.value) // => { a: 'b' }
}
```

### [.generatorfunction](index.js#L348)
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

is.generatorfunction(genFn) // => not throws

is.generatorfunction(generator) // => AssertionError: generator !== generatorfunction
is.generatorfunction(noop) // => AssertionError: function !== generatorfunction
is.generatorfunction(123) // => AssertionError: number !== generatorfunction

try {
  is.generatorfunction({ a: 'b' }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be generatorfunction'
  console.log(err.actual) // => object
  console.log(err.expected) // => generatorfunction
  console.log(err.value) // => { a: 'b' }
}
```

### [.map](index.js#L376)
> Check `value` is ES2015/ES6 Map, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.map(new Map()) // => not throws
is.map(new WeakMap()) // => AssertionError: weakmap !== map
is.map(123) // => AssertionError: number !== map

try {
  is.map(123, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be map'
  console.log(err.actual) // => number
  console.log(err.expected) // => map
  console.log(err.value) // => { a: 'b' }
}
```

### [.null](index.js#L404)
> Check `value` is null, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.null(null) // => not throws
is.null({ a: 'b' }) // => AssertionError: object !== null
is.null(123) // => AssertionError: number !== null

try {
  is.null(123, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be null'
  console.log(err.actual) // => number
  console.log(err.expected) // => null
  console.log(err.value) // => 123
}
```

### [.number](index.js#L432)
> Check `value` is number, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.number(123) // => not throws
is.number({ a: 'b' }) // => AssertionError: object !== number
is.number(null) // => AssertionError: null !== number

try {
  is.number([111, 222], 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be number'
  console.log(err.actual) // => array
  console.log(err.expected) // => number
  console.log(err.value) // => [111, 222]
}
```

### [.object](index.js#L460)
> Check `value` is object, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.object({ aaa: 'bbb' }) // => not throws
is.object([1, 2, 3]) // => AssertionError: array !== object
is.object(null) // => AssertionError: null !== object

try {
  is.object([111, 222], 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be object'
  console.log(err.actual) // => array
  console.log(err.expected) // => object
  console.log(err.value) // => [111, 222]
}
```

### [.promise](index.js#L490)
> Check `value` is promise, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.promise(Promise.resolve(123)) // => not throws
is.promise(Promise.reject(new Error('foo'))) // => not throws

is.promise(new Map()) // => AssertionError: map !== promise
is.promise(123) // => AssertionError: number !== promise

try {
  is.promise({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be promise'
  console.log(err.actual) // => object
  console.log(err.expected) // => promise
  console.log(err.value) // => { a: 1 }
}
```

### [.regexp](index.js#L520)
> Check `value` is regexp, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.regexp(/foo ba?r abz/i) // => not throws
is.regexp(new RegExp('aa bb')) // => not throws

is.regexp(new Map()) // => AssertionError: map !== regexp
is.regexp(123) // => AssertionError: number !== regexp

try {
  is.regexp({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be regexp'
  console.log(err.actual) // => object
  console.log(err.expected) // => regexp
  console.log(err.value) // => { a: 1 }
}
```

### [.set](index.js#L548)
> Check `value` is ES2015/ES6 Set, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.set(new Set()) // => not throws
is.set(new Map()) // => AssertionError: map !== set
is.set(123) // => AssertionError: number !== set

try {
  is.set({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be set'
  console.log(err.actual) // => object
  console.log(err.expected) // => set
  console.log(err.value) // => { a: 1 }
}
```

### [.stream](index.js#L579)
> Check `value` is stream, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var through2 = require('through2')
is.stream(through2()) // => not throws
is.stream(through2.obj()) // => not throws

is.stream(new Map()) // => AssertionError: map !== stream
is.stream(123) // => AssertionError: number !== stream

try {
  is.stream({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be stream'
  console.log(err.actual) // => object
  console.log(err.expected) // => stream
  console.log(err.value) // => { a: 1 }
}
```

### [.string](index.js#L611)
> Check `value` is string, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
var fn = function aa () { return 123 }
is.string('foo bar baz') // => not throws
is.string(fn.toString()) // => not throws
is.string(new String('abc')) // => not throws

is.string(new Map()) // => AssertionError: map !== string
is.string(123) // => AssertionError: number !== string

try {
  is.string({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be string'
  console.log(err.actual) // => object
  console.log(err.expected) // => string
  console.log(err.value) // => { a: 1 }
}
```

### [.symbol](index.js#L640)
> Check `value` is Symbol, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.symbol(Symbol()) // => not throws

is.symbol(new Map()) // => AssertionError: map !== symbol
is.symbol(123) // => AssertionError: number !== symbol

try {
  is.symbol({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be symbol'
  console.log(err.actual) // => object
  console.log(err.expected) // => symbol
  console.log(err.value) // => { a: 1 }
}
```

### [.undefined](index.js#L670)
> Check `value` is undefined, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.undefined() // => not throws
is.undefined(undefined) // => not throws

is.undefined(new Map()) // => AssertionError: map !== undefined
is.undefined(123) // => AssertionError: number !== undefined

try {
  is.undefined({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be undefined'
  console.log(err.actual) // => object
  console.log(err.expected) // => undefined
  console.log(err.value) // => { a: 1 }
}
```

### [.weakmap](index.js#L700)
> Check `value` is ES2015/ES6 WeakMap, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.weakmap(new WeakMap()) // => not throws

is.weakmap(new WeakSet()) // => AssertionError: weakset !== weakmap
is.weakmap(new Map()) // => AssertionError: map !== weakmap
is.weakmap(123) // => AssertionError: number !== weakmap

try {
  is.weakmap({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be weakmap'
  console.log(err.actual) // => object
  console.log(err.expected) // => weakmap
  console.log(err.value) // => { a: 1 }
}
```

### [.weakset](index.js#L730)
> Check `value` is ES2015/ES6 WeakSet, if not throws AssertionError.

**Params**

* `value` **{any}**: value to be checked    
* `message` **{String|Function}**: error message; if function gets `fn(actual, expected, value)` signature    
* `returns` **{Undefined}**: nothing is returned, throws if not okey  

**Example**

```js
is.weakmap(new WeakSet()) // => not throws

is.weakset(new WeakMap()) // => AssertionError: weakmap !== weakset
is.weakset(new Map()) // => AssertionError: map !== weakset
is.weakset(123) // => AssertionError: number !== weakset

try {
  is.weakset({ a: 1 }, 'expect `val` to be {expected}')
} catch (err) {
  console.log(err.message) // => 'expect `val` to be weakset'
  console.log(err.actual) // => object
  console.log(err.expected) // => weakset
  console.log(err.value) // => { a: 1 }
}
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/assert-kindof/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[npmjs-url]: https://www.npmjs.com/package/assert-kindof
[npmjs-img]: https://img.shields.io/npm/v/assert-kindof.svg?label=assert-kindof

[license-url]: https://github.com/tunnckoCore/assert-kindof/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/assert-kindof.svg

[downloads-url]: https://www.npmjs.com/package/assert-kindof
[downloads-img]: https://img.shields.io/npm/dm/assert-kindof.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/assert-kindof
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/assert-kindof.svg

[travis-url]: https://travis-ci.org/tunnckoCore/assert-kindof
[travis-img]: https://img.shields.io/travis/tunnckoCore/assert-kindof/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/assert-kindof
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/assert-kindof.svg

[david-url]: https://david-dm.org/tunnckoCore/assert-kindof
[david-img]: https://img.shields.io/david/tunnckoCore/assert-kindof.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

[is-kindof]: https://github.com/tunnckocore/is-kindof