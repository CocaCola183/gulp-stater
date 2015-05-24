/*clean*/
var gulp = require('gulp');
var config = require('../config.json');
var del = require('del');
// clean dist
exports.clean_dist = gulp.task('clean:dist', function(cb) {
		del([config.dest.base], {
				force: true //force to delete the folder even if it is not empty
		}, cb);
});