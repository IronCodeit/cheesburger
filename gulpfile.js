//C пом синт-са деструктуриз-ии берём то, что нам нужно и ложим в соотв-ие перем-е.
//Импортируем gulp.
const { src, dest, task, series, watch, parallel } = require('gulp');
//Описание таска. C пом. этой ф-ии gulp прочит-т сод-е 1 или неск-х файлов.
const rm = require('gulp-rm');
const sass = require('gulp-sass');
//В кач-ве компилятора ук-ть комп-р на node.js.
const concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
//.create(); - метод нужен для создания сервера.
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;
//Перем-е окруж-я лежат в объекте process(это глобальный объект в node.js в поле .env). .NODE_ENV - имя переменной.
const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS, TSW_LIBS } = require('./gulp.config');
sass.compiler = require('node-sass');


//Установка плагина.
task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false })
        .pipe(rm());
});
//Т.к. метод src импортирован отдельно то из return gulp.src('app/tmp/**/*', { read: false }).pipe(rm()); - оставим return gulp.src('app/tmp/**/*', { read: false }).pipe(rm());
//'dist/**/*' - озн-т в папке dist удалять всё.
//{ read: false } - озн-т, что 'dist/**/*' - данный файл, к-й я подгрузил не надо читать, а просто произвести действие, т.е. просто удалить.
//В назв. task('clean:tmp', function () { - оставляем только clean, а function () - зам-м на ()=>, просто потому что так короче.
//task - метод, вызываем его из объекта gulp: const { src, dest, task }...


//Передача набора файлов при помощи массива.
/* const files = [
    'src/styles/*.scss',
    '!src/styles/two.scss'
]; */
//src/styles/one.scss - конкр. файл.
//src/styles/*.scss- все файлы scss.
//!src/styles/two.scss - кроме two.scss.
//task('copy', () => вместо  task('copy', () => { - для идентичности.
//series - метод, необх-й для реализ-ии послед-ти тасков. При этом exports.copy = copy - закомментировать.


task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
    //Перезапуск браузера и исп-ие его внутри потока.
});
//.pipe(reload({ stream: true })) - После того, как произошли все изм-я с файлами запустим reload.
//При таком способе вызова series('clean', таск, к-й будет вызван в серии - это clean, д.б. объявлен выше.
//Обраб-м main.scss и запис-м рез-т данной ф-ии в др-ю ф-ию, к-я запишет этот рез-т в какой-то файл с пом метода .pipe().
//C пом данного метода перед-м ф-ю dest, она записыв-т файлы и ложит их в папку dist.
//src(src/styles/req.*.scss) - шаблоны.
//src(src/styles/*.scss) - шаблоны.
//src(src/**/*.scss - значит внутри папки src не важно с каким названием.

//Экспортирование данного таска для возм-ти его вызова.
//exports.copy = copy
//exports.copy = copy: export.copy - export это объект, .copy это назв-е, оно м.б. любым, = copy это присв-е кода верхней ф-ии.


//Путь тут пропис-м относ-о gulpfile.js.
//.css - не смотря на то, что подкл-й фаил в формате .css, он будет обработан компилятором норм.


task('styles', () => {
    return src([
        ...STYLE_LIBS,
        'src/styles/main.scss'
    ])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        //Для отладки в dev-tools инициализируем запись сорсмапов.
        .pipe(concat('main.min.scss'))
        //склеив-е в main.scss всех указ-х файлов.
        .pipe(sassGlob())
        //подкл-е в main.scss всех файлов .scss c @import 1 раз.
        .pipe(sass().on('error', sass.logError))
        //Компиляция.
        .pipe(px2rem())
        .pipe(gulpif(env === 'prod',
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        ))
        .pipe(gulpif(env === 'prod', gcmq()))
        //Группировка медиа-запросов.
        .pipe(gulpif(env === 'prod', cleanCSS()))
        //Сжимание файла со стилями.
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        //Запись сорсмапов после всех манипуляций.
        //.write() - сюда можно зап-ь конкр-ю папку, если ничего не ук-ть, то указ-ия будут записаны в гот-м файле.
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});
//.pipe(gulp.dest('dist')); - удалим gulp, т.к. у нас отдельно импортирован данный метод.
//main.scss - следим только за этим файлам, т.к. в него подкл-ы ост-е.
//.pipe(concat('main.scss')) - т.е. склеивать в main.scss.


// /jquery.js - выбираем не мин.js, т.к. минифицировать будем самост-о.


task('scripts', () => {
    return src([...JS_LIBS, ...TSW_LIBS, 'src/scripts/*.js'])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', { newLine: ';' }))
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});
//Подобной конф-ии для сборки js будет дост-о не для 1 стр-х прил-й, если необх-а более продв-я обр-ка js, его зав-ей - то исп-ют webpack. У gulp есть плагин webpack.


task('icons', () => {
    return src('src/img/icons/*.svg')
        .pipe(svgo({
            plugins: [
                {
                    removeAttrs: { attrs: '(fill|stroke|style|width|height|data.*)' }
                }
            ]
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest(`${DIST_PATH}/img/icons`));
});


task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});
//},open: false Данная команда запретит target _blank.
//.init - треб-ся вызв-ь данный метод, куда перед-ь настр. для данного сервера.


task('watch', () => {
    watch('./src/styles/**/*.scss', series('styles'));
    //Следить за изменениями в файлах позволяет метод watch и когда произ-ут изм-ия будет вызван task styles.
    watch('./src/*.html', series('copy:html'));
    //будем следить за файлом html и выполнять task 'copy:html'.
    watch('./src/scripts/*.js', series('scripts'));
    //будем следить за файлом js и выполнять task 'scripts'.
    watch('./src/img/icons/*.svg', series('icons'));
    //будем следить за файлом svg и выполнять task 'icons'.    
});

task('default',
    series(
        'clean',
        parallel('copy:html', 'styles', 'scripts', 'icons'),
        parallel('watch', 'server')
    )
);
//server - вст-ся последним, т.к. есть смысл его запускать только тогда, когда ост-е файлы готовы к обр-ке.
//task'default' - эта задача описывает последовательность других задач.
//series - метод, необх-й для реал-ии посл-ти тасков.

task('build',
    series(
        'clean',
        parallel('copy:html', 'styles', 'scripts', 'icons')
    )
);