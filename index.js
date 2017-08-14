#!/usr/bin/env node

const program = require('commander');
const startProject = require('./lib/start-project');
const nextStep = require('./lib/next-step');
const initializeProject = require('./lib/initialize-project');
const addStep = require('./lib/add-step');
const addAnswer = require('./lib/add-answer');
const addConclusion = require('./lib/add-conclusion');
const showInfo = require('./lib/show-info');
const viewContent = require('./lib/view-content');
const editAuthor = require('./lib/edit-author');
const publish = require('./lib/publish');
const login = require('./lib/login');
const logout = require('./lib/logout');
const logger = require('./lib/utils/logger');

program
  .version(require('./package.json').version)
  .description('Create and follow ducktypecoder projects.');

program
  .command('login')
  .description('Login with the ducktypecoder web app')
  .action(login);
program
  .command('logout')
  .description('Logout from the ducktypecoder command line tool.')
  .action(logout);
program
  .command('info')
  .description('Show the current project information.')
  .action(showInfo);
program
  .command('next')
  .description('Proceed to the next step, if all the current tests pass.')
  .action(nextStep);
program
  .command('view')
  .description('View the current step instructions on a web page')
  .action(viewContent);
program
  .command('publish')
  .description(
    'Publish a new project or update and existing project on ducktypecoder.com'
  )
  .action(publish);
program
  .command('start [name]')
  .description('Provide a name or URL and start a ducktypecoder project.')
  .action(name => {
    startProject(name);
  });
program
  .command('init [name]')
  .description('Begin authoring your own ducktypecoder project.')
  .action(name => {
    initializeProject(name);
  });
program
  .command('add [thing]')
  .description(
    'Add another step, answer or a conclusion to your ducktypecoder project.'
  )
  .action(thing => {
    if (thing === 'step') addStep();
    if (thing === 'answer') addAnswer();
    if (thing === 'conclusion') addConclusion();
  });
program
  .command('edit [info]')
  .description('Edit project information, like "author"')
  .action(info => {
    if (info === 'author') editAuthor();
  });

logger.logo();

program.parse(process.argv);
