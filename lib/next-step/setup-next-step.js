const git = require('simple-git')();
// const git = require('simple-git/promise')();
const files = require('../utils/files');
// const git = require('../utils/git');
const logger = require('../utils/logger');

function updateContentAndTests(config, newStep) {
  const branchName = `ducktypecoder-step-${newStep}`;

  let content;
  let tests;

  console.log(
    'setupNextStep > updateContentAndTests > branchName: ',
    branchName
  );
  // git library without promises:

  git.checkout(branchName, (err, res) => {
    console.log(`checked out ${branchName}: res: ${res}`);

    content = files.readFile('/ducktypecoder/content.md');
    tests = files.readFile('/ducktypecoder/tests.js');
    console.log('got content and tests...');

    git.checkout('working', (err, res2) => {
      console.log('writing content & tests...');
      files.writeToFile('/ducktypecoder/content.md', content);
      files.writeToFile('/ducktypecoder/tests.js', tests);

      git
        .add('/ducktypecoder/*')
        .commit('adds ducktypecoder content and tests');
    });
  });

  // git using promises:
  // git
  //   .branch(branchName)
  //   .then(res => {
  //     // TODO: this is not executing....????
  //     console.log(`checked out ${branchName}: res: ${res}`);
  //
  //     content = files.readFile('/ducktypecoder/content.md');
  //     tests = files.readFile('/ducktypecoder/tests.js');
  //     console.log('got content and tests...');
  //
  //     console.log('checking out working');
  //     return git.checkout('working');
  //   })
  //   .then(() => {
  //     console.log('writing content & tests...');
  //     files.writeToFile('/ducktypecoder/content.md', content);
  //     files.writeToFile('/ducktypecoder/tests.js', tests);
  //     return git.add('/ducktypecoder/*');
  //   })
  //   .then(() =>
  //     git.commit(`adds ducktypecoder content and tests for step ${newStep}`)
  //   )
  //   .catch(err => console.log('err: ', err));
}

function writeConfigStep(config, newStep) {
  const newConfig = JSON.stringify({
    step: newStep,
    projectName: config.projectName
  });
  files.writeToFile(`${process.cwd()}/ducktypecoder/config.json`, newConfig);
}

function outputMessage() {
  logger.success('\nGreat! You can get started now on the next step ---> \n');
  logger.fileMarkdown(
    files.readFile(`${process.cwd()}/ducktypecoder/content.md`)
  );
}

module.exports = function setupNextStep(config) {
  // write the next step number to the config
  const newStep = Number(config.step) + 1;

  updateContentAndTests(config, newStep);
  // writeConfigStep(config, newStep);
  // outputMessage();
};
