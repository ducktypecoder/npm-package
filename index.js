#!/usr/bin/env node

var program = require('commander');
var nextStep = require('./lib/next-step');

program
  .version('0.0.1')
  .description('Create and follow projects on ducktypecoder')
  .parse(process.argv);

switch (program.args[0]) {
  case 'next':
    nextStep();
    return;
  default:
    console.log('no command provided...')
    return;
}
