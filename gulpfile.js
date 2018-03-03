var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var run = require('gulp-run-command').default;

// Static server
gulp.task('serve', function () {
    browserSync.init({
        server: './dist/',
        files: ['./src/' + '**/*']
    });

    gulp.watch('./layouts/**/*.hbs', gulp.series('dev-makebuild'));
    gulp.watch('./src/**/*.md', gulp.series('dev-makebuild'));
    gulp.watch('./assets/**/*', gulp.series('dev-postbuild'));
    gulp.watch('./dist/**/*').on('change', browserSync.reload);
});

gulp.task('dev-makebuild', run('npm run dev-makebuild'));

gulp.task('dev-postbuild', run('npm run dev-postbuild'));

gulp.task('default', gulp.series('dev-makebuild', 'dev-postbuild', 'serve'));