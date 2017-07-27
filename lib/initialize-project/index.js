var inquirer = require('inquirer');
var slugify = require('../utils/slugify');
var files = require('../utils/files');
var git = require('../utils/git');
var logger = require('../utils/logger');

var introContent = `
Welcome to your new ducktypecoder project!

This is your project's introduction. Provide a description of your project and what people will learn.

When you are ready to add your first step, run the command:

\`\`\`
$ ducktypecoder add step
\`\`\`
`;

var introTests = `
it('works', () => {
  expect(true).toEqual(true);
});
`;

var questions = [
  {
    name: 'name',
    type: 'input',
    message: 'Please provide a name for this project: ',
    validate: function(value) {
      if (value.length) return true;

      return 'Please provide a name for this project';
    }
  }
];

function handleAnswer(answers) {
  logger.success('creating ducktypecoder project named ' + answers.name);

  const slugifiedName = slugify(answers.name);

  git.init();
  git
    .validateBranchName('master')
    .then(() => {
      const exists = files.directoryExists('ducktypecoder');

      if (exists) {
        throw new Error('There is already a ducktypecoder directory');
      }

      files.createDirectory('ducktypecoder');
      files.changeIntoDirectory('ducktypecoder');

      files.createFile('content.md');
      files.writeToFile('content.md', introContent);

      files.createFile('tests.js');
      files.writeToFile('tests.js', introTests);
      // todo: add any config required
    })
    .catch(message => {
      logger.error(message);
    });
}

module.exports = function createProject(args) {
  inquirer.prompt(questions).then(handleAnswer);
};
