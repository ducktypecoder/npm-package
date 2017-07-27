var inquirer = require('inquirer');
var slugify = require('../utils/slugify');
var files = require('../utils/files');
var git = require('../utils/git');
var logger = require('../utils/logger');

function defaultContent(number) {
  return `
This is content for step ${number}.

When you are ready to add code that answers this step, run the command:

\`\`\`
$ ducktypecoder add answer
\`\`\`
`;
}

var defaultTest = `
it('fails at first', () => {
  expect(true).toEqual(false);
});
`;

module.exports = function addStep(args) {
  // First, figure out what step we are on (0...i);
  // Then, create & checkout a branch for the next step (i+1);
  // Then, overwrite the content & tests to force the author to write new content & tests
  git
    // .validateStagingIsClear() TODO: we dont want to do anything until the user has committed their work
    .getMostRecentStepNumber()
    .then(number => {
      var newStep = Number(number) + 1;
      var newStepBranch = 'ducktypecoder-step-' + newStep.toString();

      git.createAndCheckoutBranch(newStepBranch);
      return newStep;
    })
    .then(newStep => {
      files.changeIntoDirectory('ducktypecoder');

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
