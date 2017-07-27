var inquirer = require('inquirer');
var slugify = require('../utils/slugify');
var files = require('../utils/files');
var git = require('../utils/git');
var logger = require('../utils/logger');

var defaultMessage = `
This is the very final part of the project. No more tests or instructions.

You can say congratulations and maybe provide some additional learning resources.
`;

module.exports = function addConclusion(args) {
  var branchName = 'ducktypecoder-conclusion';

  git
    .createAndCheckoutBranch(branchName)
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
