'use strict'

var utils = require('lazy-cache')(require)
var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign, no-global-assign

/**
 * Lazily required module dependencies
 */

require('clean-stacktrace', 'cleanStack')
require('is-kindof', 'is')
require('kind-of-extra', 'kindOf')
require('string-template', 'format')
require = fn // eslint-disable-line no-undef, no-native-reassign, no-global-assign

// need bump in kind-of-types
delete utils.is['hybrid']

/**
 * Expose `utils` modules
 */

module.exports = utils
