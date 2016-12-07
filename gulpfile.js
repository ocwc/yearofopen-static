var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var babel = require('gulp-babel');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 3 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('babel', function() {
  gulp.src('js/app.es6')
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(gulp.dest('js'))
});

gulp.task('serve', ['sass', 'babel'], function() {
  browserSync.init({
    notify: false,
    proxy: "localhost:8100"
  });
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/app.es6'], ['babel']);
  gulp.watch("**/*.php").on('change', browserSync.reload);
  gulp.watch(["css/app.css", 'js/app.es6']).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'babel'], function() {

});
