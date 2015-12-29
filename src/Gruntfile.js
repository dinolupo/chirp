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
      files: ['**/*.js',
              '!public/app.js',
              '!node_modules/**/*.js',
              '!public/bower_components/**/*.js',
              '!gruntfile.js']
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['routes/**/*.js'], dest: '../build/'},
          {expand: true, src: ['util/**/*.js'], dest: '../build/'},
          {expand: true, src: ['main.js'], dest: '../build/'},
          {expand: true, src: ['package.json'], dest: '../build/'},
          {expand: true, src: ['public/bower_components/**/*'], dest: '../build/'},
          {expand: true, src: ['public/css/**/*'], dest: '../build/'},
          {expand: true, src: ['public/images/**/*'], dest: '../build/'},
          {expand: true, src: ['public/partials/**/*'], dest: '../build/'},
          {expand: true, src: ['public/app.js'], dest: '../build/'},
          {expand: true, src: ['public/index.html'], dest: '../build/'},
          {expand: true, src: ['public/bower.json'], dest: '../build/'}
        ]
      }
    },
    concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['public/js/**/*.js'],
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
  grunt.registerTask('default',['concat','watch']);
};
