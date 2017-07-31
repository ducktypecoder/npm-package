const inquirer = require('inquirer');
const files = require('../utils/files');
const logger = require('../utils/logger');

function initialConfig(name) {
  return `
  {
    "step": "0",
    "projectName": ${name}
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

  files.createDirectory('ducktypecoder');
  files.changeIntoDirectory('ducktypecoder');

  files.createFile('config.json');
  files.writeToFile('config.json', initialConfig(answers.name));

  files.createFile('content.md');
  files.writeToFile('content.md', introContent);

  files.createFile('tests.js');
  files.writeToFile('tests.js', introTests);
  // todo: add any config required
}

module.exports = function createProject() {
  const exists = files.directoryExists('ducktypecoder');

  if (exists) {
    logger.error('There is already a ducktypecoder directory');
    return;
  }

  inquirer.prompt(questions).then(handleAnswer);
};
