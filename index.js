var getConfig = require('./lib/get-config');
var updateUserProgress = require('./lib/update-user-progress');
var { spawn } = require('child_process');
var pwd = spawn('pwd');

var projectDirectory;
var config;

// run a quick child process and grab the working project directory
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
