#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var figlet = require('figlet');
var startProject = require('./lib/start-project');
var nextStep = require('./lib/next-step');
var initializeProject = require('./lib/initialize-project');
var addStep = require('./lib/add-step');
var addAnswer = require('./lib/add-answer');
var addConclusion = require('./lib/add-conclusion');
var showInfo = require('./lib/show-info');
var viewContent = require('./lib/view-content');
var editAuthor = require('./lib/edit-author');
var publish = require('./lib/publish');

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
  case 'start':
    startProject(program.args);
    return;
  case 'next':
    nextStep();
    return;
  case 'info':
    showInfo();
    return;
  case 'view':
    viewContent();
    return;
  case 'init':
    initializeProject(program.args);
    return;
  case 'add':
    var typeToAdd = program.args[1];

    if (typeToAdd === 'step') addStep(program.args);
    if (typeToAdd === 'answer') addAnswer(program.args);
    if (typeToAdd === 'conclusion') addConclusion(program.args);

    return
  case 'edit':
    var typeToAdd = program.args[1];

    if (typeToAdd === 'author') editAuthor(program);
    return
  case 'publish':
    publish();
    return;
  case undefined:
    console.log('no command provided...')
    return;
  default:
    console.log('command not recognized...')
    return
}
