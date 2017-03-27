module.exports = function (grunt) {
    grunt.initConfig({
        'saucelabs-mocha': {
            all: {
                options: {
                    build: process.env.TRAVIS_JOB_ID,
                    urls: ['http://zordius.github.io/with-promise/'],
                    testname: 'Mocha Unit Test for with-promise',
                    sauceConfig: {
                        tags: [process.env.TRAVIS_JOB_ID, process.env.TRAVIS_COMMIT, 'withPromise', 'mocha'],
                        public: 'public'
                    },
                    tunneled: false,
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
                        {browserName: 'internet explorer', version: 9, platform: 'Windows 7'}
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-saucelabs');
    grunt.registerTask('default', ['saucelabs-mocha']);
};
