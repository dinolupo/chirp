module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {expand: true, src: ['app.js','package.json'], dest: '../build/'},
          {expand: true, src: ['routes/*'], dest: '../build/'},
          {expand: true, src: ['static/**/*'], dest: '../build/'},
          {expand: true, src: ['util/*'], dest: '../build/'}
        ]
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('build', ['copy']);
};
