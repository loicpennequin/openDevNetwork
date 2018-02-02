'use strict' ;

const gulp          = require('gulp'),
      open          = require('gulp-open'),
      gutil         = require('gulp-util'),
      del           = require('del'),
      runSequence   = require('run-sequence').use(gulp),
      path          = require('path'),
      cfg           = require('../config.js')

// Ouvre l'application dans un nouvel onglet chrome
gulp.task('open', () => {
    gulp.src(__filename)
        .pipe(open({uri: cfg.url, app: 'chrome'}));
});

// nettoie tout le dossier public/www
gulp.task('clean', () => {
    return del('public/www/**/*').then(paths => {});
});

// build la web app, lance le watcher, ouvre le site dans chrome
gulp.task('webapp', (cb) => {
    runSequence('webapp-clean', 'webapp-assets', 'webapp-html', 'webapp-css', 'webapp-js', 'webapp-watch', 'open', cb);
})

// build tout, lance les watchers, ouvre le site dans chrome
gulp.task('build', (cb) => {
    runSequence(
        'clean',
        'webapp-assets', 'webapp-html', 'webapp-css', 'webapp-js',
        'watch',
        
        ()=>{
            gutil.log(gutil.colors.green("Application buildée avec succès. Disponible à l'adresse" + cfg.url));
            cb;
        }
    );
})

gulp.task('default', ['build']);
