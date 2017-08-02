const git = require('simple-git')();
const files = require('../utils/files');
const logger = require('../utils/logger');

let content;
let tests;
let newStep;
let branchName;

function writeConfigStep(config) {
  const newConfig = JSON.stringify({
    step: newStep,
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
  branchName = `ducktypecoder-step-${newStep}`;

  git
    .checkout(branchName, () => {
      content = files.readFile(`${process.cwd()}/ducktypecoder/content.md`);
      tests = files.readFile(`${process.cwd()}/ducktypecoder/tests.js`);
    })
    .checkout('working', () => {
      files.writeToFile(`${process.cwd()}/ducktypecoder/content.md`, content);
      files.writeToFile(`${process.cwd()}/ducktypecoder/tests.js`, tests);
      writeConfigStep(config, newStep);
    })
    .add(`${process.cwd()}/ducktypecoder/*`)
    .commit(`adds ducktypecoder content and tests`)
    .deleteLocalBranch(branchName, () => {
      displayMessage();
    });
};
