'use strict';
// Insert livereload snippet into index.html
var lrSnippet = require('connect-livereload')({port: 35729});
// Mount `dir` as static files location
// this is the same as mounting static files location in express
var mountFolder = function( connect, dir ) {
	return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
module.exports = function( grunt ) {

	// Load used tasks
	grunt.loadNpmTasks( 'grunt-react' );
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-open' );

	grunt.initConfig( {
		// watch for file changes and autoreload 
		watch: {
			options: {
				// don't spawn multiple instances of watch tasks
				nospawn: true,
				// don't close connect server if livereloading
				livereload: true
			},
			// watch for .jsx files
			react: {
				files: [ 'public/scripts/{,*/}*.jsx' ],
				// execute tasks `react` if a .jsx file changes
				tasks: [ 'react' ]
			},
			// watch for .less files
			less: {
				files: [ 'public/styles/{,*/}*.less' ],
				tasks: [ 'less' ]
			},
			// auto reload browser if any of the files in `files` changes
			livereload: {
				options: {
					livereload: 35729
				},
				files: [
					'public/scripts/{,*/}*.jsx',
					'public/styles/{,*/}*.less'
				]
			}
		},

		react: {
			files: {
				'expand' : true,
				'cwd'    : 'public/scripts',
				'src'    : [ '**/*.jsx' ],
				'dest'   : '.tmp/scripts',
				'ext'    : '.js'
			}
		},

		less: {
			compile: {
				options: {
					ieCompat: true
				},
				files: {
					'.tmp/styles/main.css': [ 'public/styles/main.less' ]
				}
			}
		},

		// Serve a http://localhost:9090/
		connect: {
			options: {
				port: 9090,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function( connect ) {
						return [
							// attach livereload snippet in .html files
							lrSnippet,
							// mount as static for generated scripts and styles
							mountFolder(connect, '.tmp'),
							// mount as static for index.html
							mountFolder(connect, 'public')
						];
					}
				}
			}
		},

		// Open a new tab (default browser) pointing to the path
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},

		// Remove .tmp folder/files... ready for next compilations
		clean: {
			server: '.tmp'
		}
	} );
	
	// execute tasks in order
	grunt.registerTask( 'default', [ 'clean', 'react', 'less', 'connect', 'open', 'watch' ] );
};