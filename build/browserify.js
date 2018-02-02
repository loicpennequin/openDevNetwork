'use strict';

const browserify    = require('browserify'),
      babelify      = require('babelify'),
      path          = require('path'),
      paths         = require(path.join(__dirname, '/paths.js'));

require('babel-core');



let webAppBundle = browserify({
    entries : [paths.webapp.js.src],
    debug : true
})
.transform("babelify", {presets: ["env"]});

module.exports = {
    webapp : webAppBundle
}
