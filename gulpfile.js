var gulp = require('gulp'),
    livereload = require('gulp-livereload');
    webserver = require('gulp-webserver');
    jsx = require('gulp-jsx');

gulp.task('build', function() {
   return gulp.src('js/*.js')
        .pipe(jsx())
        .pipe(gulp.dest('js/compiled'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./**').on('change', livereload.changed);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'webserver', 'build']); //, 'scripts', 'images']);
