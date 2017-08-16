const program = require('commander');
const startProject = require('../start-project');
const nextStep = require('../next-step');
const initializeProject = require('../initialize-project');
const addStep = require('../add-step');
const addAnswer = require('../add-answer');
const addConclusion = require('../add-conclusion');
const showInfo = require('../show-info');
const viewContent = require('../view-content');
const editAuthor = require('../edit-author');
const publish = require('../publish');
const login = require('../login');
const logout = require('../logout');
const logger = require('../utils/logger');

function setupProgram() {
  program
    .version(require('../../package.json').version)
    .description('Create and follow ducktypecoder projects.')
    .option('-d, --development', 'Use development (localhost) urls');

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
}

function startProgram() {
  logger.logo();
  program.parse(process.argv);

  if (program.development) {
    console.log('--- DEVELOPMENT: TRUE ---');
  }
}

const cli = {
  setupProgram,
  startProgram
};

module.exports = cli;
