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


gulp.task('minifyContentjs', function() {
	var content_scripts = ['github', 'segmentfault', 'mp'];
	var excute;
	var length = content_scripts.length;

	for (var i = 0; i < length; i++) {
		excute = gulp.src('./src/content_scripts/' + content_scripts[i] + '.js')
			.pipe(babel({
				presets: ['env']
			}))
			.pipe(uglify())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('./dist/content_scripts'))
			.pipe(notify({
				message: 'minify content_scripts ' + content_scripts[i] + ' done'
			}));
	}

	return excute;
});


gulp.task('default', function() {
	gulp.start('minifycss', 'minifyjs', 'minifyContentjs');
});
