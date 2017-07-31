const getConfig = require('../utils/get-config');
const updateUserProgress = require('./update-user-progress');
const { spawn } = require('child_process');

let projectDirectory;
let config;

function nextStep() {
  // run a quick child process and grab the working project directory
  const pwd = spawn('pwd');

  pwd.stdout.on('data', data => {
    projectDirectory = `${data}`;
    pwd.kill();
  });

  // after we kill the child process, proceed, knowing the workign project directory
  pwd.stdout.on('close', code => {
    console.log('--- --- --- ---');
    console.log('starting to check your work with ducktypecoder!');
    config = getConfig(projectDirectory);

    updateUserProgress().then(() => {
      console.log('--- --- --- ---');
      process.exit(0);
    });
  });
}

module.exports = nextStep;
