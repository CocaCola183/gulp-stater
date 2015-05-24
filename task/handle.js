var gulp = require('gulp');
var config = require('../config.json');
var gutil = require('gulp-util');
var uglifyJs = require('gulp-uglify');
var uglifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

// uglify concat and move js files to dist
gulp.task('handleJs', ['initStatic'], function() {
		return gulp.src(config.src.js + '/*.js').pipe(uglifyJs())
				/*.pipe(concat('script.min.js'))*/
				.pipe(gulp.dest(config.dest.js));
});


// uglify concat and move css files to dist
gulp.task('handleCss', ['initStatic'], function() {
		return gulp.src(config.src.css + '/*.css').pipe(uglifyCss())
				/*.pipe(concat('style.min.css'))*/
				.pipe(gulp.dest(config.dest.css));
});


// uglify concat and move static files to dist
gulp.task('handleStatic', ['handleCss', 'handleJs'], function() {
		gutil.log('All static files handled.');
});