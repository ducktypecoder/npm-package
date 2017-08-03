const git = require('simple-git/promise')();
const axios = require('axios');

const getConfig = require('../utils/get-config');
const logger = require('../utils/logger');
const getErrors = require('./get-errors');

module.exports = function publish() {
  logger.success('Publish...');

  getErrors()
    .then(addCommitAndPush)
    .then(saveToApi)
    .then(() => logger.success('Done!'))
    .catch(errors => {
      errors.forEach(m => logger.error(m));
    });
};

function addCommitAndPush() {
  logger.info('Adding files, committing changes, pushing to origin...');

  return git
    .add('.')
    .then(() => git.commit('adds changes before publishing'))
    .then(() => git.push('origin', { '--all': true }));
}

function saveToApi() {
  const config = getConfig();
  const data = {};

  return axios.post(`${config.apiUrl}/publish`, data).then(response => {
    if (response.data.error) throw new Error(response.data.error);

    console.log(response.data);
  });
}
