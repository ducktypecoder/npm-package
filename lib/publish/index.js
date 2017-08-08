const axios = require('axios');

const getConfig = require('../utils/get-config');
const logger = require('../utils/logger');

const getErrors = require('./get-errors');
const postProjectToApi = require('./post-project-to-api');
const addCommitAndPush = require('./add-commit-and-push');

module.exports = function publish() {
  logger.success('Publishing project to www.ducktypecoder.com...');

  getErrors()
    .then(addCommitAndPush)
    .then(postProjectToApi)
    .then(() => logger.success('Done!'))
    .catch(errors => {
      if (errors.forEach) {
        errors.forEach(m => logger.error(m));
      } else {
        logger.error(`Whoops! There was an error: ${errors.message}`);
      }
    });
};
