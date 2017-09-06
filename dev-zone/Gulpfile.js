const path = require('path'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    pump = require('pump');

gulp.task('sass', (errorHandler) => {

    pump([
        gulp.src(path.join(__dirname, '/sass/index.scss')),
        sourcemaps.init(),
        sass({ outputStyle: 'compressed' }).on('error', sass.logError),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        sourcemaps.write(),
        rename('index.css'),
        gulp.dest(path.resolve(__dirname, '../public/css')),
    ], errorHandler)

})

gulp.task('models', (errorHandler) => {
    pump([
        gulp.src(path.join(__dirname, './models/*.js')),
        babel({
            "presets": [
                [
                    "env",
                    {
                        "targets": {
                            "browsers": ["last 2 versions", "ie >= 7"],
                            "node": "current"
                        }
                    }
                ]
            ]
        }),
        uglify(),
        gulp.dest(path.resolve(__dirname, '../models'))
    ], errorHandler)

})

gulp.task('routes', (errorHandler) => {
    pump([
        gulp.src(path.join(__dirname, './routes/*.js')),
        babel({
            "presets": [
                [
                    "env",
                    {
                        "targets": {
                            "browsers": ["last 2 versions", "ie >= 7"],
                            "node": "current"
                        }
                    }
                ]
            ]
        }),
        uglify(),
        gulp.dest(path.resolve(__dirname, '../routes'))
    ], errorHandler)

})

gulp.task('server_file', (errorHandler) => {
    pump([
        gulp.src(path.join(__dirname, 'server.js')),
        babel({
            "presets": [
                [
                    "env",
                    {
                        "targets": {
                            "browsers": ["last 2 versions", "ie >= 7"],
                            "node": "current"
                        }
                    }
                ]
            ]
        }),
        uglify(),
        gulp.dest(path.resolve(__dirname, '../'))
    ], errorHandler)

})

gulp.task('default', ['sass', 'models', 'routes', 'server_file']);