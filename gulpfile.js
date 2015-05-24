var gulp = require('gulp');
var config = require('./config.json');
var requireDir = require('require-dir');
var tasks = requireDir('./task');

// preview
gulp.task('default', ['deploy'], function(callback) {
  exec('open ' + 'http://' + config.remote.hostname,
    // exec('open ' + config.distPath + '/index.html',
    function(error, stdout, stderr) {
      callback(error);
    });
});