var child_process = require('child_process');
var exec = child_process.exec;
var fork = child_process.spawn;
var fs = require('fs-extra');

module.exports = function runTestsForStep(config, step) {
  console.log('setting up so we can run tests...');

  var stepFileName = 'step-' + step + '.test.js';
  var fullStepFilePath =
    './node_modules/ducktypecoder/projects/' +
    config.project +
    '/' +
    stepFileName;

  // for debugging, show the current working directory
  var pwd = fork('pwd');
  pwd.stdout.on('data', data => console.log('pwd: ', data.toString()));

  // copy the test file into the working project directory:
  fs.copySync(fullStepFilePath, stepFileName);

  // setup the process that will run jest
  var command = './node_modules/ducktypecoder/node_modules/.bin/jest';
  var args = [stepFileName];
  // setup the env variables for the child process
  var env = Object.assign(process.env);
  env.projectDirectory = config.projectDirectory;
  var options = { env: env };

  // run the test runner and handle events
  console.log('starting test runner in child process...');
  var testRunner = fork(command, args, options);

  return new Promise(function(resolve, reject) {
    testRunner.stdout.on('data', data => {
      console.log(`${data}`);
    });

    testRunner.stderr.on('data', data => {
      console.log(`${data}`);
    });

    testRunner.on('error', err => {
      console.log('error with test runner: ', err);
      throw err;
    });

    testRunner.on('close', code => {
      if (code == 0) {
        console.log('all test passing!');
      } else {
        console.log('some tests failed...');
      }

      fs.removeSync(stepFileName);
      resolve(true);
    });
  });
};
