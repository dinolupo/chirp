module.exports = function(grunt) {

  // project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      options: {
        force: true
      },
      build: ['../build/**/*']
    },
    jshint: {
      files: ['*.js','routes/**/*.js',
              'public/js/**/*.js',
              '!public/js/socket.io.js',
              '!gruntfile.js']
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['node_modules/**/*'], dest: '../build/'},
          {expand: true, src: ['**/*.js'], dest: '../build/'},
          {expand: true, src: ['public/bower_components/**/*'], dest: '../build/'},
          {expand: true, src: ['public/css/**/*'], dest: '../build/'},
          {expand: true, src: ['public/images/**/*'], dest: '../build/'},
          {expand: true, src: ['public/partials/**/*'], dest: '../build/'},
          {expand: true, src: ['public/js/app.js'], dest: '../build/'},
          {expand: true, src: ['public/*.html'], dest: '../build/'}
        ]
      }
    },
    concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['public/js/config.js',
                'public/js/controllers/*.js',
                'public/js/directives/*.js',
                'public/js/services/*.js',
                'public/js/socket.io.js'],
          dest: 'public/app.js',
        },
    },
    watch: {
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint','concat'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('build',['jshint','clean','concat','copy']);
  grunt.registerTask('default',['jshint','concat','watch']);
};
