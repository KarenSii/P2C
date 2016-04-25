/*
* Dependencias
*/
var gulp = require('gulp');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();



/*GULP-INJECT*/
gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var injectSrc = gulp.src(['./app/css/*.css',
    './app/js/*.js'], {read: false});

  var injectOptions = {
    ignorePath: '/app'
  }

  var options = {
    bowerJson: require('./bower.json'),
    directory: './app',
    ignorePath: '../../app'
  }

  return gulp.src('./src/views/*.html')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'));

})