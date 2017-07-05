var child_process = require('child_process');
var exec = child_process.exec;
var fork = child_process.spawn;
var fs = require('fs');


module.exports = function runTestsForStep(config, step) {
    console.log('setting up so we can run tests...')

    var stepFileName = 'step-' + step + '.test.js';
    var command = './node_modules/ducktypecoder/node_modules/.bin/jest'
    var args = [stepFileName];
    var env = Object.assign( process.env );
    env.projectDirectory = config.projectDirectory;
    var options = { env: env };
    console.log('starting test runner in child process...')
    var pwd = fork('pwd');
    pwd.stdout.on('data', data => console.log('pwd: ', data.toString()));

    var testRunner = fork(command, args, options);

    return new Promise(function(resolve, reject) {
      testRunner.stdout.on('data', (data) => {
        console.log(`${data}`);
      });

      testRunner.stderr.on('data', (data) => {
        console.log(`${data}`);
      });

      testRunner.on('error', (err) => {
        console.log('error with test runner: ', err)
        throw err
      })

      testRunner.on('close', (code) => {
        console.log('testRunner closed with code: ', code);
        resolve(true)
      });
    });
};
