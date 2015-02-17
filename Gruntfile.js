module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: '.',
          hostname: '*',
          port: 9999
        }
      }
    },
    'saucelabs-mocha': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          urls: ['http://localhost:9999/test/'],
          testname: 'Mocha Unit Test for with-promise',
          sauceConfig: {
              tags: [process.env.TRAVIS_JOB_ID, process.env.TRAVIS_COMMIT, 'withPromise', 'mocha'],
              public: 'public'
          },
          detailedError: true,
          concurrency: 2,
          maxPollRetries: 3,
          'max-duration': 300,
          browsers: [
            {browserName: 'chrome'},
            {browserName: 'firefox'},
            {browserName: 'safari', version: 7, platform: 'OS X 10.9'},
            {browserName: 'safari', version: 6, platform: 'OS X 10.8'},
            {browserName: 'internet explorer', version: 11, platform: 'Windows 8.1'},
            {browserName: 'internet explorer', version: 10, platform: 'Windows 8'},
            {browserName: 'internet explorer', version: 9, platform: 'Windows 7'},
            {browserName: 'Android', version:'4.4', platform: 'Linux'},
            {browserName: 'Android', version:'4.1', platform: 'Linux'},
            {browserName: 'Android', version:'4.0', platform: 'Linux'},
            {browserName: 'Safari', deviceName: 'iPhone Simulator', platformName: 'iOS', platformVersion:'8.1', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPhone Simulator', platformName: 'iOS', platformVersion:'8.0', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPhone Simulator', platformName: 'iOS', platformVersion:'7.1', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPhone Simulator', platformName: 'iOS', platformVersion:'7.0', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPhone Simulator', platformName: 'iOS', platformVersion:'6.1', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPad Simulator', platformName: 'iOS', platformVersion:'8.1', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPad Simulator', platformName: 'iOS', platformVersion:'8.0', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPad Simulator', platformName: 'iOS', platformVersion:'7.1', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPad Simulator', platformName: 'iOS', platformVersion:'7.0', appiumVersion: '1.3.4'},
            {browserName: 'Safari', deviceName: 'iPad Simulator', platformName: 'iOS', platformVersion:'6.1', appiumVersion: '1.3.4'}
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');

  grunt.registerTask('default', ['connect:server', 'saucelabs-mocha']);
};
