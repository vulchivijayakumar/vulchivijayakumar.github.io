// gruntfile.js
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

	  sass: {
	    options: {
	      sourceMap: true
	    },
	    dev: {
	      files: [{
	        expand: true,
	        cwd: 'source/styles/',
	        src: '**/*.scss',
	        dest: 'source/assets/styles',
	        ext: '.css'
	      }]
	    },
	    prod: {
	      options: {
	        sourceMap: false
	      },
	      files: [{
	        expand: true,
	        cwd: 'source/styles/',
	        src: '**/*.scss',
	        dest: 'build/assets/styles',
	        ext: '.css'
	      }]
	    }
	  },
	  copy: {
	  	dev: {
        files: [
          {
            cwd: 'source/styles',
            src: [
              'fonts/**/*',
              'images/**/*'
            ],
            expand: true,
            dest: 'source/assets/styles'
          },
          {
            cwd: 'source/javascripts/',
            src: [
              '**/*.js'
            ],
            expand: true,
            dest: 'source/assets/javascripts'
          },
          {
            cwd: 'source/javascripts',
            src: [
              '**/*.json'
            ],
            expand: true,
            dest: 'source/assets/javascripts'
          }
        ]
      },
      prod: {
        files: [
          {
            cwd: 'build/styles',
            src: [
              'fonts/**/*',
              'images/**/*'
            ],
            expand: true,
            dest: 'build/assets/styles'
          },
          {
            cwd: 'source/javascripts/',
            src: [
              '**/*.js'
            ],
            expand: true,
            dest: 'build/assets/javascripts'
          },
          {
            cwd: 'source/javascripts',
            src: [
              '**/*.json'
            ],
            expand: true,
            dest: 'build/assets/javascripts'
          }
        ]
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: [
              '> 1%',
              'last 5 versions',
              'ie 11'
            ]
          }),
          require('postcss-flexbugs-fixes')
        ]
      },
      dev: {
        options: {
          map: true
        },
        files: [{
          cwd: 'source/assets/styles/',
          src: '**/*.css',
          expand: true,
          dest: 'source/assets/styles',
          ext: '.css'
        }]
      },
      prod: {
        files: [{
          cwd: 'source/assets/styles/',
          src: '**/*.css',
          expand: true,
          dest: 'build/assets/styles',
          ext: '.css'
        }]
      }
    },
    cssmin: {
    	dev: {
        files: [{
          cwd: 'source/assets/styles/',
          src: '**/*.css',
          expand: true,
          dest: 'source/assets/styles',
          ext: '.css'
        }]
      },
      prod: {
        files: [{
          cwd: 'source/assets/styles/',
          src: '**/*.css',
          expand: true,
          dest: 'build/assets/styles',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: [
          'source/styles/**/*.scss'
        ],
        tasks: [
          'sass:dev',
          'postcss:dev'
        ]
      },
      js: {
        files: [
          'source/javascripts/**/*.js'
        ]
      },
      assets: {
        files: [
          'source/styles/images',
          'source/styles/fonts'
        ]
      }
    }

  });

  // Load the plugin that provides the "grunt-sass" task.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('dev', [
    'sass:dev',
    'copy:dev',
    'postcss:dev',
    'cssmin:dev',
    'watch'
  ]);

  grunt.registerTask('build', [
    'sass:prod',
    'copy:prod',
    'postcss:prod',
    'cssmin:dev'
  ]);

};