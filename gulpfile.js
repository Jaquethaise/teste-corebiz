var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('js', () => {
    return gulp
        .src('src/js/index.js',{allowEmpty:true})
        .pipe(uglify())
        .pipe(gulp.dest('js'))
})

gulp.task('sass', () => {
    return gulp
        .src('src/sass/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
})