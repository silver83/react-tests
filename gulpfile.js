var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    jsx = require('gulp-jsx'),
    watch = require('gulp-watch'),
    path = require('path'),
    splicer = require('labeled-stream-splicer');

var scripts = 'js/*.js',
  other = '*.html',
  pub = 'public/';

var generic_pipe = splicer.obj([]);

gulp.task('jsx', function() {
    var dest = path.join(pub, 'js');
    return gulp.src(scripts)
        .pipe(watch(scripts))
        .pipe(generic_pipe)
        .pipe(jsx())
        .pipe(gulp.dest(dest));
});

gulp.task('other', function() {
    var dest = pub;
    return gulp.src(other)
        .pipe(watch(other))
        .pipe(generic_pipe)
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    generic_pipe.push(livereload());
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
gulp.task('default', [ 'webserver', 'jsx', 'other', 'watch'  ]); //, 'scripts', 'images']);
