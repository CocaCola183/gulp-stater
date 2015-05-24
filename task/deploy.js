var gulp = require('gulp');
var config = require('../config.json');
var rsync = require('gulp-rsync');
// deploy dist
gulp.task('deploy', ['render'], function() {
		return gulp.src(config.dest.base + '/**').pipe(rsync({
				root: config.dest.base,
				hostname: config.remote.hostname,
				username: config.remote.username,
				destination: config.remote.destination,
				recursive: true,
				clean: true
		}));
});