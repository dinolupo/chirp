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
      files: ['*.js','util/**/*.js','routes/**/*.js']
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['main.js','package.json'], dest: '../../build/'},
          {expand: true, src: ['routes/**/*.js'], dest: '../../build/'},
          {expand: true, src: ['util/**/*.js'], dest: '../../build/'}
        ]
      }
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('check',['jshint']);
  grunt.registerTask('build',['clean','copy']);
  grunt.registerTask('default',['watch']);
};
