module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      options: {
        force: true
      },
      build: ['../build/**/*']
    },
    jshint: {
      files: ['server/*.js','server/routes/**/*.js','www/js/**/*.js']
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['node_modules/**/*'], dest: '../build/'},
          {expand: true, src: ['server/**/*.js'], dest: '../build/'},
          {expand: true, src: ['www/bower_components/**/*'], dest: '../build/'},
          {expand: true, src: ['www/css/**/*'], dest: '../build/'},
          {expand: true, src: ['www/images/**/*'], dest: '../build/'},
          {expand: true, src: ['www/partials/**/*'], dest: '../build/'},
          {expand: true, src: ['www/js/app.js'], dest: '../build/'},
          {expand: true, src: ['www/*.html'], dest: '../build/'}
        ]
      }
    },
    concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['www/js/config.js','www/js/controllers/*.js','www/js/directives/*.js','www/js/services/*.js'],
          dest: 'www/js/app.js',
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
  grunt.registerTask('default',['concat','watch']);
};
