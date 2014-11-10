var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    jsx = require('gulp-react'),
    watch = require('gulp-watch'),
    path = require('path'),
    splicer = require('labeled-stream-splicer');
    

var scripts = [ 'js/**/*.js' ],
  css = [ 'css/**/*.css' ],
  other = '*.html',
  pub = 'public/';

var generic_pipes = [];

var createGenericPipe = function() {
    var pipe = splicer.obj([]);
    generic_pipes.push(pipe);
    return pipe;
}

gulp.task('jsx', function() {
    var dest = path.join(pub, 'js');
    
    return gulp.src(scripts)
        .pipe(watch(scripts))
        .pipe(jsx())
        .pipe(createGenericPipe())
        .pipe(gulp.dest(dest));
});

gulp.task('css', function() {
    var dest = path.join(pub, 'css');
    
    return gulp.src(css)
      .pipe(createGenericPipe())
      .pipe(gulp.dest(dest));
});

gulp.task('other', function() {
    var dest = pub;
    return gulp.src(other)
        .pipe(watch(other))
        .pipe(createGenericPipe())
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    generic_pipes.forEach(function(p) { p.push(livereload()); });
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
gulp.task('default', [ 'webserver', 'jsx', 'css', 'other', 'watch'  ]); //, 'scripts', 'images']);
