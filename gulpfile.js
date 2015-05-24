var gulp = require('gulp');
var combiner = require('stream-combiner2');
var del = require('del');
var concat = require('gulp-concat');
var hbs = require('gulp-hbs');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var rsync = require('gulp-rsync');
var uglifyJs = require('gulp-uglify');
var uglifyCss = require('gulp-minify-css');
var inject = require('gulp-inject');
var config = require('./config');
var child_process = require('child_process');
var exec = child_process.exec;
require('shelljs/global');
//自定义插件
var hbsRender = require('./lib/hbsRender');


// clean dist
gulp.task('clean:dist', function(cb) {
  del([config.distPath], {
    force: true //force to delete the folder even if it is not empty
  }, cb);
});


// init static files
gulp.task('initStatic', ['clean:dist'], function() {
  // init css
  config.css.forEach(function(path) {
    cp('-Rf', path, config.srcCssPath);
  });
  // init js
  config.js.forEach(function(path) {
    cp('-Rf', path, config.srcJsPath);
  });
  // init image
  cp('-Rf', config.srcImagePath, config.distPath);
});


// uglify concat and move js files to dist
gulp.task('handleJs', ['initStatic'], function() {
  return gulp.src(config.srcJsPath + '/*.js').pipe(uglifyJs())
    /*.pipe(concat(
        'script.min.js'))*/
    .pipe(gulp.dest(config.distJsPath));
});


// uglify concat and move css files to dist
gulp.task('handleCss', ['initStatic'], function() {
  return gulp.src(config.srcCssPath + '/*.css').pipe(uglifyCss())
    /*.pipe(concat(
        'style.min.css'))*/
    .pipe(gulp.dest(config.distCssPath));
});


// uglify concat and move static files to dist
gulp.task('handleStatic', ['handleCss', 'handleJs'], function() {
  console.log('All static files handled.');
});


// // render hbs
// gulp.task('render', function() {
//   gulp.src('./data/data.json').pipe(hbsRender(
//     './src/hbs/article/article1.hbs', 'article1')).pipe(hbsRender(
//     './src/hbs/layout.hbs', 'body')).pipe(gulp.dest('./dist'));
// });


// render hbs
gulp.task('render', ['clean:dist', 'initStatic', 'handleStatic'], function() {
  var sources = gulp.src([config.distJsPath + '/*.js', config.distCssPath +
    '/*.css'
  ], {
    read: false,
  });
  gulp.src('./data/data.json').pipe(hbsRender('./src/hbs/index.hbs', 'index')).pipe(
    hbsRender('./src/hbs/layout.hbs', 'index')).pipe(inject(sources, {
    relative: false,
    ignorePath: 'dist',
    addRootSlash: false
  })).pipe(
    gulp.dest('./dist'));
});

// gulp generate
gulp.task('generate', ['render'], function(callback) {
  console.log('All files generateed.');
  callback();
});


// deploy dist
gulp.task('deploy', ['generate'], function() {
  return gulp.src(config.sourceDir + '/**').pipe(rsync({
    root: config.sourceDir,
    hostname: config.remote.hostname,
    username: config.remote.username,
    destination: config.remote.destination,
    recursive: true,
    clean: true
  }));
});

// deploy for dev
gulp.task('deploy:dev', function() {
  return gulp.src(config.sourceDir + '/**').pipe(rsync({
    root: config.sourceDir,
    hostname: config.remote.hostname,
    username: config.remote.username,
    destination: config.remote.destination,
    recursive: true,
    clean: true
  }));
});

// preview
gulp.task('default', ['deploy'], function(callback) {
  exec('open ' + 'http://' + config.remote.hostname,
    // exec('open ' + config.distPath + '/index.html',
    function(error, stdout, stderr) {
      callback(error);
    });
});


// test
gulp.task('print', function() {
  console.log('config.srcPath----->', config.srcPath);
  console.log('config.distPath----->', config.distPath);
  console.log('config.srcCssPath----->', config.srcCssPath);
  console.log('config.srcJsPath----->', config.srcJsPath);
});

gulp.task('test', function() {
  console.dir(del);
});