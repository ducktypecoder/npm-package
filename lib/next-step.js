var getConfig = require('./get-config');
var updateUserProgress = require('./update-user-progress');
var { spawn } = require('child_process');

var projectDirectory;
var config;

function nextStep() {
  // run a quick child process and grab the working project directory
  var pwd = spawn('pwd');

  pwd.stdout.on('data', data => {
    projectDirectory = `${data}`;
    pwd.kill();
  });

  // after we kill the child process, proceed, knowing the workign project directory
  pwd.stdout.on('close', code => {
    console.log('--- --- --- ---');
    console.log('starting to check your work with ducktypecoder!');
    config = getConfig(projectDirectory);

    updateUserProgress(config).then(() => {
      console.log('--- --- --- ---');
      process.exit(0);
    });
  });
}

module.exports = nextStep;
