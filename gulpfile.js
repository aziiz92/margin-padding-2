const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

//Compiler scss en css
function style() {
    // 1. Trouver les fichiers sass
    return gulp.src('./scss/**/*.scss')
    // 2. Passer le fichier dans le compilateur
    .pipe(sass().on('error', sass.logError))
    // 3. Ou est ce que j'enregistre le css compilé
    .pipe(gulp.dest('./css'))
    // 4. stream changes to all browser
    .pipe(browserSync.stream());
}

// Rafraichir la page apres modifications des fichiers html, css et js
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./scss/**/*.scss', style, browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;