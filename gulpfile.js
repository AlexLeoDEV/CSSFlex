'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('sass:compile', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
});

gulp.task('compose', function () {
    return gulp.src('src/**/*.+(html|css|jpg)')
        .pipe(gulp.dest('dist'))
})

gulp.task('build', gulp.series(['sass:compile', 'compose']));

gulp.task('start', gulp.series(['build'], function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
}));

gulp.task('sass:dev', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
})

gulp.task('run:dev', gulp.parallel(['sass:dev', 'browserSync'], function () {
    gulp.watch('src/scss/**/*.scss', gulp.series(['sass:dev']));
    gulp.watch('src/**/*.html', browserSync.reload);
}));
