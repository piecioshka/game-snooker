/*global require */

(function (root) {
    'use strict';

    var _ = require('underscore');
    var rjs = require('requirejs');
    var gulp = require('gulp');
    var clean = require('gulp-clean');
    var Q = require('q');

    // Konfiguracja aplikacji potrzebna do budowy dist/
    var config = require('./config.json');

    gulp.task('prepare', function () {
        // usuwamy katalog /dist
        return gulp.src('dist/', { read: false })
            .pipe(clean({ force: true }));
    });

    gulp.task('build', ['prepare'], function () {
        // optymalizacja r.js
        var deferred = Q.defer();
        rjs.optimize(config, function () {
            deferred.resolve();
        });
        return deferred.promise;
    });

    gulp.task('clean', ['build'], function () {
        // usuwamy logi builda
        return gulp.src("./dist/build.txt", { read: false })
            .pipe(clean());
    });

    gulp.task('default', ['prepare', 'build', 'clean']);

}(this));
