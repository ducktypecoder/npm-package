const inquirer = require('inquirer');
const slugify = require('../utils/slugify');
const files = require('../utils/files');
const git = require('../utils/git');
const logger = require('../utils/logger');

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
  let newStepAnswer;
  let newStepAnswerBranch;

  git
    // .validateStagingIsClear() TODO: we dont want to do anything until the user has committed their work
    .getMostRecentStepNumber()
    .then(number => {
      newStepAnswer = Number(number);
      newStepAnswerBranch = `ducktypecoder-step-${newStepAnswer.toString()}-answer`;

      return newStepAnswer;
    })
    .then(() => git.branch(newStepAnswerBranch))
    .then(() => git.checkout(newStepAnswerBranch))
    .then(() => {
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
