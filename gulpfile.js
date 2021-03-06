'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const templateCache = require('gulp-angular-templatecache');
const webpack = require('gulp-webpack');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('serve', ['watch', 'html'], () => {
  connect.server({
    root: 'app',
    livereload: true
  });
});
 
gulp.task('html', () => {
  gulp.src('./src/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', () => {
  gulp.watch(['./templates/*.html', './src/*.js', './scss/*.scss'], ['transpile', 'sass']);
});

gulp.task('sass', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('./app/css'));
});
 
gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('copy_modules', () => {
  gulp.src([
    './node_modules/firebase/firebase.js',
    './node_modules/angular/angular.js',
    './node_modules/angular-route/angular-route.js',
    './node_modules/angularfire/dist/angularfire.js'
  ])
  .pipe(gulp.dest('./app/lib/'));
});

gulp.task('webpack', () => {
  return gulp.src('./src/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('transpile', ['templates'], () => {
  return gulp.src(['src/_build.txt', 'src/templates.js', 'src/app.js'])
    .pipe(concat('app.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./app/dist'));  
});


gulp.task('templates', function () {
  return gulp.src('./templates/**/*.html')
    .pipe(templateCache({
      module: 'flexchat.templates',
      standalone: true,
    }))
    .pipe(gulp.dest('./app/dist/'));
});

gulp.task('run', ['sass', 'transpile', 'copy_modules', 'watch', 'sass:watch', 'serve']);

gulp.task('default', ['sass', 'templates', 'copy_modules', 'webpack'],() => {});