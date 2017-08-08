const child_process = require('child_process');

const exec = child_process.exec;
const fork = child_process.spawn;
const fs = require('fs-extra');

module.exports = function runTestsForStep(config, step) {
  console.log('running tests...');

  const stepFileName = `step-${step}.test.js`;
  // var fullStepFilePath =
  //   './node_modules/ducktypecoder/projects/' +
  //   config.project +
  //   '/' +
  //   stepFileName;

  // copy the test file into the working project directory:
  // fs.copySync(fullStepFilePath, stepFileName);

  // write the tests to the file...
  fs.writeFileSync(stepFileName, config.tests);

  // setup the process that will run jest
  const command = './node_modules/ducktypecoder/node_modules/.bin/jest';
  const args = [
    stepFileName,
    '--noStackTrace',
    // '--notify',
    '--color',
    '--forceExit'
  ];
  // setup the env variables for the child process
  const env = Object.assign(process.env);
  env.projectDirectory = process.cwd();
  const options = { env };

  // run the test runner and handle events
  const testRunner = fork(command, args, options);

  return new Promise((resolve, reject) => {
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
        resolve(true);
      } else {
        console.log('some tests failed...');
        resolve(false);
      }

      fs.removeSync(stepFileName);
    });
  });
};
