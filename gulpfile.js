/*
* @Author: QCF
* @Date:   2017-01-05 16:41:05
* @Last Modified by:   QCF
* @Last Modified time: 2017-01-05 20:44:23
*/

var gulp = require("gulp");

var htmlmin = require("gulp-htmlmin");

var cssnano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var imagemin = require("gulp-imagemin");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
gulp.task("html", function(){
	gulp.src("*.html")
	.pipe(htmlmin({
					collapseWhitespace: true, ////压缩HTML中的空白字符
					collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input checked/>
					removeAttributeQuotes: true, //删除所有属性值的引号
					removeComments: true, //删除注释
					removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
					removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
					removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	}))
	.pipe(gulp.dest("dist/"))
	.pipe(reload({stream:true}));
});
gulp.task("css",function(){
	gulp.src("css/*.css")
	.pipe(cssnano())
	.pipe(gulp.dest("dist/css/"))
	.pipe(reload({stream:true}));
});

gulp.task("js",function(){
	gulp.src("js/*.js")
	.pipe(uglify())
	.pipe(jshint())
	.pipe(gulp.dest("dist/js/"))
	.pipe(reload({stream:true}));
});
gulp.task("lib",function(){
	gulp.src("lib/**/*.*")
	
	.pipe(gulp.dest("dist/lib/"))
	.pipe(reload({stream:true}));
});
gulp.task("img",function(){
	gulp.src("img/*.*")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/img/"))
	.pipe(reload({stream:true}));
});
gulp.task("fonts",function(){
	gulp.src("fonts/*.*")
	
	.pipe(gulp.dest("dist/fonts/"))
	.pipe(reload({stream: true}));
});

gulp.task("bulid",["html","css","js","fonts","lib","img"]);



gulp.task("serve",["bulid"],function(){
	browserSync.init({
		injectChanges: true,
    	server: "./dist"
	});
	gulp.watch("*.html",["html"]);
	gulp.watch("css/*.css",["css"]);
	gulp.watch("js/*.js",["js"]);
	gulp.watch("img/*.*",["img"]);
	gulp.watch("lib/**/*.*",["lib"]);
	gulp.watch("fonts/*.*",["fonts"]);

});
