const git = require('simple-git')();
const files = require('../utils/files');
const logger = require('../utils/logger');

let content;
let tests;
let newStep;
let branchName;
let isConclusion;

function updateConfigStep(config) {
  const newConfig = JSON.stringify({
    step: isConclusion ? 'conclusion' : newStep,
    projectName: config.projectName
  });
  files.writeToFile(`${process.cwd()}/ducktypecoder/config.json`, newConfig);
}

function displayMessage() {
  logger.success('\nGreat! You can get started now on the next step ---> \n');
  logger.fileMarkdown(
    files.readFile(`${process.cwd()}/ducktypecoder/content.md`)
  );
}

module.exports = function setupNextStep(config) {
  newStep = Number(config.step) + 1;

  git
    .branch((err, branchSummary) => {
      isConclusion =
        newStep >
        branchSummary.all.filter(
          s => s.includes('ducktypecoder-step-') && !s.includes('-answer')
        ).length;

      if (isConclusion) {
        branchName = 'ducktypecoder-conclusion';
      } else {
        branchName = `ducktypecoder-step-${newStep}`;
      }
    })
    .add('.')
    .commit('saves changes before updating ducktypecoder content and steps')
    .status((err, res) => {
      // NOTE: simple-git async flow is busted, need to embed a second chain
      // of functions in this callback
      git
        .checkout(branchName, (err, res) => {
          content = files.readFile(`${process.cwd()}/ducktypecoder/content.md`);
          tests = files.readFile(`${process.cwd()}/ducktypecoder/tests.js`);
        })
        .checkout('working', (err, res) => {
          files.writeToFile(
            `${process.cwd()}/ducktypecoder/content.md`,
            content
          );
          if (!isConclusion)
            files.writeToFile(`${process.cwd()}/ducktypecoder/tests.js`, tests);
          updateConfigStep(config, newStep);
        })
        .add(`.`)
        .commit(`adds ducktypecoder content and tests`)
        .deleteLocalBranch(branchName, () => {
          displayMessage();
        });
    });
};
