"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const pug = require("gulp-pug");
const server = require("browser-sync").create();


gulp.task("css", function () {
  return gulp.src("source/style/global.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("pug", function () {
  return gulp.src("source/pages/index.pug")
    .pipe(pug())
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/blocks/**/*.less", gulp.series("css"));
  gulp.watch("source/pages/*.pug", gulp.series("pug"));
});

gulp.task("start", gulp.series("css", "pug", "server"));
