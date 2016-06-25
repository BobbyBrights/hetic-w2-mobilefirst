/********************************************************************************************/
//	PLUGINS GULP
/********************************************************************************************/

// Gulp et utilitaires de base
var gulp 			= require('gulp'); // Intégration de gulp
var	browserSync 	= require('browser-sync').create(); // Preview de la page
var rename 			= require('gulp-rename'); // Renome les fichiers

// Gestion du CSS
var	sass 			= require('gulp-sass'); // Compilation des fichiers SASS
var	autoprefixer 	= require('gulp-autoprefixer'); // Rajout des prefixes navigateur
var	cleanCSS 		= require('gulp-clean-css'); // Minification du CSS

// Gestion du JS
var	uglify 			= require('gulp-uglify'); // Minification des fichiers JS

// Gestion de l'html
var prettify 		= require('gulp-prettify'); // Améliore l'indentation du ficher HTML

// Fonctions générales
var	concat 			= require('gulp-concat'); // Concaténation des fichiers
var imagemin 		= require('gulp-imagemin'); // Minification des images


/********************************************************************************************/
//	VARIABLES ET CONFIGURATION
/********************************************************************************************/

// Variables pour les dossiers racine
var basePaths = {
    src: 'src/',
    dist: 'dist/',
    lib: 'lib/'
};

// Variables pour les sous-dossiers
var paths = {
    images: {
        src: basePaths.src + 'img/',
        dist: basePaths.dist + 'img/'
    },
	js: {
		src: basePaths.src + 'js/',
		dist: basePaths.dist + 'js/'
	},
    css: {
        src: basePaths.src + 'css/',
        dist: basePaths.dist + 'css/'
    },
    scss: {
        src: basePaths.src + 'scss/'
    },
    fonts: {
        src: basePaths.src + 'fonts/',
		dist: basePaths.dist + 'fonts/'
    }
};

// Variables de configuration pour browserSync
var reload      	= browserSync.reload;
var port 			= process.env.PORT || 8001;


/********************************************************************************************/
//	DEFINITION DES VARIABLES
/********************************************************************************************/
var orderFiles = {
	scripts: [
		basePaths.lib + 'jquery-1.12.4.js', // Jquery
		paths.js.src + 'main.js' // Javascript propre au site
	],
	styles: [
		paths.scss.src + 'style.scss' // Style scss
	]
};


/********************************************************************************************/
//	GENERAL
/********************************************************************************************/

gulp.task('server', function() {
	var files = [
            './**/*'
        ];
    browserSync.init({
		port: port,
        files : files,
        watchOptions : {
            ignored : 'node_modules/*',
            ignoreInitial : true
        },
		server: {
			baseDir: basePaths.src
		}
    });
});


/********************************************************************************************/
//	DEVELOPPEMENT
/********************************************************************************************/

gulp.task('devJS', function() {
	gulp.src(orderFiles.scripts)
		.pipe(concat('script.js'))
		.pipe(gulp.dest(paths.js.src))
});

gulp.task('devCSS', function() {
    gulp.src(orderFiles.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css.src))
});


/********************************************************************************************/
//	PRODUCTION
/********************************************************************************************/

gulp.task('prodJS', function() {
	gulp.src(paths.js.src+'script.js')
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dist))
});

gulp.task('prodCSS', function() {
    gulp.src(paths.css.src+'style.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.css.dist))
});

gulp.task('folderSync', function() {
	gulp.src([paths.fonts.src+'**']).pipe(gulp.dest(paths.fonts.dist))
	gulp.src(basePaths.src+'*.html')
    .pipe(prettify({indent_size: 4}))
	gulp.src([basePaths.src+'*.{html,php}'])
	.pipe(gulp.dest(basePaths.dist))
});

gulp.task('imagemin', () =>
    gulp.src(paths.images.src+'**')
        .pipe(imagemin({
			progressive: true,
	        interlaced: true
		}))
        .pipe(gulp.dest(paths.images.dist))
);


/********************************************************************************************/
//	WATCH
/********************************************************************************************/

gulp.task('watch',function() {
    gulp.watch(paths.scss.src+'**/*.scss', ['devCSS']);
	gulp.watch(paths.js.src+'**/*.js', ['devJS']);
});


/********************************************************************************************/
//	TÂCHES
/********************************************************************************************/

// Tâche incluant la visualisation live
gulp.task('live', ['watch', 'server']);

// Tâche pour le développement
gulp.task('dev', ['devJS', 'devCSS']);

// Tâche pour la production
gulp.task('prod', ['prodJS', 'prodCSS', 'folderSync', 'imagemin']);
