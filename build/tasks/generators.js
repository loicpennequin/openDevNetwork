'use stict';

const gulp      = require('gulp'),
      fs        = require('fs'),
      path      = require('path'),
      {argv}    = require('yargs'),
      gutil     = require('gulp-util'),
      cfg       = require(path.join(__dirname, '../config.js')),
      inject    = require('gulp-inject-string'),
      promisify = require('util').promisify;

// Promisification des methodes du file system de node parce que les callbacl c'est dla merde
const readdir = promisify(fs.readdir);
const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

//===============================================
// Generates an AngularJS module
//===============================================
gulp.task('module', async ()=>{
    // Validation de la tâche Gulp
    let moduleName = argv.m;
    if (!moduleName) {
        gutil.log(gutil.colors.red("Vous n'avez pas nommé votre module. la syntaxe de la tâche est gulp module --m [moduleName]"));
        return;
    }

    //Creation du dossier du module
    let dir = path.join(cfg.paths.webapp.base.src, `/app/modules/${moduleName}`),
        content = require(path.join(__dirname, '../generator-templates.js')).module(moduleName);

    if (!fs.existsSync(dir)){
        await mkdir(dir);
        gutil.log(gutil.colors.cyan(`dossier ${dir} créé.`));
    }

    //Creation des fichiers relatifs au module
    await writeFile(`${dir}/${moduleName}.js`, content);
    gutil.log(gutil.colors.cyan(`${moduleName}.js créé`));
    await writeFile(`${dir}/${moduleName}.sass`, "");
    gutil.log(gutil.colors.cyan(`${moduleName}.sass créé`));
    await writeFile(`${dir}/${moduleName}.templates.js`, "");
    gutil.log(gutil.colors.cyan(`${moduleName}.templates créé`));

    //Injection du module dans l'app
    await appendFile(path.join(cfg.paths.webapp.base.src, '/app/app.sass'), `\n@import './modules/${moduleName}/${moduleName}.sass'`);
    gutil.log(gutil.colors.cyan(`${moduleName}.sass importé dans app.sass`));

    let moduleReq = `\nrequire('./modules/${moduleName}/${moduleName}.js');`,
    templatesReq = `\nrequire('./modules/${moduleName}/${moduleName}.templates.js');`;

    return gulp.src(cfg.paths.webapp.base.src + '/app/app.bundle.js')
    .pipe(inject.after('//modules', moduleReq ))
    .pipe(inject.after(moduleReq, templatesReq))
    .pipe(gulp.dest(cfg.paths.webapp.base.src + '/app'))
    .on('end', () => { gutil.log(gutil.colors.green('app.bundle mis à jour. Module créé avec succès.'))});
});

//===============================================
// Génère un component AngularJS
//===============================================
gulp.task('component', async ()=>{
    // Validation de la tâche Gulp
    let moduleName = argv.m,
        componentName = argv.c,
        parentName = argv.p;

    if (!moduleName || !componentName) {
        gutil.log(gutil.colors.red("Vous n'avez pas nommé votre module ou votre component. la syntaxe de la tâche est gulp component --m [moduleName] --c [componentName]"));
        return;
    }

    // Creation du dossier du component
    if ( !fs.existsSync(path.join(cfg.paths.webapp.base.src, parentName ?
                                                    `/app/modules/${moduleName}/components/${parentName}` :
                                                    `/app/modules/${moduleName}`)) ){
        gutil.log(gutil.colors.red("Le module spécifié n'existe pas. Veuillez utiliser un module existant ou générer un module en utilisant la tâche gulp module --m [moduleName]"));
        return;
    }

    let dir         = path.join(cfg.paths.webapp.base.src, parentName ? `/app/modules/${moduleName}/components/${parentName}` : `/app/modules/${moduleName}/components`),
        htmlContent = require(path.join(__dirname, '../generator-templates.js')).componentHTML(componentName);
        jsContent   = require(path.join(__dirname, '../generator-templates.js')).componentJS(moduleName, componentName);

    if (!fs.existsSync(dir)){
        await mkdir(dir);
    }
    await mkdir(`${dir}/${componentName}`);
    gutil.log(gutil.colors.cyan(`dossier ${dir}/${componentName} créé.`));

    // Creation des fichiers relatifs au component
    await writeFile(`${dir}/${componentName}/${componentName}.component.html`, htmlContent);
    gutil.log(gutil.colors.cyan(`${componentName}.component.html créé`));

    await writeFile(`${dir}/${componentName}/${componentName}.component.sass`, `.${componentName}-component`);
    gutil.log(gutil.colors.cyan(`${componentName}.component.sass créé`));

    await writeFile(`${dir}/${componentName}/${componentName}.component.js`, jsContent);
    gutil.log(gutil.colors.cyan(`${componentName}.component.js créé`));

    // Injection du component dans l'app
    appendFile(path.join(cfg.paths.webapp.base.src + `/app//modules/${moduleName}/${moduleName}.sass`), parentName ? `\n@import   './components/${parentName}/${componentName}/${componentName}.component.sass'` : `\n@import   './components/${componentName}/${componentName}.component.sass'`);
    gutil.log(gutil.colors.cyan(`${componentName}.sass importé dans ${moduleName}.sass`));

    let componentReq = parentName? `\nrequire('./modules/${moduleName}/components/${parentName}/${componentName}/${componentName}.component.js')` : `\nrequire('./modules/${moduleName}/components/${componentName}/${componentName}.component.js')`;

    return gulp.src(cfg.paths.webapp.base.src + '/app/app.bundle.js')
        .pipe(inject.after(`require('./modules/${moduleName}/${moduleName}.templates.js');`, componentReq ))
        .pipe(gulp.dest(cfg.paths.webapp.base.src + '/app'))
        .on('end', () => { gutil.log(gutil.colors.green('app.bundle mis à jour. Component créé avec succès.'))});
});


//===============================================
// Génère une factory Angular
//===============================================
gulp.task('factory', async ()=>{
    // Validation de la tâche Gulp
    let moduleName = argv.m,
        factoryName = argv.f;

    if (!moduleName || !factoryName) {
        gutil.log(gutil.colors.red("Vous n'avez pas nommé votre module ou votre factory. la syntaxe de la tâche est gulp component --m [moduleName] --f [factoryName]"));
        return;
    }

    if ( !fs.existsSync(path.join(cfg.paths.webapp.base.src, `/app/modules/${moduleName}`)) ){
        gutil.log(gutil.colors.red("Le module spécifié n'existe pas. Veuillez utiliser un module existant ou générer un module en utilisant la tâche gulp module --m [moduleName]"));
        return;
    }

    // Creation du dossier de la factory
    let dir         = path.join(cfg.paths.webapp.base.src, `/app/modules/${moduleName}/services`),
        content     = require('../generator-templates.js').factory(moduleName, factoryName);

    if (!fs.existsSync(dir)){
        await mkdir(dir);
    }

    // Creation des fichiers relatifs à la factory
    await writeFile(`${dir}/${factoryName}.js`, content);
    gutil.log(gutil.colors.cyan(`${factoryName}.js créé`));

    // Injection de la factory dans l'app
    let req = `\nrequire('./modules/${moduleName}/services/${factoryName}.js')`;

    return gulp.src(cfg.paths.webapp.base.src + '/app/app.bundle.js')
        .pipe(inject.after(`require('./modules/${moduleName}/${moduleName}.js');`, req ))
        .pipe(gulp.dest(cfg.paths.webapp.base.src + '/app'))
        .on('end', () => { gutil.log(gutil.colors.green('app.bundle mis à jour. Factory créé avec succès.'))});
});
