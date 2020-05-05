var gulp = require('gulp'); 
var cleancss = require('gulp-clean-css'); 
var sass = require('gulp-sass'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./boilerplate/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./boilerplate/css/'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
    server: {
      baseDir: './boilerplate/pages/'
    },
  })
  gulp.watch('./boilerplate/scss/**/*.scss', style);
  gulp.watch('./boilerplate/**/*.html').on('change', browserSync.reload)
}

exports.style = style;
exports.watch = watch;


// gulp.task('sass', function(){
//   return gulp.src('./boilerplate/scss/**/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./boilerplate/css/'))
//     .pipe(browserSync.stream())
// })

// gulp.task('browserSync',, ['sass'] function() {
//   browserSync.init({
//     server: {
//       baseDir: './boilerplate/pages/'
//     },
//   })
//   gulp.watch("./boilerplate/scss/**/*.scss", ['sass']);
//   gulp.watch(".//*.html").on('change', browserSync.reload);
// })

// gulp.task('fileinclude', function(done) {
//     gulp.src(['./boilerplate/pages/*.html'])
//       .pipe(fileinclude({
//         prefix: '@@',
//         basepath: '@file'
//       }))
//       .pipe(gulp.dest('./boilerplate/dist/'));
//       done();
//   });


// gulp.task('watch',['browserSync', 'sass', 'fileinclude'], function() {
//   gulp.watch('./boilerplate/scss/~**/*.scss', gulp.series('sass'));
//   gulp.watch(
//     [
//       './boilerplate/pages/*.html',
//       '/boilerplate/src/*.html'
//     ],
//     gulp.series('fileinclude, browserSync'));
// })

// gulp.task('default', ['watch']);