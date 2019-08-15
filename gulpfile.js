const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const dirs = {
  src: {
    html: './src/*.html',
    styles: './src/*.css',
    scripts: './src/*.js',
  },
  dist: {
    html: './dist/',
    styles: './dist/',
    scripts: './dist/',
  }
}

/* BrowserSync */
function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000,
    tunnel: true
  });
  done();
}

/* Html */
function html() {
  return gulp.src(dirs.src.html)
    .pipe(gulp.dest(dirs.dist.html))
    .pipe(browserSync.stream());
}

/* Styles */
function css() {
  return gulp.src(dirs.src.styles)
    .pipe(gulp.dest(dirs.dist.styles))
    .pipe(browserSync.stream());
}
function js() {
  return gulp.src(dirs.src.scripts)
    .pipe(gulp.dest(dirs.dist.scripts))
    .pipe(browserSync.stream());
}


function watcher(done) {
  gulp.watch('./src/**/*.html', gulp.series(html));
  gulp.watch('./src/**/*.css', gulp.series(css));
  gulp.watch('./src/**/*.js', gulp.series(js));
  done();
}

/* Tasks */
const build = gulp.parallel(html, css);
const watch = gulp.series(build, browserSyncInit, watcher);

exports.build = build;
exports.watch = watch;
exports.default = watch;