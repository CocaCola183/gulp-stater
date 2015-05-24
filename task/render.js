var gulp = require('gulp');
var config = require('../config.json');
var hbsRender = require('../lib/hbsRender');
var inject = require('gulp-inject');
// render hbs
gulp.task('render', ['clean:dist', 'initStatic', 'handleStatic'], function() {
  var sources = gulp.src([config.dest.js + '/*.js', config.dest.css +
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
    gulp.dest(config.dest.base));
});