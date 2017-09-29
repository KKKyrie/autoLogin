const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const babel = require('gulp-babel');


gulp.task('minifycss', function() {
	return gulp.src('./src/css/popup.css')
		.pipe(minifycss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify({
			message: 'minify css done.'
		}));
});



gulp.task('minifyjs', function() {
	return gulp.src('./src/js/popup.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist/js'))
		.pipe(notify({
			message: 'minify popupjs done.'
		}));
});


gulp.task('default', function() {
	gulp.start('minifycss', 'minifyjs');
});
