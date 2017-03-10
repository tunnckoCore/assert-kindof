# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.1"></a>
## [2.0.1](https://github.com/tunnckocore/assert-kindof/compare/v2.0.0...v2.0.1) (2017-03-10)


### Bug Fixes

* **package:** update deps ([c2c806d](https://github.com/tunnckocore/assert-kindof/commit/c2c806d))
* **package:** update deps to test on node 0.10 and npm scripts ([ac54d55](https://github.com/tunnckocore/assert-kindof/commit/ac54d55))
* **readme:** update start license year to 2015 ([8d7947d](https://github.com/tunnckocore/assert-kindof/commit/8d7947d))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/tunnckocore/assert-kindof/compare/v1.0.1...v2.0.0) (2016-11-06)


### Bug Fixes

* **api:** update api docs, expose is-kindof too ([bcc2eda](https://github.com/tunnckocore/assert-kindof/commit/bcc2eda))
* **custom:** allow passing custom error message ([4e93b1f](https://github.com/tunnckocore/assert-kindof/commit/4e93b1f))


### Code Refactoring

* **index:** simplify, make it not so expressive ([958bbac](https://github.com/tunnckocore/assert-kindof/commit/958bbac))


### BREAKING CHANGES

* index: simplify, now just have methods for all of the types and methods in "not" modifier

like "is.not.object(val)", "is.not.string(val)" and etc. Also has "is.string(val)" and such methods

exported




## 1.0.1 - 2015-04-18
- Release v1.0.1 / npm@v1.0.1
- ensure filepath exists in stack, [partial fix of #3 problem](https://github.com/tunnckoCore/assert-kindof/issues/3)
- remove coveralls.yml

## 1.0.0 - 2015-03-30
- Release v1.0.0 / npm@v1.0.0
- is-kindof reference
- add more keywords, update desc
- update readme
- npm@v0.0.3
- add new tests
- should inherits prototype of TypeError, not Error
- update deps
- run keywords(1)
- update tests
- add tests, 100% coverage
- npm@v0.0.1
- expose `is-kindof`, add notices
- update usage, tbc
- run traviscov(1)

## 0.0.0 - 2015-03-28
- first commits
