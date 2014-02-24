module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			sass: {
				files: ['src/css/scss/*.scss','src/css/scss/*/*.scss'],
				tasks: ['sass']
			} 
		},
		sass: {
			dist: {
				files: {
					'src/css/styles.css': 'src/css/scss/main.scss'
				}
			}
		}
	});

	// Load some plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Dev mode
	grunt.registerTask('dev', ['watch']);

};
