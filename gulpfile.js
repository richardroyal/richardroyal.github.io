// Include gulp
var gulp = require('gulp'); 

// Include plugins
var jshint  = require('gulp-jshint');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var notify  = require('gulp-notify');
var minify  = require('gulp-minify-css');
var haml    = require('gulp-haml');
var connect = require('gulp-connect');

// Build HTML from HAML
gulp.task('haml', function () {
    return gulp.src('./*.haml')
        .pipe(haml())
        .pipe(gulp.dest('./'))
        .pipe(notify('Finished HAML to HTML'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('rroyal-io.js'))
        .pipe(gulp.dest('assets/build/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/build/js/'))
        .pipe(notify('Finished JS minification'));
});

// Minify static CSS
gulp.task('css', function(){
    return gulp.src('assets/css/*.css')
        .pipe(concat('wpss-pkg.css'))
        .pipe(gulp.dest('assets/build/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('assets/build/css/'))
        .pipe(notify('Finished CSS minification'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('index.haml', ['haml']);
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/css/*.css', ['css']);
});

// Start local webserver
gulp.task('webserver', function() {
    connect.server();
});

// Default Task
gulp.task('default', ['watch', 'webserver']);
