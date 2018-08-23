let config = require('./config.dev.js');

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let less = require('gulp-less');
let minifyCSS = require('gulp-minify-css');
let gutil = require('gulp-util');
let autoprefixer = require('gulp-autoprefixer');
let ftp = require('vinyl-ftp');
let rigger = require('gulp-rigger');
let notify = require("gulp-notify");
let plumber = require("gulp-plumber");
let sourcemaps = require('gulp-sourcemaps');

let getJsSource = function (value) {
    return './src/js/' + value + ".js";
};
let getLessSource = function (value) {
    return './src/css/' + value + ".less";
}
let libsSource = ['jquery.min', 'jquery-ui.min', 'jquery-ui.touch-punch', 'jquery.custom-scroll.min', 'jquery.fancybox.min', 'jquery.inputmask.bundle.min', 'waves.min'];
let jsSource = [
    "config",
    "Service.class",
    "Debug.class",
    "UIController.class",
    "UIHelpers.class",
    "UICounter.class",
    "UICheckbox.class",
    "UISelect.class",
    "UISearch.class",
    "UITabs.class",
    "UIPreloader.class",
    "UICarousel.class",
    "Overlay.class",
    "Toast.class",
    "WindowState.class",
    "CatalogSearchController.class",
    "Cart.class",
    "CartProduct.class",
    "GeographyOrder.class",
    "OrderStage.class",
    "main-page",
    "ProductPage.class",
    "Optics.class",
    "FeedbackController.class",
    "template",
    "Catalog.class",
    "MiniCart.class",
    "GeoNetwork.class",
    "Speller.class",
    "PharmacyInfo.class",
    "Analytics.class",
    "Auth.class",
    "CustomScrollController.class",
    "FancyboxController.class",
    "WavesEffectController.class",
    "thanks",
    "Feedback.class",
    "init"
];
let lessSource = [
    'project',
    'template',
    'elements',
    'grid',
    'index',
    'catalog',
    'cart',
    'profile',
    'geo',
    'product',
    'auth',
    'order',
    'articles-list',
    'inner-page',
    'stages',
    'pharmacy',
    'error404',
    'popup',
    'company-infographic',
    'geo-network',
    'custom',
    'responsive',
    'jquery.fancybox',
    'sprites',
    'jquery-ui',
    'jquery-ui.theme',
    'jquery.custom-scroll',
    'waves'
]
gulp.task('js', function () {
    gulp.src(libsSource.map((item) => getJsSource(item)))
        .pipe(concat('./libs.js'))
        .pipe(gulp.dest('./dist/js'));
    gulp.src(jsSource.map((item) => getJsSource(item)))
        //.pipe(sourcemaps.init())
        .pipe(concat('./script.min.js'))
        .pipe(babel({
            presets: ['env', 'stage-2']
        }))
        //.pipe(uglify())
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
    console.log(`${jsSource.map((item) => getJsSource(item))}\nfiles Compiled`);
});

gulp.task('less', function () {

    gulp.src(lessSource.map((item) => getLessSource(item)))
        .pipe(concat('./style.css'))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest("./dist/css"));
    console.log(`${lessSource.map((item) => getLessSource(item))}\nfiles Compiled`);
});

gulp.task('default', function () {
    gulp.watch('./src/css/*.less', ['less']);
    gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('deploy', function () {
    var connect = ftp.create({
        host: config.ftp.host,
        user: config.ftp.user,
        password: config.ftp.password,
        parallel: 10,
        log: gutil.log
    });
    let globs = [
        'dist/css/**',
        'dist/js/*.js',
        'dist/js/*.map',
        'src/**',
        'gulpfile.js',
        'package.json'
    ];
    return gulp.src(globs, {
            base: './',
            buffer: false
        })
        .pipe(connect.newer(config.ftp.url))
        .pipe(connect.dest(config.ftp.url));
});