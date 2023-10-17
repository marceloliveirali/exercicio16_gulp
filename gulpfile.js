const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-obfuscate');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function CompilationSass() {
    return gulp.src('./source/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

function minificationImages() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function minificationjavascript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

exports.watch = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial:false}, gulp.series(CompilationSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial:false}, gulp.series(minificationImages));
    gulp.watch('./source/images/*', {ignoreInitial:false}, gulp.series(minificationjavascript));
}