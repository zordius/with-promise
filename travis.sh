#!/bin/sh

echo "DEBUG ENV: ${TRAVIS_JOB_NUMBER} ${TRAVIS_BUILD_NUMBER} ..."

if [ "${TRAVIS_BUILD_NUMBER}.6" != "${TRAVIS_JOB_NUMBER}" ]; then
  echo "Only run sauce labs 1 time 1 commit... quit."
  exit 0
fi

if [ "${TRAVIS_REPO_SLUG}" != "zordius/with-promise" ]; then
  echo "Skip deploy because this is a fork... quit."
  exit 0
fi

# push coverage to codeclimate
npm install codeclimate-test-reporter
npm run-script coverage
node_modules/.bin/codeclimate-test-reporter < coverage/lcov.info

# build JS files for dist and test
npm install grunt grunt-cli grunt-contrib-connect grunt-saucelabs badge-render browserify uglify-js
npm run-script lint && npm run-script build_std && npm run-script build_dbg && npm run-script build_min && npm run-script build_tst

CODE=$?
if [ $CODE -ne 0 ]; then
  echo Build failed, abort.
  exit 1
fi

# Setup git
git config --global user.name "Travis-CI"
git config --global user.email "zordius@yahoo-inc.com"

# commit dist first
git add dist
git commit -m "Auto build dist files for ${TRAVIS_COMMIT} [ci skip]"
git checkout -b dist_ready

# push test files to gh-pages
# push test files to gh-pages
mkdir -p tmp/dist
mkdir tmp/test
cp dist/* tmp/dist/
cp test/* tmp/test/
git fetch origin gh-pages:gh-pages
git checkout gh-pages
cp tmp/test/index.html .
cp tmp/dist/* testdist/
cp node_modules/mocha/mocha.js testdist/
cp node_modules/mocha/mocha.css testdist/
git add index.html testdist/
git commit -m "New tests on github for ${TRAVIS_COMMIT} [ci skip]"
git push --quiet "https://${GHTK}@github.com/zordius/with-promise.git" gh-pages:gh-pages > /dev/null 2>&1
git checkout dist_ready

# wait github update gh-pages
sleep 10

# do sauce labs tests
node_modules/.bin/grunt || exit $?

node_modules/.bin/badge-saucelabs-results > badge.json
cat badge.json
node_modules/.bin/badge-render badge.json badge.html --png badge.png --scale 0.7 -width 490 -height 60
git add badge.png
git commit -m "Auto commit browser badge for ${TRAVIS_COMMIT} [ci skip]"

# push back dist files
git push "https://${GHTK}@github.com/zordius/with-promise.git" dist_ready:master > /dev/null 2>&1
