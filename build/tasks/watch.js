'use strict';

const gulp          = require('gulp'),
      livereload    = require('gulp-livereload'),
      path          = require('path'),
      runSequence   = require('run-sequence'),
      cfg           = require(path.join(__dirname, '../config.js'));

gulp.task('webapp-watch', () => {
  livereload.listen({port: 4000});
  gulp.watch(cfg.paths.webapp.html.src, ['webapp-html', 'webapp-js']);
  gulp.watch(path.join(cfg.paths.webapp.base.src, '/**/*.sass'), ['webapp-sass']);
  gulp.watch(path.join(cfg.paths.webapp.base.src, '/js/**/*.js'), ['webapp-js']);
});

gulp.task('watch', () =>{
    livereload.listen();
    gulp.watch(path.join(cfg.paths.webapp.base.src, '/**/*.html'), () => runSequence('webapp-html', 'webapp-js'));
    gulp.watch(path.join(cfg.paths.webapp.base.src, '/**/*.sass'), ['webapp-sass']);
    gulp.watch(path.join(cfg.paths.webapp.base.src, '/**/*.js'), ['webapp-js']);
})
