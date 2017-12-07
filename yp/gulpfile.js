var gulp = require('gulp');//CMD
var cleanCss=require('gulp-clean-css');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var rename=require('gulp-rename');
var imagemin=require('gulp-imagemin');
var sass=require('gulp-sass');
var connect=require('gulp-connect');
var htmlMin=require('gulp-htmlmin');
// var minify=require('gulp-minify');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlMin())
	.pipe(gulp.dest('dest'));
})
gulp.task('img',function(){
	gulp.src('src/image/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dest/images'))
});
gulp.task('css',function(){
	gulp.src('src/css/*.scss')
	.pipe(sass())
	.pipe(cleanCss())
	.pipe(gulp.dest('dest/css'))
	.pipe(concat('all.min.css'))
	.pipe(gulp.dest('dest/css'));
});
gulp.task('js',function(){
	gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dest/js/'))
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('dest/js/'));
});
gulp.task('watch',function(){
	gulp.watch('src/*.html',['html']);
	gulp.watch('src/images/*',['img']);
	gulp.watch('src/scss/*.scss',['css']);
	gulp.watch('src/js/*',['js'])
})
gulp.task("default",['css','js','img','html']);
