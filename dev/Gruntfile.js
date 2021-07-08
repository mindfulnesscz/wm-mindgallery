'use strict';
module.exports = function ( grunt ) {

	grunt.initConfig( {
		sass: {
			dist: {
				options: {
					style: 'compressed',
					compass: false,
					sourcemap: false
				},
				files: {
					'../assets/css/mg-backend.css': [
						'src/sass/style.sass'
					]
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: [
					'src/sass/**/*.sass'
				],
				tasks: [ 'sass' ]
			}
		},
		clean: {
			dist: [
				'../assets/css/mg-backend.css',
			]
		}
	} );

	// Load tasks
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );

	// Register tasks
	grunt.registerTask( 'default', [
		'clean',
		'sass'
	] );
	grunt.registerTask( 'dev', [
		'watch'
	] );

};