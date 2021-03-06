'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var concat = require('gulp-concat');
var ghPages = require('gulp-gh-pages');

var jsFileList = ['source/js/modules/utils/const.js','source/js/modules/utils/common.js', 'source/js/modules/mobile-menu.js', 'source/js/modules/accordion.js',
'source/js/modules/slider.js', 'source/js/modules/modal.js','source/js/modules/some-products-slider.js', 'source/js/modules/login-modal.js', 'source/js/modules/main.js'];

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/modules/*.js', gulp.series('js', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ]))

      .pipe(gulp.dest('build/img'));

});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/svg/*.svg')
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite.svg'))
      .pipe(gulp.dest('build/img/svg'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
      .pipe(posthtml([
        include({ encoding: 'utf8' })
      ]))
      .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
  return gulp.src(jsFileList)
      .pipe(concat('main.js'))
      .pipe(gulp.dest('build/js'))
})

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/css/**/*.css',
    'source/img/**',
    'source//*.ico'
  ], {
    base: 'source'
  })
      .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('deploy', function () {
  return gulp.src('build/**/*')
    .pipe(ghPages());
})

gulp.task('build', gulp.series('clean', 'copy', 'css', 'images', 'webp', 'sprite', 'html', 'js'));
gulp.task('start', gulp.series('build', 'server'));
