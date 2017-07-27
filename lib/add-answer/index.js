var inquirer = require('inquirer');
var slugify = require('../utils/slugify');
var files = require('../utils/files');
var git = require('../utils/git');
var logger = require('../utils/logger');

function defaultMessage(number) {
  return `
Code in this branch should make the tests pass for step ${number}.

When you are ready to add another step, run the command:

\`\`\`
$ ducktypecoder add step
\`\`\`

Or, if you are all done and want to add the conclusion, run the command:

\`\`\`\`
$ ducktypecoder add conclusion
\`\`\`\`
`;
}

module.exports = function addAnswer(args) {
  // First, figure out what step we are on (0...i);
  // Then, create & checkout a branch for the next step (i+1);
  // Then, overwrite the content & tests to force the author to write new content & tests
  git
    // .validateStagingIsClear() TODO: we dont want to do anything until the user has committed their work
    .getMostRecentStepNumber()
    .then(number => {
      var newStepAnswer = Number(number);
      var newStepAnswerBranch =
        'ducktypecoder-step-' + newStepAnswer.toString() + '-answer';

      git.createAndCheckoutBranch(newStepAnswerBranch);
      return newStepAnswer;
    })
    .then(newStepAnswer => {
      files.changeIntoDirectory('ducktypecoder');

      files.createFile('content.md');
      files.writeToFile('content.md', defaultMessage(newStepAnswer));
      // todo: add any config required
    })
    .then(() => {
      git.commitContentAndTests();
    })
    .catch(message => {
      logger.error(message);
    });
};
