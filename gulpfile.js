var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');
    
gulp.task('default', function(){
    nodemon({
        script:'app.js',
        ext:'js',
        env:{
            PORT:8000
        },
        ignore: ['./node_modules/**']
        
    }).on('restart', () => console.log('Restarting'));
});


gulp.task('test',function() {
    env({vars: {ENV:'Test'}});
    gulp.src('Tests/*.js', {read:false})
    .pipe(gulpMocha({
            "reporter": "mocha-jenkins-reporter",
            "reporterOptions": {
                "junit_report_name": "Tests",
                "junit_report_path": "report.xml",
                "junit_report_stack": 1
            }
        }))
});