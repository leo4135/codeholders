const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const minifyCSS = require('gulp-minify-css');

gulp.task('less', function(done) {
  return gulp.src("src/less/style.less")
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(gulp.dest("./public"))
      .pipe(browserSync.stream());

  done();
});

gulp.task('serve', function(done){
    browserSync.init({
       server: "./public"
    });

    gulp.watch("src/less/*.less", gulp.series('less'));
    gulp.watch("public/*.html").on('change', () => {
        browserSync.reload();
        done();
    });

    done();
});

gulp.task('default', gulp.series('less', 'serve'));