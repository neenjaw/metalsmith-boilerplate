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
    gulp.watch('./src/*.md', gulp.series('dev-makebuild'));
    gulp.watch('./src/posts/*.md', gulp.series('dev-makebuild'));

    gulp.watch('./assets/css/*', gulp.series('dev-minify:css'));
    gulp.watch('./assets/js/*', gulp.series('dev-minify:js'));   

    gulp.watch('./dist/**/*').on('change', browserSync.reload);
});

gulp.task('dev-makebuild', run('npm run dev-makebuild'));

gulp.task('dev-postbuild', run('npm run dev-postbuild'));
gulp.task('dev-minify:css', run(['npm run dev-copy-assets','npm run dev-minify:css']));
gulp.task('dev-minify:js', run(['npm run dev-copy-assets', 'npm run dev-minify:js']));

gulp.task('default', gulp.series('dev-makebuild', 'dev-postbuild', 'serve'));