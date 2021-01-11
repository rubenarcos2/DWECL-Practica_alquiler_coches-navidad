const gulp = require("gulp");
const { src, dest } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const purgecss = require("gulp-purgecss");
const imagemin = require("gulp-imagemin");
const gls = require("gulp-live-server");
const useref = require("gulp-useref");
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const del = require('del');
const jsdoc = require('gulp-jsdoc3');
const ttf2woff = require('gulp-ttf2woff');

//Generate dist folder
function cleanDistFolder() {
  return del(['dists']);
}

//Minifications
function minifyHtml() {
  return src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true , allowEmpty: true}))
    .pipe(dest("dist"));
}

function minifyJs() {
  return src("src/*.js")
    .pipe(uglify())
    .pipe(dest("dist"));
}

function minifyCss() {
  return src("src/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("dist/css"));
}

//Ofuscation js
function ofuscatorJs(){
  return src("dist/**/*.js")
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('dist'));
}

//Assets works
function autoPrefixer() {
  src("src/assets/style/*.css")
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(dest("dist/styles"));
}

function purgeCss() {
  return src("src/assets/style/*.css")
    .pipe(
      purgecss({
        content: ["*.html"],
      })
    )
    .pipe(dest("dist/styles"));
}

function imageMin(cb) {
  src("src/assets/images/*")
  .pipe(imagemin())
  .pipe(dest("dist/img"));
  cb();//Add this because this is async function, add 'cb' param of stream and invocate it
}

function font() {
  return gulp.src(['src/assets/fonts/*.ttf'])
  .pipe(ttf2woff())
  .pipe(gulp.dest('dist/fonts'));
}

//Live Server on deploy
function liveServer() {
  const serve = gls.static("dist", 8888);
  serve.start();
}

//Reference works
function useRef() {
  return src("./*.html")
    .pipe(useref())
    .pipe(rename("index.html"))
    .pipe(dest("dist"));
}

function useRefJs() {
  return src("./**/*.js")
    .pipe(useref())
    .pipe(dest("dist/scripts"));
}

function useRefCss() {
  return src("src/assets/style/*.css")
    .pipe(useref())
    .pipe(dest("dist/styles"));
}

//Documentation
function jsDoc(cb){
  return src(['../README.md', './src/**/*.js'], {read: false})
    .pipe(jsdoc(cb));
}

exports.cleanDistFolder = cleanDistFolder;
exports.minifyHtml = minifyHtml;
exports.minifyCss = minifyCss;
exports.autoPrefixer = autoPrefixer;
exports.purgeCss = purgeCss;
exports.imageMin = imageMin;
exports.ttf2woff = font;
exports.liveServer = liveServer;
exports.useRef = useRef;
exports.useRefJs = useRefJs;
exports.useRefCss = useRefCss;
exports.minifyJs = minifyJs;
exports.ofuscatorJs = ofuscatorJs;
exports.jsDoc = jsDoc;

gulp.task(
  "default",
  
  gulp.series(
    gulp.parallel(
      imageMin,
      font,
      jsDoc
    ),
    cleanDistFolder,
    useRef,
    minifyJs,    
    minifyHtml,
    minifyCss,
    purgeCss,   
    ofuscatorJs
    //liveServer   
  )  
);