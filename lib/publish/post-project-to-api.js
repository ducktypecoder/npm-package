const git = require('simple-git/promise')();
const axios = require('axios');
const getApiUrl = require('../utils/get-api-url');

module.exports = function postProjectToApi(content) {
  return git
    .getRemotes(true)
    .then(remotes => {
      const origin = remotes.find(r => r.name === 'origin');

      return axios.post(`${getApiUrl()}/publish`, {
        repo: origin.refs.fetch,
        content
      });
    })
    .then(response => {
      if (response.data.error) throw new Error(response.data.error);
      return true;
    });
};