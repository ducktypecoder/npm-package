#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var figlet = require('figlet');
var nextStep = require('./lib/next-step');
var initializeProject = require('./lib/initialize-project');

program
  .version('0.0.1')
  .description('Create and follow projects on ducktypecoder')
  .parse(process.argv);


console.log(
  chalk.yellow(
    figlet.textSync('ducktypecoder', { horizontalLayout: 'full' })
  )
);


switch (program.args[0]) {
  case 'next':
    nextStep();
    return;
  case 'init':
    initializeProject(program.args);
    return;
  case undefined:
    console.log('no command provided...')
    return;
  default:
    console.log('command not recognized...')
    return
}
