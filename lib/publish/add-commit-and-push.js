const git = require('simple-git/promise')();
const logger = require('../utils/logger');

module.exports = function addCommitAndPush() {
  logger.info('Adding files, committing changes, pushing to origin...');

  return git
    .add('.')
    .then(() => git.commit('adds changes before publishing'))
    .then(() => git.push('origin', { '--all': true }));
};
