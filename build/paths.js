'use strict';

const path          = require('path'),
      srcRoot       = "./src",
      dstRoot    = "./public"

module.exports = {
    root : dstRoot,
    webapp : {
        base: {
            src : srcRoot,
            dst : dstRoot,
        },
        assets: {
            src : path.join(srcRoot, '/assets'),
            dst : path.join(dstRoot, '/assets')
        },
        html: {
            src: path.join(srcRoot, "app.html"),
            dst: dstRoot
        },
        css: {
            src: path.join(srcRoot, "app/app.sass"),
            dst: path.join(dstRoot, "/css"),
            outputName: '/app.css'
        },
        js: {
            src: path.join(srcRoot, "/app/app.bundle.js"),
            dst: path.join(dstRoot, "/js"),
            outputName: 'app.js'
        }
    }
}
