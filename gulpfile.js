'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('sass:compile', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/style'))
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
    return gulp.src('src/style/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/style'))
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

gulp.task('run:dev', gulp.parallel(['browserSync', 'sass:dev'], function () {
    gulp.watch('src/style/**/*.scss', gulp.series(['sass:dev']));
    gulp.watch('src/**/*.html', browserSync.reload);
}));
