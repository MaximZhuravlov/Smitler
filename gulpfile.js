let gulp = require("gulp");
let sass = require("gulp-sass");
let browserSync = require("browser-sync");
let terser = require("gulp-terser");
let concat = require("gulp-concat");
let cleanCSS = require("gulp-clean-css");
let del = require("del");
let autoprefixer = require("gulp-autoprefixer");

gulp.task("html", function () {
	return gulp.src("app/**/*.html") /* 'return' indicates that the task is asynchronous */
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("scss", function () {
	return gulp.src("app/scss/**/*.scss")
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 8 versions"]
		}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("css-libraries", function () {
	return gulp.src([
		"node_modules/reset-css/reset.css",
		"node_modules/font-awesome/css/font-awesome.min.css",
		"node_modules/mmenu-js/dist/mmenu.css",
		"node_modules/mmenu-js/dist/core/offcanvas/mmenu.offcanvas.css",
		"node_modules/mmenu-js/dist/extensions/pagedim/mmenu.pagedim.css",
		"node_modules/mmenu-js/dist/extensions/positioning/mmenu.positioning.css",
		"node_modules/mmenu-js/dist/extensions/themes/mmenu.themes.css",
		"node_modules/mburger-css/dist/mburger.css",
		"node_modules/fotorama/fotorama.css",
		"node_modules/slick-carousel/slick/slick.css",
		"node_modules/selectric/public/selectric.css",
		"node_modules/animate.css/animate.css"
	])
		.pipe(concat("libs.min.css"))
		.pipe(cleanCSS({
			 compatibility: 'ie8'
		}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("js", function () {
	return gulp.src("app/js/**/*.js")
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("js-libraries", function () {
	return gulp.src([
		"node_modules/mmenu-js/dist/mmenu.js",
		"node_modules/fotorama/fotorama.js",
		"node_modules/slick-carousel/slick/slick.min.js",
		"node_modules/selectric/public/jquery.selectric.min.js"
	])
		.pipe(concat("libs.min.js"))
		.pipe(terser())
		.pipe(gulp.dest("app/js"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("browser-sync", function () {
	browserSync.init({
		server: {
			baseDir: "app/"
		},
		notify: false
	});
});

gulp.task("clean", async function () {
	del.sync("dist");
});

gulp.task("export", function () {
	let buildHTML = gulp.src("app/**/*.html")
		.pipe(gulp.dest("dist"));
	let buildCSS = gulp.src("app/css/**/*.css")
		.pipe(gulp.dest("dist/css"));
	let buildJS = gulp.src("app/js/**/*.js")
		.pipe(gulp.dest("dist/js"));
	let buildFonts = gulp.src("app/fonts/**/*.*") /* any format */
		.pipe(gulp.dest("dist/fonts"));
	let buildImages = gulp.src("app/images/**/*.*") /* any format */
		.pipe(gulp.dest("dist/images"));
});

gulp.task("watch", function () {
	gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
	gulp.watch("app/**/*.html", gulp.parallel("html"));
	gulp.watch("app/js/**/*.js", gulp.parallel("js"));
});

gulp.task("build", gulp.series("export", "clean"));

gulp.task("default", gulp.parallel("css-libraries", "js-libraries", "browser-sync", "watch"));