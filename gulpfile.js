(function (root) {
    'use strict';

    var rjs = require('requirejs');
    var gulp = require('gulp');
    var less = require('gulp-less');
    var del = require('del');
    var path = require('path');
    var Q = require('q');

    require('gulp-help')(gulp);

    gulp.task('remove-dist', 'Remove directory dist/', function (cb) {
        del(['dist'], cb);
    });

    gulp.task('optimize', 'Build package with *.js files.', ['remove-dist'], function () {
        var config = require('./config.json');
        var deferred = Q.defer();
        rjs.optimize(config, function () {
            deferred.resolve();
        });
        return deferred.promise;
    });

    gulp.task('clean', 'Remove logs.', ['optimize'], function (cb) {
        del([
            path.join('dist', 'build.txt'),
            path.join('dist', 'styles', 'less')
        ], cb);
    });

    gulp.task('remove-app-styles-css', 'Remove directory app/styles/css/', function (cb) {
        del([path.join('app', 'styles', 'css')], cb);
    });

    gulp.task('styles', 'Compiled *.less files to main.css', ['remove-app-styles-css'], function () {
        return gulp.src(path.join('app', 'styles', 'less', 'main.less'))
            .pipe(less())
            .pipe(gulp.dest(path.join('app', 'styles', 'css')));
    });

    // -----------------------------------------------------------------------------------------------------------------

    gulp.task('build', 'Create distributed version of app.', ['optimize', 'clean']);

    gulp.task('watch', 'Listen for modification any *.less file and compile to main.css.', ['styles'], function () {
        gulp.watch([path.join('app', 'styles', '**', '*.less')], ['styles']);
    });

}(this));
