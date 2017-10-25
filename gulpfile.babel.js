import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';
import copy from 'gulp-copy';

const tsProject = ts.createProject('tsconfig.json');

const paths = {
    src: './src/**/*',
    dist: './dist'
}

gulp.task('clean', () => {
    return del(paths.dist);
});

gulp.task('build', () => {
    return gulp.src(paths.src)
        .pipe(tsProject())
        .pipe(sourcemaps.init())
        // .pipe(babel())
        // .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-npm-data', () => {
    return gulp.src([
            '.npmignore',
            'package.json',
            'index.d.ts',
            'README.md'
        ])
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-windows-bin', () => {
    return gulp.src('WinAssociatedIcon/WinAssociatedIcon/bin/Release/**/*')
        .pipe(gulp.dest(`${paths.dist}/bin/windows`));
})

gulp.task('default', gulp.series([
    'clean',
    'build',
    'copy-npm-data',
    'copy-windows-bin',
]));