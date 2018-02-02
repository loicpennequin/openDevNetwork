'use strict';

const path      = require('path'),
      paths     = require(path.join(__dirname, '/paths.js')),
      bundles   = require(path.join(__dirname, '/browserify.js'));

module.exports = {
    paths : paths,
    bundles : bundles,
    url : 'http://localhost/maestris_php/public/'
}
