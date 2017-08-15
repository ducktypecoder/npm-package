const git = require('simple-git')();
const inquirer = require('inquirer');
const files = require('../utils/files');
const logger = require('../utils/logger');
const slugify = require('../utils/slugify');

function initialConfig(name) {
  return `
  {
    "step": "0",
    "projectName": \"${name}\"
  }
  `;
}

const introContent = `
Welcome to your new ducktypecoder project!

This is your project's introduction. Provide a description of your project and what people will learn.

When you are ready to add your first step, run the command:

\`\`\`
$ ducktypecoder add step
\`\`\`
`;

const introTests = `
it('works', () => {
  expect(true).toEqual(true);
});
`;

const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'Please provide a name for this project: ',
    validate(value) {
      if (value.length) return true;

      return 'Please provide a name for this project';
    }
  }
];

function handleAnswer(answers) {
  logger.success(`creating ducktypecoder project named ${answers.name}`);

  // QUESTION:
  // If we are not already in the project directory, we might want to create a new one.
  // Should we ask the user if we should create a new directory or use the current directory?
  // example:
  // const slugifiedName = slugify(answers.name);
  // const notInBaseDirectory = files.getCurrentDirectoryBase() !== slugifiedName;
  // if (notInBaseDirectory) {
  //   logger.info(`Creating new directory named ${slugifiedName}`);
  //   files.createDirectory(slugifiedName);
  //   files.changeIntoDirectory(slugifiedName);
  // }

  files.createDirectory('ducktypecoder');
  files.changeIntoDirectory('ducktypecoder');

  files.createFile('config.json');
  files.writeToFile('config.json', initialConfig(answers.name));

  files.createFile('content.md');
  files.writeToFile('content.md', introContent);

  files.createFile('tests.js');
  files.writeToFile('tests.js', introTests);
  // todo: add any config required

  git
    .init()
    .add('./ducktypecoder')
    .commit('commiting ducktypecoder content, tests and config');
}

module.exports = function createProject() {
  const exists = files.directoryExists('ducktypecoder');

  if (exists) {
    logger.error('There is already a ducktypecoder directory');
    return;
  }

  inquirer.prompt(questions).then(handleAnswer);
};
