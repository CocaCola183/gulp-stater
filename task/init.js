var gulp = require('gulp');
var config = require('../config.json');
require('shelljs/global');
// init static files
exports.initStatic = gulp.task('initStatic', ['clean:dist'], function() {
  // init css
  config.css.forEach(function(path) {
    cp('-Rf', path, config.src.css);
  });
  // init js
  config.js.forEach(function(path) {
    cp('-Rf', path, config.src.js);
  });
  // init image
  cp('-Rf', config.src.image, config.dest.base);
});