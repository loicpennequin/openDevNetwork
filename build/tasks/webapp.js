'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      concat       = require('gulp-concat'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      cond         = require('gulp-cond'),
      rename       = require("gulp-rename"),
      livereload   = require('gulp-livereload'),
      gutil        = require('gulp-util'),
      ngTemplates  = require('gulp-angular-templates'),
      flatten      = require('gulp-flatten'),
      babelify     = require('babelify'),
      runSequence  = require('run-sequence'),
      buffer       = require('vinyl-buffer'),
      source       = require('vinyl-source-stream'),
      {argv}       = require('yargs'),
      path         = require('path'),
      fs           = require('fs'),
      cfg          = require(path.join(__dirname, "/../config.js"));

 require('babel-core');


// Verifie si l'on a spécifié l'environnement de production en argument de la tâche gulp
let PROD;
if (argv.prod) {
    PROD = true;
}

// Déplace le dossier assets dans le dossier de destination
gulp.task('webapp-assets', () => {
    return gulp.src(path.join(cfg.paths.webapp.assets.src, '/**/*'))
        .pipe(gulp.dest(cfg.paths.webapp.assets.dst));
});

// Déplace l'index.html dans le dosser de destination, et passe les templates html des component en $templatecache'
gulp.task('webapp-html-index', () => {
    return gulp.src(cfg.paths.webapp.html.src)
        .pipe(gulp.dest(cfg.paths.webapp.html.dst))
});
gulp.task('webapp-html-templates', () => {
    const getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory()),
          dirs = getDirs(path.join(cfg.paths.webapp.base.src,'/app/modules'));
    dirs.forEach((dir)=>{
        gulp.src(path.join(cfg.paths.webapp.base.src, `/app/modules/${dir}/**/*.html`))
            .pipe(flatten())
            .pipe(ngTemplates({module: dir}))
            .pipe(concat(`${dir}.templates.js`))
            .pipe(gulp.dest(path.join(cfg.paths.webapp.base.src, `/app/modules/${dir}`)))
            .pipe(cond(!PROD, livereload()));
    })
})

gulp.task('webapp-html', (cb) =>{
    runSequence('webapp-html-index', 'webapp-html-templates', cb)
})

// Transpile le SASS en CSS, et ajoute bootstrap au dossier de destination
gulp.task('webapp-sass', () => {
    return gulp.src(cfg.paths.webapp.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename(path.join(cfg.paths.webapp.css.outputName)))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cfg.paths.webapp.css.dst))
        .pipe(cond(!PROD, livereload()));
})
gulp.task('webapp-font-awesome', () => {
    return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(path.join(cfg.paths.webapp.css.dst, '/lib')));
})
gulp.task('webapp-css', (cb) =>{
    runSequence('webapp-font-awesome', 'webapp-sass', cb);
})

// Bundle tous les fichiers JS
gulp.task("webapp-js", () => {
    return cfg.bundles.webapp.bundle()
        .pipe(source(cfg.paths.webapp.js.outputName))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cfg.paths.webapp.js.dst));
});

// Construis la webapp dans le répertoire de destination (regroupe les taches html, css, et js)
gulp.task('static-build', (cb) => {
    runSequence('webapp-html', 'webapp-css', 'webapp-js', ()=>{
        cb ?
        gutil.log(gutil.colors.green("webapp buildée et disponible sur http://localhost:8000")) :
        cb;
    });
})
