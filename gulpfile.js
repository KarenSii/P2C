/*
* Dependencias
*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
  rename = require('gulp-rename'),
   debug = require('gulp-debug'),
   clean = require('gulp-rimraf'),
  imagemin = require('gulp-imagemin'),
   watch = require('gulp-watch'),
   cache = require ('gulp-cache'),
     del = require('del'),
  minifyCSS = require('gulp-minify-css');

var path = {
  jade: ['jade/*.jade'],
  html: 'public/'
};

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

/*
 * Configuración de las tareas 'demo'
 */
/*GULP-CONCAT*/
gulp.task('default', function () {
  gulp.src('js/source/*.js')
    .pipe(concat('compilacion.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/build/'));
});

/*GULP-CONCAT con salto de línea*/
gulp.task('linea', ['default'], function () {
  gulp.src(['js/source/codigo1.js', 'js/source/codigo2.js'])
    .pipe(concat('compila.js', {newLine: ';'} ))
    .pipe(gulp.dest('js/build/'));

});

/*GULP-RENAME*/
gulp.task('nombre', ['linea'], function () {
  return gulp.src(path.jade)
    .pipe(jade({pretty:true}))
    .pipe(rename({extname: '.phtml'}))
    .pipe(gulp.dest(path.html));
});

/*GULP-DEBUG*/
gulp.task('info', ['nombre'], function () {
  return gulp.src('js/source*.js')
    .pipe(debug({verbose:true}))
    .pipe(gulp.dest(path.html));
});

/*GULP-RIMRAF*/
gulp.task('limpiar', ['info'], function () {
  return gulp.src(['jade/*.js'], {read:false})
    .pipe(clean({force:true}));
});

/*GULP-IMAGEMIN*/
gulp.task('img', function () {
  return gulp.src(['app/img/*.+{png|jpg|jpeg|gif|svg}'], {read:false})
    .pipe(cache(imagemin({optimizationLevel:5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img-min/'));
});

/*GULP-SASS*/
gulp.task('sass', function () {
  return gulp.src('style/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('style/css'))
});


/*GULP-WATCH*/
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('css/*.css', ['sass']);
    gulp.watch('*.css', browserSync.reload);
    gulp.watch('js/**/*.css', browserSync.reload);
});



/*BROWSER-SYNC*/
gulp.task('browserSync', function(){
 browserSync.init({
     server:{
         baseDir:'app'
     },
 })
});

gulp.task('sync', function(){
    return gulp.src('css/**/*.css')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}))
});


/*GULP-DEL*/
gulp.task('clean:dist', function(){
  return del.sync('dist');
});


/*GULP-MINIFY-CSS*/
gulp.task('mincss', function(){
  gulp.src('./css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css/'))
});





<link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/menuStyle.css">
  <link href="css/responsive-slider-parallax.css" rel="stylesheet">



  <script src="js/vendor/bootstrap.min.js"></script>
  <script src="js/main.js"></script>
  <script src="js/jquery.js"></script>
  <script src="js/jquery.event.move.js"></script>
  <script src="js/responsive-slider.js"></script>
  <!-- Toggle -->
  <script src="js/toggleJos.js"></script>