const files = require('../utils/files');
const logger = require('../utils/logger');

const git = require('simple-git')();
// const git = require('simple-git/promise')();
// const git = require('../utils/git');

let content;
let tests;
let newStep;
let branchName;

function commitContentAndTests() {
  git.add('/ducktypecoder/*').commit(`adds ducktypecoder content and tests`);
}

function writeConfigStep(config, newStep) {
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
    })
    .add(`${process.cwd()}/ducktypecoder/*`)
    .commit(`adds ducktypecoder content and tests`);
};
