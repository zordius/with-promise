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
                    // https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy+FAQS
                    // https://wiki.saucelabs.com/pages/viewpage.action?pageId=48365781
                    tunnelArgs: ['-B', 'www.google.com'],
                    detailedError: true,
                    concurrency: 2,
                    throttled: 3,
                    maxPollRetries: 3,
                    maxRetries: 2,
                    'max-duration': 300,
                    browsers: [
                        {browserName: 'chrome'},
                        {browserName: 'firefox'},
                        {browserName: 'safari', version: 10, platform: 'OS X 10.12'},
                        {browserName: 'safari', version: 9, platform: 'OS X 10.11'},
                        {browserName: 'safari', version: 8, platform: 'OS X 10.10'},
                        {browserName: 'MicrosoftEdge', version: 14, platform: 'Windows 10'},
                        {browserName: 'internet explorer', version: 11, platform: 'Windows 8.1'},
                        {browserName: 'internet explorer', version: 10, platform: 'Windows 8'},
                        {browserName: 'internet explorer', version: 9, platform: 'Windows 7'},
            {browserName: 'Android', version: '4.4', platform: 'Linux'},
            {browserName: 'Android', version: '4.1', platform: 'Linux'},
            {browserName: 'Android', version: '4.0', platform: 'Linux'},
            {browserName: 'iphone', version: '8.1', platform: 'OS X 10.10'},
            {browserName: 'iphone', version: '8.0', platform: 'OS X 10.10'},
            {browserName: 'iphone', version: '7.1', platform: 'OS X 10.10'},
            {browserName: 'iphone', version: '7.0', platform: 'OS X 10.9'},
            {browserName: 'iphone', version: '6.1', platform: 'OS X 10.8'},
            {browserName: 'ipad', version: '8.1', platform: 'OS X 10.10'},
            {browserName: 'ipad', version: '8.0', platform: 'OS X 10.10'},
            {browserName: 'ipad', version: '7.1', platform: 'OS X 10.10'},
            {browserName: 'ipad', version: '7.0', platform: 'OS X 10.9'},
            {browserName: 'ipad', version: '6.1', platform: 'OS X 10.8'}
/*
                        {deviceName: 'Android Emulator', platformVersion: '5.1', platformName: 'Android'},
                        {deviceName: 'Android Emulator', platformVersion: '5.0', platformName: 'Android'},
                        {deviceName: 'Android Emulator', platformVersion: '4.4', platformName: 'Android'},
                        {deviceName: 'Android Emulator', platformVersion: '4.1', platformName: 'Android'},
                        {deviceName: 'Android Emulator', platformVersion: '4.0', platformName: 'Android'},
                        {deviceName: 'iPhone Simulator', platformVersion: '10.2', platformName: 'iOS'},
                        {deviceName: 'iPhone Simulator', platformVersion: '9.3', platformName: 'iOS'},
                        {deviceName: 'iPhone Simulator', platformVersion: '8.4', platformName: 'iOS'},
                        {deviceName: 'iPad Simulator', platformVersion: '10.2', platformName: 'iOS'},
                        {deviceName: 'iPad Simulator', platformVersion: '9.3', platformName: 'iOS'},
                        {deviceName: 'iPad Simulator', platformVersion: '8.4', platformName: 'iOS'}
*/
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-saucelabs');

    grunt.registerTask('default', ['connect:server', 'saucelabs-mocha']);
};
