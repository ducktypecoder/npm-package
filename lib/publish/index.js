const git = require('simple-git/promise')();
const axios = require('axios');

const getConfig = require('../utils/get-config');
const getApiUrl = require('../utils/get-api-url');
const logger = require('../utils/logger');
const getErrors = require('./get-errors');

function addCommitAndPush() {
  logger.info('Adding files, committing changes, pushing to origin...');

  return git
    .add('.')
    .then(() => git.commit('adds changes before publishing'))
    .then(() => git.push('origin', { '--all': true }));
}

function postProjectToApi() {
  const config = getConfig();

  return git
    .getRemotes(true)
    .then(remotes => {
      const origin = remotes.find(r => r.name === 'origin');
      console.log(origin.refs.fetch);
      const apiUrl = getApiUrl();

      return axios.post(`${apiUrl}/publish`, {
        repo: origin.refs.fetch
      });
    })
    .then(response => {
      if (response.data.error) throw new Error(response.data.error);

      const result = response.data.success;

      if (result) logger.success('All done!');
    });
}

module.exports = function publish() {
  logger.success('Publish...');

  getErrors()
    .then(addCommitAndPush)
    .then(postProjectToApi)
    .then(() => logger.success('Done!'))
    .catch(errors => {
      errors.forEach(m => logger.error(m));
    });
};
