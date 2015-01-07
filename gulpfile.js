/**
 * gulpfile - breakfast meeting - react with awesome animals
 * ---
 *
 * @task default
 *   Builds the project
 *
 * @task watch
 *   Builds the project and starts the watch tasks to rebuild public on change
 *
 * @arg -d
 *   dev/debug builds
 */

var args        = require( 'minimist' )( process.argv.slice( 2 ) );

var gulp        = require( 'gulp' );
var $           = require( 'gulp-load-plugins' )();
var del         = require( 'del' );
var source      = require( 'vinyl-source-stream' );

var browserify  = require( 'browserify' );
var reactify    = require( 'reactify' );
var envify      = require( 'envify' );
var watchify    = require( 'watchify' );


/**
 * Pre-prep for notification
 */
var ping = function( msg ) {
    return $.notify({
        title: 'Build',
        message: msg,
        sound: 'Glass'
    });
};


/**
 * Cleans up the built folder
 */
gulp.task( 'clean', function( done ) {
    del([
        'dist'
    ], done );
});


/**
 * Copies over static assets
 */
gulp.task( 'copy', function() {
    return gulp
        .src([
            './src/assets/**'
        ])
        .pipe( gulp.dest( './dist/assets' ) )
        .pipe( $.livereload({
            auto: false
        }));
});


/**
 * Styles
 * ---
 */
gulp.task( 'styles', function() {
    return gulp
        .src( './src/styles/main.less' )
        .pipe( $.plumber() )
        .pipe( $.if( !!args.d, $.sourcemaps.init() ) )
        .pipe( $.less({
            paths: [
                '.',
                './src/vendor/lesshat/build'
            ]
        }))
        .pipe( $.if( !args.d, $.minifyCss() ) )
        .pipe( $.if( !!args.d, $.sourcemaps.write() ) )
        .pipe( gulp.dest( './dist/' ) )
        .pipe( ping( 'Styles built' ) )
        .pipe( $.livereload({
            auto: false
        }));
});



/**
 * Scripts
 * ---
 *
 * Compiles jsx to js and additionally runs an es6ify pass via reactify (es6 subset only).
 * Dev builds output sourcemaps of course :)
 * In prod mode will also uglify and strip sourcemaps.
 */
gulp.task( 'scripts', function() {
    // Basic bundler
    var bundler = browserify({
        entries: './src/scripts/main.jsx',
        debug: !!args.d
    });

    // Add a watcher to wrap the bundler
    var watcher = (function() {
        if ( !args.w ) {
            return null;
        }

        return watchify( bundler )
            .on( 'update', compile )
            .on( 'log', print );
    })();

    // The meat of the compile process
    function compile() {
        var compiler = watcher || bundler;

        return compiler
            .transform( envify )
            .transform( reactify, {
                es6: true,
                target: 'es5'
            })
            .bundle()
            .on( 'error', $.util.log.bind( $.util, 'Browserify error' ) )
            .pipe( source( 'main.js' ) )
            .pipe( $.if( !args.d, $.streamify( $.uglify() ) ) )
            .pipe( gulp.dest( './dist/' ) )
            .pipe( ping( 'Scripts built' ) )
            .pipe( $.livereload({
                auto: false
            }));
    }

    function print( bytes ) {
        $.util.log( 'Bundle:', $.util.colors.green( bytes ) );
    }

    return compile();
});


/**
 * Builds everything
 */
gulp.task( 'build', [ 'styles', 'scripts', 'copy' ] );


/**
 * Watches and reloads
 * ---
 *
 * Note: scripts are watched via watchify rather than gulp.watch
 */
gulp.task( 'watch', [ 'clean' ], function() {
    args.w = true;

    return gulp.start(
        'build', function() {
            $.livereload.listen({
                auto: true
            });

            gulp.watch( './src/styles/**', [ 'styles' ] );
            gulp.watch( './src/assets/**', [ 'copy' ] );

            $.util.log( 'Watching...' );
        }
    );
});


 /**
 * Default task
 */

gulp.task( 'default', [ 'clean' ], function( done ) {
    return gulp.start(
        'build', function() {
            $.util.log( 'Build Complete', $.util.colors.green( '✔︎' ) );
            done();
        }
    );
});
