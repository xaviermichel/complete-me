// for gulp-mocha to compile es6 test on the fly
require('babel-core/register');

var gulp = require('gulp'),
    prettify = require('gulp-jsbeautifier'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    mocha = require('gulp-mocha');

var paths = {
    scripts: [
        'assets/js/*.js',
        'server.js',
        'controllers/**/*.js',
        'utils/**/*.js',
        'tools/**/*.js',
        'test/**/*.js',
        'gulpfile.js'
    ],
    test: 'test/**/*.js'
};

gulp.task('verify-js', function() {
    gulp.src(['assets/js/*.js'])
        .pipe(prettify({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_ONLY'
        }));
});

gulp.task('prettify-js', function() {
    gulp.src(paths.scripts)
        .pipe(prettify({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_AND_WRITE'
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('prettify-html', function() {
    gulp.src(['assets/**/*.html'])
        .pipe(prettify({
            braceStyle: "collapse",
            indentChar: " ",
            indentSize: 4
        }))
        .pipe(gulp.dest('assets/'));
});

gulp.task('prettify-code', function() {
    runSequence(
        ['prettify-js', 'prettify-html']
    );
});

gulp.task('transpilation', function() {
    gulp.src(['controllers/**/*.js', 'tools/**/*.js'])
        .pipe(babel({
            highlightCode: false
        }))
        .pipe(gulp.dest('build'))
        .on('error', gutil.log);
});

gulp.task('run-test', function() {
    gulp.src(paths.test, {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec'
        }))
        .on('error', gutil.log);
});

gulp.task('test', function() {
    runSequence('transpilation', 'run-test');
});

gulp.task('default', function() {
    runSequence('prettify-code', 'transpilation');
});
