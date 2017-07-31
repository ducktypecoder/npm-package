const inquirer = require('inquirer');
const slugify = require('../utils/slugify');
const files = require('../utils/files');
const git = require('../utils/git');
const logger = require('../utils/logger');

function defaultContent(number) {
  return `
This is content for step ${number}.

When you are ready to add code that answers this step, run the command:

\`\`\`
$ ducktypecoder add answer
\`\`\`
`;
}

const defaultTest = `
it('fails at first', () => {
  expect(true).toEqual(false);
});
`;

module.exports = function addStep(args) {
  // First, figure out what step we are on (0...i);
  // Then, create & checkout a branch for the next step (i+1);
  // Then, overwrite the content & tests to force the author to write new content & tests
  let newStep;
  let newStepBranch;

  git
    // .validateStagingIsClear() TODO: we dont want to do anything until the user has committed their work
    .getMostRecentStepNumber()
    .then(number => {
      newStep = Number(number) + 1;
      newStepBranch = `ducktypecoder-step-${newStep.toString()}`;

      return true;
    })
    .then(() => git.branch(newStepBranch))
    .then(() => git.checkout(newStepBranch))
    .then(() => {
      files.changeIntoDirectory('ducktypecoder');

      // get config, and update the step to be the newStep
      const config = files.readFile('config.json');
      const configJson = JSON.parse(config);
      configJson.step = newStep;

      files.createFile('config.json');
      files.writeToFile('config.json', JSON.stringify(configJson));

      files.createFile('content.md');
      files.writeToFile('content.md', defaultContent(newStep));

      files.createFile('tests.js');
      files.writeToFile('tests.js', defaultTest);
      // todo: add any config required
    })
    .then(() => {
      git.commitContentAndTests();
    })
    .catch(message => {
      logger.error(message);
    });
};
