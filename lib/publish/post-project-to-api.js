const git = require('simple-git/promise')();
const axios = require('axios');
const getApiUrl = require('../utils/get-api-url');
const configstore = require('../utils/configstore');

module.exports = function postProjectToApi(content) {
  return git
    .getRemotes(true)
    .then(remotes => {
      const origin = remotes.find(r => r.name === 'origin');

      const tokens = configstore.get('tokens');

      const client = axios.create({
        baseURL: `${getApiUrl()}`,
        timeout: 3000,
        headers: { Authorization: tokens.access }
      });

      return client.post('/publish', {
        repo: origin.refs.fetch,
        content
      });
    })
    .then(response => {
      if (response.data.error) throw new Error(response.data.error);
      return true;
    });
};
