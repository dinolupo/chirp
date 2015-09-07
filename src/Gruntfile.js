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
      files: ['package.js','server/util/**/*.js','server/routes/**/*.js']
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
          {expand: true, src: ['www/*.html'], dest: '../build/'}
        ]
      }
    },
    concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['www/js/**/*.js'],
          dest: '../build/www/js/chirp.js',
        },
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('build',['jshint','clean','copy','concat']);
  grunt.registerTask('default',['watch']);
};
