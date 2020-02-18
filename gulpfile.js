// Plugins
const {
  parallel,
  series,
  watch,
  src,
  dest
} = require('gulp');
// const pug = require('gulp-pug');
const less = require('gulp-less');
// const gcmq = require('gulp-group-css-media-queries');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const smartgrid = require('smart-grid');
const browserSync = require('browser-sync').create();
// const rename = require('gulp-rename');

// Globs
const config = {
  root: './src/',
  // pug: {
  //   src: 'pug/+(index).pug',
  //   watch: 'pug/**/*.pug',
  //   dest: './prod',
  // },
  css: {
    src: 'less/+(main).less',
    // src: 'css/style.css',
    watch: 'less/**/*.less',
    dest: 'css',
  },
  js: {
    src: 'js/+(script).js',
    watch: 'js/**/*.js',
    // prod: 'js/prod/',
  },
};

/**
 * Compile pug to html
 *
 * @return {string} Return file's paths
 */
// function html() {
//   return src(config.root + config.pug.src)
//       .pipe(pug({
//         pretty: true,
//       }))
//       .pipe(dest(config.pug.dest));
// }

/**
 * Compile less to css
 *
 * @return {string} Return file's paths
 */
function css() {
  return src(config.root + config.css.src)
    .pipe(less())
    // .pipe(gcmq())
    // .pipe(autoprefixer({
    //   browsers: ['last 2 versions'],
    // }))
    .pipe(dest(config.root + config.css.dest))
    .pipe(browserSync.stream())
  // .pipe(cleanCSS({
  //   level: 2,
  // }))
  // .pipe(rename({
  //   extname: '.min.css',
  // }))
  // .pipe(dest(config.css.dest));
}

/**
 * Initialize smart-grid library
 *
 * @param {*} done End async function
 */
// function grid(done) {
//   smartgrid('dev/less', {
//     container: {
//       maxWidth: '???',
//     },
//   });
//   done();
// }

/**
 * Initialize live reload
 *
 * @param {*} done End async function
 */
function livereload(done) {
  browserSync.init({
    server: {
      baseDir: './src/',
    },
  });

  done();
}

/**
 * Task's assignment
 */
// exports.html = html;
exports.css = css;
// exports.grid = grid;
// Build final bundle from pug, less, js
exports.build = parallel(css);

// Watch changes from pug, less, js
exports.watch = series(css, livereload,
  function () {
    watch('./src/index.html', function (done) {
      browserSync.reload();

      done();
    });

    watch(config.root + config.css.watch, css);
  });