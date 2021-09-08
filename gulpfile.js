const projectFolder = "public";
const srcFolder = "src";

const path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: srcFolder + "/*.html",
    css: srcFolder + "/scss/style.scss",
    js: srcFolder + "/js/script.js",
    img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: srcFolder + "/fonts/*.ttf",
  },
  watch: {
    html: srcFolder + "/**/*.html",
    css: srcFolder + "/scss/**/*.scss",
    js: srcFolder + "/js/**/*.js",
    img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + projectFolder + "/",
};

const { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  del = require("del"),
  sass = require("gulp-sass")(require("sass")),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  gcmq = require("gulp-group-css-media-queries"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename");

function browserSyncReloadPage() {
  browserSync.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function buildStyles() {
  return (
    src(path.src.css)
      // .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(gcmq())
      .pipe(autoprefixer({ overrideBrowserslist: ["last 5 versions"] }))
      // .pipe(sourcemaps.write("./maps"))
      .pipe(dest(path.build.css))
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(rename({ extname: ".min.css" }))
      .pipe(dest(path.build.css))
      .pipe(browserSync.stream())
  );
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], buildStyles);
}

function deletePublicFolder() {
  return del(path.clean);
}

const build = gulp.series(
  deletePublicFolder,
  gulp.parallel(buildStyles, html)
);
const watch = gulp.parallel(build, watchFiles, browserSyncReloadPage);

exports.buildStyles = buildStyles;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
