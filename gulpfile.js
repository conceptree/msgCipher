const { src, dest, watch, series } = require('gulp');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// JavaScript Task
function jsTask(){
  return src('./src/main.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['./src/'], series(jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
  jsTask,
  browsersyncServe,
  watchTask
);