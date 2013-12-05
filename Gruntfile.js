module.exports = function(grunt) {

  grunt.initConfig({
    'chrome-extension': {
    options: {
        name: "nuxeo-ext",
        version: "0.0.1",
        id: "00000000000000000000000000000000",
        updateUrl: "http://example.com/extension/111111/",
        chrome: "/usr/lib/chromium-browser/chromium-browser",
        clean: true,
//        certDir: 'cert',
        buildDir: 'build',
        resources: [
            "ext/**"
        ]
    }
  },
  });

  grunt.loadNpmTasks('grunt-chrome-compile');

  grunt.registerTask('default', ['chrome-extension']);

};