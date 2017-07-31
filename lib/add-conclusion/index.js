const inquirer = require('inquirer');
const slugify = require('../utils/slugify');
const files = require('../utils/files');
const git = require('../utils/git');
const logger = require('../utils/logger');

const defaultMessage = `
This is the very final part of the project. No more tests or instructions.

You can say congratulations and maybe provide some additional learning resources.
`;

module.exports = function addConclusion(args) {
  const branchName = 'ducktypecoder-conclusion';

  git
    .branch(branchName)
    .then(() => git.checkout(branchName))
    .then(() => {
      files.changeIntoDirectory('ducktypecoder');
      files.createFile('content.md');
      files.writeToFile('content.md', defaultMessage);
    })
    .then(() => {
      git.commitContentAndTests();
    })
    .catch(message => {
      logger.error(message);
    });
};
